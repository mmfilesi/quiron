'use strict';

var mainModule = angular.module('mainApp', ['ngRoute', 'ui.bootstrap', 'pascalprecht.translate'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/main-view.html",
                controller: "MainController"
            })
            .when("/page", {
                templateUrl: "views/page-view.html",
                controller: "PageController"
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

angular.module('mainApp')
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

angular.module('mainApp')
    .directive('commonCarousel', ['$interval', function($interval) {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {
                imgs: "="
            },
            templateUrl: "views/common-carousel.html",
            controller: function($scope, $element) {
            },
            link: function(scope, element, attrs) {
                var maxImg  = scope.imgs.length-1,
                    delay   = 6000,
                    startInterval,
                    slides;

                scope.count      = 0;
                scope.carouselOn = true;

                function moveCarousel() {                  
                    if ( scope.count == maxImg ) {
                        scope.count = 0;
                    } else {
                        scope.count++;
                    }         
                }

                startInterval = $interval(moveCarousel, delay);

                scope.stopCarousel = function () {                                
                    if (  scope.carouselOn ) { 
                        $interval.cancel(startInterval);
                    } else {
                        startInterval = $interval(moveCarousel, delay);
                    }
                    scope.carouselOn = !scope.carouselOn;
                }

                element.on('$destroy', function() {
                    $interval.cancel(startInterval);
                });
       
            }
    }
}]);