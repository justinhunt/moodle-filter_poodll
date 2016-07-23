<?php
/*
 * __________________________________________________________________________
 *
 * PoodLL filter for Moodle 2.9 and above
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
 
 //moved this library down into filter method, so if disabled all the poodll stuff wouldn't load


class filter_poodll extends moodle_text_filter {

	protected $adminconfig=null;
	protected $courseconfig=null;

    /**
     * Apply the filter to the text
     *
     * @see filter_manager::apply_filter_chain()
     * @param string $text to be processed by the text
     * @param array $options filter options
     * @return string text after processing
     * @return string text after processing
     */
    public function filter($text, array $options = array()) {
			if (!is_string($text)) {
				// non string data can not be filtered anyway
				return $text;
			}
			$newtext = $text;
		
			//No links or poodll curlys then .. bail
			$havelinks = !(stripos($text, '</a>') ===false);
                        $have_poodll_curlys = (strpos($text,'{POODLL:')!==false);
			if(!$havelinks){		
				if(!$have_poodll_curlys){return $text;}
			}
			
			//get config
			 $this->adminconfig =get_config('filter_poodll');
			
			//if text has links, lets parse them
			if($havelinks){		
				//get handle extensions
				$exts = \filter_poodll\filtertools::fetch_extensions();
				$handleexts = array();
				foreach($exts as $ext){
					if($ext!='youtube' && $this->fetchconf('handle' . $ext)){
						$handleexts[] = $ext;
					}
				}
				//do all the non youtube extensions in one foul swoop
				if(!empty($handleexts)){
					$handleextstring = implode('|',$handleexts);
					//$oldsearch = '/<a\s[^>]*href="([^"#\?]+\.(' .  $handleextstring. '))(\?d=([\d]{1,4})x([\d]{1,4}))?"[^>]*>([^>]*)<\/a>/is';
					$search='/<a\s[^>]*href="([^"#\?]+\.(' .  $handleextstring. '))(.*?)"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'self::filter_poodll_allexts_callback', $newtext);
				}
                                
                                //check for legacy pdl links
                                $search='/<a\s[^>]*href="([^"#\?]+\.(.pdl))(.*?)"[^>]*>([^>]*)<\/a>/is';
                                $newtext = preg_replace_callback($search, 'self::filter_poodll_pdl_callback', $newtext);

			
			   //check for youtube
				if ($this->fetchconf('handleyoutube')) {
						 $search = '/<a\s[^>]*href="(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|v\/)?([\w-]{10,})(?:.*?)<\/a>/is';
						$newtext = preg_replace_callback($search, 'self::filter_poodll_youtube_callback', $newtext);
				}
			}// end of if $havelinks
			
			//if text has poodll curly brackets, lets parse
			if($have_poodll_curlys){
				//check for poodll curly brackets notation
				 $search = '/{POODLL:.*?}/is';
				 if (!is_string($text)) {
						// non string data can not be filtered anyway
						return $text;
				}
				$newtext = preg_replace_callback($search, 'self::filter_poodll_process', $newtext);
			}//end of if has poodl curlys
		
		//return the correct thing to wherever called us
		if (is_null($newtext) or $newtext === $text) {
			// error or not filtered
			return $text;
		}
		return $newtext;
    }
    
    private function fetchconf($prop){
    global $COURSE;

    	//I don't know why we need this whole courseconfig business.
    	//we are supposed to be able to just call $this->localconfig / $this->localconfig[$propertyname]
    	//as per here:https://docs.moodle.org/dev/Filters#Local_configuration , but its always empty
    	//at least at course context, in mod context it works ... 
    	//I just gave up and do it myself and stuff it in $this->courseconfig . bug?? Justin 20150106
    	if($this->localconfig && !empty($this->localconfig)){
    		$this->courseconfig = $this->localconfig;
    	}
    	if(!$this->courseconfig){
    		$this->courseconfig = filter_get_local_config('poodll', context_course::instance($COURSE->id)->id);
    	}
    	
		if($this->courseconfig && isset($this->courseconfig[$prop]) && $this->courseconfig[$prop] != 'sitedefault') {
			return $this->courseconfig[$prop];
		}else{
			return isset($this->adminconfig->{$prop}) ? $this->adminconfig->{$prop} : false;
		}
	}
    /**
	 * Replace youtube links with player
	 *
	 * @param  $link
	 * @return string
	 */
	private function filter_poodll_youtube_callback($link) {
		return $this->filter_poodll_process($link,'youtube');
	}
	
	
	/**
	 * Replace links with player/widget
	 *
	 * @param  $link
	 * @return string
	 */
	private function filter_poodll_allexts_callback($link) {
		return $this->filter_poodll_process($link,$link[2]);
	}
	
        /**
	 * Replace legacy pdl links with widget
	 *
	 * @param  $link
	 * @return string
	 */
        function filter_poodll_pdl_callback($link) {
                 global $CFG;

                //strip the .pdl extension
                $len = strlen($link[2]);
                $trimpoint = strpos($link[2], ".pdl");
                $key=substr($link[2],0,$trimpoint);

                //see if there is a parameter to this widget
                $pos = strpos($key, "_");
                $param="";

                //if yes, trim it off the key and get its value
                if($pos){
                        $param=substr($key,$pos+1);
                        $key=substr($key,0,$pos);
                }

                //depending on the widget, make up a filter string
                switch ($key){
                        case "audiorecorder": $fstring = "{POODLL:type=audiorecorder}";break; //not implemented
                        case "videorecorder": $fstring = "{POODLL:type=videorecorder}";break; //not implemented
                        case "whiteboardsimple": $fstring = "{POODLL:type=whiteboard,mode=simple,standalone=true}";break;//not implemented
                        case "whiteboardfull": $fstring = "{POODLL:type=whiteboard,mode=normal,standalone=true}";break;//not implemented
                        case "snapshot": $fstring = "{POODLL:type=snapshot}";break;
                        case "stopwatch": $fstring = "{POODLL:type=stopwatch}";break;
                        case "dice": $fstring = "{POODLL:type=dice,dicecount=$param}";break;
                        case "calculator": $fstring = "{POODLL:type=calculator}";break;
                        case "countdown": $fstring = "{POODLL:type=countdown,initseconds=$param}";break;
                        case "counter": $fstring = "{POODLL:type=counter}";break;
                        case "flashcards": $fstring = "{POODLL:type=flashcards,cardset=$param}";break;
                }

                //resolve the string and return it
                return self::filter_poodll_process(array($fstring));
        }
	
	/*
	*	Main callback function , exists outside of class definition(because its a callback ...)
	*
	*/
	function filter_poodll_process(array $link, $ext =false){
		global $CFG, $COURSE, $USER, $PAGE, $DB;

		$lm = new \filter_poodll\licensemanager();
		if(!$lm->validate_registrationkey($CFG->filter_poodll_registrationkey)) {
			return $lm->fetch_unregistered_content();
		}

		 $conf = get_object_vars(get_config('filter_poodll'));
	
		//get our filter props
		if($ext){
			$filterprops= \filter_poodll\filtertools::fetch_filter_properties_fromurl($link,$ext);
		}else{
			$filterprops= \filter_poodll\filtertools::fetch_filter_properties($link[0]);
		}

		//if we have no props, quit
		if(empty($filterprops)){return "";}

		//if we want to ignore the filter (for "how to use poodll" or "cut and paste" this style use) we let it go
		//to use this, make the last parameter of the filter passthrough=1
		if (!empty($filterprops['passthrough'])) return str_replace( ",passthrough=1","",$link[0]);
	
		//set a default end tag of none
		$endtag=false;
                
                //determine which template we are using
                //If we have an extension then it is from link
                //get our template info
                if($ext){
                    $playerkey = $this->fetchconf('useplayer' . $ext);
                    $tempindex=0;
                    $templatenumbers = \filter_poodll\filtertools::fetch_template_indexes($conf);
                    foreach($templatenumbers as $templatenumber){
                            if($conf['templatekey_' . $templatenumber]==$playerkey){
                                    $tempindex=$templatenumber;
                                    break;
                            }
                    }
                    if(!$tempindex){return;}
                }else{
                //else its from a  poodll filter string                
                    for($tempindex=1;$tempindex<=$conf['templatecount'];$tempindex++){
                                    if($filterprops['type']==$conf['templatekey_' . $tempindex]){
                                            break;
                                    }elseif($filterprops['type']==$conf['templatekey_' . $tempindex] . '_end'){
                                            $endtag = true;
                                            break;
                                    }
                    }

                    //no key could be found if got all the way to 21
                    if($tempindex==$conf['templatecount']+1){return '';}
                }
                
		//fetch our template
		if($endtag){
			$poodlltemplate = $conf['templateend_' . $tempindex];
		}else{
			$poodlltemplate = $conf['template_' . $tempindex];
		}


		//fetch dataset info
		$dataset_body = $conf['dataset_' . $tempindex];
		$dataset_vars = $conf['datasetvars_' . $tempindex];
	
		//js custom script
		//we really just want to be sure anything that appears in custom script
		//is stored in $filterprops and passed to js. we dont replace it server side because
		//of caching
		$js_custom_script = $conf['templatescript_' . $tempindex];
	
		//replace the specified names with spec values
		foreach($filterprops as $name=>$value){
			$poodlltemplate = str_replace('@@' . $name .'@@',$value,$poodlltemplate);
			$dataset_vars  = str_replace('@@' . $name .'@@',$value,$dataset_vars);
		}
	
		//fetch defaults for this template
		$defaults = $conf['templatedefaults_'. $tempindex];
		if(!empty($defaults)){
			$defaults = "{POODLL:" . $defaults . "}";
			$defaultprops= \filter_poodll\filtertools::fetch_filter_properties($defaults);
			//replace our defaults, if not spec in the the filter string
			if(!empty($defaultprops)){
				foreach($defaultprops as $name=>$value){
					if(!array_key_exists($name,$filterprops)){
						//if we have options as defaults, lets just take the first one
						if(strpos($value,'|')!==false){
							$valuearray=explode('|',$value);
							$value = $valuearray[0];
						}
						$poodlltemplate = str_replace('@@' . $name .'@@',strip_tags($value),$poodlltemplate);
						$dataset_vars  = str_replace('@@' . $name .'@@',strip_tags($value),$dataset_vars);
						//stash for using in JS later
						$filterprops[$name]=$value;
					}
				}
			}
		}
	
		//If we have autoid lets deal with that
		$autoid = 'filterpoodll_' . time() . (string)rand(100,32767) ;
		$poodlltemplate = str_replace('@@AUTOID@@',$autoid,$poodlltemplate);
		//stash this for passing to js
		$filterprops['AUTOID']=$autoid;

		//If template requires a MOODLEPAGEID lets give them one
		//this is a bit of a special case.
		$moodlepageid = optional_param('id',0,PARAM_INT);
		$poodlltemplate = str_replace('@@MOODLEPAGEID@@',$moodlepageid,$poodlltemplate);
		$dataset_vars  = str_replace('@@MOODLEPAGEID@@',$moodlepageid,$dataset_vars);
		//stash this for passing to js
		$filterprops['MOODLEPAGEID']=$moodlepageid;
	
		//we should stash our wwwroot too
		$poodlltemplate = str_replace('@@WWWROOT@@',$CFG->wwwroot,$poodlltemplate);
		$dataset_vars  = str_replace('@@WWWROOT@@',$CFG->wwwroot,$dataset_vars);
		//actually this is available from JS anyway M.cfg.wwwroot . But lets make it easy for people
		$filterprops['WWWROOT']=$CFG->wwwroot;
	
	
		//if we have course variables e.g @@COURSE:ID@@
		if(strpos($poodlltemplate . ' ' . $dataset_vars ,'@@COURSE:')!==false){
				$coursevars = get_object_vars($COURSE);
				$coursepropstubs = explode('@@COURSE:',$poodlltemplate);
				$d_stubs = explode('@@COURSE:',$dataset_vars);
				if($d_stubs){
					$coursepropstubs = array_merge($coursepropstubs,$d_stubs);
				}
				$j_stubs=explode('@@COURSE:',$js_custom_script);
				if($j_stubs){
					$coursepropstubs = array_merge($coursepropstubs,$j_stubs);
				}


			//Course Props
				$profileprops=false;
				$count=0;
				foreach($coursepropstubs as $propstub){
					//we don't want the first one, its junk
					$count++;
					if($count==1){continue;}
					//init our prop value
					$propvalue=false;
				
					//fetch the property name
					//user can use any case, but we work with lower case version
					$end = strpos($propstub,'@@');
					$courseprop_allcase = substr($propstub,0,$end);
					$courseprop=strtolower($courseprop_allcase);
				
					//check if it exists in course
					if(array_key_exists($courseprop,$coursevars)){
						$propvalue=$coursevars[$courseprop];
					}elseif($courseprop=='contextid'){
						$context = context_course::instance($COURSE->id);
						if($context){
							$propvalue=$context->id;
						}
					}
					//if we have a propname and a propvalue, do the replace
					if(!empty($courseprop) && !empty($propvalue)){
						$poodlltemplate = str_replace('@@COURSE:' . $courseprop_allcase .'@@',$propvalue,$poodlltemplate);
						$dataset_vars  = str_replace('@@COURSE:' . $courseprop_allcase .'@@',$propvalue,$dataset_vars);
						//stash this for passing to js
						$filterprops['COURSE:' . $courseprop_allcase]=$propvalue;
					}
				}
		}//end of if @@COURSE

		//if we have user variables e.g @@USER:FIRSTNAME@@
		//It is a bit wordy, because trying to avoid loading a lib
		//or making a DB call if unneccessary
		if(strpos($poodlltemplate . ' ' . $dataset_vars . ' ' . $js_custom_script ,'@@USER:')!==false){
			$uservars = get_object_vars($USER);
			$userpropstubs = explode('@@USER:',$poodlltemplate);
			$d_stubs = explode('@@USER:',$dataset_vars);
			if($d_stubs){
				$userpropstubs = array_merge($userpropstubs,$d_stubs);
			}
			$j_stubs = explode('@@USER:',$js_custom_script);
			if($j_stubs){
				$userpropstubs = array_merge($userpropstubs,$j_stubs);
			}
		
			//User Props
			$profileprops=false;
			$count=0;
			foreach($userpropstubs as $propstub){
				//we don't want the first one, its junk
				$count++;
				if($count==1){continue;}
				//init our prop value
				$propvalue=false;
			
				//fetch the property name
				//user can use any case, but we work with lower case version
				$end = strpos($propstub,'@@');
				$userprop_allcase = substr($propstub,0,$end);
				$userprop=strtolower($userprop_allcase);
			
				//check if it exists in user, else look for it in profile fields
				if(array_key_exists($userprop,$uservars)){
					$propvalue=$uservars[$userprop];
				}else{
					if(!$profileprops){
						require_once("$CFG->dirroot/user/profile/lib.php");
						$profileprops = get_object_vars(profile_user_record($USER->id));
					}
					if($profileprops && array_key_exists($userprop,$profileprops)){
						$propvalue=$profileprops[$userprop];
					}else{
						switch($userprop){
							case 'picurl':
								require_once("$CFG->libdir/outputcomponents.php");
								global $PAGE;
								$user_picture=new user_picture($USER);
								$propvalue = $user_picture->get_url($PAGE);
								break;
							
							case 'pic':
								global $OUTPUT;
								$propvalue = $OUTPUT->user_picture($USER, array('popup'=>true));
								break;
						}
					}
				}
			
				//if we have a propname and a propvalue, do the replace
				if(!empty($userprop) && !empty($propvalue)){
					//echo "userprop:" . $userprop . '<br/>propvalue:' . $propvalue;
					$poodlltemplate = str_replace('@@USER:' . $userprop_allcase .'@@',$propvalue,$poodlltemplate);
					$dataset_vars  = str_replace('@@USER:' . $userprop_allcase .'@@',$propvalue,$dataset_vars);
					//stash this for passing to js
					$filterprops['USER:' . $userprop_allcase]=$propvalue;
				}
			}
		}//end of of we @@USER

		//if we have a dataset body
		//we split the $data_vars string passed in by user (which should have had all the replacing done)
		//into the vars array. This is passed to get_records_sql and the returned result is stored
		//in filter props. If its a single record, its available to the body area.
		//otherwise it needs to be accessewd from javascript in the DATASET variable
		$filterprops['DATASET']=false;
		if($dataset_body){
			$vars = array();
			if($dataset_vars){
				$vars=explode(',',$dataset_vars);
			}
			try {
				$alldata = $DB->get_records_sql($dataset_body, $vars);
				if($alldata) {
					$filterprops['DATASET'] = $alldata;
					//replace the specified names with spec values, if its a one element array
					if (sizeof($filterprops['DATASET']) == 1) {
						$thedata = get_object_vars(array_pop($alldata));
						foreach ($thedata as $name => $value) {
							$poodlltemplate = str_replace('@@DATASET:' . $name . '@@', $value, $poodlltemplate);
						}
					}
				}
			}catch(Exception $e){
				//do nothing;
			}
		}//end of if dataset
	
		//If this is the end tag we don't need to subsequent CSS and JS stuff. We already did it.
		if($endtag){
			return $poodlltemplate;
		}
	
		//get the conf info we need for this template
		$thescript = $conf['templatescript_' . $tempindex];
		$defaults=$conf['templatedefaults_' . $tempindex];
		$require_js = $conf['templaterequire_js_' . $tempindex];
		$require_css = $conf['templaterequire_css_' . $tempindex];
		$require_css = str_replace('@@WWWROOT@@', $CFG->wwwroot ,$require_css);
		$require_js = str_replace('@@WWWROOT@@', $CFG->wwwroot ,$require_js);
		
		//are we AMD and Moodle 2.9 or more?
		$require_amd = $conf['template_amd_' . $tempindex];
	
		//figure out if this is https or http. We don't want to scare the browser
		if(strpos($PAGE->url->out(),'https:')===0){
			$scheme='https:';
		}else{
			$scheme='http:';
		}
	
	
		//massage the js URL depending on schemes and rel. links etc. Then insert it
		//with AMD we set these as dependencies, so we don't need this song and dance
		if(!$require_amd){
			$filterprops['JSLINK']=false;
			if($require_js){
				if(strpos($require_js,'//')===0){
					$require_js = $scheme . $require_js;
				}elseif(strpos($require_js,'/')===0){
					$require_js = $CFG->wwwroot . $require_js;
				}
			
				//for load method: NO AMD
				$PAGE->requires->js(new moodle_url($require_js));
		
				//for load method: AMD
				//$require_js = substr($require_js, 0, -3);
				$filterprops['JSLINK'] = $require_js;
			}

		}

		//massage the CSS URL depending on schemes and rel. links etc. 
		if(!empty($require_css)){
			if(strpos($require_css,'//')===0){
				$require_css = $scheme . $require_css;
			}elseif(strpos($require_css,'/')===0){
				$require_css = $CFG->wwwroot . $require_css;
			}
		}

	
		//if not too late: load css in header
		// if too late: inject it there via JS
		$filterprops['CSSLINK']=false;
		$filterprops['CSSCUSTOM']=false;
	
		//require any scripts from the template
		$customcssurl=false;
		if($conf['templatestyle_' . $tempindex]){
			$customcssurl =new moodle_url( '/filter/poodll/templatecss.php?t=' . $tempindex);

		}
	
		if(!$PAGE->headerprinted && !$PAGE->requires->is_head_done()){
			if($require_css){
				$PAGE->requires->css( new moodle_url($require_css));
			}
			if($customcssurl){
				$PAGE->requires->css($customcssurl);
			}
		}else{
			if($require_css){
				$filterprops['CSSLINK']=$require_css;
			}
			if($customcssurl){
				$filterprops['CSSCUSTOM']=$customcssurl->out();
			}
		
		}
	
	
		//Tell javascript which template this is
		$filterprops['TEMPLATEID'] = $tempindex;

		
		$jsmodule = array(
				'name'     => 'filter_poodll',
				'fullpath' => '/filter/poodll/module.js',
				'requires' => array('json')
			);
		

		//AMD or not, and then load our js for this template on the page
		if($require_amd){

			$generator = new \filter_poodll\templatescriptgenerator($tempindex);
			$template_amd_script = $generator->get_template_script();

			//props can't be passed at much length , Moodle complains about too many
			//so we do this ... lets hope it don't break things
			$jsonstring = json_encode($filterprops);
			$props_html = \html_writer::tag('input', '', array('id' => 'filter_poodll_amdopts_' . $filterprops['AUTOID'], 'type' => 'hidden', 'value' => $jsonstring));
			$poodlltemplate = $props_html . $poodlltemplate;
		
			//load define for this template. Later it will be called from loadtemplate
			$PAGE->requires->js_amd_inline($template_amd_script);
			//for AMD template script
			$PAGE->requires->js_call_amd('filter_poodll/template_amd','loadtemplate', array(array('AUTOID'=>$filterprops['AUTOID'])));


		}else{

			//require any scripts from the template
			$PAGE->requires->js('/filter/poodll/templatejs.php?t=' . $tempindex);	
	
			//for no AMD
			$PAGE->requires->js_init_call('M.filter_poodll_templates.loadtemplate', array($filterprops),false,$jsmodule);
		}
	
		//finally return our template text	
		return $poodlltemplate;
	}//end of function

}//end of class
	
	
	
	//Original Code ------------------------------------------------------------------
	
	
/*
		function filter($text, array $options = array()) {
			global $CFG;

			   
			if (!is_string($text)) {
				// non string data can not be filtered anyway
				return $text;
			}
			
			$newtext = $text; // fullclone is slow and not needed here
				
			//NB test regular expressions here:
			//http://www.spaweditor.com/scripts/regex/index.php
			//using match all to see what will be matched and in what index of "link" variable it will show
			//currently MP4/FLV 0 shows the whole string, 1 the link,2 the width+height param string, 3, the width, 4 the height, 5 the linked text
			//MP3 0 shows the whole string, 1 the link, 2 the linked text
			
			//I think we can optimize this whole things a bit more, anyway we try to filter as little as possible
			$havelinks = !(stripos($text, '</a>') ===false);
			
			//check for mp3
			 if ($CFG->filter_poodll_handlemp3) {
				if ($havelinks) {
				// performance shortcut - all filepicker media links  end with the </a> tag,
					$search = '/<a\s[^>]*href="([^"#\?]+\.mp3)"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'filter_poodll_mp3_callback', $newtext);
				}
			}
			
			//check for mp4
			if ($CFG->filter_poodll_handlemp4) {
				if ($havelinks) {
					// performance shortcut - all filepicker media links  end with the </a> tag,
					
					//justin 20120525 added ability to declare width of media by appending strings like: ?d=640x480
					//$search = '/<a\s[^>]*href="([^"#\?]+\.mp4)"[^>]*>([^>]*)<\/a>/is';
					$search = '/<a\s[^>]*href="([^"#\?]+\.mp4)(\?d=([\d]{1,4})x([\d]{1,4}))?"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'filter_poodll_mp4flv_callback', $newtext);
				}
			}
			
			//experimental .mov support
			if ($CFG->filter_poodll_handlemov) {
				if ($havelinks) {
					$search = '/<a\s[^>]*href="([^"#\?]+\.mov)(\?d=([\d]{1,4})x([\d]{1,4}))?"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'filter_poodll_mp4flv_callback', $newtext);
				}
			}
			
			//check for flv
			if ($CFG->filter_poodll_handleflv) {
				if ($havelinks) {
				// performance shortcut - all filepicker media links  end with the </a> tag,
				
					//justin 20120525 added ability to declare width of media by appending strings like: ?d=640x480
					//$search = '/<a\s[^>]*href="([^"#\?]+\.flv)"[^>]*>([^>]*)<\/a>/is';
					$search = '/<a\s[^>]*href="([^"#\?]+\.flv)(\?d=([\d]{1,4})x([\d]{1,4}))?"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'filter_poodll_mp4flv_callback', $newtext);
				}
			}
			
			//check for .pdl . This is a shorthand filter using presets to allow selection of PoodLL widgets
			//from the Moodle File repository
			if($havelinks){
				if (!(stripos($text, '.pdl') ===false)) {
					// performance shortcut - all filepicker media links  end with the </a> tag,
					$search = '/<a\s[^>]*href="([^"#\?]+\.pdl)"[^>]*>([^>]*)<\/a>/is';
					$newtext = preg_replace_callback($search, 'filter_poodll_pdl_callback', $newtext);
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
*/

/*
*	Callback function , exists outside of class definition(because its a callback ...)
*
*/

/*
function filter_poodll_callback(array $link){
	global $CFG, $COURSE, $USER;

		$lm = new \filter_poodll\licensemanager();
		if(!$lm->validate_registrationkey($CFG->filter_poodll_registrationkey)) {
			return $lm->fetch_unregistered_content();
		}

	//get our filter props
	//we use a function in the poodll poodllresourcelib, because
	//parsing will also need to be done by the html editor
	$filterprops=	\filter_poodll\filtertools::fetch_filter_properties($link[0]);

	//if we have no props, quit
	if(empty($filterprops)){return "";}
	
	//if we want to ignore the filter (for "how to use a filter" demos) we let it go
	//to use this, make the last parameter of the filter passthrough=1
	if (!empty($filterprops['passthrough'])) return str_replace( ",passthrough=1","",$link[0]);
	
	//Init our return variable 
	$returnHtml ="";
	
	//Runtime JS or Flash
	if (empty($filterprops['runtime']))$filterprops['runtime'] ='auto'; 

	//depending on the type of filter
	switch ($filterprops['type']){
			
		case 'adminconsole':
			$returnHtml= \filter_poodll\filtertools::fetch_poodllconsole($filterprops['runtime']);
			break;
	
			
		case 'audio':
			$returnHtml= \filter_poodll\filtertools::fetchSimpleAudioPlayer($filterprops['runtime'],
			$filterprops['path'],!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',
				!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_audiowidth,
				!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_audioheight,
				!empty($filterprops['embed']) ? $filterprops['embed']=='true' : false,
				!empty($filterprops['embedstring']) ? $filterprops['embedstring'] : 'Play',
				false,
				!empty($filterprops['usepoodlldata']) ? $filterprops['usepoodlldata']=='true' : false,
				!empty($filterprops['splashurl']) ? $filterprops['splashurl'] : '') ;
			break;
			
		case 'audiolist':
			$returnHtml= \filter_poodll\filtertools::fetchAudioListPlayer($filterprops['runtime'],$filterprops['path'],
				!empty($filterprops['filearea']) ? $filterprops['filearea'] : 'content',
				!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',
				!empty($filterprops['width']) ? $filterprops['width'] : 400,
				!empty($filterprops['height']) ? $filterprops['height'] : 250,
				!empty($filterprops['sequentialplay']) ? $filterprops['sequentialplay'] : 'true',
				!empty($filterprops['player']) ? $filterprops['player'] : $CFG->filter_poodll_defaultplayer,
				!empty($filterprops['showplaylist']) ? $filterprops['showplaylist']=='true' : true,
				!empty($filterprops['usepoodlldata']) ? $filterprops['usepoodlldata']=='true' : false);
			break;
			
		case 'audiorecorder':
			$returnHtml= \filter_poodll\filtertools::fetchSimpleAudioRecorder($filterprops['runtime'],
						!empty($filterprops['savefolder']) ? $filterprops['savefolder'] : '');
			break;	
			
		case 'audiotest':
			$returnHtml= \filter_poodll\filtertools::fetchAudioTestPlayer($filterprops['runtime'],$filterprops['path'],
				!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',
				!empty($filterprops['width']) ? $filterprops['width'] : 400,
				!empty($filterprops['height']) ? $filterprops['height'] : 50,
				!empty($filterprops['filearea']) ? $filterprops['filearea'] : 'content',
				!empty($filterprops['usepoodlldata']) ? $filterprops['usepoodlldata']=='true' : false);
			break;	

			
		case 'bigvideogallery':
			$returnHtml= \filter_poodll\filtertools::fetchBigVideoGallery($filterprops['runtime'],$filterprops['path'],
				!empty($filterprops['filearea']) ? $filterprops['filearea'] : 'content',
				!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'http',
				!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_biggallwidth,
				!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_biggallheight,
				!empty($filterprops['usepoodlldata']) ? $filterprops['usepoodlldata']=='true' : false);
			break;	
			

		case 'calculator':
			$returnHtml= \filter_poodll\filtertools::fetch_poodllcalc($filterprops['runtime'],!empty($filterprops['width']) ? $filterprops['width'] : 300,
				!empty($filterprops['height']) ? $filterprops['height'] : 400,
				!empty($filterprops['size']) ? $filterprops['size'] : 'normal');
			break;


		case 'countdown':
			$returnHtml= \filter_poodll\filtertools::fetch_countdowntimer($filterprops['runtime'],$filterprops['initseconds'],
				!empty($filterprops['usepresets']) ? $filterprops['usepresets'] : 'false',
				!empty($filterprops['width']) ? $filterprops['width'] : 400,
				!empty($filterprops['height']) ? $filterprops['height'] : 300,
				!empty($filterprops['fontheight']) ? $filterprops['fontheight'] : 64,
				!empty($filterprops['mode']) ? $filterprops['mode'] : 'normal',
				!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false, 
				!empty($filterprops['uniquename']) ? $filterprops['uniquename'] : 'auniquename');
			break;
		
		case 'counter':
			$returnHtml= \filter_poodll\filtertools::fetch_counter($filterprops['runtime'],!empty($filterprops['initcount']) ? $filterprops['initcount']  : 0,
				!empty($filterprops['usepresets']) ? $filterprops['usepresets'] : 'false',
				!empty($filterprops['width']) ? $filterprops['width'] : 480,
				!empty($filterprops['height']) ? $filterprops['height'] : 265,
				!empty($filterprops['fontheight']) ? $filterprops['fontheight'] : 64,
				!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false );
			break;	
		
		case 'dice':
			$returnHtml= \filter_poodll\filtertools::fetch_dice($filterprops['runtime'],!empty($filterprops['dicecount']) ? $filterprops['dicecount']  : 1,
				!empty($filterprops['dicesize']) ? $filterprops['dicesize'] : 200,
				!empty($filterprops['width']) ? $filterprops['width'] : 600,
				!empty($filterprops['height']) ? $filterprops['height'] : 300);
			break;
			

		case 'flashcards':
			$returnHtml= \filter_poodll\filtertools::fetch_flashcards($filterprops['runtime'],
				!empty($filterprops['cardset']) ? $filterprops['cardset'] : -1,
				!empty($filterprops['qname']) ? $filterprops['qname'] : "",
				!empty($filterprops['frontcolor']) ? $filterprops['frontcolor'] : "0xDDDDDD",
				!empty($filterprops['backcolor']) ? $filterprops['backcolor'] : "0x000000",
				!empty($filterprops['cardwidth']) ? $filterprops['cardwidth'] : 300,
				!empty($filterprops['cardheight']) ? $filterprops['cardheight'] : 150,
				!empty($filterprops['randomize']) ? $filterprops['randomize'] : 'yes',
				!empty($filterprops['width']) ? $filterprops['width'] : 400,
				!empty($filterprops['height']) ? $filterprops['height'] : 300,
				!empty($filterprops['flashcardstype']) ? $filterprops['flashcardstype'] : $CFG->filter_poodll_flashcards_type);
			break;
			
		case 'miniplayer':
			$returnHtml= \filter_poodll\filtertools::fetch_miniplayer($filterprops['runtime'],$filterprops['url'],
				!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'http',
				!empty($filterprops['imageurl']) ? $filterprops['imageurl'] : '',
				!empty($filterprops['width']) ? $filterprops['width'] :  $CFG->filter_poodll_miniplayerwidth,
				!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_miniplayerwidth,
				!empty($filterprops['iframe']) ? $filterprops['iframe']=='true' :  false);
			break;
			
		case 'onceplayer':
			$returnHtml= \filter_poodll\filtertools::fetch_onceplayer($filterprops['runtime'],$filterprops['url'],
				!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'http',
				!empty($filterprops['width']) ? $filterprops['width'] :  0,
				!empty($filterprops['height']) ? $filterprops['height'] :  0,
				!empty($filterprops['iframe']) ? $filterprops['iframe']=='true' :  false);
			break;
			
		case 'newpoodllpairwork':
			$returnHtml= \filter_poodll\filtertools::fetch_embeddablepairclient($filterprops['runtime'],
				!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_newpairwidth,
				!empty($filterprops['height']) ? $filterprops['height'] : $CFG->filter_poodll_newpairheight,
				!empty($filterprops['chat']) ? $filterprops['chat'] : true,
				!empty($filterprops['whiteboard']) ? $filterprops['whiteboard'] : false, 
				!empty($filterprops['showvideo']) ? $filterprops['showvideo'] : false,
				!empty($filterprops['whiteboardback']) ? $filterprops['whiteboardback'] : ''
				);
			break;
			
		case 'stopwatch':
			$returnHtml= \filter_poodll\filtertools::fetch_stopwatch($filterprops['runtime'],!empty($filterprops['width']) ? $filterprops['width'] : 400,
				!empty($filterprops['height']) ? $filterprops['height'] : 265,!empty($filterprops['fontheight']) ? $filterprops['fontheight'] : 64,
				!empty($filterprops['mode']) ? $filterprops['mode'] : 'normal',
				!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false, 
				!empty($filterprops['uniquename']) ? $filterprops['uniquename'] : 'auniquename');
			break;
						
		case 'smallvideogallery':
			$returnHtml= \filter_poodll\filtertools::fetchSmallVideoGallery($filterprops['runtime'],$filterprops['path'],
				!empty($filterprops['filearea']) ? $filterprops['filearea'] : 'content',
				!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'http',
				!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_smallgallwidth,
				!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_smallgallheight,
				!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false,
				!empty($filterprops['usepoodlldata']) ? $filterprops['usepoodlldata']=='true' : false);
			break;

		case 'poodllpalette':
			$returnHtml= \filter_poodll\filtertools::fetch_poodllpalette($filterprops['runtime'],
			$filterprops['width'],$filterprops['height'],"swf");
			break;	
			
		case 'wordplayer':
			$returnHtml= \filter_poodll\filtertools::fetch_wordplayer($filterprops['runtime'],
				$filterprops['url'],$filterprops['word'],
				!empty($filterprops['fontsize']) ? $filterprops['fontsize'] : $CFG->filter_poodll_wordplayerfontsize,
				!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'http',
				!empty($filterprops['width']) ? $filterprops['width'] :  "0",
				!empty($filterprops['height']) ? $filterprops['height'] :  "0",
				!empty($filterprops['iframe']) ? $filterprops['iframe']=='true' :  false);
			break;
			
		case 'whiteboard':
			$returnHtml= \filter_poodll\filtertools::fetch_whiteboard($filterprops['runtime'],!empty($filterprops['boardname']) ? $filterprops['boardname'] : "whiteboard",
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
				$partnerpic = \filter_poodll\filtertools::fetch_user_picture($partner,35);
				$mepic = \filter_poodll\filtertools::fetch_user_picture($me,35);
				$poodllpairworkplayer =  "<h4>" . get_string("yourpartneris", "poodllpairwork") . fullname($partner) . "</h4>";
				$poodllpairworkplayer .= \filter_poodll\filtertools::fetchPairworkPlayer($pairmap->username,$pairmap->partnername,$mepic, fullname($me),$partnerpic,fullname($partner));
		
			}
			
			$returnHtml= $poodllpairworkplayer;
			break;
			
		case 'quizlet':
			$returnHtml= fetch_quizlet($filterprops['id'],
				!empty($filterprops['title']) ? $filterprops['title']  : 'quizlet',
				!empty($filterprops['mode']) ? $filterprops['mode'] :  'familiarize',
				!empty($filterprops['width']) ? $filterprops['width'] :  '100%',
				!empty($filterprops['height']) ? $filterprops['height'] :  '310')
				;
			break;	
			
		case 'scrollerstart':
			$returnHtml= \filter_poodll\filtertools::fetch_poodllscroller(true,
				!empty($filterprops['width']) ? $filterprops['width'] :  '400',
				!empty($filterprops['height']) ? $filterprops['height'] :  '200',
				!empty($filterprops['speed']) ? $filterprops['speed'] :  '10',
				!empty($filterprops['repeat']) ? $filterprops['repeat'] :  'yes',
				!empty($filterprops['axis']) ? $filterprops['axis'] :  'y',
				!empty($filterprops['pixelshift']) ? $filterprops['pixelshift'] :  '2')
				;
			break;	
		
		case 'scrollerstop':
			$returnHtml= \filter_poodll\filtertools::fetch_poodllscroller(false);

			break;

		
		case 'snapshot':
			$returnHtml= \filter_poodll\filtertools::fetchSnapshotCamera(!empty($filterprops['updatecontrol']) ? $filterprops['updatecontrol'] :  'filename',
				!empty($filterprops['filename']) ? $filterprops['filename'] :  'filename',
				!empty($filterprops['width']) ? $filterprops['width'] :  '350',
				!empty($filterprops['height']) ? $filterprops['height'] :  '400')
				;
			break;	

			
		case 'videorecorder':
			$returnHtml= \filter_poodll\filtertools::fetchSimpleVideoRecorder($filterprops['runtime'],
						!empty($filterprops['savefolder']) ? $filterprops['savefolder'] : '');
			break;	
			
		case 'video': 
			//$returnHtml= fetchSimpleVideoPlayer($filterprops['path'],$filterprops['width'],$filterprops['height']);
			$returnHtml= \filter_poodll\filtertools::fetchSimpleVideoPlayer($filterprops['runtime'],$filterprops['path'],
			!empty($filterprops['width']) ? $filterprops['width'] : $CFG->filter_poodll_videowidth,
			!empty($filterprops['height']) ? $filterprops['height'] :  $CFG->filter_poodll_videoheight,
			!empty($filterprops['protocol']) ? $filterprops['protocol'] : 'rtmp',
			!empty($filterprops['embed']) ? $filterprops['embed']=='true' : false,
			!empty($filterprops['permitfullscreen']) ? $filterprops['permitfullscreen'] : false ,
			!empty($filterprops['embedstring']) ? $filterprops['embedstring'] : 'Play',
			!empty($filterprops['splashurl']) ? $filterprops['splashurl'] : '') ;
			break;


		default:

	
	}

	//return our html
	return $returnHtml;

}//end of poodll default callback function
*/




/**
 * Replace pdl links with appropriate PoodLL widget
 *
 * @param  $link
 * @return string
 */
 
 /*
function filter_poodll_pdl_callback($link) {
global $CFG;

	$lm = new \filter_poodll\licensemanager();
	if(!$lm->validate_registrationkey($CFG->filter_poodll_registrationkey)) {
		return $lm->fetch_unregistered_content();
	}

	//strip the .pdl extension
	$len = strlen($link[2]);
	$trimpoint = strpos($link[2], ".pdl");
	$key=substr($link[2],0,$trimpoint);
	
	//see if there is a parameter to this widget
	$pos = strpos($key, "_");
	$param="";
	
	//if yes, trim it off the key and get its value
	if($pos){
		$param=substr($key,$pos+1);
		$key=substr($key,0,$pos);
	}

	//depending on the widget, make up a filter string
	switch ($key){
		case "audiorecorder": $fstring = "{POODLL:type=audiorecorder}";break;
		case "videorecorder": $fstring = "{POODLL:type=videorecorder}";break;
		case "snapshot": $fstring = "{POODLL:type=snapshot}";break;
		case "stopwatch": $fstring = "{POODLL:type=stopwatch}";break;
		case "dice": $fstring = "{POODLL:type=dice,dicecount=$param}";break;
		case "calculator": $fstring = "{POODLL:type=calculator}";break;
		case "countdown": $fstring = "{POODLL:type=countdown,initseconds=$param}";break;
		case "counter": $fstring = "{POODLL:type=counter}";break;
		case "whiteboardsimple": $fstring = "{POODLL:type=whiteboard,mode=simple,standalone=true}";break;
		case "whiteboardfull": $fstring = "{POODLL:type=whiteboard,mode=normal,standalone=true}";break;
		case "sliderocket": $fstring = "{POODLL:type=sliderocket,id=$param}";break;
		case "quizlet": $fstring = "{POODLL:type=quizlet,id=$param}";break;
		case "flashcards": $fstring = "{POODLL:type=flashcards,cardset=$param}";break;
	}
	
	//resolve the string and return it
	$returnHtml= filter_poodll_callback(array($fstring));	
	return $returnHtml;
}
*/

/**
 * Replace mp3 links with player
 *
 * @param  $link
 * @return string
 */

/*
function filter_poodll_mp3_callback($link) {
global $CFG;

	$lm = new \filter_poodll\licensemanager();
	if(!$lm->validate_registrationkey($CFG->filter_poodll_registrationkey)) {
		return $lm->fetch_unregistered_content();
	}

	//get the url and massage it a little
    $url = $link[1];
    $rawurl = str_replace('&amp;', '&', $url);
	
	//test for presence of player selectors and serve up the correct player
	$len = strlen($link[2]);
	if (strrpos($link[2],'.mini.mp3')=== $len-9){
		$returnHtml= \filter_poodll\filtertools::fetch_miniplayer('auto',$rawurl,'http','',0,0,true);
		
	}else if (strrpos($link[2],'.once.mp3')=== $len-9){
		$returnHtml= \filter_poodll\filtertools::fetch_onceplayer('auto',$rawurl,'http');
	
	}elseif(strrpos($link[2],'.word.mp3')=== $len-9){
		$word=substr($link[2],0,$len-9);
		$returnHtml=  \filter_poodll\filtertools::fetch_wordplayer('auto',$rawurl,$word,0,'http',0,0,true);
	
	}elseif(strrpos($link[2],'.inlineword.mp3')=== $len-15){
		$word=substr($link[2],0,$len-15);
		$returnHtml=  \filter_poodll\filtertools::fetch_wordplayer('js',$rawurl,$word,0,'http',0,0,true);
		
	}else{
		$returnHtml=  \filter_poodll\filtertools::fetchSimpleAudioPlayer('auto',$rawurl,'http',$CFG->filter_poodll_audiowidth,$CFG->filter_poodll_audioheight,false,'Play');
	}
	
	return $returnHtml;
}
*/

/**
 * Replace mp4 or flv links with player
 *
 * @param  $link
 * @return string
 */
 
 /*
function filter_poodll_mp4flv_callback($link) {
global $CFG;

	$lm = new \filter_poodll\licensemanager();
	if(!$lm->validate_registrationkey($CFG->filter_poodll_registrationkey)) {
		return $lm->fetch_unregistered_content();
	}

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
	
	//get the url and massage it a little
    $url = $link[1];
    $rawurl = str_replace('&amp;', '&', $url);
	
	//test for presence of player selectors and serve up the correct player
	//determine the file extension
	$ext = substr($link[5],-3); 
	$len = strlen($link[5]);
	if (strrpos($link[5],'.mini.' . $ext)=== $len-9){
		$returnHtml= \filter_poodll\filtertools::fetch_miniplayer('auto',$rawurl,'http','',0,0,true);
	
	}else if (strrpos($link[2],'.once.' . $ext)=== $len-9){
		$returnHtml= \filter_poodll\filtertools::fetch_onceplayer('auto',$rawurl,'http');
		
	}elseif(strrpos($link[5],'.word.' . $ext)=== $len-9){
		$word=substr($link[5],0,$len-9);
		$returnHtml= \filter_poodll\filtertools::fetch_wordplayer('auto',$rawurl,$word,0,'http',0,0,true);
		
	}elseif(strrpos($link[5],'.audio.' . $ext)=== $len-10){
		$returnHtml=  \filter_poodll\filtertools::fetchSimpleAudioPlayer('auto',$rawurl,'http',$CFG->filter_poodll_audiowidth,$CFG->filter_poodll_audioheight,false,'Play');
		
	}elseif(strrpos($link[5],'.inlineword.' . $ext)=== $len-15){
		$word=substr($link[5],0,$len-15);
		$returnHtml= \filter_poodll\filtertools::fetch_wordplayer('js',$rawurl,$word,0,'http',0,0,true);
	
		
	}else{
		$returnHtml=  \filter_poodll\filtertools::fetchSimpleVideoPlayer('auto',$url,$width,$height,'http',false,true , 'Play');
	}
	
	return $returnHtml;
}
*/