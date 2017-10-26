/* jshint ignore:start */
define(['jquery',
    'core/log','filter_poodll/msr_stereoaudio','filter_poodll/msr_whammy','filter_poodll/msr_plain'],
    function($, log,stereoaudiorecorder, whammyrecorder, plainrecorder) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL MS Recorder: initialising');

    return {

        sampleRate: 44100,
        mimeType: 'audio/wav',
        audioChannels: 1,
        bufferSize: 2048,
        therecorder: null,

        //for making multiple instances
        clone: function(){
            return $.extend(true,{},this);
        },

        // init the poodll recorder
        // basically we check the users preferred recorders and if the rec supports the browser
        init: function(mediaStream,audioctx) {
            switch(true){
                case true:
                        this.therecorder=plainrecorder;
                        //this.therecorder=whammyrecorder;
                        //this.therecorder=stereoaudiorecorder;
                    break;
                case false:
                    break;
            }
            this.therecorder.init(this,mediaStream,audioctx);
        },

        start: function() {
            this.therecorder.start();
        },

        stop: function() {
            this.therecorder.stop();
        },

        resume: function() {
            this.therecorder.resume();
        },

        ondataavailable: function(blob) {
            log.debug('ondataavailable:' + blob);
        },

        onStartedDrawingNonBlankFrames: function() {
            log.debug('started drawing non blank frames:');
        },

        onstop: function(error) {
            log.debug(error);
        }
    };// end of returned object
});// total end
