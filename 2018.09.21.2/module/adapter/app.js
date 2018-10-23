define([evo.host + '/app'], function(myApp) {

    console.log(myApp);

    var controller = angular.element(myApp.body);
    myApp.$target = controller;
    myApp.$scope = controller.scope();
    myApp.$injector = controller.injector();
    myApp.$compile = controller.injector().get('$compile');



    window.$scope = myApp.$scope;
    window.$compile = myApp.$compile;
    window.myApp = myApp;
    $scope.extend = function() {
        Object.assign(this, ...arguments);
        if (!this.$$phase) { this.$apply(); };
        return this;
    }
    $scope.defineProperties = function(properties) {
        return new Promise((resolve, reject) => {
            resolve(Object.assign($scope, properties));
        })
    }


});