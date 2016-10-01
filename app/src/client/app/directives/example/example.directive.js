/**
* example.directive.js
*
* A small directive to demonstrate the use of directives
* and dependency injection in Angular.
*
*/

(function(){
'use strict';

angular.module('App')
    .directive('example', ExampleDirective);

ExampleDirective.$inject = ['http'];

function ExampleDirective(http){
    return {
        restrict: 'E',
        link: link,
        scope: {data: '@'},
        templateUrl: 'app/directives/example/example.template.html'
    };

    function link(scope, elem, atts){
        scope.test = 'test data';
    }
}

})();
