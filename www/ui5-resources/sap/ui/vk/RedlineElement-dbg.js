/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

// Provides a class for the redlining elements.
sap.ui.define([
	"jquery.sap.global", "sap/ui/core/Element"
], function(jQuery, Element) {
	"use strict";
		/**
		 * Base class for redline elements such as {sap.ui.vk.RedlinElementRectangle}, {sap.ui.vk.RedlinElementEllipse}, {sap.ui.vk.RedlinElementFreehand}.
		 *
		 * @class Provides a base class for redline elements.
		 *
		 * @public
		 * @author SAP SE
		 * @version 1.56.12
		 * @extends sap.ui.core.Element
		 * @alias sap.ui.vk.RedlineElement
		 * @experimental Since 1.40.0 This class is experimental and might be modified or removed in future versions.
		 */

	var RedlineElement = Element.extend("sap.ui.vk.RedlineElement", {
		metadata: {
			library: "sap.ui.vk",
			properties: {
				originX: {
					type: "float",
					defaultValue: 0
				},
				originY: {
					type: "float",
					defaultValue: 0
				},
				opacity: {
					type: "float",
					defaultValue: 1
				},
				strokeWidth: {
					type: "float",
					defaultValue: 2
				},
				strokeColor: {
					type: "sap.ui.core.CSSColor",
					defaultValue: "#e6600d"
				},
				startingX: {
					type: "float",
					defaultValue: 0
				},
				startingY: {
					type: "float",
					defaultValue: 0
				}
			}
		}
	});

	RedlineElement.prototype.init = function() {

	};

	RedlineElement.prototype.onAfterRendering = function() {

	};

	RedlineElement.prototype.setOriginX = function(originX) {
		this.setProperty("originX", originX, false);
	};

	RedlineElement.prototype.setOriginY = function(originY) {
		this.setProperty("originY", originY, false);
	};

	RedlineElement.prototype.setStartingX = function(originX) {
		this.setProperty("startingX", originX, true);
	};

	RedlineElement.prototype.setStartingY = function(originY) {
		this.setProperty("startingY", originY, true);
	};

	RedlineElement.prototype.applyZoom = function() {

	};

	/**
	 * This method is called by the RenderManager. The current method is empty because this is a base class
	 * and the classes extending this class have their own implementations of the <code>render</code> method.
	 * @param { sap.ui.core.RenderManager} renderManager Instance of RenderManager.
	 * @public
	 */
	RedlineElement.prototype.render = function(renderManager) {

	};

	/**
	 * Exports all the relevant data contained in the redline element to a JSON-like object.
	 * @returns {object} JSON Relevant data that can be serialized and later used to restore the redline element.
	 * @public
	 */
	RedlineElement.prototype.exportJSON = function() {
		return {
			originX: this.getOriginX(),
			originY: this.getOriginY(),
			opacity: this.getOpacity(),
			strokeColor: this.getStrokeColor(),
			strokeWidth: this.getStrokeWidth()
		};
	};

	/**
	 * Imports data from a JSON-like object into the redline element.
	 * @param {object} json Relevant data that can be used to restore the redline element.
	 * @returns {sap.ui.vk.RedlineElement} <code>this</code> to allow method chaining.
	 * @public
	 */
	RedlineElement.prototype.importJSON = function(json) {

		if (json.hasOwnProperty("originX")) {
			this.setOriginX(json.originX);
		}

		if (json.hasOwnProperty("originY")) {
			this.setOriginY(json.originY);
		}

		if (json.hasOwnProperty("opacity")) {
			this.setOpacity(json.opacity);
		}

		if (json.hasOwnProperty("strokeColor")) {
			this.setStrokeColor(json.strokeColor);
		}

		if (json.hasOwnProperty("strokeWidth")) {
			this.setStrokeWidth(json.strokeWidth);
		}

		return this;
	};

	/**
	 * Exports all the relevant data contained in the redline element to an SVG shape element.
	 * @returns {object} SVG Relevant data that can be used to restore the redline element.
	 * @public
	 */
	RedlineElement.prototype.exportSVG = function() {
		return {
			originX: this.getOriginX(),
			originY: this.getOriginY(),
			opacity: this.getOpacity(),
			strokeColor: this.getStrokeColor(),
			strokeWidth: this.getStrokeWidth()
		};

	};

	/**
	 * Imports data from an SVG object into the redline element.
	 * @param {object} svg Relevant data that can be used to restore the redline element.
	 * @returns {sap.ui.vk.RedlineElement} <code>this</code> to allow method chaining.
	 * @public
	 */
	RedlineElement.prototype.importSVG = function(svg) {

		if (svg.getAttribute("x")) {
			this.setOriginX(parseFloat(svg.getAttribute("x")));
		}

		if (svg.getAttribute("y")) {
			this.setOriginY(parseFloat(svg.getAttribute("y")));
		}

		if (svg.getAttribute("stroke-opacity")) {
			this.setOpacity(parseFloat(svg.getAttribute("stroke-opacity")));
		}

		if (svg.getAttribute("stroke")) {
			this.setStrokeColor(svg.getAttribute("stroke"));
		}

		if (svg.getAttribute("stroke-width")) {
			this.setStrokeWidth(parseFloat(svg.getAttribute("stroke-width")));
		}

		return this;
	};

	return RedlineElement;
});
