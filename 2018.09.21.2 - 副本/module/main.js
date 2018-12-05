requirejs.config({
    baseUrl                        : localStorage.baseUrl,
    paths                          : {
        'config'                   : '../config',
        'OBSApp'                   : '../OBSApp',
        'xmlSpider'                : '../xmlSpider',
        'factory'                  : '../factory',
        'SendSms'                  : '../SendSms',
        'angular'                  : '../../lib/angular/angular',
        'angular-animate'          : '../../lib/angular/angular-animate.min',
        'angular-aria'             : '../../lib/angular/angular-aria',
        'angular-cookies'          : '../../lib/angular/angular-cookies',
        'angular-messages'         : '../../lib/angular/angular-messages',
        'angular-mocks'            : '../../lib/angular/angular-mocks',
        'angular-resource'         : '../../lib/angular/angular-resource',
        'angular-route'            : '../../lib/angular/angular-route.min',
        'angular-sanitize'         : '../../lib/angular/angular-sanitize.min',
        'angular-scenario'         : '../../lib/angular/angular-scenario',
        'angular-touch'            : '../../lib/angular/angular-touch',
        "angularAMD"               : "../../lib/angular/angularAMD",
        "ngload"                   : "../../lib/angular/ngload",
        'domReady'                 : '../../lib/require/domReady',
        'require'                  : '../../lib/require/require',
        'jquery'                   : '../../lib/jquery/jquery-3.2.1.min',
        'js-url'                   : '../../lib/jquery/url.min',
        'moment'                   : '../../lib/jquery/moment-with-locales.min',
        'Dexie'                    : '../../lib/jquery/dexie',
        'crypto'                   : '../../lib/crypto/rollups/',
        'aes'                      : '../../lib/crypto/rollups/aes',
        'md5'                      : '../../lib/crypto/rollups/md5',
        'hmac-md5'                 : '../../lib/crypto/rollups/hmac-md5',
        'material'                 : '../../lib/material/0.36.0/material-components-web',
        'semantic'                 : '../../lib/semantic/semantic',
        'Mock'                     : '../../lib/mock',
    },
    shim                           : {
        'angular'                  : { exports: 'angular' },
        'angular-animate'          : { deps: ['angular'] },
        'angular-aria'             : { deps: ['angular'] },
        'angular-cookies'          : { deps: ['angular'] },
        'angular-messages'         : { deps: ['angular'] },
        'angular-mocks'            : { deps: ['angular'] },
        'angular-resource'         : { deps: ['angular'] },
        'angular-route'            : { deps: ['angular'] },
        'angular-sanitize'         : { deps: ['angular'] },
        'angular-scenario'         : { deps: ['angular'] },
        'angular-touch'            : { deps: ['angular'] }
    }
});


requirejs(['config'], function(c) {
    console.log(c.route);
    if (c.route) {
        requirejs(['App', c.route], function($scope, module) {
            if (module) {
                module.call($scope, $scope);
                $scope.invoke();
            } else {
                console.error(c.route);
            }
        })
    }
})





//baseUrl                          : require.toUrl(host),
//baseUrl                          : require.toUrl('./' + localStorage.host),
//'SendSms'                        : '../../core/SendSms',






/*
1101                               :春-5    
1102                               :春-6
1105                               :例-6
1111                               :例-7
1116                               :特-1
1118                               :例-8
1125                               :特-2
1126                               :特-3

1127                               :越南
1128                               :越南
1129                               :越南
1130                               :越南
-------------------------

1201                               :特-4
1202                               :例-9
1209                               :例-10
1216                               :例-11
1223                               :例-12
1224                               :例-13
1225                               :例-14
1230                               :例-15
1231                               :例-16

1212                               :越南
1213                               :越南
1214                               :越南
*/

/*
requirejs.onError                  = function(err) {
    console.log(err.requireType);
    if (err.requireType            === 'timeout') {
        console.log('modules       : ' + err.requireModules);
    }
    throw err;
};
*/

/*
function Basic() {
    this.port                      = location.port;
    this.path                      = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
    this.host                      = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1];
    this.route                     = {
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
    } [this.host][this.path];
}


var _                              = new Basic();

requirejs.config({
    //baseUrl                      : require.toUrl(host),
    baseUrl                        : require.toUrl('./wa111'),
    paths                          : {
        'OBSApp'                   : '../OBSApp',
        'xmlSpider'                : '../xmlSpider',
        'factory'                  : '../factory',
        'SendSms'                  : '../SendSms',



        //'SendSms'                : '../../core/SendSms',
        'angular'                  : '../../lib/angular/angular',
        'angular-animate'          : '../../lib/angular/angular-animate.min',
        'angular-aria'             : '../../lib/angular/angular-aria',
        'angular-cookies'          : '../../lib/angular/angular-cookies',
        'angular-messages'         : '../../lib/angular/angular-messages',
        'angular-mocks'            : '../../lib/angular/angular-mocks',
        'angular-resource'         : '../../lib/angular/angular-resource',
        'angular-route'            : '../../lib/angular/angular-route.min',
        'angular-sanitize'         : '../../lib/angular/angular-sanitize.min',
        'angular-scenario'         : '../../lib/angular/angular-scenario',
        'angular-touch'            : '../../lib/angular/angular-touch',
        "angularAMD"               : "../../lib/angular/angularAMD",
        "ngload"                   : "../../lib/angular/ngload",
        'domReady'                 : '../../lib/require/domReady',
        'require'                  : '../../lib/require/require',
        'jquery'                   : '../../lib/jquery/jquery-3.2.1.min',
        'js-url'                   : '../../lib/jquery/url.min',
        'moment'                   : '../../lib/jquery/moment-with-locales.min',
        'Dexie'                    : '../../lib/jquery/dexie',
        'crypto'                   : '../../lib/crypto/rollups/',
        'aes'                      : '../../lib/crypto/rollups/aes',
        'md5'                      : '../../lib/crypto/rollups/md5',
        'hmac-md5'                 : '../../lib/crypto/rollups/hmac-md5',
        'material'                 : '../../lib/material/0.36.0/material-components-web',
        'semantic'                 : '../../lib/semantic/semantic',
        'Mock'                     : '../../lib/mock',
    },
    shim                           : {
        'angular'                  : { exports: 'angular' },
        'angular-animate'          : { deps: ['angular'] },
        'angular-aria'             : { deps: ['angular'] },
        'angular-cookies'          : { deps: ['angular'] },
        'angular-messages'         : { deps: ['angular'] },
        'angular-mocks'            : { deps: ['angular'] },
        'angular-resource'         : { deps: ['angular'] },
        'angular-route'            : { deps: ['angular'] },
        'angular-sanitize'         : { deps: ['angular'] },
        'angular-scenario'         : { deps: ['angular'] },
        'angular-touch'            : { deps: ['angular'] }
    }
});

*/
/*
if(_.route) {

    requirejs(['App', _.route], function($scope, module) {
        module.call($scope, $scope)
        $scope.invoke();
    })
}
*/