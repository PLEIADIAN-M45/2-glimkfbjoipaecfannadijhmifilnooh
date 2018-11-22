var port                       = location.port;
if (port) {
    var host                   = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [port];
} else {
    var host                   = location.host.split(".")[1];
}
var path                       = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();

requirejs.config({
    baseUrl                    : 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/module/' + host,
    //map                      : { 'some/newmodule': { 'foo': 'foo1.2' }, 'some/oldmodule': { 'foo': 'foo1.0' } },
    paths                      : {
        'AEP'                  : '../App',
        'Evo'                  : '../App',

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

//console.log(path);
//console.log(host);
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



if (module) {
    
    requirejs(['AEP'], function (AEP) {

        //requirejs([module], function (submodule) { if (submodule) { submodule.call(AEP, AEP); } })
    })
}









//console.log(module);



/*
var module                     = Object.entries(route).filter(([x, c]) => {
    console.log(x);
    return x[0]                == path
})
*/



/*
requirejs(['AEP'], function(AEP) {
    requirejs([AEP.module], function(module) {
        module.call(AEP, AEP);
    })
})
*/



//requirejs(['some/newmodule'], function() {})
//requirejs(["module/wa111/home"], function(f) {})
//console.log(f);
//f.call(App)
//f.call(App, App)
//'evo'                        : './core/Evo',
//'path'                       : '/core/path',
//'common'                     : '/core/common',
//'utils'                      : '/core/utils',
//'app'                        : '@wa111/App',
//'Spreadsheets'               : '/core/Spreadsheets',


//component





//requirejs([App.module], function(f) {
//console.log(f);
//f.call(App)
//f.call(App, App)
//})



//console.log(App.components);
//App.exec()









try {

    //requirejs([_pathname_], function() {})

} catch (ex) {

}

//requirejs(['router', 'evo', 'utils'], function(router, evo) {


/*
requirejs(['evo'], function(evo) {
    console.log(evo);
})
*/




//console.log(localStorage.baseUrl);

/*
var baseUrl                    = localStorage.baseUrl + host;
//console.log(baseUrl);
console.log(var1, var2);

var b                          = 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/module'

var app                        = 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/module/' + host;
*/
//var baseUrl                  = 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh'


//var _pathname_               = location.pathname.split('?')[0].split('.')[0].split('/').pop()
//console.log(_pathname_);
//'App2'                       : ['module', host, 'App'].join('/'),
//'App'                        : 'module/ku711/App',
//'-App'                       : 'wa111/App',




/*
requirejs(['router', 'evo'], function(router, evo) {

    console.log(evo);

    requirejs(['moment', 'dexie', 'material', 'semantic'], function(moment, Dexie, mdc, semantic) {

        window.assign({ moment, Dexie, mdc, router });

        requirejs(['App'], function(App) {
            //console.log(App);

            requirejs(['@root'], function() {

                //console.log(router);

                if ($scope.run) { $scope.run().then(invoke) }
            });

        });

    });
});
*/






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
    Mock.mock("http            ://127.0.0.1:26/LoadData/AccountManagement/MemberModify.ashx", 'post', function(req) {
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
    map                        : {
        '*'                    : {
            'foo'              : 'ctrl/' + location.pathname.split('.')[0].split('/').pop()
        },
        'some/oldmodule'       : {
            'foo'              : 'foo1.0'
        },
        'some/newmodule'       : {
            'foo'              : 'foo1.2'
        },
        'some/oldmodule'       : {
            'foo'              : 'foo1.0'
        }
    }*/