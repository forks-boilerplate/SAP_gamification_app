/*!
 * (c) Copyright 2010-2018 SAP SE or an SAP affiliate company.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/DataType','sap/ui/core/library','sap/ui/layout/library'],function(q,D){"use strict";sap.ui.getCore().initLibrary({name:"sap.zen.commons",version:"1.56.5",dependencies:["sap.ui.core","sap.ui.layout"],types:["sap.zen.commons.layout.BackgroundDesign","sap.zen.commons.layout.HAlign","sap.zen.commons.layout.Padding","sap.zen.commons.layout.Separation","sap.zen.commons.layout.VAlign"],interfaces:[],controls:["sap.zen.commons.layout.AbsoluteLayout","sap.zen.commons.layout.MatrixLayout",],elements:["sap.zen.commons.layout.MatrixLayoutCell","sap.zen.commons.layout.MatrixLayoutRow","sap.zen.commons.layout.PositionContainer"]});sap.zen.commons.layout=sap.zen.commons.layout||{};sap.zen.commons.layout.BackgroundDesign={Border:"Border",Fill1:"Fill1",Fill2:"Fill2",Fill3:"Fill3",Header:"Header",Plain:"Plain",Transparent:"Transparent"};sap.zen.commons.layout.HAlign={Begin:"Begin",Center:"Center",End:"End",Left:"Left",Right:"Right"};sap.zen.commons.layout.Padding={None:"None",Begin:"Begin",End:"End",Both:"Both",Neither:"Neither"};sap.zen.commons.layout.Separation={None:"None",Small:"Small",SmallWithLine:"SmallWithLine",Medium:"Medium",MediumWithLine:"MediumWithLine",Large:"Large",LargeWithLine:"LargeWithLine"};sap.zen.commons.layout.VAlign={Bottom:"Bottom",Middle:"Middle",Top:"Top"};return sap.zen.commons;});
