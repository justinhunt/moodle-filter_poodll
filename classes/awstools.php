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

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/filter/poodll/3rdparty/aws/aws-autoloader.php');

use Aws\ElasticTranscoder\ElasticTranscoderClient;
use Aws\S3\S3Client;

/**
 *
 * This is a class for working with AWS
 *
 * @package   filter_poodll
 * @since      Moodle 2.7
 * @copyright  2014 Justin Hunt
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class awstools
{
	protected $transcoder = false; //the single transcoder object
	protected $s3client = false; //the single transcoder object
	protected $default_segment_size = 4;
	protected $region = 'ap-northeast-1';
        protected $convfolder = 'transcoded/';
    protected $accesskey ='';
    protected $secretkey='';
	protected $pipeline_video ='1467090278549-scfvbk'; //standard-transcoding-pipeline
	protected $pipeline_audio ='1467090404312-4yquey'; //standard-transcoding-pipeline
	protected $bucket_video_archive ='poodll-video-process-archive'; //video archive bucket
	protected $bucket_video_in ='poodll-videoprocessing-in'; //video in bucket
	protected $bucket_video_out ='poodll-videoprocessing-out'; //video out bucket
	protected $bucket_audio_in ='poodll-audioprocessing-in'; //audio in bucket
	protected $bucket_audio_out ='poodll-audioprocessing-out'; //audio out bucket
	protected $bucket_audio_archive ='poodll-audioprocessing-archive'; //audio archive
	protected $bucket_thumbnails ='poodll-video-thumbs'; //video thumbs bucket
	protected $bucket_production ='poodll-pickup'; //web accessible bucket
	protected $preset_mp3 = "1467090564863-tc7k8e";
	protected $preset_mp4 = "1467090505514-0gibkw";
	protected $thumbnail_preset = '1467090505514-0gibkw'; //thumbnail size is set to preset size so use 720p preset to get a bigger thumbnail. 

	 /**
     * Constructor
     */
    public function __construct($accesskey,$secretkey) {
        $this->accesskey = $accesskey;
		$this->secretkey = $secretkey;

    }
	
/**
*
*
*  TRANSCODING CODE STARTS HERE
*
*/
		
		
	 //fetch or create the transcoder object 
	function fetch_transcoder(){
            global $CFG;
		if(!$this->transcoder){
			$this->transcoder = ElasticTranscoderClient::factory(
			array('region' => $this->region, 
                            'version'=>'2012-09-25',
                            'default_caching_config' => $CFG->tempdir . '/tmp',
			   'credentials'=>array('key' => $this->accesskey, 'secret' => $this->secretkey)));
		}
		return $this->transcoder;
	}
        
        public static function fetch_s3_filename($mediatype, $filename){
            global $CFG,$USER;
            $s3filename =$CFG->wwwroot . '/' . $USER->sesskey . '/' . $mediatype . '/' . $filename;
            $s3filename = mb_ereg_replace("([^\w\s\d\-_~,;\[\]\(\).])", '', $s3filename);
            // Remove any runs of periods (thanks falstro!)
            $s3filename = mb_ereg_replace("([\.]{2,})", '', $s3filename);       
            return $s3filename;
        }

	
	//create a single job
	function create_one_transcoding_job($mediatype, $input_key,$output_key) {
	
		$transcoder_client = $this->fetch_transcoder();
	
		//create the output prefix
		$output_key_prefix = $this->convfolder;
//		echo 'creating transcoding job:' . PHP_EOL;

		
		  # Setup the job input using the provided input key.
		  $input = array('Key' => $input_key);


		  # Specify the outputs based on the hls presets array spefified.
		  $outputs = array();
		  switch($mediatype){
		  	case 'audio':
		  		$pipeline_id= $this->pipeline_audio;
		  		$one_output = array('Key'=> $output_key, 'PresetId' =>$this->preset_mp3);
		  		$outputs[] = $one_output;
		  		break;
		  	case 'video':
		  		$pipeline_id= $this->pipeline_video;
		  		$one_output = array('Key'=> $output_key, 'PresetId' =>$this->preset_mp4);
		  		$outputs[] = $one_output;
		  		break;
		  }

		  # Create the job.
		  $create_job_request = array(
				'PipelineId' => $pipeline_id, 
				'Input' => $input, 
				'Outputs' => $outputs, 
				'OutputKeyPrefix' => $output_key_prefix
		  );
		  $create_job_result = $transcoder_client->createJob($create_job_request)->toArray();
		  return $job = $create_job_result['Job'];
	}   
    
	
        /**
        *
        *
        *  COMMON CODE STARTS HERE
        *
        */

        function does_file_exist($mediatype, $filename, $in_out='in'){
		$s3client= $this->fetch_s3client();
		$bucket='';
		switch($mediatype){
		 case 'audio':
		 	if($in_out == 'out'){
		 		$bucket =$this->bucket_audio_out;
		 	}else{
		 		$bucket =$this->bucket_audio_in;
		 	}
		 	break;
		 
		 case 'video':
		 	if($in_out == 'out'){
		 		$bucket =$this->bucket_video_out;
		 	}else{
		 		$bucket =$this->bucket_video_in;
		 	}
		 	break;
		}
		//return $s3client->if_object_exists($bucket,$filename);		
                return $s3client->doesObjectExist($bucket,$filename);		
        }

        function fetch_s3_converted_file($mediatype,$s3filename,$filename,$filerecord){
           global $CFG;
            if($this->does_file_exist($mediatype, $this->convfolder . $s3filename,'out')){
                $tempfilepath = $CFG->tempdir . "/" . $filename;
                $this->save_converted_to_file($mediatype,$s3filename, $tempfilepath);
                return $tempfilepath;
            }else{
                if(!$this->does_file_exist($mediatype,$s3filename,'in')){
                    //if we do not even have an input file then just return, somethings wrong
                    //but it can not be fixed
                    return false;
                }else{
                    return true;
                }
            }
            
        }
//fetch or create the transcoder object 
	function fetch_s3client(){
		if(!$this->s3client){
			$this->s3client = S3Client::factory(array(
			'region'=>$this->region,
			'version'=>'2006-03-01',
			'credentials' => 
				array('key' => $this->accesskey, 'secret' => $this->secretkey)));
		}
		return $this->s3client;
	}
	
	function save_converted_to_file($mediatype,$filename,$filepath){
		$s3client = $this->fetch_s3client();
		$bucket = '';
		switch($mediatype){
			case 'audio':
				$bucket=$this->bucket_audio_out;
				break;
			case 'video':
				$bucket=$this->bucket_video_out;
				break;
		}
		 $s3client->getObject(array(
   			 'Bucket' => $bucket,
    		'Key'    => $this->convfolder . $filename,
    		'SaveAs' => $filepath
		));
                 return true;
	}
	
	function get_presigned_download_url($mediatype,$minutes=30,$key){
		$s3client = $this->fetch_s3client();
		//Get bucket
		$bucket='';
		$key= 'convertedmedia/' . $key;
		switch($mediatype){
			case 'audio':
				$bucket=$this->bucket_audio_out;
				break;
			case 'video':
				$bucket=$this->bucket_video_out;
				break;
		}
		//options
		$options = array();
		$options['Bucket']=$bucket;
		$options['Key']=$key;
		
		$cmd = $s3client->getCommand('GetObject', $options);
		$request = $s3client->createPresignedRequest($cmd, '+' . $minutes .' minutes');
		$theurl = (string) $request->getUri();
		return $theurl;
	}

	function get_presigned_upload_url($mediatype,$minutes=30,$key){
		$s3client = $this->fetch_s3client();
		//Get bucket
		$bucket='';
		switch($mediatype){
			case 'audio':
				$bucket=$this->bucket_audio_in;
				break;
			case 'video':
				$bucket=$this->bucket_video_in;
				break;
		}
		//options
		$options = array();
		$options['Bucket']=$bucket;
		$options['Key']=$key;
		$options['Body']='';
		//$options['ContentMD5']=false;
		$options['ContentType']='application/octet-stream';
		
		$cmd = $s3client->getCommand('PutObject', $options);
		$request = $s3client->createPresignedRequest($cmd, '+' . $minutes .' minutes');
		$theurl = (string) $request->getUri();
		return $theurl;
	}
	
	// list one bucket files
	function iterate_bucket_listing($thebucket){
	
		$s3client = $this->fetch_s3client();
		$objects = $s3client->getIterator('ListObjects', array(
			'Bucket' => $thebucket,
			'Prefix' => ''
		));
		
		//echo 'listing :' . $objects->count() . ' files' . PHP_EOL;
		foreach ($objects as $object) {
		    $filename = $object['Key'] ;
    		//do something here ....
			//echo 'file:' . $filename . PHP_EOL;
    	}			
	}
	
		
	function s3copy($sourcebucket, $sourceitemname, $targetbucket,$targetitemname, $ispublic=false){
		$s3client = $this->fetch_s3client();
		
		//delete if it exists 
		if($s3client->doesObjectExist($targetbucket,$targetitemname)){
				 echo  "deleting";
				 $this->s3remove($targetbucket,$targetitemname);
		 }
		
		//do the copy 
		$acl = $ispublic ? 'public-read' : 'private';
		$s3client->copyObject(array(
			'Bucket'     => $targetbucket,
			'Key'        => $targetitemname,
			'CopySource' => "{$sourcebucket}/{$sourceitemname}",
			'ACL' => $acl
		));
	}
	
	function s3remove($bucket, $itemname){
		$s3client = $this->fetch_s3client();
		$s3client->deleteObject(array(
			'Bucket'     => $bucket,
			'Key'        => $itemname,
		));
	}
		
	//post process transcoded files
	function s3copy_folder($sourcebucket, $sourceitemname, $targetbucket,$targetitemname, $ispublic=false){
	
		$s3client = $this->fetch_s3client();
		$objects = $s3client->getIterator('ListObjects', array(
			'Bucket' => $sourcebucket,
			'Prefix' => $sourceitemname
		));
	
		//get the folder name .. should be a better way .. but tired ..
		$partsarray = split('/',$sourceitemname);
		array_pop($partsarray);
		$foldername = array_pop($partsarray);
		
		//loop through all the objects and copy them
		//then delete them!!!!
		foreach ($objects as $object) {
			$filename = str_replace($sourceitemname, '',$object['Key']);
		//	echo 'lets copy object:' . $filename .  PHP_EOL ;	
		//	echo 'targetbucket:' . $targetbucket .  PHP_EOL ;
		//	echo 'targetitemname:' . $targetitemname .  PHP_EOL ;
    		$this->s3copy($sourcebucket, $sourceitemname  . $filename, 
    			$targetbucket,$targetitemname  . $foldername . '/' . $filename, $ispublic);
		}
		//echo 'folder copied:' . $targetitemname . PHP_EOL ;	
		
	}
	
		//post process transcoded files
	function s3remove_folder($bucket, $itemname){
	
		$s3client = $this->fetch_s3client();
		$objects = $s3client->getIterator('ListObjects', array(
			'Bucket' => $bucket,
			'Prefix' => $itemname
		));

		//loop through all the objects and copy them
		//then delete them!!!!
		foreach ($objects as $object) {
			$filename = str_replace($itemname, '',$object['Key']);
    		//remove object 
    		$s3client->deleteObject(array(
				'Bucket'     => $bucket,
				'Key'        => $itemname . $filename
				));
    	}
    	
    	//remove the source folder too
    	$s3client->DeleteObject(array(
				'Bucket'     => $bucket,
				'Key'        => $itemname
		));
		//echo 'folder removed:' . $itemname . PHP_EOL ;		
	}
	
	
	
	/**
*
*
*  PATH/NAME HANDLING CODE STARTS HERE
*
*/

	
/*	
	
	//check that filename appears correct
	function partsarray_sanity_check($partsarray,$length=3){
		//check number of elements in basename/partsarray
		if(count($partsarray)!= $length){
			echo "filename must be of format [coursename]_module[xx]_[filename].[ext]";
			echo " OR  format [coursename]_module[xx]_[filename]_poster.[ext]";
			return false;
		}
		
		//check module name
		if(strpos(strtoLower($partsarray[1]),'module')!=0){
			echo $partsarray[1] . " MUST be format modulexx";
			return false;
		}
		
		//chedk coursename
		switch(strtoLower($partsarray[0])){
			case 'idawn': 
			case 'icareerskills':
			case 'itech':
			case 'ibiz':
			case 'inumbers':
				//all ok
				break;
			default:
				echo $partsarray[0] . "is not a known course";
				return false;
			
		}
		
		//sanity check passed
		return true;
	}

	
	//get the destination folder of a file when not yet moved finally
	function fetch_production_prefix($input_key, $type){
		$noextension = substr($input_key, 0, -4);
		$basename = basename($noextension);
		$partsarray = split('_',$basename);
		
		switch($type){
			case 'image': $correct_parts_size = 3;break;
			case 'quiz': $correct_parts_size = 3;break;
			case 'video': $correct_parts_size = 3;break;
			case 'poster': $correct_parts_size = 4;break;
		}
		
		//brief sanity check
		$filenameisgood = $this->partsarray_sanity_check($partsarray,$correct_parts_size);
		if(!$filenameisgood){
			echo "filename: " . $basename . " appears wrong.";
			return false;
		}
		
		$finalarray = array();
		$finalarray[0]='publiccontent';
		$finalarray[1]='courses';
		$coursename = strtoLower($partsarray[0]);
		$modulename = strtoLower($partsarray[1]);
		$finalarray[2]=$coursename;
		$finalarray[3]=$modulename; //module e.g module01
		$finalarray[4]='content';
		
		switch($type){
			case 'image': 
				$finalarray[5]='images'; 
				break;
			case 'quiz': 
				$finalarray[5]='quizzes';
				break;
			case 'video': 		
				$finalarray[5]='media';
				$finalarray[6]='video';
				break;
			case 'poster': 		
				$finalarray[5]='media';
				$finalarray[6]='video';
				//the video name
				$finalarray[7]=$partsarray[2];
				break;
		
		}
		
		$production_prefix = implode('/',$finalarray);
		$production_prefix .= '/';
		return $production_prefix ;
	}
	
	//fetch or create the transcoder object 
	function fetch_s3client(){
		if(!$this->s3client){
			$this->s3client = S3Client::factory(array('credentials' => 
				array('key' => $this->accesskey, 'secret' => $this->secretkey)));
		}
		return $this->s3client;
	}

	*/
	
	
	
}//end of class