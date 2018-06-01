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

//require_once($CFG->dirroot . '/filter/poodll/poodllfilelib.php');

/**
 *
 * This is an adhoc task for fetching and processing a transcription
 *
 * @package   filter_poodll
 * @since      Moodle 3.1
 * @copyright  2016 Justin Hunt
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class adhoc_process_transcription extends \core\task\adhoc_task {

        const LOG_TRANSCRIBE_ERROR = 1;
        const LOG_TRANSCRIBE_WAITING = 2;

//cd needs filename, filerecord and mediatype and savedatetime and convext
/*
public function start_trancribe($mediatype){
    $awstools = new \filter_poodll\awstools();
    //JUST for Now
    switch($cd->mediatype){
        case 'video':
            $mediaextension = 'mp4';
            break;
        case 'audio':
        default:
            $mediaextension = 'mp3';
            break;
    }
    $uri = $awstools->s3getObjectUri($cd->mediatype,$cd->outfilename,'out');
    $result = $awstools->start_transcription_job($cd->filename,$mediaextension,$uri,'en-US');
    $this->handle_transcribe_error(self::LOG_TRANSCRIBE_ERROR,$result,$cd,true);
}
*/
              
    public function execute() {   
    	//NB: seems any exceptions not thrown HERE, kill subsequent tasks
    	//so wrap some function calls in try catch to prevent that happening
    	
    	global $DB,$CFG;

    	//get passed in data we need to perform conversion
    	$cd =  $this->get_custom_data();
    	$awstools = new \filter_poodll\awstools();
    	$fileurl = false;
        
        try{
            $result = $awstools->fetch_transcription_result($cd->filename);
            switch($result->TranscriptionJobStatus){
                case 'FAILED':
                    $giveup =true;
                    $message='could not fetch transcription:' . $cd->filename . ':' . $result->FailureReason;
                    $this->handle_transcribe_error(self::LOG_TRANSCRIBE_ERROR,$message,$cd,$giveup);
                    return;
                    break;
                case 'IN_PROGRESS':
                    $giveup =false;
                    $message='transcription not ready:' . $cd->filename;
                    $this->handle_transcribe_error(self::LOG_TRANSCRIBE_WAITING,$message,$cd,$giveup);
                    return;
                    break;

                case 'COMPLETED':
                    $fileurl = $result->Transcript->TranscriptFileUri;
                    break;
            }

         }catch (Exception $e) {
            $giveup =false;
            $message='could not fetch:' . $cd->filename . ':' . $e->getMessage();
            $this->handle_transcribe_error(self::LOG_TRANSCRIBE_ERROR,$message,$cd,$giveup);
            return;
	    }
        
        //Do something with the retrieved recording
        //curl the result and deal with it
        $jsonresult = curlthefile($fileurl);
        $objresult = json_decode($jsonresult);
        //$thetext = $objresult->??;
        if($cd->action =="save_s3"){

        }else{
           //$cd->action =="save_db"
            //
        }


    }

	private function handle_transcribe_error($errorcode, $errorstring,$cd,$giveup){
            //data for logging
            $contextid=$cd->filerecord->contextid;
            $userid=$cd->filerecord->userid;

    		//we do not retry indefinitely
    		//if we are well beyond the timestamp then we just cancel out of here.
    		$nowdatetime = new \DateTime();
            $savedatetime = new \DateTime($cd->isodate);
    		$diffInSeconds = $nowdatetime->getTimestamp() - $savedatetime->getTimestamp();
    		if($diffInSeconds > (60 * 60 * 2) || $giveup){
    			//we do not retry after two hours, we just report an error and return quietly
                $errorstring .= ' :will not retry';
                mtrace('s3file:' . $errorstring);
                //send to debug log
                $this->send_debug_data($errorcode,
                    $errorstring,$userid,$contextid);
    		}else{
                $errorstring .= ' :will retry';
                mtrace(print_r($cd,true));
                mtrace('transcribe_file:' . $errorstring);
                //send to debug log
                $this->send_debug_data($errorcode,
                    $errorstring,$userid,$contextid);

                //throw error so task will be retried
                throw new \file_exception('s3file', $errorstring);
             }//end of if/else
	}//end of function handle_transcribe_error

    private function send_debug_data($type,$message, $userid=false,$contextid=false){
        global $CFG;
        //only log if is on in Poodll settings
        if(!$CFG->filter_poodll_debug){return;}

	    $debugdata = new \stdClass();
	    $debugdata->userid=$userid;
	    $debugdata->contextid=$contextid;
	    $debugdata->type=$type;
	    $debugdata->source='adhoc_process_transcription.php';
        $debugdata->message=$message;
        \filter_poodll\event\debug_log::create_from_data($debugdata)->trigger();
    }
} //end of class