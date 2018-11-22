define([], function () {

    return function ({ $scope, apiFunction }) {

        //console.log(apiFunction);

        function _setUser() {
            // console.log(this);
            var m = $scope.model;

            $scope.user = {
                unique: this.unique,
                host: this.host,
                origin: this.origin,
                operator: this.operator,
                channel: this.channel,
                account: this.account,
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
                apiFunction.getPhoneDate($scope),
                apiFunction.getSystemLog($scope),
                apiFunction.getUserStore($scope)
            ])

           
        }





        function _putUser() {
            return this.sendMessage({
                command: 'apiFunctions.store.user.put',
                params: $scope.user
            })
        }



        var putUser = _putUser.bind(this);
        var setUser = _setUser.bind(this);



        setUser().then(putUser);



        // setUser.call(this).then(putUser)
        //getUser.call(this);

    }


});


/*
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

        function bindUser(user) {
            console.log(user);
            $scope.user = user;
            $scope.$apply();
        }
 */

/*

    function getUser() {

        chrome.runtime.sendMessage(this.extensionId, { command: 'apiFunctions.store.user.get', unique: this.unique }, bindUser)
    }


    function putUser() {
        $scope.user.command = "apiFunctions.store.user.put";
        chrome.runtime.sendMessage(this.extensionId, $scope.user, function (d) {
            console.log(d);
        })
    }
    */




function putUser3() {
    console.log($scope.user);
    return
    var user = $scope.user;
    var o = Object.assign({ command: 'apiFunctions.store.user.put' }, adjUser(user))
    return $scope.sendMessage(o).then(bindUser);
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