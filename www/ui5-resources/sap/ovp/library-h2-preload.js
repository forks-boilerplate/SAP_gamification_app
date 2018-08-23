/*!
 * Copyright (c) 2009-2014 SAP SE, All Rights Reserved
 */
sap.ui.predefine('sap/ovp/library',["jquery.sap.global","sap/ui/Device","sap/ui/core/Core"],function(q,D,C){var t=sap.ui.getCore().initLibrary({name:"sap.ovp",dependencies:["sap.ui.core","sap.ui.layout","sap.ui.generic.app","sap.m","sap.f","sap.ui.comp","sap.ui.rta"],types:[],interfaces:[],controls:[],elements:[],version:"1.56.5",extensions:{flChangeHandlers:{"sap.ovp.ui.EasyScanLayout":"sap/ovp/flexibility/EasyScanLayout","sap.ovp.ui.DashboardLayout":"sap/ovp/flexibility/DashboardLayout"}}});if(D.browser.firefox){q.sap.log.warning("Loading library 'sap.viz' and 'sap.suite.ui.microchart' to avoid issues with Firefox sync XHR support");sap.ui.getCore().loadLibrary("sap.viz");sap.ui.getCore().loadLibrary("sap.suite.ui.microchart");}return t;});sap.ui.require.preload({"sap/ovp/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ovp","type":"library","embeds":["app","cards/charts/analytical","cards/charts/generic","cards/charts/smart/chart","cards/custom","cards/error","cards/generic","cards/image","cards/linklist","cards/list","cards/loading","cards/map/Analytical","cards/map","cards/quickview","cards/stack","cards/table"],"applicationVersion":{"version":"1.56.5"},"title":"SAP library: sap.ovp","description":"SAP library: sap.ovp","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_belize","sap_belize_hcb","sap_belize_hcw","sap_belize_plus","sap_bluecrystal"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.56","libs":{"sap.ui.core":{"minVersion":"1.56.5"},"sap.ui.layout":{"minVersion":"1.56.5"},"sap.ui.generic.app":{"minVersion":"1.56.5"},"sap.m":{"minVersion":"1.56.5"},"sap.f":{"minVersion":"1.56.5"},"sap.ui.comp":{"minVersion":"1.56.5"},"sap.viz":{"minVersion":"1.56.5","lazy":true},"sap.suite.ui.microchart":{"minVersion":"1.56.5","lazy":true}}},"library":{"i18n":"messagebundle.properties","content":{"controls":[],"elements":[],"types":[],"interfaces":[]}}}}'},"sap/ovp/library-h2-preload");sap.ui.loader.config({depCacheUI5:{"sap/ovp/app/CardContainer.fragment.xml":["sap/ovp/ui/EasyScanLayout.js","sap/ui/core/Fragment.js"],"sap/ovp/app/Component.js":["jquery.sap.global.js","sap/ovp/cards/rta/SettingsDialogConstants.js","sap/ovp/ui/DashboardLayoutUtil.js","sap/ui/core/UIComponent.js","sap/ui/core/mvc/ViewType.js","sap/ui/core/routing/Router.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js","sap/ui/rta/RuntimeAuthoring.js"],"sap/ovp/app/DashboardCardContainer.fragment.xml":["sap/ovp/ui/DashboardLayout.js","sap/ui/core/Fragment.js"],"sap/ovp/app/Error.view.xml":["sap/m/MessagePage.js","sap/ui/core/mvc/XMLView.js"],"sap/ovp/app/Main.controller.js":["jquery.sap.global.js","sap/m/BackgroundDesign.js","sap/m/BusyDialog.js","sap/m/Button.js","sap/m/Column.js","sap/m/ColumnListItem.js","sap/m/Dialog.js","sap/m/ListSeparators.js","sap/m/MessageBox.js","sap/m/Switch.js","sap/m/Table.js","sap/m/Text.js","sap/m/library.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/PersonalizationUtils.js","sap/ovp/cards/charts/VizAnnotationManager.js","sap/ovp/cards/generic/Component.js","sap/ovp/ui/SmartphoneHeaderToggle.js","sap/ui/Device.js","sap/ui/comp/state/UIState.js","sap/ui/core/TextAlign.js","sap/ui/core/mvc/Controller.js","sap/ui/fl/FlexControllerFactory.js","sap/ui/generic/app/navigation/service/NavigationHandler.js","sap/ui/generic/app/navigation/service/SelectionVariant.js","sap/ui/model/Filter.js","sap/ui/model/json/JSONModel.js","sap/ui/model/odata/ODataMetadata.js","sap/ui/model/odata/ODataUtils.js","sap/ui/model/odata/v2/ODataModel.js","sap/ui/thirdparty/hasher.js"],"sap/ovp/app/Main.view.xml":["sap/f/DynamicPage.js","sap/m/MessagePage.js","sap/ovp/app/Main.controller.js","sap/ovp/ui/OVPWrapper.js","sap/ui/core/mvc/XMLView.js","{ui>/cardContainerFragment}.fragment.xml"],"sap/ovp/app/SharePage.fragment.xml":["sap/m/ActionSheet.js","sap/m/Button.js","sap/ui/core/Fragment.js"],"sap/ovp/app/SmarFilterBarWithoutVariant.fragment.xml":["sap/ui/comp/smartfilterbar/SmartFilterBar.js","sap/ui/core/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/app/SmartFilterBarWithVariant.fragment.xml":["sap/ui/comp/smartfilterbar/SmartFilterBar.js","sap/ui/core/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/ActionUtils.js":["jquery.sap.global.js","sap/ui/comp/smartfield/JSONType.js","sap/ui/comp/smartfield/SmartField.js","sap/ui/comp/smartfield/SmartLabel.js","sap/ui/layout/form/SimpleForm.js"],"sap/ovp/cards/AnnotationHelper.js":["jquery.sap.global.js","sap/ovp/cards/CommonUtils.js","sap/ui/Device.js","sap/ui/core/ValueState.js","sap/ui/core/format/DateFormat.js","sap/ui/core/format/NumberFormat.js","sap/ui/generic/app/navigation/service/SelectionVariant.js","sap/ui/model/FilterOperator.js","sap/ui/model/analytics/odata4analytics.js","sap/ui/model/odata/AnnotationHelper.js","sap/ui/vbm/library.js"],"sap/ovp/cards/AppSettingsUtils.js":["jquery.sap.global.js","sap/m/Button.js","sap/m/Dialog.js","sap/ui/core/mvc/ViewType.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js"],"sap/ovp/cards/CommonUtils.js":["jquery.sap.global.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ui/Device.js"],"sap/ovp/cards/LoadingUtils.js":["jquery.sap.global.js"],"sap/ovp/cards/OVPCardAsAPIUtils.js":["jquery.sap.global.js"],"sap/ovp/cards/PayLoadUtils.js":["jquery.sap.global.js","sap/ovp/cards/rta/SettingsDialogConstants.js"],"sap/ovp/cards/PersonalizationUtils.js":["jquery.sap.global.js","sap/ovp/cards/CommonUtils.js"],"sap/ovp/cards/SettingsUtils.js":["jquery.sap.global.js","sap/m/Button.js","sap/m/Dialog.js","sap/m/Link.js","sap/m/MessagePopover.js","sap/m/MessagePopoverItem.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ovp/cards/PayLoadUtils.js","sap/ovp/cards/rta/SettingsDialogConstants.js","sap/ui/Device.js","sap/ui/core/mvc/ViewType.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js"],"sap/ovp/cards/charts/OVPVizDataHandler.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/model/json/JSONModel.js"],"sap/ovp/cards/charts/SmartAnnotationManager.js":["jquery.sap.global.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/charts/Utils.js","sap/ovp/cards/charts/VizAnnotationManager.js","sap/ui/core/format/DateFormat.js","sap/ui/core/format/NumberFormat.js","sap/ui/model/odata/CountMode.js","sap/viz/ui5/api/env/Format.js","sap/viz/ui5/controls/VizTooltip.js"],"sap/ovp/cards/charts/Utils.js":["jquery.sap.global.js"],"sap/ovp/cards/charts/VizAnnotationManager.js":["jquery.sap.global.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ovp/cards/charts/Utils.js","sap/ui/core/Element.js","sap/ui/core/format/DateFormat.js","sap/ui/core/format/NumberFormat.js","sap/ui/model/odata/CountMode.js","sap/viz/ui5/api/env/Format.js","sap/viz/ui5/controls/VizTooltip.js","sap/viz/ui5/controls/common/feeds/FeedItem.js","sap/viz/ui5/data/DimensionDefinition.js","sap/viz/ui5/data/MeasureDefinition.js"],"sap/ovp/cards/charts/analytical/Component.js":["jquery.sap.global.js","sap/ovp/cards/charts/VizAnnotationManager.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/charts/analytical/analyticalChart.controller.js":["jquery.sap.global.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ovp/cards/charts/VizAnnotationManager.js","sap/ovp/cards/generic/Card.controller.js","sap/viz/ui5/data/FlattenedDataset.js"],"sap/ovp/cards/charts/analytical/analyticalChart.fragment.xml":["sap/m/VBox.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/charts/generic/Component.js":["sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/charts/generic/noData.fragment.xml":["sap/m/FlexBox.js","sap/m/Text.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/charts/smart/chart/Component.js":["jquery.sap.global.js","sap/ovp/cards/charts/SmartAnnotationManager.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/charts/smart/chart/analyticalChart.controller.js":["jquery.sap.global.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/charts/SmartAnnotationManager.js","sap/ovp/cards/charts/VizAnnotationManager.js","sap/ovp/cards/generic/Card.controller.js","sap/ui/comp/odata/MetadataAnalyser.js","sap/ui/model/Filter.js","sap/ui/model/Sorter.js"],"sap/ovp/cards/charts/smart/chart/analyticalChart.fragment.xml":["sap/m/VBox.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/custom/Component.js":["sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/error/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/error/Error.controller.js":["sap/ovp/cards/generic/Card.controller.js"],"sap/ovp/cards/error/Error.fragment.xml":["sap/m/MessagePage.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/Action.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/ActionsFooter.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/Card.controller.js":["jquery.sap.global.js","sap/m/Button.js","sap/m/Dialog.js","sap/m/MessageBox.js","sap/m/MessageToast.js","sap/ovp/cards/ActionUtils.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ovp/cards/loading/State.js","sap/ui/core/CustomData.js","sap/ui/core/ResizeHandler.js","sap/ui/core/TextDirection.js","sap/ui/core/format/NumberFormat.js","sap/ui/core/mvc/Controller.js","sap/ui/generic/app/library.js","sap/ui/generic/app/navigation/service/NavError.js","sap/ui/generic/app/navigation/service/PresentationVariant.js","sap/ui/generic/app/navigation/service/SelectionVariant.js","sap/ui/model/FilterOperator.js","sap/ui/model/json/JSONModel.js","sap/ui/model/odata/AnnotationHelper.js"],"sap/ovp/cards/generic/Card.view.xml":["sap/m/FlexBox.js","sap/m/HBox.js","sap/m/Text.js","sap/m/VBox.js","sap/ui/core/mvc/XMLView.js","{ovpCardProperties>/controllerName}.controller.js"],"sap/ovp/cards/generic/Component.js":["jquery.sap.global.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/LoadingUtils.js","sap/ui/Device.js","sap/ui/core/UIComponent.js","sap/ui/core/mvc/ViewType.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js"],"sap/ovp/cards/generic/ContactDetails.fragment.xml":["sap/m/QuickView.js","sap/ovp/cards/generic/ContactDetailsQuickViewGroup.fragment.xml","sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/ContactDetailsQuickViewGroup.fragment.xml":["sap/m/QuickViewGroup.js","sap/m/QuickViewGroupElement.js","sap/m/QuickViewPage.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/ContentMiddle.fragment.xml":["sap/m/VBox.js","sap/ovp/ui/Card.js","sap/ovp/ui/CardContentContainer.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/ContentRight.fragment.xml":["sap/m/FlexBox.js","sap/m/FlexItemData.js","sap/m/HBox.js","sap/ovp/cards/generic/Header.fragment.xml","sap/ovp/ui/Card.js","sap/ovp/ui/CardContentContainer.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/CountFooter.fragment.xml":["sap/m/Text.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/CountHeader.fragment.xml":["sap/m/FlexBox.js","sap/m/Text.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/Header.fragment.xml":["sap/m/VBox.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/KPIHeader.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/SubTitle.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/generic/Title.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/image/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/image/Image.controller.js":["jquery.sap.global.js","sap/ovp/cards/generic/Card.controller.js"],"sap/ovp/cards/image/Image.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/linklist/AnnotationHelper.js":["jquery.sap.global.js","sap/ovp/cards/AnnotationHelper.js","sap/ui/model/FilterOperator.js","sap/ui/model/odata/AnnotationHelper.js"],"sap/ovp/cards/linklist/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js","sap/ovp/cards/linklist/AnnotationHelper.js"],"sap/ovp/cards/linklist/LinkList.controller.js":["jquery.sap.global.js","sap/m/Image.js","sap/m/List.js","sap/m/MessageToast.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ovp/cards/generic/Card.controller.js","sap/ui/core/ResizeHandler.js"],"sap/ovp/cards/linklist/LinkList.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/linklist/fragments/LinkListCarousel.fragment.xml":["sap/m/Carousel.js","sap/m/VBox.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/linklist/fragments/LinkListNavigationTargets.fragment.xml":["sap/m/CustomListItem.js","sap/m/HBox.js","sap/m/List.js","sap/m/Popover.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/linklist/fragments/LinkListStandard.fragment.xml":["sap/m/CustomListItem.js","sap/m/HBox.js","sap/m/List.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/linklist/fragments/LinkListStaticDataCarousel.fragment.xml":["sap/m/Carousel.js","sap/m/VBox.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/linklist/fragments/LinkListStaticDataStandard.fragment.xml":["sap/m/HBox.js","sap/m/List.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/list/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/list/CondensedBarList.fragment.xml":["sap/m/CustomListItem.js","sap/m/HBox.js","sap/suite/ui/microchart/ComparisonMicroChart.js","sap/suite/ui/microchart/ComparisonMicroChartData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/list/ExtendedBarList.fragment.xml":["sap/m/CustomListItem.js","sap/m/FlexItemData.js","sap/m/HBox.js","sap/m/VBox.js","sap/suite/ui/microchart/ComparisonMicroChart.js","sap/suite/ui/microchart/ComparisonMicroChartData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/list/List.controller.js":["jquery.sap.global.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ovp/cards/generic/Card.controller.js","sap/ui/model/json/JSONModel.js"],"sap/ovp/cards/list/List.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/list/ObjectList.fragment.xml":["sap/m/ObjectAttribute.js","sap/m/ObjectListItem.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/list/StandardList.fragment.xml":["sap/m/StandardListItem.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/list/StandardListImage.fragment.xml":["sap/m/List.js","sap/m/StandardListItem.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/loading/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js","sap/ovp/cards/loading/State.js"],"sap/ovp/cards/loading/Loading.controller.js":["jquery.sap.global.js","sap/ovp/cards/LoadingUtils.js","sap/ovp/cards/generic/Card.controller.js","sap/ovp/cards/loading/State.js"],"sap/ovp/cards/loading/LoadingBar.fragment.xml":["sap/m/FlexBox.js","sap/m/HBox.js","sap/m/VBox.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/loading/LoadingContent.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/loading/LoadingError.fragment.xml":["sap/m/MessagePage.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/loading/LoadingFooter.fragment.xml":["sap/m/Text.js","sap/m/VBox.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/loading/LoadingList.fragment.xml":["sap/m/FlexBox.js","sap/m/HBox.js","sap/m/Text.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/loading/LoadingListExtended.fragment.xml":["sap/m/CustomListItem.js","sap/m/FlexBox.js","sap/m/VBox.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/loading/LoadingStack.fragment.xml":["sap/m/HBox.js","sap/m/VBox.js","sap/ui/core/Fragment.js","sap/ui/core/HTML.js"],"sap/ovp/cards/loading/LoadingTable.fragment.xml":["sap/m/FlexBox.js","sap/m/HBox.js","sap/m/VBox.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/loading/StackLoadingError.fragment.xml":["sap/m/MessagePage.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/map/Analytical/AnalyticalMap.controller.js":["jquery.sap.global.js","sap/ovp/cards/generic/Card.controller.js","sap/ui/core/theming/Parameters.js"],"sap/ovp/cards/map/Analytical/AnalyticalMap.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/map/Analytical/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/map/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/map/GeographicalMap.controller.js":["jquery.sap.global.js","sap/ovp/cards/generic/Card.controller.js","sap/ui/core/ResizeHandler.js"],"sap/ovp/cards/map/GeographicalMap.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/cards/quickview/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/quickview/Quickview.controller.js":["jquery.sap.global.js","sap/m/Button.js","sap/ovp/cards/generic/Card.controller.js"],"sap/ovp/cards/quickview/Quickview.fragment.xml":["sap/m/QuickViewCard.js","sap/m/QuickViewPage.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/rta/AppSettingsDialog.controller.js":["jquery.sap.global.js","sap/ovp/cards/AppSettingsUtils.js","sap/ui/core/mvc/Controller.js","sap/ui/model/json/JSONModel.js"],"sap/ovp/cards/rta/AppSettingsDialog.view.xml":["sap/m/ComboBox.js","sap/m/SegmentedButton.js","sap/m/SegmentedButtonItem.js","sap/m/Switch.js","sap/m/VBox.js","sap/ovp/cards/rta/AppSettingsDialog.controller.js","sap/ui/core/Item.js","sap/ui/core/mvc/XMLView.js","sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/FormElement.js","sap/ui/layout/form/ResponsiveGridLayout.js"],"sap/ovp/cards/rta/SelectIcons.controller.js":["jquery.sap.global.js","sap/ui/core/mvc/Controller.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js"],"sap/ovp/cards/rta/SelectIcons.view.xml":["sap/m/Column.js","sap/m/ColumnListItem.js","sap/m/Image.js","sap/m/Label.js","sap/m/ScrollContainer.js","sap/m/SearchField.js","sap/m/Table.js","sap/m/Text.js","sap/m/Title.js","sap/m/Toolbar.js","sap/m/ToolbarSpacer.js","sap/ovp/cards/rta/SelectIcons.controller.js","sap/ui/core/Icon.js","sap/ui/core/mvc/XMLView.js"],"sap/ovp/cards/rta/SelectLineItem.controller.js":["jquery.sap.global.js","sap/ui/core/mvc/Controller.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js"],"sap/ovp/cards/rta/SelectLineItem.view.xml":["sap/m/Column.js","sap/m/ColumnListItem.js","sap/m/Label.js","sap/m/ScrollContainer.js","sap/m/SearchField.js","sap/m/Table.js","sap/m/Text.js","sap/m/Title.js","sap/m/Toolbar.js","sap/m/ToolbarSpacer.js","sap/ovp/cards/rta/SelectLineItem.controller.js","sap/ui/core/mvc/XMLView.js"],"sap/ovp/cards/rta/SelectLinks.controller.js":["jquery.sap.global.js","sap/ui/core/mvc/Controller.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js"],"sap/ovp/cards/rta/SelectLinks.view.xml":["sap/m/Column.js","sap/m/ColumnListItem.js","sap/m/Label.js","sap/m/ScrollContainer.js","sap/m/SearchField.js","sap/m/Table.js","sap/m/Text.js","sap/m/Title.js","sap/m/Toolbar.js","sap/m/ToolbarSpacer.js","sap/ovp/cards/rta/SelectLinks.controller.js","sap/ui/core/mvc/XMLView.js"],"sap/ovp/cards/rta/SettingsDialog.controller.js":["jquery.sap.global.js","sap/m/Button.js","sap/m/Column.js","sap/m/ColumnListItem.js","sap/m/Dialog.js","sap/m/IconTabBar.js","sap/m/IconTabFilter.js","sap/m/Image.js","sap/m/Label.js","sap/m/ListMode.js","sap/m/MessageBox.js","sap/m/SearchField.js","sap/m/Table.js","sap/m/Text.js","sap/m/Toolbar.js","sap/m/ToolbarSpacer.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ovp/cards/PayLoadUtils.js","sap/ovp/cards/SettingsUtils.js","sap/ovp/cards/linklist/AnnotationHelper.js","sap/ovp/cards/rta/SettingsDialogConstants.js","sap/ui/Device.js","sap/ui/comp/valuehelpdialog/ValueHelpDialog.js","sap/ui/core/Icon.js","sap/ui/core/IconPool.js","sap/ui/core/mvc/Controller.js","sap/ui/core/mvc/ViewType.js","sap/ui/model/ChangeReason.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js","sap/ui/model/json/JSONModel.js"],"sap/ovp/cards/rta/SettingsDialog.view.xml":["sap/m/Button.js","sap/m/OverflowToolbar.js","sap/m/Select.js","sap/m/ToolbarSpacer.js","sap/ovp/cards/rta/SettingsDialog.controller.js","sap/ui/core/Item.js","sap/ui/core/mvc/XMLView.js"],"sap/ovp/cards/rta/SettingsDialogCardPreview.fragment.xml":["sap/m/Button.js","sap/m/HBox.js","sap/m/MessagePage.js","sap/m/VBox.js","sap/ui/core/ComponentContainer.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/rta/SettingsDialogForm.fragment.xml":["sap/m/ComboBox.js","sap/m/Input.js","sap/m/SegmentedButton.js","sap/m/SegmentedButtonItem.js","sap/m/Switch.js","sap/ui/core/Fragment.js","sap/ui/core/Item.js","sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/FormElement.js","sap/ui/layout/form/ResponsiveGridLayout.js"],"sap/ovp/cards/rta/StaticLinkListCardLineItemsPanel.fragment.xml":["sap/m/Button.js","sap/m/CustomListItem.js","sap/m/FlexBox.js","sap/m/HBox.js","sap/m/Image.js","sap/m/Input.js","sap/m/Link.js","sap/m/List.js","sap/m/RadioButton.js","sap/m/RadioButtonGroup.js","sap/m/ScrollContainer.js","sap/m/VBox.js","sap/ui/core/Fragment.js","sap/ui/core/Icon.js","sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/FormElement.js","sap/ui/layout/form/ResponsiveGridLayout.js"],"sap/ovp/cards/stack/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/stack/Stack.controller.js":["jquery.sap.global.js","sap/m/FlexItemData.js","sap/m/Link.js","sap/m/Text.js","sap/m/VBox.js","sap/m/library.js","sap/ovp/cards/AnnotationHelper.js","sap/ovp/cards/generic/Card.controller.js","sap/ovp/ui/CustomData.js","sap/ovp/ui/ObjectStream.js","sap/ui/Device.js","sap/ui/base/BindingParser.js","sap/ui/core/ComponentContainer.js","sap/ui/core/Icon.js"],"sap/ovp/cards/stack/Stack.fragment.xml":["sap/m/Label.js","sap/m/Text.js","sap/m/VBox.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js","sap/ui/core/Icon.js"],"sap/ovp/cards/table/Component.js":["jquery.sap.global.js","sap/ovp/cards/generic/Component.js"],"sap/ovp/cards/table/Table.controller.js":["jquery.sap.global.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/OVPCardAsAPIUtils.js","sap/ovp/cards/generic/Card.controller.js"],"sap/ovp/cards/table/Table.fragment.xml":["sap/m/Table.js","sap/ovp/ui/CustomData.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/table/TableDashBoardLayout.fragment.xml":["sap/m/ColumnListItem.js","sap/ui/core/Fragment.js"],"sap/ovp/cards/table/TableEasyScanLayout.fragment.xml":["sap/ui/core/Fragment.js"],"sap/ovp/changeHandler/HideCardContainer.js":["jquery.sap.global.js"],"sap/ovp/changeHandler/UnhideCardContainer.js":["jquery.sap.global.js"],"sap/ovp/changeHandler/UnhideControl.js":["jquery.sap.global.js"],"sap/ovp/flexibility/DashboardLayout.flexibility.js":["sap/m/MessageToast.js","sap/ovp/cards/rta/SettingsDialogConstants.js","sap/ovp/changeHandler/HideCardContainer.js","sap/ovp/changeHandler/UnhideCardContainer.js","sap/ovp/changeHandler/UnhideControl.js","sap/ui/core/ComponentContainer.js","sap/ui/dt/OverlayRegistry.js"],"sap/ovp/flexibility/EasyScanLayout.flexibility.js":["sap/m/MessageToast.js","sap/ovp/cards/rta/SettingsDialogConstants.js","sap/ovp/changeHandler/HideCardContainer.js","sap/ovp/changeHandler/UnhideCardContainer.js","sap/ovp/changeHandler/UnhideControl.js","sap/ui/core/ComponentContainer.js","sap/ui/dt/OverlayRegistry.js"],"sap/ovp/library.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/core/Core.js"],"sap/ovp/ui/Card.js":["sap/ui/core/Control.js"],"sap/ovp/ui/CardContentContainer.js":["jquery.sap.global.js","sap/m/FlexBox.js"],"sap/ovp/ui/ComponentContainerDesigntimeMetadata.js":["jquery.sap.global.js","sap/ovp/cards/CommonUtils.js","sap/ovp/cards/SettingsUtils.js","sap/ui/dt/MetadataPropagationUtil.js","sap/ui/dt/OverlayRegistry.js","sap/ui/dt/OverlayUtil.js","sap/ui/dt/plugin/ElementMover.js","sap/ui/rta/Utils.js","sap/ui/rta/plugin/Plugin.js","sap/ui/rta/util/BindingsExtractor.js"],"sap/ovp/ui/CustomData.js":["jquery.sap.global.js","sap/ui/core/CustomData.js","sap/ushell/library.js"],"sap/ovp/ui/DashboardLayout.designtime.js":["sap/ovp/ui/ComponentContainerDesigntimeMetadata.js"],"sap/ovp/ui/DashboardLayout.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js"],"sap/ovp/ui/DashboardLayoutModel.js":["jquery.sap.global.js","sap/ovp/cards/CommonUtils.js"],"sap/ovp/ui/DashboardLayoutRearrange.js":["jquery.sap.global.js","sap/ovp/ui/UIActions.js","sap/ui/Device.js"],"sap/ovp/ui/DashboardLayoutUtil.js":["jquery.sap.global.js","sap/ovp/cards/CommonUtils.js","sap/ovp/ui/DashboardLayoutModel.js","sap/ovp/ui/DashboardLayoutRearrange.js","sap/ui/Device.js"],"sap/ovp/ui/EasyScanLayout.designtime.js":["sap/ovp/ui/ComponentContainerDesigntimeMetadata.js"],"sap/ovp/ui/EasyScanLayout.js":["jquery.sap.global.js","sap/ovp/cards/CommonUtils.js","sap/ovp/ui/UIActions.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js"],"sap/ovp/ui/OVPNumericContent.js":["sap/m/NumericContent.js"],"sap/ovp/ui/OVPWrapper.designtime.js":["jquery.sap.global.js","sap/ovp/cards/AppSettingsUtils.js"],"sap/ovp/ui/OVPWrapper.js":["sap/ui/core/Control.js"],"sap/ovp/ui/ObjectStream.js":["jquery.sap.global.js","sap/m/Dialog.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/Icon.js"],"sap/ovp/ui/ObjectStreamRenderer.js":["jquery.sap.global.js","sap/ui/core/Icon.js"],"sap/ovp/ui/SmartphoneHeaderToggle.js":["jquery.sap.global.js"],"sap/ovp/ui/UIActions.js":["jquery.sap.global.js","sap/ui/base/Object.js"]}});
