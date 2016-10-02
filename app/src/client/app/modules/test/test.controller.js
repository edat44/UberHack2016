(function(){
'use strict';

angular.module('App')
    .controller('TestController', TestController);

    var comments = [
    {'name': 'Joe', 'grade': 'Sophomore', 'location': 'ONeill Fishbowl'},
    {'name': 'Mary', 'grade': 'Freshman', 'location': 'Library'},
    {'name': 'Eric', 'grade': 'Senior', 'location': 'LaFun'}
    ];

TestController.$inject = ['$http'];

function TestController($http){
    let vm = this;
    vm.data = 'You\'re in the TEST state!';


    for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    var content = document.querySelector('template').content;
    // Update something in the template DOM.
    var tname = content.querySelector('#name');
    var tgrade = content.querySelector('#grade');
    var tlocation = content.querySelector('#location');
    tname.textContent = comment.name;
    tgrade.textContent = comment.grade;
    tlocation.textContent = comment.location;
    document.querySelector('#container').appendChild(
        document.importNode(content, true));
    }

}    // Create a map object and specify the DOM element for display.
})();


// Get a reference to the comments list in the main DOM.
