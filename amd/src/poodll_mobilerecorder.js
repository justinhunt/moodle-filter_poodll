/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader', 'filter_poodll/poodll_uploadrecorder',], function($, log, uploader, uploadrec) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Mobile Recorder: initialising');

    return {
		// This recorder supports the current browser
        supports_current_browser: function(config) { 
				if(config.mediatype!='audio' && config.mediatype!='video'){return false;}
                var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
				return iOS;//or false
        },
        
         // Perform the embed of this recorder on the page
        //into the element passed in. with config
        embed: function(element, config) { 
            this.config = config;
            this.linkid = 'filter_poodll_mobilerecorder_link_' + config.widgetid;
            switch(config.mediatype){
                case 'audio':
                	this.insert_upload_button(element,this.linkid);
                    this.insert_audio_button(element,this.linkid);               
                    break;
                case 'video':
                    this.insert_upload_button(element,this.linkid);
                    this.insert_video_button(element,this.linkid);
                    break;
            
            }
            uploader.init(element,config);
            this.register_events(element);
            return true;//or false
        },
        
        // handle audio/video/image file uploads for Mobile
        register_events: function(element) {

            var config = this.config;
            var mobilerecorder =this;
            //launch the app from the link
            $('#' + this.linkid).on('mousedown touchstart',function(e){
                    //to make sure both "confirm" and "openapp"
                    //happened. I had to do this
                   // e.preventDefault();
                  //  e.stopPropagation();
                    mobilerecorder.confirm_s3_arrival();
                   // window.location=$(this).attr('href');
                    uploader.Output(M.util.get_string('recui_awaitingconfirmation', 'filter_poodll'));
                    return;
                    
                    //but I wanted to just do this
                    /*
                    mobilerecorder.confirm_s3_arrival();
                    uploader.Output("awaiting confirmation");
                    return true;
                    */
                }
              );
              //launch the upload dialog (if no app or whatever)
              $('#' + this.linkid + '_uploadafile').on('mousedown touchstart',function(e){
              		$(element).empty();
              		uploadrec.embed(element,config);
                }
            );

        },
        
        insert_video_button: function(element){
			var controls = '<a class ="filter_poodll_mobilerecorderlink" id="' + this.linkid + 
                                '" href="poodll:record?filename=' + this.config.s3filename + 
                                '&type=' + this.config.mediatype + '&quality=' + this.config.mobilequality + 
                                '&camera=' + this.config.mobilecamera + 
                                '&s3folder=&timelimit='+ this.config.timelimit + '">' + 
                                M.util.get_string('recui_openrecorderapp', 'filter_poodll') + '</a>';
			$(element).prepend(controls);        
        },
        insert_audio_button: function(element){
			var controls = '<a class ="filter_poodll_mobilerecorderlink"  id="' + this.linkid + 
                                '" href="poodll:record?filename=' + this.config.s3filename + 
                                '&type=' + this.config.mediatype + '&quality=' + this.config.mobilequality + 
								'&camera=' + this.config.mobilecamera +
                                '&s3folder=&timelimit='+ this.config.timelimit + '">' +
                                M.util.get_string('recui_openrecorderapp', 'filter_poodll') + '</a>';
			$(element).prepend(controls);        
        },
        
        insert_upload_button: function(element){
			var controls = '<a class ="filter_poodll_uploadafilelink" id="' + this.linkid + '_uploadafile' +
                                '" href="#">' + 
                                M.util.get_string('recui_uploadafile', 'filter_poodll') + '</a>';
			$(element).prepend(controls);        
        },
        
        confirm_s3_arrival: function(){
            
             var xhr = new XMLHttpRequest();
	     var config = this.config;

             
            var posturl = config.wwwroot + '/filter/poodll/poodllfilelib.php';
            var params = "datatype=confirmarrival";
            params += "&mediatype=" + config.mediatype;
            params += "&filename=" + config.filename;
            xhr.open("POST",posturl, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("Content-length", params.length);
            xhr.setRequestHeader("Connection", "close");
            
            xhr.addEventListener("load", function () {
                if(xhr.response && xhr.response.indexOf(config.filename)>0){
                    uploader.pokeFilename(config.filename, uploader);
                    uploader.postprocess_s3_upload(uploader);
                    uploader.Output( M.util.get_string('recui_uploadsuccess', 'filter_poodll'));
                }else{
                   // setTimeout(mobilerecorder.confirm_s3_arrival,2000);
                    setTimeout(function(){
                        xhr.open("POST",posturl, true);
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhr.setRequestHeader("Cache-Control", "no-cache");
                        xhr.setRequestHeader("Content-length", params.length);
                        xhr.setRequestHeader("Connection", "close");
                        xhr.send(params);
                    },2000);
                }
            });
            
            xhr.send(params);
        }
    }//end of returned object
});//total end
