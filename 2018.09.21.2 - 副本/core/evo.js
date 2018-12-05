define([
    'angular', 'angular-sanitize',
    'moment', 'Dexie', 'material', 'semantic', app
], function(angular, sanitize, moment, Dexie, mdc) {


    function createControllerElement() {
        //console.log(this.controllerId);
        var div = document.createElement('div');
        //div.id = this.controllerId;
        div.setAttribute('id', this.controllerId);
        div.setAttribute('ng-controller', 'projectCtrl')
        document.body.appendChild(div);
    }

    //$("<div id='View' ng-controller='projectCtrl'></div>").appendTo("body");
    /*
    var $rootElement = angular.element(document);
    console.log($rootElement);
    var $scope = $rootElement.scope();
    console.log($scope);
	*/


    //var messages = require('app');


    class App {

        constructor() {

            this.controllerId = 'View';
            //createControllerElement.call(this);
            this.init();
            //console.log(this.host);
        }


        init() {
            return {
                'wa111': function() {
                    alert(1)
                },
                'ku711': function() {

                },
            } [this.host];
        }



        get host() { return location.host.split(".")[1]; }


        /*init() {
            console.log(1, 2);
            try {
                angular.module("OBSApp", ["ngSanitize"]).controller("projectCtrl", function($scope) {})
                angular.bootstrap(document, ["OBSApp"]);
            } catch (ex) {

            }
        }*/



    }










    return new App()


    //console.log(App);
















    /*
    return {
        a: 5,
        c: 6
    }
    */
})






/*

;
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
    else if (typeof define === 'function' && define.amd) define([], factory);
    else if (typeof exports === 'object') exports["evo"] = factory();
    else root["evo"] = factory();
})(this, function() {










    return {
        a: 5
    }

})
*/