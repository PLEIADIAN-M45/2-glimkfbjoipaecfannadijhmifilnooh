function defineProperties(properties) {
    return new Promise((resolve, reject) => {
        resolve(Object.assign($scope, properties));
    })
};

function requireComponents() {
    return new Promise((resolve, reject) => {

        if($scope.components) {
            $scope.components.forEach((name) => {
                var templateUrl = require.toUrl("./module/html/" + name + ".html");
                fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {
                    var template = angular.element(html);
                    $element.append(template);
                    $compile(template)($scope);
                })
            })
            resolve()
        }
    })

}

function requireStylesheet() {
    return new Promise((resolve, reject) => {

        if($scope.stylesheet) {
            $scope.stylesheet.forEach(function(sheet) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = require.toUrl("./module/css/" + sheet + ".css");;
                document.body.appendChild(link);
            });
            resolve()

        }
    });
}


function startup() {
    // console.log(evo.user);

    return Promise.all([
        requireStylesheet(),
        requireComponents()
    ]).then(function(args) {
        return
    })



    // return start().then(requireStylesheet).then(requireComponents)
}

function bootstrap() {
    $invoke(window.controller)
}


define(['host.App'], function(myApp) {
    //var controller = angular.element('[ng-controller]');
    var controller = angular.element(document.body);
    var $element = controller;
    var $scope = controller.scope();
    var $injector = controller.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');


    $invoke(function($compile, $rootScope) {
        $scope.name2 = "CHANG";
        $scope.$apply();
    })

    window.$scope = $scope
    window.$compile = $compile
    window.$invoke = $invoke
    window.$element = $element




    //console.log($scope);
    // console.log();


    return myApp;
    /*
    $scope.defineProperties = defineProperties;
    $scope.extend = function() {
        evo.assign(this, ...arguments);
        return (this.$$phase) ? this : this.$apply();
    }
    */


    myApp.$scope = $scope
    myApp.$injector = $injector
    myApp.$invoke = $invoke
    myApp.$compile = $compile

    window.extend({ myApp, $scope, $compile, $injector, $invoke, $element });

    //evo.extend({ $scope, $injector, $compile, $invoke, $element });
    //Object.assign({ $scope, $injector, $compile, $invoke, $element })

    // console.log({ $scope, $compile, $injector, $invoke });

    // console.log($scope);

    return myApp;


});




/*


myApp.run(function() {
    console.log("app run");
});

myApp.config(function() {
    console.log("app config");
});*/