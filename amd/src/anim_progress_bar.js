/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('Bar Progress: initialising');

    return {

        playcanvas: null,
        context: null,
        startx: null,
        starty: null,
        barwidth: null,
        barheight: null,
		enabled: false,


        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },

        //pass in config, the jquery video/audio object, and a function to be called when conversion has finshed
        init: function (playcanvas) {
            //stash the key actors for calling from draw
            this.playcanvas = playcanvas.get(0);
            this.startx = 0;
            this.starty = 0;
            this.barwidth = this.playcanvas.width;
            this.barheight = this.playcanvas.height;
            this.context = this.playcanvas.getContext('2d');

        },
 
        clear: function () {
            this.context.clearRect(this.startx, this.starty, this.barwidth, this.barheight);
        },
        //this function to be overridden by calling class
        //0= 0% 1=100%
        fetchCurrent: function () {
            return 0;
        },

        stop: function () {
        	this.enabled= false;
        	this.clear();
        },

        start: function () {
            this.clear();
        	this.enabled=true;
        	var that = this;
            //set draw params, later could make this configurable
            this.context.fillStyle = '#C2C2C2';
           

			var draw= function () {
   
                if(!that.enabled){
                   return;
                }			

				that.context.fillRect(that.startx,that.starty,that.fetchCurrent() * that.barwidth,that.barheight);

				var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                requestAnimationFrame(draw);

			}//end of draw
			draw();
    	}//end of enable
    };//end of returned object
});//total end
