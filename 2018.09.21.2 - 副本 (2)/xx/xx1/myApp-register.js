function fnStylesheet() {
    $scope.stylesheet.forEach(function(sheetName) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./css/" + sheetName + ".css");
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
            /********************************/
            $scope.$apply();
            /********************************/

        })
    })
}



function _invoke() {
    fnStylesheet();
    fnComponents();
    console.log('_invoke......');


}



define(['angular', 'angular-sanitize'], function(angular) {
    window.angular = angular;
    'use strict';
    var myApp = angular.module('OBSApp', ['ngSanitize']);

    var cachedCompileProvider;
    var cachedControllerProvider;


    myApp.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        cachedCompileProvider = $compileProvider;
        cachedControllerProvider = $controllerProvider;
        myApp.register = {
            component: $compileProvider.component,
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
    });

    myApp.config(function($sceDelegateProvider) {
        var baseUrl = localStorage.baseUrl;
        $sceDelegateProvider.resourceUrlBlacklist(['']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
    });
    try { angular.bootstrap(document, ['OBSApp']); } catch (ex) {}

    OBSApp.RegisterAngular.RegisterController();


    /*
        myApp.register.controller('myController2', function() {
            $scope.name = "RYAN CCC";
            $scope.customer = {
                name: 'Naomi',
                address: '1600 Amphitheatre'
            };
        });

        myApp.register.directive('myCustomer', function() {
            return {
                template: 'Name: {{customer.name}} Address: {{customer.address}}'
            };
        });*/
    // console.log(cachedCompileProvider);
    // console.log(cachedControllerProvider);
    /*
    OBSApp.RegisterAngular.RegisterDirectives('myCustomer', function() {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    });*/

    function myCustomer() {
        return {
            $inject: ["$timeout", function() {
                return {
                    template: 'Name: {{customer.name}} Address: {{customer.address}}'
                };
            }],
            $name: "myCustomer",
            DirectiveFactory: function() {
                return {
                    template: 'Name: {{customer.name}} Address: {{customer.address}}'
                };
            }
        }
    }

    function t() {

    }



    // OBSApp.RegisterAngular.RegisterDirectives([myCustomer])
    //console.log();
    //console.log(OBSApp.Directives);


    console.log(myApp);
    /***********************************************************************************/
    var ng_controller = $("[ng-controller]")[0] || $("body");
    var $element = angular.element(ng_controller);
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');

    $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };
    // $("body").append("<div my-customer></div>")

    var template = angular.element("<div my-customer></div>");
    $element.append(template);
    $compile(template)($scope);
    /********************************/
    $scope.$apply();

    Object.assign(myApp, { $element, $scope, $injector, $invoke, $compile });
    window.extend({ myApp, $element, $scope, $injector, $invoke, $compile });
    return myApp;
});

function dynamically_register_directive() {
    $http.get('').then(function(response) {
        angular.forEach(response.data.directives, function(dirDefinition, dirName) {
            cachedCompileProvider.directive(dirName, dirDefinition);
        });
    });
}


function fnStylesheet() {
    $scope.stylesheet.forEach(function(sheetName) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./css/" + sheetName + ".css");
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
            /********************************/
            $scope.$apply();
            /********************************/

        })
    })
}



function _invoke() {
    fnStylesheet();
    fnComponents();
    console.log('_invoke......');


}



define(['angular', 'angular-sanitize'], function(angular) {
    window.angular = angular;
    'use strict';
    var myApp = angular.module('OBSApp', ['ngSanitize']);

    var cachedCompileProvider;
    var cachedControllerProvider;


    myApp.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        cachedCompileProvider = $compileProvider;
        cachedControllerProvider = $controllerProvider;
        myApp.register = {
            component: $compileProvider.component,
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
    });

    myApp.config(function($sceDelegateProvider) {
        var baseUrl = localStorage.baseUrl;
        $sceDelegateProvider.resourceUrlBlacklist(['']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
    });
    try { angular.bootstrap(document, ['OBSApp']); } catch (ex) {}

    OBSApp.RegisterAngular.RegisterController();


    /*
        myApp.register.controller('myController2', function() {
            $scope.name = "RYAN CCC";
            $scope.customer = {
                name: 'Naomi',
                address: '1600 Amphitheatre'
            };
        });

        myApp.register.directive('myCustomer', function() {
            return {
                template: 'Name: {{customer.name}} Address: {{customer.address}}'
            };
        });*/
    // console.log(cachedCompileProvider);
    // console.log(cachedControllerProvider);
    /*
    OBSApp.RegisterAngular.RegisterDirectives('myCustomer', function() {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    });*/

    function myCustomer() {
        return {
            $inject: ["$timeout", function() {
                return {
                    template: 'Name: {{customer.name}} Address: {{customer.address}}'
                };
            }],
            $name: "myCustomer",
            DirectiveFactory: function() {
                return {
                    template: 'Name: {{customer.name}} Address: {{customer.address}}'
                };
            }
        }
    }

    function t() {
        this.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        }
    }
    t.prototype.GetUpdateMemberSNInfoLogContent = function(t, i) {}
    t.$name = "myCustomer";
    t.$inject = ['$scope'];
    OBSApp.RegisterAngular.RegisterController(t.$name, t)


    // OBSApp.RegisterAngular.RegisterDirectives([myCustomer])
    //console.log();
    //console.log(OBSApp.Directives);
    //$("body").append("<div>{{author}}</div>")

    console.log(myApp);
    /***********************************************************************************/
    var ng_controller = $("[ng-controller]")[0] || $("body");
    var $element = angular.element(ng_controller);
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');


    console.log($injector.modules['OBSApp']);


    var info = $injector.modules['OBSApp'].info();

    console.log(info);


    /*$scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };*/
    //$("body").append("<div my-customer></div>")

    //var template = angular.element("<div ng-controller='myCustomer'></div>");


    /*
    $injector.invoke(function($compile, $rootScope) {
        console.log(12, 324);
        $rootScope.author = "RYANCCCC"
        var template = angular.element("<div>{{author}}</div>");
        $element.append(template);
        $compile(template)($scope);
        $scope.$apply();
    });*/
    /********************************/

    Object.assign(myApp, { $element, $scope, $injector, $invoke, $compile });
    window.extend({ myApp, $element, $scope, $injector, $invoke, $compile });
    return myApp;
});

function dynamically_register_directive() {
    $http.get('').then(function(response) {
        angular.forEach(response.data.directives, function(dirDefinition, dirName) {
            cachedCompileProvider.directive(dirName, dirDefinition);
        });
    });
}




//console.timeEnd(location.pathname);
//Object.assign(myApp.$scope, myApp.factory);
//document.querySelector("[ng-controller]") || document.body;
//if (router.host == "wa111") {}
//$("[ng-controller]") || $("body");

//console.timeEnd(location.pathname);
//Object.assign(myApp.$scope, myApp.factory);
//document.querySelector("[ng-controller]") || document.body;
//if (router.host == "wa111") {}
//$("[ng-controller]") || $("body");