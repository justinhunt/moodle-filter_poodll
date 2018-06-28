/* jshint ignore:start */
define(['jquery', 'core/log',
    'filter_poodll/poodll_basemediaskin',
    'filter_poodll/poodll_burntrosemediaskin',
    'filter_poodll/poodll_onetwothreemediaskin',
    'filter_poodll/poodll_goldmediaskin',
    'filter_poodll/poodll_bmrmediaskin',
    'filter_poodll/poodll_shadowmediaskin',
    'filter_poodll/poodll_splitmediaskin',
    'filter_poodll/poodll_fbmediaskin',
    'filter_poodll/poodll_readaloudmediaskin',
    'filter_poodll/poodll_oncemediaskin'], function($, log, baseskin, burntroseskin, onetwothreeskin, goldskin, bmrskin, shadowskin,splitskin, fluencybuilderskin, readaloudskin,onceskin) {

    "use strict"; // jshint ;_;

    log.debug('PoodLL Media Skins: initialising');

    return {

        fetch_skin_clone: function(skinname) {
            var the_skin ="";

            switch (skinname) {
                case 'onetwothree':
                    the_skin = onetwothreeskin.clone();
                    break;
                case 'burntrose':
                    the_skin = burntroseskin.clone();
                    break;
                case 'gold':
                    the_skin = goldskin.clone();
                    break;
                case 'bmr':
                    the_skin = bmrskin.clone();
                    break;
                case 'fluencybuilder':
                    the_skin = fluencybuilderskin.clone();
                    break;
                case 'readaloud':
                    the_skin = readaloudskin.clone();
                    break;
                case 'shadow':
                    the_skin = shadowskin.clone();
                    break;
                case 'split':
                    the_skin = splitskin.clone();
                    break;
                case 'once':
                    the_skin = onceskin.clone();
                    break;
                case 'plain':
                case 'standard':
                default:
                    the_skin = baseskin.clone();
            }
            return the_skin;
        }

    };// end of returned object
});// total end