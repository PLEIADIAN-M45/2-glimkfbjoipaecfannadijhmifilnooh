define(['evo', 'angular', 'angular-sanitize'], function(evo, angular) {

    var app = angular.module('App', []);

    app.config(function($sceDelegateProvider) {
        var baseUrl = evo.baseUrl;
        $sceDelegateProvider.resourceUrlBlacklist(['']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl, baseUrl + '**']);
    })

    app.service('hexafy', function() {
        this.myFunc = function(x) {
            return x.toString(16);
        }
    });



    app.service('myService', function() {
        console.log('instance myService');
        var privateValue = "I am Private";
        this.variable = "This is public";
        this.getPrivate = function() {
            return privateValue;
        };
    });


    app.controller('evo-ctrl', function() {});


    return app;
})
























/*
app.controller('DemoController', function($scope) {
    $scope.greeting = 'Hello, world!';
    $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };
    $scope.customer2 = {
        name: 'Naomi2',
        address: '1600 Amphitheatre2'
    };
});
app.directive('myCustomer', function() {
    return {
        template: 'Name: {{customer.name}} Address: {{customer.address}}'
    };
});*/