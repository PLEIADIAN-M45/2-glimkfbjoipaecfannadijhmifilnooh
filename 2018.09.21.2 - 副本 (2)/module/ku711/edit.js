define(["apiFunction"], function(apiFunction) {


    console.log(apiFunction);

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
        if (args.constructor.name == "Object") { return args } else
        if (args.constructor.name == "Array") {
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
        ]).then(([banker, meta, city, prov]) => { return $scope.user.banker = banker.filter((x) => x.IsSQL).map((c, i) => { return { title: c.PayeeAccountNoShow, value: c.PayeeAccountNo, region: { meta: meta[c.BankCodeID], prov: prov[c.BankProID], city: city[c.BankCityID] } } }) })
    }

    function getStatus() {
        return Promise.all([getModule('UpdateEditMemberInfoManage.MemberStatus'), getModule('GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit')]).then(([status, permit]) => {
            $scope.user.status.push(status);
            $scope.user.permit.push(permit);
            return $scope.user;
        })
    }

    function getSystemLog() {
        return apiFunction.getSystemLog().then((logs) => { return logs.filter(({ Content, OperateTime, Operator }) => { return Content.filter((obj) => { if ((obj.FieldName == 'MemberStatus' && obj.BeforeValue == 2 && obj.AfterValue == 3)) { return evo.assign($scope.user, { timing: [OperateTime] }); } }) }) })
    }


    function getMemberBankAccsEnum() {
        return ['PayeeAccountNo0', 'PayeeAccountNo1', 'PayeeAccountNo2', 'PayeeAccountNo3', 'PayeeAccountNo4'].map(getElementById);
    }




    return function() {

        //$scope.user = { sequel: "", unique: "", timing: [], status: [], permit: [], author: { title: null, value: null, }, locate: { title: null, value: null }, mobile: { title: null, value: null }, idcard: { title: null, value: null }, banker: [] }


        this.setUser = function() {

            this.user = { host: this.host, origin: this.origin, unique: this.unique, channel: this.channel, account: this.account, operator: this.operator };

            return Promise.all([

                this.getModule('OldMemberBaseInfo'),
                this.getModule('OldMemberRisksInfo'),




            ]).then(this.putUser.bind(this));

        };




        this.model = this.ctrl.model;


        this.getModule('OldMemberBaseInfo').then((x) => { console.log(x); })



    }



})





/*
apiFunction.getUserState.call(this.user),
    apiFunction.getUserModel.call(this.user),
    apiFunction.getPhoneDate.call(this.user),
    apiFunction.getSystemLog.call(this.user),
    apiFunction.getUserStore.call(this.user)
*/

// console.log(this.ctrl);
//console.log(this.model.OldMemberBaseInfo);
//getModule('OldMemberBaseInfo')

//getModule.bind(this);

//console.log(this);

//model

//getModule('OldMemberBaseInfo')

//this.model.OldMemberBaseInfo