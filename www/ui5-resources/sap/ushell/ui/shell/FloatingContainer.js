/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['jquery.sap.global','sap/ushell/library','sap/ui/Device'],function(q,l,D){"use strict";var F=sap.ui.core.Control.extend("sap.ushell.ui.shell.FloatingContainer",{metadata:{properties:{},aggregations:{content:{type:"sap.ui.core.Control",multiple:true}}},renderer:{render:function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapUshellFloatingContainer");r.writeClasses();r.write(">");if(c.getContent()&&c.getContent().length){r.renderControl(c.getContent()[0]);}r.write("</div>");}}});F.prototype.init=function(){D.resize.attachHandler(F.prototype._handleResize,this);};F.prototype._getWindowHeight=function(){return q(window).height();};F.prototype._setContainerHeight=function(c,f){c.css("max-height",f);};F.prototype._handleResize=function(e){q.sap.measure.start("FLP:FloatingContainer_handleResize","resizing floating container","FLP");if(q(".sapUshellFloatingContainer").parent()[0]&&(q('.sapUshellContainerDocked').size()==0)){this.oWrapper=q(".sapUshellFloatingContainer").parent()[0];this.oWrapper.setAttribute("style",this.oStorage.get("floatingContainerStyle"));var i=window.matchMedia?window.matchMedia("(max-width: 417px)").matches:false;this.adjustPosition(e,i);}else if(q(".sapUshellFloatingContainer").parent()[0]&&q('.sapUshellContainerDocked').size()){if(q('#canvas').hasClass('sapUshellContainer-Narrow-Right')){var u;if(sap.ui.getCore().getConfiguration().getRTL()){q("#sapUshellFloatingContainerWrapper").css("left",(416/q(window).width()*100)+"%");u=416/q(window).width()*100+"%;";}else{q("#sapUshellFloatingContainerWrapper").css("left",100-416/q(window).width()*100+"%");u=100-416/q(window).width()*100+"%;";}this.oWrapper.setAttribute("style","left:"+u+this.oWrapper.getAttribute("style").substring(this.oWrapper.getAttribute("style").indexOf("top")));this.oStorage.put("floatingContainerStyle",this.oWrapper.getAttribute("style"));}}if(q('.sapUshellContainerDocked').length>0){sap.ui.getCore().getEventBus().publish("launchpad","shellFloatingContainerDockedIsResize");}var d=D.media.getCurrentRange(sap.ui.Device.media.RANGESETS.SAP_STANDARD);if(d.name!="Desktop"&&(q('.sapUiMedia-Std-Desktop').width()-416<d.from)&&(q('.sapUshellContainerDocked').size())){q('#canvas, .sapUshellShellHead').removeClass('sapUshellContainerDocked');if(q('#canvas').hasClass('sapUshellContainer-Narrow-Right')){q('#canvas').removeClass('sapUshellContainer-Narrow-Right sapUshellMoveCanvasRight  sapUshellContainerDockedLaunchpadOpenTranisationRight');}else{q('#canvas').removeClass('sapUshellContainer-Narrow-Left  sapUshellMoveCanvasLeft sapUshellContainerDockedLaunchpadOpenTranisationLeft');}q(".sapUshellShellFloatingContainerFullHeight").removeClass("sapUshellShellFloatingContainerFullHeight");sap.ui.getCore().byId("mainShell").getController()._handleAnimations(false);var s=q.sap.storage(q.sap.storage.Type.local,"com.sap.ushell.adapters.local.CopilotLastState");if(s){s.put("lastState","floating");}sap.ui.getCore().getEventBus().publish("launchpad","shellFloatingContainerIsUnDockedOnResize");q("#sapUshellFloatingContainerWrapper").removeClass("sapUshellContainerDocked sapUshellContainerDockedMinimizeCoPilot sapUshellContainerDockedExtendCoPilot");var v=sap.ui.getCore().byId("viewPortContainer");if(v){v._handleSizeChange();}}q.sap.measure.end("FLP:FloatingContainer_handleResize");};F.prototype.adjustPosition=function(e,i){var w=e?e.width:q(window).width(),W=e?e.height:q(window).height(),c=this.oContainer.width(),C=this.oContainer.height(),b,a,L,t,d=sap.ui.getCore().getConfiguration().getRTL();i=i!==undefined?i:false;if(this.oWrapper){L=this.oWrapper.style.left.replace("%","");L=w*L/100;t=this.oWrapper.style.top.replace("%","");t=W*t/100;if(!isNaN(L)&&!isNaN(t)&&!i){if(d){b=(L<c)||(L>w);if(b){L=L<c?c:w;}}else{b=(L<0)||(w<(L+c));if(b){L=L<0?0:(w-c);}}a=(t<0)||(W<(t+C));if(a){t=t<0?0:(W-C);}if(!b&&!a){this.oWrapper.setAttribute("style","left:"+L*100/w+"%;top:"+t*100/W+"%;position:absolute;");return;}this.oWrapper.setAttribute("style","left:"+L*100/w+"%;top:"+t*100/W+"%;position:absolute;");}}};F.prototype.handleDrop=function(){if(this.oWrapper){this.adjustPosition();this.oStorage.put("floatingContainerStyle",this.oWrapper.getAttribute("style"));}};F.prototype.setContent=function(c){if(this.getDomRef()){var r=sap.ui.getCore().createRenderManager();r.renderControl(c);r.flush(this.getDomRef());r.destroy();}this.setAggregation("content",c,true);};F.prototype.onAfterRendering=function(){this.oStorage=this.oStorage||q.sap.storage(q.sap.storage.Type.local,"com.sap.ushell.adapters.local.FloatingContainer");this.oContainer=q(".sapUshellFloatingContainer");this.oWrapper=q(".sapUshellFloatingContainer").parent()[0];};F.prototype.exit=function(){D.resize.detachHandler(F.prototype._resizeHandler,this);};return F;},true);
