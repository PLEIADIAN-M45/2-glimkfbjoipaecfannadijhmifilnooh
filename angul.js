

    $('<div id="ctrl" ng-controller="Ctrl" ng-bind="msg">').appendTo('body');
    $('<div id="ctrl4">3</div>').appendTo('body');
    angular.module('myApp').controller('Ctrl', function($scope, $rootScope) {
        $scope.msg = "It works! rootScope is " + $rootScope.$id +
            ", should be " + angular.element($(document.body)).scope().$id;
    });




    injector.invoke(function($compile, $rootScope) {
        $compile($('#ctrl'))($rootScope);
        $rootScope.$apply();
    });

    console.log(injector);
    return


    function registerController(moduleName, controllerName) {
        // Here I cannot get the controller function directly so I
        // need to loop through the module's _invokeQueue to get it
        var queue = angular.module(moduleName)._invokeQueue;
        console.log(queue);

        for (var i = 0; i < queue.length; i++) {

            /*var call = queue[i];
            if (call[0] == "$controllerProvider" &&
                call[1] == "register" &&
                call[2][0] == controllerName) {
                controllerProvider.register(controllerName, call[2][1]);
            }*/
        }
    }
    registerController("myApp", "Ctrl");


    return
    //console.log();

function x() {

    console.log(angular.module('myApp'));


    $('<div id="ctrl" ng-controller="Ctrl" ng-bind="msg">').appendTo('body');




    var controller = angular.element('[ng-controller]');
    console.log(controller.scope());
    console.log(controller.injector());
    var injector = controller.injector()
    var app = injector.modules.myApp;
    console.log(app);
    console.log(app._invokeQueue);

    /*
    config
    directive
    controller
    */



    /*console.log(myApp);

    var app = angular.element($(document.body))

    console.log(app);

    console.log(app.scope());
    console.log(app);*/

}



/*       var value = local.getItem('IPAddress')
       value = aes.decrypt(value);
       value = JSON.parse(value);
       console.log(...value);*/
       
    return

    var mod = angular.module('myApp');
    console.log(mod);


    var c = mod.provider('$provide')
    console.log(d);

    return


    var injector = angular.element(document.body).injector()
    console.log(injector);

    var c = injector.get('$controller')
    console.log(c);

    var d = injector.get('$injector ')
    console.log(d);

    return

    console.log(mod._invokeQueue);
    console.log(mod._invokeQueue[0][2]);

    var $controllerProvider = mod._invokeQueue[0][2][1];

    console.log($controllerProvider.register);





    return

    var injector = angular.element(document.body).injector()



    console.log(injector);

    return



