PoodLL All
========================================
Thanks for downloading PoodLL.

The files in the poodllall archive are all in the necessary directory structure. Upload the four directories into the root of your Moodle installation. No core Moodle files will be overriden or removed when doing this.
-mod
-filter
-repository
-question

Then login to your site as admin and go to your Moodle site's top page. Moodle should then guide you through the installation or upgrade of the four modules. 

Changes in this version: 2012100100
=============================
-Fixed the way the flowplayer video and audio player was embedded on the page. Provided option in filter settings to select the embedding method. 
This will fix some weirdness that people had where players didn't play, endlessly played or resized themselves. The default is to use the SWF Object embedding  method which works the best for the most people. The other option you might use is Flowplayer JS. If you use this, it might pay to tell the multimedia plugins filter to ignore the file expensions that you handle with PoodLL (mp3,mp4,flv by default). Otherwise conflicts can occur. In Moodle 2.3 this can be done at:
Site Administration -> Appearance -> Media Embedding

In Moodle 2 you can do this at:
Site Administration -> Plugins -> Filters -> MultiMedia Plugins settings.

-Added a PoodLL Data Directory feature. This allows you to specify a web accessible directory from which to store and access media files and other resources. This is mostly useful for some of the older widgets from Moodle 1.9  days, that some people want to use. These include the talkback widget, small video gallery, big video gallery,audio list players and flashcards.

-Added / reenabled a few new widgets. These include talkback, the video galleries, screen subscribe/cambroadcaster


Setting up the PoodLL Filter
=============================
It will finally show you the PoodLL filter settings page. You can probably accept the defaults, scroll to the bottom of the page and press save.
When Moodle shows you the PoodLL Filter Settings page, the second property from the top of the page is the PoodLL Server Port Number(RTMP) property. 
This defaults to 80, which allows users to make recordings through firewalls. If you experience instability when recording, try setting the PoodLL Server Port Number(RTMP) to 1935.

All of the PoodLL mods require the PoodLL filter to be installed and enabled so you should do that now.
To enable the filter go to:
"Site Administration->Plugins->Filters->Manage Filters"
And set the PoodLL Filter to "On."



Setting up the PoodLL Repository
==================================
Before you can use the repository you will have to set it up. Go to: 
"Site Administration->Plugins->Repositories->Manage Repositories" 
and set the PoodLL repository to "enabled and visible". 
Then a "PoodLL" link will appear beneath "Manage Repositories" in the repositories menu. 
From that link create one or more instances of it, probably one for audio recording and one for video recording.
Then it will show in the file picker and you can use it in your courses.

More instructions, documentation and video tutorials are available at http://www.poodll.com .

Good luck.

Justin Hunt
Chief PoodLL'er
poodllsupport@gmail.com