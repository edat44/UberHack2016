/**
* home.controller.js
*
* Contains the ViewModel of the home (default) state.
*
*/

(function(){
'use strict';

angular.module('App')
    .controller('HomeController', HomeController);

HomeController.$inject = [];

function HomeController(){
    let vm = this;
    vm.data = 'It works!';
}

})();
