sap.ui.define(["sap/ui/core/Element"],function(E){"use strict";var S=E.extend("sap.suite.ui.commons.networkgraph.Status",{metadata:{library:"sap.suite.ui.commons",properties:{key:{type:"string",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null},borderColor:{type:"string",group:"Appearance",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},contentColor:{type:"string",group:"Appearance",defaultValue:null},hoverBackgroundColor:{type:"string",group:"Appearance",defaultValue:null},hoverBorderColor:{type:"string",group:"Appearance",defaultValue:null},hoverContentColor:{type:"string",group:"Appearance",defaultValue:null},selectedBackgroundColor:{type:"string",group:"Appearance",defaultValue:null},selectedBorderColor:{type:"string",group:"Appearance",defaultValue:null},selectedContentColor:{type:"string",group:"Appearance",defaultValue:null},legendColor:{type:"string",group:"Appearance",defaultValue:null},useFocusColorAsContentColor:{type:"boolean",group:"Appearance",defaultValue:false}}}});S.prototype._getLegendColor=function(){var l=this.getLegendColor();return l?l:this.getBackgroundColor();};return S;});
