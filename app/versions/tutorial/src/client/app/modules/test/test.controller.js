(function(){
'use strict';

angular.module('App')
    .controller('TestController', TestController);


TestController.$inject = [];

function TestController(){
    let vm = this;
    vm.data = 'You\'re in the TEST state!';
}

})();
