//console.log(this.localStorage.server);

var $server = window.localStorage.$server;

requirejs.config({
    packages: ["wa111", "ku711"],
    paths: {
        '$server': $server + "/main",

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
        'jquery2': 'lib/jquery/jquery-3.2.1.min',
        'jquery': 'lib/jquery/jquery-3.3.1',

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


requirejs(["app"], function(app) {
    //console.log(app);
    app.$bootstrap();

    //console.log(Object.keys(app));

    /*
    var obj2 = $.extend(true, {}, app);

    var y = Object.assign({}, app.__proto__);

    console.log(y);
    */

    //console.log(window.$name);


    //var app = new App();
    //app.$bootstrap(app);

    //console.log(app.__proto__);
    /*var c = Object.assign({}, app)
    Object.assign(c, app.__proto__)
    //angular.copy(app, {})
    console.log(c);*/

});









/*
requirejs(["jquery"], function(jquery) {
   console.log(jquery);
});
*/


/*
   console.log(app.mdc);
   console.log(app.sendMessage);
   */


//console.log(app);
//console.log(app.sendMessage);
/*
requirejs(["app.factory"], function(Factory) {
    //console.log(Factory);
    //class B extends Factory {}
})
*/


//app.bootstrap(app);



//console.log(app);
//console.log(app.controller);
//console.log(app.controller.selector);


//console.log(app);
//console.log(app.components);



//console.log(app);
//app.loadMain();
/*
requirejs([$server], function(server) {
    //console.log(server);
})
*/
/*
class A {}
class B extends A {}
class C extends B {}
*/
/*
 return
    console.log(app);
    if(app.module) {
        requirejs([app.server], function(server) {
            //console.log(server);
            server.call(app)
            requirejs(["app.instance", "app.factory"], (instance, Factory) => {
                //console.log(factory);
                new Factory()

            })
        })
    }
console.log(app);
console.log(app.module);
*/




//var evolution = new Evolution();
//console.log(evolution.moduleId);

/*
console.log(evolution);
console.log(evolution.server);
console.log(evolution.moduleId);
*/


/*
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
*/


/*
static defineProperty([name, value]) {
    Object.entries(arguments[0]).forEach(([name, value]) => {
        Object.defineProperty(this.prototype, name, {
            value: value,
            enumerable: false
        });
    });
}*/

/*
       get name() { return "OBSApp" }
       get ctrlId() { return "View" }
       get selector() { return "[ng-controller]" }
       get moduleId() { return }
       get moduleId() { return }
       get moduleId() { return }
       hello() {}
        extend() {
           Object
           angular.extend(this.__proto__, arguments[0])
       }

       static extend() { //level:1
           angular.extend(this.prototype, arguments[0])
       }

       */















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