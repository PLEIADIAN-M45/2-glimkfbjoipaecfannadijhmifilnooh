define([
    "angular",
    "angular-sanitize",
    "factory",
], function(angular, sanitize, factory) {
    return class wa111 {
        constructor() {
            var viewElement = document.createElement('div');
            viewElement.setAttribute('id', 'View');
            viewElement.setAttribute('ng-controller', 'ViewCtrl');
            angular.element(document.body).append(viewElement);
            angular.element(document).attr("ng-app", "OBSApp");
            angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', function() {});
            angular.bootstrap(document, ["OBSApp"]);
        }
    }
});