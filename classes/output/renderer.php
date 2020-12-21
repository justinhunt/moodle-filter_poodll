<?php
/**
 * Created by PhpStorm.
 * User: ishineguy
 * Date: 2018/06/26
 * Time: 13:16
 */

namespace filter_poodll\output;

use renderable;


class renderer extends \plugin_renderer_base implements renderable {



    public function display_usage_report($usagedata){
        $reportdata=[];

        $mysubscriptions = array();
        $mysubscription_name_txt = array();
        $mysubscriptions_names = array();

        foreach($usagedata->usersubs as $subdata){
            $subscription_name = ($subdata->subscriptionname == ' ') ? "na" : strtolower(trim($subdata->subscriptionname));
            $mysubscription_name_txt[] = $subscription_name;
            $mysubscriptions_names[] = $subscription_name;
            $mysubscriptions[] = array('name'=>$subscription_name,
                    'start_date'=>date("m-d-Y", $subdata->timemodified),
                    'end_date'=>date("m-d-Y", $subdata->expiredate));
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

        foreach($usagedata->usersubs_details as $subdatadetails){

            $timecreated =new \DateTime();
            $timecreated->setTimestamp($subdatadetails->timecreated);

            //if(($timecreated > strtotime('-180 days'))&&($timecreated <= strtotime('-365 days'))) {
            if(($timecreated <= strtotime('-365 days'))) {
                $threesixtyfive_recordtype_video += $subdatadetails->video_file_count;
                $threesixtyfive_recordtype_audio += $subdatadetails->audio_file_count;
                $threesixtyfive_recordmin += ($subdatadetails->audio_min + $subdatadetails->video_min);
                $threesixtyfive_record += ($subdatadetails->video_file_count + $subdatadetails->audio_file_count);
                $threesixtyfive_puser .= $subdatadetails->pusers;
            }

            //if(($timecreated > strtotime('-90 days'))&&($timecreated <= strtotime('-180 days'))){
            if(($timecreated <= strtotime('-180 days'))){
                $oneeighty_recordtype_video += $subdatadetails->video_file_count;
                $oneeighty_recordtype_audio += $subdatadetails->audio_file_count;
                $oneeighty_recordmin += ($subdatadetails->audio_min + $subdatadetails->video_min);
                $oneeighty_record += ($subdatadetails->video_file_count + $subdatadetails->audio_file_count);
                $oneeighty_puser .= $subdatadetails->pusers;
            }

            //if(($timecreated > strtotime('-30 days'))&&($timecreated <= strtotime('-90 days'))){
            if(($timecreated <= strtotime('-90 days'))){
                $ninety_recordtype_video += $subdatadetails->video_file_count;
                $ninety_recordtype_audio += $subdatadetails->audio_file_count;
                $ninety_recordmin += ($subdatadetails->audio_min + $subdatadetails->video_min);
                $ninety_record += ($subdatadetails->video_file_count + $subdatadetails->audio_file_count);
                $ninety_puser .= $subdatadetails->pusers;
            }

            if($timecreated <= strtotime('-30 days')){
                $thirty_recordtype_video += $subdatadetails->video_file_count;
                $thirty_recordtype_audio += $subdatadetails->audio_file_count;
                $thirty_recordmin += ($subdatadetails->audio_min + $subdatadetails->video_min);
                $thirty_record += ($subdatadetails->video_file_count + $subdatadetails->audio_file_count);
                $thirty_puser .= $subdatadetails->pusers;
            }

        }//end of for loop


        //calculate report summaries
        $reportdata['pusers']=array_values(array(
                array('name'=>'30','value'=>$this->count_pusers($thirty_puser)),
                array('name'=>'90','value'=>$this->count_pusers($ninety_puser)),
                array('name'=>'180','value'=>$this->count_pusers($oneeighty_puser)),
                array('name'=>'365','value'=>$this->count_pusers($threesixtyfive_puser))
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

        $plugin_types_arr = [];

        foreach($usagedata->usersubs_details as $subdatadetails){
            $json_arr = json_decode($subdatadetails->file_by_app,TRUE);
            foreach($json_arr as $key => $val) {
                $label = $key;
                $val = $json_arr[$key]['audio']+$json_arr[$key]['video'];
                if(isset($plugin_types_arr[$label])) {
                    $plugin_types_arr[$label] += $val;
                }else{
                    $plugin_types_arr[$label] = $val;
                }
            }
        }

        echo $this->output->render_from_template('filter_poodll/mysubscriptionreport', $reportdata);

        if ($reportdata['subscription_check'] == true){
            $plugin_types = new \core\chart_series('Plugin Usage', array_values($plugin_types_arr));
            $pchart = new \core\chart_pie();
            $pchart->add_series($plugin_types);
            $pchart->set_labels(array_keys($plugin_types_arr));
            echo $this->output->heading(get_string('per_plugin', 'filter_poodll'), 4);
            echo $this->output->render($pchart);
        }
    }

    //Count the unique users from CSV list of users
    public function count_pusers($pusers){
        $pusers=trim($pusers);
        return count(array_unique(explode(',',$pusers)));

    }

}