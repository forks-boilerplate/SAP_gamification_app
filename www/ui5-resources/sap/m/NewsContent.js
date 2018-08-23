/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/m/Text','sap/ui/Device','./NewsContentRenderer','jquery.sap.keycodes'],function(q,l,C,T,D,N){"use strict";var a=C.extend("sap.m.NewsContent",{metadata:{library:"sap.m",designtime:"sap/m/designtime/NewsContent.designtime",properties:{"size":{type:"sap.m.Size",group:"Misc",defaultValue:"Auto"},"contentText":{type:"string",group:"Misc",defaultValue:null},"subheader":{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"_contentText",aggregations:{"_contentText":{type:"sap.m.Text",multiple:false,visibility:"hidden"}},events:{"press":{}}}});a.prototype.init=function(){this._oContentText=new T(this.getId()+"-content-text",{maxLines:2});this._oContentText.cacheLineHeight=false;this.setAggregation("_contentText",this._oContentText,true);this.setTooltip("{AltText}");};a.prototype.onBeforeRendering=function(){this._setPointerOnContentText();this.$().unbind("mouseenter",this._addTooltip);this.$().unbind("mouseleave",this._removeTooltip);};a.prototype.onAfterRendering=function(){this.$().bind("mouseenter",this._addTooltip.bind(this));this.$().bind("mouseleave",this._removeTooltip.bind(this));};a.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString());};a.prototype._removeTooltip=function(){this.$().attr("title",null);};a.prototype._setPointerOnContentText=function(){var t=this.getAggregation("_contentText");if(t&&this.hasListeners("press")){t.addStyleClass("sapMPointer");}else if(t&&t.hasStyleClass("sapMPointer")){t.removeStyleClass("sapMPointer");}};a.prototype.getAltText=function(){var A="";var i=true;if(this.getAggregation("_contentText").getText()){A+=this.getAggregation("_contentText").getText();i=false;}if(this.getSubheader()){if(i){A+=""+this.getSubheader();}else{A+="\n"+this.getSubheader();}}return A;};a.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var s=this.getAltText();if(typeof t==="string"||t instanceof String){s=t.split("{AltText}").join(s).split("((AltText))").join(s);return s;}if(t){return t;}else{return"";}};a.prototype.setContentText=function(t){this._oContentText.setText(t);return this.setProperty("contentText",t,true);};a.prototype.ontap=function(e){if(D.browser.msie){this.$().focus();}this.firePress();};a.prototype.onkeydown=function(e){if(e.which===q.sap.KeyCodes.ENTER||e.which===q.sap.KeyCodes.SPACE){this.firePress();e.preventDefault();}};a.prototype.attachEvent=function(e,d,f,b){C.prototype.attachEvent.call(this,e,d,f,b);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");this._setPointerOnContentText();}return this;};a.prototype.detachEvent=function(e,f,b){C.prototype.detachEvent.call(this,e,f,b);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");this._setPointerOnContentText();}return this;};return a;});
