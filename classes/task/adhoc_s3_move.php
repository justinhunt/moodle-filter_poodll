<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace filter_poodll\task;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/filter/poodll/poodllfilelib.php');

/**
 *
 * This is an adhoc task for copying back a file from Amazon S3
 *
 * @package   filter_poodll
 * @since      Moodle 3.1
 * @copyright  2016 Justin Hunt
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class adhoc_s3_move extends \core\task\adhoc_task {


//cd needs filename, filerecord and mediatype and savedatetime and convext
              
    public function execute() {   
    	//NB: seems any exceptions not thrown HERE, kill subsequent tasks
    	//so wrap some function calls in try catch to prevent that happening
    	
    	global $DB,$CFG;
    	
    	//get passed in data we need to perform conversion
    	$cd =  $this->get_custom_data();
    	
    	//find the file in the files database
    	$fs = get_file_storage();
    	switch($cd->convext){
    		case '.mp3': $contenthash = POODLL_AUDIO_PLACEHOLDER_HASH;break;
    		case '.mp4': $contenthash = POODLL_VIDEO_PLACEHOLDER_HASH;break;
    		default:$contenthash = '';
    	
    	}
		if(!property_exists($cd,'filename')){
			$this->handle_s3_error('missing filename in custom data:' , $cd);
			return;
		}
		
		//Do we have a database entry for the placeholder file
    	$select = "filename='" . $cd->filename. "' AND filearea <> 'draft' AND contenthash='" . $contenthash. "'";
    	$params = null;
    	$sort = "id DESC";
    	$dbfiles = $DB->get_records_select('files',$select,$params,$sort);
    	if(!$dbfiles){
			if(!$cd->filerecord || !$cd->filerecord->id || !$fs->get_file_by_id($cd->filerecord->id)){
				//the draft file is messed up, or gone, and its not in another area, possibly the user never saved it
				//anyway lets just forget about this task. And move on.
				return;
			}
			$dbnofilemessage='could not find ' . $cd->filename . ' in the DB. Possibly user has not saved yet';
    		$this->handle_s3_error($dbfilemessage,$cd);
			return;
    	}
    			
    	//does file exist on s3
		$awstools = new \filter_poodll\awstools($CFG->filter_poodll_uploadkey,$CFG->filter_poodll_uploadsecret);
		$convfilename = $filename . $cd->convext;
		if(!$awstools->does_file_exist($cd->mediatype,$convfilename)){
			$this->handle_s3_error('No file of name ' . $convfilename . ' found on s3 to retrieve.',$cd);
			return;
		}
    	
    	//get the file we will replace
    	$origfilerecord = array_shift($dbfiles);	
    	$origfile = $fs->get_file_by_id($origfilerecord->id);
    	if(!$origfile){
			$this->handle_s3_error( 'something wrong with sf:' . $cd->filename,$cd);
			return;
		}else{
			//here we fetch the s3 file into the filesystem 
			//TO DO some S3 magic
			$s3file=false;
			/*
			$downloadableminutes = "5";
			$downloadurl = $awstools->get_presigned_download_url($cd->mediatype,$downloadableminutes,$convfilename);
			if($downloadurl){
				$s3file = 	$fs->create_file_from_url($cd->filerecord, $downloadurl);
			}
			*/
			$temppath=$CFG>tempdir . '/' . $convfilename;
			$awstools->save_converted_to_file($cd->mediatype,$convfilename,$temppath);
			$s3file = 	$fs->create_file_from_pathname($cd->filerecord, $temppath);
		}
		
		//replace the placeholder(original) file with the converted one
		if($s3file){
			$origfile->replace_file_with($s3file);
			
			//now we need to replace the splash if it had one
			//hopefully we can also pull this baby from S3
			/*
			$imagefilename = substr($cd->filename,0,strlen($cd->filename)-3) . 'png';
			try{
				$imagefile = get_splash_ffmpeg($origfile, $imagefilename);
			} catch (Exception $e) {
				$this->handle_s3_error('could not get create splash file from:' . $cd->filename . ':' . $e->getMessage(),$cd);
				return;
			}
			*/
			return;
		}else{
		 	$this->handle_s3_error('unable to retrieve ' . $filename,$cd);
		 	return;
		}
		
    }

	private function handle_s3_error($errorstring,$cd){
			error_log('s3file:' . $errorstring);
			  	
    		//we do not retry indefinitely
    		//if we are well beyond the timestamp then we just cancel out of here.
    		$nowdatetime = new DateTime();
    		$diffInSeconds = $cd->savedatetime->getTimestamp() - $nowdatetime->getTimestamp();
    		if($diffInSeconds > (60 * 60 * 2)){
    			//we do not retry after two hours, we just report an error and return quietly
    			error_log('will retry');
    		}else{
    			error_log(print_r($cd,true));
				error_log('will retry');
				throw new \file_exception('s3file', $errorstring);
			}
	}
} 