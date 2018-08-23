/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/theming/Parameters','sap/ushell/library','sap/ui/Device','sap/ui/core/IconPool','./ShellTitle','./ShellAppTitle','./ShellHeaderRenderer'],function(q,C,T,l,D,I,S){"use strict";var s=0,n=0;var L;var i;var a;var b;var c="sapUshellShellShowSearchOverlay";var M=3,d=1,e=0.5,f=9,A=3,g=3,h=12;var j=C.extend("sap.ushell.ui.shell.ShellHeader",{metadata:{properties:{logo:{type:"sap.ui.core.URI",defaultValue:""},showLogo:{type:"boolean",defaultValue:true},searchState:{type:"string",defaultValue:"COL"},ariaLabel:{type:"string",defaultValue:undefined},showSeparators:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{headItems:{type:"sap.ushell.ui.shell.ShellHeadItem",multiple:true},headEndItems:{type:"sap.ushell.ui.shell.ShellHeadItem",multiple:true},search:{type:"sap.ui.core.Control",multiple:false},user:{type:"sap.ushell.ui.shell.ShellHeadUserItem",multiple:false},title:{type:"sap.ushell.ui.shell.ShellTitle",multiple:false},appTitle:{type:"sap.ushell.ui.shell.ShellAppTitle",multiple:false}},associations:{shellLayout:{type:"sap.ui.base.ManagedObject",multiple:false}},events:{searchSizeChanged:{}}}});j.prototype.setVisible=function(v){v=v===undefined?true:!!v;q(".sapUshellShellHead, .sapUshellShellHead > .sapUshellShellCntnt").css("display",v?"":"none");C.prototype.setVisible.call(this,v);};j.prototype.getShellLayoutControl=function(){return sap.ui.getCore().byId(this.getShellLayout());};j.prototype.createUIArea=function(k){var m=document.getElementById('shell-hdrcntnt');var o=k||'canvas';var p=document.getElementById(o);if(p&&!m){p.insertAdjacentHTML('beforebegin','<header id="shell-hdr" class="sapContrastPlus sapUshellShellHead">'+'</header>');if(!this.getVisible()){this.setVisible(false);}this.placeAt('shell-hdr');}};j.prototype.SearchState={COL:"COL",EXP:"EXP",EXP_S:"EXP_S"};j.prototype.init=function(){this._rtl=sap.ui.getCore().getConfiguration().getRTL();this._handleMediaChange=function(p){if(!this.getDomRef()){return;}if(this.getSearchState()!=this.SearchState.COL){this._setMaxWidthForAppTitleAndTitle();this._handleSearchSizeChanged();return;}this._refresh();};D.media.attachHandler(this._handleMediaChange,this,D.media.RANGESETS.SAP_STANDARD);this._handleResizeChange=function(){if(!this.getDomRef()){return;}var u=this.getUser();if(this.getUser()){u._checkAndAdaptWidth(!this.$("hdr-search").hasClass("sapUshellShellHidden")&&!!this.getSearch());}if(this.getSearchState()!=this.SearchState.COL){this._setMaxWidthForAppTitleAndTitle();this._handleSearchSizeChanged();return;}this._refresh();};D.resize.attachHandler(this._handleResizeChange,this);this.data("sap-ui-fastnavgroup","true",true);this.oTitle=null;};j.prototype.exit=function(){D.media.detachHandler(this._handleMediaChange,this,D.media.RANGESETS.SAP_STANDARD);D.resize.detachHandler(this._handleResizeChange,this);if(this.oTitle){this.oTitle.destroy();}var k=document.getElementById('shell-hdr');if(k){k.parentElement.removeChild(k);}};j.prototype.setAccessKeyHandler=function(k){this._accessKeyHandler=k;};j.prototype.attachAccessKeyHander=function(k){if(!k){return;}q("#sapUshellHeaderAccessibilityHelper").focusin(function(E){var v=sap.ui.getCore().byId('viewPortContainer'),m=v.getCurrentState(),o;if(k.bForwardNavigation){switch(m){case"Center":if(k.getAppKeysHandler()){setTimeout(function(){k.fnExternalKeysHandler(E,k.bFocusPassedToExternalHandlerFirstTime);k.bFocusOnShell=false;},0);}else{var p=q(":focusable").filter("[tabindex!='-1']"),r=p.index(document.activeElement),o=p.eq(r+1);if(!o.length){o=p[0];}}break;case"LeftCenter":o=q("#logoutBtn");if(o.length===0){o=q("#userStatusOpener");}break;case"RightCenter":o=q("#sapUshellNotificationIconTabByDate");k.bFocusOnShell=false;break;}}else{var H=this.getHeadEndItems(),t;if(H.length>0){t=H[H.length-1];o=t;}else o=this.getAppTitle();}setTimeout(function(){if(o){o.focus();}},0);}.bind(this));};j.prototype.onAfterRendering=function(){this._refresh();this.$("icon").one('load',this._refresh.bind(this));var k=this.getShellLayoutControl();if(k){this.$("hdr-center").toggleClass("sapUshellShellAnim",k.getShowAnimation());}var o=this.$("hdr-search-container");if(s!=n){if(this.getSearchState()==this.SearchState.COL){o.one('transitionend',function(){q(this).addClass("sapUshellShellSearchHidden");});}this._setSearchContainerMaxSize(n,false);var m={remSize:this._convertPxToRem(this.getSearchContainerRect(n).width),isFullWidth:this.isPhoneState()};this.fireSearchSizeChanged(m);}else if(this.getSearchState()==this.SearchState.COL){q(o).addClass("sapUshellShellSearchHidden");}var p=this.getModel();if(p&&p.getProperty("/enableHelp")){q('#actionsBtn').addClass('help-id-actionsBtn');q('#configBtn').addClass('help-id-configBtn');q('#homeBtn').addClass('help-id-homeBtn');}this.attachAccessKeyHander(this._accessKeyHandler);};j.prototype.onThemeChanged=function(){this.invalidate();};j.prototype._getLogo=function(){return this.getLogo()||T._getThemeImage(null,true);};j.prototype._handleSearchSizeChanged=function(){var k;if(this.getSearchState()==this.SearchState.COL){return;}else if(this.getSearchState()==this.SearchState.EXP){k=s;this._handleExpSearchState(k);}else if(this.getSearchState()==this.SearchState.EXP_S){k=this._handleExpSSearchState();this._setSearchContainerMaxSize(k);}var m={remSize:this._convertPxToRem(this.getSearchContainerRect(k).width),isFullWidth:this.isPhoneState()};this.fireSearchSizeChanged(m);};j.prototype._refresh=function(){var u=this.getUser();if(u){u._refreshImage();u._checkAndAdaptWidth(!!this.getSearch());}if(!this.hasStyleClass("sapUshellShellHideLogo")){this._saveLogoWidth();}this._setMaxWidthForAppTitleAndTitle();if(this.getSearchState()!=this.SearchState.COL){this._adjustHeaderWithSearch();}this._saveSearchPhoneStateThreshold();};j.prototype._saveLogoWidth=function(){var o=this.$("hdr-begin").find(".sapUshellShellIco");if(o){i=parseInt(o.css("padding-left"),10);a=parseInt(o.css("padding-right"),10);L=this.$("icon")[0].getBoundingClientRect().width;}};j.prototype._convertPxToRem=function(p){var r=parseFloat(T.get("sapUiFontSize"));return p/r;};j.prototype._convertRemToPx=function(r){var k=parseFloat(T.get("sapUiFontSize"));return r*k;};j.prototype._setMaxWidthForAppTitleAndTitle=function(){this._setMaxWidthForAppTitle();if(this.isLSize()){this._setMaxWidthForTitle();}else{this._setAppTitleFontSize();}};j.prototype._setMaxWidthForAppTitle=function(){var k=this.$("hdr-appTitle");var m=this.$("hdr-appTitle").find(".sapUshellHeadTitle");if(!k.length){return;}m.removeClass('sapUshellHeadTitleWithSmallerFontSize');k.css({'max-width':'none'});var o=this._calcCenterWidth();var t=0;if(this.isLSize()){var p=this.$("hdr-title");if(p.length){t=p[0].getBoundingClientRect().width;}}var P=this.isSSize()?d:M;var w=this._convertPxToRem(o-t)-2*P;var r=k.find('.sapUshellShellHeadAction');var u=r.length?A+1.5:A;if(w<u){w=u;}k.css({'max-width':w+"rem"});};j.prototype._calcCenterWidth=function(){var k=this.$("hdr-appTitle")[0].getBoundingClientRect();var m=this.$("hdr-begin")[0].getBoundingClientRect();var o=this.$("hdr-end")[0].getBoundingClientRect();var p;if(this._isOverlapping(m,k)||this._isOverlapping(k,o)){var r=m.width;var t=o.width;var u=this.$()[0].getBoundingClientRect().width;p=u-2*Math.max(r,t);}else{var v=this.$("hdr-center");var p=v[0].getBoundingClientRect().width;}return p;};j.prototype._setMaxWidthForTitle=function(){var k=this.$("hdr-title");if(!k.length){return;}k.css({'max-width':h+"rem",'opacity':1});var m=this.$("hdr-appTitle");if(!m||!m[0]){return;}var r=this._isOverlapping(k[0].getBoundingClientRect(),m[0].getBoundingClientRect(),M,false);if(r){var t=k[0].getBoundingClientRect().width;var o=this._convertPxToRem(t-r);if(o<g){k.css({'opacity':0});}else{k.css({'max-width':o+"rem"});}}};j.prototype._setAppTitleFontSize=function(){var o=this.$("hdr-appTitle").find(".sapUshellHeadTitle");if(o&&o[0]){var k=o[0].scrollWidth;var m=o[0].clientWidth;if(k>m){o.addClass('sapUshellHeadTitleWithSmallerFontSize');}}};j.prototype._adjustHeaderWithSearch=function(k){var m=this.$("hdr-appTitle");if(!m.length||m.css('opacity')=="0"||m.css('display')=="none"){return;}var o=m[0].getBoundingClientRect();var p;if(k){p=this.getSearchContainerRect(k);}else{var r=this.$("hdr-search-container");p=this.getSearchContainerRect(parseFloat(r.get(0).style.maxWidth));}var O=this._isOverlapping(o,p,e,true);if(!O){return;}else if(O){var t=o.width;m.css({'max-width':this._convertPxToRem(t-O)+"rem"});}};j.prototype.setAppTitle=function(o){o.attachTextChanged(this._handleAppTitleChange,this);this.setAggregation("appTitle",o,true);};j.prototype.removeAppTitle=function(o){o.detachedTextChanged(this._handleAppTitleChange);this.removeAggregation("appTitle");};j.prototype._handleAppTitleChange=function(){if(!this.getDomRef()){return;}if(this.getSearchState()!=this.SearchState.COL){this._setMaxWidthForAppTitleAndTitle();this._handleSearchSizeChanged();}};j.prototype.setTitleControl=function(t,o){this.oTitle=this.oTitle||sap.ui.getCore().byId("shellTitle");if(this.oTitle){this.oTitle.destroy();}this.oTitle=new S("shellTitle",{text:t,icon:I.getIconURI("overflow")});this.oTitle.setInnerControl(o);this.setTitle(this.oTitle);};j.prototype.removeHeadItem=function(v){if(typeof v==='number'){v=this.getHeadItems()[v];}this.removeAggregation('headItems',v);};j.prototype.addHeadItem=function(o){this.addAggregation('headItems',o);};j.prototype.isPhoneState=function(){var k=D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD).name;var E=true;var H=this.$().width();if(H<=b){E=false;}return(D.system.phone||k=="Phone"||!E);};j.prototype.isLSize=function(){var k=D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD).name;return(k=="Desktop");};j.prototype.isSSize=function(){var k=D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD).name;return(D.system.phone||k=="Phone");};j.prototype.getSearchContainerRect=function(m){var k=q("<div> </div>").css("max-width",m+"rem");var o=q("<div></div>").append(k).insertAfter(this.$("hdr-search-container"));k.addClass('sapUshellShellSearch');var t=k[0].getBoundingClientRect();o.remove();return t;};j.prototype.setSearchState=function(k,m,w){if(typeof k!=="string"||!this.SearchState.hasOwnProperty(k)){return;}this.requiredRemSize=m;this.setProperty('searchState',k,false);var o;if(k===this.SearchState.COL){o=this._handleColSearchState(true);}else if(k===this.SearchState.EXP){this.bWithOverlay=(w===false)?false:true;o=this._handleExpSearchState(m,true);}else if(k==this.SearchState.EXP_S){this.bWithOverlay=(w===true)?true:false;o=this._handleExpSSearchState(m,true);}this._setSearchContainerMaxSize(o,true);};j.prototype.getSearchAvailableSize=function(){var k=this._convertPxToRem(this._getSizeToAppTitle());var m=k-this._getMinPaddingRemSize();return(m>=0?m:0);};j.prototype._getSizeToAppTitle=function(){var o=this.$("hdr-center");var k=o[0];var m=this.$("hdr-appTitle").find(".sapUshellAppTitle");var p=m[0];var r;if(this._rtl){r=p?p.getBoundingClientRect().left-k.getBoundingClientRect().left:this._getSizeToTitle();}else{r=p?k.getBoundingClientRect().right-p.getBoundingClientRect().right:this._getSizeToTitle();}return r;};j.prototype._getSizeToTitle=function(){var o=this.$("hdr-center");var k=o[0];var t=this.$("hdr-title").find(".sapUshellHeadTitle");var m=t[0];var p;if(this._rtl){p=m?m.getBoundingClientRect().left-k.getBoundingClientRect().left:this._getSizeToLogo();}else{p=m?k.getBoundingClientRect().right-m.getBoundingClientRect().right:this._getSizeToLogo();}return p;};j.prototype._getSizeToLogo=function(){var o=this.$("hdr-center");var k=o[0];var m=k.getBoundingClientRect().width+this._getSearchButtonWidth();var p=this.$("hdr-begin").find(".sapUshellShellIco");var r=p[0];var t=false;if(this.hasStyleClass("sapUshellShellHideLogo")){t=true;}if(r&&t){var u=this._rtl?a:i;return m-L-u;}else{var u=this._rtl?i:a;return m+u;}};j.prototype._getMaxSize=function(){var o=this.$("hdr-center");var k=o[0];var m=this.$("hdr-begin").find(".sapUshellShellIco");var p=m[0];var r=false;if(this.hasStyleClass("sapUshellShellHideLogo")){r=true;}var t;if(p&&!r){var u=this._rtl?i:a;t=L+u;}else{t=0;}var v=k.getBoundingClientRect().width+this._getSearchButtonWidth()+t;return v;};j.prototype._getSearchButtonWidth=function(){var o=this.getHeadEndItems()[0];if(o&&o.getVisible()){var k=o.getDomRef();var m=k.getBoundingClientRect().width;return m;}return 0;};j.prototype._handleColSearchState=function(k){var m=this.getShellLayoutControl();if(m){m.removeStyleClass(c);}this.removeStyleClass(c);this.removeStyleClass("sapUshellShellHideLogo");this.removeStyleClass("sapUshellShellHideSubtitle");this.removeStyleClass("sapUshellShellHideAppTitle");if(this.isPhoneState()){return this._handleColSearchStatePhone();}return 0;};j.prototype._handleExpSearchState=function(r,k){var m=this.getShellLayoutControl();if(m){m.toggleStyleClass(c,this.bWithOverlay);}this.toggleStyleClass(c,this.bWithOverlay);if(this.isPhoneState()){this._handleExpAndExpSSearchStatePhone();return r;}else{return this._handleExpSearchStateLargeScreen(r,k);}};j.prototype._handleExpSearchStateLargeScreen=function(r,k){var m;this.removeStyleClass("sapUshellShellHideForPhone");var o=this._convertPxToRem(this._getMaxSize());var p=this._convertPxToRem(this._getSizeToTitle());var t=this._convertPxToRem(this._getSizeToAppTitle());var u=this._convertPxToRem(this._getSizeToLogo());if(r>o){this.addStyleClass("sapUshellShellHideLogo");this.addStyleClass("sapUshellShellHideSubtitle");this.addStyleClass("sapUshellShellHideAppTitle");m=o;}else if(r>u-this._getMinPaddingRemSize()){this.addStyleClass("sapUshellShellHideLogo");this.addStyleClass("sapUshellShellHideSubtitle");this.addStyleClass("sapUshellShellHideAppTitle");m=r;}else if(r>p-this._getMinPaddingRemSize()){this.addStyleClass("sapUshellShellHideSubtitle");this.addStyleClass("sapUshellShellHideAppTitle");this.removeStyleClass("sapUshellShellHideLogo");m=r;}else if(r>t-this._getMinPaddingRemSize()){this.addStyleClass("sapUshellShellHideAppTitle");this.removeStyleClass("sapUshellShellHideSubtitle");this.removeStyleClass("sapUshellShellHideLogo");m=r;}else{this.removeStyleClass("sapUshellShellHideAppTitle");this.removeStyleClass("sapUshellShellHideSubtitle");this.removeStyleClass("sapUshellShellHideLogo");m=r;}return m;};j.prototype._handleExpSSearchState=function(r,k){var m=this.getShellLayoutControl();if(m){m.toggleStyleClass(c,this.bWithOverlay);}this.toggleStyleClass(c,this.bWithOverlay);if(this.isPhoneState()){this._handleExpAndExpSSearchStatePhone();return r;}else{var o=this._handleExpSSearchStateLargeScreen(r,k);if(o>this.requiredRemSize){o=this.requiredRemSize;}return o;}};j.prototype._handleExpSSearchStateLargeScreen=function(r,k){var m;this.removeStyleClass("sapUshellShellHideForPhone");var o=this._convertPxToRem(this._getSizeToAppTitle());if(o-this._getMinPaddingRemSize()<f){o=f+this._getMinPaddingRemSize();}if(!r){r=o;}if(r>o-this._getMinPaddingRemSize()){m=o-this._getMinPaddingRemSize();}else{m=r;}this.removeStyleClass("sapUshellShellHideLogo");this.removeStyleClass("sapUshellShellHideSubtitle");this.removeStyleClass("sapUshellShellHideAppTitle");return m;};j.prototype._handleExpAndExpSSearchStatePhone=function(){this.addStyleClass("sapUshellShellHideForPhone");};j.prototype._handleColSearchStatePhone=function(){this.removeStyleClass("sapUshellShellHideForPhone");return 0;};j.prototype._setSearchContainerMaxSize=function(k,m){if(!m){var o=this.$("hdr-search-container");o.css("max-width",k+"rem");s=n=k;}else{n=k;}this._adjustHeaderWithSearch(k);};j.prototype._getMinPaddingRemSize=function(){if(this._convertPxToRem(this._getSizeToAppTitle())<f){return e;}else{return M;}};j.prototype._saveSearchPhoneStateThreshold=function(){if(this.hasStyleClass("sapUshellShellHideForPhone")){return;}var k=this.getSearchAvailableSize();if(k==0){k=-e;}var m=this._maxRemToRemoveFromAppTitle();if(k+m<f){var H=this.$().width();b=H+this._convertRemToPx(f-k-m);}return b;};j.prototype._maxRemToRemoveFromAppTitle=function(){var k=this.$("hdr-appTitle");var m=k.find(".sapUshellHeadTitle");if(!k.length||!m.length){return 0;}var o=this._convertPxToRem(m[0].getBoundingClientRect().width);var p=(o-A)>0?(o-A):0;return p;};j.prototype._isOverlapping=function(k,m,p,P){if(!p){p=0;}if(this._rtl){var o=k.left;var r=m.right;if(P){o=o-this._convertRemToPx(p);}else{r=r+this._convertRemToPx(p);}if(o<r){return r-o;}}else{var t=k.right;var u=m.left;if(P){t=t+this._convertRemToPx(p);}else{u=u-this._convertRemToPx(p);}if(u<t){if(k.bottom>m.top&&k.bottom<m.bottom){return t-u;}}}return 0;};j.prototype.getSearchMaxWidth=function(){return s;};return j;},true);
