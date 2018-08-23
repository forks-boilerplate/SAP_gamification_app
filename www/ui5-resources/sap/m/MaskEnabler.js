/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','./InputBase','jquery.sap.global','sap/ui/Device','sap/ui/core/library','jquery.sap.keycodes'],function(C,I,q,D,c){"use strict";var T=c.TextDirection;var M=function(){var E='^';this.init=M.init=function(){I.prototype.init.call(this);this._iCaretTimeoutId=null;this._iUserInputStartPosition=null;this._iMaskLength=null;this._sOldInputValue=null;this._oRules=null;this._oTempValue=null;this._bSkipSetupMaskVariables=null;this._setDefaultRules();};this.exit=M.exit=function(){this._iCaretTimeoutId=null;this._iUserInputStartPosition=null;this._iMaskLength=null;this._sOldInputValue=null;this._oRules=null;this._oTempValue=null;this._bSkipSetupMaskVariables=null;};this.onBeforeRendering=function(){if(this._isMaskEnabled()){var v=this._validateDependencies();if(v){q.sap.log.warning("Invalid mask input: "+v);}}I.prototype.onBeforeRendering.apply(this,arguments);};this.onAfterRendering=function(){I.prototype.onAfterRendering.apply(this,arguments);};this.onfocusin=M.onfocusin=function(e){this._sOldInputValue=this._getInputValue();I.prototype.onfocusin.apply(this,arguments);if(this._isMaskEnabled()){if(!this._oTempValue.differsFromOriginal()||!this._isValidInput(this._sOldInputValue)){this._applyMask();}this._positionCaret(true);}};this.onfocusout=function(e){if(this._isMaskEnabled()){this.bFocusoutDueRendering=this.bRenderingPhase;this.$().toggleClass("sapMFocus",false);q(document).off('.sapMIBtouchstart');if(this.bRenderingPhase){return;}this.closeValueStateMessage();this._inputCompletedHandler();}else{this._setValue();I.prototype.onfocusout.apply(this,arguments);}};this.oninput=function(e){if(this._isChromeOnAndroid()){this._onInputForAndroidHandler(e);return;}I.prototype.oninput.apply(this,arguments);if(this._isMaskEnabled()){this._applyMask();this._positionCaret(false);}};this.onkeypress=function(e){if(this._isMaskEnabled()){this._keyPressHandler(e);}};this.onkeydown=M.onkeydown=function(e){if(this._isMaskEnabled()){var k=this._parseKeyBoardEvent(e),B=D.browser,i;i=(k.bBackspace||k.bDelete)&&B.msie&&B.version<10;if(!i){I.prototype.onkeydown.apply(this,arguments);}this._keyDownHandler(e,k);}else{var k=this._parseKeyBoardEvent(e);if(k.bEnter){this._setValue();}I.prototype.onkeydown.apply(this,arguments);}};this.onsapenter=function(e){};this.onsapfocusleave=function(e){};this.setValue=M.setValue=function(v){v=this.validateProperty('value',v);I.prototype.setValue.call(this,v);this._sOldInputValue=v;if(this._isMaskEnabled()){if(!this._oTempValue){this._setupMaskVariables();}if(this._oTempValue._aInitial.join('')!==v){this._applyRules(v);}}return this;};this.addAggregation=function(A,o,s){if(A==="rules"){if(!this._validateRegexAgainstPlaceHolderSymbol(o)){return this;}this._removeRuleWithSymbol(o.getMaskFormatSymbol());C.prototype.addAggregation.apply(this,arguments);if(!this._bSkipSetupMaskVariables){this._setupMaskVariables();}return this;}return C.prototype.addAggregation.apply(this,arguments);};this.insertAggregation=function(A,o,i,s){if(A==="rules"){if(!this._validateRegexAgainstPlaceHolderSymbol(o)){return this;}this._removeRuleWithSymbol(o.getMaskFormatSymbol());C.prototype.insertAggregation.apply(this,arguments);this._setupMaskVariables();return this;}return C.prototype.insertAggregation.apply(this,arguments);};this._validateRegexAgainstPlaceHolderSymbol=function(r){if(new RegExp(r.getRegex()).test(this.getPlaceholderSymbol())){q.sap.log.error("Rejecting input mask rule because it includes the currently set placeholder symbol.");return false;}return true;};this.setPlaceholderSymbol=function(s){var S;if(!/^.$/i.test(s)){q.sap.log.error("Invalid placeholder symbol string given");return this;}S=this.getRules().some(function(r){return new RegExp(r.getRegex()).test(s);});if(S){q.sap.log.error("Rejecting placeholder symbol because it is included as a regex in an existing mask input rule.");}else{this.setProperty("placeholderSymbol",s);this._setupMaskVariables();}return this;};this.setMask=function(m){if(!m){var e="Setting an empty mask is pointless. Make sure you set it with a non-empty value.";q.sap.log.warning(e);return this;}this.setProperty("mask",m,true);this._setupMaskVariables();return this;};this._isCharAllowed=function(s,i){return this._oRules.applyCharAt(s,i);};this._feedReplaceChar=function(s,p,d){return s;};this._setValue=function(){var v=this._getInputValue();if(this._sOldInputValue!==v){I.prototype.setValue.call(this,v);this._sOldInputValue=v;if(this.onChange&&!this.onChange({value:v})){this.fireChangeEvent(v);}}};var a=function(d){this._aInitial=d.slice(0);this._aContent=d;};a.prototype.setCharAt=function(s,p){this._aContent[p]=s;};a.prototype.charAt=function(p){return this._aContent[p];};a.prototype.toString=function(){return this._aContent.join('');};a.prototype.differsFromOriginal=function(){return this.differsFrom(this._aInitial);};a.prototype.differsFrom=function(v){var i=0;if(v.length!==this._aContent.length){return true;}for(;i<v.length;i++){if(v[i]!==this._aContent[i]){return true;}}return false;};a.prototype.getSize=function(){return this._aContent.length;};var b=function(r){this._aRules=r;};b.prototype.nextTo=function(i){if(typeof i==="undefined"){i=-1;}do{i++;}while(i<this._aRules.length&&!this._aRules[i]);return i;};b.prototype.previousTo=function(i){do{i--;}while(!this._aRules[i]&&i>0);return i;};b.prototype.hasRuleAt=function(i){return!!this._aRules[i];};b.prototype.applyCharAt=function(s,i){return this._aRules[i].test(s);};this._setDefaultRules=function(){this._bSkipSetupMaskVariables=true;this.addRule(new sap.m.MaskInputRule({maskFormatSymbol:"a",regex:"[A-Za-z]"}),true);this.addRule(new sap.m.MaskInputRule({maskFormatSymbol:"9",regex:"[0-9]"}),true);this._bSkipSetupMaskVariables=false;};this._validateDependencies=function(){var p=this.getPlaceholderSymbol(),r=this.getRules(),m=[],e=[];if(!this.getMask()){e.push("Empty mask");}if(r.length){m=[];r.every(function(R){var s=R.getMaskFormatSymbol(),d=s!==p,f;f=!m.some(function(S){return s===S;});m.push(s);if(!d){e.push("Placeholder symbol is the  same as the existing rule's mask format symbol");}if(!f){e.push("Duplicated rule's maskFormatSymbol ["+s+"]");}return d&&f;});}return e.length?e.join(". "):null;};this._removeRuleWithSymbol=function(s){var S=this._findRuleBySymbol(s,this.getRules());if(S){this.removeAggregation('rules',S.oRule);S.oRule.destroy();}};this._findRuleBySymbol=function(m,r){var R=null;if(typeof m!=="string"||m.length!==1){q.sap.log.error(m+" is not a valid mask rule symbol");return null;}q.each(r,function(i,o){if(o.getMaskFormatSymbol()===m){R={oRule:o,iIndex:i};return false;}});return R;};this._getTextSelection=function(){var _=q(this.getFocusDomRef());if(!_&&(_.length===0||_.is(":hidden"))){return;}return{iFrom:_[0].selectionStart,iTo:_[0].selectionEnd,bHasSelection:(_[0].selectionEnd-_[0].selectionStart!==0)};};this._setCursorPosition=function(p){if(p<0){p=0;}q(this.getFocusDomRef()).cursorPos(p);return this;};this._getCursorPosition=function(){return q(this.getFocusDomRef()).cursorPos();};this._setupMaskVariables=function(){var r=this.getRules(),m=this.getMask(),s=this._getSkipIndexes(m),d=this._getMaskArray(m,s),p=this.getPlaceholderSymbol(),i=this._buildMaskValueArray(d,p,r,s),t=this._buildRules(d,r,s);this._oTempValue=new a(i);this._iMaskLength=t.length;this._oRules=new b(t);this._iUserInputStartPosition=this._oRules.nextTo();};this._getMaskArray=function(m,s){var l=Array.isArray(s)?s.length:0,d=(m)?m.split(""):[],i;for(i=0;i<l;i++){d.splice(s[i],1);}return d;};this._getSkipIndexes=function(m){var l=(m)?m.length:0,i,s=[],p=0,L=false;for(i=0;i<l;i++){if(m[i]===E&&!L){s.push(i-p);L=true;p++;}else{L=false;}}return s;};this._applyMask=function(){var m=this._getInputValue();if(!this.getEditable()){return;}this._applyAndUpdate(m);};this._resetTempValue=function(f,t){var i,p=this.getPlaceholderSymbol();if(typeof f==="undefined"||f===null){f=0;t=this._oTempValue.getSize()-1;}for(i=f;i<=t;i++){if(this._oRules.hasRuleAt(i)){this._oTempValue.setCharAt(p,i);}}};this._applyAndUpdate=function(m){this._applyRules(m);this.updateDomValue(this._oTempValue.toString());};this._findFirstPlaceholderPosition=function(){return this._oTempValue.toString().indexOf(this.getPlaceholderSymbol());};this._applyRules=function(i){var s,d=0,m,p=this.getPlaceholderSymbol(),e;if(this._oTempValue.toString()===i){return;}for(m=0;m<this._iMaskLength;m++){if(this._oRules.hasRuleAt(m)){this._oTempValue.setCharAt(p,m);e=false;if(i.length){do{s=i.charAt(d);d++;if(this._oRules.applyCharAt(s,m)){this._oTempValue.setCharAt(s,m);e=true;}}while(!e&&(d<i.length));}if(!e){this._resetTempValue(m+1,this._iMaskLength-1);break;}}else{if(this._oTempValue.charAt(m)===i.charAt(d)){d++;}}}};this._keyPressHandler=function(e,k){var s,p,d;if(!this.getEditable()){return;}k=k||this._parseKeyBoardEvent(e);if(k.bCtrlKey||k.bAltKey||k.bMetaKey||k.bBeforeSpace){return;}s=this._getTextSelection();if(!k.bEnter&&!k.bShiftLeftOrRightArrow&&!k.bHome&&!k.bEnd&&!(k.bShift&&k.bDelete)&&!(k.bCtrlKey&&k.bInsert)&&!(k.bShift&&k.bInsert)){if(s.bHasSelection){this._resetTempValue(s.iFrom,s.iTo-1);this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(Math.max(this._iUserInputStartPosition,s.iFrom));}p=this._oRules.nextTo(s.iFrom-1);if(p<this._iMaskLength){d=this._feedReplaceChar(k.sChar,p,this._getInputValue());this._feedNextString(d,p);}e.preventDefault();}};this.oncut=function(e){var s=this._getTextSelection(),m=this._getMinBrowserDelay(),B=s.iFrom,i=s.iTo;I.prototype.oncut(e);if(!s.bHasSelection||!this._isMaskEnabled()){return;}i=i-1;this._resetTempValue(B,i);q.sap.delayedCall(m,this,function updateDomAndCursor(v,p,o){this._oTempValue._aContent=o;this.updateDomValue(v);q.sap.delayedCall(m,this,this._setCursorPosition,[p]);},[this._oTempValue.toString(),Math.max(this._iUserInputStartPosition,B),this._oTempValue._aContent.slice(0)]);};this._keyDownHandler=function(e,k){var d,s,i,n,k=k||this._parseKeyBoardEvent(e);if(!this.getEditable()){return;}if(!k.bShift&&(k.bArrowRight||k.bArrowLeft)){i=this._getCursorPosition();s=this._getTextSelection();d=this._determineArrowKeyDirection(k,s);if(this._isRtlMode()&&s.bHasSelection){n=this._determineRtlCaretPositionFromSelection(d);}else{n=this._oRules[d](i);}if(this._isWebkitProblematicCase()){n=this._fixWebkitBorderPositions(n,d);}this._setCursorPosition(n);e.preventDefault();}else if(k.bEscape){this._applyAndUpdate(this._sOldInputValue);this._positionCaret(true);e.preventDefault();}else if(k.bEnter){this._inputCompletedHandler(e);}else if((k.bCtrlKey&&k.bInsert)||(k.bShift&&k.bInsert)){I.prototype.onkeydown.apply(this,arguments);}else if((!k.bShift&&k.bDelete)||k.bBackspace){this._revertKey(k);e.preventDefault();}else if(this._isChromeOnAndroid()){this._oKeyDownStateAndroid={sValue:this._oTempValue.toString(),iCursorPosition:this._getCursorPosition()};}};this._revertKey=function(k){var s=this._getTextSelection(),B=s.iFrom,e=s.iTo;if(!s.bHasSelection){if(k.bBackspace){B=this._oRules.previousTo(B);}}if(k.bBackspace||(k.bDelete&&s.bHasSelection)){e=e-1;}this._resetTempValue(B,e);this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(Math.max(this._iUserInputStartPosition,B));};this._feedNextString=function(n,p){var N,A=false,d=n.split(""),s;while(d.length){s=d.splice(0,1)[0];if(this._oRules.applyCharAt(s,p)){A=true;this._oTempValue.setCharAt(s,p);p=this._oRules.nextTo(p);}}if(A){N=p;this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(N);}};this._inputCompletedHandler=function(){var n=this._getInputValue(),t,v,e,d;if(this._oTempValue.differsFrom(n)){this._applyAndUpdate(n);}t=this._oTempValue.differsFromOriginal();v=t?this._oTempValue.toString():"";e=!this._sOldInputValue||!this.getValue();d=!n;if(e&&(d||!t)){this.updateDomValue("");return;}if(this._sOldInputValue!==this._oTempValue.toString()){I.prototype.setValue.call(this,v);this._sOldInputValue=v;if(this.onChange&&!this.onChange({value:v})){this.fireChangeEvent(v);}}};this._buildMaskValueArray=function(m,p,r,s){return m.map(function(d,i){var n=s.indexOf(i)===-1,R=this._findRuleBySymbol(d,r);return(n&&R)?p:d;},this);};this._buildRules=function(m,r,s){var t=[],S,l=m.length,i=0;for(;i<l;i++){if(s.indexOf(i)===-1){S=this._findRuleBySymbol(m[i],r);t.push(S?new RegExp(S.oRule.getRegex()):null);}else{t.push(null);}}return t;};this._parseKeyBoardEvent=function(e){var p=e.which||e.keyCode,k=q.sap.KeyCodes,A=p===k.ARROW_RIGHT,d=p===k.ARROW_LEFT,s=e.shiftKey;return{iCode:p,sChar:String.fromCharCode(p),bCtrlKey:e.ctrlKey,bAltKey:e.altKey,bMetaKey:e.metaKey,bShift:s,bInsert:p===q.sap.KeyCodes.INSERT,bBackspace:p===k.BACKSPACE,bDelete:p===k.DELETE,bEscape:p===k.ESCAPE,bEnter:p===k.ENTER,bIphoneEscape:(D.system.phone&&D.os.ios&&p===127),bArrowRight:A,bArrowLeft:d,bHome:p===q.sap.KeyCodes.HOME,bEnd:p===q.sap.KeyCodes.END,bShiftLeftOrRightArrow:s&&(d||A),bBeforeSpace:p<k.SPACE};};this._positionCaret=function(s){var m=this.getMask(),i=this._getMinBrowserDelay(),e;clearTimeout(this._iCaretTimeoutId);e=this._findFirstPlaceholderPosition();if(e<0){e=m.length;}this._iCaretTimeoutId=q.sap.delayedCall(i,this,function(){if(this.getFocusDomRef()!==document.activeElement){return;}if(s&&(e===(m.length))){this.selectText(0,e);}else{this._setCursorPosition(e);}});};this._getMinBrowserDelay=function(){return!D.browser.msie?4:50;};this._isValidInput=function(s){var l=s.length,i=0,d;for(;i<l;i++){d=s[i];if(this._oRules.hasRuleAt(i)&&(!this._oRules.applyCharAt(d,i)&&d!==this.getPlaceholderSymbol())){return false;}if(!this._oRules.hasRuleAt(i)&&d!==this._oTempValue.charAt(i)){return false;}}return true;};this._isRtlChar=function(s){var l='A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',r='\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',d=new RegExp('^[^'+l+']*['+r+']');return d.test(s);};this._fixWebkitBorderPositions=function(i,d){var t=this._oTempValue.toString().length;if(d==='nextTo'){if(i===0||i===t||i===1){i=0;}else if(i===t+1){i=1;}}else{if(i===0||i===t-1){i=t;}else if(i===-1||i===t){i=t-1;}}return i;};this._containsRtlChars=function(){var t=this._oTempValue.toString(),d=false;for(var i=0;i<t.length;i++){d=this._isRtlChar(t[i]);}return d;};this._isRtlMode=function(){return sap.ui.getCore().getConfiguration().getRTL()||(this.getTextDirection()===T.RTL);};this._isWebkitProblematicCase=function(){return D.browser.webkit&&this._isRtlMode()&&!this._containsRtlChars();};this._determineArrowKeyDirection=function(k,s){var d;if(!this._isRtlMode()||!this._containsRtlChars()||s.bHasSelection){if(k.bArrowRight){d='nextTo';}else{d='previousTo';}}else{if(k.bArrowRight){d='previousTo';}else{d='nextTo';}}return d;};this._determineRtlCaretPositionFromSelection=function(d,w){var n,s=this._getTextSelection();if(w){if(d==='nextTo'){if(!this._containsRtlChars()){n=s.iFrom;}else{n=s.iTo;}}else{if(!this._containsRtlChars()){n=s.iTo;}else{n=s.iFrom;}}}else{if(d==='nextTo'){if(!this._containsRtlChars()){n=s.iTo;}else{n=s.iFrom;}}else{if(!this._containsRtlChars()){n=s.iFrom;}else{n=s.iTo;}}}return n;};this._onInputForAndroidHandler=function(e){var k;if(!this._oKeyDownStateAndroid){return;}k=this._buildKeyboardEventInfo(this._oKeyDownStateAndroid.sValue,this._getInputValue());this.updateDomValue(this._oKeyDownStateAndroid.sValue);q.sap.delayedCall(0,this,function(i,K,o){this._setCursorPosition(K.iCursorPosition);if(o.bBackspace){this._revertKey(o);}else{this._keyPressHandler(i,o);}},[e,this._oKeyDownStateAndroid,k]);delete this._oKeyDownStateAndroid;e.preventDefault();};this._buildKeyboardEventInfo=function(o,n){var N="",i;if(!o&&!n){return{};}if(o&&n&&n.length<o.length){return{bBackspace:true};}for(i=0;i<n.length;i++){if(o[i]!==n[i]){N=n[i];break;}}return{sChar:N};};this._isChromeOnAndroid=function(){return D.browser.chrome&&D.os.android;};};return M;},true);
