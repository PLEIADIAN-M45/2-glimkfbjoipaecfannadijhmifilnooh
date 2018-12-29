define(["app.sendSms"], function(sendSms) {

    //console.log(sendSms);

    class User {

        constructor($scope) {

            /*
            this.btnSetPermit.hide()
            this.btnSendSms.hide()
            this.btnSetPermit.show()
            this.btnSendSms.show()
            */

            $scope.user__proto__ = this.__proto__;
            return $scope.getUser().then((user) => {
                return user || this.setUser($scope);
            })
        }
      
        /*
        get status() { return this.user.sms.status }
        set status(value) {
            this.user.sms.status = value;
            this.putUser();
        }
        */

        getUserBasic($scope) {
            ['server', 'origin', 'unique', 'channel', 'account', 'operator'].forEach((name) => {
                this[name] = $scope[name];
            });
        }

        getUserState($scope) {
            var m = $scope.model;
            this.status = [m.ishow.value];
            this.permit = [m.isOpenDeposit.value];
            //this.sms = { status: m.ishow.value }
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
                    if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
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

        go() {
            alert(12)
        }

        setUser($scope) {
            return Promise.all([
                this.getUserBasic($scope), this.getUserModel($scope),
                this.getUserState($scope), this.getUserStore($scope),
                this.getPhoneDate($scope), this.getSystemLog($scope),
            ]).then(() => { return $scope.putUser(this) })
        }
    }

    return User;
})










/*

  get _status() {
            return this.status
        }

        set _status(value) {
            //console.log(value);
            this.status = value
            //this.status = value
        }

get status() {
    return this._status
}

set status(value) {
    //console.log(value);
    this._status = value
    //this.status = value
}
*/





//console.log(this.extends);
//this.extends(user, true)
//user.extends = this.extends;
//user.extends(this)
//console.log(this);
//Object.assign(user, this)
//angular.copy(user, this)
//user = angular.merge(user, this)

//angular.extend(user.__proto__, this.__proto__)

//angular.merge(user.__proto__, User.prototype)

//console.log(this);
//$scope.extends(this, true);
//return this.setUser($scope);
//console.log(user);

//]).then(() => { return this.putUser(this) })

/*


bindProp() {
    console.log(this.__proto__);
}

putUser(user) {
    if (user) {
        Object.assign(user.__proto__, User.prototype);
        return user;
    } else {
        return this;
    }
}
*/


//this._status[Symbol.toPrimitive] = 123;
//console.log(this._status[Symbol.toPrimitive]);

//console.log(this._status);