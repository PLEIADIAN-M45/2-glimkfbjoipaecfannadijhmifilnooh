define(["app.sendSms"], function(sendSms) {


    class User {

        constructor(args) {
            //args.setUser = this.setUser;
            //return this.setUser(args)
            return args.getUser()
        }

        openDeposit($scope, e) {
            e.currentTarget.hide();
            $scope.ctrl.isOpenDeposit.val(1);
            $scope.ctrl.btnSaveInfo.click();
        }

        getUserBasic({ $server, $origin, $unique, $channel, $account, $operator }) {
            console.log($server, $origin, $unique, $channel, $account, $operator);
            this.server = $server
            this.origin = $origin
            this.unique = $unique
            this.channel = $channel
            this.account = $account
            this.operator = $operator
            //['server', 'origin', 'unique', 'channel', 'account', 'operator'].forEach((name) => { this[name] = this[name]; });
        }

        getUserState({ ctrl }) {
            this.status = [ctrl.ishow.value];
            this.permit = [ctrl.isOpenDeposit.value];
            this.sms = { status: ctrl.ishow.value };
        }

        getUserStore({ $dexie, $account }) {
            return $dexie.user.get($account)
                .then((d) => {
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

        getPhoneDate({ $ajax, $account }) {
            return $ajax({
                url: "/LoadData/AccountManagement/GetMemberList.ashx",
                data: "type=getPhoneDate&account=" + $account
            }).then(([d]) => {
                //console.log(d);
                this.mobile.value = d.f_photo;
                this.idcard.value = d.f_idCard;
                this.equpmt.browser = d.f_browser;
                this.equpmt.osInfo = d.f_osInfo;
            });
        }

        getSystemLog({ $ajax, $account }) {
            return $ajax({
                url: "/LoadData/AccountManagement/GetSystemLog.ashx",
                method: "POST",
                data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" +
                    $account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
            }).then((rows) => {
                return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                    if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
                });
            });
        }

        getUserModel({ model }) {
            var m = model;
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

        setUser(args) {

            console.log(this);

            /*
            return Promise.all([
                this.getUserBasic(args),
                this.getUserModel(args),
                this.getUserState(args),
                this.getUserStore(args),
                this.getPhoneDate(args),
                this.getSystemLog(args),
            ]).then(() => {
                return args.putUser(this)
            })*/
        }
    }

    return User;
});






//this.mobile.__proto__[Symbol.toPrimitive] = function() { return d.f_photo };

/*
 .then((user) => {

 })

 var args = arguments[0];

 return this.setUser(args)
 */

/*
.then((user) => {
    console.log(user);
})
*/

/*
$scope.extends(this, true);
return $scope.getUser().then((user) => {
    if(user) { user.__proto__ = this.__proto__; return user } else {
        return this.setUser($scope);
    }
})*/


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