/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader'], function($, log, uploader) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL upload Recorder: initialising');

    return {
    
    	config: null,
    	
		// This recorder supports the current browser
        supports_current_browser: function(config) { 
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
         	var config = this.config;
         	switch(config.mediatype){
         		case 'video': 
         		  acceptmedia='video/*';
         		  break;
         		case 'audio': 
         		default:
         		 var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
         		 if(iOS){
         		 	acceptmedia='video/*';
         		 }else{
         		 	acceptmedia='audio/*';
         		 }
         	}

         //html5 recorder proper
			var controls= '<div class="p_btn_wrapper">';

			controls += '<input type="file" id="' + config.widgetid + '_poodllfileselect" name="poodllfileselect[]" accept="' +  acceptmedia + '"/>';
			controls += '<button type="button" class="p_btn">' + M.util.get_string('recui_recordorchoose', 'filter_poodll')  + '</button>'; 
			controls += '</div>';
			$(element).prepend(controls); 
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