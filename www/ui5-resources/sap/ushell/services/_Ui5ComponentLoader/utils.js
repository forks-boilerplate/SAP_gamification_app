// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define([],function(){function c(C,o){var D=new jQuery.Deferred();C.componentData=o;C.async=true;sap.ui.component(C).then(function(f){D.resolve(f);},function(E){D.reject(E);});return D.promise();}function s(S){var A=(S&&S.hasOwnProperty("amendedLoading"))?S.amendedLoading:true;return A;}function a(A){var L=true;if(A.hasOwnProperty("loadCoreExt")){L=A.loadCoreExt;}return L;}function b(A,S,f){var L=true;if(A.hasOwnProperty("loadDefaultDependencies")){L=A.loadDefaultDependencies;}if(S&&S.hasOwnProperty("loadDefaultDependencies")){L=L&&S.loadDefaultDependencies;}L=L&&f;return L;}function d(p){var S=p.semanticObject||null;var A=p.action||null;if(!S||!A){return null;}return"application-"+S+"-"+A+"-component";}function u(U){return U&&U.indexOf("?")>=0;}function r(U){if(!U){return U;}var I=U.indexOf("?");if(I>=0){return U.slice(0,I);}return U;}function i(){return jQuery.sap.isDeclared('sap.fiori.core',true)||jQuery.sap.isDeclared('sap.fiori.core-ext-light',true);}function l(A,E,f,h,C){var j="The issue is most likely caused by application "+A,k="Failed to load UI5 component with properties: '"+C+"'.";if(h){k+=" Error likely caused by:\n"+h}else{k+=" Error: '"+E+"'";}if(f==="parsererror"){j+=", as one or more of its resources could not be parsed"}j+=". Please create a support incident and assign it to the support component of the respective application.";jQuery.sap.log.error(j,k,A);}function g(U){var p=jQuery.sap.getUriParameters(U).mParams,x=p["sap-xapp-state"],R;delete p["sap-xapp-state"];R={startupParameters:p};if(x){R["sap-xapp-state"]=x;}return R;}function e(A,m){if(!jQuery.isArray(m)){return;}m.forEach(function(M){var S=String.prototype.toLowerCase.call(M.severity||"");S=["trace","debug","info","warning","error","fatal"].indexOf(S)!==-1?S:"error";jQuery.sap.log[S](M.text,M.details,A);});}return{constructAppComponentId:d,getParameterMap:g,isCoreExtAlreadyLoaded:i,logAnyApplicationDependenciesMessages:e,logInstantiateComponentError:l,shouldLoadCoreExt:a,shouldLoadDefaultDependencies:b,shouldUseAmendedLoading:s,urlHasParameters:u,removeParametersFromUrl:r,createUi5Component:c};},false);
