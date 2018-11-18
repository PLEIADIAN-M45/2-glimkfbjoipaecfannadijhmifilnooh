requirejs.config({
    baseUrl: localStorage.baseUrl,
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
        'crypto': '../lib/crypto/rollups/',
        'aes': '../lib/crypto/rollups/aes',
        'md5': '../lib/crypto/rollups/md5',
        'hmac-md5': '../lib/crypto/rollups/hmac-md5',
        'material': '../lib/material/0.36.0/material-components-web',
        'semantic': '../lib/semantic/semantic',
        'Mock': '../lib/mock',

        'evo': '../core/evo',
        'path': '../core/path',
        'common': '../core/common',
        'utils': '../core/utils',
        'SendSms': '../core/SendSms',

        //'Spreadsheets'   : '../core/Spreadsheets',
        'xmlSpider': '../core/xmlSpider',
        'webSpider': '../core/webSpider',
        'serializeObject': '../core/serializeObject'
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




requirejs(['router', 'utils'], function(router) {

    requirejs(['moment', 'dexie', 'material', 'semantic'], function(moment, Dexie, mdc, semantic) {

        window.assign({ moment, Dexie, mdc, router });

        requirejs(['App'], function(App) {
            //console.log(App);

            requirejs(['@root'], function() {

                //console.log(router);

                if($scope.run) { $scope.run().then(invoke) }
            });

        });

    });
});







//factory

/*
requirejs(['router', 'utils'], function(router) {
    //console.log(router);

    requirejs(['moment', 'dexie', 'material', 'semantic', 'evo', 'common'], function(moment, Dexie, mdc, semantic, evo) {

        window.extend({ moment, Dexie, mdc, evo, router });

        requirejs(['myApp'], function(myApp) {
            requirejs(['@root'], function(main) { if (main) { main().then(invoke); } });
        });

    });
});
*/



//console.log(localStorage.baseUrl);
//console.clear();
//console.time(location.pathname);
/*
requirejs(['Mock'], function(Mock) {
    Mock.mock("http        ://127.0.0.1:26/LoadData/AccountManagement/MemberModify.ashx", 'post', function(req) {
        console.log(req);
        return Mock.mock(1)
    });
});
*/



//requirejs(['Spreadsheets'], function(Spreadsheets) {            });









//'spreadsheets',




/*
requirejs(['load'], function() {
    //console.log(app);
    //console.log('bootstrap..');
    //angular.bootstrap(document, ['app']);
})
*/

/*
,
    map                    : {
        '*'                : {
            'foo'          : 'ctrl/' + location.pathname.split('.')[0].split('/').pop()
        },
        'some/oldmodule'   : {
            'foo'          : 'foo1.0'
        },
        'some/newmodule'   : {
            'foo'          : 'foo1.2'
        },
        'some/oldmodule'   : {
            'foo'          : 'foo1.0'
        }
    }*/