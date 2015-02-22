'use strict';

/* Interceptors */
angular.module('adminApp')
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


angular.module('adminApp')
    .factory('configData', function($http) {

        var urlBase = "../rest/";

        return {

            getConfigBasic:function() {                                     
                return $http.get(urlBase+'config');
            },

            setConfigBasic: function(payload) {
                if ( payload ) {
                    return $http.put(urlBase+'config', payload);
                } else {
                    return false;
                }
            }

        }
 
    });