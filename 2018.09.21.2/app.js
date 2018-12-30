define(["app.paths"], function(paths) {
    return class App {
        constructor() {
            Object.assign(this, window.localStorage)
            Object.assign(this, window.location)
            this.name = "OBSApp";
            this.ctrlId = "View";
            this.selector = "[ng-controller]";
            this.paths = paths;
            this.isTest = (window.location.hostname == "127.0.0.1");
            this.locator = window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
            this.path = this.paths[this.server][this.locator]
            this.module = (this.path) ? [this.server, this.path].join("/") : undefined;
        }

        loadMain() {

            if(this.module) {
                //console.log(this.module);
                requirejs([this.server], (server) => {
                    server.call(this);

                    this.$controller = angular.element(this.selector);
                    this.$injector = this.$controller.injector();
                    this.$scope = this.$controller.scope();
                    this.$invoke = this.$injector.invoke;
                    this.$compile = this.$injector.get('$compile');


                    requirejs(["app.instance", "app.factory"], (instance, factory) => {
                        angular.extend(this.$scope, this)
                        console.log(this.$scope);
                        //Object.assign(this.$scope, this)
                        this.$invoke(factory, this.$scope)

                        /*
                                                requirejs([this.module], (module) => {
                                                    this.$scope.injectStylesheet();
                                                    this.$scope.injectComponents()
                                                        .then((x) => {
                                                            this.$scope.setElements();
                                                            this.$invoke(module, this.$scope);
                                                        })
                                                })*/

                    })
                })
            } else {

            }
        }
    }
})




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

class Evolution {


    _assign() { Array.from(arguments).forEach((object) => { Object.assign(this.__proto__, object) }); }

    get module() { return (this.path) ? [this.server, this.path].join("/") : undefined; }
    get isTest() { return window.location.hostname == "127.0.0.1" }
    get locator() { return window.location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(); }
    get path() { return this.paths[this.server][this.locator] }
    get paths() { return paths }
    get $controller() {
        return angular.element(this.selector)
    }
    get $scope() {
        return this.$controller.scope();
    }
    get $injector() {
        return this.$controller.injector();
    }
    get $compile() {
        return this.$injector.get('$compile');
    }
    get $invoke() {
        return this.$injector.invoke;
    }
    constructor() {
        /*

        this.$controller = angular.element(this.selector);
        this.$injector = $controller.injector();
        this.$scope = $controller.scope();
        this.$invoke = $injector.invoke;
        this.$compile = $injector.get('$compile');

        this.assign(window.localStorage, window.location);*/
        //this.$controller = angular.element(this.selector);
        //this.loadModule();
    }

    loadModule() {

        if(this.moduleId) {
            //this.mainModule
            //console.log(this.mainModule());

            this.mainModule((app) => {
                console.log(app);

            })

        } else {

        }
    }


    get $controller() { return angular.element(this.selector); }



    mainModule(callback) {
        return requirejs([this.server], callback)
    }

    assign() { Array.from(arguments).forEach((object) => { Object.assign(this.__proto__, object) }); }

    get moduleId() { return this.paths[this.server][this.locator] }
    get isTest() { return this.hostname == "127.0.0.1" }
    get locator() { return this.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(); }
    get paths() {
        return {
            "wa111": {
                "login": "login",
                "index": "home",
                "memberlist": "list",
                "membermodify": "edit",
                "depositbonus": "bonus",
                "igetmemberinfo": "logs",
                "samebrowserlist": "logs",
                "deltabank": "cash",
                "deltaonline": "cash",
                "deltawechat": "cash",
                "deltaalipay": "cash",
                "withdrawalsbank": "cash",
                "astropaywithdrawals": "cash",
                //cookie: "/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                //device: "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
            },
            "ku711": {
                "signin": "login",
                "member": "home",
                "memberinfomanage": "list",
                "editmemberinfomanage": "edit",
                "bonuslog": "bonus",
                "memberloginlog": "log",
                //cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
                //device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
            }
        };
    }

    defineProperty() {
        Object.entries(arguments[0]).forEach(([name, value]) => {
            Object.defineProperty(this.__proto__, name, {
                value: value,
                enumerable: false
            });
        });
    }
}