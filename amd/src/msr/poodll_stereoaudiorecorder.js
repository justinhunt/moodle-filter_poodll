/* jshint ignore:start */
define(['jquery',
    'core/log'],
    function($, log) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Recorder: initialising');

    return {

        // init the poodll recorder
        // basically we check the users preferred recorders and if the rec supports the browser
        init: function() {

        },

        start:  function(timeSlice,audioctx) {
            timeSlice = timeSlice || 1000;
            mediaRecorder = new StereoAudioRecorderHelper(mediaStream, this,audioctx);

            mediaRecorder.record();

            timeout = setInterval(function() {
                mediaRecorder.requestData();
            }, timeSlice);
        },

        stop:  function() {
            if (mediaRecorder) {
                mediaRecorder.stop();
                clearTimeout(timeout);
            }
        },
        pause: function() {
            if (!mediaRecorder) {
                return;
            }

            mediaRecorder.pause();
        },

        resume:  function() {
            if (!mediaRecorder) {
                return;
            }
            mediaRecorder.resume();
        },

        ondataavailable: function(blob) {
            log.debug('ondataavailable:' + blob);
        },

        onstop: function(error) {
            log.debug(error);
        }
    };// end of returned object
});// total end
