sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		return Controller.extend("leverx.app.controller.ThirdPage", {
			
			nextPageClick: function(oEvent) {
				var currentRouter = sap.ui.core.UIComponent.getRouterFor(this);
				currentRouter.navTo("first");
			},
			
			prevPageClick: function(oEvent) {
				var currentRouter = sap.ui.core.UIComponent.getRouterFor(this);
				currentRouter.navTo("second");
			}
		});
	}
);
