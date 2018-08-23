/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.predefine('sap/ui/export/library',['jquery.sap.global','sap/ui/core/library'],function(q,l){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.export",dependencies:["sap.ui.core"],types:["sap.ui.export.EdmType"],interfaces:[],controls:[],elements:[],noLibraryCSS:true,version:"1.56.5"});sap.ui.export.EdmType={Boolean:"Boolean",String:"String",Number:"Number",Date:"Date",Time:"Time",DateTime:"DateTime",Currency:"Currency"};q.sap.registerModuleShims({'sap/ui/export/js/XLSXBuilder':{amd:true,exports:'XLSXBuilder'},'sap/ui/export/js/XLSXExportUtils':{amd:true,exports:'XLSXExportUtils'}});return sap.ui.export;});
sap.ui.require.preload({
	"sap/ui/export/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ui.export","type":"library","embeds":[],"applicationVersion":{"version":"1.56.5"},"title":"UI5 library: sap.ui.export","description":"UI5 library: sap.ui.export","ach":"CA-UI5-TBL","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_belize","sap_belize_plus","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.56","libs":{"sap.ui.core":{"minVersion":"1.56.5"}}},"library":{"i18n":"messagebundle.properties","css":false,"content":{"controls":[],"elements":[],"types":["sap.ui.export.EdmType"],"interfaces":[]}}}}'
},"sap/ui/export/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ui/export/ExportDialog.js":["sap/m/Button.js","sap/m/Dialog.js","sap/m/DialogType.js","sap/m/MessageBox.js","sap/m/ProgressIndicator.js","sap/m/Text.js","sap/ui/core/ValueState.js"],
"sap/ui/export/Spreadsheet.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/export/ExportDialog.js","sap/ui/export/SpreadsheetExport.js","sap/ui/export/library.js"],
"sap/ui/export/SpreadsheetExport.js":["jquery.sap.global.js"],
"sap/ui/export/library.js":["jquery.sap.global.js","sap/ui/core/library.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map