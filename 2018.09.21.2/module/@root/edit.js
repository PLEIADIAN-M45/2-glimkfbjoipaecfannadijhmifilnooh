define(['@page'], function() {

    ;
    'use strict';
    $scope.run = function() {
        return new Promise(async (resolve, reject) => {
            //$scope.user = await $scope.setUser();
            $scope.user = await this.getUser() || await this.setUser();
            //$scope.user = await this.setUser();
            //$scope.sendsms = new SendSms($scope.user);
            console.log($scope.user);
            resolve($scope);
        })
    }

})