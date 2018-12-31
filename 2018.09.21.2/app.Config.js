define([], function() {

    class Cofig {
        constructor() {
            this.name = "OBSApp";
            this.ctrlId = "View";
            this.requires = ["angular", "angular-sanitize", "angular-animate"];
            this.modules = ["ngSanitize", "ngAnimate"];
            this.controller.selector = "[ng-controller]";
        }
        controller($scope, $rootScope) {

        }
    }

    return Cofig;
})