define(['@wa111/edit.map', '@wa111/api'], function(map, apiFunction) {
    /*【审核中】 -> 【正常户】*/

    console.log($scope);

    var m = $scope.model;


    function timerFilter2(rows) { return rows.find(function({ f_field, f_oldData, f_newData }) { return f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus" && f_oldData == "3$log$0$log$0" && f_newData == "1$log$1$log$1" }); }
    /*【静止户】 -> 【审核中】*/

    //apiFunction.getAlertInfo();

    function timerFilter1(rows) {
        return rows.find(function({ f_field, f_oldData, f_newData }) { return f_field == "f_ishow" && f_oldData == "0" && f_newData == "3" });
    }

    function $apply() { if(!$scope.$$phase) { $scope.$apply(); } }

    function bindEvo() { var { channel, host, origin, operator } = evo; return Object.assign($scope.user, { channel, host, origin, operator }); }

    $scope.setUser = function setUser() {

        $scope.user = {
            channel: this.channel,
            host: this.host,
            origin: this.origin,
            operator: this.operator,

            account: m.f_account,
            birthday: m.birthday,
            timing: [],
            equpmt: {},
            status: [m.ishow.value],
            permit: [m.isOpenDeposit.value],
            author: { title: m.txtRemittaceName, value: m.txtRemittaceName, },
            locate: { title: m.lblIp, value: m.lblIp },
            mobile: { title: m.txtPhoto, value: null },
            idcard: { title: m.txtIdCard, value: null },
            "bank.1": { title: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
            banker: [
                { title: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
                { title: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } },
                { title: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } },
                { title: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } },
                { title: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }
            ]
        };

        function _getPhoneDate(x) {
            $scope.user.mobile.value = x.f_photo;
            $scope.user.idcard.value = x.f_idCard;
            $scope.user.equpmt.browser = x.f_browser;
            $scope.user.equpmt.osInfo = x.f_osInfo;
        }

        function _getSystemLog(rows) {
            rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                if(f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") {
                    return $scope.user.timing[0] = f_time;
                }
            });
        }

        function _getUserStore(x) {
            $scope.user.sequel = x.f_id;
            $scope.user.attach = x.f_joindate;
            $scope.user.agency = x.f_alagent;
            $scope.user.black = x.f_blacklist;
            $scope.user.peril = x.f_peril;
            $scope.user.nickName = x.f_nickName;
            $scope.user.banker.map((d, i) => { d.value = x.f_RemittanceAccount[i]; });
        }



        return Promise.all([
            apiFunction.getPhoneDate().then(_getPhoneDate),
            apiFunction.getSystemLog().then(_getSystemLog),
            apiFunction.getUserStore().then(_getUserStore)
        ]).then((args) => {
            console.log($scope.user);
        })


        //.then(timerFilter1).then((x) => { $scope.user.timing[0] = x.f_time; });
        return


        return $scope.user

        return Promise.all([
            $serializeObject('#lblIp'),
            $serializeObject('input'),
            $serializeObject('select'),
            apiFunction.getPhoneDate(),
            apiFunction.getSystemLog().then(timerFilter1),
            apiFunction.getUserStore()
        ]).then((args) => {
            var obj = Object.assign({}, ...args);
            //console.log(obj);
            $scope.updateUser(obj);
            //$scope.user.timing[0] = apiFunction.getSystemLog().then(timerFilter1)
            $scope.user.locate.title = $scope.user.locate.value;
            $scope.user.banker = $scope.user.banker.value.map((value, index) => {
                return {
                    title: $scope.user.banker.title[index],
                    value: $scope.user.banker.value[index],
                    region: {
                        meta: $scope.user.banker.meta[index],
                        prov: $scope.user.banker.prov[index],
                        city: $scope.user.banker.city[index]
                    }
                }
            }).filter((a) => { return a.value });
            //console.log($scope.user);
            return $scope.user;
        }).then(bindEvo).then(putUser)
    }

    $scope.updateUser = function updateUser(obj) {
        Object.entries(obj).forEach(([prop, value]) => {
            if(USERMAP.hasOwnProperty(prop) && value.toString()) { eval(USERMAP[prop] + "=value") }
        });
        $scope.$apply();
    }





    //$scope.ctrl = { deposit: ctl00_ContentPlaceHolder1_isOpenDeposit, btnSaveInfo: btnSaveInfo };
    //$scope.url = { IGetMemberInfo: `http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}` };
    //$scope.url = { IGetMemberInfo: `${location.origin}/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}` };

    /*
    $scope.openDeposit = function() {
        this.ctrl.deposit.value = 1;
        this.ctrl.btnSaveInfo.click();
    };*/


    /*
    $scope.openLogPage = function() { window.open(this.url.IGetMemberInfo, '_blank'); };
    $scope.createTab = function(url, params) { window.open(url, '_blank'); };
    */

    return {}
});










/*
    evo.sendMessage({
        command: "localStorage"
    }).then((res) => {
        for(var key in res) {
            localStorage[key] = res[key];
            //console.log(evo.decoder(res[key]));
        }
    });*/






//$('button').each((i, el) => { console.log(el.getAttribute('onclick')); })

/*var arr = Object.entries(obj);
arr.forEach(([prop, value]) => {
    if(USERMAP.hasOwnProperty(prop)) { eval(USERMAP[prop] + "=value") }
});*/

/*
    xmlSpider.loadend = function() {
        //console.log(this.postData);
        if(this.postData) { var { action } = this.postData }
        switch (action) {
            case "getmodel":
                var obj = this.resp;
                var arr = Object.entries(obj);
                arr.forEach(([prop, value]) => {
                    if(USERMAP.hasOwnProperty(prop) && value.toString()) {
                        //console.log(prop, value);
                        eval(USERMAP[prop] + "=value")
                    }
                });
                console.log($scope.user);
                $scope.$apply();
                break;
            default:
                break;
        }
    }

myApp.factory('LuffyFactory', function() {
    var factory = {};
    factory.word = '我要成成海賊王!';
    return factory;
})

myApp.service('LuffyService', function() {
    this.word = '我要成為海賊王！';
})
*/
//var ddl = dropdownTransfer(ctl00_ContentPlaceHolder1_ishow)

//console.log($("input").serializeArray());
//console.log($("input").serialize());
//console.log($("input").serializeObject());



/*
        console.log([...new FormData(aspnetForm)]);
        [...new FormData(aspnetForm)].forEach(runMAP);
       console.log(user);*/

//.forEach(runMAP);