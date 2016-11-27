/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/uploader'], function($, log, uploader) {

    "use strict"; // jshint ;_;

    log.debug('Filter PoodLL: utils initialising');

    return {
		timeouthandles: [],
       // Call Upload file from drawingboard a, first handle autosave bits and pieces
        WhiteboardUploadHandler: function(recid,wboard,opts) {
            // Save button disabling a little risky db perm. fails publish "startdrawing" after mode change
            var savebutton = $('#' + recid + '_btn_upload_whiteboard')[0];
            savebutton.disabled=true;
            clearTimeout(this.timeouthandles[recid]);
            //call the file upload
            var cvs = this.getCvs(recid,wboard,opts);
            this.pokeVectorData(recid,wboard,opts);
            uploader.uploadFile(cvs.toDataURL(),'image');
        },        
        getCvs: function(recid,wboard){
            if(recid.indexOf('drawingboard_')==0){
                var cvs = wboard.canvas;
            }else{
            	var cvs =wboard.canvasForExport();
            }//end of of drawing board
            return cvs;
        },
        
        pokeVectorData: function(recid,wboard,opts){
          	var vectordata = "";
            if(recid.indexOf('drawingboard_')==0){
                vectordata = JSON.stringify(wboard.history , null,2);
            }else{
                //only LC has vector data it seems
                vectordata = JSON.stringify(wboard.getSnapshot());
            }//end of of drawing board
            
            //need to do the poke here
            if(typeof opts['vectorcontrol'] !== 'undefined' && opts['vectorcontrol'] !==''){
              $('#' + opts['vectorcontrol']).val(vectordata);
           }
        }//end of poke vectordata
    };
});