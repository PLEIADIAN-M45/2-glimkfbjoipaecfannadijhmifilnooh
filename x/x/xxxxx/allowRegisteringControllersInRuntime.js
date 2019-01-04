var myApp = angular.module('myApp', []);

//note overriding controller method might be a little controversial :D 
myApp.config(function allowRegisteringControllersInRuntime($controllerProvider) {
    var backup = myApp.controller;
    myApp.controller = $controllerProvider.register;
    myApp.controller.legacy = backup;
})

myApp.run(function($rootScope, $compile) {

    myApp.controller('MyCtrl', function($scope) {
        $scope.name = 'Superhero';
    })

    var elem;
    var scope = $rootScope;
    elem = $compile('<p ng-controller="MyCtrl">{{name}}</br><input ng-model="name" /></p>')($rootScope, function(clonedElement, scope) {
        console.log('newly created element', clonedElement[0])
        document.body.appendChild(clonedElement[0]);
    });
    console.log('You can access original register via', myApp.controller.legacy);
})