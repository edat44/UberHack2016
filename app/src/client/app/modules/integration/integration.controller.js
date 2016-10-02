/**
* hack.controller.js
*
* Contains the ViewModel of the home (default) state.
*
*/

(function(){
'use strict';

angular.module('App')
    .controller('IntegrationController', IntegrationController);

IntegrationController.$inject = ['$http'];

function IntegrationController($http){
    let vm = this;

    vm.studentId = "57f096910fa46717cca3e491"
    vm.subject = 'pi';
    vm.tutors = new Array();

    var students = 5;

    vm.post_click = function(){
      $http.get('/api/v1/students').then(function success(res){
        //console.log(success);
        vm.students = res.data;
        for (let i = 0; i < vm.students.length; i++) {
          console.log(vm.students[i]);
          if (vm.students[i]['_id'] == vm.studentId) {
            vm.subject = vm.students[i].subject;
          }
          console.log(vm.subject);
        }
      }, err=>console.error(err));
    };

  vm.post_click2 = function(){
    $http.get('/api/v1/tutors').then(function success(res){
      //console.log(success);
      var tutors = res.data;
      for (var i = 0; i < tutors.length; i++) {
        for (let key in tutors[i].subject) {
          console.log("key: " + key + ", value: " + tutors[i].subject[key]);
          console.log(tutors[i].subject.hasOwnProperty(key));
          console.log(tutors[i].subject[key] == true);
          console.log(key === vm.subject);
          if (tutors[i].subject.hasOwnProperty(key) && tutors[i].subject[key] == true && key == vm.subject) {
            vm.tutors.push(tutors[i]);
          }
        }
      }
      console.log(vm.tutors);
      for (var i = 0; i < vm.tutors.length; i++) {
        console.log(vm.tutors[i]);
      }
    }, err=>console.error(err));
  };
}

})();
