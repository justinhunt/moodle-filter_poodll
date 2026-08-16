<?php
/**
 * Created by PhpStorm.
 * User: ishineguy
 * Date: 2018/06/16
 * Time: 19:31
 */

namespace filter_poodll;

class constants {
    const MOD_FRANKY = 'filter_poodll';
    const M_COMP = 'filter_poodll';
    const M_COMPONENT = 'filter_poodll';
    // Leading slash so this can be appended to $CFG->wwwroot like every other Poodll plugin.
    const M_URL = '/filter/poodll';
    const M_PLUGINSETTINGS = '/admin/settings.php?section=filter_poodll_general';
    const M_DEFAULT_CLOUDPOODLL = 'cloud.poodll.com';

    // Chargebee details for the in-app free trial (see fetchcbpage.php).
    const M_CB_SITE = 'poodllcom';
    const M_CB_TRIAL_PRICEID = 'Poodll-Free-Trial-USD-Daily';

}
