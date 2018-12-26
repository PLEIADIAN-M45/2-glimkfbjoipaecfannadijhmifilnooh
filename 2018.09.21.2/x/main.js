/*var rootUrl                                = localStorage.rootUrl;
var baseUrl                                  = localStorage.baseUrl;
var server                                   = localStorage.server;
*/

var paths                                    = {
    //'app.main'                             : '/module/app.main',
    'app.router'                             : 'module/app.router',
    'app.instance'                           : 'module/app.instance',
    'app.factory'                            : 'module/app.factory',
    'app.sendSms'                            : 'module/app.sendSms',
    'app.service'                            : 'module/app.service',
    'app.xmlhttp'                            : 'module/app.xmlhttp',

    'angular'                                : 'lib/angular/angular',
    'angular-animate'                        : 'lib/angular/angular-animate.min',
    'angular-aria'                           : 'lib/angular/angular-aria',
    'angular-cookies'                        : 'lib/angular/angular-cookies',
    'angular-messages'                       : 'lib/angular/angular-messages',
    'angular-mocks'                          : 'lib/angular/angular-mocks',
    'angular-resource'                       : 'lib/angular/angular-resource',
    'angular-route'                          : 'lib/angular/angular-route.min',
    'angular-sanitize'                       : 'lib/angular/angular-sanitize.min',
    'angular-scenario'                       : 'lib/angular/angular-scenario',
    'angular-touch'                          : 'lib/angular/angular-touch',
    "angularAMD"                             : "lib/angular/angularAMD",
    "ngload"                                 : "lib/angular/ngload",
    'domReady'                               : 'lib/require/domReady',
    'require'                                : 'lib/require/require',
    'jquery'                                 : 'lib/jquery/jquery-3.2.1.min',
    'js-url'                                 : 'lib/jquery/url.min',
    'moment'                                 : 'lib/jquery/moment-with-locales.min',
    'dexie'                                  : 'lib/jquery/dexie',
    'crypto'                                 : 'lib/crypto/rollups/',
    'aes'                                    : 'lib/crypto/rollups/aes',
    'md5'                                    : 'lib/crypto/rollups/md5',
    'hmac-md5'                               : 'lib/crypto/rollups/hmac-md5',
    'material'                               : 'lib/material/0.36.0/material-components-web',
    'semantic'                               : 'lib/semantic/semantic',
    'Mock'                                   : 'lib/mock',
}


//Object.entries(paths).map(([_name, _path]) => { paths[_name] = rootUrl + _path; });


/*
var module                                   = {
    "wa111"                                  : {
        "login"                              : "login",
        "index"                              : "home",
        "memberlist"                         : "list",
        "membermodify"                       : "edit",
        "depositbonus"                       : "bonus",
        "igetmemberinfo"                     : "logs",
        "samebrowserlist"                    : "logs",
        "deltabank"                          : "cash",
        "deltaonline"                        : "cash",
        "deltawechat"                        : "cash",
        "deltaalipay"                        : "cash",
        "withdrawalsbank"                    : "cash",
        "astropaywithdrawals"                : "cash"
    },
    "ku711"                                  : {
        "signin"                             : "login",
        "member"                             : "home",
        "memberinfomanage"                   : "list",
        "editmemberinfomanage"               : "edit",
        "bonuslog"                           : "bonus",
        "memberloginlog"                     : "log"
    }
} [server][path];
console.log(module);
*/





requirejs.config({
    //baseUrl                                : baseUrl,
    paths                                    : paths,
    shim                                     : {
        'angular'                            : { exports: 'angular' },
        'angular-animate'                    : { deps: ['angular'] },
        'angular-aria'                       : { deps: ['angular'] },
        'angular-cookies'                    : { deps: ['angular'] },
        'angular-messages'                   : { deps: ['angular'] },
        'angular-mocks'                      : { deps: ['angular'] },
        'angular-resource'                   : { deps: ['angular'] },
        'angular-route'                      : { deps: ['angular'] },
        'angular-sanitize'                   : { deps: ['angular'] },
        'angular-scenario'                   : { deps: ['angular'] },
        'angular-touch'                      : { deps: ['angular'] }
    }
});






requirejs(["app"], function(a) {

    console.log(a);

    //console.log(router);
    //console.log(location);

    /*
    var router                               = new Router()
    */

    //router.apply(null)
    //console.log(1, 2);
});





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








//packages                                   : ["wa111", "ku711", "evo"],
//baseUrl                                    : localStorage.baseUrl,