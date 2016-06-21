/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/MediaStreamRecorder', 'filter_poodll/gumadapter', 'filter_poodll/uploader'], function($, log, msr, gum, uploader) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Media Recorder: initialising');

    return {
    
    	recorded_index: 0,
    	mediaRecorder: null,
    	blobs: [],
    	
    	// This recorder supports the current browser
        supports_current_browser: function() { 
        	 log.debug('PoodLL Media Recorder: supports this browser');
        	return true;//or false
        }, 
        
        // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) { 
            this.config = config;
            this.insert_controls(element);
            uploader.init(element,config);
            this.register_events();
        },
        
        insert_controls: function(element){
			var controls = ' <label for="time-interval">Time Interval (milliseconds):</label>';
			controls += ' <input type="text" id="time-interval" value="5000">ms';
			controls += '<br><select id="audio-mimeType" style="font-size:22px;vertical-align: middle;margin-right: 5px;">';
			controls += ' <option>audio/webm</option>';
			controls += ' <option>audio/wav</option>';
			controls += ' </select>';
			controls += '<button id="start-recording">Start</button>';
			controls += '<button id="stop-recording" disabled>Stop</button>';
			controls += '<button id="pause-recording" disabled>Pause</button>';
			controls += ' <button id="resume-recording" disabled>Resume</button>';
			controls += '<button id="save-recording" disabled>Save</button>';
			controls += '<br><br>';
			controls += '<input id="left-channel" type="checkbox" checked style="width:auto;">';
			controls += '<label for="left-channel">Only Left Channel?</label>';
			//controls
			controls += '<section class="experiment">';
            controls += '<div id="audios-container"></div>';
            controls += '</section>';
			
			$(element).prepend(controls);        
        },
        
        
       onMediaError: function(e) {
                console.error('media error', e);
        },
        
        captureUserMedia: function(mediaConstraints, successCallback, errorCallback) {
                navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
        },
        
        bytesToSize: function(bytes) {
                var k = 1000;
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes === 0) return '0 Bytes';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        
         // below function via: http://goo.gl/6QNDcI
        getTimeLength: function(milliseconds) {
                var data = new Date(milliseconds);
                return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
        },

        
        register_events: function(){
        	
            var mediaConstraints = {
                audio: true
            };
            //get a handle on  self class
            var self = this;
            
            
            
            var onMediaSuccess =function(stream) {

        		log.debug('onmediasuccess');
        		var timeInterval = $('#time-interval').text();
                if (timeInterval){ 
                	timeInterval = parseInt(timeInterval);
                }else{ 
                	timeInterval = 5 * 1000;
                }
                
                var mimetype = $('#audio-mimeType').val();
  
                // get blob after specific time interval
                self.mediaRecorder= new MediaStreamRecorder(stream);
                self.mediaRecorder.mimeType = mimetype;
                self.mediaRecorder.start(timeInterval);
                self.mediaRecorder.ondataavailable =  function(blob) {
        			self.blobs.push(blob);
            		log.debug('We got a blobby');
            		//log.debug(URL.createObjectURL(blob));
        			};
                
                $('#stop-recording').attr('disabled',false);
                $('#pause-recording').attr('disabled',false);
                $('#save-recording').attr('disabled',false);
                /*
                var audio = document.createElement('audio');
                audio = mergeProps(audio, {
                    controls: true,
                    muted: true,
                    src: URL.createObjectURL(stream)
                });
                audio.play();
  
                var audiosContainer = document.getElementById('audios-container');
				audiosContainer.appendChild(audio);
                audiosContainer.appendChild(document.createElement('hr'));
                self.mediaRecorder = new MediaStreamRecorder(stream);
                self.mediaRecorder.stream = stream;
                self.mediaRecorder.mimeType = document.getElementById('audio-mimeType').value;
                self.mediaRecorder.audioChannels = !!document.getElementById('left-channel').checked ? 1 : 2;
                self.mediaRecorder.ondataavailable = function(blob) {
                    var a = document.createElement('a');
                    a.target = '_blank';
                    a.innerHTML = 'Open Recorded Audio No. ' + (self.recorded_index++) + ' (Size: ' + self.bytesToSize(blob.size) + ') Time Length: ' + self.getTimeLength(timeInterval);
                    a.href = URL.createObjectURL(blob);
                    audiosContainer.appendChild(a);
                    audiosContainer.appendChild(document.createElement('hr'));
                };
                var timeInterval = $('#time-interval').text();
                if (timeInterval){ 
                	timeInterval = parseInt(timeInterval);
                }else{ 
                	timeInterval = 5 * 1000;
                }
                debugger;
                // get blob after specific time interval
                self.mediaRecorder.start(timeInterval);
                $('#stop-recording').attr('disabled',false);
                $('#pause-recording').attr('disabled',false);
                $('#save-recording').attr('disabled',false);
                */
            };
            
            $('#start-recording').click(function() {
                this.disabled = true;
                self.captureUserMedia(mediaConstraints, onMediaSuccess, self.onMediaError);
            });
            
            $('#stop-recording').click(function() {
                this.disabled = true;
                
                self.mediaRecorder.stop();
                //this throws an error, do we worry?
                //self.mediaRecorder.stream.stop();

                $('#pause-recording').attr('disabled',true);
                $('#start-recording').attr('disabled',false);
            });
            $('#pause-recording').click(function() {
                this.disabled = true;
                self.mediaRecorder.pause();
                $('#resume-recording').attr('disabled',false) ;
            });
            $('#resume-recording').click(function() {
                this.disabled = true;
                self.mediaRecorder.resume();
                $('#pause-recording').attr('disabled',false);
            });
            $('#save-recording').click(function() {
                this.disabled = true;
                
        debugger;
        	log.debug(self.blobs[0].type);
                ConcatenateBlobs(self.blobs, self.blobs[0].type, function(concatenatedBlob) {
					uploader.uploadBlob(concatenatedBlob,self.blobs[0].type);
				}); //end of concatenate blobs
self.mediaRecorder.save();
                //uploader.UploadFile(self.currentBlob);
                //self.mediaRecorder.save();
                // alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');
            });//end of save recording
            
            window.onbeforeunload = function() {
                $('#start-recording').attr('disabled',false);
            };
        }
    }//end of returned object
});//total end