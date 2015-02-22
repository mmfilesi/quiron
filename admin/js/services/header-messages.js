'use strict';

/* DEPRECATED */

angular.module("adminApp")
	.factory("headerMessages", function($filter, $translate, $log) {
		return {

			hide: function() {

			},

			showErrorRest: function(msg) {
				var targetJSON,
					alertMsg = [];

				//targetJSON = "ERROR_CONEXION.";

				/* if ( (new RegExp("^4")).test(msg) ) {
					msg = $filter('translate')(targetJSON+'GENERIC_400');				
				} */

				alertMsg = [{ 'type': 'strong-danger', 'msg': msg }];
				
				return alertMsg;
			}
		}


	});