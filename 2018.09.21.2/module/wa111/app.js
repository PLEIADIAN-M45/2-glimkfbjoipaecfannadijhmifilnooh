 define(['angular', 'angular-route', 'angular-sanitize', 'evo'], function(angular) {
     console.log(1);
     'use strict';

     window.angular = angular;

     var myApp =
         angular.module('myApp', ['ngSanitize'])
         .config(function($sceDelegateProvider) {
             var baseUrl = evo.baseUrl;
             $sceDelegateProvider.resourceUrlBlacklist(['']);
             $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
         })
         .controller('evo-ctrl', [function() {}])

     document.body.setAttribute("ng-controller", "evo-ctrl");
     myApp.body = document.body;
     angular.bootstrap(document, ['myApp']);
     return myApp;
 });


 //document.getElementById('aspnetForm') || document.querySelector('form') ||