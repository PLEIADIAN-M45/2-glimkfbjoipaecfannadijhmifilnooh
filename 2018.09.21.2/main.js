//console.log(this.localStorage.server);
//var $
//console.log(requirejs);

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



function extend() {
    var last = arguments.length - 1;
   /* console.log(arguments);
    console.log(last);*/

    if (arguments[last] == true) {
        Object.assign(arguments[0], this)
    } else {
        console.log(...arguments);
        Object.assign(this, ...arguments)
    }
}


function Evolution() {
    this.extend = extend;
    this.extend(localStorage);
    this.extend(location);
    this.name = "OBSApp";
    this.ctrlId = "View";
    this.locator = this.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
    this.module = this.server + "/" + this.paths[this.server][this.locator];
    this.isTest = (this.hostname == "127.0.0.1") ? true : false;
    if (this.module) {
        requirejs([this.server], (fn) => {
            this.app = fn.apply(this);
            //console.log(this.app);
            requirejs(['app.instance', 'app.factory'], (instance, factory) => {
                var $container = $("[ng-controller]");
                var $controller = angular.element($container);
                var $injector = $controller.injector();
                var $scope = $controller.scope();
                var $invoke = $injector.invoke;
                $scope.extend = extend;
                $scope.extend(this)
                console.log($scope);
                return
                $scope.extend(window);
                //$scope.extend(this);
                $scope.extend({ $container, $controller, $injector, $invoke });
                console.log($scope);
                $scope.$invoke(factory, $scope);
                $scope.$loadModule();
            });
        })
    }
};


/*
Evolution.prototype.extend = function() {
    var last = arguments.length - 1;
    if (arguments[last] == true) { Object.assign(arguments[0], this) } else { Object.assign(this, ...arguments) }
}
*/


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