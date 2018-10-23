//console.log('-----------------');
define([evo.extend, 'smsService'], function(a, smsService) {
    'use strict';

    var { account } = evo;

    myApp.$controller = function controller($compile, $rootScope) {
        //var apiFunction = evo.apiFunction;
        /****************************************************************/
        var user = evo.user;
        var { channel, host, account } = evo;
        $scope.smsService = smsService(evo.user);
        $scope.extend({ user, openDeposit, openLoginLog, smsService });
    };

    function openDeposit({ host }) {
        return {
            wa111: function() {
                evo.ctrl.deposit.value = 1;
                evo.ctrl.btnSave.click();
            },
            ku711: function() {
                $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                $scope.ctrl.DepositChanged();
                $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
            }
        } [host]();
    }

    function openLoginLog({ channel, account, host, origin }) {
        var _url = {
            wa111: `http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${channel}&member=${account}`,
            ku711: `${origin}/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=${account}`
        } [host];
        window.open(_url, '_blank');
    }

    function debug() {
        console.log(evo.user);
    }


    //apiFunction.getmodel(account).then(s)
    //apiFunction.getAllUser(account).then(s)

    $scope.defineProperties({
            debug,
            openDeposit,
            openLoginLog,
            components: ['MemberModify', 'dialog'],
            stylesheet: ['MemberModify']
        })
        //.then(getCtrl)
        //.then(getUser)
        .then(setUser)
        .then(bootstrap)
        .catch(errorHandler);

})


setTimeout(function() {}, 1000);


function checkBlacklist() {
    //var c = google.sheets.banker.search('5626512263515651')
    //console.log(c);
    return
    try {
        var regexp = evo.regexp.blacklist;
        var arrays = getMemberBankAccsEnum();
        //console.log(arrays);
        var matches = [];
        arrays.forEach(function(element) {
            var test = element.value.match(regexp);
            if (test) {
                element.classList.add('blink', 'danger');
                matches.push(test);
            } else {
                element.classList.add('safe');
            }
        })
        if (matches.length) {
            evo.user.isBlack = true;
            showModalDialog('blacklisk', matches);
        } else {
            evo.user.isBlack = false;
        }
        return matches;
    } catch (ex) {
        console.log(ex)
    }
}


/*
fetch('https://davidwalsh.name/submit', {
    method: 'post',
    body: new FormData(document.getElementById('comment-form'))
});
fetch('https://davidwalsh.name/submit-json', {
  method: 'post',
  body: JSON.stringify({
    email: document.getElementById('email').value,
    answer: document.getElementById('answer').value
  })
});
*/


/*

Object.defineProperties(evo, {
        components: {
            value: ['MemberModify', 'dialog']
        },
        stylesheet: {
            value: ['MemberModify']
        }
    });
*/
/*var project = {
    components: ['MemberModify', 'dialog'],
    stylesheet: ['MemberModify']
}*/

/*

  //setTimeout(function() {}, 3000)

    //GetMemberList(1)
       $scope.smsService = smsService.init(evo.user);
       $scope.openDeposit = openDeposit;
       $scope.openLoginLog = openLoginLog;
       $scope.$apply();*/
//$scope.$apply();
//console.log($scope);
/*
myApp.$controller2 = function controller($compile, $rootScope) {

    var { channel, account, host, origin } = $scope.user = evo.user;

    smsService.init(evo.user);

    function openDeposit() {
        return {
            wa111: function() {
                evo.ctrl.deposit.value = 1;
                evo.ctrl.btnSave.click();
            },
            ku711: function() {
                $scope.ctrl.model.UpdateEditMemberInfoManage.MemberStatus = 1;
                $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
            }
        } [host]();
    }

    function openLoginLog() {
        var url = { wa111: `http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${channel}&member=${account}`, ku711: `${origin}/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=${account}` } [host];
        window.open(url, '_blank');
    }

    $scope.extend({ openLoginLog, openDeposit, smsService });
};

*/
//console.log(evo.user);
/*console.log($scope.ctrl.model.UpdateEditMemberRisksInfo.DirectorID);
console.log($scope.ctrl.DepositChanged);*/
/*$scope.ctrl.model.UpdateEditMemberRisksInfo.DirectorID == "FF"
$scope.ctrl.OriginalMemberStatus = 3
$scope.ctrl.model.UpdateEditMemberInfoManage.MemberStatus = 3
*/
//console.log(ctl00_ContentPlaceHolder1_ishow.children);
/* var options = {};
 [...ctl00_ContentPlaceHolder1_ishow.children].forEach((x) => {
     //console.log(x);
     //console.log(x.value, x.textContent);
     options[x.value] = x.textContent
 })*/
//console.log(angular.toJson(options));
/* extend($scope, {
     openLoginLog,
     openDeposit,
     sendMessage
 })*/
/*

if (evo.host == "wa111") {
    var selishow = {};
    [...document.getElementById('ctl00_ContentPlaceHolder1_ishow').children].map(function(x) {
        selishow[x.value] = x.outerText;
    });
    localStorage.selishow = angular.toJson(selishow);
}
*/
/*  start()
      .then(requireStylesheet)
      .then(requireComponents)

      .then(queryMemberInfo)
      .then(function() {
          if (evo.user) {
              console.log(1);
              checkBlacklist()
                  .then(bootstrap)
              //resolve(evo.user);
          } else {
              console.log(0);
              fetchMemberInfo2()
                  .then(fetchMemberInfo3)
                  .then(fetchMemberInfo4)
                  .then(storeMemberInfo)
                  .then(checkBlacklist)
                  .then(bootstrap)
          }
      })*/
// console.log(evo.user);
/*
        document.getElementById("btnAdd").addEventListener("click", function() {

            console.log(12233, 324);

            //document.getElementById("demo").innerHTML = "Hello World";
        });

*/
//btnAdd
//action=StopMember&warnMessage=&accounts=F61539&wujiMarkID=0
//action=StopMember&warnMessage=undefined&accounts=F61539
/*
    var selwujiMark = angular.fromJson(localStorage.selwujiMark);
    console.log(selwujiMark);
*/