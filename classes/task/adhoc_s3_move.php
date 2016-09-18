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
    	$awstools = new \filter_poodll\awstools();
        
        try{
            $ret= $awstools->fetch_s3_converted_file($cd->mediatype,$cd->infilename, $cd->outfilename, $cd->filename,$cd->filerecord);
         }catch (Exception $e) {
            $giveup =false;
            $this->handle_s3_error('could not fetch:' . $cd->filename . ':' . $e->getMessage(),$cd,$giveup);
            return;
	}
        
        
        if($ret===false){
            //this indicates no "in" or "out" file, so we should just snuff this task and not repeat it
            //so we silently return
            $giveup=true;
            $this->handle_s3_error('the files: ' . $cd->infilename . ' | ' . $cd->outfilename . ' were not found anywhere on S3. giving up',$cd,$giveup);
            return;
        }else if($ret===true){
            //this indicates we had an "in" file, but no "out" file yet. try again
           $giveup=false;
            $this->handle_s3_error('the file ' . $cd->infilename . ' has not yet been converted.',$cd,$giveup);
            return;
        }else{
            //this indicates the file was found and saved and the path erturned
            $tempfilepath = $ret;
        }
        
        //fetch the permanent file record, that currently holds the placeholder file
        $permfilerecord = \filter_poodll\poodlltools::fetch_placeholder_file_record($cd->mediatype, $cd->filename);
        //do the replace, if it succeeds yay. If it fails ... try again. The user may just not have saved yet
        if(!$permfilerecord){
			$giveup =false;
            $this->handle_s3_error('could not find placeholder file:' . $cd->filename ,$cd,$giveup);
            return;
		}
		
        try{
            \filter_poodll\poodlltools::replace_placeholderfile_in_moodle($cd->filerecord, $permfilerecord, $tempfilepath);
        }catch (Exception $e) {
            $giveup =true;
            $this->handle_s3_error('could not get replace placeholder with converted::' . $cd->filename . ':' . $e->getMessage(),$cd,$giveup);
            return;
		}
        //nothing to do next. If it errors, it will be elsewhere. If it gets here it should be ok.
    }

	private function handle_s3_error($errorstring,$cd,$giveup){
			  	
    		//we do not retry indefinitely
    		//if we are well beyond the timestamp then we just cancel out of here.
    		$nowdatetime = new \DateTime();
                $savedatetime = new \DateTime($cd->isodate);
    		$diffInSeconds = $nowdatetime->getTimestamp() - $savedatetime->getTimestamp();
    		if($diffInSeconds > (60 * 60 * 2) || $giveup){
    			//we do not retry after two hours, we just report an error and return quietly
                    error_log('s3file:' . $errorstring);
                    error_log('will not retry');
    		}else{                   
                    error_log(print_r($cd,true));
                    error_log('will retry');
                    throw new \file_exception('s3file', $errorstring);
             }//end of if/else
	}//end of function handle_S3_error
} //end of class