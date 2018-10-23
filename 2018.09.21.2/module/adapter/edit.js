define([evo.router, 'sendsms'], function({ setUser, openDeposit, openLoginLog }, sendsms) {

    ;
    'use strict';

    var { channel, host, account, origin } = evo;

    evo.$controller = function($compile, $rootScope) {
        console.log(evo.user);
        $scope.user = evo.user;
        $scope.sendsms = sendsms(evo.user);
        $scope.$apply();
    };

    $scope.defineProperties({
            openDeposit,
            openLoginLog,
            components: ['MemberModify', 'dialog'],
            stylesheet: ['MemberModify']
        })
        .then(getUser)
        .then(setUser)
        .then(bootstrap)
        .catch(errorHandler);

})