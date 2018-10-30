function defineProperties(properties) {
    return new Promise((resolve, reject) => {
        resolve(Object.assign($scope, properties));
    })
};

function requireComponents() {
    if($scope.components) {
        $scope.components.forEach((name) => {
            var templateUrl = require.toUrl("./module/html/" + name + ".html");
            fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {
                var template = angular.element(html);
                $element.append(template);
                $compile(template)($scope);
            })
        })
    }
    return

    console.log(7777);

}

function requireStylesheet() {
    if($scope.stylesheet) {
        $scope.stylesheet.forEach(function(sheet) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = require.toUrl("./module/css/" + sheet + ".css");;
            document.body.appendChild(link);
        });
    }
    return

    console.log(6666);
}


function startup() {
    console.log(evo.user);

    return Promise.all([
        requireStylesheet(),
        requireComponents()
    ]).then(function(args) {
        return
    })



    // return start().then(requireStylesheet).then(requireComponents)
}

function bootstrap() {
    console.log(5);
    console.log(evo.user);
    $invoke($scope.controller)
}

//

define(['host.App'], function(app) {

    console.log(2);

    console.log(app);


    var controller = angular.element('[ng-controller]');

    var $element = controller;

    var $scope = controller.scope();
    var $injector = controller.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');

    $scope.defineProperties = defineProperties;
    $scope.extend = function() {
        evo.assign(this, ...arguments);
        return (this.$$phase) ? this : this.$apply();
    }

    window.extend({ $scope, $compile, $injector, $invoke, $element });
    //evo.extend({ $scope, $injector, $compile, $invoke, $element });
    //Object.assign({ $scope, $injector, $compile, $invoke, $element })

    // console.log({ $scope, $compile, $injector, $invoke });

    // console.log($scope);

    return app;


});




/*


myApp.run(function() {
    console.log("app run");
});

myApp.config(function() {
    console.log("app config");
});*/