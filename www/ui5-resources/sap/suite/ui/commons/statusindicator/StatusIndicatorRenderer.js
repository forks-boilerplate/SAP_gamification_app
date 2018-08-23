/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["../library","sap/ui/core/library","jquery.sap.global","sap/suite/ui/commons/util/HtmlElement","sap/ui/core/Renderer"],function(l,c,q,H,R){"use strict";var s=l.statusindicator.SizeType;var L=l.statusindicator.LabelPositionType;var t=c.TextAlign;var r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");function g(o,p){var b;p=typeof p==="string"?p:"";switch(o.getSize()){case s.Small:b="sapSuiteUiCommonsStatusIndicatorSmall";break;case s.Medium:b="sapSuiteUiCommonsStatusIndicatorMedium";break;case s.Large:b="sapSuiteUiCommonsStatusIndicatorLarge";break;case s.ExtraLarge:b="sapSuiteUiCommonsStatusIndicatorExtraLarge";break;case s.None:break;default:q.sap.log.error("Unknown size. Expecting size defined in sap.suite.ui.commons.statusindicator.SizeType,"+" but '"+o.getSize()+"' given.");b="sapSuiteUiCommonsStatusIndicatorSmall";}return b+p;}function a(o){var p=o.getLabelPosition();var b=o.getSize();return"sapSuiteUiCommonsStatusIndicator"+b+p+"Label";}var S=R.extend("sap.suite.ui.commons.StatusIndicatorRenderer");S.render=function(o,C){var m=this._getHtmlModel(C);m.getRenderer().render(o);};S._getHtmlModel=function(o){var b=o.getLabelPosition();var i=b===L.Left||b===L.Right,I=b===L.Left||b===L.Top;var d=new H("div");d.addControlData(o);d.addClass("sapSuiteUiCommonsStatusIndicator");d.setAttribute("role","progressbar");d.setAttribute("aria-roledescription",r.getText("STATUS_INDICATOR_ARIA_ROLE_DESCRIPTION"));d.setAttribute("aria-readonly",true);var A=o.getAriaLabel();d.setAttribute("aria-label",A?A:r.getText("STATUS_INDICATOR_ARIA_LABEL"),true);var e=o.getAriaLabelledBy();if(e&&e.length>0){d.setAttribute("aria-labelledby",e.join(" "),true);}var f=o.getAriaDescribedBy();if(f&&f.length>0){d.setAttribute("aria-describedby",f.join(" "),true);}d.setAttribute("tabindex","0");d.setAttribute("aria-valuemin",0);d.setAttribute("aria-valuemax",100);if(i){d.addClass("sapSuiteUiCommonsStatusIndicatorHorizontal");}else{d.addClass("sapSuiteUiCommonsStatusIndicatorVertical");}if(o.getShowLabel()){var h=new H("div");if(I){h.addClass("sapSuiteUiCommonsStatusIndicatorLabelBeforeSvg");}else{h.addClass("sapSuiteUiCommonsStatusIndicatorLabelAfterSvg");}var j=o.getLabel();j.addStyleClass("sapSuiteUiCommonsStatusIndicatorLabel");j.addStyleClass(g(o,"Label"));j.addStyleClass(a(o));j.setTextAlign(i?t.Left:t.Center);h.addChild(j);d.addChild(h);}var k=new H("div");k.setAttribute("focusable",false);k.addClass("sapSuiteUiCommonsStatusIndicatorSvg");k.addClass(g(o,"Svg"));k.addStyle("width",o.getWidth());k.addStyle("height",o.getHeight());k.addChild(this._getSvgElement(o));d.addChild(k);return d;};S._getSvgElement=function(o){var b=new H("svg");b.setId(o._getFullId(o._internalIds.svgNodeId));b.setAttribute("version","1.1");b.setAttribute("xlmns","http://www.w3.org/2000/svg");b.setAttribute("preserveAspectRatio","xMidYMid meet");b.addStyle("width","100%");b.addStyle("height","100%");b.setAttribute("focusable",false);if(o.getViewBox()){b.setAttribute("viewBox",o.getViewBox(),true);}o._getGroupShapes().forEach(function(d){b.addChild(d);});return b;};return S;},true);
