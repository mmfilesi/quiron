'use strict';

angular.module('mainApp')
	.controller('MainController', function($scope, $log, $q, configData, headerMessages) {

    configData.getConfigData()
        .success(function(data, status, headers, config) {
           // var data = angular.fromJson(data);
            console.log(data)
            $scope.title    = data.title;
            $scope.subtitle = data.subtitle;
            $scope.navBar   = data.navBar;

        }).error(function(data, status, headers, config) {
            $scope.alerts = headerMessages.showErrorRest(status);
            $log.log("status: ", status);
            $log.log("config: ", config);
        });


    $scope.selected = "pepito"; 

    // Llevar al configData

    var urlBase = "../content/dummy/";

    $scope.dataImgs = [
    	{"url":urlBase+"img1.jpg", "title":"aaaa"},
    	{"url":urlBase+"img2.jpg", "title":"aas"},
    	{"url":urlBase+"img3.jpg", "title":"rrrs"}
    	];

});