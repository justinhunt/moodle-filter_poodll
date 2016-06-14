/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader'], function($, log, uploader) {

    "use strict"; // jshint ;_;

    log.debug('Filter PoodLL: utils initialising');

    return {

        whiteboards: [],
        whiteboardopts: [],
        timeouthandles: [],

       // Call Upload file from drawingboard a, first handle autosave bits and pieces
        WhiteboardUploadHandler: function(recid) {
            // Save button disabling a little risky db perm. fails publish "startdrawing" after mode change
            var savebutton = this.getbyid(recid + '_btn_upload_whiteboard');
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
                    cvs = wboard.canvasWithBackground(this.getbyid(recid + '_separate-background-image'));
                }else{
                   cvs = wboard.getImage({});

                }
                //only LC has vector data it seems
                var vectordata = JSON.stringify(wboard.getSnapshot());
            }

            //stash vectordata
            if(this.whiteboardopts[recid]['vectorcontrol']){
                var vectorcontrol = this.getbyid( this.whiteboardopts[recid]['vectorcontrol']);
                if (vectorcontrol){
                    vectorcontrol.value = vectordata;
                }else{
                   // log.debug('No vector control');
                   // log.debug(this.whiteboardopts[recid]['vectorcontrol']);
                }
            }

            //prepare the upload
            var filedata =  cvs.toDataURL().split(',')[1];
            var file = {type:  'image/png'};
            uploader.UploadFile(file, filedata,recid, this.whiteboardopts[recid]);
        },

        // getElementById
        getbyid: function(id) {
            id = "#" + id.replace( /(:|\.|\[|\]|,)/g, "\\$1" );
            var ret =$(id);
            if (ret && ret.length > 0){
                return ret[0];
            }else{
                ret =$(id,window.parent.document);
                if (ret && ret.length > 0) {
                    return ret[0];
                }else{
                    return null;
                }
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