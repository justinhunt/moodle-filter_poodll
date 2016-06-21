/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Mobile Recorder: initialising');

    return {
		// This recorder supports the current browser
        supports_current_browser: function() { 
        	return true;//or false
        },
        
         // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) { 
            this.config = config;
            this.insert_audio_button(element);
        	return true;//or false
        },
        
        insert_video_button: function(element){
			var button = '<a href="poodll:media?type=video">open poodll app</a>';
			$(element).prepend(controls);        
        },
        insert_audio_button: function(element){
			var button = '<a href="poodll:media?type=audio">open poodll app</a>';
			$(element).prepend(controls);        
        }
    }//end of returned object
});//total end