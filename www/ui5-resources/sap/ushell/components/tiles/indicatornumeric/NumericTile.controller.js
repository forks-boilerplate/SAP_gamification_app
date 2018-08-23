(sap.ui.define(["sap/ushell/components/tiles/generic"],function(g){"use strict";g.extend("sap.ushell.components.tiles.indicatornumeric.NumericTile",{onInit:function(){this.KPI_VALUE_REQUIRED=true;},doProcess:function(k,t){var a=this;this.CALCULATED_KPI_VALUE=k;this.DEFINITION_DATA.EVALUATION_VALUES;var b=this.getTrendColor(t);var d=this.getTrendIndicator(t.trendValue);var s="";var e=this.CALCULATED_KPI_VALUE;if(this.oConfig.EVALUATION.SCALING==-2){e*=100;this.getView().oNVConfContS.setFormatterValue(false);}var c=this.isCurrencyMeasure(this.oConfig.EVALUATION.COLUMN_NAME);s=sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(Number(e),this.oConfig.EVALUATION.SCALING,this.oConfig.EVALUATION.DECIMAL_PRECISION,c,this.CURRENCY_CODE);if(this.oConfig.EVALUATION.SCALING==-2){this._updateTileModel({scale:"%"});}this._updateTileModel({value:s.toString(),valueColor:b,indicator:d});if(a.oConfig.TILE_PROPERTIES.frameType==sap.m.FrameType.OneByOne){this.oKpiTileView.oGenericTile.setState(sap.m.LoadState.Loaded);this.setToolTip(b,e,"NT");}else{a.getView().getViewData().parentController._updateTileModel(this.getTile().getModel().getData());a.getView().getViewData().deferredObj.resolve();sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(a.oConfig.TILE_PROPERTIES.id+"defferedLeft",false);}this.setToolTip(b,e,"NT");if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(this.oConfig)){if(a.chipCacheTime){sap.ushell.components.tiles.indicatorTileUtils.util.scheduleFetchDataJob.call(this,a.oTileApi.visible.isVisible());}}},doDummyProcess:function(){var t=this;this.setTextInTile();if(!(t.oConfig.BLANKTILE||t.oConfig.TILE_PROPERTIES.blankTile)){t._updateTileModel({value:"10.34",scale:"M",valueColor:sap.m.ValueColor.Neutral,indicator:sap.m.DeviationIndicator.None});}else{this.oKpiTileView.oNVConfContS.setIcon('sap-icon://BusinessSuiteInAppSymbols/icon-multiple-charts');}this.oKpiTileView.oGenericTile.setState(sap.m.LoadState.Loaded);}});}));
