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

/**
 * Saves the Cloud Poodll API credentials submitted from the in page credentials panel.
 *
 * @package    filter_poodll
 * @copyright  2026 Justin Hunt (poodllsupport@gmail.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(dirname(dirname(dirname(__FILE__))) . '/config.php');

use filter_poodll\cbcredentials;
use filter_poodll\constants;

$apiuser = required_param('apiuser', PARAM_TEXT);
$apisecret = required_param('apisecret', PARAM_TEXT);
$returnurl = optional_param('returnurl', '', PARAM_LOCALURL);

require_login(0, false);
$systemcontext = context_system::instance();
$PAGE->set_context($systemcontext);
$PAGE->set_url(constants::M_URL . '/cbsavecreds.php');

require_sesskey();
require_capability('moodle/site:config', $systemcontext);

if (empty($returnurl)) {
    $returnurl = $CFG->wwwroot . constants::M_PLUGINSETTINGS;
}

$error = cbcredentials::save($apiuser, $apisecret);
if (empty($error)) {
    redirect($returnurl, get_string('cbcredentialssaved', constants::M_COMPONENT), null, \core\output\notification::NOTIFY_SUCCESS);
} else {
    redirect($returnurl, $error, null, \core\output\notification::NOTIFY_ERROR);
}
