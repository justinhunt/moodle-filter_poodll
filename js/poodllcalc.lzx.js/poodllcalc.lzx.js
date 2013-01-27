LzResourceLibrary.lzfocusbracket_rsrc={ptype:"sr",frames:["lps/components/lz/resources/focus/focus_top_lft.png","lps/components/lz/resources/focus/focus_top_rt.png","lps/components/lz/resources/focus/focus_bot_lft.png","lps/components/lz/resources/focus/focus_bot_rt.png"],width:7,height:7,sprite:"lps/components/lz/resources/focus/focus_top_lft.sprite.png",spriteoffset:0};LzResourceLibrary.lzfocusbracket_shdw={ptype:"sr",frames:["lps/components/lz/resources/focus/focus_top_lft_shdw.png","lps/components/lz/resources/focus/focus_top_rt_shdw.png","lps/components/lz/resources/focus/focus_bot_lft_shdw.png","lps/components/lz/resources/focus/focus_bot_rt_shdw.png"],width:9,height:9,sprite:"lps/components/lz/resources/focus/focus_top_lft_shdw.sprite.png",spriteoffset:7};LzResourceLibrary.calc_body={ptype:"ar",frames:["resources/body.png"],width:240,height:360,spriteoffset:16};LzResourceLibrary.calc_display={ptype:"ar",frames:["resources/display.png"],width:201,height:46,spriteoffset:376};LzResourceLibrary.button_grn={ptype:"ar",frames:["resources/new_button_green_off.png","resources/new_button_green_over.png","resources/new_button_green_down.png"],width:45,height:45,sprite:"resources/new_button_green_off.sprite.png",spriteoffset:422};LzResourceLibrary.button_blu={ptype:"ar",frames:["resources/new_button_blue_off.png","resources/new_button_blue_over.png","resources/new_button_blue_down.png"],width:45,height:45,sprite:"resources/new_button_blue_off.sprite.png",spriteoffset:467};LzResourceLibrary.button_red={ptype:"ar",frames:["resources/new_button_red_off.png","resources/new_button_red_over.png","resources/new_button_red_down.png"],width:45,height:45,sprite:"resources/new_button_red_off.sprite.png",spriteoffset:512};LzResourceLibrary.__allcss={path:"usr/local/red5/webapps/openlaszlo/my-apps/laszlocalc/poodllcalc.sprite.png"};canvas=new LzCanvas(null,{__LZproxied:"false",appbuilddate:"2013-01-27T14:27:45Z",bgcolor:16777215,embedfonts:true,fontname:"Verdana,Vera,sans-serif",fontsize:11,fontstyle:"plain",height:"100%",lpsbuild:"branches/4.7@15770 (15770)",lpsbuilddate:"2010-02-16T15:18:52Z",lpsrelease:"Production",lpsversion:"4.7.1",runtime:"dhtml",size:lz.Browser.getInitArg("size")?lz.Browser.getInitArg("size"):"normal",width:"100%"});lz.colors.offwhite=15921906;lz.colors.gray10=1710618;lz.colors.gray20=3355443;lz.colors.gray30=5066061;lz.colors.gray40=6710886;lz.colors.gray50=8355711;lz.colors.gray60=10066329;lz.colors.gray70=11776947;lz.colors.gray80=13421772;lz.colors.gray90=15066597;lz.colors.iceblue1=3298963;lz.colors.iceblue2=5472718;lz.colors.iceblue3=12240085;lz.colors.iceblue4=14017779;lz.colors.iceblue5=15659509;lz.colors.palegreen1=4290113;lz.colors.palegreen2=11785139;lz.colors.palegreen3=12637341;lz.colors.palegreen4=13888170;lz.colors.palegreen5=15725032;lz.colors.gold1=9331721;lz.colors.gold2=13349195;lz.colors.gold3=15126388;lz.colors.gold4=16311446;lz.colors.sand1=13944481;lz.colors.sand2=14276546;lz.colors.sand3=15920859;lz.colors.sand4=15986401;lz.colors.ltpurple1=6575768;lz.colors.ltpurple2=12038353;lz.colors.ltpurple3=13353453;lz.colors.ltpurple4=15329264;lz.colors.grayblue=12501704;lz.colors.graygreen=12635328;lz.colors.graypurple=10460593;lz.colors.ltblue=14540287;lz.colors.ltgreen=14548957;Class.make("$lzc$class_basefocusview",LzView,["active",void 0,"$lzc$set_active",function($0){
with(this){
setActive($0)
}},"target",void 0,"$lzc$set_target",function($0){
with(this){
setTarget($0)
}},"duration",void 0,"_animatorcounter",void 0,"ontarget",void 0,"_nexttarget",void 0,"onactive",void 0,"_xydelegate",void 0,"_widthdel",void 0,"_heightdel",void 0,"_delayfadeoutDL",void 0,"_dofadeout",void 0,"_onstopdel",void 0,"reset",function(){
with(this){
this.setAttribute("x",0);this.setAttribute("y",0);this.setAttribute("width",canvas.width);this.setAttribute("height",canvas.height);setTarget(null)
}},"setActive",function($0){
this.active=$0;if(this.onactive)this.onactive.sendEvent($0)
},"doFocus",function($0){
with(this){
this._dofadeout=false;this.bringToFront();if(this.target)this.setTarget(null);this.setAttribute("visibility",this.active?"visible":"hidden");this._nexttarget=$0;if(visible){
this._animatorcounter+=1;var $1=null;var $2;var $3;var $4;var $5;if($0["getFocusRect"])$1=$0.getFocusRect();if($1){
$2=$1[0];$3=$1[1];$4=$1[2];$5=$1[3]
}else{
$2=$0.getAttributeRelative("x",canvas);$3=$0.getAttributeRelative("y",canvas);$4=$0.getAttributeRelative("width",canvas);$5=$0.getAttributeRelative("height",canvas)
};var $6=this.animate("x",$2,duration);this.animate("y",$3,duration);this.animate("width",$4,duration);this.animate("height",$5,duration);if(this.capabilities["minimize_opacity_changes"]){
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
}}},"stopanim",function($0){
with(this){
this._animatorcounter-=1;if(this._animatorcounter<1){
this._dofadeout=true;if(!this._delayfadeoutDL)this._delayfadeoutDL=new LzDelegate(this,"fadeout");lz.Timer.addTimer(this._delayfadeoutDL,1000);this.setTarget(_nexttarget);this._onstopdel.unregisterAll()
}}},"fadeout",function($0){
with(this){
if(_dofadeout){
if(this.capabilities["minimize_opacity_changes"]){
this.setAttribute("visibility","hidden")
}else{
this.animate("opacity",0,500)
}};this._delayfadeoutDL.unregisterAll()
}},"setTarget",function($0){
with(this){
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
};this._widthdel.register($0,"onwidth");this._heightdel.register($0,"onheight");followXY(null);followWidth(null);followHeight(null)
}},"followXY",function($0){
with(this){
var $1=null;if(target["getFocusRect"])$1=target.getFocusRect();if($1){
this.setAttribute("x",$1[0]);this.setAttribute("y",$1[1])
}else{
this.setAttribute("x",this.target.getAttributeRelative("x",canvas));this.setAttribute("y",this.target.getAttributeRelative("y",canvas))
}}},"followWidth",function($0){
with(this){
var $1=null;if(target["getFocusRect"])$1=target.getFocusRect();if($1){
this.setAttribute("width",$1[2])
}else{
this.setAttribute("width",this.target.width)
}}},"followHeight",function($0){
with(this){
var $1=null;if(target["getFocusRect"])$1=target.getFocusRect();if($1){
this.setAttribute("height",$1[3])
}else{
this.setAttribute("height",this.target.height)
}}},"$m1",function(){
with(this){
var $0=lz.Focus;return $0
}},"$m2",function($0){
with(this){
this.setActive(lz.Focus.focuswithkey);if($0){
this.doFocus($0)
}else{
this.reset();if(this.active){
this.setActive(false)
}}}},"$lzsc$initialize",function($0,$1,$2,$3){
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
}],["tagname","basefocusview","attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$delegates:["onstop","stopanim",null,"onfocus","$m2","$m1"],_animatorcounter:0,_delayfadeoutDL:null,_dofadeout:false,_heightdel:null,_nexttarget:null,_onstopdel:null,_widthdel:null,_xydelegate:null,active:false,duration:400,initstage:"late",onactive:LzDeclaredEvent,ontarget:LzDeclaredEvent,options:{ignorelayout:true},target:null,visible:false},$lzc$class_basefocusview.attributes)
}}})($lzc$class_basefocusview);Class.make("$lzc$class_m19",LzView,["$m3",function($0){
with(this){
var $1=-classroot.offset;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}}},"$m4",function(){
with(this){
return [classroot,"offset"]
}},"$m5",function($0){
with(this){
var $1=-classroot.offset;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}}},"$m6",function(){
with(this){
return [classroot,"offset"]
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
}],["children",[{attrs:{$classrootdepth:2,opacity:0.25,resource:"lzfocusbracket_shdw",x:1,y:1},"class":LzView},{attrs:{$classrootdepth:2,resource:"lzfocusbracket_rsrc"},"class":LzView}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m20",LzView,["$m7",function($0){
with(this){
var $1=parent.width-width+classroot.offset;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}}},"$m8",function(){
with(this){
return [parent,"width",this,"width",classroot,"offset"]
}},"$m9",function($0){
with(this){
var $1=-classroot.offset;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}}},"$m10",function(){
with(this){
return [classroot,"offset"]
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
}],["children",[{attrs:{$classrootdepth:2,frame:2,opacity:0.25,resource:"lzfocusbracket_shdw",x:1,y:1},"class":LzView},{attrs:{$classrootdepth:2,frame:2,resource:"lzfocusbracket_rsrc"},"class":LzView}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m21",LzView,["$m11",function($0){
with(this){
var $1=-classroot.offset;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}}},"$m12",function(){
with(this){
return [classroot,"offset"]
}},"$m13",function($0){
with(this){
var $1=parent.height-height+classroot.offset;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}}},"$m14",function(){
with(this){
return [parent,"height",this,"height",classroot,"offset"]
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
}],["children",[{attrs:{$classrootdepth:2,frame:3,opacity:0.25,resource:"lzfocusbracket_shdw",x:1,y:1},"class":LzView},{attrs:{$classrootdepth:2,frame:3,resource:"lzfocusbracket_rsrc"},"class":LzView}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m22",LzView,["$m15",function($0){
with(this){
var $1=parent.width-width+classroot.offset;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}}},"$m16",function(){
with(this){
return [parent,"width",this,"width",classroot,"offset"]
}},"$m17",function($0){
with(this){
var $1=parent.height-height+classroot.offset;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}}},"$m18",function(){
with(this){
return [parent,"height",this,"height",classroot,"offset"]
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
}],["children",[{attrs:{$classrootdepth:2,frame:4,opacity:0.25,resource:"lzfocusbracket_shdw",x:1,y:1},"class":LzView},{attrs:{$classrootdepth:2,frame:4,resource:"lzfocusbracket_rsrc"},"class":LzView}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_focusoverlay",$lzc$class_basefocusview,["offset",void 0,"topleft",void 0,"topright",void 0,"bottomleft",void 0,"bottomright",void 0,"doFocus",function($0){
with(this){
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["doFocus"]||this.nextMethod(arguments.callee,"doFocus")).call(this,$0);if(visible)this.bounce()
}},"bounce",function(){
with(this){
this.animate("offset",12,duration/2);this.animate("offset",5,duration)
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
}],["tagname","focusoverlay","children",[{attrs:{$classrootdepth:1,name:"topleft",x:new LzAlwaysExpr("$m3","$m4"),y:new LzAlwaysExpr("$m5","$m6")},"class":$lzc$class_m19},{attrs:{$classrootdepth:1,name:"topright",x:new LzAlwaysExpr("$m7","$m8"),y:new LzAlwaysExpr("$m9","$m10")},"class":$lzc$class_m20},{attrs:{$classrootdepth:1,name:"bottomleft",x:new LzAlwaysExpr("$m11","$m12"),y:new LzAlwaysExpr("$m13","$m14")},"class":$lzc$class_m21},{attrs:{$classrootdepth:1,name:"bottomright",x:new LzAlwaysExpr("$m15","$m16"),y:new LzAlwaysExpr("$m17","$m18")},"class":$lzc$class_m22}],"attributes",new LzInheritedHash($lzc$class_basefocusview.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({offset:5},$lzc$class_focusoverlay.attributes)
}}})($lzc$class_focusoverlay);Class.make("$lzc$class__componentmanager",LzNode,["focusclass",void 0,"keyhandlers",void 0,"lastsdown",void 0,"lastedown",void 0,"defaults",void 0,"currentdefault",void 0,"defaultstyle",void 0,"ondefaultstyle",void 0,"init",function(){
with(this){
var $0=this.focusclass;if(typeof canvas.focusclass!="undefined"){
$0=canvas.focusclass
};if($0!=null){
canvas.__focus=new (lz[$0])(canvas);canvas.__focus.reset()
};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["init"]||this.nextMethod(arguments.callee,"init")).call(this)
}},"_lastkeydown",void 0,"upkeydel",void 0,"$m23",function(){
with(this){
var $0=lz.Keys;return $0
}},"dispatchKeyDown",function($0){
with(this){
var $1=false;if($0==32){
this.lastsdown=null;var $2=lz.Focus.getFocus();if($2 instanceof lz.basecomponent){
$2.doSpaceDown();this.lastsdown=$2
};$1=true
}else if($0==13&&this.currentdefault){
this.lastedown=this.currentdefault;this.currentdefault.doEnterDown();$1=true
};if($1){
if(!this.upkeydel)this.upkeydel=new LzDelegate(this,"dispatchKeyTimer");this._lastkeydown=$0;lz.Timer.addTimer(this.upkeydel,50)
}}},"dispatchKeyTimer",function($0){
if(this._lastkeydown==32&&this.lastsdown!=null){
this.lastsdown.doSpaceUp();this.lastsdown=null
}else if(this._lastkeydown==13&&this.currentdefault&&this.currentdefault==this.lastedown){
this.currentdefault.doEnterUp()
}},"findClosestDefault",function($0){
with(this){
if(!this.defaults){
return null
};var $1=null;var $2=null;var $3=this.defaults;$0=$0||canvas;var $4=lz.ModeManager.getModalView();for(var $5=0;$5<$3.length;$5++){
var $6=$3[$5];if($4&&!$6.childOf($4)){
continue
};var $7=this.findCommonParent($6,$0);if($7&&(!$1||$7.nodeLevel>$1.nodeLevel)){
$1=$7;$2=$6
}};return $2
}},"findCommonParent",function($0,$1){
while($0.nodeLevel>$1.nodeLevel){
$0=$0.immediateparent;if(!$0.visible)return null
};while($1.nodeLevel>$0.nodeLevel){
$1=$1.immediateparent;if(!$1.visible)return null
};while($0!=$1){
$0=$0.immediateparent;$1=$1.immediateparent;if(!$0.visible||!$1.visible)return null
};return $0
},"makeDefault",function($0){
with(this){
if(!this.defaults)this.defaults=[];this.defaults.push($0);this.checkDefault(lz.Focus.getFocus())
}},"unmakeDefault",function($0){
with(this){
if(!this.defaults)return;for(var $1=0;$1<this.defaults.length;$1++){
if(this.defaults[$1]==$0){
this.defaults.splice($1,1);this.checkDefault(lz.Focus.getFocus());return
}}}},"$m24",function(){
with(this){
var $0=lz.Focus;return $0
}},"checkDefault",function($0){
with(this){
if(!($0 instanceof lz.basecomponent)||!$0.doesenter){
if($0 instanceof lz.inputtext&&$0.multiline){
$0=null
}else{
$0=this.findClosestDefault($0)
}};if($0==this.currentdefault)return;if(this.currentdefault){
this.currentdefault.setAttribute("hasdefault",false)
};this.currentdefault=$0;if($0){
$0.setAttribute("hasdefault",true)
}}},"$m25",function(){
with(this){
var $0=lz.ModeManager;return $0
}},"$m26",function($0){
with(this){
switch(arguments.length){
case 0:
$0=null;

};if(lz.Focus.getFocus()==null){
this.checkDefault(null)
}}},"setDefaultStyle",function($0){
this.defaultstyle=$0;if(this.ondefaultstyle)this.ondefaultstyle.sendEvent($0)
},"getDefaultStyle",function(){
with(this){
if(this.defaultstyle==null){
this.defaultstyle=new (lz.style)(canvas,{isdefault:true})
};return this.defaultstyle
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
}],["tagname","_componentmanager","attributes",new LzInheritedHash(LzNode.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$delegates:["onkeydown","dispatchKeyDown","$m23","onfocus","checkDefault","$m24","onmode","$m26","$m25"],_lastkeydown:0,currentdefault:null,defaults:null,defaultstyle:null,focusclass:"focusoverlay",keyhandlers:null,lastedown:null,lastsdown:null,ondefaultstyle:LzDeclaredEvent,upkeydel:null},$lzc$class__componentmanager.attributes)
}}})($lzc$class__componentmanager);Class.make("$lzc$class_style",LzNode,["isstyle",void 0,"$m27",function($0){
with(this){
this.setAttribute("canvascolor",LzColorUtils.convertColor("null"))
}},"canvascolor",void 0,"$lzc$set_canvascolor",function($0){
with(this){
setCanvasColor($0)
}},"$m28",function($0){
with(this){
this.setAttribute("textcolor",LzColorUtils.convertColor("gray10"))
}},"textcolor",void 0,"$lzc$set_textcolor",function($0){
with(this){
setStyleAttr($0,"textcolor")
}},"$m29",function($0){
with(this){
this.setAttribute("textfieldcolor",LzColorUtils.convertColor("white"))
}},"textfieldcolor",void 0,"$lzc$set_textfieldcolor",function($0){
with(this){
setStyleAttr($0,"textfieldcolor")
}},"$m30",function($0){
with(this){
this.setAttribute("texthilitecolor",LzColorUtils.convertColor("iceblue1"))
}},"texthilitecolor",void 0,"$lzc$set_texthilitecolor",function($0){
with(this){
setStyleAttr($0,"texthilitecolor")
}},"$m31",function($0){
with(this){
this.setAttribute("textselectedcolor",LzColorUtils.convertColor("black"))
}},"textselectedcolor",void 0,"$lzc$set_textselectedcolor",function($0){
with(this){
setStyleAttr($0,"textselectedcolor")
}},"$m32",function($0){
with(this){
this.setAttribute("textdisabledcolor",LzColorUtils.convertColor("gray60"))
}},"textdisabledcolor",void 0,"$lzc$set_textdisabledcolor",function($0){
with(this){
setStyleAttr($0,"textdisabledcolor")
}},"$m33",function($0){
with(this){
this.setAttribute("basecolor",LzColorUtils.convertColor("offwhite"))
}},"basecolor",void 0,"$lzc$set_basecolor",function($0){
with(this){
setStyleAttr($0,"basecolor")
}},"$m34",function($0){
with(this){
this.setAttribute("bgcolor",LzColorUtils.convertColor("white"))
}},"bgcolor",void 0,"$lzc$set_bgcolor",function($0){
with(this){
setStyleAttr($0,"bgcolor")
}},"$m35",function($0){
with(this){
this.setAttribute("hilitecolor",LzColorUtils.convertColor("iceblue4"))
}},"hilitecolor",void 0,"$lzc$set_hilitecolor",function($0){
with(this){
setStyleAttr($0,"hilitecolor")
}},"$m36",function($0){
with(this){
this.setAttribute("selectedcolor",LzColorUtils.convertColor("iceblue3"))
}},"selectedcolor",void 0,"$lzc$set_selectedcolor",function($0){
with(this){
setStyleAttr($0,"selectedcolor")
}},"$m37",function($0){
with(this){
this.setAttribute("disabledcolor",LzColorUtils.convertColor("gray30"))
}},"disabledcolor",void 0,"$lzc$set_disabledcolor",function($0){
with(this){
setStyleAttr($0,"disabledcolor")
}},"$m38",function($0){
with(this){
this.setAttribute("bordercolor",LzColorUtils.convertColor("gray40"))
}},"bordercolor",void 0,"$lzc$set_bordercolor",function($0){
with(this){
setStyleAttr($0,"bordercolor")
}},"$m39",function($0){
this.setAttribute("bordersize",1)
},"bordersize",void 0,"$lzc$set_bordersize",function($0){
with(this){
setStyleAttr($0,"bordersize")
}},"$m40",function($0){
with(this){
this.setAttribute("menuitembgcolor",LzColorUtils.convertColor("textfieldcolor"))
}},"menuitembgcolor",void 0,"isdefault",void 0,"$lzc$set_isdefault",function($0){
with(this){
_setdefault($0)
}},"onisdefault",void 0,"_setdefault",function($0){
with(this){
this.isdefault=$0;if(isdefault){
lz._componentmanager.service.setDefaultStyle(this);if(this["canvascolor"]!=null){
canvas.setAttribute("bgcolor",this.canvascolor)
}};if(this.onisdefault)this.onisdefault.sendEvent(this)
}},"onstylechanged",void 0,"setStyleAttr",function($0,$1){
this[$1]=$0;if(this["on"+$1])this["on"+$1].sendEvent($1);if(this.onstylechanged)this.onstylechanged.sendEvent(this)
},"setCanvasColor",function($0){
with(this){
if(this.isdefault&&$0!=null){
canvas.setAttribute("bgcolor",$0)
};this.canvascolor=$0;if(this.onstylechanged)this.onstylechanged.sendEvent(this)
}},"extend",function($0){
with(this){
var $1=new (lz.style)();$1.canvascolor=this.canvascolor;$1.textcolor=this.textcolor;$1.textfieldcolor=this.textfieldcolor;$1.texthilitecolor=this.texthilitecolor;$1.textselectedcolor=this.textselectedcolor;$1.textdisabledcolor=this.textdisabledcolor;$1.basecolor=this.basecolor;$1.bgcolor=this.bgcolor;$1.hilitecolor=this.hilitecolor;$1.selectedcolor=this.selectedcolor;$1.disabledcolor=this.disabledcolor;$1.bordercolor=this.bordercolor;$1.bordersize=this.bordersize;$1.menuitembgcolor=this.menuitembgcolor;$1.isdefault=this.isdefault;for(var $2 in $0){
$1[$2]=$0[$2]
};new LzDelegate($1,"_forwardstylechanged",this,"onstylechanged");return $1
}},"_forwardstylechanged",function($0){
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
}],["tagname","style","attributes",new LzInheritedHash(LzNode.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({basecolor:new LzOnceExpr("$m33"),bgcolor:new LzOnceExpr("$m34"),bordercolor:new LzOnceExpr("$m38"),bordersize:new LzOnceExpr("$m39"),canvascolor:new LzOnceExpr("$m27"),disabledcolor:new LzOnceExpr("$m37"),hilitecolor:new LzOnceExpr("$m35"),isdefault:false,isstyle:true,menuitembgcolor:new LzOnceExpr("$m40"),onisdefault:LzDeclaredEvent,onstylechanged:LzDeclaredEvent,selectedcolor:new LzOnceExpr("$m36"),textcolor:new LzOnceExpr("$m28"),textdisabledcolor:new LzOnceExpr("$m32"),textfieldcolor:new LzOnceExpr("$m29"),texthilitecolor:new LzOnceExpr("$m30"),textselectedcolor:new LzOnceExpr("$m31")},$lzc$class_style.attributes)
}}})($lzc$class_style);canvas.LzInstantiateView({"class":lz.script,attrs:{script:function(){
lz._componentmanager.service=new (lz._componentmanager)(canvas,null,null,true)
}}},1);Class.make("$lzc$class_statictext",LzText,["$lzsc$initialize",function($0,$1,$2,$3){
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
}],["tagname","statictext","attributes",new LzInheritedHash(LzText.attributes)]);Class.make("$lzc$class_basecomponent",LzView,["enabled",void 0,"$lzc$set_focusable",function($0){
with(this){
_setFocusable($0)
}},"_focusable",void 0,"onfocusable",void 0,"text",void 0,"doesenter",void 0,"$lzc$set_doesenter",function($0){
this._setDoesEnter($0)
},"$m41",function($0){
var $1=this.enabled&&(this._parentcomponent?this._parentcomponent._enabled:true);if($1!==this["_enabled"]||!this.inited){
this.setAttribute("_enabled",$1)
}},"$m42",function(){
return [this,"enabled",this,"_parentcomponent",this._parentcomponent,"_enabled"]
},"_enabled",void 0,"$lzc$set__enabled",function($0){
this._setEnabled($0)
},"_parentcomponent",void 0,"_initcomplete",void 0,"isdefault",void 0,"$lzc$set_isdefault",function($0){
this._setIsDefault($0)
},"onisdefault",void 0,"hasdefault",void 0,"_setEnabled",function($0){
with(this){
this._enabled=$0;var $1=this._enabled&&this._focusable;if($1!=this.focusable){
this.focusable=$1;if(this.onfocusable.ready)this.onfocusable.sendEvent()
};if(_initcomplete)_showEnabled();if(this.on_enabled.ready)this.on_enabled.sendEvent()
}},"_setFocusable",function($0){
this._focusable=$0;if(this.enabled){
this.focusable=this._focusable;if(this.onfocusable.ready)this.onfocusable.sendEvent()
}else{
this.focusable=false
}},"construct",function($0,$1){
with(this){
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["construct"]||this.nextMethod(arguments.callee,"construct")).call(this,$0,$1);var $2=this.immediateparent;while($2!=canvas){
if(lz.basecomponent["$lzsc$isa"]?lz.basecomponent.$lzsc$isa($2):$2 instanceof lz.basecomponent){
this._parentcomponent=$2;break
};$2=$2.immediateparent
}}},"init",function(){
with(this){
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["init"]||this.nextMethod(arguments.callee,"init")).call(this);this._initcomplete=true;this._mousedownDel=new LzDelegate(this,"_doMousedown",this,"onmousedown");if(this.styleable){
_usestyle()
};if(!this["_enabled"])_showEnabled()
}},"_doMousedown",function($0){},"doSpaceDown",function(){
return false
},"doSpaceUp",function(){
return false
},"doEnterDown",function(){
return false
},"doEnterUp",function(){
return false
},"_setIsDefault",function($0){
with(this){
this.isdefault=this["isdefault"]==true;if(this.isdefault==$0)return;if($0){
lz._componentmanager.service.makeDefault(this)
}else{
lz._componentmanager.service.unmakeDefault(this)
};this.isdefault=$0;if(this.onisdefault.ready){
this.onisdefault.sendEvent($0)
}}},"_setDoesEnter",function($0){
with(this){
this.doesenter=$0;if(lz.Focus.getFocus()==this){
lz._componentmanager.service.checkDefault(this)
}}},"updateDefault",function(){
with(this){
lz._componentmanager.service.checkDefault(lz.Focus.getFocus())
}},"$m43",function($0){
this.setAttribute("style",null)
},"style",void 0,"$lzc$set_style",function($0){
with(this){
styleable?setStyle($0):(this.style=null)
}},"styleable",void 0,"_style",void 0,"onstyle",void 0,"_styledel",void 0,"_otherstyledel",void 0,"setStyle",function($0){
with(this){
if(!styleable)return;if($0!=null&&!$0["isstyle"]){
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
};_setstyle($0)
}},"_usestyle",function($0){
switch(arguments.length){
case 0:
$0=null;

};if(this._initcomplete&&this["style"]&&this.style.isinited){
this._applystyle(this.style)
}},"_setstyle",function($0){
with(this){
if(!this._styledel){
this._styledel=new LzDelegate(this,"_usestyle")
}else{
_styledel.unregisterAll()
};if($0){
_styledel.register($0,"onstylechanged")
};this.style=$0;_usestyle();if(this.onstyle.ready)this.onstyle.sendEvent(this.style)
}},"_applystyle",function($0){},"setTint",function($0,$1,$2){
switch(arguments.length){
case 2:
$2=0;

};if($0.capabilities.colortransform){
if($1!=""&&$1!=null){
var $3=$1;var $4=$3>>16&255;var $5=$3>>8&255;var $6=$3&255;$4+=51;$5+=51;$6+=51;$4=$4/255*100;$5=$5/255*100;$6=$6/255*100;$0.setColorTransform({ra:$4,ga:$5,ba:$6,rb:$2,gb:$2,bb:$2})
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
with(this){
if(this["isdefault"]&&this.isdefault){
lz._componentmanager.service.unmakeDefault(this)
};if(this._otherstyledel){
this._otherstyledel.unregisterAll();this._otherstyledel=null
};if(this._styledel){
this._styledel.unregisterAll();this._styledel=null
};(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["destroy"]||this.nextMethod(arguments.callee,"destroy")).call(this)
}},"toString",function(){
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
}],["tagname","basecomponent","attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({_enabled:new LzAlwaysExpr("$m41","$m42"),_focusable:true,_initcomplete:false,_otherstyledel:null,_parentcomponent:null,_style:null,_styledel:null,doesenter:false,enabled:true,focusable:true,hasdefault:false,on_enabled:LzDeclaredEvent,onfocusable:LzDeclaredEvent,onisdefault:LzDeclaredEvent,onstyle:LzDeclaredEvent,style:new LzOnceExpr("$m43"),styleable:true,text:""},$lzc$class_basecomponent.attributes)
}}})($lzc$class_basecomponent);Class.make("$lzc$class_basebutton",$lzc$class_basecomponent,["normalResourceNumber",void 0,"overResourceNumber",void 0,"downResourceNumber",void 0,"disabledResourceNumber",void 0,"$m44",function($0){
this.setAttribute("maxframes",this.totalframes)
},"maxframes",void 0,"resourceviewcount",void 0,"$lzc$set_resourceviewcount",function($0){
this.setResourceViewCount($0)
},"respondtomouseout",void 0,"$m45",function($0){
this.setAttribute("reference",this)
},"reference",void 0,"$lzc$set_reference",function($0){
with(this){
setreference($0)
}},"onresourceviewcount",void 0,"_msdown",void 0,"_msin",void 0,"setResourceViewCount",function($0){
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
},"$m46",function(){
with(this){
var $0=lz.ModeManager;return $0
}},"$m47",function($0){
if($0&&(this._msdown||this._msin)&&!this.childOf($0)){
this._msdown=false;this._msin=false;this._callShow()
}},"$lzc$set_frame",function($0){
with(this){
if(this.resourceviewcount>0){
for(var $1=0;$1<resourceviewcount;$1++){
this.subviews[$1].setAttribute("frame",$0)
}}else{
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["$lzc$set_frame"]||this.nextMethod(arguments.callee,"$lzc$set_frame")).call(this,$0)
}}},"doSpaceDown",function(){
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
}},"$m48",function($0){
if(this.isinited){
this.maxframes=this.totalframes;this._callShow()
}},"init",function(){
(arguments.callee["$superclass"]&&arguments.callee.$superclass.prototype["init"]||this.nextMethod(arguments.callee,"init")).call(this);this.setResourceViewCount(this.resourceviewcount);this._callShow()
},"$m49",function($0){
this.setAttribute("_msin",true);this._callShow()
},"$m50",function($0){
this.setAttribute("_msin",false);this._callShow()
},"$m51",function($0){
this.setAttribute("_msdown",true);this._callShow()
},"$m52",function($0){
this.setAttribute("_msdown",false);this._callShow()
},"_showEnabled",function(){
with(this){
reference.setAttribute("clickable",this._enabled);showUp()
}},"showDown",function($0){
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
with(this){
setTint(this,$0.basecolor)
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
}],["tagname","basebutton","attributes",new LzInheritedHash($lzc$class_basecomponent.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$delegates:["onmode","$m47","$m46","ontotalframes","$m48",null,"onmouseover","$m49",null,"onmouseout","$m50",null,"onmousedown","$m51",null,"onmouseup","$m52",null],_msdown:false,_msin:false,clickable:true,disabledResourceNumber:4,downResourceNumber:3,focusable:false,maxframes:new LzOnceExpr("$m44"),normalResourceNumber:1,onclick:LzDeclaredEvent,onresourceviewcount:LzDeclaredEvent,overResourceNumber:2,reference:new LzOnceExpr("$m45"),resourceviewcount:0,respondtomouseout:true,styleable:false},$lzc$class_basebutton.attributes)
}}})($lzc$class_basebutton);Class.make("$lzc$class_simplelayout",LzLayout,["axis",void 0,"$lzc$set_axis",function($0){
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
}],["tagname","simplelayout","attributes",new LzInheritedHash(LzLayout.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({axis:"y",inset:0,spacing:0},$lzc$class_simplelayout.attributes)
}}})($lzc$class_simplelayout);Class.make("$lzc$class_dimensions",LzView,["size",void 0,"$m53",function($0){
switch(this.size){
case "tiny":
this.setAttribute("framewidth",170);this.setAttribute("frameheight",260);this.setAttribute("fontsize",18);this.setAttribute("btextx",5);this.setAttribute("bsize",30);this.setAttribute("cdispx",10);this.setAttribute("cdispy",31);this.setAttribute("cdispw",135);this.setAttribute("cdisph",30);this.setAttribute("cdispscreenh",30);this.setAttribute("cdispscreenw",135);this.setAttribute("cdispscreenx",5);this.setAttribute("cdispscreeny",5);break;
case "small":
this.setAttribute("framewidth",200);this.setAttribute("frameheight",300);this.setAttribute("fontsize",18);this.setAttribute("btextx",7);this.setAttribute("bsize",35);this.setAttribute("cdispx",20);this.setAttribute("cdispy",31);this.setAttribute("cdispw",165);this.setAttribute("cdisph",30);this.setAttribute("cdispscreenh",30);this.setAttribute("cdispscreenw",165);this.setAttribute("cdispscreenx",5);this.setAttribute("cdispscreeny",5);break;
case "normal":
default:
this.setAttribute("framewidth",240);this.setAttribute("frameheight",360);this.setAttribute("fontsize",25);this.setAttribute("btextx",11);this.setAttribute("bsize",45);this.setAttribute("cdispx",20);this.setAttribute("cdispy",31);this.setAttribute("cdispw",201);this.setAttribute("cdisph",46);this.setAttribute("cdispscreenh",30);this.setAttribute("cdispscreenw",201);this.setAttribute("cdispscreenx",5);this.setAttribute("cdispscreeny",5);break;

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
}],["tagname","dimensions","attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$delegates:["oninit","$m53",null]},$lzc$class_dimensions.attributes)
}}})($lzc$class_dimensions);Class.make("$lzc$class_m58",LzText,["$m56",function($0){
with(this){
this.setAttribute("fontsize",classroot.labelX==1?classroot.dim.fontsize-2:classroot.dim.fontsize)
}},"$m57",function($0){
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
}],["attributes",new LzInheritedHash(LzText.attributes)]);Class.make("$lzc$class_calcButton",$lzc$class_basebutton,["$m54",function($0){
with(this){
parent.classroot.calculator.display.inputDigit(this)
}},"$m55",function($0){
this.initButton()
},"buttLabel",void 0,"labelX",void 0,"dim",void 0,"initButton",function(){
with(this){
this.buttonText.setAttribute("text",this.buttLabel);this.setAttribute("width",dim.bsize);this.setAttribute("height",dim.bsize)
}},"buttonText",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
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
}],["tagname","calcButton","children",[{attrs:{$classrootdepth:1,$delegates:["ontext","$m57",null],align:"center",fgcolor:LzColorUtils.convertColor("0xffffff"),font:"obliqueText",fontsize:new LzOnceExpr("$m56"),name:"buttonText",valign:"middle"},"class":$lzc$class_m58}],"attributes",new LzInheritedHash($lzc$class_basebutton.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$delegates:["onclick","$m54",null,"oninit","$m55",null],clickable:true,labelX:11,resource:"button_blu",stretches:"both"},$lzc$class_calcButton.attributes)
}}})($lzc$class_calcButton);Class.make("$lzc$class_m65",LzText,["$m60",function($0){
with(this){
this.setAttribute("height",classroot.dim.cdispscreenh)
}},"$m61",function($0){
with(this){
this.setAttribute("width",classroot.dim.cdispscreenw)
}},"$m62",function($0){
with(this){
this.setAttribute("fontsize",classroot.dim.fontsize)
}},"$m63",function($0){
with(this){
this.setAttribute("y",classroot.dim.cdispscreeny)
}},"$m64",function($0){
with(this){
this.setAttribute("x",classroot.dim.cdispscreenx)
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
}],["attributes",new LzInheritedHash(LzText.attributes)]);Class.make("$lzc$class_calcDisplay",LzView,["$m59",function($0){
this.start()
},"dim",void 0,"screen",void 0,"start",function(){
with(this){
this.valueX=0;this.lastInput="none";this.oldValue=false;this.allOperators=new Array("+","-","/","*");this.operator="+";this.screen.setAttribute("text",this.valueX.toString())
}},"clear",function(){
this.start()
},"inputDigit",function($0){
with(this){
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
}},"inputOperator",function($0){
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
with(this){
if(this.lastInput=="digit"||this.lastInput=="equals"){
var $0=(this.screen.text-0)*-1;this.screen.setAttribute("text",$0.toString())
}else{
clear()
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
}],["tagname","calcDisplay","children",[{attrs:{$classrootdepth:1,font:"displayText",fontsize:new LzOnceExpr("$m62"),height:new LzOnceExpr("$m60"),name:"screen",text:"0",width:new LzOnceExpr("$m61"),x:new LzOnceExpr("$m64"),y:new LzOnceExpr("$m63")},"class":$lzc$class_m65}],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({$delegates:["oninit","$m59",null],resource:"calc_display",stretches:"both"},$lzc$class_calcDisplay.attributes)
}}})($lzc$class_calcDisplay);canvas.LzInstantiateView({"class":lz.script,attrs:{script:function(){
isInArray=void 0;isInArray=function($0,$1){
var $2=false;for(var $3=0;$3<$1.length;$3++){
if($1[$3]==$0){
$2=true
}};return $2
}}}},1);Class.make("$lzc$class_m138",$lzc$class_dimensions,["$m66",function($0){
with(this){
var $1=classroot.size;if($1!==this["size"]||!this.inited){
this.setAttribute("size",$1)
}}},"$m67",function(){
with(this){
return [classroot,"size"]
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
}],["attributes",new LzInheritedHash($lzc$class_dimensions.attributes)]);Class.make("$lzc$class_m140",$lzc$class_calcDisplay,["$m72",function($0){
with(this){
var $1=classroot.dim.cdispx;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}}},"$m73",function(){
with(this){
return [classroot.dim,"cdispx"]
}},"$m74",function($0){
with(this){
var $1=classroot.dim.cdispy;if($1!==this["y"]||!this.inited){
this.setAttribute("y",$1)
}}},"$m75",function(){
with(this){
return [classroot.dim,"cdispy"]
}},"$m76",function($0){
with(this){
var $1=classroot.dim.cdisph;if($1!==this["height"]||!this.inited){
this.setAttribute("height",$1)
}}},"$m77",function(){
with(this){
return [classroot.dim,"cdisph"]
}},"$m78",function($0){
with(this){
var $1=classroot.dim.cdispw;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m79",function(){
with(this){
return [classroot.dim,"cdispw"]
}},"$m80",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m81",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcDisplay["children"]),"attributes",new LzInheritedHash($lzc$class_calcDisplay.attributes)]);Class.make("$lzc$class_m143",$lzc$class_calcButton,["$m86",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m87",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m144",LzView,["$m88",function($0){
with(this){
var $1=classroot.dim.bsize;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m89",function(){
with(this){
return [classroot.dim,"bsize"]
}},"$m90",function($0){
with(this){
var $1=classroot.dim.bsize;if($1!==this["height"]||!this.inited){
this.setAttribute("height",$1)
}}},"$m91",function(){
with(this){
return [classroot.dim,"bsize"]
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
}],["attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m145",LzView,["$m92",function($0){
with(this){
var $1=classroot.dim.bsize;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m93",function(){
with(this){
return [classroot.dim,"bsize"]
}},"$m94",function($0){
with(this){
var $1=classroot.dim.bsize;if($1!==this["height"]||!this.inited){
this.setAttribute("height",$1)
}}},"$m95",function(){
with(this){
return [classroot.dim,"bsize"]
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
}],["attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m146",$lzc$class_calcButton,["$m96",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m97",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m142",LzView,["$m84",function($0){
with(this){
var $1=classroot.dim.cdispw;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m85",function(){
with(this){
return [classroot.dim,"cdispw"]
}},"spacer1",void 0,"spacer2",void 0,"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
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
}],["children",[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"C",dim:new LzAlwaysExpr("$m86","$m87"),resource:"button_red"},"class":$lzc$class_m143},{attrs:{$classrootdepth:4,height:new LzAlwaysExpr("$m90","$m91"),name:"spacer1",width:new LzAlwaysExpr("$m88","$m89")},"class":$lzc$class_m144},{attrs:{$classrootdepth:4,height:new LzAlwaysExpr("$m94","$m95"),name:"spacer2",width:new LzAlwaysExpr("$m92","$m93")},"class":$lzc$class_m145},{attrs:{$classrootdepth:4,buttLabel:"/",dim:new LzAlwaysExpr("$m96","$m97"),labelX:13},"class":$lzc$class_m146}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m148",$lzc$class_calcButton,["$m100",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m101",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m149",$lzc$class_calcButton,["$m102",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m103",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m150",$lzc$class_calcButton,["$m104",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m105",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m151",$lzc$class_calcButton,["$m106",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m107",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m147",LzView,["$m98",function($0){
with(this){
var $1=classroot.dim.cdispw;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m99",function(){
with(this){
return [classroot.dim,"cdispw"]
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
}],["children",[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"7",dim:new LzAlwaysExpr("$m100","$m101")},"class":$lzc$class_m148},{attrs:{$classrootdepth:4,buttLabel:"8",dim:new LzAlwaysExpr("$m102","$m103")},"class":$lzc$class_m149},{attrs:{$classrootdepth:4,buttLabel:"9",dim:new LzAlwaysExpr("$m104","$m105")},"class":$lzc$class_m150},{attrs:{$classrootdepth:4,buttLabel:"*",dim:new LzAlwaysExpr("$m106","$m107"),labelX:13},"class":$lzc$class_m151}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m153",$lzc$class_calcButton,["$m110",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m111",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m154",$lzc$class_calcButton,["$m112",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m113",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m155",$lzc$class_calcButton,["$m114",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m115",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m156",$lzc$class_calcButton,["$m116",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m117",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m152",LzView,["$m108",function($0){
with(this){
var $1=classroot.dim.cdispw;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m109",function(){
with(this){
return [classroot.dim,"cdispw"]
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
}],["children",[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"4",dim:new LzAlwaysExpr("$m110","$m111")},"class":$lzc$class_m153},{attrs:{$classrootdepth:4,buttLabel:"5",dim:new LzAlwaysExpr("$m112","$m113")},"class":$lzc$class_m154},{attrs:{$classrootdepth:4,buttLabel:"6",dim:new LzAlwaysExpr("$m114","$m115")},"class":$lzc$class_m155},{attrs:{$classrootdepth:4,buttLabel:"-",dim:new LzAlwaysExpr("$m116","$m117"),labelX:15},"class":$lzc$class_m156}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m158",$lzc$class_calcButton,["$m120",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m121",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m159",$lzc$class_calcButton,["$m122",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m123",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m160",$lzc$class_calcButton,["$m124",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m125",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m161",$lzc$class_calcButton,["$m126",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m127",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m157",LzView,["$m118",function($0){
with(this){
var $1=classroot.dim.cdispw;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m119",function(){
with(this){
return [classroot.dim,"cdispw"]
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
}],["children",[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"1",dim:new LzAlwaysExpr("$m120","$m121")},"class":$lzc$class_m158},{attrs:{$classrootdepth:4,buttLabel:"2",dim:new LzAlwaysExpr("$m122","$m123")},"class":$lzc$class_m159},{attrs:{$classrootdepth:4,buttLabel:"3",dim:new LzAlwaysExpr("$m124","$m125")},"class":$lzc$class_m160},{attrs:{$classrootdepth:4,buttLabel:"+",dim:new LzAlwaysExpr("$m126","$m127")},"class":$lzc$class_m161}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m163",$lzc$class_calcButton,["$m130",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m131",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m164",$lzc$class_calcButton,["$m132",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m133",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m165",$lzc$class_calcButton,["$m134",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m135",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m166",$lzc$class_calcButton,["$m136",function($0){
with(this){
var $1=classroot.dim;if($1!==this["dim"]||!this.inited){
this.setAttribute("dim",$1)
}}},"$m137",function(){
with(this){
return [classroot,"dim"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_calcButton["children"]),"attributes",new LzInheritedHash($lzc$class_calcButton.attributes)]);Class.make("$lzc$class_m162",LzView,["$m128",function($0){
with(this){
var $1=classroot.dim.cdispw;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m129",function(){
with(this){
return [classroot.dim,"cdispw"]
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
}],["children",[{attrs:{$classrootdepth:4,axis:"x",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:4,buttLabel:"0",dim:new LzAlwaysExpr("$m130","$m131")},"class":$lzc$class_m163},{attrs:{$classrootdepth:4,buttLabel:"+/-",dim:new LzAlwaysExpr("$m132","$m133"),labelX:1},"class":$lzc$class_m164},{attrs:{$classrootdepth:4,buttLabel:".",dim:new LzAlwaysExpr("$m134","$m135"),labelX:16},"class":$lzc$class_m165},{attrs:{$classrootdepth:4,buttLabel:"=",dim:new LzAlwaysExpr("$m136","$m137"),labelX:12,resource:"button_grn"},"class":$lzc$class_m166}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m141",LzView,["$m82",function($0){
with(this){
var $1=classroot.dim.cdispx;if($1!==this["x"]||!this.inited){
this.setAttribute("x",$1)
}}},"$m83",function(){
with(this){
return [classroot.dim,"cdispx"]
}},"row1",void 0,"row2",void 0,"row3",void 0,"row4",void 0,"row5",void 0,"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
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
}],["children",[{attrs:{$classrootdepth:3,axis:"y",spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:3,name:"row1",spacer1:void 0,spacer2:void 0,width:new LzAlwaysExpr("$m84","$m85")},"class":$lzc$class_m142},{attrs:{$classrootdepth:3,name:"row2",width:new LzAlwaysExpr("$m98","$m99")},"class":$lzc$class_m147},{attrs:{$classrootdepth:3,name:"row3",width:new LzAlwaysExpr("$m108","$m109")},"class":$lzc$class_m152},{attrs:{$classrootdepth:3,name:"row4",width:new LzAlwaysExpr("$m118","$m119")},"class":$lzc$class_m157},{attrs:{$classrootdepth:3,name:"row5",width:new LzAlwaysExpr("$m128","$m129")},"class":$lzc$class_m162}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_m139",LzView,["$m68",function($0){
with(this){
var $1=classroot.dim.framewidth;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m69",function(){
with(this){
return [classroot.dim,"framewidth"]
}},"$m70",function($0){
with(this){
var $1=classroot.dim.frameheight;if($1!==this["height"]||!this.inited){
this.setAttribute("height",$1)
}}},"$m71",function(){
with(this){
return [classroot.dim,"frameheight"]
}},"display",void 0,"buttons",void 0,"$classrootdepth",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
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
}],["children",[{attrs:{$classrootdepth:2,axis:"y",inset:25,spacing:7},"class":$lzc$class_simplelayout},{attrs:{$classrootdepth:2,dim:new LzAlwaysExpr("$m80","$m81"),height:new LzAlwaysExpr("$m76","$m77"),name:"display",width:new LzAlwaysExpr("$m78","$m79"),x:new LzAlwaysExpr("$m72","$m73"),y:new LzAlwaysExpr("$m74","$m75")},"class":$lzc$class_m140},{attrs:{$classrootdepth:2,name:"buttons",row1:void 0,row2:void 0,row3:void 0,row4:void 0,row5:void 0,x:new LzAlwaysExpr("$m82","$m83"),y:88},"class":$lzc$class_m141}],"attributes",new LzInheritedHash(LzView.attributes)]);Class.make("$lzc$class_poodllcalc",LzView,["size",void 0,"dim",void 0,"calculator",void 0,"$lzsc$initialize",function($0,$1,$2,$3){
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
}],["tagname","poodllcalc","children",[{attrs:{$classrootdepth:1,name:"dim",size:new LzAlwaysExpr("$m66","$m67")},"class":$lzc$class_m138},{attrs:{$classrootdepth:1,buttons:void 0,display:void 0,height:new LzAlwaysExpr("$m70","$m71"),name:"calculator",resource:"calc_body",stretches:"both",width:new LzAlwaysExpr("$m68","$m69"),x:1,y:1},"class":$lzc$class_m139}],"attributes",new LzInheritedHash(LzView.attributes)]);(function($0){
with($0)with($0.prototype){
{
LzNode.mergeAttributes({size:"normal"},$lzc$class_poodllcalc.attributes)
}}})($lzc$class_poodllcalc);Class.make("$lzc$class_m173",$lzc$class_poodllcalc,["$m167",function($0){
with(this){
var $1=parent.width;if($1!==this["width"]||!this.inited){
this.setAttribute("width",$1)
}}},"$m168",function(){
with(this){
return [parent,"width"]
}},"$m169",function($0){
with(this){
var $1=parent.height;if($1!==this["height"]||!this.inited){
this.setAttribute("height",$1)
}}},"$m170",function(){
with(this){
return [parent,"height"]
}},"$m171",function($0){
with(this){
var $1=canvas.size;if($1!==this["size"]||!this.inited){
this.setAttribute("size",$1)
}}},"$m172",function(){
with(this){
return [canvas,"size"]
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
}],["children",LzNode.mergeChildren([],$lzc$class_poodllcalc["children"]),"attributes",new LzInheritedHash($lzc$class_poodllcalc.attributes)]);canvas.LzInstantiateView({attrs:{height:new LzAlwaysExpr("$m169","$m170"),size:new LzAlwaysExpr("$m171","$m172"),width:new LzAlwaysExpr("$m167","$m168")},"class":$lzc$class_m173},56);lz["basefocusview"]=$lzc$class_basefocusview;lz["focusoverlay"]=$lzc$class_focusoverlay;lz["_componentmanager"]=$lzc$class__componentmanager;lz["style"]=$lzc$class_style;lz["statictext"]=$lzc$class_statictext;lz["basecomponent"]=$lzc$class_basecomponent;lz["basebutton"]=$lzc$class_basebutton;lz["simplelayout"]=$lzc$class_simplelayout;lz["dimensions"]=$lzc$class_dimensions;lz["calcButton"]=$lzc$class_calcButton;lz["calcDisplay"]=$lzc$class_calcDisplay;lz["poodllcalc"]=$lzc$class_poodllcalc;canvas.initDone();