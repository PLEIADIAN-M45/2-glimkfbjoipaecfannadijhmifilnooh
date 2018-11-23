define([
    "angular",
    "angular-sanitize",
    "factory",
], function(angular, sanitize, factory) {
    return class wa111 {
        constructor() {
            var rootElement = document.createElement('div');
            rootElement.setAttribute('id', 'View');
            rootElement.setAttribute('ng-controller', 'ViewCtrl');
            angular.element(document.body).append(rootElement);
            
            this.OBSApp = angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', function() {});
            this.OBS = angular.bootstrap(document, ["OBSApp"]);
            
            //document.createAttribute('ng-app', 'OBSApp');
            //document.attributes.setNamedItem('ng-app', 'OBSApp')
        }
    }
});

function shitFuncion() {
    //angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', factory);
}