define(['apiFunction'], function(apiFunction) {

    function setUser() {
        this.user = {
            unique: this.unique,
            host: this.host,
            origin: this.origin,
            operator: this.operator,
            channel: this.channel,
            account: this.account
        }
        return Promise.all([
            apiFunction.getUserModel.call(this.user),
            apiFunction.getPhoneDate.call(this.user),
            apiFunction.getSystemLog.call(this.user),
            apiFunction.getUserStore.call(this.user)
        ]).then(this.putUser.bind(this))
    }

    return async function() {


        this.user = await this.getUser() || await setUser.call(this);
        console.log(this.user);
    }

});



//console.log(user);


function bindUser(a) {
    // console.log(this.user);
    return this.user
}

function s(a) { console.log(a); }







//ƒ invoke(fn, self, locals, serviceName)
/*this.setUser = function() {
    this.user = {
        unique: this.unique,
        host: this.host,
        origin: this.origin,
        operator: this.operator,
        channel: this.channel,
        account: this.account,
    }
    return Promise.all([
        apiFunction.getUserModel.call(this.user),
        apiFunction.getPhoneDate.call(this.user),
        apiFunction.getSystemLog.call(this.user),
        apiFunction.getUserStore.call(this.user)
    ]).then(putUser);
};*/



// console.time('label');

/*
this.user = await getUser();
console.log(this.user);
this.invoke();
*/

//console.log(this);
//console.timeEnd('label');




//var m                  = this.model;
/*this.user              = {
    unique               : this.unique,
    host                 : this.host,
    origin               : this.origin,
    operator             : this.operator,
    channel              : this.channel,
    account              : this.account,
    timing               : [],
    equpmt               : {},
    birthday             : m.birthday,
    status               : [m.ishow.value],
    permit               : [m.isOpenDeposit.value],
    author               : { title: m.txtRemittaceName, value: m.txtRemittaceName },
    locate               : { title: m.lblIp, value: m.lblIp },
    mobile               : { title: m.txtPhoto, value: m.txtPhoto },
    idcard               : { title: m.txtIdCard, value: m.txtIdCard },
    banker               : [
        { title          : m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
        { title          : m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } },
        { title          : m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } },
        { title          : m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } },
        { title          : m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }
    ]
};*/