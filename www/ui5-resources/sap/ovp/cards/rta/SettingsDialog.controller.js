sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ovp/cards/OVPCardAsAPIUtils","sap/ovp/cards/SettingsUtils","sap/ovp/cards/PayLoadUtils","sap/m/Text","sap/ui/comp/valuehelpdialog/ValueHelpDialog","sap/ovp/cards/rta/SettingsDialogConstants","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/ChangeReason","sap/m/Label","sap/ui/core/Icon","sap/m/Image","sap/m/Column","sap/m/ColumnListItem","sap/m/Table","sap/m/ListMode","sap/m/ToolbarSpacer","sap/m/SearchField","sap/ovp/cards/linklist/AnnotationHelper","sap/ovp/cards/AnnotationHelper","sap/m/Toolbar","sap/ui/core/IconPool","sap/m/IconTabBar","sap/m/IconTabFilter","sap/ui/core/mvc/ViewType","sap/m/Dialog","sap/m/Button","sap/ovp/cards/CommonUtils","sap/ui/Device"],function(q,C,J,O,s,P,T,V,S,M,F,a,b,L,I,c,d,e,f,g,h,k,l,m,n,o,p,r,t,D,B,u,v){"use strict";return C.extend("sap.ovp.cards.rta.SettingsDialog",{_oCardManifestSettings:{},_aRefreshNotRequired:S._aRefreshNotRequired,_aRefreshRequired:S._aRefreshRequired,oOvpResourceBundle:sap.ui.getCore().getLibraryResourceBundle("sap.ovp"),onInit:function(){s.oSaveButton.attachPress(this.onSaveButtonPress,this);s.oResetButton.attachPress(this.onResetButton,this);s.oMessagePopOverButton.attachPress(this.handleMessagePopoverPress,this);},onAfterRendering:function(){s.dialogBox.addStyleClass("sapOvpSettingsDialogBox");this.setEnablePropertyForResetAndSaveButton(false);this._oCardManifestSettings=this.getView().getModel().getData();this._oOriginalCardManifestSettings=q.extend(true,{},this._oCardManifestSettings);var i=this.getView(),j=i.getModel(),w=i.byId("dialogCard");if(!w.getVisible()){w=i.byId("dialogCardNoPreview");}w.getDomRef().style.minHeight=this._oCardManifestSettings.dialogBoxHeight+"px";i.byId("dialogCardOverlay").getDomRef().style.minHeight=this._oCardManifestSettings.dialogBoxHeight+"px";s.settingFormWidth(i,"calc(100% - "+(this._oCardManifestSettings.dialogBoxWidth+1)+"rem)");setTimeout(function(){var w=this.getView().byId("dialogCard");if(w.getVisible()){w.setBusy(false);}}.bind(this),2000);if(this._oCardManifestSettings.staticContent){this.handleErrorHandling(j,"title","/staticContent");this.handleErrorHandling(j,"targetUri","/staticContent");}},validateInputField:function(E){var i=E.getSource();var j=i.getValue().trim().length;if(!j){i.setValue(i.getValue().trim());}this.updateCard(E);},addView:function(E){this.setEnablePropertyForResetAndSaveButton(true);var i,j=this._oCardManifestSettings,w=this.getView().getModel();if(j.dataPointAnnotationPath&&j.dataPoint&&j.dataPoint.length){i=j.dataPoint[0].value;}if(j.tabs&&j.tabs.length){j.newViewCounter++;if(j.template==="sap.ovp.cards.charts.analytical"||j.template==="sap.ovp.cards.charts.smart.chart"){j.tabs.push({chartAnnotationPath:j.chart[0].value,dataPointAnnotationPath:i,value:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" "+j.newViewCounter)});}else{j.tabs.push({annotationPath:j.lineItem[0].value,dataPointAnnotationPath:i,value:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" "+j.newViewCounter)});}var x=j.tabs.length;j.aViews.push({text:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" "+j.newViewCounter),key:x,isLaterAddedView:true,isViewResetEnabled:false});this.selectViewSwitch(E,x);}else{j.tabs=[{}];S.tabFields.forEach(function(y){j.tabs[0][y]=j[y];});j.tabs[0].value=this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" 1");if(j.template==="sap.ovp.cards.charts.analytical"||j.template==="sap.ovp.cards.charts.smart.chart"){j.tabs.push({chartAnnotationPath:j.chart[0].value,dataPointAnnotationPath:i,value:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" 2")});}else{j.tabs.push({annotationPath:j.lineItem[0].value,dataPointAnnotationPath:i,value:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" 2")});}j.selectedKey=1;j.defaultViewSelected=1;j.aViews=[{text:this.oOvpResourceBundle&&this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_MAIN_VIEW"),key:0,isLaterAddedView:false,isViewResetEnabled:false},{text:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" 1 ("+this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_DEFAULT_VIEW")+")"),key:1,initialSelectedKey:1,isLaterAddedView:false,isViewResetEnabled:false},{text:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" 2"),key:2,isLaterAddedView:true,isViewResetEnabled:false}];j.newViewCounter=2;this.selectViewSwitch(E,1);}this.handleErrorHandling(w,"value","/tabs");},deleteView:function(E){this.setEnablePropertyForResetAndSaveButton(true);var i=this._oCardManifestSettings,j=parseInt(i.selectedKey,10),w=this.getView().getModel();i.tabs.splice(j-1,1);i.aViews.splice(j,1);if(j===i.defaultViewSelected){i.defaultViewSelected=1;i.aViews[j].text=i.aViews[j].text+" ("+this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_DEFAULT_VIEW")+")";}i.aViews.forEach(function(x,y){if(y>=j){x.key--;}});this.handleErrorHandling(w,"value","/tabs");if(i.tabs.length==1){S.tabFields.forEach(function(x){i[x]=i.tabs[0][x];});delete i.selectedKey;delete i.defaultViewSelected;delete i.tabs;delete i.aViews;i.aViews=[{text:this.oOvpResourceBundle.getText("OVP_KEYUSER_SHOWS_DIFFERENT_VIEWS"),key:0,initialSelectedKey:0,isLaterAddedView:false,isViewResetEnabled:false}];s.addManifestSettings(i);s.setVisibilityForFormElements(i);this.getView().getModel("visibility").refresh();this.getView().getModel().refresh();this._fCardWithRefresh();}else{i.selectedKey=1;this.selectViewSwitch(E,i.selectedKey);}},resetView:function(){var i=this._oCardManifestSettings,j=this.getView().getModel(),w=parseInt(i.selectedKey,10),x=i.aViews[w],y=i.defaultViewSelected;if(!x.isLaterAddedView){var z=i.dataPointAnnotationPath?true:false,A=this._oOriginalCardManifestSettings.dataPointAnnotationPath?true:false;if(w){var E=i.aViews[w].initialSelectedKey;S.tabFields.forEach(function(H){if(H!=="dataPointAnnotationPath"||z){if(this._oOriginalCardManifestSettings.tabs&&this._oOriginalCardManifestSettings.tabs.length){i[H]=this._oOriginalCardManifestSettings.tabs[E-1][H];}else{i[H]=this._oOriginalCardManifestSettings[H];}i.tabs[w-1][H]=i[H];}}.bind(this));if(!this._oOriginalCardManifestSettings.tabs||!this._oOriginalCardManifestSettings.tabs.length){i.newViewCounter++;i.tabs[w-1].value=this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" "+i.newViewCounter);}if(w===i.defaultViewSelected){i.aViews[w].text=i.tabs[w-1].value+" ("+this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_DEFAULT_VIEW")+")";}else{i.aViews[w].text=i.tabs[w-1].value;}}else{S.mainFields.forEach(function(H){i[H]=this._oOriginalCardManifestSettings[H];}.bind(this));if(z!==A){if(A){i.tabs.forEach(function(H){if(H.prevDataPointAnnotationPath){H.dataPointAnnotationPath=H.prevDataPointAnnotationPath;}else{H.dataPointAnnotationPath=i.dataPoint[0].value;}});i.dataPointAnnotationPath=i.tabs[y].dataPointAnnotationPath;}else{i.tabs.forEach(function(H){H.prevDataPointAnnotationPath=H.dataPointAnnotationPath;H.dataPointAnnotationPath=undefined;});}}}}else{var G;if(i.dataPointAnnotationPath){G=i.dataPoint[0].value;}i.newViewCounter++;if(i.template==="sap.ovp.cards.charts.analytical"||i.template==="sap.ovp.cards.charts.smart.chart"){i.tabs[w-1]={chartAnnotationPath:i.chart[0].value,dataPointAnnotationPath:G,value:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" "+i.newViewCounter)};}else{i.tabs[w-1]={annotationPath:i.lineItem[0].value,dataPointAnnotationPath:G,value:this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" "+i.newViewCounter)};}if(w===i.defaultViewSelected){i.aViews[w].text=this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" "+i.newViewCounter+" ("+this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_DEFAULT_VIEW")+")");}else{i.aViews[w].text=this.oOvpResourceBundle&&(this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_VIEW_NAME")+" "+i.newViewCounter);}S.tabFields.forEach(function(H){i[H]=i.tabs[w-1][H];});}this.handleErrorHandling(j,"value","/tabs");i.isViewResetEnabled=false;i.aViews[w].isViewResetEnabled=false;s.addManifestSettings(i);s.setVisibilityForFormElements(i);this.getView().getModel("visibility").refresh();this.getView().getModel().refresh();this._fCardWithRefresh();},selectViewSwitch:function(E,i){var j=this._oCardManifestSettings,w=this.getView().getModel();if(!i){i=E.getSource().getSelectedIndex();}if(this.defaultViewSwitch){this.defaultViewSwitch.setEnabled(true);}this.setEnablePropertyForResetAndSaveButton(true);if(!i){var x=j.defaultViewSelected;j.selectedKey=i;j.mainViewSelected=true;j.isViewResetEnabled=j.aViews[i].isViewResetEnabled;S.tabFields.forEach(function(A){j[A]=j.tabs[x-1][A];});this.handleErrorHandling(w,"value","/tabs");s.addManifestSettings(j);s.setVisibilityForFormElements(j);this.getView().getModel("visibility").refresh();this.getView().getModel().refresh();this._fCardWithRefresh();}else{j.mainViewSelected=false;j.isViewResetEnabled=j.aViews[i].isViewResetEnabled;var y=this.getView().byId("dialogCard");if(y.getVisible()){var R=y.getComponentInstance().getRootControl();var z=R.getController();z.changeSelection(i,true,j);this.handleErrorHandling(w,"value","/tabs");s.addManifestSettings(j);s.setVisibilityForFormElements(j);this.getView().getModel("visibility").refresh();this.getView().getModel().refresh();}}},setCurrentActivePageForCarouselCard:function(i){var j=this.getView().byId("dialogCard");if(j.getVisible()){var w=j.getComponentInstance(),R=w.getRootControl(),x=R.byId("pictureCarousel");if(x){var y=x.getPages(),z=y[i];x.setActivePage(z);}}},onSelectionChange:function(E){var j=E.getSource(),w=j.getModel(),x=w.getData().staticContent,y=j.getSelectedItem(),z=y.getBindingContext().getObject(),A=j.getModel("visibility");for(var i=0;i<x.length;i++){if(x[i].id===z.id){A.setProperty("/moveToTheTop",!(x.length===1||i===0));A.setProperty("/moveUp",!(x.length===1||i===0));A.setProperty("/moveDown",!(x.length===1||i===(x.length-1)));A.setProperty("/moveToTheBottom",!(x.length===1||i===(x.length-1)));A.setProperty("/delete",true);w.setProperty("/selectedItemIndex",i);A.refresh(true);if(E.getParameter("listItem")){this.setCurrentActivePageForCarouselCard(i);}break;}}},handleErrorForProperty:function(i,j,w){i.firePropertyChange({context:i.getContext(w?w:"/"),path:j,value:i.getProperty(w?(w+"/"+j):j),reason:b.Change});},handleErrorHandling:function(j,w,x){var y=j.getProperty(x);j.firePropertyChange({context:j.getContext(x),path:x+","+w,value:j.getProperty(x),reason:b.Change});for(var i=0;i<y.length;i++){var z=x+"/"+i;j.firePropertyChange({context:j.getContext(z),path:w,value:j.getProperty(z+"/"+w),reason:b.Change});}},setEnablePropertyForResetAndSaveButton:function(E){s.enableResetButton(E);s.enableSaveButton(E);},getValueInRemString:function(i){return i+"rem";},_getSelectedItemIndex:function(i){return i.getProperty("/selectedItemIndex");},_getLastItemIndex:function(i){return this._getStaticContentArray(i).length-1;},_getStaticContentArray:function(i){return i.getProperty("/staticContent");},_setStaticContentArray:function(i,j){i.setProperty("/staticContent",j);},_setSelectedItemAndScrollToElement:function(i,H){var j=this.getView(),w=j.byId("sapOvpStaticLinkListLineItem"),x=j.byId("scrollContainer"),y=j.getModel();this.handleErrorHandling(y,"title","/staticContent");this.handleErrorHandling(y,"targetUri","/staticContent");var z=w.getItems()[i];if(H){this._oList=w;this._oItem=z;this._oScrollContainer=x;var A={onAfterRendering:function(E){this._oList.removeEventDelegate(this._oDelegateOnAfter);this._oScrollContainer.scrollToElement(this._oItem);delete this._oDelegateOnAfter;delete this._oList;delete this._oScrollContainer;delete this._oItem;}};this._oDelegateOnAfter=A;w.addEventDelegate(A,this);}else{x.scrollToElement(z);}w.setSelectedItem(z);w.fireSelectionChange();},_arrangeStaticContent:function(i,j,w){var x=this._getStaticContentArray(i);x.splice(w,0,x.splice(j,1)[0]);this._setStaticContentArray(i,x);this._setSelectedItemAndScrollToElement(w);},getIndexFromIdForStaticLinkList:function(i){var j=i.split("-");return j[j.length-1];},_getImageData:function(){var i=[];i.push({"Name":"AW.png","Image":l.formUrl(this.getView().getModel().getProperty("/baseUrl"),"img/AW.png")});return i;},_getIconData:function(j){var w=o.getIconNames(),x=[];if(j){var N=j.split("://")[1],y=w.indexOf(N);w.splice(y,1);x.push({"Name":N,"Icon":o.getIconURI(N)});}for(var i=0;i<w.length;i++){x.push({"Name":w[i],"Icon":o.getIconURI(w[i])});}return x;},_getLinkListItemId:function(i,j){return i.getProperty("/staticContent/"+j+"/index");},_makeLinkListItemId:function(i){return"linkListItem--"+i;},_makeLinkListItemIndex:function(i){return"Index--"+i;},getIconAndImageDataModel:function(i){var j=this._getIconData(i),w=this._getImageData();return new J({"Icons":j,"Images":w,"NoOfIcons":j.length,"NoOfImages":w.length});},destroyTemplatesAndObjects:function(){var i=this.getView();var j=i.byId("tableFilterImage");if(j){j.destroy();}var w=i.byId("tableFilter");if(w){w.destroy();}var x=i.byId("tableFilterLinks");if(x){x.destroy();}delete this._oEvent;delete this._iCurrentRow;delete this._oModel;delete this._oVisibilityModel;delete this._oIconsDialogContentView;delete this._oLinksDialogContentView;delete this._oLineItemDialogContentView;},onExternalUrlChange:function(E){this.setEnablePropertyForResetAndSaveButton(true);},onLinkSourceChange:function(E){var i=E.getSource(),j=i.getModel(),w=i.getModel("visibility"),x=this.getIndexFromIdForStaticLinkList(i.getId()),y=E.getParameter("selectedIndex"),z=w.getProperty("/staticLink"),A=w.getProperty("/links"),G=this._getLinkListItemId(j,parseInt(x,10));if(y===0){z[G]=false;A[G]=true;j.setProperty("/staticContent/"+x+"/targetUri",undefined);}else{z[G]=true;A[G]=false;j.setProperty("/staticContent/"+x+"/semanticObject",undefined);j.setProperty("/staticContent/"+x+"/action",undefined);j.setProperty("/staticContent/"+x+"/targetUri","");}w.setProperty("/staticLink",z);w.setProperty("/links",A);w.refresh(true);j.refresh(true);this.handleErrorForProperty(j,"targetUri","/staticContent/"+x);this.setEnablePropertyForResetAndSaveButton(true);},onRemoveVisualPress:function(E){var i=E.getSource(),j=i.getModel(),w=i.getModel("visibility"),x=this.getIndexFromIdForStaticLinkList(i.getId()),y=this._getLinkListItemId(j,parseInt(x,10)),R=w.getProperty("/removeVisual");R[y]=false;w.setProperty("/removeVisual",R);w.refresh(true);j.setProperty("/staticContent/"+x+"/imageUri",undefined);j.refresh(true);this.updateCard(E,"sapOvpSettingsStaticLinkListRemoveVisual");},createValueHelpDialogForInternalUrl:function(E){var i=E.getSource(),j=i.getModel(),w=i.getModel("staticCardProperties"),x=i.getModel("visibility"),y=this.getIndexFromIdForStaticLinkList(i.getId());this.attachBrowserHeightChangeHandler();this._oEvent=q.extend({},E);this._iCurrentRow=y;this._oModel=j;this._oVisibilityModel=x;var z=new B("linksCancelBtn",{text:this.oOvpResourceBundle&&this.oOvpResourceBundle.getText("cancelBtn")});this.linksDialog=new D({title:this.oOvpResourceBundle&&this.oOvpResourceBundle.getText("OVP_KEYUSER_SELECT_APPLICATION_DIALOG"),buttons:[z]}).addStyleClass("sapOvpSettingsDialogBox");w.setProperty("/densityStyle",this.getDensityStyle());w.setProperty("/NoOfLinks",w.getProperty("/links").length);var A=new sap.ui.view("linksDialogContent",{viewName:"sap.ovp.cards.rta.SelectLinks",type:t.XML,preprocessors:{xml:{bindingContexts:{tableRows:w.createBindingContext("/")},models:{tableRows:w}}}});A.setModel(w);A.setModel(this.getView().getModel("ovpResourceModel"),"ovpResourceModel");this.linksDialog.addContent(A);A.loaded().then(function(G){this._oLinksDialogContentView=G;G.getController().updateLinkPath=function(H){var K=H.slice(1).split("-"),N=K[0],Q=K[1];this._oModel.setProperty("/staticContent/"+this._iCurrentRow+"/semanticObject",N);this._oModel.setProperty("/staticContent/"+this._iCurrentRow+"/action",Q);this._oModel.refresh(true);this.setEnablePropertyForResetAndSaveButton(true);this.cleanAndCloseDialog(z);}.bind(this);z.attachPress(function(){this.cleanAndCloseDialog(z);}.bind(this));this.linksDialog.open();setTimeout(function(){this.browserHeightChange();}.bind(this),0);}.bind(this));},onChangeVisualPress:function(E){var i=E.getSource(),j=i.getModel(),w=i.getModel("visibility"),x=this.getIndexFromIdForStaticLinkList(i.getId()),y=j.getProperty("/staticContent/"+x+"/imageUri"),N=l.isImageUrlStaticData(y);this.attachBrowserHeightChangeHandler();this._oEvent=q.extend({},E);this._iCurrentRow=x;this._oModel=j;this._oVisibilityModel=w;var z=new B("iconsCancelBtn",{text:this.oOvpResourceBundle&&this.oOvpResourceBundle.getText("cancelBtn")});this.iconsDialog=new D({title:this.oOvpResourceBundle&&this.oOvpResourceBundle.getText("OVP_KEYUSER_SELECT_VISUAL_DIALOG"),buttons:[z]}).addStyleClass("sapOvpSettingsDialogBox");var R=(N)?this.getIconAndImageDataModel():this.getIconAndImageDataModel(y);R.setProperty("/densityStyle",this.getDensityStyle());var A=new sap.ui.view("iconsDialogContent",{viewName:"sap.ovp.cards.rta.SelectIcons",type:t.XML,preprocessors:{xml:{bindingContexts:{tableRows:R.createBindingContext("/")},models:{tableRows:R}}}});R.setProperty("/tableName","IconTable");A.setModel(R);A.setModel(this.getView().getModel("ovpResourceModel"),"ovpResourceModel");this.iconsDialog.addContent(A);A.loaded().then(function(G){this._oIconsDialogContentView=G;G.getController().updateIconPath=function(U){var H=this._getLinkListItemId(this._oModel,parseInt(this._iCurrentRow,10)),K=this._oVisibilityModel.getProperty("/removeVisual");K[H]=true;this._oVisibilityModel.setProperty("/removeVisual",K);this._oVisibilityModel.refresh(true);this._oModel.setProperty("/staticContent/"+this._iCurrentRow+"/imageUri",U);this._oModel.refresh(true);this.updateCard(this._oEvent,"sapOvpSettingsStaticLinkListChangeVisual");this.cleanAndCloseDialog(z);}.bind(this);z.attachPress(function(){this.cleanAndCloseDialog(z);}.bind(this));this.iconsDialog.open();setTimeout(function(){this.browserHeightChange();}.bind(this),0);}.bind(this));},getDensityStyle:function(){if(!v.support.touch){return"compact";}else{return"cozy";}},cleanAndCloseDialog:function(i){if(this._oIconsDialogContentView){this._oIconsDialogContentView.destroy();}if(this._oLinksDialogContentView){this._oLinksDialogContentView.destroy();}if(this._oLineItemDialogContentView){this._oLineItemDialogContentView.destroy();}this.destroyTemplatesAndObjects();if(this.iconsDialog){this.iconsDialog.close();}if(this.linksDialog){this.linksDialog.close();}if(this.lineItemDialog){this.lineItemDialog.close();}i.destroy();this.detachBrowserHeightChangeHandler();},attachBrowserHeightChangeHandler:function(){v.resize.attachHandler(this.browserHeightChange,this);},detachBrowserHeightChangeHandler:function(){v.resize.detachHandler(this.browserHeightChange,this);},browserHeightChange:function(i){var j,w,x;if(this.iconsDialog&&this._oIconsDialogContentView){j=this.iconsDialog;w=this._oIconsDialogContentView;x="iconsScrollContainer";}else if(this.linksDialog&&this._oLinksDialogContentView){j=this.linksDialog;w=this._oLinksDialogContentView;x="linksScrollContainer";}else if(this.lineItemDialog&&this._oLineItemDialogContentView){j=this.lineItemDialog;w=this._oLineItemDialogContentView;x="lineItemScrollContainer";}if(j&&w&&x){var y=j.getDomRef(),z=(i?(i.height*93)/100:s.dialogBox.getDomRef().getBoundingClientRect().height),A=y.getBoundingClientRect().height,H=Math.max(z,A)-(u.getPixelPerRem()*9),E=w.byId(x);E.setHeight(H+"px");}},handleMessagePopoverPress:function(E){s.oMessagePopOver.openBy(E.getSource());},onShowMorePress:function(E){var i=E.getSource(),j=i.getModel(),w=i.getModel("visibility"),x=this.getIndexFromIdForStaticLinkList(i.getId()),y=this._getLinkListItemId(j,parseInt(x,10)),z=w.getProperty("/showMore/"+y);if(z){w.setProperty("/showMore/"+y,false);}else{w.setProperty("/showMore/"+y,true);}w.refresh(true);},onPressDelete:function(E){this._oEvent=q.extend({},E);M.confirm("Do you want to delete the Line Item",{actions:[M.Action.OK,M.Action.CANCEL],icon:M.Icon.INFORMATION,title:"Information",initialFocus:M.Action.CANCEL,onClose:function(A){if(A==="OK"){var i=this._oEvent.getSource(),j=i.getModel("visibility"),w=i.getModel(),x=this._getStaticContentArray(w),y=this._getSelectedItemIndex(w),z=this._getLinkListItemId(w,y),G=j.getProperty("/staticLink"),H=j.getProperty("/links"),R=j.getProperty("/removeVisual"),K=j.getProperty("/showMore");delete G[z];delete H[z];delete R[z];delete K[z];j.setProperty("/staticLink",G);j.setProperty("/links",H);j.setProperty("/removeVisual",R);j.setProperty("/showMore",K);x.splice(y,1);this._setStaticContentArray(w,x);w.refresh(true);if(x.length>0){this._setSelectedItemAndScrollToElement(Math.min(parseInt(y,10),x.length-1),true);}if(x.length<=1){j.setProperty("/delete",false);}j.refresh(true);this.updateCard(this._oEvent,"sapOvpSettingsStaticLinkListDelete");}delete this._oEvent;}.bind(this)});},onPressAdd:function(E){var i=E.getSource(),j=i.getModel("visibility"),w=i.getModel(),x=this._getStaticContentArray(w),y=w.getProperty("/lineItemIdCounter"),z=this._makeLinkListItemId(y+1),A=this._makeLinkListItemIndex(y+1),G=j.getProperty("/staticLink"),H=j.getProperty("/links"),R=j.getProperty("/removeVisual"),K=j.getProperty("/showMore");w.setProperty("/lineItemIdCounter",y+1);x.unshift({"id":z,"index":A,"title":"Default Title","subTitle":"Default SubTitle","imageUri":"","imageAltText":"","targetUri":"","openInNewWindow":""});G[A]=true;H[A]=false;R[A]=false;K[A]=false;j.setProperty("/staticLink",G);j.setProperty("/links",H);j.setProperty("/removeVisual",R);j.setProperty("/showMore",K);j.refresh(true);this._setStaticContentArray(w,x);w.refresh(true);this._setSelectedItemAndScrollToElement(0);this.updateCard(E,"sapOvpSettingsStaticLinkListAdd");},onPressMoveToTheTop:function(E){var i=E.getSource().getModel();this._arrangeStaticContent(i,this._getSelectedItemIndex(i),0);this.updateCard(E,"sapOvpSettingsStaticLinkListSort");},onPressMoveUp:function(E){var i=E.getSource().getModel(),j=this._getSelectedItemIndex(i);this._arrangeStaticContent(i,j,j-1);this.updateCard(E,"sapOvpSettingsStaticLinkListSort");},onPressMoveDown:function(E){var i=E.getSource().getModel(),j=this._getSelectedItemIndex(i);this._arrangeStaticContent(i,j,j+1);this.updateCard(E,"sapOvpSettingsStaticLinkListSort");},onPressMoveToTheBottom:function(E){var i=E.getSource().getModel(),j=this._getSelectedItemIndex(i),w=this._getLastItemIndex(i);this._arrangeStaticContent(i,j,w);this.updateCard(E,"sapOvpSettingsStaticLinkListSort");},onResetButton:function(){this._oCardManifestSettings=q.extend(true,{},this._oOriginalCardManifestSettings);var i=this.getView().getModel();i.setProperty("/",this._oCardManifestSettings);s.setVisibilityForFormElements(this._oCardManifestSettings);this.getView().getModel("visibility").refresh();if(this._oCardManifestSettings.layoutDetail==="resizable"){if(this._oCardManifestSettings.stopResizing){this.getView().byId("sapOvpSettingsStopResize").setState(false);}else if(!this._oCardManifestSettings.stopResizing){this.getView().byId("sapOvpSettingsStopResize").setState(true);}}s.resetErrorHandling();this.setEnablePropertyForResetAndSaveButton(false);this._fCardWithRefresh();},onSaveButtonPress:function(){if(s.bError){s.oMessagePopOverButton.firePress();}else{this.createAndSubmitChange.bind(this)();}},onResizingChange:function(E){var i=E.getParameter("state");this._oCardManifestSettings.stopResizing=!i;this.updateCard(E);},onNumberOfRowsChanged:function(E){var R=+this._oCardManifestSettings.defaultSpan.rows;this._oCardManifestSettings.defaultSpan.rows=R;this._oCardManifestSettings.defaultSpan.showOnlyHeader=(R===0);this._oCardManifestSettings.cardLayout.showOnlyHeader=(R===0);var i=["sap.ovp.cards.list","sap.ovp.cards.table"];if(i.indexOf(this._oCardManifestSettings.template)!==-1){this._oCardManifestSettings.cardLayout.noOfItems=R;}else{this._oCardManifestSettings.cardLayout.rowSpan=R;}this.updateCard(E);},onNumberOfColumnsChanged:function(E){this._oCardManifestSettings.defaultSpan.cols=+this._oCardManifestSettings.defaultSpan.cols;this.updateCard(E);},setBusy:function(i){if(i){this.getView().addStyleClass("dialogContainerOverlay");var j=this.getView().byId("dialogCard");if(j.getVisible()){j.getComponentInstance().getRootControl().setBusy(i);}}else{this.getView().removeStyleClass("dialogContainerOverlay");setTimeout(function(){var j=this.getView().byId("dialogCard");if(j.getVisible()){j.getComponentInstance().getRootControl().setBusy(i);}}.bind(this),2000);}},_fCardWithoutRefresh:function(E,i){var j=this.getView(),w=this._oCardManifestSettings,x=j.byId("dialogCard").getComponentInstance(),R=x.getRootControl(),y=R.getController(),z=y.getCardPropertiesModel(),A,G,H=false,K;if(w.tabs&&w.tabs.length){H=true;K=parseInt(w.selectedKey,10);}if(i.formElementId==="sapOvpSettingsLineItemTitle"||i.formElementId==="sapOvpSettingsLineItemSubTitle"){A=R.byId(i.cardElementId+"--"+j.getModel().getProperty("/lineItemId"));}else{A=R.byId(i.cardElementId);if(!A){this._fCardWithRefresh(E,i.cardElementId);}}switch(i.formElementId){case"sapOvpSettingsLineItemTitle":case"sapOvpSettingsLineItemSubTitle":case"sapOvpSettingsTitle":case"sapOvpSettingsValueSelectionInfo":if(A){A.setText(E.getSource().getValue());}break;case"sapOvpSettingsSubTitle":z.setProperty("/subTitle",E.getSource().getValue());y._setSubTitleWithUnitOfMeasure();break;case"sapOvpSettingsViewName":var N=w.viewName;G=j.getModel();A.getItems()[K-1].setText(N);w.tabs[K-1].value=N;if(w.defaultViewSelected===K){N=N+" ("+this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_DEFAULT_VIEW")+")";}w.aViews[K].text=N;G.refresh();break;case"sapOvpDefaultViewSwitch":if(E.getSource().getState()){var Q=w.defaultViewSelected;G=j.getModel();w.defaultViewSelected=K;w.aViews[Q].text=w.tabs[Q-1].value;w.aViews[K].text+=" ("+this.oOvpResourceBundle.getText("OVP_KEYUSER_LABEL_DEFAULT_VIEW")+")";G.refresh();this.defaultViewSwitch=E.getSource();this.defaultViewSwitch.setEnabled(false);}break;case"sapOvpSettingsIdentification":if(H){w.tabs[K-1][i.updateProperty]=w[i.updateProperty];}break;case"sapOvpSettingsKPIHeaderSwitch":var U=j.getModel("visibility"),W=U.getData();W.dataPoint=false;W.valueSelectionInfo=false;if(H){w.tabs.forEach(function(Y){Y.prevDataPointAnnotationPath=Y.dataPointAnnotationPath;Y.dataPointAnnotationPath=undefined;});}else{var X=w.dataPointAnnotationPath;if(X){w.prevDataPointAnnotationPath=X;}w.dataPointAnnotationPath=undefined;}U.refresh(true);A.destroy();break;default:break;}},_fCardWithRefresh:function(E,i){var j,w,x,y,z,A=this._oCardManifestSettings,G=this.getView(),H=G.byId("dialogCard"),K=H.getComponentInstance().getComponentData(),N=K.cardId,Q=K.manifest.cards[N].model,R={cards:{}},U=false,W;if(A.tabs&&A.tabs.length){U=true;W=parseInt(A.selectedKey,10);}switch(i){case"subTitleSwitch":x=this.getView();y=x.getModel("visibility");if(E.getSource().getState()){if(U){w=A.defaultViewSelected;A.tabs.forEach(function(Z){j=Z.prevDynamicSubtitleAnnotationPath;if(j){Z.dynamicSubtitleAnnotationPath=j;}else{Z.dynamicSubtitleAnnotationPath=A.dynamicSubTitle[0].value;}});A.dynamicSubtitleAnnotationPath=A.tabs[w-1].dynamicSubtitleAnnotationPath;}else{j=A.prevDynamicSubtitleAnnotationPath;if(j){A.dynamicSubtitleAnnotationPath=j;}else{A.dynamicSubtitleAnnotationPath=A.dynamicSubTitle[0].value;}}G.byId("sapOvpSettingsDynamicSubTitle").setSelectedKey(A.dynamicSubtitleAnnotationPath);}else{if(U){A.tabs.forEach(function(Z){Z.prevDynamicSubtitleAnnotationPath=Z.dynamicSubtitleAnnotationPath;Z.dynamicSubtitleAnnotationPath=undefined;});A.dynamicSubtitleAnnotationPath=undefined;}else{var X=A.dynamicSubtitleAnnotationPath;if(X){A.prevDynamicSubtitleAnnotationPath=X;}A.dynamicSubtitleAnnotationPath=undefined;}}y.setProperty("/subTitle",s.getVisibilityOfElement(A,"subTitle",U));y.setProperty("/dynamicSubTitle",s.getVisibilityOfElement(A,"dynamicSubTitle",U)&&!!A["dynamicSubTitle"]&&!!A["dynamicSubTitle"].length);y.refresh(true);break;case"kpiHeader":x=this.getView();y=x.getModel("visibility");z=y.getData();z.valueSelectionInfo=true;z.dataPoint=true;if(A.tabs&&A.tabs.length){z.dataPoint=s.getVisibilityOfElement(A,"dataPoint",true);}if(!A.valueSelectionInfo){A.valueSelectionInfo=" ";}if(U){w=A.defaultViewSelected;A.tabs.forEach(function(Z){j=Z.prevDataPointAnnotationPath;if(j){Z.dataPointAnnotationPath=j;}else{Z.dataPointAnnotationPath=A.dataPoint[0].value;}});A.dataPointAnnotationPath=A.tabs[w-1].dataPointAnnotationPath;}else{j=A.prevDataPointAnnotationPath;if(j){A.dataPointAnnotationPath=j;}else{A.dataPointAnnotationPath=A.dataPoint[0].value;}}y.refresh(true);break;case"listType":A[i]=(E.getSource().getState())?"extended":"condensed";break;case"listFlavor":A[i]=(E.getSource().getState())?"bar":"";break;case"sortBy":x=this.getView();y=x.getModel("visibility");z=y.getData();if(!!A.sortBy!==z.sortOrder){z.sortOrder=!!A.sortBy;y.refresh();}break;case"listFlavorForLinkList":case"sortOrder":break;case"annotationPath":case"chartAnnotationPath":case"presentationAnnotationPath":case"selectionAnnotationPath":case"selectionPresentationAnnotationPath":case"dynamicSubtitleAnnotationPath":case"dataPointAnnotationPath":if(U){A.tabs[W-1][i]=A[i];}break;case"noOfRows":case"ovpHeaderTitle":case"add":case"removeVisual":case"changeVisual":case"sort":case"delete":break;default:break;}R.cards[N]={template:K.template,settings:A};if(!!Q){R.cards[N].model=Q;}this.setBusy(true);var Y=O.createCardComponent(G,R,"dialogCard");Y.then(function(){this.setBusy(false);var Z=this.getView().byId("sapOvpStaticLinkListLineItem");if(Z){var $=Z.getSelectedItem();if($){var _=$.getId(),a1=this.getIndexFromIdForStaticLinkList(_);this.setCurrentActivePageForCarouselCard(a1);}}}.bind(this));Y.catch(function(){this.setBusy(false);}.bind(this));},updateCard:function(E,w){var x=this._oCardManifestSettings,y=this.getView().byId("dialogCard");this.setEnablePropertyForResetAndSaveButton(true);if(y.getVisible()){if(x.tabs&&x.tabs.length){var z=parseInt(x.selectedKey,10);x.isViewResetEnabled=true;x.aViews[z].isViewResetEnabled=true;}var A=E.getSource(),G=(w)?w:A.getId(),H=false;if(G.indexOf("sapOvpStaticLinkListLineItem")!==-1){var K=A.getModel(),N=K.getData().staticContent,Q=this.getIndexFromIdForStaticLinkList(G);this.setCurrentActivePageForCarouselCard(Q);K.setProperty("/lineItemId",N[Q].id);if(G.indexOf("sapOvpSettingsLineItemTitle")!==-1){G="sapOvpSettingsLineItemTitle";}else if(G.indexOf("sapOvpSettingsLineItemSubTitle")!==-1){G="sapOvpSettingsLineItemSubTitle";}}for(var i=0;i<this._aRefreshNotRequired.length;i++){if(G.indexOf(this._aRefreshNotRequired[i].formElementId)>-1){if(this._aRefreshNotRequired[i].isKpiSwitch&&E.getSource().getState()){break;}this._fCardWithoutRefresh(E,this._aRefreshNotRequired[i]);H=true;break;}}if(!H){for(var j=0;j<this._aRefreshRequired.length;j++){if(G.indexOf(this._aRefreshRequired[j].formElementId)>-1){this.setBusy(true);this._fCardWithRefresh(E,this._aRefreshRequired[j].updateProperty);break;}}}}},onExit:function(){s.oSaveButton.detachPress(this.onSaveButtonPress,this);s.oResetButton.detachPress(this.onResetButton,this);s.oMessagePopOverButton.detachPress(this.handleMessagePopoverPress,this);},getListItems:function(){var i=[],j=this._oCardManifestSettings,w=this.getView(),x=w.byId("dialogCard"),y=x.getComponentInstance().getComponentData(),z=j.entityType.$path+"/"+j.annotationPath,A=y.model.getMetaModel(),E=A.getContext(A.resolve(z,this.oView.getBindingContext()));var G=2,H=1,K=0;if(j.listFlavor==="bar"){G=1;H=2;}if(j.listType&&j.listType.toLowerCase()==="extended"){G=6;H=3;K=3;if(j.listFlavor==="bar"){G=5;}}else if(j.contentFragment==="sap.ovp.cards.table.Table"){G=3;H=1;K=1;}j.lineItem.forEach(function(N){var Q=m.getSortedDataPoints(E,N.fields),R=m.getSortedDataFields(E,N.fields),U=[],W=[];Q.forEach(function($){if($.Title){W.push($.Title.String);}});R.forEach(function($){if($.Label){U.push($.Label.String);}});var X=Math.min(W.length,H),Y=Math.min(K,X),Z=U.slice(0,G-Y).concat(W.slice(0,X));Z.map(function($){return $.charAt(0).toUpperCase()+$.substr(1);});i.push({Value:N.value,Label:N.name,VisibleFields:Z.toString()});});return i;},openLineItemValueHelpDialog:function(E){this.attachBrowserHeightChangeHandler();this._oEvent=q.extend({},E);var i=new B("lineItemCancelBtn",{text:this.oOvpResourceBundle&&this.oOvpResourceBundle.getText("cancelBtn")});this.lineItemDialog=new D({title:this.oOvpResourceBundle&&this.oOvpResourceBundle.getText("OVP_KEYUSER_LINEITEM_ANNO"),buttons:[i]}).addStyleClass("sapOvpSettingsDialogBox");var R=new J({"lineItem":this.getListItems()});R.setProperty("/densityStyle",this.getDensityStyle());R.setProperty("/NoOfLineItem",R.getProperty("/lineItem").length);var j=new sap.ui.view("lineItemDialogContent",{viewName:"sap.ovp.cards.rta.SelectLineItem",type:t.XML,preprocessors:{xml:{bindingContexts:{tableRows:R.createBindingContext("/")},models:{tableRows:R}}}});j.setModel(R);j.setModel(this.getView().getModel("ovpResourceModel"),"ovpResourceModel");this.lineItemDialog.addContent(j);j.loaded().then(function(w){this._oLineItemDialogContentView=w;w.getController().updateLineItemPath=function(x){var y=x.Value,z=this._oCardManifestSettings,A;if(z.tabs&&z.tabs.length){A=parseInt(z.selectedKey,10);}z.lineItemQualifier=s.getQualifier(y);z.annotationPath=y;if(z.tabs&&z.tabs.length){z.tabs[A-1].annotationPath=z.annotationPath;}this.getView().byId("sapOvpSettingsLineItem").setValue(x.Label);this._fCardWithRefresh(this._oEvent,"annotationPath");this.setEnablePropertyForResetAndSaveButton(true);if(z.tabs&&z.tabs.length){z.isViewResetEnabled=true;z.aViews[A].isViewResetEnabled=true;}this.cleanAndCloseDialog(i);}.bind(this);i.attachPress(function(){this.cleanAndCloseDialog(i);}.bind(this));this.lineItemDialog.open();setTimeout(function(){this.browserHeightChange();}.bind(this),0);}.bind(this));},createAndSubmitChange:function(){var i;if(s.bNewStaticLinkListCardFlag){i=P.getPayLoadForNewStaticLinkListCard.bind(this)(s);}else{i=P.getPayLoadForEditCard.bind(this)(s);}this.settingsResolve(i);s.dialogBox.close();}});});