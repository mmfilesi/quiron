'use strict';

angular.module('adminApp')
	.controller('MainController', function($scope, $log, $q, configData, $filter, $translate) {

    configData.getConfigBasic()
        .success(function(data, status, headers, config) {
            var data = angular.fromJson(data);
            $scope.title    = data.title;
            $scope.subtitle = data.subtitle;
            $scope.navBar   = data.navBar;

        }).error(function(data, status, headers, config) {
            // OJO, VOLVER A PONER LOS ALERTS AHÍ... $scope.alerts = headerMessages.showErrorRest("error "+status+": "+angular.fromJson(data));
        });

    $scope.mainBar = [
        {'link': '#/',          'value': 'HOME',        'icon': 'glyphicon-home'},
        {'link': '#images',     'value': 'IMAGES',      'icon': 'glyphicon-picture'},
        {'link': '#albums',     'value': 'ALBUMS',      'icon': 'glyphicon-th-list'},
        {'link': '#tags',       'value': 'TAGS',        'icon': 'glyphicon-tags'},
        {'link': '#pages',      'value': 'SIDEBAR',     'icon': 'glyphicon-list-alt'},
        {'link': '#sidebar',    'value': 'PAGES',       'icon': 'glyphicon-pencil'},
        {'link': '#config',     'value': 'CONFIG',      'icon': 'glyphicon-wrench'},
        {'link': '#user',       'value': 'USERS',       'icon': 'glyphicon-user'}
    ];

    $scope.selected = 0;
    $scope.loadingConfigValue = 25;
    $scope.setSelected= function(index) {
        $scope.selected = index;         
    }

});