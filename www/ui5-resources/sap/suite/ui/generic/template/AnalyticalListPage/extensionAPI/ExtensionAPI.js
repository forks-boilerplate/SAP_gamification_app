sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/suite/ui/generic/template/extensionAPI/NavigationController"],function(q,B,N){"use strict";function g(t,c,s){var n;return{getSelectedContexts:function(u){var C=s.oSmartTable;if(u){C=c.byId(u);}return t.oCommonUtils.getSelectedContexts(C);},rebindTable:function(){s.oSmartTable.rebindTable();},refreshTable:function(){if(s.oSmartTable){s.oController.getOwnerComponent().getModel("_templPriv").setProperty('/alp/_ignoreChartSelections',false);t.oCommonUtils.refreshSmartTable(s.oSmartTable);}},_refreshChart:function(){if(s.oSmartChart&&s.oSmartChart.rebindChart){s.oSmartChart.rebindChart();}},_refreshFilters:function(){if(s.alr_visualFilterBar&&s.alr_visualFilterBar.updateVisualFilterBindings){s.alr_visualFilterBar.updateVisualFilterBindings(true);}},_refreshKpi:function(){if(s.oKpiTagContainer){var C=s.oKpiTagContainer.mAggregations.content;for(var i in C){if(C[i]._createGlobalKpi){C[i]._createGlobalKpi();}}}if(s.oFilterableKpiTagContainer){var C=s.oFilterableKpiTagContainer.mAggregations.content;for(var i in C){if(C[i]._createFilterableKpi){C[i]._createFilterableKpi();}}}},refresh:function(){t.oCommonUtils.refreshModel(s.oSmartTable);this._refreshFilters();this._refreshChart();this.refreshTable();this._refreshKpi();},attachToView:function(C){t.oCommonUtils.attachControlToView(C);},invokeActions:function(f,C,u){var a,p;if(!C){a=[];}else if(C instanceof sap.ui.model.Context){a=[C];}else{a=C;}if(u){p={urlParameters:u};}if(s.oSmartTable){s.oSmartTable.getTable().attachEventOnce("updateFinished",function(){t.oCommonUtils.setEnabledToolbarButtons(s.oSmartTable);t.oCommonUtils.setEnabledFooterButtons(s.oSmartTable);});}if(s.oSmartChart){s.oSmartChart.getChart().attachEventOnce("updateFinished",function(){t.oCommonUtils.setEnabledToolbarButtons(s.oSmartChart);t.oCommonUtils.setEnabledFooterButtons(s.oSmartChart);});}return t.oServices.oApplicationController.invokeActions(f,a,p);},getNavigationController:function(){if(!n){n=new N(t,c,s);}return n;},securedExecution:function(f,p){return t.oCommonUtils.securedExecution(f,p,s);},onCustomAppStateChange:function(){s.oIappStateHandler.fnStoreCurrentAppStateAndAdjustURL();}};}return B.extend("sap.suite.ui.generic.template.AnalyticalListPage.extensionAPI.ExtensionAPI",{constructor:function(t,c,s){q.extend(this,g(t,c,s));}});});
