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
        //'moment': '../lib/jquery/moment',

        'moment': '../lib/jquery/moment-with-locales.min',

        'dexie': '../lib/jquery/dexie',
        'cryptojs': '../lib/cryptojs/rollups/',
        'aes': '../lib/cryptojs/rollups/aes',
        'Mock': '../lib/mock',
        'md5': '../lib/cryptojs/rollups/md5',
        'hmac-md5': '../lib/cryptojs/rollups/hmac-md5',
        'material': '../lib/material/0.36.0/material-components-web',
        'semantic': '../lib/semantic/semantic',
        'myApp': './myApp',
        'utils': './utils',
        'extension': './extension',
        'aes.extend': './encrypt',
        'xmlhttp': './xmlhttp'
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

/*


requirejs(['path'], function(path) {
    console.log(win32, posix);
    var path = posix.parse(location.href);
    console.log(path);
    var path = win32.parse(location.href);
    console.log(path);
})

*/


requirejs(['evo', 'extension', 'moment', 'dexie'], function(evo, extension, moment, Dexie) {

    window.Dexie = Dexie;
    window.moment = moment;


    if (evo.route == undefined) { return false; } else {
        //Cashflow

        if (evo.route == "Login") { requirejs([evo.route], function() {}) } else {


            //console.log('%c' + evo.route, 'color:Gold');
            //, 'records'
            //console.log('%c' + evo.filename, 'color:Gold');

            //console.log(evo.route);
            // console.log('%cpathname: ' + evo.pathname, evo.route, 'color:Gold', evo.host);


            requirejs(['material', 'semantic', 'cryptojs/md5', 'cryptojs/ripemd160', 'common', 'encrypt', 'ApiFunction', 'myApp'], function(mdc) {

                window.mdc = mdc;

                requirejs(['spreadsheets', evo.route], function() {

                })

            })

        }
    }
});




















//requirejs(['xmlhttp'], function() {})
/*
if (location.protocol == "chrome-extension:") {
    requirejs(['angular', 'jquery', 'dexie', 'moment', 'material', 'semantic', 'md5', 'aes', 'encrypt', 'fs', 'common'], function(mdc) {
        requirejs(['bg', 'bg.filesystem', 'bg.onMessage'], function() {})
    })
} else {}
*/
/*

document.onreadystatechange = function() {
    switch (document.readyState) {
        case "interactive":
            break;
        case "complete":
        case "loading":
            break;

    }
}*/

/*
  'myApp', 'material', 'cryptojs/md5', 'cryptojs/ripemd160', 'common', 'semantic',
    'fs', 'encrypt', evo.extend,
    'MemberLoginLog-1',
    'MemberLoginLog-2',
    'MemberLoginLog-3'


*/


/* requirejs(['mock'], function(Mock) {
     console.log(Mock);
     requirejs(['/ng/mock.setting.js'], function(Mock) {
         console.log(Mock);
     })
 })*/


// console.log(evo.extend, evo.route, evo.host);

// console.log([evo.route, evo.host].join('/'));

// console.log([evo.route, 'main'].join('/'));

//var a = [evo.route, 'main'].join('/');

//var a = [evo.route, evo.host, 'main'].join('/')


/*requirejs(['material', 'semantic', 'cryptojs/md5', 'cryptojs/ripemd160', 'common', 'encrypt', 'fs', 'myApp'], function() {
    requirejs([a], function() {})
})*/

//console.log(evo.route);

//console.log(evo.extend);