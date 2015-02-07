'use strict';

angular.module("mainApp")
	.factory("headerMessages", function($filter, $translate, $log) {
		return {

			hide: function() {

			},

			showErrorRest: function(msg) {
				var targetJSON,
					alertMsg = [];

				targetJSON = "ERROR_CONEXION.";

				if ( (new RegExp("^4")).test(msg) ) {
					msg = $filter('translate')(targetJSON+'GENERIC_400');
				
				} else if ( (new RegExp("^5")).test(msg) ) {
					msg = "ERROR 500";
				
				} else {
					msg = "ERROR genérico";
				}

				alertMsg = [{ 'type': 'strong-danger', 'msg': msg }];
				
				return alertMsg;
			}
		}


	});