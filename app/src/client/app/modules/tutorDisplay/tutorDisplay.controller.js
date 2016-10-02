(function(){
'use strict';

angular.module('App')
    .controller('TutorDisplayContoller', TutorDisplayContoller);

    /*
    var comments = [
    {'name': 'Joe', 'grade': 'Sophomore', 'location': 'ONeill Fishbowl'},
    {'name': 'Mary', 'grade': 'Freshman', 'location': 'Library'},
    {'name': 'Eric', 'grade': 'Senior', 'location': 'LaFun'}
    ];
    */

TutorDisplayContoller.$inject = ['$http'];

function TutorDisplayContoller($http){
    let vm = this;
    vm.studentId = "57f096910fa46717cca3e491"
    vm.subject = 'pi';
    vm.tutors = [];
    vm.numTutors = -17;

    //getStudent();
    //getTutors();

    //console.log(vm.tutors);

    //populateTutors();

    //console.log("Tutors have been populated");
    doEverything();



    function getStudent() {
      console.log("getting student");
      $http.get('/api/v1/students').then(function success(res){
        //console.log(success);
        vm.students = res.data;
        for (var i = 0; i < vm.students.length; i++) {
          //console.log(vm.students[i]);
          if (vm.students[i]['_id'] == vm.studentId) {
            vm.subject = vm.students[i].subject;
          }
          //console.log(vm.subject);
        }
      }, err=>console.error(err));
    }

    function getTutors() {
      console.log("Getting tutors");
      $http.get('/api/v1/tutors').then(function success(res){
        //console.log(success);
        var tutors = res.data;
        for (var i = 0; i < tutors.length; i++) {
          for (let key in tutors[i].subject) {
            //console.log("key: " + key + ", value: " + tutors[i].subject[key]);
            //console.log(tutors[i].subject.hasOwnProperty(key));
            //console.log(tutors[i].subject[key] == true);
            //console.log(key === vm.subject);
            if (tutors[i].subject.hasOwnProperty(key) && tutors[i].subject[key] == true && key == vm.subject) {
              vm.tutors.push(tutors[i]);
              //console.log(vm.tutors.length);
            }
          }
        }
        //console.log(vm.tutors);
        for (var i = 0; i < vm.tutors.length; i++) {
          console.log(vm.tutors[i]);
        }
        console.log(vm.tutors);
        vm.numTutors = vm.tutors.length;
        console.log(vm.numTutors);
      }, err=>console.error(err));
    }

    function populateTutors(tuts) {
      console.log("POPULATING TUTORS");

      console.log(vm.numTutors);

      for (var i = 0; i < vm.numTutors; i++) {
        console.log("Making tutor " + i);
        var tutor = vm.tutors[i];
        console.log(tutor);
        var content = document.querySelector('template').content;
        // Update something in the template DOM.
        var tname = content.querySelector('#name');
        var tgrade = content.querySelector('#grade');
        var tlocation = content.querySelector('#location');
        tname.textContent = tutor.name;
        tgrade.textContent = tutor.grade;
        tlocation.textContent = tutor.location;
        document.querySelector('#container').appendChild(
          document.importNode(content, true));
      }
    }

    function doEverything() {
      getStudent();
      getTutors();
      setTimeout(populateTutors, 1000);
    }

}    // Create a map object and specify the DOM element for display.
})();


// Get a reference to the comments list in the main DOM.
