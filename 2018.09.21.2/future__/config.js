requirejs.config({
    paths: {
        'angular': '../lib/angular/angular',
        'angular-animate': '../lib/angular/angular-animate.min',
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
        'jquery2': '../lib/jquery/jquery-3.3.1',
        'js-url': '../lib/jquery/url.min',
        'moment': '../lib/jquery/moment-with-locales.min',
        'dexie': '../lib/jquery/dexie',
        'crypto': '../lib/crypto/rollups/',
        'aes': '../lib/crypto/rollups/aes',
        'md5': '../lib/crypto/rollups/md5',
        'hmac-md5': '../lib/crypto/rollups/hmac-md5',
        'material': '../lib/material/0.36.0/material-components-web',
        'semantic': '../lib/semantic/semantic',
        'Mock': '../lib/mock'
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


requirejs(["apis"], function(app) {

})
