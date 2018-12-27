define(["angular", "angular-sanitize", "angular-animate"], function(angular) {
    return function() {
        $('html').attr('ng-app', this.$name);
        $("<div>", { "id": this.$ctrlId, "ng-controller": this.$ctrlId }).appendTo("body");
        var controller = function($scope, $rootScope) {};
        var app = angular.module(this.$name, ["ngSanitize", "ngAnimate"]);
        app.controller(this.$ctrlId, controller);
        angular.bootstrap(document, [this.$name]);
        return app;
    }
});



/*
    
var app = angular.module('OBSApp', ["ngSanitize", "ngAnimate"]);
function viewController($scope, $rootScope) {};
app.controller('View', viewController);
angular.bootstrap(document, ['OBSApp']);
return app;
*/

//$('body').append('<div ng-controller="View" id="View"></div>');
//console.log(this.controllerId, var2);