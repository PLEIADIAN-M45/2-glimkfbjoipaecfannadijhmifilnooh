define(['api'], function(apiFunction) {

    return function({ $scope }) {

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





        function $Num(str) { return Number(str) }

        function adjUser(user) {
            user.unique = [user.account, user.channel].join('-');
            user.status = user.status.map($Num);
            user.permit = user.permit.map($Num);
            user.author.attr = "author";
            user.locate.attr = "locate";
            user.mobile.attr = "mobile";
            user.idcard.attr = "idcard";
            user.banker.map((x) => { return Object.assign(x, { attr: "banker" }) });
            return user;
        }


        function putUser3() {
            console.log($scope.user);
            return
            var user = $scope.user;
            var o = Object.assign({ command: 'apiFunctions.store.user.put' }, adjUser(user))
            return $scope.sendMessage(o).then(bindUser);
        }

        function getUser() {
            console.log($scope.user);
            //var unique = [this.account, this.channel].join('-');
            //return this.sendMessage({ command: 'apiFunctions.store.user.get', unique }).then(bindUser);
        }



        function delUser() {
            return evo.sendMessage({
                command: 'apiFunctions.store.user.delete',
                params: { account: evo.account, channel: evo.channel }
            }).then(() => { console.log('user deleted.'); });
        }

        function bindUser(user) { return user; }


        function stringify(obj) {
            var str = JSON.stringify(obj);
            var res = str.replace(/(")/g, '\\\"');
            return '"' + res + '"'
            console.log(res);
        }

        //stringify(user);
        //console.log(encodeURIComponent(data));

        function putUser1() {
            var user = $scope.user;
            var data = JSON.stringify(user);
            $.ajax({
                url: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser',
                type: "get",
                data: data,
                dataType: "text",
            }).done(function(d) {
                //console.log(d);
                console.log(JSON.parse(decodeURIComponent(d)));
            })
        }

        //Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
        //contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        // url: 'https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser',
        //url: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser',
        //url: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser',


        function putUserByFormData() {
            //[...formData.entries()]

            var formData = new FormData();
            formData.append("username", "Groucho");
            formData.append("accountnum", 123456);
            $.ajax({
                url: '/putUser',
                type: "POST",
                processData: false,
                //contentType: false,
                contentType: 'text/plain',
                mimeType: 'multipart/form-data',
                data: formData
            }).done(function(d) {
                console.log(d);
            })
        }


        function putUser() {
            var formData = new FormData();
            formData.append("username", "Groucho");
            formData.append("accountnum", 123456);
            //[...formData.entries()]
            $.ajax({
                //url: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser',
                url: '/putUser',
                type: "POST",
                processData: false,
                contentType: false,
                mimeType: 'multipart/form-data',
                data: formData
            }).done(function(d) {
                console.log(d);
            })
            return

            //var user = $scope.user;
            //var data = JSON.stringify(user);
            //return
            $.ajax({
                url: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser',
                //type: "POST",
                type: "POST",
                data: formData

                //JSON.stringify($scope.user),
                //dataType: "json",
                //contentType: "application/json; charset=utf-8"                
                /*headers: {
                    'content-type': 'application/json;charset=UTF-8',
                    'x-requested-with': "XMLHttpRequest"
                }*/
                //contentType: "application/json; charset=utf-8",
                //contentType: "application/json"
            }).done(function(d) {
                console.log(d);
                //console.log(JSON.parse(decodeURIComponent(d)));
            })
        }

        $.ajax({
            url: '/putUser',
            type: "POST",
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'x-requested-with': "XMLHttpRequest"
            },
            responseType: 'text',
            data: JSON.stringify({ a: 5 })
        }).done(function(d) {
            console.log(d);
        })

        /*
        window.axios.defaults.headers.common = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };*/
        /*
        $.ajax({
            //url: 'https://bk.ku711.net/member/api/MemberInfoManage/GetAccountBookLevelSettingByPaywayIDAndGroupBy',
            //url: 'https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser',
            url: 'http://host26.wa111.net/putUser',
            type: "POST",
            data: JSON.stringify({ "PaywayID": "AP" }),
            dataType: "json",
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'x-requested-with': "XMLHttpRequest",
                'requestverificationtoken': 'vCSJaJ5V461x4kIFxoUO9DeS-xjOAkqpzRbRX43kTeZSxcAYyHKxXTMMO6EbW3E_LJpu6wEsaOkotTUl8l51tp6uFmo1:0Xl02ehKAgIVQMdcE7IHyJOhO55-kgIN0IZs5_eNBPxdZmB_HG3hfZbd3P7xx1rUjbjk_HemNozJB1SJPzgCL8OjhrPrOM4OZ7Osi48rwVdeugWo0H8Ff3edv3jOSDPXgbABkg2'
            }
        }).done(function(d) {
            console.log(d);
        })*/

        //console.log(apiFunction);


        var m = $scope.model;

        function setUser() {

            var m = $scope.model;
            //console.log(m);
            $scope.user = {
                unique: this.unique,
                host: this.host,
                origin: this.origin,
                operator: this.operator,
                channel: this.channel,
                account: m.account,
                birthday: m.birthday,
                timing: [],
                equpmt: {},
                status: [m.ishow.value],
                permit: [m.isOpenDeposit.value],
                author: { title: m.txtRemittaceName, value: m.txtRemittaceName },
                locate: { title: m.lblIp, value: m.lblIp },
                mobile: { title: m.txtPhoto, value: m.txtPhoto },
                idcard: { title: m.txtIdCard, value: m.txtIdCard },
                banker: [
                    { title: m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
                    { title: m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } },
                    { title: m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } },
                    { title: m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } },
                    { title: m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }
                ]
            };

            return Promise.all([
                apiFunction.getPhoneDate($scope).then(_getPhoneDate),
                apiFunction.getSystemLog($scope).then(_getSystemLog),
                apiFunction.getUserStore($scope).then(_getUserStore)
            ]).then(putUser);

        }


        //setUser.call(this)



    }


});

/*
define(['@wa111/api'], function(apiFunction) {

    

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