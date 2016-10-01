/**
* app.config.js
*
* Set the config for the app, mainly state registration.
*
*/

(function(){
'use strict';

angular.module('App')
    .config(AppConfig);

AppConfig.$inject = [
    '$urlRouterProvider',
    '$stateProvider'
];

function AppConfig($urlRouterProvider, $stateProvider){
    $urlRouterProvider.when('', '/');

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: 'app/modules/home/home.template.html'
    })
    .state('test', {
        url: '/test',
        controller: 'TestController',
        controllerAs: 'vm',
        templateUrl: 'app/modules/test/test.template.html'
    })
    ;
}

})();
