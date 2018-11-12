define(['@ku711/api'], function(apiFunction) {

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
        ]).then(function([status, permit]) {
            $scope.user.status.push(status);
            $scope.user.permit.push(permit);
            //$scope.user.MemberStatus = status
            //$scope.user.IsDeposit = permit;
            //evo.assign($scope.user, { status, permit })
            return $scope.user;
        })
    }

    function getSystemLog() {
        return apiFunction.getSystemLog().then((logs) => {
            return logs.filter(({ Content, OperateTime, Operator }) => {
                return Content.filter((obj) => {
                    if ((obj.FieldName == 'MemberStatus' && obj.BeforeValue == 2 && obj.AfterValue == 3)) {
                        return evo.assign($scope.user, { timing: [OperateTime] });
                    }
                })
            })
        })
    }


    function setUser() {
        //if ($scope.user) { return updateUserStatus().then(putUser) } else { $scope.user = {}; }
        $scope.user = {
            sequel: "",
            unique: "",
            timing: [],
            status: [],
            permit: [],
            author: { title: null, value: null, },
            locate: { title: null, value: null },
            mobile: { title: null, value: null },
            idcard: { title: null, value: null },
            banker: []
        }

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
                author: { value: c.AccountName, title: c.AccountNameShow },
                locate: { value: c.RegistedIP, title: c.RegistedIP },
                mobile: { value: c.CellPhone, title: c.CellPhoneShow },
                idcard: { value: c.IDNumber, title: c.IDNumberShow },
            }
            var { BirthDay: birthday, AgencyID: agency, RegistedTime: attach, IsBlackList: black } = c;

            assign($scope.user, { account, channel, host, origin, operator, birthday, agency, attach, black, region: [] }, property);

            $scope.user.sequel = c.MNO;
            $scope.user.unique = [account, channel].join('-');
            $scope.user.black = $Num($scope.user.black);
            $scope.user.attach = $formatTime($scope.user.attach);
            $scope.user.timing = $scope.user.timing.map($formatTime);
            //$scope.user.status = $scope.user.status.map($Num);
            //$scope.user.permit = $scope.user.permit.map($Num);
            //console.log($formatTime(evo.now));

            console.log($scope.user);

            return $scope.user;
        }).then(putUser);

    }

    function fetchBankAcInfo() {
        return Promise.all([
            getModule('GetMemberWithdrawalBankInfoBackendByAccountIDOutput'),
            getBANKCODE(), getBANKCITY(), getBANKPROV(),
        ]).then(function([banker, codeID, cityID, provID]) {
            $scope.user.banker = [];
            return $scope.user.banker = banker.filter((x) => x.IsSQL).map(function(c, i) {
                return {
                    title: c.PayeeAccountNoShow,
                    value: c.PayeeAccountNo,
                    region: {
                        meta: codeID[c.BankCodeID],
                        prov: provID[c.BankProID],
                        city: cityID[c.BankCityID]
                    }

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

    $scope.openDeposit = function() {
        console.log(1, 1);
        $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
        $scope.ctrl.DepositChanged();
        $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
    }

    $scope.openLogPage = function() {
        window.open(`${evo.origin}/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=${evo.account}`, '_blank');
    }

    return { setUser }
});