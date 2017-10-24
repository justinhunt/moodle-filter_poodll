/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('Radial Progress: initialising');

    return {
    
        playcanvas: null,
		context: null,
		x: null,
		y: null,
		current: 0,

        //for making multiple instances
        clone: function(){
            return $.extend(true,{},this);
        },

        //pass in config, the jquery video/audio object, and a function to be called when conversion has finshed
        init: function(playcanvas){
        	//stash the key actors for calling from draw
            this.playcanvas = playcanvas.get(0);
            this.x = this.playcanvas.width / 2;
			this.y = this.playcanvas.height / 2;
			this.context = this.playcanvas.getContext('2d');
			
			//set draw params, later could make this configurable
			this.context.lineWidth = 10;
			this.context.strokeStyle = '#ad2323';
			this.context.setLineDash([15, 5]);
			this.context.shadowOffsetX = 0;
			this.context.shadowOffsetY = 0;
			this.context.shadowBlur = 10;
			this.context.shadowColor = '#fff';
			
			//var self=this;
			//setInterval(function(){self.draw(self)},50);
        },
        
        clear: function(){
        	this.context.clearRect(0, 0, this.playcanvas.width, this.playcanvas.height);
        },
        
		draw: function(current){

			var radius = 65;
			var endPercent = 100;
			var curPerc = 0;
			var counterClockwise = false;
			var circ = Math.PI * 2;
			var quart = Math.PI / 2;
			var that=this;	 
			this.context.beginPath();
			this.context.arc(this.x, this.y, radius, -(quart), ((circ) * current) - quart, counterClockwise);
			this.context.stroke();
			 
			/*
			//this code is good if we are calling an animation. 
			//But in our case we are calling draw during an event, 
			//so its not necessary to use tricks like this to update the canvas
			 if (current < endPercent) {
			 	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				requestAnimationFrame(function () {
					 that.draw(current / 99)
				 });
				 
			 }
			 */
			 
		}
    };//end of returned object
});//total end
