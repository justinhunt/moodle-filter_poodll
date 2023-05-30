/* jshint ignore:start */
define(['jquery', 'core/log'], function ($, log) {

    "use strict"; // jshint ;_;

    log.debug('Polly Helper: initialising');

    return {
        sentenceURLs: [],
        sentencetexts: [],
        wordstarts: [],
        wordcounts: [],
        textblock: false,
        textstring: false,
        wordselector: '',
        sentenceselector: '',
        passagecssclass: 'filterpoodll_pollytextblock_cont',
        cloudpoodlltoken: '',
        voice: '',
        highlightmode: '',
        theplayer: false,
        pendingurls: 0,

        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },

        reset: function(){
            this.unspanify_text_passage();
            this.textblock = false;
            this.textstring = false;
            this.sentenceURLs= [];
            this.sentencetexts= [];
            this.wordstarts= [];
            this.wordcounts= [];
        },

        set_textblock: function(textblock){
            var that = this;

            //if we are already set to this textblock, then do nothing
            if(textblock===this.textblock){
                log.debug('it was the same textblock');
                return;
            }
            //remove the previous spans if we had them
            if(this.textblock!==false) {
                    this.reset();
            }
            //set our new textblock
            this.textblock= textblock;
            var usetext = textblock.text();

            // Break text into sentences, and fetch data + TTS URL for each sentence.
            this.spanify_text_passage();
            this.sentencetexts = this.get_sentences_from_spanified_text();
            this.pendingurls=this.sentencetexts.length;
            var previousend = 0;

            for (var currentsentence = 0; currentsentence < this.sentencetexts.length; currentsentence++){
                this.wordstarts[currentsentence]= previousend;
                this.wordcounts[currentsentence]= this.split_into_words(this.sentencetexts[currentsentence]).length;
                previousend = previousend + this.wordcounts[currentsentence];

                var speaktext = this.sentencetexts[currentsentence];
                this.fetch_polly_url(speaktext,
                    function(sentenceindex) {
                        return function(pollyurl) {
                            that.sentenceURLs[sentenceindex] = pollyurl;
                            log.debug(sentenceindex + ' ' + pollyurl);
                            that.pendingurls--;
                        }
                    }(currentsentence)
                );
            }
        },

        set_text: function(textstring){
            var that = this;
            //if we already have this one, return
            if(textstring===this.textstring) {
                log.debug('it was the same textstring');
                return;
            }
            //remove the previous spans if we had them
            if(this.textblock!==false) {
                this.reset();
            }

            //remember this for next time
            this.textstring= textstring;
            this.sentencetexts[0]=textstring;
            this.pendingurls=1;
            this.fetch_polly_url(textstring,
                function(pollyurl){
                    that.sentenceURLs[0] = pollyurl;
                    log.debug('0' + ' ' + pollyurl);
                    that.pendingurls--;
                }
            );

        },

        init: function (theplayer,itemid, textblock, voice,sentenceselector,wordselector,passagecssclass,highlightmode, cloudpoodlltoken) {
            var that = this;
            this.sentenceselector= sentenceselector;
            this.wordselector= wordselector;
            this.passagecssclass= passagecssclass;
            this.cloudpoodlltoken = cloudpoodlltoken;
            this.highlightmode=highlightmode;
            this.voice = voice;
            this.theplayer = theplayer;

            this.set_textblock(textblock);

        },

        // FUNCTION: Split a text passage into sentences.
        split_into_sentences: function(thetext){
            thetext = thetext.replace(/\s+/g,' ').trim();
            if(thetext ===''){return[];}
            return thetext.match(/([^\.!\?]+[\.!\?"']+)|([^\.!\?"']+$)/g);
        },

        // FUNCTION: Split a text passage into words.
        split_into_words: function(thetext){
            thetext = thetext.replace(/\s+/g,' ').trim();
            if(thetext===''){return[];}
            return thetext.split(' ');
        },

        // FUNCTION: Fetch polly url.
        fetch_polly_url: function (speaktext, callback) {

            // The REST API we are calling.
            var functionname = 'local_cpapi_fetch_polly_url';

            // Fetch the Posturl. We need this.
            // Set up our ajax request
            var xhr = new XMLHttpRequest();
            var that = this;

            // Set up our handler for the response.
            xhr.onreadystatechange = function (e) {
                if (this.readyState === 4) {
                    if (xhr.status === 200) {

                        // Get a yes or forgetit or tryagain.
                        var payload = xhr.responseText;
                        var payloadobject = JSON.parse(payload);
                        if (payloadobject) {
                            // ReturnCode > 0  indicates an error.
                            if (payloadobject.returnCode > 0) {
                                console.log(payloadobject.returnMessage);
                                return false;
                                // If all good, then lets do the embed.
                            } else if (payloadobject.returnCode === 0){
                                var pollyurl = payloadobject.returnMessage;
                                callback(pollyurl);
                            } else {
                                console.log('Polly Signed URL Request failed:');
                                console.log(payloadobject);
                            }
                        } else {
                            console.log('Polly Signed URL Request something bad happened');
                        }
                    } else {
                        console.log('Polly Signed URL Request Not 200 response:' + xhr.status);
                    }
                }
            };

            // Make our request.
            var xhrparams = "wstoken=" + this.cloudpoodlltoken
                    + "&wsfunction=" + functionname
                    + "&moodlewsrestformat=" + 'json'
                    + "&text=" + encodeURIComponent(speaktext)
                    + '&texttype=text'
                    + '&voice=' + this.voice
                    + '&appid=' + 'filter_poodll'
                    + '&owner=poodll'
                    + '&region=useast1';

            var serverurl = 'https://cloud.poodll.com' + "/webservice/rest/server.php";
            xhr.open("POST", serverurl, true);
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(xhrparams);
        },

        // Is not used.
        // FUNCTION: Determine if the string is text or HTML.
        isHTML: function (testString) {
            var htmlRegex = new RegExp("<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)</\\1>");
            return htmlRegex.test(testString);
        },

        unspanify_text_passage: function(){

            //remove select to read class to container
            this.textblock.removeClass(this.passagecssclass);

           // remove previously set up spans
            if(this.highlightmode==='word'){
                this.textblock.find('.tbr_word').contents().unwrap();
            } else {
            // For sentences.
                this.textblock.find('.tbr_sentence').contents().unwrap();
            }// End of for loop.
        },

        // FUNCTION: Break a text passage into words/sentences, and surround the words with marker tags.
        spanify_text_passage: function(){
            var that = this;

            // The itemcount er.
            var itemcount = -1;

            //add select to read class to container
            this.textblock.addClass(this.passagecssclass);

            // Get all the text nodes in the textblock.
            var textnodes = this.textblock.find('*').contents().filter(function(){ return this.nodeType === 3; });
            // Wrap sentence or words in text block with spans.
            textnodes.each(function(){
                var retpieces = '';
                if(that.highlightmode==='word'){
                    //for words
                    var thewords = that.split_into_words($(this).text());
                    for (var theword = 0; theword < thewords.length; theword++){
                        itemcount++;
                        retpieces =  retpieces + '<span class="tbr_word" data-wordindex="'+ itemcount +'">' + thewords[theword] + '</span> ';
                    }// End of for loop.
                } else {
                    // For sentences.
                    var thesentences = that.split_into_sentences($(this).text());
                    for (var thesentence=0; thesentence < thesentences.length; thesentence++){
                        itemcount++;
                        retpieces =  retpieces + '<span class="tbr_sentence" data-sentenceindex="'+ itemcount +'">' + thesentences[thesentence] + '</span>&nbsp;';
                    }// End of for loop.
                }
                $(this).replaceWith(retpieces);
            });// End of textnodes each
        },

        get_sentences_from_spanified_text: function(){
            var sentences = [];
            var spans = this.textblock.find('span.tbr_sentence');
            spans.each(function(){
                sentences.push($(this).text());
            });
            return sentences
        },

        // FUNCTION: Unhighlight a sentence as active.
        dehighlight_all: function(){
            switch(this.highlightmode){
                case 'word':
                    $(this.wordselector,this.textblock).removeClass('activesentence');
                    break;
                case 'sentence':
                    $(this.sentenceselector).removeClass('activesentence');
                    break;
                case 'none':
                default:
                // Do nothing.
            }
        },

        // FUNCTION: Highlight a sentence as active.
        highlight_sentence: function(thesentence_index){
            switch(this.highlightmode){
                case 'word':
                    $(this.wordselector,this.textblock).removeClass('activesentence');
                    $(this.wordselector,this.textblock).slice(this.wordstarts[thesentence_index],
                            this.wordstarts[thesentence_index] +
                            this.wordcounts[thesentence_index]).addClass('activesentence');
                    break;
                case 'sentence':
                    $(this.sentenceselector).removeClass('activesentence');
                    $(this.sentenceselector + '[data-sentenceindex=' + thesentence_index + ']').addClass('activesentence');
                    break;
                case 'none':
                default:
                // Do nothing.
            }
        },

        // FUNCTION: Play a single sentence and mark it active for display purposes.
        doplayaudio: function(thesentence) {
            var that=this;
            if(this.pendingurls>0){
                setTimeout(function(){that.doplayaudio(thesentence);},100);
                return;
            }
            if (typeof thesentence === 'number') {
                // If thesentence is a number.
                this.dehighlight_all();
                this.highlight_sentence(thesentence);
                this.theplayer.attr('src', this.sentenceURLs[thesentence]);
            //    log.debug('sentenceurl:' + this.sentenceURLs[thesentence]);
            //    log.debug('sentencenumber:' + thesentence);
            //    log.debug('sentencetext:' + this.sentencetexts[thesentence]);
            } else {
                if(this.sentenceURLs.length > 0) {
                    this.theplayer.attr('src', this.sentenceURLs[0]);
                }
            }
            this.theplayer[0].load();
            this.theplayer[0].play();
        }
    }
});