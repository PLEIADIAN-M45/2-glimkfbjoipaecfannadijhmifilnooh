define(["angular", "angular-sanitize", "angular-animate", "app.instance"], function(angular) {
    $('html').attr('ng-app', 'OBSApp');
    $('body').append('<div ng-controller="View" id="View"></div>');
    var app = angular.module('OBSApp', ["ngSanitize", "ngAnimate"]);
    function viewController($scope, $rootScope) {};
    app.controller('View', viewController);
    angular.bootstrap(document, ['OBSApp']);
    return app;
});











/*
app.factory('myFactory', function() {
    var _artist = '';
    var service = {}
    service.getArtist = function() { return _artist }
    return service;
})
*/