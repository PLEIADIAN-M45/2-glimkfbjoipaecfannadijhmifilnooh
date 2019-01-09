define(["app.router"], function($router) { /*  Router return $router  */

    if($router == undefined) { return }

    let $name = "OBSApp",
        $ctrlId = "View",
        $isTest = window.location.hostname == "127.0.0.1",
        $bootstrap = function() {
            //requirejs([$main])
            if(!window.angular) {
                requirejs(["angular", "angular-sanitize", "angular-animate"], (angular) => {
                    $('html').attr('ng-app', $name);
                    $("<div>", { "id": $ctrlId, "ng-controller": $ctrlId }).appendTo("body");
                    angular.module($name, ["ngSanitize", "ngAnimate"]).controller($ctrlId, function() {});
                    angular.bootstrap(document, [$name]);
                    $loadModule();
                })
            } else {
                $loadModule();
            }
        },
        $loadModule = function() {
            requirejs(["app.factory"], (factory) => {
                factory($router)
            });
        };


    //console.log(app);



    $bootstrap();









    return;


    // var { $server, $locate, $module, $main, $main_module, $vice_module, extensionId, baseUrl, server, rootUrl } = $router;
    //console.log($module);
    //console.log($router);
    /*
    console.log($router.$components);
    console.log($router.$stylesheet);
    */
    //$isTest
    //$name, $ctrlId,  $forms, $referrer


    //return new APP()

    class App2 extends Factory {

        constructor() {
            super();
            this.$name = "OBSApp";
            this.$ctrlId = "View";
            //this.$isTest = (window.location.hostname == "127.0.0.1");
            //this.$locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
            //this.origin = location.origin;
            //this.channel = location.channel || this.params.siteNumber
        }
        //get $window() { return window }
        // get $module() { return this.$router[this.$locator]; }
        get components() { return { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.$module]; }
        get stylesheet() { return { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.$module]; }

        //get $controller() { return angular.element("[ng-controller]"); }
        //get $injector() { return this.$controller.injector(); }
        //get $scope() { return this.$controller.scope(); }
        //get $rootScope() { return angular.element('html').scope() }
        //get $scope() { return angular.element('html').scope() }
        //get $invoke() { return this.$injector.invoke; }
        //get $compile() { return this.$injector.get('$compile'); }

        /*get $now() {
            //console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
            return moment().format('YYYY-MM-DD HH:mm:ss');
        }*/
        /*
                get clipboardData() {

                }
                set clipboardData(v) {
                    console.log(v);
                }*/

        $bootstrap() {

            console.log(this);

            return

            if(this.$module == undefined) { return }
            //console.log('*****', this.$module);
            if(window.angular) {
                //return this.$loadModule();
            } else {

                requirejs(["angular", "angular-sanitize", "angular-animate"], (angular) => {
                    $('html').attr('ng-app', this.$name);
                    $("<div>", { "id": this.ctrlId, "ng-controller": this.$ctrlId }).appendTo("body");
                    angular.module(this.$name, ["ngSanitize", "ngAnimate"]).controller(this.$ctrlId, function() {});
                    angular.bootstrap(document, [this.$name]);
                    //return this.$loadModule();
                })
            }
        }

        $injectStylesheet() {
            if(!this.stylesheet) { return false };
            this.stylesheet.map((str) => { return this.rootUrl + "app/css/" + str + ".css"; }).map((src) => {
                $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
            });
        };

        $injectComponents() {
            return new Promise((resolve, reject) => {
                if(this.components) {
                    this.components.map((str) => { return this.rootUrl + "app/html/" + str + ".html"; }).map((src) => {
                        fetch(src)
                            .then((res) => { return res.text(); })
                            .then((html) => {
                                var template = angular.element(html);
                                this.$controller.append(this.$compile(template)(this.$scope))
                                this.$scope.$apply();
                                resolve(1);
                            });
                    });
                } else {
                    resolve(0);
                }
            })
        };

        $loadModule() {
            /*
                this != $scope, 避免與原$scope衝突
            */
            var module = {
                main: ["main", this.$module].join("/"),
                vice: [this.server, this.$module].join("/")
            }
            requirejs(["app.factory", module.main, module.vice], (factory, main_module, vice_module) => {
                try {
                    this.$injectStylesheet();
                    this.$injectComponents();
                    factory.call(this, this);
                    vice_module.call(this, this);
                    main_module.call(this, this);
                    //$('.collapse').show()
                } catch (ex) {
                    console.error(ex);
                }
            });



            //console.log(this.baseUrl);
            //console.log(this.$module);
            //var main_module = ["main", this.$module].join("/");
            // var vice_module = [this.server, this.$module].join("/");

            /*
            window.page = page;
            window.__main__
            */



            //console.log(main, page);


            /*
            console.log(main);
            console.log(d);*/


            /*
                        requirejs.config({
                            baseUrl: this.baseUrl,
                            packages: ["home"]
                        })


                        requirejs(["home"])
                        */

            return
            //console.log(angular.element('html').scope(), var2);

            let MODULE_PATH = this.server + '/' + this.$module;

            console.clear();

            console.log(MODULE_PATH);

            requirejs(["app.factory", MODULE_PATH], (factory, modules) => {

                try {

                    this.$injectStylesheet();
                    this.$injectComponents();
                    //this.$invoke(Factory, this);
                    //console.log(this.$scope);
                    //console.log(this.$rootScope);
                    //Factory.call(this, this);
                    //console.log(this);

                    factory.call(this)
                    modules.call(this, this);

                    $('.collapse').show()

                    //console.log(Factory);
                    //module.call(this, this);
                    //console.log("[OK]", this.$module);
                    //this.$invoke(module, this);
                    //module.apply(self, [this])

                } catch (ex) {
                    console.error(ex);
                }
            })
        }
    }


    Object.assign(App.prototype, window.localStorage);
    //Object.defineProperty(App.prototype, '$loadModule', { enumerable: true });
    return new App();
});















//this.$invoke(Factory, this.$scope);



/*var target = this.$scope;
for (var i = 0; i < 5; i++) {
    if (target) {
        //console.log(target.constructor.name);
        Object.assign(this, target);
        target = target.__proto__;
    }
}

//this.$invoke(Factory, this.$scope);

this.$invoke(Factory, this);

var target = this;
for (var i = 0; i < 5; i++) {
    if (target) {
        //console.log(target.constructor.name);
        Object.assign(this.$scope, target);
        target = target.__proto__;
    }
}
*/



//this.$scope.$apply();


//this.$requires = ["angular", "angular-sanitize", "angular-animate"];
//this.$modules = ["ngSanitize", "ngAnimate"];
//this.$router = $router;



//var injects = ['$anchorScroll', '$animate']

//$controller_($scope, $rootScope) {}


//Object.assign(App.prototype, window.location);


//console.log(Factory.prototype);
// var c = new Factory()

//console.log(Factory.prototype);

//Object.assign(App, Factory.prototype);