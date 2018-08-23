/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/mdc/Field","sap/m/OverflowToolbar","sap/m/SegmentedButton","sap/m/ToolbarSpacer","sap/m/Label","sap/m/SegmentedButtonItem","sap/m/Table","sap/ui/table/Table","sap/ui/mdc/Table","sap/m/Toolbar"],function(C,M,O,S,T,L,a,b,U,c,d){"use strict";var V=C.extend("sap.fe.ViewSwitchContainer",{metadata:{designtime:"sap/ui/mdc/designtime/ViewSwitchContainer.designtime",properties:{},events:{},aggregations:{items:{type:"sap.fe.experimental.ViewSwitchContainerItem",multiple:true,singularName:"item"}},publicMethods:[]},init:function(){this.selectedButtonIndex=0;this.vscTBContents=[];},renderer:{render:function(r,o){var I=o.getItems();var s=I.map(function(h,j){return new a({key:j.toString(),icon:h.getIconurl()});});var v=new S({selectedKey:o.selectedButtonIndex.toString(),items:s,selectionChange:o.handleSegmentedButtonPress.bind(o)});var g=function(t){var h=null;if(t instanceof b){h=t.getHeaderToolbar();}else{var j=t.getExtension();for(var k in j){if(j[k]instanceof d){h=j[k];break;}}}return h;};var e=function(t){var _=t.getContent();_.push(v);t.setVisible(false);return _;};if(o.vscTBContents.length!=I.length){I.forEach(function(h){var t=[new L({text:"View Switch container"}),new T(),v];var j=h.getContent();var k={};if(h.getToolbarId()!=null||h.getToolbarId()!=undefined){k=sap.ui.getCore().byId(h.getToolbarId());t=e(k);}else if(j instanceof c||j instanceof b||j instanceof U){var l=j instanceof c?j.getInnerTable():j;k=g(l);t=e(k);}o.vscTBContents.push(t);});}var f=new O({content:o.vscTBContents[o.selectedButtonIndex]});r.write("<div");r.writeControlData(o);r.write(">");r.renderControl(f);for(var i=0;i<I.length;i++){if(i!=o.selectedButtonIndex){I[i].setVisible(false);}else{I[i].setVisible(true);}r.renderControl(I[i]);}r.write("</div>");}}});V.prototype.handleSegmentedButtonPress=function(e){this.selectedButtonIndex=+e.getParameter("item").getKey();this.rerender();};return V;},true);
