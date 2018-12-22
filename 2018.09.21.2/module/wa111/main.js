define(["angular", "angular-sanitize", "angular-animate", "app.instance"], function(angular) {


    console.log(1, 2);
    

    $('html').attr('ng-app', 'OBSApp');
    $('body').append('<div ng-controller="View" id="View"></div>');


    function viewController($scope, $rootScope) {};
    var app = angular.module('OBSApp', ["ngSanitize", "ngAnimate"])
    app.controller('View', viewController);
    app.factory('myFactory', function() {
        var _artist = '';
        var service = {}
        service.getArtist = function() { return _artist }
        return service;
    })

    angular.bootstrap(document, ['OBSApp']);
    return app;
});