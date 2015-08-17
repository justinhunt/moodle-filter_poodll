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


defined('MOODLE_INTERNAL') || die();

/**
 * A custom renderer class that extends the plugin_renderer_base.
 *
 * @package filter_poodll
 * @copyright 2015 Justin Hunt (poodllsupport@gmail.com)
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class filter_poodll_renderer extends plugin_renderer_base {


	public function fetch_revealjs_flashcards($dataset){
		$card_div_array = array();
		foreach($dataset as $data){
			$qsection = html_writer::tag('section','<h2>' . $data->questiontext . '</h2>',
				array());
			$asection = html_writer::tag('section','<h2>' . $data->answertext . '</h2>',
				array());
			$cardsection = html_writer::tag('section',$qsection  .  $asection,
				array());
			$card_div_array[] = $cardsection;
		}
		$carddivs = implode(' ', $card_div_array);
      	$slides = html_writer::div($carddivs,'slides');
		$reveal = html_writer::div($slides,'reveal filter_poodll_revealjs_container');
      	return $reveal;
	
	}












		  /**
     * Returns the header for the module
     *
     * @param mod $instance
     * @param string $currenttab current tab that is shown.
     * @param int    $item id of the anything that needs to be displayed.
     * @param string $extrapagetitle String to append to the page title.
     * @return string
     */
    public function header($moduleinstance, $cm, $currenttab = '', $itemid = null, $extrapagetitle = null) {
        global $CFG;

        $activityname = format_string($moduleinstance->name, true, $moduleinstance->course);
        if (empty($extrapagetitle)) {
            $title = $this->page->course->shortname.": ".$activityname;
        } else {
            $title = $this->page->course->shortname.": ".$activityname.": ".$extrapagetitle;
        }

        // Build the buttons
        $context = context_module::instance($cm->id);

    /// Header setup
        $this->page->set_title($title);
        $this->page->set_heading($this->page->course->fullname);
        $output = $this->output->header();

        if (has_capability('mod/readaloud:manage', $context)) {
         //   $output .= $this->output->heading_with_help($activityname, 'overview', MOD_READALOUD_LANG);

            if (!empty($currenttab)) {
                ob_start();
                include($CFG->dirroot.'/mod/readaloud/tabs.php');
                $output .= ob_get_contents();
                ob_end_clean();
            }
        } else {
            $output .= $this->output->heading($activityname);
        }
	

        return $output;
    }
	
	/**
     * Return HTML to display limited header
     */
      public function notabsheader(){
      	return $this->output->header();
      }

	  
	  /**
     *
     */
      public function reattemptbutton($moduleinstance){
      
		$button = $this->output->single_button(new moodle_url(MOD_READALOUD_URL . '/view.php',
				array('n'=>$moduleinstance->id,'retake'=>1)),get_string('reattempt',MOD_READALOUD_FRANKY));
      	
      	$ret = html_writer::div($button ,MOD_READALOUD_CLASS  . '_afterattempt_cont');
      	return $ret;

      }
      
    /**
     *
     */
      public function exceededattempts($moduleinstance){
		$message = get_string("exceededattempts",MOD_READALOUD_LANG,$moduleinstance->maxattempts);
      	$ret = html_writer::div($message ,MOD_READALOUD_CLASS  . '_afterattempt_cont');
      	return $ret;

      }
	  
	  public function show_ungradedyet(){
		$message = get_string("notgradedyet",MOD_READALOUD_LANG);
      	$ret = html_writer::div($message ,MOD_READALOUD_CLASS  . '_ungraded_cont');
      	return $ret;
	  }
	  


    /**
     *
     */
    public function show_welcome($showtext, $showtitle) {
		$displaytext =  '<center>' . $this->output->heading($showtitle, 3, 'main') . '</center>'; 
		$displaytext .= $this->output->box_start();
		$displaytext .= $showtext;
		$displaytext .= $this->output->box_end();
		$ret= html_writer::div($displaytext,MOD_READALOUD_INSTRUCTIONS_CONTAINER,array('id'=>MOD_READALOUD_INSTRUCTIONS_CONTAINER));
        return $ret;
    }

	 /**
     *
     */
	public function show_intro($readaloud,$cm){
		$ret = "";
		if (trim(strip_tags($readaloud->intro))) {
			$ret .= $this->output->box_start('mod_introbox');
			$ret .= format_module_intro('readaloud', $readaloud, $cm->id);
			$ret .= $this->output->box_end();
		}
		return $ret;
	}
	
	
	 /**
     
     */
	public function show_passage($readaloud,$cm){
		
		$stop_button =  html_writer::tag('button',get_string('done', MOD_READALOUD_LANG),
				array('class'=>'btn btn-primary ' . MOD_READALOUD_STOP_BUTTON));
		$stop_button_cont= html_writer::div($stop_button,MOD_READALOUD_STOP_BUTTON_CONTAINER,array('id'=>MOD_READALOUD_STOP_BUTTON_CONTAINER));
		$ret = "";
		$ret .= html_writer::div( $readaloud->passage . $stop_button_cont,MOD_READALOUD_PASSAGE_CONTAINER,
							array('id'=>MOD_READALOUD_PASSAGE_CONTAINER));
		return $ret;
	}
	
		 /**
     *
     */
	public function show_progress($readaloud,$cm){
		$hider =  html_writer::div('',MOD_READALOUD_HIDER,array('id'=>MOD_READALOUD_HIDER));
		$message =  html_writer::tag('h4',get_string('processing',MOD_READALOUD_LANG),array());
		$spinner =  html_writer::tag('i','',array('class'=>'fa fa-spinner fa-5x fa-spin'));
		$progressdiv = html_writer::div($message . $spinner ,MOD_READALOUD_PROGRESS_CONTAINER,
							array('id'=>MOD_READALOUD_PROGRESS_CONTAINER));
		$ret = $hider . $progressdiv;
		return $ret;
	}
	
		 /**
     *
     */
	public function show_feedback($readaloud,$cm,$showtitle){
		$displaytext =  '<center>' . $this->output->heading($showtitle, 3, 'main') . '</center>'; 
		$displaytext .= $this->output->box_start();
		$displaytext .=  html_writer::div($readaloud->feedback,'',array());
		$displaytext .= $this->output->box_end();
		$ret= html_writer::div($displaytext,MOD_READALOUD_FEEDBACK_CONTAINER,array('id'=>MOD_READALOUD_FEEDBACK_CONTAINER));
        return $ret;
	}
	
		 /**
     *
     */
	public function show_error($readaloud,$cm){
		$displaytext = $this->output->box_start();
		$displaytext .= $this->output->heading(get_string('errorheader',MOD_READALOUD_LANG), 3, 'main');
		$displaytext .=  html_writer::div(get_string('uploadconverterror',MOD_READALOUD_LANG),'',array());
		$displaytext .= $this->output->box_end();
		$ret= html_writer::div($displaytext,MOD_READALOUD_ERROR_CONTAINER,array('id'=>MOD_READALOUD_ERROR_CONTAINER));
        return $ret;
	}
	
	/**
     *
     */
	public function show_button_recorder($readaloud,$cm){
		
		//buttons
		$rec_button =  html_writer::tag('button',get_string('recordnameschool',MOD_READALOUD_LANG),
				array('class'=>'btn btn-primary ' . MOD_READALOUD_RECORD_BUTTON));
		$start_button =  html_writer::tag('button',get_string('beginreading',MOD_READALOUD_LANG),
				array('class'=>'btn btn-primary ' . MOD_READALOUD_START_BUTTON, 'disabled'=>'true'));
		
		//recorder + instructions
		$recorderdiv= html_writer::div('',MOD_READALOUD_RECORDER_CONTAINER,
							array('id'=>MOD_READALOUD_RECORDER_CONTAINER));
		$dummyrecorderdiv= html_writer::div('',MOD_READALOUD_DUMMY_RECORDER . " " . MOD_READALOUD_DUMMY_RECORDER .'_hidden',
							array('id'=>MOD_READALOUD_DUMMY_RECORDER));
		$instructionsrightdiv= html_writer::div('' ,MOD_READALOUD_RECORDER_INSTRUCTIONS_RIGHT,
							array('id'=>MOD_READALOUD_RECORDER_INSTRUCTIONS_RIGHT));
		$instructionsleftdiv= html_writer::div('' ,MOD_READALOUD_RECORDER_INSTRUCTIONS_LEFT,
							array('id'=>MOD_READALOUD_RECORDER_INSTRUCTIONS_LEFT));
		$recordingdiv = html_writer::div($instructionsleftdiv . $recorderdiv . $dummyrecorderdiv . $instructionsrightdiv,MOD_READALOUD_RECORDING_CONTAINER);
		
		//prepare output
		$ret = "";
		$ret .=$recordingdiv;
		$ret .= html_writer::div($rec_button,MOD_READALOUD_RECORD_BUTTON_CONTAINER,array('id'=>MOD_READALOUD_RECORD_BUTTON_CONTAINER));
		$ret .= html_writer::div($start_button,MOD_READALOUD_START_BUTTON_CONTAINER,array('id'=>MOD_READALOUD_START_BUTTON_CONTAINER));

		
		//return it
		return $ret;
	}
  
}