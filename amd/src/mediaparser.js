/* jshint ignore:start */
define(['jquery', 'core/log'], function ($, log) {

    "use strict"; // jshint ;_;

    log.debug('Media Parser: initialising');

    return {
       parse:  function(containerid, mediatype) {
           var ret = {};
           ret.mediaurl = false;
           ret.lang = false;
           ret.subtitlesurl = false;
           ret.sources = false;
           ret.imgurl = false;

           //do we have an audio player?
           var originalplayer = $('#' + containerid + ' ' + mediatype).first();
           if (originalplayer.length === 1) {
               log.debug('processing player');
               ret.lang = $('#' + containerid + ' ' + mediatype + ' track[kind="captions"]').first().attr('srclang');
               ret.subtitlesurl = $('#' + containerid + ' ' + mediatype + ' track[kind="captions"]').first().attr('src');

               if (originalplayer.attr('src') !== undefined) {
                   ret.mediaurl = originalplayer.attr('src');
               } else {
                   ret.mediaurl = $('#' + containerid + ' ' + mediatype + ' source').first().attr('src');
               }
               ret.sources = $('#' + containerid + ' ' + mediatype + ' source');

             /*  log.debug(JSON.stringify(ret)); */
               //make sure moodle and poodll leave it alone from here on
               originalplayer.addClass('nomediaplugin');
               originalplayer.addClass('nopoodll');
           } else {

               //hopefully we have data attributes in the a link
               var originallink = $('#' + containerid + ' a').first();
               ret.mediaurl = originallink.attr('href');
               ret.lang = originallink.attr('data-lang');
               ret.subtitlesurl = originallink.attr('data-subtitles');
               ret.imgurl = originallink.attr('data-img');
               log.debug('processed link [1]');
               log.debug(JSON.stringify(ret));

               //but we might be in the old form where they were params on the url
               if (ret.subtitlesurl === undefined && ret.mediaurl.split('?').length > 0) {
                   log.debug('processing link [2]');
                   log.debug("looking at the URL");

                   var urlParams = new URLSearchParams(ret.mediaurl.split('?')[1]);
                   log.debug(ret.mediaurl.split('?')[1]);
                   log.debug(JSON.stringify(urlParams));

                   ret.subtitlesurl = urlParams.get('data-subtitles');
                   ret.lang = urlParams.get('data-language');
                   ret.mediaurl = ret.mediaurl.split('?')[0]
               }

               //make sure moodle and poodll leave it alone from here on
               originallink.addClass('nomediaplugin');
               originallink.addClass('nopoodll');
           }

           //do we have an image
           if(!ret.imgurl) {
               var originalimg = $('#' + containerid + ' img').first();
               if (originalimg.length === 1) {
                   ret.imgurl = originalimg.attr('src');
               }
           }

           //clean up a cachekiller (or other) URL Param if it still exists because it can block cors
           //there can be cross origin issues  if there are params, cos some templates use XHR, so just remove any params
           //all templates should declare are video/audio tag with crossorigin set to anonymous, not pure js with xhr
           ret.mediaurl = ret.mediaurl.split('?')[0]

           return ret; 
       }//end of parse function
    };//end of returned object
});//total end
