/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('Radial Progress: initialising');

    return {

        playcanvas: null,
        context: null,
        x: null,
        y: null,
        currenttime: 0,
		enabled: false,
        showpercent: false,
        barcolor: '#ad2323',


        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },

        //pass in config, the jquery video/audio object, and a function to be called when conversion has finshed
        init: function (playcanvas, barcolor,showpercent) {
            //stash the key actors for calling from draw
            this.playcanvas = playcanvas.get(0);
            this.x = this.playcanvas.width / 2;
            this.y = this.playcanvas.height / 2;
            this.context = this.playcanvas.getContext('2d');
            if(showpercent) {
                this.showpercent = showpercent;
            }
            if(showpercent) {
                this.barcolor = barcolor;
            }


        },

        clear: function () {
            this.context.clearRect(0, 0, this.playcanvas.width, this.playcanvas.height);
        },
        fetchCurrent: function () {
            return 0;
        },

        stop: function () {
        	this.enabled= false;
        	//this.clear();
        },

        start: function () {
            this.clear();
        	this.enabled=true;
        	var that = this;

            //set draw params, later could make this configurable
            this.context.lineWidth = 10;
            this.context.strokeStyle = that.barcolor;
            this.context.setLineDash([]);
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            this.context.shadowBlur = 10;
            this.context.shadowColor = '#fff';

            this.context.font='18px Arial';
            this.context.textAlign="center";
            this.context.textBaseline='middle';


			var draw= function () {
                if(!that.enabled){
                   return;
                }
                that.clear();
				var radius = Math.min(that.x, that.y) - that.context.lineWidth;//65;
				var counterClockwise = false;
				var circ = Math.PI * 2;
				var quart = Math.PI / 2;
				var current = that.fetchCurrent();
				that.context.beginPath();
				that.context.arc(that.x, that.y, radius, -(quart), ((circ) * current) - quart, counterClockwise);

				//draw progress if we are doing that
                if(that.showpercent){
                    that.context.fillText(parseInt(current * 100)  + '%',that.x,that.y);
                }

				that.context.stroke();

				var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                requestAnimationFrame(draw);

			}//end of draw
			draw();
    	}//end of enable
    };//end of returned object
});//total end
