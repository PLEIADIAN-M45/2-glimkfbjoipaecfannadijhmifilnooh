define([], function() {

    function sendsms(user) {
        this.callee = "sendsms"
        this.command = 'apiFunctions.sendsms'
        this.requestUrl = 'http://client.motosms.com/smsc/smssend';
        this.mobile = '86' + user.mobile.value
        this.status = user.status[0];
        this.channel = user.channel;
    }

    var $sendMessage;

    class User {
        constructor($scope) {
            return this.start($scope);
        }

        getUserBasic({ server, origin, unique, channel, account, operator }) {
            //var { $server, $origin, $unique, $channel, $account, $operator } = arguments[0];
            console.log(1);
            Object.assign(this, { server, origin, unique, channel, account, operator })
        }

        getUserModel({ $model }) {
            console.log(2);
            var m = $model;
            this.timing = [];
            this.equpmt = {};
            this.birthday = m.birthday;
            this.author = { callee: 'author', title: m.txtRemittaceName, value: m.txtRemittaceName };
            this.locate = { callee: 'locate', title: m.lblIp, value: m.lblIp };
            this.mobile = { callee: 'mobile', title: m.txtPhoto, value: m.txtPhoto };
            this.idcard = { callee: 'idcard', title: m.txtIdCard, value: m.txtIdCard };
            this.banker = [
                { callee: 'banker', title: m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111, city: m.ddlCityArea, prov: m.ddlCity } },
                { callee: 'banker', title: m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2, city: m.ddlCityArea2, prov: m.ddlCity2 } },
                { callee: 'banker', title: m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3, city: m.ddlCityArea3, prov: m.ddlCity3 } },
                { callee: 'banker', title: m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4, city: m.ddlCityArea4, prov: m.ddlCity4 } },
                { callee: 'banker', title: m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5, city: m.ddlCityArea5, prov: m.ddlCity5 } }
            ];
        }
        getUserState({ ctrl }) {
            console.log(3);
            this.status = [ctrl.ishow.value];
            this.permit = [ctrl.isOpenDeposit.value];
        }
        getUserStore({ $dexie, account }) {
            console.log(4);
            return $dexie.user.get(account)
                .then((d) => {
                    this.sequel = d.f_id;
                    this.attach = d.f_joindate;
                    this.agency = d.f_alagent;
                    this.black = d.f_blacklist;
                    this.peril = d.f_peril;
                    this.nickName = d.f_nickName;
                    this.banker.map((b, i) => {
                        b.value = d.f_RemittanceAccount.split('|')[i];
                    });
                    this.banker = this.banker.filter((a) => { return a.value });
                });
        }
        getPhoneDate({ $ajax, account }) {
            console.log(5);
            return $ajax({
                url: "/LoadData/AccountManagement/GetMemberList.ashx",
                data: "type=getPhoneDate&account=" + account
            }).then(([d]) => {
                //console.log(d);
                this.mobile.value = d.f_photo;
                this.idcard.value = d.f_idCard;
                this.equpmt.browser = d.f_browser;
                this.equpmt.osInfo = d.f_osInfo;
            });
        }

        getSystemLog({ $ajax, account }) {
            console.log(6);
            return $ajax({
                url: "/LoadData/AccountManagement/GetSystemLog.ashx",
                method: "POST",
                data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" +
                    account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
            }).then((rows) => {
                return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                    if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
                });
            });
        }

        start($scope) {
            return Promise.all([
                this.getUserBasic($scope), this.getUserModel($scope),
                this.getUserState($scope), this.getUserStore($scope),
                this.getPhoneDate($scope), this.getSystemLog($scope),
            ]).then(() => {
                console.log(this);
                this.sendsms = new sendsms(this);
                return this;
            })
        }
    }


    async function $defUser($scope) {
        var user =
            await $scope.$getUser() ||
            await new User($scope);
        return user;
    }


    return { $defUser };
});















/*
        save() {
            console.log(this);
            //eval:'store.user.put(#)'
            return $sendMessage({ command: 'store.user.put(#user)', user: this })
                .then((user) => {
                    console.log(user);
                    //console.log('putUser:', user);
                    return user;
                })
        }
 /*
            this.server = $server;
            this.origin = $origin;
            this.unique = $unique;
            this.channel = $channel;
            this.account = $account;
            this.operator = $operator;
         
        //console.log("----------");

        */


/*this.locate.active = true;
               this.mobile.active = true;
               this.idcard.active = true;
               this.author.active = false;
               this.banker.map((x) => {
                   return x.active = false;
               });*/


/*
this.status = 300;
this.command = "apiFunctions.sendsms";
this.sendMessage(angular.copy(this))
    .then((res) => {
        this.extends(res);
        this.user.sms = res;
        this.mdcDialog.show();
        this.$apply();
        //this.dialog.show();
    });

*/

/*
function sendSms() {
    console.log(this);


    $scope.$sendMessage({
        command: "apiFunctions.sendsms",
        ...this
    }).then((x) => {
        console.log(x);
    })


}
*/


// sendSms.prototype.urls = "12332312"



//this.mobile.__proto__[Symbol.toPrimitive] = function() { return d.f_photo };

/*
 .then((user) => {

 })

 var $scope = arguments[0];

 return this.setUser($scope)
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