/* jshint ignore:start */
define(['jquery','core/log'], function($, log) {

    "use strict"; // jshint ;_;

    log.debug('Filter PoodLL: utils initialising');

    return {

        whiteboards: [],
        whiteboardopts: [],
        timeouthandles: [],

       // Call Upload file from drawingboard a, first handle autosave bits and pieces
        WhiteboardUploadHandler: function(recid) {
            // Save button disabling a little risky db perm. fails publish "startdrawing" after mode change
            var savebutton = $('#' + recid + '_btn_upload_whiteboard')[0];
            savebutton.disabled=true;
            clearTimeout(this.timeouthandle);
            //call the file upload
            this.CallFileUpload(recid);
        },

        // Call Upload file from whiteboard canvas
        CallFileUpload: function(recid) {

            var wboard = this.whiteboards[recid];
            var cvs = null;
            var vectordata = "";
            if(recid.indexOf('drawingboard_')==0){
                cvs = wboard.canvas;
                var vectordata = JSON.stringify(wboard.history , null,2);
            }else{
                //we no longer use this LC technique, and will soon remove the css background logic
                if(this.whiteboardopts[recid]['bgimage']){
                    cvs = wboard.canvasWithBackground($('#' + recid + '_separate-background-image')[0]);
                }else{
                   cvs = wboard.getImage({});

                }
                //only LC has vector data it seems
                var vectordata = JSON.stringify(wboard.getSnapshot());
            }

            //stash vectordata
            if(this.whiteboardopts[recid]['vectorcontrol']){
                var vectorcontrol = $('#' + this.whiteboardopts[recid]['vectorcontrol']);
                if (vectorcontrol){
                    vectorcontrol[0].value = vectordata;
                }else{
                    log.debug('No vector control');
                }
            }

            //prepare the upload
            var filedata =  cvs.toDataURL().split(',')[1];
            var file = {type:  'image/png'};
            this.UploadFile(file, filedata,recid);
        },

        // handle audio/video/image file uploads for Mobile
        loadmobileupload: function(Y,opts) {

            //stash our Y for later use
            this.gyui = Y;

            //stash our opts array
            this.whiteboardopts[opts['recorderid']] = opts;

            var fileselect = this.getbyid(opts['recorderid'] + '_poodllfileselect');
            if(fileselect){
                fileselect.addEventListener("change", function(theopts) {
                    return function(e) {M.filter_poodll.FileSelectHandler(e, theopts); };
                } (opts) , false);
            }
        },

        // file selection
        FileSelectHandler: function(e,opts) {

            // fetch FileList object
            var files = e.target.files || e.dataTransfer.files;

            // process all File objects
            for (var i = 0, f; f = files[i]; i++) {
                this.ParseFile(f,opts);
            }
        },

        // output file information
        ParseFile: function(file,opts) {

            // start upload
            var filedata ="";
            var reader = new FileReader();
            reader.onloadend = function(e) {
                filedata = e.target.result;
                M.filter_poodll.UploadFile(file, filedata, opts['recorderid']);
            }
            reader.readAsDataURL(file);

        },


        // output information
        Output: function(recid,msg) {
            var m = $('#' + recid + '_messages')[0];
            //m.innerHTML = msg + m.innerHTML;
            m.innerHTML = msg;
        },

        // getElementById
        getbyid: function(id) {
            return document.getElementById(id);
        },

        // getElementById
        getbyidinparent: function(id) {
            return parent.document.$('#'+ id);
        },

        // upload Media files
        UploadFile: function(file, filedata,recid) {
            var opts = this.whiteboardopts[recid];
            var xhr = new XMLHttpRequest();

            //Might need more mimetypes than this, and 3gpp maynot work
            var ext="";
            switch(file.type){
                case "image/jpeg": ext = "jpg";break;
                case "image/png": ext = "png";break;
                case "video/quicktime": ext = "mov";break;
                case "audio/mpeg3": ext = "mp3";break;
                case "audio/x-mpeg-3": ext = "mp3";break;
                case "audio/mpeg3": ext = "mp3";break;
                case "audio/3gpp": ext = "3gpp";break;
                case "video/mpeg3": ext = "3gpp";break;
                case "video/mp4": ext = "mp4";break;
            }

            if(true){
                // create progress bar if we have a container for it
                var o = $('#' + recid + "_progress")[0];
                if(o!=null){
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
                this.Output(recid,"Uploading.");


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
                            if(opts['callbackjs'] && opts['callbackjs']!=''){
                                var callbackargs  = new Array();
                                callbackargs[0]=opts['recorderid'];
                                callbackargs[1]='filesubmitted';
                                callbackargs[2]=filename;
                                callbackargs[3]=opts['updatecontrol'];
                                //window[opts['callbackjs']](callbackargs);
                                mfp.Output(recid, "File saved successfully.");
                                mfp.executeFunctionByName(opts['callbackjs'],window,callbackargs);

                            }else {
                                mfp.Output(recid, "File saved successfully.");
                                var upcname = $('#' + recid + '_updatecontrol')[0].value;
                                var upc = $('#' + upcname);
                                if (!upc) {
                                    upc = mfp.getbyidinparent(upcname);
                                }
                                if (upc) {
                                    upc[0].value = filename;
                                }else{
                                    mfp.Output(recid, "File could not be uploaded.");
                                }

                            }
                        }else{
                            mfp.Output(recid, "File could not be uploaded.");
                        }
                    }
                }})(this);

                var params = "datatype=uploadfile";
                //We must URI encode the base64 filedata, because otherwise the "+" characters get turned into spaces
                //spent hours tracking that down ...justin 20121012
                params += "&paramone=" + encodeURIComponent(filedata);
                params += "&paramtwo=" + ext;
                params += "&paramthree=" + this.getbyid(recid + "_mediatype").value;
                params += "&requestid=" + recid;
                params += "&contextid=" + this.getbyid(recid + "_contextid").value;
                params += "&component=" + this.getbyid(recid + "_component").value;
                params += "&filearea=" + this.getbyid(recid + "_filearea").value;
                params += "&itemid=" + this.getbyid(recid + "_itemid").value;

                xhr.open("POST", this.getbyid(recid + "_fileliburl").value, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.setRequestHeader("Content-length", params.length);
                xhr.setRequestHeader("Connection", "close");
                xhr.send(params);
            }

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
    }
});