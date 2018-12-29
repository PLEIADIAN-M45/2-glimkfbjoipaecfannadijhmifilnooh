define(["app.sendSms"], function(sendSms) {

    return class User {

        constructor($scope) {
            $scope.extends(this, true);
            //console.log(this.__proto__);
            //return this.getUser().then((user) => { return user || this.build(); })
        }

        getUser() {

        }

        getUserBasic() {
            ['server', 'origin', 'unique', 'channel', 'account', 'operator'].forEach((name) => { this[name] = this.__proto__[name]; });
        }

        getUserState(m) {
            var m = this.model;
            this.status = [m.ishow.value];
            this.permit = [m.isOpenDeposit.value];
            //this.sms = { status: m.ishow.value }
        }

        getUserStore() {
            return this.dexie.user.get(this.account).then((d) => {
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

        getPhoneDate() {
            return this.ajax({
                url: "/LoadData/AccountManagement/GetMemberList.ashx",
                data: "type=getPhoneDate&account=" + this.account
            }).then(([d]) => {
                this.mobile.value = d.f_photo;
                this.idcard.value = d.f_idCard;
                this.equpmt.browser = d.f_browser;
                this.equpmt.osInfo = d.f_osInfo;
            });
        }

        getSystemLog() {
            return this.ajax({
                url: "/LoadData/AccountManagement/GetSystemLog.ashx",
                method: "POST",
                data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + this.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
            }).then((rows) => {
                return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                    if(f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return this.timing[0] = f_time; }
                });
            });
        }

        getUserModel(m) {
            var m = this.model;
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

        sendSms() {
            console.log(this);
        }

        build() {
            return Promise.all([
                this.getUserBasic(), this.getUserModel(),
                this.getUserState(), this.getUserStore(),
                this.getPhoneDate(), this.getSystemLog(),
            ]).then(() => { return this.putUser(this) })
        }
    }


})



/*
var d = Date.prototype;
d.__defineGetter__("year", function() {
    console.log(this);
    return this.getFullYear();
});
d.__defineSetter__("year", function(y) { this.setFullYear(y); });



*/

/*
function Dog(name) {
    this.name = name;
    return Dog.now();
}

Dog.prototype.run = function() {
    return this.name + ' is running!'
}

Dog.now = function() {
    return Date.now()
}



var c = new Dog("happy")


console.log(c);


var c = new Date()

console.log(c);

console.log(c.getDate());
*/


var obj = {};

var readCallback = function() {
    console.log('name was read');
}

obj.__defineGetter__('name', readCallback);

console.log(obj.name); // 读取 name 属性后，会调用上面的函数。

var reassignCallback = function(val) { // 新值会作为参数传进来
    console.log('name was assigned again with : ' + val);
};

obj.__defineSetter__('name', reassignCallback);

obj.name = 'name'; // 修改 name 属性后，会调用上面的函数。

var lookupGetFun = obj.__lookupGetter__('name'); // 返回上面我们设置的 Getter函数
console.log(lookupGetFun === readCallback) // 输出 true

var lookupSetFun = obj.__lookupSetter__('name'); // 返回上面我们设置的 Setter函数
console.log(lookupSetFun === reassignCallback) // 输出 true

obj.__proto__.constructor === Object // 因为 obj 的原型式 Object ，因此输出 true

var hasNameProp = obj.hasOwnProperty('name') // 输出 true

obj.isPrototypeOf(Object);

var secondObj = {};
secondObj.__proto__.isPrototypeOf(obj)
// 因为 secondObj 和 obj 是共用一个原型，因此输出 true

var isNameEnumerable = obj.propertyIsEnumerable('name');





