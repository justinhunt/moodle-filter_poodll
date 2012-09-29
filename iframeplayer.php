<?php
//relative path is dangerous, so only use it if we have no $CFG already Justin 20120424
if(!isset($CFG)){
require_once("../../config.php");
}

require_once($CFG->dirroot . '/filter/poodll/poodllresourcelib.php');

global $PAGE, $USER;

//this doesnt seem to work here. So had to put an echos  below
//$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flash/embed-compressed.js'),true);
//$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flowplayer/flowplayer-3.2.9.min.js'),true);

// we get the request parameters:
$mediapath = optional_param('mediapath', '', PARAM_TEXT); // path to mediafile


// we output a simple HTML page with the poodll recorder code in it
//$PAGE->set_generaltype('popup');
$PAGE->set_context(get_context_instance(CONTEXT_USER, $USER->id));
//$PAGE->set_url($CFG->wwwroot.'/repository/poodll/iframeplayer.php', array('repo_id' => $repo_id));
$PAGE->set_url($CFG->wwwroot.'/repository/poodll/iframeplayer.php', null);
//print_header(null, get_string('recordnew', 'repository_poodll'),null, null, null, false);
?>

<div style="text-align: center;">
<?php if($mediapath!=''){
			
			echo "<script type=\"text/javascript\" src=\"{$CFG->wwwroot}/filter/poodll/flowplayer/flowplayer-3.2.9.min.js\"></script> ";
			echo "<script type=\"text/javascript\" src=\"{$CFG->wwwroot}/filter/poodll/flash/embed-compressed.js\"></script> ";
			echo fetchSimpleVideoPlayer('swf',"{$CFG->wwwroot}/{$CFG->filter_poodll_datadir}/" . $mediapath,400,350,"http");
		} 
?>
</div>
<?php
//$OUTPUT->footer();
//print_footer();
