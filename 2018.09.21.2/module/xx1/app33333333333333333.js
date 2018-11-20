function defineProperties(properties) {
    return new Promise((resolve, reject) => {
        resolve(Object.assign($scope, properties));
    })
};


function requireStylesheet(_stylesheet) {
    _stylesheet.forEach(function(sheetName) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./module/css/" + sheetName + ".css");
        link.onload = function() { console.log(link.href); }
        document.body.appendChild(link);
    });
}

function requireComponents(_components) {

    _components.forEach((name) => {

        var templateUrl = require.toUrl("./module/html/" + name + ".html");

        fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {

            var template = angular.element(html);

            $element.append(template);

            $compile(template)($scope);

            $scope.$apply();

        })
    })
}


function bootstrap() {
    $invoke(window.controller)
}


define(['host.App'], function(myApp) {
    console.log(2);
    //var controller = angular.element('[ng-controller]');
    var $element = angular.element(document.body);
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');
    Object.assign(window, { $element, $scope, $injector, $invoke, $compile })
    window.myApp = myApp;
    $scope.name = "RYAN C";
    return myApp;
});




/*


myApp.run(function() {
    console.log("app run");
});

myApp.config(function() {
    console.log("app config");
});*/