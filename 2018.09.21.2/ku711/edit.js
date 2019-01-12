define(["../ku711/decode"], function(decode) {

    var _user_ = { timing: [], status: [], permit: [], region: [], equpmt: {} };

    return function({ apis, $xmlSpider, $scope, $ajax, $account, $dexie, $model, $ctrl, $getModule, $router }) {
        var { account, server, origin, unique, channel, operator } = $router;

        function getSystemLog() {
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
                    "DataID": $account,
                    "Operated": $account,
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
                            _user_.timing[0] = OperateTime;
                        }
                    })
                })
            })
        }

        function OldMemberRisksInfo() {
            return $getModule('OldMemberRisksInfo').then((c) => {
                _user_.locate = { value: c.RegistedIP, title: c.RegistedIP, caller: 'locate' }
                _user_.equpmt = { browser: c.BrowserType, osInfo: c.OSType }
                _user_.agency = c.AgencyID;
                _user_.attach = c.RegistedTime;
                _user_.suspension = c.IsFSuspension;
            })
        }

        function OldMemberBaseInfo() {
            return $getModule('OldMemberBaseInfo').then((c) => {
                _user_.author = { value: c.AccountName, title: c.AccountNameShow, caller: 'author' }
                _user_.mobile = { value: c.CellPhone, title: c.CellPhoneShow, caller: 'mobile' }
                _user_.idcard = { value: c.IDNumber, title: c.IDNumberShow, caller: 'idcard' }
                _user_.birthday = c.BirthDay;
                _user_.black = c.IsBlackList;
                _user_.sequel = c.MNO;
                _user_.nickname = c.NickName;
            })
        }

        function getStatus() {
            return $getModule('UpdateEditMemberInfoManage.MemberStatus').then((x) => {
                _user_.status[0] = Number(x)
            })
        }

        function getIsDeposit() {
            return $getModule('GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit').then((x) => {
                _user_.permit[0] = Number(x)
            })
        }

        function getUserBasic() {
            Object.assign(_user_, { account, server, origin, unique, channel, operator })
        }

        function getBanker() {
            return $getModule('GetMemberWithdrawalBankInfoBackendByAccountIDOutput')
                .then((banker) => {
                    _user_.banker = banker.map((s) => {
                        return {
                            value: s.PayeeAccountNo,
                            title: s.PayeeAccountNoShow,
                            caller: 'banker',
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
                getUserBasic(), OldMemberBaseInfo(), OldMemberRisksInfo(), getBanker(),
                getStatus(), getIsDeposit(), getSystemLog(),
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

        console.log($scope);


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
    }
})