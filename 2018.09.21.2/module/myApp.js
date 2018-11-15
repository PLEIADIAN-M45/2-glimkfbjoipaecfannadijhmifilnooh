function invoke() {
    fnStylesheet();
    fnComponents();
    console.log('_invoke......');
}

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
            //console.log(666666666, 777777777);
            $scope.template_loaded = 1;
            $scope.$apply();
        })
    })
}


define(['angular', 'angular-sanitize', 'factory'], function(angular, sanitize, factory) {

    window.angular = angular;
    'use strict';

    var myApp = angular.module('OBSApp', ['ngSanitize']);
    myApp.baseUrl = require.toUrl('.');
    myApp.config(function($sceDelegateProvider) {
        //$sceDelegateProvider.resourceUrlBlacklist(['']);
        //$sceDelegateProvider.resourceUrlWhitelist(['self', myApp.baseUrl, myApp.baseUrl + '**']);
    });
    try { angular.bootstrap(document, ['OBSApp']); } catch (ex) {};
    /***********************************************************************************/
    var ng_controller = $("[ng-controller]")[0] || $("body");
    var $element = angular.element(ng_controller);
    var $rootElement = $element[0];
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');

    //myApp = $injector.modules['OBSApp'];

    var myApp = angular.module('OBSApp')

    //loadModules.call($scope)

    //loadModules($scope, $rootElement);

    console.log(myApp);

    Object.assign(myApp, { $element, $rootElement, $scope, $injector, $invoke, $compile });

    window.extend({ myApp, $element, $rootElement, $scope, $injector, $invoke, $compile });


    return myApp;
});



/*
console.log($injector.modules['OBSApp']);
console.log($injector);
console.log($scope.Service.txtCellPhone.$modelValue);*/
//console.log($scope.StatusEnum);

//console.log($scope.Service.txtBirthDay.$modelValue);