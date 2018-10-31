function fnStylesheet(_stylesheet) {
    _stylesheet.forEach(function(sheetName) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./css/" + sheetName + ".css");
        link.onload = function() { console.log(link.href); }
        document.body.appendChild(link);
    });
}

function fnComponents(_components) {

    _components.forEach((name) => {

        var templateUrl = require.toUrl("./html/" + name + ".html");

        fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {

            var template = angular.element(html);

            $element.append(template);

            $compile(template)($scope);
            /********************************/
            $scope.$apply();
            /********************************/

        })
    })
}




function _invoke() {


    Object.assign(myApp.$scope, myApp.factory);

    fnStylesheet(myApp.stylesheet);

    fnComponents(myApp.components);

    console.log('_invoke......');

    console.timeEnd(location.pathname);

}




define(['angular', 'angular-sanitize'], function(angular) {
    window.angular = angular;

    'use strict';

    var myApp = angular.module('OBSApp', []);
    try { angular.bootstrap(document, ['OBSApp']); } catch (ex) {}
    var ng_controller = $("[ng-controller]")[0] || $("body");
    var $element = angular.element(ng_controller);
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');

    Object.assign(myApp, { $element, $scope, $injector, $invoke, $compile });

    window.extend({ myApp, $element, $scope, $injector, $invoke, $compile });

    return myApp;
});








//document.querySelector("[ng-controller]") || document.body;
//if (router.host == "wa111") {}
//$("[ng-controller]") || $("body");