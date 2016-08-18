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
 * This is an adhoc task for transcoding a file with Amazon Elastic Transcoder
 *
 * @package   filter_poodll
 * @since      Moodle 3.1
 * @copyright  2016 Justin Hunt
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class adhoc_s3_transcode extends \core\task\adhoc_task {


//cd needs filename, filerecord and mediatype and savedatetime and convext
              
    public function execute() {   
    	//NB: seems any exceptions not thrown HERE, kill subsequent tasks
    	//so wrap some function calls in try catch to prevent that happening
    	
    	global $DB,$CFG;
    	
    	//get passed in data we need to perform conversion
    	$cd =  $this->get_custom_data();
    	$awstools = new \filter_poodll\awstools();
        
        //if somehow this trasncoding already ocurred, just exit
        if($awstools->does_file_exist($cd->mediatype,$cd->s3filename,'out') ){
            return;
        }
        
       
        try{
             if($awstools->does_file_exist($cd->mediatype,$cd->s3filename,'in' ) ){
		$awstools->create_one_transcoding_job($cd->mediatype,$cd->s3filename,$cd->s3filename);
                //successful so far , so just return
                return;
             }else{
                 $giveup =false;
                $this->handle_s3_error('file not arrived yet:' . $cd->s3filename,$cd,$giveup);
                return;
             }
         }catch (Exception $e) {
            $giveup =true;
            $this->handle_s3_error('could not transcode:' . $cd->s3filename . ':' . $e->getMessage(),$cd,$giveup);
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