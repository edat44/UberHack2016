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
    vm.formdata = {};

    vm.toggle_student = function(){
      vm.formdata.subject = null;
      if($("#login_form_tutor").hasClass("show")){
        $("#login_form_tutor").toggleClass("show");
      }
      $("#login_form_student").toggleClass("show");
    };

    vm.toggle_tutor = function(){
      vm.formdata.subject = null;
      if($("#login_form_student").hasClass("show")){
        $("#login_form_student").toggleClass("show");
      }
      $("#login_form_tutor").toggleClass("show");
    };



    vm.post_click_student = function(){
    location.href = "/#/test";
      //console.log("Adding student?");
  	$http.post('/api/v1/addStudent', {user: vm.formdata})
  	.then(success=>console.log(success), err=>console.error(err));
    };

    vm.post_click_tutor = function(){
	$http.post('/api/v1/addTutor', {user: vm.formdata})
	.then(success=>console.log(success), err=>console.error(err));
    };
}

})();
