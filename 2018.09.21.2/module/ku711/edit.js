    console.log(evo.host);

    define([evo.host + "/ApiFunction"], function() {
        console.log(evo.host);


        function getModule(objPath) {
            return new Promise(function(resolve, reject) {
                var object = (objPath.includes('ctrl')) ? $scope : $scope.ctrl.model;;
                (function repeater(object) {
                    var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object);
                    if (alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else {
                        if (typeof alphaVal == "object") {
                            if (Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) };
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
                console.log('updateUserStatus', status, deposit);
                return extend(evo.user, { status, deposit: Number(deposit) })
            })
        }


        function getSystemLog() {
            return new Promise((resolve, reject) => {
                var { channel, host, account } = evo;
                evo.sendMessage({
                    command: 'apiFunctions:SystemLog:host:channel',
                    channel,
                    host,
                    account
                }).then(([logs]) => {
                    logs.filter(({ Content, OperateTime, Operator }) => {
                        Content.filter((obj) => {
                            if ((obj.FieldName == 'MemberStatus' && obj.BeforeValue == 2 && obj.AfterValue == 3)) {
                                //evo.user.logs[0] = assign(obj, { OperateTime, Operator })
                                evo.user.timing = [OperateTime];
                                return resolve()
                            }
                        })
                    })
                })
            })
        }


        function getCtrl() {
            evo.ctrl = {};
            [...document.querySelectorAll('select')].forEach((el) => {
                var { title, attributes } = el;
                var ngModel = attributes["ng-model"];
                if (ngModel) {
                    // console.log(ngModel.value);
                    switch (ngModel.value) {
                        case "ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit":
                            evo.ctrl.deposit = el;
                            break;
                        default:
                            // statements_def
                            break;
                    }
                }
            });
            console.log(evo.ctrl);
        }


        function setUser() {

            if (evo.user) {

                updateUserStatus()

            } else {

                evo.user = evo.user || {}

                return Promise.all([

                    getModule('OldMemberBaseInfo'),
                    getModule('OldMemberRisksInfo'),
                    fetchBankAcInfo(),
                    getSystemLog(),
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

                    assign(evo.user, { account, channel, host, origin, operator, birthday, agency, attach, isBlack }, property);


                    //console.log();

                    return evo.user;
                }).then(putUser);
            }
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
            if (localStorage[$$]) { return angular.fromJson(localStorage[$$]) } else {
                return getModule('EditBankInfoList').then((arr) => {
                    var obj = arr.toObj('BankCodeID', 'BankCodeName');
                    localStorage[$$] = angular.toJson(obj);
                    return obj;
                })
            }
        }

        function getBANKCITY() {
            var $$ = 'BANKCITY';
            if (localStorage[$$]) { return angular.fromJson(localStorage[$$]) } else {
                return getModule('CityInfoList').then((arr) => {
                    var obj = arr.toObj('CityID', 'CityName');
                    localStorage[$$] = angular.toJson(obj);
                    return obj;
                })
            }
        }

        function getBANKPROV() {
            var $$ = 'BANKPROV';
            if (localStorage[$$]) { return angular.fromJson(localStorage[$$]) } else {
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
            window.open(`/MemberLoginLog?method=CookieID&accounts=${evo.account}`, '_blank');
            //window.open(`${evo.origin}/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=${evo.account}`, '_blank');
        }

        return { setUser, openDeposit, openLoginLog }
    });