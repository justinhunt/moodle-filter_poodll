/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/MediaStreamRecorder', 'filter_poodll/gumadapter', 'filter_poodll/uploader'], function($, log, msr, gum, uploader) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Media Recorder: initialising');

    return {
    
    	recorded_index: 0,
    	mediaRecorder: null,
    	blobs: [],
        controlbarid: '',
        timeinterval: 5000,
        audiomimetype: 'audio/webm',
        videorecordertype: 'auto',//mediarec or webp
        videocapturewidth: 320,
        videocaptureheight: 240,
        controlbar: '',
        previewvolume: 1,
    	
    	// This recorder supports the current browser
        supports_current_browser: function() { 	 
        	 if(navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        	 	log.debug('PoodLL Media Recorder: supports this browser');
        		return true;
        	}else{
        		return false;
        	}
        }, 
        
        // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) { 
            this.config = config;
            this.timeinterval = config.media_timeinterval;
            this.audiomimetype = config.media_audiomimetype;
			this.videorecordertype = config.media_videorecordertype;
			this.videocapturewidth = config.media_videocapturewidth;
			this.videocaptureheight = config.media_videocaptureheight;
            var controlbarid = "filter_poodll_controlbar_" + config.widgetid; 
            switch(config.mediatype){
                case 'audio':
                    var preview = this.fetch_audio_preview();
                    this.controlbar = this.insert_fetch_control_bar(element,controlbarid, preview);
                    uploader.init(element,config);
                    this.register_audio_events();
                    break;
                case 'video':
                     var preview = this.fetch_video_preview();
                    this.controlbar = this.insert_fetch_control_bar(element,controlbarid,preview);
                    uploader.init(element,config);
                    this.register_video_events();
                    break;
                   
            }
        },
        
        //insert the control bar and return it to be reused
        insert_fetch_control_bar: function(element,controlbarid, preview){
            	var controls ='<div class="poodll_mediarecorderbox" id="' + controlbarid + '">' ;
                controls += preview,
                controls +=  '<button class="poodll_start-recording">Start</button>';
                controls += '<button class="poodll_stop-recording" disabled>Stop</button>';
                controls += '<button class="poodll_pause-recording" disabled>Pause</button>';
                controls += ' <button class="poodll_resume-recording hide" disabled>Resume</button>';
                controls += ' <button class="poodll_play-recording" disabled>Play</button>';
                controls += '<button class="poodll_save-recording" disabled>Save</button>';
                controls += '</div>';
                $(element).prepend(controls);
                var controlbar ={
                    preview: $('#' + controlbarid + ' > .poodll_preview'),
                    startbutton: $('#' + controlbarid + ' > .poodll_start-recording'),
                    stopbutton: $('#' + controlbarid + ' > .poodll_stop-recording'),
                    pausebutton: $('#' + controlbarid + ' > .poodll_pause-recording'),
                    resumebutton: $('#' + controlbarid + ' > .poodll_resume-recording'),
                    playbutton: $('#' + controlbarid + ' > .poodll_play-recording'),
                    savebutton: $('#' + controlbarid + ' > .poodll_save-recording')    
                };
                return controlbar;
        },
        
        fetch_audio_preview: function(){
            var preview ='<audio class="poodll_preview" controls></audio>';
            return preview;
        },
        fetch_video_preview: function(){
            var preview ='<video class="poodll_preview" width="320" height="240"></video>';
            return preview;
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

        register_controlbar_events: function(onMediaSuccess, mediaConstraints){
            var self = this;
            
             this.controlbar.startbutton.click(function() {
                this.disabled = true;
                self.blobs=[]; 
                log.debug("cleared blobs");
                self.captureUserMedia(mediaConstraints, onMediaSuccess, self.onMediaError);          
                self.controlbar.playbutton.attr('disabled',true);
                self.controlbar.resumebutton.hide();
                self.controlbar.pausebutton.show();
                self.controlbar.pausebutton.attr('disabled',false);
            });
            
            this.controlbar.stopbutton.click(function() {
                this.disabled = true;
                
                self.mediaRecorder.stop();
                //this throws an error, do we worry?
                //self.mediaRecorder.stream.stop();
                
                 var preview = self.controlbar.preview;
                if(preview && preview.get(0)){
                    preview.get(0).pause();
                }
                
                
               self.controlbar.playbutton.attr('disabled',false);
               self.controlbar.pausebutton.attr('disabled',true);
               self.controlbar.startbutton.attr('disabled',false);
               self.controlbar.resumebutton.hide();
               self.controlbar.pausebutton.show();
            });
          
            this.controlbar.pausebutton.click(function() {
                this.disabled = true;
                $(this).hide();
                self.controlbar.resumebutton.show();
                self.mediaRecorder.resume();
                self.mediaRecorder.pause();
                self.controlbar.resumebutton.attr('disabled',false) ;
            });
            
            this.controlbar.resumebutton.click(function() {
                this.disabled = true;
                $(this).hide();
                self.controlbar.pausebutton.show();
                self.mediaRecorder.resume();
                self.controlbar.pausebutton.attr('disabled',false);
            });
            
            this.controlbar.playbutton.click(function() {
                this.disabled = true;
                var preview = self.controlbar.preview.get(0);
                if(self.blobs && self.blobs.length > 0){
                    ConcatenateBlobs(self.blobs, self.blobs[0].type, function(concatenatedBlob) {
                             var mediaurl = URL.createObjectURL(concatenatedBlob);
                             preview.src= mediaurl;
                             preview.controls =true;
                             preview.volume = self.previewvolume;
                             preview.play();
                    }); //end of concatenate blobs
                }        
                self.controlbar.stopbutton.attr('disabled',false);
                self.controlbar.startbutton.attr('disabled',true);
            });
            
           this.controlbar.savebutton.click(function() {
                this.disabled = true;
              if(self.blobs && self.blobs.length > 0){
                    ConcatenateBlobs(self.blobs, self.blobs[0].type, function(concatenatedBlob) {
                            uploader.uploadBlob(concatenatedBlob,self.blobs[0].type);
                    }); //end of concatenate blobs
                }else{
                    uploader.Output('No sound was captured. Sorry .. nothing to save.');
                }//end of if self.blobs		
               //
		//download the file right away .. useful when debugging
		//self.mediaRecorder.save();
            
            });//end of save recording
            
            window.onbeforeunload = function() {
                self.controlbar.startbutton.attr('disabled',false);
                var preview = self.controlbar.preview;
                if(preview && preview.get(0)){
                    preview.get(0).pause();
                }
            };
        },
        
        register_audio_events: function(){
        	
            var mediaConstraints = {
                audio: true
            };
            //get a handle on  self class
            var self = this;
            
            
            
            var onMediaSuccess =function(stream) {

        	log.debug('onmediasuccess');

                // get blob after specific time interval
                self.mediaRecorder= new MediaStreamRecorder(stream);
               // self.controlbar.preview.attr('src',URL.createObjectURL(stream));
                self.mediaRecorder.mimeType = self.audiomimetype;
                self.mediaRecorder.audioChannels = 1;
                self.mediaRecorder.start(self.timeInterval);
                self.mediaRecorder.ondataavailable =  function(blob) {
        			self.blobs.push(blob);
        			};
                self.controlbar.preview.attr('src',null);               
                self.controlbar.stopbutton.attr('disabled',false);
                self.controlbar.pausebutton.attr('disabled',false);
                self.controlbar.savebutton.attr('disabled',false);
            };
            
            this.register_controlbar_events(onMediaSuccess, mediaConstraints);
          
        },//end of register audio events
        
        
        register_video_events: function(){
        	
            var mediaConstraints = {
                audio: !IsOpera && !IsEdge,
                video: true
            };
            //get a handle on  self class
            var self = this;
            
            var onMediaSuccess =function(stream) {
                log.debug('onmediasuccess');

                //create recorder
                self.mediaRecorder= new MediaStreamRecorder(stream);
                //create preview
               // self.controlbar.preview.attr('src',stream.url);
                self.controlbar.preview.attr('src',window.URL.createObjectURL(stream));
                self.controlbar.preview.attr('controls',false);
                self.controlbar.preview.get(0).volume=0;
                self.controlbar.preview.get(0).play();
              
                //set recorder type
                if (self.videorecordertype === 'mediarec') {
                    self.mediaRecorder.recorderType = MediaRecorderWrapper;
                }
                if (self.videorecordertype === 'webp') {
                    self.mediaRecorder.recorderType = WhammyRecorder;
                }
                
                //set capture size
                self.mediaRecorder.videoWidth = self.videocapturewidth;
                self.mediaRecorder.videoHeight = self.videocaptureheight;
                
                //staert recording
                self.mediaRecorder.start(self.timeInterval);
                self.mediaRecorder.ondataavailable =  function(blob) {
                    self.blobs.push(blob);
            		//log.debug('We got a blobby');
            		//log.debug(URL.createObjectURL(blob));
        		};
                
                self.controlbar.stopbutton.attr('disabled',false);
                self.controlbar.pausebutton.attr('disabled',false);
                self.controlbar.savebutton.attr('disabled',false);
              
            };
            
             this.register_controlbar_events(onMediaSuccess, mediaConstraints);
        }//end of register video events
        
        
        
    };//end of returned object
});//total end