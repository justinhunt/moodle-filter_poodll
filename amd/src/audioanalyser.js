/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('audioanalyser: initialising');

    return {
    
        acontext: null,
		aanalyser: null,
		freq_data: null,
		wav_data: null,
		
        //for making multiple instances
        clone: function(){
            return $.extend(true,{},this);
        },

        //pass in config, the jquery video/audio object, and a function to be called when conversion has finshed
        init: function(acontext){
            this.acontext = acontext;
            this.aanalyser=this.acontext.createAnalyser();
            
            var bufferLength = analyser.frequencyBinCount;
            this.freq_data=new Uint8Array(bufferLength);
            this.wav_data=new Uint8Array(bufferLength);
            
			//var self=this;
			//setInterval(function(){self.draw(self)},50);
        },
        
        clear: function(){
        	this.context.clearRect(0, 0, this.playcanvas.width, this.playcanvas.height);
        },
        
		process_recent_data: function(){
			var that=this;
			
			//prepare the loop that will roll over publishing data
			var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
						  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			raf(that.process_recent_data);
			
			//get store and publish wav data
  			that.aanalyser.getByteTimeDomainData(that.wav_data);
			that.wave_event(that.wav_data);
			
			//get store and publish freq data
			that.aanalyser.getByteFrequencyData(that.freq_data);
			that.freq_event(that.freq_data);
		},
		
		wav_event: function(){console.log('wav event');},
		freq_event: function(){}
    };//end of returned object
});//total end
