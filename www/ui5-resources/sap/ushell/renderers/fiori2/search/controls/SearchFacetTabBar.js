sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchFacetDialogModel','sap/ushell/renderers/fiori2/search/controls/SearchFacetDialog','sap/m/GroupHeaderListItemRenderer','sap/m/ButtonRenderer'],function(){"use strict";sap.m.Button.extend('sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDown',{renderer:'sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDownRenderer'});sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDownRenderer=jQuery.extend(true,{},sap.m.ButtonRenderer);sap.m.GroupHeaderListItemRenderer.extend('sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItemRenderer');sap.m.GroupHeaderListItem.extend('sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItem',{renderer:'sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItemRenderer',metadata:{properties:{upperCase:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{button:{type:'sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDown',multiple:false}}}});sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItemRenderer.renderCounter=function(r,l){var b=l.getButton();if(typeof b==='object'){this.renderCounterContent(r,l,b);}};sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItemRenderer.renderCounterContent=function(r,l,b){r.write('<div>');r.renderControl(b);r.write('</div>');};sap.m.SegmentedButtonItem.extend('my.SegmentedButtonItem',{aggregations:{"content1":{type:"sap.ui.core.Control",multiple:false}}});sap.ui.core.Control.extend('sap.ushell.renderers.fiori2.search.controls.SearchFacetTabBar',{metadata:{properties:{"eshRole":"string","headerText":"string","selectedButtonParameters":{type:"object",defaultValue:null}},aggregations:{items:{type:"sap.m.IconTabFilter",multiple:true}}},getSearchFacetTabBarAndDimensionById:function(b){var r={};r.index=0;var a=document.getElementById(b);var v=a.dataset.facetView;var c=a.dataset.facetViewIndex;var d=$("#"+b).parent()[0];var e=d.dataset.facetDimension;var f=$(".sapUshellSearchFacetTabBar");for(var i=0;i<f.length;i++){var g=$(".sapUshellSearchFacetTabBar .sapUshellSearchFacetTabBarHeader")[i];var h=g.dataset.facetDimension;if(h===e){r.index=i;r.control=sap.ui.getCore().byId(f[i].id);r.view=v;r.buttonIndex=c;r.dimension=e;break;}}return r;},storeClickedTabInformation:function(e){var s,a,b,d,c;var t=e.getSource().sId;var f=this.getSearchFacetTabBarAndDimensionById(t);var p=f.control.getModel().getPersonalizationStorageInstance().getItem("search-facet-panel-chart-state");s=f.dimension;a=f.control;b=f.view;c=f.buttonIndex;d=a.getBindingContext().getObject().dimension;var g=e.getParameters().id;var h=[];var o={};o.tabId=t;o.searchFacetTabBarIndex=f.searchFacetTabBarIndex;o.buttonId=g;o.buttonIndex=c;o.dimension=d;o.view=b;h.push(o);if(p&&Object.prototype.toString.call(p)==='[object Array]'){for(var i=0;i<p.length;i++){var j=p[i];if(j.dimension!==s){h.push(j);}}}f.control.getModel().getPersonalizationStorageInstance().setItem("search-facet-panel-chart-state",h);a.getBindingContext().getObject().chartIndex=c;},renderer:function(r,c){function a(x,T){return function(y){var d;var z=$(this.getDomRef()).closest(".sapUshellSearchFacetTabBar")[0];var E=sap.ui.getCore().byId($(z).attr("id"));var J=new sap.ushell.renderers.fiori2.search.SearchFacetDialogModel(c.getModel());J.initBusinessObjSearch().then(function(){J.setData(c.getModel().getData());J.sinaNext=c.getModel().sinaNext;J.prepareFacetList();if(E&&E.getBindingContext()&&E.getBindingContext().getObject()&&E.getBindingContext().getObject().dimension){d=E.getBindingContext().getObject().dimension;}var K=new sap.ushell.renderers.fiori2.search.controls.SearchFacetDialog({selectedAttribute:d,selectedTabBarIndex:x,tabBarItems:T});K.setModel(J);K.setModel(c.getModel(),'searchModel');K.open();var P=c.getParent().getParent().getParent().getParent();P.oFacetDialog=K;c.getModel().eventLogger.logEvent({type:c.getModel().eventLogger.FACET_SHOW_MORE,referencedAttribute:d});});};}r.write('<div tabindex="0"');r.writeControlData(c);r.addClass("sapUshellSearchFacetTabBar");r.writeClasses();r.write('>');var d=c.getBindingContext().getObject().dimension;var b=c.getBindingContext().getObject().dataType;var t=c.getBindingContext().getObject().title;var e;var s;e=c.getModel().getPersonalizationStorageInstance().getItem("search-facet-panel-chart-state");if(e&&Object.prototype.toString.call(e)==='[object Array]'){for(var k=0;k<e.length;k++){if(e[k].dimension===d){s=e[k];break;}}}var f=[];var g=[];var C=null;var B=null;var h=0;if(s&&s.buttonIndex){h=s.buttonIndex;h=parseInt(h,10);}if(b!=c.getModel().sinaNext.AttributeType.String){h=0;}c.getBindingContext().getObject().chartIndex=h;var j=c.getItems();var D=new sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDown({icon:j[h].getIcon(),type:'Transparent'});for(var i=0;i<j.length;i++){C=j[i].getContent()[0];B=new sap.m.Button({text:j[i].getText(),icon:j[i].getIcon(),press:function(E){c.storeClickedTabInformation(E);c.setSelectedButtonParameters(E.getParameters());}});B.data("facet-view",j[i].getText(),true);B.data("facet-view-index",""+i,true);B.data("dimension",d,true);f.push(B);g.push(C);}var A=new sap.m.ActionSheet({showCancelButton:false,buttons:f,placement:sap.m.PlacementType.Bottom,cancelButtonPress:function(x){jQuery.sap.log.info("sap.m.ActionSheet: cancelButton is pressed");},afterClose:function(x){var y=this;window.setTimeout(function(){var d=y.getFocusDomRef().getAttribute('data-facet-dimension');var z=$(".sapUshellSearchFacetTabBarButton");for(var i=0;i<z.length;i++){var E=z[i];var J=E.parentNode.parentNode.getAttribute('data-facet-dimension');if(J===d){E.focus();break;}}},100);jQuery.sap.log.info("=====================");jQuery.sap.log.info("sap.m.ActionSheet: closed");}});A.data("facet-dimension",d,true);D.addStyleClass("sapUshellSearchFacetTabBarButton");var l=j[h].getText();var m=sap.ushell.resources.i18n.getText('displayAs',[l]);D.setTooltip(m);D.attachPress(function(E){A.openBy(this);});D.onAfterRendering=function(){$(this.getDomRef()).attr("aria-label",sap.ushell.resources.i18n.getText('dropDown'));};if(c.getHeaderText()){var H=new sap.m.List({});H.setShowNoData(false);H.setShowSeparators(sap.m.ListSeparators.None);H.data("sap-ui-fastnavgroup","false",true);var F=false;var n=c.getModel().getProperty("/uiFilter/rootCondition");if(n.hasFilters()){F=true;}else{F=false;}var R=new sap.m.Button({icon:"sap-icon://clear-filter",tooltip:sap.ushell.resources.i18n.getText("resetFilterButton_tooltip"),type:'Transparent',enabled:F,press:function(E){var x=c.getModel();x.eventLogger.logEvent({type:x.eventLogger.CLEAR_ALL_FILTERS});x.resetFilterConditions(true);}});R.addStyleClass("sapUshellSearchFilterByResetButton");R.onAfterRendering=function(){$(this.getDomRef()).attr("aria-label",sap.ushell.resources.i18n.getText('resetFilterButton_tooltip'));};var L=new sap.m.Title({text:c.getHeaderText()});L.addStyleClass("sapUshellSearchFilterByResetButtonLabel");var S=new sap.m.ToolbarSpacer();var o=new sap.m.Toolbar({content:[L,S,R]});o.data("sap-ui-fastnavgroup","false",true);H.setHeaderToolbar(o);H.addStyleClass('sapUshellSearchFilterByHeaderList');H.onAfterRendering=function(){$(".sapUshellSearchFilterByHeaderList").find("ul").attr("tabindex","-1");};r.renderControl(H);}var p=new sap.m.CustomListItem({content:g[h]});p.setModel(c.getModel(),'facets');p.addStyleClass("sapUshellSearchFacetList");var G;if(b===c.getModel().sinaNext.AttributeType.String){G=new sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItem({title:t,button:D});}else{G=new sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItem({title:t});}G.data("facet-dimension",d,true);G.addStyleClass("sapUshellSearchFacetTabBarHeader");var q=new sap.m.Link({text:sap.ushell.resources.i18n.getText("showMore"),press:a(h,j)});q.setModel(c.getModel("i18n"));q.addStyleClass('sapUshellSearchFacetShowMoreLink');var I=new sap.m.Label({text:""});I.addStyleClass('sapUshellSearchFacetInfoZeile');var u=new sap.m.VBox({items:[I,q]});var v=new sap.m.CustomListItem({content:u,visible:{parts:[{path:'/uiFilter/dataSource'}],formatter:function(x){return x.type!==this.getModel().sinaNext.DataSourceType.Category;}}});v.addStyleClass('sapUshellSearchFacetShowMoreItem');var w=new sap.m.List({showSeparators:sap.m.ListSeparators.None,items:[G,p,v]});w.data("sap-ui-fastnavgroup","false",true);w.setModel(c.getModel());r.renderControl(w);c.getItems()[h].addContent(g[h]);r.write("</div>");},onAfterRendering:function(){jQuery(this.getDomRef()).removeAttr("tabindex");}});});
