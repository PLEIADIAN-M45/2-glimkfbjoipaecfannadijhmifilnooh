define(["app.router", "app.Bootstrap"], function(router, Bootstrap) {


    return class App extends Bootstrap {

        constructor() {

            super();

            console.log(this.help());

            Object.assign(this, window.localStorage);

            Object.assign(this, window.location);

            this.isTest = (window.location.hostname == "127.0.0.1");

            this.locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();

            this.route = router[this.server][this.locator];

            this.module = (this.route) ? [this.server, this.route].join("/") : undefined;
        }





        /*
        start() {

            if (this.route == undefined) { return false }
            console.log(this.route);

            builder(this)
        }
        */


        /*
        loadMain() {

            if (this.route == undefined) { return false }
            //app.build.js
            console.log(this.route);

            requirejs(["app.build"], function(mod) {
                //console.log(mod);
                mod(this)

            }.bind(this))

            //requirejs(["app.build"], (server) => {})

        }
        */
    }



})



//angular.bootstrap(element, [modules])






/*requirejs([this.server], (server) => {

                server.call(this);

                console.log(this.module);

                this.$controller = angular.element(this.selector);
                this.$injector = this.$controller.injector();
                this.$scope = this.$controller.scope();
                this.$invoke = this.$injector.invoke;
                this.$compile = this.$injector.get('$compile');


                requirejs(["app.instance", "app.factory"], (instance, factory) => {

                    angular.extend(this.$scope, this);

                    console.log(this.$scope);

                    //this.$invoke(factory, this.$scope)
                })
            })
*/






//Object.assign(this.$scope, this)

/*
                        requirejs([this.module], (module) => {
                            this.$scope.injectStylesheet();
                            this.$scope.injectComponents()
                                .then((x) => {
                                    this.$scope.setElements();
                                    this.$invoke(module, this.$scope);
                                })
                        })*/



/*

                        return
                        factory
                        angular.merge(this.$scope, this)

                        console.log(this.$scope);
                        return


                        Object.assign(this.$scope, this, this.__proto__)
                        console.log(this.$scope);

                        this.$invoke(factory, this.$scope)


                        //console.log(this.$scope.stylesheet);

                        return


                        return




                        return


                        this.$scope.injectStylesheet()

                        return
buildModule() {
    return new Promise(function(resolve, reject) {
        requirejs(["angular", "angular-sanitize", "angular-animate"], (angular) => {
            $('html').attr('ng-app', this.name);
            $("<div>", { "id": this.ctrlId, "ng-controller": this.ctrlId }).appendTo("body");
            var controller = function($scope, $rootScope) {};
            var app = angular.module(this.name, ["ngSanitize", "ngAnimate"]).controller(this.ctrlId, controller);
            angular.bootstrap(document, [this.name]);
            console.log(app);
        })
    })
}*/