/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader'], function($, log, uploader) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL upload Recorder: initialising');

    return {
    
    	config: null,
    	
		// This recorder supports the current browser
        supports_current_browser: function() { 
        	return true;//or false
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
         	log.debug('and config ha');
         	var config = this.config;
         	switch(config.mediatype){
         		case 'audio': 
         		default:
         		 acceptmedia='audio';
         	}

         	log.debug('got to insert controls');
         //html5 recorder proper
			var controls= '<div class="p_btn_wrapper">';

			controls += '<input type="file" id="' + config.widgetid + '_poodllfileselect" name="poodllfileselect[]" ' +  acceptmedia + '/>';
			controls += '<button type="button" class="p_btn">Record Now</button>'; 
			controls += '</div>';
		
		//progress and messaging
		//these controls are for the uploader not for the upload recorder. To be removed
			/*
			controls += '<div id="' + config['recorderid'] + '_progress" class="p_progress"><p></p></div>';
			controls += '<div id="' + config['recorderid'] + '_messages" class="p_messages"></div>';
			*/
			
			$(element).prepend(controls); 
			log.debug('got to insert controls:prepend'); 
		},
        
         // handle audio/video/image file uploads for Mobile
        register_events: function() {

            var self =this;
            var config = this.config;
            $('#' + config.widgetid + '_poodllfileselect').on('change',function(e){
                    self.FileSelectHandler(e); }
                );

        },

        // file selection
        FileSelectHandler: function(e) {

            // fetch FileList object
            var files = e.target.files || e.dataTransfer.files;

            // process all File objects
            for (var i = 0, file; file = files[i]; i++) {
                //this.ParseFile(f);
                uploader.uploadBlob(file,file.type);
            }
        },

        // output file information
        ParseFile: function(file) {

            // start upload
            var filedata ="";
            var reader = new FileReader();
            reader.onloadend = function(e) {
                filedata = e.target.result;
                uploader.uploadFile(filedata, file.type);
            }
            reader.readAsDataURL(file);

        }

    }//end of returned object
});//total end