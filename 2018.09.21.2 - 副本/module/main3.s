class Basic {
    constructor() { this.c = 56 }
    /*get channel() {

    }
    set channel() {

    }*/
    get port() { return location.port; }
    get path() { return location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase() }
    get host() {
        if(this.port) {
            return { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port];
        } else { return this.host.split(".")[1]; }
    }
    get route() {
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
                "astropaywithdrawals": "cash"
            },
            "ku711": {
                "signin": "login",
                "member": "home",
                "memberinfomanage": "list",
                "editmemberinfomanage": "edit",
                "bonuslog": "bonus",
                "memberloginlog": "log"
            }
        } [this.host][this.path];
    }
}

var _ = new Basic();
//console.log(_);

requirejs.config({
    //baseUrl                  : require.toUrl(host),
    baseUrl: require.toUrl(_.host),
    paths: {
        'App'                : '../App',
        'React'              : './App',
        'xmlSpider': '../xmlSpider',
        'factory': '../factory',
        'SendSms': '../../core/SendSms',
        'angular': '../../lib/angular/angular',
        'angular-animate': '../../lib/angular/angular-animate',
        'angular-aria': '../../lib/angular/angular-aria',
        'angular-cookies': '../../lib/angular/angular-cookies',
        'angular-messages': '../../lib/angular/angular-messages',
        'angular-mocks': '../../lib/angular/angular-mocks',
        'angular-resource': '../../lib/angular/angular-resource',
        'angular-route': '../../lib/angular/angular-route.min',
        'angular-sanitize': '../../lib/angular/angular-sanitize.min',
        'angular-scenario': '../../lib/angular/angular-scenario',
        'angular-touch': '../../lib/angular/angular-touch',
        "angularAMD": "../../lib/angular/angularAMD",
        "ngload": "../../lib/angular/ngload",
        'domReady': '../../lib/require/domReady',
        'require': '../../lib/require/require',
        'jquery': '../../lib/jquery/jquery-3.2.1.min',
        'js-url': '../../lib/jquery/url.min',
        'moment': '../../lib/jquery/moment-with-locales.min',
        'Dexie': '../../lib/jquery/dexie',
        'crypto': '../../lib/crypto/rollups/',
        'aes': '../../lib/crypto/rollups/aes',
        'md5': '../../lib/crypto/rollups/md5',
        'hmac-md5': '../../lib/crypto/rollups/hmac-md5',
        'material': '../../lib/material/0.36.0/material-components-web',
        'semantic': '../../lib/semantic/semantic',
        'Mock': '../../lib/mock',
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

//console.log(require.toUrl('.'));

console.log(_);


if(_.route) {
    requirejs(['App'], function($scope) {
        requirejs([_.route], function(module) {
            if(module) { module.call($scope, $scope); }
        })
    })
}

/*
var port = location.port;
if(port) { var host = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [port]; } else {
    var host = location.host.split(".")[1];
}
var path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();*/

//console.log(path);
//console.log(host);
/*var route = {
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
        "astropaywithdrawals": "cash"
    },
    "ku711": {
        "signin": "login",
        "member": "home",
        "memberinfomanage": "list",
        "editmemberinfomanage": "edit",
        "bonuslog": "bonus",
        "memberloginlog": "log"
    }
} [host][path];
*/


//console.log(route);


//requirejs(["factory"], function(factory) {})

//requirejs(["App"], function(App) {})

/*
if(route) {
    requirejs(['../App'], function($scope) {
        requirejs([route], function(module) {
            if(module) { module.call($scope, $scope); }
        })
    })
}
*/


requirejs.config({
    bundles: {
        'primary': ['main2', 'util', 'text', 'text!template.html'],
        'secondary': ['text!secondary.html']
    }
});
