/* jshint ignore:start */
define(['jquery','core/log', 'filter_poodll/utils_amd', 'filter_poodll/drawingboard'], function($, log, utils, db) {

    "use strict"; // jshint ;_;

    log.debug('Filter PoodLL: drawingboard.js initialising');

    return {


        // load drawingboard whiteboard for Moodle
        loaddrawingboard: function(Y,opts) {

            //stash our opts array
            utils.whiteboardopts[opts['recorderid']] = opts;


            if(opts['bgimage'] ){
                var erasercolor = 'transparent';
            }else{
                var erasercolor = 'background';
                opts['bgimage'] = '#FFF';
            }

            // load the whiteboard and save the canvas reference
            var db = new DrawingBoard.Board(opts['recorderid'] + '_drawing-board-id',{
                recorderid: opts['recorderid'],
                size: 3,
                background: opts['bgimage'],
                controls: ['Color',
                    { Size: { type: 'auto' } },
                    { DrawingMode: { filler: false,eraser: true,pencil: true } },
                    'Navigation'
                ],
                droppable: true,
                webStorage: false,
                enlargeYourContainer: true,
                eraserColor: erasercolor
            });

            //stash our whiteboard
            utils.whiteboards[opts['recorderid']] = db;

            //restore vectordata
            var vectordata = opts['vectordata'];
            if(vectordata){
                //dont do anything if its not JSON (ie it coule be from LC)
                if(vectordata.indexOf('{"shapes"')!=0){
                    db.history = Y.JSON.parse(vectordata);
                    db.setImg(db.history.values[db.history.position-1]);
                }
            }

            //register events. if autosave we need to do more.
            if(opts['autosave']){
                //autosave, clear messages and save callbacks on start drawing
                db.ev.bind('board:startDrawing', (function(mfp,recid){
                        return function(){
                            var m = document.getElementById(recid + '_messages');
                            if(m){
                                m.innerHTML = 'File has not been saved.';
                                var savebutton = document.getElementById(recid + '_btn_upload_whiteboard');
                                savebutton.disabled=false;
                                var th = utils.timeouthandles[recid];
                                if(th){clearTimeout(th);}
                            }
                        }
                    })(this,opts['recorderid'])
                );

                //autosave, clear previous callbacks,set new save callbacks on stop drawing
                db.ev.bind('board:stopDrawing', (function(mfp,recid){
                        return function(){
                            var m = document.getElementById(recid + '_messages');
                            if(m){
                                var th = utils.timeouthandles[recid];
                                if(th){clearTimeout(th);}
                                utils.timeouthandles[recid] = setTimeout(
                                    function(){ utils.WhiteboardUploadHandler(recid);},
                                    utils.whiteboardopts[recid]['autosave']);
                            }
                        }
                    })(this,opts['recorderid'])
                );


            }else{
                db.ev.bind('board:stopDrawing', (function(mfp,recid){
                        return function(){
                            var m = document.getElementById(recid + '_messages');
                            if(m){
                                m.innerHTML = 'File has not been saved.';
                            }
                        }
                    })(this,opts['recorderid'])
                );
            }


            //set up the upload/save button
            var uploadbutton = utils.getbyid(opts['recorderid'] + '_btn_upload_whiteboard');
            if(uploadbutton){
                if(opts['autosave']){
                    uploadbutton.addEventListener("click", function(){utils.WhiteboardUploadHandler(opts['recorderid']);}, false);
                }else{
                    uploadbutton.addEventListener("click", function(){utils.CallFileUpload(opts['recorderid']);}, false);
                }
            }

        }


    }
});