/**
* master.controller.js
*
* This is the controller of the <html> element, and
* thus has control over the entire app. At present, its
* main responsibility is updating the page title on
* state change.
*
*/

(function(){
'use strict';

angular.module('App')
    .controller('MasterController', MasterController);

MasterController.$inject = ['$scope', '$filter', '$state'];

function MasterController($scope, $filter, $state){
    let vm = this;

    vm.states = $state.get().reduce((init, state)=>{
        if(state.name) init.push(state);
        return init;
    }, []);

    $scope.$on('$stateChangeSuccess', ()=>{
        let title = $state.current.name + ' | My App';
        $('title').html($filter('capitalize')(title));
    });
}

})();
