/* jshint ignore:start */
define(['jquery',
    'core/log'],
    function($, log) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Stereo Audio Recorder Helper: initialising');

    return {

        // variables
        deviceSampleRate: 44100, // range: 22050 to 96000
        leftchannel: [],
        rightchannel: [],
        scriptprocessornode: null,
        recording:  false,
        recordingLength:  0,
        volume: null,
        audioInput: null,
        context: null,
        sampleRate: 0,
        mimeType: 0,
        isPCM: false,
        numChannels: 1,


        init: function(){

            if (!ObjectStore.AudioContextConstructor) {
                ObjectStore.AudioContextConstructor =audioctx;// new ObjectStore.AudioContext();
            }
            this.deviceSampleRate= ObjectStore.AudioContextConstructor.sampleRate;
            this.sampleRate = root.sampleRate || this.deviceSampleRate;
            this.mimeType= root.mimeType || 'audio/wav';
            this.isPCM= this.mimeType.indexOf('audio/pcm') > -1;
            this.numChannels= root.audioChannels || 2;


        },

        misc: function(){
            // creates the audio context
            var context = ObjectStore.AudioContextConstructor;

            // creates a gain node
            ObjectStore.VolumeGainNode = context.createGain();

            var volume = ObjectStore.VolumeGainNode;

            // creates an audio node from the microphone incoming stream
            ObjectStore.AudioInput = context.createMediaStreamSource(mediaStream);

            // creates an audio node from the microphone incoming stream
            var audioInput = ObjectStore.AudioInput;

            // connect the stream to the gain node
            audioInput.connect(volume);

            /* From the spec: This value controls how frequently the audioprocess event is
             dispatched and how many sample-frames need to be processed each call.
             Lower values for buffer size will result in a lower (better) latency.
             Higher values will be necessary to avoid audio breakup and glitches
             Legal values are 256, 512, 1024, 2048, 4096, 8192, and 16384.*/
            var bufferSize = root.bufferSize || 2048;
            if (root.bufferSize === 0) {
                bufferSize = 0;
            }

            if (context.createJavaScriptNode) {
                scriptprocessornode = context.createJavaScriptNode(bufferSize, numChannels, numChannels);
            } else if (context.createScriptProcessor) {
                scriptprocessornode = context.createScriptProcessor(bufferSize, numChannels, numChannels);
            } else {
                throw 'WebAudio API has no support on this browser.';
            }

            bufferSize = scriptprocessornode.bufferSize;

            console.debug('using audio buffer-size:', bufferSize);

            var requestDataInvoked = false;

            // sometimes "scriptprocessornode" disconnects from he destination-node
            // and there is no exception thrown in this case.
            // and obviously no further "ondataavailable" events will be emitted.
            // below global-scope variable is added to debug such unexpected but "rare" cases.
            window.scriptprocessornode = scriptprocessornode;

            if (numChannels === 1) {
                console.debug('All right-channels are skipped.');
            }

            var isPaused = false;

            //http://webaudio.github.io/web-audio-api/#the-scriptprocessornode-interface
            scriptprocessornode.onaudioprocess = function(e) {
                if (!recording || requestDataInvoked || isPaused) {
                    return;
                }

                var left = e.inputBuffer.getChannelData(0);
                leftchannel.push(new Float32Array(left));

                if (numChannels === 2) {
                    var right = e.inputBuffer.getChannelData(1);
                    rightchannel.push(new Float32Array(right));
                }
                recordingLength += bufferSize;
            };

            volume.connect(scriptprocessornode);
            scriptprocessornode.connect(context.destination);

        },

        record: function() {
            recording = true;
            // reset the buffers for the new recording
            leftchannel.length = rightchannel.length = 0;
            recordingLength = 0;
        },

        requestData:  function() {
            if (isPaused) {
                return;
            }

            if (recordingLength === 0) {
                requestDataInvoked = false;
                return;
            }

            requestDataInvoked = true;
            // clone stuff
            var internalLeftChannel = leftchannel.slice(0);
            var internalRightChannel = rightchannel.slice(0);
            var internalRecordingLength = recordingLength;

            // reset the buffers for the new recording
            leftchannel.length = rightchannel.length = [];
            recordingLength = 0;
            requestDataInvoked = false;

            // we flat the left and right channels down
            var leftBuffer = mergeBuffers(internalLeftChannel, internalRecordingLength);

            var interleaved = leftBuffer;

            // we interleave both channels together
            if (numChannels === 2) {
                var rightBuffer = mergeBuffers(internalRightChannel, internalRecordingLength); // bug fixed via #70,#71
                interleaved = interleave(leftBuffer, rightBuffer);
            }

            if (isPCM) {
                // our final binary blob
                var blob = new Blob([convertoFloat32ToInt16(interleaved)], {
                    type: 'audio/pcm'
                });

                console.debug('audio recorded blob size:', bytesToSize(blob.size));
                root.ondataavailable(blob);
                return;
            }

            // we create our wav file
            var buffer = new ArrayBuffer(44 + interleaved.length * 2);
            var view = new DataView(buffer);

            // RIFF chunk descriptor
            writeUTFBytes(view, 0, 'RIFF');

            // -8 (via #97)
            view.setUint32(4, 44 + interleaved.length * 2 - 8, true);

            writeUTFBytes(view, 8, 'WAVE');
            // FMT sub-chunk
            writeUTFBytes(view, 12, 'fmt ');
            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            // stereo (2 channels)
            view.setUint16(22, numChannels, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * numChannels * 2, true); // numChannels * 2 (via #71)
            view.setUint16(32, numChannels * 2, true);
            view.setUint16(34, 16, true);
            // data sub-chunk
            writeUTFBytes(view, 36, 'data');
            view.setUint32(40, interleaved.length * 2, true);

            // write the PCM samples
            var lng = interleaved.length;
            var index = 44;
            var volume = 1;
            for (var i = 0; i < lng; i++) {
                view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
                index += 2;
            }

            // our final binary blob
            var blob = new Blob([view], {
                type: 'audio/wav'
            });

            console.debug('audio recorded blob size:', bytesToSize(blob.size));

            root.ondataavailable(blob);
        },

        stop: function() {
            // we stop recording
            recording = false;
            this.requestData();

            audioInput.disconnect();
        },

        interleave: function(leftChannel, rightChannel) {
            var length = leftChannel.length + rightChannel.length;
            var result = new Float32Array(length);

            var inputIndex = 0;

            for (var index = 0; index < length;) {
                result[index++] = leftChannel[inputIndex];
                result[index++] = rightChannel[inputIndex];
                inputIndex++;
            }
            return result;
        },

        mergeBuffers: function(channelBuffer, recordingLength) {
            var result = new Float32Array(recordingLength);
            var offset = 0;
            var lng = channelBuffer.length;
            for (var i = 0; i < lng; i++) {
                var buffer = channelBuffer[i];
                result.set(buffer, offset);
                offset += buffer.length;
            }
            return result;
        },

        writeUTFBytes: function (view, offset, string) {
            var lng = string.length;
            for (var i = 0; i < lng; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        },

        convertoFloat32ToInt16: function (buffer) {
            var l = buffer.length;
            var buf = new Int16Array(l)

            while (l--) {
                buf[l] = buffer[l] * 0xFFFF; //convert to 16 bit
            }
            return buf.buffer
        },



        pause: function() {
            isPaused = true;
        },

        resume: function() {
            isPaused = false;
        }

    };// end of returned object
});// total end
