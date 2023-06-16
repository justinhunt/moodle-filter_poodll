
define(['jquery','core/log'], function($, log) {
    var selectors ={
        hiddenplayer: '_fpminimal_hiddenaudioplayer',
        player: '_fpminimal_audioplayer',
        ppbutton: '_fpminimal_audioplayer .fpminimal_audioplayer_play_button',
        bar_front: '_fpminimal_audioplayer .fpminimal_audioplayer_bar_front',
        backbutton: '_fpminimal_audioplayer .fpminimal_audioplayer_skip_button_back',
        forwardbutton: '_fpminimal_audioplayer .fpminimal_audioplayer_skip_button_forward',
        timedisplay: '_fpminimal_audioplayer .fpminimal_audioplayer_time'
    }

    var skipinterval =15;

    var pr = {
        init: function(opts){
            this.hplayer = $(opts['player_element'])[0];
            log.debug(opts['player_element']);
            log.debug(opts['autoid']);
            log.debug(opts);

            //init can be called twice, why why
            if($(this.hplayer).data('init')==1){
                return;
            }else{
                $(this.hplayer).data('init',1);
            }

            this.vplayer= $('#' + opts['autoid'] + selectors.player);
            this.ppbutton = $('#' + opts['autoid'] +selectors.ppbutton);
            this.bar_front = $('#' + opts['autoid'] +selectors.bar_front);
            this.backbutton = $('#' + opts['autoid'] +selectors.backbutton);
            this.forwardbutton = $('#' + opts['autoid'] +selectors.forwardbutton);
            this.timedisplay = $('#' + opts['autoid'] +selectors.timedisplay);

            this.duration = this.hplayer.duration;
            log.debug('duration is '+this.duration);

            this.register_events();
            this.update_time();
        },
        register_events: function(){
            var that = this;
            $(this.ppbutton).on('click',function(){
                that.toggle_play();
            });
            $(this.backbutton).on('click',function(){
                that.skip_back();
            });
            $(this.forwardbutton).on('click',function(){
                that.skip_forward();
            });
            $(this.hplayer).on('timeupdate',function(){
                that.update_time();
            });
            $(this.hplayer).on('ended',function(){
                $(that.ppbutton).attr('data-state','ended');
                //reset the time display
                $(that.timedisplay).text(that.formatAudioTime(that.duration));
            });
            $(this.hplayer).on('pause play', function(e) {
                if (e.currentTarget.paused) {
                    $(that.ppbutton).attr('data-state','paused');
                } else {
                    $(that.ppbutton).attr('data-state','playing');
                }
            });
            $(this.hplayer).on('loadeddata',function(){
                console.log("loadeddata", that.hplayer.duration);
                if(that.hplayer.duration === Infinity){
                    //blobs dont do duration very well, so if its infinity use the time we stashed when recording
                    that.duration=$(that.hplayer).data('duration');
                }else {
                    that.duration = that.hplayer.duration;
                }
                $(that.ppbutton).attr('data-state','paused');
                that.update_time();
            });
            $(this.hplayer).on('canplaythrough',function(){
                //if we get the real duration here, set it
                if(that.hplayer.duration !== Infinity) {
                    that.duration = that.hplayer.duration;
                }
            });

        },
        toggle_play: function(){
            var that = this;
            if(this.hplayer.paused){
                this.hplayer.muted=false;
                console.log(this.hplayer);
                this.hplayer.play().then(function(){
                    log.debug('play promise resolved');
                    $(that.ppbutton).attr('data-state','playing');
                }).catch(function(e){
                    log.debug(e,'play promise rejected');
                });
            }else{
                this.hplayer.pause();
                $(that.ppbutton).attr('data-state','paused');
            }
        },
        update_time: function(){
            //update the progress bar
            var percent=0;
            if(parseInt(this.duration) > 0){
                percent = (this.hplayer.currentTime/this.duration)*100;
                if(percent > 100){
                    percent = 100;
                }
            }else{
                this.duration=0;
            }

            $(this.bar_front).css('width', percent+'%');
            //update the time display
            switch(percent) {
                case 0:
                    $(this.timedisplay).text(this.formatAudioTime(this.duration));
                    break;
                case 100:
                    $(this.timedisplay).text(this.formatAudioTime(this.duration));
                    break;
                default:
                    $(this.timedisplay).text(this.formatAudioTime(this.hplayer.currentTime) + '/' + this.formatAudioTime(this.duration));
            }


            //handle back and forward buttons
            if(this.hplayer.currentTime < skipinterval) {
                $(this.backbutton).css('opacity', '50%');
            }else{
                $(this.backbutton).css('opacity', '100%');
            }

            if(this.hplayer.currentTime > (this.duration - skipinterval)) {
                $(this.forwardbutton).css('opacity', '50%');
            }else{
                $(this.forwardbutton).css('opacity', '100%');
            }
        },
        skip_back: function(){
            if(this.hplayer.currentTime > skipinterval) {
                this.hplayer.currentTime = this.hplayer.currentTime - skipinterval;
            }else{
                this.hplayer.currentTime = 0;
            }
        },
        skip_forward: function(){
            if(this.hplayer.currentTime < (this.duration - skipinterval)) {
                this.hplayer.currentTime = this.hplayer.currentTime + skipinterval;
            }else{
                this.hplayer.currentTime = this.duration;
            }
        },
        formatAudioTime: function (currentTime) {
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            return formattedTime;
        }

    };

    //init the player
    return pr;
});
