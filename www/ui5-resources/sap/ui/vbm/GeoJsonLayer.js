/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(['sap/ui/core/theming/Parameters','sap/ui/core/Element','./library'],function(P,E,l){"use strict";var G=E.extend("sap.ui.vbm.GeoJsonLayer",{metadata:{library:"sap.ui.vbm",properties:{srcURL:{type:"string",defaultValue:null},data:{type:"object",defaultValue:null},defaultLineWidth:{type:"int",group:"Appearance",defaultValue:5},defaultFillColor:{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:"rgba(186, 193, 196, 0.5)"},defaultBorderColor:{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:"rgba(255, 255, 255, 1.0)"}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.vbm.Feature",multiple:true,singularName:"item"}},events:{click:{parameters:{featureId:{type:"string"}}},contextMenu:{parameters:{featureId:{type:"string"}}}}}});G.prototype.init=function(){this.mbGeoJSONDirty=true;this.mbSrcLoadPending=false;this._aGeoJsonObjects=[];};G.prototype.setSrcURL=function(s){this.mbGeoJSONDirty=true;return this.setProperty("srcURL",s);};G.prototype.setData=function(d){this.mbGeoJSONDirty=true;this._aGeoJsonObjects=d;return this.setProperty("data",d);};G.prototype.addData=function(d){this.mbGeoJSONDirty=true;if(jQuery.type(d)==="array"){this._aGeoJsonObjects=this._aGeoJsonObjects.concat(d);}else{this._aGeoJsonObjects.push(d);}this.setProperty("data",this._aGeoJsonObjects);this.getParent().invalidate(this);};G.prototype._createFeatures=function(d){var a=this.getDefaultFillColor();var b=this.getDefaultBorderColor();var g=this._aGeoJsonObjects;if(d){g.push(d);}this.mFeatureColl=[];this.mFeatureBBox={};this.mNames={};this.mFeatureProps={};for(var n=0;n<g.length;++n){var e=g[n];switch(e.type){case"FeatureCollection":for(var c=0,f;c<e.features.length;++c){f=e.features[c];this._processType(f.id,f.geometry.type,f.geometry.coordinates,f.properties,a,b);}break;case"Feature":this._processType(e.id,e.geometry.type,e.geometry.coordinates,e.properties,a,b);break;case"GeometryCollection":for(var h=0,o;h<e.geometries.length;++h){o=e.geometries[h];this._processType(null,o.type,o.coordinates,null,a,b);}break;case"Polygon":case"MultiPolygon":case"LineString":case"MultiLineString":case"Point":case"MultiPoint":this._processType(null,e.type,e.coordinates,null,a,b);break;default:jQuery.sap.log.error("GeoJsonLayer: Unsupported GeoJSON object type "+g[n].type);continue;}}this.mbGeoJSONDirty=false;};G.prototype._processType=function(i,t,c,p,f,b){var x,y,m=Number.MAX_VALUE,a=-Number.MAX_VALUE,d=Number.MAX_VALUE,e=-Number.MAX_VALUE;var g='',h;var C;var j;var n,k;var o=[];var q=[];var B=[];g=(p&&p.name)?p.name:"";this.mFeatureProps[i]=p;switch(t){case"Polygon":for(n=0;n<c.length;++n){j=c[n];C=[];for(k=0;k<j.length;++k){h=j[k];if(!n){if((x=h[0])<m){m=x;}if(x>a){a=x;}if((y=h[1])<d){d=y;}if(y>e){e=y;}}C.push(h[0],h[1],"0");}q.push(C);}o.push(q);B.push([m,a,d,e]);break;case"MultiPolygon":for(var r=0,s,u=c.length;r<u;++r){q=[];s=c[r].length;for(n=0;n<s;++n){j=c[r][n];C=[];for(k=0;k<j.length;++k){h=j[k];if(!n){if((x=h[0])<m){m=x;}if(x>a){a=x;}if((y=h[1])<d){d=y;}if(y>e){e=y;}}C.push(h[0],h[1],"0");}q.push(C);}o.push(q);B.push([m,a,d,e]);}break;case"LineString":C=[];for(n=0;n<c.length;++n){h=c[n];if((x=h[0])<m){m=x;}if(x>a){a=x;}if((y=h[1])<d){d=y;}if(y>e){e=y;}C.push(h[0],h[1],0);}q.push(C);o.push(q);B.push([m,a,d,e]);break;case"Point":d=e=c[1];m=a=c[0];C=[c[0],c[1],0];q.push(C);o.push(q);B.push([m,a,d,e]);break;default:jQuery.sap.log.error("GeoJsonLayer: Unsupported geometry type "+t);return;}this.mFeatureColl.push(this._createDataElement(i,o,t,f,b,g,i));this.mFeatureBBox[i]=window.VBI.MathLib.GetSurroundingBox(B);};G.prototype._createDataElement=function(i,a,t,c,b,d,e){var f={K:i,P:[],TT:d,C:c,CB:b,type:t};f["VB:s"]=false;var n,g,h;var s,j,k,m,o;switch(t){case"Polygon":case"MultiPolygon":var p,q;o=a.length;for(h=0;h<o;++h){p=a[h];q=[];m=p.length;for(g=0;g<m;++g){s="";k=p[g].length;for(n=0;n<k;++n){if(n){(s+=";");}s+=p[g][n];}q.push(s);}f.P.push(q);}break;case"LineString":s="";j=a[0][0];k=j.length;for(n=0;n<k;++n){if(n){(s+=";");}s+=j[n];}f.P=s;break;case"Point":s="";j=a[0][0];k=j.length;for(n=0;n<k;++n){if(n){(s+=";");}s+=j[n];}f.P=s;break;}return f;};G.prototype._triggerFeatureCreation=function(){var p=null;if((p=this.getSrcURL())){if(!this.mbSrcLoadPending){this.mbSrcLoadPending=true;jQuery.getJSON(p,function(d){this._createFeatures(d);this.mbSrcLoadPending=false;var o;if((o=this.getParent())){o.invalidate();}}.bind(this)).fail(function(){jQuery.sap.log.error("GeoJsonLayer: The path or the GeoJSON file at location "+p+" is invalid.");});}}else{this._createFeatures(null);}};G.prototype.getTemplateObjects=function(){var t,r=[];t={id:this.getId()+"_Polys",type:"{00100000-2012-0004-B001-F311DE491C77}",hotDeltaColor:"RHLSA(0;1;1;1.5)",altBorderDeltaColor:(P)?P.get("sapUiChartDataPointBorderHoverSelectedColor"):"#666"};t.datasource=t.id;t['posarraymulti.bind']=t.id+".P";t['color.bind']=t.id+".C";t['colorBorder.bind']=t.id+".CB";t['tooltip.bind']=t.id+".TT";r.push(t);t={id:this.getId()+"_Lines",type:"{00100000-2012-0004-B001-C46BD7336A1A}",hotDeltaColor:"RHLSA(0;1;1;1.5)",altBorderDeltaColor:(P)?P.get("sapUiChartDataPointBorderHoverSelectedColor"):"#666"};t.datasource=t.id;t['posarray.bind']=t.id+".P";t['color.bind']=t.id+".C";t['colorBorder.bind']=t.id+".CB";t['tooltip.bind']=t.id+".TT";r.push(t);t={id:this.getId()+"_Points",type:"{00100000-2012-0004-B001-64592B8DB964}",hotDeltaColor:"RHLSA(0;1;2;1)"};t.datasource=t.id;t['pos.bind']=t.id+".P";t['tooltip.bind']=t.id+".TT";r.push(t);return r;};G.prototype.getTypeObjects=function(){var t={},r=[];var T={key:"K",minSel:"0",maxSel:"0",A:[{"name":"K","alias":"K","type":"string"},{"name":"C","alias":"C","type":"color"},{"name":"CB","alias":"CB","type":"string"},{"name":"TT","alias":"TT","type":"string"}]};jQuery.extend(true,t,T);t.name=this.getId()+"_Polys";t.A.push({"name":"P","alias":"P","type":"vectorarraymulti"});r.push(t);t={};jQuery.extend(true,t,T);t.name=this.getId()+"_Lines";t.A.push({"name":"P","alias":"P","type":"vectorarray"});r.push(t);t={};jQuery.extend(true,t,T);t.name=this.getId()+"_Points";t.A.push({"name":"P","alias":"P","type":"vector"});r.push(t);return r;};G.prototype.getDataObjects=function(){if(this.mbGeoJSONDirty){this._triggerFeatureCreation();}var e=[],p=[],L=[],a=[];jQuery.extend(true,e,this.mFeatureColl);var o={};if(e.length){var O=this.getItems();for(var n=0,b=O?O.length:0,i;n<b;++n){i=O[n];o[i.getFeatureId()]=i;}}for(var c=0,d,f,t;c<e.length;++c){d=e[c];if((f=o[d.K])){d.C=f.getColor();if((t=f.getTooltip())){d.TT=t;}}switch(d.type){case"Polygon":case"MultiPolygon":p.push(d);break;case"LineString":case"MultiLineString":L.push(d);break;case"Point":case"MultiPoint":a.push(d);break;default:jQuery.sap.log.error("GeoJsonLayer: Unknown object type: "+d.type);}}return[{"name":this.getId()+"_Polys","type":"N","E":p},{"name":this.getId()+"_Lines","type":"N","E":L},{"name":this.getId()+"_Points","type":"N","E":a}];};G.prototype.getDataRemoveObjects=function(){return[{"name":this.getId()+"_Polys","type":"N"},{"name":this.getId()+"_Lines","type":"N"},{"name":this.getId()+"_Points","type":"N"}];};G.prototype.getActionArray=function(){var a=[];var i=this.getId();if(this.mEventRegistry["click"]||this.isEventRegistered("click")){a.push({"id":i+"Polys1","name":"click","refScene":"MainScene","refVO":i+"_Polys","refEvent":"Click","AddActionProperty":[{"name":"pos"}]});a.push({"id":i+"Lines1","name":"click","refScene":"MainScene","refVO":i+"_Lines","refEvent":"Click","AddActionProperty":[{"name":"pos"}]});a.push({"id":i+"Points1","name":"click","refScene":"MainScene","refVO":i+"_Points","refEvent":"Click","AddActionProperty":[{"name":"pos"}]});}if(this.mEventRegistry["contextMenu"]||this.isEventRegistered("contextMenu")){a.push({"id":i+"_Polys2","name":"contextMenu","refScene":"MainScene","refVO":i+"_Polys","refEvent":"ContextMenu"});a.push({"id":i+"_Lines2","name":"contextMenu","refScene":"MainScene","refVO":i+"_Lines","refEvent":"ContextMenu"});a.push({"id":i+"_Points2","name":"contextMenu","refScene":"MainScene","refVO":i+"_Points","refEvent":"ContextMenu"});}return a;};G.prototype.getFeaturesInfo=function(f){var r=[];for(var n=0,a=f.length,b;n<a;++n){b=f[n];r[b]={};r[b].BBox=this.mFeatureBBox[b];r[b].Midpoint=[(this.mFeatureBBox[b][0]+this.mFeatureBBox[b][1])/2,(this.mFeatureBBox[b][2]+this.mFeatureBBox[b][3])/2];r[b].Name=this.mNames[b];r[b].Properties=this.mFeatureProps[b];}return r;};G.prototype.handleEvent=function(e){var s=e.Action.name;var f="fire"+s[0].toUpperCase()+s.slice(1);var o,i=e.Action.instance;if((o=this.findInstance(i))){if(o.mEventRegistry[s]){if(s==="click"){o.mClickGeoPos=e.Action.AddActionProperties.AddActionProperty[0]['#'];}if(s==="contextMenu"){o.mClickPos=[e.Action.Params.Param[0]['#'],e.Action.Params.Param[1]['#']];sap.ui.getCore().loadLibrary("sap.ui.unified");if(this.oParent.mVBIContext.m_Menus){this.oParent.mVBIContext.m_Menus.deleteMenu("DynContextMenu");}var m=new sap.ui.unified.Menu();m.vbi_data={};m.vbi_data.menuRef="CTM";m.vbi_data.VBIName="DynContextMenu";o.fireContextMenu({menu:m});}else if(s==="handleMoved"){o[f]({data:e});}else{o[f]({});}}}if(this.mEventRegistry[s]){this[f]({featureId:i.split(".")[1]});}};G.prototype.openDetailWindow=function(f,p){var o=this.getParent();o.mDTWindowCxt.bUseClickPos=true;o.mDTWindowCxt.open=true;o.mDTWindowCxt.src=f;o.mDTWindowCxt.key=f.getFeatureId();o.mDTWindowCxt.params=p;o.m_bWindowsDirty=true;o.invalidate(this);};G.prototype.openContextMenu=function(f,m){this.oParent.openContextMenu("Area",f,m);};G.prototype.handleChangedData=function(e){if(e&&e.length){for(var n=0,o,i;n<e.length;++n){o=e[n];i=(o.K)?this.findInstance(o.K):null;if(i){i.handleChangedData(o);}}}};G.prototype.isEventRegistered=function(n){var o=this.getItems();if(!o){return false;}for(var a=0,b=o.length;a<b;++a){if(o[a].mEventRegistry[n]){return true;}}return false;};G.prototype.findInstance=function(n){var o=this.getItems();if(!o){return null;}switch(jQuery.type(n)){case"string":var k=(n.indexOf(".")!==-1)?n.split(".")[1]:n;for(var a=0,b=o.length;a<b;++a){if(o[a].getFeatureId()===k){return o[a];}}break;case"number":break;default:jQuery.sap.log.error("GeoJsonLayer: Unextected instance name type "+jQuery.type(n));break;}return null;};return G;});
