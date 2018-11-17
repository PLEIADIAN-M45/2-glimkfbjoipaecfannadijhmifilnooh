define(["#App"], function(myApp) {
    myApp.assign = _assign;
    //myApp.assign(localStorage);
    myApp.components = components[router.name];
    myApp.stylesheet = stylesheet[router.name];

    var $rootElement = angular.element(document.querySelector("[ng-app]"));
    var $projElement = angular.element(document.querySelector("[ng-controller]"));
    //var $rootScope = $rootElement.scope();
    var $scope = $projElement.scope();
    var $rootScope = $rootElement.scope() || $projElement.scope();

    var $injector = $projElement.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');

    var object = { $scope, $rootScope, $projElement, $rootElement, $injector, $invoke, $compile };
    window.assign(object);
    window.myApp = myApp;

    myApp.assign(object);
    return myApp;
});





/*
    //angular.element(document.getElementById("View")) ||

   //myApp.assign(object);
   //console.log(myApp);
   //loadModules.call($scope, object)
   myApp.assign({ $projElement, $rootElement, $rootScope, $scope, $injector, $invoke, $compile });
   window.$scope = $scope;
   console.log(myApp);
   //window.extend({ myApp, $projElement, $rootElement, $rootScope, $scope, $injector, $invoke, $compile });
   return object;
   return myApp;*/