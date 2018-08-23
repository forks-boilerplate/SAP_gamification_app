sap.ui.define(["sap/ushell/plugins/BaseRTAPluginStatus","sap/ui/core/Component","sap/m/MessageBox","sap/ui/core/BusyIndicator"],function(P,C,M,B){"use strict";var S=P.STATUS_STARTING;var a=P.STATUS_STARTED;var b=P.STATUS_STOPPING;var c=P.STATUS_STOPPED;var d=C.extend("sap.ushell.plugins.BaseRTAPlugin",{sStatus:c,sType:null,oStartingPromise:null,oStoppingPromise:null,_getRenderer:function(o){var D=new jQuery.Deferred(),r;r=o.getRenderer();if(r){this.oRenderer=r;D.resolve(r);}else{this._onRendererCreated=function(e){r=e.getParameter("renderer");if(r){this.oRenderer=r;D.resolve(r);}else{D.reject("Illegal state: shell renderer not available after recieving 'rendererCreated' event.");}};o.attachRendererCreatedEvent(this._onRendererCreated,this);}return D.promise();},init:function(m){this.mConfig=m;this.i18n=this.getModel("i18n").getResourceBundle();var o=this._getContainer();var A=o.getService("AppLifeCycle");if(this._checkUI5App()){this._checkRestartRTA();}A.attachAppLoaded(this._onAppLoaded,this);this._getRenderer(o).fail(function(e){jQuery.sap.log.error(e,undefined,this.mConfig.sComponentName);}.bind(this)).done(function(r){r.addActionButton("sap.ushell.ui.launchpad.ActionItem",{id:this.mConfig.id,text:this.i18n.getText(this.mConfig.text),icon:this.mConfig.icon,press:this._onAdapt.bind(this),visible:this.mConfig.visible&&this._checkUI5App()},true,false,[r.LaunchpadState.App]);}.bind(this));},exit:function(){var o=this._getContainer();o.getService("AppLifeCycle").detachAppLoaded(this._onAppLoaded,this);if(this._onRendererCreated){o.detachRendererCreatedEvent(this._onRendererCreated,this);}},_onAppLoaded:function(){if(this._checkUI5App()){this._checkRestartRTA();this._adaptButtonVisilibity(this.mConfig.id,true);}else{this._adaptButtonVisilibity(this.mConfig.id,false);}},_getContainer:function(){var o=jQuery.sap.getObject("sap.ushell.Container");if(!o){throw new Error("Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");}return o;},_onAdapt:function(){var s=((sap.ui.Device.browser.msie&&sap.ui.Device.browser.version>10)||sap.ui.Device.browser.webkit||sap.ui.Device.browser.firefox||sap.ui.Device.browser.edge);if(!s){M.error(this.i18n.getText("MSG_UNSUPPORTED_BROWSER"),{title:this.i18n.getText("ERROR_TITLE"),onClose:null});}else{this._startRta();}},_adaptButtonVisilibity:function(v,V){if(typeof v==="string"){v=sap.ui.getCore().byId(v);}if(!v){return;}v.setVisible(V);},_checkUI5App:function(){var o=this._getCurrentRunningApplication();var u=o&&o.applicationType==="UI5"&&!o.homePage;return u;},_checkRestartRTA:function(){var r=!!window.localStorage.getItem("sap.ui.rta.restart."+this.mConfig.layer);if(r){window.localStorage.removeItem("sap.ui.rta.restart."+this.mConfig.layer);this._startRta();}},_getCurrentRunningApplication:function(){var A=this._getContainer().getService("AppLifeCycle");var o=A.getCurrentApplication();return o;},_switchToDefaultMode:function(){if(this._oRTA){this._oRTA.destroy();this.sStatus=c;this.oStartingPromise=null;this.oStoppingPromise=null;this._oRTA=null;}sap.ui.getCore().getEventBus().unsubscribe("sap.ushell.renderers.fiori2.Renderer","appClosed",this._onAppClosed,this);},_startRta:function(){var o=this._getCurrentRunningApplication();var r=o.componentInstance.getAggregation("rootControl");var s=this.sStatus;switch(s){case S:this.oStartingPromise=this.oStartingPromise;break;case a:this.oStartingPromise=Promise.resolve();break;case b:this.oStartingPromise=this.oStoppingPromise.then(function(){return this._triggerStartRta(r);}.bind(this));break;case c:this.oStartingPromise=this._triggerStartRta(r);break;}if(s!==S){this.oStartingPromise.then(function(){this.oStartingPromise=null;}.bind(this));}return this.oStartingPromise;},_triggerStartRta:function(r){this.sStatus=S;return new Promise(function(R){sap.ui.getCore().getEventBus().subscribe("sap.ushell.renderers.fiori2.Renderer","appClosed",this._onAppClosed,this);B.show(0);sap.ui.getCore().loadLibraries(["sap.ui.dt","sap.ui.rta"],{async:true}).then(function(){sap.ui.require(["sap/ui/rta/RuntimeAuthoring"],function(e){this._oRTA=new e({rootControl:r,flexSettings:{layer:this.mConfig.layer,developerMode:this.mConfig.developerMode}});this._oRTA.attachEvent('start',function(E){this._onStartHandler(E);},this);this._oRTA.attachEvent('failed',this._errorHandler,this);this._oRTA.attachEvent('stop',this._switchToDefaultMode,this);this._loadPlugins(this._oRTA).then(function(){return this._oRTA.start().then(function(){B.hide();R();}).catch(this._errorHandler.bind(this));}.bind(this));}.bind(this));}.bind(this));}.bind(this)).then(function(){this.sStatus=a;}.bind(this));},_stopRta:function(){var s=this.sStatus;switch(s){case S:this.oStoppingPromise=this.oStartingPromise.then(function(){return this._triggerStopRta.apply(this,arguments);}.bind(this));break;case a:this.oStoppingPromise=this._triggerStopRta.apply(this,arguments);break;case b:this.oStoppingPromise=this.oStoppingPromise;break;case c:this.oStoppingPromise=Promise.resolve();break;}if(s!==b){this.oStoppingPromise.then(function(){this.oStoppingPromise=null;}.bind(this));}return this.oStoppingPromise;},_triggerStopRta:function(){this.sStatus=b;return this._oRTA.stop.apply(this._oRTA,arguments).then(function(){this._switchToDefaultMode();}.bind(this));},_errorHandler:function(e){B.hide();if(e==="Reload triggered"){this.sStatus=c;}else{this._switchToDefaultMode();jQuery.sap.log.error("exception occured while starting sap.ui.rta",e.stack);M.error(this.i18n.getText("MSG_STARTUP_FAILED"),{title:this.i18n.getText("ERROR_TITLE"),onClose:null});}},_onStartHandler:function(){},_loadPlugins:function(){return Promise.resolve();},_onAppClosed:function(){this._stopRta(true,true);}});return d;},true);
