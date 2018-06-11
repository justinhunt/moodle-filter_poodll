/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('Hermes (the messenger) initialising');

    //posts messages back to the parent frame.
    //if it is allowed then we are good. Right?

    return {

        allowedURL: '',
        id:  '',
        iframeembed: false,
        enabled: false,

        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },

        //init
        init: function (id,allowedURL,iframeembed) {
            //the id tag is passed in initially passed in as $config->id from poodlltools::fetchAMDRecorderCode
            //or from data-id in cloudpodll iframe. This allows the receiving code to know which recorder generated event
            this.allowedURL = allowedURL;
            this.id = id;
            this.iframeembed=iframeembed;
            this.enabled = true;
        },

        disable: function(){
            this.enabled = false;
        },

        enable: function(){
            this.enabled = true;
        },

      postMessage: function(messageObject) {
            if(!this.enabled){return;}

          if(!messageObject.hasOwnProperty('type')){
              log.debug('All message objects must have at least the "type" property');
              return;
          }
          if (this.iframeembed) {
             messageObject.id = this.id;
            window.parent.postMessage(messageObject, this.allowedURL);
          }
      }
    };//end of returned object
});//total end
