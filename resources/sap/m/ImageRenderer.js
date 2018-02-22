/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var I={};I.render=function(r,i){var m=i.getMode(),a=i.getAlt(),t=i.getTooltip_AsString(),h=i.hasListeners("press"),l=i.getDetailBox();if(l){r.write("<span class=\"sapMLightBoxImage\"");r.writeControlData(i);r.write(">");r.write("<span class=\"sapMLightBoxMagnifyingGlass\"></span>");}r.write(m===sap.m.ImageMode.Image?"<img":"<span");if(!l){r.writeControlData(i);}if(m===sap.m.ImageMode.Image){r.writeAttributeEscaped("src",i._getDensityAwareSrc());}else{i._preLoadImage(i._getDensityAwareSrc());r.addStyle("background-size",q.sap.encodeHTML(i.getBackgroundSize()));r.addStyle("background-position",q.sap.encodeHTML(i.getBackgroundPosition()));r.addStyle("background-repeat",q.sap.encodeHTML(i.getBackgroundRepeat()));}r.addClass("sapMImg");if(i.hasListeners("press")||i.hasListeners("tap")){r.addClass("sapMPointer");}if(i.getUseMap()||!i.getDecorative()){r.addClass("sapMImgFocusable");}r.writeClasses();var u=i.getUseMap();if(u){if(!(q.sap.startsWith(u,"#"))){u="#"+u;}r.writeAttributeEscaped("useMap",u);}if(i.getDecorative()&&!u&&!h){r.writeAttribute("role","presentation");r.writeAttribute("aria-hidden","true");r.write(" alt=''");}else{if(a||t){r.writeAttributeEscaped("alt",a||t);}}if(a||t){r.writeAttributeEscaped("aria-label",a||t);}if(t){r.writeAttributeEscaped("title",t);}if(h){r.writeAttribute("role","button");r.writeAttribute("tabIndex",0);}if(i.getWidth()&&i.getWidth()!=''){r.addStyle("width",i.getWidth());}if(i.getHeight()&&i.getHeight()!=''){r.addStyle("height",i.getHeight());}r.writeStyles();r.write(" />");if(l){r.write("</span>");}};return I;},true);
