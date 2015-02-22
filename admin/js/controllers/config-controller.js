'use strict';

angular.module('adminApp')
	.controller('ConfigController', ['$scope', function($scope) {
    
    //$scope.selected = 6; // todo.
   
    var init = {

        headerInit: function() {
            $scope.titleArea    = 'CONFIG_LONG';
            $scope.iconArea     = 'glyphicon-wrench';
            $scope.alerts       = [];
        },

        bindChildrens: function() {
            $scope.$on('showAlert', function(event, data) {
                console.log(event)
                $scope.alerts = data; 
            });

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };
        },

        init: function() {
            this.headerInit();
            this.bindChildrens();
        }
    };

    init.init();

}]);

/* ================================
    Basic Config
================================ */

angular.module('adminApp')
    .controller('ConfigControllerBasic', ['$scope', '$log', '$q', 'configData', '$interval', '$timeout', '$translate', function($scope, $log, $q, configData, $interval, $timeout, $translate) {

        $scope.submitBasicConfig = function() {
            sendForm.init();
        }

        var sendForm = {

            // todo: sacar el loading a un servicio común.

            init: function() {

                var startInterval;
                $scope.loadingConfigValue = 20;

                $scope.loadingConfigClass = true;

                function loadingProgress(delay) {
                    if ( $scope.loadingConfigValue < 50 ) {
                        $scope.loadingConfigValue += 1;
                    } else {
                        $interval.cancel(startInterval);
                    }
                }

                startInterval = $interval(loadingProgress, 50);

                this.setConfigBasic();

            },

            end: function() {

                $scope.loadingConfigValue = 100;
                $scope.loadingConfigClass = false;

                function hideProgress() {
                   $scope.loadingConfigValue = 0;                   
                }

                $timeout(hideProgress, 4000);
               
            },

            setConfigBasic: function() {

                var payload;

                payload = {
                    "title":    $scope.basicTitle,
                    "subtitle": $scope.basicSubtitle,
                    "lang":     parseInt($scope.basicLang)
                };

                configData.setConfigBasic(angular.toJson(payload))
                    .success(function(data, status, headers, config) {
                        var data = angular.fromJson(data);
                        sendForm.end();
                        //$scope.loadingConfigValue = 100;
                        //$scope.loadingConfigClass = false;                        

                        /* Cambiar el título general: todo */                       
                    
                        }).error(function(data, status, headers, config) {    
                            $scope.$emit('showAlert', [{ "type": "danger", "msg": "error "+status+": "+angular.fromJson(data) }]);
                            $scope.loadingConfigClass = false;
                        });
            }
        };        

        var init = {

            formInit: function() {
                $scope.loadingConfigClass = false;
                $scope.langs = [
                    {'key': '1', 'value':'LANGS.ENGLISH'},
                    {'key': '2', 'value':'LANGS.ITALIAN'},
                    {'key': '3', 'value':'LANGS.SPANISH'}
                    ];
            },

            initBasicConfig: function() {
                configData.getConfigBasic()
                    .success(function(data, status, headers, config) {
                        var data = angular.fromJson(data);
                        $scope.basicTitle    = data.title;
                        $scope.basicSubtitle = data.subtitle;
                        $scope.basicLang     = data.lang;

                    }).error(function(data, status, headers, config) {
                        $scope.alerts = headerMessages.showErrorRest("error "+status+": "+angular.fromJson(data));
                    });

            },

            init: function() {
                this.formInit();
                this.initBasicConfig();
            }
        };

        init.init();

    }]);
