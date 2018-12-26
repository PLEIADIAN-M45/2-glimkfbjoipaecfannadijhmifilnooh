requirejs.config({
    paths                                    : {
        'app'                                : 'module/app',
        'app.router'                         : 'module/app.router',
        'app.instance'                       : 'module/app.instance',
        'app.factory'                        : 'module/app.factory',
        'app.sendSms'                        : 'module/app.sendSms',
        'app.service'                        : 'module/app.service',
        'app.xmlhttp'                        : 'module/app.xmlhttp',

        'angular'                            : 'lib/angular/angular',
        'angular-animate'                    : 'lib/angular/angular-animate.min',
        'angular-aria'                       : 'lib/angular/angular-aria',
        'angular-cookies'                    : 'lib/angular/angular-cookies',
        'angular-messages'                   : 'lib/angular/angular-messages',
        'angular-mocks'                      : 'lib/angular/angular-mocks',
        'angular-resource'                   : 'lib/angular/angular-resource',
        'angular-route'                      : 'lib/angular/angular-route.min',
        'angular-sanitize'                   : 'lib/angular/angular-sanitize.min',
        'angular-scenario'                   : 'lib/angular/angular-scenario',
        'angular-touch'                      : 'lib/angular/angular-touch',
        "angularAMD"                         : "lib/angular/angularAMD",
        "ngload"                             : "lib/angular/ngload",
        'domReady'                           : 'lib/require/domReady',
        'require'                            : 'lib/require/require',
        'jquery'                             : 'lib/jquery/jquery-3.2.1.min',
        'js-url'                             : 'lib/jquery/url.min',
        'moment'                             : 'lib/jquery/moment-with-locales.min',
        'dexie'                              : 'lib/jquery/dexie',
        'crypto'                             : 'lib/crypto/rollups/',
        'aes'                                : 'lib/crypto/rollups/aes',
        'md5'                                : 'lib/crypto/rollups/md5',
        'hmac-md5'                           : 'lib/crypto/rollups/hmac-md5',
        'material'                           : 'lib/material/0.36.0/material-components-web',
        'semantic'                           : 'lib/semantic/semantic',
        'Mock'                               : 'lib/mock'
    },
    shim                                     : {
        'angular'                            : { exports: 'angular' },
        'angular-animate'                    : { deps: ['angular'] },
        'angular-aria'                       : { deps: ['angular'] },
        'angular-cookies'                    : { deps: ['angular'] },
        'angular-messages'                   : { deps: ['angular'] },
        'angular-mocks'                      : { deps: ['angular'] },
        'angular-resource'                   : { deps: ['angular'] },
        'angular-route'                      : { deps: ['angular'] },
        'angular-sanitize'                   : { deps: ['angular'] },
        'angular-scenario'                   : { deps: ['angular'] },
        'angular-touch'                      : { deps: ['angular'] }
    }
});


/*
程序员浪费生命的几种方式
https://beginor.github.io/2013/12/16/waste-of-time.html


基于XMLHttpRequest对象的ajax拦截
https://blog.csdn.net/xiaochunblog/article/details/83351987


颈椎病康复指南
https://beginor.github.io/2016/04/05/angularjs-controller-as.html
*/

requirejs(["app"], function(app) {
    //console.log(app);
})



//Object.entries(paths).map(([_name, _path]) => { paths[_name] = localStorage.baseUrl + _path; });
//console.log(Object.entries(paths));
/*
requirejs(['app.instance', 'app.router', 'app.factory'], function(instance, router, factory) {
    require(["main"], function() {
        var $container                     = $("[ng-controller]");
        var $controller                    = angular.element($container);
        var $injector                      = $controller.injector();
        var $scope                         = $controller.scope();
        $scope.__proto__.$container        = $container;
        $scope.__proto__.$controller       = $controller;
        $scope.__proto__.$injector         = $injector;
        $scope.__proto__.$invoke           = $injector.invoke;

        $scope.join                        = function join() {
            Object.assign(this.__proto__, ...arguments);
        }

        $scope.$invoke(router, $scope);
        $scope.$invoke(factory, $scope);
        $scope.$loadModule();
    });
});
*/

//chrome-extension                         ://glimkfbjoipaecfannadijhmifilnooh/module/wa111







//packages                             : ["wa111", "ku711", "evo"],
//baseUrl                              : localStorage.baseUrl,
//baseUrl: "module/wa111",