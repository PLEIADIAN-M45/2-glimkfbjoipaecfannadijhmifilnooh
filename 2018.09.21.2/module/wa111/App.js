define([

    "angular", "angular-sanitize", "angular-animate"

], function(angular) {


    var rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'View');
    rootElement.setAttribute('ng-controller', 'View');
    
    angular.element(document.body).append(rootElement);
    angular.module('OBSApp', ["ngSanitize", "ngAnimate"]).controller('View', function($scope, $rootScope) {});
    angular.bootstrap(document, ['OBSApp']);


});










//angular.injector(['ng']);
//console.log(1);
//console.log(OBSApp);
//return new OBSApp().$scope;