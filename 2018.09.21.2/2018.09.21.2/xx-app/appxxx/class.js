 class MyClass extends route {
     constructor() {
         super();
     }

 }

 var cs = new MyClass()

 console.log(cs);






 with(cs) {

     //var c = foo();
     console.log(origin);
 }

 with(MyClass.prototype) {

     //var c = foo();
     console.log(origin);
 }


 /*
  class MyClass {
      foo() { return 1; }
      get[Symbol.unscopables]() {
          return { foo: true };
      }
  }



  var foo = function() { return 2; };

  console.log(MyClass.prototype);

  with(MyClass.prototype) {

      var c = foo();
      console.log(c);
  }
 */


 with(route.prototype) {

        //var c = foo();
        //console.log(host);
    }

    //console.log(route.host);
    //route.constructor.assign(location)
    //console.log(route.constructor.assign);
 //route.bind(location)
 //return new route()

 class route22 {
     constructor() {
         this.searchParams = new URLSearchParams(location.search)
         this.origin = location.origin
         this.pathname = location.pathname
         this.port = location.port
         this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase()
         this.host = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1]
     }
     /*
     assign() {
         Object.assign(this.__proto__, location)
     }*/

 }




 //assign(route, location);


 //Object.assign(route.prototype, location)

 route.prototype = location





 return {
     origin: location.origin,
     searchParams: new URLSearchParams(location.search),
     pathname: location.pathname,
     port: location.port,
     path: location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(),
     host: (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1],
 }


requirejs(['app.factory'], function(app) {

    //requirejs.config({ baseUrl: localStorage.baseUrl + route.host, })


    console.log(app);


    //console.log(route.prototype);




    //requirejs(["main"], function() {})



})





/*

*/


//use the modules as usual.






/*define(['app', 'app.factory', 'app.sendSms'], function(app, factory, sendSms) {


    var $container                   = $("[ng-controller]");
    var $controller                  = angular.element($container);
    var $scope                       = $controller.scope();
    var $injector                    = $controller.injector();

    $scope.__proto__.$container      = $container;
    $scope.__proto__.$controller     = $controller;
    $scope.__proto__.$injector       = $injector;
    $scope.__proto__.$invoke         = $injector.invoke;

    $scope.$invoke(factory, $scope);

    return { $container, $controller, $scope, $injector };
});*/


/*
define([], function() {
    console.log(12, 31);
})
*/






/*
function Scope() {};
Scope.prototype                      = $scope;
return Scope;
*/

/*
$scope.$invoke(sendSms, $scope);
*/
//console.log(sendSms);












//console.log($scope);
//console.log($scope.prototype);
//console.log($scope);
/*
var ax                               = new xyz();
console.log(ax);
console.log(ax.$parent);
*/

/*

    //console.log(myScope.prototype);
    //myScope                        = $scope
   console.log(myScope.prototype);
   console.log(myScope.__proto__);
   */

//$scope.prototype



//chrome                             ://flags/#enable-devtools-experiments












//console.log($("[ng-controller]"));
//document.querySelector('[ng-controller]')







//console.log($injector.invoke);
//var $controller                    = angular.element($rootElement);

//console.log(app);
/*
    //return $injector.invoke(factory);

 //var $rootScope                    = $controller.scope();
    //var $rootElement               = angular.element(document);
    //$injector.invoke(factory, $rootScope);
    //app.$rootScope.prototype       = new factory()

   var initInjector                  = angular.injector(["ng"]);
    console.log(initInjector);
var $ctrlElement                     = angular.element(document.querySelector('[ng-controller]'));
var $scope                           = $ctrlElement.scope();
var $Injector                        = $rootElement.injector();
*/


//
















/*
var $element                         = document.querySelector('[ng-app]');
var $view                            = angular.element($element);
console.log($view.scope());
*/


//var root                           = angular.element(document.querySelector('[ng-app]'));


/*

var $controller                      = angular.element(document);
var $scope                           = $controller.scope();
var $injector                        = $controller.injector();

console.log($scope);
console.log($injector);
new function() {
    console.log(this);

    this.$name                       = "OBSApp";
    this.$element                    = document.querySelector('[ng-controller]');
    this.$view                       = angular.element(this.$element);
    this.$module                     = angular.module(this.$name);


    this.$scope                      = this.$view.scope();
    this.$injector                   = this.$view.injector();


    //this.$compile                  = this.$injector.get('$compile');
    //this.$invoke                   = this.$injector.invoke;
    //this.$rootScope                = this.$scope.$root;

    //this.$scope.$view              = this.$view;
    //this.$scope.$compile           = this.$compile;



    //console.log(factory);




}*/