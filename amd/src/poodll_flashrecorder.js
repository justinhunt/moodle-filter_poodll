/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader','filter_poodll/lzflash'], function($, log, uploader, lz) {

    "use strict"; // jshint ;

    log.debug('PoodLL Flash Recorder: initialising');

    return {
    
        savebutton: null,
        audiodatacontrol: null,
    
    	// This recorder supports the current browser
        supports_current_browser: function(config) { 
        	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        	if (iOS){
        		return false;
        	}else{
        		if(config.mediatype=='video'){return false;}
        		
        		log.debug('PoodLL Flash Recorder: supports this browser');
        		return true;
        	}
        },
        
        // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) { 
	
		   //swf recorder
            var swfopts = $.parseJSON(config.flashmp3audio_widgetjson);        
        	lz.embed.swf(swfopts);
     
         //savebutton
		   var savebuttonid = config.widgetid + '_savebutton'; 
        	var savecontrol ='<button id="' + savebuttonid + '" type="button" class="poodll_save-recording">' + M.util.get_string('recui_save', 'filter_poodll') + '</button>';
			$(element).append(savecontrol);
		   
		   //audio control
		   var audiodatacontrolid = config.widgetid + '_audiodatacontrol'; 
        	var audiocontrol ='<input type="hidden" id="' + audiodatacontrolid + '"/>';
        	 $(element).prepend(audiocontrol);
     
     		//init the uploader
		   uploader.init(element,config);
     
			//register events
			lz.embed[config.widgetid].setCanvasAttribute('audiodatacontrol',audiodatacontrolid);
			this.savebutton = $('#' + savebuttonid );
			this.audiodatacontrol = $('#' + audiodatacontrolid );
			this.registerevents();
        },
        
        registerevents: function(){
        	var thisthis  = this;
        	this.savebutton.click(function() {
                //this.disabled = true;
              //here we convert a string og base64 data into a blob which represents 
              //an mp3 file.  
              var audiodata = atob(thisthis.audiodatacontrol.val());
              var audioblobdata=[];
              for(var i = 0; i < audiodata.length; i++) {audioblobdata.push(audiodata.charCodeAt(i));}
              var audioBlob = new Blob([new Uint8Array(audioblobdata)],{type: 'audio/mpeg3'});
              //and we upload that blob
              uploader.uploadBlob(audioBlob,'audio/mpeg3');
            });//end of save button click
        
        }
    }//end of returned object
});//total end