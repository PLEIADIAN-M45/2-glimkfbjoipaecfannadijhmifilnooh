function invoke() {
    fnStylesheet();
    fnComponents();
    console.log('_invoke......');
}

function fnStylesheet() {
    $scope.stylesheet.forEach(function(name) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./css/" + name + ".css");
        link.onload = function() {
            //console.log(link.href);
        }
        document.body.appendChild(link);
    });
}

function fnComponents() {
    $scope.components.forEach((name) => {
        var templateUrl = require.toUrl("./html/" + name + ".html");
        fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {
            var template = angular.element(html);
            $element.append(template);
            $compile(template)($scope);
            //console.log(666666666, 777777777);
            $scope.template_loaded = 1;
            $scope.$apply();
        })
    })
}


define(['angular', 'angular-sanitize', 'factory'], function(angular, sanitize, factory) {

    window.angular = angular;
    'use strict';

    var myApp2 = angular.module('myApp2', [])
        .config(function($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            //console.log($locationProvider);
            //$locationProvider.html5Mode(true).hashPrefix('!');

        })
        .service('myService', function() {
            console.log("myService");
        })

        .controller('LocationController', ['$scope', '$location', function($scope, $location) {
            console.log($location);
            $scope.name3 = "RYABN"

            /*$scope.$location = {};
            angular.forEach('protocol host port path search hash'.split(' '), function(method) {
                $scope.$location[method] = function() {
                    var result = $location[method]();
                    return angular.isObject(result) ? angular.toJson(result) : result;
                };
            });*/
        }]).directive('sayhello', function() {
            return {
                restrict: 'E',
                template: '<div>Hello {{ name3 }}</div>',
                // 也可以使用 templateUrl 指定檔案
                // templateUrl: 'test.html'
            };
        });




    var div = $('<div ng-controller="LocationController"></div>')
    div.appendTo('body');


    angular.bootstrap(div, ['myApp2']);

    console.log(div);

    return

    $('body').append('<sayhello></sayhello>')


    $('body').attr("ng-controller", "LocationController")
    angular.bootstrap(document.body, ['myApp2']);

    try {
       angular.bootstrap(document.body, ['myApp']);
   } catch (ex) {};
    console.log(myApp2);
    //var c = angular.injector(['ng', 'myApp2']).get('myService');
    //var c = angular.injector(['ng', 'myApp2']).get('$location');

    console.log(angular);


    return


    var myApp = angular.module('OBSApp', ['ngSanitize']);
    myApp.baseUrl = require.toUrl('.');
    myApp.config(function($sceDelegateProvider) {
        //$sceDelegateProvider.resourceUrlBlacklist(['']);
        //$sceDelegateProvider.resourceUrlWhitelist(['self', myApp.baseUrl, myApp.baseUrl + '**']);
    });
    try { angular.bootstrap(document, ['OBSApp']); } catch (ex) {};




    /***********************************************************************************/
    var ng_controller = $("[ng-controller]")[0] || $("body");
    var $element = angular.element(ng_controller);
    var $rootElement = $element[0];
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');
    myApp = $injector.modules['OBSApp'];


    var c = angular.injector(['ng', 'myApp2']).get('$location');
    //var c = angular.injector(['ng', 'myApp2']).get('$rootElement');


    console.log(c);


    console.log(angular);
    console.log(angular.injector);


    //console.log(ng_controller);
    //console.log($element);



    /*
    console.log(myApp);
    console.log($injector);
    */


    //loadModules.call($scope)

    //loadModules($scope, $rootElement);


    Object.assign(myApp, { $element, $rootElement, $scope, $injector, $invoke, $compile });

    window.extend({ myApp, $element, $rootElement, $scope, $injector, $invoke, $compile });


    return myApp;
});



/*
console.log($injector.modules['OBSApp']);
console.log($injector);
console.log($scope.Service.txtCellPhone.$modelValue);*/
//console.log($scope.StatusEnum);

//console.log($scope.Service.txtBirthDay.$modelValue);