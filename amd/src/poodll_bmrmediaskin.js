/* jshint ignore:start */
define(['jquery','jqueryui','core/log','filter_poodll/utils_amd','filter_poodll/dlg_devicesettings','filter_poodll/anim_progress_bar'], function($,jqui, log, utils,settings,anim_progress_bar) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Base Skin: initialising');


	
    return {
    
        instanceprops: null,
        pmr: null,
        uploaded: false,
        devsettings: null,

        //for making multiple instances
        clone: function(){
            return $.extend(true,{},this);
        },

        init: function(ip, pmr){
			this.instanceprops=ip;
            this.pmr=pmr;
            this.devsettings=settings.clone();
            this.devsettings.init(pmr,ip);
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
           // var status = '<div class="poodll_status_' + skin + '" width="320" height="50">00:00:00</div>';
            var status = '<div class="poodll_status_' + skin + '">00:00:00</div>';
            return status;
        },
        
        fetch_preview_audio: function(skin){
            var preview = '<audio class="poodll_preview_' + skin + ' hide" controls></audio>';
            return preview;
        },
        fetch_preview_video: function(skin){
            var preview ='<video class="poodll_preview_' + skin + '"></video>';
            return preview;
        },
        fetch_resource_audio: function(skin){
            var resourceplayer = '';
            return resourceplayer;
        },
        fetch_resource_video: function(skin){
            var resourceplayer = '';
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
                   // ip.controlbar.status.addClass('hide');
					//ip.controlbar.bmr_progresscanvas.removeClass('hide');
					self.enable_button(ip.controlbar.playbutton);
					ip.controlbar.status.empty();
					
					
					ip.controlbar.preview.on('timeupdate', function(){	
						var currentTime = this.currentTime;
						ip.controlbar.status.html(ip.timer.fetch_display_time(currentTime));	
					});
                    break;

               case 'pausedmode':
                    ip.controlbar.preview.removeClass('poodll_recording');
                    ip.controlbar.status.removeClass('poodll_recording');
                    break;
           }

       },

        //insert the control bar and return it to be reused
        insert_controlbar_video: function(element, controlbarid, preview, resource) {
            var controlbar = this.prepare_controlbar(element,controlbarid, preview,resource,'video');
        	return controlbar;
        },
        
        //insert the control bar and return it to be reused
        insert_controlbar_audio: function(element,controlbarid, preview, resource){
        	var controlbar = this.prepare_controlbar(element,controlbarid, preview,resource,'audio');
        	return controlbar;
        },
        
        //insert the control bar and return it to be reused
        prepare_controlbar: function(element,controlbarid, preview,resource, mediatype){
                var ip = this.fetch_instanceprops(controlbarid);
                var skin_style = ip.config.media_skin_style;
                
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
                var record_icon = mediatype=='video' ?  'fa-video-camera' : 'fa-microphone';
				var recorder_class = mediatype=='video' ?  'poodll_mediarecorder_video' : 'poodll_mediarecorder_audio';

                var controls ='<div class="poodll_mediarecorderholder_bmr poodll_videorecorderholder_bmr ' 
                	+ recorder_class + ' ' + size_class + '" id="holder_' + controlbarid + '">' ;
                	
                controls +='<div class="poodll_mediarecorderbox_bmr" id="' + controlbarid + '">' ;
                controls +='<div class="style-holder ' + skin_style + '">' ;
                var status = this.fetch_status_bar('bmr');
                controls += status,
                controls += preview,
				controls += '<div class="bmr_slide" id="slide_'+controlbarid+'">';
				controls += '<div class="bmr_timer"></div><canvas class="bmr_range"></canvas></div>';
				controls += '<div class="settingsicon" id="settingsicon_'+controlbarid+'"><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"><i class="fa fa-cogs" aria-hidden="true"></i></button></div>';
                controls +=  '<button type="button" class="poodll_mediarecorder_button_bmr poodll_start-recording_bmr"><i class="fa ' + record_icon + '" aria-hidden="true"></i></button>';
                controls += ' <button type="button" class="poodll_mediarecorder_button_bmr poodll_resume-recording_bmr bmr_disabled hide" disabled><i class="fa ' + record_icon + '" aria-hidden="true"></i></button>';
                controls += '<button type="button" class="poodll_mediarecorder_button_bmr poodll_stop-recording_bmr bmr_disabled" disabled><i class="fa fa-stop" aria-hidden="true"></i></button>';
                controls += '<button type="button" class="poodll_mediarecorder_button_bmr poodll_pause-recording_bmr bmr_disabled" disabled><i class="fa fa-pause" aria-hidden="true"></i></button>';
                controls += ' <button type="button" class="poodll_mediarecorder_button_bmr poodll_play-recording_bmr bmr_disabled" disabled><i class="fa fa-play" aria-hidden="true"></i></button>';
                controls += '<button type="button" class="poodll_save-recording_bmr ' + hideshowupload + '" disabled>' + ss['recui_save'] +'</button>';
						controls += '</div>';
						controls += this.devsettings.fetch_dialogue_box();
                        controls += ip.errordialog.fetch_dialogue_box();
					controls += '</div>';		
                controls += '</div>';
                $(element).prepend(controls);
                var controlbar ={
					bmr_progresscanvas: $('#' + controlbarid + ' .bmr_range'),
                	bmr_progress: $('#' + controlbarid + ' .bmr_slide'),
					bmr_timer: $('#' + controlbarid + ' .bmr_timer'),
                    settingsdialog: $('#' + controlbarid + ' .poodll_dialogue_box_settings'),
                    errorsdialog: $('#' + controlbarid + ' .poodll_dialogue_box_errors'),
					settingsicon: $('#' + controlbarid + ' .settingsicon'),
                    status: $('#' + controlbarid + ' .poodll_status_bmr'),
                    preview: $('#' + controlbarid + ' .poodll_preview_bmr'),
                    startbutton: $('#' + controlbarid + ' .poodll_start-recording_bmr'),
                    stopbutton: $('#' + controlbarid + ' .poodll_stop-recording_bmr'),
                    pausebutton: $('#' + controlbarid + ' .poodll_pause-recording_bmr'),
                    resumebutton: $('#' + controlbarid + ' .poodll_resume-recording_bmr'),
                    playbutton: $('#' + controlbarid + ' .poodll_play-recording_bmr'),
                    savebutton: $('#' + controlbarid + ' .poodll_save-recording_bmr')    
                };


            //settings and error dialogs
            //They use the same dialog and just fill it with diofferent stuff
            //settings is on 'this' because it is shown from skkn events, but errors are from pmr stuff
            ip.errordialog.set_dialogue_box(controlbar.errorsdialog);
            this.devsettings.set_dialogue_box(controlbar.settingsdialog);
				
				
                return controlbar;
				
				
				 
				
        }, //end of fetch_control_bar_bmr


        register_controlbar_events_video: function(onMediaSuccess,  controlbarid) {
            return this.register_controlbar_events_audio(onMediaSuccess, controlbarid);
        },

        register_controlbar_events_audio: function(onMediaSuccess, controlbarid){
            var self = this;
            var pmr=this.pmr;
            var ip = this.fetch_instanceprops(controlbarid);

			//Open the settings dialog
			ip.controlbar.settingsicon.click(function(){
				self.devsettings.open();
			});
			
			 //init radial progress
            var hprogress = anim_progress_bar.clone();
            hprogress.init(ip.controlbar.bmr_progresscanvas);
			
			
			ip.controlbar.bmr_progresscanvas.addClass('hide');
			
            ip.controlbar.startbutton.click(function() {
                pmr.do_start_audio(ip, onMediaSuccess);

                //clear messages
                $('#' + ip.config.widgetid  + '_messages').text('');
                self.disable_button(this);
                self.disable_button(ip.controlbar.playbutton);
                ip.controlbar.resumebutton.hide();
                self.enable_button(ip.controlbar.stopbutton);
                //self.disable_button(ip.controlbar.savebutton);
                ip.controlbar.pausebutton.show();
                self.enable_button(ip.controlbar.pausebutton);
                self.set_visual_mode('recordmode',controlbarid);
                
                //timer and status bar
                ip.timer.reset();
                ip.timer.start();
                self.update_status(controlbarid);
            });
            
            ip.controlbar.stopbutton.click(function() {

                pmr.do_stop_audio(ip);

                self.disable_button(this);
				var preview = ip.controlbar.preview;
                if(preview && preview.get(0)){
                    preview.get(0).pause();
                }
                
               //turn border black etc
               self.set_visual_mode('previewmode',controlbarid);
               //timer and status bar
               ip.timer.stop()
               self.update_status(controlbarid);
                
               self.enable_button(ip.controlbar.playbutton);
               self.disable_button(ip.controlbar.pausebutton);
               
               //If stop has been pressed there is no "resuming"
               ip.controlbar.startbutton.show();
               self.disable_button(ip.controlbar.resumebutton);
               ip.controlbar.resumebutton.hide();

              if(!self.uploaded){
                self.enable_button(ip.controlbar.startbutton);
                self.enable_button(ip.controlbar.savebutton);
				
              }
			  
               ip.controlbar.resumebutton.hide();
               ip.controlbar.pausebutton.show();
            });
          
            ip.controlbar.pausebutton.click(function() {
                self.disable_button(this);
                ip.controlbar.startbutton.hide();
                ip.controlbar.resumebutton.show();
                pmr.do_pause_audio(ip);
                self.enable_button(ip.controlbar.resumebutton);
                 self.enable_button(ip.controlbar.savebutton);
                self.set_visual_mode('pausedmode',controlbarid);
                
                //timer and status bar
                ip.timer.pause();
                self.update_status(controlbarid);
            });
            
            ip.controlbar.resumebutton.click(function() {
                self.disable_button(this);
                 //self.disable_button(ip.controlbar.savebutton);
                pmr.do_resume_audio(ip);
                self.enable_button(ip.controlbar.pausebutton);
                self.set_visual_mode('recordmode',controlbarid);
                
                //timer and status bar
                ip.timer.resume();
                self.update_status(controlbarid);
            });
            
            ip.controlbar.playbutton.click(function() {
                self.disable_button(this);
                var preview = ip.controlbar.preview.get(0);
                pmr.do_play_audio(ip,preview);

                self.enable_button(ip.controlbar.stopbutton);
                self.disable_button(ip.controlbar.startbutton);
                self.disable_button(ip.controlbar.resumebutton);
                
                //If play has been pressed there is no "resuming"
               ip.controlbar.startbutton.show();
               ip.controlbar.resumebutton.hide();
            });
            
           ip.controlbar.savebutton.click(function() {
              self.disable_button(this);
              if(ip.blobs && ip.blobs.length > 0){
                  pmr.do_save_audio(ip);
                  self.uploaded = true;
                  self.disable_button(ip.controlbar.startbutton);
                }else{
                    ip.uploader.Output(M.util.get_string('recui_nothingtosaveerror','filter_poodll'));
                }//end of if self.blobs		
                //probably not necessary  ... but getting odd ajax errors occasionally
                return false;
            });//end of save recording
          
            window.onbeforeunload = function() {
                self.enable_button(ip.controlbar.startbutton);
                var preview = ip.controlbar.preview;
                if(preview && preview.get(0)){
                    preview.get(0).pause();
                    preview.get(0).controls = false;
                }
            };
			
        }, //end of register_control_bar_events_bmr
			
        enable_button: function(button){
            $(button).attr('disabled',false);
			$(button).removeClass('bmr_disabled');		
        },
        disable_button: function(button){
            $(button).attr('disabled',true);
			$(button).addClass('bmr_disabled');   
        },
		
    };//end of returned object
	
	
	
	
});//total end