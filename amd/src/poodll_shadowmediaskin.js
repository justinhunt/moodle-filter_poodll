/* jshint ignore:start */
define(['jquery','core/log','filter_poodll/utils_amd'], function($, log, utils) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Shadow Skin: initialising');

    return {
    
        instanceprops: null,
        pmr: null,
        uploaded: false,

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
            var status = '<div class="poodll_status_' + skin + '"></div>';
            return status;
        },
        
        fetch_preview_audio: function(skin){
            var checkplayer = '<audio class="poodll_checkplayer_' + skin + ' hide" ></audio>';
            return checkplayer;
        },
        fetch_preview_video: function(skin){
            var checkplayer ='<video class="poodll_checkplayer_' + skin + '" width="320" height="240"></video>';
            return checkplayer;
        },
        fetch_resource_audio: function(skin){
            var resourceplayer = '<audio class="poodll_resourceplayer_' + skin + ' hide" src="@@RESOURCEURL@@" ></audio>';
            return resourceplayer;
        },
        fetch_resource_video: function(skin){
            var resourceplayer = '<video class="poodll_resourceplayer_' + skin + ' hide" src="@@RESOURCEURL@@" ></video>';
            return resourceplayer;
        },
        onMediaError: function(e) {
                console.error('media error', e);
        },

        onMediaSuccess_video: function(controlbarid){
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.stopbutton.attr('disabled',false);
            ip.controlbar.savebutton.attr('disabled',false);
        },

        onMediaSuccess_audio: function(controlbarid){
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.checkplayer.attr('src',null);
            ip.controlbar.stopbutton.attr('disabled',false);;
            ip.controlbar.savebutton.attr('disabled',false);
        },

        handle_timer_update: function(controlbarid){
            var ip = this.fetch_instanceprops(controlbarid);
            this.update_status(controlbarid);
            if(ip.timer.seconds==0 && ip.timer.initseconds >0){
                 ip.controlbar.stopbutton.click();
            }
        },

       update_status: function(controlbarid){
            /*
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.status.html(ip.timer.fetch_display_time());
            */
        },

        //set visuals for different states (ie recording or playing)
        set_visual_mode: function(mode, controlbarid){
            var self = this;
            var ip = this.fetch_instanceprops(controlbarid);

           switch(mode){

               case 'recordmode':
                    ip.controlbar.checkplayer.addClass('poodll_recording');
                    ip.controlbar.status.addClass('poodll_recording');
                    if(ip.config.mediatype=='audio'){
                        ip.controlbar.checkplayer.addClass('hide');
                    }
                    ip.controlbar.status.removeClass('hide');
                    break;

               case 'previewmode':
                    ip.controlbar.checkplayer.removeClass('poodll_recording');
                    ip.controlbar.status.removeClass('poodll_recording');
                    break;

               case 'pausedmode':
                    ip.controlbar.checkplayer.removeClass('poodll_recording');
                    ip.controlbar.status.removeClass('poodll_recording');
                    break;
           }

       },

        //insert the control bar and return it to be reused
        insert_controlbar_video: function(element, controlbarid, checkplayer,resourceplayer) {
            var controlbar = this.prepare_controlbar(element,controlbarid, checkplayer,resourceplayer,'video');
        	return controlbar;
        },
        //insert the control bar and return it to be reused
        insert_controlbar_audio: function(element,controlbarid, checkplayer,resourceplayer){
        	var controlbar = this.prepare_controlbar(element,controlbarid, checkplayer,resourceplayer,'audio');
        	return controlbar;
        },
        
        //insert the control bar and return it to be reused
        prepare_controlbar: function(element,controlbarid, checkplayer,resourceplayer, mediatype){
                var ip = this.fetch_instanceprops(controlbarid);
                var skin_style = ip.config.media_skin_style;
                
                var recorder_class = mediatype=='video' ?  'poodll_mediarecorder_video' : 'poodll_mediarecorder_audio';

                //load resource player with the src of the resource audio (or video ...never)
                resourceplayer = resourceplayer.replace('@@RESOURCEURL@@', ip.config.resource);

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


                var controls ='<div class="poodll_mediarecorderholder_shadow '
                	+ recorder_class + ' ' + size_class + '" id="holder_' + controlbarid + '">' ;
                	
                controls +='<div class="poodll_mediarecorderbox_shadow" id="' + controlbarid + '">' ;
                controls +='<div class="style-holder ' + skin_style + '">' ;
                var status = this.fetch_status_bar('shadow');
                controls += status,
                controls += checkplayer,
                    controls += resourceplayer,
                    controls +=  '<button type="button" class="poodll_mediarecorder_button_shadow poodll_play-resource_shadow">' + M.util.get_string('recui_play', 'filter_poodll') + '</button>';
                controls +=  '<button type="button" class="poodll_mediarecorder_button_shadow poodll_start-recording_shadow">' + M.util.get_string('recui_record', 'filter_poodll') + '</button>';
                controls += '<button type="button" class="poodll_mediarecorder_button_shadow poodll_stop-recording_shadow pmr_disabled hide" disabled>' + M.util.get_string('recui_stop', 'filter_poodll') + '</button>';
                controls += ' <button type="button" class="poodll_mediarecorder_button_shadow poodll_play-recording_shadow pmr_disabled" disabled>' + M.util.get_string('recui_play', 'filter_poodll') + '</button>';
                controls += '<button type="button" class="poodll_save-recording_shadow pmr_disabled disabled hide>' + M.util.get_string('recui_save', 'filter_poodll') + '</button>';
                controls += '</div></div></div>';
                $(element).prepend(controls);

                var controlbar ={
                    status: $('#' + controlbarid + '  .poodll_status_shadow'),
                    resourceplayer: $('#' + controlbarid + '  .poodll_resourceplayer_shadow'),
                    checkplayer: $('#' + controlbarid + '  .poodll_checkplayer_shadow'),
                    resourcebutton: $('#' + controlbarid + '  .poodll_play-resource_shadow'),
                    startbutton: $('#' + controlbarid + '  .poodll_start-recording_shadow'),
                    stopbutton: $('#' + controlbarid + '  .poodll_stop-recording_shadow'),
                    playbutton: $('#' + controlbarid + '  .poodll_play-recording_shadow'),
                    savebutton: $('#' + controlbarid + '  .poodll_save-recording_shadow')
                };
                return controlbar;
        }, //end of fetch_control_bar_shadow


        register_controlbar_events_video: function(onMediaSuccess, mediaConstraints, controlbarid) {
            return this.register_controlbar_events_audio(onMediaSuccess, mediaConstraints, controlbarid);
        },

        register_controlbar_events_audio: function(onMediaSuccess, mediaConstraints, controlbarid){
            var self = this;
            var pmr=this.pmr;
            var ip = this.fetch_instanceprops(controlbarid);

            ip.controlbar.startbutton.click(function() {
                pmr.do_start_audio(ip, mediaConstraints, onMediaSuccess);

                //clear messages
                $('#' + ip.config.widgetid  + '_messages').text('');
                self.disable_button(this);
                self.disable_button(ip.controlbar.playbutton);
                self.enable_button(ip.controlbar.stopbutton);
                ip.controlbar.stopbutton.show();
                ip.controlbar.startbutton.hide();
                self.disable_button(ip.controlbar.savebutton);

                self.set_visual_mode('recordmode',controlbarid);
                
                //timer and status bar
                ip.timer.reset();
                ip.timer.start();
                self.update_status(controlbarid);
            });
            
            ip.controlbar.stopbutton.click(function() {

                self.disable_button(this);
                ip.controlbar.stopbutton.hide();
                self.enable_button(ip.controlbar.startbutton);
                ip.controlbar.startbutton.show();
                self.enable_button(ip.controlbar.playbutton);
                //turn border black etc
               self.set_visual_mode('previewmode',controlbarid);
               //timer and status bar
               ip.timer.stop()
               self.update_status(controlbarid);


              if(!self.uploaded){
                self.enable_button(ip.controlbar.startbutton);
                self.enable_button(ip.controlbar.savebutton);
              } 

            });

            ip.controlbar.playbutton.click(function() {
                self.disable_button(this);
                var checkplayer = ip.controlbar.checkplayer.get(0);
                pmr.do_play_audio(ip,checkplayer);

                self.enable_button(ip.controlbar.stopbutton);
                self.disable_button(ip.controlbar.startbutton);
                self.disable_button(ip.controlbar.savebutton);
            });

            ip.controlbar.resourcebutton.click(function(){
                var resourceplayer = ip.controlbar.resourceplayer.get(0);
                resourceplayer.play();
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
                var checkplayer = ip.controlbar.checkplayer;
                if(checkplayer && checkplayer.get(0)){
                    checkplayer.get(0).pause();
                }
            };
        }, //end of register_control_bar_events_shadow

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
