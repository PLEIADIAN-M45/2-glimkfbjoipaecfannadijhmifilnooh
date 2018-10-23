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
        'moment': '../lib/jquery/moment-with-locales.min',
        'dexie': '../lib/jquery/dexie',
        'cryptojs': '../lib/cryptojs/rollups/',
        'aes': '../lib/cryptojs/rollups/aes',
        'Mock': '../lib/mock',
        'md5': '../lib/cryptojs/rollups/md5',
        'hmac-md5': '../lib/cryptojs/rollups/hmac-md5',
        'material': '../lib/material/0.36.0/material-components-web',
        'semantic': '../lib/semantic/semantic',

        //'utils': './utils',
        'aes.extend': './encrypt',
        // 'xmlhttp': './xmlhttp',

        'path': './core/path',
        'evo': './core/evo',
        'common': './core/common',
        'encrypt': './core/encrypt',
        'myApp': './core/myApp',
        'xhr': './core/xhr',
        'spreadsheets': './core/spreadsheets',
        'sendsms': './core/sendsms',
        'extension': './core/extension',

        'app': './adapter/app'


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



//'cryptojs/md5', 'cryptojs/ripemd160',


requirejs(['moment', 'dexie', 'material', 'semantic', 'evo', 'extension'], function(moment, Dexie, mdc, semantic, evo) {

    Object.assign(window, { moment, Dexie, mdc, evo });


    // console.log(evo.adapter);

    requirejs(['common', 'encrypt', 'app', 'spreadsheets'], function() {

        console.log(evo.adapter);
        //console.log(location);

        requirejs([evo.adapter], function() {

        })
    })
});






/*
compiledWrapper
apply
boostrap_node.js
module
exports
startup
_compile
process
process.binding('natives');
argv
runMain
wrap
*/




/*
requirejs(['route'], function({ adapter, router, host, port }) {
    console.log({ adapter, router, host, port });
})*/
/*if (route == "login") {}
  if (route == "cashflow") {}
  if (route == "login") {}*/

/*
requirejs(['path'], function(path) {
    //console.log(path);
    if (path.back) { return }
    if (path.last == "LOGIN" || path.last == "SIGNIN") { return requirejs([path.name]) }

    requirejs(['moment', 'dexie', 'material', 'semantic', 'cryptojs/md5', 'cryptojs/ripemd160'], function(moment, Dexie, mdc) {

        Object.assign(window, { Dexie, moment, mdc });

        requirejs(['evo'], function() {

            requirejs(['common', 'encrypt', 'myApp', 'spreadsheets'], function() {

                console.log(path);


                requirejs([path.core], function() {

                })
            })
        })
    });

})*/












//Cashflow
//'extension',
//console.log('%c' + evo.route, 'color:Gold');
//,'records'
//console.log('%c' + evo.filename, 'color:Gold');
//console.log(evo.route);
// console.log('%cpathname: ' + evo.pathname, evo.route, 'color:Gold', evo.host);