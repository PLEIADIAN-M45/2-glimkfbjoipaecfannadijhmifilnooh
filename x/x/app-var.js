define(["mixinClass", "app.Config", "app.router", "app.Factory"], function(mixinClass, Config, $router, Factory) {


    class App extends Factory {
        constructor() {
            super();
            this.$name = "OBSApp";
            this.$ctrlId = "View";
            this.$requires = ["angular", "angular-sanitize", "angular-animate"];
            this.$modules = ["ngSanitize", "ngAnimate"];
            this.$router = router;
            this.$isTest = (window.location.hostname == "127.0.0.1");
            this.$locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
            this.$forms = document.forms;
            this.$form = document.forms[0];
            this.$referrer = document.referrer;
            this.$searchParams = new URLSearchParams(window.location.search);
            this.$origin = location.origin;
            this.$window = window;
        }

        get $module() { return this.$router[this.$server][this.$locator]; }
        get $controller() { return angular.element("[ng-controller]"); }
        get $injector() { return this.$controller.injector(); }
        get $scope() { return this.$controller.scope(); }
        get $invoke() { return this.$injector.invoke; }
        get $compile() { return this.$injector.get('$compile'); }

        $bootstrap(app) {

            if(this.$module == undefined) { return }

            //console.log('*****', this.$module);

            if(window.angular) { return this.$loadModule(); } else {

                requirejs(this.$requires, (angular) => {

                    $('html').attr('ng-app', this.$name);

                    $("<div>", { "id": this.ctrlId, "ng-controller": this.$ctrlId }).appendTo("body");

                    var c = angular.module(this.$name, this.$modules);

                    c.controller(this.$ctrlId, function() {});
                    //console.log(c);
                    angular.bootstrap(document, [this.$name]);

                    return this.$loadModule();
                })
            }
        }


        get components() { return { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.$module]; }

        get stylesheet() { return { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.$module]; }

        $loadModule() {

            let MODULE_PATH = this.$server + '/' + this.$module;

            requirejs([MODULE_PATH], (module) => {
                try {

                    this.injectStylesheet();
                    this.injectComponents();


                    module.call(this, this)

                    //fn.apply(self, [this])
                    //this.$invoke(module, this);

                } catch (ex) {
                    console.error(ex);
                }
            })

        }


        injectStylesheet() {

            if(!this.stylesheet) { return false };

            this.stylesheet.map((str) => { return this.$rootUrl + "css/" + str + ".css"; }).map((src) => {

                $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
            });
        };

        injectComponents() {
            return new Promise((resolve, reject) => {
                if(this.components) {
                    this.components.map((str) => { return this.$rootUrl + "html/" + str + ".html"; }).map((src) => {
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
    }


    Object.assign(App.prototype, window.localStorage);
    //Object.assign(App.prototype, window.location);


    return App;
    //$controller_($scope, $rootScope) {}
    //var injects = ['$anchorScroll', '$animate']

})




/*
    Class 的继承 - ECMAScript 6入门
    http://es6.ruanyifeng.com/#docs/class-extends
    https://www.jianshu.com/p/3d3d52b47762
    The "new Function" syntax
    https://javascript.info/new-function
    https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
    https://www.h5jun.com/post/mixin-in-es6.html
    https://googlechrome.github.io/samples/classes-es6/
    */


/*
$controller = angular.element("[ng-controller]"),
$injector = $controller.injector(),
$scope = $controller.scope(),
$invoke = $injector.invoke,
$compile = $injector.get('$compile');
*/





/*
function hexafy() {
    this.myFunc = function(x) {
        return x.toString(16);
    }
}

function hexafy2() {
    this.myFunc = function(x) {
        return x.toString(16);
    }
}


function hexafy3(...arg) {
    console.log(arg);
}
*/

//fun.call(thisArg, arg1, arg2, ...)
//func.apply(thisArg, [argsArray])
//ƒ invoke(fn, self, locals, serviceName)



//console.log(this.$injector.has("hexafy"));
//var c = angular.module(this.name)
/*c.service('hexafy', function() {
    this.myFunc = function(x) {
        return x.toString(16);
    }
});
function hexafy() {
    this.myFunc = function(x) {
        return x.toString(16);
    }
}
*/



//c.requires.push('hexafy');
//console.log(c.requires);
//console.log(this.$injector);
//console.log(window.OBSApp);
//console.log($("[ng-app]").injector())


define(["app.router"], function($router) {


    var
        $extensionId = localStorage.$extensionId,
        $server = localStorage.$server,
        $rootUrl = localStorage.$rootUrl,
        $baseUrl = localStorage.$baseUrl,
        $router = $router,

        $name = "OBSApp",
        $ctrlId = "View",
        $requires = ["angular", "angular-sanitize", "angular-animate"],
        $modules = ["ngSanitize", "ngAnimate"],
        $isTest = (window.location.hostname == "127.0.0.1"),
        $locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(),
        $forms = document.forms,
        $form = document.forms[0],
        $referrer = document.referrer,
        $searchParams = new URLSearchParams(window.location.search),
        $origin = location.origin,
        $window = window,
        $module = $router[$server][$locator],
        components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [$module],
        stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [$module],
        $bootstrap = function(app) {

            if($module == undefined) { return }

            //console.log('*****', this.$module);

            if(window.angular) { return $loadModule(); } else {

                requirejs($requires, (angular) => {

                    $('html').attr('ng-app', $name);

                    $("<div>", { "id": $ctrlId, "ng-controller": $ctrlId }).appendTo("body");

                    var c = angular.module($name, $modules);

                    c.controller($ctrlId, function() {});
                    //console.log(c);
                    angular.bootstrap(document, [$name]);

                    return $loadModule();
                })
            }
        },

        $loadModule = function() {

            var $controller = angular.element("[ng-controller]"),
                $injector = $controller.injector(),
                $scope = $controller.scope(),
                $invoke = $injector.invoke,
                $compile = $injector.get('$compile');


            var arr = [$controller, $injector, $scope, $compile]

            let MODULE_PATH = $server + '/' + $module;

            console.log(MODULE_PATH);

            requirejs([MODULE_PATH], (module) => {
                try {

                    console.log(module);

                    /*
                    injectStylesheet();
                    injectComponents();
                    module.call(this, this)
                    */

                    //fn.apply(self, [this])
                    //this.$invoke(module, this);

                } catch (ex) {
                    console.error(ex);
                }
            })

        },
        injectStylesheet = function() {

            if(!stylesheet) { return false };

            stylesheet.map((str) => { return $rootUrl + "css/" + str + ".css"; }).map((src) => {

                $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
            });
        },

        injectComponents = function() {
            return new Promise((resolve, reject) => {
                if(components) {
                    components.map((str) => { return $rootUrl + "html/" + str + ".html"; }).map((src) => {
                        fetch(src)
                            .then((res) => { return res.text(); })
                            .then((html) => {
                                var template = angular.element(html);
                                $controller.append(this.$compile(template)(this.$scope))
                                $scope.$apply();
                                resolve(1);
                            });
                    });
                } else {
                    resolve(0);
                }
            })
        },

        service = function() {

            var $controller = angular.element("[ng-controller]"),
                $injector = $controller.injector(),
                $scope = $controller.scope(),
                $invoke = $injector.invoke,
                $compile = $injector.get('$compile');






        }



    return { $bootstrap }
})