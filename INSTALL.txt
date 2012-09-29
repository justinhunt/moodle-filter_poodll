PoodLL All
========================================
Thanks for downloading PoodLL.

The files in the poodllall archive are all in the necessary directory structure. Upload the four directories into the root of your Moodle installation. No core Moodle files will be overriden or removed when doing this.
-mod
-filter
-repository
-question

Then login to your site as admin and go to your Moodle site's top page. Moodle should then guide you through the installation or upgrade of the four modules. 

Changes in the version:
=============================
-Added logic to filter to allow audiolist player to use different players than the default A/V player, by adding the player=XX parameter. Possible values are pd(PoodLL player) and fp (Flowplayer).
-Fixed bug where multiple flashplayers on a single page could not be paused or stopped after playback began.



Setting up the PoodLL Filter
=============================
It will finally show you the PoodLL filter settings page. You can probably accept the defaults, scroll to the bottom of the page and press save.
When Moodle shows you the PoodLL Filter Settings page, the second property from the top of the page is the PoodLL Server Port Number(RTMP) property. 
This defaults to 80, which allows users to make recordings through firewalls. If you experience instability when recording, try setting the PoodLL Server Port Number(RTMP) to 1935.

All of the PoodLL mods require the PoodLL filter to be installed and enabled so you should do that now.
T enable the filter go to:
"Site Administration->Plugins->Filters->Manage Filters"
And set the PoodLL Filter to "On."

Also set the "Multimedia Plugins" filter to "On." The PoodLL filter should be higher in the list.

*** Please note that audio recording on Flash versions 11.2.202.228 - 11.2.202.235 (at the time of writing the most current releases) won't playback. It is an Adobe issue and it is fixed in Adobe Flash Player 11.3 Beta.
You can also avoid this problem if you are using tokyo.poodll.com and set PoodLL Server Port (RTMP) to 1935 on the PoodLL filter settings page, though this may be blocked by a school's firewall. ****


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