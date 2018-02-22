/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListBase','./ListItemBase','./library'],function(q,L,a,l){"use strict";var T=L.extend("sap.m.Table",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:sap.m.BackgroundDesign.Translucent},fixedLayout:{type:"boolean",group:"Behavior",defaultValue:true},showOverlay:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{columns:{type:"sap.m.Column",multiple:true,singularName:"column"}}}});T.prototype.sNavItemClass="sapMListTblRow";T.prototype.iAnnounceDetails=2;T.prototype.init=function(){this._iItemNeedsColumn=0;L.prototype.init.call(this);};T.prototype.onBeforeRendering=function(){L.prototype.onBeforeRendering.call(this);this._notifyColumns("ItemsRemoved");};T.prototype.onAfterRendering=function(){L.prototype.onAfterRendering.call(this);this.updateSelectAllCheckbox();this._renderOverlay();};T.prototype._renderOverlay=function(){var $=this.$(),b=$.find(".sapMTableOverlay"),s=this.getShowOverlay();if(s&&b.length===0){b=q("<div>").addClass("sapUiOverlay sapMTableOverlay").css("z-index","1");$.append(b);}else if(!s){b.remove();}};T.prototype.setShowOverlay=function(s){this.setProperty("showOverlay",s,true);this._renderOverlay();return this;};T.prototype.exit=function(){L.prototype.exit.call(this);if(this._selectAllCheckBox){this._selectAllCheckBox.destroy();this._selectAllCheckBox=null;}};T.prototype.destroyItems=function(){this._notifyColumns("ItemsRemoved");return L.prototype.destroyItems.apply(this,arguments);};T.prototype.removeAllItems=function(){this._notifyColumns("ItemsRemoved");return L.prototype.removeAllItems.apply(this,arguments);};T.prototype.removeSelections=function(){L.prototype.removeSelections.apply(this,arguments);this.updateSelectAllCheckbox();return this;};T.prototype.selectAll=function(){L.prototype.selectAll.apply(this,arguments);this.updateSelectAllCheckbox();return this;};T.prototype.getColumns=function(s){var c=this.getAggregation("columns",[]);if(s){c.sort(function(b,d){return b.getOrder()-d.getOrder();});}return c;};T.prototype.onAfterPageLoaded=function(){this.updateSelectAllCheckbox();L.prototype.onAfterPageLoaded.apply(this,arguments);};T.prototype.shouldRenderItems=function(){var h=this.getColumns().some(function(c){return c.getVisible();});if(!h){q.sap.log.warning("No visible columns found in "+this);}return h;};T.prototype.onItemTypeColumnChange=function(i,n){this._iItemNeedsColumn+=(n?1:-1);if(this._iItemNeedsColumn==1&&n){this._setTypeColumnVisibility(true);}else if(this._iItemNeedsColumn==0){this._setTypeColumnVisibility(false);}};T.prototype.onItemSelectedChange=function(i,s){L.prototype.onItemSelectedChange.apply(this,arguments);q.sap.delayedCall(0,this,function(){this.updateSelectAllCheckbox();});};T.prototype.getTableDomRef=function(){return this.getDomRef("listUl");};T.prototype.getItemsContainerDomRef=function(){return this.getDomRef("tblBody");};T.prototype.setNavigationItems=function(i){var h=this.$("tblHeader");var f=this.$("tblFooter");var r=this.$("tblBody").children(".sapMLIB");var I=h.add(r).add(f).get();i.setItemDomRefs(I);if(i.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==sap.m.ListGrowingDirection.Upwards){i.setFocusedIndex(I.length-1);}else{i.setFocusedIndex(h[0]?1:0);}}};T.prototype.checkGrowingFromScratch=function(){if(this.hasPopin()){return false;}return this.getColumns().some(function(c){return c.getVisible()&&c.getMergeDuplicates();});};T.prototype.onColumnResize=function(c){if(!this.hasPopin()&&!this._mutex){var h=this.getColumns().some(function(d){return d.isPopin();});if(!h){c.setDisplayViaMedia(this.getTableDomRef());return;}}this._dirty=window.innerWidth;if(!this._mutex){var b=window.innerWidth;this._mutex=true;this.rerender();q.sap.delayedCall(200,this,function(){if(this._dirty!=b){this._dirty=0;this.rerender();}this._mutex=false;});}};T.prototype.setTableHeaderVisibility=function(c){if(!this.getDomRef()){return;}var $=this.$("tblHeader"),h=!$.hasClass("sapMListTblHeaderNone"),v=$.find(".sapMListTblCell:visible"),b=v.eq(0);if(v.length==1){b.width("");}else{v.each(function(){this.style.width=this.getAttribute("data-sap-width")||"";});}this._colCount=v.length+2+!!sap.m.ListBaseRenderer.ModeOrder[this.getMode()];this.$("tblBody").find(".sapMGHLICell").attr("colspan",this.getColSpan());this.$("nodata-text").attr("colspan",this.getColCount());if(!c&&h){$[0].className="sapMListTblRow sapMListTblHeader";this._headerHidden=false;}else if(c&&!h&&!v.length){$[0].className="sapMListTblHeaderNone";this._headerHidden=true;}};T.prototype._setTypeColumnVisibility=function(v){q(this.getTableDomRef()).toggleClass("sapMListTblHasNav",v);};T.prototype._notifyColumns=function(A,p,P){this.getColumns().forEach(function(c){c["on"+A](p,P);});};T.prototype._getSelectAllCheckbox=function(){return this._selectAllCheckBox||(this._selectAllCheckBox=new sap.m.CheckBox({id:this.getId("sa"),activeHandling:false}).setParent(this,null,true).attachSelect(function(){if(this._selectAllCheckBox.getSelected()){this.selectAll(true);}else{this.removeSelections(false,true);}},this).setTabIndex(-1));};T.prototype.updateSelectAllCheckbox=function(){if(this._selectAllCheckBox&&this.getMode()==="MultiSelect"){var i=this.getItems(),s=this.getSelectedItems().length,S=i.filter(function(I){return I.isSelectable();}).length;this._selectAllCheckBox.setSelected(i.length>0&&s==S);}};T.prototype.getColSpan=function(){return(this._colCount||1)-1;};T.prototype.getColCount=function(){return(this._colCount||0);};T.prototype.hasPopin=function(){return!!this._hasPopin;};T.prototype.isHeaderRowEvent=function(e){var h=this.$("tblHeader");return!!q(e.target).closest(h,this.getTableDomRef()).length;};T.prototype.isFooterRowEvent=function(e){var f=this.$("tblFooter");return!!q(e.target).closest(f,this.getTableDomRef()).length;};T.prototype.getAccessibilityType=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_TABLE");};T.prototype._setHeaderAnnouncement=function(){var b=sap.ui.getCore().getLibraryResourceBundle("sap.m"),A=b.getText("ACC_CTR_TYPE_HEADER_ROW")+" ";if(this.isAllSelectableSelected()){A+=b.getText("LIST_ALL_SELECTED");}this.getColumns(true).forEach(function(c,i){var h=c.getHeader();if(h&&h.getVisible()){A+=a.getAccessibilityText(h)+" ";}});this.updateInvisibleText(A);};T.prototype._setFooterAnnouncement=function(){var A=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_FOOTER_ROW")+" ";this.getColumns(true).forEach(function(c,i){var f=c.getFooter();if(f&&f.getVisible()){var h=c.getHeader();if(h&&h.getVisible()){A+=a.getAccessibilityText(h)+" ";}A+=a.getAccessibilityText(f)+" ";}});this.updateInvisibleText(A);};T.prototype.onsapspace=function(e){if(e.isMarked()){return;}if(this._selectAllCheckBox&&e.target===this.getDomRef("tblHeader")){this._selectAllCheckBox.setSelected(!this._selectAllCheckBox.getSelected()).fireSelect();e.preventDefault();e.setMarked();}};T.prototype.onsaptabnext=function(e){if(e.isMarked()||this.getKeyboardMode()==sap.m.ListKeyboardMode.Edit){return;}var r=q();if(e.target.id==this.getId("nodata")){r=this.$("nodata");}else if(this.isHeaderRowEvent(e)){r=this.$("tblHeader");}else if(this.isFooterRowEvent(e)){r=this.$("tblFooter");}var o=r.find(":sapTabbable").get(-1)||r[0];if(e.target===o){this.forwardTab(true);e.setMarked();}};T.prototype.onsaptabprevious=function(e){if(e.isMarked()||this.getKeyboardMode()==sap.m.ListKeyboardMode.Edit){return;}var t=e.target.id;if(t==this.getId("nodata")||t==this.getId("tblHeader")||t==this.getId("tblFooter")){this.forwardTab(false);}else if(t==this.getId("trigger")){this.focusPrevious();e.preventDefault();}};T.prototype.onfocusin=function(e){var t=e.target;if(t.id===this.getId("tblHeader")){this._setHeaderAnnouncement();}else if(t.id===this.getId("tblFooter")){this._setFooterAnnouncement();}else if(t.id==this.getId("nodata")){this.updateInvisibleText(this.getNoDataText(),t);}L.prototype.onfocusin.call(this,e);};T.prototype.onsapfocusleave=function(e){L.prototype.onsapfocusleave.call(this,e);if(this.iAnnounceDetails){this.iAnnounceDetails=2;}};return T;},true);
