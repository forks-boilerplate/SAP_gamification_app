sap.ui.define([],function(){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.SearchFacetDialogHelper');var m=sap.ushell.renderers.fiori2.search.SearchFacetDialogHelper={};jQuery.extend(m,{init:function(d){var t=this;t.POS_FACET_LIST=0;t.POS_TOOLBAR_SEARCHFIELD=0;t.POS_TOOLBAR_TOGGLEBUTTON=1;t.POS_SETTING_CONTAINER=0;t.POS_ATTRIBUTE_LIST_CONTAINER=1;t.POS_ICONTABBAR=0;t.POS_TABBAR_LIST=0;t.POS_TABBAR_CONDITION=1;t.POS_SORTING_SELECT=0;t.POS_SHOWONTOP_CHECKBOX=1;t.POS_ADVANCED_CHECKBOX=0;t.POS_ADVANCED_INPUT_LAYOUT=1;t.POS_ADVANCED_BUTTON=2;t.bResetFilterIsActive=false;var n={"decimals":2};t.oNumberFormat=sap.ui.core.format.NumberFormat.getFloatInstance(n);t.oDateFormatOptions={"pattern":"yyyy/MM/dd","UTC":false};t.oTimestampFormatOptions={"pattern":"yyyy-MM-dd HH:mm:ss.SSSSSSS","UTC":true};t.oDateFormat=sap.ui.core.format.DateFormat.getDateTimeInstance(t.oDateFormatOptions);t.dialog=d;},getFacetList:function(){var t=this;return t.dialog.oSplitContainer.getMasterPages()[0].getContent()[t.POS_FACET_LIST];},updateDetailPage:function(l,f,i){var t=this;var M=t.dialog.getModel();var s=t.dialog.getModel('searchModel');var b=l.getBindingContext().sPath;var S=M.getProperty(b);var d=M.getAttributeDataType(S);var a=this.getFacetList().indexOfAggregation("items",l);var D=t.dialog.oSplitContainer.getDetailPages()[a];var o,A,c;if(d==="string"||d==="text"){o=D.getContent()[t.POS_ICONTABBAR].getItems()[t.POS_TABBAR_LIST].getContent()[0].getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER].getContent()[0];A=D.getContent()[t.POS_ICONTABBAR].getItems()[t.POS_TABBAR_CONDITION].getContent()[0];c=D.getContent()[t.POS_ICONTABBAR].getItems()[t.POS_TABBAR_LIST].getContent()[0].getContent()[t.POS_SETTING_CONTAINER];}else{o=D.getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER].getContent()[0];A=D.getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER];c=D.getContent()[t.POS_SETTING_CONTAINER];}var n=D.getId();t.dialog.oSplitContainer.toDetail(n,"show");t.dialog.resetIcons(M,b,t.dialog);o.setBusy(true);var p={sAttribute:S.dimension,sBindingPath:b,sAttributeLimit:1000,bInitialFilters:i};if(d==="number"){p.sAttributeLimit=20;}if(!M.chartQuery){M.chartQuery=M.sinaNext.createChartQuery({filter:M.getProperty("/uiFilter").clone(),dimension:S.dimension,top:1000});}t.applyChartQueryFilter(a);if(f){var e=M.sinaNext.createSimpleCondition({attribute:S.dimension,operator:M.sinaNext.ComparisonOperator.Bw,value:f});if(!t.bResetFilterIsActive){M.chartQuery.filter.autoInsertCondition(e);}}else{if(f===undefined&&(d==="string"||d==="text")){D.getContent()[t.POS_ICONTABBAR].getItems()[t.POS_TABBAR_LIST].getContent()[0].getSubHeader().getContent()[t.POS_TOOLBAR_SEARCHFIELD].setValue('');}}M.chartQuery.filter.searchTerm=s.getSearchBoxTerm();M.facetDialogSingleCall(p).then(function(){var I=M.getProperty(D.getBindingContext().sPath).items;if(A.data('initial')){t.initiateAdvancedConditions(A,I,A.data('dataType'));}var C=c.getItems()[t.POS_SHOWONTOP_CHECKBOX];if(o.getSelectedContexts().length>0){C.setEnabled(true);}t.updateDetailPageListItemsSelected(o,A);t.dialog.updateDetailPageCharts(I,M);});},applyChartQueryFilter:function(e){var t=this;t.dialog.getModel().resetChartQueryFilterConditions();var d=t.dialog.oSplitContainer.getDetailPages();for(var i=0;i<d.length;i++){if(i===e||d[i].getContent().length===0){continue;}var l;if(!d[i].getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER]){l=d[i].getContent()[t.POS_ICONTABBAR].getItems()[t.POS_TABBAR_LIST].getContent()[0].getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER].getContent()[0];}else{l=d[i].getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER].getContent()[0];}for(var j=0;j<l.getItems().length;j++){var L=l.getItems()[j];var o=L.getBindingContext().getObject();var f=o.filterCondition;if(f.attribute||f.conditions){if(L.getSelected()&&!t.bResetFilterIsActive){t.dialog.getModel().chartQuery.filter.autoInsertCondition(f);}}}t.applyAdvancedCondition(d[i],t.getFacetList().getItems()[i].getBindingContext().getObject(),t.dialog.getModel());}},resetChartQueryFilters:function(){var t=this;t.dialog.getModel().resetChartQueryFilterConditions();var d=t.dialog.oSplitContainer.getDetailPages();for(var i=0;i<d.length;i++){if(d[i].getContent().length===0){continue;}var l;if(!d[i].getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER]){l=d[i].getContent()[t.POS_ICONTABBAR].getItems()[t.POS_TABBAR_LIST].getContent()[0].getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER].getContent()[0];}else{l=d[i].getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER].getContent()[0];}for(var j=0;j<l.getItems().length;j++){var L=l.getItems()[j];var o=L.getBindingContext().getObject();var f=o.filterCondition;if(f.attribute||f.conditions){if(L.getSelected()){L.setSelected(false);t.dialog.getModel().removeFilterCondition(f,false);}}}}},applyAdvancedCondition:function(d,f,a){var t=this;var b=t.dialog.getModel();var D,A,k,o,c,e,g,C;if(d.getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER]){var l=d.getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER];D=l.data('dataType');A=l.getContent();switch(D){case'timestamp':t.oDateFormat=sap.ui.core.format.DateFormat.getDateTimeInstance(t.oTimestampFormatOptions);case'date':for(k=1;k<A.length;k++){o=A[k];c=o.getContent()[t.POS_ADVANCED_CHECKBOX];var h=o.getContent()[t.POS_ADVANCED_INPUT_LAYOUT];if(c.getSelected()&&h.getDateValue()&&h.getSecondDateValue()){var i=t.oDateFormat.format(h.getDateValue());var s=t.oDateFormat.format(new Date(h.getSecondDateValue().getTime()+86400000-1));e=b.sinaNext.createSimpleCondition({attribute:f.dimension,attributeLabel:f.title,operator:b.sinaNext.ComparisonOperator.Ge,value:(D==='timestamp')?h.getDateValue():i,valueLabel:i});g=b.sinaNext.createSimpleCondition({attribute:f.dimension,attributeLabel:f.title,operator:b.sinaNext.ComparisonOperator.Le,value:(D==='timestamp')?h.getSecondDateValue():s,valueLabel:s});C=b.sinaNext.createComplexCondition({valueLabel:h.getValue(),operator:b.sinaNext.LogicalOperator.And,conditions:[e,g],userDefined:true});if(!t.bResetFilterIsActive){a.addFilterCondition(C,false);}}}break;case'number':for(k=1;k<A.length;k++){o=A[k];c=o.getContent()[t.POS_ADVANCED_CHECKBOX];var j=o.getContent()[t.POS_ADVANCED_INPUT_LAYOUT].getContent()[0];var n=o.getContent()[t.POS_ADVANCED_INPUT_LAYOUT].getContent()[2];var p=o.getContent()[t.POS_ADVANCED_INPUT_LAYOUT].getContent()[1];var q=t.oNumberFormat.parse(j.getValue());var r=t.oNumberFormat.parse(n.getValue());if(c.getSelected()&&q>=0&&r>=0){e=b.sinaNext.createSimpleCondition({attribute:f.dimension,attributeLabel:f.title,operator:b.sinaNext.ComparisonOperator.Ge,value:q,valueLabel:t.oNumberFormat.format(q),userDefined:true});g=b.sinaNext.createSimpleCondition({attribute:f.dimension,attributeLabel:f.title,operator:b.sinaNext.ComparisonOperator.Le,value:r,valueLabel:t.oNumberFormat.format(r),userDefined:true});C=b.sinaNext.createComplexCondition({valueLabel:t.oNumberFormat.format(q)+p.getText()+t.oNumberFormat.format(r),operator:b.sinaNext.LogicalOperator.And,conditions:[e,g],userDefined:true});if(!t.bResetFilterIsActive){a.addFilterCondition(C,false);}}}break;default:break;}}else{var u=d.getContent()[t.POS_ICONTABBAR].getItems()[t.POS_TABBAR_CONDITION].getContent()[0];D=u.data('dataType');A=u.getContent();var v,w,x,F,O;switch(D){case'string':for(k=0;k<A.length-1;k++){o=A[k];v=o.getContent()[t.POS_ADVANCED_INPUT_LAYOUT].getContent()[0];w=o.getContent()[t.POS_ADVANCED_INPUT_LAYOUT].getContent()[1];x=w.getValue();switch(v.getSelectedKey()){case'eq':O=b.sinaNext.ComparisonOperator.Eq;break;case'ew':O=b.sinaNext.ComparisonOperator.Ew;break;case'bw':O=b.sinaNext.ComparisonOperator.Bw;break;case'co':O=b.sinaNext.ComparisonOperator.Co;break;default:O=b.sinaNext.ComparisonOperator.Eq;break;}if(w.getValue()){F=b.sinaNext.createSimpleCondition({attribute:f.dimension,attributeLabel:f.title,operator:O,value:x,valueLabel:x,userDefined:true});if(!t.bResetFilterIsActive){a.addFilterCondition(F,false);}}}break;case'text':for(k=0;k<A.length-1;k++){o=A[k];v=o.getContent()[t.POS_ADVANCED_INPUT_LAYOUT].getContent()[0];w=o.getContent()[t.POS_ADVANCED_INPUT_LAYOUT].getContent()[1];x=w.getValue();switch(v.getSelectedKey()){case'co':O=b.sinaNext.ComparisonOperator.Co;break;default:O=b.sinaNext.ComparisonOperator.Eq;}if(w.getValue()){F=b.sinaNext.createSimpleCondition({attribute:f.dimension,attributeLabel:f.title,operator:O,value:x,valueLabel:x,userDefined:true});if(!t.bResetFilterIsActive){a.addFilterCondition(F,false);}}}break;default:break;}}},initiateAdvancedConditions:function(a,I,t){var b=this;var c,C,o,d;for(var i=I.length;i>0;i--){var e=I[i-1];if(e.advanced){c=a.getContent();if(t==="string"||t==="text"){C=c[c.length-2];}else{C=c[c.length-1];}o=C.getContent()[b.POS_ADVANCED_CHECKBOX];o.setSelected(true);d=C.getContent()[b.POS_ADVANCED_INPUT_LAYOUT];switch(t){case'number':var f=d.getContent()[0];var g=d.getContent()[2];if(e.filterCondition.conditions){for(var j=0;j<e.filterCondition.conditions.length;j++){var h=e.filterCondition.conditions[j];if(h.operator==="Ge"){f.setValue(h.valueLabel||b.oNumberFormat.format(h.value));}if(h.operator==="Le"){g.setValue(h.valueLabel||b.oNumberFormat.format(h.value));}}}break;case'string':var k=e.filterCondition.operator;if(k==="Co"){d.getContent()[0].setSelectedKey('co');}else if(k==="Ew"){d.getContent()[0].setSelectedKey('ew');}else if(k==="Bw"){d.getContent()[0].setSelectedKey('bw');}d.getContent()[1].setValue(e.filterCondition.valueLabel);break;case'text':var k=e.filterCondition.operator;if(k==="Co"){d.getContent()[0].setSelectedKey('co');}d.getContent()[1].setValue(e.filterCondition.valueLabel);break;default:d.setValue(e.label);break;}b.insertNewAdvancedCondition(C,t);b.dialog.getModel().changeFilterAdvaced(e,true);}}a.data('initial',false);},updateDetailPageListItemsSelected:function(d,a){var t=this;var D=a.data('dataType');for(var j=0;j<d.getItems().length;j++){var l=d.getItems()[j];var L=l.getBindingContext().getObject();if(d.getModel().hasFilter(L)){l.setSelected(true);d.getModel().changeFilterAdvaced(L,false);t.removeAdvancedCondition(a,l,D);}else{l.setSelected(false);}var s=l.getBindingContext().sPath+"/selected";l.getBindingContext().oModel.setProperty(s,l.getSelected());}t.sortingAttributeList(d.getParent().getParent());d.setBusy(false);if(D==="date"||D==="number"){d.focus();}},removeAdvancedCondition:function(a,l,t){var b=this;var c=a.getContent();var C,I,d;if(t==="string"||t==="text"){for(var i=0;i<c.length-1;i++){C=c[i];I=C.getContent()[b.POS_ADVANCED_INPUT_LAYOUT].getContent()[1];if(I.getProperty('value')){var v=I.getValue();var L=l.getBindingContext().getObject();if(v===L.filterCondition.value){d=i;break;}}}}a.removeContent(d);},sortingAttributeList:function(d){var t=this;var s=d.getContent()[t.POS_SETTING_CONTAINER];var S=s.getItems()[t.POS_SORTING_SELECT].getItems()[0];var c=s.getItems()[t.POS_SHOWONTOP_CHECKBOX];var l=d.getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER].getContent()[0];var D=l.data('dataType');var b=l.getBinding("items");var a=[];if(c.getSelected()){a.push(new sap.ui.model.Sorter("selected",true,false));}switch(S.getSelectedKey()){case"sortName":a.push(new sap.ui.model.Sorter("label",false,false));break;case"sortCount":a.push(new sap.ui.model.Sorter("value",true,false));if(D==="string"||D==="text"){a.push(new sap.ui.model.Sorter("label",false,false));}break;default:break;}b.sort(a);},insertNewAdvancedCondition:function(a,t){var A=a.getParent();var n=new sap.ushell.renderers.fiori2.search.controls.SearchAdvancedCondition({type:t});if(t==="string"||t==="text"){var i=A.getAggregation("content").length-1;A.insertAggregation("content",n,i);}else{var b=A.indexOfAggregation("content",a);if(b===(A.getAggregation("content").length-1)){A.addContent(n);}}},deleteAdvancedCondition:function(a){var t=this;var A=a.getParent();var d=a.getParent().getParent().getParent().getParent().getParent();A.removeAggregation("content",a);t.updateCountInfo(d);},updateCountInfo:function(d){var t=this;var M=t.getFacetList();var o=M.getSelectedItem();if(!o){o=M.getItems()[0];}var a=o.getBindingContext().oModel;var s=o.getBindingContext().sPath;var D=a.getProperty(s).dimension;var f=t.dialog.getModel().aFilters;var c=0;for(var j=0;j<f.length;j++){if(!f[j].advanced&&f[j].facetAttribute===D){c++;}}var b=a.getAttributeDataType(a.getProperty(s));var A,e,i,C,g;var h=0;if(b==="string"||b==="text"){A=d.getContent()[t.POS_ICONTABBAR].getItems()[t.POS_TABBAR_CONDITION].getContent()[0];e=A.getContent().length-1;for(i=0;i<e;i++){C=A.getContent()[i];g=C.getContent()[0];if(g.getSelected()){h++;}}}else{A=d.getContent()[t.POS_ATTRIBUTE_LIST_CONTAINER];e=A.getContent().length;for(i=1;i<e;i++){C=A.getContent()[i];g=C.getContent()[0];if(g.getSelected()){h++;}}}var F=a.getProperty(s).facetType;if(F==="attribute"){var k=c+h;a.setProperty(s+"/count",k);t.dialog.resetEnabledForFilterResetButton();}}});return m;});
