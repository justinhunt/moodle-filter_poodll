/* jshint ignore:start */
define(['jquery',  'core/log', 'filter_poodll/utils_amd', 'filter_poodll/upskin_cssradial',
    'filter_poodll/speech_poodll', 'filter_poodll/dlg_devicesettings', 'filter_poodll/audioplayer_minimal'],
    function ($, log, utils, upskin, speechrecognition, settings,audioplayer_minimal) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Minimal Skin: initialising');

    return {

        instanceprops: null,
        pmr: null,
        devsettings: null,
        currentvisualmode: '',


        //for making multiple instances
        clone: function () {
            return $.extend(true, {}, this);
        },

        init: function (ip, pmr) {
            this.instanceprops = ip;
            this.pmr = pmr;
            this.devsettings = settings.clone();
            this.devsettings.init(pmr, ip);
        },


        fetch_instanceprops: function () {
            return this.instanceprops;
        },


        onUploadSuccess: function (controlbarid) {
            //playback mode
            this.set_visual_mode('playbackmode', controlbarid);
            log.debug('now playback mode');
        },

        onUploadFailure: function (controlbarid) {
            return;
        },

        fetch_status_bar: function (skin) {
            var status = '<div class="poodll_status_' + skin + '" width="320" height="50">00:00:00</div>';
            return status;
        },

        fetch_preview_audio: function (skin) {
            var preview = '<audio class="poodll_preview_' + skin + ' hide" playsinline="playsinline" ></audio>';
            return preview;
        },
        fetch_preview_video: function (skin) {
            var preview = '<video class="poodll_preview_' + skin + '" width="320" height="240" playsinline="playsinline" muted></video>';
            return preview;
        },
        fetch_resource_audio: function (skin) {
            var resourceplayer = '<audio class="poodll_resourceplayer_' + skin + ' hide" playsinline="playsinline"></audio>';
            return resourceplayer;
        },
        fetch_resource_video: function (skin) {
            var resourceplayer = '<video class="poodll_resourceplayer_' + skin + ' hide" playsinline="playsinline"></video>';
            return resourceplayer;
        },

        fetch_uploader_skin: function (controlbarid, element) {
            var ip = this.fetch_instanceprops();
            var theupskin = upskin.clone();
            theupskin.init(ip.config, element, ip.controlbar.uploadbutton);
            return theupskin;
        },

        onMediaError: function (e) {
            console.error('media error', e);
        },

        onMediaSuccess_video: function (controlbarid) {
            var ip = this.fetch_instanceprops(controlbarid);
            this.set_visual_mode('recordingmode', controlbarid);
        },

        onMediaSuccess_audio: function (controlbarid) {
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.preview.attr('src', null);

            //clear messages
            ip.uploader.Output('');

            //wave animation
            ip.controlbar.animaton.addClass('animation_running');

            //timer and status bar
            ip.timer.reset();
            ip.timer.start();
            this.update_status(controlbarid);

            //visuals
            this.set_visual_mode('recordingmode', controlbarid);
        },

        handle_timer_update: function (controlbarid) {
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.status.html(ip.timer.fetch_display_time());
            if (ip.timer.seconds == 0 && ip.timer.initseconds > 0) {
                ip.controlbar.stopbutton.click();
            }
        },

        update_status: function (controlbarid) {
            var ip = this.fetch_instanceprops(controlbarid);
            ip.controlbar.status.html(ip.timer.fetch_display_time());
            if(ip.config.timelimit > 0){
                ip.controlbar.preview.data('duration', ip.config.timelimit - ip.timer.seconds);
            }else {
                ip.controlbar.preview.data('duration', ip.timer.seconds);
            }
        },

        //set visuals for different states (ie recording or playing)
        set_visual_mode: function (mode, controlbarid) {
            var self = this;
            var ip = this.fetch_instanceprops(controlbarid);


            switch (mode) {

                case 'startmode':
                    self.enable_button(ip.controlbar.status);
                    self.enable_button(ip.controlbar.startbutton);
                    self.disable_button(ip.controlbar.playbutton);
                    self.disable_button(ip.controlbar.stopbutton);
                    self.disable_button(ip.controlbar.animaton);
                    self.disable_button(ip.controlbar.restartbutton);
                    self.disable_button(ip.controlbar.uploadbutton);
                    ip.controlbar.playback.hide();
                    break;


                case 'recordingmode':
                    self.enable_button(ip.controlbar.status);
                    self.enable_button(ip.controlbar.stopbutton);
                    self.enable_button(ip.controlbar.animaton);
                    self.disable_button(ip.controlbar.startbutton);
                    self.disable_button(ip.controlbar.playbutton);
                    self.disable_button(ip.controlbar.restartbutton);
                    self.disable_button(ip.controlbar.uploadbutton);
                    ip.controlbar.playback.hide();

                    break;

                case 'uploadmode':
                    self.enable_button(ip.controlbar.status);
                    self.enable_button(ip.controlbar.uploadbutton);
                    self.disable_button(ip.controlbar.stopbutton);
                    self.disable_button(ip.controlbar.animaton);
                    self.disable_button(ip.controlbar.startbutton);
                    self.disable_button(ip.controlbar.playbutton);
                    self.disable_button(ip.controlbar.restartbutton);
                    ip.controlbar.playback.hide();

                    break;

                case 'playbackmode':
                    self.disable_button(ip.controlbar.status);
                    self.disable_button(ip.controlbar.uploadbutton);
                    self.disable_button(ip.controlbar.stopbutton);
                    self.disable_button(ip.controlbar.animaton);
                    self.disable_button(ip.controlbar.startbutton);
                    self.disable_button(ip.controlbar.playbutton);
                    self.enable_button(ip.controlbar.restartbutton);
                    ip.controlbar.playback.show();
                    if (ip.blobs && ip.blobs.length > 0) {
                        utils.doConcatenateBlobs(ip.blobs, function (concatenatedBlob) {
                            var mediaurl = URL.createObjectURL(concatenatedBlob);
                            ip.controlbar.preview.removeAttr('src');
                            ip.controlbar.preview[0].src = mediaurl;
                            ip.controlbar.preview[0].load();
                        });
                    }
                    break;

                case 'playingmode':

                    self.disable_button(ip.controlbar.status);
                    self.disable_button(ip.controlbar.stopbutton);
                    self.disable_button(ip.controlbar.animaton);
                    self.disable_button(ip.controlbar.startbutton);
                    self.disable_button(ip.controlbar.playbutton);
                    self.disable_button(ip.controlbar.restartbutton);
                    self.disable_button(ip.controlbar.uploadbutton);
                    ip.controlbar.playback.show();
                    break;
            }
            self.currentvisualmode = mode;

        },

        //insert the control bar and return it to be reused
        insert_controlbar_video: function (element, controlbarid, preview, resource) {
            var controlbar = this.prepare_controlbar(element, controlbarid, preview, resource, 'video');
            return controlbar;
        },

        //insert the control bar and return it to be reused
        insert_controlbar_audio: function (element, controlbarid, preview, resource) {
            var controlbar = this.prepare_controlbar(element, controlbarid, preview, resource, 'audio');
            return controlbar;
        },

        //insert the control bar and return it to be reused
        prepare_controlbar: function (element, controlbarid, preview, resource, mediatype) {
            var ip = this.fetch_instanceprops(controlbarid);
            var skin_style = ip.config.media_skin_style;

            var recorder_class = mediatype === 'video' ? 'poodll_mediarecorder_video' : 'poodll_mediarecorder_audio';

            var size_class = 'poodll_mediarecorder_size_auto';
            switch (ip.config.size) {
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

            var controls = '<div class="poodll_mediarecorderholder_minimal '
                + recorder_class + '" id="holder_' + controlbarid + '">';

            controls += '<div class="poodll_mediarecorderbox_minimal" id="' + controlbarid + '">';
            controls += this.devsettings.fetch_dialogue_box();
            controls += ip.downloaddialog.fetch_dialogue_box();
            controls += ip.errordialog.fetch_dialogue_box();
            controls += '<div class="style-holder ' + skin_style + '">';
            var status = this.fetch_status_bar('minimal');
            controls += status;
            controls += preview;
            controls += '<div class="settingsicon" id="settingsicon_' + controlbarid + '"><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"><i class="fa fa-cogs" aria-hidden="true"></i></button></div>';
            controls += '<button type="button" class="poodll_mediarecorder_button_minimal poodll_mediarecorder_minimal_start_button"></button>';
            controls += '<button type="button" class="poodll_mediarecorder_button_minimal poodll_mediarecorder_minimal_animaton"></button>';
            controls += '<button type="button" class="poodll_mediarecorder_button_minimal poodll_mediarecorder_minimal_stop_button"></button>';
            controls += ' <button type="button" class="poodll_mediarecorder_button_minimal poodll_mediarecorder_minimal_upload_button"></button>';
            controls += ' <button type="button" class="poodll_mediarecorder_button_minimal poodll_mediarecorder_minimal_play_button"><i class="fa fa-play" aria-hidden="true"></i></button>';
            controls += ' <div class="poodll_playback_minimal"></div>';
            controls += '<div class="minimal-restart-button-wrapper"><a class="poodll_restart_minimal " ><i class="fa fa-repeat fa-flip-horizontal" aria-hidden="true"></i></a></div>';
            controls += '</div></div></div>';

            $(element).prepend(controls);
            var controlbar = {
                settingsdialog: $('#' + controlbarid + ' .poodll_dialogue_box_settings'),
                downloaddialog: $('#' + controlbarid + ' .poodll_dialogue_box_download'),
                errorsdialog: $('#' + controlbarid + ' .poodll_dialogue_box_errors'),
                settingsicon: $('#' + controlbarid + ' .settingsicon'),
                status: $('#' + controlbarid + ' .poodll_status_minimal'),
                preview: $('#' + controlbarid + ' .poodll_preview_minimal'),
                playback: $('#' + controlbarid + ' .poodll_playback_minimal'),
                startbutton: $('#' + controlbarid + ' .poodll_mediarecorder_minimal_start_button'),
                stopbutton: $('#' + controlbarid + ' .poodll_mediarecorder_minimal_stop_button'),
                animaton: $('#' + controlbarid + ' .poodll_mediarecorder_minimal_animaton'),
                stopplayingbutton: $('#' + controlbarid + ' .poodll_stop-playing_minimal'),
                uploadbutton: $('#' + controlbarid + ' .poodll_mediarecorder_minimal_upload_button'),
                playbutton: $('#' + controlbarid + ' .poodll_mediarecorder_minimal_play_button'),
                restartbutton: $('#' + controlbarid + ' .poodll_restart_minimal')
            };
            //settings and error and download dialogs
            //settings is on 'this' because it is shown from skkn events, but errors are from pmr stuff
            ip.downloaddialog.set_dialogue_box(controlbar.downloaddialog);
            ip.errordialog.set_dialogue_box(controlbar.errorsdialog);
            this.devsettings.set_dialogue_box(controlbar.settingsdialog);

            //set up audio player
            var opts ={'player_element': '#' + controlbarid + ' .poodll_preview_minimal', 'autoid': controlbarid};
            var playerhtml='<div id="' + controlbarid + '_fpminimal_audioplayer" class="fpminimal_audioplayer">\n' +
                '    <button type="button" class="fpminimal_audioplayer_play_button"></button>\n' +
                '    <div class="fpminimal_audioplayer_skip_buttons">\n' +
                '        <button type="button" class="fpminimal_audioplayer_skip_button_back">15</button>\n' +
                '        <button type="button" class="fpminimal_audioplayer_skip_button_forward">15</button>\n' +
                '    </div>\n' +
                '    <div class="fpminimal_audioplayer_bar">\n' +
                '        <div class="fpminimal_audioplayer_bar_behind"></div>\n' +
                '        <div class="fpminimal_audioplayer_bar_front"></div>\n' +
                '    </div>\n' +
                '    <div class="fpminimal_audioplayer_time">00:45</div>\n' +
                '</div>';
            $('#' + controlbarid + ' .poodll_playback_minimal').html(playerhtml);
            audioplayer_minimal.init(opts);

            return controlbar;
        }, //end of fetch_control_bar_minimal


        register_controlbar_events_video: function (onMediaSuccess, controlbarid) {
            return this.register_controlbar_events_audio(onMediaSuccess, controlbarid);
        },

        register_controlbar_events_audio: function (onMediaSuccess, controlbarid) {

            var self = this;
            var pmr = this.pmr;
            var ip = this.fetch_instanceprops(controlbarid);

            //set visual mode
            this.set_visual_mode('startmode', controlbarid);

            //recording animation, initially marked up  but not started
            ip.controlbar.stopbutton.addClass('poodll_mediarecorder_minimal_animation');


            ip.controlbar.settingsicon.click(function () {
                if (!self.uploaded) {
                    self.devsettings.open();
                } else {
                    ip.downloaddialog.open();
                }
            });


            //Start button click
            ip.controlbar.startbutton.click(function () {
                pmr.do_start_audio(ip, onMediaSuccess);
                log.debug('starting audio recording');

            });

            //Restart link clicked
            ip.controlbar.restartbutton.click(function () {
                //visuals
                self.set_visual_mode('startmode', controlbarid);
                ip.timer.reset();
                self.update_status(controlbarid);
                //fetch new uploader url
                ip.uploader.fetchNewUploadDetails();
                self.uploaded=false;
            });

            //Stop button click
            ip.controlbar.stopbutton.click(function () {

                if(self.currentvisualmode==='playbackmode'){
                    return;
                }

                //stop recording
                pmr.do_stop_audio(ip);
                log.debug('stopping audio recording');

                //stop previewing (if that is what we are doing)
                /*
                var preview = ip.controlbar.preview.get(0);
                preview.pause();
                */

                //wave animation
                ip.controlbar.animaton.removeClass('animation_running');

                //timer and status bar
                ip.timer.stop();
                self.update_status(controlbarid);


                //call upload right away
                self.set_visual_mode('uploadmode', controlbarid);
                log.debug('now uploading mode');
                //but we have to do it this lame deferred way because some mediastreamrecorders return a single
                //blob shortly after we stop. We init like that too, to make sure we do not truncate a users recording
                //if the mini blobs did not arrive
                var doDeferredUpload = function () {
                    if (ip.blobs && ip.blobs.length > 0) {
                        pmr.do_save_audio(ip);
                        ip.uploaded = true;
                        self.disable_button(ip.controlbar.startbutton);
                    } else {
                        setTimeout(doDeferredUpload, 200);
                    }
                }
                setTimeout(doDeferredUpload, 200);

            });

            //Play button click
            /*
            ip.controlbar.playbutton.click(function () {

                //commence playback
                var preview = ip.controlbar.preview.get(0);
                pmr.do_play_audio(ip, preview);

                //init and run radial progress animation
                rprogress.clear();
                rprogress.fetchCurrent = function () {
                    var ct = ip.controlbar.preview.prop('currentTime');
                    var duration = ip.controlbar.preview.prop('duration');
                    if (!isFinite(duration)) {
                        duration = ip.timer.finalseconds;
                    }
                    return ct / duration;
                };
                rprogress.start();

                //set visuals
                self.set_visual_mode('playingmode', controlbarid);

            });
            */




            //Save audio
            var saveaudio= function () {

                if (ip.blobs && ip.blobs.length > 0) {
                    pmr.do_save_audio(ip);
                    ip.uploaded = true;
                } else {
                    ip.uploader.Output(M.util.get_string('recui_nothingtosaveerror', 'filter_poodll'));
                }//end of if self.blobs
            }

        }, //end of register_control_bar_events_minimal

        enable_button: function (button) {
            $(button).attr('disabled', false);
            $(button).removeClass('pmr_disabled');
            $(button).show();
        },
        disable_button: function (button) {
            $(button).attr('disabled', true);
            $(button).addClass('pmr_disabled');
            $(button).hide();
        },



    };//end of returned object
});//total end
