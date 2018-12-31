define(["mixinClass", "app.Config", "app.router", "app.Factory"], function(mixinClass, Config, Router, Factory) {

    //class Factory extends Config {}
    /*
    Class 的继承 - ECMAScript 6入门
    http://es6.ruanyifeng.com/#docs/class-extends
    https://www.jianshu.com/p/3d3d52b47762
    */

    class App1 extends mixinClass(Config, Router, Factory) {
        constructor() {
            super();
            this.isTest = (window.location.hostname == "127.0.0.1");
            this.locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();


            console.log(this.router);
            console.log(this.server);
            console.log(this.locator);



            //this.route = this.router[this.server][this.locator];
            //this.module = (this.route) ? [this.server, this.route].join("/") : undefined;

        }
        bootstrap() {

        }
    }


    Object.assign(App1.prototype, window.localStorage);
    Object.assign(App1.prototype, Factory.prototype);

    return App1



    class App extends Config {

        constructor() {
            super();

            console.log(this.sendMessage);

            this.isTest = (window.location.hostname == "127.0.0.1");
            this.locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
            this.route = router[this.server][this.locator];
            this.module = (this.route) ? [this.server, this.route].join("/") : undefined;
            /*****************************************************************************/
            /*this.searchParams = new URLSearchParams(window.location.search);
            this.params = Array.from(this.searchParams).serialize(); //instance
            this.account = this.params.account || this.params.member;
            this.channel = localStorage.channel || this.params.siteNumber;
            this.unique = [this.account, this.channel].join("-");
            this.referrer = document.referrer;
            this.forms = document.forms;
            this.form = document.forms[0];
             */
            /*****************************************************************************/
        }

        bootstrap(app) {
            console.log("bootstrap...");
            requirejs(app.requires, function(angular) {
                $('html').attr('ng-app', app.name);
                $("<div>", { "id": app.ctrlId, "ng-controller": app.ctrlId }).appendTo("body");
                var c = angular.module(app.name, app.modules).controller(app.ctrlId, app.controller);
                angular.bootstrap(document, [app.name]);
                app.loadModule();
            })
        }



        loadModule() {




            return

            //requirejs(["app.Factory"], function(Factory) { console.log(Factory); })


            return


            this.$controller = angular.element(this.controller.selector);
            this.$injector = this.$controller.injector();
            this.$scope = this.$controller.scope();
            this.$invoke = this.$injector.invoke;
            this.$compile = this.$injector.get('$compile');
            //console.log(this.$controller);
            //console.log(this);
            Object.assign(this.$scope, this)

            return

            requirejs(["app.Factory"],

                function(Factory) {

                    this.$invoke(Factory, this.$scope)

                    //console.log(this);
                    //App
                    //console.log(Factory);

                    //this.$invoke(module, this.$scope)

                }.bind(this))

            return
            requirejs([this.module],

                function(module) {

                    console.log("module:", this.module);

                    //this.$invoke(module, this.$scope)

                }.bind(this))

        }
    }


    Object.assign(App.prototype, window.localStorage);
    Object.assign(App.prototype, Factory.prototype);

    Object.assign(App.prototype, f.__proto__);






    //Object.assign(App.prototype, Factory.prototype);





    //Object.assign(App.prototype, window.location);

    return App;
})

//console.log(this.constructor);

/*
            class B extends this.constructor {
                constructor(x) {
                    super()
                    console.log(1233);
                }

            }
            var c = new B(123)
            console.log(c.referrer);
            */



//Object.assign(this, window.localStorage);
//Object.assign(this, window.location);

/*
class App extends Bootstrap
class Bootstrap extends Factory
    */



/*  class B extends Factory {

  }

  console.log(B);*/
/*
    class Config {}

    Config = _Config;


    class Factory extends Config {}

    Factory = _Factory;




    console.log(router);
    console.log(Factory);
    console.log(Config);
*/

//angular.bootstrap(element, [modules])




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