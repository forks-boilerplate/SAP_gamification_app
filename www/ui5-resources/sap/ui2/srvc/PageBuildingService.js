// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ui2.srvc.PageBuildingService");jQuery.sap.require("sap.ui2.srvc.utils");jQuery.sap.require("sap.ui2.srvc.ODataService");jQuery.sap.require("sap.ui2.srvc.ODataWrapper");var r=function(){jQuery.sap.require.apply(this,arguments);};sap.ui2.srvc.testPublishAt=sap.ui2.srvc.testPublishAt||function(){};sap.ui2.srvc.PageBuildingService=function(o,d,I){var w,t=this;function e(s){return s.replace(/\'/g,"''").replace(/&/g,"%26");}function g(p,B,E){var P;if(typeof p==="string"){P=p;}else{if(p.instanceId){return"ChipInstanceBags(pageId='"+encodeURIComponent(p.pageId)+"',instanceId='"+encodeURIComponent(p.instanceId)+"',id='"+encodeURIComponent(B)+"')"+(E?"?$expand=ChipInstanceProperties":"");}P=p.id;}return"Bags(pageId='"+encodeURIComponent(P)+"',id='"+encodeURIComponent(B)+"')"+(E?"?$expand=Properties":"");}sap.ui2.srvc.testPublishAt(t);function a(E){if(E.statusCode==="201"){return E.data;}if(E.statusCode==="204"){return undefined;}return E.message||"";}sap.ui2.srvc.testPublishAt(t);function b(c,G,s,f){var R=[];function h(j){var i,k=[];for(i=0;i<j.length;i+=1){k[i]=a(j[i]);}return k;}s=s||function(){};f=f||t.getDefaultErrorHandler();w.check(s,f);c=c||[];G=G||[];if(c.length>0){R.push({__changeRequests:c});}R=R.concat(G);if(R.length===0){sap.ui2.srvc.call(s.bind(null,[],[]),f,true);return;}w.batch({__batchRequests:R},function(D){var B=D.__batchResponses,C=B[0].__changeResponses;if(B[0].response&&B[0].message){w.onError("POST",w.getBaseUrl()+"$batch",f,undefined,D.__batchResponses[0]);return;}if((C&&(C.length!==c.length))||(B.length!==R.length)){f("Number of requests differs from number of responses in $batch");return;}if(C){sap.ui2.srvc.call(s.bind(null,h(C),h(B.slice(1))),f,false);}else{sap.ui2.srvc.call(s.bind(null,[],h(B)),f,false);}},f);}this.isPersonalization=function(){return!!I;};this.readMetadata=function(s,f,n){var R=w.getBaseUrl()+"$metadata"+(n?"?"+Date.now():"");f=f||this.getDefaultErrorHandler();w.check(s,f);OData.read(R,function(D){sap.ui2.srvc.call(s.bind(null,D),f);},w.onError.bind(w,"GET",R,f,undefined),OData.metadataHandler);};this.deleteBag=function(p,B,s,f){if(!p){throw new sap.ui2.srvc.Error("Missing parent ID or object","sap.ui2.srvc.PageBuildingService");}if(!B){throw new sap.ui2.srvc.Error("Missing bag ID","sap.ui2.srvc.PageBuildingService");}w.del(g(p,B,false),s,f);};this.readBag=function(p,B,s,f){if(!p){throw new sap.ui2.srvc.Error("Missing parent ID or object","sap.ui2.srvc.PageBuildingService");}if(!B){throw new sap.ui2.srvc.Error("Missing bag ID","sap.ui2.srvc.PageBuildingService");}w.read(g(p,B,true),s,f);};this.readAllCatalogs=function(p,s,f,F,S){var c="id";if(S&&typeof S==="string"){c=S;}var u="Pages('"+encodeURIComponent(p)+"')/allCatalogs?$expand=Chips/ChipBags/ChipProperties&"+"$orderby="+c;if(F&&typeof F==="string"){u=u+"&$filter="+encodeURIComponent(F);}if(this.readAllCatalogs.cacheBusterTokens&&this.readAllCatalogs.cacheBusterTokens.get(p)){u+="&sap-cache-id="+this.readAllCatalogs.cacheBusterTokens.get(p);}w.read(u,s,f);};this.readCatalogs=function(s,f,F){var u="Catalogs?$orderby=id";if(F&&typeof F==="string"){u=u+"&$filter="+encodeURIComponent(F);}w.read(u,s,f);};this.readAllCatalogsForUser=function(f,s,F){var u=f?"?$filter="+encodeURIComponent(f):"";w.read("Pages('unused')/allCatalogs"+u,s,F);};this.getReferencingCatalogIds=function(R,s,f){if(typeof s!=="function"){s=f;f=arguments[3];}function c(h){var i=[],j=h.results||[];j.forEach(function(C){if(C.referenceChipId===R){if(i.indexOf(C.catalogId)===-1){i.push(C.catalogId);}}});s(i);}if(typeof R!=="string"){throw new sap.ui2.srvc.Error("sReferencedChipId must be a string","sap.ui2.srvc.test.PageBuildingService");}if(typeof s!=="function"){throw new sap.ui2.srvc.Error("fnSuccess is mandatory","sap.ui2.srvc.test.PageBuildingService");}w.read("Chips?$filter="+encodeURIComponent("referenceChipId eq '"+e(R)+"'"),c,function(m){new sap.ui2.srvc.Error(m,"sap.ui2.srvc.PageBuildingService");f.apply(null,arguments);});};this.createPageBasedCatalog=function(D,T,s,f){if(!D){throw new sap.ui2.srvc.Error("Missing domain ID","sap.ui2.srvc.PageBuildingService");}w.create("Catalogs",{domainId:D,title:T,type:"CATALOG_PAGE"},s,f);};this.createCatalog=function(c,s,f){w.create("Catalogs",c,s,f);};this.deleteCatalog=function(c,s,f){w.del(c,s,f);};this.cloneCatalog=function(c,n,N,s,f){if(!c){throw new sap.ui2.srvc.Error("Missing source catalog ID","sap.ui2.srvc.PageBuildingService");}if(!n){throw new sap.ui2.srvc.Error("Missing new domain ID","sap.ui2.srvc.PageBuildingService");}if(n.indexOf(":")>=0){throw new sap.ui2.srvc.Error("Illegal domain ID: "+n,"sap.ui2.srvc.PageBuildingService");}w.create("CloneCatalog?sourceId='"+encodeURIComponent(c)+"'&targetId='"+encodeURIComponent(n)+(N!==undefined?"'&title='"+encodeURIComponent(N)+"'":"'"),{},s,f);};this.clonePageChipInstance=function(s,S,T,f,F){if(!s){throw new sap.ui2.srvc.Error("Missing source page ID","sap.ui2.srvc.PageBuildingService");}if(!S){throw new sap.ui2.srvc.Error("Missing source CHIP instance ID","sap.ui2.srvc.PageBuildingService");}if(!T){throw new sap.ui2.srvc.Error("Missing target page ID","sap.ui2.srvc.PageBuildingService");}w.create("ClonePageChipInstance?sourcePageId='"+encodeURIComponent(s)+"'&sourceChipInstanceId='"+encodeURIComponent(S)+"'&targetPageId='"+encodeURIComponent(T)+"'",{},function(R){w.read("PageChipInstances(pageId='"+encodeURIComponent(R.pageId)+"',instanceId='"+encodeURIComponent(R.instanceId)+"')"+"?$expand=ChipInstanceBags/ChipInstanceProperties",f,F);},F);};this.readCatalog=function(c,s,f,n,N){var u;if(!c){throw new sap.ui2.srvc.Error("Missing catalog ID","sap.ui2.srvc.PageBuildingService");}u="Catalogs('"+encodeURIComponent(c)+"')";if(!n){u+="?$expand=Chips";if(!N){u+="/ChipBags/ChipProperties";}}w.read(u,s,f);};this.updateCatalog=function(c,s,f){w.update(c,s,f);};this.readCatalogChips=function(c,C,s,f){var u,F="",p="?$filter=";if(!c){throw new sap.ui2.srvc.Error("Missing catalog ID","sap.ui2.srvc.PageBuildingService");}u="Catalogs('"+encodeURIComponent(c)+"')/Chips";if(C){if(!C.length){throw new sap.ui2.srvc.Error("No CHIP IDs given","sap.ui2.srvc.PageBuildingService");}C.forEach(function(i){F=F+p+"id%20eq%20'"+encodeURIComponent(i)+"'";p="%20or%20";});if(w.getBaseUrl().length+u.length+F.length>2000){F="";}}w.read(u+F,s,f);};this.createPage=function(i,c,l,T,s,f){if(!i){throw new sap.ui2.srvc.Error("Missing page ID","sap.ui2.srvc.PageBuildingService");}w.create("Pages",{id:i,catalogId:c,layout:l,title:T},s,f);};this.readPages=function(s,f,n){var u="Pages?";if(!n){u+="$expand=Catalog&";}w.read(u+"$orderby=id",s,f);};this.readPage=function(i,s,f,c){var u="Pages('"+encodeURIComponent(i)+"')";if(!i){throw new sap.ui2.srvc.Error("Missing page ID","sap.ui2.srvc.PageBuildingService");}if(c===undefined){u+="?$expand=Bags/Properties,PageChipInstances/Chip/ChipBags/ChipProperties,"+"PageChipInstances/RemoteCatalog,"+"PageChipInstances/ChipInstanceBags/ChipInstanceProperties";}else if(c!==""){u+="?$expand="+c;}w.read(u,s,f);};this.readPageSet=function(i,s,f){var u;var t=this;var c;if(!i){throw new sap.ui2.srvc.Error("Missing page set ID","sap.ui2.srvc.PageBuildingService");}u="PageSets('"+encodeURIComponent(i)+"')?$expand="+"Pages/PageChipInstances/Chip/ChipBags/ChipProperties,"+"Pages/PageChipInstances/RemoteCatalog,"+"Pages/PageChipInstances/ChipInstanceBags/ChipInstanceProperties,"+"AssignedPages,"+"DefaultPage";if(this.readPageSet.cacheBusterTokens&&this.readPageSet.cacheBusterTokens.get(i)){u+="&sap-cache-id="+this.readPageSet.cacheBusterTokens.get(i);}if(this.readPageSet.appendedParameters){c=Object.keys(this.readPageSet.appendedParameters);if(c.length>0){c.sort();c.forEach(function(k){u+="&"+encodeURIComponent(k)+"="+encodeURIComponent(t.readPageSet.appendedParameters[k]);});}}w.read(u,s,f,true);};this.updatePageSet=function(p,s,f){w.update(p,s,f);};this.createPageInPageSet=function(p,P,c,s,f){if(!p){throw new sap.ui2.srvc.Error("Missing page set ID","sap.ui2.srvc.PageBuildingService");}w.create("PageSets('"+encodeURIComponent(p)+"')/Pages",{catalogId:c||"",layout:"",title:P||""},s,f);};this.updatePage=function(p,s,f){w.update(p,s,f);};this.deletePage=function(i,s,f){if(!i){throw new sap.ui2.srvc.Error("Missing page ID","sap.ui2.srvc.PageBuildingService");}w.del("Pages('"+encodeURIComponent(i)+"')",s,f);};this.createPageChipInstance=function(p,i,c,T,C,l,s,f){this.createPageChipInstanceFromRawData({pageId:p,instanceId:i,chipId:c,title:T,configuration:C,layoutData:l},s,f);};this.createPageChipInstanceFromRawData=function(c,s,f){if(typeof c!=="object"){throw new sap.ui2.srvc.Error("Invalid raw data","sap.ui2.srvc.PageBuildingService");}if(!c.pageId){throw new sap.ui2.srvc.Error("Missing page ID","sap.ui2.srvc.PageBuildingService");}if(!c.chipId){throw new sap.ui2.srvc.Error("Missing CHIP ID","sap.ui2.srvc.PageBuildingService");}c.instanceId=c.instanceId||"";c.title=c.title||"";c.configuration=c.configuration||"";c.layoutData=c.layoutData||"";w.create("PageChipInstances",c,s,f);};this.updatePageChipInstance=function(c,s,f){w.update(c,s,f);};this.deletePageChipInstance=function(p,i,s,f){if(!p){throw new sap.ui2.srvc.Error("Missing page ID","sap.ui2.srvc.PageBuildingService");}if(!i){throw new sap.ui2.srvc.Error("Missing instance ID","sap.ui2.srvc.PageBuildingService");}w.del("PageChipInstances(pageId='"+encodeURIComponent(p)+"',instanceId='"+encodeURIComponent(i)+"')",s,f);};this.updateBagProperties=function(p,B,c,n,R,s,f){var C=[],G=[],i,h,P,j,m="__metadata";function k(E){var l={"__metadata":{type:E[m].type,uri:E[m].uri}},q;for(q in E){if(Object.prototype.hasOwnProperty.call(E,q)&&q!==m&&q.indexOf('$')!==0&&typeof E[q]!=="object"){l[q]=E[q];}}return l;}if(!p){throw new sap.ui2.srvc.Error("Missing parent object","sap.ui2.srvc.PageBuildingService");}if(!B){throw new sap.ui2.srvc.Error("Missing bag ID","sap.ui2.srvc.PageBuildingService");}if(typeof R==="function"){this.updateBagProperties(p,B,c,n,[],R,s);return;}c=c||[];n=n||[];R=R||[];if(c.length===0&&n.length===0&&R.length===0){throw new sap.ui2.srvc.Error("No properties to update, create or reset","sap.ui2.srvc.PageBuildingService");}for(i=0;i<c.length;i+=1){P=c[i];j=P[m].uri;h=j.indexOf(w.getBaseUrl());if(h>=0){j=j.slice(h+w.getBaseUrl().length);}C.push({requestUri:j,method:"PUT",data:k(P)});}j=p.instanceId?"ChipInstanceProperties":"Properties";for(i=0;i<n.length;i+=1){P=n[i];if(!P.name){throw new sap.ui2.srvc.Error("Missing property name","sap.ui2.srvc.PageBuildingService");}if(p.instanceId){P.instanceId=p.instanceId;P.pageId=p.pageId;}else{P.pageId=p.id;}P.bagId=B;C.push({requestUri:j,method:"POST",data:P});}for(i=0;i<R.length;i+=1){P=R[i];j=P[m].uri;h=j.indexOf(w.getBaseUrl());if(h>=0){j=j.slice(h+w.getBaseUrl().length);}C.push({requestUri:j,method:"DELETE"});G.push({requestUri:j,method:"GET"});}b(C,G,function(l,q){var u=l.slice(n.length+c.length),i;for(i=0;i<u.length;i+=1){if(u[i]===undefined){if(typeof q[i]==="object"){u[i]=q[i];}}}if(s){s(l.slice(0,c.length),l.slice(c.length,n.length+c.length),u);}},f);};this.createProperty=function(p,B,P,v,T,s,f){var c;if(!p){throw new sap.ui2.srvc.Error("Missing parent ID or object","sap.ui2.srvc.PageBuildingService");}if(!B){throw new sap.ui2.srvc.Error("Missing bag ID","sap.ui2.srvc.PageBuildingService");}if(!P){throw new sap.ui2.srvc.Error("Missing property name","sap.ui2.srvc.PageBuildingService");}if(typeof T==="function"){this.createProperty(p,B,P,v,undefined,T,s);return;}c={bagId:B,name:P,pageId:p,translatable:T,value:v};if(typeof p!=="string"){if(p.instanceId){c.instanceId=p.instanceId;c.pageId=p.pageId;}else{c.pageId=p.id;}}w.create((c.instanceId?"ChipInstanceProperties":"Properties"),c,s,f);};this.updateProperty=function(p,s,f){w.update(p,s,f);};this.deleteProperty=function(p,s,f){w.del(p,s,f);};this.readChip=function(c,s,f){if(!c){throw new sap.ui2.srvc.Error("Missing CHIP ID","sap.ui2.srvc.PageBuildingService");}w.read("Chips('"+encodeURIComponent(c)+"')"+"?$expand=ChipBags/ChipProperties",s,f);};if(!sap.ui2.srvc.Error){r("sap.ui2.srvc.error");}if(typeof o==="string"){w=new sap.ui2.srvc.ODataWrapper(o,this,true);}else{w=o;}this.readAllCatalogs.cacheBusterTokens=new sap.ui2.srvc.Map();this.readPageSet.cacheBusterTokens=new sap.ui2.srvc.Map();if(!w.isStickySessionEnabled()&&!I){w.enableStickySession();}sap.ui2.srvc.ODataService.call(this,w,d);};if(!sap.ui2.srvc.createPageBuildingService){sap.ui2.srvc.createPageBuildingService=function(b,d,i){return new sap.ui2.srvc.PageBuildingService(b,d,i);};}}());
