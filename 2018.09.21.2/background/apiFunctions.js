function json(a) { return (typeof a == 'string') ? JSON.parse(a) : JSON.stringify(a); }

function pathOf(url) { return url.split('/').pop(); }

function $serializeParameters(str) {
    var obj = {};
    str.split('?')[1].split('&').map((x) => { return x.split('=') }).map(([name, value]) => {
        obj[name] = value;
    })
    return obj;
}

function format(t) { if (t) { return moment(t).format('YYYY/MM/DD HH:mm:ss') } else { return t } };

var assign = Object.assign;
var counter = { locate: 0, mobile: 0, idcard: 0 };
var search = {
    idcard: function(value) {
        return undefined;
    },
    author: function(value) {
        return evo.decoder(localStorage.author).find((d) => {
            return trim(d[0]) == value;
        })
    },
    banker: function(value) {
        return evo.decoder(localStorage.banker).find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    mobile: function(value) {
        return evo.decoder(localStorage.mobile).find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    locate: function(value) {
        return evo.decoder(localStorage.locate).find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    danger: function(value) {
        return evo.decoder(localStorage.danger).find((d) => {
            return value.includes(trim(d[0]))
        })
    },
    notice: function(value) {
        return evo.decoder(localStorage.notice).find((d) => {
            return value.includes(trim(d[0]))
        })
    },
    region: function({ prov, city, area, ctry, property }) {
        var value = Object.values({ prov, city, area, ctry }).toString();
        return evo.decoder(localStorage.region).find((d) => {
            return value.includes(trim(d[0]))
        })
    }
}



//evo.store.user.where(["account", "channel"]).equals([account, channel]).modify((value, ref) => { console.log(value, ref); })
//var parameters = $serializeParameters(sender.url);
//var account = parameters.member || parameters.AccountID;
//var { value, property, account, channel, host, region } = request;


function apiFunctions(request, sender, sendResponse) {

    Object.assign(this, request);

    switch (this.property) {
        case "author":
            var result = { negative: { sheets: search.author(this.value) || false } };
            return sendResponse([result]);
        case "banker":
            var result = {
                negative: {
                    region: search.region(this) || false,
                    sheets: search.banker(this.value) || false
                }
            };
            return sendResponse([result]);
        case "locate":
        case "idcard":
        case "mobile":
            var module = this[this.property][this.host].call(request);
            module.settings.timeout = 5000;
            module.settings.url = module.settings.url.replace('@', window.origins.get(this.channel));
            module.settings.data = (module.settings.url.includes("ku711")) ? json(module.settings.data) : module.settings.data;
            //(this.channel == "16") ? json(module.settings.data): module.settings.data;
            //console.log(module);
            //console.log(module.settings.url.split('.')[1]);
            module.carrer = module.settings.url.split('.')[1];
            $.ajax(module.settings)
                .done((data, status, xhr) => {
                    var result = module.callback(data);
                    result.negative = {
                        region: search.region(result) || false,
                        sheets: search[this.property](this.value) || false
                    }
                    sendResponse([result, status])
                }).fail((xhr, status, error) => {
                    var result = {
                        error: status,
                        prov: null,
                        city: null,
                        ctry: null,
                        area: null,
                        meta: module.carrer
                    };
                    result.negative = {
                        region: true,
                        sheets: search[this.property](this.value) || false
                    }
                    sendResponse([result, status]);
                });
            break;
        case "member":
            var module = this[this.property][this.host].call(request);
            module.settings.timeout = 5000;
            module.settings.url = module.settings.url.replace('@', window.origins.get(this.channel));
            //module.settings.data = (this.channel == "16") ? json(module.settings.data) : module.settings.data;
            module.settings.data = (module.settings.url.includes("ku711")) ? json(module.settings.data) : module.settings.data;

            //console.log(module);

            $.ajax(module.settings)
                .done((data, status, xhr) => {
                    var result = module.callback(data);
                    sendResponse([result, status]);
                })

            break;
        default:
            // statements_def
            break;
    }

}

apiFunctions.prototype.mobile = {};
apiFunctions.prototype.idcard = {};
apiFunctions.prototype.locate = {};
apiFunctions.prototype.member = {};
apiFunctions.prototype.alerts = {};
apiFunctions.prototype.sendsms = {};
apiFunctions.prototype["mobile"]["ku711"] = function() {
    return {
        settings: { "method": 'post', "dataType": 'json', "url": '@/Member/api/MemberInfoManage/GetVerifyPhoneLocal', "data": { "Name": this.account, "AccountID": this.account, "CellPhone": this.value, "EnabledVerified": true, "Identitycard": "", "VerifyUsage": 13 }, },
        callback: function(res) {
            var d = res.Data;
            return { "meta": d.Cardtype, "prov": d.Province, "city": d.City }
        }
    }
}
apiFunctions.prototype["mobile"]["wa111"] = function() {
    return {
        settings: {
            "dataType": 'json',
            "url": '@/LoadData/AccountManagement/GetInfoAPI.ashx',
            "data": { 'type': 'getPhone', 'phone': this.value, 'account': this.account, _: new Date().getTime() }
        },
        callback: function(res) {
            var str = res.msg.replace('<br />', '<br/>').split('<br/>');
            var arr = str[0].split('&nbsp;');
            return { "prov": arr[0], "city": arr[1], "meta": str[1] }
        }
    }
}
apiFunctions.prototype["member"]["ku711"] = function() {
    var { index = 1, banker = "", mobile = "", idcard = "", author = "", time } = this;
    return {
        callback: function(res) {
            var d = res.Data;
            return { "rows": d.Data, "records": d.Pager.PageCount, "total": d.TotalItemCount, index }
        },
        settings: {
            "dataType": 'json',
            "method": 'post',
            "url": '@/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
            "data": {
                "AccountID": "",
                "IDNumber": idcard,
                "RigistedIP": "",
                "TotalDepositAmount": null,
                "AccountNumber": "",
                "AccountName": author,
                "Email": "",
                "PhoneVerified": null,
                "IDVerified": null,
                "MinDeposit": null,
                "MaxDeposit": null,
                "StartRegistedTime": "",
                "EndRegistedTime": "",
                "PageNumber": index - 1,
                "RecordCounts": 20,
                "OrderField": "",
                "Desc": "true",
                "TotalDepositBonus": null,
                "AccountBookLevel": "",
                "AliPayLevel": "",
                "WeChatLevel": "",
                "CellPhone": mobile,
                "IsBlackList": null,
                "LevelType": null,
                "MemberStatus": null,
                "IsFisrstDeposit": null,
                "MemberMemoType": null,
                "TransferOutStatus": null,
                "IsLogIn": null,
                "AgencyID": "",
                "TestType": null,
                "PayeeAccountNo": banker,
                "LineType": "",
                "AccountingType": null,
                "ManageAccountID": "",
                "NickName": ""
            }
        }
    }
}
apiFunctions.prototype["member"]["wa111"] = function() {
    var { index = 1, banker = "", mobile = "", idcard = "", author = "", account = "", time } = this;
    return {
        callback: function(res) {
            return assign(res, { index });
        },
        settings: {
            "dataType": 'json',
            "url": '@/LoadData/AccountManagement/GetMemberList.ashx',
            "data": {
                "f_BankAccount": banker,
                "txtPhoto": mobile,
                "txtIdCard": idcard,
                "f_RemittanceName": author,
                "f_Account": account,
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
                "pageIndex": index,
                "hidevalue_RecordCount": 0,
                "type": "getAllUser",
                "_": this.time
            }
        }
    }
}
apiFunctions.prototype["alerts"]["ku711"] = function() {
    return {
        settings: {
            "method": 'post',
            "dataType": 'json',
            "url": '@/member/api/AlertInfoManage/GetMemberAlertInfoBackendByMultiplayer',
            "data": this.params
        },
        callback: function(res) {
            return { "list_Accounts": res.Data }
        }
    }
}
apiFunctions.prototype["locate"]["evo"] = function() {
    function pconline() {
        return {
            settings: {
                "dataType": 'html',
                "url": 'http://whois.pconline.com.cn/ipJson.jsp',
                "data": { ip: this.value },
            },
            callback: function(d) {
                window.IPCallBack = function(d) {
                    try {
                        if (d.proCode == "999999") {
                            return { meta: 'pconline', "prov": d.pro, "city": d.city, "ctry": d.addr }
                        } else { return { meta: 'pconline', prov: d.pro, city: d.city, area: d.region } }
                    } catch (ex) {
                        return { meta: 'pconline' }
                    }
                };
                return eval(d);
            }
        }
    }

    function baidu() {
        return {
            settings: { "dataType": 'json', "url": 'https://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974', "data": { "ip": this.value }, },
            callback: function(d) {
                try {
                    return { "meta": 'baidu', "prov": d.content.address_detail.province, "city": d.content.address_detail.city, "ctry": d.address.split('|')[0].replace('CN', '中国') }
                } catch (ex) { return { meta: 'baidu' } }
            }
        }
    }

    function ipapi() {
        return {
            settings: { "dataType": 'json', "url": 'http://ip-api.com/json/' + this.value + '?fields=520191&lang=zh-CN', },
            callback: function(d) {
                try {
                    return { "meta": 'ipapi', "prov": d.regionName, "city": d.city, "ctry": d.country }
                } catch (ex) { return { meta: 'ipapi' } }
            }
        }
    }

    function taobao() {
        return {
            settings: {
                "dataType": 'json',
                "url": 'http://ip.taobao.com/service/getIpInfo.php',
                "data": { ip: this.value },
            },
            callback: function(res) {
                try {
                    var d = res.data;
                    return { meta: 'taobao', prov: d.region.replace('XX', ''), city: d.city.replace('XX', ''), ctry: d.country.replace('XX', '') }
                } catch (ex) { return { meta: 'taobao' } }
            }
        }
    }
    var modules = [pconline, baidu, ipapi, taobao];
    var c = (counter.locate++) % (modules.length);
    return modules[c].call(this);
}
apiFunctions.prototype["idcard"]["evo"] = function() {
    var GBMAP = new Map(evo.decoder(localStorage["gb2260"]));
    var [$1, $2, $3, $4, $5, $6, $7] = this.value.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, ['$10000', '$1$200', '$1$2$3', '$4-$5-$6', '$7', '$8', '$4年$5月$6日']).split(',');
    var sex = (Number($5) % 2 == 1) ? '男性' : '女性',
        age = moment().diff(moment($4), 'years') + '岁',
        birth = moment($4).locale('zh-tw').format('LL');
    return {
        settings: { url: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/idcard' },
        callback: function() {
            return {
                "prov": GBMAP.get(Number($1)),
                "city": GBMAP.get(Number($2)),
                "area": GBMAP.get(Number($3)),
                "meta": [birth, sex, age].join('/')
            }
        }
    }
}

apiFunctions.prototype["sendsms"]["motosms"] = function() {
    var { account, mobile, status, channel, operator } = this.params;
    if (channel == undefined) { return false }
    if (mobile == undefined) { return false }
    if (mobile.includes('*') == undefined) { return false }
    var smss = new Map(evo.decoder(localStorage.sms));
    if (smss == undefined) { return false };
    var message = smss.get(Number(channel));
    if (message == undefined) { return false }
    var countrycode = { "16": "86", "26": "86", "35": "86", "17": "86", "21": "886", "35": "886", "2": "886" } [channel];
    if (countrycode == undefined) { return false }
    var mobile = countrycode + mobile;
    return {
        settings: {
            "dataType": 'html',
            "method": 'post',
            "url": 'https://client.motosms.com/smsc/smssend',
            "data": { "sender": '', "phones": "mobile", smscontent: "message", "taskType": 1, "taskTime": '', "batch": 1, "splittime": 0, "packid": '' }
        },
        callback: function(res) {
            if (res.match(/(會員登錄)/)) { var status = 3; }
            if (res.match(/(msg = '')/)) { var status = 0; }
            if (res.match(/(msg = '101')/)) { var status = 101; }
            if (res.match(/(msg = '102')/)) { var status = 102; }
            return { operator, account, channel, message, mobile, status }
        }
    }
}


apiFunctions.prototype["idcard"]["ku711"] = apiFunctions.prototype["idcard"]["evo"];
apiFunctions.prototype["idcard"]["wa111"] = apiFunctions.prototype["idcard"]["evo"];
apiFunctions.prototype["locate"]["ku711"] = apiFunctions.prototype["locate"]["evo"];
apiFunctions.prototype["locate"]["wa111"] = apiFunctions.prototype["locate"]["evo"];
















/*
var b = evo.search.author('杨吉')
var b = evo.search.banker('62170008500012323')
var b = evo.search.locate('116.20.60.169')
var b = evo.search.danger('他是打水套利客')
var b = evo.search.region('台灣省')
console.log(b);
*/