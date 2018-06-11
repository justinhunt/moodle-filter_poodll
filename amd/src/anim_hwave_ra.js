/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('anim_horizontal_wave_ra: initialising');

    return {

        analyser: null,
        cvs: null,
        cvsctx: null,
        sounddetected: false,

        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },


        //init
        init: function (analyser, cvs) {
            this.cvs = cvs;
            this.cvsctx=cvs.getContext("2d");
            this.cvsctx.font='48px FontAwesome';
            this.cvsctx.textAlign="center";
            this.analyser = analyser;
        },

        clear: function(){
            this.cvsctx.clearRect(0, 0, this.cvs.width,this.cvs.height);
            this.cvsctx.lineWidth = 2;
            this.cvsctx.strokeStyle = 'rgb(0, 0, 0)';
            this.cvsctx.beginPath();
            this.cvsctx.fillText('\uF130',this.cvs.width/2, this.cvs.height/1.5);
            this.cvsctx.stroke();
        },

        start: function(){
            this.analyser.core.fftSize = 2048;
            var bufferLength = this.analyser.core.fftSize;
            var dataArray = new Uint8Array(bufferLength);
            var cwidth = this.cvs.width;
            var cheight = this.cvs.height;
            var canvasCtx = this.cvsctx;
            var analyser = this.analyser;
            var that = this;
            this.clear();

            var draw = function () {

                var drawVisual = requestAnimationFrame(draw);

                //cancel out if the theinterval is null
                if(!analyser.theinterval){return;}

                analyser.core.getByteTimeDomainData(dataArray);

                //filling is rubbish, we just clear it
                //canvasCtx.fillStyle = 'rgb(200, 200, 200)';
                //canvasCtx.fillRect(0, 0, cwidth, cheight);
                canvasCtx.clearRect(0, 0, cwidth,cheight);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

                canvasCtx.beginPath();

                var sliceWidth = cwidth * 1.0 / bufferLength;
                var x = 0;

                //we check if we could capture sound here
                if(bufferLength > 0) {
                    var level = dataArray[bufferLength - 1];
                    if(level !=128){
                        that.sounddetected =true;
                    }
                }

                for (var i = 0; i < bufferLength; i++) {

                    var v = dataArray[i] / 128.0;
                    var y = v * cheight / 2;

                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                canvasCtx.lineTo(cwidth, cheight / 2);
                //draw a microphone
                canvasCtx.fillText('\uF130',cwidth/2,cheight/1.5);
                canvasCtx.stroke();

            };

            draw();
        }//END OF START
    };//end of returned object
});//total end
