/* jshint ignore:start */
define(['jquery', 'core/log'], function ($, log) {

    "use strict"; // jshint ;_;

    log.debug('upskin_css_radial: initialising');

    return {
        element: null,
        percent: 0,
        progressradial: null,
        messagearea: null,


        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },

        //init
        init: function (config, element,  messagearea) {
            this.config = config;
            this.element = element;
          //  this.progressradial = radial.clone();
            this.messagearea = messagearea;
        },

        setDrawParam: function (paramkey, paramvalue) {
          //  this.progressradial.setDrawParam(paramkey, paramvalue);
        },

        initControls: function () {
            var self = this;
            var showpercent = true;

        },

        //create a progress bar
        initProgressSession: function (xhr) {
            var self = this;
            self.percent = 0;
            var uploadingmessage = M.util.get_string('recui_uploading', 'filter_poodll');
            // Handle event
            xhr.upload.addEventListener("progress", function (e) {
                if (e.lengthComputable) {
                    self.percent = e.loaded / e.total;
                    self.showMessage(Math.floor(self.percent * 100) + '%');
                }
            });
         //   this.progressradial.start();
        },

        deactivateProgressSession: function () {
          //  this.progressradial.stop();
            log.debug('deactivating session');
        },

        showMessage: function (msg, msgid) {
            switch (msgid) {
                //once and readaloud skins do not offer playback so we just skin this
                case 'recui_awaitingconversion':
                    break;
                default:
                    this.messagearea.html(msg);
            }
        }//End of show message
    };//end of returned object
});//total end
