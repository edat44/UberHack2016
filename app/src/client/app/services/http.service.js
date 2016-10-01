/**
* http.service.js
*
* This service acts as a wrapper to the naitive Angular
* $http service. It allows you to easily attack auth
* headers to requests.
*
*/

(function(){
'use strict';

angular.module('App')
    .service('http', HttpService);

HttpService.$inject = ['$http', '$cookies'];

function HttpService($http, $cookies){
    const api_prefix = '/api/v1';
    let service = {};

    service.get    = get;
    service.post   = post;
    service.remove = remove;

    return service;

    //=================
    // Service methods
    //=================

    function get(endpoint, auth_flag){
        return $http.get(api_prefix + endpoint,
            auth_flag?(new Config):{});
    }

    function post(endpoint, data, auth_flag){
        return $http.post(api_prefix + endpoint, data.
            auth_flag?(new Config):{});
    }

    function remove(endpoint, auth_flag){
        return $http.delete(api_prefix + endpoint,
            auth_flag?(new Config):{});
    }

    //==================
    // Helper functions
    //==================

    function Config(){
        this.headers = {
            authorization: $cookies.get('token')
        };
    }
}

})();
