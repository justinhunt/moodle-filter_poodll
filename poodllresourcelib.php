<?php  // $Id: poodllresourcelib.php,v 1.119.2.13 2008/07/10 09:48:44 scyrma Exp $
/**
 * Code for PoodLL clients(widgets), in particular filter setup and plumbing.
 *
 *
 * @author Justin Hunt
 * @license http://www.gnu.org/copyleft/gpl.html GNU Public License
 */

/**
 * Show a mediaplayer loaded with a media
 *
 * @param integer $mediaid The id of the media to show
 */
 
define('TEACHERSTREAMNAME','voiceofauthority');
//some constants for the type of media  resource
define('MR_TYPEVIDEO',0);
define('MR_TYPEAUDIO',1);
define('MR_TYPETALKBACK',2);
 
require_once($CFG->dirroot . '/filter/poodll/poodllinit.php');
require_once($CFG->dirroot . '/filter/poodll/Browser.php');
//added Justin 20120424 
//unadded Justin 20120508 caused problems in repository and I guess elsewhere too ... need to investigate.
//require_once($CFG->dirroot . '/filter/poodll/poodlllogiclib.php');

global $PAGE,$FPLAYERJSLOADED;
//$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/mod/assignment/type/poodllonline/swfobject.js'));
//$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/mod/assignment/type/poodllonline/javascript.php'));
//these could be called with the head flag set to true, (see flowplayer eg below) and remove from
//other functions in this file. needs testing though. Justin 20120604
$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flash/swfobject.js'));
$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flash/javascript.php'));
$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flash/embed-compressed.js'));

//we need this for flowplayer and it only works in head (hence the 'true' flag)
//BUT in quizzes , with only student role, header is output before this point for some reason
//so we need to set a flag to tell flowplayer function (way below) to load it, but just once, hence the global Justin 20120704
if(!$PAGE->requires->is_head_done()){
	$PAGE->requires->js(new moodle_url($CFG->httpswwwroot .'/filter/poodll/flowplayer/flowplayer-3.2.9.min.js'),true);
	$FPLAYERJSLOADED=true;
}else{
	$FPLAYERJSLOADED=false;
}

//added for moodle 2
require_once($CFG->libdir . '/filelib.php');


function fetch_slidemenu($runtime){
	global $CFG, $USER, $COURSE;

	if (!empty($USER->username)){
		$mename=$USER->username;
	}else{
		$mename="guest_" + rand(100000, 999999);
	}

	$flvserver = $CFG->poodll_media_server;
	$homeurl = $CFG->wwwroot ;
	$courseid =$COURSE->id;

	

		$partone= '<script type="text/javascript">
						lzOptions = { ServerRoot: \'\'};
				</script>';
		$parttwo = '<script type="text/javascript" src="' . $CFG->wwwroot . '/filter/poodll/flash/embed-compressed.js"></script>';
		$partthree =	'<script type="text/javascript">
				lz.embed.swf({url: \'' . $CFG->wwwroot . '/filter/poodll/flash/slidemenu.lzx.swf9.swf?bcolor=0xFF0000&lzproxied=false&slidewidth=247&slideheight=96&red5url='.urlencode($flvserver). 
							'&homeurl=' . $homeurl .  '&courseid=' . $courseid .  
							'&lzproxied=false\', bgcolor: \'#cccccc\', width: \'400\', height: \'96\', id: \'lzapp_slide_' . rand(100000, 999999) . '\', accessible: \'false\'});       
			</script>
			<noscript>
				Please enable JavaScript in order to use this application.
			</noscript>';
		
		return $partone . $parttwo . $partthree;

}


function fetch_poodllconsole($runtime, $coursedataurl="",$mename="", $courseid=-1, $embed=false){
	global $CFG, $USER, $COURSE;
	
	$broadcastkey="1234567";

	//Set the camera prefs
	$capturewidth=$CFG->filter_poodll_capturewidth;
	$captureheight=$CFG->filter_poodll_captureheight;
	$capturefps=$CFG->filter_poodll_capturefps;
	$prefcam=$CFG->filter_poodll_screencapturedevice;
	$prefmic=$CFG->filter_poodll_studentmic;
	$bandwidth=$CFG->filter_poodll_bandwidth;
	$picqual=$CFG->filter_poodll_picqual; 
	$cameraprefs= '&capturefps=' . $capturefps . '&captureheight=' . $captureheight . '&picqual=' . $picqual . '&bandwidth=' . $bandwidth . '&capturewidth=' . $capturewidth .   '&prefmic=' . $prefmic . '&prefcam=' . $prefcam;
	$flvserver = $CFG->poodll_media_server;
	$teacherpairstreamname="voiceofauthority";


	if ($mename=="" && !empty($USER->username)){
		$mename=$USER->username;
		$mefullname=fullname($USER);
		$mepictureurl=fetch_user_picture($USER,35);
	}

	//if courseid not passed in, try to get it from global
	if ($courseid==-1){
		$courseid=$COURSE->id;
	}
	
	//put in a coursedataurl if we need one
	if ($coursedataurl=="") $coursedataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php%3F';
	
	
	//Show the buttons window if we are admin
	//Also won't receive messages intended for students if we are admin. Be aware.
	if (has_capability('mod/quiz:preview', get_context_instance(CONTEXT_COURSE, $COURSE->id))){		
		$am="admin";
	}else{
		$am="0";
	}


		//here we setup the url and params for the admin console
		$baseUrl = $CFG->wwwroot . '/filter/poodll/flash/poodllconsole.lzx.swf9.swf';
		$params= '?red5url='.urlencode($flvserver). 
							'&mename=' . $mename . '&courseid=' . $courseid .  
							'&teacherpairstreamname=' . $teacherpairstreamname . 
							$cameraprefs .
							'&coursedataurl=' . $coursedataurl . '&broadcastkey=' . $broadcastkey .
							'&lzr=swf9&runtime=swf9';

		//if we are embedding, here we wrap the url and params in the necessary javascript tags
		//otherwise we just return the url and params.
		//embed code is called from poodlladminconsole.php
		if($embed){
				$partone= '<script type="text/javascript">lzOptions = { ServerRoot: \'\'};</script>';
				$parttwo = '<script type="text/javascript" src="' . $CFG->wwwroot . '/filter/poodll/flash/embed-compressed.js"></script>';
				$partthree='<script type="text/javascript">lz.embed.swf({url: \'' . $baseUrl . $params. 
						'\' , width: \'1000\', height: \'750\', id: \'lzapp_admin_console\', accessible: \'false\'});
							</script>
						<noscript>
							Please enable JavaScript in order to use this application.
						</noscript>';
				return $partone . $parttwo . $partthree;
		}else{
			return $baseUrl . $params;					
		}				

}

function fetch_poodllheader($runtime){
	global $CFG, $USER, $COURSE;

	if (!empty($USER->username)){
		$mename=$USER->username;
	}else{
		$mename="guest_" + rand(100000, 999999);
	}
	$coursedataurl=$CFG->wwwroot . "/filter/poodll/poodlllogiclib.php";
	$flvserver = $CFG->poodll_media_server;
	$bcsturl =urlencode(fetch_screencast_subscribe($runtime,$mename));
	//$clnturl =urlencode(fetch_clientconsole($coursedataurl,,false));
	$clnturl =urlencode($CFG->wwwroot . '/lib/' . 'poodllclientconsole.php?coursedataurl=' . urlencode($coursedataurl) . '&courseid=' . $COURSE->id);
	$bcstadmin =urlencode(fetch_screencast_broadcast($runtime,$mename));
	$pairsurl =urlencode(fetch_pairclient($runtime,$mename));
	$interviewurl=urlencode(fetch_interviewclient($runtime,$mename));
	$jumpurl=urlencode(fetch_jumpmaker($runtime,$mename));
	$showwidth=$CFG->filter_poodll_showwidth;
	$showheight=$CFG->filter_poodll_showheight;
	
	//Show the buttons window if we are admin
	//Also won't receive messages intended for students if we are admin. Be aware.
	if (has_capability('mod/quiz:preview', get_context_instance(CONTEXT_COURSE, $COURSE->id))){		
		$am="admin";
	}else{
		$am="0";
	}

		$partone= '<script type="text/javascript">
						lzOptions = { ServerRoot: \'\'};
				</script>';
		$parttwo = '<script type="text/javascript" src="' . $CFG->wwwroot . '/filter/poodll/flash/embed-compressed.js"></script>';
		$partthree =	'<script type="text/javascript">
				lz.embed.swf({url: \'' . $CFG->wwwroot . '/filter/poodll/flash/poodllheader.lzx.swf9.swf?bcolor=0xFF0000&lzproxied=false&red5url='.urlencode($flvserver). 
							'&mename=' . $mename . '&courseid=' . $COURSE->id .  '&clnturl=' . $clnturl . '&bcsturl=' . $bcsturl . '&bcstadmin=' . $bcstadmin . '&pairsurl=' . $pairsurl . '&interviewurl=' . $interviewurl . '&jumpurl=' . $jumpurl . '&broadcastheight=' . $showheight . 
							'&lzproxied=false\', bgcolor: \'#cccccc\', width: \'2\', height: \'2\', id: \'lzapp_poodllheader_' . rand(100000, 999999) . '\', accessible: \'false\'});       
			</script>
			<noscript>
				Please enable JavaScript in order to use this application.
			</noscript>';
		
		return $partone . $parttwo . $partthree;

}


//this is the code to get the embed code for the poodllpairwork client
//We separate the embed and non embed into two functions 
//unlike with clientconsole and adminconsole, because of the need for width and height params.
function fetch_embeddablepairclient($runtime, $width,$height,$chat,$whiteboard, $showvideo,$whiteboardback,$useroles=false){
global $CFG;
//laszlo client expects "true" or "false"  so this line is defunct. Thoug we need to standardise how we do this. 
//$showvideo = ($showvideo=="true");
 return('
        <script type="text/javascript">
            lzOptions = { ServerRoot: \'\'};
        </script>
        <script type="text/javascript" src="' . $CFG->wwwroot . '/filter/poodll/flash/embed-compressed.js"></script>
        <script type="text/javascript">
              lz.embed.swf({url: \'' . fetch_pairclient($runtime,$chat,$whiteboard, $showvideo,$whiteboardback,$useroles) . '\', bgcolor: \'#cccccc\', width: \''. $width . '\', height: \'' . $height .'\', id: \'lzapp_' . rand(100000, 999999) . '\', accessible: \'false\'});
        </script>
        <noscript>
            Please enable JavaScript in order to use this application.
        </noscript>
        ');      

}

//this is the code to get a poodllpairwork client for display without embedding
//in the poodll header section of a moodle page as an inline page, or in a popup
function fetch_pairclient($runtime, $chat=true, $whiteboard=true, $showvideo=false,$whiteboardback="", $useroles=false){
	global $CFG, $USER, $COURSE;
	
	if (!empty($USER->username)){
		$mename=$USER->username;
		$mefullname=fullname($USER);
		$mepictureurl=fetch_user_picture($USER,120);
	}else{
		//this is meaningless currently, there is no current way to do pairs
		//with guest. Lets call it "casual poodllpairwork." Butin future it is possible
		$mename="guest_" + rand(100000, 999999);
		$mefullname="guest";
		$mepictureurl="";
	}
	
	//Set the servername
	$flvserver = $CFG->poodll_media_server;
	


	$baseUrl = $CFG->wwwroot . '/filter/poodll/flash/newpairclient.lzx.swf9.swf';
	$params = '?red5url='.urlencode($flvserver) . '&mename=' . $mename . '&mefullname=' . $mefullname . '&mepictureurl=' . $mepictureurl 
			. '&chat=' . $chat  . '&useroles=' . $useroles  . '&whiteboard=' . $whiteboard . '&whiteboardback=' . $whiteboardback . '&showvideo=' . $showvideo  . '&courseid=' . $COURSE->id .'&teacherallstreamname=voiceofauthority&lzproxied=false';
	return $baseUrl . $params;	
}

//this is a stub which we will need to fill in later 
//with the real code
function fetch_interviewclient($runtime){
	return "";
}

//this is a stub which we will need to fill in later 
//with the real code
function fetch_jumpmaker($runtime){
	global $CFG, $USER;
	
	if (!empty($USER->username)){
		$mename=$USER->username;
	}else{
		$mename="guest_" + rand(100000, 999999);
	}
	
	//Set the servername
	$flvserver = $CFG->poodll_media_server;


	$baseUrl = $CFG->wwwroot . '/filter/poodll/flash/jumpmaker.lzx.swf';
	$params = '?red5url='.urlencode($flvserver) . '&mename=' . $mename;
	return $baseUrl . $params;	
}

function fetch_poodllpalette($runtime, $width=800, $height=300){
global $CFG, $USER, $COURSE;
//Set the servername
$flvserver = $CFG->poodll_media_server;
$width=800;

//$coursefilesurl = $CFG->wwwroot . '/lib/editor/htmlarea/poodll-coursefiles.php?id=' . $COURSE->id;
// The ID of the current module (eg moodleurl/view.php?id=X ) or in edit mode update=X
$moduleid = optional_param('update', "-1", PARAM_INT);    
if($moduleid==-1) {$moduleid = optional_param('id', "-1", PARAM_INT); }
$coursefilesurl = $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php?courseid=' . $COURSE->id . '&datatype=instancedirlist&paramone=ignore&paramtwo=content&moduleid=' . $moduleid;

$componentlist = $CFG->wwwroot . '/filter/poodll/flash/componentlist.xml';
$poodlllogicurl = $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php';

//Set the camera prefs
$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight=$CFG->filter_poodll_captureheight;
$capturefps=$CFG->filter_poodll_capturefps;
$prefcam=$CFG->filter_poodll_studentcam;
$prefmic=$CFG->filter_poodll_studentmic;
$bandwidth=$CFG->filter_poodll_bandwidth;
$picqual=$CFG->filter_poodll_picqual; 
$cameraprefs= '&capturefps=' . $capturefps . '&captureheight=' . $captureheight . '&picqual=' . $picqual . '&bandwidth=' . $bandwidth . '&capturewidth=' . $capturewidth .   '&prefmic=' . $prefmic . '&prefcam=' . $prefcam;




		//merge config data with javascript embed code
		$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['poodlllogicurl'] =  $poodlllogicurl . $cameraprefs ;
		$params['courseid'] = $COURSE->id;
		$params['filename'] = 'amediafile';
		$params['coursefiles'] = urlencode($coursefilesurl) ;
		$params['componentlist'] = urlencode($componentlist);

		
	
    	$returnString=  fetchSWFWidgetCode('poodllpalette.lzx.swf10.swf',
    						$params,$width,$height,'#FFFFFF');

    						
    	return $returnString ;
		

}


function fetch_screencast_subscribe($runtime, $mename="", $embed=false, $width=600, $height=350,$broadcastkey="1234567"){
global $CFG, $USER, $COURSE;
//Set the servername
$flvserver = $CFG->poodll_media_server;


//get my name
if($mename==""){$mename=$USER->username;}

//Set  the display sizes
$showwidth=$width;
if($showwidth==0){$showwidth=$CFG->filter_poodll_showwidth;}

$showheight=$height;
if($showheight==0){$showheight=$CFG->filter_poodll_showheight;}

//get the main url of the screensubcribe client
$baseUrl = $CFG->wwwroot . '/filter/poodll/flash/screensubscribe.lzx.swf9.swf';
$params = '?red5url='.urlencode($flvserver). '&broadcastkey='.$broadcastkey. '&showwidth='.$showwidth. '&showheight='.$showheight.'&courseid='.$COURSE->id  .'&mename='.$mename;
//return $baseUrl . $params;	

	//if necessary return the embed code, otherwise just return the url
	if (!$embed){
		return $baseUrl . $params;
	}else{
	 return('
			<script type="text/javascript">
				lzOptions = { ServerRoot: \'\'};
			</script>
			<script type="text/javascript" src="' . $CFG->wwwroot . '/filter/poodll/flash/embed-compressed.js"></script>
			<script type="text/javascript">
				  lz.embed.swf({url: \'' . $baseUrl . $params . '\', bgcolor: \'#cccccc\', width: \''. ($showwidth+10) . '\', height: \'' . ($showheight+10) .'\', id: \'lzapp_screensubscribe_' . rand(100000, 999999) . '\', accessible: \'false\'});
			</script>
			<noscript>
				Please enable JavaScript in order to use this application.
			</noscript>
			'); 	
	}

}
function fetch_screencast_broadcast($runtime, $mename){
global $CFG, $USER, $COURSE;

//Set the servername
$flvserver = $CFG->poodll_media_server;
$broadcastkey="1234567";
$capturedevice = $CFG->filter_poodll_screencapturedevice;

	$baseUrl = $CFG->wwwroot . '/filter/poodll/flash/screenbroadcast.lzx.swf';
	$params = '?red5url='.urlencode($flvserver). '&broadcastkey='.$broadcastkey. '&capturedevice='.$capturedevice. '&mename='.$mename;
	return $baseUrl . $params;	
}
 
function fetch_teachersrecorder($runtime, $filename="", $updatecontrol){
global $CFG, $USER, $COURSE;

//Set the servername
$flvserver = $CFG->poodll_media_server;
if ($filename == ""){
 $filename = $CFG->filter_poodll_filename;
 }

//Set the camera prefs
$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight=$CFG->filter_poodll_captureheight;
$capturefps=$CFG->filter_poodll_capturefps;
$prefcam=$CFG->filter_poodll_studentcam;
$prefmic=$CFG->filter_poodll_studentmic;
$bandwidth=$CFG->filter_poodll_bandwidth;
$picqual=$CFG->filter_poodll_picqual; 
$cameraprefs= '&capturefps=' . $capturefps . '&captureheight=' . $captureheight . '&picqual=' . $picqual . '&bandwidth=' . $bandwidth . '&capturewidth=' . $capturewidth .   '&prefmic=' . $prefmic . '&prefcam=' . $prefcam;
 
 
//If we are using course ids then lets do that
//else send -1 to widget (ignore flag)
if ($CFG->filter_poodll_usecourseid){
	$courseid = $COURSE->id;
}else{
	$courseid = -1;
}

	//merge config data with javascript embed code
		$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['updatecontrol'] = $updatecontrol;
		$params['course'] = $courseid;
		$params['filename'] = $filename . $cameraprefs;
	
		
		
	
    	$returnString=  fetchSWFWidgetCode('PoodLLTeachersRecorder.lzx.swf9.swf',
    						$params,$CFG->filter_poodll_talkbackwidth,$CFG->filter_poodll_talkbackheight,'#CCCCCC');

    						
    	return $returnString ;


}



function fetch_whiteboard($runtime, $boardname, $imageurl="", $slave=false,$rooms="", $width=600,$height=350, $mode='normal',$standalone='false'){
global $CFG, $USER,$COURSE;

//Set the servername 
$flvserver = $CFG->poodll_media_server;



//If standalone, then lets standalonify it
if($standalone == 'true'){
	$boardname="solo";
}


//Determine if we are admin, if necessary , for slave/master mode
	if ($slave && has_capability('mod/quiz:preview', get_context_instance(CONTEXT_COURSE, $COURSE->id))){		
		$slave=false;
	}

//whats my name...? my name goddamit, I can't remember  N A mm eeeE
$mename=$USER->username;		

	//merge config data with javascript embed code
		$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['mename'] = $mename;
		$params['boardname'] = $boardname;
		$params['imageurl'] = $imageurl;
		$params['courseid'] = $COURSE->id;
		$params['rooms'] = $rooms;

		//Are  we merely a slave to the admin whiteboard ?
		if ($slave){
			$widgetstring=  fetchSWFWidgetCode('scribbleslave.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
		}else{
			//normal mode is a standard scribble with a cpanel
			//simple mode has a simple double click popup menu
			if ($mode=='normal'){
					if($runtime=='js'){
						$widgetstring=  fetchJSWidgetCode('scribbler.lzx.js',
									$params,$width,$height,'#FFFFFF'); 
					}elseif($runtime=='auto'){
						$widgetstring=  fetchAutoWidgetCode('scribbler.lzx.swf9.swf',
									$params,$width,$height,'#FFFFFF'); 
					}else{
						$widgetstring=  fetchSWFWidgetCode('scribbler.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
					}
			}else{
					if($runtime=='js'){
						$widgetstring=  fetchJSWidgetCode('simplescribble.lzx.js',
									$params,$width,$height,'#FFFFFF'); 
					}elseif($runtime=='auto'){
						$widgetstring=  fetchAutoWidgetCode('simplescribble.lzx.swf9.swf',
									$params,$width,$height,'#FFFFFF'); 
					}else{
						$widgetstring=  fetchSWFWidgetCode('simplescribble.lzx.swf9.swf',
								$params,$width,$height,'#FFFFFF');
					}
				
			}
		}
		
		return $widgetstring;
		
	
}



function fetchTalkbackPlayer($runtime, $descriptor_file, $streamtype="rtmp",$recordable="false",$savefolder="default"){
global $CFG, $USER,$COURSE;

//Set the servername 
$flvserver = $CFG->poodll_media_server;

//for now these are fixed, but in future we might add the assignment id to the fileroot and turn off the randomnames
//then it would be reviewable again in the future by the students.
$fileroot= "moddata/talkbackstreams/"  . $savefolder;
if($CFG->filter_poodll_overwrite){
		$randomfnames="false";
	}else{
		$randomfnames="true";
	}


//We need a filepath stub, just in case for http streaming
//and for fetching splash screens from data directory
//We also need a stub for course id, 0 if we are not using it.
//If we are recording we need an rtmp stream
//and that needs to know the course id (or lack of)

if ($CFG->filter_poodll_usecourseid){
	$basefile= $CFG->wwwroot . "/file.php/" .  $COURSE->id . "/" ;
	$courseid=$COURSE->id . "/";
}else{
	$basefile= $CFG->wwwroot . "/file.php/" ;
	$courseid="";
}

		//merge config data with javascript embed code
		$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['basefile'] = $basefile;
		$params['recordable'] = $recordable;
		$params['fileroot'] = $fileroot;
		$params['randomfnames'] = $randomfnames;
		$params['courseid'] = $courseid;
		$params['username'] = $USER->id;
		$params['streamtype'] = $streamtype;
		$params['mediadescriptor'] = $basefile . $descriptor_file;
		
	
    	$returnString=  fetchSWFWidgetCode('talkback.lzx.swf9.swf',
    						$params,$CFG->filter_poodll_talkbackwidth,$CFG->filter_poodll_talkbackheight,'#FFFFFF');

    						
    	return $returnString ;
		

}

function fetchSimpleAudioRecorder($runtime, $assigname, $userid="", $updatecontrol="saveflvvoice", $filename="",$width="430",$height="220"){
global $CFG, $USER, $COURSE, $PAGE;

//Set the servername 
$flvserver = $CFG->poodll_media_server;
	
//Set the microphone config params
$micrate = $CFG->filter_poodll_micrate;
$micgain = $CFG->filter_poodll_micgain;
$micsilence = $CFG->filter_poodll_micsilencelevel;
$micecho = $CFG->filter_poodll_micecho;
$micloopback = $CFG->filter_poodll_micloopback;
$micdevice = $CFG->filter_poodll_studentmic;

	
	

//If we are using course ids then lets do that
//else send -1 to widget (ignore flag)
if ($CFG->filter_poodll_usecourseid){
	$courseid = $COURSE->id;
}else{
	$courseid = -1;
}

//set up auto transcoding (mp3) or not
if($CFG->filter_poodll_audiotranscode){
	$saveformat = "mp3";
}else{
	$saveformat = "flv";
}

//If no user id is passed in, try to get it automatically
//Not sure if  this can be trusted, but this is only likely to be the case
//when this is called from the filter. ie not from an assignment.
if ($userid=="") $userid = $USER->username;

//Stopped using this 
//$filename = $CFG->filter_poodll_filename;
 $overwritemediafile = $CFG->filter_poodll_overwrite==1 ? "true" : "false" ;
if ($updatecontrol == "saveflvvoice"){
	$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
}else{
	$savecontrol = "";
}

$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['overwritefile'] = $overwritemediafile;
		$params['rate'] = $micrate;
		$params['gain'] = $micgain;
		$params['prefdevice'] = $micdevice;
		$params['loopback'] = $micloopback;
		$params['echosupression'] = $micecho;
		$params['silencelevel'] = $micsilence;
		$params['filename'] = "123456.flv";
		$params['assigName'] = $assigname;
		$params['course'] = $courseid;
		$params['updatecontrol'] = $updatecontrol;
		$params['saveformat'] = $saveformat;
		$params['uid'] = $userid;
	
    	$returnString=  fetchSWFWidgetCode('PoodLLAudioRecorder.lzx.swf9.swf',
    						$params,$width,$height,'#CFCFCF');
    						
    	$returnString .= 	 $savecontrol;
    						
    	return $returnString ;

}


function fetchAudioRecorderForSubmission($runtime, $assigname, $updatecontrol="saveflvvoice", $contextid,$component,$filearea,$itemid){
global $CFG, $USER, $COURSE;

//Set the servername 
$flvserver = $CFG->poodll_media_server;
//Set the microphone config params
$micrate = $CFG->filter_poodll_micrate;
$micgain = $CFG->filter_poodll_micgain;
$micsilence = $CFG->filter_poodll_micsilencelevel;
$micecho = $CFG->filter_poodll_micecho;
$micloopback = $CFG->filter_poodll_micloopback;
$micdevice = $CFG->filter_poodll_studentmic;

//removed from params to make way for moodle 2 filesystem params Justin 20120213
$userid="dummy";
$width="430";
$height="220";
$filename="12345"; 
$poodllfilelib= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';

//If we are using course ids then lets do that
//else send -1 to widget (ignore flag)
if ($CFG->filter_poodll_usecourseid){
	$courseid = $COURSE->id;
}else{
	$courseid = -1;
} 

//set up auto transcoding (mp3) or not
if($CFG->filter_poodll_audiotranscode){
	$saveformat = "mp3";
}else{
	$saveformat = "flv";
}

//If no user id is passed in, try to get it automatically
//Not sure if  this can be trusted, but this is only likely to be the case
//when this is called from the filter. ie not from an assignment.
if ($userid=="") $userid = $USER->username;

//Stopped using this 
//$filename = $CFG->filter_poodll_filename;
 $overwritemediafile = $CFG->filter_poodll_overwrite==1 ? "true" : "false" ;
if ($updatecontrol == "saveflvvoice"){
	$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
}else{
	$savecontrol = "";
}

$params = array();

		$params['red5url'] = urlencode($flvserver);
		$params['overwritefile'] = $overwritemediafile;
		$params['rate'] = $micrate;
		$params['gain'] = $micgain;
		$params['prefdevice'] = $micdevice;
		$params['loopback'] = $micloopback;
		$params['echosupression'] = $micecho;
		$params['silencelevel'] = $micsilence;
		$params['filename'] = "123456.flv";
		$params['assigName'] = $assigname;
		$params['course'] = $courseid;
		$params['updatecontrol'] = $updatecontrol;
		$params['saveformat'] = $saveformat;
		$params['uid'] = $userid;
		//for file system in moodle 2
		$params['poodllfilelib'] = $poodllfilelib;
		$params['contextid'] = $contextid;
		$params['component'] = $component;
		$params['filearea'] = $filearea;
		$params['itemid'] = $itemid;
	
    	$returnString=  fetchSWFWidgetCode('PoodLLAudioRecorder.lzx.swf9.swf',
    						$params,$width,$height,'#CFCFCF');
    						
    	$returnString .= 	 $savecontrol;
    						
    	return $returnString ;
	

}


function fetch_stopwatch($runtime, $width, $height, $fontheight,$mode='normal',$permitfullscreen=false,$uniquename='uniquename'){
global $CFG, $USER, $COURSE;

//Set the servername 
$flvserver = $CFG->poodll_media_server;

//If we are using course ids then lets do that
//else send -1 to widget (ignore flag)
if ($CFG->filter_poodll_usecourseid){
	$courseid = $COURSE->id;
}else{
	$courseid = -1;
}

//get username automatically
$userid = $USER->username;


	
	//Determine if we are admin, if necessary , for slave/master mode
	if (has_capability('mod/quiz:preview', get_context_instance(CONTEXT_COURSE, $COURSE->id))){		
		$isadmin=true;
	}else{
		$isadmin=false;
	}
	    //merge config data with javascript embed code
		$params = array();
		$params['permitfullscreen'] = $permitfullscreen;
		$params['fontheight'] = $fontheight;
		$params['uniquename'] = $uniquename;
		$params['courseid'] = $courseid;
		$params['red5url'] = urlencode($flvserver);
		$params['mode'] = $mode;
		
		//LZ string if master/save  mode and not admin => show slave mode
	//otherwise show stopwatch
	if ($mode=='master' && !$isadmin) {
    	$returnString=  fetchSWFWidgetCode('slaveview.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    }elseif($runtime=='swf'){
    	$returnString=  fetchSWFWidgetCode('stopwatch.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	 }elseif($runtime=='auto'){
    	$returnString=  fetchAutoWidgetCode('stopwatch.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    }else{
    	$returnString=  fetchJSWidgetCode('stopwatch.lzx.js',
    						$params,$width,$height,'#FFFFFF');
    }
   						
    return $returnString;
    

}

function fetch_poodllcalc($runtime, $width, $height){
global $CFG;

	//merge config data with javascript embed code
		$params = array();
		if($runtime=='js'){
			$returnString=  fetchJSWidgetCode('poodllcalc.lzx.js',
    						$params,$width,$height,'#FFFFFF');
		 }elseif($runtime=='auto'){
							$returnString=fetchAutoWidgetCode('poodllcalc.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
		}else{
    		$returnString=  fetchSWFWidgetCode('poodllcalc.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    	}
   						
    	return $returnString;

}

function fetch_explorer($runtime, $width, $height, $moduleid=0){
global $CFG,$COURSE;
	
	//If we are using course ids then lets do that
	//else send -1 to widget (ignore flag)
		$courseid = $COURSE->id;

	
	//get the url to the automated medialist maker
	$filedataurl= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';
	$componentlist= $CFG->wwwroot . '/filter/poodll/componentlist.xml';

	//merge config data with javascript embed code
		$params = array();
		$params['courseid'] = $courseid;
		$params['filedataurl'] = $filedataurl;
		$params['componentlist'] = $componentlist;
		$params['moduleid'] = $moduleid;
		
		if($runtime=='js'){
			$returnString=  fetchJSWidgetCode('attachmentexplorer.lzx.js',
    						$params,$width,$height,'#FFFFFF'); 
		}elseif($runtime=='auto'){
			$returnString=  fetchAutoWidgetCode('attachmentexplorer.lzx.swf10.swf',
    						$params,$width,$height,'#FFFFFF');
		}else{
    		$returnString=  fetchSWFWidgetCode('attachmentexplorer.lzx.swf10.swf',
    						$params,$width,$height,'#FFFFFF');
    	}
   						
    	return $returnString;

}

function fetch_countdowntimer($runtime, $initseconds, $usepresets, $width, $height, $fontheight,$mode='normal',$permitfullscreen=false,$uniquename='uniquename'){
global $CFG, $USER, $COURSE;

//Set the servername 
$flvserver = $CFG->poodll_media_server;

//If we are using course ids then lets do that
//else send -1 to widget (ignore flag)
if ($CFG->filter_poodll_usecourseid){
	$courseid = $COURSE->id;
}else{
	$courseid = -1;
}

//get username automatically
$userid = $USER->username;


	
	//Determine if we are admin, if necessary , for slave/master mode
	if (has_capability('mod/quiz:preview', get_context_instance(CONTEXT_COURSE, $COURSE->id))){		
		$isadmin=true;
	}else{
		$isadmin=false;
	}
	
	
	
	
			//merge config data with javascript embed code
		$params = array();
		$params['initseconds'] = $initseconds;
		$params['permitfullscreen'] = $permitfullscreen;
		$params['usepresets'] = $usepresets;
		$params['fontheight'] = $fontheight;
		$params['mename'] = $userid; //this might be wrong, but do we need this?
		$params['uniquename'] = $uniquename;
		$params['courseid'] = $courseid;
		$params['red5url'] = urlencode($flvserver);
		$params['mode'] = $mode;
		
		//LZ string if master/save  mode and not admin => show slave mode
	//otherwise show stopwatch
	if ($mode=='master' && !$isadmin) {
    	$returnString=  fetchSWFWidgetCode('slaveview.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    }elseif($runtime=='swf'){
    	$returnString=  fetchSWFWidgetCode('countdowntimer.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	}elseif($runtime=='auto'){
    	$returnString=  fetchAutoWidgetCode('countdowntimer.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    }else{
    	$returnString=  fetchJSWidgetCode('countdowntimer.lzx.js',
    						$params,$width,$height,'#FFFFFF');
    
    
    }
   						
    	return $returnString;

}

function fetch_counter($runtime, $initcount, $usepresets, $width, $height, $fontheight,$permitfullscreen=false){
global $CFG;

		//merge config data with javascript embed code
		$params = array();
		$params['initcount'] = $initcount;
		$params['permitfullscreen'] = $permitfullscreen;
		$params['usepresets'] = $usepresets;
		$params['fontheight'] = $fontheight;
		
	
    	
    	if($runtime=="swf"){
    		$returnString=  fetchSWFWidgetCode('counter.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
		}elseif($runtime=="auto"){
    		$returnString=  fetchAutoWidgetCode('counter.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
		}else{
			$returnString=  fetchJSWidgetCode('counter.lzx.js',
    						$params,$width,$height,'#FFFFFF');
		}
   						
    	return $returnString;
    	
    	

}

function fetch_dice($runtime, $dicecount,$dicesize,$width,$height){
global $CFG;

		//merge config data with javascript embed code
		$params = array();
		$params['dicecount'] = $dicecount;
		$params['dicesize'] = $dicesize;
		
	if($runtime=="swf"){
    	$returnString=  fetchSWFWidgetCode('dice.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	}elseif($runtime=="auto"){
    	$returnString=  fetchAutoWidgetCode('dice.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	}else{
		$returnString=  fetchJSWidgetCode('dice.lzx.js',
    						$params,$width,$height,'#FFFFFF');
	}
    	

    						
    	return $returnString ;

}

function fetch_flashcards($runtime, $cardset,$cardwidth,$cardheight,$randomize,$width,$height){
global $CFG,$COURSE;


	//determine which of, automated or manual cardsets to use
	if(strlen($cardset) > 4 && substr($cardset,0,4)=='http'){
		$fetchdataurl=$cardset;
	}elseif(strlen($cardset) > 4 && substr($cardset,-4)==".xml"){
		//get a manually made playlist
		$fetchdataurl= $CFG->wwwroot . "/file.php/" .  $COURSE->id . "/" . $cardset;
	}else{
		//get the url to the automated medialist maker
		$fetchdataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php?datatype=poodllflashcards&courseid=' . $COURSE->id 
			. '&paramone=' . $cardset 
			. '&cachekiller=' . rand(10000,999999);
	}
	

		//merge config data with javascript embed code
		$params = array();
		$params['cardset'] = urlencode($fetchdataurl);
		$params['randomize'] = $randomize;
		$params['cardwidth'] = $cardwidth;
		$params['cardheight'] = $cardheight;
		
	if($runtime=="js"){
    	$returnString=  fetchJSWidgetCode('flashcards.lzx.js',
    						$params,$width,$height,'#FFFFFF');
	}elseif($runtime=="auto"){
    	$returnString=  fetchAutoWidgetCode('flashcards.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	
	}else{
		$returnString=  fetchSWFWidgetCode('flashcards.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	}
    						
    	return $returnString ;

}


function fetchSnapshotCamera($updatecontrol="filename", $filename="apic.jpg", $width="350",$height="400"){
global $CFG, $USER, $COURSE;

//Set the servername and a capture settings from config file

$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight=$CFG->filter_poodll_captureheight;
$capturefps=$CFG->filter_poodll_capturefps;
$prefcam=$CFG->filter_poodll_studentcam;
$prefmic=$CFG->filter_poodll_studentmic;
$bandwidth=$CFG->filter_poodll_bandwidth;
$picqual=$CFG->filter_poodll_picqual;



$params = array();
		$params['capturefps'] = $capturefps;
		$params['filename'] = $filename;
		$params['captureheight'] = $captureheight;
		$params['picqual'] = $picqual;
		$params['bandwidth'] = $bandwidth;
		$params['capturewidth'] = $capturewidth;
		$params['prefcam'] = $prefcam;
		$params['updatecontrol'] = $updatecontrol;
		$params['moodlewww'] = $CFG->wwwroot;
	
    	$returnString=  fetchSWFWidgetCode('PoodLLSnapshot.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');

    						
    	return $returnString;
	

}




function fetchSimpleVideoRecorder($runtime, $assigname, $userid="", $updatecontrol="saveflvvoice", $filename="", $width="350",$height="400"){
global $CFG, $USER, $COURSE;

//Set the servername and a capture settings from config file
$flvserver = $CFG->poodll_media_server;
$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight=$CFG->filter_poodll_captureheight;
$capturefps=$CFG->filter_poodll_capturefps;
$prefcam=$CFG->filter_poodll_studentcam;
$prefmic=$CFG->filter_poodll_studentmic;
$bandwidth=$CFG->filter_poodll_bandwidth;
$picqual=$CFG->filter_poodll_picqual;

//Set the microphone config params
$micrate = $CFG->filter_poodll_micrate;
$micgain = $CFG->filter_poodll_micgain;
$micsilence = $CFG->filter_poodll_micsilencelevel;
$micecho = $CFG->filter_poodll_micecho;
$micloopback = $CFG->filter_poodll_micloopback;

//If we are using course ids then lets do that
//else send -1 to widget (ignore flag)
if ($CFG->filter_poodll_usecourseid){
	$courseid = $COURSE->id;
}else{
	$courseid = -1;
}

//set up auto transcoding (mp4) or not
if($CFG->filter_poodll_videotranscode){
	$saveformat = "mp4";
}else{
	$saveformat = "flv";
}

//If no user id is passed in, try to get it automatically
//Not sure if  this can be trusted, but this is only likely to be the case
//when this is called from the filter. ie not from an assignment.
if ($userid=="") $userid = $USER->username;

//Stopped using this 
//$filename = $CFG->filter_poodll_filename;
 $overwritemediafile = $CFG->filter_poodll_overwrite==1 ? "true" : "false" ;
if ($updatecontrol == "saveflvvoice"){
	$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
}else{
	$savecontrol = "";
}

$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['overwritefile'] = $overwritemediafile;
		$params['rate'] = $micrate;
		$params['gain'] = $micgain;
		$params['loopback'] = $micloopback;
		$params['echosupression'] = $micecho;
		$params['silencelevel'] = $micsilence;
		$params['capturefps'] = $capturefps;
		$params['filename'] = $filename;
		$params['assigName'] = $assigname;
		$params['captureheight'] = $captureheight;
		$params['picqual'] = $picqual;
		$params['bandwidth'] = $bandwidth;
		$params['capturewidth'] = $capturewidth;
		$params['prefmic'] = $prefmic;
		$params['prefcam'] = $prefcam;
		$params['course'] = $courseid;
		$params['updatecontrol'] = $updatecontrol;
		$params['saveformat'] = $saveformat;
		$params['uid'] = $userid;
	
    	$returnString=  fetchSWFWidgetCode('PoodLLVideoRecorder.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    						
    	$returnString .= 	$savecontrol;
    						
    	return $returnString ;
	

}

function fetchVideoRecorderForSubmission($runtime, $assigname, $updatecontrol="saveflvvoice", $contextid,$component,$filearea,$itemid){
global $CFG, $USER, $COURSE;

//Set the servername and a capture settings from config file
$flvserver = $CFG->poodll_media_server;
$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight=$CFG->filter_poodll_captureheight;
$capturefps=$CFG->filter_poodll_capturefps;
$prefcam=$CFG->filter_poodll_studentcam;
$prefmic=$CFG->filter_poodll_studentmic;
$bandwidth=$CFG->filter_poodll_bandwidth;
$picqual=$CFG->filter_poodll_picqual;

//set up auto transcoding (mp4) or not
if($CFG->filter_poodll_videotranscode){
	$saveformat = "mp4";
}else{
	$saveformat = "flv";
}

//Set the microphone config params
$micrate = $CFG->filter_poodll_micrate;
$micgain = $CFG->filter_poodll_micgain;
$micsilence = $CFG->filter_poodll_micsilencelevel;
$micecho = $CFG->filter_poodll_micecho;
$micloopback = $CFG->filter_poodll_micloopback;

//removed from params to make way for moodle 2 filesystem params Justin 20120213
$userid="dummy";
$width="350";
$height="400";
$filename="12345"; 
$poodllfilelib= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';

//If we are using course ids then lets do that
//else send -1 to widget (ignore flag)
if ($CFG->filter_poodll_usecourseid){
	$courseid = $COURSE->id;
}else{
	$courseid = -1;
} 

//If no user id is passed in, try to get it automatically
//Not sure if  this can be trusted, but this is only likely to be the case
//when this is called from the filter. ie not from an assignment.
if ($userid=="") $userid = $USER->username;

//Stopped using this 
//$filename = $CFG->filter_poodll_filename;
 $overwritemediafile = $CFG->filter_poodll_overwrite==1 ? "true" : "false" ;
if ($updatecontrol == "saveflvvoice"){
	$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
}else{
	$savecontrol = "";
}

$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['overwritefile'] = $overwritemediafile;
		$params['rate'] = $micrate;
		$params['gain'] = $micgain;
		$params['loopback'] = $micloopback;
		$params['echosupression'] = $micecho;
		$params['silencelevel'] = $micsilence;
		$params['capturefps'] = $capturefps;
		$params['filename'] = $filename;
		$params['assigName'] = $assigname;
		$params['captureheight'] = $captureheight;
		$params['picqual'] = $picqual;
		$params['bandwidth'] = $bandwidth;
		$params['capturewidth'] = $capturewidth;
		$params['prefmic'] = $prefmic;
		$params['prefcam'] = $prefcam;
		$params['course'] = $courseid;
		$params['updatecontrol'] = $updatecontrol;
		$params['saveformat'] = $saveformat;
		$params['uid'] = $userid;
		//for file system in moodle 2
		$params['poodllfilelib'] = $poodllfilelib;
		$params['contextid'] = $contextid;
		$params['component'] = $component;
		$params['filearea'] = $filearea;
		$params['itemid'] = $itemid;
	
    	$returnString=  fetchSWFWidgetCode('PoodLLVideoRecorder.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    						
    	$returnString .= 	$savecontrol;
    						
    	return $returnString ;
	

}

//Audio playltest player with defaults, for use with directories of audio files
function fetchAudioTestPlayer($runtime, $playlist,$protocol="", $width="400",$height="150",$filearea="content"){
global $CFG, $USER, $COURSE;

$moduleid = optional_param('id', 0, PARAM_INT);    // The ID of the current module (eg moodleurl/view.php?id=X )

//Set our servername .
$flvserver = $CFG->poodll_media_server;


//determine which of, automated or manual playlists to use
if(strlen($playlist) > 4 && substr($playlist,-4)==".xml"){
	//get a manually made playlist
	$fetchdataurl= $CFG->wwwroot . "/file.php/" .  $courseid . "/" . $playlist;
}else{
	//get the url to the automated medialist maker
	$fetchdataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php?datatype=poodllaudiolist'
		. '&courseid=' . $COURSE->id
		. '&moduleid=' . $moduleid
		. '&paramone=' . $playlist 
		. '&paramtwo=' . $protocol 
		. '&paramthree=' . $filearea
		. '&cachekiller=' . rand(10000,999999);
}

	
		$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['playertype'] = $protocol;
		$params['playlist']=urlencode($fetchdataurl);
	
    	$returnString=  fetchSWFWidgetCode('poodllaudiotestplayer.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    						
    	return $returnString;


	
}


//Audio playlist player with defaults, for use with directories of audio files
function fetchAudioListPlayer($runtime, $playlist, $filearea="content",$protocol="", $width="400",$height="350",$sequentialplay="true",$useplayer,$showplaylist){
global $CFG, $USER, $COURSE;

$moduleid = optional_param('id', 0, PARAM_INT);    // The ID of the current module (eg moodleurl/view.php?id=X )


//determine if we are mobile or not
 $browser = new Browser();
	 switch($browser->getBrowser()){
		case Browser::BROWSER_IPAD:
		case Browser::BROWSER_IPOD:
		case Browser::BROWSER_IPHONE:
		case Browser::BROWSER_ANDROID:
			$ismobile = true;
			break;
				
		default: 
			$ismobile = false;
	}

	//if its a poodll player we want an xml feed
	//if its jw or fp we want an rss feed
	//if we are ipads or html playlists + fp, we wont use a data feed, we will use a list of links
	//so in that case we pass a "" and just spit out the links.
	switch($useplayer){
		case "pd": 	$datatype = "poodllaudiolist";break;
		case "jw":	$datatype = "poodllrsslist";break;
		case "fp": if($showplaylist) {
						$datatype="";
					}else{
						$datatype = "poodllrsslist";
					}
					break;
	}
	
	
	//determine playlist url if necessary, if we are using fp player and a visible list we don't need this
	$fetchdataurl="";
	if($datatype!=""){
		//get the url to the automated medialist maker
		//$fetchdataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php?datatype=poodllaudiolist'
		$fetchdataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php?datatype=' . $datatype 
			. '&courseid=' . $COURSE->id
			. '&moduleid=' . $moduleid
			. '&paramone=' . $playlist 
			. '&paramtwo=' . $protocol 
			. '&paramthree=' . $filearea
			. '&cachekiller=' . rand(10000,999999);
	}
	

	//If poodll player is not default, use flowplayer it will handle mobile and flash
	if($useplayer!="pd"){
		$returnString="";
		 //if html playlist use links as list
		 if ($showplaylist){
			$returnString = fetch_poodllaudiolist($moduleid,$COURSE->id,$playlist, "http", $filearea,"alist");
			$returnString .= "<br clear='all'/>";
			//get a flowplayer without a datafeed
			//size is hardcoded to match images pulled from styles.css in pooodll filter
			$returnString .= fetchFlowPlayerCode($width,40,"/","audiolist", $ismobile, "", $sequentialplay);
			
		 //if rss playlist use url of datafeed and pass to flowplayer
		 }else{
			//get a flowplayer using the data feed
			//size is hardcoded to match images pulled from styles.css in pooodll filter
			$returnString .= fetchFlowPlayerCode($width,40,"/","audiolist", $ismobile, $fetchdataurl, $sequentialplay);
		 }
		 
		 return $returnString;
	
	//If this is a poodll player playlist 
	}else{
		//Set our servername .
		$flvserver = $CFG->poodll_media_server;


	
		
		$params = array();
			$params['red5url'] = urlencode($flvserver);
			$params['playertype'] = $protocol;
			$params['sequentialplay'] = $sequentialplay;
			$params['playlist']=urlencode($fetchdataurl);
		
			$returnString=  fetchSWFWidgetCode('poodllaudiolistplayer.lzx.swf9.swf',
								$params,$width,$height,'#FFFFFF');
								
			return $returnString;
	}
}

//Audio player with defaults, for use with PoodLL filter
function fetchSimpleAudioPlayer($runtime, $rtmp_file, $protocol="", $width="450",$height="25",$embed=false, $embedstring="Play",$permitfullscreen=false){
global $CFG, $USER, $COURSE;

//Set our servername .
$flvserver = $CFG->poodll_media_server;
$courseid= $COURSE->id;
$useplayer=$CFG->filter_poodll_defaultplayer;

//determine if we are mobile or not
 $browser = new Browser();
	 switch($browser->getBrowser()){
		case Browser::BROWSER_IPAD:
		case Browser::BROWSER_IPOD:
		case Browser::BROWSER_IPHONE:
		case Browser::BROWSER_ANDROID:
			$ismobile = true;
			break;
				
		default: 
			$ismobile = false;
	}

	//Set our use protocol type
	//if one was not passed, then it may have been tagged to the url
	//this was the old way.
	if ($protocol==""){
		$type = "rtmp";
		if (strlen($rtmp_file) > 5){
			$protocol = substr($rtmp_file,0,5);
			switch ($protocol){
				case "yutu:":
					$rtmp_file = substr($rtmp_file,5);
					$rtmp_file = getYoutubeLink($rtmp_file);
					$type="http";
					break;			
				case "http:":
					$rtmp_file = substr($rtmp_file,5);
					$type="http";
					break;		
				case "rtmp:":
					$rtmp_file = substr($rtmp_file,5);
				default:
					$type="rtmp";				

			}
		
		}//end of if strlen(rtmpfile) > 4

	//If we have one passed in, lets set it to our type
	}else{
		switch ($protocol){
				case "yutu":
					$rtmp_file = getYoutubeLink($rtmp_file);
					$type="http";
					break;			
				case "http":
				case "rtmp":
				case "legacy":
				default:
					$type=$protocol;				

			}
	}

	//some common variables for the embedding stage.	
	//$playerLoc = $CFG->wwwroot . '/filter/poodll/flash/poodllaudioplayer.lzx.swf9.swf';

	//If we are using the legacy coursefiles, we want to fall into this code
	//this is just a temporary fix to achieve this. Justin 20111213
	if($protocol=='rtmp' || $protocol=='legacy'){
		$rtmp_file= $CFG->wwwroot . "/file.php/" .  $courseid . "/" . $rtmp_file;
        $type = 'http';
	}
	
	//If we want to avoid loading many players per page, this loads the player only after a text link is clicked
	//it uses the poodll player and only works if the file is an flv, otherwise it just proceeds as usual
	if ($embed && substr($rtmp_file,-4)=='.flv'){
		$lzid = "lzapp_audioplayer_" . rand(100000, 999999) ;
		$returnString="		
		 <div id='$lzid' class='player'>
        <a href='#' onclick=\"javascript:loadAudioPlayer('$rtmp_file', '$lzid', 'sample_$lzid', '$width', '$height'); return false;\">$embedstring </a>
      </div>		
		";
		return $returnString;
	}
	//if we are using javascript to detect and insert (probably best..?)	
	
		$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['playertype'] = $type;
		$params['mediapath'] = $rtmp_file;
		$params['permitfullscreen'] = $permitfullscreen;
		
		
		//if we are on mobile we want to play mp3 using html5 tags
		if($runtime=='auto' ){
			if($ismobile){		
					$runtime='js';
			}else{
					$runtime='swf';
			}
		}//end of if runtime=auto
	
	
		if($runtime=='js' && ($CFG->filter_poodll_html5controls=='native')){
				$returnString="";
				
				//The HTML5 Code (can be used on its own OR with the mediaelement code below it
				$returnString .="<audio controls width='" . $width . "' height='" . $height . "'>
								<source src='" .$rtmp_file . "'/>
								</audio>";
				
				//=======================
				//if we are using mediaelement js use this. We use JQuery which is not ideal, in moodle yui environment
				/*
				$mediajsroot = $CFG->wwwroot . '/filter/poodll/js/mediaelementjs/';
				$returnString .="<script src='" . $mediajsroot .  "jquery.js'></script>";
				$returnString .="<script src='" . $mediajsroot .  "mediaelement-and-player.min.js'></script>";
				$returnString .="<link rel='stylesheet' href='" . $mediajsroot .  "mediaelementplayer.css' />	";
				$returnString .="<script src='" . $mediajsroot .  "mep-feature-loop.js'></script>";
				$returnString .="<script src='" . $mediajsroot .  "mep-feature-speed.js'></script>";
				$returnString .="<script src='" . $mediajsroot .  "mep-feature-progress.js'></script>";
				//$returnString .="<script>$('audio,video').mediaelementplayer({features:['playpause','loop','speed','progess','volume']});</script>";
				$returnString .="<script>$('audio,video').mediaelementplayer();</script>";
				*/
			//=======================
			
			
				//=======================
				//If we use Kaltura, use this			
				//$returnString .="<script src='http://html5.kaltura.org/js'></script>";
				//=======================
		
		//if we are using SWF		
		}else{
				
				
				//Flowplayer
				if($useplayer=="fp" || $CFG->filter_poodll_html5controls=="js"){
					
					$returnString= fetchFlowPlayerCode($width,$height,$rtmp_file,"audio",$ismobile);
				
				//JW player
				} else if($useplayer=="jw"){
					$flashvars = array();
					$flashvars['file'] = $rtmp_file;
					$flashvars['autostart'] = 'false';
					$returnString=  fetchSWFObjectWidgetCode('jwplayer.swf',
								$flashvars,$width,$height,'#FFFFFF');
				
				//if the file is an mp3, and we are using poodll player, don't handle it
				//either pass it to multi media plugin filter or pass it flowplayer
				// PoodLL player can't mp3 without RTMP
				}else if(substr($rtmp_file,-4)=='.mp3'){
					
					$returnString= fetchFlowPlayerCode($width,$height,$rtmp_file,"audio",$ismobile);
					//$returnString= "<a href=\"$rtmp_file\">$rtmp_file</a>";
				
				//PoodLL Player
				}else{
					
					$returnString=  fetchSWFWidgetCode('poodllaudioplayer.lzx.swf9.swf',
								$params,$width,$height,'#FFFFFF');
				}
							
		}
    						
    	return $returnString;
}



//Video player with defaults, for use with PoodLL filter
function fetchSimpleVideoPlayer($runtime, $rtmp_file, $width="400",$height="380",$protocol="",$embed=false,$permitfullscreen=false, $embedstring="Play"){
global $CFG, $USER, $COURSE;

//Set our servername .
$flvserver = $CFG->poodll_media_server;
$courseid= $COURSE->id;
$useplayer=$CFG->filter_poodll_defaultplayer;

//determine if we are mobile or not
 $browser = new Browser();
	 switch($browser->getBrowser()){
		case Browser::BROWSER_IPAD:
		case Browser::BROWSER_IPOD:
		case Browser::BROWSER_IPHONE:
		case Browser::BROWSER_ANDROID:
			$ismobile = true;
			break;
				
		default: 
			$ismobile = false;
	}


	//Massage the media file name if we have a username variable passed in.	
	//This allows us to show different video to each student
	$rtmp_file = str_replace( "@@username@@",$USER->username,$rtmp_file);
	
	//Determine if we are admin, admins can always fullscreen
	if (has_capability('mod/quiz:preview', get_context_instance(CONTEXT_COURSE, $COURSE->id))){		
		$permitfullscreen='true';
	}


	//Set our use protocol type
	//if one was not passed, then it may have been tagged to the url
	//this was the old way.
	if ($protocol==""){
		$type = "rtmp";
		if (strlen($rtmp_file) > 5){
			$protocol = substr($rtmp_file,0,5);
			switch ($protocol){
				case "yutu:":
					$rtmp_file = substr($rtmp_file,5);
					$type="yutu";
					break;			
				case "http:":
					$rtmp_file = substr($rtmp_file,5);
					$type="http";
					break;		
				case "rtmp:":
					$rtmp_file = substr($rtmp_file,5);
				default:
					$type="rtmp";				

			}
		
		}//end of if strlen(rtmpfile) > 4

	//If we have one passed in, lets set it to our type
	}else{
		switch ($protocol){
				case "yutu":		
				case "http":
				case "rtmp":
				case "legacy":
				default:
					$type=$protocol;				

			}
	}
	
	//If we are using the legacy coursefiles, we want to fall into this code
	//this is just a temporary fix to achieve this. Justin 20111213
	if($protocol=='rtmp' || $protocol=='legacy'){
		$rtmp_file= $CFG->wwwroot . "/file.php/" .  $courseid . "/" . $rtmp_file;
        $type = 'http';
	}
	
	//If we want to avoid loading multiple players on the screen, we use this script
	//to load players ondemand
	//this does screw up updating the entry on the page,
	//which is seen after marking a single audio/vide assignment and returning to the list
	//poodllonline assignment
	if ($embed){
		$lzid = "lzapp_videoplayer_" . rand(100000, 999999) ;
		$returnString="		
	  <div id='$lzid' class='player'>
        <a href='#' onclick=\"javascript:loadVideoPlayer('$rtmp_file', '$lzid', 'sample_$lzid', '$width', '$height'); return false;\">$embedstring </a>
      </div>		
		";
	

			return $returnString;

	}else{		
	
 		$params = array();
		$params['red5url'] = urlencode($flvserver);
		$params['playertype'] = $type;
		$params['mediapath'] = $rtmp_file;
		$params['permitfullscreen'] = $permitfullscreen;
	
		//if we are on mobile we want to play mp3 using html5 tags
		if($runtime=='auto' ){
			if($ismobile){		
					$runtime='js';
			}else{
					$runtime='swf';
			}
		}//end of if runtime=auto
	
	
		if($runtime=='js' && ($CFG->filter_poodll_html5controls=='native')){
				$returnString="";

			
			$poster="";//To do add poster code, once we have thought it all through a bit better
			$returnString .="<video controls poster='" . $poster . "' width='" . $width . "' height='" . $height . "'>
								<source type='video/mp4' src='" .$rtmp_file . "'/>
							</video>";
			//============================
			//if we are using mediaelement js use this
			//$mediajsroot = $CFG->wwwroot . '/filter/poodll/js/mediaelementjs/';
			//$returnString .="<script src='" . $mediajsroot .  "jquery.js'></script>";
			//$returnString .="<script src='" . $mediajsroot .  "mediaelement-and-player.min.js'></script>";
			//$returnString .="<link rel='stylesheet' href='" . $mediajsroot .  "mediaelementplayer.css' />	";
			//$returnString .="<script src='" . $mediajsroot .  "mep-feature-loop.js'></script>";
			//$returnString .="<script src='" . $mediajsroot .  "mep-feature-speed.js'></script>";
			//$returnString .="<script>$('audio,video').mediaelementplayer({features:['playpause','loop','speed','progess','volume']});</script>";
			////$returnString .="<script> $('audio,video').mediaelementplayer(); </script>";
			//============================
			
			//============================
			//If we use Kaltura, use this			
			//$returnString .="<script src='http://html5.kaltura.org/js'></script>";		
			//============================
							
		
		//if we are using SWF		
		}else{
				
				
				//Flowplayer
				if($useplayer=="fp" || $CFG->filter_poodll_html5controls=="js"){
					
					$returnString= fetchFlowPlayerCode($width,$height,$rtmp_file,"video",$ismobile);
				
				//JW player
				} else if($useplayer=="jw"){
					$flashvars = array();
					$flashvars['file'] = $rtmp_file;
					$flashvars['autostart'] = 'false';
					$returnString=  fetchSWFObjectWidgetCode('jwplayer.swf',
								$flashvars,$width,$height,'#FFFFFF');
				

				
				//PoodLL Player
				}else{
					
					$returnString=  fetchSWFWidgetCode('poodllvideoplayer.lzx.swf9.swf',
								$params,$width,$height,'#FFFFFF');
				}
							
		}
    						
    	return $returnString;
	}

}




function fetchSmallVideoGallery($runtime, $playlist, $filearea="content", $protocol="", $width, $height,$permitfullscreen=false){
global $CFG, $USER, $COURSE;

//Set the servername 
$courseid= $COURSE->id;
$flvserver = $CFG->poodll_media_server;

$moduleid = optional_param('id', 0, PARAM_INT);    // The ID of the current module (eg moodleurl/view.php?id=X )

//set size params
if ($width==''){$width=$CFG->filter_poodll_smallgallwidth;}
if ($height==''){$height=$CFG->filter_poodll_smallgallheight;}

//Determine if we are admin, admins can always fullscreen
	if (has_capability('mod/quiz:preview', get_context_instance(CONTEXT_COURSE, $COURSE->id))){		
		$permitfullscreen='true';
	}


//determine which of, automated or manual playlists to use
if(strlen($playlist) > 4 && substr($playlist,-4)==".xml"){
	//get a manually made playlist
	$fetchdataurl= $CFG->wwwroot . "/file.php/" .  $courseid . "/" . $playlist;
}else{
	
	//get the url to the automated medialist maker
	$fetchdataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php?datatype=poodllmedialist'
		. '&courseid=' . $COURSE->id
		. '&moduleid=' . $moduleid
		. '&paramone=' . $playlist 
		. '&paramtwo=' . $protocol 
		. '&paramthree=' . $filearea
		. '&cachekiller=' . rand(10000,999999);
}
 	
 	$params = array();
	$params['red5url'] = urlencode($flvserver);
	$params['playlist'] = urlencode($fetchdataurl);
	$params['protocol'] = urlencode($protocol);
	$params['permitfullscreen'] = urlencode($permitfullscreen);

    $returnString=  fetchSWFWidgetCode('smallvideogallery.lzx.swf9.swf',
    						$params,$width,$height,'#D5FFFA');

	return $returnString;
		
		
}

function fetchBigVideoGallery($runtime, $playlist,$filearea="content",  $protocol, $width, $height){
global $CFG, $USER, $COURSE;

//Set the servername 
$courseid= $COURSE->id;
$flvserver = $CFG->poodll_media_server;

$moduleid = optional_param('id', 0, PARAM_INT);    // The ID of the current module (eg moodleurl/view.php?id=X )

//set size params
if ($width==''){$width=$CFG->filter_poodll_biggallwidth;}
if ($height==''){$height=$CFG->filter_poodll_biggallheight;}

//determine which of, automated or manual playlists to use
if(strlen($playlist) > 4 && substr($playlist,-4)==".xml"){
	//get a manually made playlist
	$fetchdataurl= $CFG->wwwroot . "/file.php/" .  $courseid . "/" . $playlist;
}else{
	//get the url to the automated medialist maker
		//get the url to the automated medialist maker
	$fetchdataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php?datatype=poodllmedialist'
		. '&courseid=' . $COURSE->id
		. '&moduleid=' . $moduleid
		. '&paramone=' . $playlist 
		. '&paramtwo=' . $protocol 
		. '&paramthree=' . $filearea
		. '&cachekiller=' . rand(10000,999999);
}

	$params = array();
	$params['red5url'] = urlencode($flvserver);
	$params['playlist'] = urlencode($fetchdataurl);

	if($runtime=='swf'){
		//set the flash widget suffix
		$widget = "bigvideogallery.lzx.swf9.swf";
    	$returnString=  fetchSWFWidgetCode($widget, $params,$width,$height,'#D5FFFA');
	}else{
		//set the JS widget suffix
		$widget = "bigvideogallery.lzx.js";
		$returnString=  fetchJSWidgetCode($widget,$params,$width,$height,'#D5FFFA');
	}
	
	return $returnString;

}


//WMV player with defaults, for use with PoodLL filter
function fetchWMVPlayer($runtime,$wmv_file, $width="400",$height="380"){
global $CFG, $USER, $COURSE;

	//Massage the media file name if we have a username variable passed in.	
	//This allows us to show different video to each student
	$wmv_file = str_replace( "@@username@@",$USER->username,$wmv_file);




	
	//Add course id and full path to url 
	$wmv_name = $wmv_file;
	$wmv_file= $CFG->wwwroot . "/file.php/" . $COURSE->id . "/" .   $wmv_file ;
	
	//In Moodle2 we rely on multi media plugins to handle this
	//but the legacy code directly below would probably work too
	return '<a href="' .$wmv_file . '">' . $wmv_name . '</a>';

	
		 return("
				<table><tr><td> 
					<object id='MediaPlayer' width=$width height=$height classid='CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95' standby='Loading Windows Media Player components...' type='application/x-oleobject' codebase='http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112'>
						<param name='filename' value='$wmv_file'>
						<param name='Showcontrols' value='True'>
						<param name='autoStart' value='False'>
						<param name='wmode' value='transparent'>
						<embed type='application/x-mplayer2' src='$wmv_file' name='MediaPlayer' autoStart='True' wmode='transparent' width='$width' height='$height' ></embed>
					</object>										
				</td></tr></table>"); 
		
	
}

//helper callback function to sort filenames, called from poodllaudiolist
function srtFilenames($a, $b)
{
    return strcasecmp($a->get_filename(), $b->get_filename());
}

//this function returns an rss/xml/ or link list of files for a list player
//originally it existed in poodlllogiclib.php bu t was moved here so we did not have
//to include poodlllogiclib here
function fetch_poodllaudiolist($moduleid, $courseid,  $path="/", $playertype, $filearea,$listtype="xml"){
global $CFG, $DB, $COURSE;	

	//=================================================================
	
//for debug purposes
/*
	global $DB;
  
          //$ret_output .= '0 ' . get_system_context()->id;
  
         $result = array();
		//set up xml to return	
		$ret_output = "<files>\n";
          $file_records = $DB->get_records('files');
           foreach ($file_records as $file_record) {
			
				$ret_output .= '<file filename="' . $file_record->filename . '" contextid="' . $file_record->contextid . '" component="' .  $file_record->component . '" filearea="' . $file_record->filearea . '" />';
                  
             }

	
	//close xml to return
	$ret_output .= "</files>";
		//Return the data
	return $ret_output;
	*/

	//==================================================================
	
	//if a single file was passed in, just play that alone.
	//for PoodlL 2 this is all we can do in a question right now
	if(strlen($path) > 4 && substr($path,-4)==".flv"){
		switch($listtype){
			case "xml":
				$ret_output = "<audios>\n";
				$ret_output .=  "\t<audio audioname='" . basename($path). "' playertype='" . $playertype . "' url='" . trim($path) . "'/>\n";
				$ret_output .= "</audios>\n";
				break;
			
			case "rss":
				 $ret_output = "<channel><title></title>";
				break;
			
			case "alinks":
				$ret_output =  "<div class=\"poodllplaylist\">";
				$ret_output .= "<a href=\"" . trim($path) . "\"><span>" . basename($path). "</span></a>";
				$ret_output .= "</div>";
				break;
		}
		
		return $ret_output;
	}


	
	//FIlter could submit submission/draft/content/intro as options here
	if($filearea == "") {$filearea ="content";}
	
	//fetch info and ids about the module calling this data
	$course = $DB->get_record('course', array('id'=>$courseid));
	$modinfo = get_fast_modinfo($course);
	$cm = $modinfo->get_cm($moduleid);
	
	//make sure we have a trailing slash
	if(strlen($path)>0){
		if(substr($path,-1) !='/'){
			$path .= "/";
		}
		if(substr($path,0,1) !='/'){
			$path = "/" . $path;
		}
	}else{
		$path = "/";
	}
	

	//set up xml/div to return	
	switch($listtype){
			case "xml":
				$ret_output = "<audios>\n";
				break;
			case "rss":
				 $ret_output = "<channel><title></title>";
				break;
			case "alist":
				$ret_output = "<div class=\"poodllplaylist\">";
				break;
	}
	
	//get filehandling objects
	$browser = get_file_browser();
	$fs = get_file_storage();

	//get a handle on the module context
	$thiscontext = get_context_instance(CONTEXT_MODULE,$moduleid);
	$contextid = $thiscontext->id;
	
	//fetch a list of files in this area, and sort them alphabetically
	$files = $fs->get_area_files($contextid, "mod_" . $cm->modname, $filearea);
	usort($files, "srtFilenames");

	//loop through all the media files and load'em up	
		foreach ($files as $f) {
			$filename =trim($f->get_filename());
			//if we are not a directory and filename is long enough and extension is mp3 or flv or mp4, we proceed
			if ($filename != "."){
				if(strlen($filename)>4){
					$ext = substr($filename,-4);
					if($ext==".mp3" || $ext==".mp4" || $ext==".flv"){
						switch($ext){
							case ".mp3": $mimetype="audio/mpeg3"; break;
							case ".flv": $mimetype="audio/mp4"; break;
							case ".mp4": $mimetype="video/x-flv"; break;
						}
					
						//fetch our info object
						$fileinfo = $browser->get_file_info($thiscontext, $f->get_component(),$f->get_filearea(), $f->get_itemid(), $f->get_filepath(), $f->get_filename());

						//if we are at the dir level
						if($f->get_filepath()==$path){
							//get the url to the file and add it to the XML
							$urltofile = $fileinfo->get_url();
							switch($listtype){
								case "xml":
									$ret_output .=  "\t<audio audioname='" . basename($filename) ."' playertype='" . $playertype . "' url='" . trim($urltofile) . "'/>\n";
									break;
								case "rss":
									$ret_output .=  "\t<item><title>" . 
										basename($filename) ."</title><media:content url=\"" .
										trim($urltofile) . "\" type=\"" . $mimetype .
										"\"/></item>";
									break;
								case "alist":
									$ret_output  .= "<a href=\"" . trim($urltofile) . "\"><span>" . basename($filename). "</span></a>";
									break;
							}
						
						}
					}
				}
			}
		}
	
	//for debugging
	//$ret_output .=  "\t<audio audioname='" . $cm->modname  . " " . $filearea . " " . $urltofile ."' playertype='" . $playertype . "' url='" . $mediapath . basename($contextid). "'/>\n";
	
	//close xml/alist tags to return
	switch($listtype){
		case "xml":
			$ret_output .= "</audios>";
			break;
		case "rss":
			$ret_output .= "</channel>";
			break;
		case "alist":
			$ret_output .= "</div>";
			break;
	}
	

	//Return the data
	return $ret_output;


}

	
//Given a user object, return the url to a picture for that user.
function fetch_user_picture($user,$size){
global $CFG;

	//get default sizes for non custom pics
    if (empty($size)) {
		//size = 35;
        $file = 'f2';        
    } else if ($size === true or $size == 1) {
        //size = 100;
		$file = 'f1';        
    } else if ($size >= 50) {
        $file = 'f1';
    } else {
        $file = 'f2';
    }
	
	//now get the url for the pic
    if ($user->picture) {  // Print custom user picture
        require_once($CFG->libdir.'/filelib.php');
        $src = get_file_url($user->id.'/'.$file.'.jpg', null, 'user');
    } else {         // Print default user pictures (use theme version if available)
        $src =  "$CFG->pixpath/u/$file.png";
    }
	return $src;
}


//embed a quizlet iframe
function fetch_quizlet($quizletid, $quizlettitle="", $mode="flashcards", $width="100%",$height=""){

//massage mode, other options are as is "learn" or "scatter"	
if($mode=="flashcards")$mode="familiarize";

//set default heights
$fa="310";
$sc="410";
$le="315";

//height changes depending on mode
	switch($mode){
		case 'familiarize': if($height==''){$height=$fa;}else{$fa=$height;} break;
		case 'scatter': if($height==''){$height=$sc;}else{$sc=$height;} break;
		case 'learn': if($height==''){$height=$le;}else{$le=$height;} break;
	}

		
$ret=	"<div style=\"background:#fff;padding:3px\">
		<iframe src=\"http://quizlet.com/$quizletid/$mode/embed/?hideLinks\" height=\"$height\" width=\"$width\" style=\"border:0;\" scrolling=\"no\"></iframe>
		<select style=\"float:right;margin-right:3px\" onchange=\"var quizlet_s=this.options[this.selectedIndex].value;var quizlet_f=this;while(quizlet_f.nodeName.toLowerCase()!='iframe')quizlet_f=quizlet_f.previousSibling;quizlet_f.src=quizlet_s.slice(0,-3);quizlet_f.height=quizlet_s.slice(-3);this.value=0\">
			<option value=\"0\" selected=\"selected\">Choose a Study Mode</option>
			<option value=\"http://quizlet.com/$quizletid/scatter/embed/?hideLinks&height=$sc\">Scatter</option>
			<option value=\"http://quizlet.com/$quizletid/learn/embed/?hideLinks&height=$le\">Learn</option>
			<option value=\"http://quizlet.com/$quizletid/familiarize/embed/?hideLinks&height=$fa\">Flashcards</option>
		</select>
		<div style=\"float:left;font-size:11px;padding-top:2px\">
			<a style=\"float: left;margin: -2px 6px 0pt 2px;\" href=\"http://quizlet.com/\">
				<img src=\"http://quizlet.com/a/i/quizlet-embed-logo.PQQ2.png\" border=\"0\" title=\"Quizlet.com, home of free online educational games\" alt=\"Quizlet.com, home of free online educational games\" /></a>
			<a href=\"http://quizlet.com/$quizletid/$quizlettitle/\">Study these flash cards</a>
		</div>
		<div style=\"clear:both\"></div>
	</div>";

	return $ret;

}

//embed a sliderocket iframe
function fetch_sliderocket($id,$width="400",$height="326"){
	$ret="<iframe src=\"http://portal.sliderocket.com:80/app/fullplayer.aspx?id=$id\" 
			width=\"$width\" height=\"$height\" scrolling=no frameBorder=\"1\" style=\"border:1px solid #333333;border-bottom-style:none\">
			</iframe>";
	
	return $ret;
}

function fetch_filter_properties($filterstring){
	//this just removes the {POODLL: .. } to leave us with the good stuff.	
	//there MUST be a better way than this.
	$rawproperties = explode ("{POODLL:", $filterstring);
	$rawproperties = $rawproperties[1];
	$rawproperties = explode ("}", $rawproperties);	
	$rawproperties = $rawproperties[0];

	//Now we just have our properties string
	//Lets run our regular expression over them
	//string should be property=value,property=value
	//got this regexp from http://stackoverflow.com/questions/168171/regular-expression-for-parsing-name-value-pairs
	$regexpression='/([^=,]*)=("[^"]*"|[^,"]*)/';
	$matches; 	

	//here we match the filter string and split into name array (matches[1]) and value array (matches[2])
	//we then add those to a name value array.
	$itemprops = array();
	if (preg_match_all($regexpression, $rawproperties,$matches,PREG_PATTERN_ORDER)){		
		$propscount = count($matches[1]);
		for ($cnt =0; $cnt < $propscount; $cnt++){
			// echo $matches[1][$cnt] . "=" . $matches[2][$cnt] . " ";
			$itemprops[$matches[1][$cnt]]=$matches[2][$cnt];
		}
	}

	return $itemprops;

}

function fetchAutoWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF"){
	global $CFG, $PAGE;
	$ret="";
	 $browser = new Browser();
	 switch($browser->getBrowser()){
		case Browser::BROWSER_IPAD:
		case Browser::BROWSER_IPOD:
		case Browser::BROWSER_IPHONE:
		case Browser::BROWSER_ANDROID:
			
			$pos =strPos($widget,".lzx.");
			if ($pos > 0){
					$basestring = substr($widget,0,$pos+4);
					$widget=$basestring . ".js";
					$ret= fetchJSWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF");	
			}
			break;
		default:
			//$ret=$browser->getPlatform();
			$ret = fetchSWFWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF");	
	 }
	 return $ret;
}

function fetchSWFWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF"){
	global $CFG, $PAGE;
	
	//build the parameter string out of the passed in array
	$params="?";
	foreach ($paramsArray as $key => $value) {
    	$params .= '&' . $key . '=' . $value;
	}
	
	//add in any common params
	$params .= '&debug=false&lzproxied=false'; 
	
	//if we wish to pass in more common params, here is the place
	//eg. $params .= '&modulename=' . $PAGE->cm->modname;
	
	$retcode = "
        <table><tr><td>
        <script type=\'text/javascript\'>
            lzOptions = { ServerRoot: \'\'};
        </script>
        <script type=\"text/javascript\" src=\"{$CFG->wwwroot}/filter/poodll/flash/embed-compressed.js\"></script>
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

function fetchSWFObjectWidgetCode($widget,$flashvarsArray,$width,$height,$bgcolor){
	global $CFG, $PAGE;
	//this doesn't work here or at top of file!!
	//$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flash/swfobject_22.js'));
	
	$containerid = 'swfobject_' . rand(100000, 999999); 
	$widgetid = $containerid . '_widget';
	
	$flashvars="";
	foreach ($flashvarsArray as $key => $value) {
		if($flashvars !=""){$flashvars .= ",";}
    	$flashvars .= $key . ":'" . $value . "'";
	}

	$retcode="<p id='" .$containerid . "'>Please install the Flash Plugin</p>
		<script type='text/javascript' src='/filter/poodll/flash/swfobject_22.js'></script>
		<script type='text/javascript'>
		  var flashvars = { " . $flashvars . " };
		  var params = { allowfullscreen:'true', allowscriptaccess:'always' };
		  var attributes = { id:'" .$widgetid . "', name:'" .$widgetid . "' };
		  swfobject.embedSWF('" . $CFG->wwwroot . '/filter/poodll/flash/' . $widget . "','" .$containerid . "','" . $width . "','" . $height . "','9.0.115','false',
			flashvars, params, attributes);
		</script>
		";
	return $retcode;
	

	
	
}

function fetchFlowPlayerCode($width,$height,$path,$playertype="audio",$ismobile=false, $playlisturlstring ="",$loop='false'){

	global $CFG, $PAGE, $FPLAYERJSLOADED;
	
	$playerid = "flowplayer_" . rand(100000, 999999);
	$playerclass = "flowplayer_poodll";
	
	
	$jscontrolsid = "flowplayer_js_" . rand(100000, 999999); 
	
	$defaultcontrolsheight = $CFG->filter_poodll_audioheight;
	
	//usually we displayhtml5 controls depending on config prefs
	//but for lists, so if we are mobile we use js, if not we use flash
	if($playertype=='audiolist' || $playertype=='videolist') {
		if($ismobile){
			$jscontrols= true;
		}else{
			$jscontrols=false;
		}
	}else{
		$jscontrols= ($CFG->filter_poodll_html5controls == 'js') && $ismobile;
	}

	//This is used in styles.css in poodll filter folder, so it needs to be hard coded
	$jscontrolsclass = "fpjscontrols";

	//init our return code
	$retcode = "";
	
	//added the global and conditional inclusion her because questions in a quiz don't get the JS loaded in the header
	//it is only a problem in a quiz with student role. In other cases the load code at top of this file is on time. Justin 20120704
	if(!$FPLAYERJSLOADED){
		$retcode .= "<script src='" .$CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer-3.2.9.min.js'></script>";
		$FPLAYERJSLOADED=true;
	}
	
	//this conditional including of JS is actually bad, we should do this the same way as the flowplayer-3.2.9.mins.ja
	//by adding it to head. And then weirding around with the GLOBAL Justin 20120704
	if($ismobile){
		$retcode .= "<script src='" .$CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer.ipad-3.2.8.min.js'></script>";
	}
	
	//If we are using JS controls
	if($jscontrols){
		$retcode .= "<script src='" .$CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer.controls-3.2.8.min.js'></script>";
	}
	
	//styling for our flowplayer controls. very slight PoodLL branding going on here.
	$audiocontrolstyles="
	buttonColor: '#ffffff',
      backgroundColor: '#0a2bb5',
      disabledWidgetColor: '#555555',
      bufferGradient: 'none',
      timeSeparator: ' ',
      volumeSliderColor: '#ffffff',
      sliderGradient: 'none',
      volumeBorder: '1px solid rgba(128, 128, 128, 0.7)',
      volumeColor: '#ffffff',
      tooltipTextColor: '#ffffff',
      timeBorder: '0px solid rgba(0, 0, 0, 0.3)',
      buttonOverColor: '#ffffff',
      buttonOffColor: 'rgba(130,130,130,1)',
      timeColor: '#ffffff',
      progressGradient: 'none',
      sliderBorder: '1px solid rgba(128, 128, 128, 0.7)',
      volumeSliderGradient: 'none',
      durationColor: '#a3a3a3',
      backgroundGradient: [0.5,0,0.3],
      sliderColor: '#000000',
      progressColor: '#5aed38',
      bufferColor: '#445566',
      tooltipColor: '#000000',
      borderRadius: '0px',
      timeBgColor: 'rgb(0, 0, 0, 0)',
      opacity: 1.0
	  ";
	
	//the params are different depending on the playertype
	//we need to specify provider for audio if the clips are not MP3 or mp3
	//jqueryseems unavoidable even if not using it for playlists
	switch($playertype){
		case "audio":
			if ($jscontrols){
					$controls = " null ";
					//we don't need to see the flowplayer video/audio at all if we are using js 
					$height="1";
			}else{
				$controls = "{ fullscreen: false, height: $height, autoHide: false, $audiocontrolstyles }";
			}
			
			//We need to tell flowplayer if we have mp3 to play.
			//if it is FLV, we should not pass in a provider flag
			$providerstring = "";
			if(strlen($path)>4){
				$ext = substr($path,-4);
				if($ext==".mp3" || $ext==".MP3"){
					$providerstring = ", provider: \"audio\"";			
				}
			}
						
			//If we have a splash screen show it and enable autoplay(user only clicks once)
			//best to have a splash screen to prevent browser hangs on many flashplayers in a forum etc
			if($CFG->filter_poodll_audiosplash){
				$clip = "{ autoPlay: true $providerstring }";
				$splash = "<img src='" . $CFG->wwwroot . "/filter/poodll/flowplayer/audiosplash.jpg' alt='click to play audio' width='" . $width . "' height='" . $height . "'/>";
			}else{
				$clip = "{ autoPlay: false $providerstring }";
				$splash = "";
			}
			break;
		
		case "audiolist":
			$retcode .= "<script src=\"http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js\"></script>";
			$retcode .= "<script src='" .$CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer.playlist-3.2.8.min.js'></script>";
			if ($jscontrols){
					$controls = " null ";
					//we don't need to see the flowplayer video/audio at all if we are using js 
					$height="1";
			}else{
				$controls = "{ fullscreen: false, height: " . $defaultcontrolsheight . " , autoHide: false, playlist: true, $audiocontrolstyles }";
			}
			
			//without looking inside the playlist we don't know if the audios are flv or mp3.
			//here we assume that audio playlists are mp3. If not we need to remove the provider element
			$clip = "{ autoPlay: true, provider: \"audio\" }";
			$splash = "";
			break;
		
		case "video":
			if ($jscontrols){
					$controls = " null ";
			}else{
				$controls = "{ fullscreen: true, height: " . $defaultcontrolsheight . " , autoHide: true }";
			}
			//If we have a splash screen show it and enable autoplay(user only clicks once)
			//best to have a splash screen to prevent browser hangs on many flashplayers in a forum etc
			if($CFG->filter_poodll_videosplash){
				$clip = "{ autoPlay: true }";
				$splash = "<img src='" . $CFG->wwwroot . "/filter/poodll/flowplayer/videosplash.jpg' alt='click to play video' width='" . $width . "' height='" . $height . "'/>";
			}else{
				$clip = "{ autoPlay: false }";
				$splash="";
			}
			break;
		
		case "videolist":
			$retcode .= "<script src=\"http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js\"></script>";
			$retcode .= "<script src='" .$CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer.playlist-3.2.8.min.js'></script>";
			$controls = "{ fullscreen: false, height: " . $defaultcontrolsheight . " , autoHide: true, playlist: true }";
			
			$clip = "{ autoPlay: false }";
			$splash ="";
			break;
	
	
	}
	
	//add a media rss playlist if one was passed in
	if($playlisturlstring !=""){
		$playlisturlstring = "\"" . $playlisturlstring . "\"";
	}else{
		$playlisturlstring = " null ";
	}
	

	//put together the a link that will be replaced by a player
	$retcode .= "<a href='" . $path . "'
					style='display:block;width:" . $width. "px;height:" . $height . "px;'
					id='" . $playerid . "' class='" . $playerclass . "' >
					" . $splash . "
				</a>";
				
	//put together the div that will be replaced by the JS controls
	if($jscontrols){
		$retcode .= "<div id='" . $jscontrolsid . "' class='" . $jscontrolsclass . "'></div>";
	}
	
	//Add the script that will do the div replacing. Most of the important stuff is in here.
	$retcode .= "<script language='JavaScript'>
					flowplayer('" . $playerid . "', '" . $CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer-3.2.10.swf',";
	
	$fpconfig ="
						{
							plugins: {
								controls: $controls,
								audio: { url: '" . $CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer.audio-3.2.9.swf' }
							},
						 
							playlist: $playlisturlstring,
						 
							clip: $clip
						}
					";
	
	
	
	$retcode .= $fpconfig;
	
	//close off the javascript depending on the additional flowplayer components we need to incorp.
	if($ismobile){
		if (($playertype=="audiolist" || $playertype=="videolist") && $jscontrols){
			$retcode .= ").controls(\"" . $jscontrolsid ."\").ipad().playlist(\"div.poodllplaylist\", {loop:true});</script>";
		} else if ($playertype=="audiolist" || $playertype=="videolist"){
			$retcode .= ").ipad().playlist(\"div.poodllplaylist\", {loop:true});</script>";
		}else if($jscontrols){
			$retcode .= ").controls(\"" . $jscontrolsid ."\").ipad();</script>";
		}else{
			$retcode .= ").ipad();</script>";
		}
	}else{
		if (($playertype=="audiolist" || $playertype=="videolist") && $jscontrols){
			$retcode .= ").controls(\"" . $jscontrolsid ."\").playlist(\"div.poodllplaylist\", {loop:true});</script>";
		} else if ($playertype=="audiolist" || $playertype=="videolist"){
			$retcode .= ").playlist(\"div.poodllplaylist\", {loop:" . $loop . "});</script>";
		}else if($jscontrols){
			$retcode .= ").controls(\"" . $jscontrolsid ."\");</script>";
		}else{
			$retcode .= ");</script>";
		}
	}
	
	
	//js init call, tried any number of combinations, but couldn't get it to work J 20120604
	/*
	$jsmodule = array(
    'name'     => 'filter_poodll_flowplayer329min',
    'fullpath' => '//filter/poodll/flowplayer/flowplayer329min.js',
    'requires' => array(),
    'strings' => array()
	);
$PAGE->requires->js_init_call('M.filter_poodll_flowplayer329min.flowplayer', array($playerid, $CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer-3.2.10.swf",  $fpconfig),false,$jsmodule);
	*/
	
	
	
	//return the code
	return $retcode;
}

function fetchJSWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF", $usemastersprite="false"){
	global $CFG, $PAGE;

	//build the parameter string out of the passed in array
	$params="?";
	foreach ($paramsArray as $key => $value) {
    	$params .= '&' . $key . '=' . $value;
	}
	
	//add in any common params
	$params .= '&debug=false&lzproxied=false';	
	
	//path to our js idgets folder
	$pathtoJS = $CFG->wwwroot . '/filter/poodll/js/';
	$pathtowidgetfolder = $CFG->wwwroot . '/filter/poodll/js/' . $widget . '/';
	
	
	$retframe="<iframe scrolling=\"no\" frameBorder=\"0\" src=\"{$pathtoJS}poodlliframe.php?widget={$widget}&paramstring=" . urlencode($params) . "&width={$width}&height={$height}&bgcolor={$bgcolor}&usemastersprite={$usemastersprite}\" width=\"{$width}\" height=\"{$height}\"></iframe>"; 
	return $retframe;


}
