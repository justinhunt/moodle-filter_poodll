/**
 * Javascript for loading swf widgets , espec flowplayer for PoodLL
 *
 * @copyright &copy; 2012 Justin Hunt
 * @author poodllsupport@gmail.com
 * @license http://www.gnu.org/copyleft/gpl.html GNU Public License
 * @package filter_poodll
 */

M.filter_poodll = {}

// Replace poodll_flowplayer divs with flowplayers
M.filter_poodll.loadflowplayer = function(Y,opts) {

//the standard config. change backgroundcolor to go from blue to something else	
theconfig = { plugins:
                                { controls:
                                        { fullscreen: false,
                                                height: 40,
                                                autoHide: false,
                                                buttonColor: '#ffffff',
                                                backgroundColor: opts['bgcolor'],
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
                                                opacity: 1.0 },
                                       
                                audio:
                                        { url: opts['audiocontrolsurl'] }
                                },
                playlist: opts['playlisturl'] ,
                clip:
                        { autoPlay: true }
        } ;
		
	var splash=false;

	//the params are different depending on the playertype
	//we need to specify provider for audio if the clips are not MP3 or mp3
	//jqueryseems unavoidable even if not using it for playlists
	switch(opts['playertype']){
		case "audio":
			if (opts['jscontrols']){
					theconfig.plugins.controls = null;
					//we don't need to see the flowplayer video/audio at all if we are using js 
					opts["height"]=1;
			}else{

				theconfig.plugins.controls.fullscreen =false;
				theconfig.plugins.controls.height = opts['height'];
				theconfig.plugins.controls.autoHide= false;
			}
			
			//We need to tell flowplayer if we have mp3 to play.
			//if it is FLV, we should not pass in a provider flag
			var ext = opts['path'].substr(opts['path'].lastIndexOf('.') + 1);
			if(ext==".mp3" || ext==".MP3"){
				theconfig.clip.provider='audio';			
			}
	
						
			//If we have a splash screen show it and enable autoplay(user only clicks once)
			//best to have a splash screen to prevent browser hangs on many flashplayers in a forum etc
			if(opts['poodll_audiosplash']){
				theconfig.clip.autoPlay=true;
				splash=true;
			}else{
				theconfig.clip.autoPlay=false;
			}
			break;
		
		case "audiolist":
			if (opts['jscontrols']){
					theconfig.plugins.controls = null;
					//we don't need to see the flowplayer video/audio at all if we are using js 
					opts["height"]=1;
			}else{
				theconfig.plugins.controls.fullscreen = false;
				theconfig.plugins.controls.height = opts['defaultcontrolsheight'];
				theconfig.plugins.controls.autoHide= false;
				theconfig.plugins.controls.playlist = true;
			}
			
			//without looking inside the playlist we don't know if the audios are flv or mp3.
			//here we assume that audio playlists are mp3. If not we need to remove the provider element
			theconfig.clip.autoPlay=true;
			theconfig.clip.provider='audio';
			break;
		
		case "video":
			//theconfig.plugins.audio= null;
			
			if (opts['jscontrols']){
				theconfig.plugins.controls =null;
			}else{
				theconfig.plugins.controls.fullscreen = true;
				theconfig.plugins.controls.height = opts['defaultcontrolsheight'];
				theconfig.plugins.controls.autoHide= true;
			}
			//set the color to black on video screens
			theconfig.plugins.controls.backgroundColor = '#0';

			
			//If we have a splash screen show it and enable autoplay(user only clicks once)
			//best to have a splash screen to prevent browser hangs on many flashplayers in a forum etc
			if(opts['poodll_videosplash']){
				theconfig.clip.autoPlay=true;
				splash=true;
			}else{
				theconfig.clip.autoPlay=false;
			}
			break;
		
		case "videolist":
			theconfig.plugins.controls.fullscreen = false;
			theconfig.plugins.controls.height = opts['defaultcontrolsheight'];
			theconfig.plugins.controls.autoHide= true;
			theconfig.plugins.controls.playlist = true;
			theconfig.clip.autoPlay=false;
			//set the color to black on video screens
			theconfig.plugins.controls.backgroundColor = '#0';
			break;
	
	
	}
	
	//should there be a problem with standard embedding, we can try this simpler
	//way
	if(opts['embedtype']=='flashembed'){
       theconfig.clip.url= opts['path'];
		//we should not have to specify this, but we do ...?
	
		if(splash){
			document.getElementById(opts['playerid']).onclick = function() {
				flashembed(opts['playerid'], opts['playerpath'], {config: theconfig});
			}
		}else{
			flashembed(opts['playerid'], opts['playerpath'], {config: theconfig});
		}
		//console.log("flashembed embedded");
	
	//embed via swf object
	}else if(opts['embedtype']=='swfobject'){

       //we should not have to specify this, but we do ...?
       theconfig.clip.url= opts['path'];
       
	   if(splash){
			// get flash container and assign click handler for it
			document.getElementById(opts['playerid']).onclick = function() {
				swfobject.embedSWF(opts['playerpath'],
						opts['playerid'], opts['width'], 
						opts['height'] , 
						"9.0.0", 
						null, 
						{config: JSON.stringify(theconfig)}
					);
			}
		}else{
			swfobject.embedSWF(opts['playerpath'],
    				opts['playerid'], opts['width'], 
    				opts['height'] , 
    				"9.0.0", 
    				null, 
    				{config: JSON.stringify(theconfig)}
    			);
		}
    	//console.log(JSON.stringify(theconfig));
    	//console.log("swfobject embedded");
    	
    	
    	
    	
    	
    	
	
	//usually we will try this, though.
	}else{
	
		/* output the flowplayer */	
		$fp = flowplayer(opts['playerid'],opts['playerpath'],theconfig);
		
		//output any other bits and pieces required
		if(opts['controls']!="0"){$fp = $fp.controls(opts['controls']);}
		if(opts['ipad']){$fp=$fp.ipad();}
		if(opts['playlist']){$fp=$fp.playlist("div.poodllplaylist", {loop: opts["loop"]});}
	
	}

	//for debugging
//	console.log(theconfig);

	
}




