define([], function() {


    function myController() {}

    //myController.displayName = 'Show Popup'

    class Config {
        constructor(x) {
            console.log(x);
            this.name = "OBSApp";
            this.ctrlId = "View";
            this.requires = ["angular", "angular-sanitize", "angular-animate"];
            this.modules = ["ngSanitize", "ngAnimate"];
            this.controller.selector = "[ng-controller]";
            //this.server = localStorage.server;
        }

        get server() {
            //return localStorage.server;
        }



        controller($scope, $rootScope) {

        }
    }

    //console.log(Config.constructor());

    return Config;
})