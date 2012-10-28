/**
 * Javascript for loading swf widgets , espec flowplayer for PoodLL
 *
 * @copyright &copy; 2012 Justin Hunt
 * @author poodllsupport@gmail.com
 * @license http://www.gnu.org/copyleft/gpl.html GNU Public License
 * @package filter_poodll
 */

M.filter_poodll = {}

// Replace poodll_flowplayer divs with flowplayers
M.filter_poodll.loadflowplayer = function(Y,opts) {

//the standard config. change backgroundcolor to go from blue to something else	
theconfig = { plugins:
                                { controls:
                                        { fullscreen: false,
                                                height: 40,
                                                autoHide: false,
                                                buttonColor: '#ffffff',
                                                backgroundColor: opts['bgcolor'],
                                                disabledWidgetColor: '#555555',
                                                bufferGradient: 'none',
                                                timeSeparator: ' ',
                                                volumeSliderColor: '#ffffff',
                                                sliderGradient: 'none',
                                                volumeBorder: '1px solid rgba(128, 128, 128, 0.7)',
                                                volumeColor: '#ffffff',
                                                tooltipTextColor: '#ffffff',
                                                timeBorder: '0px solid rgba(0, 0, 0, 0.3)',
                                                buttonOverColor: '#ffffff',
                                                buttonOffColor: 'rgba(130,130,130,1)',
                                                timeColor: '#ffffff',
                                                progressGradient: 'none',
                                                sliderBorder: '1px solid rgba(128, 128, 128, 0.7)',
                                                volumeSliderGradient: 'none',
                                                durationColor: '#a3a3a3',
                                                backgroundGradient: [0.5,0,0.3],
                                                sliderColor: '#000000',
                                                progressColor: '#5aed38',
                                                bufferColor: '#445566',
                                                tooltipColor: '#000000',
                                                borderRadius: '0px',
                                                timeBgColor: 'rgb(0, 0, 0, 0)',
                                                opacity: 1.0 },
                                       
                                audio:
                                        { url: opts['audiocontrolsurl'] }
                                },
                playlist: opts['playlisturl'] ,
                clip:
                        { autoPlay: true }
        } ;
		
	var splash=false;

	//the params are different depending on the playertype
	//we need to specify provider for audio if the clips are not MP3 or mp3
	//jqueryseems unavoidable even if not using it for playlists
	switch(opts['playertype']){
		case "audio":
			if (opts['jscontrols']){
					theconfig.plugins.controls = null;
					//we don't need to see the flowplayer video/audio at all if we are using js 
					opts["height"]=1;
			}else{

				theconfig.plugins.controls.fullscreen =false;
				theconfig.plugins.controls.height = opts['height'];
				theconfig.plugins.controls.autoHide= false;
			}
			
			//We need to tell flowplayer if we have mp3 to play.
			//if it is FLV, we should not pass in a provider flag
			var ext = opts['path'].substr(opts['path'].lastIndexOf('.') + 1);
			if(ext==".mp3" || ext==".MP3"){
				theconfig.clip.provider='audio';			
			}
	
						
			//If we have a splash screen show it and enable autoplay(user only clicks once)
			//best to have a splash screen to prevent browser hangs on many flashplayers in a forum etc
			if(opts['poodll_audiosplash']){
				theconfig.clip.autoPlay=true;
				splash=true;
			}else{
				theconfig.clip.autoPlay=false;
			}
			break;
		
		case "audiolist":
			if (opts['jscontrols']){
					theconfig.plugins.controls = null;
					//we don't need to see the flowplayer video/audio at all if we are using js 
					opts["height"]=1;
			}else{
				theconfig.plugins.controls.fullscreen = false;
				theconfig.plugins.controls.height = opts['defaultcontrolsheight'];
				theconfig.plugins.controls.autoHide= false;
				theconfig.plugins.controls.playlist = true;
			}
			
			//without looking inside the playlist we don't know if the audios are flv or mp3.
			//here we assume that audio playlists are mp3. If not we need to remove the provider element
			if (opts['loop']=='true'){
				theconfig.clip.autoPlay=true;
			}else{
				theconfig.clip.autoPlay=false;
			}
			theconfig.clip.provider='audio';
			break;
		
		case "video":
			//theconfig.plugins.audio= null;
			
			if (opts['jscontrols']){
				theconfig.plugins.controls =null;
			}else{
				theconfig.plugins.controls.fullscreen = true;
				theconfig.plugins.controls.height = opts['defaultcontrolsheight'];
				theconfig.plugins.controls.autoHide= true;
			}
			//set the color to black on video screens
			theconfig.plugins.controls.backgroundColor = '#0';

			
			//If we have a splash screen show it and enable autoplay(user only clicks once)
			//best to have a splash screen to prevent browser hangs on many flashplayers in a forum etc
			if(opts['poodll_videosplash']){
				theconfig.clip.autoPlay=true;
				splash=true;
			}else{
				theconfig.clip.autoPlay=false;
			}
			break;
		
		case "videolist":
			theconfig.plugins.controls.fullscreen = false;
			theconfig.plugins.controls.height = opts['defaultcontrolsheight'];
			theconfig.plugins.controls.autoHide= true;
			theconfig.plugins.controls.playlist = true;
			theconfig.clip.autoPlay=false;
			//set the color to black on video screens
			theconfig.plugins.controls.backgroundColor = '#0';
			break;
	
	
	}
	
	//should there be a problem with standard embedding, we can try this simpler
	//way
	if(opts['embedtype']=='flashembed'){
       theconfig.clip.url= opts['path'];
		//we should not have to specify this, but we do ...?
		var uniqconfig = theconfig;
		if(splash){
			document.getElementById(opts['playerid']).onclick = function() {
				flashembed(opts['playerid'], opts['playerpath'], {config: uniqconfig});
			}
		}else{
			flashembed(opts['playerid'], opts['playerpath'], {config: uniqconfig});
		}
		//console.log("flashembed embedded");
	
	//embed via swf object
	}else if(opts['embedtype']=='swfobject'){

       //we should not have to specify this, but we do ...?
       theconfig.clip.url= opts['path'];
       //we declare this here so that when called from click it refers to this config, and not a later one (object referecnes ...)
       var configstring=Y.JSON.stringify(theconfig);
	   //we need to convert double to single quotes, for IE's benefit
	   configstring= configstring.replace(/"/g,"'");
	   if(splash){
			// get flash container and assign click handler for it
			document.getElementById(opts['playerid']).onclick = function() {
				swfobject.embedSWF(opts['playerpath'],
						opts['playerid'], opts['width'], 
						opts['height'] , 
						"9.0.0", 
						null, 
						{config: configstring}
					);
			}
		}else{
			swfobject.embedSWF(opts['playerpath'],
    				opts['playerid'], opts['width'], 
    				opts['height'] , 
    				"9.0.0", 
    				null, 
    				{config: configstring}
    			);
		}
    	//console.log(JSON.stringify(theconfig));
    	//console.log("swfobject embedded");
		//console.log(configstring);
    	
    	
    	
    	
    	
    	
	
	//usually we will try this, though.
	}else{
	
		/* output the flowplayer */	
		$fp = flowplayer(opts['playerid'],opts['playerpath'],theconfig);
		
		//output any other bits and pieces required
		if(opts['controls']!="0"){$fp = $fp.controls(opts['controls']);}
		if(opts['ipad']){$fp=$fp.ipad();}
		if(opts['playlist']){$fp=$fp.playlist("div.poodllplaylist", {loop: opts["loop"]});}
	
	}

	//for debugging
//	console.log(theconfig);

	
}

// Replace poodll_flowplayer divs with flowplayers
M.filter_poodll.loadmobileupload = function(Y,opts) {
	var fileselect = $id('poodllfileselect');
	if(fileselect){
		fileselect.addEventListener("change", FileSelectHandler, false);
	}
}

	// file selection
	function FileSelectHandler(e) {

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			ParseFile(f);
			//UploadFile(f);
		}

	}//end of FileSelectHandler
	
	// output file information
	function ParseFile(file) {

	/*
		//output basic file info. good for debugging
		Output(
			"<p>File information: <strong>" + file.name +
			"</strong> type: <strong>" + file.type +
			"</strong> size: <strong>" + file.size +
			"</strong> bytes</p>"
		);
		*/
		
/*
		// display an image, nice but not necessary in ios, it does it anyway
		if (file.type.indexOf("image") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output(
					"<p><strong>" + file.name + ":</strong><br />" +
					'<img src="' + e.target.result + '" /></p>'
				);
			}
			reader.readAsDataURL(file);
		}
		
*/		
		
		
/*
		// display text
		if (file.type.indexOf("text") == 0) {
			var reader = new FileReader();
			reader.onload = function(e) {
				Output(
					"<p><strong>" + file.name + ":</strong></p><pre>" +
					e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
					"</pre>"
				);
			}
			reader.readAsText(file);
		}
		*/
			
			// start upload
			var filedata ="";
			var reader = new FileReader();
			//reader.onloadend = UploadFile;
			reader.onloadend = function(e) {
						filedata = e.target.result;
						UploadFile(file, filedata);
			}
			reader.readAsDataURL(file);

	}//end of ParseFile


// output information
	function Output(msg) {
		var m = $id('p_messages');
		//m.innerHTML = msg + m.innerHTML;
		m.innerHTML = msg;
	}
	
	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}
	// getElementById
	function $parentid(id) {
		return parent.document.getElementById(id);
	}

	// upload Media files
	function UploadFile(file, filedata) {


		var xhr = new XMLHttpRequest();
		//if (xhr.upload && file.type == "image/jpeg" && file.size <= $id("MAX_FILE_SIZE").value) {

		//Might need more mimetypes than this, and 3gpp maynot work
		var ext="";
		switch(file.type){
			case "image/jpeg": ext = "jpg";break;
			case "image/png": ext = "png";break;
			case "video/quicktime": ext = "mov";break;
			case "audio/mpeg3": ext = "mp3";break;
			case "audio/x-mpeg-3": ext = "mp3";break;
			case "audio/mpeg3": ext = "mp3";break;
			case "audio/3gpp": ext = "3gpp";break;
			case "video/mpeg3": ext = "3gpp";break;
			case "video/mp4": ext = "mp4";break;	
		}
		
		if(true){
			// create progress bar
			var o = $id("p_progress");
			var progress = o.firstChild;
			if(progress==null){
				progress = o.appendChild(document.createElement("p"));
			}
			//reset/set background position to 0, and label to "uploading
			progress.className="";
			progress.style.backgroundPosition = "100% 0";
			Output("Uploading.");

			// progress bar
			xhr.upload.addEventListener("progress", function(e) {
				var pc = parseInt(100 - (e.loaded / e.total * 100));
				progress.style.backgroundPosition = pc + "% 0";
			}, false);

			// file received/failed
			xhr.onreadystatechange = function(e) {
				
				if (xhr.readyState == 4 ) {
					progress.className = (xhr.status == 200 ? "success" : "failure");
					if(xhr.status==200){
						var resp = xhr.responseText;
						var start= resp.indexOf("success<error>");
						if (start<1){return;}
						var end = resp.indexOf("</error>");
						var filename= resp.substring(start+14,end);
						//Output("gotten filename:" + filename);
						Output("File uploaded successfully.");
						var upc = $id($id("p_updatecontrol").value);
						if(!upc){upc = $parentid($id("p_updatecontrol").value);}
						upc.value=filename;
						//$id("saveflvvoice").value=filename;
					}else{
						Output("File could not be uploaded.");
					}
				}
			};

	
		
			
		
			var params = "datatype=uploadfile";
			//We must URI encode the base64 filedata, because otherwise the "+" characters get turned into spaces
			//spent hours tracking that down ...justin 20121012
			params += "&paramone=" + encodeURIComponent(filedata);
			params += "&paramtwo=" + ext;
			params += "&requestid=12345";
			params += "&contextid=" + $id("p_contextid").value;
			params += "&component=" + $id("p_component").value;
			params += "&filearea=" + $id("p_filearea").value;
			params += "&itemid=" + $id("p_itemid").value;
			
			
			xhr.open("POST", $id("p_fileliburl").value, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Content-length", params.length);
			xhr.setRequestHeader("Connection", "close");

			xhr.send(params);
			

		}

	}//end of upload file






