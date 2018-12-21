define(['app', 'app.service'], function(app, service2) {


    app.factory('myFactory', function() {
        var service = {};
        return service;
    });

    app.factory('myFactory2', function() {
        var _artist = '';
        var service = {}

        service.getArtist = function() {
            return _artist
        }

        return service;
    })



    return new function() {


        this.$name = "OBSApp";
        this.$element = document.querySelector('[ng-controller]');
        this.$view = angular.element(this.$element);
        this.$module = angular.module(this.$name);
        this.$scope = this.$view.scope();
        this.$injector = this.$view.injector();
        this.$compile = this.$injector.get('$compile');
        this.$invoke = this.$injector.invoke;
        this.$rootScope = this.$scope.$root;
        this.$scope.$view = this.$view;
        this.$scope.$compile = this.$compile;


        

        //console.log(this.$module);

      
    



        /*
        var injector = this.$view.injector();
        var tmpFn = function($compile, $rootScope, $http, $sce, $rootElement, $location, myFactory) {
            console.log(myFactory);
        };
        injector.invoke(tmpFn);
        // tmpFn.$inject = ['$compile', '$rootScope'];
        */





    }
});




/*
service
$anchorScroll
$animate
$animateCss
$cacheFactory
$compile
$controller
$document
$exceptionHandler
$filter
$http
$httpBackend
$httpParamSerializer
$httpParamSerializerJQLike
$interpolate
$interval
$jsonpCallbacks
$locale
$location
$log
$parse
$q
$rootElement
$rootScope
$sce
$sceDelegate
$templateCache
$templateRequest
$timeout
$window
$xhrFactory
*/