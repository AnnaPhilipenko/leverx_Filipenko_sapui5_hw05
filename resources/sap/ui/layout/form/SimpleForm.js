/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/layout/ResponsiveFlowLayoutData','./Form','./FormContainer','./FormElement','./FormLayout','sap/ui/layout/library'],function(q,C,R,F,a,b,c,l){"use strict";var S=C.extend("sap.ui.layout.form.SimpleForm",{metadata:{library:"sap.ui.layout",properties:{maxContainerCols:{type:"int",group:"Appearance",defaultValue:2},minWidth:{type:"int",group:"Appearance",defaultValue:-1},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},editable:{type:"boolean",group:"Misc",defaultValue:null},labelMinWidth:{type:"int",group:"Misc",defaultValue:192},layout:{type:"sap.ui.layout.form.SimpleFormLayout",group:"Misc",defaultValue:sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout},labelSpanXL:{type:"int",group:"Misc",defaultValue:-1},labelSpanL:{type:"int",group:"Misc",defaultValue:4},labelSpanM:{type:"int",group:"Misc",defaultValue:2},labelSpanS:{type:"int",group:"Misc",defaultValue:12},adjustLabelSpan:{type:"boolean",group:"Misc",defaultValue:true},emptySpanXL:{type:"int",group:"Misc",defaultValue:-1},emptySpanL:{type:"int",group:"Misc",defaultValue:0},emptySpanM:{type:"int",group:"Misc",defaultValue:0},emptySpanS:{type:"int",group:"Misc",defaultValue:0},columnsXL:{type:"int",group:"Misc",defaultValue:-1},columnsL:{type:"int",group:"Misc",defaultValue:2},columnsM:{type:"int",group:"Misc",defaultValue:1},singleContainerFullSize:{type:"boolean",group:"Misc",defaultValue:true},breakpointXL:{type:"int",group:"Misc",defaultValue:1440},breakpointL:{type:"int",group:"Misc",defaultValue:1024},breakpointM:{type:"int",group:"Misc",defaultValue:600},backgroundDesign:{type:"sap.ui.layout.BackgroundDesign",group:"Appearance",defaultValue:sap.ui.layout.BackgroundDesign.Translucent}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Element",multiple:true,singularName:"content"},form:{type:"sap.ui.layout.form.Form",multiple:false,visibility:"hidden"},title:{type:"sap.ui.core.Title",altTypes:["string"],multiple:false},toolbar:{type:"sap.ui.core.Toolbar",multiple:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designTime:true}});S.prototype.init=function(){this._iMaxWeight=8;this._iLabelWeight=3;this._iCurrentWidth=0;var i=new F(this.getId()+"--Form");i.getTitle=function(){return this.getParent().getTitle();};i._origInvalidate=i.invalidate;i.invalidate=function(O){this._origInvalidate(O);if(this._bIsBeingDestroyed){return;}var j=this.getParent();if(j){j._formInvalidated(O);}};i.getAriaLabelledBy=function(){var j=this.getParent();if(j){return j.getAriaLabelledBy();}else{return null;}};this.setAggregation("form",i);this._aElements=null;this._aLayouts=[];this._changedFormContainers=[];this._changedFormElements=[];};S.prototype.exit=function(){var j=this.getAggregation("form");j.invalidate=j._origInvalidate;if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}for(var i=0;i<this._aLayouts.length;i++){var L=sap.ui.getCore().byId(this._aLayouts[i]);if(L&&L.destroy){L.destroy();}}this._aLayouts=[];this._aElements=null;this._changedFormContainers=[];this._changedFormElements=[];};S.prototype.onBeforeRendering=function(){this._bChangedByMe=true;if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}var i=this;var j=this.getAggregation("form");if(!j.getLayout()){_(i);}d(i);this._bChangedByMe=false;};S.prototype.onAfterRendering=function(){if(this.getLayout()==sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout){this._bChangedByMe=true;this.$().css("visibility","hidden");this._applyLinebreaks();this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),q.proxy(this._resize,this));this._bChangedByMe=false;}};S.prototype.setEditable=function(E){this._bChangedByMe=true;this.setProperty("editable",E,true);var i=this.getAggregation("form");i.setEditable(E);this._bChangedByMe=false;return this;};S.prototype.setToolbar=function(T){this._bChangedByMe=true;var i=this.getAggregation("form");i.setToolbar(T);this._bChangedByMe=false;return this;};S.prototype.getToolbar=function(){var i=this.getAggregation("form");return i.getToolbar();};S.prototype.indexOfContent=function(O){var j=this._aElements;if(j){for(var i=0;i<j.length;i++){if(j[i]==O){return i;}}}return-1;};S.prototype.addContent=function(E){E=this.validateAggregation("content",E,true);if(this.indexOfContent(E)>=0){q.sap.log.warning("SimpleForm.addContent: Content element '"+E+"' already assigned. Please remove before adding!",this);this.removeContent(E);}if(!this._aElements){this._aElements=[];}this._bChangedByMe=true;var L=this._aElements.length;var i;var j=this.getAggregation("form");var k;var A;var P;var B;if(E instanceof sap.ui.core.Title||E.getMetadata().isInstanceOf("sap.ui.core.Toolbar")){k=t(this,E);j.addFormContainer(k);this._changedFormContainers.push(k);}else if(E.getMetadata().isInstanceOf("sap.ui.core.Label")){if(L>0){i=this._aElements[L-1];P=i.getParent();if(P instanceof b){k=P.getParent();}else if(P instanceof a){k=P;}}if(!k){k=t(this);j.addFormContainer(k);this._changedFormContainers.push(k);}A=p(this,k,E);}else{if(L>0){i=this._aElements[L-1];P=i.getParent();if(P instanceof b){k=P.getParent();A=P;B=g(this,E);if(B instanceof R&&!e(this,B)){if(B.getLinebreak()){A=p(this,k);}}}else if(P instanceof a){k=P;A=p(this,k);}}else{k=t(this);j.addFormContainer(k);this._changedFormContainers.push(k);A=p(this,k);}h(this,E,5,false,true);A.addField(E);x(this._changedFormElements,A);}this._aElements.push(E);E.attachEvent("_change",y,this);this.invalidate();this._bChangedByMe=false;return this;};S.prototype.insertContent=function(E,I){E=this.validateAggregation("content",E,true);if(this.indexOfContent(E)>=0){q.sap.log.warning("SimpleForm.insertContent: Content element '"+E+"' already assigned. Please remove before insert!",this);this.removeContent(E);}if(!this._aElements){this._aElements=[];}var L=this._aElements.length;var N;if(I<0){N=0;}else if(I>L){N=L;}else{N=I;}if(N!==I){q.sap.log.warning("SimpleForm.insertContent: index '"+I+"' out of range [0,"+L+"], forced to "+N);}if(N==L){this.addContent(E);return this;}this._bChangedByMe=true;var O=this._aElements[N];var j=this.getAggregation("form");var k;var A;var B;var D;var G;var H=0;var J;var K;var M;var P;var i=0;var Q;if(E instanceof sap.ui.core.Title||E.getMetadata().isInstanceOf("sap.ui.core.Toolbar")){if(I==0&&!(O instanceof sap.ui.core.Title||O.getMetadata().isInstanceOf("sap.ui.core.Toolbar"))){k=O.getParent().getParent();if(E instanceof sap.ui.core.Title){k.setTitle(E);}else{k.setToolbar(E);}}else{k=t(this,E);if(O instanceof sap.ui.core.Title||O.getMetadata().isInstanceOf("sap.ui.core.Toolbar")){B=O.getParent();G=j.indexOfFormContainer(B);}else{D=O.getParent();B=D.getParent();G=j.indexOfFormContainer(B)+1;H=B.indexOfFormElement(D);if(!O.getMetadata().isInstanceOf("sap.ui.core.Label")){J=D.indexOfField(O);if(J>0||D.getLabel()){A=p(this,k);this._changedFormElements.push(A);x(this._changedFormElements,D);K=D.getFields();for(i=J;i<K.length;i++){Q=K[i];A.addField(Q);}H++;}}M=B.getFormElements();for(i=H;i<M.length;i++){k.addFormElement(M[i]);}}j.insertFormContainer(k,G);}this._changedFormContainers.push(k);}else if(E.getMetadata().isInstanceOf("sap.ui.core.Label")){if(O instanceof sap.ui.core.Title||O.getMetadata().isInstanceOf("sap.ui.core.Toolbar")){B=O.getParent();G=j.indexOfFormContainer(B);P=j.getFormContainers();if(G==0){k=t(this);j.insertFormContainer(k,G);this._changedFormContainers.push(k);}else{k=P[G-1];}A=p(this,k,E);}else if(O.getMetadata().isInstanceOf("sap.ui.core.Label")){B=O.getParent().getParent();H=B.indexOfFormElement(O.getParent());A=r(this,B,E,H);}else{D=O.getParent();B=D.getParent();H=B.indexOfFormElement(D)+1;J=D.indexOfField(O);if(J==0&&!D.getLabel()){A=D;A.setLabel(E);h(this,E,this._iLabelWeight,false,true,this.getLabelMinWidth());}else{A=r(this,B,E,H);x(this._changedFormElements,D);K=D.getFields();for(i=J;i<K.length;i++){Q=K[i];A.addField(Q);}}}this._changedFormElements.push(A);}else{if(O instanceof sap.ui.core.Title||O.getMetadata().isInstanceOf("sap.ui.core.Toolbar")){B=O.getParent();G=j.indexOfFormContainer(B);if(G==0){k=t(this);j.insertFormContainer(k,G);this._changedFormContainers.push(k);}else{P=j.getFormContainers();k=P[G-1];}M=k.getFormElements();if(M.length==0){A=p(this,k);}else{A=M[M.length-1];}A.addField(E);}else if(O.getMetadata().isInstanceOf("sap.ui.core.Label")){D=O.getParent();k=D.getParent();H=k.indexOfFormElement(D);if(H==0){A=r(this,k,null,0);}else{M=k.getFormElements();A=M[H-1];}A.addField(E);}else{A=O.getParent();J=A.indexOfField(O);A.insertField(E,J);}x(this._changedFormElements,A);h(this,E,5,false,true);}this._aElements.splice(N,0,E);E.attachEvent("_change",y,this);this.invalidate();this._bChangedByMe=false;return this;};S.prototype.removeContent=function(E){var j=null;var I=-1;var i=0;if(this._aElements){if(typeof(E)=="string"){E=sap.ui.getCore().byId(E);}if(typeof(E)=="object"){for(i=0;i<this._aElements.length;i++){if(this._aElements[i]==E){E=i;break;}}}if(typeof(E)=="number"){if(E<0||E>=this._aElements.length){q.sap.log.warning("Element.removeAggregation called with invalid index: Items, "+E);}else{I=E;j=this._aElements[I];}}}if(j){this._bChangedByMe=true;var k=this.getAggregation("form");var A;var B;var D;var G;if(j instanceof sap.ui.core.Title||j.getMetadata().isInstanceOf("sap.ui.core.Toolbar")){A=j.getParent();A.setTitle(null);A.setToolbar(null);if(I>0){D=A.getFormElements();var H=k.indexOfFormContainer(A);var P=k.getFormContainers()[H-1];if(D.length>0&&!D[0].getLabel()){var J=P.getFormElements();var L=J[J.length-1];G=D[0].getFields();for(i=0;i<G.length;i++){L.addField(G[i]);}x(this._changedFormElements,L);A.removeFormElement(D[0]);D[0].destroy();D.splice(0,1);}for(i=0;i<D.length;i++){P.addFormElement(D[i]);}x(this._changedFormContainers,P);k.removeFormContainer(A);A.destroy();}}else if(j.getMetadata().isInstanceOf("sap.ui.core.Label")){B=j.getParent();A=B.getParent();B.setLabel(null);var K=A.indexOfFormElement(B);if(K==0){if(B.getFields().length==0){A.removeFormElement(B);B.destroy();if(A.getFormElements().length==0){k.removeFormContainer(A);A.destroy();}}else{x(this._changedFormElements,B);}}else{D=A.getFormElements();var M=D[K-1];G=B.getFields();for(i=0;i<G.length;i++){M.addField(G[i]);}x(this._changedFormElements,M);A.removeFormElement(B);B.destroy();if(A.getFormElements().length==0){k.removeFormContainer(A);A.destroy();}}}else{B=j.getParent();B.removeField(j);if(B.getFields().length==0&&!B.getLabel()){A=B.getParent();A.removeFormElement(B);B.destroy();if(A.getFormElements().length==0){k.removeFormContainer(A);A.destroy();}}else{x(this._changedFormElements,B);}}this._aElements.splice(I,1);j.setParent(null);j.detachEvent("_change",y,this);o(this,j);this.invalidate();this._bChangedByMe=false;return j;}return null;};S.prototype.removeAllContent=function(){var i=0;if(this._aElements){this._bChangedByMe=true;var k=this.getAggregation("form");var A=k.getFormContainers();for(i=0;i<A.length;i++){var B=A[i];B.setTitle(null);B.setToolbar(null);var D=B.getFormElements();for(var j=0;j<D.length;j++){var E=D[j];E.setLabel(null);E.removeAllFields();}B.destroyFormElements();}k.destroyFormContainers();for(i=0;i<this._aElements.length;i++){var G=this._aElements[i];o(this,G);G.detachEvent("_change",y,this);}var H=this._aElements;this._aElements=null;this.invalidate();this._bChangedByMe=false;return H;}else{return[];}};S.prototype.destroyContent=function(){var E=this.removeAllContent();if(E){this._bChangedByMe=true;for(var i=0;i<E.length;i++){E[i].destroy();}this.invalidate();this._bChangedByMe=false;}return this;};S.prototype.getContent=function(){if(!this._aElements){this._aElements=this.getAggregation("content",[]);}return this._aElements.slice();};S.prototype.setLayout=function(L){this._bChangedByMe=true;var O=this.getLayout();this.setProperty("layout",L);if(L!=O){var A=this;_(A);var B=this.getAggregation("form");var D=B.getFormContainers();var E;var G;var H;for(var i=0;i<D.length;i++){var I=D[i];this._changedFormContainers.push(I);H=I.getLayoutData();if(H){H.destroy();}n(this,I);E=I.getFormElements();for(var j=0;j<E.length;j++){var J=E[j];x(this._changedFormElements,J);H=J.getLayoutData();if(H){H.destroy();}m(this,J);var K=J.getLabel();if(K){o(this,K);h(this,K,this._iLabelWeight,false,true,this.getLabelMinWidth());}G=J.getFields();for(var k=0;k<G.length;k++){var M=G[k];o(this,M);h(this,M,5,false,true);}}}}this._bChangedByMe=false;return this;};S.prototype.clone=function(I){this._bChangedByMe=true;var k=C.prototype.clone.apply(this,arguments);var A=this.getContent();for(var i=0;i<A.length;i++){var E=A[i];var L=E.getLayoutData();var B=E.clone(I);if(L){if(L.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var D=L.getMultipleLayoutData();for(var j=0;j<D.length;j++){if(e(this,D[j])){k._aLayouts.push(B.getLayoutData().getMultipleLayoutData()[j].getId());}}}else if(e(this,L)){k._aLayouts.push(B.getLayoutData().getId());}}k.addContent(B);}this._bChangedByMe=false;return k;};function _(T){var i=T.getAggregation("form");var L=i.getLayout();if(L){L.destroy();}switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:q.sap.require("sap.ui.layout.form.ResponsiveLayout");i.setLayout(new sap.ui.layout.form.ResponsiveLayout(T.getId()+"--Layout"));break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:q.sap.require("sap.ui.layout.form.GridLayout");q.sap.require("sap.ui.layout.form.GridContainerData");q.sap.require("sap.ui.layout.form.GridElementData");i.setLayout(new sap.ui.layout.form.GridLayout(T.getId()+"--Layout"));break;case sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout:q.sap.require("sap.ui.layout.form.ResponsiveGridLayout");q.sap.require("sap.ui.layout.GridData");i.setLayout(new sap.ui.layout.form.ResponsiveGridLayout(T.getId()+"--Layout"));break;default:break;}}function d(T){T._changedFormContainers=[];var L=T.getLayout();var j=T.getAggregation("form").getLayout();j.setBackgroundDesign(T.getBackgroundDesign());switch(L){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:T._applyLinebreaks();break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:w(T);break;case sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout:j.setLabelSpanXL(T.getLabelSpanXL());j.setLabelSpanL(T.getLabelSpanL());j.setLabelSpanM(T.getLabelSpanM());j.setLabelSpanS(T.getLabelSpanS());j.setAdjustLabelSpan(T.getAdjustLabelSpan());j.setEmptySpanXL(T.getEmptySpanXL());j.setEmptySpanL(T.getEmptySpanL());j.setEmptySpanM(T.getEmptySpanM());j.setEmptySpanS(T.getEmptySpanS());j.setColumnsXL(T.getColumnsXL());j.setColumnsL(T.getColumnsL());j.setColumnsM(T.getColumnsM());j.setSingleContainerFullSize(T.getSingleContainerFullSize());j.setBreakpointXL(T.getBreakpointXL());j.setBreakpointL(T.getBreakpointL());j.setBreakpointM(T.getBreakpointM());break;default:break;}for(var i=0;i<T._changedFormElements.length;i++){var k=T._changedFormElements[i];switch(L){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:u(T,k);break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:break;default:break;}v(T,k);}T._changedFormElements=[];}function e(T,L){var i=L.getId(),j=" "+T._aLayouts.join(" ")+" ";return j.indexOf(" "+i+" ")>-1;}function f(T,W,L,i,M){var j=new R({weight:W,linebreak:L===true,linebreakable:i===true});if(M){j.setMinWidth(M);}T._aLayouts.push(j.getId());return j;}function g(T,i){var L;switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:L=c.prototype.getLayoutDataForElement(i,"sap.ui.layout.ResponsiveFlowLayoutData");break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:L=c.prototype.getLayoutDataForElement(i,"sap.ui.layout.form.GridElementData");break;case sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout:L=c.prototype.getLayoutDataForElement(i,"sap.ui.layout.GridData");break;default:break;}return L;}function h(T,i,W,L,j,M){var k;switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:k=g(T,i);if(!k||!e(T,k)){k=i.getLayoutData();if(k&&k.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){k.addMultipleLayoutData(f(T,W,L,j,M));}else if(!k){i.setLayoutData(f(T,W,L,j,M));}else{q.sap.log.warning("ResponsiveFlowLayoutData can not be set on Field "+i.getId(),"_createFieldLayoutData","SimpleForm");}}break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:break;default:break;}}function m(T,E){switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:E.setLayoutData(new R({linebreak:true,margin:false}));break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:break;default:break;}}function n(T,i){switch(T.getLayout()){case sap.ui.layout.form.SimpleFormLayout.ResponsiveLayout:i.setLayoutData(new R({minWidth:280}));break;case sap.ui.layout.form.SimpleFormLayout.GridLayout:if(T.getMaxContainerCols()>1){i.setLayoutData(new sap.ui.layout.form.GridContainerData({halfGrid:true}));}else{i.setLayoutData(new sap.ui.layout.form.GridContainerData({halfGrid:false}));}break;default:break;}}function o(T,E){var L=g(T,E);if(L){var j=L.getId();for(var i=0;i<T._aLayouts.length;i++){var I=T._aLayouts[i];if(j==I){L.destroy();T._aLayouts.splice(i,1);break;}}}}function p(T,i,L){var E=s(T,L);i.addFormElement(E);return E;}function r(T,i,L,I){var E=s(T,L);i.insertFormElement(E,I);return E;}function s(T,L){var E=new b();m(T,E);if(L){L.addStyleClass("sapUiFormLabel-CTX");E.setLabel(L);if(!g(T,L)){h(T,L,T._iLabelWeight,false,true,T.getLabelMinWidth());}}E.setVisible(false);return E;}function t(T,i){var j=new a();n(T,j);if(i){if(i instanceof sap.ui.core.Title){j.setTitle(i);}else if(i.getMetadata().isInstanceOf("sap.ui.core.Toolbar")){j.setToolbar(i);}}return j;}function u(T,E){var M=T._iMaxWeight;var j=E.getFields();var k;var L=j.length;var A=E.getLabel();var B;var i=0;if(A&&g(T,A)){M=M-g(T,A).getWeight();}for(i=0;i<j.length;i++){k=j[i];B=g(T,k);if(B instanceof R&&!e(T,B)){M=M-B.getWeight();L--;}}var W=Math.floor(M/L);var D=M%L;for(i=0;i<j.length;i++){k=j[i];B=g(T,k);var G=W;if(!B){h(T,k,G,false,i==0);}else if(e(T,B)&&B instanceof R){if(D>0){G++;D--;}B.setWeight(G);}}}function v(T,E){var j=E.getFields();var V=false;for(var i=0;i<j.length;i++){var k=j[i];if(!k.getVisible||k.getVisible()){V=true;break;}}if(E.getVisible()!=V){E.setVisible(V);}}S.prototype._applyLinebreaks=function(){var j=this.getAggregation("form"),k=j.getFormContainers();var D=this.getDomRef();var A=this.$();for(var i=1;i<k.length;i++){var B=k[i],L=B.getLayoutData();if(!D||A.outerWidth(true)>this.getMinWidth()){if(i%this.getMaxContainerCols()==0){L.setLinebreak(true);}else{L.setLinebreak(false);}}else{L.setLinebreak(true);}}if(D&&A.css("visibility")=="hidden"){var E=this;setTimeout(function(){if(E.getDomRef()){E.$().css("visibility","");}},10);}};function w(T){var j=T.getAggregation("form");var k=j.getFormContainers();var L=k.length;for(var i=0;i<L;i++){var A=k[i];if((i==L-1)&&(L%2>0)){A.getLayoutData().setHalfGrid(false);}else if(!A.getLayoutData().getHalfGrid()){A.getLayoutData().setHalfGrid(true);}}}S.prototype._resize=function(){this._bChangedByMe=true;if(this._iCurrentWidth==this.$().outerWidth()){return;}this._iCurrentWidth=this.$().outerWidth();this._applyLinebreaks();this._bChangedByMe=false;};function x(j,k){var A=false;for(var i=0;i<j.length;i++){var B=j[i];if(B==k){A=true;break;}}if(!A){j.push(k);}}function y(E){if(E.getParameter("name")=="visible"){var i=E.oSource.getParent();v(this,i);}}function z(A){var E=[];var B=A.getFormContainers();for(var i=0;i<B.length;i++){var D=B[i];var T=D.getTitle();if(T){E.push(T);}else{var G=D.getToolbar();if(G){E.push(G);}}var H=D.getFormElements();for(var j=0;j<H.length;j++){var I=H[j];var L=I.getLabel();if(L){E.push(L);}var J=I.getFields();for(var k=0;k<J.length;k++){var K=J[k];E.push(K);}}}return E;}S.prototype._formInvalidated=function(O){if(!this._bChangedByMe){var k=z(this.getAggregation("form"));var i=0;var j=0;var A=false;if(!this._aElements||k.length<this._aElements.length){A=true;}else{for(i=0;i<k.length;i++){var E=k[i];var B=this._aElements[j];if(E===B){j++;}else{var D=k[i+1];if(D===B){this.insertContent(E,i);break;}D=this._aElements[j+1];if(D===E){A=true;break;}break;}}}if(A){this.removeAllContent();for(i=0;i<k.length;i++){var G=k[i];this.addContent(G);}}}};return S;},true);
