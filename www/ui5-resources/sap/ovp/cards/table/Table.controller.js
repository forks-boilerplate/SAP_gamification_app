sap.ui.define(["sap/ovp/cards/generic/Card.controller","jquery.sap.global","sap/ovp/cards/OVPCardAsAPIUtils","sap/ovp/cards/CommonUtils"],function(C,q,O,a){"use strict";return C.extend("sap.ovp.cards.table.Table",{onInit:function(){C.prototype.onInit.apply(this,arguments);},onColumnListItemPress:function(e){if(O.checkIfAPIIsUsed(this)){a.onContentClicked(e);}else{var n=this.getEntityNavigationEntries(e.getSource().getBindingContext(),this.getCardPropertiesModel().getProperty("/annotationPath"));this.doNavigation(e.getSource().getBindingContext(),n[0]);}},onContactDetailsLinkPress:function(e){var p,s,b;s=e.getSource();p=s.getParent().getAggregation("items")[0];b=s.getBindingContext();if(!b){return;}p.bindElement(b.getPath());p.openBy(s);},getCardItemsBinding:function(){var t=this.getView().byId("ovpTable");return t.getBinding("items");},onAfterRendering:function(){C.prototype.onAfterRendering.apply(this,arguments);var c=this.getOwnerComponent().getComponentData();var o=this.getCardPropertiesModel();if(!O.checkIfAPIIsUsed(this)&&o.getProperty("/layoutDetail")==="resizable"){var b=this.oDashboardLayoutUtil.dashboardLayoutModel.getCardById(c.cardId);var h=this.getHeaderHeight();var s=this.oDashboardLayoutUtil.getCardDomId(c.cardId);var e=document.getElementById(s);if(!b.dashboardLayout.autoSpan){e.getElementsByClassName('sapOvpWrapper')[0].style.height=((b.dashboardLayout.rowSpan*this.oDashboardLayoutUtil.ROW_HEIGHT_PX)+1-(h+2*this.oDashboardLayoutUtil.CARD_BORDER_PX))+"px";}if(b.dashboardLayout.showOnlyHeader){e.classList.add("sapOvpMinHeightContainer");}this.addColumnInTable(q(e),{colSpan:b.dashboardLayout.colSpan});}else{var t=this.getView().byId("ovpTable");var A=t.getAggregation("columns");for(var i=0;i<3;i++){if(A[i]){A[i].setStyleClass("sapTableColumnShow").setVisible(true);}}}},getCardItemBindingInfo:function(){var l=this.getView().byId("ovpTable");return l.getBindingInfo("items");},addColumnInTable:function($,c){if(c.colSpan>=1){if(q($).find("tr").length!=0){var t=sap.ui.getCore().byId(q($).find(".sapMList").attr("id"));var b=t.getAggregation("columns");var d=c.colSpan;var I=d+1;for(var i=0;i<6;i++){if(b[i]){if(i<=I){b[i].setStyleClass("sapTableColumnShow").setVisible(true);}else{b[i].setStyleClass("sapTableColumnHide").setVisible(false);}}}}}},resizeCard:function(n,c){var N,A,h,A;try{var $=document.getElementById(this.oDashboardLayoutUtil.getCardDomId(this.cardId)),b=this.getCardItemBindingInfo(),H=this.getHeaderHeight(),o=this.getView().byId('ovpCardContentContainer').getDomRef();if(n.showOnlyHeader){o.classList.add('sapOvpContentHidden');N=0;}else{o.classList.remove('sapOvpContentHidden');h=H+c.dropDownHeight;A=(n.rowSpan*n.iRowHeightPx)-h-c.itemHeight;N=Math.abs(Math.floor(A/c.itemHeight));$.style.height=n.rowSpan*n.iRowHeightPx+'px';}o.style.height=(n.rowSpan*n.iRowHeightPx)-(H+2*n.iCardBorderPx)+"px";this.addColumnInTable(this.getView().$(),n);if(N!==b.length){b.length=N;n.noOfItems=b.length;this.getCardItemsBinding().refresh();}}catch(e){q.sap.log.warning("OVP resize: "+this.cardId+" catch "+e.toString());}}});});
