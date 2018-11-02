define(['angular', 'angular-sanitize'], function(angular) {
    console.log(1);

    'use strict';
    window.angular = angular;
    var myApp = angular.module('myApp', ['ngSanitize']);
    myApp.factory('myFactory', function() {
        // 關於這個服務的一些初始化設定，提供了類似 private 的區域。
        return {
            // 當調用 myFactory 時，回傳的物件，可以操作的method, 變數...。只要是合法的 JS object 即可，即便是 function object 也可以。
        };
    });
    angular.bootstrap(document, ['myApp']);
    return myApp;
});


var myApp = angular.module('myApp', ['ngSanitize']);