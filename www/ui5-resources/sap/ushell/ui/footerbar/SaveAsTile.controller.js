sap.ui.define(["sap/ushell/services/AppConfiguration",'sap/ushell/components/applicationIntegration/AppLifeCycle'],function(A,a){"use strict";sap.ui.controller("sap.ushell.ui.footerbar.SaveAsTile",{onExit:function(){var v=this.getView();var t=v.getTileView();t.destroy();},onInit:function(){this.oShellModel=a.getElementsModel();var b=A.getMetadata();var s="Responsive";this.oPageBuilderService=sap.ushell.Container.getService("LaunchPage");this.oView=this.getView();this.appData=this.oView.viewData.appData||{};if(!jQuery.isEmptyObject(this.appData)){if(this.oShellModel){if(this.oShellModel.getModel()){s=this.oShellModel.getModel().getProperty("/sizeBehavior")?this.oShellModel.getModel().getProperty("/sizeBehavior"):"Responsive";}}this.oModel=new sap.ui.model.json.JSONModel({sizeBehavior:s,showGroupSelection:this.appData.showGroupSelection===false?false:true,showInfo:this.appData.showInfo===false?false:true,showIcon:this.appData.showIcon===false?false:true,showPreview:this.appData.showPreview===false?false:true,title:this.appData.title?this.appData.title.substring(0,256):'',subtitle:this.appData.subtitle?this.appData.subtitle.substring(0,256):'',numberValue:'',info:this.appData.info?this.appData.info.substring(0,256):'',icon:this.appData.icon||b.icon,numberUnit:this.appData.numberUnit,keywords:this.appData.keywords||'',groups:[]});this.oView.setModel(this.oModel);}},calcTileDataFromServiceUrl:function(s){var t=this;OData.read({requestUri:s},function(r){if(typeof r==="string"){r={number:r};}t.oModel.setProperty('/numberValue',r.number);var k=["infoState","stateArrow","numberState","numberDigits","numberFactor","numberUnit"];for(var i=0;i<k.length;i++){var b=k[i];if(r[b]){t.oModel.setProperty('/'+b,r[b]);}}},function(e){window.console.log(e);},{read:function(r){r.data=JSON.parse(r.body).d;}});},loadPersonalizedGroups:function(){var g=this.oPageBuilderService.getGroups(),t=this,d=jQuery.Deferred();g.done(function(G){var p=t.loadGroupsFromArray(G);p.done(function(b){d.resolve(b);});});return d;},loadGroupsFromArray:function(g){var t=this,d=jQuery.Deferred(),m=t.oView.getModel();this.oPageBuilderService.getDefaultGroup().done(function(D){g=g.filter(function(b){return(!t.oPageBuilderService.isGroupLocked(b)&&t.oPageBuilderService.isGroupVisible(b));}).map(function(b){return{title:(b===D&&t.getLocalizedText("my_group"))||t.oPageBuilderService.getGroupTitle(b),object:b};});m.setProperty('/groups',g);m.setProperty("/groups/length",g.length);d.resolve();});return d;},getLocalizedText:function(m,p){return p?sap.ushell.resources.i18n.getText(m,p):sap.ushell.resources.i18n.getText(m);}});},false);
