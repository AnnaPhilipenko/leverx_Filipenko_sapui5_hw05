/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Splitter','./SplitterRenderer'],function(S,a){"use strict";var A=S.extend("sap.ui.layout.AssociativeSplitter",{metadata:{associations:{associatedContentAreas:{type:"sap.ui.core.Control",multiple:true,singularName:"associatedContentArea"}}},renderer:a});var b=4;A.prototype.init=function(){S.prototype.init.call(this);this._keyListeners={increase:this._onKeyboardResize.bind(this,"inc",1),decrease:this._onKeyboardResize.bind(this,"dec",1),increaseMore:this._onKeyboardResize.bind(this,"incMore",2),decreaseMore:this._onKeyboardResize.bind(this,"decMore",2),max:this._onKeyboardResize.bind(this,"max",1),min:this._onKeyboardResize.bind(this,"min",1)};this._enableKeyboardListeners();};A.prototype._enableKeyboardListeners=function(){S.prototype._enableKeyboardListeners.call(this);this.onsaprightmodifiers=this._keyListeners.increase;this.onsapleftmodifiers=this._keyListeners.decrease;this.onsapupmodifiers=this._keyListeners.decrease;this.onsapdownmodifiers=this._keyListeners.increase;this.onsapright=this._keyListeners.increaseMore;this.onsapdown=this._keyListeners.increaseMore;this.onsapleft=this._keyListeners.decreaseMore;this.onsapup=this._keyListeners.decreaseMore;this.onsapend=this._keyListeners.max;this.onsaphome=this._keyListeners.min;this._keyboardEnabled=true;};A.prototype.addAssociatedContentArea=function(C){this._needsInvalidation=true;_(C);return this.addAssociation("associatedContentAreas",C);};A.prototype.indexOfAssociatedContentArea=function(d){var e=this._getContentAreas();for(var i=0;i<e.length;i++){if(d==e[i]){return i;}}return-1;};A.prototype.insertAssociatedContentArea=function(C,I){var d=C.getId();this._needsInvalidation=true;_(C);var e=this.getAssociatedContentAreas();for(var i=0;i<e.length;i++){if(e[i]===d){e.splice(i,1);}}e.splice(I,0,d);this.setAssociation("associatedContentAreas",null);var t=this;e.forEach(function(d){t.addAssociation("associatedContentAreas",d);});};A.prototype.removeAssociatedContentArea=function(d){this.removeAssociation("associatedContentAreas",d);};A.prototype._getContentAreas=function(){var d=this.getAssociatedContentAreas()||[];var C=this.getContentAreas();var v=d.map(function(i){return sap.ui.getCore().byId(i);}).filter(function(o){return o;});return C.concat(v);};A.prototype.onmousedown=function(j){if(this._ignoreMouse){return;}if(jQuery(j.target).hasClass("sapUiLoSplitterBarIcon")){j.target=j.target.parentElement;}var i=this.getId();if(!j.target.id||j.target.id.indexOf(i+"-splitbar")!==0){return;}this._ignoreTouch=true;this._onBarMoveStart(j);this._oLastDOMclicked=j.target;};A.prototype.ondblclick=function(e){var i=this.getId(),B,C;if(!(e.target.contains(this._oLastDOMclicked)&&(this._oLastDOMclicked.id.indexOf(i+"-splitbar")>-1))){return;}B=parseInt(this._oLastDOMclicked.id.substr((i+"-splitbar-").length),10);C=this._getContentAreas()[B];C._currentPosition=this.getCalculatedSizes()[B];C._lastPosition=C._lastPosition||C._currentPosition;if(C._currentPosition===C._lastPosition){this._resizeContents(B,(this.getCalculatedSizes()[B])*-1,true);}else{this._resizeContents(B,C._lastPosition,true);C._lastPosition=null;}};A.prototype.ontouchstart=function(j){if(this._ignoreTouch){return;}if(jQuery(j.target).hasClass("sapUiLoSplitterBarIcon")){j.target=j.target.parentElement;}var i=this.getId();if(!j.target.id||j.target.id.indexOf(i+"-splitbar")!==0){return;}if(!j.changedTouches||!j.changedTouches[0]){return;}this._ignoreMouse=true;this._onBarMoveStart(j.changedTouches[0],true);};A.prototype._onBarMoveStart=function(j,t){var I=this.getId();this.disableAutoResize(true);var p=j[this._moveCord];var s=parseInt(j.target.id.substr((I+"-splitbar-").length),10);var d=parseInt(j.target.parentElement.id.substr((I+"-splitbar-").length),10);var B=(s+1)?s:d;var $=jQuery(j.target);var C=this.getCalculatedSizes();var e=this._bHorizontal?$.innerWidth():$.innerHeight();var f=this._getContentAreas();var l=f[B].getLayoutData();var L=f[B+1].getLayoutData();if(!l.getResizable()||!L.getResizable()){c(t);return;}var r=0-e;for(var i=0;i<=B;++i){r+=C[i]+e;}this._move={start:p,relStart:r,barNum:B,bar:jQuery(j.target),c1Size:C[B],c1MinSize:l?parseInt(l.getMinSize(),10):0,c2Size:C[B+1],c2MinSize:L?parseInt(L.getMinSize(),10):0};if(t){document.addEventListener("touchend",this._boundBarMoveEnd);document.addEventListener("touchmove",this._boundBarMove);}else{document.addEventListener("mouseup",this._boundBarMoveEnd);document.addEventListener("mousemove",this._boundBarMove);}this._$SplitterOverlay.css("display","block");this._$SplitterOverlay.appendTo(this.getDomRef());this._$SplitterOverlayBar.css(this._sizeDirNot,"");this._move["bar"].css("visibility","hidden");this._onBarMove(j);};A.prototype._resizeContents=function(l,p,f){var C,L,o,s,d,$,e,n,N,m,M,O,i,F,g,D,h=parseFloat(this._move.c1Size).toFixed(5),j=parseFloat(this._move.c2Size).toFixed(5),k=parseFloat(h),q=parseFloat(j);if(isNaN(p)){jQuery.sap.log.warning("Splitter: Received invalid resizing values - resize aborted.");return;}C=this._getContentAreas();L=C[l].getLayoutData();o=C[l+1].getLayoutData();s=L.getSize();d=o.getSize();$=this.$("content-"+l);e=this.$("content-"+(l+1));n=k+p;N=q-p;m=parseInt(L.getMinSize(),10);M=parseInt(o.getMinSize(),10);O=this.getOrientation();i=O==="Horizontal"?this.$().width():this.$().height();if(n<m){D=m-n;p+=D;n=m;N-=D;}else if(N<M){D=M-N;p-=D;N=M;n-=D;}if(f){if(s==="auto"&&d!=="auto"){g=this._pxToPercent(N,i);o.setSize(g);}else if(s!=="auto"&&d==="auto"){F=this._pxToPercent(n,i);L.setSize(F);}else{F=this._pxToPercent(n,i);g=this._pxToPercent(N,i);L.setSize(F);o.setSize(g);}}else{F=this._pxToPercent(n,i);g=this._pxToPercent(N,i);$.css(this._sizeType,F);e.css(this._sizeType,g);}};A.prototype._pxToPercent=function(p,f){return(p*100)/f+"%";};A.prototype._recalculateSizes=function(){var i,s,l,C,d,e;var f=[];var g=this._getContentAreas();var o=this.getOrientation();var h=this._calculateAvailableContentSize(f);var j=[];var k=[];var p=[];for(i=0;i<g.length;++i){l=g[i].getLayoutData();s=l?l.getSize():"auto";f.push(s);}this._calculatedSizes=[];for(i=0;i<f.length;++i){s=f[i];if(s.indexOf("px")>-1){e=parseInt(s,10);h-=e;this._calculatedSizes[i]=e;}else if(s.indexOf("%")>-1){p.push(i);}else if(s==="auto"){l=g[i].getLayoutData();if(l&&parseInt(l.getMinSize(),10)!==0){k.push(i);}else{j.push(i);}}else{jQuery.sap.log.error("Illegal size value: "+f[i]);}}var w=false;if(h<0){w=true;h=0;}var r=h;h=o==="Horizontal"?this.$().width():this.$().height();var P=p.length;for(i=0;i<P;++i){d=p[i];if(P===1&&g.length===1){C=h;}else{C=parseFloat(f[d])/100*h;}this._calculatedSizes[d]=C;r-=C;}h=r-b;if(h<0){w=true;h=0;}C=Math.floor(h/(k.length+j.length),0);var m=k.length;for(i=0;i<m;++i){d=k[i];var M=parseInt(g[d].getLayoutData().getMinSize(),10);if(M>C){this._calculatedSizes[d]=M;h-=M;}else{this._calculatedSizes[d]=C;h-=C;}}if(h<0){w=true;h=0;}r=h;var n=j.length;C=Math.floor(h/n,0);for(i=0;i<n;++i){d=j[i];this._calculatedSizes[d]=C;r-=C;}if(w){jQuery.sap.log.info("[Splitter] The set sizes and minimal sizes of the splitter contents are bigger "+"than the available space in the UI.");}this._calculatedSizes=this._calculatedSizes;};A.prototype._ensureAllSplittersCollapsed=function(B){var d=this._getContentAreas();var e=false;for(var i=0;i<d.length;i++){var s=d[i].getLayoutData().getSize().slice(0,-2);if(s==="0"||s==="au"){e=true;continue;}else if(i===(d.length-1)&&e){this._getContentAreas()[B+1].setLayoutData(new sap.ui.layout.SplitterLayoutData({size:"100%"}));}}};function _(C){var l=C.getLayoutData();if(l&&(!l.getResizable||!l.getSize||!l.getMinSize)){jQuery.sap.log.warning("Content \""+C.getId()+"\" for the Splitter contained wrong LayoutData. "+"The LayoutData has been replaced with default values.");l=null;}if(!l){C.setLayoutData(new sap.ui.layout.SplitterLayoutData());}}function c(t){var p=function(e){e.preventDefault();};var f=null;f=function(){document.removeEventListener("touchend",f);document.removeEventListener("touchmove",p);document.removeEventListener("mouseup",f);document.removeEventListener("mousemove",p);};if(t){this._ignoreMouse=true;document.addEventListener("touchend",f);document.addEventListener("touchmove",p);}else{document.addEventListener("mouseup",f);document.addEventListener("mousemove",p);}}return A;},false);