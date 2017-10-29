/* jshint ignore:start */
define(['jquery','core/log','filter_poodll/utils_amd', 'filter_poodll/radialprogress',
    'filter_poodll/anim_hwave','filter_poodll/anim_fbars','filter_poodll/anim_ripple',
    'filter_poodll/anim_words','filter_poodll/speech_poodll'], function($, log, utils,radialprogress, hwave,fbars,ripple,words, speechrecognition) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Base Skin: initialising');

    return {
    
        instanceprops: null,
        pmr: null,

        //for making multiple instances
        clone: function(){
            return $.extend(true,{},this);
        },

        init: function(ip, pmr){
            this.instanceprops=ip;
            this.pmr=pmr;
        },


        fetch_instanceprops : function(){
            return this.instanceprops;
        },


        onUploadSuccess: function(controlbarid){
             $('#' + controlbarid + ' > .poodll_save-recording').hide();
            // $('#' + controlbarid  + '_messages').hide();
             $('#' + controlbarid + ' > .poodll_savedsuccessfully').show();
        },
        
        onUploadFailure: function(controlbarid){
            return;
        },		

        fetch_status_bar: function(skin){
            var status = '<div class="poodll_status_' + skin + '" width="320" height="50">00:00:00</div>';
            return status;
        },
        
        fetch_preview_audio: function(skin){
            var preview = '<audio class="poodll_preview_' + skin + ' hide" controls></audio>';
            return preview;
        },
        fetch_preview_video: function(skin){
            var preview ='<video class="poodll_preview_' + skin + '" width="320" height="240"></video>';
            return preview;
        },
        fetch_resource_audio: function(skin){
            var resourceplayer = '<audio class="poodll_resourceplayer_' + skin + ' hide" ></audio>';
            return resourceplayer;
        },
        fetch_resource_video: function(skin){
            var resourceplayer = '<video class="poodll_resourceplayer_' + skin + ' hide" ></video>';
            return resourceplayer;
        },
        
        onMediaError: function(e) {
                console.error('media error', e);
        },

        onMediaSuccess_video: function(controlbarid){
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.stopbutton.attr('disabled',false);
            ip.controlbar.pausebutton.attr('disabled',false);
            ip.controlbar.savebutton.attr('disabled',false);
        },

        onMediaSuccess_audio: function(controlbarid){
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.preview.attr('src',null);
            ip.controlbar.stopbutton.attr('disabled',false);
            ip.controlbar.pausebutton.attr('disabled',false);
            ip.controlbar.savebutton.attr('disabled',false);
        },

        handle_timer_update: function(controlbarid){
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.status.html(ip.timer.fetch_display_time());
            if(ip.timer.seconds==0 && ip.timer.initseconds >0){
                 ip.controlbar.stopbutton.click();
            }
        },

       update_status: function(controlbarid){
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.status.html(ip.timer.fetch_display_time());
        },

        //set visuals for different states (ie recording or playing)
        set_visual_mode: function(mode, controlbarid){
            var self = this;
            var ip = this.fetch_instanceprops(controlbarid);

           switch(mode){

               case 'recordmode':
                    ip.controlbar.preview.addClass('poodll_recording');
                    ip.controlbar.status.addClass('poodll_recording');
                    if(ip.config.mediatype=='audio'){
                        ip.controlbar.preview.addClass('hide');
                    }
                    ip.controlbar.status.removeClass('hide');
                    break;

               case 'previewmode':
                    ip.controlbar.preview.removeClass('poodll_recording');
                    ip.controlbar.status.removeClass('poodll_recording');
                    if(ip.config.mediatype=='audio'){
                        ip.controlbar.preview.removeClass('hide');
                    }
                    ip.controlbar.status.addClass('hide');
                    break;

               case 'pausedmode':
                    ip.controlbar.preview.removeClass('poodll_recording');
                    ip.controlbar.status.removeClass('poodll_recording');
                    break;
           }

       },

       //insert the control bar and return it to be reused
        insert_controlbar_video: function(element, controlbarid, preview, resource) {
            var controlbar = this.prepare_controlbar(element,controlbarid, preview, resource,'video');
        	return controlbar;
        },
        //insert the control bar and return it to be reused
        insert_controlbar_audio: function(element,controlbarid, preview, resource){
        	var controlbar = this.prepare_controlbar(element,controlbarid, preview, resource,'audio');
        	return controlbar;
        },
        
        //insert the control bar and return it to be reused
        prepare_controlbar: function(element,controlbarid, preview, resource, mediatype){
                var ip = this.fetch_instanceprops(controlbarid);
                var skin_style = ip.config.media_skin_style;

				var recorder_class = mediatype=='video' ?  'poodll_mediarecorder_video' : 'poodll_mediarecorder_audio';
				
				var size_class = 'poodll_mediarecorder_size_auto';
                switch(ip.config.size){
                	case 'small':
	                	size_class = 'poodll_mediarecorder_size_small';
                		break;
                	case 'big':
                		size_class = 'poodll_mediarecorder_size_big';
                		break;
                	case 'auto':
	                	size_class = 'poodll_mediarecorder_size_auto';		
                }

				var ss = this.pmr.fetch_strings();
				var hideshowupload = ip.showupload ? '' : 'hide';
                var controls ='<div class="poodll_mediarecorderholder_gold ' 
                	+ recorder_class + '" id="holder_' + controlbarid + '">' ;
                	
                controls +='<div class="poodll_mediarecorderbox_gold" id="' + controlbarid + '">' ;
                controls +='<div class="style-holder ' + skin_style + '">' ;
                var status = this.fetch_status_bar('gold');
                controls += status,
                controls += preview,
				controls += '<canvas id="' + controlbarid + '_playcanvas"> width="250" height="250"></canvas>';
                controls +=  '<button type="button" class="poodll_mediarecorder_button_gold poodll_start-recording_gold glen_class">' + ss['recui_record'] + '</button>';
                controls += '<button type="button" class="poodll_mediarecorder_button_gold poodll_stop-recording_gold pmr_disabled" disabled>' + ss['recui_stop'] + '</button>';
                //controls += '<button type="button" class="poodll_mediarecorder_button_gold poodll_pause-recording_gold pmr_disabled" disabled>' + ss['recui_pause'] + '</button>';
                //controls += ' <button type="button" class="poodll_mediarecorder_button_gold poodll_resume-recording_gold pmr_disabled hide" disabled>' + ss['recui_continue'] + '</button>';
                controls += ' <button type="button" class="poodll_mediarecorder_button_gold poodll_play-recording_gold pmr_disabled" disabled>' + ss['recui_play'] + '</button>';
                controls += '<button type="button" class="poodll_save-recording_gold pmr_disabled ' + hideshowupload + '" disabled>' + ss['recui_save'] + '</button>';
                controls += '</div></div></div>';
                $(element).prepend(controls);
                var controlbar ={
                    status: $('#' + controlbarid + ' .poodll_status_gold'),
                    preview: $('#' + controlbarid + ' .poodll_preview_gold'),
                    startbutton: $('#' + controlbarid + ' .poodll_start-recording_gold'),
                    stopbutton: $('#' + controlbarid + ' .poodll_stop-recording_gold'),
                    pausebutton: $('#' + controlbarid + ' .poodll_pause-recording_gold'),
                    resumebutton: $('#' + controlbarid + ' .poodll_resume-recording_gold'),
                    playbutton: $('#' + controlbarid + ' .poodll_play-recording_gold'),
                    savebutton: $('#' + controlbarid + ' .poodll_save-recording_gold'),
                    playcanvas: $('#' + controlbarid + '_playcanvas')    
                };
                return controlbar;
        }, //end of fetch_control_bar_gold


        register_controlbar_events_video: function(onMediaSuccess, controlbarid) {
            return this.register_controlbar_events_audio(onMediaSuccess,controlbarid);
        },

        register_controlbar_events_audio: function(onMediaSuccess,controlbarid){
            var self = this;
            var pmr=this.pmr;
            var ip = this.fetch_instanceprops(controlbarid);

            //init radial progress
            var rprogress = radialprogress.clone();
            rprogress.init(ip.controlbar.playcanvas);

            //init recording anim
            var recanim=ripple;
            switch(ip.config.recanim) {
                case 'hwave': recanim=hwave.clone();break;
                case 'fbars': recanim=fbars.clone();break;
                case 'ripple': recanim=ripple.clone();break;
                case 'words': recanim=words.clone();break;
            }
            log.debug('recanim=' + ip.config.recanim);
            recanim.init(ip.audioanalyser,ip.controlbar.playcanvas.get(0));

            //init speech recognition
           // var speechrec = speechrecognition.clone();
           // speechrec.init('en-US');


            ip.controlbar.startbutton.click(function() {
                pmr.do_start_audio(ip,  onMediaSuccess);

                //clear messages
                $('#' + ip.config.widgetid  + '_messages').text('');
                self.disable_button(this);
                self.disable_button(ip.controlbar.playbutton);
                //ip.controlbar.resumebutton.hide();
                self.enable_button(ip.controlbar.stopbutton);
                self.disable_button(ip.controlbar.savebutton);
                //ip.controlbar.pausebutton.show();
                self.enable_button(ip.controlbar.pausebutton);
                self.set_visual_mode('recordmode',controlbarid);

                //wave animation
                recanim.start();

                //speech recognition
               // speechrec.start();
                
                //timer and status bar
                ip.timer.reset();
                ip.timer.start();
                self.update_status(controlbarid);
            });
            
            ip.controlbar.stopbutton.click(function() {

                pmr.do_stop_audio(ip);

                //wave animation
                recanim.clear();

                //speech rec
             //   speechrec.stop();

				/*
                self.disable_button(this);
                 var preview = ip.controlbar.preview;
                if(preview && preview.get(0)){
                    preview.get(0).pause();
                }
                */
               //turn border black etc
             //  self.set_visual_mode('previewmode',controlbarid);
               //timer and status bar
               ip.timer.stop()
               self.update_status(controlbarid);
                
               self.enable_button(ip.controlbar.playbutton);
              // self.enable_button(ip.controlbar.savebutton);
             //  self.disable_button(ip.controlbar.pausebutton);
			if(!ip.uploaded){
			self.enable_button(ip.controlbar.startbutton);
			} 
               ip.controlbar.resumebutton.hide();
               //ip.controlbar.pausebutton.show();
			   ip.controlbar.playbutton.show();
            });
			
            ip.controlbar.playbutton.click(function() {
                self.disable_button(this);
                var preview = ip.controlbar.preview.get(0);
                pmr.do_play_audio(ip,preview);
                //self.enable_button(ip.controlbar.stopbutton);
                //self.disable_button(ip.controlbar.startbutton);
                self.enable_button(ip.controlbar.savebutton);
                rprogress.clear();
                rprogress.fetchCurrent=function(){
                    var ct = ip.controlbar.preview.prop('currentTime');
                    var duration = ip.timer.finalseconds;
                    return ct/duration;
                };
                rprogress.start();
            });
            
           ip.controlbar.savebutton.click(function() {
              self.disable_button(this);
              if(ip.blobs && ip.blobs.length > 0){
                  pmr.do_save_audio(ip);
                  ip.uploaded = true;
                  self.disable_button(ip.controlbar.startbutton);
                }else{
                    ip.uploader.Output(M.util.get_string('recui_nothingtosaveerror','filter_poodll'));
                }//end of if self.blobs		
                //probably not necessary  ... but getting odd ajax errors occasionally
                return false;
            });//end of save recording
            /*
            ip.controlbar.preview.on("timeupdate", function() {
				// Variables
				var currentTime = this.currentTime;
				var duration = this.duration;
				if(duration==0 || true){duration = ip.timer.finalseconds;}
				var current_time = currentTime/duration;
				rprogress.setProgress(current_time);
			});
			*/
            
            window.onbeforeunload = function() {
                self.enable_button(ip.controlbar.startbutton);
                var preview = ip.controlbar.preview;
                if(preview && preview.get(0)){
                    preview.get(0).pause();
                }
            };
        }, //end of register_control_bar_events_gold

        enable_button: function(button){
            $(button).attr('disabled',false);
            $(button).removeClass('pmr_disabled');
        },
        disable_button: function(button){
            $(button).attr('disabled',true);
            $(button).addClass('pmr_disabled');
        },

    };//end of returned object
});//total end
