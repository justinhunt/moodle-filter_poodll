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

namespace filter_poodll;

defined('MOODLE_INTERNAL') || die();

/**
 * No setting - just heading and text.
 *
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class diagnosticstools {
	
	private $ds = null;

    /**
	*
     */
    public function __construct() {
		$this->ds = new \stdClass();
		$this->ds->properties = $this->compile_properties();
		$this->ds->logs = $this->compile_logs();
    }
	
	public function fetch_props(){
		return $this->ds->properties;
	}
	
	public function fetch_logs(){
		return $this->ds->logs;
	}
	
	public function compile_logs(){
		return new \stdClass();
	}
	
	public function compile_properties(){
		global $CFG, $DB;
		
		$ds = Array();
		
		//general version info
		$ds['moodle_version'] = $CFG->version;
		$ds['os_version']= 0;
		
		//poodll version info
		$ds['poodll_filter_version'] = get_config('filter_poodll','version');
		$ds['poodll_atto_version'] = get_config('atto_poodll','version');
		$ds['poodll_tinymce_version'] = get_config('tinymce_poodll','version');
		$ds['assignsubmission_onlinepoodll_version'] = get_config('assignsubmission_onlinepoodll','version');
		$ds['assignfeedback_poodll_version'] = get_config('assignfeedback_poodll','version');
		$ds['qtype_poodllrecording_version'] = get_config('qtype_poodllrecording','version');
		$ds['data_field_version'] = get_config('datafield_poodll','version');
		$ds['repository_poodll'] = get_config('repository_poodll','version');
		
		//license info
		if($CFG && property_exists($CFG,'filter_poodll_registrationkey') && !empty($CFG->filter_poodll_registrationkey)){
			$lm = new \filter_poodll\licensemanager();
			$lm->validate_registrationkey($CFG->filter_poodll_registrationkey);
			$license_details = $lm->fetch_license_details();
			$display_license_details = get_string('license_details', 'filter_poodll',$license_details);
		}else{
			$display_license_details="";
		}
		$ds['license_details'] = $display_license_details;
	
		//site info
		$ds['wwwroot'] = $CFG->wwwroot;
		$ds['dirroot'] = $CFG->dirroot;
		$ds['maxupload'] = $CFG->maxbytes;
		$ds['cronclionly'] = $CFG->cronclionly;
		$ds['suhosin'] = extension_loaded('suhosin'); //this is not working what "name"?
		
		//site setting info
		$ds['currenttheme']= \core_useragent::get_device_type_theme('default');
		$ds['cachejs']= $CFG->cachejs;
		$ds['debug']= $CFG->debug;
		
		//cron info
		$lastcron = $DB->get_field_sql('SELECT MAX(lastruntime) FROM {task_scheduled}');
		$now = time(); 
		$minutessincecron = "--";
		$secondssincecron = "--";
		if($lastcron > 0){
			$minutessincecron = round(($now - $lastcron)  / 60,0); //on a plane, using round, what is PHP for flat()
			$secondssincecron = ($now - $lastcron)  % 60;
		}
		$ds['lastcron']= $lastcron;
		$ds['timesincecron']= $minutessincecron . ' mins ' . $secondssincecron . ' secs';
		
		
		//poodll setting info		
		$ds['cloudrecording']=$CFG->filter_poodll_cloudrecording;
		$ds['filter_poodll_recorderorder']=$CFG->filter_poodll_recorderorder;
		$ds['filter_poodll_mp3recorder_nocloud']=$CFG->filter_poodll_mp3recorder_nocloud;
		$ds['filter_poodll_videotranscode']=$CFG->filter_poodll_videotranscode;
		$ds['filter_poodll_audiotranscode']=$CFG->filter_poodll_audiotranscode;
		$ds['filter_poodll_ffmpeg']=$CFG->filter_poodll_ffmpeg;
		$ds['filter_poodll_bgtranscode_video']=$CFG->filter_poodll_bgtranscode_video;
		$ds['filter_poodll_bgtranscode_audio']=$CFG->filter_poodll_bgtranscode_audio;
		$ds['extensions']=get_config('filter_poodll','extensions');
		$ds['handlemp3']=get_config('filter_poodll','handlemp3');
		$ds['handlemp4']=get_config('filter_poodll','handlemp4');
		$ds['handlewebm']=get_config('filter_poodll','handlewebm');
		$ds['handleyoutube']=get_config('filter_poodll','handleyoutube');
		$ds['useplayermp3']=get_config('filter_poodll','useplayermp3');
		$ds['useplayermp4']=get_config('filter_poodll','useplayermp4');
		$ds['useplayerwebm']=get_config('filter_poodll','useplayerwebm');
		$ds['useplayertube']=get_config('filter_poodll','useplayeryoutube');
		
		
		//filter setting info	
		foreach (\core_component::get_plugin_list('filter') as $plugin => $unused) {
            $ds['installed_filter_' . $plugin] = filter_get_name($plugin);
        }
	
		return $ds;
	}
	
}//end of class