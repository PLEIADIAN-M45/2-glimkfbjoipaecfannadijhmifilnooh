define(['angular', 'angular-route', 'angular-sanitize'], function(angular) {

    console.log(1);

    window.angular = angular;

    'use strict';

    document.body.setAttribute("ng-controller", "evo-ctrl");

    $("<b>").html("{{name}}").prependTo('body')

    var app = angular.module('app', ['ngSanitize']);

    app.controller('evo-ctrl', function($scope) {
        $scope.name = "RYAN"
    });

    app.config(function($sceDelegateProvider) {
        var baseUrl = localStorage.baseUrl;
        $sceDelegateProvider.resourceUrlBlacklist(['']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
    });


    angular.bootstrap(document, ['app']);

    console.log(app);

    return app;
});