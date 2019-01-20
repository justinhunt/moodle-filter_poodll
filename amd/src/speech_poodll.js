/* jshint ignore:start */
define(['jquery','core/log','filter_poodll/speech_browser'], function($, log,browserrecognition) {

    "use strict"; // jshint ;_;

    log.debug('speech_poodll: initialising');

    return {

        recognizer: null,


    //for making multiple instances
        clone: function(){
            return $.extend(true,{},this);
        },

        supports_browser: function(){
            return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        },

        init: function(lang){
            //in future we would like to have multiple recognizers presenting a single interface
            if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
                this.recognizer=browserrecognition.clone();
                this.recognizer.init(lang);
            }else{
                log.debug('no usable speech recognizer found');
            }
        },

        set_grammar: function(grammar){
            this.recognizer.set_grammar(grammar);
        },

        start: function(){
            if(!this.recognizer){return;}
            this.recognizer.onfinalspeechcapture = this.onfinalspeechcapture;
            this.recognizer.oninterimspeechcapture = this.oninterimspeechcapture;
            if (this.recognizer) {
                this.recognizer.start();
            }
        },
        stop: function(){
            if(!this.recognizer){return;}
            if (this.recognizer) {
                this.recognizer.stop();
            }
        },

        onfinalspeechcapture: function(speechtext){
            if(!this.recognizer){return;}
            log.debug('final:' + speechtext);
        },
        oninterimspeechcapture: function(speechtext){
            if(!this.recognizer){return;}
            log.debug('interim:' + speechtext);
        }
    };//end of returned object
});//total end
