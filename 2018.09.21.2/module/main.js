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
        'queryStringToJSON': './core/queryStringToJSON',
        'evo': './core/evo',
        'common': './core/common',
        'encrypt': './core/encrypt',
        'spreadsheets': './core/spreadsheets',
        'sendsms': './core/sendsms',
        'extension': './core/extension',
        'app': './adapter/app',
        'xhr': './core/xhr',

        'a': './core/a',
        'b': './core/b',




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
document.oncopy = function(e) {
    //console.log(evo);
    console.log(e);

    if (window.getSelection().type === "Caret") {
        e.preventDefault();
        if (e.clipboardData) {
            e.clipboardData.setData("text/plain", window.copyText);
            // console.clear();
            console.log('目前剪贴板内容：', window.copyText.toString());
        } else if (window.clipboardData) {
            console.log(222222222, clipboardData);
            window.clipboardData.setData("Text", window.copyText);
        }
    }
};*/


document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', e.target.attributes["data-content"].value);
    e.preventDefault();
});


//'cryptojs/md5', 'cryptojs/ripemd160',
/*
requirejs(['queryStringToJSON'], function(queryStringToJSON) {
    console.log(queryStringToJSON);
})*/


window.extend = function() { return Object.assign(this, ...arguments); }
requirejs(['moment', 'dexie', 'material', 'semantic', 'evo', 'extension'], function(moment, Dexie, mdc, semantic, evo) {
    window.extend({ moment, Dexie, mdc, evo });
    requirejs(['common', 'encrypt', 'app', 'spreadsheets'], function() {
        console.log("host", evo.host, 'adapter:', evo.adapter, location.pathname);
        requirejs([evo.adapter], function() {})
    })
});



/*

1. home
2. list
3. edit
4.
5.







*/