(function() {

	angular.module('App')
		.controller('HackController', HackController);
	HackController.$inject = [];
	function HackController() {
		let vm = this;
		vm.name = "EDDDIE";
	}

})();