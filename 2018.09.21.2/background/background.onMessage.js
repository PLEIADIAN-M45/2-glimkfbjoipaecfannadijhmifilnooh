chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    //var ___name = apis[request.command].name;
    /*************************************************************************************/
    apis[request.caller](...request.params).then((res) => {
        console.log(request.caller, ":::", res);
        sendResponse(res);
    });
    return true;
})




var dexie = new Dexie('evo');
dexie.version(5).stores({ user: 'unique', GB2260: 'code' });


var apis = {};
apis.getUser = function(params) {
    return dexie.user.get(params);
};
apis.putUser = function(params) {
    return dexie.user.put(params);
};
apis.delUser = function(params) {
    return dexie.user.delete(params);
};


apis.sendSms = function(user) {

    var content = global.sms.get(Number(user.channel)) || global.sms.get(user.channel);
    var mobile = "86" + user.mobile.value;
    //var status = user.status;
    //console.log(mobile, content);

    return $.ajax({
        url: 'http://client.motosms.com/smsc/smssend',
        dataType: "html",
        method: 'post',
        data: { sender: '', phones: mobile, smscontent: content, taskType: 1, taskTime: '', batch: 1, splittime: 0, packid: '' }
    }).then((res, b, c) => {
        var status;
        if (res.match(/(msg = '')/)) { status = 200; }
        if (res.match(/(會員登錄)/)) { status = 401; }
        if (res.match(/(msg = '101')/)) { status = 101; }
        if (res.match(/(msg = '102')/)) { status = 102; }
        user.sendSms = status;
        apis.putUser(user);
        console.log(user);
        return user;
        //return { mobile, content, status }
        //sendResponse(status);
    });
};


apis.xmlSpider = function(params) {
    // console.log(params);
    return xmlSpider[params.action].call(params)
};

var xmlSpider = {}

xmlSpider.btnUserSet = async function() {
    console.log(this);
    console.log(this.user);
    /**********************************************************************/
    if (this.user == undefined) { return Promise.resolve(1) }
    if (this.user.module) { return Promise.resolve(1) }
    if (this.user.permit[0] == this.sendData.isOpenDeposit) { return Promise.resolve(1) }
    if (this.respData != "u-ok") { return Promise.resolve(1) }
    /**********************************************************************/
    this.user.module = (this.user.status[0] == 3) ? "authorize" : "suspended";
    if (this.sendData.ishow == 3 && this.sendData.isOpenDeposit == 1) { this.sendData.ishow = 1; }
    this.user.status.push(this.sendData.ishow)
    this.user.permit.push(this.sendData.isOpenDeposit)
    this.user.timing.push(this.timeSpan)
    this.user.timing.timeDiff();
    if (this.user.status[0] == 3 || this.user.status[1] == 1) {
        this.user.sendSms = true;
    }
    return apis.putUser(this.user);
}


/*
function timeDiff(t1, t2, unit) {
    t1 = moment(t1).format("YYYY-MM-DD HH:mm:ss")
    t2 = moment(t2).format("YYYY-MM-DD HH:mm:ss")
    this[2] = moment(this[1]).diff(moment(this[0]), "minutes", true);
    return this;
}
*/
/*
xmlSpider.getmodel = function() {
    console.log(this);
}
*/


/*
 var apis = [];

 apis[0] = function getUser(params) {
     //console.log("getUser");
     return dexie.user.get(params);
 };
 apis[1] = function putUser(params) {
     //console.log("petUser");
     return dexie.user.put(params);
 };
 apis[2] = function delUser(params) {
     //console.log("delUser");
     return dexie.user.delete(params);
 };

 apis[3] = null;
 apis[4] = null;
 apis[5] = null;
 apis[6] = null;
 apis[7] = null;
 apis[8] = null;
 apis[9] = null;

 apis[10] = null;
 apis[11] = null;
 apis[12] = null;
 apis[13] = null;
 apis[14] = null;
 apis[15] = null;

*/

/*
 apis[20] = function xmlSpider(params) {
     if(xmlSpider[params.action]) {
         return xmlSpider[params.action].call(params)
     } else {
         return Promise.resolve(1)
     }


     return new Promise((resolve, reject) => {})
     console.log(params);
     return Promise.resolve(1)


 };;


 apis[21] = function(xmlSpider, user) {
     console.log(xmlSpider, user);
     if(xmlSpider.respData == "u-ok" && !user.module) {
         user.module = (user.status[0] == 3) ? "authorize" : "suspended";
         user.status.push(xmlSpider.sendData.ishow)
         user.permit.push(xmlSpider.sendData.isOpenDeposit)
         user.timing.push(xmlSpider.timeSpan)
         user.timing.timeDiff();
         if(user.status[0] == 3 || user.status[1] == 1) { user.sendSms = true; }
         return apis[1](user);
     } else {
         return Promise.resolve(1)
     }
 };*/

/*
 var xmlSpider = {}
 xmlSpider.btnUserSet = async function() {
     //console.log(this);
     if(this.respData == "u-ok") {

         var unique = [this.sendData.account, this.channel].toUnique();

         var user = await this.user.get(unique);

         if(user.module) { return } else {
             if(user.permit[0] == this.sendData.isOpenDeposit) {
                 return;
             } else {
                 user.module = (user.status[0] == 3) ? "authorize" : "suspended";
                 if(this.sendData.ishow == 3 && this.sendData.isOpenDeposit == 1) { this.sendData.ishow = 1; }
                 user.status.push(this.sendData.ishow)
                 user.permit.push(this.sendData.isOpenDeposit)
                 user.timing.push(this.timeSpan)
                 user.timing.timeDiff();

                 if(user.status[0] == 3 || user.status[1] == 1) {
                     user.sendSms = true;
                 }

             }
         }
     }
 }

*/




chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);

})

Array.prototype.timeDiff = function(unit) {
    this[0] = moment(this[0]).format("YYYY-MM-DD HH:mm:ss")
    this[1] = moment(this[1]).format("YYYY-MM-DD HH:mm:ss")
    this[2] = moment(this[1]).diff(moment(this[0]), "minutes", true);
    return this;
}