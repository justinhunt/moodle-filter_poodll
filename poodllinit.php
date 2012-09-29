<?php

// This file is used to concatenate some of the filter settings
// This could probably be done elsewhere more efficiently,
// however being a rookie php guy I couldn't think of where.

// Formerly the configuration file for the early alpha
// versions of poodll.  Now most settings are stored in
// the CFG under the filter for poodll.

global $CFG;



// Setting up the PoodLL Media Server String
if($CFG->filter_poodll_serverport=='443' || $CFG->filter_poodll_serverport=='80' ){
	$protocol='rtmpt';
}else{
	$protocol='rtmp';
}

$CFG->poodll_media_server = $protocol . '://' . $CFG->filter_poodll_servername . ':' . $CFG->filter_poodll_serverport   . '/' . $CFG->filter_poodll_serverid;
