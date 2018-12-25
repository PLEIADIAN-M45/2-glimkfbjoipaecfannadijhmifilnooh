requirejs.config({
    paths: {
        'angular': '../lib/angular/angular',
        'angular-animate': '../lib/angular/angular-animate',
        'angular-aria': '../lib/angular/angular-aria',
        'angular-cookies': '../lib/angular/angular-cookies',
        'angular-messages': '../lib/angular/angular-messages',
        'angular-mocks': '../lib/angular/angular-mocks',
        'angular-resource': '../lib/angular/angular-resource',
        'angular-route': '../lib/angular/angular-route.min',
        'angular-sanitize': '../lib/angular/angular-sanitize.min',
        'angular-scenario': '../lib/angular/angular-scenario',
        'angular-touch': '../lib/angular/angular-touch',
        "angularAMD": "../lib/angular/angularAMD",
        "ngload": "../lib/angular/ngload",
        'domReady': '../lib/require/domReady',
        'require': '../lib/require/require',
        'jquery': '../lib/jquery/jquery-3.2.1.min',
        'js-url': '../lib/jquery/url.min',
        'moment': '../lib/jquery/moment',
        'dexie': '../lib/jquery/dexie',
        'cryptojs': '../lib/cryptojs/rollups/',
        'aes': '../lib/cryptojs/rollups/aes',
        'aes.extend': './encrypt',
        'md5': '../lib/cryptojs/rollups/md5',
        'hmac-md5': '../lib/cryptojs/rollups/hmac-md5',
        'material': '../lib/material/0.36.0/material-components-web',
        'semantic': "../lib/semantic/semantic",
        'filesystem': './filesystem',
        'myApp': './myApp',
        'myApi': './myApi',
        'utils': './utils',
        'extension': './extension',
        'regexp': './regexp',
        'initialize': './initialize',

        'mock': '../lib/mock',


        'bg': '/background/background',
        'bg.filesystem': '/background/background.filesystem',
        'bg.onMessage': '/background/background.onMessage',
        'bg.onUpdated': '/background/background.onUpdated',


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




if (location.protocol == "chrome-extension:") {
    requirejs(['angular', 'jquery', 'dexie', 'moment', 'material', 'semantic', 'md5', 'aes', 'encrypt', 'fs', 'common'], function(mdc) {
        //window.mdc = mdc;
        requirejs(['bg', 'bg.filesystem', 'bg.onMessage'], function() {})
    })
} else {

    requirejs(['evo', 'extension'], function(evo, extension) {
        //console.log(evo.route, evo.extend);

        if (evo.route == undefined) { return false; } else {
            requirejs([evo.route], function() {})
        }
    });

}









/* requirejs(['mock'], function(Mock) {
     console.log(Mock);
     requirejs(['/ng/mock.setting.js'], function(Mock) {
         console.log(Mock);
     })
 })*/