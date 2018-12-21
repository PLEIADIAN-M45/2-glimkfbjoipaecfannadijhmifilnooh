if (evo.host === 'wa111') {
    define(['angular', 'angular-route', 'angular-sanitize'], function(angular) {
        'use strict';
        var myApp =
            angular.module('myApp', ['ngSanitize'])
            .config(function($sceDelegateProvider) {
                var baseUrl = evo.baseUrl;
                $sceDelegateProvider.resourceUrlBlacklist(['']);
                $sceDelegateProvider.resourceUrlWhitelist([
                    'self', baseUrl, baseUrl + '**'
                ]);
            })
            .config(['$compileProvider', function($compileProvider) {
                //$compileProvider.debugInfoEnabled(false);
                //$compileProvider.commentDirectivesEnabled(false);
                //$compileProvider.cssClassDirectivesEnabled(false);
            }])
            .config(['$controllerProvider', function($controllerProvider) {
                $controllerProvider.register('MainCtrl', ['$scope', function($scope) {
                    $scope.name = 'Will';
                }]);
                myApp.controller = function(name, constructor) {
                    $controllerProvider.register(name, constructor);
                    return myApp;
                };
            }])
            .controller('defaultCtrl', ['$scope', '$controller', '$compile',
                function defaultCtrl($scope, $controller, $compile) {}
            ])
            .directive('directive', function() {
                return {
                    replace: false,
                    templateUrl: function(elem, attr) {
                        //console.log(evo.baseUrl + attr.url);
                        return evo.baseUrl + attr.url;
                    }
                };
            })
        /****************************************************************************************/
        if (evo.domain[0].includes('cashhost')) {
            window.myApp = myApp;
            return myApp;
        } else {
            var controller = document.getElementById('aspnetForm') || document.querySelector('form') || document.body;
            if (controller) {
                controller.setAttribute("ng-controller", "defaultCtrl");
                angular.bootstrap(document, ['myApp']);
                var controller = angular.element(controller);
                myApp.$target = controller;
                myApp.$scope = controller.scope();
                myApp.$injector = controller.injector();
                myApp.$compile = controller.injector().get('$compile');
                //myApp.$controller = controller.injector().get('$controller');
                window.myApp = myApp;
                return myApp;
            } else {
                console.log('no element', evo.filename);
                window.myApp = myApp;
                return myApp;
            }
        }
    });
}

if (evo.host === 'ku711') {
    define(function() {
        var myApp = angular.module('OBSApp')
        var controller = document.querySelector('[ng-controller]')
        if (controller) {
            var _controller = angular.element(controller);
            myApp.$target = controller;
            myApp.$scope = _controller.scope();
            myApp.$injector = _controller.injector();
            myApp.$compile = _controller.injector().get('$compile');
            //myApp.$controller = controller.injector().get('$controller');
            window.myApp = myApp;
            return myApp
        } else {
            console.log('no element', evo.filename);
            return window;
        }
    })
}