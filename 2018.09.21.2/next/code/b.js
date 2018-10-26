$(document.body).scope().$root
$($0).scope()
angular.reloadWithDebugInfo()
/*
And have it available after reload:
    To inject and interact with a service from the console,
    try:
*/

var injector = $(document.body).injector();
var someService = injector.get(‘someService’);





/*
define([evo.host + '/app'], function(app) {
    //var controllerProvider = evo.controllerProvider;
    var $element = $(document.body);
    var $scope = $(document.body).scope();
    var $injector = $(document.body).injector();
    var $compile = $injector.get('$compile');
    var $invoke = $injector.invoke;


    $scope.defineProperties = defineProperties;
    $scope.extend = function() {
        evo.assign(this, ...arguments);
        return (this.$$phase) ? this : this.$apply();
    }
    window.extend({ $scope, $compile, $injector, $element, $invoke });
    return evo.extend({ $scope, $injector, $compile, $invoke, $element });;
});*/






app.config(function($stateProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            controller: 'MainController as MC ',
            templateUrl: ' /path/to/template.html '
        })
}).state('main', {
    url: ‘ /',
    controller: ‘MainController’,
    controllerAs: ‘MC’,
    templateUrl: ‘ /path/to / template.html '
}).controller('MainController', function() {});
