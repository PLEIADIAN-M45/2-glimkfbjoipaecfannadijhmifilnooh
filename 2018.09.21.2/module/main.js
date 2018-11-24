var port                       = location.port;
if(port) {
    var host                   = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [port];
} else {
    var host                   = location.host.split(".")[1];
}
var path                       = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();

requirejs.config({
    baseUrl                    : require.toUrl('./wa111'),
    map                        : {
        'some/newmodule'       : { 'foo': 'foo1.2' },
        'some/oldmodule'       : { 'foo': 'foo1.0' },
    },
    paths                      : {
        'xmlSpider'            : '../xmlSpider',
        'factory'              : '../factory',
        'angular'              : '../../lib/angular/angular',
        'angular-animate'      : '../../lib/angular/angular-animate',
        'angular-aria'         : '../../lib/angular/angular-aria',
        'angular-cookies'      : '../../lib/angular/angular-cookies',
        'angular-messages'     : '../../lib/angular/angular-messages',
        'angular-mocks'        : '../../lib/angular/angular-mocks',
        'angular-resource'     : '../../lib/angular/angular-resource',
        'angular-route'        : '../../lib/angular/angular-route.min',
        'angular-sanitize'     : '../../lib/angular/angular-sanitize.min',
        'angular-scenario'     : '../../lib/angular/angular-scenario',
        'angular-touch'        : '../../lib/angular/angular-touch',
        "angularAMD"           : "../../lib/angular/angularAMD",
        "ngload"               : "../../lib/angular/ngload",
        'domReady'             : '../../lib/require/domReady',
        'require'              : '../../lib/require/require',
        'jquery'               : '../../lib/jquery/jquery-3.2.1.min',
        'js-url'               : '../../lib/jquery/url.min',
        'moment'               : '../../lib/jquery/moment-with-locales.min',
        'Dexie'                : '../../lib/jquery/dexie',
        'crypto'               : '../../lib/crypto/rollups/',
        'aes'                  : '../../lib/crypto/rollups/aes',
        'md5'                  : '../../lib/crypto/rollups/md5',
        'hmac-md5'             : '../../lib/crypto/rollups/hmac-md5',
        'material'             : '../../lib/material/0.36.0/material-components-web',
        'semantic'             : '../../lib/semantic/semantic',
        'Mock'                 : '../../lib/mock',
        'SendSms'              : '../../core/SendSms',
    },
    shim                       : {
        'angular'              : { exports: 'angular' },
        'angular-animate'      : { deps: ['angular'] },
        'angular-aria'         : { deps: ['angular'] },
        'angular-cookies'      : { deps: ['angular'] },
        'angular-messages'     : { deps: ['angular'] },
        'angular-mocks'        : { deps: ['angular'] },
        'angular-resource'     : { deps: ['angular'] },
        'angular-route'        : { deps: ['angular'] },
        'angular-sanitize'     : { deps: ['angular'] },
        'angular-scenario'     : { deps: ['angular'] },
        'angular-touch'        : { deps: ['angular'] }
    }
});

var module                     = {
    "wa111"                    : {
        "login"                : "login",
        "index"                : "home",
        "memberlist"           : "list",
        "membermodify"         : "edit",
        "depositbonus"         : "bonus",
        "igetmemberinfo"       : "logs",
        "samebrowserlist"      : "logs",
        "deltabank"            : "cash",
        "deltaonline"          : "cash",
        "deltawechat"          : "cash",
        "deltaalipay"          : "cash",
        "withdrawalsbank"      : "cash",
        "astropaywithdrawals"  : "cash"
    },
    "ku711"                    : {
        "signin"               : "login",
        "member"               : "home",
        "memberinfomanage"     : "list",
        "editmemberinfomanage" : "edit",
        "bonuslog"             : "bonus",
        "memberloginlog"       : "log"
    }
} [host][path];




if(module) {
    //console.log(module);
    requirejs(["../App"], function(App) {
        requirejs([module], function(submodule) {
            if(submodule) {
                var $scope     = App.$scope;
                submodule.call($scope, $scope);
            }
        })
    })
}