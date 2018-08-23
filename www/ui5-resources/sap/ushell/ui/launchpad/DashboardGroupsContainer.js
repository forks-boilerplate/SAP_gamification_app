/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/ui/base/ManagedObject','sap/ui/core/Control','sap/ushell/library','sap/ushell/override','sap/ushell/utils','./DashboardGroupsContainerRenderer'],function(M,C,l,o,u){"use strict";var D=C.extend("sap.ushell.ui.launchpad.DashboardGroupsContainer",{metadata:{library:"sap.ushell",properties:{accessibilityLabel:{type:"string",defaultValue:null},displayMode:{type:"string",defaultValue:null}},aggregations:{groups:{type:"sap.ui.core.Control",multiple:true,singularName:"group"}},events:{afterRendering:{}}}});D.prototype.updateGroups=o.updateAggregatesFactory("groups");D.prototype.onAfterRendering=function(){var t=this;if(this.onAfterRenderingTimer){u.setPerformanceMark("FLP-TimeToInteractive_tilesLoaded",true);clearTimeout(this.onAfterRenderingTimer);}this.onAfterRenderingTimer=setTimeout(function(){t.onAfterRenderingTimer=undefined;t.fireAfterRendering();},0);};D.prototype.getGroupControlByGroupId=function(g){try{var a=this.getGroups();for(var i=0;i<a.length;i++){if(a[i].getGroupId()==g){return a[i];}}}catch(e){}return null;};D.prototype.addLinksToUnselectedGroups=function(){var g=this.getGroups();g.forEach(function(G,i){if(!G.getIsGroupSelected()){M.prototype.updateAggregation.call(G,"links");}});};D.prototype.removeLinksFromAllGroups=function(){var g=this.getGroups();g.forEach(function(G,a){var L=G.getLinks();if(L.length){if(L[0].getMetadata().getName()==="sap.m.GenericTile"){G.removeAllLinks();}else{for(var i=0;i<L.length;i++){L[i].destroy();}}}});};D.prototype.removeLinksFromUnselectedGroups=function(){var g=this.getGroups();g.forEach(function(G,a){var L=G.getLinks();if(L.length&&!G.getIsGroupSelected()){if(L[0].getMetadata().getName()==="sap.m.GenericTile"){G.removeAllLinks();}else{for(var i=0;i<L.length;i++){L[i].destroy();}}}});};return D;});
