

define(['angular', 'angular-route', 'angular-sanitize', 'evo'], function(angular) {
    window.assign({ angular });
    'use strict';
    document.body.setAttribute("ng-controller", "evo-ctrl");
    var app = angular.module('app', ['ngSanitize']);
    app.controller('evo-ctrl', function() {});
    app.config(function($sceDelegateProvider) {
        var baseUrl = evo.baseUrl;
        $sceDelegateProvider.resourceUrlBlacklist(['']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
    })

    angular.bootstrap(document, ['app']);


    return app;
});
