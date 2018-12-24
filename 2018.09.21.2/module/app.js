 requirejs.config({
     packages: [localStorage.host],
     baseUrl: localStorage.baseUrl,
     paths: {

         'app.main'             : '../app.main',
         'app.sms'              : '../app.sms',
         'app.instance'         : '../app.instance',
         'app.service'          : '../app.service',
         'app.factory'          : '../app.factory',
         'app.prototype'        : '../app.prototype',
         'app.xmlSpider'        : '../app.xmlSpider',
         'app.xmlSpider.loadend' : '../app.xmlSpider.loadend',


         'app.sendSms': '../app.sendSms',
         'app.router': '../app.router',



         'angular': '../../lib/angular/angular',
         'angular-animate': '../../lib/angular/angular-animate.min',
         'angular-aria': '../../lib/angular/angular-aria',
         'angular-cookies': '../../lib/angular/angular-cookies',
         'angular-messages': '../../lib/angular/angular-messages',
         'angular-mocks': '../../lib/angular/angular-mocks',
         'angular-resource': '../../lib/angular/angular-resource',
         'angular-route': '../../lib/angular/angular-route.min',
         'angular-sanitize': '../../lib/angular/angular-sanitize.min',
         'angular-scenario': '../../lib/angular/angular-scenario',
         'angular-touch': '../../lib/angular/angular-touch',
         "angularAMD": "../../lib/angular/angularAMD",
         "ngload": "../../lib/angular/ngload",
         'domReady': '../../lib/require/domReady',
         'require': '../../lib/require/require',
         'jquery': '../../lib/jquery/jquery-3.2.1.min',
         'js-url': '../../lib/jquery/url.min',
         'moment': '../../lib/jquery/moment-with-locales.min',
         'dexie': '../../lib/jquery/dexie',
         'crypto': '../../lib/crypto/rollups/',
         'aes': '../../lib/crypto/rollups/aes',
         'md5': '../../lib/crypto/rollups/md5',
         'hmac-md5': '../../lib/crypto/rollups/hmac-md5',
         'material': '../../lib/material/0.36.0/material-components-web',
         'semantic': '../../lib/semantic/semantic',
         'Mock': '../../lib/mock',
     },
     shim: {
         'angular': { exports: 'angular' },
         'angular-animate': { deps: ['angular'] },
         'angular-aria': { deps: ['angular'] },
         'angular-cookies': { deps: ['angular'] },
         'angular-messages': { deps: ['angular'] },
         'angular-mocks': { deps: ['angular'] },
         'angular-resource': { deps: ['angular'] },
         'angular-route': { deps: ['angular'] },
         'angular-sanitize': { deps: ['angular'] },
         'angular-scenario': { deps: ['angular'] },
         'angular-touch': { deps: ['angular'] }
     }
 });


 //console.log(localStorage.baseUrl);


 require(["app.instance", "app.router"], function(instance, Router) {

     var router = new Router();

     if (router.moduleId) {

         require(["main", "app.factory"], function(app, Factory) {

             var $container = $("[ng-controller]");
             var $controller = angular.element($container);
             var $scope = $controller.scope();
             var $injector = $controller.injector();

             $scope.__proto__.$container = $container;
             $scope.__proto__.$controller = $controller;
             $scope.__proto__.$injector = $injector;
             $scope.__proto__.$invoke = $injector.invoke;

             $scope.$invoke(Router, $scope);
             $scope.$invoke(Factory, $scope);
             $scope.$loadModule();

             //console.log($scope);
         })
     }





 });









 //console.log(router);
 /*
  var abc = function() {}
             var cd = 123
 with(router.prototype) {
     console.log(moduleId);

 }
 */

 //console.log(new factory());

 //console.log(factory.prototype);

 /*
  requirejs(['app.factory'], function(factory) {

      console.log(factory);






  })
 */




 /*
 requirejs(['app.config', 'app.factory'], function(config, factory) {
     require(["main"], function() {
         var $container = $("[ng-controller]");
         var $controller = angular.element($container);
         var $scope = $controller.scope();
         var $injector = $controller.injector();
         $scope.__proto__.$container = $container;
         $scope.__proto__.$controller = $controller;
         $scope.__proto__.$injector = $injector;
         $scope.__proto__.$invoke = $injector.invoke;
         $scope.$invoke(factory, $scope);
         console.log($scope);
     });
 });
 */


 //use the modules as usual.


 //dwd.prototype



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