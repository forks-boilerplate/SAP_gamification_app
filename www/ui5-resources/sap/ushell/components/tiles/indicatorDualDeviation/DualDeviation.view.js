// @copyright@
sap.ui.define(["sap/ushell/components/tiles/indicatorTileUtils/smartBusinessUtil","sap/ui/model/analytics/odata4analytics"],function(s,o){"use strict";sap.ui.getCore().loadLibrary("sap.suite.ui.commons");sap.ui.jsview("tiles.indicatorDualDeviation.DualDeviation",{getControllerName:function(){return"tiles.indicatorDualDeviation.DualDeviation";},createContent:function(c){var t=this;this.setHeight('100%');this.setWidth('100%');this.getViewData().chip.preview;var h="Lorem ipsum";var a="Lorem ipsum";var b=sap.ushell.components.tiles.indicatorTileUtils.util.getTileTitleSubtitle(this.getViewData().chip);if(b.title&&b.subTitle){h=b.title;a=b.subTitle;}var d={subheader:a,header:h,footerNum:"",footerComp:"",frameType:"TwoByOne",state:sap.m.LoadState.Loading,scale:""};t.oNumericContent=new sap.m.NumericContent({value:"{/value}",scale:"{/scale}",unit:"{/unit}",indicator:"{/indicator}",size:"{/size}",formatterValue:true,truncateValueTo:6,valueColor:"{/valueColor}"});t.oNumericTile=new sap.m.TileContent({unit:"{/unit}",size:"{/size}",footer:"{/footerNum}",content:t.oNumericContent});var B=new sap.suite.ui.microchart.BulletMicroChartData({value:"{value}",color:"{color}"});t.oBCTmpl=new sap.suite.ui.microchart.BulletMicroChart({size:sap.m.Size.Auto,scale:"{/scale}",actual:{value:"{/actual/value}",color:"{/actual/color}"},targetValue:"{/targetValue}",actualValueLabel:"{/actualValueLabel}",targetValueLabel:"{/targetValueLabel}",thresholds:{template:B,path:"/thresholds"},state:"{/state}",showActualValue:"{/showActualValue}",showTargetValue:"{/showTargetValue}"});var n=new sap.m.TileContent({unit:"{/unit}",size:"{/size}",footer:"{/footerNum}",content:t.oBCTmpl});t.oGenericTile=new sap.m.GenericTile({subheader:"{/subheader}",frameType:"{/frameType}",size:"{/size}",header:"{/header}",tileContent:[t.oNumericTile,n]});var g=new sap.ui.model.json.JSONModel();g.setData(d);t.oGenericTile.setModel(g);return t.oGenericTile;}});});
