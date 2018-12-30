define(["app.sendSms"], function(sendSms) {

    class User {
        constructor($scope) {
            this.__proto__.__proto__ = $scope;
            return this.setUser()

            /*
            $scope.extends(this, true);
            return $scope.getUser().then((user) => {
                if(user) { user.__proto__ = this.__proto__; return user } else {
                    return this.setUser($scope);
                }
            })*/
        }

        openDeposit($scope, e) {
            e.currentTarget.hide();
            $scope.ctrl.isOpenDeposit.val(1);
            $scope.ctrl.btnSaveInfo.click();
        }

        getUserBasic() {
            //console.log(this.server);
            ['server', 'origin', 'unique', 'channel', 'account', 'operator'].forEach((name) => { this[name] = this[name]; });
        }
        getUserState($scope) {
            var m = $scope.model;
            this.status = [m.ishow.value];
            this.permit = [m.isOpenDeposit.value];
            this.sms = { status: m.ishow.value };
        }

        getUserStore($scope) {
            return $scope.dexie.user.get($scope.account).then((d) => {
                this.sequel = d.f_id;
                this.attach = d.f_joindate;
                this.agency = d.f_alagent;
                this.black = d.f_blacklist;
                this.peril = d.f_peril;
                this.nickName = d.f_nickName;
                this.banker.map((b, i) => { b.value = d.f_RemittanceAccount.split('|')[i]; });
                this.banker = this.banker.filter((a) => { return a.value });
            });
        }

        getPhoneDate($scope) {
            return $scope.ajax({
                url: "/LoadData/AccountManagement/GetMemberList.ashx",
                data: "type=getPhoneDate&account=" + $scope.account
            }).then(([d]) => {
                this.mobile.value = d.f_photo;
                this.idcard.value = d.f_idCard;
                this.equpmt.browser = d.f_browser;
                this.equpmt.osInfo = d.f_osInfo;
            });
        }

        getSystemLog($scope) {
            return $scope.ajax({
                url: "/LoadData/AccountManagement/GetSystemLog.ashx",
                method: "POST",
                data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + $scope.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
            }).then((rows) => {
                return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                    if(f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
                });
            });
        }

        getUserModel($scope) {
            var m = $scope.model;
            this.timing = [];
            this.equpmt = {};
            this.birthday = m.birthday;
            this.author = { attr: 'author', title: m.txtRemittaceName, value: m.txtRemittaceName };
            this.locate = { attr: 'locate', title: m.lblIp, value: m.lblIp };
            this.mobile = { attr: 'mobile', title: m.txtPhoto, value: m.txtPhoto };
            this.idcard = { attr: 'idcard', title: m.txtIdCard, value: m.txtIdCard };
            this.banker = [
                { attr: 'banker', title: m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
                { attr: 'banker', title: m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } },
                { attr: 'banker', title: m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } },
                { attr: 'banker', title: m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } },
                { attr: 'banker', title: m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }
            ];
        }

        save() {
            return this.sendMessage({ command: 'apiFunctions.store.user.put', params: this })
                .then((user) => {
                    console.log('save...');
                    return user;
                })
        }

        setUser($scope) {
            return Promise.all([
                this.getUserBasic(),
                /*this.getUserModel($scope),
                this.getUserState($scope), this.getUserStore($scope),
                this.getPhoneDate($scope), this.getSystemLog($scope),*/
            ]).then(() => { return this })
        }

        _setUser($scope) {
            return Promise.all([
                this.getUserBasic($scope), this.getUserModel($scope),
                this.getUserState($scope), this.getUserStore($scope),
                this.getPhoneDate($scope), this.getSystemLog($scope),
            ]).then(() => { return this })
        }
    }

    return User;
});






//this.mobile.__proto__[Symbol.toPrimitive] = function() { return d.f_photo };



/*
 //]).then(() => { return this.save(this) })

            //]).then(() => { return $scope.putUser(this) })
  //$scope.__proto__._user = this.__proto__;
            //this.save.bind($scope)
            //return this.setUser($scope);
            //return user || this.setUser($scope);


this.sendMessage = function(message) {
    return new Promise((resolve, reject) => {
        if(this.extensionId && message) {
            chrome.runtime.sendMessage(this.extensionId, message, (res) => {
                if(res) { res.active = false; }
                try { resolve(res) } catch (ex) { reject(ex) }
            })
        } else { reject(101) }
    })
}
*/
/*

https://www.jianshu.com/p/b941040e57e3
https://coryrylan.com/blog/javascript-es6-class-syntax
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
https://www.web-tinker.com/article/21287.html

*/


//toString: () => 1,
//valueOf: () => 2,
//[Symbol.toPrimitive]: () => this.value,
//Date.prototype[Symbol.toPrimitive]