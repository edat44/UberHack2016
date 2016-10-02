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
      if($("#login_form_tutor").hasClass("show")){
        $("#login_form_tutor").toggleClass("show");
      }
      $("#login_form_student").toggleClass("show");
    }

    vm.toggle_tutor = function(){
      if($("#login_form_student").hasClass("show")){
        $("#login_form_student").toggleClass("show");
      }
      $("#login_form_tutor").toggleClass("show");
    }
    vm.formdata = {Name: '', : 18};

    vm.post_click_student = function(){

    }

    vm.post_click_tutor = function(){
	$http.post('/api/v1/locations', {user: vm.formdata})
	.then(success=>console.log(success), err=>console.error(err));
    };
}

})();
