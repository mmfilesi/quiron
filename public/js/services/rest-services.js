'use strict';

/* Interceptors */
angular.module('mainApp')
.factory('basicHttpInterceptor', function($q, $log) {
  return {
    /* 'request': function(config) {
      console.log('00', config);
      config.headers['X-Auth-Token'] = "bar";
        return config;
    },*/


   /* 'requestError': function(rejection) {
     $log.log('requestError', rejection);
      return $q.reject(rejection);
    },

    'response': function(response) {
      return response;
    },

   'responseError': function(rejection) {
      $log.log('responseError', rejection);     
      return $q.reject(rejection);      
    } */
  };
});

//$httpProvider.interceptors.push('basicHttpInterceptor');


angular.module('mainApp')
    .factory('configData', function($http) {

        var config = null,
            urlBase = "../rest/";

        if ( config ) {
            return config;

        }   else {
                return {
                    getConfigData:function() {
                   // $log.log($http.defaults.headers);                  
                    return $http.get(urlBase+'config');
                }
            }
        }

    });