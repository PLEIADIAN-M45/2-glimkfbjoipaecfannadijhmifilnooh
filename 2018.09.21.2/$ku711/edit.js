define(["../$ku711/decode"], function(decode) {

    var _user_ = { timing: [], status: [], permit: [], region: [], equpmt: {} };

    return function({ apis, $xmlSpider, $scope, $ajax, $account, $dexie, $model, $ctrl, $getModule, $router }) {

        var { account, server, origin, unique, channel, operator } = $router;

        function getMemberSystemLog() {
            //timeing[0]: 用户状态 【靜止戶】 被修改为 【審核戶】
            //timeing[1]: 用户状态 【審核戶】 被修改为 【正常户】 【停权户】
            //用户状态 【正常户】 被修改为 【停权户】
            //console.log($account, "++++++++++++");
            return $.ajax({
                url: "/member/api/Common/GetMemberInfoOperationLogByMultiAccountID",
                method: "POST",
                dataType: "json",
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                    "requestverificationtoken": localStorage.requestverificationtoken
                },
                data: angular.toJson({
                    "DataID": $router.$account,
                    "Operated": $router.$account,
                    "DataIDList": [],
                    "OperateType": 0,
                    "OperatorList": [],
                    "PageIndex": 0,
                    "PageSize": 5,
                    "Platform": 0
                })
            }).then((d) => {
                d.Data.Data.filter(({ Content, OperateTime, Operator }) => {
                    Content.filter((obj) => {
                        if ((obj.FieldName == 'MemberStatus' && obj.BeforeValue == 2 && obj.AfterValue == 3)) {
                            //console.log(7, OperateTime);
                            _user_.timing[0] = OperateTime;
                        }
                    })
                })
            })
        }


        function getMemberBaseInfo() {
            Object.assign(_user_, { account, server, origin, unique, channel, operator });
            return $getModule('ctrl.model.OldMemberBaseInfo').then((c) => {
                //console.log(2, c);
                _user_.author = { value: c.AccountName, title: c.AccountNameShow, caller: 'author' }
                _user_.mobile = { value: c.CellPhone, title: c.CellPhoneShow, caller: 'mobile' }
                _user_.idcard = { value: c.IDNumber, title: c.IDNumberShow, caller: 'idcard' }
                _user_.birthday = c.BirthDay;
                _user_.black = c.IsBlackList;
                _user_.sequel = c.MNO;
                _user_.nickname = c.NickName;
            })
        }

        function getMemberRisksInfo() {
            return $getModule('ctrl.model.OldMemberRisksInfo').then((c) => {
                //console.log(3, c);
                _user_.locate = { value: c.RegistedIP, title: c.RegistedIP, caller: 'locate' }
                _user_.equpmt = { browser: c.BrowserType, osInfo: c.OSType }
                _user_.agency = c.AgencyID;
                _user_.attach = c.RegistedTime;
                _user_.suspension = c.IsFSuspension;
            })
        }


        function getMemberStatus() {
            return $getModule('ctrl.MemberStatus').then((c) => {
                //console.log(4, 'MemberStatus', c);
                _user_.status[0] = Number(c)
            })
            return $getModule('ctrl.model.UpdateEditMemberInfoManage.MemberStatus').then((c) => {
                //console.log(4, c);
                _user_.status[0] = Number(c)

            })
        }

        function getMemberDeposit() {
            return $getModule('ctrl.OldIsDeposit').then((c) => {
                //console.log(5, 'OldIsDeposit', c);
                _user_.permit[0] = Number(c);
            })
            return $getModule('ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit').then((c) => {
                //console.log(5, c);
                _user_.permit[0] = Number(c)
            })
        }

        function getMemberBankInfo() {
            return $getModule('ctrl.model.GetMemberWithdrawalBankInfoBackendByAccountIDOutput')
                .then((banker) => {
                    //console.log(6, banker);
                    _user_.banker = banker.map((s) => {
                        return {
                            caller: 'banker',
                            value: s.PayeeAccountNo,
                            title: s.PayeeAccountNoShow,
                            region: {
                                meta: decode.code[s.BankCodeID],
                                prov: decode.prov[s.BankProID],
                                city: decode.city[s.BankCityID]
                            }
                        }
                    }).filter((c) => { return c.value; });
                })
        }

        apis.setUser = function() {
            console.log('+');
            return Promise.all([
                getMemberBaseInfo(), getMemberRisksInfo(), getMemberBankInfo(), getMemberStatus(), getMemberDeposit(), getMemberSystemLog(),
            ]).then(() => {
                _user_.idcard.region = {};
                _user_.mobile.region = {};
                _user_.locate.region = {};
                return _user_;
            })
        }


        $scope.setPermit = function(e) {
            $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
            $scope.ctrl.DepositChanged();
            $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
        };


    }
})































//console.log($scope);

/*
$scope.$watch('ctrl.model.CityInfoList', function(nv, ov) {
    if (nv) {
        console.log(nv);
    }
}, true);


$scope.$watch('ctrl.model.ProvinceInfoListForMemberInfo', function(nv, ov) {
    if (nv) {
        console.log(nv);
    }
}, true);
*/


/*

$xmlSpider.loadend = function xmlSpider() {
    console.log(this.action);
                //alert(this.action)
    switch (this.action) {
        case "UpdateMemberRiskInfoAccountingBackend":
            //if ($scope.user) {};
            this.user = $scope.user;
            apis.sendMessage(this);
            break;
        case "getmodel":
            apis.getUser();
            break;
        case "-------":
            break;
    }
};
*/