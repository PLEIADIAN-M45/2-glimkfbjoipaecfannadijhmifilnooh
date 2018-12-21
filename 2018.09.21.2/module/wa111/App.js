define(["angular", "angular-sanitize", "angular-animate"], function(angular) {
    function viewController($scope, $rootScope) {};
    $(document.body).append('<div ng-controller="View" id="View"></div>');
    var app = angular.module('OBSApp', ["ngSanitize", "ngAnimate"])
    app.controller('View', viewController);
    
    app.factory('myFactory', function() {
        var _artist = '';
        var service = {}

        service.getArtist = function() {
            return _artist
        }

        return service;
    })

    angular.bootstrap(document, ['OBSApp']);


    return app
});