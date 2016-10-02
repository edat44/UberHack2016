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

    vm.toggle_student = function(){
      $("#login_form").toggleClass("show");
    }

    vm.toggle_tutor = function(){
      $("#login_form").toggleClass("show");
    }
    vm.formdata = {Name: '', Age: 18};

    vm.post_click = function(){
	$http.post('/api/v1/locations', {user: vm.formdata})
	.then(success=>console.log(success), err=>console.error(err));
    };
}

})();
