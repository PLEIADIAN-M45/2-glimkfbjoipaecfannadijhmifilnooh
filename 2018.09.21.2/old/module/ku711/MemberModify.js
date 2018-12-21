function getMemberStatusByLanguageCode() {
    return new Promise(function(resolve, reject) {
        if (localStorage.MemberStatusByLanguageCode) {
            var obj = angular.fromJson(localStorage.MemberStatusByLanguageCode)
            evo.user.status.title = obj[evo.user.status.value];
            //console.log('getMemberStatusByLanguageCode:', evo.user.state);
            resolve(evo.user)
        } else {
            (function _checker() {
                var { GetMemberStatusByLanguageCode } = window.Tamper
                if (GetMemberStatusByLanguageCode) {
                    var obj = GetMemberStatusByLanguageCode.ValueKey;

                    evo.user.status.title = obj[evo.user.status.value];

                    localStorage.MemberStatusByLanguageCode = angular.toJson(obj);
                    resolve(evo.user)
                } else {
                    setTimeout(_checker, 500)
                }
            }());
        }
    })
}


function getOuputBankProID() {
    return new Promise(function(resolve, reject) {
        if (localStorage.OuputBankProID) {
            var obj = angular.fromJson(localStorage.OuputBankProID)
            resolve(obj)
            //console.log('getOuputBankProID:', obj);
        } else {
            (function _checker() {
                var { GetProvincesInfoByLanguageCodeToExpando } = window.Tamper
                if (GetProvincesInfoByLanguageCodeToExpando) {
                    var obj = GetProvincesInfoByLanguageCodeToExpando.ValueKey;
                    localStorage.OuputBankProID = angular.toJson(obj);
                    resolve(obj);
                } else {
                    setTimeout(_checker, 500)
                }
            }());
        }
    })
}

function getOuputBankCityID() {
    return new Promise(function(resolve, reject) {
        if (localStorage.OuputBankCityID) {
            var obj = angular.fromJson(localStorage.OuputBankCityID)
            resolve(obj)
            //console.log('getOuputBankCityID:', obj);
        } else {
            (function _checker() {
                //var obj = window.Tamper.GetCityInfoByCondition
                var { GetCityInfoByCondition } = window.Tamper
                if (GetCityInfoByCondition) {
                    var obj = {};
                    GetCityInfoByCondition.map(function(x, i) { obj[x.CityID] = x.CityName; })
                    localStorage.OuputBankCityID = angular.toJson(obj);
                    resolve(obj);
                } else {
                    setTimeout(_checker, 500)
                }

            }());
        }
    })
}

function getOuputBankCodeID() {
    return new Promise(function(resolve, reject) {
        if (localStorage.OuputBankCodeID) {
            var obj = angular.fromJson(localStorage.OuputBankCodeID)
            resolve(obj)
            //console.log('getOuputBankCodeID:', obj);
        } else {;
            (function _checker() {
                var { GetBankCodeInfoList } = window.Tamper;

                if (GetBankCodeInfoList) {
                    var obj = {};
                    GetBankCodeInfoList.map(function({ BankCodeID, BankCodeName }) { obj[BankCodeID] = BankCodeName; })
                    localStorage.OuputBankCodeID = angular.toJson(obj)
                    resolve(obj)
                } else {
                    setTimeout(_checker, 500)
                }
            }());
        }
    })
}


function GetMemberWithdrawalBankInfoBackendByAccountIDOutput() {
    return new Promise(function(resolve, reject) {
        if (myApp.$scope.ctrl.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput) {
            resolve(myApp.$scope.ctrl.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput)
            //console.log('GetMemberWithdrawalBankInfoBackendByAccountIDOutput:', 1);
        } else {
            myApp.$scope.$watch('ctrl.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput', function(result, oldValue) { if (result) { resolve(result) } });
        }
    })
}

function fetchBankAcInfo() {
    return Promise.all([
        GetMemberWithdrawalBankInfoBackendByAccountIDOutput(),
        getOuputBankCodeID(),
        getOuputBankCityID(),
        getOuputBankProID(),
    ]).then(function([banker, codeID, cityID, proID]) {
        evo.user.banker = banker.map(function(c, i) {
            return {
                name: codeID[c.BankCodeID],
                province: proID[c.BankProID],
                city: cityID[c.BankCityID],
                title: c.PayeeAccountNoShow,
                value: c.PayeeAccountNo
            }
        })
        //.filter(function(c, i) { return c.value; });
        //console.log('fetchBankAcInfo:', evo.user.banker);
        return evo.user.banker;
    })
}


setTimeout(function() {
    if (document.querySelector('input[value=停权]')) {
        document.querySelector('input[value=停权]').addEventListener("click", function(e) {
            var deposit = myApp.$scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit
            var status = myApp.$scope.ctrl.model.UpdateEditMemberInfoManage.MemberStatus;
            /*************************************/
            if (evo.user.status.value == 3) {
                upload_1('審核中轉停權戶', '否');
            }
            /*************************************/
            if (evo.user.status.value == 1) {
                upload_2('正常戶轉停權戶');
            }
            /*************************************/
            if (evo.user.status.value == 2) {
                upload_2('靜止戶轉停權戶');
            }
            if (evo.user.status.value == 4) {
                upload_2('測試戶轉停權戶');
            }
            /*************************************/
        })
    }

    if (document.getElementById('btnEditBalanceInfo')) {
        document.getElementById('btnEditBalanceInfo').addEventListener("click", function(e) {
            var deposit = myApp.$scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit
            var status = myApp.$scope.ctrl.model.UpdateEditMemberInfoManage.MemberStatus;
            console.log(evo.user.deposit.value, deposit);
            //　evo.user.deposit.value == false
            if (evo.user.status.value == 3 && deposit == true) {
                upload_1('審核戶開啟存款', '是');
            }
            if (evo.user.status.value == 4 && deposit == true) {
                upload_1('測試戶開啟存款', '是');
            }
        });
    }

    if (document.getElementById('btnEditBasicInfo')) {
        document.getElementById('btnEditBasicInfo').addEventListener("click", function(e) {
            var deposit = myApp.$scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit
            var status = myApp.$scope.ctrl.model.UpdateEditMemberInfoManage.MemberStatus;
            console.log(evo.user.deposit.value, deposit);
            //　evo.user.deposit.value == false
            if (evo.user.status.value == 3 && deposit == true) {
                upload_1('審核戶開啟存款', '是');
            }
            if (evo.user.status.value == 4 && deposit == true) {
                upload_1('測試戶開啟存款', '是');
            }
        });
    }

}, 2000)


function getCtrl() {
    return new Promise(function(resolve, reject) {
        var target = myApp.$scope.ctrl;
        resolve(target)
    })
}

function getModule(name) {
    return new Promise(function(resolve, reject) {
        (function __getModule__(name, i) {
            if (i > 100) { return reject() };
            try {
                var $model = myApp.$scope.ctrl.model;
                var target = $model[name];
                var length = Object.values(target).length;
                //console.log(name, i++, length);
                if (length) {
                    resolve(target);
                } else {
                    setTimeout(__getModule__, 500, name, i)
                }
            } catch (ex) {
                setTimeout(__getModule__, 500, name, i)
            }
        }(name, 0));
    })
}


function updateUserStatus() {
    return Promise.all([
        getCtrl(),
        getModule('GetMemberStatusByLanguageCodeModelOutput'),
    ]).then(function([c, m]) {
        evo.user.status = {};
        evo.user.status.value = c.MemberStatus;
        evo.user.status.title = m.ValueKey[c.MemberStatus];
        evo.user.deposit = {};
        evo.user.deposit.value = c.OldIsDeposit;
        evo.user.deposit.title = (c.OldIsDeposit) ? '开启' : '关闭';
        return evo.user;
    })
}


function fetchMemberInfo() {
    if (evo.user) {
        return updateUserStatus()
    } else {
        return Promise.all([
                getModule('OldMemberBaseInfo'),
                getModule('OldMemberRisksInfo')
            ]).then(function([a, b, x]) {
                var c = Object.assign(a, b);
                evo.user = {
                    operator: evo.operator,
                    siteNumber: evo.siteNumber,
                    uniqueId: evo.uniqueId,
                    origin: evo.origin,
                    accountId: c.AccountID,
                    author: {
                        title: c.AccountName,
                        value: c.AccountNameShow,
                    },
                    locate: {
                        title: c.RegistedIP,
                        value: c.RegistedIP
                    },
                    mobile: {
                        title: c.CellPhoneShow,
                        value: c.CellPhone
                    },
                    idcard: {
                        title: c.IDNumberShow,
                        value: c.IDNumber
                    },
                    birthday: c.BirthDay,
                    agency: c.AgencyID,
                    joindate: c.RegistedTime,
                    isBlack: c.IsBlackList
                }
            })
            .then(updateUserStatus)
            .then(function() {
                return evo.user;
            })
    }
}



function getMemberBankAccsEnum() {
    return new Promise(function(resolve, reject) {;
        (function _checker() {
            if (document.getElementById('PayeeAccountNo4')) {
                var arr = [
                    'PayeeAccountNo0',
                    'PayeeAccountNo1',
                    'PayeeAccountNo2',
                    'PayeeAccountNo3',
                    'PayeeAccountNo4'
                ].map(function(d) { return document.getElementById(d); })
                resolve(arr);
            } else {
                setTimeout(_checker, 500)
            }
        }());
    })
}



/*
window.Tamper.GetLevelTypeInfoGetByLanguageCode
window.Tamper.GetProvincesInfoByLanguageCodeToExpando
window.Tamper.GetMemberSNInfoBackendByAccountID
window.Tamper.GetBankCodeInfoList
window.Tamper.GetMemberRisksInfoBackendByAccountID
window.Tamper.GetProvincesInfoByLanguageCodeToExpando
window.Tamper.GetCityInfoByLanguageCodeToExpando
window.Tamper.GetMemberStatusByLanguageCode
window.Tamper.GetProvincesInfoByLanguageCode
window.Tamper.GetCityInfoByCondition
*/