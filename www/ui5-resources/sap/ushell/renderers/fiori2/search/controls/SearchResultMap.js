sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchConfiguration'],function(S){"use strict";var b=true;var f=function(u){var i=false;$.ajax({url:u,type:"get",async:false,success:function(){i=true;return i;},error:function(){i=false;return i;}});return i;};var m=function(){var i=false;i=f("/sap/hana/spatial/mapClient/map.xsjs?col=32&row=32&level=6");return i;};var g=function(u){var a=m();var c=null;var U=[];try{U=sap.ushell.renderers.fiori2.search.getModelSingleton().config.mapTileLocation.URLPairs;}catch(e){}if(a){c="/sap/hana/spatial/mapClient/map.xsjs?col={X}&row={Y}&level={LOD}";}else if(U.length>0){if(u===0){c=U[0][0];}else{c=U[0][1];}}else{b=false;}if(typeof c!=="string"||c.length<0){b=false;}return c;};return sap.ui.core.Control.extend('sap.ushell.renderers.fiori2.search.controls.SearchResultMap',{teststring:'',ContainerContent:null,MapContainer:null,minLat:0,minLon:0,maxLat:0,maxLon:0,centerLat:0,centerLon:0,iNrLocations:0,myMap:null,myMapContainer:null,metadata:{aggregations:{"_map":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},init:function(){var t=this;var M={"MapProvider":[{"name":"HEREMAPS","type":"terrain","description":"","tileX":"256","tileY":"256","maxLOD":"20","copyright":"Tiles Courtesy of HERE Maps","Source":[{"id":"s1","url":g(0)},{"id":"s2","url":g(1)}]}],"MapLayerStacks":[{"name":"DEFAULT","MapLayer":{"name":"layer1","refMapProvider":"HEREMAPS","opacity":"0.9","colBkgnd":"RGB(255,255,255)"}}]};try{jQuery.sap.require("sap.ui.vk.MapContainer","sap.ui.vk.ContainerContent");t.MapContainer=sap.ui.vk.MapContainer;t.ContainerContent=sap.ui.vk.ContainerContent;}catch(e){}var a=new sap.ui.vbm.GeoMap({legendVisible:false,scaleVisible:false,refMapLayerStack:'DEFAULT',mapConfiguration:M,width:'100%',height:'100%',zoomlevel:6,zoomChanged:this.zoomChanged.bind(this),centerChanged:this.centerChanged.bind(this)});if(this.MapContainer){var c=new t.ContainerContent({content:a});this.MapContainer.prototype._onNavbarHome=function(){t.resizeMap();t.centerMap();t.setZoomLevelAfterRendering();};this.myMapContainer=new t.MapContainer({content:[c],showRectangularZoom:true,showHome:true,showFullScreen:false,showSettings:false,showSelection:false});t.myMap=t.myMapContainer.getContent()[0].getAggregation('content');t.setAggregation('_map',this.myMapContainer);}else{t.setAggregation('_map',a);t.myMap=t.getAggregation('_map');}},renderer:function(r,c){c.loadObjects(c);r.write('<div ');r.writeControlData(c);r.addClass('sapUshellSearchResultMap');r.writeClasses();r.write('>');var e;if(!b){e=new sap.m.Label({text:sap.ushell.resources.i18n.getText("mapsNoTiles")});r.renderControl(e);}else if(c.iNrLocations===0){e=new sap.m.Label({text:sap.ushell.resources.i18n.getText("mapsNoCoordinates")});r.renderControl(e);}else{if(c.MapContainer){r.renderControl(c.myMapContainer);}else{r.renderControl(c.myMap);}}r.write('</div>');},splitCoordinates:function(c){var a=c.split(';');return[parseFloat(a[0]),parseFloat(a[1])];},deg2rad:function(d){return Math.PI*d/180;},rad2deg:function(r){return 180*r/Math.PI;},getDistanceFromLatLonInKm:function(l,e,h,i){var R=6371;var L=this.deg2rad(h-l);var j=this.deg2rad(i-e);var a=Math.sin(L/2)*Math.sin(L/2)+Math.cos(this.deg2rad(l))*Math.cos(this.deg2rad(h))*Math.sin(j/2)*Math.sin(j/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d;},getLatLonDiff:function(v){var a,c,l,d,e,h,i,j;var k,n,o,p;a=v.upperLeft.split(";");c=v.lowerRight.split(";");l=parseFloat(a[1],10);d=parseFloat(c[1],10);j=(l+d)/2;k=l-d;o=k*111;o=Math.floor(o);e=parseFloat(a[0],10);h=parseFloat(c[0],10);if((e<0&&h>0)|(e>0&&h<0)){n=Math.abs(e)+Math.abs(h);}else{n=Math.abs(h-e);}p=this.getDistanceFromLatLonInKm(j,e,j,h);p=Math.floor(p);i="lat= "+k+" ("+o+" km); lon= "+n+" ("+p+" km)";return i;},calculateZoomLevel:function(s,k){if(k===0){k=1;}var e=40075004;var w=s;var a=e/256;var z=0;while((a*w)>(k*1000)&&(z<20)){a=a/2.5;z=z+1;}jQuery.sap.log.debug('zoomLevel calc: '+z);return z;},getSpotList:function(){var t=this;var s=new sap.ui.vbm.Containers();var r=t.getModel().oData.boResults;var n=0;var R,l,T,c,a,d,e,h,k,o,p,i;for(i=0;i<r.length;i++){R=r[i];l=null;if(!R.geoJson){continue;}l=JSON.parse(R.geoJson.value);T=R.geoJson.label;if(T==="LOC_4326"){for(var j=0;j<R.itemattributes.length;j++){if(R.itemattributes[j].isTitle===true){T=R.itemattributes[j].value;break;}}}T=T.replace(/<[^>]*>/g,"");c=l.coordinates;if(!c||c.length===0){continue;}a=c[0];d=c[1];if(isNaN(d)||isNaN(a)){continue;}n++;if(n===1){h=a;k=a;o=d;p=d;}else{if(a<h){h=a;}if(a>k){k=a;}if(d<o){o=d;}if(d>p){p=d;}}t.minLon=h;t.maxLon=k;t.minLat=o;t.maxLat=p;var q=new sap.m.Button({text:T});var B=new sap.m.Button({icon:"sap-icon://map",type:sap.m.ButtonType.Emphasized});var u=new sap.ui.layout.HorizontalLayout({content:[B,q]});e=new sap.ui.vbm.Container({position:a+';'+d+';0',item:u,alignment:6});s.addItem(e);}t.iNrLocations=n;if(n===0){s=t.getSpotList2();}return s;},getSpotList2:function(c){var t=this;var r=t.getModel().oData.origBoResults.elements;var R,l,T,C,a,d,s;var h=new sap.ui.vbm.Containers();var n=0;var i,k,o,p;var q=0;for(var u in r){if(!r.hasOwnProperty(u))continue;R=r[u];if(!R.LOC_4326)continue;l=R.LOC_4326;for(var v in R){if(!R.hasOwnProperty(v))continue;var A=R[v];T="";var w=false;if(A.$$MetaData$$){var x=A.$$MetaData$$.presentationUsage;if(x&&typeof x.length!=="undefined"){for(var j=0;j<x.length;j++){if(x[j]=="Title"){T=A.value;T=T.replace(/<[^>]*>/g,"");w=true;break;}}}}if(w){break;}}C=null;try{C=JSON.parse(l.value).coordinates;}catch(e){}if(!C||C.length===0){continue;}n++;a=C[0];d=C[1];if(isNaN(d)||isNaN(a)){continue;}q++;if(q===1){i=a;k=a;o=d;p=d;}else{if(a<i){i=a;}if(a>k){k=a;}if(d<o){o=d;}if(d>p){p=d;}}t.minLon=i;t.maxLon=k;t.minLat=o;t.maxLat=p;var y=new sap.m.Button({text:T});var B=new sap.m.Button({icon:"sap-icon://map",type:sap.m.ButtonType.Emphasized});var z=new sap.ui.layout.HorizontalLayout({content:[B,y]});s=new sap.ui.vbm.Container({position:a+';'+d+';0',item:z,alignment:6});h.addItem(s);}t.iNrLocations=n;return h;},loadObjects:function(c){var t=this;var s=t.getSpotList();jQuery.sap.log.debug("++++++");jQuery.sap.log.debug("number of locations: "+t.iNrLocations);t.myMap.removeAllVos();t.myMap.addVo(s);t.centerMap();var p=S.prototype.parseUrlParameters();for(var a in p){if(a==='box'&&p[a]!=="false"){t.showBoundariesAndCenter();}}},centerMap:function(){var t=this;t.centerLon=t.minLon+(t.maxLon-t.minLon)/2;t.centerLat=t.minLat+(t.maxLat-t.minLat)/2;jQuery.sap.log.debug("centerMap() returns: centerLat, centerLon: "+t.centerLat+";"+t.centerLon);t.myMap.setCenterPosition(t.centerLon+";"+t.centerLat);},setVisualFrame:function(){var t=this;var v={};v.minLon=t.minLon*0.5;v.maxLon=t.maxLon*1.2;v.minLat=t.minLat*0.8;v.maxLat=t.maxLat*1.2;t.myMap.setVisualFrame(v);},showBoundariesAndCenter:function(){var t=this;var c=new sap.ui.vbm.Spots({items:[new sap.ui.vbm.Spot({type:"Error",text:"center",position:(t.centerLon+" ;  "+t.centerLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"TLeft",position:(t.minLon+" ;  "+t.maxLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"TRight",position:(t.maxLon+" ;  "+t.maxLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"BLeft",position:(t.minLon+" ;  "+t.minLat+";0")}),new sap.ui.vbm.Spot({type:"Error",text:"BRight",position:(t.maxLon+" ;  "+t.minLat+";0")})]});t.myMap.addVo(c);},zoomChanged:function(e){var v=e.getParameter('viewportBB');var z=e.getParameter('zoomLevel');jQuery.sap.log.debug('zoomLevel ',z,'LatLonDiff:',this.getLatLonDiff(v));},centerChanged:function(e){var c=e.getParameter('centerPoint');jQuery.sap.log.debug('centerPoint: '+c);},setZoomLevelAfterRendering:function(){var t=this;var i=$(".sapUshellSearchResultMap")[0].id;var s=$("#"+i).width();s=s*0.8;var k=this.getDistanceFromLatLonInKm(this.minLat,this.minLon,this.maxLat,this.maxLon);jQuery.sap.log.debug('iScreenWidth for zoomLevel calc: '+s);var z=this.calculateZoomLevel(s,k);z=z-1;if(k>599&&k<701){z=6;}if(this.iNrLocations===1||k<2){z=9;}window.setTimeout(function(){t.myMap.setZoomlevel(z);},200);},setZoomLevelAfterRenderingOld:function(s){var t=this;var k=this.getDistanceFromLatLonInKm(this.minLat,this.minLon,this.maxLat,this.maxLon);k=Math.floor(k);jQuery.sap.log.debug("BOX minLat, minLon, maxLat, maxLon: ",this.minLat,this.minLon,this.maxLat,this.maxLon);jQuery.sap.log.debug('iKm for zoomLevel calc: '+k);jQuery.sap.log.debug('iScreenWidth for zoomLevel calc: '+s);var z=this.calculateZoomLevel(s,k);if(z>7){}if(this.iNrLocations===1){this.getAggregation('_map').setZoomlevel(9);}else{window.setTimeout(function(){t.myMap.setZoomlevel(z);},200);}},resizeMap:function(e){var h=$(".sapUshellSearchResultMap").parent().parent().parent().css("height");h=parseInt(h,10);h=0.85*h;h=""+h+"px";$(".sapUshellSearchResultMap").css("height",h);$(".sapUshellSearchResultMap").css("vertical-align","middle");},onAfterRendering:function(e){var t=this;t.resizeMap();t.centerMap();window.onresize=t.resizeMap;t.setZoomLevelAfterRendering();}});});
