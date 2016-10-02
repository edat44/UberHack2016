/**
* hack.controller.js
*
* Contains the ViewModel of the home (default) state.
*
*/

(function(){
'use strict';

angular.module('App')
    .controller('HackController', HackController);

HackController.$inject = ['$http'];

function HackController($http){
    let vm = this;
    vm.data = 'It works!';

    vm.formdata = {name: '', age: 18};

    vm.post_click = function(){
		$http.post('/api/v1/addPerson', {user: vm.formdata})
	.then(success=> {
    console.log(success);
    alert(vm.formdata.name + " has been added!");
    }, err=>console.error(err));
  };
}

})();
