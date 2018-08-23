/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/m/library"],function(q,M){"use strict";var I={};I.BAR_DIRECTION_POSITIVE={NAME:"positive",WRAPPER_CSSCLASS:"sapSuiteIBCBarWrapperPositive",CSSCLASS:"sapSuiteIBCBarPositive"};I.BAR_DIRECTION_NEGATIVE={NAME:"negative",WRAPPER_CSSCLASS:"sapSuiteIBCBarWrapperNegative",CSSCLASS:"sapSuiteIBCBarNegative"};I.render=function(r,c){if(!c._bThemeApplied){return;}var b=c.getBars(),B=Math.min(c.getDisplayedBars(),b.length);r.write("<div");r.writeControlData(c);r.addClass("sapSuiteIBC");r.writeClasses();r.writeStyles();if(!c._isChartEnabled()){var a=c.getTooltip_AsString();if(q.type(a)==="string"){r.writeAttributeEscaped("title",a);}}var A={};A.role="listbox";A.multiselectable=true;A.disabled=!c._isChartEnabled();A.labelledby=c.getAriaLabelledBy();A.describedby=this._getAriaDescribedBy(c,B);r.writeAccessibilityState(c,A);r.write(">");if(!c.getSelectionEnabled()){this.renderDisabledOverlay(r,c);}for(var i=0;i<B;i++){this._renderBar(r,c,b[i],i,B);}r.write("</div>");};I._renderBar=function(r,c,b,a,d){var v,l,t,A,C,L;r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-interactionArea-"+a);r.writeAttributeEscaped("data-sap-ui-ibc-selection-index",a);r.addClass("sapSuiteIBCBarInteractionArea");if(b.getSelected()){r.addClass("sapSuiteIBCBarSelected");}if(a===0&&c._isChartEnabled()){r.writeAttribute("tabindex","0");}if(c._isChartEnabled()){t=b.getTooltip_AsString();if(q.type(t)==="string"){r.writeAttributeEscaped("title",t);}}l=b.getLabel();A=l;if(c._bMinMaxValid){v=this._getDisplayValue(b,c);var t=b.getTooltip_Text();if(t&&q.trim(t).length>0){A=t;}else{if(A){A=A+" "+v;}else{A=v;}if(c._bUseSemanticTooltip){C=b.getColor();L=c._oRb.getText(("SEMANTIC_COLOR_"+C.toUpperCase()));A+=" "+L;}}}var o={};o.role="option";o.label=A;o.selected=b.getSelected();o.posinset=a+1;o.setsize=d;r.writeAccessibilityState(b,o);r.writeStyles();r.writeClasses();r.write(">");l=b.getLabel();if(b.getColor()!==M.ValueColor.Neutral){r.write("<div");r.addClass("sapSuiteIBCSemanticMarker");r.addClass("sapSuiteIBCSemantic"+b.getColor());r.writeClasses();r.write("/>");}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-label-"+a);r.addClass("sapSuiteIBCBarLabel");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapSuiteIBCBarLabelText");r.writeClasses();r.write(">");r.writeEscaped(l);r.write("</div>");r.write("</div>");if(c._bMinMaxValid){r.write("<div");r.addClass("sapSuiteIBCBarWrapper");r.writeClasses();r.write(">");this._renderBarDirection(r,c,b,a,v,I.BAR_DIRECTION_NEGATIVE);r.write("<div");r.addClass("sapSuiteIBCDivider");r.writeClasses();r.write("/>");this._renderBarDirection(r,c,b,a,v,I.BAR_DIRECTION_POSITIVE);r.write("</div>");}r.write("</div>");};I._renderBarDirection=function(r,c,b,a,d,e){var v=b.getValue();r.write("<div");r.addClass(e.WRAPPER_CSSCLASS);r.writeClasses();r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-bar-"+e.NAME+"-"+a);r.addClass("sapSuiteIBCBar");r.addClass(e.CSSCLASS);if(v>0){r.addClass("sapSuiteIBCValuePositive");}else if(v===0||b._bNullValue){r.addClass("sapSuiteIBCBarValueNull");}else{r.addClass("sapSuiteIBCValueNegative");}r.writeClasses();r.write(">");this._renderDisplayedValue(r,c,b,c.getId(),a,d,e);r.write("</div>");r.write("</div>");};I._renderDisplayedValue=function(r,c,b,a,d,e,f){var p;if(b._bNullValue){if(c._fMin<0&&c._fMax>0){p=Math.abs(c._fMax)>=Math.abs(c._fMin);}else{p=c._fMin>=0;}}else{p=b.getValue()>=0;}if(f===I.BAR_DIRECTION_POSITIVE&&p||f===I.BAR_DIRECTION_NEGATIVE&&!p){if(b._bNullValue){r.addClass("sapSuiteIBCBarValueNA");r.addClass("sapSuiteIBCBarValueOutside");}r.write("<span");r.writeAttributeEscaped("id",a+"-displayedValue-"+d);r.addClass("sapSuiteIBCBarValue");r.writeClasses();r.write(">");r.writeEscaped(e);r.write("</span>");}};I.renderDisabledOverlay=function(r,c){r.write("<div");r.addClass("sapSuiteIBCDisabledOverlay");r.writeClasses();r.write(">");r.write("</div>");};I._getDisplayValue=function(b,c){var v,V;v=b.getDisplayedValue();V=b.getValue();if(b._bNullValue){v=c._oRb.getText("INTERACTIVECHART_NA");}else if(!v){v=V.toString();}return v;};I._getAriaDescribedBy=function(c,b){var a=[];for(var i=0;i<b;i++){a.push(c.getId()+"-interactionArea-"+i);}return a.join(",");};return I;},true);
