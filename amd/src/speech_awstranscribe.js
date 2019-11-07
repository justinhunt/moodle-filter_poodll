/* jshint ignore:start */
define(['jquery', 'core/log'], function ($, log) {

    "use strict"; // jshint ;_;

    log.debug('speech_awstranscribe: initialising');

    return {

        recognition: null,
        recognizing: false,
        ignore_onend: false,
        final_transcript: '',
        start_timestamp: 0,
        lang: 'en-US',


        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },

        init: function (lang) {
            var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.lang = lang ? lang : 'en-US';

            this.register_events();
        },

        set_grammar: function (grammar) {
            var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
            if (SpeechGrammarList) {
                var speechRecognitionList = new SpeechGrammarList();
                speechRecognitionList.addFromString(grammar, 1);
                this.recognition.grammars = speechRecognitionList;
            }
        },

        start: function () {
            if (this.recognizing) {
                return;
            }
            this.recognizing = true;
            this.final_transcript = '';
            this.recognition.lang = this.lang;//select_dialect.value;
            this.recognition.start();
            this.ignore_onend = false;
            this.start_timestamp = Date.now();//event.timeStamp;

        },
        stop: function () {
            // if (this.recognizing) {
            this.recognizing = false;
            this.recognition.stop();
            return;
            //}
        },

        register_events: function () {

            var recognition = this.recognition;
            var that = this;

            recognition.onstart = function () {
                that.recognizing = true;

            };
            recognition.onerror = function (event) {
                if (event.error == 'no-speech') {
                    log.debug('info_no_speech');
                    that.ignore_onend = true;
                }
                if (event.error == 'audio-capture') {
                    log.debug('info_no_microphone');
                    that.ignore_onend = true;
                }
                if (event.error == 'not-allowed') {
                    if (event.timeStamp - that.start_timestamp < 100) {
                        log.debug('info_blocked');
                    } else {
                        log.debug('info_denied');
                    }
                    that.ignore_onend = true;
                }
            };
            recognition.onend = function () {
                //that.recognizing = false;

                // we restart by default
                // we might need to be more clever here
                if (that.recognizing == false) {
                    return;
                }
                if (that.ignore_onend) {
                    that.recognizing = false;
                } else {
                    recognition.start();
                }

            };
            recognition.onresult = function (event) {
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        that.final_transcript += event.results[i][0].transcript;
                        that.onfinalspeechcapture(that.final_transcript);
                        that.final_transcript = '';
                    } else {
                        interim_transcript += event.results[i][0].transcript;
                        that.oninterimspeechcapture(interim_transcript);
                    }
                }


            };
        },//end of register events

        onfinalspeechcapture: function (speechtext) {
            log.debug(speechtext);
        },
        oninterimspeechcapture: function (speechtext) {
            // log.debug(speechtext);
        },

        //----------------AWS STUFF --------
        streamAudioToWebSocket: function (userMediaStream) {
            //let's get the mic input from the browser, via the microphone-stream module
            micStream = new mic();
            micStream.setStream(userMediaStream);

            // Pre-signed URLs are a way to authenticate a request (or WebSocket connection, in this case)
            // via Query Parameters. Learn more: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
            var url = createPresignedUrl();

            //open up our WebSocket connection
            socket = new WebSocket(url);
            socket.binaryType = "arraybuffer";

            // when we get audio data from the mic, send it to the WebSocket if possible
            socket.onopen = function() {
                micStream.on('data', function(rawAudioChunk) {
                        // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
                        var binary = convertAudioToBinaryMessage(rawAudioChunk);

                        if (socket.OPEN)
                            socket.send(binary);
                    }
                )};

            // handle messages, errors, and close events
            wireSocketEvents();
        },

        wireSocketEvents: function() {
        // handle inbound messages from Amazon Transcribe
        socket.onmessage = function (message) {
            //convert the binary event stream message to JSON
            var messageWrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));
            var messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body));
            if (messageWrapper.headers[":message-type"].value === "event") {
                handleEventStreamMessage(messageBody);
            }
            else {
                transcribeException = true;
                showError(messageBody.Message);
                toggleStartStop();
            }
        };

        socket.onerror = function () {
            socketError = true;
            showError('WebSocket connection error. Try again.');
            toggleStartStop();
        };

        socket.onclose = function (closeEvent) {
            micStream.stop();

            // the close event immediately follows the error event; only handle one.
            if (!socketError && !transcribeException) {
                if (closeEvent.code != 1000) {
                    showError('</i><strong>Streaming Exception</strong><br>' + closeEvent.reason);
                }
                toggleStartStop();
            }
        };
    },//END of wire sockets events


        handleEventStreamMessage: function (messageJson) {
            var results = messageJson.Transcript.Results;

            if (results.length > 0) {
                if (results[0].Alternatives.length > 0) {
                    var transcript = results[0].Alternatives[0].Transcript;

                    // fix encoding for accented characters
                    transcript = decodeURIComponent(escape(transcript));

                    // update the textarea with the latest result
                    $('#transcript').val(transcription + transcript + "\n");

                    // if this transcript segment is final, add it to the overall transcription
                    if (!results[0].IsPartial) {
                        //scroll the textarea down
                        $('#transcript').scrollTop($('#transcript')[0].scrollHeight);

                        transcription += transcript + "\n";
                    }
                }
            }
        },

        convertAudioToBinaryMessage: function(audioChunk) {
        var raw = mic.toRaw(audioChunk);

        if (raw == null)
            return;

        // downsample and convert the raw audio bytes to PCM
        var downsampledBuffer = audioUtils.downsampleBuffer(raw, sampleRate);
        var pcmEncodedBuffer = audioUtils.pcmEncode(downsampledBuffer);

        // add the right JSON headers and structure to the message
        var audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

        //convert the JSON object + headers into a binary event stream message
        var binary = eventStreamMarshaller.marshall(audioEventMessage);

        return binary;
    },

    getAudioEventMessage: function(buffer) {
        // wrap the audio data in a JSON envelope
        return {
            headers: {
                ':message-type': {
                    type: 'string',
                    value: 'event'
                },
                ':event-type': {
                    type: 'string',
                    value: 'AudioEvent'
                }
            },
            body: buffer
        };
    },

    createPresignedUrl: function() {
        var endpoint = "transcribestreaming." + region + ".amazonaws.com:8443";

        // get a preauthenticated URL that we can use to establish our WebSocket
        return v4.createPresignedURL(
            'GET',
            endpoint,
            '/stream-transcription-websocket',
            'transcribe',
            crypto.createHash('sha256').update('', 'utf8').digest('hex'), {
                'key': $('#access_id').val(),
                'secret': $('#secret_key').val(),
                'protocol': 'wss',
                'expires': 15,
                'region': region,
                'query': "language-code=" + languageCode + "&media-encoding=pcm&sample-rate=" + sampleRate
            }
        );
    },

    closeSocket: function() {
        if (socket.OPEN) {
            micStream.stop();

            // Send an empty frame so that Transcribe initiates a closure of the WebSocket after submitting all transcripts
            var emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
            var emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
            socket.send(emptyBuffer);
        }
    }


    };//end of returned object
});//total end
