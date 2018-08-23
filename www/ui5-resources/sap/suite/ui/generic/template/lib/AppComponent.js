/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/UIComponent","sap/m/NavContainer","sap/f/FlexibleColumnLayout","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/ui/model/resource/ResourceModel","sap/ui/generic/app/ApplicationController","sap/suite/ui/generic/template/lib/Application","sap/suite/ui/generic/template/lib/BusyHelper","sap/suite/ui/generic/template/lib/NavigationController","sap/suite/ui/generic/template/lib/ProcessObserver","sap/suite/ui/generic/template/lib/TemplateAssembler","sap/suite/ui/generic/template/lib/CRUDHelper","sap/suite/ui/generic/template/lib/ViewDependencyHelper","sap/suite/ui/generic/template/lib/testableHelper","sap/suite/ui/generic/template/support/lib/CommonMethods","sap/suite/ui/generic/template/library"],function(q,U,N,F,a,b,J,R,A,c,B,d,P,T,C,V,t,e){"use strict";A=t.observableConstructor(A);var D=sap.m.DraftIndicatorState;var r=T.getRegisterAppComponent();var o;function g(){o=o||new R({bundleName:"sap/suite/ui/generic/template/lib/i18n/i18n"}).getResourceBundle();return o.getText.apply(o,arguments);}function f(){return new P({processObservers:[]});}var m=sap.ui.getCore().getMessageManager().getMessageModel();var v=new a({path:"validation",operator:b.EQ,value1:true});function h(j,k){var l={oAppComponent:j,componentRegistry:Object.create(null),aRunningSideEffectExecutions:[],getText:g,mRouteToTemplateComponentPromise:Object.create(null),oTemplatePrivateGlobalModel:(new J()).setDefaultBindingMode("TwoWay"),aStateChangers:[],oPaginatorInfo:Object.create(null),oStatePreserversAvailablePromise:Promise.resolve(),oValidationMessageBinding:m.bindList("/",null,null,v)};l.oValidationMessageBinding.attachChange(q.noop);var n;var p;var s;function u(){var i=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService("URLParsing");l.oTemplatePrivateGlobalModel.setProperty("/generic",{crossAppNavSupport:!!i&&i.isIntentUrl(document.URL),draftIndicatorState:D.Clear,shellServiceUnavailable:false,forceFullscreenCreate:false});j.setModel(l.oTemplatePrivateGlobalModel,"_templPrivGlobal");l.oShellServicePromise.catch(function(){l.oTemplatePrivateGlobalModel.setProperty("/generic/shellServiceUnavailable",true);});}function w(){l.fnAddSideEffectPromise=function(Z){var i=0;for(;l.aRunningSideEffectExecutions[i];){i++;}l.aRunningSideEffectExecutions[i]=Z;var $=function(){l.aRunningSideEffectExecutions[i]=null;};Z.then($,$);};n.attachEvent("beforeSideEffectExecution",function(i){if(i.getParameter("valueChange")||i.getParameter("fieldControl")){var Z=i.getParameter("promise");l.oBusyHelper.setBusy(Z);l.fnAddSideEffectPromise(Z);}});var X=j.getModel("_templPrivGlobal");var Y="/generic/draftIndicatorState";n.attachBeforeQueueItemProcess(function(i){if(i.draftSave){X.setProperty(Y,D.Saving);}});n.attachOnQueueCompleted(function(){if(X.getProperty(Y)===D.Saving){X.setProperty(Y,D.Saved);}});n.attachOnQueueFailed(function(){if(X.getProperty(Y)===D.Saving){X.setProperty(Y,D.Clear);}});X.setProperty("/generic/appComponentName",j.getMetadata().getComponentName());}function x(){var i={appComponent:j,oTemplateContract:l,application:new c(l),oViewDependencyHelper:new V(l)};l.oViewDependencyHelper=i.oViewDependencyHelper;l.oShellServicePromise=j.getService("ShellUIService").catch(function(){var Y=sap.ui.core.service.ServiceFactoryRegistry.get("sap.ushell.ui5service.ShellUIService");return((Y&&Y.createInstance())||Promise.reject());});l.oShellServicePromise.catch(function(){q.sap.log.warning("No ShellService available");});(U.prototype.init||q.noop).apply(j,arguments);l.oBusyHelper.setBusy(l.oShellServicePromise);s=r(i);var X=j.getModel();n=new A(X);u();p=new d(l);w();C.enableAutomaticDraftSaving(l);if((!X.oMetadata||!X.oMetadata.isLoaded())||X.oMetadata.isFailed()){X.attachMetadataFailed(function(){p.navigateToMessagePage({title:g("ST_GENERIC_ERROR_TITLE"),text:g("ST_GENERIC_ERROR_SYSTEM_UNAVAILABLE"),icon:"sap-icon://message-error",description:g("ST_GENERIC_ERROR_SYSTEM_UNAVAILABLE_DESC")});for(var Y in l.componentRegistry){l.componentRegistry[Y].fnViewRegisteredResolve(true);}});}if(j&&j.getMetadata()&&j.getMetadata().getManifest()){e.setAppComponent(j);}e.setApplicationStatus(e.mApplicationStatus.LOADING);e.publishEvent("elements","ViewRenderingStarted",{});l.oBusyHelper.setBusyReason("initAppComponent",false);}function y(){if(l.oNavigationHost){return"";}if(l.sRoutingType==="f"){var i=new F();l.oNavigationHost=i;l.aNavigationObservers=[new P({processName:"BeginColumnNavigation",eventHandlers:{attachProcessStart:i.attachBeginColumnNavigate.bind(i),attachProcessStop:i.attachAfterBeginColumnNavigate.bind(i)}}),new P({processName:"MidColumnNavigation",eventHandlers:{attachProcessStart:i.attachMidColumnNavigate.bind(i),attachProcessStop:i.attachAfterMidColumnNavigate.bind(i)}}),new P({processName:"EndColumnNavigation",eventHandlers:{attachProcessStart:i.attachEndColumnNavigate.bind(i),attachProcessStop:i.attachAfterEndColumnNavigate.bind(i)}})];l.oNavigationObserver=new P({processObservers:l.aNavigationObservers});l.aHeaderLoadingObservers=[f(),f(),f()];}else{var X=new N({id:j.getId()+"-appContent"});l.oNavigationHost=X;l.oNavigationObserver=new P({processName:"Navigation",eventHandlers:{attachProcessStart:X.attachNavigate.bind(X),attachProcessStop:X.attachAfterNavigate.bind(X)}});}l.oHeaderLoadingObserver=new P({processObservers:l.aHeaderLoadingObservers||[]});l.oPagesDataLoadedObserver=new P({processObservers:[l.oHeaderLoadingObserver,l.oNavigationObserver]});l.oNavigationHost.addStyleClass(l.oApplicationProxy.getContentDensityClass());l.oBusyHelper=new B(l);l.oBusyHelper.setBusyReason("initAppComponent",true,true);return l.oNavigationHost;}function z(){if(l.oNavigationHost){l.oNavigationHost.destroy();}if(n){n.destroy();}if(p){p.destroy();}if(l.oValidationMessageBinding){l.oValidationMessageBinding.destroy();}(U.prototype.exit||q.noop).apply(j,arguments);s();t.endApp(k);}function E(i){var X=Object.keys(i).map(function(Y){var Z=i[Y];if(Z.pages){Z.pages=E(Z.pages);}return i[Y];});return X;}function G(X){if(!X){return;}for(var i=0;i<X.length;i++){var Y=X[i];if(Y.routingSpec&&Y.routingSpec.noOData){Y.entitySet=Y.routingSpec.routeName;Y.navigationProperty=Y.routingSpec.routeName;}G(Y.pages);if(Y.embeddedComponents){for(var Z in Y.embeddedComponents){var $=Y.embeddedComponents[Z];G($.pages);}}G(Y.implementingComponent&&Y.implementingComponent.pages);}}var H;function I(){if(!H){var i=j.getMetadata();H=i.getManifestEntry("sap.ui.generic.app");if(H._version==="1.3.0"&&H.pages&&q.isPlainObject(H.pages)){H.pages=E(H.pages);}G(H.pages);}return H;}var K;function L(){if(!K){K=q.extend({},j.getMetadata().getManifest());K["sap.ui.generic.app"]=I();}return K;}function M(){var i=j.getManifestObject();var X=i.getEntry("sap.ui.generic.app").settings;l.sRoutingType=(X&&X.flexibleColumnLayout)?"f":"m";return"sap."+l.sRoutingType+".routing.Router";}var O=Promise.resolve();function Q(){var i=new Promise(function(X){O.then(function(){var Y=[];l.oNavigationControllerProxy.getActiveComponents().forEach(function(Z){var $=l.componentRegistry[Z];var _=$.oComponent.getComponentContainer();var a1=_.getParent();if(a1.getMetadata().getName()!=="sap.m.NavContainer"){throw new Error("Recreation only possible for sap.m.NavContainer");}var b1=l.oNavigationControllerProxy.createComponentInstance(l,$.routeConfig,l.oNavigationControllerProxy.mRouteToComponentResolve[$.route]);Y.push(b1.loaded().then(function(b1){a1.removePage(_);a1.addPage(b1);a1.to(b1);_.destroy();var c1=b1.getComponentInstance();l.componentRegistry[c1.sId].activationTakt=$.activationTakt;l.mRouteToTemplateComponentPromise[$.route]=Promise.resolve(c1);return l.componentRegistry[c1.sId].oViewRenderedPromise;}));});X(Promise.all(Y));});});O=i.then(q.noop);return O;}var S={init:x,createContent:y,exit:z,_getRouterClassName:M,getConfig:I,getInternalManifest:L,getTransactionController:function(){return n.getTransactionController();},getApplicationController:function(){return n;},getNavigationController:function(){return p;}};var W={retemplateActiveComponents:Q};if(sap.ui.getCore().getConfiguration().getDesignMode()){q.extend(S,W);}return S;}return U.extend("sap.suite.ui.generic.template.lib.AppComponent",{metadata:{config:{title:"SAP UI Application Component",fullWidth:true},properties:{forceGlobalRefresh:{type:"boolean",defaultValue:true},"considerAnalyticalParameters":{"type":"boolean","defaultValue":"false"}},events:{pageDataLoaded:{}},routing:{config:{async:true,viewType:"XML",viewPath:"",clearTarget:false},routes:[],targets:[]},library:"sap.suite.ui.generic.template"},constructor:function(){var i=t.startApp();q.extend(this,h(this,i));(U.prototype.constructor||q.noop).apply(this,arguments);}});});