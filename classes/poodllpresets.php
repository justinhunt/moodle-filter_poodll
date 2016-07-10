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

require_once($CFG->libdir . '/adminlib.php');

/**
 * No setting - just heading and text.
 *
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class poodllpresets extends \admin_setting {

	  /** @var mixed int index of template*/
    public $templateindex;
    /** @var array template data for spec index */
    public $presetdata;
    public $visiblename;
    public $information;

    /**
     * not a setting, just text
     * @param string $name unique ascii name, either 'mysetting' for settings that in config, or 'myplugin/mysetting' for ones in config_plugins.
     * @param string $heading heading
     * @param string $information text in box
     */
    public function __construct($name, $visiblename, $information,$templateindex,$presetdata=false) {
        $this->nosave = true;
        $this->templateindex = $templateindex;
        if(!$presetdata){
            $presetdata = self::fetch_presets();
        }
        $this->presetdata = $presetdata;
        $this->visiblename=$visiblename;
        $this->information=$information;
        parent::__construct($name, $visiblename, $information, '',$templateindex);
    }

    /**
     * Always returns true
     * @return bool Always returns true
     */
    public function get_setting() {
        return true;
    }

    /**
     * Always returns true
     * @return bool Always returns true
     */
    public function get_defaultsetting() {
        return true;
    }

    /**
     * Never write settings
     * @return string Always returns an empty string
     */
    public function write_setting($data) {
    // do not write any setting
        return '';
    }

    /**
     * Returns an HTML string
     * @return string Returns an HTML string
     */
    public function output_html($data, $query='') {
        global $PAGE;

        //build our select form
        $keys = array_keys($this->presetdata);
        $usearray = array();
        
        foreach($keys as $key){
        	$usearray[$key]=$this->presetdata[$key]['key'];
        }

		$presetsjson = json_encode($this->presetdata);
		$presetscontrol = \html_writer::tag('input', '', array('id' => 'id_s_filter_poodll_presetdata_' . $this->templateindex, 'type' => 'hidden', 'value' => $presetsjson));


		//Add javascript handler for presets
		$PAGE->requires->js_call_amd('filter_poodll/template_presets_amd',
		  	'init',array(array('templateindex'=>$this->templateindex)));

		$select = \html_writer::select($usearray,'filter_poodll/presets','','--custom--');
		
		$dragdropsquare = \html_writer::tag('div',get_string('bundle','filter_poodll'),array('id' => 'id_s_filter_poodll_dragdropsquare_' . $this->templateindex,
			'class' => 'filter_poodll_dragdropsquare'));
		
		return format_admin_setting($this, $this->visiblename,
			$dragdropsquare . '<div class="form-text defaultsnext">'. $presetscontrol . $select .  '</div>',
			$this->information, true, '','', $query);



	}
        
        protected static function parse_preset_template(\SplFileInfo $fileinfo){
            $file=$fileinfo->openFile("r");
            $content = "";
            while(!$file->eof()){
                $content .= $file->fgets();
            }
            $preset_object = json_decode($content);
            if($preset_object && is_object($preset_object)){
                return get_object_vars($preset_object);
            }else{
                return false;
            }
        }


        public static function fetch_presets(){          
            global $CFG;
			$ret = array();
                        $dir = new \DirectoryIterator($CFG->dirroot . '/filter/poodll/presets');
                        foreach($dir as $fileinfo){
                            if(!$fileinfo->isDot()){
                              $preset = self::parse_preset_template($fileinfo);
                              if($preset){
                                $ret[]=$preset;
                              }
                            }
                        }
                       return $ret;
	}//end of fetch presets function
}//end of class