function extend() {

    if (this == window) {
        //if (arguments.length == 1) { arguments = arguments[0] }
        try {
            var scope = Object.assign(arguments);

        } catch (ex) {
            var scope = Object.assign(...arguments);

        }

        //console.log(arguments);
        var scope = Object.assign(...arguments);

        //console.log(1, scope);
        return scope;
    } else {
        var scope = this;
        Object.assign(scope, ...arguments)
        if (scope.$apply) { if (!scope.$$phase) { scope.$apply(); }; }
        // console.log(2, scope);
        return scope;
    }
}


if (evo.host === 'wa111') {
    console.log(evo.host);


    define(['angular', 'angular-route', 'angular-sanitize'], function(angular) {

        'use strict';

        window.angular = angular;


        var myApp = angular.module('myApp', ['ngSanitize'])
            .config(function($sceDelegateProvider) {
                var baseUrl = evo.baseUrl;
                $sceDelegateProvider.resourceUrlBlacklist(['']);
                $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
            })
            .controller('defaultCtrl', ['$scope', '$controller', '$compile',
                function defaultCtrl($scope, $controller, $compile) {}
            ])
        /****************************************************************************************/
        if (evo.domain[0].includes('cashhost')) {
            window.myApp = myApp;
            return myApp;
        } else {
            var controller = document.getElementById('aspnetForm') || document.querySelector('form') || document.body;
            if (controller) {
                controller.setAttribute("ng-controller", "defaultCtrl");
                angular.bootstrap(document, ['myApp']);
                var controller = angular.element(controller);
                myApp.$target = controller;
                myApp.$scope = controller.scope();
                myApp.$injector = controller.injector();
                myApp.$compile = controller.injector().get('$compile');
                window.$scope = myApp.$scope;
                window.$compile = myApp.$compile;
                window.myApp = myApp;
                $scope.extend = extend;

                $scope.defineProperties = function(properties) {
                    return new Promise((resolve, reject) => {
                        resolve(Object.assign($scope, properties));
                    })
                }



                return myApp;
            } else {
                console.log('no element', evo.filename);
                window.myApp = myApp;
                //assign($scope, extend, apply)
                return myApp;
            }
        }
    });
}


if (evo.host === 'ku711' || location.port == '16') {
    //console.log(1);
    console.log(evo.host);

    define(function() {
        var myApp = angular.module('OBSApp')
        var controller = document.querySelector('[ng-controller]')
        if (controller) {
            var _controller = angular.element(controller);
            myApp.$target = controller;
            myApp.$scope = _controller.scope();
            myApp.$injector = _controller.injector();
            myApp.$compile = _controller.injector().get('$compile');
            window.$scope = myApp.$scope;
            window.$compile = myApp.$compile;
            window.myApp = myApp;
            $scope.extend = extend;

            $scope.defineProperties = function(properties) {
                return new Promise((resolve, reject) => {
                    resolve(Object.assign($scope, properties));
                })
            }



            return myApp;
        } else {
            console.log('no element', evo.filename);
            return window;
        }
    })
}




/*
Request URL: http://host26.wa111.net/LoadData/AccountManagement/GetSystemLog.ashx
POST
*/
//var b = angular.element('#View').scope()
//$compileProvider.debugInfoEnabled()
//setTimeout(function() {    }, 5000)

//myApp.$controller = controller.injector().get('$controller');








/*
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ Logger ],
  declarations: [ AppComponent ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }




@Component({
  selector:    'app-hero-list',
  templateUrl: './hero-list.component.html',
  providers:  [ HeroService ]
})



*/


/*
function apply(scope) {
    if (scope.constructor.name == "Scope") {
        if (!scope.$$phase) { scope.$apply(); };
    }
    return scope;
}
*/