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
			$qsection = html_writer::tag('section',html_writer::tag('h2', $data->questiontext),
				array('data-background'=>'','class'=>'filter_poodll_revealjs_section filter_poodll_revealjs_section_front'));
			$asection = html_writer::tag('section',html_writer::tag('h2', $data->answertext),
				array('data-transition'=>'flip','data-background'=>'','class'=>'filter_poodll_revealjs_section filter_poodll_revealjs_section_back'));
			$cardsection = html_writer::tag('section',$qsection  .  $asection,
				array());
			$card_div_array[] = $cardsection;
		}
		$carddivs = implode(' ', $card_div_array);
      	$slides = html_writer::div($carddivs,'slides');
      	$previousbutton = html_writer::tag('a','previous',array('class'=>'filter_poodll_revealjs_previous btn btn-primary'));
      	$nextbutton = html_writer::tag('a','next',array('class'=>'filter_poodll_revealjs_next btn btn-primary'));
      	$buttons = html_writer::div($previousbutton . $nextbutton,'filter_poodll_revealjs_buttons');
		$reveal = html_writer::div($slides,'reveal filter_poodll_revealjs_container');
		
      	return $reveal . $buttons;
	
	}
  
}