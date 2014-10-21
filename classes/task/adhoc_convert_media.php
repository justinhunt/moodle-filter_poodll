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
 * This is an adhoc task for converting media with FFMPEG
 *
 * @package   filter_poodll
 * @since      Moodle 2.7
 * @copyright  2014 Justin Hunt
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class adhoc_convert_media extends \core\task\adhoc_task {

                                                                            
    public function execute() {   
    	global $DB,$CFG;
    	
    	$cd =  $this->get_custom_data();
    	$fs = get_file_storage();
    	$dbf = $DB->get_record('files',array('filename'=>$cd->filename));
    	$origfile = $fs->get_file_by_id($dbf->id);
    	if($dbf){
    		$filerecord = $cd->filerecord;
    		$filerecord->filename = 'converted_' .$filerecord->filename;
    		/*
			$filerecord->filearea = 'draft';
			$filerecord->component = $dbf->component;
			$filerecord->filepath = $dbf->filepath;
			$filerecord->itemid   = $dbf->itemid;
			$filerecord->license  = $CFG->sitedefaultlicense;
			$filerecord->author   = 'Moodle User';
			$filerecord->contextid = $dbf->contextid;
			$filerecord->userid    = $dbf->userid;
			//$filerecord->source    = '';
			*/
    		
    		
    		
			$storedfile = convert_with_ffmpeg($filerecord, 
			 $cd->tempdir, 
			 $cd->tempfilename, 
			 $cd->convfilenamebase, 
			$cd->convext);
		}else{
			throw new file_exception('storedfileproblem', 'could not find ' . $cd->filename . ' in the DB.');
		}
		
		if($storedfile){
			$origfile->replace_file_with($storedfile);
			return;
		}else{
		  throw new file_exception('storedfileproblem', 'unable to convert ' . $cd->tempfilename);
		}
		
    }                                                                                                                               
} 
  