PoodLL All
========================================
Thanks for downloading PoodLL.

The files in the poodllall archive are all in the necessary directory structure. Upload the four directories into the root of your Moodle installation. No core Moodle files will be overriden or removed when doing this.
-mod
-filter
-repository
-question

Then login to your site as admin and go to your Moodle site's top page. Moodle should then guide you through the installation or upgrade of the four modules. 

Changes in this version: 2012110500
=============================
-Added the PoodLL database field and 2.3 Assignment submission type to the main PoodLL distribution.


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