'use strict';

angular.module('adminApp')
	.controller('HomeController', function($scope, $log, $q, configData, headerMessages) {

        configData.getConfigData()
            .success(function(data, status, headers, config) {
                $scope.title    = data.title;
                $scope.subtitle = data.subtitle;
                //$scope.navBar   = data.navBar;

            }).error(function(data, status, headers, config) {
                $scope.alerts = headerMessages.showErrorRest(status);
                $log.log("status: ", status);
                $log.log("config: ", config);
            });

        $scope.selected = "pepito";

        $scope.breadcrumb = [
            {'link':'/', 'rel':'home', 'value':'portada'},
            {'link':'', 'rel':'home', 'value':'otro'},
            {'link':'/', 'rel':'home', 'value':'tres'}
        ];

        $scope.breadcrumbSelected = "pepito";

});