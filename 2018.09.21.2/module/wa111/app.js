define(['angular', 'angular-sanitize'], function(angular) {



    'use strict';

    window.angular = angular;

    $("<b>").html("{{name}}").prependTo('body')
    $("<b>").html("-{{name2}}-").prependTo('body')


    document.body.setAttribute("ng-controller", "evo-ctrl");

    var myApp = angular.module('myApp', ['ngSanitize']);
    myApp.controller('evo-ctrl', function($scope) {
        $scope.name = "RYAN"
    });



    myApp.config(function($sceDelegateProvider) {
        var baseUrl = localStorage.baseUrl;
        $sceDelegateProvider.resourceUrlBlacklist(['']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
    });


    angular.bootstrap(document, ['myApp']);


    return myApp;
});