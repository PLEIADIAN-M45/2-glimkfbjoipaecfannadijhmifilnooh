define(['host', 'sendsms'], function({ setUser, openDeposit, openLoginLog }, sendsms) {;
    'use strict';

    //var { channel, host, account, origin } = evo;

    $scope.controller = function($compile, $rootScope) {
        $scope.user = evo.user;
        console.log($scope.user);
        $scope.sendsms = sendsms.bind(evo.user);
        $scope.$apply();
    };

    $scope.openDeposit = openDeposit;
    $scope.openLoginLog = openLoginLog;
    $scope.components = ['edit', 'dialog'];
    $scope.stylesheet = ['edit'];
    
    startup().then(getUser).then(setUser).then(bootstrap).catch(error);



    fetch("https://extension.evo.com/?fefef=2434")
})