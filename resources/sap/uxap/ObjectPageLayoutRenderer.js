/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./ObjectPageHeaderRenderer"],function(R,O){"use strict";var a={};a.render=function(r,c){var s,h=c.getHeaderTitle(),A=null,i=c.getHeaderContent()&&c.getHeaderContent().length>0&&c.getShowHeaderContent(),I=c.getShowTitleInHeaderContent()&&c.getShowHeaderContent(),b=i||I;if(c.getShowAnchorBar()&&c._getInternalAnchorBarVisible()){A=c.getAggregation("_anchorBar");}r.write("<div");r.writeControlData(c);if(h){r.writeAttributeEscaped("aria-label",h.getObjectTitle());}r.addClass("sapUxAPObjectPageLayout");r.writeClasses();r.addStyle("height",c.getHeight());r.writeStyles();r.write(">");if(sap.ui.Device.system.desktop){r.renderControl(c._getCustomScrollBar().addStyleClass("sapUxAPObjectPageCustomScroller"));}r.write("<header ");r.writeAttribute("role","header");r.writeAttributeEscaped("id",c.getId()+"-headerTitle");r.addClass("sapUxAPObjectPageHeaderTitle");r.addClass("sapContrastPlus");r.writeClasses();r.write(">");if(h){r.renderControl(h);}this._renderHeaderContentDOM(r,c,b&&c._bHContentAlwaysExpanded,"-stickyHeaderContent");r.write("<div ");r.writeAttributeEscaped("id",c.getId()+"-stickyAnchorBar");r.addClass("sapUxAPObjectPageStickyAnchorBar");r.addClass("sapUxAPObjectPageNavigation");r.writeClasses();r.write(">");this._renderAnchorBar(r,c,A,c._bHContentAlwaysExpanded);r.write("</div>");r.write("</header>");r.write("<div ");r.writeAttributeEscaped("id",c.getId()+"-opwrapper");r.addClass("sapUxAPObjectPageWrapper");if(!(c.getShowTitleInHeaderContent()&&h.getShowTitleSelector())){r.addClass("sapUxAPObjectPageWrapperTransform");}r.writeClasses();r.write(">");r.write("<div ");r.writeAttributeEscaped("id",c.getId()+"-scroll");r.addClass("sapUxAPObjectPageScroll");r.writeClasses();r.write(">");this._renderHeaderContentDOM(r,c,b&&!c._bHContentAlwaysExpanded,"-headerContent",true);r.write("<section ");r.writeAttributeEscaped("id",c.getId()+"-anchorBar");r.writeAttribute("role","navigation");r.addClass("sapUxAPObjectPageNavigation");r.addClass("sapContrastPlus");r.writeClasses();r.write(">");this._renderAnchorBar(r,c,A,!c._bHContentAlwaysExpanded);r.write("</section>");r.write("<section");r.addClass("sapUxAPObjectPageContainer");r.writeAttributeEscaped("id",c.getId()+"-sectionsContainer");r.addClass("ui-helper-clearfix");if(!A){r.addClass("sapUxAPObjectPageContainerNoBar");}r.writeClasses();r.write(">");s=c.getAggregation("sections");if(jQuery.isArray(s)){jQuery.each(s,function(d,S){r.renderControl(S);});}r.write("</section>");this.renderFooterContent(r,c);r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-spacer");r.write("></div>");r.write("</div>");r.write("</div>");this._renderFooterContentInternal(r,c);r.write("</div>");};a._renderAnchorBar=function(r,c,A,b){var s=c.getAggregation("sections");if(b){if(c.getIsChildPage()){r.write("<div ");r.writeAttributeEscaped("id",c.getId()+"-childPageBar");if(jQuery.isArray(s)&&s.length>1){r.addClass('sapUxAPObjectChildPage');}r.writeClasses();r.write("></div>");}if(A){r.renderControl(A);}}};a._renderHeaderContentDOM=function(r,c,b,i,A){r.write("<header ");r.writeAttributeEscaped("id",c.getId()+i);r.addClass("ui-helper-clearfix");r.addClass("sapUxAPObjectPageHeaderDetails");r.addClass("sapUxAPObjectPageHeaderDetailsDesign-"+c._getHeaderDesign());if(A){r.addClass("sapContrastPlus");}r.writeClasses();r.writeAttribute("data-sap-ui-customfastnavgroup",true);r.write(">");if(b){this.renderHeaderContent(r,c);}r.write("</header>");};a.renderHeaderContent=function(r,c){r.renderControl(c._getHeaderContent());};a.renderFooterContent=function(r,c){};a._renderFooterContentInternal=function(r,o){var f=o.getFooter();if(!f){return;}r.write("<footer");r.writeAttributeEscaped("id",o.getId()+"-footerWrapper");r.addClass("sapUxAPObjectPageFooter sapMFooter-CTX sapContrast sapContrastPlus");if(!o.getShowFooter()){r.addClass("sapUiHidden");}r.writeClasses();r.write(">");f.addStyleClass("sapUxAPObjectPageFloatingFooter");r.renderControl(f);r.write("</footer>");};a._rerenderHeaderContentArea=function(r,c){var h=c._bHContentAlwaysExpanded?"stickyHeaderContent":"headerContent",$;this.renderHeaderContent(r,c);$=c.$(h)[0];if($){r.flush($);}};return a;},true);
