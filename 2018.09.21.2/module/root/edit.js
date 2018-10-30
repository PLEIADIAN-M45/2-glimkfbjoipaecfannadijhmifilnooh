define(['host', 'sendsms'], function({ setUser, openDeposit, openLoginLog }, sendsms) {;

    'use strict';

    console.log(43);

    //var { channel, host, account, origin } = evo;

    $scope.controller = function($compile, $rootScope) {
        console.log(8);
        $scope.user = evo.user;
        //console.log($scope.user);
        $scope.sendsms = sendsms.bind(evo.user);
        $scope.$apply();
    };

    //$scope.setUser = setUser;
    $scope.openDeposit = openDeposit;
    $scope.openLoginLog = openLoginLog;
    $scope.components = ['edit', 'dialog'];
    $scope.stylesheet = ['edit'];


    //startup().then(getUser).then(setUser).then(bootstrap).catch(error);

    getUser().then(startup).then(bootstrap).catch(error);
    // .then(setUser)

})





/*

async function startt() {
    var users = await evo.store.users.get('F61539')
    console.log(users);
}

startt()
return;

//startup().then(getUser).then(setUser).then(bootstrap).catch(error);
chrome.runtime.sendMessage(evo.extensionId, {
    command: "evo.store.users.get('F61539')"
}, function(result) {
    console.log(result);
})

return;
chrome.runtime.sendMessage(evo.extensionId, {
    command: "evo.store.tables"
}, function(result) {
    console.log(result);
})

//fetch("chrome-extension://glimkfbjoipaecfannadijhmifilnooh/apis/?fefef=2434")
//fetch("/apis/?fefef=2434")*/