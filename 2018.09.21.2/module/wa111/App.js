define(["angular", "angular-sanitize", "angular-animate"], function(angular) {
    var rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'View');
    rootElement.setAttribute('ng-controller', 'View');
    angular.element(document.body).append(rootElement);
    var app = angular.module('OBSApp', ["ngSanitize", "ngAnimate"]);
    app.controller('View', function($scope, $rootScope) {});
    angular.bootstrap(document, ['OBSApp']);
});