/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('Universal Uploader: initialising');

    return {
        increment: 1,
        initseconds: 0,
        seconds: 0,
        finalseconds: 0,
        intervalhandle: null,
        callback: null,
        enabled: false,

        //for making multiple instances
        clone: function(){
            return $.extend(true,{},this);
        },

        init: function(initseconds,callback){
            this.initseconds = parseInt(initseconds);
            this.seconds = parseInt(initseconds);
            this.callback = callback;
            this.enabled = true;
        },

        start: function(){
            if(!this.enabled){return;}

            var self = this;
            this.finalseconds=0;
            if(this.initseconds > 0){this.increment=-1;}else{this.increment = 1;}
            this.intervalhandle = setInterval(function(){
                    self.seconds = self.seconds + self.increment;
                    self.finalseconds=self.finalseconds+1;
                    self.callback();
            },1000);
        },

        disable: function(){
            this.enabled = false;
        },

        enable: function(){
            this.enabled = true;
        },

        fetch_display_time: function(someseconds){
            if(!someseconds){someseconds=this.seconds;}
            var theHours = '00' + parseInt(someseconds/3600);
            theHours = theHours.substr(theHours.length -2,2);
            var theMinutes = '00' + parseInt(someseconds/60);
            theMinutes = theMinutes.substr(theMinutes.length -2,2);
            var theSeconds = '00' + parseInt(someseconds%60);
            theSeconds = theSeconds.substr(theSeconds.length -2,2);
            var display_time= theHours + ':' + theMinutes + ':' + theSeconds ;
            return display_time;
        },

        stop: function(){
            clearInterval(this.intervalhandle);
        },

        reset: function(){
            this.seconds = this.initseconds;
        },

        pause: function(){
            this.increment = 0;
        },
        resume: function(){
            if(this.initseconds > 0){this.increment=-1;}else{this.increment = 1;}
        }

    };//end of returned object
});//total end
