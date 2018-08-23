sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/m/MessageBox","sap/ui/thirdparty/jqueryui/jquery-ui-core","sap/ui/thirdparty/jqueryui/jquery-ui-widget","sap/ui/thirdparty/jqueryui/jquery-ui-mouse","sap/ui/thirdparty/jqueryui/jquery-ui-draggable"],function(q,l,C,M){"use strict";var I=l.CalculationBuilderItemType,O=l.CalculationBuilderOperatorType,L=l.CalculationBuilderLogicalOperatorType;var r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var a=C.extend("sap.suite.ui.commons.CalculationBuilderItem",{constructor:function(i,s){if(typeof i!=="string"&&i!==undefined){s=i;}if(s&&s.key){s.key=this._sanitizeKey(s.key);}C.apply(this,arguments);},metadata:{library:"sap/suite/ui/commons",properties:{key:{type:"string",group:"Misc",defaultValue:null}}},renderer:function(R,i){R.write(i._render());}});a.prototype._innerRender=function(){var h="";var R=function(){h+="<div class=\"sapCalculationBuilderItemFocusWrapper\">";h+="<div class=\"sapCalculationBuilderItemFocus\"></div>";h+="</div>";};var f=function(){h+="<div class=\"sapCalculationBuilderItemExpandButtonWrapper\">";h+="<div id=\""+this.getId()+"-expandbutton\" class=\"sapCalculationBuilderItemExpandButton "+(this._bReadOnly?"sapMBtnDisabled":"")+"\" tabindex=\"-1\">";if(!this._bReadOnly){h+="<div class=\"sapCalculationBuilderItemExpandButtonFocus\"></div>";}b("");h+="</div></div>";}.bind(this);var b=function(i){h+="<span aria-hidden=\"true\" data-sap-ui-icon-content=\""+i+"\" class=\"sapCalculationBuilderEmptyItemIcon sapUiIcon sapUiIconMirrorInRTL\" style=\"font-family:'SAP-icons'\"></span>";};h+="<div class=\"sapCalculationBuilderItemContentWrapper\">";R();h+="<div id=\""+this.getId()+"-content\" class=\"sapCalculationBuilderItemContent\">";if(this._isEmpty()){b("");h+="</div>";}else if(this._bIsNew){b("");h+="</div>";}else if(this._isFunction()){var F=this._getFunction();h+="<span class=\"sapCalculationBuilderItemLabel sapCalculationBuilderItemFunctionLabel\">";h+=q.sap.encodeHTML(F.title||this.getKey());h+="</span>";h+="<span class=\"sapCalculationBuilderItemLabel sapCalculationBuilderItemFunctionBracket\">";h+="&nbsp;(";h+="</span>";h+="</div>";}else{h+="<span class=\"sapCalculationBuilderItemLabel\">";h+=q.sap.encodeHTML(this._getLabel());h+="</span>";h+="</div>";}if(this._isVariable()&&this.isExpandable()){f();}h+="</div>";return h;};a.prototype._getClass=function(h){var c="",i=this._isEmpty();c+=this._bIsNew?"sapCalculationBuilderNewItem  sapCalculationBuilderCancelSelectable":"sapCalculationBuilderItem";if(i){c+=" sapCalculationBuilderNewItem ";}if(!this._bIsNew&&!i){c+=" sapCalculationBuilderFullItem ";}if(this._isBracket()){c+=" sapCalculationBuilderItemBracket ";}else if(this._isOperator()){c+=" sapCalculationBuilderItemOperator sapCalculationBuilderItemOperatorLength-"+this._getLabel().length+" ";if(this._isLogicalOperator()){c+=" sapCalculationBuilderItemLogicalOperator ";}}else if(this._isFunction()){c+=" sapCalculationBuilderItemFunction ";}else if(this._isConstant()){c+=" sapCalculationBuilderItemConstant ";}else if(this._isVariable()){c+=" sapCalculationBuilderItemColumn ";if(this.isExpandable()){c+=" sapCalculationBuilderItemColumnSeparator ";}}else{c+=" sapCalculationBuilderUnknownItem ";}if(h){c+=" sapCalculationBuilderItemErrorSyntax ";}return c;};a.prototype._render=function(){var i=this._hasCorrectParent(),e=this._getItemError(),h="",t=e?"title=\""+e.title+"\"":"";h+="<div "+t+" class=\""+this._getClass(!!e)+"\" id=\""+this.getId()+"\" tabindex=\""+(i?"-1":"0")+"\">";h+=this._innerRender();h+="</div>";return h;};a.prototype.init=function(){this._bIsNew=false;};a.prototype.onBeforeRendering=function(){this._oVariable=this.getVariable();};a.prototype.onAfterRendering=function(){this._afterRendering();};a.prototype._afterRendering=function(){var p=this.getParent();this._setEvents();if(!this._bIsNew&&!this._bReadOnly){this._setupDraggable();}if(this._hasCorrectParent(p)){if(!p._bIsCalculationBuilderRendering){p._setupKeyboard();p.getParent()._enableOrDisableExpandAllButton();}}};a.prototype._setEvents=function(){if(this.isExpandable()){this.$("expandbutton").click(this._expandButtonPress.bind(this));this.$("expandbutton").mousedown(function(e){e.stopPropagation();});}if(!this._bReadOnly){this.$("content").click(this._buttonPress.bind(this));}if(this._isBracket()||this._isFunction()){this._setBracketHover();}};a.prototype._buttonPress=function(e){var p=this.getParent();if(this._hasCorrectParent(p)&&!p._bDragging){if(e.ctrlKey){p._selectItem(this.$());}else if(e.shiftKey){p._selectItemsTo(this.$());}else{p._deselect();p._openDialog({opener:this,currentItem:this});}}};a.prototype._expandButtonPress=function(e){if(!this._bReadOnly){this._openExpandConfirmMessageBox();}};a.prototype.isExpandable=function(){var v=this._oVariable?this._oVariable:this.getVariable();return v&&v.getItems().length>0;};a.prototype.getVariable=function(){var p=this.getParent();return this._hasCorrectParent(p)&&p._getVariableByKey(this.getKey());};a.prototype.getType=function(){return this._getType();};a.prototype._setupDraggable=function(){var p=this.getParent();if(this._hasCorrectParent(p)){this.$().draggable({revert:"invalid",axis:"x",delay:100,scope:p.getId()+"-scope",start:function(){p.$().find(".sapCalculationBuilderBracket").removeClass("sapCalculationBuilderBracket");q(this).addClass("sapCalculationBuilderDragging");p._bDragging=true;if(!q(this).hasClass("ui-selected")){p._deselect();}},stop:function(){q(this).removeClass("sapCalculationBuilderDragging");p._bDragging=false;}});}};a.prototype._setBracketHover=function(){var $=this.$("content"),b=this._isFunction()?O["("]:this.getKey(),c=b===O[")"],t=c?O["("]:O[")"],T;$.mouseenter(function(e){var o,f,B=0,d=(this._hasCorrectParent()&&this.getParent().getItems())||[],i=c?d.length:0;for(;c?i>=0:i<d.length;(c?i--:i++)){o=d[i];if(o===this){f=true;}if(f){if((o.getKey()===t)||(o._isFunction()&&c)){B--;if(B===0){T=o;break;}}else if((o.getKey()===b)||(o._isFunction()&&!c)){B++;}}}if(T){this.$().addClass("sapCalculationBuilderBracket");T.$().addClass("sapCalculationBuilderBracket");}}.bind(this));$.mouseleave(function(e){this.$().removeClass("sapCalculationBuilderBracket");if(T){T.$().removeClass("sapCalculationBuilderBracket");}}.bind(this));};a.prototype._expandVariable=function(f){var p=this.getParent(),t,v;if(p){t=p.getItems().indexOf(this);v=p._getVariableByKey(this.getKey());p.insertItem(new a({"key":"("}),t++);v.getItems().forEach(function(i){p.insertItem(i._cloneItem(),t++);});p.insertItem(new a({"key":")"}),t++);p.removeItem(this);if(f){p._aErrors=p._validateSyntax();p._fireChange();}}};a.prototype._cloneItem=function(){return new a({key:this.getKey()});};a.prototype._openExpandConfirmMessageBox=function(){M.show(r.getText("CALCULATION_BUILDER_EXPAND_MESSAGE_TEXT",this._getLabel()),{icon:M.Icon.WARNING,title:r.getText("CALCULATION_BUILDER_EXPAND_MESSAGE_TITLE"),actions:[M.Action.YES,M.Action.CANCEL],onClose:function(A){var p;if(A===M.Action.YES){this._expandVariable(true);}else{p=this.getParent();if(p){p._setCorrectFocus();}}}.bind(this)});};a.prototype._getItemError=function(){var p=this.getParent(),e;if(this._hasCorrectParent(p)){e=q.grep(p._aErrors,function(i){return i.index===this._iIndex;}.bind(this))[0];}return e;};a.prototype._getLabel=function(){var g=function(i){if(this._isMultiplication()){return"X";}var i=this._getVariable()||this._getFunction();if(!i){return this.getKey();}return i.title?i.title:i._getLabel();}.bind(this);if(!this._sLabel){this._sLabel=g();if(this._isFunction()){this._sLabel+=" (";}}return this._sLabel;};a.prototype._sanitizeKey=function(k){if(!k||typeof k!=="string"){return k;}k=k.replace(/{/g,"&#125;");k=k.replace(/}/g,"&#123;");return k;};a.prototype.setKey=function(k,s){this._sType="";this._sLabel="";this._oVariable="";this.setProperty("key",this._sanitizeKey(k),s);};a.prototype.getKey=function(){var k=this.getProperty("key");k=k.replace(/&#125;/g,"{");k=k.replace(/&#123;/g,"}");return k;};a.prototype._getType=function(){var p=this.getParent();if(!this._sType&&p){this._sType=p._getType(this.getKey());}return this._sType;};a.prototype._isEmpty=function(){return!this._bIsNew&&!this.getKey();};a.prototype._isOperator=function(){return this._getType()===I.Operator;};a.prototype._isVariable=function(){return this._getType()===I.Variable;};a.prototype._isConstant=function(){return this._getType()===I.Constant;};a.prototype._isFunction=function(){var t=this._getType();return t===I.Function||t===I.CustomFunction;};a.prototype._getFunction=function(){var t=this._getType();if(t===I.Function||t===I.CustomFunction){var b=this.getParent().getParent();return b._createFunctionObject(b._getFunctionDefinition(this.getKey()));}return null;};a.prototype._getVariable=function(){if(this._getType()===I.Variable){var k=this.getKey();return q.grep(this.getParent().getVariables(),function(i){return i.getKey().toLowerCase()===k.toLowerCase();})[0];}return null;};a.prototype._getCustomFunction=function(){var i=this._isFunction(),t=this,p=this.getParent();if(p&&i){return q.grep(p.getFunctions(),function(f){return f.getKey().toLowerCase()===t.getKey().toLowerCase();})[0];}return null;};a.prototype._isBracket=function(){return this._isOperator()&&(this.getKey()==="("||this.getKey()===")");};a.prototype._isAddition=function(){return this._isOperator()&&this.getKey()==="+";};a.prototype._isSubtraction=function(){return this._isOperator()&&this.getKey()==="-";};a.prototype._isDivision=function(){return this._isOperator()&&this.getKey()==="/";};a.prototype._isMultiplication=function(){return this._isOperator()&&this.getKey()==="*";};a.prototype._isComma=function(){return this._isOperator()&&this.getKey()===",";};a.prototype._isLogicalOperator=function(){return this._isOperator()&&!!L[this.getKey()];};a.prototype._hasCorrectParent=function(p){p=p||this.getParent();return p instanceof sap.suite.ui.commons.CalculationBuilderExpression;};return a;},true);