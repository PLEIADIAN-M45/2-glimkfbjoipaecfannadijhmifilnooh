define(['@api'], function(apiFunction) {

    function getModule(objPath) {
        return new Promise(function(resolve, reject) {
            var object = (objPath.includes('ctrl')) ? $scope : $scope.ctrl.model;;
            (function repeater(object) {
                var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object);
                if(alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else {
                    if(typeof alphaVal == "object") {
                        if(Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) };
                    } else { resolve(alphaVal); }
                }
            }(object));
        })
    }

    function updateUserStatus() {
        return Promise.all([
            getModule('UpdateEditMemberInfoManage.MemberStatus'),
            getModule('GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit')
        ]).then(function([status, deposit]) {
            return evo.assign(evo.user, { status, deposit: Number(deposit) })
        })
    }

    function getSystemLog() {
        return apiFunction.getSystemLog().then((logs) => {
            return logs.filter(({ Content, OperateTime, Operator }) => {
                return Content.filter((obj) => {
                    if((obj.FieldName == 'MemberStatus' && obj.BeforeValue == 2 && obj.AfterValue == 3)) {
                        return evo.assign(evo.user, { timing: [OperateTime] });
                    }
                })
            })
        })
    }


    function setUser() {

        if(evo.user) { return updateUserStatus().then(putUser) } else { evo.user = {}; }

        return Promise.all([
            getModule('OldMemberBaseInfo'),
            getModule('OldMemberRisksInfo'),
            getSystemLog(),
            fetchBankAcInfo(),
            updateUserStatus()
        ]).then(function([a, b]) {
            var c = assign(a, b);
            var { origin, channel, operator, host } = evo;
            var { account, channel, host, origin, operator } = evo;
            var sheets = {},
                region = {};
            var property = {
                author: { property: 'author', value: c.AccountName, title: c.AccountNameShow, sheets },
                locate: { property: 'locate', value: c.RegistedIP, title: c.RegistedIP, sheets, region },
                mobile: { property: 'mobile', value: c.CellPhone, title: c.CellPhoneShow, sheets, region, },
                idcard: { property: 'idcard', value: c.IDNumber, title: c.IDNumberShow, region, },
            }
            var { BirthDay: birthday, AgencyID: agency, RegistedTime: attach, IsBlackList: isBlack } = c;
            assign(evo.user, { account, channel, host, origin, operator, birthday, agency, attach, isBlack, region: [] }, property);
            return evo.user;
        }).then(putUser);

    }

    function fetchBankAcInfo() {
        return Promise.all([
            getModule('GetMemberWithdrawalBankInfoBackendByAccountIDOutput'),
            getBANKCODE(), getBANKCITY(), getBANKPROV(),
        ]).then(function([banker, codeID, cityID, provID]) {
            return evo.user.banker = banker.filter((x) => x.IsSQL).map(function(c, i) {
                return {
                    property: 'banker',
                    title: c.PayeeAccountNoShow,
                    value: c.PayeeAccountNo,
                    sheets: {},
                    region: { meta: codeID[c.BankCodeID], prov: provID[c.BankProID], city: cityID[c.BankCityID], }
                }
            })
        })
    }

    function getBANKCODE() {
        var $$ = 'BANKCODE';
        if(localStorage[$$]) { return angular.fromJson(localStorage[$$]) } else {
            return getModule('EditBankInfoList').then((arr) => {
                var obj = arr.toObj('BankCodeID', 'BankCodeName');
                localStorage[$$] = angular.toJson(obj);
                return obj;
            })
        }
    }

    function getBANKCITY() {
        var $$ = 'BANKCITY';
        if(localStorage[$$]) { return angular.fromJson(localStorage[$$]) } else {
            return getModule('CityInfoList').then((arr) => {
                var obj = arr.toObj('CityID', 'CityName');
                localStorage[$$] = angular.toJson(obj);
                return obj;
            })
        }
    }

    function getBANKPROV() {
        var $$ = 'BANKPROV';
        if(localStorage[$$]) { return angular.fromJson(localStorage[$$]) } else {
            return getModule('GetProvincesInfoByLanguageCodeOutput').then((arr) => {
                var obj = arr.ValueKey;
                localStorage[$$] = angular.toJson(obj);
                return obj;
            })
        }
    }

    function getMemberBankAccsEnum() {
        return ['PayeeAccountNo0', 'PayeeAccountNo1', 'PayeeAccountNo2', 'PayeeAccountNo3', 'PayeeAccountNo4'].map(getElementById);
    }

    function openDeposit() {
        $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
        $scope.ctrl.DepositChanged();
        $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
    }

    function openLoginLog() {
        window.open(`${evo.origin}/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=${evo.account}`, '_blank');
    }

    return { setUser, openDeposit, openLoginLog }
});