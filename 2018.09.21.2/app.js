define(["mixinClass", "app.Config", "app.router", "app.Factory"], function(mixinClass, Config, router, Factory) {
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



    class App extends Factory {
        constructor() {
            super();
            this.$name = "OBSApp";
            this.$ctrlId = "View";
            this.$requires = ["angular", "angular-sanitize", "angular-animate"];
            this.$modules = ["ngSanitize", "ngAnimate"];
            //this.$controller.selector = "[ng-controller]";
            this.$router = router;
            this.$isTest = (window.location.hostname == "127.0.0.1");
            this.$locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
            this.$forms = document.forms;
            this.$form = document.forms[0];
            this.$referrer = document.referrer;
            this.$searchParams = new URLSearchParams(window.location.search);
            this.$origin = location.origin;
        }

        get $module() {
            return this.$router[this.$server][this.$locator];
        }

        get $controller() { return angular.element("[ng-controller]"); }
        get $injector() { return this.$controller.injector(); }
        get $scope() { return this.$controller.scope(); }
        get $invoke() { return this.$injector.invoke; }
        get $compile() { return this.$injector.get('$compile'); }

        //$controller_($scope, $rootScope) {}

        $bootstrap(app) {

            if (this.$module == undefined) { return }
            console.log('*****', this.$module);

            if (window.angular) { return this.$loadModule(); } else {

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

        $loadModule() {

            let MODULE_PATH = this.$server + '/' + this.$module;

            requirejs([MODULE_PATH], (module) => {
                try {

                    module.call(this, this)
                    //fn.apply(self, [this])
                    //this.$invoke(module, this);

                } catch (ex) {
                    console.error(ex);
                }
            })

        }

    }


    Object.assign(App.prototype, window.localStorage);
    //Object.assign(App.prototype, window.location);


    return App;
})

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