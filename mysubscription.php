<?php

require_once("../../config.php");
require_once($CFG->libdir . '/adminlib.php');

admin_externalpage_setup('mysubscription');

//detect if its a CSV or not
$exportcsv = optional_param('csv', 0, PARAM_INT);


//if we are exporting html, do that
echo $OUTPUT->header();
echo $OUTPUT->heading(get_string('mysubscription', 'filter_poodll'), 3);

$params=[];
$result = \filter_poodll\poodlltools::call_cloudpoodll('local_cpapi_fetch_user_report',$params);
$mysubdata=json_decode($result->returnMessage);
$reportdata=[];
$reportdata['usersites']=array_values((array)$mysubdata->usersites);
$reportdata['usersubs']=array_values((array)$mysubdata->usersubs);
echo $OUTPUT->render_from_template('filter_poodll/mysubscriptionreport', $reportdata);

echo $OUTPUT->footer();