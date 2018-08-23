/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/Context','sap/ui/model/ContextBinding','sap/ui/model/ChangeReason'],function(q,C,a,b){"use strict";var O=a.extend("sap.ui.model.odata.v2.ODataContextBinding",{constructor:function(m,p,c,P,e){a.call(this,m,p,c,P,e);this.bRefreshGroupId=undefined;this.bPendingRequest=false;this.mParameters=q.extend(true,{},this.mParameters);this.bCreatePreliminaryContext=this.mParameters.createPreliminaryContext||m.bPreliminaryContext;this.bUsePreliminaryContext=this.mParameters.usePreliminaryContext||m.bPreliminaryContext;this.mParameters.createPreliminaryContext=this.bCreatePreliminaryContext;this.mParameters.usePreliminaryContext=this.bUsePreliminaryContext;this.bPendingRequest=false;}});O.prototype.initialize=function(){var t=this,r,c=this.isRelative()&&this.oContext&&this.oContext.bCreated,p=this.oContext&&this.oContext.isPreliminary(),R;if(!this.oModel.oMetadata.isLoaded()||!this.bInitial){return;}this.bInitial=false;if(p&&!this.bUsePreliminaryContext){return;}r=this.oModel.resolve(this.sPath,this.oContext);if(!r||c){this.oElementContext=null;this._fireChange({reason:b.Context});return;}R=this.oModel._isReloadNeeded(r,this.mParameters);if(R){this.fireDataRequested();this.bPendingRequest=true;}var o=this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(o){var d;if(t.bCreatePreliminaryContext&&o&&t.oElementContext&&t.oElementContext.isPreliminary()){t.oElementContext.setPreliminary(false);t.oModel._updateContext(t.oElementContext,o.getPath());t._fireChange({reason:b.Context},false,true);}else if(!o||o!==t.oElementContext){t.oElementContext=o;t._fireChange({reason:b.Context});}if(R){if(t.oElementContext){d=t.oElementContext.getObject(t.mParameters);}t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:d});});t.bPendingRequest=false;}},R);if(o&&this.bCreatePreliminaryContext){if(this.oElementContext!==o){o.setPreliminary(true);this.oElementContext=o;this.oModel.oMetadata.loaded().then(function(){this._fireChange({reason:b.Context});}.bind(this));}}};O.prototype.checkUpdate=function(f){var c,p=this.oContext&&this.oContext.isPreliminary();if(this.bInitial||this.bPendingRequest){return;}if(p&&!this.bUsePreliminaryContext){return;}if(!this._mParameters&&this.mParameters.createPreliminaryContext){this._mParameters=q.extend({},this.mParameters);delete this._mParameters.usePreliminaryContext;delete this._mParameters.createPreliminaryContext;}c=this.oModel.createBindingContext(this.sPath,this.oContext,this._mParameters);if(c&&c!==this.oElementContext){this.oElementContext=c;this._fireChange({reason:b.Context});}};O.prototype.refresh=function(f,g){if(typeof f==="string"){g=f;f=false;}this.sRefreshGroup=g;this._refresh(f);this.sRefreshGroup=undefined;};O.prototype._refresh=function(f,c){var t=this,d,k,s,e=false,p=this.mParameters,g=this.isRelative()&&this.oContext&&this.oContext.bCreated,r=this.oModel.resolve(this.sPath,this.oContext),h;if(this.bInitial||g){return;}if(c){s=this.oModel._getObject(this.sPath,this.oContext);if(s){k=this.oModel._getKey(s);if(k in c){e=true;}}}else{e=true;}if(f||e){if(r){this.fireDataRequested();this.bPendingRequest=true;}if(this.sRefreshGroup){p=q.extend({},this.mParameters);p.groupId=this.sRefreshGroup;}var o=this.oModel.createBindingContext(this.sPath,this.oContext,p,function(o){if(t.bCreatePreliminaryContext&&o&&t.oElementContext&&t.oElementContext.isPreliminary()){t.oElementContext.setPreliminary(false);t.oModel._updateContext(t.oElementContext,o.getPath());t._fireChange({reason:b.Context},false,true);}else if(t.oElementContext!==o||f){t.oElementContext=o;t._fireChange({reason:b.Context},f);}if(t.oElementContext){d=t.oElementContext.getObject(t.mParameters);}if(r){t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:d});});t.bPendingRequest=false;}},true);if(o&&this.bCreatePreliminaryContext){if(this.oElementContext!==o||f){o.setPreliminary(true);this.oElementContext=o;h=this.oElementContext.sPath;this.oModel._updateContext(this.oElementContext,r);this._fireChange({reason:b.Context},f);this.oModel._updateContext(this.oElementContext,h);}}}};O.prototype.setContext=function(c){var t=this,d,r,d,e=c&&c.bCreated,p=c&&c.isPreliminary(),f=c&&c.isRefreshForced(),u=c&&c.isUpdated(),s,R;if(this.bInitial||!this.isRelative()){return;}if(p&&!this.bUsePreliminaryContext){return;}if(u&&this.bUsePreliminaryContext){this._fireChange({reason:b.Context});return;}if(C.hasChanged(this.oContext,c)){this.oContext=c;r=this.oModel.resolve(this.sPath,this.oContext);if(!r||e){if(this.oElementContext!==null){this.oElementContext=null;this._fireChange({reason:b.Context});}return;}d=this.oModel._getObject(this.sPath,this.oContext);R=f||this.oModel._isReloadNeeded(r,this.mParameters);if(r&&R){this.fireDataRequested();this.bPendingRequest=true;}var c=this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(c){if(t.bCreatePreliminaryContext&&c&&t.oElementContext&&t.oElementContext.isPreliminary()){t.oElementContext.setPreliminary(false);t.oModel._updateContext(t.oElementContext,c.getPath());t._fireChange({reason:b.Context},false,true);}else if(t.oElementContext!==c||f){t.oElementContext=c;t._fireChange({reason:b.Context},f);}if(r&&R){if(t.oElementContext){d=t.oElementContext.getObject(t.mParameters);}t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:d});});t.bPendingRequest=false;}},R);if(c&&this.bCreatePreliminaryContext){c.setPreliminary(true);this.oElementContext=c;s=this.oElementContext.sPath;this.oModel._updateContext(this.oElementContext,r);this._fireChange({reason:b.Context},f);this.oModel._updateContext(this.oElementContext,s);}}};O.prototype._fireChange=function(p,f,u){if(this.oElementContext){this.oElementContext.setForceRefresh(f);this.oElementContext.setUpdated(u);}a.prototype._fireChange.call(this,p);if(this.oElementContext){this.oElementContext.setForceRefresh(false);this.oElementContext.setUpdated(false);}};return O;});
