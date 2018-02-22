/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/changeHandler/JsControlTreeModifier","sap/ui/fl/Utils"],function(q,J,U){"use strict";var M={};M.CHANGE_TYPE_MOVE_FIELD="moveSimpleFormField";M.CHANGE_TYPE_MOVE_GROUP="moveSimpleFormGroup";M.sTypeTitle="sap.ui.core.Title";M.sTypeToolBar="sap.m.Toolbar";M.sTypeLabel="sap.m.Label";M.CONTENT_AGGREGATION="content";M.applyChange=function(C,s,p){var o=p.modifier;var v=p.view;var d=p.appComponent;var e=C.getContent();var h=e.movedElements[0];var j=o.getAggregation(s,M.CONTENT_AGGREGATION);if(C.getChangeType()===M.CHANGE_TYPE_MOVE_FIELD){var S=o.bySelector(h.elementSelector||h.element,d,v);var k=j.indexOf(S);var l=g(o,j,k);var t=o.bySelector(h.target.groupSelector||h.target.groupId,d,v);var T=j.indexOf(t);var n=o.bySelector(h.source.groupSelector||h.source.groupId,d,v);var r=j.indexOf(n);var u=a(o,j,T,h.target.fieldIndex,(r===T)&&(h.source.fieldIndex<h.target.fieldIndex));var w=g(o,j,u);var x=j.slice();var F=x.slice(k,k+l);var y,z,B,D;if(k<u){y=x.slice(0,k);B=x.slice(k+l,u+w);D=x.slice(u+w,x.length);x=y.concat(B.concat(F.concat(D)));}else if(k>u){z=x.slice(0,u+w);B=x.slice(u+w,k);D=x.slice(k+l,x.length);x=z.concat(F.concat(B.concat(D)));}if(k!=u){o.removeAllAggregation(s,M.CONTENT_AGGREGATION);for(var i=0;i<x.length;++i){o.insertAggregation(s,M.CONTENT_AGGREGATION,x[i],i);}}}else if(C.getChangeType()===M.CHANGE_TYPE_MOVE_GROUP){var E=[M.sTypeTitle,M.sTypeToolBar];var H=o.bySelector(h.elementSelector||h.element,d,v);var K=j.indexOf(H);var L=m(o,E,j,h.target.groupIndex);var t=j[L];var N=f(o,L,j,E);var O=f(o,K,j,E);var x=j.slice();x.splice(K,O);L=x.indexOf(t);var P=h.source.groupIndex<h.target.groupIndex?N:0;x=A(j,K,x,L+P,O);o.removeAllAggregation(s,M.CONTENT_AGGREGATION);for(var i=0;i<x.length;++i){o.insertAggregation(s,M.CONTENT_AGGREGATION,x[i],i);}}else{q.sap.log.warning("Unknown change type detected. Cannot apply to SimpleForm");}return true;};M.buildStableChangeInfo=function(s){return s;};var m=function(o,s,C,d){var r;var e=-1;for(var i=0;i<C.length;i++){var t=o.getControlType(C[i]);if(s.indexOf(t)>-1){e++;if(e===d){r=C[i];break;}}}return C.indexOf(r);};var I=function(e,i){if(i>=e.length){return true;}var t=e[i].getMetadata().getName();return(M.sTypeTitle===t||M.sTypeToolBar===t);};var f=function(o,d,C,s){var i=0;for(i=d+1;i<C.length;++i){var t=o.getControlType(C[i]);if(s.indexOf(t)>-1){break;}}return i-d;};var g=function(o,e,i){return f(o,i,e,[M.sTypeTitle,M.sTypeToolBar,M.sTypeLabel]);};var a=function(o,C,i,F,u){if(!I(C,i)){q.sap.log.error("Illegal argument. iIndex has to point to a Label.");}else{F=u?F+1:F;var d=0;var e=i;var h;while(e<C.length&&d<F){++d;h=g(o,C,e);e+=h;}return e;}};var A=function(s,S,t,T,d){var r=t;for(var i=0;i<d;i++){r.splice(T+i,0,s[S+i]);}return r;};var G=function(h){var r=h.getTitle();if(!r){r=h.getToolbar();}return r;};var b=function(s,d,S,t,p){var o=G(d.element);var e=J.getSelector(s,p.appComponent);var h={elementSelector:J.getSelector(o,p.appComponent),source:{groupIndex:d.sourceIndex},target:{groupIndex:d.targetIndex}};return{changeType:M.CHANGE_TYPE_MOVE_GROUP,targetSelector:e,movedControl:o,movedElements:[h]};};var c=function(s,d,S,t,p){var o=J.getSelector(s,p.appComponent);var l=d.element.getLabel();var L=J.getSelector(l,p.appComponent);var T=G(t.parent);var e=G(S.parent);var h=J.getSelector(T,p.appComponent);var i=J.getSelector(e,p.appComponent);var j={elementSelector:L,source:{groupSelector:i,fieldIndex:d.sourceIndex},target:{groupSelector:h,fieldIndex:d.targetIndex}};return{changeType:M.CHANGE_TYPE_MOVE_FIELD,targetSelector:o,target:T,source:e,movedControl:l,movedElements:[j]};};M.completeChangeContent=function(C,s,p){var S;var o=p.modifier;var v=p.view;var d=p.appComponent;var e=o.bySelector(s.selector,d,v);var h=s.movedElements;if(h.length>1){q.sap.log.warning("Moving more than 1 Formelement is not yet supported.");}var i=h[0];i.element=sap.ui.getCore().byId(i.id);var j=q.extend({},s.source);var t=q.extend({},s.target);if(!t.parent){t.parent=sap.ui.getCore().byId(t.id);}if(!j.parent){j.parent=sap.ui.getCore().byId(j.id);}if(e&&i.element&&t.parent){if(s.changeType==="moveSimpleFormGroup"){S=b(e,i,j,t,p);}else if(s.changeType==="moveSimpleFormField"){S=c(e,i,j,t,p);}}else{q.sap.log.error("Element not found. This may caused by an instable id!");}var k=C.getDefinition();k.content.targetSelector=S.targetSelector;k.content.movedElements=S.movedElements;if(S.source&&S.target){C.addDependentControl(S.source,"sourceParent",p);C.addDependentControl(S.target,"targetParent",p);}C.addDependentControl([S.movedControl],"movedElements",p);};return M;},true);