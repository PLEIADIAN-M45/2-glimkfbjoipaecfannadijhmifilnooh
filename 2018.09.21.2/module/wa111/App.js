define([
    "angular", "angular-sanitize",
], function(angular, sanitize) {
    return class wa111 {
        constructor() {
            var rootElement = document.createElement('div');
            rootElement.setAttribute('id', 'View');
            rootElement.setAttribute('ng-controller', 'ViewCtrl');
            angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', function() {});
            angular.element(document.body).append(rootElement);
            angular.bootstrap(document, ["OBSApp"]);
        }
    }
});




function shitFuncion() {
    angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', function() {});
    var rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'View');
    rootElement.setAttribute('ng-controller', 'ViewCtrl');
    angular.element(document.body).append(rootElement);
    return angular.bootstrap(document, ["OBSApp"]);
    /*
        this.OBSApp = angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', function() {});
        this.OBS = angular.bootstrap(document, ["OBSApp"]);
        */

    //document.createAttribute('ng-app', 'OBSApp');
    //document.attributes.setNamedItem('ng-app', 'OBSApp')
    //angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', factory);
}