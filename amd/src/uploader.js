/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('Universal Uploader: initialising');

    return {
    
    	config: null,
    	
    	init: function(element,config){
    		this.config = config;
    		this.insert_controls(element);
    	},

		insert_controls: function(element){     
         //progress
			var controls='<div id="' + this.config.widgetid + '_progress" class="p_progress x"><p></p></div>';
			controls += '<div id="' + this.config.widgetid + '_messages" class="p_messages x"></div>';
			$(element).append(controls);  
		},
        
        uploadBlob: function(blob,filetype){
        	// start upload
        	var self = this;
			var filedata ="";
			var reader = new FileReader();
			reader.onloadend = function(e) {
					filedata = e.target.result;
					self.uploadFile(filedata, filetype);
				}
			reader.readAsDataURL(blob);
        },

        // upload Media files
        uploadFile: function(filedata,filetype) {
            var xhr = new XMLHttpRequest();
			var config = this.config;
			
            //Might need more mimetypes than this, and 3gpp maynot work
            var ext="";
            switch(filetype){
                case "image/jpeg": ext = "jpg";break;
                case "image/png": ext = "png";break;
                case "audio/wav": ext = "wav";break;
                case "video/quicktime": ext = "mov";break;
                case "audio/mpeg3": ext = "mp3";break;
                case "audio/webm": ext = "webm";break;
                case "audio/x-mpeg-3": ext = "mp3";break;
                case "audio/mpeg3": ext = "mp3";break;
                case "audio/3gpp": ext = "3gpp";break;
                case "video/mpeg3": ext = "3gpp";break;
                case "video/mp4": ext = "mp4";break;
                case "video/webm": ext = "webm";break;
            }

            if(true){
                // create progress bar if we have a container for it
                var o_query = $("#" + config.widgetid + "_progress");
                //if we got one
                if(o_query.length){
                	//get the dom object so we can use direct manip.
                	var o = o_query.get(0);
                    var progress = o.firstChild;
                    if(progress==null){
                        progress = o.appendChild(document.createElement("p"));
                    }
                    //reset/set background position to 0, and label to "uploading
                    progress.className="";
                    progress.style.display = "block";
                    progress.style.backgroundPosition = "100% 0";

                    // progress bar
                    xhr.upload.addEventListener("progress", function(e) {
                        var pc = parseInt(100 - (e.loaded / e.total * 100));
                        progress.style.backgroundPosition = pc + "% 0";
                    }, false);
                }else{
                    var progress=false;
                }
            }
                
                this.Output("Uploading.");


                // file received/failed
                xhr.onreadystatechange = (function(mfp){return function(e) {

                    if (xhr.readyState == 4 ) {
                        if(progress){
                            progress.className = (xhr.status == 200 ? "success" : "failure");
                        }
                        if(xhr.status==200){
                            var resp = xhr.responseText;
                            var start= resp.indexOf("success<error>");
                            if (start<1){return;}
                            var end = resp.indexOf("</error>");
                            var filename= resp.substring(start+14,end);
                            

                            //invoke callbackjs if we have one, otherwise just update the control(default behav.)
                            if(config.callbackjs && config.callbackjs !=''){
                                var callbackargs  = new Array();
                                callbackargs[0]=config.widgetid;
                                callbackargs[1]="filesubmitted";
                                callbackargs[2]=filename;
                                callbackargs[3]=config.updatecontrol;
                              
                                mfp.Output( "File saved successfully.");
                                mfp.executeFunctionByName(config.callbackjs,window,callbackargs);

                            }else {
                                mfp.Output("File saved successfully.");
                                var upc = $('#' + config.updatecontrol);
                                if (upc.length > 0) {
                                    upc.get(0).value = filename;
                                }else{
                                	upc = window.parent.document.getElementById(config.updatecontrol);
                                	if(upc){
                                		upc.value = filename;
                                	}else{
                                    	mfp.Output( "File could not be uploaded.");
                                    }
                                }

                            }
                        }else{
                            mfp.Output( "File could not be uploaded.");
                        }
                    }
                }})(this);

                var params = "datatype=uploadfile";
                //We must URI encode the base64 filedata, because otherwise the "+" characters get turned into spaces
                //spent hours tracking that down ...justin 20121012
                params += "&paramone=" + encodeURIComponent(filedata);
                params += "&paramtwo=" + ext;
                
                //remove embedded html tags, keep it all in js Justin 20160614
                /*
                params += "&paramthree=" + $("#" + widgetid + "_mediatype").text();
                params += "&requestid=" + widgetid;
                params += "&contextid=" + $("#" + widgetid + "_contextid").text();
                params += "&component=" + $("#" + widgetid + "_component").text();
                params += "&filearea=" + $("#" + widgetid + "_filearea").text();
                params += "&itemid=" + $("#" + widgetid + "_itemid").text();
                */
                
                params += "&paramthree=" + config.mediatype;
                params += "&requestid=" + config.widgetid;
                params += "&contextid=" + config.p2;
                params += "&component=" + config.p3;
                params += "&filearea=" + config.p4;
                params += "&itemid=" + config.p5;
                
                //log.debug(params);
                log.debug(config);

                xhr.open("POST",config.posturl, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.setRequestHeader("Content-length", params.length);
                xhr.setRequestHeader("Connection", "close");
                xhr.send(params);
        },
            
        // output information
        Output: function(msg) {
            var m = $("#" + this.config.widgetid + "_messages");
            m.text(msg);
        },
            
            //function to call the callback function with arguments
        executeFunctionByName: function(functionName, context , args ) {

            //var args = Array.prototype.slice.call(arguments).splice(2);
            var namespaces = functionName.split(".");
            var func = namespaces.pop();
            for(var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }
            return context[func].call(this, args);
        }

    }//end of returned object
});//total end