define(['myApp', 'material', 'common', 'encrypt', evo.extend], function(myApp, mdc) {


    window.mdc = mdc;

    myApp.$controller = function MemberModify($compile, $rootScope) {

        myApp.$scope.member = evo.user;

        myApp.$scope.upload_session = true;

        myApp.$scope.$watch('session', function(nv, ov, scope) {
            if (nv != ov) {
                sessionStorage.setItem(evo.user.mobile.value, nv);
            }
        })
        if (!evo.user.isBlack) {
            var session = sessionStorage.getItem(evo.user.mobile)
            if (evo.user.status.value == '3' && session == undefined) {
                myApp.$scope.session = 'true';
            } else {
                myApp.$scope.session = session;
            }
        }

        myApp.$scope.sendMessage = function() {
            myApp.$scope.session = evo.user.mobile.value;
            console.log(evo.message);
            //console.log(evo.user.mobile, evo.message);
            if (evo.user.mobile.value && evo.message && !evo.user.mobile.value.includes('*')) {
                chrome.runtime.sendMessage(evo.extensionId, {
                    command: 'API',
                    method: 'sms',
                    port: 0,
                    header: '86' + evo.user.mobile.value,
                    message: evo.message,
                    siteNumber: evo.siteNumber
                }, function(result) {
                    console.log('sms', result);
                    if (result.status == 'login') {
                        myApp.$scope.session = 'true';
                        myApp.$scope.$apply();
                    }
                    showModalDialog(result.status);
                    chrome.runtime.sendMessage(evo.extensionId, { command: 'IndexedDB', result: result });
                })
            }
        }

        myApp.$scope.openDeposit = function() {
            myApp.$scope.member.status = 999;
            if (evo.host == 'wa111') {
                document.getElementById('ctl00_ContentPlaceHolder1_isOpenDeposit').value = 1
                document.getElementById('btnSaveInfo').click();
                //upload_1('審核戶轉正常戶', '是');
            }
            if (evo.host == 'ku711') {
                myApp.$scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                myApp.$scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
                upload_1('審核戶轉正常戶', '是');
            }
        }
        myApp.$scope.openLoginLog = function() {
            if (evo.host == 'wa111') {
                var url = 'http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber={siteNumber}&member={accountId}'
                    .replace('{siteNumber}', evo.user.siteNumber)
                    .replace('{accountId}', evo.user.accountId);
            }
            if (evo.host == 'ku711') {
                var url = location.origin + '/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=' + evo.user.accountId;
            }
            window.open(url, '_blank');
        }
        myApp.$scope.$apply();
    };



    async function checkBlacklist() {
        try {
            var regexp = evo.regexp.blacklist;
            var arrays = await getMemberBankAccsEnum();
            //console.log(regexp);
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


    ;
    (async function fnMemberModify() {
        var sms = await extension.localStorage.getItem('sms');
        evo.message = sms[evo.siteNumber];
        evo.components = ['MemberModify', 'dialog'];
        evo.stylesheet = ['MemberModify'];

        switch (evo.host) {
            case "wa111":

                evo.account = evo.params.account;
                evo.uniqueId = [evo.params.account, evo.siteNumber].join('-');
                evo.unique = [evo.params.account, evo.siteNumber].join('-');

                start()
                    .then(requireStylesheet)
                    .then(requireComponents)
                    .then(getUser)
                    .then(getController)
                    .then(getBasicInfo)
                    .then(getPhoneDate)
                    .then(getExtraInfo)
                    .then(getSystemLog)
                    .then(putUser)
                    .then(bootstrap)
                    .then(checkBlacklist)
                    //.then(record_status)
                    .catch(errorHandler);



                break;


            case "ku711":
                evo.account = evo.params.accountId;
                evo.uniqueId = evo.account + '-' + evo.siteNumber;
                //queryMemberInfo()
                start()
                    .then(requireStylesheet)
                    .then(requireComponents)
                    .then(getUser)
                    .then(fetchMemberInfo)
                    .then(fetchBankAcInfo)
                    .then(getMemberStatusByLanguageCode)
                    .then(putUser)
                    .then(bootstrap)
                    //.then(fetchBankAcInfo)
                    .then(checkBlacklist)
                    .catch(errorHandler);
                break;
        }
    }());

    //fnMemberModify();
})

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