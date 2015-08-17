/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/reveal'], function($, log, revealjs) {

  "use strict"; // jshint ;_;

  log.debug('Filter PoodLL: revealjs initialising');

  return {
	  
		injectcss: function(csslink){
			var link = document.createElement("link");
			link.href = csslink;
			if(csslink.toLowerCase().lastIndexOf('.html')==csslink.length-5){
				link.rel = 'import';
			}else{
				link.type = "text/css";
				link.rel = "stylesheet";	
			}
			document.getElementsByTagName("head")[0].appendChild(link);	
		},
		
		// load and stash all our variables
		loadrevealjs: function(opts) {
			log.debug(opts);	
			//load our css in head if required
			if(opts['CSS_INJECT']){
					this.injectcss(opts['CSS_REVEAL']);
					this.injectcss(opts['CSS_THEME']);
			}
			//initialise Reveal JS
			Reveal.initialize({
			embedded: true, 
			loop: true,
			width: 600,
			heigh: 400
			});
		}//end of function
	}
});
/* jshint ignore:end */