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