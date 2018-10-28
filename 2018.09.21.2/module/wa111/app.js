define(['angular', 'angular-route', 'angular-sanitize'], function(angular) {

    window.angular = angular;

    'use strict';

    document.body.setAttribute("ng-controller", "evo-ctrl");

    var app = angular.module('app', ['ngSanitize']);

    app.controller('evo-ctrl', function() {});

    app.config(function($sceDelegateProvider) {
        var baseUrl = localStorage.baseUrl;
        $sceDelegateProvider.resourceUrlBlacklist(['']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
    });


    angular.bootstrap(document, ['app']);
    return app;
});