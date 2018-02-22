sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		return Controller.extend("leverx.app.controller.FirstPage", {
			onMyButtonPress: function() {
				var currentRouter = sap.ui.core.UIComponent.getRouterFor(this);
				currentRouter.navTo("second");
			}
		});
	}
);
