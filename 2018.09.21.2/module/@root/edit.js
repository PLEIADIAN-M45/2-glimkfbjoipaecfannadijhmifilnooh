define(['@page'], function({}) {

    ;
    'use strict';


    $scope.run = function() {
        return new Promise(async (resolve, reject) => {
            $scope.user = await $scope.setUser();
            //$scope.user = await getUser() || await setUser();
            //$scope.sendsms = new SendSms($scope.user);
            console.log($scope.user);
            resolve($scope);

        })
    }




})












function forTest() {
    return function main() {
        return new Promise(async (resolve, reject) => {
            /* $scope.stylesheet = ['edit'];
             $scope.components = ['edit', 'dialog'];*/
            //return delUser();
            $scope.user = await $scope.setUser();
            //$scope.user = await getUser() || await setUser();
            //$scope.sendsms = new SendSms($scope.user);
            console.log($scope.user);
            resolve($scope);
        })
    }
    //ctl00_ContentPlaceHolder1_txtRemittaceName.value = "王杰"
    $scope.url = {
        //IGetMemberInfo: `http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}`
        IGetMemberInfo: `${location.origin}/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}`
    };
}


























//setTimeout(resolve, 10000)
//setTimeout(resolve, 3000)
//console.log(sendsms);
//window.extend(factory);














// $scope.name = "RYAN CHANG";

//{ setUser, openDeposit, openLoginLog }
//console.log(factory);
//var { setUser, openDeposit, openLoginLog } = factory;
/*
            //setTimeout(resolve, 3000)

define(['require', 'jquery'], function(require, $) {
    var promise = new Promise(function(resolve, reject) {
        require(['sendsms'], function(sendsms) {
            resolve(sendsms)
        });
    });
    return promise;
});
*/

/*
    function long() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000)
        })
    }
*/


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


    //getUser().then(_invoke).catch(error);

    /*
        console.log($scope);
        console.log(myApp);

    */




//console.log($injector.modules.ng);


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
})*/

//fetch("chrome-extension://glimkfbjoipaecfannadijhmifilnooh/apis/?fefef=2434")
//fetch("/apis/?fefef=2434")*/