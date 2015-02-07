'use strict';

angular.module('adminApp')
	.controller('ConfigController', function($scope, $log, $q, configData, headerMessages) {

    configData.getConfigData()
        .success(function(data, status, headers, config) {
            var data = angular.fromJson(data);
            $scope.title    = data.title;
            $scope.subtitle = data.subtitle;
            $scope.navBar   = data.navBar;

        }).error(function(data, status, headers, config) {
            $scope.alerts = headerMessages.showErrorRest(status);
            $log.log("status: ", status);
            $log.log("config: ", config);
        });

});