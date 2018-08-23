sap.ui.require.preload({"sap/ushell/plugins/rta-personalize/Component.js":function(){sap.ui.define(["sap/ushell/plugins/BaseRTAPlugin","sap/m/MessageBox","sap/ui/fl/Utils","sap/ui/fl/EventHistory"],function(B,M,F,E){"use strict";var R=B.extend("sap.ushell.plugins.rta-personalize.Component",{sType:'rta-personalize',metadata:{manifest:"json"},init:function(){var c={sComponentName:"sap.ushell.plugins.rta-personalize",layer:"USER",developerMode:false,id:"PERSONALIZE_Plugin_ActionButton",text:"PERSONALIZE_BUTTON_TEXT",icon:"sap-icon://edit",visible:false};B.prototype.init.call(this,c);this._aPersonalizableControls=[];this._aOriginalFooterVisibility=[];var a=function(C){if(this._aPersonalizableControls.indexOf(C)===-1){this._aPersonalizableControls.push(C);this._adaptButtonVisilibity("PERSONALIZE_Plugin_ActionButton",this._checkUI5App());}}.bind(this);var r=function(C){var i=this._aPersonalizableControls.indexOf(C);this._aPersonalizableControls.splice(i,1);this._aOriginalFooterVisibility.splice(i,1);if(this._aPersonalizableControls.length===0){this._oObserver.disconnect();delete this._oObserver;this._adaptButtonVisilibity("PERSONALIZE_Plugin_ActionButton",false);}}.bind(this);var o=function(C,s,b){if(F.checkControlId(b)){a(b);if(!this._oObserver){this._oObserver=new MutationObserver(function(m){this._aPersonalizableControls.forEach(function(b){if(!b.getDomRef()){r(b);}});}.bind(this));var c={attributes:true,childList:true,characterData:false,subtree:true,attributeFilter:["style","class"]};this._oObserver.observe(window.document,c);}}}.bind(this);sap.ui.getCore().getEventBus().subscribe("sap.ui","ControlForPersonalizationRendered",o,this);var e=E.getHistoryAndStop("ControlForPersonalizationRendered");e.forEach(function(b){o(b.channelId,b.eventId,b.parameters);});},_onStartHandler:function(e){var i=e.getParameter("editablePluginsCount");if(i!==undefined&&i<=0){M.information(this.i18n.getText("MSG_STARTUP_NO_OVERLAYS"),{onClose:function(){this._stopRta(true,true);}.bind(this)});}var v=this._getFLPViewPort();v.attachAfterSwitchState(function(d){if(this._oRTA){if(d.getParameter("to")==="LeftCenter"){this._oRTA.getToolbar().addStyleClass("sapUiRtaHideToolbar");this._oRTA.setMode("navigation");}}}.bind(this));v.attachAfterSwitchStateAnimationFinished(function(d){if(this._oRTA){if(d.getParameter("to")==="Center"){this._oRTA.getToolbar().removeStyleClass("sapUiRtaHideToolbar");this._oRTA.setMode("adaptation");}}}.bind(this));},_loadPlugins:function(r){var p=new Promise(function(a,b){sap.ui.require(["sap/ui/rta/plugin/EasyAdd","sap/ui/rta/plugin/EasyRemove"],function(c,d){var P=r.getDefaultPlugins();var o=P["remove"];P["remove"]=new d({commandFactory:o.getCommandFactory()});var A=P["additionalElements"];P["additionalElements"]=new c({commandFactory:A.getCommandFactory(),analyzer:A.getAnalyzer(),dialog:A.getDialog()});r.setPlugins(P);a();});});return p;},_onAdapt:function(e){if(e.getSource().getText()===this.i18n.getText("PERSONALIZE_BUTTON_TEXT")){var u=jQuery.sap.getUriParameters();var s=u.mParams["sap-ui-layer"]&&u.mParams["sap-ui-layer"][0];if(!s||s==="USER"){e.getSource().setText(this.i18n.getText("END_PERSONALIZE_BUTTON_TEXT"));this._adaptButtonVisilibity("RTA_Plugin_ActionButton",false);this._aPersonalizableControls.forEach(function(c){if(c.setShowFooter){this._aOriginalFooterVisibility.push(c.getShowFooter());}else{this._aOriginalFooterVisibility.push(undefined);}}.bind(this));this._adaptFooterVisibility(false);var S=this._getFlpSearchButton();this._bOriginalSearchButtonVisibility=S&&S.getVisible();if(this._bOriginalSearchButtonVisibility){this._adaptButtonVisilibity(S,false);}B.prototype._onAdapt.call(this,e);}else{M.information(this.i18n.getText("MSG_STARTUP_WRONG_LAYER"));}}else{this._stopRta(false,true);}},_switchToDefaultMode:function(){sap.ui.getCore().byId("PERSONALIZE_Plugin_ActionButton").setText(this.i18n.getText("PERSONALIZE_BUTTON_TEXT"));this._adaptButtonVisilibity("RTA_Plugin_ActionButton",true);this._adaptFooterVisibility(true);if(this._bOriginalSearchButtonVisibility!==undefined){this._adaptButtonVisilibity(this._getFlpSearchButton(),this._bOriginalSearchButtonVisibility);delete this._bOriginalSearchButtonVisibility;}sap.m.MessageToast.show(this.i18n.getText("SAVE_SUCCESSFUL"),{duration:4000,offset:"0 -50"});B.prototype._switchToDefaultMode.call(this);},_checkRestartRTA:function(){},_adaptFooterVisibility:function(v){this._aPersonalizableControls.forEach(function(c,i){if(this._aOriginalFooterVisibility[i]){c.setShowFooter(v);}}.bind(this));},_getFlpSearchButton:function(){return this.oRenderer.getRootControl().getOUnifiedShell().getHeader().getHeadEndItems()[0];},_getFLPViewPort:function(){return sap.ui.getCore().byId("viewPortContainer");}});return R;},true);},"sap/ushell/plugins/rta-personalize/manifest.json":'{\n\t"_version": "1.1.0",\n\n\t"sap.app": {\n\t\t"_version": "1.1.0",\n\t\t"i18n": "i18n/i18n.properties",\n\t\t"id": "sap.ushell.plugins.rta-personalize",\n\t\t"title": "{{APP_TITLE}}",\n\t\t"type": "component",\n\t\t"applicationVersion": {\n\t\t\t"version": "1.0.0"\n\t\t},\n\t\t"ach": "CA-UI5-FL-RTA"\n\t},\n\n\t"sap.ui": {\n\t\t"_version": "1.1.0",\n\t\t"technology": "UI5",\n\t\t"supportedThemes": [\n\t\t\t"sap_hcb",\n\t\t\t"sap_bluecrystal"\n\t\t],\n\t\t"deviceTypes": {\n\t\t\t"desktop": true,\n\t\t\t"tablet": false,\n\t\t\t"phone": false\n\t\t}\n\t},\n\n\t"sap.ui5": {\n\t\t"_version": "1.1.0",\n\t\t"contentDensities": {\n\t\t\t"compact": true,\n\t\t\t"cozy": false\n\t\t},\n\t\t"dependencies": {\n\t\t\t"minUI5Version": "1.30.1",\n\t\t\t"libs": {\n\t\t\t\t"sap.ui.core": {\n\t\t\t\t\t"minVersion": "1.30.1"\n\t\t\t\t},\n\t\t\t\t"sap.m": {\n\t\t\t\t\t"minVersion": "1.30.1"\n\t\t\t\t},\n\t\t\t\t"sap.ui.dt": {\n\t\t\t\t\t"minVersion": "1.30.1",\n\t\t\t\t\t"lazy": true\n\t\t\t\t},\n\t\t\t\t"sap.ui.rta": {\n\t\t\t\t\t"minVersion": "1.30.1",\n\t\t\t\t\t"lazy": true\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t"models": {\n\t\t\t"i18n": {\n\t\t\t\t"type": "sap.ui.model.resource.ResourceModel",\n\t\t\t\t"uri": "i18n/i18n.properties"\n\t\t\t}\n\t\t}\n\t},\n\t"sap.flp": {\n\t\t"type": "plugin"\n\t}\n}'},"sap/ushell/plugins/rta-personalize/Component-h2-preload");sap.ui.loader.config({depCacheUI5:{"sap/ushell/plugins/rta-personalize/Component.js":["sap/m/MessageBox.js","sap/ui/fl/EventHistory.js","sap/ui/fl/Utils.js","sap/ushell/plugins/BaseRTAPlugin.js"]}});
