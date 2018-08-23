// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";var e={};var _=function(E){var i=true;if(E){if(typeof E!=="object"){i=false;}else{Object.keys(E).forEach(function(k){if(["GUI","WDA","WCF"].indexOf(k)===-1){i=false;}else if(typeof E[k]!=="boolean"){i=false;}});}}if(!i){jQuery.sap.log.error("Invalid parameter: 'enableInPlaceForClassicUIs' must be an object; allowed properties: GUI|WDA, type boolean","Actual parameter: "+JSON.stringify(E),"sap.ushell.services.navigationMode");}};e._isLegacyApplicationType=function(A){switch(A){case"WDA":case"TR":case"NWBC":case"WCF":return true;default:return false;}};var a=function(A){switch(A){case"TR":return"GUI";case"WDA":return"WDA";case"WCF":return"WCF";default:return undefined;}};var b=function(E,A){if(jQuery.isPlainObject(E)){return E[a(A)];}return false;};e.compute=function(n,E,s,A,o){var i,l,c=["inplace","explace"];_(o);var N={};if(c.indexOf(E)>=0){N["sap-ushell-next-navmode"]=E;}if(c.indexOf(s)>=0){i=e._getInternalNavigationMode(s,n);jQuery.sap.log.debug("Navigation mode was forced to "+i,"because sap-ushell-navmode parameter was set to "+s+" for target with applicationType: "+A,"sap.ushell.navigationMode");N.navigationMode=i;N.explicitNavMode=true;return N;}l=e._isLegacyApplicationType(A)&&e._isLegacyApplicationType(n);if(b(o,n)===true&&!l){N.navigationMode="embedded";}return N;};e._getInternalNavigationMode=function(E,A){var i={SAPUI5:{inplace:"embedded",explace:"newWindowThenEmbedded"},WDA:{inplace:"embedded",explace:"newWindowThenEmbedded"},TR:{inplace:"embedded",explace:"newWindowThenEmbedded"},URL:{inplace:"replace",explace:"newWindow"}};if(!i.hasOwnProperty(A)){jQuery.sap.log.error(A+" is not a valid application type","expected one of "+Object.keys(i).join(", "),"sap.ushell.navigationMode");return null;}if(E!=="inplace"&&E!=="explace"){jQuery.sap.log.error(E+" is not a valid external navigation mode","expected one of 'inplace', 'explace'","sap.ushell.navigationMode");return null;}return i[A][E];};e.getExternalNavigationMode=function(i){var E={embedded:"inplace",newWindowThenEmbedded:"explace",replace:"inplace",newWindow:"explace"};if(!E.hasOwnProperty(i)){jQuery.sap.log.error(i+" is not a recognized internal navigation mode","expected one of "+Object.keys(E).join(","),"sap.ushell.navigationMode");return null;}return E[i];};var w=["NWBC","WDA","TR","WCF"];e.getNavigationMode=function(r,c){var A=r.additionalInformation,s=r.applicationType,u,U;if(w.indexOf((c||{}).applicationType)>-1&&!(c||{}).explicitNavMode){return'newWindowThenEmbedded';}if((A===null||typeof A==="string"||typeof A==="undefined")&&(s==="URL"||s==="SAPUI5")){if(A&&A.indexOf("managed=")===0){if(A==="managed=FioriWave1"){return"embedded";}if(A==="managed="){return"newWindow";}return undefined;}if(A&&A.indexOf("SAPUI5.Component=")===0){u="[a-zA-Z0-9_]+";U=["^SAPUI5.Component=",u,"([.]",u,")*$"].join("");if(!(new RegExp(U)).test(A)){jQuery.sap.log.warning(["The UI5 component name in",A,"is not valid.","Please use names satisfying",U].join(" "));}return"embedded";}return"newWindow";}if(w.indexOf(s)>-1){return"newWindowThenEmbedded";}return undefined;};e.computeNavigationModeForHomepageTiles=function(A,s,i){var r={applicationType:A,additionalInformation:s};if(w.indexOf(A)>-1&&i){return"embedded";}return this.getNavigationMode(r);};return e;},true);
