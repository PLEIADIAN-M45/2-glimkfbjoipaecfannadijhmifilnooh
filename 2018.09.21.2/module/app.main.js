define(['app', 'app.factory'], function(app, factory) {
    var $rootElement = angular.element(document);
    var $rootScope = $rootElement.scope();
    var $injector = $rootElement.injector();
    return $injector.invoke(factory);
});











//chrome                     ://flags/#enable-devtools-experiments
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