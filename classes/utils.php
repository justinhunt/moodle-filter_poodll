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
 * Cloud Poodll token helpers, under the names the other Poodll plugins use for them.
 *
 * This filter keeps its token logic on the licensemanager instance. The shared credentials code
 * (see cbcredentials) expects the static utils::fetch_token()/fetch_token_error() pair that every
 * other Poodll plugin has, so this provides it rather than forking that code for this one plugin.
 *
 * @package    filter_poodll
 * @copyright  2026 Justin Hunt (poodllsupport@gmail.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class utils {
    /**
     * Fetch a Cloud Poodll token, from the cache when we can.
     *
     * @param string $apiuser
     * @param string $apisecret
     * @param bool $force refetch even if a cached token is still valid
     * @return \stdClass|bool the token object, or false if none could be fetched
     */
    public static function fetch_token($apiuser, $apisecret, $force = false) {
        $lm = new licensemanager();
        return $lm->fetch_token($apiuser, $apisecret, $force);
    }

    /**
     * Report what is wrong with a Cloud Poodll token, if anything.
     *
     * @param \stdClass|bool $token the token returned by fetch_token()
     * @return string the problem, or an empty string when the token is good
     */
    public static function fetch_token_error($token) {
        global $CFG;

        // Check the token authenticated at all.
        if (empty($token)) {
            return get_string(
                'novalidcredentials',
                constants::M_COMPONENT,
                $CFG->wwwroot . constants::M_PLUGINSETTINGS
            );
        }

        // Fetch the token details from the cache and check them over.
        $cache = \cache::make_from_params(\cache_store::MODE_APPLICATION, constants::M_COMPONENT, 'token');
        $tokenobject = $cache->get('recentpoodlltoken');

        // We should not get here if there is no token, but lets gracefully die (v unlikely).
        if (!($tokenobject)) {
            return get_string('notokenincache', constants::M_COMPONENT);
        }

        // We have an object but its no good, creds were wrong or something (v unlikely).
        if (!property_exists($tokenobject, 'token') || empty($tokenobject->token)) {
            return get_string('credentialsinvalid', constants::M_COMPONENT);
        }

        // If we do not have subs.
        if (!property_exists($tokenobject, 'subs') || empty($tokenobject->subs)) {
            return get_string('nosubscriptions', constants::M_COMPONENT);
        }

        // Is the filter authorised? The token lists the apps the subscription covers.
        if (empty($tokenobject->apps) || !in_array(constants::M_COMPONENT, $tokenobject->apps)) {
            return get_string('appnotauthorised', constants::M_COMPONENT);
        }

        // Just return empty if there is no error.
        return '';
    }
}
