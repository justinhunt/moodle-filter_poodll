<?php

/**
* internal library of functions and constants for Poodll modules
* accessed directly by poodll flash wdgets on web pages.
* @package mod-poodllpairwork
* @category mod
* @author Justin Hunt
*
*/


/**
* Includes and requires
*/
require_once("../../../config.php");
global $CFG;

	$widget = optional_param('widget', "", PARAM_TEXT);    // The widget
	$paramstring  = optional_param('paramstring', "", PARAM_TEXT);  // the string of paramaters 
	$width  = optional_param('width', 0, PARAM_INT);  // the width of frame 
	$height  = optional_param('height', 0, PARAM_INT);  // the height of widget
	$bgcolor  = optional_param('bgcolor', "#FFFFFF", PARAM_TEXT);  // the bg color

	header("Content-type: text/html");
	echo "<html><head>";
	echo "<style type=\"text/css\">html, body { padding:0; margin:0; } </style>";
	echo "</head><body>";
	echo fetchSWFWidgetCode($widget,$paramstring,$width,$height, $bgcolor);
	echo "</body></html>";
	return;

//This is used for all the flash widgets
function fetchSWFWidgetCode($widget,$params,$width,$height, $bgcolor="#FFFFFF"){
	global $CFG;
	
	//build the parameter string out of the passed in array

	
	//add in any common params
	$params .= '&debug=false&lzproxied=false'; 
	
	//if we wish to pass in more common params, here is the place
	//eg. $params .= '&modulename=' . $PAGE->cm->modname;

	//embed js library for OpenLaszlo
	$embedcode = "<script type=\"text/javascript\" src=\"{$CFG->wwwroot}/filter/poodll/flash/embed-compressed.js\"></script> ";

	
	$retcode = "
        <table><tr><td>
        <script type=\'text/javascript\'>
            lzOptions = { ServerRoot: \'\'};
        </script> 
       " . $embedcode . "
        <script type=\"text/javascript\">
" . '	lz.embed.swf({url: \'' . $CFG->wwwroot . '/filter/poodll/flash/' . $widget . $params . 
		 '\', bgcolor: \'' . $bgcolor . '\', cancelmousewheel: true, allowfullscreen: true, width: \'' .$width . '\', height: \'' . $height . '\', id: \'lzapp_' . rand(100000, 999999) . '\', accessible: \'false\'});	
		
' . "
        </script>
        <noscript>
            Please enable JavaScript in order to use this application.
        </noscript>
        </td></tr>
		</table>";
		
		return $retcode;

}
	
?>
