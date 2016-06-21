/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader'], function($, log, uploader) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Flash Recorder: initialising');

    return {
    
    	// This recorder supports the current browser
        supports_current_browser: function() { 
        	log.debug('PoodLL Flash Recorder: supports this browser');
        	return true;//or false
        },
        
        // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) { 
		   // log.debug(config);
		   // log.debug(config.widgetjson);
			var swfopts={};
			swfopts.cancelmousewheel = true;
			swfopts.allowfullscreen = true;
			swfopts.accessible = true;
			swfopts.serverroot = '/';
			swfopts.appenddivid = config.widgetid + 'Container';
			swfopts.url=config.audiomp3_url;
			swfopts.skin=config.audiomp3_skin;
			swfopts.width=config.audiomp3_width;
			swfopts.height=config.audiomp3_height;
        	lz.embed.swf(swfopts);
        }
    }//end of returned object
});//total end