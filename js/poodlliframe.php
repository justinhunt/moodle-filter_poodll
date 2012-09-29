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
	$usemastersprite  = optional_param('usemastersprite', "false", PARAM_TEXT);  // to use embedded resources aka sprite sheet(probably never)

	header("Content-type: text/html");
	echo "<html><head>";
	echo "<!--[if IE]><script type=\"text/javascript\" src=\"" . $CFG->wwwroot . "/filter/poodll/js/lps/includes/excanvas.js\" ></script><![endif]-->";
	echo "</head><body>";
	echo fetchJSWidgetCode($widget,$paramstring,$width,$height, $bgcolor, $usemastersprite);
	echo "</body></html>";
	return;


function fetchJSWidgetCode($widget,$params,$width,$height, $bgcolor="#FFFFFF", $usemastersprite="false"){
	global $CFG;
	
	//add in any common params
	$params .= '&debug=false&lzproxied=false'; 
	
	//path to our js idgets folder
	$pathtoJS = $CFG->wwwroot . '/filter/poodll/js/';
	$pathtowidgetfolder = $CFG->wwwroot . '/filter/poodll/js/' . $widget . '/';
	
	//if we wish to pass in more common params, here is the place
	//eg. $params .= '&modulename=' . $PAGE->cm->modname;
	


     $retcode =   "<script type=\"text/javascript\" src=\"{$pathtoJS}lps/includes/embed-compressed.js\"></script>
        <script type=\"text/javascript\" >
" . '	lz.embed.dhtml({url: \'' . $pathtowidgetfolder . $widget . $params . 
		 '\', bgcolor: \'' . $bgcolor . '\', width: \'' .$width . '\', usemastersprite: ' . $usemastersprite . ', ' . 
		 'approot: \'' . $pathtowidgetfolder  . '\', ' .
		 'height: \'' . $height . '\', ' .
		 'lfcurl: \'' . $pathtoJS . 'lps/includes/lfc/LFCdhtml.js\', ' .
		 'serverroot: \'' . $pathtoJS . 'lps/resources/\', ' .
		 'accessible: \'false\', cancelmousewheel: false, cancelkeyboardcontrol: false, skipchromeinstall: false, ' .
		 ' id: \'lzapp_' . rand(100000, 999999) . '\' ,accessible: \'false\'});	
		 
		 
		
' . "
        </script>
        <noscript>
            Please enable JavaScript in order to use this application.
        </noscript>
";
		
		return $retcode;


}

	
?>
