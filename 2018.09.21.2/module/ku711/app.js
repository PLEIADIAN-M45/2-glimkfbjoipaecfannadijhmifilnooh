 define([], function() {
     var myApp = angular.module('OBSApp');
     myApp.body = document.querySelector('[ng-controller]');
     return myApp;
 });