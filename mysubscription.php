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

$mysubscriptions = array();
$mysubscription_name_txt = array();
$mysubscriptions_names = array();

foreach($mysubdata->usersubs as $subdata){
    $subscription_name = ($subdata->subscriptionname == ' ') ? "na" : strtolower(trim($subdata->subscriptionname));
    $subscription_name = str_replace(array('-','(',')',' ','__'),'_',$subscription_name);
    $subscription_name = 'ppn_'.$subscription_name;
    $subscription_name = rtrim($subscription_name, "_");
    
    $mysubscription_name_txt[] = get_string($subscription_name,'filter_poodll');
    $mysubscriptions_names[] = get_string($subscription_name,'filter_poodll'); 
    $mysubscriptions[] = array('name'=>get_string($subscription_name,'filter_poodll'),'start_date'=>date("m-d-Y", $subdata->timemodified),'end_date'=>date("m-d-Y", $subdata->expiredate));
}

$reportdata['subscription_check'] = false;
if(count($mysubscriptions)>0){
    $reportdata['subscription_check']= true;
} else {
    $reportdata['subscription_check']= false;
}

$reportdata['subscriptions']=$mysubscriptions;

$reportdata['pusers']=array();
$reportdata['record']=array();
$reportdata['recordmin']=array();
$reportdata['recordtype']=array();

$threesixtyfive_recordtype_video = 0;
$oneeighty_recordtype_video = 0;
$ninety_recordtype_video = 0;
$thirty_recordtype_video = 0;

$threesixtyfive_recordtype_audio = 0;
$oneeighty_recordtype_audio = 0;
$ninety_recordtype_audio = 0;
$thirty_recordtype_audio = 0;

$threesixtyfive_recordmin = 0;
$oneeighty_recordmin = 0;
$ninety_recordmin = 0;
$thirty_recordmin = 0;

$threesixtyfive_record = 0;
$oneeighty_record = 0;
$ninety_record = 0;
$thirty_record = 0;

$threesixtyfive_puser = 0;
$oneeighty_puser = 0;
$ninety_puser = 0;
$thirty_puser = 0;

$plugin_types_arr = "[";

foreach($mysubdata->usersubs_details as $subdatadetails){
  
   if((strtotime($subdatadetails->timecreated) > strtotime('-180 days'))&&(strtotime($subdatadetails->timecreated) <= strtotime('-365 days'))) {
       $threesixtyfive_recordtype_video += $subdatadetails->video_file_count;
       $threesixtyfive_recordtype_audio += $subdatadetails->audio_file_count;
       $threesixtyfive_recordmin += ($subdatadetails->audio_min + $subdatadetails->video_min);
       $threesixtyfive_record += ($subdatadetails->video_file_count + $subdatadetails->audio_file_count);
       $threesixtyfive_puser += $subdatadetails->puser_count;
   }
   
   if((strtotime($subdatadetails->timecreated) > strtotime('-90 days'))&&(strtotime($subdatadetails->timecreated) <= strtotime('-180 days'))){
       $oneeighty_recordtype_video += $subdatadetails->video_file_count;
       $oneeighty_recordtype_audio += $subdatadetails->audio_file_count;
       $oneeighty_recordmin += ($subdatadetails->audio_min + $subdatadetails->video_min);
       $oneeighty_record += ($subdatadetails->video_file_count + $subdatadetails->audio_file_count);
       $oneeighty_puser += $subdatadetails->puser_count;
   }
   
   if((strtotime($subdatadetails->timecreated) > strtotime('-30 days'))&&(strtotime($subdatadetails->timecreated) <= strtotime('-90 days'))){
       $ninety_recordtype_video += $subdatadetails->video_file_count;
       $ninety_recordtype_audio += $subdatadetails->audio_file_count;
       $ninety_recordmin += ($subdatadetails->audio_min + $subdatadetails->video_min);
       $ninety_record += ($subdatadetails->video_file_count + $subdatadetails->audio_file_count);
       $ninety_puser += $subdatadetails->puser_count;
 }
   
   if(strtotime($subdatadetails->timecreated) <= strtotime('-30 days')){
     $thirty_recordtype_video += $subdatadetails->video_file_count;
     $thirty_recordtype_audio += $subdatadetails->audio_file_count;
     $thirty_recordmin += ($subdatadetails->audio_min + $subdatadetails->video_min);
     $thirty_record += ($subdatadetails->video_file_count + $subdatadetails->audio_file_count);
     $thirty_puser += $subdatadetails->puser_count;
   }
   
    $reportdata['pusers']=array_values(array(
        array('name'=>'30','value'=>$thirty_puser),
        array('name'=>'90','value'=>$ninety_puser),
        array('name'=>'180','value'=>$oneeighty_puser),
        array('name'=>'365','value'=>$threesixtyfive_puser)
        ));

    $reportdata['record']=array_values(array(
        array('name'=>'30','value'=>$thirty_record),
        array('name'=>'90','value'=>$ninety_record),
        array('name'=>'180','value'=>$oneeighty_record),
        array('name'=>'365','value'=>$threesixtyfive_record)
        ));

    $reportdata['recordmin']=array_values(array(
        array('name'=>'30','value'=>$thirty_recordmin),
        array('name'=>'90','value'=>$ninety_recordmin),
        array('name'=>'180','value'=>$oneeighty_recordmin),
        array('name'=>'365','value'=>$threesixtyfive_recordmin)
        ));

    $reportdata['recordtype']=array_values(array(
        array('name'=>'30','video'=>$thirty_recordtype_video,'audio'=>$thirty_recordtype_audio),
        array('name'=>'90','video'=>$ninety_recordtype_video,'audio'=>$ninety_recordtype_audio),
        array('name'=>'180','video'=>$oneeighty_recordtype_video,'audio'=>$oneeighty_recordtype_audio),
        array('name'=>'365','video'=>$threesixtyfive_recordtype_video,'audio'=>$threesixtyfive_recordtype_audio),
         ));
   
}

$plugin_types_arr = [];

foreach($mysubdata->usersubs_details as $subdatadetails){
        $json_arr = json_decode($subdatadetails->file_by_app,TRUE);
        foreach($json_arr as $key => $val) {
            $target_name = 'ppn_'.$key;
            $target_name_translated = get_string($target_name,'filter_poodll');
            if(in_array($target_name_translated, $mysubscriptions_names)) {
                $idx_val = array_search($target_name_translated, $mysubscriptions_names);
                $val = $json_arr[$key][0]['audio']+$json_arr[$key][0]['video'];
                $plugin_types_arr[$idx_val] += $val;
            } 
        }
}


echo $OUTPUT->render_from_template('filter_poodll/mysubscriptionreport', $reportdata);

if ($reportdata['subscription_check'] == true){
    $plugin_types = new core\chart_series('Plugin Usage', $plugin_types_arr);
    $pchart = new \core\chart_pie();
    $pchart->add_series($plugin_types); 

    $pchart->set_labels($mysubscriptions_names);
    
    echo $OUTPUT->heading(get_string('per_plugin', 'filter_poodll'), 4);
    echo $OUTPUT->render($pchart);
}

echo $OUTPUT->footer();
