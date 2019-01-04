
require(["angular", "jquery", "moment", "dexie"], function() {
    console.log(12);
    require([], function() {


    })
})


console.log(this.$server);


if (this.$server == "wa111") {
    /*
    define(["angular", "angular-sanitize", "angular-animate"], function(angular) {
        $('html').attr('ng-app', 'OBSApp');
        $('body').append('<div ng-controller="View" id="View"></div>');
        var app = angular.module('OBSApp', ["ngSanitize", "ngAnimate"]);

        function viewController($scope, $rootScope) {};
        app.controller('View', viewController);
        angular.bootstrap(document, ['OBSApp']);
        return app;
    });
    */

}

if (this.$server == "ku711") {


}






/*define(["app.router"], function(Router) {
    var router = new Router();
    if (router.service == undefined) { return false }
    requirejs(['app.instance', 'app.factory', router.main], function(instance, factory, main) {
        var $container               = $("[ng-controller]");
        var $controller              = angular.element($container);
        var $injector                = $controller.injector();
        var $scope                   = $controller.scope();
        $scope.__proto__.$container  = $container;
        $scope.__proto__.$controller = $controller;
        $scope.__proto__.$injector   = $injector;
        $scope.__proto__.$invoke     = $injector.invoke;
        $scope.__proto__.join        = function join() { Object.assign(this.__proto__, ...arguments); }
        $scope.$invoke(Router, $scope);
        $scope.$invoke(factory, $scope);
        $scope.$loadModule();
    })
})*/



//var main = ["module", localStorage.server, "main"].join("/");
//console.log(main);
