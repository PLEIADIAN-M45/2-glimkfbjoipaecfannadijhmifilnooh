define([router.entend, 'sendsms'], function(factory, sendsms) {;
    //{ setUser, openDeposit, openLoginLog }
    //console.log($injector.modules.ng);

    'use strict';

    console.log(3);

    console.log(myApp);



    //requireStylesheet(['edit'])
    // requireComponents(['edit', 'dialog'])


    //var { channel, host, account, origin } = evo;


    /*
    window.controller = function($compile, $rootScope) {
        console.log(8);
        //console.log($scope.user);
        $scope.sendsms = sendsms.bind(evo.user);
        $scope.user = evo.user;
        $scope.$apply();
    };
    */



    //$scope.setUser = setUser;



    //bootstrap()



    //startup().then(getUser).then(setUser).then(bootstrap).catch(error);

    // getUser().then(startup).then(bootstrap).catch(error);

    //startup().then(getUser).then(bootstrap).catch(error);

    // .then(setUser)

})



function xxx() {

    console.log($scope);


    $invoke(function($compile, $rootScope) {

        console.log(3);
        $scope.name = "RYAN";
        $scope.$apply();
    })



    $scope.openDeposit = openDeposit;
    $scope.openLoginLog = openLoginLog;

    $scope.components = ['edit', 'dialog'];
    $scope.stylesheet = ['edit'];




}

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