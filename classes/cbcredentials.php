<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace filter_poodll;

/**
 * In-app management of the Cloud Poodll API credentials.
 *
 * This gathers everything needed to let an administrator set the API user and secret without
 * leaving their own Moodle site: finding credentials already in use by a sibling Poodll plugin,
 * saving them, and pointing at the Chargebee free trial page (fetchcbpage.php) when there are
 * none to be found.
 *
 * It is deliberately self contained so it can be ported to the other Poodll plugins by changing
 * only the namespace: the plugin it belongs to is reached through constants::M_COMPONENT,
 * constants::M_URL, constants::M_PLUGINSETTINGS and utils::fetch_token()/fetch_token_error().
 *
 * @package    filter_poodll
 * @copyright  2026 Justin Hunt (poodllsupport@gmail.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class cbcredentials {
    /**
     * Other Poodll components that may already hold credentials on this site, and the names of
     * the settings they keep them in. This lists every Poodll component, including whichever one
     * we belong to; find_elsewhere() skips ourselves, so the list stays the same in every plugin.
     */
    const CP_COMPONENTS = [
        'filter_poodll' => ['cpapiuser', 'cpapisecret'],
        'mod_englishcentral' => ['poodllapiuser', 'poodllapisecret'],
        'qtype_cloudpoodll' => ['apiuser', 'apisecret'],
        'mod_readaloud' => ['apiuser', 'apisecret'],
        'mod_minilesson' => ['apiuser', 'apisecret'],
        'mod_wordcards' => ['apiuser', 'apisecret'],
        'mod_solo' => ['apiuser', 'apisecret'],
        'mod_pchat' => ['apiuser', 'apisecret'],
        'atto_cloudpoodll' => ['apiuser', 'apisecret'],
        'tinymce_cloudpoodll' => ['apiuser', 'apisecret'],
        'tiny_poodll' => ['apiuser', 'apisecret'],
        'assignsubmission_cloudpoodll' => ['apiuser', 'apisecret'],
        'assignfeedback_cloudpoodll' => ['apiuser', 'apisecret'],
    ];

    /** @var string element id of the API user field on the credentials panel. */
    const PANEL_APIUSER_ID = 'filter_poodll_cbapiuser';

    /** @var string element id of the API secret field on the credentials panel. */
    const PANEL_APISECRET_ID = 'filter_poodll_cbapisecret';

    /**
     * The names of the settings this plugin keeps its own credentials in, taken from the map above
     * so that this file needs no per plugin editing. Most plugins use apiuser/apisecret, but
     * filter_poodll uses cpapiuser/cpapisecret and mod_englishcentral uses another pair again.
     *
     * @return array [name of the API user setting, name of the API secret setting]
     */
    protected static function our_settings(): array {
        return self::CP_COMPONENTS[constants::M_COMPONENT] ?? ['apiuser', 'apisecret'];
    }

    /**
     * Does this plugin have both an API user and secret set?
     *
     * @return bool
     */
    public static function has_credentials(): bool {
        [$apiuserkey, $apisecretkey] = self::our_settings();
        $config = get_config(constants::M_COMPONENT);
        return !empty($config->$apiuserkey) && !empty($config->$apisecretkey);
    }

    /**
     * Is there anything wrong with this site's credentials? Covers both credentials that were
     * never set and credentials that Cloud Poodll rejects, since the fix is the same in both cases.
     *
     * The token is cached, so this does not make a web call on every page load.
     *
     * @return string the problem, or an empty string when the credentials are good
     */
    public static function credentials_error(): string {
        [$apiuserkey, $apisecretkey] = self::our_settings();
        $config = get_config(constants::M_COMPONENT);
        if (empty($config->$apiuserkey) || empty($config->$apisecretkey)) {
            return get_string('cbnocredentialsset', constants::M_COMPONENT);
        }
        $token = utils::fetch_token($config->$apiuserkey, $config->$apisecretkey);
        return utils::fetch_token_error($token);
    }

    /**
     * Can the current user set the credentials? They are site level settings, so this is
     * administrators only.
     *
     * @return bool
     */
    public static function can_manage(): bool {
        return has_capability('moodle/site:config', \context_system::instance());
    }

    /**
     * Fetch credentials already in use by another Poodll plugin on this site.
     *
     * @return array|null ['apiuser' => string, 'apisecret' => string] or null if none were found
     */
    public static function find_elsewhere(): ?array {
        foreach (self::CP_COMPONENTS as $component => [$apiusersetting, $apisecretsetting]) {
            if ($component === constants::M_COMPONENT) {
                continue;
            }
            $apiuser = get_config($component, $apiusersetting);
            if (empty($apiuser)) {
                continue;
            }
            $apisecret = get_config($component, $apisecretsetting);
            if (empty($apisecret)) {
                continue;
            }
            return ['apiuser' => trim($apiuser), 'apisecret' => trim($apisecret)];
        }
        return null;
    }

    /**
     * Save the credentials and check them against Cloud Poodll.
     *
     * The token cache is refreshed by force because fetch_token() only refetches when the API
     * user changes, and here the secret may have changed on its own.
     *
     * @param string $apiuser
     * @param string $apisecret
     * @return string an error message if the credentials were rejected, otherwise an empty string
     */
    public static function save(string $apiuser, string $apisecret): string {
        [$apiuserkey, $apisecretkey] = self::our_settings();
        $apiuser = trim($apiuser);
        $apisecret = trim($apisecret);
        set_config($apiuserkey, $apiuser, constants::M_COMPONENT);
        set_config($apisecretkey, $apisecret, constants::M_COMPONENT);

        if (empty($apiuser) || empty($apisecret)) {
            return get_string('nocredentialsentered', constants::M_COMPONENT);
        }

        $token = utils::fetch_token($apiuser, $apisecret, true);
        return utils::fetch_token_error($token);
    }

    /**
     * Data for the buttons shown under the credentials fields: "fill from elsewhere on this site"
     * if we found credentials, otherwise "get a free trial".
     *
     * The field selectors are passed through to the template because the fields live on the admin
     * settings page in one case and on the credentials panel in the other.
     *
     * @param string $apiuserselector CSS selector of the API user field to fill
     * @param string $apisecretselector CSS selector of the API secret field to fill
     * @return array template context
     */
    public static function export_buttons_data(string $apiuserselector, string $apisecretselector): array {
        global $CFG;

        $data = [
            'apiuserselector' => $apiuserselector,
            'apisecretselector' => $apisecretselector,
            'fetchcbpageurl' => $CFG->wwwroot . constants::M_URL . '/fetchcbpage.php',
            'foundcreds' => false,
        ];

        $found = self::find_elsewhere();
        if ($found) {
            $data['foundcreds'] = true;
            $data['apiuser'] = $found['apiuser'];
            $data['apisecret'] = $found['apisecret'];
        }
        return $data;
    }

    /**
     * Data for the full credentials panel (fields + save button + buttons above).
     *
     * @param \moodle_url|string $returnurl where to send the user after saving
     * @param string $errormessage what is currently wrong with the credentials, if anything
     * @return array template context
     */
    public static function export_panel_data($returnurl, string $errormessage = ''): array {
        global $CFG;

        [$apiuserkey, $apisecretkey] = self::our_settings();
        $config = get_config(constants::M_COMPONENT);
        $data = self::export_buttons_data('#' . self::PANEL_APIUSER_ID, '#' . self::PANEL_APISECRET_ID);
        $data['formaction'] = $CFG->wwwroot . constants::M_URL . '/cbsavecreds.php';
        $data['sesskey'] = sesskey();
        $data['returnurl'] = $returnurl instanceof \moodle_url ? $returnurl->out(false) : $returnurl;
        $data['apiuserid'] = self::PANEL_APIUSER_ID;
        $data['apisecretid'] = self::PANEL_APISECRET_ID;
        $data['currentapiuser'] = empty($config->$apiuserkey) ? '' : $config->$apiuserkey;
        $data['currentapisecret'] = empty($config->$apisecretkey) ? '' : $config->$apisecretkey;
        $data['settingsurl'] = $CFG->wwwroot . constants::M_PLUGINSETTINGS;
        $data['errormessage'] = $errormessage;
        return $data;
    }
}
