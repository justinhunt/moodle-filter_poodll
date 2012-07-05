LzResourceLibrary.lzfocusbracket_rsrc={ptype:"sr",frames:['lps/components/lz/resources/focus/focus_top_lft.png','lps/components/lz/resources/focus/focus_top_rt.png','lps/components/lz/resources/focus/focus_bot_lft.png','lps/components/lz/resources/focus/focus_bot_rt.png'],width:7,height:7,sprite:'lps/components/lz/resources/focus/focus_top_lft.sprite.png',spriteoffset:0};LzResourceLibrary.lzfocusbracket_shdw={ptype:"sr",frames:['lps/components/lz/resources/focus/focus_top_lft_shdw.png','lps/components/lz/resources/focus/focus_top_rt_shdw.png','lps/components/lz/resources/focus/focus_bot_lft_shdw.png','lps/components/lz/resources/focus/focus_bot_rt_shdw.png'],width:9,height:9,sprite:'lps/components/lz/resources/focus/focus_top_lft_shdw.sprite.png',spriteoffset:7};LzResourceLibrary.calc_body={ptype:"ar",frames:['resources/body.png'],width:240.0,height:360.0,spriteoffset:16};LzResourceLibrary.calc_display={ptype:"ar",frames:['resources/display.png'],width:201.0,height:46.0,spriteoffset:376};LzResourceLibrary.button_grn={ptype:"ar",frames:['resources/new_button_green_off.png','resources/new_button_green_over.png','resources/new_button_green_down.png'],width:45,height:45,sprite:'resources/new_button_green_off.sprite.png',spriteoffset:422};LzResourceLibrary.button_blu={ptype:"ar",frames:['resources/new_button_blue_off.png','resources/new_button_blue_over.png','resources/new_button_blue_down.png'],width:45,height:45,sprite:'resources/new_button_blue_off.sprite.png',spriteoffset:467};LzResourceLibrary.button_red={ptype:"ar",frames:['resources/new_button_red_off.png','resources/new_button_red_over.png','resources/new_button_red_down.png'],width:45,height:45,sprite:'resources/new_button_red_off.sprite.png',spriteoffset:512};LzResourceLibrary.__allcss={path:'usr/local/red5/webapps/openlaszlo/my-apps/laszlocalc/poodllcalc.sprite.png'};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;canvas=new LzCanvas(null,{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",accessible:"boolean",align:"string",allowfullscreen:"boolean",appbuilddate:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",compileroptions:"string",contextmenu:"string",cornerradius:"string",cursor:"token",dataloadtimeout:"numberExpression",datapath:"string",datasets:"string",debug:"boolean",defaultdataprovider:"string",defaultplacement:"string",embedfonts:"boolean",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framerate:"number",framesloadratio:"number",fullscreen:"boolean",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",history:"boolean",httpdataprovider:"string",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",lpsbuild:"string",lpsbuilddate:"string",lpsrelease:"string",lpsversion:"string",mask:"string",mediaerrortimeout:"numberExpression",medialoadtimeout:"numberExpression",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",percentcreated:"number",pixellock:"boolean",placement:"string",playing:"boolean",proxied:"inheritableBoolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",runtime:"string",screenorientation:"boolean",scriptlimits:"css",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",title:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},__LZproxied:"false",appbuilddate:"2011-12-03T14:56:11Z",bgcolor:16777215,embedfonts:true,font:"Verdana,Vera,sans-serif",fontsize:11,fontstyle:"plain",height:"100%",lpsbuild:"trunk@19126 (19126)",lpsbuilddate:"2011-04-30T08:09:13Z",lpsrelease:"Latest",lpsversion:"5.0.x",runtime:"dhtml",width:"100%"});lz.colors.offwhite=15921906;lz.colors.gray10=1710618;lz.colors.gray20=3355443;lz.colors.gray30=5066061;lz.colors.gray40=6710886;lz.colors.gray50=8355711;lz.colors.gray60=10066329;lz.colors.gray70=11776947;lz.colors.gray80=13421772;lz.colors.gray90=15066597;lz.colors.iceblue1=3298963;lz.colors.iceblue2=5472718;lz.colors.iceblue3=12240085;lz.colors.iceblue4=14017779;lz.colors.iceblue5=15659509;lz.colors.palegreen1=4290113;lz.colors.palegreen2=11785139;lz.colors.palegreen3=12637341;lz.colors.palegreen4=13888170;lz.colors.palegreen5=15725032;lz.colors.gold1=9331721;lz.colors.gold2=13349195;lz.colors.gold3=15126388;lz.colors.gold4=16311446;lz.colors.sand1=13944481;lz.colors.sand2=14276546;lz.colors.sand3=15920859;lz.colors.sand4=15986401;lz.colors.ltpurple1=6575768;lz.colors.ltpurple2=12038353;lz.colors.ltpurple3=13353453;lz.colors.ltpurple4=15329264;lz.colors.grayblue=12501704;lz.colors.graygreen=12635328;lz.colors.graypurple=10460593;lz.colors.ltblue=14540287;lz.colors.ltgreen=14548957;{
Class.make("$lzc$class_basefocusview",["active",void 0,"$lzc$set_active",function($0){
this.setActive($0)
},"target",void 0,"$lzc$set_target",function($0){
this.setTarget($0)
},"duration",void 0,"_animatorcounter",void 0,"ontarget",void 0,"_nexttarget",void 0,"onactive",void 0,"_xydelegate",void 0,"_widthdel",void 0,"_heightdel",void 0,"_delayfadeoutDL",void 0,"_dofadeout",void 0,"_onstopdel",void 0,"reset",function(){
this.setAttribute("x",0);this.setAttribute("y",0);this.setAttribute("width",canvas.width);this.setAttribute("height",canvas.height);this.setTarget(null)
},"setActive",function($0){
this.active=$0;if(this.onactive)this.onactive.sendEvent($0)
},"doFocus",function($0){
this._dofadeout=false;this.bringToFront();if(this.target)this.setTarget(null);this.setAttribute("visibility",this.active?"visible":"hidden");this._nexttarget=$0;if(this.visible){
this._animatorcounter+=1;var $1=null;var $2;var $3;var $4;var $5;if($0["getFocusRect"])$1=$0.getFocusRect();if($1){
$2=$1[0];$3=$1[1];$4=$1[2];$5=$1[3]
}else{
$2=$0.getAttributeRelative("x",canvas);$3=$0.getAttributeRelative("y",canvas);$4=$0.getAttributeRelative("width",canvas);$5=$0.getAttributeRelative("height",canvas)
};var $6=this.animate("x",$2,this.duration);this.animate("y",$3,this.duration);this.animate("width",$4,this.duration);this.animate("height",$5,this.duration);if(this.capabilities["minimize_opacity_changes"]){
this.setAttribute("visibility","visible")
}else{
this.animate("opacity",1,500)
};if(!this._onstopdel)this._onstopdel=new LzDelegate(this,"stopanim");this._onstopdel.register($6,"onstop")
};if(this._animatorcounter<1){
this.setTarget(this._nexttarget);var $1=null;var $2;var $3;var $4;var $5;if($0["getFocusRect"])$1=$0.getFocusRect();if($1){
$2=$1[0];$3=$1[1];$4=$1[2];$5=$1[3]
}else{
$2=$0.getAttributeRelative("x",canvas);$3=$0.getAttributeRelative("y",canvas);$4=$0.getAttributeRelative("width",canvas);$5=$0.getAttributeRelative("height",canvas)
};this.setAttribute("x",$2);this.setAttribute("y",$3);this.setAttribute("width",$4);this.setAttribute("height",$5)
}},"stopanim",function($0){
this._animatorcounter-=1;if(this._animatorcounter<1){
this._dofadeout=true;if(!this._delayfadeoutDL)this._delayfadeoutDL=new LzDelegate(this,"fadeout");lz.Timer.addTimer(this._delayfadeoutDL,1000);this.setTarget(this._nexttarget);this._onstopdel.unregisterAll()
}},"fadeout",function($0){
if(this._dofadeout){
if(this.capabilities["minimize_opacity_changes"]){
this.setAttribute("visibility","hidden")
}else{
this.animate("opacity",0,500)
}};this._delayfadeoutDL.unregisterAll()
},"setTarget",function($0){
this.target=$0;if(!this._xydelegate){
this._xydelegate=new LzDelegate(this,"followXY")
}else{
this._xydelegate.unregisterAll()
};if(!this._widthdel){
this._widthdel=new LzDelegate(this,"followWidth")
}else{
this._widthdel.unregisterAll()
};if(!this._heightdel){
this._heightdel=new LzDelegate(this,"followHeight")
}else{
this._heightdel.unregisterAll()
};if(this.target==null)return;var $1=$0;var $2=0;while($1!=canvas){
this._xydelegate.register($1,"onx");this._xydelegate.register($1,"ony");$1=$1.immediateparent;$2++
};this._widthdel.register($0,"onwidth");this._heightdel.register($0,"onheight");this.followXY(null);this.followWidth(null);this.followHeight(null)
},"followXY",function($0){
var $1=null;if(this.target["getFocusRect"])$1=this.target.getFocusRect();if($1){
this.setAttribute("x",$1[0]);this.setAttribute("y",$1[1])
}else{
this.setAttribute("x",this.target.getAttributeRelative("x",canvas));this.setAttribute("y",this.target.getAttributeRelative("y",canvas))
}},"followWidth",function($0){
var $1=null;if(this.target["getFocusRect"])$1=this.target.getFocusRect();if($1){
this.setAttribute("width",$1[2])
}else{
this.setAttribute("width",this.target.width)
}},"followHeight",function($0){
var $1=null;if(this.target["getFocusRect"])$1=this.target.getFocusRect();if($1){
this.setAttribute("height",$1[3])
}else{
this.setAttribute("height",this.target.height)
}},"$m4",function(){
return lz.Focus
},"$m5",function($0){
this.setActive(lz.Focus.focuswithkey);if($0){
this.doFocus($0)
}else{
this.reset();if(this.active){
this.setActive(false)
}}},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["tagname","basefocusview","__LZCSSTagSelectors",["basefocusview","view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$delegates:["onstop","stopanim",null,"onfocus","$m5","$m4"],_animatorcounter:0,_delayfadeoutDL:null,_dofadeout:false,_heightdel:null,_nexttarget:null,_onstopdel:null,_widthdel:null,_xydelegate:null,active:false,duration:400,initstage:"late",onactive:LzDeclaredEvent,ontarget:LzDeclaredEvent,options:{ignorelayout:true},target:null,visible:false},$lzc$class_basefocusview.attributes)
}}})($lzc$class_basefocusview)
};{
Class.make("$lzc$class__mm",["$m6",function($0){
var $1=-this.classroot.offset;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}},"$m7",function(){
try{
return [this.classroot,"offset"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$m8",function($0){
var $1=-this.classroot.offset;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}},"$m9",function(){
try{
return [this.classroot,"offset"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["displayName","<anonymous extends='view'>","children",[{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,opacity:0.25,resource:"lzfocusbracket_shdw",x:1,y:1},"class":LzView},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,resource:"lzfocusbracket_rsrc"},"class":LzView}],"__LZCSSTagSelectors",["view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}}},$lzc$class__mm.attributes)
}}})($lzc$class__mm)
};{
Class.make("$lzc$class__mn",["$ma",function($0){
var $1=this.parent.width-this.width+this.classroot.offset;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}},"$mb",function(){
try{
return [this.parent,"width",this,"width",this.classroot,"offset"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$mc",function($0){
var $1=-this.classroot.offset;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}},"$md",function(){
try{
return [this.classroot,"offset"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["displayName","<anonymous extends='view'>","children",[{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,frame:2,opacity:0.25,resource:"lzfocusbracket_shdw",x:1,y:1},"class":LzView},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,frame:2,resource:"lzfocusbracket_rsrc"},"class":LzView}],"__LZCSSTagSelectors",["view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}}},$lzc$class__mn.attributes)
}}})($lzc$class__mn)
};{
Class.make("$lzc$class__mo",["$me",function($0){
var $1=-this.classroot.offset;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}},"$mf",function(){
try{
return [this.classroot,"offset"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$mg",function($0){
var $1=this.parent.height-this.height+this.classroot.offset;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}},"$mh",function(){
try{
return [this.parent,"height",this,"height",this.classroot,"offset"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["displayName","<anonymous extends='view'>","children",[{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,frame:3,opacity:0.25,resource:"lzfocusbracket_shdw",x:1,y:1},"class":LzView},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,frame:3,resource:"lzfocusbracket_rsrc"},"class":LzView}],"__LZCSSTagSelectors",["view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}}},$lzc$class__mo.attributes)
}}})($lzc$class__mo)
};{
Class.make("$lzc$class__mp",["$mi",function($0){
var $1=this.parent.width-this.width+this.classroot.offset;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}},"$mj",function(){
try{
return [this.parent,"width",this,"width",this.classroot,"offset"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$mk",function($0){
var $1=this.parent.height-this.height+this.classroot.offset;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}},"$ml",function(){
try{
return [this.parent,"height",this,"height",this.classroot,"offset"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["displayName","<anonymous extends='view'>","children",[{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,frame:4,opacity:0.25,resource:"lzfocusbracket_shdw",x:1,y:1},"class":LzView},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,frame:4,resource:"lzfocusbracket_rsrc"},"class":LzView}],"__LZCSSTagSelectors",["view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}}},$lzc$class__mp.attributes)
}}})($lzc$class__mp)
};{
Class.make("$lzc$class_focusoverlay",["offset",void 0,"topleft",void 0,"topright",void 0,"bottomleft",void 0,"bottomright",void 0,"doFocus",function($0){
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["doFocus"]||this.nextMethod(arguments.callee,"doFocus")).call(this,$0);if(this.visible)this.bounce()
},"bounce",function(){
this.animate("offset",12,this.duration/2);this.animate("offset",5,this.duration)
},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],$lzc$class_basefocusview,["tagname","focusoverlay","children",[{attrs:{$classrootdepth:1,name:"topleft",x:new LzAlwaysExpr("$m6","$m7",null),y:new LzAlwaysExpr("$m8","$m9",null)},"class":$lzc$class__mm},{attrs:{$classrootdepth:1,name:"topright",x:new LzAlwaysExpr("$ma","$mb",null),y:new LzAlwaysExpr("$mc","$md",null)},"class":$lzc$class__mn},{attrs:{$classrootdepth:1,name:"bottomleft",x:new LzAlwaysExpr("$me","$mf",null),y:new LzAlwaysExpr("$mg","$mh",null)},"class":$lzc$class__mo},{attrs:{$classrootdepth:1,name:"bottomright",x:new LzAlwaysExpr("$mi","$mj",null),y:new LzAlwaysExpr("$mk","$ml",null)},"class":$lzc$class__mp}],"__LZCSSTagSelectors",["focusoverlay","basefocusview","view","node","Instance"],"attributes",new LzInheritedHash($lzc$class_basefocusview.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({offset:5},$lzc$class_focusoverlay.attributes)
}}})($lzc$class_focusoverlay)
};{
Class.make("$lzc$class__componentmanager",["focusclass",void 0,"keyhandlers",void 0,"lastsdown",void 0,"lastedown",void 0,"defaults",void 0,"currentdefault",void 0,"defaultstyle",void 0,"ondefaultstyle",void 0,"init",function(){
var $0=this.focusclass;if(typeof canvas.focusclass!="undefined"){
$0=canvas.focusclass
};if($0!=null){
canvas.__focus=new (lz[$0])(canvas);canvas.__focus.reset()
};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["init"]||this.nextMethod(arguments.callee,"init")).call(this)
},"_lastkeydown",void 0,"upkeydel",void 0,"$mq",function(){
return lz.Keys
},"dispatchKeyDown",function($0){
var $1=false;if($0==32){
this.lastsdown=null;var $2=lz.Focus.getFocus();if($2 instanceof lz.basecomponent){
$2.doSpaceDown();this.lastsdown=$2
};$1=true
}else if($0==13&&this.currentdefault){
this.lastedown=this.currentdefault;this.currentdefault.doEnterDown();$1=true
};if($1){
if(!this.upkeydel)this.upkeydel=new LzDelegate(this,"dispatchKeyTimer");this._lastkeydown=$0;lz.Timer.addTimer(this.upkeydel,50)
}},"dispatchKeyTimer",function($0){
if(this._lastkeydown==32&&this.lastsdown!=null){
this.lastsdown.doSpaceUp();this.lastsdown=null
}else if(this._lastkeydown==13&&this.currentdefault&&this.currentdefault==this.lastedown){
this.currentdefault.doEnterUp()
}},"findClosestDefault",function($0){
if(!this.defaults){
return null
};var $1=null;var $2=null;var $3=this.defaults;$0=$0||canvas;var $4=lz.ModeManager.getModalView();for(var $5=0;$5<$3.length;$5++){
var $6=$3[$5];if($4&&!$6.childOf($4)){
continue
};var $7=this.findCommonParent($6,$0);if($7&&(!$1||$7.nodeLevel>$1.nodeLevel)){
$1=$7;$2=$6
}};return $2
},"findCommonParent",function($0,$1){
while($0.nodeLevel>$1.nodeLevel){
$0=$0.immediateparent;if(!$0.visible)return null
};while($1.nodeLevel>$0.nodeLevel){
$1=$1.immediateparent;if(!$1.visible)return null
};while($0!=$1){
$0=$0.immediateparent;$1=$1.immediateparent;if(!$0.visible||!$1.visible)return null
};return $0
},"makeDefault",function($0){
if(!this.defaults)this.defaults=[];this.defaults.push($0);this.checkDefault(lz.Focus.getFocus())
},"unmakeDefault",function($0){
if(!this.defaults)return;for(var $1=0;$1<this.defaults.length;$1++){
if(this.defaults[$1]==$0){
this.defaults.splice($1,1);this.checkDefault(lz.Focus.getFocus());return
}}},"$mr",function(){
return lz.Focus
},"checkDefault",function($0){
if(!($0 instanceof lz.basecomponent)||!$0.doesenter){
if($0 instanceof lz.inputtext&&$0.multiline){
$0=null
}else{
$0=this.findClosestDefault($0)
}};if($0==this.currentdefault)return;if(this.currentdefault){
this.currentdefault.setAttribute("hasdefault",false)
};this.currentdefault=$0;if($0){
$0.setAttribute("hasdefault",true)
}},"$ms",function(){
return lz.ModeManager
},"$mt",function($0){
switch(arguments.length){
case 0:
$0=null;

};if(lz.Focus.getFocus()==null){
this.checkDefault(null)
}},"setDefaultStyle",function($0){
this.defaultstyle=$0;if(this.ondefaultstyle)this.ondefaultstyle.sendEvent($0)
},"getDefaultStyle",function(){
if(this.defaultstyle==null){
this.defaultstyle=new (lz.style)(canvas,{isdefault:true})
};return this.defaultstyle
},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzNode,["tagname","_componentmanager","__LZCSSTagSelectors",["_componentmanager","node","Instance"],"attributes",new LzInheritedHash(LzNode.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{classroot:"string",cloneManager:"string",datapath:"string",defaultplacement:"string",focusclass:"string",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",name:"token",nodeLevel:"number",options:"css",parent:"string",placement:"string",styleclass:"string",subnodes:"string",transition:"string","with":"string"}},$delegates:["onkeydown","dispatchKeyDown","$mq","onfocus","checkDefault","$mr","onmode","$mt","$ms"],_lastkeydown:0,currentdefault:null,defaults:null,defaultstyle:null,focusclass:"focusoverlay",keyhandlers:null,lastedown:null,lastsdown:null,ondefaultstyle:LzDeclaredEvent,upkeydel:null},$lzc$class__componentmanager.attributes)
}}})($lzc$class__componentmanager)
};{
Class.make("$lzc$class_style",["isstyle",void 0,"$mu",function($0){
this.setAttribute("canvascolor",LzColorUtils.convertColor("null"))
},"canvascolor",void 0,"$lzc$set_canvascolor",function($0){
this.setCanvasColor($0)
},"$mv",function($0){
this.setAttribute("textcolor",LzColorUtils.convertColor("gray10"))
},"textcolor",void 0,"$lzc$set_textcolor",function($0){
this.setStyleAttr($0,"textcolor")
},"$mw",function($0){
this.setAttribute("textfieldcolor",LzColorUtils.convertColor("white"))
},"textfieldcolor",void 0,"$lzc$set_textfieldcolor",function($0){
this.setStyleAttr($0,"textfieldcolor")
},"$mx",function($0){
this.setAttribute("texthilitecolor",LzColorUtils.convertColor("iceblue1"))
},"texthilitecolor",void 0,"$lzc$set_texthilitecolor",function($0){
this.setStyleAttr($0,"texthilitecolor")
},"$my",function($0){
this.setAttribute("textselectedcolor",LzColorUtils.convertColor("black"))
},"textselectedcolor",void 0,"$lzc$set_textselectedcolor",function($0){
this.setStyleAttr($0,"textselectedcolor")
},"$mz",function($0){
this.setAttribute("textdisabledcolor",LzColorUtils.convertColor("gray60"))
},"textdisabledcolor",void 0,"$lzc$set_textdisabledcolor",function($0){
this.setStyleAttr($0,"textdisabledcolor")
},"$m10",function($0){
this.setAttribute("basecolor",LzColorUtils.convertColor("offwhite"))
},"basecolor",void 0,"$lzc$set_basecolor",function($0){
this.setStyleAttr($0,"basecolor")
},"$m11",function($0){
this.setAttribute("bgcolor",LzColorUtils.convertColor("white"))
},"bgcolor",void 0,"$lzc$set_bgcolor",function($0){
this.setStyleAttr($0,"bgcolor")
},"$m12",function($0){
this.setAttribute("hilitecolor",LzColorUtils.convertColor("iceblue4"))
},"hilitecolor",void 0,"$lzc$set_hilitecolor",function($0){
this.setStyleAttr($0,"hilitecolor")
},"$m13",function($0){
this.setAttribute("selectedcolor",LzColorUtils.convertColor("iceblue3"))
},"selectedcolor",void 0,"$lzc$set_selectedcolor",function($0){
this.setStyleAttr($0,"selectedcolor")
},"$m14",function($0){
this.setAttribute("disabledcolor",LzColorUtils.convertColor("gray30"))
},"disabledcolor",void 0,"$lzc$set_disabledcolor",function($0){
this.setStyleAttr($0,"disabledcolor")
},"$m15",function($0){
this.setAttribute("bordercolor",LzColorUtils.convertColor("gray40"))
},"bordercolor",void 0,"$lzc$set_bordercolor",function($0){
this.setStyleAttr($0,"bordercolor")
},"$m16",function($0){
this.setAttribute("bordersize",1)
},"bordersize",void 0,"$lzc$set_bordersize",function($0){
this.setStyleAttr($0,"bordersize")
},"$m17",function($0){
var $1=this.textfieldcolor;if($1!==this["menuitembgcolor"]||!this.inited){
this.setAttribute("menuitembgcolor",$1)
}},"$m18",function(){
try{
return [this,"textfieldcolor"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"menuitembgcolor",void 0,"isdefault",void 0,"$lzc$set_isdefault",function($0){
this._setdefault($0)
},"onisdefault",void 0,"_setdefault",function($0){
this.isdefault=$0;if(this.isdefault){
lz._componentmanager.service.setDefaultStyle(this);if(this["canvascolor"]!=null){
canvas.setAttribute("bgcolor",this.canvascolor)
}};if(this.onisdefault)this.onisdefault.sendEvent(this)
},"onstylechanged",void 0,"setStyleAttr",function($0,$1){
this[$1]=$0;if(this["on"+$1])this["on"+$1].sendEvent($1);if(this.onstylechanged)this.onstylechanged.sendEvent(this)
},"setCanvasColor",function($0){
if(this.isdefault&&$0!=null){
canvas.setAttribute("bgcolor",$0)
};this.canvascolor=$0;if(this.onstylechanged)this.onstylechanged.sendEvent(this)
},"extend",function($0){
var $1=new (lz.style)();$1.canvascolor=this.canvascolor;$1.textcolor=this.textcolor;$1.textfieldcolor=this.textfieldcolor;$1.texthilitecolor=this.texthilitecolor;$1.textselectedcolor=this.textselectedcolor;$1.textdisabledcolor=this.textdisabledcolor;$1.basecolor=this.basecolor;$1.bgcolor=this.bgcolor;$1.hilitecolor=this.hilitecolor;$1.selectedcolor=this.selectedcolor;$1.disabledcolor=this.disabledcolor;$1.bordercolor=this.bordercolor;$1.bordersize=this.bordersize;$1.menuitembgcolor=this.menuitembgcolor;$1.isdefault=this.isdefault;for(var $2 in $0){
$1[$2]=$0[$2]
};new LzDelegate($1,"_forwardstylechanged",this,"onstylechanged");return $1
},"_forwardstylechanged",function($0){
if(this.onstylechanged)this.onstylechanged.sendEvent(this)
},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzNode,["tagname","style","__LZCSSTagSelectors",["style","node","Instance"],"attributes",new LzInheritedHash(LzNode.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{basecolor:"color",bgcolor:"color",bordercolor:"color",bordersize:"number",canvascolor:"color",classroot:"string",cloneManager:"string",datapath:"string",defaultplacement:"string",disabledcolor:"color",hilitecolor:"color",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isdefault:"boolean",isinited:"boolean",menuitembgcolor:"color",name:"token",nodeLevel:"number",options:"css",parent:"string",placement:"string",selectedcolor:"color",styleclass:"string",subnodes:"string",textcolor:"color",textdisabledcolor:"color",textfieldcolor:"color",texthilitecolor:"color",textselectedcolor:"color",transition:"string","with":"string"}},basecolor:new LzOnceExpr("$m10",null),bgcolor:new LzOnceExpr("$m11",null),bordercolor:new LzOnceExpr("$m15",null),bordersize:new LzOnceExpr("$m16",null),canvascolor:new LzOnceExpr("$mu",null),disabledcolor:new LzOnceExpr("$m14",null),hilitecolor:new LzOnceExpr("$m12",null),isdefault:false,isstyle:true,menuitembgcolor:new LzAlwaysExpr("$m17","$m18",null),onisdefault:LzDeclaredEvent,onstylechanged:LzDeclaredEvent,selectedcolor:new LzOnceExpr("$m13",null),textcolor:new LzOnceExpr("$mv",null),textdisabledcolor:new LzOnceExpr("$mz",null),textfieldcolor:new LzOnceExpr("$mw",null),texthilitecolor:new LzOnceExpr("$mx",null),textselectedcolor:new LzOnceExpr("$my",null)},$lzc$class_style.attributes)
}}})($lzc$class_style)
};canvas.LzInstantiateView({"class":lz.script,attrs:{script:function(){
lz._componentmanager.service=new (lz._componentmanager)(canvas,null,null,true)
}}},1);{
Class.make("$lzc$class_statictext",["$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzText,["tagname","statictext","__LZCSSTagSelectors",["statictext","text","view","node","Instance"],"attributes",new LzInheritedHash(LzText.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",antiAliasType:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",cdata:"cdata",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",direction:"string",embedfonts:"boolean",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",gridFit:"string",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",hscroll:"number",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",letterspacing:"number",lineheight:"number",loadratio:"number",mask:"string",maxhscroll:"number",maxlength:"numberExpression",maxscroll:"number",multiline:"boolean",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pattern:"string",pixellock:"boolean",placement:"string",playing:"boolean",resize:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",scroll:"number",scrollevents:"boolean",scrollheight:"number",scrollwidth:"number",selectable:"boolean",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",sharpness:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",text:"html",textalign:"string",textdecoration:"string",textindent:"number",thickness:"number",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",xscroll:"number",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression",yscroll:"number"}}},$lzc$class_statictext.attributes)
}}})($lzc$class_statictext)
};{
Class.make("$lzc$class_basecomponent",["enabled",void 0,"$lzc$set_focusable",function($0){
this._setFocusable($0)
},"_focusable",void 0,"text",void 0,"doesenter",void 0,"$lzc$set_doesenter",function($0){
this._setDoesEnter($0)
},"$m19",function($0){
var $1=this.enabled&&(this._parentcomponent?this._parentcomponent._enabled:true);if($1!==this["_enabled"]||!this.inited){
this.setAttribute("_enabled",$1)
}},"$m1a",function(){
try{
return [this,"enabled",this,"_parentcomponent",this._parentcomponent,"_enabled"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"_enabled",void 0,"$lzc$set__enabled",function($0){
this._setEnabled($0)
},"_parentcomponent",void 0,"_initcomplete",void 0,"isdefault",void 0,"$lzc$set_isdefault",function($0){
this._setIsDefault($0)
},"onisdefault",void 0,"hasdefault",void 0,"_setEnabled",function($0){
this._enabled=$0;var $1=this._enabled&&this._focusable;if($1!=this.focusable){
this.focusable=$1;if(this.onfocusable.ready)this.onfocusable.sendEvent()
};if(this._initcomplete)this._showEnabled();if(this.on_enabled.ready)this.on_enabled.sendEvent()
},"_setFocusable",function($0){
this._focusable=$0;if(this.enabled){
this.focusable=this._focusable;if(this.onfocusable.ready)this.onfocusable.sendEvent()
}else{
this.focusable=false
}},"construct",function($0,$1){
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["construct"]||this.nextMethod(arguments.callee,"construct")).call(this,$0,$1);var $2=this.immediateparent;while($2!=canvas){
if(lz.basecomponent["$lzsc$isa"]?lz.basecomponent.$lzsc$isa($2):$2 instanceof lz.basecomponent){
this._parentcomponent=$2;break
};$2=$2.immediateparent
}},"init",function(){
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["init"]||this.nextMethod(arguments.callee,"init")).call(this);this._initcomplete=true;this._mousedownDel=new LzDelegate(this,"_doMousedown",this,"onmousedown");if(this.styleable){
this._usestyle()
};if(!this["_enabled"])this._showEnabled()
},"_doMousedown",function($0){},"doSpaceDown",function(){
return false
},"doSpaceUp",function(){
return false
},"doEnterDown",function(){
return false
},"doEnterUp",function(){
return false
},"_setIsDefault",function($0){
this.isdefault=this["isdefault"]==true;if(this.isdefault==$0)return;if($0){
lz._componentmanager.service.makeDefault(this)
}else{
lz._componentmanager.service.unmakeDefault(this)
};this.isdefault=$0;if(this.onisdefault.ready){
this.onisdefault.sendEvent($0)
}},"_setDoesEnter",function($0){
this.doesenter=$0;if(lz.Focus.getFocus()==this){
lz._componentmanager.service.checkDefault(this)
}},"updateDefault",function(){
lz._componentmanager.service.checkDefault(lz.Focus.getFocus())
},"$m1b",function($0){
this.setAttribute("style",null)
},"style",void 0,"$lzc$set_style",function($0){
this.styleable?this.setStyle($0):(this.style=null)
},"styleable",void 0,"_style",void 0,"onstyle",void 0,"_styledel",void 0,"_otherstyledel",void 0,"setStyle",function($0){
if(!this.styleable)return;if($0!=null&&!$0["isstyle"]){
var $1=this._style;if(!$1){
if(this._parentcomponent){
$1=this._parentcomponent.style
}else $1=lz._componentmanager.service.getDefaultStyle()
};$0=$1.extend($0)
};this._style=$0;if($0==null){
if(!this._otherstyledel){
this._otherstyledel=new LzDelegate(this,"_setstyle")
}else{
this._otherstyledel.unregisterAll()
};if(this._parentcomponent&&this._parentcomponent.styleable){
this._otherstyledel.register(this._parentcomponent,"onstyle");$0=this._parentcomponent.style
}else{
this._otherstyledel.register(lz._componentmanager.service,"ondefaultstyle");$0=lz._componentmanager.service.getDefaultStyle()
}}else if(this._otherstyledel){
this._otherstyledel.unregisterAll();this._otherstyledel=null
};this._setstyle($0)
},"_usestyle",function($0){
switch(arguments.length){
case 0:
$0=null;

};if(this._initcomplete&&this["style"]&&this.style.isinited){
this._applystyle(this.style)
}},"_setstyle",function($0){
if(!this._styledel){
this._styledel=new LzDelegate(this,"_usestyle")
}else{
this._styledel.unregisterAll()
};if($0){
this._styledel.register($0,"onstylechanged")
};this.style=$0;this._usestyle();if(this.onstyle.ready)this.onstyle.sendEvent(this.style)
},"_applystyle",function($0){},"setTint",function($0,$1,$2){
switch(arguments.length){
case 2:
$2=0;

};if($0.capabilities.colortransform){
if($1!=""&&$1!=null){
var $3=$1;var $4=$3>>16&255;var $5=$3>>8&255;var $6=$3&255;$4+=51;$5+=51;$6+=51;$4=$4/255;$5=$5/255;$6=$6/255;$0.setAttribute("colortransform",{redMultiplier:$4,greenMultiplier:$5,blueMultiplier:$6,redOffset:$2,greenOffset:$2,blueOffset:$2})
}}},"on_enabled",void 0,"_showEnabled",function(){},"acceptValue",function($0,$1){
switch(arguments.length){
case 1:
$1=null;

};this.setAttribute("text",$0)
},"presentValue",function($0){
switch(arguments.length){
case 0:
$0=null;

};return this.text
},"$lzc$presentValue_dependencies",function($0,$1,$2){
switch(arguments.length){
case 2:
$2=null;

};return [this,"text"]
},"applyData",function($0){
this.acceptValue($0)
},"updateData",function(){
return this.presentValue()
},"destroy",function(){
this.styleable=false;this._initcomplete=false;if(this["isdefault"]&&this.isdefault){
lz._componentmanager.service.unmakeDefault(this)
};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["destroy"]||this.nextMethod(arguments.callee,"destroy")).call(this)
},"toString",function(){
var $0="";var $1="";var $2="";if(this["id"]!=null)$0="  id="+this.id;if(this["name"]!=null)$1=' named "'+this.name+'"';if(this["text"]&&this.text!="")$2="  text="+this.text;return this.constructor.tagname+$1+$0+$2
},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["tagname","basecomponent","__LZCSSTagSelectors",["basecomponent","view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{_focusable:"boolean",aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",doesenter:"boolean",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",text:"html",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},_enabled:new LzAlwaysExpr("$m19","$m1a",null),_focusable:true,_initcomplete:false,_otherstyledel:null,_parentcomponent:null,_style:null,_styledel:null,doesenter:false,enabled:true,focusable:true,hasdefault:false,on_enabled:LzDeclaredEvent,onfocusable:LzDeclaredEvent,onisdefault:LzDeclaredEvent,onstyle:LzDeclaredEvent,style:new LzOnceExpr("$m1b",null),styleable:true,text:""},$lzc$class_basecomponent.attributes)
}}})($lzc$class_basecomponent)
};{
Class.make("$lzc$class_basebutton",["normalResourceNumber",void 0,"overResourceNumber",void 0,"downResourceNumber",void 0,"disabledResourceNumber",void 0,"$m1c",function($0){
this.setAttribute("maxframes",this.totalframes)
},"maxframes",void 0,"resourceviewcount",void 0,"$lzc$set_resourceviewcount",function($0){
this.setResourceViewCount($0)
},"respondtomouseout",void 0,"$m1d",function($0){
this.setAttribute("reference",this)
},"reference",void 0,"$lzc$set_reference",function($0){
this.setreference($0)
},"onresourceviewcount",void 0,"_msdown",void 0,"_msin",void 0,"setResourceViewCount",function($0){
this.resourceviewcount=$0;if(this._initcomplete){
if($0>0){
if(this.subviews){
this.maxframes=this.subviews[0].totalframes;if(this.onresourceviewcount){
this.onresourceviewcount.sendEvent()
}}}}},"_callShow",function(){
if(this._msdown&&this._msin&&this.maxframes>=this.downResourceNumber){
this.showDown()
}else if(this._msin&&this.maxframes>=this.overResourceNumber){
this.showOver()
}else this.showUp()
},"$m1e",function(){
return lz.ModeManager
},"$m1f",function($0){
if($0&&(this._msdown||this._msin)&&!this.childOf($0)){
this._msdown=false;this._msin=false;this._callShow()
}},"$lzc$set_frame",function($0){
if(this.resourceviewcount>0){
for(var $1=0;$1<this.resourceviewcount;$1++){
this.subviews[$1].setAttribute("frame",$0)
}}else{
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzc$set_frame"]||this.nextMethod(arguments.callee,"$lzc$set_frame")).call(this,$0)
}},"doSpaceDown",function(){
if(this._enabled){
this.showDown()
}},"doSpaceUp",function(){
if(this._enabled){
this.onclick.sendEvent();this.showUp()
}},"doEnterDown",function(){
if(this._enabled){
this.showDown()
}},"doEnterUp",function(){
if(this._enabled){
if(this.onclick){
this.onclick.sendEvent()
};this.showUp()
}},"$m1g",function($0){
if(this.isinited){
this.maxframes=this.totalframes;this._callShow()
}},"init",function(){
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["init"]||this.nextMethod(arguments.callee,"init")).call(this);this.setResourceViewCount(this.resourceviewcount);this._callShow()
},"$m1h",function($0){
this.setAttribute("_msin",true);this._callShow()
},"$m1i",function($0){
this.setAttribute("_msin",false);this._callShow()
},"$m1j",function($0){
this.setAttribute("_msdown",true);this._callShow()
},"$m1k",function($0){
this.setAttribute("_msdown",false);this._callShow()
},"_showEnabled",function(){
this.reference.setAttribute("clickable",this._enabled);this.showUp()
},"showDown",function($0){
switch(arguments.length){
case 0:
$0=null;

};this.setAttribute("frame",this.downResourceNumber)
},"showUp",function($0){
switch(arguments.length){
case 0:
$0=null;

};if(!this._enabled&&this.disabledResourceNumber){
this.setAttribute("frame",this.disabledResourceNumber)
}else{
this.setAttribute("frame",this.normalResourceNumber)
}},"showOver",function($0){
switch(arguments.length){
case 0:
$0=null;

};this.setAttribute("frame",this.overResourceNumber)
},"setreference",function($0){
this.reference=$0;if($0!=this)this.setAttribute("clickable",false)
},"_applystyle",function($0){
this.setTint(this,$0.basecolor)
},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],$lzc$class_basecomponent,["tagname","basebutton","__LZCSSTagSelectors",["basebutton","basecomponent","view","node","Instance"],"attributes",new LzInheritedHash($lzc$class_basecomponent.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$attributeDescriptor:{types:{_focusable:"boolean",aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",disabledResourceNumber:"number",doesenter:"boolean",downResourceNumber:"number",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",maxframes:"number",name:"token",nodeLevel:"number",normalResourceNumber:"number",opacity:"number",options:"css",overResourceNumber:"number",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourceviewcount:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",text:"html",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$delegates:["onmode","$m1f","$m1e","ontotalframes","$m1g",null,"onmouseover","$m1h",null,"onmouseout","$m1i",null,"onmousedown","$m1j",null,"onmouseup","$m1k",null],_msdown:false,_msin:false,clickable:true,disabledResourceNumber:4,downResourceNumber:3,focusable:false,maxframes:new LzOnceExpr("$m1c",null),normalResourceNumber:1,onclick:LzDeclaredEvent,onresourceviewcount:LzDeclaredEvent,overResourceNumber:2,reference:new LzOnceExpr("$m1d",null),resourceviewcount:0,respondtomouseout:true,styleable:false},$lzc$class_basebutton.attributes)
}}})($lzc$class_basebutton)
};{
Class.make("LzLayout",["vip",void 0,"locked",void 0,"$lzc$set_locked",function($0){
if(this.locked==$0)return;if($0){
this.lock()
}else{
this.unlock()
}},"subviews",void 0,"updateDelegate",void 0,"construct",function($0,$1){
this.locked=2;(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["construct"]||this.nextMethod(arguments.callee,"construct")).call(this,$0,$1);this.subviews=[];this.vip=this.immediateparent;if(this.vip.layouts==null){
this.vip.layouts=[this]
}else{
this.vip.layouts.push(this)
};this.updateDelegate=new LzDelegate(this,"update");if(this.immediateparent.isinited){
this.__parentInit()
}else{
new LzDelegate(this,"__parentInit",this.immediateparent,"oninit")
}},"$m1l",function($0){
new LzDelegate(this,"gotNewSubview",this.vip,"onaddsubview");new LzDelegate(this,"removeSubview",this.vip,"onremovesubview");var $1=this.vip.subviews.length;for(var $2=0;$2<$1;$2++){
this.gotNewSubview(this.vip.subviews[$2])
}},"destroy",function(){
if(this.__LZdeleted)return;this.releaseLayout(true);(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["destroy"]||this.nextMethod(arguments.callee,"destroy")).call(this)
},"reset",function($0){
switch(arguments.length){
case 0:
$0=null;

};if(this.locked){
return
};this.update($0)
},"addSubview",function($0){
var $1=$0.options["layoutAfter"];if($1){
this.__LZinsertAfter($0,$1)
}else{
this.subviews.push($0)
}},"gotNewSubview",function($0){
if(!$0.options["ignorelayout"]){
this.addSubview($0)
}},"removeSubview",function($0){
var $1=this.subviews;for(var $2=$1.length-1;$2>=0;$2--){
if($1[$2]==$0){
$1.splice($2,1);break
}};this.reset()
},"ignore",function($0){
var $1=this.subviews;for(var $2=$1.length-1;$2>=0;$2--){
if($1[$2]==$0){
$1.splice($2,1);break
}};this.reset()
},"lock",function(){
this.locked=true
},"unlock",function($0){
switch(arguments.length){
case 0:
$0=null;

};this.locked=false;this.reset()
},"__parentInit",function($0){
switch(arguments.length){
case 0:
$0=null;

};if(this.locked==2){
if(this.isinited){
this.unlock()
}else{
new LzDelegate(this,"unlock",this,"oninit")
}}},"releaseLayout",function($0){
switch(arguments.length){
case 0:
$0=null;

};if($0==null&&this.__delegates!=null)this.removeDelegates();if(this.immediateparent&&this.vip.layouts){
for(var $1=this.vip.layouts.length-1;$1>=0;$1--){
if(this.vip.layouts[$1]==this){
this.vip.layouts.splice($1,1)
}}}},"setLayoutOrder",function($0,$1){
var $2=this.subviews;for(var $3=$2.length-1;$3>=0;$3--){
if($2[$3]===$1){
$2.splice($3,1);break
}};if($3==-1){
return
};if($0=="first"){
$2.unshift($1)
}else if($0=="last"){
$2.push($1)
}else{
for(var $4=$2.length-1;$4>=0;$4--){
if($2[$4]===$0){
$2.splice($4+1,0,$1);break
}};if($4==-1){
$2.splice($3,0,$1)
}};this.reset();return
},"swapSubviewOrder",function($0,$1){
var $2=-1;var $3=-1;var $4=this.subviews;for(var $5=$4.length-1;$5>=0&&($2<0||$3<0);$5--){
if($4[$5]===$0){
$2=$5
};if($4[$5]===$1){
$3=$5
}};if($2>=0&&$3>=0){
$4[$3]=$0;$4[$2]=$1
};this.reset();return
},"__LZinsertAfter",function($0,$1){
var $2=this.subviews;for(var $3=$2.length-1;$3>=0;$3--){
if($2[$3]==$1){
$2.splice($3,0,$0)
}}},"update",function($0){
switch(arguments.length){
case 0:
$0=null;

}},"toString",function(){
return "lz.layout for view "+this.immediateparent
},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzNode,["tagname","layout","__LZCSSTagSelectors",["layout","node","Instance"],"attributes",new LzInheritedHash(LzNode.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{classroot:"string",cloneManager:"string",datapath:"string",defaultplacement:"string",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",name:"token",nodeLevel:"number",options:"css",parent:"string",placement:"string",styleclass:"string",subnodes:"string",transition:"string","with":"string"}},$delegates:["onconstruct","$m1l",null],locked:2},LzLayout.attributes)
}}})(LzLayout)
};{
Class.make("$lzc$class_simplelayout",["axis",void 0,"$lzc$set_axis",function($0){
this.setAxis($0)
},"inset",void 0,"$lzc$set_inset",function($0){
this.inset=$0;if(this.subviews&&this.subviews.length)this.update();if(this["oninset"])this.oninset.sendEvent(this.inset)
},"spacing",void 0,"$lzc$set_spacing",function($0){
this.spacing=$0;if(this.subviews&&this.subviews.length)this.update();if(this["onspacing"])this.onspacing.sendEvent(this.spacing)
},"setAxis",function($0){
if(this["axis"]==null||this.axis!=$0){
this.axis=$0;this.sizeAxis=$0=="x"?"width":"height";if(this.subviews.length)this.update();if(this["onaxis"])this.onaxis.sendEvent(this.axis)
}},"addSubview",function($0){
this.updateDelegate.register($0,"on"+this.sizeAxis);this.updateDelegate.register($0,"onvisible");if(!this.locked){
var $1=null;var $2=this.subviews;for(var $3=$2.length-1;$3>=0;--$3){
if($2[$3].visible){
$1=$2[$3];break
}};if($1){
var $4=$1[this.axis]+$1[this.sizeAxis]+this.spacing
}else{
var $4=this.inset
};$0.setAttribute(this.axis,$4)
};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["addSubview"]||this.nextMethod(arguments.callee,"addSubview")).call(this,$0)
},"update",function($0){
switch(arguments.length){
case 0:
$0=null;

};if(this.locked)return;var $1=this.subviews.length;var $2=this.inset;for(var $3=0;$3<$1;$3++){
var $4=this.subviews[$3];if(!$4.visible)continue;if($4[this.axis]!=$2){
$4.setAttribute(this.axis,$2)
};if($4.usegetbounds){
$4=$4.getBounds()
};$2+=this.spacing+$4[this.sizeAxis]
}},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzLayout,["tagname","simplelayout","__LZCSSTagSelectors",["simplelayout","layout","node","Instance"],"attributes",new LzInheritedHash(LzLayout.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$attributeDescriptor:{types:{axis:"string",classroot:"string",cloneManager:"string",datapath:"string",defaultplacement:"string",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",name:"token",nodeLevel:"number",options:"css",parent:"string",placement:"string",styleclass:"string",subnodes:"string",transition:"string","with":"string"}},axis:"y",inset:0,spacing:0},$lzc$class_simplelayout.attributes)
}}})($lzc$class_simplelayout)
};{
Class.make("$lzc$class__m1p",["$m1o",function($0){
this.setAttribute("width",this.getTextWidth()+5)
},"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzText,["displayName","<anonymous extends='text'>","__LZCSSTagSelectors",["text","view","node","Instance"],"attributes",new LzInheritedHash(LzText.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",antiAliasType:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",cdata:"cdata",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",direction:"string",embedfonts:"boolean",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",gridFit:"string",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",hscroll:"number",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",letterspacing:"number",lineheight:"number",loadratio:"number",mask:"string",maxhscroll:"number",maxlength:"numberExpression",maxscroll:"number",multiline:"boolean",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pattern:"string",pixellock:"boolean",placement:"string",playing:"boolean",resize:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",scroll:"number",scrollevents:"boolean",scrollheight:"number",scrollwidth:"number",selectable:"boolean",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",sharpness:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",text:"html",textalign:"string",textdecoration:"string",textindent:"number",thickness:"number",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",xscroll:"number",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression",yscroll:"number"}}},$lzc$class__m1p.attributes)
}}})($lzc$class__m1p)
};{
Class.make("$lzc$class_calcButton",["$m1m",function($0){
this.parent.classroot.calculator.display.inputDigit(this)
},"$m1n",function($0){
this.initButton()
},"buttLabel",void 0,"labelX",void 0,"initButton",function(){
this.buttonText.setAttribute("x",this.labelX);this.buttonText.setAttribute("text",this.buttLabel)
},"buttonText",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],$lzc$class_basebutton,["tagname","calcButton","children",[{attrs:{$classrootdepth:1,$delegates:["ontext","$m1o",null],fgcolor:16777215,font:"obliqueText",fontsize:25,name:"buttonText",valign:"middle",x:13},"class":$lzc$class__m1p}],"__LZCSSTagSelectors",["calcButton","basebutton","basecomponent","view","node","Instance"],"attributes",new LzInheritedHash($lzc$class_basebutton.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$attributeDescriptor:{types:{_focusable:"boolean",aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",buttLabel:"string",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",disabledResourceNumber:"number",doesenter:"boolean",downResourceNumber:"number",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",labelX:"number",layout:"css",loadratio:"number",mask:"string",maxframes:"number",name:"token",nodeLevel:"number",normalResourceNumber:"number",opacity:"number",options:"css",overResourceNumber:"number",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourceviewcount:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",text:"html",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$delegates:["onclick","$m1m",null,"oninit","$m1n",null],clickable:true,labelX:11,resource:"button_blu"},$lzc$class_calcButton.attributes)
}}})($lzc$class_calcButton)
};{
Class.make("$lzc$class_calcDisplay",["$m1q",function($0){
this.start()
},"screen",void 0,"start",function(){
this.valueX=0;this.lastInput="none";this.oldValue=false;this.allOperators=new Array("+","-","/","*");this.operator="+";this.screen.setAttribute("text",this.valueX.toString())
},"clear",function(){
this.start()
},"inputDigit",function($0){
var $1=$0.buttonText.text;if(isInArray($1,this.allOperators)){
var $2=$1;this.inputOperator($2);return
}else if($1=="C"){
this.start();return
}else if($1=="."){
this.addDecimalPoint();return
}else if($1=="+/-"){
this.negative();return
}else if($1=="="){
this.equals();return
};var $3=this.screen.text;if($3=="0"&&$1=="0"){
return
};if(this.lastInput=="none"||this.lastInput=="operator"){
this.screen.setAttribute("text",$1)
}else if(this.lastInput=="digit"){
this.screen.setAttribute("text",$3+$1)
}else if(this.lastInput=="equals"){
this.clear();this.screen.setAttribute("text",$1)
};this.lastInput="digit"
},"inputOperator",function($0){
if(this.lastInput=="digit"){
this.execute(this.screen.text)
};this.valueX=this.screen.text;this.operator=$0;this.lastInput="operator"
},"equals",function(){
if(this.lastInput!="equals"){
this.oldValue=this.screen.text;this.lastInput="equals";this.execute(this.oldValue)
}else{
this.lastInput="equals";this.execute(this.oldValue)
}},"execute",function($0){
this.valueX-=0;var $1=$0-0;if(this.valueX==0)return;if(this.operator=="+"){
$0=this.valueX+$1
}else if(this.operator=="-"){
$0=this.valueX-$1
}else if(this.operator=="*"){
$0=this.valueX*$1
}else if(this.operator=="/"){
$0=this.valueX/$1
};$1=$0;this.screen.setAttribute("text",$1.toString());this.valueX=this.screen.text
},"isThereDecimal",function(){
var $0=this.screen.text;var $1=false;for(var $2=0;$2!=$0.length;$2++){
if($0.charAt($2)=="."){
return true
}};return false
},"addDecimalPoint",function(){
if(this.lastInput=="none"||this.lastInput=="operator"){
if(!this.isThereDecimal()){
this.screen.setAttribute("text","0.")
}}else if(this.lastInput=="digit"){
if(!this.isThereDecimal()){
var $0=this.screen.text;$0+=".";this.screen.setAttribute("text",$0)
}}else if(this.lastInput=="equals"){
this.clear();this.screen.setAttribute("text","0.")
};this.lastInput="digit"
},"negative",function(){
if(this.lastInput=="digit"||this.lastInput=="equals"){
var $0=(this.screen.text-0)*-1;this.screen.setAttribute("text",$0.toString())
}else{
this.clear()
}},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["tagname","calcDisplay","children",[{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",antiAliasType:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",cdata:"cdata",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",direction:"string",embedfonts:"boolean",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",gridFit:"string",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",hscroll:"number",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",letterspacing:"number",lineheight:"number",loadratio:"number",mask:"string",maxhscroll:"number",maxlength:"numberExpression",maxscroll:"number",multiline:"boolean",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pattern:"string",pixellock:"boolean",placement:"string",playing:"boolean",resize:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",scroll:"number",scrollevents:"boolean",scrollheight:"number",scrollwidth:"number",selectable:"boolean",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",sharpness:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",text:"html",textalign:"string",textdecoration:"string",textindent:"number",thickness:"number",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",xscroll:"number",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression",yscroll:"number"}},$classrootdepth:1,font:"displayText",fontsize:25,height:30,name:"screen",text:"0",width:165,x:5,y:5},"class":LzText}],"__LZCSSTagSelectors",["calcDisplay","view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$delegates:["oninit","$m1q",null],resource:"calc_display",x:20,y:31},$lzc$class_calcDisplay.attributes)
}}})($lzc$class_calcDisplay)
};canvas.LzInstantiateView({"class":lz.script,attrs:{script:function(){
isInArray=void 0;isInArray=function($0,$1){
var $2=false;for(var $3=0;$3<$1.length;$3++){
if($1[$3]==$0){
$2=true
}};return $2
}}}},1);{
Class.make("$lzc$class__m1t",["$m1r",function($0){
var $1=this.immediateparent.width;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}},"$m1s",function(){
try{
return [this.immediateparent,"width"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["displayName","<anonymous extends='view'>","children",[{attrs:{$classrootdepth:4,buttLabel:"C",resource:"button_red"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,align:"right",buttLabel:"/",labelX:13},"class":$lzc$class_calcButton}],"__LZCSSTagSelectors",["view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}}},$lzc$class__m1t.attributes)
}}})($lzc$class__m1t)
};{
Class.make("$lzc$class_poodllcalc",["calculator",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],LzView,["tagname","poodllcalc","children",[{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:1,buttons:void 0,display:void 0,name:"calculator",resource:"calc_body",x:20,y:20},children:[{attrs:{$classrootdepth:2,name:"display"},"class":$lzc$class_calcDisplay},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:2,name:"buttons",row1:void 0,row2:void 0,row3:void 0,row4:void 0,row5:void 0,x:19,y:88},children:[{attrs:{$classrootdepth:3,axis:"y",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:3,name:"row1",width:new LzAlwaysExpr("$m1r","$m1s",null)},"class":$lzc$class__m1t},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:3,name:"row2"},children:[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"7"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"8"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"9"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"*",labelX:13},"class":$lzc$class_calcButton}],"class":LzView},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:3,name:"row3"},children:[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"4"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"5"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"6"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"-",labelX:15},"class":$lzc$class_calcButton}],"class":LzView},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:3,name:"row4"},children:[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"1"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"2"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"3"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"+"},"class":$lzc$class_calcButton}],"class":LzView},{attrs:{$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}},$classrootdepth:3,name:"row5"},children:[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"0"},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"+/-",labelX:1},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:".",labelX:16},"class":$lzc$class_calcButton},{attrs:{$classrootdepth:4,buttLabel:"=",labelX:12,resource:"button_grn"},"class":$lzc$class_calcButton}],"class":LzView}],"class":LzView}],"class":LzView}],"__LZCSSTagSelectors",["poodllcalc","view","node","Instance"],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$CSSDescriptor:{},$attributeDescriptor:{types:{aaactive:"boolean",aadescription:"string",aaname:"string",aasilent:"boolean",aatabindex:"number",align:"string",backgroundrepeat:"string",bgcolor:"color",cachebitmap:"boolean",capabilities:"string",classroot:"string",clickable:"boolean",clickregion:"string",clip:"boolean",cloneManager:"string",contextmenu:"string",cornerradius:"string",cursor:"token",datapath:"string",defaultplacement:"string",fgcolor:"color",focusable:"boolean",focustrap:"boolean",font:"string",fontsize:"size",fontstyle:"string",frame:"numberExpression",framesloadratio:"number",hasdirectionallayout:"boolean",hassetheight:"boolean",hassetwidth:"boolean",height:"size",id:"ID",ignoreplacement:"boolean",immediateparent:"string",inited:"boolean",initstage:"string",isinited:"boolean",layout:"css",loadratio:"number",mask:"string",name:"token",nodeLevel:"number",opacity:"number",options:"css",parent:"string",pixellock:"boolean",placement:"string",playing:"boolean",resource:"string",resourceheight:"number",resourcewidth:"number",rotation:"numberExpression",shadowangle:"number",shadowblurradius:"number",shadowcolor:"color",shadowdistance:"number",showhandcursor:"boolean",source:"string",stretches:"string",styleclass:"string",subnodes:"string",subviews:"string",tintcolor:"string",totalframes:"number",transition:"string",unstretchedheight:"number",unstretchedwidth:"number",usegetbounds:"boolean",valign:"string",visibility:"string",visible:"boolean",width:"size","with":"string",x:"numberExpression",xoffset:"numberExpression",xscale:"numberExpression",y:"numberExpression",yoffset:"numberExpression",yscale:"numberExpression"}}},$lzc$class_poodllcalc.attributes)
}}})($lzc$class_poodllcalc)
};Class.make("$lzc$class__m1y",["$m1u",function($0){
var $1=this.parent.width;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}},"$m1v",function(){
try{
return [this.parent,"width"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$m1w",function($0){
var $1=this.parent.height;if($1!==this["height"]||!this.inited){
this.setAttribute("height",$1)
}},"$m1x",function(){
try{
return [this.parent,"height"]
}
catch($lzsc$e){
if(Error["$lzsc$isa"]?Error.$lzsc$isa($lzsc$e):$lzsc$e instanceof Error){
lz.$lzsc$thrownError=$lzsc$e
};throw $lzsc$e
}},"$lzsc$initialize",function($0,$1,$2,$3){
switch(arguments.length){
case 0:
$0=null;
case 1:
$1=null;
case 2:
$2=null;
case 3:
$3=false;

};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzsc$initialize"]||this.nextMethod(arguments.callee,"$lzsc$initialize")).call(this,$0,$1,$2,$3)
}],$lzc$class_poodllcalc,["displayName","<anonymous extends='poodllcalc'>","children",LzNode.mergeChildren([],$lzc$class_poodllcalc["children"]),"__LZCSSTagSelectors",["poodllcalc","view","node","Instance"],"attributes",new LzInheritedHash($lzc$class_poodllcalc.attributes)]);canvas.LzInstantiateView({attrs:{height:new LzAlwaysExpr("$m1w","$m1x",null),width:new LzAlwaysExpr("$m1u","$m1v",null)},"class":$lzc$class__m1y},51);lz["basefocusview"]=$lzc$class_basefocusview;lz["focusoverlay"]=$lzc$class_focusoverlay;lz["_componentmanager"]=$lzc$class__componentmanager;lz["style"]=$lzc$class_style;lz["statictext"]=$lzc$class_statictext;lz["basecomponent"]=$lzc$class_basecomponent;lz["basebutton"]=$lzc$class_basebutton;lz["layout"]=LzLayout;lz["simplelayout"]=$lzc$class_simplelayout;lz["calcButton"]=$lzc$class_calcButton;lz["calcDisplay"]=$lzc$class_calcDisplay;lz["poodllcalc"]=$lzc$class_poodllcalc;canvas.initDone();