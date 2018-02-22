/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./DatePicker','sap/ui/model/type/Date','./library'],function(q,D,a,l){"use strict";var b=D.extend("sap.m.DateTimePicker",{metadata:{library:"sap.m",aggregations:{_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}}}});var P=sap.ui.core.Control.extend("DateTimePickerPopup",{metadata:{aggregations:{_switcher:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},calendar:{type:"sap.ui.core.Control",multiple:false},timeSliders:{type:"sap.ui.core.Control",multiple:false}}},renderer:function(r,p){r.write("<div");r.writeControlData(p);r.addClass("sapMDateTimePopupCont");r.addClass("sapMTimePickerDropDown");r.writeClasses();r.write(">");var s=p.getAggregation("_switcher");if(s&&s.getVisible()){r.write("<div");r.addClass("sapMTimePickerSwitch");r.writeClasses();r.write(">");r.renderControl(s);r.write("</div>");}var C=p.getCalendar();if(C){r.renderControl(C);}r.write("<div");r.addClass("sapMTimePickerSep");r.writeClasses();r.write(">");r.write("</div>");var S=p.getTimeSliders();if(S){r.renderControl(S);}r.write("</div>");},init:function(){},onBeforeRendering:function(){var s=this.getAggregation("_switcher");if(sap.ui.Device.system.phone||q('html').hasClass("sapUiMedia-Std-Phone")){if(!s){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var i=r.getText("DATETIMEPICKER_DATE");var t=r.getText("DATETIMEPICKER_TIME");s=new sap.m.SegmentedButton(this.getId()+"-Switch",{selectedKey:"Cal",items:[new sap.m.SegmentedButtonItem(this.getId()+"-Switch-Cal",{key:"Cal",text:i}),new sap.m.SegmentedButtonItem(this.getId()+"-Switch-Sli",{key:"Sli",text:t})]});s.attachSelect(this._handleSelect,this);this.setAggregation("_switcher",s,true);}else{s.setVisible(true);s.setSelectedKey("Cal");}}else if(s){s.setVisible(false);}},onAfterRendering:function(){if(sap.ui.Device.system.phone||q('html').hasClass("sapUiMedia-Std-Phone")){var s=this.getAggregation("_switcher");var k=s.getSelectedKey();this._switchVisibility(k);if(sap.ui.Device.system.phone){this._adjustTimePickerHeightOnPhone();}}},_adjustTimePickerHeightOnPhone:function(){var s=this.getAggregation("_switcher"),S=s.$().children(0).css("height").replace('px','');this.$().css("height",(document.documentElement.clientHeight-parseInt(S,10))+"px");},_handleSelect:function(E){this._switchVisibility(E.getParameter("key"));},_switchVisibility:function(k){var C=this.getCalendar();var s=this.getTimeSliders();if(!C||!s){return;}if(k=="Cal"){C.$().css("display","");s.$().css("display","none");C.focus();}else{C.$().css("display","none");s.$().css("display","");s.updateSlidersValues();s._onOrientationChanged();s._initFocus();}},switchToTime:function(){var s=this.getAggregation("_switcher");if(s&&s.getVisible()){s.setSelectedKey("Sli");this._switchVisibility("Sli");}},getSpecialDates:function(){return this._oDateTimePicker.getSpecialDates();}});b.prototype.init=function(){D.prototype.init.apply(this,arguments);this._bOnlyCalendar=false;};b.prototype.exit=function(){D.prototype.exit.apply(this,arguments);if(this._oSliders){this._oSliders.destroy();delete this._oSliders;}this._oPopupContent=undefined;};b.prototype.setDisplayFormat=function(s){D.prototype.setDisplayFormat.apply(this,arguments);if(this._oSliders){this._oSliders.setFormat(g.call(this));}return this;};b.prototype._getFormatInstance=function(A,i){var m=q.extend({},A);var s=-1;if(m.style){s=m.style.indexOf("/");}if(i){var o=q.extend({},m);if(s>0){o.style=o.style.substr(0,s);}this._oDisplayFormatDate=sap.ui.core.format.DateFormat.getInstance(o);}return sap.ui.core.format.DateFormat.getDateTimeInstance(m);};b.prototype._checkStyle=function(p){if(D.prototype._checkStyle.apply(this,arguments)){return true;}else if(p.indexOf("/")>0){var s=["short","medium","long","full"];var S=false;for(var i=0;i<s.length;i++){var k=s[i];for(var j=0;j<s.length;j++){var m=s[j];if(p==k+"/"+m){S=true;break;}}if(S){break;}}return S;}return false;};b.prototype._parseValue=function(v,i){var o=D.prototype._parseValue.apply(this,arguments);if(i&&!o){o=this._oDisplayFormatDate.parse(v);if(o){var O=this.getDateValue();if(!O){O=new Date();}o.setHours(O.getHours());o.setMinutes(O.getMinutes());o.setSeconds(O.getSeconds());o.setMilliseconds(O.getMilliseconds());}}return o;};b.prototype._getPlaceholderPattern=function(L,p){var s=p.indexOf("/");if(s>0){return L.getCombinedDateTimePattern(p.substr(0,s),p.substr(s+1));}else{return L.getCombinedDateTimePattern(p,p);}};b.prototype._createPopup=function(){if(!this._oPopup){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var o=r.getText("TIMEPICKER_SET");var C=r.getText("TIMEPICKER_CANCEL");this._oPopupContent=new P(this.getId()+"-PC");this._oPopupContent._oDateTimePicker=this;this._oPopup=new sap.m.ResponsivePopover(this.getId()+"-RP",{showCloseButton:false,showHeader:false,placement:sap.m.PlacementType.VerticalPreferedBottom,beginButton:new sap.m.Button(this.getId()+"-OK",{text:o,press:q.proxy(_,this)}),endButton:new sap.m.Button(this.getId()+"-Cancel",{text:C,press:q.proxy(c,this)}),content:this._oPopupContent});this._oPopup.addStyleClass("sapMDateTimePopup");var p=this._oPopup.getAggregation("_popup");if(p.setShowArrow){p.setShowArrow(false);}this._oPopup.attachBeforeOpen(d,this);this._oPopup.attachAfterOpen(e,this);this._oPopup.attachAfterClose(f,this);if(sap.ui.Device.system.desktop){this._oPopoverKeydownEventDelegate={onkeydown:function(E){var k=q.sap.KeyCodes,K=E.which||E.keyCode,A=E.altKey;if((A&&(K===k.ARROW_UP||K===k.ARROW_DOWN))||K===k.F4){_.call(this,E);this.focus();E.preventDefault();}}};this._oPopup.addEventDelegate(this._oPopoverKeydownEventDelegate,this);}this.setAggregation("_popup",this._oPopup,true);}};b.prototype._openPopup=function(){if(!this._oPopup){return;}var p=this._oPopup.getAggregation("_popup");p.oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.openBy(this);var s=this._oPopup.getContent()[0]&&this._oPopup.getContent()[0].getTimeSliders();if(s){q.sap.delayedCall(0,s,s.updateSlidersValues);}};b.prototype._createPopupContent=function(){var n=!this._oCalendar;D.prototype._createPopupContent.apply(this,arguments);if(n){this._oPopupContent.setCalendar(this._oCalendar);this._oCalendar.attachSelect(h,this);}if(!this._oSliders){q.sap.require("sap.m.TimePickerSliders");this._oSliders=new sap.m.TimePickerSliders(this.getId()+"-Sliders",{format:g.call(this),invokedBy:this.getId()});this._oPopupContent.setTimeSliders(this._oSliders);}};b.prototype._fillDateRange=function(){var o=this.getDateValue();if(o){o=new Date(o.getTime());}else{o=new Date();}this._oCalendar.focusDate(o);if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=o.getTime()){this._oDateRange.setStartDate(o);}this._oSliders.setTimeValues(o);};b.prototype._getSelectedDate=function(){var o=D.prototype._getSelectedDate.apply(this,arguments);if(o){var i=this._oSliders.getTimeValues();var p=this._oSliders.getFormat();if(p.search("h")>=0||p.search("H")>=0){o.setHours(i.getHours());}if(p.search("m")>=0){o.setMinutes(i.getMinutes());}if(p.search("s")>=0){o.setSeconds(i.getSeconds());}if(o.getTime()<this._oMinDate.getTime()){o=new Date(this._oMinDate.getTime());}else if(o.getTime()>this._oMaxDate.getTime()){o=new Date(this._oMaxDate.getTime());}}return o;};b.prototype.getLocaleId=function(){return sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();};b.prototype.getAccessibilityInfo=function(){var i=D.prototype.getAccessibilityInfo.apply(this,arguments);i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATETIMEINPUT");return i;};function _(E){this._selectDate();}function c(E){this.onsaphide(E);}function d(E){}function e(E){this.$("inner").attr("aria-expanded",true);this._oCalendar.focus();this._oSliders._onOrientationChanged();}function f(E){this.$("inner").attr("aria-expanded",false);}function g(){var s=this.getDisplayFormat();var t;var B=this.getBinding("value");if(B&&B.oType&&(B.oType instanceof a)){s=B.oType.getOutputPattern();}else if(B&&B.oType&&B.oType.oFormat){s=B.oType.oFormat.oFormatOptions.pattern;}else{s=this.getDisplayFormat();}if(!s){s="medium";}var S=s.indexOf("/");if(S>0&&this._checkStyle(s)){s=s.substr(S+1);}if(s=="short"||s=="medium"||s=="long"||s=="full"){var L=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var o=sap.ui.core.LocaleData.getInstance(L);t=o.getTimePattern(s);}else{t=s;}return t;}function h(E){this._oPopupContent.switchToTime();}return b;},true);
