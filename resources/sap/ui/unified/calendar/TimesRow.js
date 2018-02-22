/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','sap/ui/core/date/UniversalDate','sap/ui/unified/library'],function(q,C,L,I,D,a,U,l){"use strict";var T=C.extend("sap.ui.unified.calendar.TimesRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},items:{type:"int",group:"Appearance",defaultValue:12},intervalMinutes:{type:"int",group:"Appearance",defaultValue:60},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}}});T.prototype.init=function(){this._oFormatYyyyMMddHHmm=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyyMMddHHmm",calendarType:sap.ui.core.CalendarType.Gregorian});this._oFormatLong=sap.ui.core.format.DateFormat.getDateTimeInstance({style:"long/short"});this._oFormatDate=sap.ui.core.format.DateFormat.getDateInstance({style:"medium"});this._mouseMoveProxy=q.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");};T.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}if(this._sInvalidateTimes){q.sap.clearDelayedCall(this._sInvalidateTimes);}};T.prototype.onAfterRendering=function(){_.call(this);};T.prototype.onsapfocusleave=function(E){if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){if(this._bMouseMove){s.call(this,true);k.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;o.call(this);}if(this._bMousedownChange){this._bMousedownChange=false;o.call(this);}}};T.prototype.invalidate=function(O){if(!this._bDateRangeChanged&&(!O||!(O instanceof sap.ui.unified.DateRange))){C.prototype.invalidate.apply(this,arguments);}else if(this.getDomRef()&&!this._sInvalidateTimes){if(this._bInvalidateSync){p.call(this);}else{this._sInvalidateTimes=q.sap.delayedCall(0,this,p);}}};T.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("selectedDates");return R;};T.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("selectedDates");return i;};T.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("specialDates");return R;};T.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("specialDates");return i;};T.prototype.setIntervalMinutes=function(M){if(M>=720){throw new Error("Only intervals < 720 minutes are allowed; "+this);}if(1440%M>0){throw new Error("A day must be divisible by the interval size; "+this);}this.setProperty("intervalMinutes",M,false);this._oFormatTime=undefined;return this;};T.prototype.setDate=function(i){f.call(this,i,false);return this;};T.prototype._setDate=function(i){var t=a._createLocalDate(i,true);this.setProperty("date",t,true);this._oUTCDate=i;};T.prototype._getDate=function(){if(!this._oUTCDate){this._oUTCDate=a._createUniversalUTCDate(new Date(),undefined,true);}return this._oUTCDate;};T.prototype.setStartDate=function(S){if(!(S instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}var y=S.getFullYear();if(y<1||y>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}var u=a._createUniversalUTCDate(S,undefined,true);this.setProperty("startDate",S,true);this._oUTCStartDate=this._getIntervalStart(u);if(this.getDomRef()){var O=a._createLocalDate(this._getDate(),true);this._bNoRangeCheck=true;this.displayDate(S);this._bNoRangeCheck=false;if(O&&this.checkDateFocusable(O)){this.displayDate(O);}}return this;};T.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=a._createUniversalUTCDate(new Date(),undefined,true);this._oUTCStartDate=this._getIntervalStart(this._oUTCStartDate);}return this._oUTCStartDate;};T.prototype.displayDate=function(i){f.call(this,i,true);return this;};T.prototype._getLocale=function(){var P=this.getParent();if(P&&P.getLocale){return P.getLocale();}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};T.prototype._getLocaleData=function(){var P=this.getParent();if(P&&P._getLocaleData){return P._getLocaleData();}else if(!this._oLocaleData){var i=this._getLocale();var t=new sap.ui.core.Locale(i);this._oLocaleData=L.getInstance(t);}return this._oLocaleData;};T.prototype._getFormatLong=function(){var i=this._getLocale();if(this._oFormatLong.oLocale.toString()!=i){var t=new sap.ui.core.Locale(i);this._oFormatLong=sap.ui.core.format.DateFormat.getInstance({style:"long/short"},t);}return this._oFormatLong;};T.prototype._getFormatTime=function(){var i=this._getLocale();if(!this._oFormatTime||this._oFormatTime.oLocale.toString()!=i){var t=new sap.ui.core.Locale(i);var u=this.getIntervalMinutes();var v=this._getLocaleData();var P;this._oFormatTimeAmPm=undefined;if(u%60==0){P=v.getPreferredHourSymbol();if(v.getTimePattern("short").search("a")>=0){this._oFormatTimeAmPm=sap.ui.core.format.DateFormat.getTimeInstance({pattern:"a"},t);}}else{P=v.getTimePattern("short");P=P.replace("HH","H");P=P.replace("hh","h");if(P.search("a")>=0){this._oFormatTimeAmPm=sap.ui.core.format.DateFormat.getTimeInstance({pattern:"a"},t);P=P.replace("a","").trim();}}this._oFormatTime=sap.ui.core.format.DateFormat.getTimeInstance({pattern:P},t);}return this._oFormatTime;};T.prototype._getFormatDate=function(){var i=this._getLocale();if(this._oFormatDate.oLocale.toString()!=i){var t=new sap.ui.core.Locale(i);this._oFormatDate=sap.ui.core.format.DateFormat.getDateInstance({style:"medium"},t);}return this._oFormatDate;};T.prototype.getIntervalSelection=function(){var P=this.getParent();if(P&&P.getIntervalSelection){return P.getIntervalSelection();}else{return this.getProperty("intervalSelection");}};T.prototype.getSingleSelection=function(){var P=this.getParent();if(P&&P.getSingleSelection){return P.getSingleSelection();}else{return this.getProperty("singleSelection");}};T.prototype.getSelectedDates=function(){var P=this.getParent();if(P&&P.getSelectedDates){return P.getSelectedDates();}else{return this.getAggregation("selectedDates",[]);}};T.prototype.getSpecialDates=function(){var P=this.getParent();if(P&&P.getSpecialDates){return P.getSpecialDates();}else{return this.getAggregation("specialDates",[]);}};T.prototype._getShowHeader=function(){var P=this.getParent();if(P&&P._getShowItemHeader){return P._getShowItemHeader();}else{return this.getProperty("showHeader");}};T.prototype.getIntervalMinutes=function(){var P=this.getParent();if(P&&P.getIntervalMinutes){return P.getIntervalMinutes();}else{return this.getProperty("intervalMinutes");}};T.prototype.getAriaLabelledBy=function(){var P=this.getParent();if(P&&P.getAriaLabelledBy){return P.getAriaLabelledBy();}else{return this.getAssociation("ariaLabelledBy",[]);}};T.prototype.getLegend=function(){var P=this.getParent();if(P&&P.getLegend){return P.getLegend();}else{return this.getAssociation("ariaLabelledBy",[]);}};T.prototype._checkDateSelected=function(t){if(!(t instanceof U)){throw new Error("Date must be a UniversalDate object "+this);}var S=0;var u=this.getSelectedDates();var M=new U(t.getTime());M=this._getIntervalStart(M);var v=M.getTime();for(var i=0;i<u.length;i++){var R=u[i];var w=R.getStartDate();var x=0;if(w){w=a._createUniversalUTCDate(w,undefined,true);w=this._getIntervalStart(w);x=w.getTime();}var E=R.getEndDate();var y=0;if(E){E=a._createUniversalUTCDate(E,undefined,true);E=this._getIntervalStart(E);y=E.getTime();}if(v==x&&!E){S=1;break;}else if(v==x&&E){S=2;if(E&&v==y){S=5;}break;}else if(E&&v==y){S=3;break;}else if(E&&v>x&&v<y){S=4;break;}if(this.getSingleSelection()){break;}}return S;};T.prototype._getDateType=function(t){if(!(t instanceof U)){throw new Error("Date must be a UniversalDate object "+this);}var u;var S=this.getSpecialDates();var M=new U(t.getTime());M=this._getIntervalStart(M);var v=M.getTime();for(var i=0;i<S.length;i++){var R=S[i];var w=R.getStartDate();var x=0;if(w){w=a._createUniversalUTCDate(w,undefined,true);w=this._getIntervalStart(w);x=w.getTime();}var E=R.getEndDate();var y=0;if(E){E=a._createUniversalUTCDate(E,undefined,true);E=this._getIntervalStart(E);E.setUTCMinutes(E.getUTCMinutes()+this.getIntervalMinutes()-1);y=E.getTime();}else if(w.getUTCHours()==0&&w.getUTCMinutes()==0&&w.getUTCSeconds()==0&&w.getUTCMilliseconds()==0){E=new U(w.getTime());E.setUTCDate(E.getUTCDate()+1);y=E.getTime();}if((v==x&&!E)||(v>=x&&v<=y)){u={type:R.getType(),tooltip:R.getTooltip_AsString()};break;}}return u;};T.prototype._checkTimeEnabled=function(i){if(!(i instanceof U)){throw new Error("Date must be a UniversalDate object "+this);}var t=i.getTime();var P=this.getParent();if(P&&P._oMinDate&&P._oMaxDate){if(t<P._oMinDate.getTime()||t>P._oMaxDate.getTime()){return false;}}return true;};T.prototype._handleMouseMove=function(E){if(!this.$().is(":visible")){s.call(this,true);}var t=q(E.target);if(t.hasClass("sapUiCalItemText")){t=t.parent();}if(t.hasClass("sapUiCalItem")){var O=this._getDate();var F=new U(this._oFormatYyyyMMddHHmm.parse(t.attr("data-sap-time"),true).getTime());if(F.getTime()!=O.getTime()){this._setDate(F);k.call(this,F,true);this._bMoveChange=true;}}};T.prototype.onmouseup=function(E){if(this._bMouseMove){s.call(this,true);var F=this._getDate();var t=this._oItemNavigation.getItemDomRefs();for(var i=0;i<t.length;i++){var $=q(t[i]);if($.attr("data-sap-time")==this._oFormatYyyyMMddHHmm.format(F.getJSDate(),true)){$.focus();break;}}if(this._bMoveChange){var u=q(E.target);if(u.hasClass("sapUiCalItemText")){u=u.parent();}if(u.hasClass("sapUiCalItem")){F=new U(this._oFormatYyyyMMddHHmm.parse(u.attr("data-sap-time"),true).getTime());}k.call(this,F);this._bMoveChange=false;this._bMousedownChange=false;o.call(this);}}if(this._bMousedownChange){this._bMousedownChange=false;o.call(this);}};T.prototype.onsapselect=function(E){var S=k.call(this,this._getDate());if(S){o.call(this);}E.stopPropagation();E.preventDefault();};T.prototype.onsapselectmodifiers=function(E){this.onsapselect(E);};T.prototype.onsappageupmodifiers=function(E){var F=new U(this._getDate().getTime());var i=F.getUTCDate();if(E.metaKey||E.ctrlKey){F.setUTCDate(i-7);}else{F.setUTCDate(i-1);}this.fireFocus({date:a._createLocalDate(F,true),notVisible:true});E.preventDefault();};T.prototype.onsappagedownmodifiers=function(E){var F=new U(this._getDate().getTime());var i=F.getUTCDate();if(E.metaKey||E.ctrlKey){F.setUTCDate(i+7);}else{F.setUTCDate(i+1);}this.fireFocus({date:a._createLocalDate(F,true),notVisible:true});E.preventDefault();};T.prototype.checkDateFocusable=function(i){if(!(i instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}if(this._bNoRangeCheck){return false;}var S=this._getStartDate();var E=new U(S.getTime());E.setUTCMinutes(E.getUTCMinutes()+this.getItems()*this.getIntervalMinutes());var u=a._createUniversalUTCDate(i,undefined,true);if(u.getTime()>=S.getTime()&&u.getTime()<E.getTime()){return true;}else{return false;}};T.prototype.applyFocusInfo=function(i){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this;};T.prototype._getIntervalStart=function(i){var t=i.getTime();var S=new U(i.getTime());S.setUTCHours(0);S.setUTCMinutes(0);S.setUTCSeconds(0);S.setUTCMilliseconds(0);var M=this.getIntervalMinutes();while(S.getTime()<=t){S.setUTCMinutes(S.getUTCMinutes()+M);}var u=new U(S.getTime());u.setUTCMinutes(u.getUTCMinutes()-M);return u;};function _(){var t=this._getDate();var y=this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true);var u=0;var R=this.$("times").get(0);var v=this.$("times").children(".sapUiCalItem");for(var i=0;i<v.length;i++){var $=q(v[i]);if($.attr("data-sap-time")===y){u=i;break;}}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,b,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,c,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,d,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true);}this._oItemNavigation.setRootDomRef(R);this._oItemNavigation.setItemDomRefs(v);this._oItemNavigation.setFocusedIndex(u);this._oItemNavigation.setPageSize(v.length);}function b(i){var t=i.getParameter("index");var E=i.getParameter("event");if(!E){return;}var O=this._getDate();var F=new U(O.getTime());var u=this._oItemNavigation.getItemDomRefs();var $=q(u[t]);F=new U(this._oFormatYyyyMMddHHmm.parse($.attr("data-sap-time"),true).getTime());this._setDate(F);this.fireFocus({date:a._createLocalDate(F,true),notVisible:false});if(E.type=="mousedown"){e.call(this,E,F,t);}}function c(i){var t=i.getParameter("index");var E=i.getParameter("event");if(!E){return;}if(E.type=="mousedown"){var F=this._getDate();e.call(this,E,F,t);}}function d(i){var E=i.getParameter("event");var t=this.getItems();var M=this.getIntervalMinutes();var O=this._getDate();var F=new U(O.getTime());if(E.type){switch(E.type){case"sapnext":case"sapnextmodifiers":F.setUTCMinutes(F.getUTCMinutes()+M);break;case"sapprevious":case"sappreviousmodifiers":F.setUTCMinutes(F.getUTCMinutes()-M);break;case"sappagedown":F.setUTCMinutes(F.getUTCMinutes()+M*t);break;case"sappageup":F.setUTCMinutes(F.getUTCMinutes()-M*t);break;default:break;}this.fireFocus({date:a._createLocalDate(F,true),notVisible:true});}}function e(E,F,i){if(E.button){return;}var S=k.call(this,F);if(S){this._bMousedownChange=true;}if(this._bMouseMove){s.call(this,true);this._bMoveChange=false;}else if(this.getIntervalSelection()&&this.$().is(":visible")){r.call(this,true);}E.preventDefault();E.setMark("cancelAutoClose");}function f(i,N){if(!(i instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}var y=i.getFullYear();if(y<1||y>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}var F=true;if(!q.sap.equal(this.getDate(),i)){var u=a._createUniversalUTCDate(i,undefined,true);u=this._getIntervalStart(u);F=this.checkDateFocusable(i);if(!this._bNoRangeCheck&&!F){throw new Error("Date must be in visible date range; "+this);}this.setProperty("date",i,true);this._oUTCDate=u;}if(this.getDomRef()){if(F){g.call(this,this._oUTCDate,N);}else{h.call(this,N);}}}function g(t,N){var y=this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true);var u=this._oItemNavigation.getItemDomRefs();var $;for(var i=0;i<u.length;i++){$=q(u[i]);if($.attr("data-sap-time")==y){if(document.activeElement!=u[i]){if(N){this._oItemNavigation.setFocusedIndex(i);}else{this._oItemNavigation.focusItem(i);}}break;}}}function h(N){var i=this._getStartDate();var $=this.$("times");if($.length>0){var R=sap.ui.getCore().createRenderManager();this.getRenderer().renderTimes(R,this,i);R.flush($[0]);R.destroy();}j.call(this);_.call(this);if(!N){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());}}function j(){var S=this._getStartDate();if(this._getShowHeader()){var $=this.$("Head");if($.length>0){var i=this._getLocaleData();var R=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(R,this,i,S);R.flush($[0]);R.destroy();}}}function k(t,M){if(!this._checkTimeEnabled(t)){return false;}var S=this.getSelectedDates();var u;var v=this._oItemNavigation.getItemDomRefs();var $;var y;var i=0;var P=this.getParent();var A=this;var w;if(P&&P.getSelectedDates){A=P;}if(this.getSingleSelection()){if(S.length>0){u=S[0];w=u.getStartDate();if(w){w=a._createUniversalUTCDate(w,undefined,true);w=this._getIntervalStart(w);}}else{u=new sap.ui.unified.DateRange();A.addAggregation("selectedDates",u,true);}if(this.getIntervalSelection()&&(!u.getEndDate()||M)&&w){var E;if(t.getTime()<w.getTime()){E=w;w=t;if(!M){u.setProperty("startDate",a._createLocalDate(new Date(w.getTime()),true),true);u.setProperty("endDate",a._createLocalDate(new Date(E.getTime()),true),true);}}else if(t.getTime()>=w.getTime()){E=t;if(!M){u.setProperty("endDate",a._createLocalDate(new Date(E.getTime()),true),true);}}m.call(this,w,E);}else{m.call(this,t);u.setProperty("startDate",a._createLocalDate(new Date(t.getTime()),true),true);u.setProperty("endDate",undefined,true);}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection");}else{var x=this._checkDateSelected(t);if(x>0){for(i=0;i<S.length;i++){w=S[i].getStartDate();if(w){w=a._createUniversalUTCDate(w,undefined,true);w=this._getIntervalStart(w);if(t.getTime()==w.getTime()){A.removeAggregation("selectedDates",i,true);break;}}}}else{u=new sap.ui.unified.DateRange({startDate:a._createLocalDate(new Date(t.getTime()),true)});A.addAggregation("selectedDates",u,true);}y=this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true);for(i=0;i<v.length;i++){$=q(v[i]);if($.attr("data-sap-time")==y){if(x>0){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}else{$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}}}}}return true;}function m(S,E){var t=this._oItemNavigation.getItemDomRefs();var $;var i=0;var u=false;var v=false;if(!E){var y=this._oFormatYyyyMMddHHmm.format(S.getJSDate(),true);for(i=0;i<t.length;i++){$=q(t[i]);u=false;v=false;if($.attr("data-sap-time")==y){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");u=true;}else if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}n.call(this,$,u,v);}}else{var w;for(i=0;i<t.length;i++){$=q(t[i]);u=false;v=false;w=new U(this._oFormatYyyyMMddHHmm.parse($.attr("data-sap-time"),true).getTime());if(w.getTime()==S.getTime()){$.addClass("sapUiCalItemSelStart");u=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");if(E&&w.getTime()==E.getTime()){$.addClass("sapUiCalItemSelEnd");v=true;}$.removeClass("sapUiCalItemSelBetween");}else if(E&&w.getTime()>S.getTime()&&w.getTime()<E.getTime()){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.addClass("sapUiCalItemSelBetween");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelEnd");}else if(E&&w.getTime()==E.getTime()){$.addClass("sapUiCalItemSelEnd");v=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelBetween");}else{if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}}n.call(this,$,u,v);}}}function n($,S,E){if(!this.getIntervalSelection()){return;}var t="";var u=[];var v=this.getId();var w=false;t=$.attr("aria-describedby");if(t){u=t.split(" ");}var x=-1;var y=-1;for(var i=0;i<u.length;i++){var z=u[i];if(z==(v+"-Start")){x=i;}if(z==(v+"-End")){y=i;}}if(x>=0&&!S){u.splice(x,1);w=true;if(y>x){y--;}}if(y>=0&&!E){u.splice(y,1);w=true;}if(x<0&&S){u.push(v+"-Start");w=true;}if(y<0&&E){u.push(v+"-End");w=true;}if(w){t=u.join(" ");$.attr("aria-describedby",t);}}function o(){if(this._bMouseMove){s.call(this,true);}this.fireSelect();}function p(){this._sInvalidateTimes=undefined;h.call(this,this._bNoFocus);this._bDateRangeChanged=undefined;this._bNoFocus=undefined;}function r(){q(window.document).bind('mousemove',this._mouseMoveProxy);this._bMouseMove=true;}function s(){q(window.document).unbind('mousemove',this._mouseMoveProxy);this._bMouseMove=undefined;}return T;},true);
