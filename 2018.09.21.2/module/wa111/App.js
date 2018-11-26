define([
    "OBSApp", "angular", "angular-sanitize", "angular-animate"
], function(OBSApp, angular) {
    var rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'View');
    rootElement.setAttribute('ng-controller', 'View');
    angular.module('OBSApp', ["ngSanitize", "ngAnimate"])
        .controller('View', function($scope, $rootScope) {});
    angular.element(document.body).append(rootElement);
    angular.bootstrap(document, ['OBSApp']);
    angular.injector(['ng']);
    return new OBSApp().$scope;
});



//console.log(expect);

//var info = injector.modules['ngAnimate'].info();
//fn, self, locals, serviceName






/*

var injector = angular.injector(["ng"]);
console.log(injector);
var someFunction = function($rootScope, $injector, $compile, $http) {
    //console.log($injector);
    console.log($rootScope.feff21);
    console.log($compile);
    //console.log($injector);
    //console.log($http);
    //console.log($rootScope);
};
injector.invoke(someFunction);
console.log(new OBSApp());

*/
/*

    function MyController($scope, $route) {
        console.log('+++++++++++');
        console.log($scope);
    }

    injector.annotate(MyController)
*/






/*
   console.log(abc);
   var someFunction = function($rootScope, $http) {
       console.log($rootScope, $http);
       return "called!";
   };

   abc.run(function($rootScope, $injector) {
       console.log($rootScope, $injector);
       $rootScope.annotations = $injector.annotate(someFunction);
       $rootScope.message = $injector.invoke(someFunction);
   });*/




/*

var App = new OBSApp();
var $scope = App.$scope;
return App.$scope;
*/