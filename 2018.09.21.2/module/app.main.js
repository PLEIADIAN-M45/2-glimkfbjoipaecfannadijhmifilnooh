define(['app', 'app.factory'], function(app, factory) {

    var $rootElement = document.querySelector('[ng-controller]')
    var $controller = angular.element($rootElement);
    var $scope = $controller.scope();
    var $injector = $controller.injector();

    $scope.$injector = $injector;
    $scope.invoke = $injector.invoke;



    $injector.invoke(factory, $scope);


    //console.log($injector.invoke);




    return {
        $rootElement,
        $controller,
        $scope,
        $injector
    };


});





//console.log(app);


//chrome                     ://flags/#enable-devtools-experiments
















/*
    //return $injector.invoke(factory);

 //var $rootScope = $controller.scope();
    //var $rootElement = angular.element(document);
    //$injector.invoke(factory, $rootScope);
    //app.$rootScope.prototype = new factory()

   var initInjector = angular.injector(["ng"]);
    console.log(initInjector);
var $ctrlElement = angular.element(document.querySelector('[ng-controller]'));
var $scope = $ctrlElement.scope();
var $Injector = $rootElement.injector();
*/


//
















/*
var $element = document.querySelector('[ng-app]');
var $view = angular.element($element);
console.log($view.scope());
*/


//var root = angular.element(document.querySelector('[ng-app]'));


/*

var $controller = angular.element(document);
var $scope = $controller.scope();
var $injector = $controller.injector();

console.log($scope);
console.log($injector);
new function() {
    console.log(this);

    this.$name = "OBSApp";
    this.$element = document.querySelector('[ng-controller]');
    this.$view = angular.element(this.$element);
    this.$module = angular.module(this.$name);


    this.$scope = this.$view.scope();
    this.$injector = this.$view.injector();


    //this.$compile        = this.$injector.get('$compile');
    //this.$invoke = this.$injector.invoke;
    //this.$rootScope = this.$scope.$root;

    //this.$scope.$view    = this.$view;
    //this.$scope.$compile = this.$compile;



    //console.log(factory);




}*/