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

		.state('hack', {
			url: '/hack',
			controller: 'HackController',
			controllerAs: 'vm',
			templateUrl: 'app/modules/hack/hack.template.html'
		})

    .state('integration', {
      url: '/integration',
      controller: 'IntegrationController',
      controllerAs: 'vm',
      templateUrl: 'app/modules/integration/integration.template.html'
    })

    .state('tutorDisplay', {
      url: '/tutorDisplay',
      controller: 'TutorDisplayContoller',
      controllerAs: 'vm',
      templateUrl: 'app/modules/tutorDisplay/tutorDisplay.template.html'
    })
    ;
}

})();
