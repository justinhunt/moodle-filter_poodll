/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader','filter_poodll/webcam'], function($, log, uploader, Webcam) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Snapshot Recorder: initialising');

    return {
    
    	config: null,
    	imagefile: false,
    	htmlthings: '',
    	
		// This recorder supports the current browser
        supports_current_browser: function(config) { 
        	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        	if (iOS){
        		return false;
        	}else{
        		if(config.mediatype!='snapshot'){return false;}
        		
        		log.debug('PoodLL Snapshot Recorder: supports this browser');
        		return true;
        	}
        },
        
        // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) { 
        	this.config = config;
        	this.insert_controls(element);
        	uploader.init(element,config);
      		this.register_events();
        },

        insert_controls: function(element){
         	//for now.
         	var acceptmedia = '';
         	var config = this.config;

			
			 var htmlthings ={
            	camera: config.widgetid + '_poodll_snapshot_camera',
            	preview: config.widgetid + '_poodll_snapshot_preview',
            	snapbutton: config.widgetid + '_poodll_take-snapshot',
            	savebutton: config.widgetid + '_poodll_save-snapshot',
            	cancelbutton: config.widgetid + '_poodll_cancel-snapshot'
            };
            this.htmlthings =htmlthings;
			
			
         	//html5 snapshot maker proper
			//camera
			var controls= '<div id="' + htmlthings.camera + '" style="width:320px; height:240px;"></div>';
			//preview
			controls += '<div id="' + htmlthings.preview + '" class="hide" style="width:320px; height:240px;"></div>';
			//snap button
			controls += '<button type="button" class="poodll_take-snapshot" id="' + htmlthings.snapbutton + '">' +
				 M.util.get_string('recui_takesnapshot', 'filter_poodll') + 
				 '</button>';
			//cancel button
			controls += '<button type="button" class="poodll_cancel-snapshot" id="' + htmlthings.cancelbutton + '">' +
				 M.util.get_string('recui_cancelsnapshot', 'filter_poodll') + 
				 '</button>';
			//save button
			controls += '<button type="button" class="poodll_save-recording" id="'+ htmlthings.savebutton + '">' + 
				M.util.get_string('recui_save', 'filter_poodll') + 
				'</button>';
			$(element).prepend(controls); 
		},
        
         // handle image file uploads for Mobile
        register_events: function() {

            var self =this;
            var config = this.config;
			Webcam.set('swfURL',M.cfg.wwwroot + '/filter/poodll/3rdparty/webcam/webcam.swf');
            Webcam.attach('#' + this.htmlthings.camera);
            
            $('#' + this.htmlthings.savebutton).on('click',function(e){
                if(self.imagefile){
					var mimetype = 'image/jpeg';
					var imageblob = uploader.dataURItoBlob(self.imagefile,mimetype);
                	uploader.uploadFile(imageblob,mimetype);
                }else{
                    uploader.Output(M.util.get_string('recui_nothingtosaveerror','filter_poodll'));
                }//end of if self.imagefile		
            });
            
            $('#'  + this.htmlthings.cancelbutton).on('click',function(e){
            		self.imagefile = false;
            		$('#' + self.htmlthings.preview).addClass('hide').html('');
            		$('#' + self.htmlthings.camera).removeClass('hide');
            });
            
            $('#'  + this.htmlthings.snapbutton).on('click',function(e){
            	Webcam.snap( function(data_uri) {
            		self.imagefile = data_uri;
                	$('#' + self.htmlthings.preview).html('<img src="'+data_uri+'"/>').removeClass('hide');
                	$('#' + self.htmlthings.camera).addClass('hide');
            	} );
            });

        }

    }//end of returned object
});//total end
