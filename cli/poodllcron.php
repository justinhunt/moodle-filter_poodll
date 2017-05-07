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
 * CLI cron
 *
 * This script looks through all the module directories for cron.php files
 * and runs them.  These files can contain cleanup functions, email functions
 * or anything that needs to be run on a regular basis.
 *
 * @package    filter
 * @subpackage poodll
 * @copyright  2017 Justin Hunt (https://poodll.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('CLI_SCRIPT', true);

require(__DIR__.'../../../../config.php');
require_once($CFG->libdir.'/clilib.php');      // cli only functions
require_once($CFG->libdir.'/cronlib.php');

// now get cli options
list($options, $unrecognized) = cli_get_params(array('help'=>false),
                                               array('h'=>'help'));

if ($unrecognized) {
    $unrecognized = implode("\n  ", $unrecognized);
    cli_error(get_string('cliunknowoption', 'admin', $unrecognized));
}

if ($options['help']) {
    $help =
"Execute periodic cron actions.

Options:
-h, --help            Print out this help

Example:
\$sudo -u www-data /usr/bin/php filter/poodll/cli/cron.php
";

    echo $help;
    die;
}

// execute all the waiting Poodll move tasks

$taskclassname= '\filter_poodll\task\adhoc_s3_move';
$starttime=time();
$tr = new \filter_poodll\taskrunner($taskclassname,$starttime);
$tr->run_all_tasks();


//execute a specific task by outfilename, if it exists
/*
$taskclassname= '\filter_poodll\task\adhoc_s3_move';
$starttime=false;
$tr = new \filter_poodll\taskrunner($taskclassname,$starttime);
$tr->run_task_by_filename('poodllfile590ea2c1090581.mp4');
*/