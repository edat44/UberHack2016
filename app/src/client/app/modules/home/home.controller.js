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

HomeController.$inject = ['$http'];

function HomeController($http){
    let vm = this;
    vm.data = 'It works!';
    vm.student_hidden = true;

    vm.toggle_student = function(){
      $(".login").toggleClass("show");
    }

    vm.formdata = {name: '', age: 18};

    vm.post_click = function(){
    	var myvar = "asfdsadfsadfsdaf" + Date.now() + Math.random();
	$http.post('/api/v1/locations', {user: vm.formdata})
	.then(success=>console.log(success), err=>console.error(err));
    };
}

})();
