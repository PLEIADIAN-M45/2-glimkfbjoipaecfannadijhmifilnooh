define(['angular', 'angular-sanitize'], function(angular) {
    window.angular = angular;
    'use strict';
    var myApp = angular.module('OBSApp', ['ngSanitize']);
    myApp.config(function($sceDelegateProvider) {
        var baseUrl = localStorage.baseUrl;
        var baseUrl = evo.baseUrl;
        $sceDelegateProvider.resourceUrlBlacklist(['']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
    });
    try { angular.bootstrap(document, ['OBSApp']); } catch (ex) {}
    // console.log(myApp);
    /***********************************************************************************/
    var ng_controller = $("[ng-controller]")[0] || $("body");
    var $element = angular.element(ng_controller);
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');
    myApp = $injector.modules['OBSApp'];
    Object.assign(myApp, { $element, $scope, $injector, $invoke, $compile });
    window.extend({ myApp, $element, $scope, $injector, $invoke, $compile });
    return myApp;
});



function fnStylesheet() {
    $scope.stylesheet.forEach(function(name) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./css/" + name + ".css");
        link.onload = function() {
            //console.log(link.href);
        }
        document.body.appendChild(link);
    });
}

function fnComponents() {
    $scope.components.forEach((name) => {
        var templateUrl = require.toUrl("./html/" + name + ".html");
        fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {
            var template = angular.element(html);
            $element.append(template);
            $compile(template)($scope);
            $scope.$apply();
        })
    })
}

function _invoke() {
    fnStylesheet();
    fnComponents();
    console.log('_invoke......');
}


/*
console.log($injector.modules['OBSApp']);
console.log($injector);
console.log($scope.Service.txtCellPhone.$modelValue);*/
//console.log($scope.StatusEnum);