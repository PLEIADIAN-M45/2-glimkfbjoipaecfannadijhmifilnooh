function defineProperties(properties) {
    return new Promise((resolve, reject) => {
        resolve(Object.assign($scope, properties));
    })
};

function requireComponents() {
    if ($scope.components) {
        $scope.components.forEach((name) => {
            var templateUrl = require.toUrl("./html/" + name + ".html");
            fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {
                var template = angular.element(html);
                $element.append(template);
                $compile(template)($scope);
            })
        })
    }
}

function requireStylesheet() {
    if ($scope.stylesheet) {
        $scope.stylesheet.forEach(function(sheet) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = require.toUrl("./css/" + sheet + ".css");;
            document.body.appendChild(link);
        });
    }
}


function startup() {
    return start().then(requireStylesheet).then(requireComponents)
}

function bootstrap() {
    $invoke($scope.controller)
}

define([evo.host + '/app'], function(app) {

    var controller = angular.element('[ng-controller]');
    var $scope = controller.scope();
    var $injector = controller.injector();

    var $compile = controller.injector().get('$compile');
    var $invoke = $injector.invoke;
    var $element = controller;

    $scope.defineProperties = defineProperties;
    $scope.extend = function() {
        evo.assign(this, ...arguments);
        return (this.$$phase) ? this : this.$apply();
    }
    window.extend({ $scope, $compile, $injector, $element, $invoke });
    return evo.extend({ $scope, $injector, $compile, $invoke, $element });;
});
/*


myApp.run(function() {
    console.log("app run");
});

myApp.config(function() {
    console.log("app config");
});*/