function checkBlacklist() {
    //var c = google.sheets.banker.search('5626512263515651')
    //console.log(evo.ctrl.txtRemittanceAccount);
    evo.ctrl.txtRemittanceAccount.filter((el) => {
        console.log(el.value);
    })

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


setTimeout(function() {}, 1000);


function debug() { console.log(evo.user); }


function openLoginLog({ channel, account, host, origin }) {
    var _url = {
        wa111: `http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${channel}&member=${account}`,
        ku711: `${origin}/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=${account}`
    } [host];
    window.open(_url, '_blank');
}

/*
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
   function openLoginLog() {
       var _url = {
           wa111: `http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${channel}&member=${account}`,
           ku711: `${origin}/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=${account}`
       } [host];
       window.open(_url, '_blank');
   }
   */