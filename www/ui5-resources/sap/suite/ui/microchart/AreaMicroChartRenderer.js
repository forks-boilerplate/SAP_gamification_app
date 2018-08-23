/*!
* SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
*/
sap.ui.define(["jquery.sap.global","./library"],function(q,l){"use strict";var A={};A.render=function(r,c){if(!c._bThemeApplied){return;}if(c._hasData()){var t=((c.getView()=="Normal"&&c.getFirstYLabel()&&c.getFirstYLabel().getLabel())?"L":"")+((c.getMaxLabel()&&c.getMaxLabel().getLabel())?"C":"")+((c.getView()=="Normal"&&c.getLastYLabel()&&c.getLastYLabel().getLabel())?"R":"");var b=((c.getView()=="Normal"&&c.getFirstXLabel()&&c.getFirstXLabel().getLabel())?"L":"")+((c.getMinLabel()&&c.getMinLabel().getLabel())?"C":"")+((c.getView()=="Normal"&&c.getLastXLabel()&&c.getLastXLabel().getLabel())?"R":"");var L,R;R=L=c.getView()=="Wide";r.write("<div");this._writeMainProperties(r,c);r.writeStyles();if(t){r.addClass("sapSuiteAMCTopLbls");}if(b){r.addClass("sapSuiteAMCBtmLbls");}r.writeClasses();r.write(">");if(t&&c.getShowLabel()){var T="sapSuiteAMCLblType"+t;r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-top-labels");r.addClass("sapSuiteAMCLabels");r.addClass("sapSuiteAMCPositionTop");r.writeClasses();r.write(">");this._writeLabel(r,c,c.getFirstYLabel(),"-top-left-lbl","sapSuiteAMCPositionLeft",T);this._writeLabel(r,c,c.getMaxLabel(),"-top-center-lbl","sapSuiteAMCPositionCenter",T);this._writeLabel(r,c,c.getLastYLabel(),"-top-right-lbl","sapSuiteAMCPositionRight",T);r.write("</div>");}if(L&&c.getShowLabel()){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-left-labels");r.addClass("sapSuiteAMCSideLabels");r.addClass("sapSuiteAMCPositionLeft");r.writeClasses();r.write(">");this._writeLabel(r,c,c.getFirstYLabel(),"-top-left-lbl","sapSuiteAMCPositionTop","sapSuiteAMCPositionLeft");this._writeLabel(r,c,c.getFirstXLabel(),"-btm-left-lbl","sapSuiteAMCPositionBtm","sapSuiteAMCPositionLeft");r.write("</div>");}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-canvas-cont");r.addClass("sapSuiteAMCCanvas");r.writeClasses();r.write(">");r.write("<canvas");r.writeAttributeEscaped("id",c.getId()+"-canvas");r.addStyle("width","100%");r.addStyle("height","100%");r.addStyle("position","absolute");r.addStyle("display","block");r.writeStyles();r.write("></canvas>");r.write("</div>");if(R&&c.getShowLabel()){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-right-labels");r.addClass("sapSuiteAMCSideLabels");r.addClass("sapSuiteAMCPositionRight");r.writeClasses();r.write(">");this._writeLabel(r,c,c.getLastYLabel(),"-top-right-lbl","sapSuiteAMCPositionTop","sapSuiteAMCPositionRight");this._writeLabel(r,c,c.getLastXLabel(),"-btm-right-lbl","sapSuiteAMCPositionBtm","sapSuiteAMCPositionRight");r.write("</div>");}if(b&&c.getShowLabel()){var B="sapSuiteAMCLblType"+b;r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-bottom-labels");r.addClass("sapSuiteAMCLabels");r.addClass("sapSuiteAMCPositionBtm");r.writeClasses();r.write(">");this._writeLabel(r,c,c.getFirstXLabel(),"-btm-left-lbl","sapSuiteAMCPositionLeft",B);this._writeLabel(r,c,c.getMinLabel(),"-btm-center-lbl","sapSuiteAMCPositionCenter",B);this._writeLabel(r,c,c.getLastXLabel(),"-btm-right-lbl","sapSuiteAMCPositionRight",B);r.write("</div>");}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-css-helper");r.addStyle("display","none");r.writeStyles();r.write("></div>");r.write("</div>");}else{r.write("<div");this._writeMainProperties(r,c);r.writeClasses();r.writeStyles();r.write(">");l._renderNoData(r);r.write("</div>");}};A._writeMainProperties=function(r,c){var i=c.hasListeners("press");l._renderActiveProperties(r,c);var a=c.getAltText(i);r.writeAttribute("role","img");r.writeAttributeEscaped("aria-label",a);r.writeControlData(c);r.addClass("sapSuiteAMC");r.addStyle("width",c.getIsResponsive()?"100%":c.getWidth());r.addStyle("height",c.getIsResponsive()?"100%":c.getHeight());};A._writeLabel=function(r,c,L,i,C,t){var s=L?L.getLabel():"";r.write("<div");r.writeAttribute("id",c.getId()+i);if(L){r.addClass(q.sap.encodeHTML("sapSuiteAMCSemanticColor"+L.getColor()));}r.addClass("sapSuiteAMCLbl");r.addClass(q.sap.encodeHTML(C));r.addClass(q.sap.encodeHTML(t));r.writeClasses();r.write(">");r.writeEscaped(s);r.write("</div>");};return A;},true);
