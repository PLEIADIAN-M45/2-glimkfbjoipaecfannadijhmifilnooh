/*define(["angular", "angular-sanitize", "angular-animate"], function(angular) {
    return async function() {
        $('html').attr('ng-app', this.name);
        $("<div>", { "id": this.ctrlId, "ng-controller": this.ctrlId }).appendTo("body");
        var controller = function($scope, $rootScope) {};
        var app = angular.module(this.name, ["ngSanitize", "ngAnimate"]).controller(this.ctrlId, controller);
        angular.bootstrap(document, [this.name]);
        console.log(1255);
        return 1255
    }
});*/

//localRequire(deps, callback, errback)




define(["app.factory"], function(Factory) {
    //console.log(factory);

    class Bootstrap extends Factory {

        constructor() {
            var c = super();
            //console.log(c);
            //c.init()
            this.name = "OBSApp";
            this.ctrlId = "View";
            this.requires = ["angular", "angular-sanitize", "angular-animate"];
            this.modules = ["ngSanitize", "ngAnimate"];
            this.controller.selector = "[ng-controller]";
        }

        bootstrap() {

            console.log(this.route);
            console.log(this.module);

            if (this.route) {

                //await this.build(this)



            } else {

            }


        }


        loadModule() {

            this.$controller = angular.element(this.controller.selector);
            this.$injector = this.$controller.injector();
            this.$scope = this.$controller.scope();
            this.$invoke = this.$injector.invoke;
            this.$compile = this.$injector.get('$compile');



            requirejs([this.module],

                function(module) {

                    console.log("module:", this.module);

                    this.$invoke(module, this.$scope)

                }.bind(this))

        }

        build(app) {
            //console.log(app.name, app.ctrlId, app.modules, app.controller);
            //console.log(window.angular);
            if (window.angular) {


            } else {

                requirejs(app.requires, function(angular) {
                    $('html').attr('ng-app', app.name);
                    $("<div>", { "id": app.ctrlId, "ng-controller": app.ctrlId }).appendTo("body");
                    angular.module(app.name, app.modules).controller(app.ctrlId, app.controller);
                    angular.bootstrap(document, [app.name]);
                    console.log("build...");
                    app.loadModule();
                })
            }

            if (this.server == "wa111") {

            }

            if (this.server == "ku711") {

            }



        }

        controller($scope, $rootScope) {}

        help() { return 213 }



    }

    return Bootstrap


    /*******************************************************************************/

    function create(app) {

        requirejs(app.requires, function(angular) {

            console.log(app.name, app.ctrlId, app.modules);

            $('html').attr('ng-app', app.name);

            $("<div>", { "id": app.ctrlId, "ng-controller": app.ctrlId }).appendTo("body");

            var c =
                angular.module(app.name, app.modules).controller(app.ctrlId, app.controller);

            angular.bootstrap(document, [app.name]);

            console.log(c);

            return 200;
        })

    }


    function bootstrap3() {

        console.log(this.route);

        return new Promise((resolve, reject) => {

            if (this.server == "wa111" && this.route) {

                return create(this)


                /*
                .then((x) => {
                    console.log(x);
                })
                **/



            } else {
                reject('no route.')
            }

        })

        //console.log(this);
        if (this.server == "ku711" && this.route) {}




    }

    return bootstrap;
})





/*
requirejs(["angular", "angular-sanitize", "angular-animate"], (angular) => {
    $('html').attr('ng-app', this.name);
    $("<div>", { "id": this.ctrlId, "ng-controller": this.ctrlId }).appendTo("body");
    var controller = function($scope, $rootScope) {};
    var app = angular.module(this.name, ["ngSanitize", "ngAnimate"]).controller(this.ctrlId, controller);
    angular.bootstrap(document, [this.name]);
})
*/


//ƒ localRequire(deps, callback, errback) {
/*
    	console.log(app);
        console.log(app.server);
        */


/*
            return new Promise((resolve, reject) => {
                if (this.server == "wa111" && this.route) {
                    this.build(this)
                } else {
                    reject()
                }
            })

                this.$controller = angular.element(this.selector);
                this.$injector = this.$controller.injector();
                this.$scope = this.$controller.scope();
                this.$invoke = this.$injector.invoke;
                this.$compile = this.$injector.get('$compile');                
        get $controller() {
            console.log(1111111111, 2222222222);
            return angular.element(this.controller.selector);
        }
            */