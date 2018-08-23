sap.ui.require.preload({"sap/collaboration/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.collaboration","type":"library","embeds":["components/socialtimeline","components/fiori/sharing/dialog","components/fiori/sharing","components/fiori/notification","components/fiori/feed/dialog","components/fiori/feed","components/socialprofile","components/feed"],"applicationVersion":{"version":"1.56.0"},"title":"SAP UI library: SAP Collaboration for Social Media Integration.","description":"SAP UI library: SAP Collaboration for Social Media Integration.","ach":"CA-UI5-BS-SM","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_belize","sap_belize_plus","sap_bluecrystal"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.56","libs":{"sap.ui.core":{"minVersion":"1.56.0"},"sap.suite.ui.commons":{"minVersion":"1.56.0"}}},"library":{"i18n":false}}}',
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2017 SAP SE. All rights reserved
 */
"sap/collaboration/library.js":function(){jQuery.sap.declare("sap.collaboration.library");jQuery.sap.require("sap.ui.core.Core");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.suite.ui.commons.library");sap.ui.getCore().initLibrary({name:"sap.collaboration",dependencies:["sap.ui.core","sap.suite.ui.commons"],types:["sap.collaboration.AppType","sap.collaboration.DisplayFeedType","sap.collaboration.FeedType"],interfaces:[],controls:[],elements:[],version:"1.56.0"});jQuery.sap.declare("sap.collaboration.AppType");sap.collaboration.AppType={split:"split",widget:"widget"};jQuery.sap.declare("sap.collaboration.DisplayFeedType");sap.collaboration.DisplayFeedType={BusinessRecordFeed:"BusinessRecordFeed",GroupFeedsWhereBusinessRecordIsLinked:"GroupFeedsWhereBusinessRecordIsLinked"};jQuery.sap.declare("sap.collaboration.FeedType");sap.collaboration.FeedType={follows:"follows",company:"company",group:"group",objectGroup:"objectGroup",object:"object",GroupIds:"GroupIds",BusinessObjectGroups:"BusinessObjectGroups",UserGroups:"UserGroups"};}},"sap/collaboration/library-h2-preload");sap.ui.loader.config({depCacheUI5:{"sap/collaboration/components/controls/FeedEntryEmbedded.js":["jquery.sap.global.js","sap/collaboration/components/controls/PlaceholderUtility.js","sap/collaboration/components/utils/LanguageBundle.js","sap/collaboration/components/utils/MediaTypeToSAPIcon.js","sap/ui/core/Control.js"],"sap/collaboration/components/controls/FilterPopover.js":["jquery.sap.global.js","sap/ui/core/Control.js"],"sap/collaboration/components/controls/PlaceholderUtility.js":["sap/ui/base/Object.js"],"sap/collaboration/components/controls/ReplyPopover.js":["sap/collaboration/components/utils/LanguageBundle.js"],"sap/collaboration/components/controls/SocialTextArea.js":["jquery.sap.global.js","sap/collaboration/components/controls/SuggestionUtility.js","sap/collaboration/components/utils/LanguageBundle.js","sap/m/InputBase.js","sap/m/List.js","sap/m/Popover.js","sap/m/StandardListItem.js","sap/m/TextArea.js","sap/ui/model/json/JSONModel.js"],"sap/collaboration/components/controls/TimelineEntryEmbedded.js":["jquery.sap.global.js","sap/collaboration/components/controls/PlaceholderUtility.js","sap/collaboration/components/utils/LanguageBundle.js","sap/collaboration/components/utils/MediaTypeToSAPIcon.js","sap/ui/core/Control.js"],"sap/collaboration/components/feed/BOMode.js":["sap/collaboration/components/feed/Mode.js","sap/collaboration/components/utils/PendingRequestsUtil.js","sap/m/CustomListItem.js","sap/m/Label.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js"],"sap/collaboration/components/feed/Component.js":["sap/suite/ui/commons/library.js","sap/ui/core/UIComponent.js"],"sap/collaboration/components/feed/GroupIDsMode.js":["sap/collaboration/components/feed/Mode.js","sap/collaboration/components/utils/PendingRequestsUtil.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js"],"sap/collaboration/components/feed/Mode.js":["sap/collaboration/components/utils/CommonUtil.js","sap/ui/base/Object.js","sap/ui/core/Fragment.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js"],"sap/collaboration/components/feed/ModeFactory.js":["sap/collaboration/components/feed/BOMode.js","sap/collaboration/components/feed/GroupIDsMode.js","sap/collaboration/components/feed/UserMode.js"],"sap/collaboration/components/feed/UserMode.js":["sap/collaboration/components/feed/Mode.js"],"sap/collaboration/components/feed/fragments/CustomListItem.fragment.xml":["sap/m/CustomListItem.js","sap/m/Label.js","sap/ui/core/Fragment.js"],"sap/collaboration/components/feed/fragments/GroupSelector.fragment.xml":["sap/m/List.js","sap/m/ResponsivePopover.js","sap/m/SearchField.js","sap/ui/core/Fragment.js"],"sap/collaboration/components/feed/views/GroupFeed.controller.js":["jquery.sap.global.js","sap/collaboration/components/controls/FeedEntryEmbedded.js","sap/collaboration/components/controls/FilterPopover.js","sap/collaboration/components/controls/ReplyPopover.js","sap/collaboration/components/controls/SocialTextArea.js","sap/collaboration/components/feed/ModeFactory.js","sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/DateUtil.js","sap/collaboration/components/utils/LanguageBundle.js","sap/m/MessageBox.js","sap/suite/ui/commons/TimelineItem.js","sap/ui/core/mvc/Controller.js"],"sap/collaboration/components/feed/views/GroupFeed.view.xml":["sap/collaboration/components/feed/views/GroupFeed.controller.js","sap/suite/ui/commons/Timeline.js","sap/ui/core/mvc/XMLView.js"],"sap/collaboration/components/fiori/feed/Component.js":["sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/JamUtil.js","sap/collaboration/components/utils/OdataUtil.js","sap/collaboration/library.js","sap/ui/core/UIComponent.js"],"sap/collaboration/components/fiori/feed/commons/Detail.controller.js":["sap/collaboration/components/utils/JamUtil.js"],"sap/collaboration/components/fiori/feed/dialog/Component.js":["sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/JamUtil.js","sap/collaboration/components/utils/OdataUtil.js","sap/collaboration/library.js","sap/ui/core/UIComponent.js"],"sap/collaboration/components/fiori/notification/Component.js":["sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/library.js","sap/m/MessageBox.js","sap/ui/commons/Button.js","sap/ui/core/UIComponent.js"],"sap/collaboration/components/fiori/notification/Notification.controller.js":["sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/NotificationTypeUtil.js","sap/collaboration/components/utils/OdataUtil.js"],"sap/collaboration/components/fiori/notification/Notification.view.js":["sap/collaboration/components/fiori/notification/NotificationContainer.js","sap/collaboration/library.js"],"sap/collaboration/components/fiori/sharing/Component.js":["sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/OdataUtil.js","sap/collaboration/library.js","sap/m/MessageBox.js","sap/ui/core/UIComponent.js"],"sap/collaboration/components/fiori/sharing/NoGroups.controller.js":["sap/collaboration/components/utils/CommonUtil.js"],"sap/collaboration/components/fiori/sharing/Sharing.controller.js":["sap/collaboration/components/fiori/sharing/helper/AttachmentsUtil.js","sap/collaboration/components/fiori/sharing/helper/ShareUtil.js","sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/OdataUtil.js","sap/m/MessageToast.js"],"sap/collaboration/components/fiori/sharing/attachment/Attachment.js":["sap/collaboration/components/fiori/sharing/attachment/InvalidAttachmentConstructorArgumentsException.js","sap/collaboration/components/fiori/sharing/attachment/InvalidAttachmentParameterException.js"],"sap/collaboration/components/fiori/sharing/dialog/Component.js":["sap/collaboration/components/controls/SocialTextArea.js","sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/OdataUtil.js","sap/m/MessageToast.js","sap/ui/core/UIComponent.js"],"sap/collaboration/components/fiori/sharing/helper/AttachmentsUtil.js":["sap/collaboration/components/utils/CommonUtil.js"],"sap/collaboration/components/socialprofile/Component.js":["sap/collaboration/components/utils/CommonUtil.js","sap/ui/core/UIComponent.js"],"sap/collaboration/components/socialprofile/SocialProfile.controller.js":["sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/OdataUtil.js"],"sap/collaboration/components/socialtimeline/Component.js":["sap/collaboration/components/controls/FilterPopover.js","sap/collaboration/components/controls/ReplyPopover.js","sap/collaboration/components/controls/SocialTextArea.js","sap/collaboration/components/socialtimeline/annotations/TimelineTermsUtility.js","sap/collaboration/components/socialtimeline/controls/TimelineItemEmbedded.js","sap/collaboration/components/socialtimeline/datahandlers/JamDataHandler.js","sap/collaboration/components/socialtimeline/datahandlers/SMIntegrationDataHandler.js","sap/collaboration/components/socialtimeline/datahandlers/ServiceDataHandler.js","sap/collaboration/components/socialtimeline/datahandlers/TimelineDataHandler.js","sap/collaboration/components/socialtimeline/filter/FilterType.js","sap/collaboration/components/socialtimeline/validation/InputValidator.js","sap/collaboration/components/utils/CommonUtil.js","sap/collaboration/components/utils/DateUtil.js","sap/suite/ui/commons/Timeline.js","sap/suite/ui/commons/TimelineItem.js","sap/ui/core/UIComponent.js"],"sap/collaboration/components/socialtimeline/annotations/Metadata.js":["sap/ui/base/Object.js"],"sap/collaboration/components/socialtimeline/annotations/MetadataException.js":["sap/ui/base/Object.js"],"sap/collaboration/components/socialtimeline/annotations/TimelineTermsUtility.js":["sap/collaboration/components/socialtimeline/annotations/MetadataException.js"],"sap/collaboration/components/socialtimeline/controls/TimelineItemEmbedded.js":["jquery.sap.global.js","sap/collaboration/components/controls/FeedEntryEmbedded.js","sap/collaboration/components/controls/TimelineEntryEmbedded.js","sap/ui/core/Control.js"],"sap/collaboration/components/socialtimeline/datahandlers/JamDataHandler.js":["sap/collaboration/components/utils/OdataUtil.js"],"sap/collaboration/components/socialtimeline/datahandlers/SMIntegrationDataHandler.js":["sap/collaboration/components/utils/OdataUtil.js"],"sap/collaboration/components/socialtimeline/validation/InputValidator.js":["sap/collaboration/library.js"],"sap/collaboration/components/utils/CommonUtil.js":["sap/collaboration/components/utils/MessageQueueUtil.js","sap/m/MessageBox.js"],"sap/collaboration/components/utils/DateUtil.js":["jquery.sap.global.js","sap/collaboration/components/utils/LanguageBundle.js","sap/ui/base/Object.js"],"sap/collaboration/components/utils/LanguageBundle.js":["jquery.sap.global.js","sap/ui/base/Object.js"],"sap/collaboration/components/utils/MessageQueueUtil.js":["sap/m/MessageBox.js","sap/m/MessageToast.js"],"sap/collaboration/components/utils/OdataUtil.js":["sap/collaboration/components/utils/CommonUtil.js"],"sap/collaboration/library.js":["sap/suite/ui/commons/library.js","sap/ui/core/Core.js","sap/ui/core/library.js"]}});
