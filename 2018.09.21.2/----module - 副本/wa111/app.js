define(['angular', 'angular-sanitize'], function(angular) {
    console.log(1);

    'use strict';
    window.angular = angular;
    var myApp = angular.module('myApp', ['ngSanitize']);
    angular.bootstrap(document, ['myApp']);
    return myApp;
});


var myApp = angular.module('myApp', ['ngSanitize']);