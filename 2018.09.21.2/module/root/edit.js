define(['host', 'sendsms'], function({ setUser, openDeposit, openLoginLog }, sendsms) {;

    'use strict';



    //var { channel, host, account, origin } = evo;

    /*window.controller = function($compile, $rootScope) {
        console.log(8);
        //console.log($scope.user);
        $scope.sendsms = sendsms.bind(evo.user);
        $scope.user = evo.user;
        $scope.$apply();
    };*/

    console.log($scope);

    //$scope.setUser = setUser;

    $scope.openDeposit = openDeposit;
    $scope.openLoginLog = openLoginLog;

    $scope.components = ['edit', 'dialog'];
    $scope.stylesheet = ['edit'];

    requireStylesheet()
    requireComponents()
    $scope.$apply()


    //bootstrap()



    //startup().then(getUser).then(setUser).then(bootstrap).catch(error);

    // getUser().then(startup).then(bootstrap).catch(error);

    //startup().then(getUser).then(bootstrap).catch(error);

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