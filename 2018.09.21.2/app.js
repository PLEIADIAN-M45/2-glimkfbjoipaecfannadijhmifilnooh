define(["app.router", "moment"], function(Router, moment) { /*  Router return $router  */
    class App extends Router {
        constructor() {
            super();
            this.$name = "OBSApp";
            this.$ctrlId = "View";
            this.$isTest = (window.location.hostname == "127.0.0.1");
            this.$locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
            this.$forms = document.forms;
            this.$form = document.forms[0];
            this.$referrer = document.referrer;
            this.origin = location.origin;
        }

        get $window() { return window }
        get $module() { return this.$router[this.$locator]; }
        get components() { return { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.$module]; }
        get stylesheet() { return { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.$module]; }

        get $controller() { return angular.element("[ng-controller]"); }
        get $injector() { return this.$controller.injector(); }
        //get $scope() { return this.$controller.scope(); }
        //$rootScope
        get $scope() { return angular.element('html').scope() }
        get $invoke() { return this.$injector.invoke; }
        get $compile() { return this.$injector.get('$compile'); }
        get $now() {
            console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
            return moment().format('YYYY-MM-DD HH:mm:ss');
        }

        $bootstrap(app) {

            if(this.$module == undefined) { return }
            //console.log('*****', this.$module);
            if(window.angular) { return this.$loadModule(); } else {
                requirejs(["angular", "angular-sanitize", "angular-animate"], (angular) => {
                    $('html').attr('ng-app', this.$name);
                    $("<div>", { "id": this.ctrlId, "ng-controller": this.$ctrlId }).appendTo("body");
                    angular.module(this.$name, ["ngSanitize", "ngAnimate"]).controller(this.$ctrlId, function() {});
                    angular.bootstrap(document, [this.$name]);
                    return this.$loadModule();
                })
            }
        }

        $loadModule() {
            //console.log(angular.element('html').scope(), var2);
            let MODULE_PATH = this.server + '/' + this.$module;
            console.log(MODULE_PATH);
            requirejs(["app.Factory", MODULE_PATH], (Factory, module) => {
                try {
                    this.$injectStylesheet();
                    this.$injectComponents();
                    this.$invoke(Factory, this);
                    module.call(this, this);
                    //console.log("[OK]", this.$module);
                    //this.$invoke(module, this);
                    //module.apply(self, [this])

                } catch (ex) {
                    console.error(ex);
                }
            })
        }


        $injectStylesheet() {

            if(!this.stylesheet) { return false };

            this.stylesheet.map((str) => { return this.rootUrl + "css/" + str + ".css"; }).map((src) => {

                $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
            });
        };

        $injectComponents() {
            return new Promise((resolve, reject) => {
                if(this.components) {
                    this.components.map((str) => { return this.rootUrl + "html/" + str + ".html"; }).map((src) => {
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