<?php
/*
 * __________________________________________________________________________
 *
 * PoodLL filter for Moodle 2.x
 *
 *  This filter will replace any PoodLL filter string with the appropriate PoodLL widget
 *
 * @package    filter
 * @subpackage poodll
 * @copyright  2012 Justin Hunt  {@link http://www.poodll.com}
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 * __________________________________________________________________________
 */
 
//Get our library for handling media
require_once($CFG->dirroot . '/filter/poodll/poodllresourcelib.php');

class filter_poodll extends moodle_text_filter {


		function filter($text, array $options = array()) {
			global $CFG;
			   
			if (!is_string($text)) {
				// non string data can not be filtered anyway
				return $text;
			}
			
			$newtext = $text; // fullclone is slow and not needed here
				
			//check for mp3
			 if (!empty($CFG->filter_poodll_handlemp3)) {
				if (!(stripos($text, '</a>') ===false)) {
				// performance shortcut - all filepicker media links  end with the </a> tag,
					$search = '/<a\s[^>]*href="([^"#\?]+\.mp3)"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'filter_poodll_mp3_callback', $newtext);
				}
			}
			
			//check for mp4
			if (!empty($CFG->filter_poodll_handlemp4)) {
				if (!(stripos($text, '</a>') === false)) {
					// performance shortcut - all filepicker media links  end with the </a> tag,
					
					//justin 20120525 added ability to declare width of media by appending strings like: ?d=640x480
					//$search = '/<a\s[^>]*href="([^"#\?]+\.mp4)"[^>]*>([^>]*)<\/a>/is';
					$search = '/<a\s[^>]*href="([^"#\?]+\.mp4)(\?d=([\d]{1,4})x([\d]{1,4}))?"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'filter_poodll_mp4flv_callback', $newtext);
				}
			}
			
			//check for flv
			if (!empty($CFG->filter_poodll_handleflv)) {
				if (!(stripos($text, '</a>') === false)) {
				// performance shortcut - all filepicker media links  end with the </a> tag,
				
					//justin 20120525 added ability to declare width of media by appending strings like: ?d=640x480
					//$search = '/<a\s[^>]*href="([^"#\?]+\.flv)"[^>]*>([^>]*)<\/a>/is';
					$search = '/<a\s[^>]*href="([^"#\?]+\.flv)(\?d=([\d]{1,4})x([\d]{1,4}))?"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'filter_poodll_mp4flv_callback', $newtext);
				}
			}
					
			
		
			
			$search = '/{POODLL:.*?}/is';

			$newtext = preg_replace_callback($search, 'filter_poodll_callback', $newtext);
			
			if (is_null($newtext) or $newtext === $text) {
				// error or not filtered
				return $text;
			}

			return $newtext;
		}
}//end of class


/*
*	Callback function , exists outside of class definition(because its a callback ...)
*
*/
function filter_poodll_callback(array $link){
	global $CFG, $COURSE, $USER;
	//get our filter props
	//we use a function in the poodll poodllresourcelib, because
	//parsing will also need to be done by the html editor
	$filterprops=	fetch_filter_properties($link[0]);

	//if we have no props, quit
	if(empty($filterprops)){return "";}
	
	//if we want to ignore the filter (for "how to use a filter" demos) we let it go
	//to use this, make the last parameter of the filter passthrough=1
	if (!empty($filterprops['passthrough'])) return str_replace( ",passthrough=1","",$link[0]);
	
	//Init our return variable 
	$returnHtml ="";
	
	//Runtime JS or Flash
	if (empty($filterprops['runtime']))$filterprops['runtime'] ='SWF'; 

	//depending on the type of filter
	switch ($filterprops['type']){
		case 'video': 
			//$returnHtml="<BR />" . fetchSimpleVideoPlayer($filterprops['path'],$filterprops['width'],$filterprops['height']);
			$returnHtml="<BR />" . fetchSimpleVideoPlayer($filterprops['runtime'],$filterprops['path'],!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_videowidth,!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_videoheight,!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',!empty($filterprops['embed']) ? $filterprops['embed']=='true' : false,!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false ,!empty($filterprops['embedstring']) ? $filterprops['embedstring'] : 'Play');
			break;
		
		case 'wmvvideo': 
			$returnHtml="<BR />" . fetchWMVPlayer($filterprops['runtime'],$filterprops['path'],!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_videowidth,!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_videoheight);
			break;
			
		case 'audio':
			$returnHtml="<BR />" . fetchSimpleAudioPlayer($filterprops['runtime'],$filterprops['path'],!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_audiowidth,!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_audioheight,!empty($filterprops['embed']) ? $filterprops['embed']=='true' : false,!empty($filterprops['embedstring']) ? $filterprops['embedstring'] : 'Play');
			break;
			
		case 'audiolist':
			$returnHtml="<BR />" . fetchAudioListPlayer($filterprops['runtime'],$filterprops['path'],!empty($filterprops['filearea']) ? $filterprops['filearea'] : 'content',!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',!empty($filterprops['width']) ? $filterprops['width'] : 400,!empty($filterprops['height']) ? $filterprops['height'] : 250, !empty($filterprops['sequentialplay']) ? $filterprops['sequentialplay'] : 'true', !empty($filterprops['player']) ? $filterprops['player'] : $CFG->filter_poodll_defaultplayer, !empty($filterprops['showplaylist']) ? $filterprops['showplaylist']=='true' : true);
			break;
			
		case 'audiotest':
			$returnHtml="<BR />" . fetchAudioTestPlayer($filterprops['runtime'],$filterprops['path'],!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',!empty($filterprops['width']) ? $filterprops['width'] : 400,!empty($filterprops['height']) ? $filterprops['height'] : 50, !empty($filterprops['filearea']) ? $filterprops['filearea'] : 'content');
			break;	
			
		case 'talkback':
			$returnHtml="<BR />" . fetchTalkbackPlayer($filterprops['runtime'],$filterprops['path'],!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',!empty($filterprops['recordable']) ? $filterprops['recordable'] : 'false',!empty($filterprops['savefolder']) ? $filterprops['savefolder'] : 'default');
			break;
			
		case 'bigvideogallery':
			$returnHtml="<BR />" . fetchBigVideoGallery($filterprops['runtime'],$filterprops['path'],!empty($filterprops['filearea']) ? $filterprops['filearea'] : 'content',!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_biggallwidth,!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_biggallheight);
			break;	
			
		case 'videorecorder':
			$returnHtml="<BR />" . fetchSimpleVideoRecorder($filterprops['runtime'],$filterprops['savefolder']);
			break;	
			
		case 'audiorecorder':
			$returnHtml="<BR />" . fetchSimpleAudioRecorder($filterprops['runtime'],$filterprops['savefolder']);
			break;

		case 'calculator':
			$returnHtml="<BR />" . fetch_poodllcalc($filterprops['runtime'],!empty($filterprops['width']) ? $filterprops['width'] : 300,
				!empty($filterprops['height']) ? $filterprops['height'] : 400);
			break;
		
		case 'quizlet':
			$returnHtml= fetch_quizlet($filterprops['id'],
				!empty($filterprops['title']) ? $filterprops['title']  : 'quizlet',
				!empty($filterprops['mode']) ? $filterprops['mode'] :  'familiarize',
				!empty($filterprops['width']) ? $filterprops['width'] :  '100%',
				!empty($filterprops['height']) ? $filterprops['height'] :  '310')
				;
			break;	
			
		case 'sliderocket':
			$returnHtml= fetch_sliderocket($filterprops['id'],
				!empty($filterprops['width']) ? $filterprops['width'] :  '400',
				!empty($filterprops['height']) ? $filterprops['height'] :  '326')
				;
			break;	

		case 'teachersrecorder':
			$returnHtml="<BR />" . fetch_teachersrecorder($filterprops['runtime'],$filterprops['savepath'], "");
			break;	
			
		case 'adminconsole':
			$returnHtml="<BR />" . fetch_poodllconsole($filterprops['runtime'],"","billybob",-1,true);
			break;	

		case 'countdown':
			$returnHtml="<BR />" . fetch_countdowntimer($filterprops['runtime'],$filterprops['initseconds'],
				!empty($filterprops['usepresets']) ? $filterprops['usepresets'] : 'false',
				!empty($filterprops['width']) ? $filterprops['width'] : 400,
				!empty($filterprops['height']) ? $filterprops['height'] : 265,
				!empty($filterprops['fontheight']) ? $filterprops['fontheight'] : 128,
				!empty($filterprops['mode']) ? $filterprops['mode'] : 'normal',
				!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false, 
				!empty($filterprops['uniquename']) ? $filterprops['uniquename'] : 'auniquename');
			break;
		
		case 'counter':
			$returnHtml="<BR />" . fetch_counter($filterprops['runtime'],!empty($filterprops['initcount']) ? $filterprops['initcount']  : 0,
				!empty($filterprops['usepresets']) ? $filterprops['usepresets'] : 'false',
				!empty($filterprops['width']) ? $filterprops['width'] : 480,
				!empty($filterprops['height']) ? $filterprops['height'] : 265,
				!empty($filterprops['fontheight']) ? $filterprops['fontheight'] : 64,
				!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false );
			break;	
		
		case 'dice':
			$returnHtml="<BR />" . fetch_dice($filterprops['runtime'],!empty($filterprops['dicecount']) ? $filterprops['dicecount']  : 1,
				!empty($filterprops['dicesize']) ? $filterprops['dicesize'] : 200,
				!empty($filterprops['width']) ? $filterprops['width'] : 300,
				!empty($filterprops['height']) ? $filterprops['height'] : 300);
			break;
			
		case 'explorer':
			$returnHtml="<BR />" . fetch_explorer($filterprops['runtime'],
				!empty($filterprops['width']) ? $filterprops['width'] : 1250,
				!empty($filterprops['height']) ? $filterprops['height'] : 800,
				!empty($filterprops['moduleid']) ? $filterprops['moduleid'] : '');
			break;
			
		case 'flashcards':
			$returnHtml="<BR />" . fetch_flashcards($filterprops['runtime'],$filterprops['cardset'],
				!empty($filterprops['cardwidth']) ? $filterprops['cardwidth'] : 300,
				!empty($filterprops['cardheight']) ? $filterprops['cardheight'] : 150,
				!empty($filterprops['randomize']) ? $filterprops['randomize'] : 'yes',
				!empty($filterprops['width']) ? $filterprops['width'] : 400,
				!empty($filterprops['height']) ? $filterprops['height'] : 300);
			break;
			
		case 'stopwatch':
			$returnHtml="<BR />" . fetch_stopwatch($filterprops['runtime'],!empty($filterprops['width']) ? $filterprops['width'] : 400,
				!empty($filterprops['height']) ? $filterprops['height'] : 265,!empty($filterprops['fontheight']) ? $filterprops['fontheight'] : 64,
				!empty($filterprops['mode']) ? $filterprops['mode'] : 'normal',
				!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false, 
				!empty($filterprops['uniquename']) ? $filterprops['uniquename'] : 'auniquename');
			break;
						
		case 'smallvideogallery':
			$returnHtml="<BR />" . fetchSmallVideoGallery($filterprops['runtime'],$filterprops['path'],!empty($filterprops['filearea']) ? $filterprops['filearea'] : 'content',!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',
				!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_smallgallwidth,
				!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_smallgallheight,
				!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false );
			break;	
			
		case 'newpoodllpairwork':
			$returnHtml="<BR />" . fetch_embeddablepairclient($filterprops['runtime'],!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_newpairwidth,
				!empty($filterprops['height']) ? $filterprops['height'] : $CFG->filter_poodll_newpairheight,
				!empty($filterprops['chat']) ? $filterprops['chat'] : true,
				!empty($filterprops['whiteboard']) ? $filterprops['whiteboard'] : false, 
				!empty($filterprops['showvideo']) ? $filterprops['showvideo'] : false,
				!empty($filterprops['whiteboardback']) ? $filterprops['whiteboardback'] : ''
				);
			break;	

		case 'screensubscribe':
			$returnHtml="<BR />" . fetch_screencast_subscribe($filterprops['runtime'],"",true,!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_showwidth,
				!empty($filterprops['height']) ? $filterprops['height'] : $CFG->filter_poodll_showheight
				);
			break;	

		case 'poodllpalette':
			$returnHtml="<BR />" . fetch_poodllpalette($filterprops['runtime'],$filterprops['width'],$filterprops['height'],"swf");
			break;	
			
		case 'whiteboard':
			$returnHtml="<BR />" . fetch_whiteboard($filterprops['runtime'],!empty($filterprops['boardname']) ? $filterprops['boardname'] : "whiteboard",
				!empty($filterprops['backimage']) ? $filterprops['backimage'] : "",
				(!empty($filterprops['slave'])&& $filterprops['slave']=='true') ? $filterprops['slave'] : false,
				!empty($filterprops['rooms']) ? $filterprops['rooms'] : "",
				!empty($filterprops['width']) ? $filterprops['width'] :  $CFG->filter_poodll_whiteboardwidth,
				!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_whiteboardheight,
				!empty($filterprops['mode']) ? $filterprops['mode'] :  'normal',
				(!empty($filterprops['standalone'])&& $filterprops['standalone']=='true')  ? $filterprops['standalone'] :  'false'
				);
			break;									

		case 'poodllpairwork':
			$courseid = $COURSE->id;
			$username = $USER->username;
			
			$poodllpairworkplayer ="";
			$studentalias="";
			$pairmap="";
			
			if ($pairmap = get_record("poodllpairwork_usermap", "username", $username, "course", $courseid)) {
				$studentalias = $pairmap->role;
			}				
					
			//if we have a role and hence a session.
			if ($studentalias != ""){			
				$me = get_record('user', 'username', $username);
				$partner = get_record('user', 'username', $pairmap->partnername);
				$partnerpic = fetch_user_picture($partner,35);
				$mepic = fetch_user_picture($me,35);
				$poodllpairworkplayer =  "<h4>" . get_string("yourpartneris", "poodllpairwork") . fullname($partner) . "</h4>";
				$poodllpairworkplayer .= fetchPairworkPlayer($pairmap->username,$pairmap->partnername,$mepic, fullname($me),$partnerpic,fullname($partner));					
		
			}
			
			$returnHtml="<BR />" . $poodllpairworkplayer;
			break;

		default:

	
	}

	//return our html
	return $returnHtml;

}//end of poodll default callback function



/**
 * Replace mp3 links with player
 *
 * @param  $link
 * @return string
 */
function filter_poodll_mp3_callback($link) {
global $CFG;

    $url = $link[1];
    $rawurl = str_replace('&amp;', '&', $url);

    $returnHtml="<BR />" . fetchSimpleAudioPlayer('auto',$rawurl,'http',$CFG->filter_poodll_audiowidth,$CFG->filter_poodll_audioheight,false,'Play');
	return $returnHtml;
}
function filter_poodll_mp4flv_callback($link) {
global $CFG;
	//clean up url
	$url = $link[1];
    $url = str_replace('&amp;', '&', $url);
	$url = clean_param($url, PARAM_URL);
	
	//use default widths or explicit width/heights if they were passed in ie http://url.to.video.mp4?d=640x480
	if (empty($link[3]) or empty($link[4])) {
		$width = $CFG->filter_poodll_videowidth;
		$height = $CFG->filter_poodll_videoheight;
	}else{
		$width = $link[3];
		$height = $link[4];
	}


	$returnHtml="<BR />" . fetchSimpleVideoPlayer('auto',$url,$width,$height,'http',false,true , 'Play');
	return $returnHtml;
}
