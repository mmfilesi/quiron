'use strict';

var adminModule = angular.module('adminApp', ['ngRoute', 'ui.bootstrap', 'pascalprecht.translate'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home-view.html",
                controller: "HomeController"
            })
            .when("/config", {
                templateUrl: "views/config-view.html",
                controller: "ConfigController"
            })
            .otherwise({
                reditrectTo: "/"
            });

           //$locationProvider.html5Mode(true);

    }).config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('basicHttpInterceptor');

    }]).config(['$translateProvider', function ($translateProvider) {
        /* Valor por defecto */
        $translateProvider.preferredLanguage('es');
        
       $translateProvider.useStaticFilesLoader({
            prefix: 'langs/',
            suffix: '.json'
        });

    }]);

// TODO. Sacar de aquí

angular.module('adminApp')
    .directive('commonHeader', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                alerts: '=',
                title: '@',
                subtitle: '@',
                navbar: '=',
                selected: '@'
            },
            templateUrl: "views/common-header.html",
            link: function link(scope, element, attributes, aController) {
                scope.closeAlert = function(index) {
                    scope.alerts.splice(index, 1);
                };
            }
        }
    });

angular.module('adminApp')
    .directive('commonSidebar', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                alerts: '=',
                title: '@',
                subtitle: '@',
                navbar: '=',
                selected: '@'
            },
            templateUrl: "views/common-sidebar.html",
            link: function link(scope, element, attributes, aController) {
                scope.closeAlert = function(index) {
                    scope.alerts.splice(index, 1);
                };
            }
        }
    });