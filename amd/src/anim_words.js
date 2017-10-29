/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/speech_poodll'], function($, log, speechrecognition) {

    "use strict"; // jshint ;_;

    log.debug('anim_words: initialising');

    return {

        analyser: null,
        cvs: null,
        cvsctx: null,
        speechrec: null,

        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },


        //init
        init: function (analyser, cvs) {
            this.cvs = cvs;
            this.cvsctx=cvs.getContext("2d");
            this.analyser = analyser;

            this.speechrec = speechrecognition.clone();
            this.speechrec.init('en-US');

        },

        clear: function(){
            this.cvsctx.clearRect(0, 0, this.cvs.width,this.cvs.height);
        },


        start: function(){

            this.analyser.core.fftSize = 2048;
            var bufferLength = this.analyser.core.fftSize;
            var dataArray = new Uint8Array(bufferLength);
            var cwidth = this.cvs.width;
            var cheight = this.cvs.height;
            var canvasCtx = this.cvsctx;
            var analyser = this.analyser;
            this.clear();
            var words = [];//['','..','..','..','','..','..',''];
            this.speechrec.oninterimspeechcapture = function(speechtext){
                var newwords= speechtext.split(' ');
                words = words.concat(newwords);
            };
            this.speechrec.start();

            var draw = function () {


                var drawVisual = requestAnimationFrame(draw);

                //cancel out if the theinterval is null
                if(!analyser.theinterval){return;}

                analyser.core.getByteTimeDomainData(dataArray);

                canvasCtx.fillStyle = 'rgb(200, 200, 200)';
                canvasCtx.fillRect(0, 0, cwidth, cheight);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

                canvasCtx.beginPath();

                var sliceWidth = cwidth * 1.0 / bufferLength;
                var x = 0;

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
                canvasCtx.stroke();

                //draw words
                canvasCtx.font = "14px Comic Sans MS";
                canvasCtx.fillStyle = "black";
                canvasCtx.textAlign = "center";
                var cellvcenter = cheight/4;
                var cellwidth=cwidth / 4;
                var cellhcenter = cwidth / 8;
                for (i=1; i<9;i++){
                    canvasCtx.fillText(words[words.length-i], (cellwidth * (i % 4)) + cellhcenter, i <5 ? cellvcenter : cellvcenter *3);
                }


            };

            draw();
        }//END OF START
    };//end of returned object
});//total end
