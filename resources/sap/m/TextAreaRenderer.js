/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer','./InputBaseRenderer'],function(q,R,I){"use strict";var T={};var T=R.extend(I);T.addOuterClasses=function(r,c){r.addClass("sapMTextArea");};T.addOuterStyles=function(r,c){c.getHeight()&&r.addStyle("height",c.getHeight());};T.openInputTag=function(r,c){r.write("<textarea");};T.closeInputTag=function(r,c){r.write("</textarea>");};T.writeInnerValue=function(){};T.writeInnerContent=function(r,c){var v=c.getValue();v=q.sap.encodeHTML(v);if(sap.ui.Device.browser.msie&&sap.ui.Device.browser.version<11){v=v.replace(/&#xd;&#xa;|&#xd;|&#xa;/g,"&#13;");}r.write(v);};T.addInnerClasses=function(r,c){r.addClass("sapMTextAreaInner");if(c.getGrowing()){r.addClass("sapMTextAreaGrow");}};T.getAriaRole=function(c){return"";};T.writeInnerAttributes=function(r,c){if(c.getWrapping()!=sap.ui.core.Wrapping.None){r.writeAttribute("wrap",c.getWrapping());}r.writeAttribute("rows",c.getRows());r.writeAttribute("cols",c.getCols());};return T;},true);
