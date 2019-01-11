chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {

    if(sender.tab.url.includes("127.0.0.1")) { window.isLocal = true; }

    //var ___name = apis[request.command].name;
    /*************************************************************************************/
    //console.log(request.params[0], typeof request.params[0]);
    //console.log(request);

    apis[request.caller](...request.params).then((res) => {
        //apis[request.caller].call(...request.params).then((res) => {
        //console.log(request.caller, ":::", res);
        //console.log(request.caller, ":::");
        sendResponse(res);
    });

    return true;
})



var dexie = new Dexie('evo');
dexie.version(5).stores({ user: 'unique', GB2260: 'code' });


var apis = {};

apis.getLocalStorage = function(params) {
    return Promise.resolve(window.localStorage);
};

apis.getUser = function(params) {
    return dexie.user.get(params);
};
apis.putUser = function(params) {
    return dexie.user.put(params);
};
apis.delUser = function(params) {
    return dexie.user.delete(params);
};

apis.sendSms = function(params) {
    var content = global.sms.get(Number(params.channel)) || global.sms.get(params.channel);
    var mobile = "86" + params.mobile.value;
    return $.ajax({
        url: 'http://client.motosms.com/smsc/smssend',
        dataType: "html",
        method: 'post',
        data: { sender: '', phones: mobile, smscontent: content, taskType: 1, taskTime: '', batch: 1, splittime: 0, packid: '' }
    }).then((res, b, c) => {
        var status;
        if(res.match(/(msg = '')/)) { status = 200; }
        if(res.match(/(會員登錄)/)) { status = 401; }
        if(res.match(/(msg = '101')/)) { status = 101; }
        if(res.match(/(msg = '102')/)) { status = 102; }
        params.sendSms = status;
        return apis.putUser(params);
    });
};



apis.region = function(params) {
    //console.log(params);
    //global["banker"].push(["6217856300"])
    //global.locate.push(["223.104.33.115"])
    //global.region.push(["合肥"])
    //global.author.push(["贾波"])

    //params.time = Date.now();
    return apis.region[params.caller].call(params)
        //.then(apis.region.check)
        .then((region) => {
            //console.log(region);
            region.alarm = apis.blacklist.call(params)
            region.alert = apis.region.check(region)
            return { region }

            //
            //return apis.region.check.call(res);
        })
};

apis.blacklist = function() {
    var $global = global[this.caller] || [];
    //console.log($global);
    switch (this.caller) {
        case "author":
            return $global.find(([val]) => { return this.value == val }) || false;
        case "mobile":
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
        case "idcard":
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
        case "banker":
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
        case "locate":
            //console.log($global);
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
        default:
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
    }
}

apis.region.check = function(region) {

    if(region) {
        return global.region.find(([elem]) => {
            return Object.values(region).toString().includes(elem);
        }) || false;

        //if(this.age < 18) { this.alert = true }
    } else {
        return true;
    }

    /*
    return true;


    if(this) {
        this.alert = global.region.find(([elem]) => {
            return Object.values(this).toString().includes(elem);
        }) || false;
        if(this.age < 18) { this.alert = true }
    } else {
        this.alert = true;
    }
    //res.alarm = this.compare();
    return this;*/
}



apis.member = function(request) {

    if(!window.baseUrl) {

        window.baseUrl = {
            "0": "http://chrome.evo.net",
            "26": "http://host26.wa111.net",
            "35": "http://host35.wa111.net",
            "17": "http://host17.wa111.net",
            "16": "https://bk.ku711.net"
        }
    }

    // console.log(window.baseUrl);

    var { banker = "", mobile = "", idcard = "", author = "" } = request;

    Object.assign(request, { banker, mobile, idcard, author });

    request.requestUrl = window.baseUrl[request.channel];

    //console.log(request.requestUrl);

    return apis.member[request.server].call(request)
}

apis.member.wa111 = function() {

    return $.ajax({
        "dataType": 'json',
        "url": this.requestUrl + '/LoadData/AccountManagement/GetMemberList.ashx',
        "data": {
            "f_BankAccount": this.banker,
            "txtPhoto": this.mobile,
            "txtIdCard": this.idcard,
            "f_RemittanceName": this.author,
            "f_Account": "",
            "txtAlipayAccount": "",
            "txtEmail": "",
            "txtPickName": "",
            "txtChat": "",
            "ddlBankInfo": "",
            "zwrq": "",
            "zwrq2": "",
            "selSurplus": "",
            "selShow": "",
            "selIsDeposit": "",
            "selLevel": "",
            "selBank": "",
            "selMutualStatus": "",
            "ddlAliPay": "",
            "ddlWeChat": "",
            "ddlWarn": 0,
            "hidevalue_totals": "",
            "pageIndex": this.index,
            "hidevalue_RecordCount": 0,
            "type": "getAllUser",
            "_": Date.now()
        }
    }).then((res) => {
        //console.log(res);
        res.origin = this.requestUrl;
        res.index = this.index;
        res.list_RemittanceName = (res.rows && res.rows.length) ? res.rows[0].list_RemittanceName : [];
        return res;
        //Object.assign(this, res);
    })
}



apis.member.ku711 = function() {
    return $.ajax({
        "dataType": 'json',
        "method": 'post',
        "url": this.requestUrl + '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
        "data": angular.toJson({
            "AccountID": "",
            "IDNumber": this.idcard,
            "RigistedIP": "",
            "TotalDepositAmount": null,
            "AccountNumber": "",
            "AccountName": this.author,
            "Email": "",
            "PhoneVerified": null,
            "IDVerified": null,
            "MinDeposit": null,
            "MaxDeposit": null,
            "StartRegistedTime": "",
            "EndRegistedTime": "",
            "PageNumber": this.index - 1,
            "RecordCounts": 20,
            "OrderField": "",
            "Desc": "true",
            "TotalDepositBonus": null,
            "AccountBookLevel": "",
            "AliPayLevel": "",
            "WeChatLevel": "",
            "CellPhone": this.mobile,
            "IsBlackList": null,
            "LevelType": null,
            "MemberStatus": null,
            "IsFisrstDeposit": null,
            "MemberMemoType": null,
            "TransferOutStatus": null,
            "IsLogIn": null,
            "AgencyID": "",
            "TestType": null,
            "PayeeAccountNo": this.banker,
            "LineType": "",
            "AccountingType": null,
            "ManageAccountID": "",
            "NickName": ""
        })
    }).then(({ Data }) => {
        return {
            origin: this.requestUrl,
            index: this.index,
            rows: Data.Data,
            records: Data.Pager.PageCount,
            total: Data.TotalItemCount
        };
    }).then(apis.getMemberAlertInfoBackend)
}

apis.getMemberAlertInfoBackend = function(res) {
    if(res.rows && res.rows.length) {
        var baseUrl = (window.isLocal) ? chrome.runtime.getURL("/") : window.baseUrl[16];
        var Account = res.rows.map((x) => { return { "AccountID": x.AccountID, "AccountName": x.AccountName } })
        return $.ajax({
            "method": 'post',
            "dataType": 'json',
            "url": baseUrl + '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
            "data": angular.toJson({ "DisplayArea": "1", "Account": Account })
        }).then(({ Data }) => {
            //console.log(Data);
            if(Data) {
                res.list_RemittanceName = Data.AlertInfoAccountName;
                res.rows.map((x) => {
                    x.list_Accounts = Data.AlertInfoAccountId.filter((d) => {
                        //console.log(d);
                        return x.AccountID == d.AccountID
                    });
                    return x;
                })
            }
            return res;
        });
    } else {
        return res;
    }
}



apis.region.locate = function() {
    return $.ajax({
        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
        dataType: "json",
        data: {
            "query": this.value,
            "co": "",
            "resource_id": 6006,
            "t": Date.now(),
            "ie": "utf8",
            "oe": "gbk",
            "format": "json",
            "tn": "baidu",
            "_": Date.now()
        }
    }).then((res) => {
        console.log(res);
        //var region = {};
        if(res.status == 0) {
            var str = res.data[0].location;
            console.log(str);
            if(str) {
                str.replace(/(天津市|北京市|重庆市|上海市|.+省|.+自治区)?(.+自治州|.+区|.+市|.+县|.+州|.+府)?(.+区|.+市|.+县|.+州|.+府)?(\s*.*)/,
                    (match, prov, city, area, meta, offset, string) => {
                        if(!prov && !city && !area) {
                            this.region = { prov: meta }
                        } else {
                            this.region = { prov, city, area, meta }
                        }
                    });
            }
        }

        return this.region;
    })
}
apis.region.author = function() { return Promise.resolve({}); }

apis.region.banker = function() { return Promise.resolve(this.region); }

apis.region.idcard = function() {
    var IDParser = function(value) { return value.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, ['$10000', '$1$200', '$1$2$3', '$7', '$4-$5-$6']).split(",").map((x) => { return (isNaN(x)) ? x : Number(x) }) }
    var [$1, $2, $3, $4, $5] = IDParser(this.value);
    var prov = global.gb2260.get($1),
        city = global.gb2260.get($2),
        area = global.gb2260.get($3),
        sex = ($4 % 2 === 1) ? "男" : "女",
        age = moment().diff($5, "years"),
        bday = moment($5).locale('zh-tw').format('LL'),
        meta = [bday, sex, age + '岁'].join('/');
    this.region = { prov, city, area, sex, age, bday, meta };
    //console.log(this.region);
    return Promise.resolve(this.region);
}


apis.region.mobile = function() {
    return $.ajax({
        dataType: "json",
        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
        data: {
            "query": this.value,
            "co": "",
            "resource_id": 6004,
            "t": Date.now(),
            "ie": "utf8",
            "oe": "gbk",
            "format": "json",
            "tn": "baidu",
            "_": Date.now(),
        }
    }).then((res) => {
        if(res.status == 0) {
            var d = res.data[0];
            this.region = {
                city: d.city,
                prov: d.prov,
                meta: d.type || "baidu"
            };
        }
        return this.region;
    })
}


apis.GetSystemLog = function(origin, accounts, operator) {
    console.log(origin, accounts, operator);
    return $.ajax({
        dataType: "json",
        url: origin + "/LoadData/AccountManagement/GetSystemLog.ashx",
        data: {
            tabName: "",
            zwrq: "",
            pageIndex: "",
            f_target: "",
            f_handler: "",
            ddlType: 0,
            f_accounts: accounts,
            zwrq2: "",
            logType: "memberlog",
            f_number: null,
            type: null,
            selType: "",
            selShow: -1,
            txtID: "",
            selDengji: ""
        }
    }).then((res) => {
        console.log(res);
        //1.  用户状态   【审核中】   被修改为   【正常户】
        /*
        f_field: "f_ishow$log$f_intualStatus$log$f_depositStatus"
        f_newData: "1$log$1$log$1"
        f_oldData: "3$log$0$log$0"
        */
        var bc = res.rows.find(({ f_field, f_oldData, f_newData, f_handler }) => {
            return (f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus" &&
                f_newData == "1$log$1$log$1" &&
                f_oldData == "3$log$0$log$0" &&
                f_handler == "18CS222")
            //f_time  within 1 min
        })
        console.log(bc);

    })
}


/*
getmodel: 開通表
StopMember:
getDepositBonusList:
delDiceWinRecords:
DelDiceWinRecords:
-- -- -- -- -- -- -- -- -- -- -- -- -
UpdateMemberBonusLog
GetMemberBonusLogBackendByCondition
UpdateMemberRiskInfoAccountingBackend
UpdateMemberSNInfoBackend
UpdateMemberRisksInfoBackendIsFSuspension
CreateMemberInfoOperationLog
*/



window.cacheBonusData;
window.cacheUserData;

/*
btnUserSet -> "u-ok"
sendData 去比對稍候的 getmodel 的respData
*/

apis.updateUser = function(user, status, permit) {
    user.module = (user.status[0] == 3) ? "authorize" : "suspended";
    user.status.push(status)
    user.permit.push(permit)
    user.timing.push(Date.now())
    user.timing.timeDiff();

    if(user.status[0] == 3 || user.status[1] == 1) { user.sendSms = true; }
    apis.putUser(user);

}


apis.xmlSpider = async function(params) {
    //console.log(params);
    var { action, sendData, respData, server, unique, account, channel, operator, dataRows } = params;
    switch (action) {
        case "UpdateMemberRiskInfoAccountingBackend":
        case "btnUserSet":

        case "StopMember": //停權
        case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)
        case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"
            var user = await apis.getUser(unique); //即時更新會比較保險
        case "btnUserSet":
            apis.updateUser(user, sendData.ishow, sendData.isOpenDeposit)
        case "UpdateMemberRiskInfoAccountingBackend":
            apis.updateUser(user, sendData.MemberStatus, sendData.IsDeposit)

        case "StopMember": //停權
            if(respData == 2) {
                apis.updateUser(user, 2, 0)
            }
        case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"
            if(sendData.IsFSuspension == true) {
                apis.updateUser(user, 0, 0)
            }
        case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)

            apis.updateUser(user, sendData.MemberStatus, sendData.IsDeposit)

            console.log(user);
            console.log(".........");

            //updateUser(user, status, permit)


            break;


            //GetMemberRisksInfoBackendByAccountID
            //CreateMemberInfoOperationLog
            /*
        case "UpdateMemberRiskInfoAccountingBackend":
        case "btnUserSet":
            var user = await apis.getUser(unique); //即時更新會比較保險
            user.module = (user.status[0] == 3) ? "authorize" : "suspended";
            user.status.push(sendData.ishow || sendData.MemberStatus)
            user.permit.push(sendData.isOpenDeposit || sendData.IsDeposit)
            user.timing.push(Date.now())
            user.timing.timeDiff();
            if(user.status[0] == 3 || user.status[1] == 1) { user.sendSms = true; }
            console.log("+[DONE]+ ", user.module, user);
            return apis.putUser(user);
            //開通
        case "StopMember": //停權
            console.log("StopMember");
            console.log(params);
            if(respData == 2) {
                var user = await apis.getUser(unique);
                user.status.push(sendData.MemberStatus || 2)
                user.permit.push(sendData.IsDeposit || 0)
                user.timing.push(Date.now())
                user.timing.timeDiff();
                user.module = (user.status[0] == 3) ? "authorize" : "suspended";
                //審核中轉停權:開通表，或是其它狀態轉停權:停權表
                console.log("+[DONE]+ ", user.module, user);
                return apis.putUser(user);
            };
            break;
        case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)
            var user = await apis.getUser(unique);
            user.status.push(sendData.MemberStatus)
            user.permit.push(sendData.IsDeposit)
            user.timing.push(Date.now())
            user.timing.timeDiff();
            user.module = (user.status[0] == 3) ? "authorize" : "suspended";
            //審核中轉停權:開通表，或是其它狀態轉停權:停權表
            console.log("+[DONE]+ ", user.module, user);
            return apis.putUser(user);
            break;
        case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"
            var user = await apis.getUser(unique);
            if(sendData.IsFSuspension == true) {
                user.status.push(0)
                user.permit.push(0)
                user.timing.push(Date.now())
                user.timing.timeDiff();
                user.module = (user.status[0] == 3) ? "authorize" : "suspended";
                //審核中轉停權:開通表，或是其它狀態轉停權:停權表
                console.log("+[DONE]+ ", user.module, user);
                return apis.putUser(user);
            }
            break;

*/

            //禮金表列表
            /*刪除*/
            /*給點*/
        case "delDiceWinRecords":
        case "DelDiceWinRecords":
            console.log(params);
            if(respData == 1) { window.cacheBonusData = sendData }
            break;
        case "getDepositBonusList":
        case "DepositBonus":
            var bonus = respData.rows.find((d) => {
                return d.f_id == window.cacheBonusData.id //&& d.f_AdminName == operator
            });
            var unique = bonus.f_accounts + '-' + channel;
            var user = await apis.getUser(unique);
            user.bonus = bonus;
            user.module = "bonus:wa111";
            console.log(bonus);
            console.log(user);
            return apis.putUser(user);
            //console.log(respData.rows);
            break;


            //禮金表功能
        case "UpdateMemberBonusLog":
            //console.log(params);
            if(respData == 1) { window.cacheBonusData = sendData }
            break;


        case "GetMemberBonusLogBackendByCondition":

            var bonus = dataRows.find((d) => {
                return d.BonusNumber == window.cacheBonusData.BonusNumber
                //&& d.Creator == operator
            });

            var unique = bonus.AccountID + '-' + channel;
            var user = await apis.getUser(unique);

            console.log(unique, user);
            user.bonus = bonus;
            user.module = "bonus:ku711";
            console.log(bonus);



            break;
        default:
            console.log('reject', action);
            return Promise.reject(403)
            break;

    }



    /*
    //if (xmlSpider[action]) { Promise.reject(403) }

    console.log(params.action, params);
    console.log(xmlSpider[params.action]);

    if (xmlSpider[params.action]) {
        console.log(111);
        return xmlSpider[params.action](params, params)
        //return xmlSpider[params.action].call(params)
    } else {
        console.log(403);

        return Promise.reject(403)
    }
    */

    /*console.log(params.action);
    if (xmlSpider[params.action]) {
        return xmlSpider[params.action].call(params)
    }*/
};

//COMMANDER, SEND_DATA, RESP_DATA,


var xmlSpider = {};

xmlSpider.btnUserSet = async function({ sendData, respData, user, server }) {

    //console.log(COMMANDER, SEND_DATA, RESP_DATA, user);
    //console.log(this);

    console.log(sendData);
    console.log(respData);
    console.log(user);
    console.log(server);


    //var current_time = Date.now()
    //return Promise.resolve(1)
    /**********************************************************************/
    if(user == undefined) { return Promise.reject(1) }

    if(user.module) { return Promise.reject(1) }

    if(user.permit[0] == sendData.isOpenDeposit) { return Promise.reject(1) }

    if(respData != "u-ok") { return Promise.reject(1) }

    /**********************************************************************/
    user.module = (user.status[0] == 3) ? "authorize" : "suspended";

    if(sendData.ishow == 3 && sendData.isOpenDeposit == 1) { sendData.ishow = 1; }

    user.status.push(sendData.ishow)
    user.permit.push(sendData.isOpenDeposit)
    user.timing.push(Date.now())

    user.timing.timeDiff();

    if(user.status[0] == 3 || user.status[1] == 1) { user.sendSms = true; }

    console.log("[DONE] ", user.module);
    return apis.putUser(user);
}




xmlSpider.btnUserSet33 = async function() {

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