define([], function() {

    return function() {

        console.log(this);

        console.log(23443);


    }
});

/*
define(['@wa111/api'], function(apiFunction) {

    function _getPhoneDate(x) {
        $scope.user.mobile.value = x.f_photo;
        $scope.user.idcard.value = x.f_idCard;
        $scope.user.equpmt.browser = x.f_browser;
        $scope.user.equpmt.osInfo = x.f_osInfo;
    }

    function _getSystemLog(rows) {
        rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
            if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return $scope.user.timing[0] = f_time; }
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
        $scope.user.banker = $scope.user.banker.filter((a) => { return a.value });
    }

    $scope.setUser = function() {
        var m = $scope.model;
        $scope.user = {
            host: $scope.host,
            origin: $scope.origin,
            operator: $scope.operator,
            channel: $scope.channel,
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
            banker: [{
                title: m.txtRemittanceAccount111,
                region: {
                    meta: m.BankCode111.text,
                    city: m.ddlCityArea.text,
                    prov: m.ddlCity.text
                }
            }, { title: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } }, { title: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } }, { title: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } }, { title: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }]
        };
        return Promise.all([
            apiFunction.getPhoneDate().then(_getPhoneDate),
            apiFunction.getSystemLog().then(_getSystemLog),
            apiFunction.getUserStore().then(_getUserStore)
        ]).then(putUser);
    }

    return {}
});

*/









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