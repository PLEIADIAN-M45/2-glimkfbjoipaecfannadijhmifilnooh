define([evo.router, 'sendsms'], function({ setUser, openDeposit, openLoginLog }, sendsms) {;
    'use strict';
    var { channel, host, account, origin } = evo;
    $scope.controller = function($compile, $rootScope) {
        $scope.user = evo.user;
        $scope.$apply();
    };
    $scope.sendsms = sendsms;
    $scope.openDeposit = openDeposit;
    $scope.openLoginLog = openLoginLog;
    $scope.components = ['edit', 'dialog']
    $scope.stylesheet = ['edit']
    startup().then(getUser).then(setUser).then(bootstrap).catch(error);
})