//console.log(this.localStorage.server);

var $server = window.localStorage.server;

requirejs.config({
    packages: ["wa111", "ku711"],
    paths: {

        /*'app': 'app/app',
        'app.router': 'app/app.router',
        'app.instance': 'app/app.instance',
        'app.factory': 'app/app.factory',
        'app.sendSms': 'app/app.sendSms',
        'app.service': 'app/app.service',
        'app.xmlhttp': 'app/app.xmlhttp',
        */

        'User': $server + '/User',
        'angular': 'lib/angular/angular',
        'angular-animate': 'lib/angular/angular-animate.min',
        'angular-aria': 'lib/angular/angular-aria',
        'angular-cookies': 'lib/angular/angular-cookies',
        'angular-messages': 'lib/angular/angular-messages',
        'angular-mocks': 'lib/angular/angular-mocks',
        'angular-resource': 'lib/angular/angular-resource',
        'angular-route': 'lib/angular/angular-route.min',
        'angular-sanitize': 'lib/angular/angular-sanitize.min',
        'angular-scenario': 'lib/angular/angular-scenario',
        'angular-touch': 'lib/angular/angular-touch',
        "angularAMD": "lib/angular/angularAMD",
        "ngload": "lib/angular/ngload",
        'domReady': 'lib/require/domReady',
        'require': 'lib/require/require',
        'jquery': 'lib/jquery/jquery-3.2.1.min',
        'js-url': 'lib/jquery/url.min',
        'moment': 'lib/jquery/moment-with-locales.min',
        'dexie': 'lib/jquery/dexie',
        'crypto': 'lib/crypto/rollups/',
        'aes': 'lib/crypto/rollups/aes',
        'md5': 'lib/crypto/rollups/md5',
        'hmac-md5': 'lib/crypto/rollups/hmac-md5',
        'material': 'lib/material/0.36.0/material-components-web',
        'semantic': 'lib/semantic/semantic',
        'Mock': 'lib/mock'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-animate': { deps: ['angular'] },
        'angular-aria': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'angular-messages': { deps: ['angular'] },
        'angular-mocks': { deps: ['angular'] },
        'angular-resource': { deps: ['angular'] },
        'angular-route': { deps: ['angular'] },
        'angular-sanitize': { deps: ['angular'] },
        'angular-scenario': { deps: ['angular'] },
        'angular-touch': { deps: ['angular'] }
    }
});


requirejs(["angular"], function(angular) {

    class Evolution {

        constructor() {
            this.name = "OBSApp";
            this.ctrlId = "View";
            this.selector = "[ng-controller]";

            this.extend(localStorage)
            this.extend(location)
        }

        /*
        get name() { return "OBSApp" }
        get ctrlId() { return "View" }
        get selector() { return "[ng-controller]" }
        get moduleId() { return }
        get moduleId() { return }
        get moduleId() { return }
        hello() {}
        */


        extend() {
            angular.extend(this.__proto__, arguments[0])
        }

        static extend() { //level:1
            angular.extend(this.prototype, arguments[0])
        }

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

        static entries() {

        }
        /*
        static defineProperty([name, value]) {
            Object.entries(arguments[0]).forEach(([name, value]) => {
                Object.defineProperty(this.prototype, name, {
                    value: value,
                    enumerable: false
                });
            });
        }*/

    }



    //Evolution.extend(localStorage)
    //Evolution.extend(location)

    var evo = new Evolution()

    console.log(evo);


    //console.log(Evolution.prototype);

    return

    //console.log(Object);
    //Evolution.prototype =
    //var c = angular.copy(Object, Evolution.prototype)

    var c = angular.copy(Object)


    console.log(c);
    console.log(c.assign);
    console.log(c.hello);


    console.log(Evolution.prototype);

    return

    console.log(Evolution.prototype);
    console.log(Evolution.prototype.assign);


    return

    var a = {
        qaz: 265
    }



    //var c = angular.merge(a, Object)
    var c = angular.merge(Object, a)


    console.log(a);
    console.log(a.qaz);
    console.log(a.assign);
    console.log(c.assign);


    return



    console.log(a);
    return


    Object.assign(c, a)

    console.log(c);
    console.log(c.assign);


    return


    //console.log(Object.create(Object).__proto__);

    var c = function() {

    }

    c.prototype = Object.create(Object).__proto__
    //Object.assign({}, Object.create(Object).__proto__);

    var a = new c()


    console.log(a.assign);

    return

    Object;

    console.log(c.assign);



    return

    Object.assign(Evolution.prototype, Object.constructor)


    console.log(Evolution.prototype);


    return

    console.log(Evolution.prototype);

    //var c = angular.copy(Object, {})
    var c = angular.merge(Object, Evolution.prototype)


    console.log(c);
    console.log(c.assign);
    return

    console.log(Object.extends);
    console.log(Evolution.prototype);


    return


    console.log(c);
    console.log(c.assign);


    return


    function Ninja(name, weapon) {
        this.weapon = weapon;
    }
    Ninja.prototype = Object
    var c = new Ninja('RYAN', "G17")
    console.log(c);

    console.log(c.assign);


    return

    //Object.create(Person.prototype);
    //Ninja.prototype.constructor = Ninja;




    var c = Object.constructor()

    class A extends c {
        constructor() {
            super()
            //console.log(this);
        }

        hello() {

        }
    }

    console.log(new A());

    return

    //console.log(Object.prototype);
    var c = angular.copy(Object, Evolution.prototype)

    console.log(c);
    console.log(Evolution.prototype);

    console.log(c.assign);

    //Object.assign(Object.constructor, Evolution.prototype)
    //Object.assign(Evolution.prototype, Object.__proto__)


    /*console.log(Object.prototype);
    console.log(Object.__proto__);
    console.log(Object.constructor);
    */


    //Evolution.extend(angular)
    //Evolution.extend(location)

    /*
        angular.merge(location, Evolution.prototype)
        angular.merge(localStorage, Evolution.prototype)
        angular.merge(angular, Evolution.prototype)
    */


    return
    var evo = new Evolution(angular);
    console.log(evo);


})



// Object.assign(Evolution.prototype, angular)
//console.log(angular);
//angular.copy(Evolution.prototype, angular)
//Evolution.prototype =
//Object.create(angular)
//Object.create(angular)
//console.log(Object.create(angular));






function xxx() {
    /*
    extends() {

    }

    copy() {

    }

    merge() {

    }*/


    function Evolution() {
        this.extends(localStorage, location);
        this.name = "OBSApp";
        this.ctrlId = "View";
        this.selector = "[ng-controller]";
        this.locator = this.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.module = this.paths[this.server][this.locator];
        this.isTest = (this.hostname == "127.0.0.1") ? true : false;

        if(this.module) {
            requirejs([this.server], (app) => {
                app.apply(this);
                requirejs(['app.instance', 'app.factory'], (instance, factory) => {
                    var $controller = angular.element(this.selector);
                    var $injector = $controller.injector();
                    var $scope = $controller.scope();
                    var $invoke = $injector.invoke;
                    var $compile = $injector.get('$compile');
                    $scope.extends = this.extends;
                    $scope.extends(this, { $controller, $injector, $invoke, $scope, $compile })
                    $scope.$invoke(factory, $scope);
                    $scope.$loadModule();
                });
            })
        }

    };


    Evolution.prototype.extends = function() {
        var last = arguments.length - 1;
        // console.log(arguments);
        //console.log(last);
        //console.log(arguments[0]);
        if(arguments[last] == true) {
            var arg = arguments[0];
            return Object.assign(arguments[0].__proto__, this, { $apply: this.$apply, $digest: this.$digest, $eval: this.$eval });
        }

        if(this.$root) {
            Object.assign(this, ...arguments)
        } else {
            Object.assign(this, ...arguments)
        }
    }

    Evolution.prototype.paths = {
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


    var evo = new Evolution();

}








/*
chrome://extensions/
chrome://settings/fonts
chrome://flags/#enable-devtools-experiments
*/





//this.module = this.server + "/" + this.paths[this.server][this.locator];


//var $container = $("[ng-controller]");


//$scope.extends({ $controller, $injector, $invoke, $scope });



/*


                //$scope.extend = angular.extend.bind($scope)
                //angular.bind(self, fn, args);

                //extend(not deep), merge(deep), copy()

                $scope.extend = angular.extend
                $scope.merge = angular.merge
                $scope.copy = angular.copy

                var c = angular.merge({}, $scope, this)

                //$scope.extend($scope, this)

                //$scope.merge($scope, this)


                //angular.extend($scope, this)
                console.log(c);

                console.log(c.paths);

                /*
var $container = $("[ng-controller]");
var $controller = angular.element($container);
var $injector = $controller.injector();
var $scope = $controller.scope();
$scope.__proto__.$container = $container;
$scope.__proto__.$controller = $controller;
$scope.__proto__.$injector = $injector;
$scope.__proto__.$invoke = $injector.invoke;
*/



//console.log(evo);

//require(["main"], function() {});


/*
程序员浪费生命的几种方式
https                                        ://beginor.github.io/2013/12/16/waste-of-time.html


基于XMLHttpRequest对象的ajax拦截
https                                        ://blog.csdn.net/xiaochunblog/article/details/83351987


颈椎病康复指南
https                                        ://beginor.github.io/2016/04/05/angularjs-controller-as.html
*/

//Object.entries(paths).map(([_name, _path]) => { paths[_name] = localStorage.baseUrl + _path; });
//console.log(Object.entries(paths));
/*

requirejs(['app.instance', 'app.router', 'app.factory'], function(instance, router, factory) {
    require(["main"], function() {
        var $container                       = $("[ng-controller]");
        var $controller                      = angular.element($container);
        var $injector                        = $controller.injector();
        var $scope                           = $controller.scope();
        $scope.__proto__.$container          = $container;
        $scope.__proto__.$controller         = $controller;
        $scope.__proto__.$injector           = $injector;
        $scope.__proto__.$invoke             = $injector.invoke;

        $scope.join                          = function join() {
            Object.assign(this.__proto__, ...arguments);
        }

        $scope.$invoke(router, $scope);
        $scope.$invoke(factory, $scope);
        $scope.$loadModule();
    });
});
*/

//chrome-extension                           ://glimkfbjoipaecfannadijhmifilnooh/module/wa111





//console.log(this);
// console.log(this.locator);
//console.log();
//this.router()
//this.$server = window.localStorage.server;
/*
requirejs(["app.router"], function(app) {
    //console.log(require.toUrl("."));
    //console.log(app);
})
*/



/*
var $server = this.localStorage.server;
requirejs([$server], function(app) {
    console.log(require.toUrl("."));
    console.log(app);
})
*/




//packages                                   : ["wa111", "ku711", "evo"],
//baseUrl                                    : localStorage.baseUrl,
//baseUrl                                    : "module/wa111",