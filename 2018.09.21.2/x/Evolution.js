define([], function() {


    class Evolution {

        constructor() {
            this.name = "OBSApp";
            this.ctrlId = "View";
            this.selector = "[ng-controller]";
            this.assign(
                window.localStorage,
                window.location);
            //this.loadModule();
        }

        loadModule() {

            if (this.moduleId) {
                //this.mainModule
                //console.log(this.mainModule());

                this.mainModule((app) => {
                    console.log(app);

                })

            } else {

            }
        }


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
})


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

        if (this.moduleId) {
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