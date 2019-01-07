define(["ku711/apiFunction", "ku711/decode"], function(apiFunction, decode) {


    console.log(decode);
    //console.log(apiFunction);
    /*
    function setUser() {

        this.user = {
            sequel: "",
            unique: "",
            timing: [],
            status: [],
            permit: [],
            author: { title: null, value: null },
            locate: { title: null, value: null },
            mobile: { title: null, value: null },
            idcard: { title: null, value: null },
            banker: []
        }

        return Promise.all([

            getModule('OldMemberBaseInfo'),
            getModule('OldMemberRisksInfo'),
            getSystemLog(),
            getBanker(),
            getStatus()

        ]).then(([a, b]) => {
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
            //console.log($scope.user);
            return $scope.user;
        }).then(putUser);

    }

    function toObj8(args) {
        if(args.constructor.name == "Object") { return args } else
        if(args.constructor.name == "Array") {
            try {
                var obj = {};
                args.forEach(({ BankCodeID, BankCodeName }) => { obj[BankCodeID] = BankCodeName });
                args.forEach(({ CityID, CityName }) => { obj[CityID] = CityName });
                args.forEach(({ ProvincesID, ProvincesName }) => { obj[ProvincesID] = ProvincesName });
                localStorage[args._name_] = toJson(obj);
                return obj;
            } catch (ex) {};
        };
    }

    function getBanker() {
        return Promise.all([
            getModule('GetMemberWithdrawalBankInfoBackendByAccountIDOutput'),
            getModule('EditBankInfoList').then(toObj8),
            getModule('CityInfoList').then(toObj8),
            getModule('ProvinceInfoListForMemberInfo').then(toObj8)
        ]).then(([banker, meta, city, prov]) => {
            return $scope.user.banker = banker.filter((x) => x.IsSQL).map((c, i) => { return { title: c.PayeeAccountNoShow, value: c.PayeeAccountNo, region: { meta: meta[c.BankCodeID], prov: prov[c.BankProID], city: city[c.BankCityID] } } })
        })
    }

    function getStatus() {
        return Promise.all([
            getModule('UpdateEditMemberInfoManage.MemberStatus'),
            getModule('GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit')
        ]).then(([status, permit]) => {
            $scope.user.status.push(status);
            $scope.user.permit.push(permit);
            return $scope.user;
        })
    }

    function getSystemLog() {
        return apiFunction.getSystemLog().then((logs) => { return logs.filter(({ Content, OperateTime, Operator }) => { return Content.filter((obj) => { if((obj.FieldName == 'MemberStatus' && obj.BeforeValue == 2 && obj.AfterValue == 3)) { return evo.assign($scope.user, { timing: [OperateTime] }); } }) }) })
    }


    function getMemberBankAccsEnum() {
        return ['PayeeAccountNo0', 'PayeeAccountNo1', 'PayeeAccountNo2', 'PayeeAccountNo3', 'PayeeAccountNo4'].map(getElementById);
    }
    */

    function sendsms(user) {
        if (!user) { return }
        if (user.sendsms) { return }
        this.callee = "sendsms"
        this.command = 'apiFunctions.sendsms'
        this.requestUrl = 'http://client.motosms.com/smsc/smssend';
        this.mobile = '86' + user.mobile.value
        this.status = user.status[0];
        this.channel = user.channel;
    }

    class User {

        constructor(fact) {
            console.log("+");
            this.status = [];
            this.permit = [];
            this.timing = [];
            /*
                        this.$$getModule('OldMemberBaseInfo')
                        this.$$getModule('OldMemberRisksInfo')
                        this.getSystemLog(fact)
                        */


            return this.start(fact);
        }

        getSystemLog({ $account, $moment }) {
            //timeing[0]: 用户状态 【靜止戶】 被修改为 【審核戶】
            //timeing[1]: 用户状态 【審核戶】 被修改为 【正常户】 【停权户】
            //用户状态 【正常户】 被修改为 【停权户】
            console.log($account, "++++++++++++");

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
                    //ModifyContentType: 0
                    //EndTime: "2019-01-07 23:59:59",
                    //StartTime: "2018-12-03 00:00:00",
                })
            }).then((d) => {
                console.log(d);
                d.Data.Data.filter(({ Content, OperateTime, Operator }) => {
                    Content.filter((obj) => {
                        if ((obj.FieldName == 'MemberStatus' && obj.BeforeValue == 2 && obj.AfterValue == 3)) {
                            this.timing[0] = OperateTime;
                        }
                    })
                })
            })
        }

        OldMemberRisksInfo({ $getModule, $moment }) {
            return $getModule('OldMemberRisksInfo').then((c) => {
                this.locate = { value: c.RegistedIP, title: c.RegistedIP }
                this.equpmt = { browser: c.BrowserType, osInfo: c.OSType }
                this.agency = c.AgencyID;
                this.attach = c.RegistedTime;
                this.suspension = c.IsFSuspension;
            })
        }

        OldMemberBaseInfo({ $getModule }) {
            return $getModule('OldMemberBaseInfo').then((c) => {
                console.log(':::::::::::::', c);
                this.author = { value: c.AccountName, title: c.AccountNameShow }
                this.mobile = { value: c.CellPhone, title: c.CellPhoneShow }
                this.idcard = { value: c.IDNumber, title: c.IDNumberShow }
                this.birthday = c.BirthDay;
                this.black = c.IsBlackList;
                this.sequel = c.MNO;
                this.nickname = c.NickName;
            })
        }

        getStatus({ $moment, $getModule }) {
            //$getModule('OldMemberRisksInfo').then((c) => {})
            return $getModule('UpdateEditMemberInfoManage.MemberStatus').then((x) => {
                this.status[0] = Number(x)
            })
        }
        getIsDeposit({ $getModule }) {
            return $getModule('GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit').then((x) => {
                this.permit[0] = Number(x)
            })
        }
        getUserBasic({ server, origin, unique, channel, account, operator }) {
            Object.assign(this, { server, origin, unique, channel, account, operator })
        }
        getBanker({ $getModule }) {
            return $getModule('GetMemberWithdrawalBankInfoBackendByAccountIDOutput')
                .then((banker) => {
                    this.banker = banker.map((s) => {
                        return {
                            value: s.PayeeAccountNo,
                            title: s.PayeeAccountNoShow,
                            region: {
                                meta: decode.code[s.BankCodeID],
                                prov: decode.prov[s.BankProID],
                                city: decode.city[s.BankCityID]
                            }
                        }
                    }).filter((c) => {
                        return c.value;
                    });
                })
            console.log("+++");
        }

        start(fact) {
            return Promise.all([
                this.OldMemberBaseInfo(fact),
                this.OldMemberRisksInfo(fact),
                this.getUserBasic(fact),
                this.getBanker(fact),
                this.getStatus(fact),
                this.getIsDeposit(fact),
                this.getSystemLog(fact),
            ]).then(() => { return this; })
        }
    }

    async function $defUser($scope) {
        var user = await new User($scope);
        user.idcard.region = {};
        user.mobile.region = {};
        user.locate.region = {};
        user.region = [];
        user.sendsms = new sendsms(user);
        return user;
    }


    return async function({ $clipboard, $getModule, $keydown, $xmlSpider, $createTab, $model, $now, $scope, $ctrl, $sendMessage, $getUser, $setUser, $putUser, $delUser, $account, $console, $router }) {

        $delUser(1);
        $scope.$router = $router;
        $scope.$createTab = $createTab
        $scope.$watch('user', $putUser, true);
        $scope.user = await $getUser() || await $defUser(this);

        /*
        $scope.sendSms = function(e) {
            e.preventDefault();
            e.currentTarget.hide();
            $scope.user.sendsms.status = -1;
            $sendMessage($scope.user.sendsms).then((s) => { c(s) })
                .then($setUser)
        };
        */




        $scope.setPermit = function(e) {
            $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
            $scope.ctrl.DepositChanged();
            $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
        };


        console.log($xmlSpider);

        $xmlSpider.loadend = function() {
            console.log(this);

            if (this.action == "getmodel") {
                console.log($scope.user);
            }

            //console.log(this);
        };




        console.log($scope.user);

        $scope.$apply();



    }
})







function bbb() {
    var _bank = {
        code: {},
        prov: {},
        city: {},
    }

    //console.log(this.$clipboard);

    Promise.all([
        $getModule("EditBankInfoList").then((arr) => {
            arr.map((c) => {
                _bank.code[c.BankCodeID] = c.BankCodeName
            })
        }),
        $getModule("ProvinceInfoListForMemberInfo")
        .then((arr) => {
            arr.map((c) => {
                _bank.prov[c.ProvincesID] = c.ProvincesName
            })
        }),
        $getModule("CityInfoList").then((arr) => {
            arr.map((c) => {
                _bank.city[c.CityID] = c.CityName
            })
        })
    ]).then((arr) => {

        localStorage.bank = angular.toJson(_bank);
        console.log(angular.toJson(_bank));
        //this.clipboardData = angular.toJson(_bank)
        //document.execCommand("copy");
    })

}




//var sel = $("select[ng-model='ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit']")
//console.log(sel);
//sel.val(true)
//sel[0].value = "boolean:true"