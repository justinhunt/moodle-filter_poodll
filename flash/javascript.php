<?php
include('../../../config.php');
include($CFG->dirroot . '/filter/poodll/poodllinit.php');
?>//<![CDATA[

		var currentDivContents = '';
		var currentPlayerID    = '';

		//variables from php		
		//var audioplayerpart = "/filter/poodll/flash/poodllaudioplayer.lzx.swf9.swf";
		//var videoplayerpart = "/filter/poodll/flash/poodllvideoplayer.lzx.swf9.swf";	
		
		<?php 
			switch ($CFG->filter_poodll_defaultplayer){
				case 'fp':
					echo 'var videoplayerpart = "/filter/poodll/flash/flowplayer.swf"; ';
					echo 'var audioplayerpart = "/filter/poodll/flash/flowplayer.swf"; ';
					break;
					
				case 'jw':
					echo 'var videoplayerpart = "/filter/poodll/flash/jwplayer.swf"; ';
					echo 'var audioplayerpart = "/filter/poodll/flash/jwplayer.swf"; ';
					break;
				
				default:
					echo 'var videoplayerpart = "/filter/poodll/flash/poodllvideoplayer.lzx.swf9.swf"; ';
					echo 'var audioplayerpart = "/filter/poodll/flash/poodllaudioplayer.lzx.swf9.swf"; ';
			
			
			
			}
		?>
		
		var audioplayerLoc =  '<?php echo $CFG->httpswwwroot ?>' +  audioplayerpart;	
		var videoplayerLoc =  '<?php echo $CFG->httpswwwroot ?>' +  videoplayerpart;

		var flvserver = '<?php echo $CFG->poodll_media_server ?>';

	
		
      function loadAudioPlayer(rtmp_file, playerid, sampleid, width, height) {
	  
	  
			// if a player is already loaded, restore it's div contents
			if (currentDivContents != ''){
				rDc = document.getElementById(currentPlayerID);
			    rDc.innerHTML = currentDivContents;
			}
			// save current div contents
			currentDivContents = document.getElementById(playerid).innerHTML;

			// save current player id
			currentPlayerID = playerid;
			
			var playertype='rtmp';
			if(rtmp_file.substring(0,4)=='http'){
				playertype='http';
			}

				var so = new SWFObject(audioplayerLoc + '?red5url=' + flvserver +
					'&playertype='+ playertype +'&autoplay=true&mediapath='+ rtmp_file + 
					'&lzproxied=false', sampleid, width, height, '9');
							so.addParam('allowscriptaccess', 'always');
							so.addVariable('file',   rtmp_file);							
							
							
							//alert(audioplayerLoc + '?red5url=' + flvserver +'&playertype=rtmp&mediapath='+ rtmp_file + '&lzproxied=false');
							so.write(playerid);
						//	alert('playerid :'+ playerid);

      }
	  
	  
	        function loadVideoPlayer(rtmp_file, playerid, sampleid, width, height) {
	  
	  
			// if a player is already loaded, restore it's div contents
			if (currentDivContents != ''){
				rDc = document.getElementById(currentPlayerID);
			    rDc.innerHTML = currentDivContents;
			}
			// save current div contents
			currentDivContents = document.getElementById(playerid).innerHTML;

			// save current player id
			currentPlayerID = playerid;
			
			var playertype='rtmp';
			if(rtmp_file.substring(0,4)=='http'){
				playertype='http';
			}


				var so = new SWFObject(videoplayerLoc + '?red5url=' + flvserver +
					'&playertype=' + playertype + '&mediapath='+ rtmp_file + 
					'&lzproxied=false', sampleid, width, height, '7');
							so.addParam('allowscriptaccess', 'always');
							so.addVariable('file',            rtmp_file);
							so.write(playerid);

      }
	//might have to add another "parent" here" and the text type is probably unnecessary
	  function updateUploadForm(newfilename,newfiledata){
			var namebox = parent.document.getElementById("upload_filename"); 
			var databox = parent.document.getElementById("upload_filedata"); 
			namebox.value=newfilename;
			databox.value=newfiledata;
			f=namebox;
			while(f.tagName!='FORM')f=f.parentNode;
			f.repo_upload_file.type='text';
			f.repo_upload_file.value='bogus.jpg';
			f.nextSibling.getElementsByTagName('button')[0].click();
		}
	  
	  
//]]>