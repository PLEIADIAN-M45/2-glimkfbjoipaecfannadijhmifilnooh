requirejs.config({
    baseUrl                : localStorage.baseUrl,
    paths                  : {
        'app.main'         : '../app.main',
        'app.sms'          : '../app.sms',
        'app.instance'     : '../app.instance',
        'app.service'      : '../app.service',
        'app.factory'      : '../app.factory',
        
        'app.prototype'    : '../app.prototype',

        'app.xmlSpider'    : '../app.xmlSpider',
        'app.sendSms'      : '../app.sendSms',

        'angular'          : '../../lib/angular/angular',
        'angular-animate'  : '../../lib/angular/angular-animate.min',
        'angular-aria'     : '../../lib/angular/angular-aria',
        'angular-cookies'  : '../../lib/angular/angular-cookies',
        'angular-messages' : '../../lib/angular/angular-messages',
        'angular-mocks'    : '../../lib/angular/angular-mocks',
        'angular-resource' : '../../lib/angular/angular-resource',
        'angular-route'    : '../../lib/angular/angular-route.min',
        'angular-sanitize' : '../../lib/angular/angular-sanitize.min',
        'angular-scenario' : '../../lib/angular/angular-scenario',
        'angular-touch'    : '../../lib/angular/angular-touch',
        "angularAMD"       : "../../lib/angular/angularAMD",
        "ngload"           : "../../lib/angular/ngload",
        'domReady'         : '../../lib/require/domReady',
        'require'          : '../../lib/require/require',
        'jquery'           : '../../lib/jquery/jquery-3.2.1.min',
        'js-url'           : '../../lib/jquery/url.min',
        'moment'           : '../../lib/jquery/moment-with-locales.min',
        'dexie'            : '../../lib/jquery/dexie',
        'crypto'           : '../../lib/crypto/rollups/',
        'aes'              : '../../lib/crypto/rollups/aes',
        'md5'              : '../../lib/crypto/rollups/md5',
        'hmac-md5'         : '../../lib/crypto/rollups/hmac-md5',
        'material'         : '../../lib/material/0.36.0/material-components-web',
        'semantic'         : '../../lib/semantic/semantic',
        'Mock'             : '../../lib/mock',
    },
    shim                   : {
        'angular'          : { exports: 'angular' },
        'angular-animate'  : { deps: ['angular'] },
        'angular-aria'     : { deps: ['angular'] },
        'angular-cookies'  : { deps: ['angular'] },
        'angular-messages' : { deps: ['angular'] },
        'angular-mocks'    : { deps: ['angular'] },
        'angular-resource' : { deps: ['angular'] },
        'angular-route'    : { deps: ['angular'] },
        'angular-sanitize' : { deps: ['angular'] },
        'angular-scenario' : { deps: ['angular'] },
        'angular-touch'    : { deps: ['angular'] }
    }
});





requirejs(['app.main'], function({ $scope }) {

    console.log($scope);

    if ($scope.module) {

        /*
        requirejs([$scope.module], function(module) {
            module.call($scope, $scope);
            $scope.apply();
            $scope.invoke();
        })
        */
    }
});















//console.log(location.pathname);

//var pathname             = location.pathname.split(".")[0].split("/").pop();
//console.log(localStorage.baseUrl);


/*
requirejs(['myApp'], function({ $scope }) {
    if($scope.module) {
        requirejs([$scope.module], function(module) {
            module.call($scope, $scope);
            $scope.$apply();
            $scope.invoke();
        })
    }
})
*/





//async属性表明这个文件需要异步加载


/*
requirejs(['config'], function(c) {
    console.log(require.toUrl('.'));
    console.log(c.route);
    if (c.route) {
        requirejs(['App', c.route], function($scope, module) {
            if (module) {
                //console.log(module);
                module.call($scope, $scope);
                $scope.invoke();
            } else {
                console.error(c.route);
            }
        })
    }


});
*/



//console.log(XMLHttpRequest.prototype);

/*
class XmlSpider {
    constructor(x) {
        //console.log(x);
        for (var c in x) {
            this[c]        = x[c]
            console.log(c);
        }
        //console.log(this);
        //console.log(this.prototype);
        //this.prototype   = x
        //Object.assign(this, x)
    }
}
console.log(XmlSpider);
var xmlSpider              = new XmlSpider(XMLHttpRequest.prototype)
*/

/*
class MyClass {
    foo() { return 1; }
    get[Symbol.unscopables]() {
        return { foo       : true };
    }
}



var foo                    = function() { return 2; };

console.log(MyClass.prototype);

with(MyClass.prototype) {

    foo();
}
*/

//XmlSpider.prototype      = XMLHttpRequest.prototype



//console.log(xmlSpider);