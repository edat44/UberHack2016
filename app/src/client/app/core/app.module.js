/**
* app.module.js
*
* Instantiate the Angular module. Note in the
* gulpfile, that this is the first file added
* to app.js
*
*/

(function(){
'use strict';

angular.module('App', [
    'ui.router',
    'ngCookies',
    'angularUtils.directives.dirPagination',
]);

})();
