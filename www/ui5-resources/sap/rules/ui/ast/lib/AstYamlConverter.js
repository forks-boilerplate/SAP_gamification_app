/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/rules/ui/ast/lib/Constants"],function(C){"use strict";var a={};a.parseConditionStatement=function(b){if(!this.hasOwnProperty("Id")){this.Id=0;}var c=[];var p;var h=false;var s=b[C.STATEMENTS_ARRAY];if(s.hasOwnProperty(C.RESULTS)){s=s[C.RESULTS];}var i;for(i=0;i<s.length;i++){var d=s[i];var t=d.getType();if(t===C.MODEL){c.push(this.parseConditionStatement(d));}else if(t===C.COMPLEX_STATEMENT){c.push(this.parseConditionStatement(d.getModel()));}else if(t===C.SIMPLE_STATEMENT){c.push(this.parseSimpleStatement(d));}else if(t===C.STATEMENT_OPERATOR){h=C.TRUE;var o={DataObjectType:C.ELEMENT,BusinessDataType:C.BOOLEAN};p=this._getEmptyAstObject();p.Id=this.Id++;p.Token.Type=C.FUNCTION;p.Token.Value=C[d.getValue()];p.Output=o;p.Root=C.TRUE;}}if(h){p.Children=[];for(i=0;i<c.length;i++){p.Children.push({Id:c[i].Id,sequenceNumber:i+1,Object:c[i]});}}else{p=c[0];}return p;};a._getEmptyAstObject=function(){var o={Id:null,Root:false,Token:{Type:null,Value:null}};return o;};a.parseSimpleStatement=function(s){var b,l,r;if(s.hasOwnProperty(C.LEFT_SELECTION_CLAUSE)){var c=s.getLeftSelectionClause();l=this._recursiveParseExpression(c);}if(s.hasOwnProperty(C.SELECTION_OPERATOR)){b=s.getSelectionOperator();}else{return l;}if(s.hasOwnProperty(C.RIGHT_SELECTION_CLAUSE)){var d=s.getRightSelectionClause();r=this._recursiveParseExpression(d);}var o=this._getEmptyAstObject();o.Id=this.Id++;o.Token.Type=C.FUNCTION;o.Token.Value=C[b.getValue()];o.Root=true;o.Output={BusinessDataType:C.BOOLEAN,DataObjectType:C.ELEMENT};o[C.CHILDREN]=[];this._addChildren(o,l,1);this._addChildren(o,r,2);return o;};a._addChildren=function(o,c,s){if(c instanceof Array){var b;for(b in c){o.Children.push({Id:c[b].Id,SequenceNumber:s++,Object:c[b]});}}else{o.Children.push({Id:c.Id,SequenceNumber:s,Object:c});}};a._recursiveParseExpression=function(s){var b;var c=[];var d=[];var i;var e;var v;var o;if(s.hasOwnProperty(C.SELECTIONS_ARRAY)){var f=s[C.SELECTIONS_ARRAY];for(i=0;i<f.length;i++){var t=f[i].getType();if(t===C.SIMPLE_SELECTION){e=f[i];if(e.hasOwnProperty(C.ORIGINALVALUE)){v=e.getOriginalValue();}else{v=e.getValue();}var g=e.getValueType();o=this._getEmptyAstObject();o.Id=this.Id++;o.Token.Type=C.LITERAL;o.Token.Value=v;o.Root=false;o.Output={BusinessDataType:C[g.toUpperCase()],DataObjectType:C.ELEMENT};c.push(o);}else if(t===C.COMPOUND_SELECTION){e=f[i].getSelection();var n=e.getNavigationPredicateDetails();var h=n.getNavigationFullPathId();var j=n.getAttributeType();o=this._getEmptyAstObject();o.Id=this.Id++;o.Token.Type=C.OBJECT;o.Token.Value=h;o.Output={BusinessDataType:C[j.toUpperCase()],DataObjectType:C.ELEMENT};c.push(o);}else if(t===C.ARITHMETICOPERATOR){e=f[i];v=e.getValue();if(v===C.LEFT_SMALL_BRACKET||v===C.RIGHT_SMALL_BRACKET){continue;}var k;k=this._getEmptyAstObject();k.Id=this.Id++;k.Token.Type=C.FUNCTION;k.Token.Value=C[v];k.Output={BusinessDataType:C.NUMBER,DataObjectType:C.ELEMENT};d.push(k);}else if(t===C.SELECTION_CLAUSE){c.push(this._recursiveParseExpression(f[i]));}}}else if(s.hasOwnProperty(C.VALUES_ARRAY)){var l=s[C.VALUES_ARRAY];for(i=0;i<l.length;i++){c.push(this._recursiveParseExpression(l[i])[0]);}}if(d.length>0){b=this._constructArithmeticObject(d,c);}else{b=c;}return b;};a._constructArithmeticObject=function(b,n){for(var o=0;o<b.length;o++){var c=b[o];c.Children=[];var l=n.shift();var r=n.shift();c.Root=true;c.Children.push({Id:l.Id,SequenceNumber:0,Object:l});c.Children.push({Id:r.Id,SequenceNumber:1,Object:r});n.unshift(c);}return n[0];};return a;},true);
