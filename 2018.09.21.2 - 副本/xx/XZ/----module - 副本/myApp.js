define(['angular', 'angular-sanitize'], function(angular) {
    window.angular = angular;

    'use strict';

    var myApp = angular.module('OBSApp', []);
    try { angular.bootstrap(document, ['OBSApp']); } catch (ex) {}
    var ng_controller = $("[ng-controller]")[0] || $("body");
    var $element = angular.element(ng_controller);
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');
    window.extend({ myApp, $element, $scope, $injector, $invoke, $compile })
    return myApp;
});








//document.querySelector("[ng-controller]") || document.body;
//if (router.host == "wa111") {}
//$("[ng-controller]") || $("body");