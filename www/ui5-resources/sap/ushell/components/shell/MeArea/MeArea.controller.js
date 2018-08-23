// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/resources","sap/m/Button","sap/m/ButtonType"],function(r,B,a){"use strict";var m=new sap.ui.model.json.JSONModel({actions:[],userPreferences:{entries:[]},apps:{recentActivities:[],frequentActivities:[]}});sap.ui.controller("sap.ushell.components.shell.MeArea.MeArea",{onInit:function(){var c=(this.getView().getViewData()?this.getView().getViewData().config:{})||{};this.aControlsWithPressHandler=[];this.getView().setModel(m,"meAreaModel");this._addActionItemToOverflowSupport();this.oResourceBundle=r.i18n;if(c.enableRecentActivity&&sap.ushell.Container.getRenderer("fiori2").oShellModel.getModel().getProperty("/enableTrackingActivity")){this.oUserRecentsSrvc=sap.ushell.Container.getService('UserRecents');}this.lastVisited=null;},onBeforeRendering:function(){if(this.oUserRecentsSrvc){if(!m.getProperty('/apps/recentActivities')||!m.getProperty('/apps/recentActivities').length){this.refreshRecentActivities();}}if(!m.getProperty('/apps/frequentActivities')||!m.getProperty('/apps/frequentActivities').length){this.refreshFrequentActivities();}},refreshRecentActivities:function(){if(this.oUserRecentsSrvc){this.oUserRecentsSrvc.getRecentActivity().done(function(A){A.forEach(function(i){i.timestamp=sap.ushell.utils.formatDate(i.timestamp);});m.setProperty('/apps/recentActivities',A);});}},refreshFrequentActivities:function(){if(this.oUserRecentsSrvc){this.oUserRecentsSrvc.getFrequentActivity().done(function(A){m.setProperty('/apps/frequentActivities',A);});}},createViewByName:function(e,n,v){var V=v?sap.ui.getCore().byId(v):null;if(!V){var s=e.getSource(),c=s.getBindingContext(),p=c?c.getPath():"",b=n||c.getModel().getProperty(p+"/viewName");v=v||c.getModel().getProperty(p+"/id");V=sap.ui.view(v,{viewName:b,type:'JS',viewData:{}});}return V;},getSettingsDialogContent:function(){var s=sap.ui.getCore().byId("userSettings");if(!s){s=sap.ui.view("userSettings",{viewName:"sap.ushell.components.shell.MeArea.UserSettings",type:'JS',viewData:this.getView().getViewData()});}s.setModel(this.getView().getModel());return s;},logout:function(){sap.ui.require(['sap/m/MessageBox'],function(M){var l=new sap.ushell.ui.launchpad.LoadingDialog({text:""}),s=true,i=false,L={};sap.ushell.Container.getGlobalDirty().done(function(d){s=false;if(i===true){l.exit();l=new sap.ushell.ui.launchpad.LoadingDialog({text:""});}var _=function(d){var L={},R=r.i18n;if(d===sap.ushell.Container.DirtyState.DIRTY){L.message=R.getText('unsaved_data_warning_popup_message');L.icon=M.Icon.WARNING;L.messageTitle=R.getText("unsaved_data_warning_popup_title");}else{L.message=R.getText('signoutConfirmationMsg');L.icon=M.Icon.QUESTION;L.messageTitle=R.getText("signoutMsgTitle");}return L;};L=_(d);M.show(L.message,L.icon,L.messageTitle,[M.Action.OK,M.Action.CANCEL],function(A){if(A===M.Action.OK){l.openLoadingScreen();l.showAppInfo(r.i18n.getText('beforeLogoutMsg'),null);sap.ushell.Container.logout();}},sap.ui.core.ElementMetadata.uid("confirm"));});if(s===true){l.openLoadingScreen();i=true;}});},_addPressHandlerToActions:function(c){var t=this;if(this.aControlsWithPressHandler.indexOf(c.getId())===-1){this.aControlsWithPressHandler.push(c.getId());c.attachPress(function(e){sap.ui.getCore().byId("viewPortContainer").switchState("Center");if(c.getId()==="userSettingsBtn"){var h=e.mParameters?e.mParameters.hotkeys:undefined;t.hotkeysParam=h;var T=t;if(!T.getView().oSettingsDialog.getModel()){T.getView().oSettingsDialog.setModel(T.getView().getModel());}var o=function(){T.getView().oSettingsDialog.open();sap.ui.getCore().byId("viewPortContainer").detachAfterSwitchStateAnimationFinished(o);};if(T.hotkeysParam){T.getView().oSettingsDialog.open();}else{var C=T.oView.getModel().getProperty('/currentState/stateName');if(C==='embedded'||C==='embedded-home'||C==='standalone'||C==='blank-home'||C==='blank'){T.getView().oSettingsDialog.open();}else{sap.ui.getCore().byId("viewPortContainer").attachAfterSwitchStateAnimationFinished(o);}}}});}},_getControlsWithPressHandler:function(){return this.aControlsWithPressHandler;},_addActionItemToOverflowSupport:function(){if(sap.m._overflowToolbarHelpers&&sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls._mSupportedControls){var s=sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls._mSupportedControls;var p=sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls.prototype;var c=["sap.ushell.ui.launchpad.ActionItem","sap.ushell.ui.footerbar.AboutButton","sap.ushell.ui.footerbar.ContactSupportButton","sap.ushell.ui.footerbar.EndUserFeedback","sap.ushell.ui.footerbar.LogoutButton","sap.ushell.ui.footerbar.UserPreferencesButton","sap.m.Button"];var C=function(n){return n.substring(0,1).toUpperCase()+n.substring(1);};var S={canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","type"]};var P=function(o){if(!o.mCustomStyleClassMap.sapUshellActionItem){return;}if(o.setActionType){o.setActionType('standard');}var t=o.getType();if(t!==a.Accept&&t!==a.Reject){o.setType(a.Transparent);}if(o.getIcon()){o.addStyleClass("sapMOTAPButtonWithIcon");}else{o.addStyleClass("sapMOTAPButtonNoIcon");}};var f=function(o){if(o.setActionType){o.setActionType('action');}};c.forEach(function(n){s[n]=S;var b=n.split(".").map(C).join("");var d='_preProcess';var e='_postProcess';p[d+b]=P;p[e+b]=f;});}},setLastVisited:function(u){this.lastVisited=u;},updateScrollBar:function(h){if(this.lastVisited&&this.lastVisited!="#"+h){jQuery('.sapUshellViewPortLeft').scrollTop(0);sap.ui.getCore().byId('meAreaIconTabBar').setSelectedKey("sapUshellIconTabBarrecentActivities");var l=sap.ui.getCore().byId('sapUshellActivityListrecentActivities'),L=l.getItems();if(L&&L.length>0){sap.ui.getCore().byId('sapUshellActivityListrecentActivities').setSelectedItem(L[0],true);}this.lastVisited=null;}},_saveUserPrefEntries:function(){var e=this.getView().getModel().getProperty("/userPreferences/entries");var b=jQuery.Deferred();var w;var c;var t=0;var f=0;var s=0;var p=[];var d=[];var g;var h=function(){s++;b.notify();};var j=function(k){d.push({entry:g,message:k});f++;b.notify();};for(var i=0;i<e.length;i++){if(e[i]&&e[i].isDirty===true){c=e[i].onSave();c.done(h);g=e[i].title;c.fail(j);p.push(c);t++;}}w=jQuery.when.apply(null,p);w.done(function(){b.resolve();});b.progress(function(){if(f>0&&(f+s===t)){b.reject(d);}});return b.promise();},_saveButtonHandler:function(){var s;s=this._saveUserPrefEntries();var t=this;var i=this.getView().getModel().getProperty("/userPreferences/isDetailedEntryMode");if(i){this.getView().getModel().setProperty("/userPreferences/activeEntryPath",null);}s.done(function(){t._showSaveMessageToast();});s.fail(function(f){sap.ui.require(["sap/m/MessageBox"],function(M){var e;var b="";if(f.length===1){e=t.translationBundle.getText("savingEntryError")+" ";}else{e=t.translationBundle.getText("savingEntriesError")+"\n";}f.forEach(function(c){e+=c.entry+"\n";b+="Entry: "+c.entry+" - Error message: "+c.message+"\n";});M.show(e,{icon:M.Icon.ERROR,title:t.translationBundle.getText("Error"),actions:[M.Action.OK]});jQuery.sap.log.error("Failed to save the following entries",b,"sap.ushell.ui.footerbar.UserPreferencesButton");});});},_showSaveMessageToast:function(){sap.ui.require(["sap/m/MessageToast"],function(M){var b=r.i18n.getText("savedChanges");M.show(b,{duration:3000,width:"15em",my:"center bottom",at:"center bottom",of:window,offset:"0 -50",collision:"fit fit"});});},createSaveButton:function(){var t=this;return new B({id:"userSettingSaveButton",text:r.i18n.getText("saveBtn"),press:function(){t._saveButtonHandler();t._handleSettingsDialogClose.apply(t);},visible:true});},_dialogCancelButtonHandler:function(){var e=this.getView().getModel().getProperty("/userPreferences/entries");for(var i=0;i<e.length;i++){if(e[i]&&e[i].onCancel){e[i].onCancel();}}},_handleSettingsDialogClose:function(){var v=this.getView(),s=this.getSettingsDialogContent();s.oMainApp.toMaster('userSettingMaster');s.oController.oMasterEntryList.removeSelections(true);v.oSettingsDialog.close();},createCancelButton:function(){var t=this;return new B({id:"userSettingCancelButton",text:r.i18n.getText("cancelBtn"),press:function(){t._dialogCancelButtonHandler();t._handleSettingsDialogClose.apply(t);},visible:true});},onExit:function(){this.getView().aDanglingControls.forEach(function(c){if(c.destroyContent){c.destroyContent();}c.destroy();});}});},false);
