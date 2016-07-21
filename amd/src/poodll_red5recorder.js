/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader'], function($, log, uploader) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Red5 Recorder: initialising');

    return {
    
    	// This recorder supports the current browser
        supports_current_browser: function() { 
        	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        	if (iOS){
        		return false;
        	}else{
        		log.debug('PoodLL Red5 Recorder: supports this browser');
        		return true;
        	}
        },
        
        // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) {
			switch(config.mediatype){
				case 'video':
					log.debug('config.red5video_widgetjson:' + config.red5video_widgetjson);
					var swfopts = $.parseJSON(config.red5video_widgetjson);
					break;
				case 'audio':
				default:
					var swfopts = $.parseJSON(config.red5audio_widgetjson);
			}
			/*
			swfopts.cancelmousewheel = true;
			swfopts.allowfullscreen = true;
			swfopts.accessible = true;
			swfopts.serverroot = '/';
			swfopts.appenddivid = config.widgetid + 'Container';
			*/
        	lz.embed.swf(swfopts);
        }
    }//end of returned object
});//total end