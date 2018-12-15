define([
    "OBSApp", "angular", "angular-sanitize", "angular-animate"
], function(OBSApp, angular) {
    var rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'View');
    rootElement.setAttribute('ng-controller', 'View');
    angular.module('OBSApp', ["ngSanitize", "ngAnimate"]).controller('View', function($scope, $rootScope) {});
    angular.element(document.body).append(rootElement);
    angular.bootstrap(document, ['OBSApp']);
    angular.injector(['ng']);
    return new OBSApp().$scope;
});