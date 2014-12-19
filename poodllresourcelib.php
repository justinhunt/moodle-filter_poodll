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
 

global $PAGE, $FPLAYERJSLOADED, $EMBEDJSLOADED;

//Establish if PoodLL filter is enabled
/*
$poodllenabled=false;
$context = $PAGE->context;
$filters = filter_get_active_in_context($context);
if (array_key_exists("filter_poodll",$filters)){
	$poodllenabled =true;
}
*/


	//these are required by poodll filter
	require_once($CFG->dirroot . '/filter/poodll/poodllinit.php');
	require_once($CFG->dirroot . '/filter/poodll/Browser.php');

	$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flash/swfobject_22.js'));

	
	
	//we need this for  embedding widgets it only works in head (hence the 'true' flag)
	//adn we set theglobal to try to ensure it is only loaded once. Later we could try to optimize this and call it from footer
	if(!$PAGE->requires->is_head_done()){

		$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flash/embed-compressed.js'),true);
		$EMBEDJSLOADED=true;
		
	}else{
		$EMBEDJSLOADED=false;
	}


//added for moodle 2
require_once($CFG->libdir . '/filelib.php');

//Trying to get the Flowplayer JS loaded nicely has been very tricky
//this function checks if we should load it or not. If it is not the default player
//and we are not intercepting mp3 or flv or mp4 links, we don't load it. If we do 
//it messes up the multimedia plugin. Justin 20120924
function shouldLoadFlowPlayerJS(){
	global $CFG;
	
	//If the PoodLL filter is using the flowplayer by default and handling media file extensions,
	//return true
	if ($CFG->filter_poodll_defaultplayer =='fp'
	 		&& ($CFG->filter_poodll_handleflv
	 			|| $CFG->filter_poodll_handlemp4
	 			|| $CFG->filter_poodll_handlemp3) 
	 		){
	 	return true;
	 }else{
	 	return false;
	 }
}


//this is a legacy function, could probably be removed. Justin 20120924
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


//This fetches the admin console for pairwork and screencasting
function fetch_poodllconsole($runtime ){
	global $CFG, $USER, $COURSE;
	
	$broadcastkey="1234567";
	$mename="";

	//Set the camera prefs
	$capturewidth=$CFG->filter_poodll_capturewidth;
	$captureheight=(string)(0.75 * intval($CFG->filter_poodll_capturewidth));
	$capturefps=$CFG->filter_poodll_capturefps;
	$prefcam=$CFG->filter_poodll_screencapturedevice;
	$prefmic=$CFG->filter_poodll_studentmic;
	$bandwidth=$CFG->filter_poodll_bandwidth;
	$picqual=$CFG->filter_poodll_picqual; 
	$cameraprefs= '&capturefps=' . $capturefps . '&captureheight=' . $captureheight . '&picqual=' . $picqual . '&bandwidth=' . $bandwidth . '&capturewidth=' . $capturewidth .   '&prefmic=' . $prefmic . '&prefcam=' . $prefcam;
	$flvserver = $CFG->poodll_media_server;
	$teacherpairstreamname="voiceofauthority";
	
	//auto try ports
	$autotryports = $CFG->filter_poodll_autotryports==1 ? "true" : "false" ;


	if ($mename=="" && !empty($USER->username)){
		$mename=$USER->username;
		$mefullname=fullname($USER);
		$mepictureurl=fetch_user_picture($USER,35);
	}

	//if courseid not passed in, try to get it from global
	$courseid=$COURSE->id;

	
	//We need a moodle serverid
	$moodleid = fetch_moodleid();
	
	//put in a coursedataurl
	$coursedataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php%3F';
	
	
	//Show the buttons window if we are admin
	//Also won't receive messages intended for students if we are admin. Be aware.
	if (has_capability('mod/quiz:preview', context_course::instance($courseid))){		
		$am="admin";
	}else{
		$am="0";
	}


		//here we setup the url and params for the admin console
		$baseUrl = $CFG->wwwroot . '/filter/poodll/flash/poodllconsole.lzx.swf9.swf';
		$params= '?red5url='.urlencode($flvserver). 
							'&mename=' . $mename . '&courseid=' . $courseid .  
							'&moodleid=' . $moodleid .
							'&autotryports=' . $autotryports .
							'&teacherpairstreamname=' . $teacherpairstreamname . 
							$cameraprefs .
							'&coursedataurl=' . $coursedataurl . '&broadcastkey=' . $broadcastkey .
							'&lzr=swf9&runtime=swf9';

		//create our embed tags
		$partone= '<script type="text/javascript">lzOptions = { ServerRoot: \'\'};</script>';
		$parttwo = '<script type="text/javascript" src="' . $CFG->wwwroot . '/filter/poodll/flash/embed-compressed.js"></script>';
		$partthree='<script type="text/javascript">lz.embed.swf({url: \'' . $baseUrl . $params. 
				'\' , width: \'1000\', height: \'750\', id: \'lzapp_admin_console\', accessible: \'false\'});
					</script>
				<noscript>
					Please enable JavaScript in order to use this application.
				</noscript>';
		return $partone . $parttwo . $partthree;
		

}

//In Moodle 1.9 we had a dedicated header for controlling the client, 
//may bring it back with a special PoodLL theme, so code remains Justin 20120924
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
	if (has_capability('mod/quiz:preview', context_course::instance($COURSE->id))){		
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


//Because the moodleid is appended to URLs in some PoodLL requests we need to urlencode.
//But some encoded characters mess up shared objects if decode is not called properly. 
//Since we are just creating an id, it does not need to be reconstructed, so we just
//play it safe and call this function instead of simply urlencode($CFG->wwwroot)
function fetch_moodleid(){
global $CFG;
	$moodleid =  $CFG->wwwroot;
	$splitindex = strpos($moodleid,":");
	$moodleid = substr($moodleid,$splitindex+1);
	$moodleid = str_replace("/","_",$moodleid);
	return $moodleid;
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
	
	//auto try ports
	$autotryports = $CFG->filter_poodll_autotryports==1 ? "true" : "false" ;
	
	//in order that this works effectively on tokyo.poodll.com which services multiple Moodles
	//we should change courseid (which creates a kind of virtual "room") to use the domainname of Moodle server
	$courseid = $COURSE->id;
	$moodleid=fetch_moodleid();
	
	$baseUrl = $CFG->wwwroot . '/filter/poodll/flash/newpairclient.lzx.swf9.swf';
	$params = '?red5url='.urlencode($flvserver) . '&mename=' . $mename . '&mefullname=' . $mefullname .   '&mepictureurl=' . urlencode($mepictureurl) 
			. '&chat=' . $chat  . '&autotryports=' . $autotryports . '&courseid=' . $courseid . '&moodleid=' . $moodleid .'&useroles=' . $useroles  . '&whiteboard=' . $whiteboard . '&whiteboardback=' . $whiteboardback . '&showvideo=' . $showvideo  .'&teacherallstreamname=voiceofauthority&lzproxied=false';
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
$captureheight=(string)(0.75 * intval($CFG->filter_poodll_capturewidth));
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

//moodle id
$moodleid  = fetch_moodleid();

//get my name
if($mename==""){$mename=$USER->username;}

//Set  the display sizes
$showwidth=$width;
if($showwidth==0){$showwidth=$CFG->filter_poodll_showwidth;}

$showheight=$height;
if($showheight==0){$showheight=$CFG->filter_poodll_showheight;}

//get the main url of the screensubcribe client
$baseUrl = $CFG->wwwroot . '/filter/poodll/flash/screensubscribe.lzx.swf9.swf';
$params = '?red5url='.urlencode($flvserver). '&broadcastkey='.$broadcastkey. '&showwidth='.$showwidth. '&showheight='.$showheight.'&courseid='.$COURSE->id . '&moodleid=' . $moodleid .'&mename='.$mename;
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
$captureheight=(string)(0.75 * intval($CFG->filter_poodll_capturewidth));
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



function fetch_whiteboard($runtime, $boardname, $imageurl="", $slave=false,$rooms="", $width=0,$height=0, $mode='normal',$standalone='false'){
global $CFG, $USER,$COURSE;

//head off to the correct whiteboard as defined in config
if(!isOldIE()){
	switch($CFG->filter_poodll_defaultwhiteboard){
		case 'literallycanvas':
			$forsubmission = false;
			return fetchLiterallyCanvas($forsubmission,$width,$height,$imageurl);
			break;
		case 'drawingboard':
			$forsubmission = false;
			return fetchDrawingBoard($forsubmission,$width,$height,$imageurl); 
			break;
		default:
	}
}

//set default size if necessary
if($width==0){ $width=$CFG->filter_poodll_whiteboardwidth;}
if($height==0){$height=$CFG->filter_poodll_whiteboardheight;}

//Set the servername 
$flvserver = $CFG->poodll_media_server;


//If standalone, then lets standalonify it
if($standalone == 'true'){
	$boardname="solo";
}


//Determine if we are admin, if necessary , for slave/master mode
	if ($slave && has_capability('mod/quiz:preview', context_course::instance($COURSE->id))){		
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
			//adjust size for borders and control panel
			//the board size is the size of the drawing canvas, not the widget
			$width = $width + 20;
			$height = $height + 20;
			$widgetstring=  fetchSWFWidgetCode('scribbleslave.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
		}else{
			//normal mode is a standard scribble with a cpanel
			//simple mode has a simple double click popup menu
			if ($mode=='normal'){
					//adjust size for borders and control panel
					//the board size is the size of the drawing canvas, not the widget
					$width = $width + 205;
					$height = $height + 20;
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
					//adjust size for borders and control panel
					//the board size is the size of the drawing canvas, not the widget
					$width = $width + 20;
					$height = $height + 20;
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

//In Moodle 2, we may try to save the recordings, but right now we don't - Justin 20120921
function fetchTalkbackPlayer($runtime, $descriptor_file, $streamtype="http",$recordable="false",$savefolder="default"){
global $CFG, $USER,$COURSE;

//Set the servername 
$flvserver = $CFG->poodll_media_server;

//for now the save directory is just the root of the Red5 record place.
//when we do submissions this will probably still be the same location .
$fileroot="";

//In Moodle 2 random F names should always be the case
$randomfnames="true";
		
//streamtype will always be HTTP or YUTU
//$streamtype="http";
$courseid="";

//We need a filepath stub, just in case for fetching xml and media files
$basefile = $CFG->{'wwwroot'} . "/" . $CFG->{'filter_poodll_datadir'}  . "/";


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


function fetchTalkbackPlayerOld($runtime, $descriptor_file, $streamtype="rtmp",$recordable="false",$savefolder="default"){
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

function fetchSimpleAudioRecorder($runtime, $assigname, $userid="", $updatecontrol="saveflvvoice", $filename="",$width="350",$height="200",$timelimit="0"){
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

//auto try ports, try 2 x on standard port, then 80, then 1935,then 80,1935 ad nauseum
 $autotryports = $CFG->filter_poodll_autotryports==1 ? "yes" : "no" ;

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
		$params['timelimit'] = $timelimit;
		$params['autotryports'] = $autotryports;

		//fetch and merge lang params
		$langparams = filter_poodll_fetch_recorder_strings();
		$params = array_merge($params, $langparams);	
	
	
    	$returnString=  fetchSWFWidgetCode('PoodLLAudioRecorder.lzx.swf9.swf',
    						$params,$width,$height,'#CFCFCF');
    						
    	$returnString .= 	 $savecontrol;
    						
    	return $returnString ;

}


function fetchMP3RecorderForSubmission($updatecontrol, $contextid,$component,$filearea,$itemid,$timelimit="0",$callbackjs=false){
global $CFG, $USER, $COURSE;

//get our HTML5 Uploader if we have a mobile device
if(isMobile($CFG->filter_poodll_html5rec)){
	if(!canDoUpload()){
		$ret ="<div class='mobile_os_version_warning'>" . get_string('mobile_os_version_warning', 'filter_poodll') . "</div>";
	}else{	
		$ret = fetch_HTML5RecorderForSubmission($updatecontrol, $contextid,$component,$filearea,$itemid, "audio",false,$callbackjs);
	}
	return $ret;

}

//Set the microphone config params
$micrate = $CFG->filter_poodll_micrate;
$micgain = $CFG->filter_poodll_micgain;
$micsilence = $CFG->filter_poodll_micsilencelevel;
$micecho = $CFG->filter_poodll_micecho;
$micloopback = $CFG->filter_poodll_micloopback;
$micdevice = $CFG->filter_poodll_studentmic;

//removed from params to make way for moodle 2 filesystem params Justin 20120213
$width="350";
$height="200";
$poodllfilelib= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';

//we can add or remove this, but right now, testing how good it works
$autosubmit="true";


//If we are using course ids then lets do that
//else send -1 to widget (ignore flag)
if ($CFG->filter_poodll_usecourseid){
	$courseid = $COURSE->id;
}else{
	$courseid = -1;
} 

//can we pause or not
if ($CFG->filter_poodll_miccanpause == 1){
	$canpause = 'true';
}else{
	$canpause = 'false';
} 

if ($updatecontrol == "saveflvvoice"){
	$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
}else{
	$savecontrol = "";
}
		//setup config for recirder
		$params = array();
		$params['rate'] = $micrate;
		$params['gain'] = $micgain;
		$params['prefdevice'] = $micdevice;
		$params['loopback'] = $micloopback;
		$params['echosupression'] = $micecho;
		$params['silencelevel'] = $micsilence;
		$params['course'] = $courseid;
		$params['updatecontrol'] = $updatecontrol;
		$params['uid'] = $USER->id;
		//for file system in moodle 2
		/*
		$params['poodllfilelib'] = $poodllfilelib;
		$params['contextid'] = $contextid;
		$params['component'] = $component;
		$params['filearea'] = $filearea;
		$params['itemid'] = $itemid;
		*/
		//using generic mp3 recorder these dats
		$params['posturl'] = $poodllfilelib;
		$params['p1'] = $updatecontrol;
		$params['p2'] = $contextid;
		$params['p3'] = $component;
		$params['p4'] = $filearea;
		$params['p5'] = $itemid;
		//$params['chipmunk'] = 'yes';
		
		
		
		$params['autosubmit'] = $autosubmit;
		$params['timelimit'] = $timelimit;
		$params['canpause'] = $canpause;
		
		//fetch and merge lang params
		$langparams = filter_poodll_fetch_recorder_strings();
		$params = array_merge($params, $langparams);
		
		//callbackjs
		if($callbackjs){
			$params['callbackjs'] = $callbackjs;
		}
	
	//this is the old recorder. (if it has MP3Recorder ie er, its old)
	/*
    	$returnString=  fetchSWFWidgetCode('PoodLLMP3Recorder.lzx.swf10.swf',
    						$params,$width,$height,'#CFCFCF');
    */
    $returnString=  fetchSWFWidgetCode('PoodllMP3Record.lzx.swf10.swf',
    						$params,$width,$height,'#CFCFCF');
    						
    	$returnString .= 	 $savecontrol;
    						
    	return $returnString ;

}

/*
* The literally canvas whiteboard
*
*/
function fetchLiterallyCanvas($forsubmission=true,$width=0,$height=0,$backimage="",
	$updatecontrol="", $contextid=0,$component="",$filearea="",$itemid=0,
	$callbackjs=false,$vectorcontrol="",$vectordata=""){
	
global $CFG, $USER, $COURSE,$PAGE;

	//javascript upload handler
	$opts =Array();
	if($backimage !=''){
		$opts['backgroundimage'] = $backimage;
		//$opts['bgimage'] = $backimage;
		$opts['backgroundcolor'] = 'transparent';
	}else{
		$opts['backgroundcolor'] = 'whiteSmoke';
	}
	
	if($CFG->filter_poodll_autosavewhiteboard && $forsubmission){
		$opts['autosave'] = $CFG->filter_poodll_autosavewhiteboard;
	}
	//imageurlprefix, that LC requires
	$opts['imageurlprefix']= $CFG->httpswwwroot . '/filter/poodll/js/literallycanvas.js/img';
	$opts['recorderid']= 'literallycanvas_' . time() .  rand(10000,999999);
	$opts['callbackjs']= $callbackjs;
	$opts['updatecontrol']= $updatecontrol;
	$opts['vectorcontrol'] = $vectorcontrol;
	$opts['base64control'] = '';//do this later
	$opts['vectordata'] = $vectordata;
	
	
	//We need this so that we can require the JSON , for json stringify
	$jsmodule = array(
		'name'     => 'filter_poodll',
		'fullpath' => '/filter/poodll/module.js',
		'requires' => array('json')
	);
		
	//setup our JS call
	$PAGE->requires->js_init_call('M.filter_poodll.loadliterallycanvas', array($opts),false,$jsmodule);
	//$PAGE->requires->js_init_call('M.filter_poodll.loadliterallycanvas', array($opts),false);

	//removed from params to make way for moodle 2 filesystem params Justin 20120213
	if($width==0){ $width=$CFG->filter_poodll_whiteboardwidth;}
	if($height==0){$height=$CFG->filter_poodll_whiteboardheight;}
	$poodllfilelib= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';
	
	//add the height of the control area, so that the user spec dimensions are the canvas size
	$canvasheight = $height;
	$canvaswidth = $width;
	$height=$height + 65;
	$width = $width + 60;
	


	//the control to put the filename of our picture
	if ($updatecontrol == "saveflvvoice"){
		$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
	}else{
		$savecontrol = "";
	}
	
	//set media type
	$mediatype ="image";
	
	//include jquery
	//if($CFG->version < 2013051400){
	if(true){
		$PAGE->requires->js("/filter/poodll/js/literallycanvas.js/js/jquery-1.8.2.js");
		$PAGE->requires->js("/filter/poodll/js/literallycanvas.js/js/react-0.10.0.js");
		$PAGE->requires->js("/filter/poodll/js/literallycanvas.js/js/fastclick.js");
		$PAGE->requires->js("/filter/poodll/js/literallycanvas.js/js/ie_customevent.js");
	}else{
		$PAGE->requires->jquery();
	}
	
	//include other needed libraries
	//$PAGE->requires->js("/filter/poodll/js/literallycanvas.js/js/literallycanvas.jquery.js");
	$PAGE->requires->js("/filter/poodll/js/literallycanvas.js/js/literallycanvas.min.js");
	//this won't work in a quiz, and throws an error about trying to add to page head, 
	//when page head has already been output. So copy contents of this file to styles.css in poodllfilter
	//$PAGE->requires->css(new moodle_url($CFG->wwwroot . '/filter/poodll/js/literallycanvas.js/css/literally.css'));
	


	//save button 
	$savebutton = "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_updatecontrol\" value=\"$updatecontrol\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_contextid\" value=\"$contextid\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_component\" value=\"$component\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_mediatype\" value=\"$mediatype\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_filearea\" value=\"$filearea\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_itemid\" value=\"$itemid\" />";
	
	//justin 20140521 vectordata
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_vectorcontrol\" value=\"$vectorcontrol\" />";
	
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_fileliburl\" value=\"$poodllfilelib\" />";
	if(array_key_exists('autosave',$opts)){
		$buttonclass="w_btn";
	}else{
		$buttonclass="p_btn";
	}
	$savebutton .= "<button type=\"button\" id=\"". $opts['recorderid'] . "_btn_upload_whiteboard\" class=\"$buttonclass\">" 
				. get_string('whiteboardsave', 'filter_poodll'). 
				"</button>";
	
	
	//message container
	$progresscontrols ="<div id=\"". $opts['recorderid'] . "_messages\"></div>";

		
	//container of whiteboard, bgimage and other bits and pieces.
	//old backimage logic, showed it under LC and combined it later
	if(false && $backimage !=''){
		$lcOpen = "<div class='whiteboard-wrapper' style='width:".$width."px; height:" . $height ."px;'>
			<div class='fs-container separate-backgrounds' style='width:".$width."px; height:" . $height ."px;'>
			<img id='" . $opts['recorderid']  . "_separate-background-image' class='separate-background-image' src='" . $opts['bgimage'] . "'/>
			<div id='" . $opts['recorderid']  . "_literally' class='literally separate-backgrounds'><canvas></canvas></div></div>";
	}else{
		$lcOpen = "<div class='whiteboard-wrapper' style='width:".$width."px; height:" . $height ."px;'>
			<div class='fs-container' style='width:".$width."px; height:" . $height ."px;'>
			<div id='" . $opts['recorderid']  . "_literally' class='literally'><canvas></canvas></div></div>";
	}
	$lcClose = "</div>";

	//add save control and return string
	$returnString = $lcOpen;
	if($forsubmission){
		$returnString .= $savebutton;	
		$returnString .= $savecontrol;	
		$returnString .= $progresscontrols;	
	}
	$returnString .= $lcClose;
	
    return $returnString ;

}

/*
* The Drawingboard whiteboard
*
*/
function fetchDrawingBoard($forsubmission=true,$width=0,$height=0,$backimage="",$updatecontrol="", $contextid=0,$component="",$filearea="",$itemid=0,$callbackjs=false,$vectorcontrol='',$vectordata=''){
global $CFG, $USER, $COURSE,$PAGE;

	//javascript upload handler
	$opts =Array();
	$opts['recorderid']= 'drawingboard_' . time() .  rand(10000,999999);
	$opts['callbackjs']= $callbackjs;
	$opts['updatecontrol']= $updatecontrol;
	$opts['vectorcontrol'] = $vectorcontrol;
	$opts['vectordata'] = $vectordata;
	
	//be careful here, only set the background IF
	//(a) we have an image and (b) we have no vectordata
	//if we have vector data, it will contain the image
	if($backimage !='' && $vectordata==''){
		$opts['bgimage'] = $backimage;
	}
	if($CFG->filter_poodll_autosavewhiteboard && $forsubmission){
		$opts['autosave'] = $CFG->filter_poodll_autosavewhiteboard;
	}
	
	//We need this so that we can require the JSON , for json stringify
	$jsmodule = array(
		'name'     => 'filter_poodll',
		'fullpath' => '/filter/poodll/module.js',
		'requires' => array('json')
	);
		
	//setup our JS call
	$PAGE->requires->js_init_call('M.filter_poodll.loaddrawingboard', array($opts),false,$jsmodule);
	//$PAGE->requires->js_init_call('M.filter_poodll.loaddrawingboard', array($opts),false);

	//removed from params to make way for moodle 2 filesystem params Justin 20120213
	if($width==0){ $width=$CFG->filter_poodll_whiteboardwidth;}
	if($height==0){$height=$CFG->filter_poodll_whiteboardheight;}
	$poodllfilelib= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';


	//the control to put the filename of our picture
	if ($updatecontrol == "saveflvvoice"){
		$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
	}else{
		$savecontrol = "";
	}

	//set media type
	$mediatype ="image";
	
	//include jquery , should be available in 2.5 but this fails ..?
	//so we load it
	//if($CFG->version < 2013051400){
	if(true){
		$PAGE->requires->js("/filter/poodll/js/drawingboard.js/dist/jquery-1.8.2.js");
	}else{
		$PAGE->requires->jquery();
	}
	
	//include other needed libraries
	$PAGE->requires->js("/filter/poodll/js/drawingboard.js/dist/drawingboard.min.js");


	//save button 
	$savebutton = "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_updatecontrol\" value=\"$updatecontrol\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_contextid\" value=\"$contextid\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_component\" value=\"$component\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_mediatype\" value=\"$mediatype\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_filearea\" value=\"$filearea\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_itemid\" value=\"$itemid\" />";
	$savebutton .= "<input type=\"hidden\" id=\"". $opts['recorderid'] . "_fileliburl\" value=\"$poodllfilelib\" />";
	if(array_key_exists('autosave',$opts)){
		$buttonclass="w_btn";
	}else{
		$buttonclass="p_btn";
	}
	$savebutton .= "<button type=\"button\" id=\"". $opts['recorderid'] . "_btn_upload_whiteboard\" class=\"$buttonclass\">" 
				. get_string('whiteboardsave', 'filter_poodll'). 
				"</button>";
	
	//message container		
	$progresscontrols = "<div id=\"". $opts['recorderid'] . "_messages\"></div>";

	//init return string with container of whiteboard	
	$dbOpen = "<div class='whiteboard-wrapper' style='width:".$width."px; height:" . $height ."px;'>
		<div class='board drawing-board' id='". $opts['recorderid'] . "_drawing-board-id' style='width:".$width."px; height:" . $height ."px;'></div>";	
	$dbClose ="</div>";
		
	//add save control and return string
	$returnString = $dbOpen;
	if($forsubmission){
		$returnString .= $savecontrol;	
		$returnString .= $savebutton;	
		$returnString .= $progresscontrols;	
	}
	$returnString .= $dbClose;
    return $returnString ;

}



function fetchWhiteboardForSubmission($updatecontrol, $contextid,$component,$filearea,$itemid,$width=0,$height=0,$backimage="",$prefboard="",$callbackjs=false, $vectorcontrol="",$vectordata=""){
global $CFG, $USER, $COURSE;

//head off to the correct whiteboard as defined in config
//we override prefboard if they couldn't use it anyway(ie old IE)
if(isOldIE()){$prefboard='poodll';}
if($prefboard==""){
	$useboard = $CFG->filter_poodll_defaultwhiteboard;
}else{
	$useboard = $prefboard;
}	

switch($useboard){
	case 'literallycanvas':
		$forsubmission = true;
		return fetchLiterallyCanvas($forsubmission,$width,$height,$backimage,$updatecontrol, $contextid,$component,$filearea,$itemid,$callbackjs,$vectorcontrol,$vectordata);
		break;
	case 'drawingboard':
		$forsubmission = true;
		return fetchDrawingBoard($forsubmission,$width,$height,$backimage,$updatecontrol, $contextid,$component,$filearea,$itemid,$callbackjs,$vectorcontrol,$vectordata);
		break;
	default:
}



//head off to HTML5 logic if mobile
if(isMobile($CFG->filter_poodll_html5widgets)){
	
	$forsubmission = true;
	return fetchDrawingBoard($forsubmission,$width,$height,$backimage,$updatecontrol, $contextid,$component,$filearea,$itemid,$callbackjs,$vectorcontrol,$vectordata);
	//the old logic follows but using drawingboard.js is probably better.
	//if the sky falls in, we will revert though. Justin 20131202
	/*	
	if(!canDoUpload()){
		$ret ="<div class='mobile_os_version_warning'>" . get_string('mobile_os_version_warning', 'filter_poodll') . "</div>";
	}else{	
		$ret = fetch_HTML5RecorderForSubmission($updatecontrol, $contextid,$component,$filearea,$itemid, "image");
	}
	return $ret;
	*/

}


//If standalone submission will always be standalone ... or will it ...
//pair submissions could be interesting ..
$boardname="solo";
$mode="normal";
	

	//removed from params to make way for moodle 2 filesystem params Justin 20120213
	if($width==0){ $width=$CFG->filter_poodll_whiteboardwidth;}
	if($height==0){$height=$CFG->filter_poodll_whiteboardheight;}
	$poodllfilelib= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';
	
//adjust size for borders and control panel
//the board size is the size of the drawing canvas, not the widget
$width = $width + 205;
$height = $height + 20;


	//the control to put the filename of our picture
	if ($updatecontrol == "saveflvvoice"){
		$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
	}else{
		$savecontrol = "";
	}

	$params = array();


		$params['updatecontrol'] = $updatecontrol;
		$params['boardname'] = $boardname;
		$params['imageurl'] = $backimage;
		$params['courseid'] = $COURSE->id;
		//for file system in moodle 2
		$params['poodllfilelib'] = $poodllfilelib;
		$params['contextid'] = $contextid;
		$params['component'] = $component;
		$params['filearea'] = $filearea;
		$params['itemid'] = $itemid;
		$params['vectordata'] = $vectordata;
		$params['vectorcontrol'] = $vectorcontrol;
		$params['recorderid'] ='pwboard_' . time() .  rand(10000,999999);
		
		if($callbackjs){
			$params['callbackjs'] = $callbackjs;
		}
		if($CFG->filter_poodll_autosavewhiteboard ){
			$params['autosave'] = $CFG->filter_poodll_autosavewhiteboard;
		}
		
		//normal mode is a standard scribble with a cpanel
		//simple mode has a simple double click popup menu, but not submit feature
		//all submit is via normal mode, for now.
		if ($mode=='normal'){
			$returnString =  fetchSWFWidgetCode('scribblesubmit.lzx.swf9.swf',
				$params,$width,$height,'#FFFFFF');	
		}else{
			
			$returnString =  fetchSWFWidgetCode('scribblesubmit.lzx.swf9.swf',
					$params,$width,$height,'#FFFFFF');
		}

    						
    	$returnString .= 	 $savecontrol;
    						
    	return $returnString ;

}

function fetchAudioRecorderForSubmission($runtime, $assigname, $updatecontrol="saveflvvoice", $contextid,$component,$filearea,$itemid,$timelimit="0",$callbackjs=false){
global $CFG, $USER, $COURSE;

//get our HTML5 Uploader if we have a mobile device
if(isMobile($CFG->filter_poodll_html5rec)){
	if(!canDoUpload()){
		$ret ="<div class='mobile_os_version_warning'>" . get_string('mobile_os_version_warning', 'filter_poodll') . "</div>";
	}else{	
		$ret = fetch_HTML5RecorderForSubmission($updatecontrol, $contextid,$component,$filearea,$itemid, "audio",false,$callbackjs);
	}
	return $ret;

}


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
$width="350";
$height="200";
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

//auto try ports, try 2 x on standard port, then 80, then 1935,then 80,1935 ad nauseum
 $autotryports = $CFG->filter_poodll_autotryports==1 ? "yes" : "no" ;

		//set up our params for recorder
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
		$params['timelimit'] = $timelimit;
		$params['autotryports'] = $autotryports;
		
		//fetch and merge lang params
		$langparams = filter_poodll_fetch_recorder_strings();
		$params = array_merge($params, $langparams);
		
		
		if($callbackjs){
			$params['callbackjs']=$callbackjs;
		}
	
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
	if (has_capability('mod/quiz:preview', context_course::instance($COURSE->id))){		
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
	
	 }elseif($runtime=='js'){
    	$returnString=   fetchJSWidgetCode('stopwatch.lzx.js',
    						$params,$width,$height,'#FFFFFF');
							
	 }elseif($runtime=='auto'){
    	$returnString=  fetchAutoWidgetCode('stopwatch.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    }else{
    	$returnString=  fetchAutoWidgetCode('stopwatch.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    }
   						
    return $returnString;
    

}

function fetch_poodllcalc($runtime, $width, $height,$size='normal'){
global $CFG;

	//merge config data with javascript embed code
		$params = array();
		$params['size'] = $size;
		
		//fix up width and height which should not really be accepted as params
		switch($size){
			case 'normal' : $width=242;$height=362;break;
			case 'small' : $width=202;$height=302;break;
			case 'tiny' : $width=172;$height=262;break;
		
		}
		
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

function fetch_poodllscroller($start=true,$width="300", $height="150",$speed=10,$repeat='yes', $axis="y", $pixelshift="2"){
global $CFG,$PAGE;

//start up the scroller
if($start){

	$uniqueid = rand(10000,999999);
	//configure our options array
	//scrollspeed(1(slow) - 50(fast)) and pixelshift(1 - 5 probably) are the determinants of speed
	//every (50 - scrollspeed)ms the scroller moves (pixelshift)pixels

	$opts = array(
			"scrollerid" => $uniqueid,
			"pixelshift" => $pixelshift,
			"scrollspeed" => 51 - $speed, 
			"repeat" => $repeat,
			"topspace" => "2px", 
			"leftspace" => "2px",
			"framesize" => "2px",
			"axis" => $axis 
			);
		
		//The JS array for passing in options
		$jsmodule = array(
			'name'     => 'filter_poodll',
			'fullpath' => '/filter/poodll/module.js'
		);
		
		
	//setup our JS call
	$PAGE->requires->js_init_call('M.filter_poodll.loadscroller', array($opts),false,$jsmodule);

	//Set the width/height of the scrollcontainer
	$dimensions = "width:" . $width . "px; height:" . $height . "px";
	
	//set the display class of scroll box per axis
	//x scroll shouldn't wrap words
	if($axis=="y"){
		$axisclass = "yaxis";
	}else{
		$axisclass = "xaxis";
	}
	
	//The scrollbox container
	$returnString = "<div id='p_scrollboxcontainer" . $uniqueid .  "' class='p_scrollboxcontainer' style='$dimensions'>";	
	
	//the clickable "start" button
  	$returnString .= "<div class='p_scroll_btn_wrapper'>";
	$returnString .= "<button type='button' onclick='M.filter_poodll.ScrollBoxStart($uniqueid)' id='p_scrollstartbutton" . $uniqueid .  "' class='p_btn'>Start</button>";
	$returnString .= "</div>";
	
	
	//The scrollbox that gets scrolled
	$returnString .="<div id='p_scrollbox" . $uniqueid .  "' class='p_scrollbox $axisclass'>";
	
	return $returnString;
}else{
	//close off the scroller
   	$returnString = "</div>";
 			
   	$returnString .= "</div>";						
    return $returnString;
}

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
	if (has_capability('mod/quiz:preview', context_course::instance($COURSE->id))){		
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
	//otherwise show countdown timer
	if ($mode=='master' && !$isadmin) {
    	$returnString=  fetchSWFWidgetCode('slaveview.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    }elseif($runtime=='swf'){
    	$returnString=  fetchSWFWidgetCode('countdowntimer.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	}elseif($runtime=='js'){
		$returnString=  fetchJSWidgetCode('countdowntimer.lzx.js',
    						$params,$width,$height,'#FFFFFF');
							
	}elseif($runtime=='auto'){
    	$returnString=  fetchAutoWidgetCode('countdowntimer.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    }else{		
		$returnString=  fetchAutoWidgetCode('countdowntimer.lzx.swf9.swf',
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
							
		}elseif($runtime=="js"){
    		$returnString=  fetchJSWidgetCode('counter.lzx.js',
    						$params,$width,$height,'#FFFFFF');
							
		}elseif($runtime=="auto"){
    		$returnString=  fetchAutoWidgetCode('counter.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
							
		}else{
			$returnString=  fetchAutoWidgetCode('counter.lzx.swf9.swf',
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
	
	}elseif($runtime=="js"){
    	$returnString=   fetchJSWidgetCode('dice.lzx.js',
    						$params,$width,$height,'#FFFFFF');
							
	}elseif($runtime=="auto"){
    	$returnString=  fetchAutoWidgetCode('dice.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	}else{
		$returnString=  fetchAutoWidgetCode('dice.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
	}
    	

    						
    	return $returnString ;

}

function fetch_flashcards($runtime, $cardset,$cardsetname, $frontcolor,$backcolor, $cardwidth,$cardheight,$randomize,$width,$height){
global $CFG,$COURSE;


	//determine which of, automated or manual cardsets to use
	if(strlen($cardset) > 4 && substr($cardset,0,4)=='http'){
		$fetchdataurl=$cardset;
	}elseif(strlen($cardset) > 4 && substr($cardset,-4)==".xml"){
		//get a manually made playlist
		//$fetchdataurl= $CFG->wwwroot . "/file.php/" .  $COURSE->id . "/" . $cardset;
		$fetchdataurl = $CFG->wwwroot . "/" . $CFG->filter_poodll_datadir  . "/" .  $cardset ;
	}else{
		//get the url to the automated medialist maker
		$fetchdataurl= $CFG->wwwroot . '/filter/poodll/poodlllogiclib.php?datatype=poodllflashcards&courseid=' . $COURSE->id 
			. '&paramone=' . $cardset 
			. '&paramtwo=' . $cardsetname
			. '&paramthree=' . $frontcolor 			
			. '&paramfour=' . $backcolor 	
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
$captureheight=(string)(0.75 * intval($CFG->filter_poodll_capturewidth));
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
		
		//fetch and merge lang params
		$langparams = filter_poodll_fetch_recorder_strings();
		$params = array_merge($params, $langparams);
	
    	$returnString=  fetchSWFWidgetCode('PoodLLSnapshot.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');

    						
    	return $returnString;
	

}

function fetchSnapshotCameraForSubmission($updatecontrol="filename", $filename="apic.jpg", $width="350",$height="400",$contextid,$component,$filearea,$itemid,$callbackjs=false){
global $CFG, $USER, $COURSE;

//get our HTML5 Uploader if we have a mobile device
if(isMobile($CFG->filter_poodll_html5widgets)){
	if(!canDoUpload()){
		$ret ="<div class='mobile_os_version_warning'>" . get_string('mobile_os_version_warning', 'filter_poodll') . "</div>";
	}else{	
		$ret = fetch_HTML5RecorderForSubmission($updatecontrol, $contextid,$component,$filearea,$itemid, "image",false,$callbackjs);
	}
	return $ret;
}

//Set the servername and a capture settings from config file

$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight=(string)(0.75 * intval($CFG->filter_poodll_capturewidth));
$capturefps=$CFG->filter_poodll_capturefps;
$prefcam=$CFG->filter_poodll_studentcam;
$prefmic=$CFG->filter_poodll_studentmic;
$bandwidth=$CFG->filter_poodll_bandwidth;
$picqual=$CFG->filter_poodll_picqual;

//poodllfilelib for file handling
$poodllfilelib= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';

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
		
		//for file system in moodle 2
		$params['poodllfilelib'] = $poodllfilelib;
		$params['contextid'] = $contextid;
		$params['component'] = $component;
		$params['filearea'] = $filearea;
		$params['itemid'] = $itemid;
		
		//recorder id
		$params['recorderid'] = "sshot_" . time() .  rand(10000,999999);
		
		//set to auto submit
		$params['autosubmit'] = 'true';
		
		//fetch and merge lang params
		$langparams = filter_poodll_fetch_recorder_strings();
		$params = array_merge($params, $langparams);
		
		//callbackjs
		if($callbackjs){
			$params['callbackjs'] = $callbackjs;
		}
	
	
    	$returnString=  fetchSWFWidgetCode('PoodLLSnapshot.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');

    						
    	return $returnString;
	

}


function fetchCamBroadcaster($runtime, $mename="",$broadcastkey="1234567",$width=350,$height=350){
global $CFG, $USER, $COURSE;

//Set the servername and a capture settings from config file
$flvserver = $CFG->poodll_media_server;
$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight=(string)(0.75 * intval($CFG->filter_poodll_capturewidth));
$capturefps=$CFG->filter_poodll_capturefps;
$prefcam=$CFG->filter_poodll_studentcam;
$prefmic=$CFG->filter_poodll_studentmic;
$bandwidth=$CFG->filter_poodll_bandwidth;
$picqual=$CFG->filter_poodll_picqual;

//Set the microphone config params
/*
$micrate = $CFG->filter_poodll_micrate;
$micgain = $CFG->filter_poodll_micgain;
$micsilence = $CFG->filter_poodll_micsilencelevel;
$micecho = $CFG->filter_poodll_micecho;
$micloopback = $CFG->filter_poodll_micloopback;
*/

//If no user id is passed in, try to get it automatically
//Not sure if  this can be trusted, but this is only likely to be the case
//when this is called from the filter. ie not from an assignment.

//get my name
if($mename==""){$mename=$USER->username;}

//We need a moodle serverid
	$moodleid = fetch_moodleid();
	

$params = array();
		$params['red5url'] = urlencode($flvserver);
		//$params['rate'] = $micrate;
		//$params['gain'] = $micgain;
		//$params['loopback'] = $micloopback;
		//$params['echosupression'] = $micecho;
		//$params['silencelevel'] = $micsilence;
		$params['capturefps'] = $capturefps;
		$params['capturedevice'] = $capturedevice;
		$params['captureheight'] = $captureheight;
		$params['picqual'] = $picqual;
		$params['bandwidth'] = $bandwidth;
		$params['capturewidth'] = $capturewidth;
		$params['prefmic'] = $prefmic;
		$params['prefcam'] = $prefcam;
		$params['courseid'] = $COURSE->id;
		$params['moodleid'] = $moodleid;
		$params['broadcastkey'] = $broadcastkey;
		$params['mename'] = $mename;
	
    	$returnString=  fetchSWFWidgetCode('cambroadcaster.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');

    						
    	return $returnString ;
	

}


function fetchSimpleVideoRecorder($runtime, $assigname, $userid="", $updatecontrol="saveflvvoice", $filename="", $width="350",$height="400",$timelimit="0"){
global $CFG, $USER, $COURSE;

//Set the servername and a capture settings from config file
$flvserver = $CFG->poodll_media_server;
$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight=(string)(0.75 * intval($CFG->filter_poodll_capturewidth));
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

//auto try ports, try 2 x on standard port, then 80, then 1935,then 80,1935 ad nauseum
 $autotryports = $CFG->filter_poodll_autotryports==1 ? "yes" : "no" ;

		//set up config for recorders
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
		$params['timelimit'] = $timelimit;
		$params['autotryports'] = $autotryports;
		
		//fetch and merge lang params
		$langparams = filter_poodll_fetch_recorder_strings();
		$params = array_merge($params, $langparams);
		
	
    	$returnString=  fetchSWFWidgetCode('PoodLLVideoRecorder.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    						
    	$returnString .= 	$savecontrol;
    						
    	return $returnString ;
	

}

function fetchVideoRecorderForSubmission($runtime, $assigname, $updatecontrol="saveflvvoice", $contextid,$component,$filearea,$itemid,$timelimit="0",$callbackjs=false){
global $CFG, $USER, $COURSE;

//head off to HTML5 logic if mobile
if (isMobile($CFG->filter_poodll_html5rec)){
	if(!canDoUpload()){
		$ret ="<div class='mobile_os_version_warning'>" . get_string('mobile_os_version_warning', 'filter_poodll') . "</div>";
	}else{	
		$ret = fetch_HTML5RecorderForSubmission($updatecontrol, $contextid,$component,$filearea,$itemid, "video",false,$callbackjs);
	}
	return $ret;
}

//Set the servername and a capture settings from config file
$flvserver = $CFG->poodll_media_server;
$capturewidth=$CFG->filter_poodll_capturewidth;
$captureheight= (string)(0.75 * intval($CFG->filter_poodll_capturewidth));
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
$filename="12345"; 
$poodllfilelib= $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';
switch($assigname){
	case 'poodllrepository':
		$width="298";
		$height="340";
		break;
	default:
		$width="350";
		$height="400";
}

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

//auto try ports, try 2 x on standard port, then 80, then 1935,then 80,1935 ad nauseum
 $autotryports = $CFG->filter_poodll_autotryports==1 ? "yes" : "no" ;

		//set up config for recorders
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
		$params['timelimit'] = $timelimit;
		$params['autotryports'] = $autotryports;
		
		//fetch and merge lang params
		$langparams = filter_poodll_fetch_recorder_strings();
		$params = array_merge($params, $langparams);
		
		//callbackjs
		if($callbackjs){
			$params['callbackjs'] = $callbackjs;
		}
	
    	$returnString=  fetchSWFWidgetCode('PoodLLVideoRecorder.lzx.swf9.swf',
    						$params,$width,$height,'#FFFFFF');
    						
    	$returnString .= 	$savecontrol;
    						
    	return $returnString ;
	

}

function fetch_HTML5RecorderForSubmission($updatecontrol="saveflvvoice", $contextid,$component,$filearea,$itemid, $mediatype="image",$fromrepo=false, $callbackjs=false){
global $CFG,$PAGE;

	//Get our browser object for determining HTML5 options
	$browser = new Browser();

	//configure our options array for the JS Call
	$fileliburl = $CFG->wwwroot . '/filter/poodll/poodllfilelib.php';
	$opts = array();
	$opts['recorderid']=$mediatype .'recorder_' . time() .  rand(10000,999999);
	$opts['callbackjs']=$callbackjs;
	$opts['updatecontrol']=$updatecontrol;
		
	//setup our JS call
	if(!$fromrepo){
		$PAGE->requires->js_init_call('M.filter_poodll.loadmobileupload', array($opts),false);
	}

	//the control to put the filename of our data. The saveflvvoice is a legacy, needs to be changed
	//check at least poodllrecordingquestion and poodll online assignment and poodll database field for it
	if ($updatecontrol == "saveflvvoice"){
		$savecontrol = "<input name='saveflvvoice' type='hidden' value='' id='saveflvvoice' />";
	}else{
		$savecontrol = "";
	}

	//depending on our media type, tell the mobile device what kind of file we want
	//we need to check for audio, because iOS still needs video (can't direct rec audio)
	switch($mediatype){
		case "image": $acceptmedia="accept=\"image/*\"";break;
		case "audio": 
					if(canSpecAudio($browser)){	
						$acceptmedia="accept=\"audio/*\"";
					}else{
						$acceptmedia="accept=\"video/*\"";
					}
					break;
		case "video": $acceptmedia="accept=\"video/*\"";break;
		default: $acceptmedia="";
	}
	
	//Output our HTML
	$fancybutton = showFancyButton($browser);
	$returnString = "";
	
	if($fancybutton){ $returnString .= "<div class=\"p_btn_wrapper\">";}
	$returnString .="
			$savecontrol
			<input type=\"hidden\" id=\"" . $opts['recorderid'] . "_updatecontrol\" value=\"$updatecontrol\" />
			<input type=\"hidden\" id=\"" . $opts['recorderid'] . "_contextid\" value=\"$contextid\" />
			<input type=\"hidden\" id=\"" . $opts['recorderid'] . "_component\" value=\"$component\" />
			<input type=\"hidden\" id=\"" . $opts['recorderid'] . "_filearea\" value=\"$filearea\" />
			<input type=\"hidden\" id=\"" . $opts['recorderid'] . "_itemid\" value=\"$itemid\" />
			<input type=\"hidden\" id=\"" . $opts['recorderid'] . "_mediatype\" value=\"$mediatype\" />
			<input type=\"hidden\" id=\"" . $opts['recorderid'] . "_fileliburl\" value=\"$fileliburl\" />
			<input type=\"file\" id=\"" . $opts['recorderid'] . "_poodllfileselect\" name=\"poodllfileselect[]\" $acceptmedia />
			";
	if($fancybutton){ $returnString .= 
			"<button type=\"button\" class=\"p_btn\">Record or Choose a File</button>
		</div>";}
	$returnString .= 
		"<div id=\"" . $opts['recorderid'] . "_progress\" class=\"p_progress\"><p></p></div>
		<div id=\"" . $opts['recorderid'] . "_messages\" class=\"p_messages\"></div>";

	return $returnString;
}

//Audio playltest player with defaults, for use with directories of audio files
function fetch_miniplayer($runtime, $src,$protocol="http",$imageurl="",$width=0,$height=0,$iframe=false){
global  $CFG, $COURSE;

		//support legacy files, just in case we have an old timer ...
		if($protocol=='rtmp' || $protocol=='legacy'){
			$src= $CFG->wwwroot . "/file.php/" .  $COURSE->id . "/" . $src;
			$type = 'http';
		}
		
		if($width==0){
			$width=$CFG->filter_poodll_miniplayerwidth;
		}
		if($height==0){
			$height=$CFG->filter_poodll_miniplayerwidth;
		}
	
		$params = array();

		$params['src']= $src;//urlencode($src);
	

		//for html5 players we can make a picture link to play the audio
		//the default is in the poodll filter directory
		if($imageurl==""){
			$imageurl = $CFG->wwwroot . "/filter/poodll/pix/MiniPlayIcon32.png";
		}
    						
    	
	//depending on runtime, we show a SWF or html5 player			
	if($runtime=="js" || ($runtime=="auto" && isMobile($CFG->filter_poodll_html5play))){
	
		//the $src url as it comes from assignment and questions, is urlencoded,
		//unlikely to arrive here encoded, but lets just be safe 
		//or html 5 playback will fail Justin 20121016
		$src= urldecode($src);
	
		$returnString=  "<a onclick=\"this.firstChild.play()\"><audio src=\"$src\"></audio><img height=\"$height\" width=\"$width\" src=\"" . 
				$imageurl . 
				"\"/></a>";
		
	}else{
		//in the autolinked glossary popup, JS is not run and embed fails. In that case we use an iframe justin 20120814 
		if($iframe){
				$returnString= fetchIFrameSWFWidgetCode('poodllminiplayer.lzx.swf9.swf',
							$params,$width,$height,'#FFFFFF');
		}else{		
    			$returnString=  fetchSWFWidgetCode('poodllminiplayer.lzx.swf9.swf',
							$params,$width,$height,'#FFFFFF');
		}
	}
		
		
		return $returnString;


}

//Audio playltest player with defaults, for use with directories of audio files
function fetch_wordplayer($runtime, $src,$word,$fontsize, $protocol="http", $width="0",$height="0",$iframe=false){

global  $CFG, $COURSE;

		//support legacy files, just in case we have an old timer ...
		if($protocol=='rtmp' || $protocol=='legacy'){
			$src= $CFG->wwwroot . "/file.php/" .  $COURSE->id . "/" . $src;
			$type = 'http';
		}

		//fontsize if not passed in is set to the filtersettings default
		if ($fontsize==0){
			$fontsize = $CFG->filter_poodll_wordplayerfontsize;
		}
		
		if($width ==0 || $height == 0){
			$height=$fontsize + (int)($fontsize * 0.5);
			$width=(int)($fontsize * 0.8) * strlen($word);
		}
		
		$params = array();
		//$params['red5url'] = urlencode($flvserver);
		$params['src']=urlencode($src);
		$params['word']= $word;
		$params['fontsize']= $fontsize;
	
		//depending on runtime, we show a SWF or html5 player					
		if($runtime=="js" || ($runtime=="auto" && isMobile($CFG->filter_poodll_html5play))){
		
			//the $src url as it comes from assignment and questions, is urlencoded,
			//unlikely to arrive here encoded, but lets just be safe 
			//or html 5 playback will fail Justin 20121016
			$src= urldecode($src);
		
			$returnString=  "<a onclick=\"this.firstChild.play()\"><audio src=\"$src\"></audio>$word</a>";
		
		}else{
			//in the autolinked glossary popup, JS is not run and embed fails. In that case we use an iframe justin 20120814 
			if($iframe){
				$returnString= fetchIFrameSWFWidgetCode('poodllwordplayer.lzx.swf9.swf',
							$params,$width,$height,'#FFFFFF');
			}else{
				$returnString=  fetchSWFWidgetCode('poodllwordplayer.lzx.swf9.swf',
							$params,$width,$height,'#FFFFFF');
			}
		}
							
							
    						
    	return $returnString;


}

//Plays audio file only once
function fetch_onceplayer($runtime, $src,$protocol="http",$width=0,$height=0,$iframe=false){
global  $CFG, $COURSE;

		//support legacy files, just in case we have an old timer ...
		if($protocol=='rtmp' || $protocol=='legacy'){
			$src= $CFG->wwwroot . "/file.php/" .  $COURSE->id . "/" . $src;
			$type = 'http';
		}
		
		if($width==0){
			$width=250;
		}
		if($height==0){
			$height=100;
		}
	
		$params = array();

		$params['src']= $src;//urlencode($src);
	
				
    	
	//depending on runtime, we show a SWF or html5 player
	//currently no js implementation	
	if(false){
	//if($runtime=="js" || ($runtime=="auto" && isMobile($CFG->filter_poodll_html5play))){
	
		//the $src url as it comes from assignment and questions, is urlencoded,
		//unlikely to arrive here encoded, but lets just be safe 
		//or html 5 playback will fail Justin 20121016
		$src= urldecode($src);
	
		$returnString=  "<a onclick=\"this.firstChild.play()\"><audio src=\"$src\"></audio><img height=\"$height\" width=\"$width\" src=\"" . 
				$imageurl . 
				"\"/></a>";
		
	}else{
		//use iframe or not
		if($iframe){
				$returnString= fetchIFrameSWFWidgetCode('onceplayer.lzx.swf9.swf',
							$params,$width,$height,'#FFFFFF');
		}else{		
    			$returnString=  fetchSWFWidgetCode('onceplayer.lzx.swf9.swf',
							$params,$width,$height,'#FFFFFF');
		}
	}
		
		
		return $returnString;


}

//Audio playlisttest player with defaults, for use with directories of audio files
function fetchAudioTestPlayer($runtime, $playlist,$protocol="", $width="400",$height="150",$filearea="content",$usepoodlldata=true){
global $CFG, $USER, $COURSE;

$moduleid = optional_param('id', 0, PARAM_INT);    // The ID of the current module (eg moodleurl/view.php?id=X )

//Set our servername .
$flvserver = $CFG->poodll_media_server;

////if usepoodlldata, then set that to filearea
if($usepoodlldata){$filearea="poodlldata";}


//determine which of, automated or manual playlists to use
if(strlen($playlist) > 4 && substr($playlist,-4)==".xml"){
	//get a manually made playlist
	$fetchdataurl = $CFG->wwwroot . "/" . $CFG->filter_poodll_datadir  . "/" . $playlist ;
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
function fetchAudioListPlayer($runtime, $playlist, $filearea="content",$protocol="", $width="400",$height="350",$sequentialplay="true",$useplayer,$showplaylist,$usepoodlldata=false){
global $CFG, $USER, $COURSE;

$moduleid = optional_param('id', 0, PARAM_INT);    // The ID of the current module (eg moodleurl/view.php?id=X )


//determine if we are on a mobile device or not
 $ismobile = isMobile($CFG->filter_poodll_html5play);

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
	
	//if we are using poodll data, flag that in the filearea param
	if($usepoodlldata){$filearea="poodlldata";}
	
	
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
function fetchSimpleAudioPlayer($runtime, $rtmp_file, $protocol="", $width="450",$height="25",
										$embed=false, $embedstring="Play",$permitfullscreen=false,
										$usepoodlldata=false, $splashurl=''){
global $CFG, $USER, $COURSE;

//Set our servername .
$flvserver = $CFG->poodll_media_server;
$courseid= $COURSE->id;
$useplayer=$CFG->filter_poodll_defaultplayer;

//determine if we are on a mobile device or not
 $ismobile = isMobile($CFG->filter_poodll_html5play);

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
	//if using poodlldata, take stub from base dir + poodlldatadir then add file name/path	
	}else if($usepoodlldata){
		$baseURL = $CFG->{'wwwroot'} . "/" . $CFG->{'filter_poodll_datadir'}  . "/" ;
		$rtmp_file = $baseURL . $rtmp_file;
	}
	
	//If we want to avoid loading many players per page, this loads the player only after a text link is clicked
	//it uses the poodll player and only works if the file is an flv, otherwise it just proceeds as usual
	
	//I quit loading javascript.php in head, so loadAudioPlayer won't work. I think noone uses it anyway. hence added if "false"
	//Justin 20130406
	if (false && $embed && substr($rtmp_file,-4)=='.flv'){
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
		
		
		//establish the fileextension
		$ext = substr($rtmp_file,-3);
	
		//if we are on mobile we want to play mp3 using html5 tags
		//if we have a file type that flash wont play, default to runtime = js
		if($runtime=='auto' ){
			if($ismobile){		
					$runtime='js';
			}else if($ext=='3gp' || $ext=='ebm' || $ext=='3g2'){
					$runtime='js';
			}else{
					$runtime='swf';
			}
		}//end of if runtime=auto

	
	
		if($runtime=='js' && ($CFG->filter_poodll_html5controls=='native')){
				$returnString="";
				
				
				//the $rtmp_file as it comes from assignment and questions, is urlencoded, we need to decode 
				//or html 5 playback will fail Justin 20121016
				$rtmp_file = urldecode($rtmp_file);
				
				//figure out the mime type by the extension
				$mime = "";
				switch($ext){
					case "mov":
					case "mp4": $mime = "video/mp4"; break;
					case "3gp": $mime = "video/3gpp"; break;
					case "3g2": $mime = "video/3gpp2"; break;
					case "ebm": $mime = "video/webm"; break;
					default: $mime = "video/mp4";
				}
				
				//The HTML5 Code (can be used on its own OR with the mediaelement code below it
				$returnString .="<audio controls width='" . $width . "' height='" . $height . "'>
								<source type='" . $mime . "' src='" .$rtmp_file . "'/>
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
					
					$returnString= fetchFlowPlayerCode($width,$height,$rtmp_file,"audio",$ismobile,"",false,$splashurl);
				
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
				
				//regardless of swf player, add a download icon if appropriate
				$context = context_course::instance($COURSE->id);
				$has_permission = has_capability('filter/poodll:candownloadmedia', $context);
				if($CFG->filter_poodll_download_media_ok && $has_permission){
					$returnString .=  "<a href='" . urldecode($rtmp_file) . "'>" 
													. "&nbsp;<img src='" . $CFG->{'wwwroot'} . "/filter/poodll/pix/download.gif' alt='download' />" 
													."</a>";
				}
							
		}
    						
    	return $returnString;
}



//Video player with defaults, for use with PoodLL filter
function fetchSimpleVideoPlayer($runtime, $rtmp_file, $width="400",$height="380",$protocol="",$embed=false,$permitfullscreen=false, $embedstring="Play", $splashurl="",$useplayer=""){
global $CFG, $USER, $COURSE;

//Set our servername .
$flvserver = $CFG->poodll_media_server;
$courseid= $COURSE->id;

//Set the playertype to use
if($protocol=="yutu"){
	$useplayer="pd";
}else if($useplayer==""){
	$useplayer=$CFG->filter_poodll_defaultplayer;
}

//determine if we are on a mobile device or not
$ismobile=isMobile($CFG->filter_poodll_html5play);
//$ismobile=true;


	//Massage the media file name if we have a username variable passed in.	
	//This allows us to show different video to each student
	if(isset($USER->username)){
		$rtmp_file = str_replace( "@@username@@",$USER->username,$rtmp_file);
	}
	
	//Determine if we are admin, admins can always fullscreen
	if (has_capability('mod/quiz:preview', context_course::instance($COURSE->id))){		
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
	//if ($embed){
	if (false){
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
		
		//establish the fileextension
		$ext = substr($rtmp_file,-3);
	
		//if we are on mobile we want to play mp3 using html5 tags
		if($runtime=='auto' ){
			if($ismobile){		
					$runtime='js';
			}else if($ext=='3gp' || $ext=='ebm' || $ext=='3g2'){
					$runtime='js';
			}else{
					$runtime='swf';
			}
		}//end of if runtime=auto
	
	
		if($runtime=='js' && ($CFG->filter_poodll_html5controls=='native')){
				$returnString="";

			//get a poster image if it is appropriate
			$poster = "";
			if ($splashurl!=""){
				$poster=$splashurl;
			}else  if($CFG->filter_poodll_videosplash){
				if($CFG->filter_poodll_thumbnailsplash){
					$splashurl = fetchVideoSplash($rtmp_file);
				}else{
					$splashurl=false;
				}
				if(!$splashurl){$splashurl = $CFG->wwwroot . "/filter/poodll/flowplayer/videosplash.jpg";}
				$poster=$splashurl;
			}
			
			//the $rtmp_file as it comes from assignment and questions, is urlencoded, we need to decode 
			//or html 5 playback will fail Justin 20121016
			$rtmp_file = urldecode($rtmp_file);
			
			//figure out the mime type by the extension
			$mime = "";
			switch($ext){
				case "mov":
				case "mp4": $mime = "video/mp4"; break;
				case "3gp": $mime = "video/3gpp"; break;
				case "3g2": $mime = "video/3gpp2"; break;
				case "ebm": $mime = "video/webm"; break;
				default: $mime = "video/mp4";
			}
			
			//return the html5 video code
			$returnString .="<video controls poster='" . $poster . "' width='" . $width . "' height='" . $height . "'>
								<source type='" . $mime . "' src='" .$rtmp_file . "'/>
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
					
					$returnString= fetchFlowPlayerCode($width,$height,$rtmp_file,"video",$ismobile,"",false,$splashurl);
				
				//JW player
				} else if($useplayer=="jw"){
					$flashvars = array();
					$flashvars['file'] = $rtmp_file;
					$flashvars['autostart'] = 'false';
					$returnString=  fetchSWFObjectWidgetCode('jwplayer.swf',
								$flashvars,$width,$height,'#FFFFFF');
				

				
				//PoodLL Player
				}else{
					$params['playerbackcolor']=$CFG->filter_poodll_fp_bgcolor;
					$returnString=  fetchSWFWidgetCode('poodllvideoplayer.lzx.swf9.swf',
								$params,$width,$height,'#FFFFFF');
				}
				
				$context = context_course::instance($COURSE->id);
				$has_permission = has_capability('filter/poodll:candownloadmedia', $context);
				if($CFG->filter_poodll_download_media_ok && $has_permission){
					$returnString .=  "<a href='" . urldecode($rtmp_file) . "'>" 
													. "&nbsp;<img src='" . $CFG->{'wwwroot'} . "/filter/poodll/pix/download.gif' alt='download' />" 
													."</a>";
				}
							
		}
    						
    	return $returnString;
	}

}


function fetchSmallVideoGallery($runtime, $playlist, $filearea="content", $protocol="", $width, $height,$permitfullscreen=false, $usepoodlldata=false){
global $CFG, $USER, $COURSE;

//Set the servername 
$courseid= $COURSE->id;
$flvserver = $CFG->poodll_media_server;

$moduleid = optional_param('id', 0, PARAM_INT);    // The ID of the current module (eg moodleurl/view.php?id=X )

//If we are using poodll data we fetch from data dir
//So we just flag that in the filearea parameter
if($usepoodlldata){ $filearea = "poodlldata";}


//set size params
if ($width==''){$width=$CFG->filter_poodll_smallgallwidth;}
if ($height==''){$height=$CFG->filter_poodll_smallgallheight;}

//Determine if we are admin, admins can always fullscreen
	if (has_capability('mod/quiz:preview', context_course::instance($COURSE->id))){		
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

function fetchBigVideoGallery($runtime, $playlist,$filearea="content",  $protocol, $width, $height, $usepoodlldata=false){
global $CFG, $USER, $COURSE;

//Set the servername 
$courseid= $COURSE->id;
$flvserver = $CFG->poodll_media_server;

$moduleid = optional_param('id', 0, PARAM_INT);    // The ID of the current module (eg moodleurl/view.php?id=X )

//If we are using poodll data we fetch from data dir
//So we just flag that in the filearea parameter
if($usepoodlldata){ $filearea = "poodlldata";}


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

	//if($runtime=='swf'){
	if(true){
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


function filter_poodll_fetch_recorder_strings(){
	$params = array();

	//Get localised labels: 
	$params['ui_record'] = get_string('recui_record', 'filter_poodll');
	$params['ui_play'] = get_string('recui_play', 'filter_poodll');
	$params['ui_continue'] = get_string('recui_continue', 'filter_poodll');
	$params['ui_pause'] = get_string('recui_pause', 'filter_poodll');
	$params['ui_stop'] = get_string('recui_stop', 'filter_poodll');
	$params['ui_time'] = get_string('recui_time', 'filter_poodll');
	$params['ui_audiogain'] = get_string('recui_audiogain', 'filter_poodll');
	$params['ui_silencelevel'] = get_string('recui_silencelevel', 'filter_poodll');
	$params['ui_echo'] = get_string('recui_echo', 'filter_poodll');
	$params['ui_loopback'] = get_string('recui_loopback', 'filter_poodll');
	$params['ui_audiorate'] = get_string('recui_audiorate', 'filter_poodll');
	$params['ui_on'] = get_string('recui_on', 'filter_poodll');
	$params['ui_off'] = get_string('recui_off', 'filter_poodll');
	$params['ui_ok'] = get_string('recui_ok', 'filter_poodll');
	$params['ui_close'] = get_string('recui_close', 'filter_poodll');
	$params['ui_uploading'] = get_string('recui_uploading', 'filter_poodll');
	$params['ui_converting'] = get_string('recui_converting', 'filter_poodll');
	$params['ui_timeouterror'] = get_string('recui_timeouterror', 'filter_poodll');
	$params['ui_uploaderror'] = get_string('recui_uploaderror', 'filter_poodll');
	$params['ui_inaudibleerror'] = get_string('recui_inaudibleerror', 'filter_poodll');
	
	return $params;
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
	
	if($filearea=="poodlldata"){
	//if(strlen($path)>6 && true){
	//If we are using PoodLL Data Dir file handling, we build a list of files here:
	//=============================================
		//filter file types
		$filterstring="/*.{flv,mp3,mp4}";
		//set up the search dir
		$baseDir = $CFG->{'dirroot'} . "/" . $CFG->{'filter_poodll_datadir'}  . $path;
		$baseURL = $CFG->{'wwwroot'} . "/" . $CFG->{'filter_poodll_datadir'}  . $path;
		//for debugging
		//$ret_output .= $baseDir . " " . $baseURL;
		foreach (glob($baseDir . $filterstring,GLOB_BRACE) as $filename) {
			$urltofile = $baseURL . basename($filename);
			switch($listtype){
				case "xml":
					$ret_output .= "\t<audio audioname='" . basename($filename) ."' playertype='" . $playertype . "' url='" . $urltofile . "'/>\n";
					break;
					
				//"type" was necessary for flowplayer ??? but it breaks JWPlayer
				// justin 20141220
				case "xrss":
					$ext = substr($filename,-4);
					switch($ext){
							case ".mp3": $mimetype="audio/mpeg3"; break;
							case ".flv": $mimetype="audio/mp4"; break;
							case ".mp4": $mimetype="video/x-flv"; break;
					}
					$ret_output .=  "\t<item><title>" . 
						basename($filename) ."</title><media:content url=\"" .
						trim($urltofile) . "\" type=\"" . $mimetype .
						"\"/></item>";
					break;
				
				case "rss":
					$ret_output .=  "\t<item><title>" . 
						basename($filename) ."</title><media:content url=\"" .
						trim($urltofile) . "\" /></item>";
					break;
					
				case "alist":
					$ret_output  .= "<a href=\"" . trim($urltofile) . "\"><span>" . basename($filename). "</span></a>";
					break;
			}
			
			//$xml_output .=  "\t<audio audioname='" . basename($filename) ."' playertype='" . $playertype . "' url='" . $baseURL . basename($filename). "'/>\n";
		}
	
	//=============================================
	//end of PoodLL Data Dir
	}else{
	
	//fetch info and ids about the module calling this data
	$course = $DB->get_record('course', array('id'=>$courseid));
	$modinfo = get_fast_modinfo($course);
	$cm = $modinfo->get_cm($moduleid);
	
	//If we are using Moodle 2 file handling, we build a list of files here:
	//=============================================
	//get filehandling objects
	$browser = get_file_browser();
	$fs = get_file_storage();

	//get a handle on the module context
	$thiscontext = context_module::instance($moduleid);
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
	
	//=============================================
	//end of Moodle 2 file 
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
//Given a user object, return the url to a picture for that user.
function fetch_user_picture($user,$size=35){
global $CFG, $PAGE;
	//we ignore size these days Justin 20120705
	$upic = new user_picture($user);
	if($upic){
		return $upic->get_url($PAGE);
	}else{
		return "";
	}

}



//embed a quizlet iframe
function fetch_quizlet($quizletid, $quizlettitle="", $mode="flashcards", $width="100%",$height=""){

	//massage mode, other options are as is "learn" or "scatter"	
	if($mode=="")$mode="flashcards";

	//set default heights
	$dh = "410";
	if($height==''){$height=$dh;}
	
	//only do scrolling for test
	if ($mode == "test"){
		$scroll="yes";
	}else{
		$scroll="no";
	}

	//return iframe	
	$ret=	"<div style=\"background:#fff;padding:3px\">
			<iframe src=\"//quizlet.com/$quizletid/$mode/embedv2/?hideLinks\" height=\"$height\" width=\"$width\" style=\"border:0;\" scrolling=\"$scroll\"></iframe>
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
	//determine if this is mobile or not
	 if(isMobile($CFG->filter_poodll_html5widgets)){
			
			$pos =strPos($widget,".lzx.");
			if ($pos > 0){
					$basestring = substr($widget,0,$pos+4);
					$widget=$basestring . ".js";
					$ret= fetchJSWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF");	
			}
	}else{
			//$ret=$browser->getPlatform();
			$ret = fetchSWFWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF");	
	 }
	 return $ret;
}

//This is used for all the flash widgets
function fetchSWFWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF"){
	global $CFG, $PAGE, $EMBEDJSLOADED;
	
	//build the parameter string out of the passed in array
	$params="?";
	foreach ($paramsArray as $key => $value) {
    	$params .= '&' . $key . '=' . $value;
	}
	
	//add in any common params
	$params .= '&debug=false&lzproxied=false'; 
	
	//if we wish to pass in more common params, here is the place
	//eg. $params .= '&modulename=' . $PAGE->cm->modname;
	
	//commented out embed-compressed.js, because called it more responsibly in head at top of this file
	//justin 20120724
	
	//added the global and conditional inclusion of embed js here because repo doesn't get the JS loaded in the header
	//In other cases the load code at top of this file is on time. Justin 20120704
	$embedcode="";
	if(!$EMBEDJSLOADED){
		$embedcode .= "<script type=\"text/javascript\" src=\"{$CFG->wwwroot}/filter/poodll/flash/embed-compressed.js\"></script> ";
		$EMBEDJSLOADED=true;
	}
	
	$retcode = "
        <table><tr><td class=\"fitvidsignore\">
        <script type=\'text/javascript\'>
            lzOptions = { ServerRoot: \'\'};
        </script> 
       " . $embedcode . "
        <script type=\"text/javascript\">
" . '	lz.embed.swf({url: \'' . $CFG->wwwroot . '/filter/poodll/flash/' . $widget . $params . 
		 '\', bgcolor: \'' . $bgcolor . '\', cancelmousewheel: true, allowfullscreen: true, width: \'' .$width . '\', height: \'' . $height . '\', id: \'lzapp_' . rand(100000, 999999) . '\', accessible: true});	
		
' . "
        </script>
        <noscript>
            Please enable JavaScript in order to use this application.
        </noscript>
        </td></tr>
		</table>";
		
		return $retcode;

}

//this is only used for JW player, ie not really used
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

//If we wish to show a styled upload button, here we return true
//on Firefox on Android doesn't support it currently, so we hard code that to false 
//also for MS Surface
//(2013/08/19)
function showFancyButton($browser){
	global $CFG;

	if($browser->getPlatform() == Browser::PLATFORM_ANDROID &&
		$browser->getBrowser() == Browser::BROWSER_FIREFOX){
				return false;
	}else if($browser->getPlatform() == Browser::PLATFORM_MICROSOFT_SURFACE){
		return false;
	}else{
				return $CFG->filter_poodll_html5fancybutton;
	}
}

//Here we try to detect if this supports uploading audio files spec
//iOS doesn't but android can record from mic. Apple and Windows can just filter by audio when browsing
//(2013/03/05)Firefox on android, doesn't use sound recorder currently. 
//(2013/03/05)Chrome on android gives wrong useragent(ipad/safari!)
function canSpecAudio($browser){

	switch($browser->getPlatform()){

			case Browser::PLATFORM_APPLE:
			case Browser::PLATFORM_WINDOWS:
				return true;
				break;
				
			case Browser::PLATFORM_IPAD:
				return false;
				break;
		
			case Browser::PLATFORM_IPOD:
			case Browser::PLATFORM_IPHONE:
				return false;
				break;
			
			case Browser::PLATFORM_ANDROID:
				if($browser->getBrowser() == Browser::BROWSER_FIREFOX){
					return false;
				}else if($browser->isNexus7()){
					return false;
				}else{
					return true;
				}
				break;
				
			default:
				return false;
	}//end of switch
}

//We check if the OS version is too old here,
//Android 4+ iOS6+
//(2013/09/26)
function canDoUpload(){
	$browser = new Browser();
	
	switch($browser->getPlatform()){
	
		case Browser::PLATFORM_ANDROID: 
			$ver = $browser->getAndroidMajorVersion() ;
			//if parsing failed, just assume they can upload
				if(!$ver) {
					return true;
				}elseif($ver>3){
					return true;
				}else{
					return false;
				}
				break;
		
		case Browser::PLATFORM_IPHONE:
		case Browser::PLATFORM_IPOD:
		case Browser::PLATFORM_IPAD:
			$ver = $browser->getIOSMajorVersion() ;
			//if parsing failed, just assume they can upload
				if(!$ver) {
					return true;
				}elseif($ver>5){
					return true;
				}else{
					return false;
				}
				break;
		default:
			return true;
		}//end of switch
		
				
	}//end of function
	
function isOldIE(){
	$browser = new Browser();

	 if($browser->getBrowser() == Browser::BROWSER_IE && $browser->getVersion() < 10){
		return true;
	}else{
		return false;
	}
}

//Here we try to detect if this is a mobile device or not
//this is used to determine whther to return a JS or SWF widget
function isMobile($profile='mobile'){
	global $CFG;
	
	if ($profile=='never'){return false;}
	if ($profile=='always'){return true;}
	
	$browser = new Browser();
	
	//check by browser
	 switch($browser->getBrowser()){
		case Browser::BROWSER_IPAD:
		case Browser::BROWSER_IPOD:
		case Browser::BROWSER_IPHONE:
		case Browser::BROWSER_ANDROID:
		case Browser::BROWSER_WINDOWS_PHONE:
		return true;
	}

	//check by platform
	switch($browser->getPlatform()){

			case Browser::PLATFORM_IPHONE:
			case Browser::PLATFORM_IPOD:
			case Browser::PLATFORM_IPAD:
			case Browser::PLATFORM_BLACKBERRY:
			case Browser::PLATFORM_NOKIA:
			case Browser::PLATFORM_ANDROID:
			case Browser::PLATFORM_WINDOWS_CE:
			case Browser::PLATFORM_WINDOWS_PHONE:
			//case Browser::PLATFORM_MICROSOFT_SURFACE:
			return true;
	}//end of switch

	
	//if we are still not mobile, but webkit browwsers count, check that too
	if ($profile=='webkit'){
		 switch($browser->getBrowser()){
			case Browser::BROWSER_SAFARI:
			case Browser::BROWSER_ICAB:
			case Browser::BROWSER_OMNIWEB:
			case Browser::BROWSER_NOKIA_S60:
			case Browser::BROWSER_CHROME:
			return true;
		}		
	}
	return false;
}


function fetchFlowPlayerCode($width,$height,$path,$playertype="audio",$ismobile=false, $playlisturlstring ="",$loop='false',$splashurl=''){

	global $CFG, $PAGE, $FPLAYERJSLOADED;
	
	$playerid = "flowplayer_" . $path;
	$playerpath = $CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer-3.2.10.swf";
	$playerclass = "flowplayer_poodll";
	
	
	//this is the embed style for flowplayer. 
	//it got a bit nasty with js conflicts and possibly fp js bugs.
	//so added options to embed alternatively. should purge cache after changing embed type.
	//justin 20120928
	$embedtype = $CFG->filter_poodll_fp_embedtype;
	
	
	$jscontrolsid = "flowplayer_js_" . $playlisturlstring; 
	
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
	
	
	//the params are different depending on the playertype
	//we need to specify provider for audio if the clips are not MP3 or mp3
	//jqueryseems unavoidable even if not using it for playlists
	switch($playertype){
		case "audio":
			//If we have a splash screen show it and enable autoplay(user only clicks once)
			//best to have a splash screen to prevent browser hangs on many flashplayers in a forum etc
			if($splashurl !=''){
				$splash = "<img src='" . $splashurl . "' alt='click to play audio' width='" . $width . "' height='" . $height . "'/>";
				
			}else if($CFG->filter_poodll_audiosplash){
				$splash = "<img src='" . $CFG->wwwroot . "/filter/poodll/flowplayer/audiosplash.jpg' alt='click to play audio' width='" . $width . "' height='" . $height . "'/>";
			}else{
				$splash = "";
			}
			break;
		
		case "audiolist":
			$splash = "";
			break;
		
		case "video":
			//If we have a splash screen show it and enable autoplay(user only clicks once)
			//best to have a splash screen to prevent browser hangs on many flowplayers in a forum etc
			if($splashurl !=''){
				$splash = "<img src='" . $splashurl . "' alt='click to play video' width='" . $width . "' height='" . $height . "'/>";
				
			}else if($CFG->filter_poodll_videosplash){
				if($CFG->filter_poodll_thumbnailsplash){
					$splashurl = fetchVideoSplash($path);
				}else{
					$splashurl=false;
				}
				if(!$splashurl){$splashurl = $CFG->wwwroot . "/filter/poodll/flowplayer/videosplash.jpg";}
				$splash = "<img src='" . $splashurl . "' alt='click to play video' width='" . $width . "' height='" . $height . "'/>";
			
			}else{
				$splash="";
			}
			break;
		
		case "videolist":
			$splash ="";
			break;
	
	
	}
	
	//add a media rss playlist if one was passed in
	if($playlisturlstring ==""){
		$playlisturlstring =null;
	}
	
	//put together the a link/div that will be replaced by a player
	//gave up on a link because the mediaplugin kept trying to double replace it
	//justin 20120928
	
	//A link method
	if ($embedtype=='flowplayer'){
		$retcode .= "<a href='" . $path . "'
						style='display:block;width:" . $width. "px;height:" . $height . "px;'
						id='" . $playerid . "' class='" . $playerclass . "' >
						" . $splash . "
					</a>";
	}else{
				
		//DIV method
		$retcode .= "<div style='display:block;width:" . $width. "px;height:" . $height . "px;'
						id='" . $playerid . "' class='" . $playerclass . "' >
						" . $splash . "
					</div>";
	}
	
				
	//put together the div that will be replaced by the JS controls if necessary
	if($jscontrols){
		$retcode .= "<div id='" . $jscontrolsid . "' class='" . $jscontrolsclass . "'></div>";
	}

	//determine the flowplayer components we need to incorp.
	//the js will figure outhow to assemble it all
	//but only flowplayer js embedding will do more than the basic swf player 
	$controls="0";
	$ipad=false;
	$playlist=false;
	$loop=false;
	
	if($ismobile){
		if (($playertype=="audiolist" || $playertype=="videolist") && $jscontrols){
			$controls =  $jscontrolsid ;
			$ipad=true;
			$playlist = true;
			$loop=true;

		} else if ($playertype=="audiolist" || $playertype=="videolist"){
			$ipad=true;
			$playlist=true;
			$loop=true;

		}else if($jscontrols){
			$controls=$jscontrolsid ;
			$ipad=true;

		}else{
			$ipad=true;

		}
	}else{
		if (($playertype=="audiolist" || $playertype=="videolist") && $jscontrols){
			$controls =  $jscontrolsid ;
			$playlist=true;
			$loop=true;

		} else if ($playertype=="audiolist" || $playertype=="videolist"){
			$playlist=true;
			$loop=true;

		}else if($jscontrols){
			$controls =  $jscontrolsid ;
		}
	}

	switch ($embedtype){
		case 'swfobject':
			//likely to have already been loaded elsewhere
			$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flash/swfobject_22.js'));
			break;
		
		case 'flashembed':
			//Load JS dependancies
			$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flowplayer/flowplayer-3.2.9.min.js'));
			break;
			
		case 'flowplayer':
		default:
			//Load JS dependancies
			$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flowplayer/flowplayer-3.2.9.min.js'));
			
			//these are for the list players, but i wonder if list players from flowplayer are too much hassle ...
			if($CFG->filter_poodll_fp_playlist){
				$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flowplayer/jquery.tools.min.js'));
			//alternatively this can be used for the jquerystuff js, its better, but its inline and wont work on LAN only nets
			//$retcode .= "<script src=\"http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js\"></script>";
			
				$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flowplayer/flowplayer.playlist-3.2.8.min.js'));
				$PAGE->requires->js(new moodle_url($CFG->httpswwwroot . '/filter/poodll/flowplayer/flowplayer.ipad-3.2.8.min.js'));
			}
	
	}
	
	


	
	//configure our options array
	$opts = array(
		"path"=> $path,
		"playerid"=> $playerid, 
		"playerpath"=> $playerpath, 
		"poodll_audiosplash"=> ($CFG->filter_poodll_audiosplash==1), 
		"poodll_videosplash"=> ($CFG->filter_poodll_videosplash==1), 
		"jscontrols"=> $jscontrols,
		"height"=> $height,
		"width"=> $width,
		"defaultcontrolsheight"=> $defaultcontrolsheight,
		"playertype"=>$playertype,
		"playlisturl"=>$playlisturlstring,
		"controls"=>$controls,
		"ipad"=>$ipad,
		"playlist"=>$playlist,
		"loop"=>($loop ? 'true' : 'false'),
		"embedtype"=>$embedtype,
		"bgcolor"=> $CFG->filter_poodll_fp_bgcolor,
		"audiocontrolsurl" =>  $CFG->wwwroot . "/filter/poodll/flowplayer/flowplayer.audio-3.2.9.swf" 
		);
		
		//We need this so that we can require the JSON , for json stringify
		$jsmodule = array(
			'name'     => 'filter_poodll',
			'fullpath' => '/filter/poodll/module.js',
			'requires' => array('json')
		);
		
	//setup our JS call
	$PAGE->requires->js_init_call('M.filter_poodll.loadflowplayer', array($opts),false,$jsmodule);

	
	
	//return the html that the Flowplayer JS will swap out
	return $retcode;
}




function fetchVideoSplash($src){
		global $CFG;

	 $src = urldecode($src);

	 //if this is not a local file , quit.
	 $possy = strpos($src,"pluginfile.php");
	 if(!$possy){return false;} 
	 //get relative path
	 //e.g http://m23.poodll.com/pluginfile.php/59/mod_page/content/20/360332574229687.flv
	 //should become /59/mod_page/content/20/360332574229687.flv
	 $relpath = substr($src,$possy + 14);

	//remove any pesky forcedownload params
	$relpath=str_replace("?forcedownload=1","", $relpath);

	 //if something went wrong, and we can't confirm get a handle on the file, 
	 //muddle with the itemid. Some mods don't bother to use it if it is a certain filearea
	 //eg assignment intro, others use it strangely,eg mod_page, and we need to set it to 0 
	 //quiz questions have extra stuff between filearea and itemid
	 $fs = get_file_storage();
	 $file = $fs->get_file_by_hash(sha1($relpath));
     if (!$file) {
			 $relarray = explode('/',$relpath);
			 //index 1 = contextid, 2 =component,3=filearea
			 //itemid can change, filename is last
			
			switch($relarray[2]){
				case 'question':
					$qitemid = $relarray[count($relarray)-2];
					$qfilename = $relarray[count($relarray)-1];
					$relpath = '/' . $relarray[1] . '/' . $relarray[2] . '/' . $relarray[3];
					$relpath .= '/' . $qitemid . '/' . $qfilename;
					break;
				
				case 'mod_page':
					//1st we set itemid to 0
					$originalitemid = $relarray[4];
					$relarray[4]='0';
					$relpath = implode('/',$relarray);
					break;
				
				case 'mod_assign':
					array_splice($relarray, 4, 0, '0');
					$relpath = implode('/',$relarray);
					break;
					
				default:
					//if we have no itemid, zero is assumed
					if(count($relarray)==5){
						$relpath = '/' . $relarray[1] . '/' . $relarray[2] . '/' . $relarray[3];
						$relpath .= '/0/' . $relarray[4];
					 }
			}
			
			
			//Then hash the path and try to get the file
			$file = $fs->get_file_by_hash(sha1($relpath));

			//if we still don't have a file, give up
			if(!$file){
				return false;
			}
	}

	
	//check if we really can have/make a splash for this file
	//if name is too short, we didn't make it, it wont be on our red5 server
	$filename = $file->get_filename();
	if(strlen($filename)<5){
		return false;
	}

	//if we are NOT using FFMPEG, we can only take snaps from Red5, so ...
	//if name is not numeric, it is not a video file we recorded on red5.it wont be there
	if(!$CFG->filter_poodll_ffmpeg && !is_numeric(substr($filename,0,strlen($filename)-4))){
		return false;
	}
	
	//check if we have an image file here already, if so return that URL
	$relimagepath = substr($relpath,0,strlen($relpath)-3) . 'png';
	$trimsrc = str_replace("?forcedownload=1","", $src);
	$fullimagepath = substr($trimsrc,0,strlen($trimsrc)-3) . 'png';
	$imagefilename = substr($filename,0,strlen($filename)-3) . 'png';
	if ($imagefile = $fs->get_file_by_hash(sha1($relimagepath))) {
            return $fullimagepath;
    }

	//from this point on we will need our file handling functions
	require_once($CFG->dirroot . '/filter/poodll/poodllfilelib.php');
	
	//if we are using FFMPEG, try to get the splash image
	if($CFG->filter_poodll_ffmpeg){

		$imagefile = get_splash_ffmpeg($file, $imagefilename);
		if($imagefile){
			return $fullimagepath;
		}else{
			return false;
		}
	
	//if not FFMPEG pick it up from Red5 server
	}else{

		$result = instance_remotedownload($file->get_contextid(),
					$imagefilename, 
					$file->get_component(),
					$file->get_filearea(),
					$file->get_itemid(),
					"99999",
					$file->get_filepath()
					);
	
		if(strpos($result,"success")){
			return $fullimagepath;
		}else{
			return false;
		}
	}//end of if ffmpeg
}//end of fetchVideoSplash

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
function fetchIFrameSWFWidgetCode($widget,$paramsArray,$width,$height, $bgcolor="#FFFFFF"){
	global $CFG, $PAGE;
	
	//There seems to be an internal margin on the iframe
	//which I could not cancel entirely. So we compensate here to show all the widget
	$marginadjust = 5;
	$fwidth = $marginadjust + $width;
	$fheight = $marginadjust + $height;
	
	//build the parameter string out of the passed in array
	$params="?";
	foreach ($paramsArray as $key => $value) {
    	$params .= '&' . $key . '=' . $value;
	}
	
	//add in any common params
	$params .= '&debug=false&lzproxied=false';	
	
	//path to our js idgets folder
	$pathtoSWF= $CFG->wwwroot . '/filter/poodll/flash/';
	
	
	$retframe="<iframe scrolling=\"no\" class=\"fitvidsignore\" frameBorder=\"0\" src=\"{$pathtoSWF}poodlliframe.php?widget={$widget}&paramstring=" . urlencode($params) . "&width={$width}&height={$height}&bgcolor={$bgcolor}\" width=\"{$fwidth}\" height=\"{$fheight}\"></iframe>"; 
	return $retframe;


}
