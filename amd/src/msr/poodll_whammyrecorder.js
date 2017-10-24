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

        start: function() {

        },

        stop: function() {

        },

        resume: function() {

        },

        ondataavailable: function(blob) {
            log.debug('ondataavailable:' + blob);
        },

        onstop: function(error) {
            log.debug(error);
        }
    };// end of returned object
});// total end
