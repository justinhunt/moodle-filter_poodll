/* jshint ignore:start */
define(['jquery', 'core/log', 'filter_poodll/utils_amd', 'filter_poodll/upskin_radial',
        'filter_poodll/anim_hwave_mic', 'filter_poodll/dlg_devicesettings'],
    function ($, log, utils, upskin_radial, hwave_mic, settings) {

        "use strict"; // jshint ;_;

        log.debug('PoodLL Read Aloud Skin: initialising');

        return {

            instanceprops: null,
            pmr: null,
            devsettings: null,
            therecanim: null,

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
                $('#' + controlbarid + ' > .poodll_save-recording').hide();
                // $('#' + controlbarid  + '_messages').hide();
                $('#' + controlbarid + ' > .poodll_savedsuccessfully').show();
            },

            onUploadFailure: function (controlbarid) {
                return;
            },

            fetch_status_bar: function (skin) {
                var status = '<div class="poodll_status_' + skin + '" width="100%" height="50">00:00:00</div>';
                return status;
            },

            fetch_preview_audio: function (skin) {
                var preview = '<audio class="poodll_preview_' + skin + ' hide" playsInline muted></audio>';
                return preview;
            },
            fetch_preview_video: function (skin) {
                return this.fetch_preview_audio(skin);
            },
            fetch_resource_audio: function (skin) {
                var resourceplayer = '<audio class="poodll_resourceplayer_' + skin + ' hide" ></audio>';
                return resourceplayer;
            },
            fetch_resource_video: function (skin) {
                return this.fetch_resource_audio(skin);
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
                this.therecanim.start();

                //timer and status bar
                ip.timer.reset();
                ip.timer.start();
                this.update_status(controlbarid);

                //visuals
                this.set_visual_mode('recordingmode', controlbarid);
            },

            handle_timer_update: function (controlbarid) {
                var ip = this.fetch_instanceprops(controlbarid);
                var displaytime = ip.timer.fetch_display_time();
                this.therecanim.displaytime =displaytime;
                ip.controlbar.status.html(displaytime);
                if (ip.timer.seconds == 0 && ip.timer.initseconds > 0) {
                    ip.controlbar.stopbutton.click();
                }
            },

            update_status: function (controlbarid) {
                var ip = this.fetch_instanceprops(controlbarid);
                ip.controlbar.status.html(ip.timer.fetch_display_time());
            },

            fetch_uploader_skin: function (controlbarid, element) {
                var ip = this.fetch_instanceprops(controlbarid);
                var upskin = upskin_radial.clone();
                upskin.init(ip.config, element, ip.controlbar.playcanvas, ip.controlbar.status);
                upskin.setDrawParam('lineWidth', 2);
                upskin.setDrawParam('font', '14px Arial');
                return upskin;
            },

            //set visuals for different states (ie recording or playing)
            set_visual_mode: function (mode, controlbarid) {
                var self = this;
                var ip = this.fetch_instanceprops(controlbarid);

                switch (mode) {

                    case 'startmode':

                        ip.controlbar.status.hide();
                        if(ip.config.juststart == "1"){
                            self.disable_button(ip.controlbar.testbutton);
                            self.enable_button(ip.controlbar.startbutton);
                        }else{
                            self.enable_button(ip.controlbar.testbutton);
                            self.disable_button(ip.controlbar.startbutton);
                        }
                        self.disable_button(ip.controlbar.placeholderbutton);
                        self.disable_button(ip.controlbar.stopbutton);
                        self.therecanim.clear();
                        break;

                    case 'testingmode':

                        ip.controlbar.status.hide();
                        self.disable_button(ip.controlbar.startbutton);
                        self.disable_button(ip.controlbar.testbutton);
                        self.enable_button(ip.controlbar.placeholderbutton);
                        self.disable_button(ip.controlbar.stopbutton);

                        break;

                        //not implemented
                    case 'countdownmode':

                        break;

                    case 'readymode':

                        ip.controlbar.status.hide();
                        self.enable_button(ip.controlbar.startbutton);
                        self.disable_button(ip.controlbar.testbutton);
                        self.disable_button(ip.controlbar.placeholderbutton);
                        self.disable_button(ip.controlbar.stopbutton);
                        self.therecanim.setDrawParam('wavColor', '#CCCCCC');
                        self.therecanim.clear();
                        break;

                    case 'recordingmode':
                        //when testing(timer off) we do not want the stop button. Just really recording and allowearlyexit
                        if (ip.config.allowearlyexit == "1" && ip.timer.enabled) {
                            self.enable_button(ip.controlbar.stopbutton);
                        }
                        if ( ip.timer.enabled) {
                            ip.controlbar.status.show();
                            self.therecanim.setDrawParam('wavColor', '#FF0000');
                            self.therecanim.clear();
                            self.disable_button(ip.controlbar.placeholderbutton);
                        }else{
                            self.therecanim.setDrawParam('wavColor', '#0000FF');
                            self.therecanim.clear();
                            self.enable_button(ip.controlbar.placeholderbutton);
                        }
                        self.disable_button(ip.controlbar.testbutton);
                        self.disable_button(ip.controlbar.startbutton);

                        break;

                    case 'aftermode':
                        self.disable_button(ip.controlbar.startbutton);
                        self.disable_button(ip.controlbar.stopbutton);
                        self.disable_button(ip.controlbar.placeholderbutton);
                        self.therecanim.setDrawParam('wavColor', '#CCCCCC');
                        self.therecanim.clear();
                        ip.controlbar.status.show();

                        break;

                }

            },

            //insert the control bar and return it to be reused
            insert_controlbar_video: function (element, controlbarid, preview, resource) {
                return this.prepare_controlbar_audio(element, controlbarid, preview, resource);
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

                var recorder_class = 'poodll_mediarecorder_audio';
                var size_class = 'poodll_mediarecorder_size_auto';

                var ss = this.pmr.fetch_strings();
                var ss_startlabel = '<i class="fa fa-microphone"></i>'; //M.util.get_string('recui_start', 'filter_poodll');
                var ss_testlabel = '<i class="fa fa-microphone"></i>';//M.util.get_string('recui_testmic', 'filter_poodll');
                var ss_stoplabel = '<i class="fa fa-stop">';//M.util.get_string('recui_stop', 'filter_poodll');

                var status = this.fetch_status_bar('readaloud');
                var controls = '<div class="poodll_mediarecorderholder_readaloud '
                    + recorder_class + '" id="holder_' + controlbarid + '">';

                controls += '<div class="poodll_mediarecorderbox_readaloud" id="' + controlbarid + '">';
                controls += this.devsettings.fetch_dialogue_box();
                controls += ip.downloaddialog.fetch_dialogue_box();
                controls += ip.errordialog.fetch_dialogue_box();
                controls += '<div class="style-holder ' + skin_style + '">';
                controls += preview;
                controls += '<div class="settingsicon" id="settingsicon_' + controlbarid + '"><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"><i class="fa fa-cogs" aria-hidden="true"></i></button></div>';
                controls += '<canvas id="' + controlbarid + '_playcanvas" width="180" height="50"></canvas>';
                controls += status;
                controls += '<button type="button" class="poodll_mediarecorder_button_readaloud poodll_start-recording_readaloud">' + ss_startlabel + '</button>';
                controls += '<button type="button" class="poodll_mediarecorder_button_readaloud poodll_test-recording_readaloud">' + ss_testlabel + '</button>';
                controls += '<button type="button" class="poodll_mediarecorder_button_readaloud poodll_testing-placeholder_readaloud" style="background-color: #CCCCCC;">' + ss_testlabel  + '</button>';
                controls += '<button type="button" class="poodll_mediarecorder_button_readaloud poodll_stop-recording_readaloud">' + ss_stoplabel + '</button>';
                controls += '</div></div></div>';
                $(element).prepend(controls);
                //<i class="fa fa-stop" aria-hidden="true"></i>
                var controlbar = {
                    settingsdialog: $('#' + controlbarid + ' .poodll_dialogue_box_settings'),
                    downloaddialog: $('#' + controlbarid + ' .poodll_dialogue_box_download'),
                    errorsdialog: $('#' + controlbarid + ' .poodll_dialogue_box_errors'),
                    settingsicon: $('#' + controlbarid + ' .settingsicon'),
                    status: $('#' + controlbarid + ' .poodll_status_readaloud'),
                    preview: $('#' + controlbarid + ' .poodll_preview_readaloud'),
                    startbutton: $('#' + controlbarid + ' .poodll_start-recording_readaloud'),
                    testbutton: $('#' + controlbarid + ' .poodll_test-recording_readaloud'),
                    placeholderbutton: $('#' + controlbarid + ' .poodll_testing-placeholder_readaloud'),
                    stopbutton: $('#' + controlbarid + ' .poodll_stop-recording_readaloud'),
                    playcanvas: $('#' + controlbarid + '_playcanvas')
                };
                //settings and error and download dialogs
                //settings is on 'this' because it is shown from skkn events, but errors are from pmr stuff
                ip.downloaddialog.set_dialogue_box(controlbar.downloaddialog);
                ip.errordialog.set_dialogue_box(controlbar.errorsdialog);
                this.devsettings.set_dialogue_box(controlbar.settingsdialog);

                return controlbar;
            }, //end of fetch_control_bar_readaloud


            register_controlbar_events_video: function (onMediaSuccess, controlbarid) {
                return this.register_controlbar_events_audio(onMediaSuccess, controlbarid);
            },

            register_controlbar_events_audio: function (onMediaSuccess, controlbarid) {

                var self = this;
                var pmr = this.pmr;
                var ip = this.fetch_instanceprops(controlbarid);

                //init recording anim
                ip.config.recanim = 'hwave_mic';
                var recanim = hwave_mic.clone();
                self.therecanim = recanim;
                recanim.init(ip.audioanalyser, ip.controlbar.playcanvas.get(0));

                //set visual mode
                this.set_visual_mode('startmode', controlbarid);


                //Test button click
                ip.controlbar.testbutton.click(function () {
                    //we will start recording here.
                    //but its just a throwaway so we disable messages to API client and timer
                    ip.config.hermes.disable();
                    ip.timer.disable();



                    var testover = function () {
                        //stop recording
                        pmr.do_stop_audio(ip);
                        //wave animation
                        recanim.clear();
                        if (recanim.sounddetected) {
                            self.set_visual_mode('readymode', controlbarid);
                        }
                    };
                    pmr.do_start_audio(ip, onMediaSuccess);
                    self.set_visual_mode('testingmode', controlbarid);
                    setTimeout(testover, 4000);
                });


                ip.controlbar.settingsicon.click(function () {
                    if (!self.uploaded) {
                        self.devsettings.open();
                    } else {
                        ip.downloaddialog.open();
                    }
                });

                //Start button click
                ip.controlbar.startbutton.click(function () {
                    //we start real recording here.
                    // so we enable messages to API client and timer
                    ip.config.hermes.enable();
                    ip.timer.enable();

                    pmr.do_start_audio(ip, onMediaSuccess);
                });


                //Stop button click
                ip.controlbar.stopbutton.click(function () {

                    //stop recording
                    pmr.do_stop_audio(ip);

                    //wave animation
                    recanim.clear();


                    //timer and status bar
                    ip.timer.stop()
                    self.update_status(controlbarid);

                    //call upload right away
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

                    //set visuals
                    self.set_visual_mode('aftermode', controlbarid);

                });


                window.onbeforeunload = function () {
                    //no need to do anything here
                    // self.enable_button(ip.controlbar.startbutton);

                };
            }, //end of register_control_bar_events_readaloud


            enable_button: function (button) {
                $(button).attr('disabled', false);
                $(button).removeClass('pmr_disabled');
            },
            disable_button: function (button) {
                $(button).attr('disabled', true);
                $(button).addClass('pmr_disabled');
            },

        };//end of returned object
    });//total end
