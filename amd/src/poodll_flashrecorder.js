/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader','filter_poodll/lzflash'], function($, log, uploader, lz) {

    "use strict"; // jshint ;

    log.debug('PoodLL Flash Recorder: initialising');

    return {
		
		instanceprops: [],
		
		fetch_instance_props : function(widgetid){
			return this.instanceprops[widgetid];
		},
		
		init_instance_props: function(widgetid){
			var props = {};
			props.savebutton= null;
			props.audiodatacontrol= null;
			props.config= null;
			props.uploader = null;
			this.instanceprops[widgetid] = props
		},
    
    	// This recorder supports the current browser
        supports_current_browser: function(config) { 
        	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        	if (iOS){
        		return false;
        	}else{
        		if(config.mediatype!='audio'){return false;}
        		
        		log.debug('PoodLL Flash Recorder: supports this browser');
        		return true;
        	}
        },
        
        // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) { 
			//if we are bypassing cloud tweak a few things
			if(config.flashmp3_cloudbypass==1){
				config.posturl = config.cloudbypassurl; 
				config.filename=false;
				config.s3filename =false;
				config.using_s3=false;
			}
			this.init_instance_props(config.widgetid);
			var ip = this.fetch_instance_props(config.widgetid);
        	//set config
        	ip.config = config;
	
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
			ip.uploader  = uploader.clone();
		    ip.uploader.init(element,config);
     
			//register events
			lz.embed[config.widgetid].setCanvasAttribute('audiodatacontrol',audiodatacontrolid);
			ip.savebutton = $('#' + savebuttonid );
			ip.audiodatacontrol = $('#' + audiodatacontrolid );
			this.registerevents(config.widgetid);
        },
        
        registerevents: function(widgetid){
			var ip = this.fetch_instance_props(widgetid);
			
        	ip.savebutton.click(function() {
                //this.disabled = true;
              //here we convert a string og base64 data into a blob which represents 
              //an mp3 file.  
              var audiodata = atob(ip.audiodatacontrol.val());
              var audioblobdata=[];
              for(var i = 0; i < audiodata.length; i++) {audioblobdata.push(audiodata.charCodeAt(i));}
              var audioBlob = new Blob([new Uint8Array(audioblobdata)],{type: 'audio/mpeg3'});
              //and we upload that blob
              ip.uploader.uploadBlob(audioBlob,'audio/mpeg3');
              //we would like to disable the recorder here
              var apicall = 'poodllapi.mp3_disable()';
              lz.embed[ip.config.widgetid].callMethod(apicall);
              //just in case
              return false;
            });//end of save button click
        
        }
    }//end of returned object
});//total end
