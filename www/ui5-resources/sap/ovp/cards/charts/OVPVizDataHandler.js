sap.ui.define(["sap/ui/core/Control","sap/ui/model/json/JSONModel","jquery.sap.global"],function(C,J,q){"use strict";return C.extend("sap.ovp.cards.charts.OVPVizDataHandler",{metadata:{aggregations:{data:{type:"sap.ui.core.Element"},aggregateData:{type:"sap.ui.core.Element"},content:{multiple:false}},properties:{chartType:{defaultValue:false},dependentDataReceived:{defaultValue:false},scale:{defaultValue:""},entitySet:{}}},renderer:function(r,c){r.write("<div");r.writeElementData(c);r.write(">");if(c.getContent()){r.renderControl(c.getContent());}r.write("</div>");},mergeDatasets:function(b,d,c){var t=this;var m=this.getModel();var p=b.mParameters;var D=q.extend(true,{},this.dataSet);var s=p.select.split(",");var e=b.getPath().substring(1);var a=-1;if(e){a=e.indexOf('Parameters');}if(a>=0){e=e.substr(0,e.indexOf('Parameters'));}var f=m.getMetaModel();var g=this.getEntitySet();var h=f.getODataEntitySet(g);var k=f.getODataEntityType(h.entityType);var l=[];var n=[];for(var i=0;i<k.property.length;i++){if(k.property[i]["com.sap.vocabularies.Analytics.v1.Measure"]||(k.property[i].hasOwnProperty("sap:aggregation-role")&&k.property[i]["sap:aggregation-role"]==="measure")){if(s.indexOf(k.property[i].name)!==-1){l.push(k.property[i].name);}}else{if(s.indexOf(k.property[i].name)!==-1){n.push(k.property[i].name);}}}if(D&&D.results){for(var i=0;i<D.results.length-2;i++){for(var j=0;j<l.length;j++){D.results[0][l[j]]=Number(D.results[0][l[j]])+Number(D.results[i+1][l[j]]);}}var o=D.__count-D.results.length;var r={};r.results=[];r.results[0]=D.results[0];var u;if(D.__count>D.results.length){var v=q.extend(true,{},this.aggregateSet);if(v&&v.results&&D.results.length<D.__count){q.each(l,function(i){v.results[0][l[i]]=String(Number(t.aggregateSet.results[0][l[i]])-Number(r.results[0][l[i]]));});q.each(n,function(i){v.results[0][n[i]]=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OTHERS_DONUT",[o+1]);});v.results[0].$isOthers=true;u=v.results[0];if(u){d.results.splice(-1,1);}}}if(u){d.results.push(u);}}var M=new J();M.setData(d.results);c.setModel(M,"analyticalmodel");},updateBindingContext:function(){var b=this.getBinding("data");var a=this.getBinding("aggregateData");var t=this;if(this.chartBinding==b){return;}else{this.chartBinding=b;if(b){var t=this;b.attachEvent("dataReceived",function(e){t.dataSet=e&&e.getParameter("data");t.oDataClone=q.extend(true,{},t.dataSet);if(t.getChartType()=="donut"&&t.getBinding("aggregateData")!==undefined){if(t.getDependentDataReceived()===true||t.getDependentDataReceived()==="true"){t.mergeDatasets(b,t.oDataClone,t.getContent());t.setDependentDataReceived(false);}else{t.setDependentDataReceived(true);}}else{var m=new J();if(t.dataSet){m.setData(t.dataSet.results);}t.getContent().setModel(m,"analyticalmodel");}});}C.prototype.updateBindingContext.apply(this,arguments);}if(this.chartAggrBinding==a){return;}else{this.chartAggrBinding=a;if(a){var t=this;a.attachEvent("dataReceived",function(e){t.aggregateSet=e&&e.getParameter("data");if(t.getChartType()=="donut"){if(t.getDependentDataReceived()===true||t.getDependentDataReceived()==="true"){t.oDataClone=q.extend(true,{},t.dataSet);t.mergeDatasets(b,t.oDataClone,t.getContent());t.setDependentDataReceived(false);}else{t.setDependentDataReceived(true);}}else{var m=new J();m.setData(t.aggregateSet.results);t.getContent().setModel(m,"analyticalmodel");}});}C.prototype.updateBindingContext.apply(this,arguments);}}});});
