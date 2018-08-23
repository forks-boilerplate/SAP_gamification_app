sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/generic/app/navigation/service/SelectionVariant","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil","sap/ui/Device","sap/ui/comp/state/UIState"],function(q,B,S,F,D,U){"use strict";function g(s,c,n){var a="sap.suite.ui.generic.template.customData";var b="sap.suite.ui.generic.template.genericData";var d="visual";var e="compact";var p;var I=false,f=false,_=null,h;var o=null;var A=null;var r={appStateKey:"",urlParams:{}};function j(){return p.then(function(){if(r.appStateKey){return{"sap-iapp-state":[r.appStateKey]};}return r.urlParams;});}function R(i){if(i&&i.editStateFilter!==undefined){var O=c.byId("editStateFilter");if(O){O.setSelectedKey((i.editStateFilter===null)?0:i.editStateFilter);}}var T=s.oController.getOwnerComponent().getModel("_templPriv");if(i.chartVariantId&&s.oSmartChart){s.oSmartChart.setCurrentVariantId(i.chartVariantId);}if(i.filterMode){T.setProperty('/alp/filterMode',i.filterMode);s.filterBarController.handleFilterSwitch(i.filterMode);}else{l();}if(i.contentView){((D.system.phone||D.system.tablet&&!D.system.desktop)&&i.contentView==="charttable")?T.setProperty('/alp/contentView',"chart"):T.setProperty('/alp/contentView',i.contentView);}if(i.autoHide){T.setProperty('/alp/autoHide',i.autoHide);}}function k(i){i=i||{};if(i.hasOwnProperty(a)&&i.hasOwnProperty(b)){R(i[b]);w(i[a]);}else{if(i._editStateFilter!==undefined){R({editStateFilter:i._editStateFilter});delete i._editStateFilter;}l();w(i);}}function l(){var T=s.oController.getOwnerComponent().getModel("_templPriv"),i=s.oSmartFilterbar.isCurrentVariantStandard()?s.oController.getOwnerComponent().getDefaultFilterMode():T.getProperty('/alp/filterMode');if(!(i===d||i===e)){q.sap.log.error("Defaulting to Visual filter due to incorrect value of defaultFilterMode in App descriptor");i=d;}if(i===d&&s.hideVisualFilter){q.sap.log.error("Visual filter is hidden defaulting to compact");i=e;}s.filterBarController.setDefaultFilter(i);}function m(i,O,P){s.oSmartFilterbar.setSuppressSelection(false);var Q=i.appStateKey||"";if(I){return;}A=Q;I=true;var T=(!Q&&O)||{};if(P!==sap.ui.generic.app.navigation.service.NavType.initial){var V=i&&i.bNavSelVarHasDefaultsOnly;var W=new S(i.selectionVariant);if((W.getSelectOptionsPropertyNames().indexOf("DisplayCurrency")===-1)&&(W.getSelectOptionsPropertyNames().indexOf("P_DisplayCurrency")===-1)&&(W.getParameterNames().indexOf("P_DisplayCurrency")===-1)){t(W,i);}z(W);if(!V||s.oSmartFilterbar.isCurrentVariantStandard()){y(W);}if(i.tableVariantId&&s.oSmartTable){s.oSmartTable.setCurrentVariantId(i.tableVariantId);}var X=s.oController.getOwnerComponent().getModel("_templPriv");if(P===sap.ui.generic.app.navigation.service.NavType.xAppState&&X.getProperty('/alp/filterMode')===d){x();}if(i.customData){k(i.customData);}else{l();}if(!V){s.oSmartFilterbar.checkSearchAllowed(s);var X=s.oController.getView().getModel("_templPriv"),Y=X.getProperty("/alp/searchable");if(Y){f=true;s.oSmartFilterbar.search();}}r={appStateKey:Q,urlParams:T};}else{if(s.oSmartFilterbar.isLiveMode()){s.oSmartFilterbar.checkSearchAllowed(s);if(s.oController.getView().getModel("_templPriv").getProperty("/alp/searchable")){f=true;}}l();}H();o=null;if(!f){M();}else{I=false;}}function t(i,O){var P=s.oSmartFilterbar.determineMandatoryFilterItems(),Q;for(var T=0;T<P.length;T++){if(P[T].getName().indexOf("P_DisplayCurrency")!==-1){if(O.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")&&O.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")[0].Low){Q=O.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")[0].Low;}if(Q){i.addParameter("P_DisplayCurrency",Q);}if(s.alr_visualFilterBar&&Q){s.alr_visualFilterBar.setDisplayCurrency(Q);}break;}}}function u(){var i={};i[a]={};var T=s.oController.getOwnerComponent().getModel("_templPriv");i[b]={chartVariantId:s.oSmartChart&&s.oSmartChart.getCurrentVariantId(),filterMode:T.getProperty('/alp/filterMode'),contentView:T.getProperty('/alp/contentView'),autoHide:T.getProperty('/alp/autoHide')};var O=c.byId("editStateFilter");if(O){i[b].editStateFilter=O.getSelectedKey();}c.getCustomAppStateDataExtension(i[a]);return i;}function v(){var O=s.oSmartFilterbar.getUiState({allFilters:false}).getSelectionVariant();var V=c.getVisibleSelectionsWithDefaults();for(var i=0;i<V.length;i++){if(!O.getValue(V[i])){O.addSelectOption(V[i],"I","EQ","");}}if(s.oController.byId('template::PageVariant').currentVariantGetModified()&&O.SelectionVariantID){O.SelectionVariantID="";}return{selectionVariant:JSON.stringify(O),tableVariantId:s.oSmartTable&&s.oSmartTable.getCurrentVariantId(),customData:u()};}function w(i){c.restoreCustomAppStateDataExtension(i||{});}function x(){var i=q.extend(true,{},s.oSmartFilterbar.getFilterData(true)),O=s.oController.getOwnerComponent().getModel("_filter");O.setData(i);s.filterBarController._updateFilterLink();}function y(i){s.oSmartFilterbar.clearVariantSelection();s.oSmartFilterbar.clear();h=i;J(i.toJSONObject(),true,false);}function z(O){var P=O.getParameterNames().concat(O.getSelectOptionsPropertyNames());for(var i=0;i<P.length;i++){s.oSmartFilterbar.addFieldToAdvancedArea(P[i]);}}function C(){if(s._bIsStartingUp){return;}if(I){return;}var i=v();try{o=n.storeInnerAppStateWithImmediateReturn(i);}catch(O){q.sap.log.error("AnalyticalListPage.fnStoreCurrentAppStateAndAdjustURL: "+O);}if(o instanceof sap.ui.generic.app.navigation.service.NavError){o=null;return;}if(o&&A!==o.appStateKey){r.appStateKey=o.appStateKey;}}function E(){var T=s.oController.getOwnerComponent().getModel("_templPriv");if(T.getProperty('/alp/filterMode')===d){if(s.alr_visualFilterBar&&s.alr_visualFilterBar.bIsInitialised&&T.getProperty("/alp/searchable")===false){s.oSmartFilterbar.showFilterDialog();}}}function G(){if(s.oSmartFilterbar.isInitialised()){s.oSmartFilterbar.checkSearchAllowed(s);}}function H(){G();E();var i=s.oController.getOwnerComponent().getModel("_filter");i.setData(q.extend(true,{},s.oSmartFilterbar.getFilterData(true)));s.filterBarController._updateFilterLink();if(s.alr_visualFilterBar&&s.alr_visualFilterBar.bIsInitialised&&s.alr_visualFilterBar.updateVisualFilterBindings){s.alr_visualFilterBar.updateVisualFilterBindings(true);s.oIappStateHandler._bVisualFiltersUpdated=true;}else{s.oIappStateHandler._bVisualFiltersUpdated=false;}}function J(i,O,P){var Q=new U({selectionVariant:i});s.oSmartFilterbar.setUiState(Q,{replace:O,strictMode:P});}function K(i){p=n.parseNavigation();}function L(){try{var i=new Promise(function(P,Q){_=P;p.done(m);p.fail(Q);});return i;}catch(O){l();H();}}function M(){I=false;_();}function N(){return h;}return{getFilterState:u,fnCheckMandatory:G,getCurrentAppState:v,fnUpdateSVFB:H,fnSetDefaultFilter:l,fnRestoreFilterState:k,getUrlParameterInfo:j,onSmartFilterBarInitialise:K,onSmartFilterBarInitialized:L,fnStoreCurrentAppStateAndAdjustURL:C,fnSetFiltersUsingUIState:J,fnResolveStartUpPromise:M,fnGetStartUpSelectionVariant:N};}return B.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.IappStateHandler",{constructor:function(s,c,n){q.extend(this,g(s,c,n));}});});
