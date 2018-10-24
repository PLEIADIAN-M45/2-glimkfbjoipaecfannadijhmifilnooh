//window.origins = new Map();
//console.log(window.origins);

window.origins = new Map();
origins.set('0', location.origin)
chrome.runtime.onConnectExternal.addListener(function(port) {
    var url = new URL(port.sender.url)
    window.origins.set(port.name, url.origin);
    console.log(port.name, url.origin);
    if (origins.size > 5) {
        //console.clear();
    }
    console.log(origins);
});


/*
if (!window.MockType) {}
*/

function json(a) { return (typeof a == 'string') ? JSON.parse(a) : JSON.stringify(a); }

function pathOf(url) { return url.split('/').pop(); }

function format(t) { if (t) { return moment(t).format('YYYY/MM/DD HH:mm:ss') } else { return t } };

var counter = { locate: 0, mobile: 0, idcard: 0 };


var assign = Object.assign;


var apiFunctions = function(request, sender, sendResponse) {

    //return sendResponse('暫停服務')
    var [commander, property, proxy, channel] = request.command.split(':');

    request.url = origins.get(channel);

    request.time = Date.now();


    //console.log(request);


    if (request.url) {

        if (proxy) {
            var module = this[property][proxy].call(request);

            console.log(module);
        } else {
            //var module = this[property].call(request);
        }
        //console.log(module);
        //var module = this[property + ':' + proxy].call(request);
        //console.log(module);
    } else {

        return sendResponse(['未连线', 'error'])
    }


    if (module.career == "ku711") {


        module.settings.data = json(module.settings.data);

        //console.log(module.settings.data);

    }


    try {

        module.settings.timeout = 5000;



        $.ajax(module.settings)
            .done(function(data, textStatus, xhr) {
                // console.log(data);
                try {
                    var result = module.callback(data);

                    result.career = module.career;

                    var status = result.status || textStatus;

                    if (['locate', 'idcard', 'mobile'].includes(property)) { result = { property, region: result } }

                    sendResponse([result, status, xhr])

                } catch (ex) {
                    sendResponse([null, 'error', xhr])
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                sendResponse([null, 'error'])
            });

    } catch (ex) {
        sendResponse([null, 'ex'])
        console.warn(ex);
    }
    return true;
}


apiFunctions.prototype.smsService = {};
apiFunctions.prototype.mobile = {};
apiFunctions.prototype.idcard = {};
apiFunctions.prototype.locate = {};
apiFunctions.prototype.Member = {};
apiFunctions.prototype.Alerts = {};
apiFunctions.prototype.MemberBonus = {};
apiFunctions.prototype.SystemLog = {};
apiFunctions.prototype.getPhoneDate = {};
apiFunctions.prototype.getAllUser = {};
/*
apiFunctions.prototype["getAllUser"]["wa111"] = function() {
    console.log(this);
    console.log(this.url);
    console.log(this.account);

    fetch(this.url + "/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=" + this.account + "&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=&pageIndex=1&hidevalue_RecordCount=0&type=getAllUser&_=" + this.time, {
            "method": "GET",
        }).then((res) => { return response.json() })
        .then((res) => {
            console.log(res);
            return res
        })
}*/

apiFunctions.prototype["Member"]["ku711"] = function() {
    var { index = 1, banker = "", mobile = "", idcard = "", author = "", time } = this;
    //console.log(index);
    return {
        career: 'ku711',
        callback: function(res) {
            //console.log(res);
            var d = res.Data;
            return {
                rows: d.Data,
                //index: d.Pager.PageNumber,
                records: d.Pager.PageCount,
                total: d.TotalItemCount
            }
        },
        settings: {
            dataType: 'json',
            method: 'post',
            url: this.url + '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
            data: {
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
apiFunctions.prototype["Member"]["wa111"] = function() {
    //console.log(this);
    var { index = 1, banker = "", mobile = "", idcard = "", author = "", account = "", time } = this;
    //console.log(index, banker, mobile, idcard, author, account);
    return {
        career: 'wa111',
        callback: function(res) {
            return assign(res, { index });
        },
        settings: {
            dataType: 'json',
            url: this.url + '/LoadData/AccountManagement/GetMemberList.ashx',
            data: {
                f_BankAccount: banker,
                txtPhoto: mobile,
                txtIdCard: idcard,
                f_RemittanceName: author,
                f_Account: account,
                txtAlipayAccount: "",
                txtEmail: "",
                txtPickName: "",
                txtChat: "",
                ddlBankInfo: "",
                zwrq: "",
                zwrq2: "",
                selSurplus: "",
                selShow: "",
                selIsDeposit: "",
                selLevel: "",
                selBank: "",
                selMutualStatus: "",
                ddlAliPay: "",
                ddlWeChat: "",
                ddlWarn: 0,
                hidevalue_totals: "",
                pageIndex: index, //start at 1
                hidevalue_RecordCount: 0,
                type: "getAllUser",
                _: time
            }
        }
    }
}

apiFunctions.prototype["getPhoneDate"]["wa111"] = function() {
    console.log(this);
    var { account } = this.params;
    return {
        career: 'wa111',
        settings: {
            url: this.url + '/LoadData/AccountManagement/GetMemberList.ashx',
            dataType: 'json',
            data: { type: 'getPhoneDate', account }
        },
        callback: function(res) {
            try {
                return res.rows[0];
            } catch (ex) { return null; }
        }
    }
}

apiFunctions.prototype["SystemLog"]["wa111"] = function() {

    return {
        career: 'wa111',
        settings: {
            url: this.url + '/LoadData/AccountManagement/GetSystemLog.ashx',
            method: 'post',
            dataType: 'json',
            data: {
                tabName: '',
                zwrq: '',
                pageIndex: '',
                f_target: '',
                f_handler: '',
                ddlType: 0,
                f_accounts: this.account,
                zwrq2: '',
                logType: 'memberlog',
                f_number: null,
                type: null,
                selType: '',
                selShow: -1,
                txtID: '',
                selDengji: ''
            }
        },
        callback: function(res) {
            try { return res.rows; } catch (ex) { return null; }
        }
    }
}
apiFunctions.prototype["SystemLog"]["ku711"] = function() {
    // console.log(xmlhttp.GetMemberInfoOperationLogByMultiAccountID);
    // console.log(this);
    return {
        career: 'ku711',
        settings: {
            url: this.url + '/member/api/Common/GetMemberInfoOperationLogByMultiAccountID',
            method: 'post',
            dataType: 'json',
            data: {
                "OperateType": 0,
                "OperatorList": [],
                "DataIDList": [],
                "PageIndex": 0,
                "PageSize": 5,
                "DataID": this.account,
                "Operated": this.account,
                "Platform": 0
            }
        },
        callback: function(res) {
            //console.log(res);
            try { try { return res.Data.Data; } catch (ex) { return null; } } catch (ex) { return null; }
        }
    }
}
apiFunctions.prototype["MemberBonus"]["ku711"] = function() {

    console.log(this);

    var { AccountID, BonusNumber, BonusID } = this;
    return {
        career: 'ku711',
        callback: function(d) {
            try {
                var res = d.Data.Data.filter(function(row) {
                    console.log(row.BonusNumber, BonusNumber);
                    return row.BonusNumber == BonusNumber;
                });

                console.log(res);

                return res[0];
            } catch (ex) {
                return null;
            }
        },
        settings: {
            method: 'post',
            dataType: 'json',
            url: this.url + '/member/api/Bonus/GetMemberBonusLogBackendByCondition',
            data: {
                AccountID: AccountID,
                //AccountID: AccountID,
                //StartTime: moment().format('YYYY-MM-dd'),
                //EndTime: moment().format('YYYY-MM-dd'),
                StartTime: '2018-01-01',
                EndTime: '2018-10-10',
                PageNumber: 0,
                RecordCounts: 20,
                OrderField: '',
                Desc: 'true',
                DirectorID: null,
                BonusType: null,
                DealType: null
            }
        }
    }
}
apiFunctions.prototype["MemberBonus"]["wa111"] = function() {
    var { account } = this.params;
    console.log(account);
    return {
        career: 'wa111',
        callback: function(res) {
            console.log(res);
            return res.rows[0];
        },
        settings: {
            method: 'get',
            dataType: 'json',
            url: this.url + '/LoadData/LoadDataList/DepositBonus.ashx',
            data: {
                type: "getDepositBonusList",
                f_Account: account,
                zwrq: "",
                zwrq2: "",
                pageSize: 20,
                pageIndex: "",
                action: "",
                isAduit: "",
                txtMoney: "",
                txtMoney2: "",
                _: new Date().getTime()
            }
        }
    }
}

apiFunctions.prototype["Alerts"]["ku711"] = function() {
    return {
        career: 'ku711',
        callback: function(res) {
            return { list_Accounts: res.Data }
        },
        settings: {
            method: 'post',
            dataType: 'json',
            url: this.url + '/member/api/AlertInfoManage/GetMemberAlertInfoBackendByMultiplayer',
            data: this.params
        }
    }
}

apiFunctions.prototype["smsService"]["smsc"] = function() {
    var { account, mobile, status, channel, operator } = this.params;
    var smss = aes.decrypt(localStorage.sms);
    
    var countrycode = { "16": "86", "26": "86", "35": "86", "17": "86", "21": "886", "35": "886", "2": "886" }[channel];
    var mobile = countrycode + mobile;
    var message = smss[channel];
    if (smss == undefined) { return false }
    if (channel == undefined) { return false }
    if (mobile == undefined) { return false }
    if (mobile.includes('*') == undefined) { return false }
    if (countrycode == undefined) { return false }
    if (message == undefined) { return false }
    return {
        career: 'smsc',
        settings: {
            dataType: 'html',
            method: 'post',
            url: 'https://client.motosms.com/smsc/smssend',
            data: { sender: '', phones: mobile, smscontent: message, taskType: 1, taskTime: '', batch: 1, splittime: 0, packid: '' }
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


apiFunctions.prototype["mobile"]["ku711"] = function() {
    return {
        career: 'ku711',
        settings: {
            method: 'post',
            dataType: 'json',
            url: this.url + '/Member/api/MemberInfoManage/GetVerifyPhoneLocal',
            data: {
                "Name": this.account,
                "AccountID": this.account,
                "CellPhone": this.value,
                "EnabledVerified": true,
                "Identitycard": "",
                "VerifyUsage": 13
            },
        },
        callback: function(res) {
            var d = res.Data;
            return {
                meta: d.Cardtype,
                prov: d.Province,
                city: d.City
            }

            /*return {
                region: {
                    career: 'ku711',
                    meta: d.Cardtype,
                    prov: d.Province,
                    city: d.City
                }
            }*/
        }
    }
}
apiFunctions.prototype["mobile"]["wa111"] = function() {
    //console.log(this);

    return {
        career: 'wa111',
        settings: {
            dataType: 'json',
            url: this.url + '/LoadData/AccountManagement/GetInfoAPI.ashx',
            data: {
                'type': 'getPhone',
                'phone': this.value,
                //'phone': this.mobile,
                'account': this.account,
                _: new Date().getTime()
            }
        },
        callback: function(res) {
            var str = res.msg.replace('<br />', '<br/>').split('<br/>');
            var arr = str[0].split('&nbsp;');
            return {
                prov: arr[0],
                city: arr[1],
                meta: str[1]
            }

            /*return {
                region: {
                    career: 'wa111',
                    prov: arr[0],
                    city: arr[1],
                    meta: str[1]
                },

            }*/
        }
    }
}
apiFunctions.prototype["locate"]["evo"] = function() {
    function pconline() {
        return {
            career: 'pconline',
            settings: {
                dataType: 'html',
                url: 'http://whois.pconline.com.cn/ipJson.jsp',
                data: { ip: this.value },
            },
            callback: function(d) {
                window.IPCallBack = function(d) {
                    try {
                        if (d.proCode == "999999") {
                            return {
                                meta: 'pconline',
                                prov: d.pro,
                                city: d.city,
                                ctry: d.addr
                            }
                        } else {
                            return {
                                meta: 'pconline',
                                prov: d.pro,
                                city: d.city,
                                area: d.region
                            }
                        }
                    } catch (ex) {
                        return false
                    }

                }
                return eval(d);
            }
        }
    }

    function baidu() {
        return {
            career: 'baidu',
            settings: {
                dataType: 'json',
                url: 'https://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974',
                data: { ip: this.value },
            },
            callback: function(d) {
                //console.log(d);
                try {
                    return {
                        //region: {
                        meta: 'baidu',
                        prov: d.content.address_detail.province,
                        city: d.content.address_detail.city,
                        ctry: d.address.split('|')[0].replace('CN', '中国')
                        //}

                    }
                } catch (ex) {
                    //throw 'error'
                    return null
                }
            }
        }
    }

    function ipapi() {
        return {
            career: 'ipapi',
            settings: {
                dataType: 'json',
                url: 'http://ip-api.com/json/' + this.value + '?fields=520191&lang=zh-CN',
            },
            callback: function(d) {
                //console.log(d);
                try {
                    return {
                        //region: {
                        meta: 'ipapi',
                        prov: d.regionName,
                        city: d.city,
                        ctry: d.country
                        //}
                    }
                } catch (ex) {
                    //throw 'error'
                    return null
                }
            }
        }
    }

    function taobao() {
        return {
            career: 'taobao',
            settings: {
                dataType: 'json',
                url: 'http://ip.taobao.com/service/getIpInfo.php',
                data: { ip: this.value },
            },
            callback: function(res) {
                //console.log(res);
                try {
                    var d = res.data;
                    return {
                        //region: {
                        meta: 'taobao',
                        prov: d.region.replace('XX', ''),
                        city: d.city.replace('XX', ''),
                        ctry: d.country.replace('XX', '')
                        //}
                    }
                } catch (ex) {
                    //throw 'error'
                    return null
                }

            }
        }
    }

    var modules = [pconline, baidu, ipapi, taobao];
    var c = (counter.locate++) % (modules.length);
    return modules[c].call(this);
}
apiFunctions.prototype["idcard"]["ku711"] = function() {
    return {
        career: 'ku711',
        settings: {
            url: this.url + '/Member/api/MemberInfoManage/GetVerifyIdentity',
            data: {
                "AccountID": this.account,
                //"Identitycard": this.value,
                "Identitycard": this.idcard,
                "Name": this.author,
                "CellPhone": "",
                "EnabledVerified": true,
                "VerifyUsage": 1
            },
        },
        callback: function(res) {
            var d = res.Data.IdCardInfo;
            return {
                prov: d.ResidentAddress,
                meta: d.BirthDay + '/' + d.Sex + '/' + getMemberAge(d.BirthDay)
            }
        }
    }
}
apiFunctions.prototype["idcard"]["wa111"] = function() {
    return {
        career: 'wa111',
        settings: {
            dataType: 'json',
            url: this.url + '/LoadData/AccountManagement/GetInfoAPI.ashx',
            data: {
                'type': 'getID',
                'f_account': this.account,
                _: this.time
            }
        },
        callback: function(res) {
            var arr = res.address.split(' ');
            return {
                prov: arr[0],
                city: arr[1],
                area: arr[2],
            }
        }
    }
}


if (location.protocol == 'chrome-extension:') {
    FnGetOldAge = (s) => { var a = moment(s); var b = moment(); return Number(b.diff(a, 'years')) + '岁'; }
    FnGetGender = (s) => { return (Number(s) % 2 == 1) ? '男性' : '女性' }
    FnIsAdult = (s) => { return (FnGetOldAge(s) > 17) }
    FnSetLocale = (time, format, locale) => { return moment(time).locale(locale).format(format) }
    window.GB2260 = angular.fromJson(localStorage["GB2260"]).map((x) => { x[0] = x[0].toString(); return x; })
    window.GB2260MAP = new Map(GB2260);
    //console.log(GB2260MAP);
}

apiFunctions.prototype["idcard"]["evo"] = function() {
    var [$1, $2, $3, $4, $5, $6, $7] =
    this.value.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, ['$10000', '$1$200', '$1$2$3', '$4-$5-$6', '$7', '$8', '$4年$5月$6日']).split(',');
    //console.log($1, $2, $3, $4, $5, $6, $7);
    var prov = GB2260MAP.get($1),
        city = GB2260MAP.get($2),
        area = GB2260MAP.get($3),
        sex = FnGetGender($5),
        age = FnGetOldAge($4),
        adult = FnIsAdult($4),
        birth = FnSetLocale($4, 'LL', 'zh-tw'),
        meta = [birth, sex, age].join('/');
    return {
        settings: {},
        career: 'evo',
        callback: function() {
            return { prov, city, area, meta }
        }
    }
}






/*

function getSystemLog(account) {
    $.ajax({
        url: 'https://bk.ku711.net/member/api/Common/GetMemberInfoOperationLogByMultiAccountID',
        method: 'post',
        dataType: 'json',
        data: {
            "OperateType": 0,
            "OperatorList": [],
            "DataIDList": [],
            "PageIndex": 0,
            "PageSize": 5,
            "DataID": account,
            "Operated": account,
            "Platform": 0
        }

    }).then((d) => { console.log(d); })
}



function getSystemLog(account) {
    $.ajax({
        url: 'http://host26.wa111.net/LoadData/AccountManagement/GetSystemLog.ashx',
        method: 'post',
        dataType: 'json',
        data: {
            tabName: '',
            zwrq: '',
            pageIndex: '',
            f_target: '',
            f_handler: '',
            ddlType: 0,
            f_accounts: account,
            zwrq2: '',
            logType: 'memberlog'
            f_number: null,
            type: null,
            selType: '',
            selShow: -1,
            txtID: '',
            selDengji: ''
        }
    }).then((d) => { console.log(d); })
}
*/




/*{
    banker: 'f_BankAccount',
    mobile: 'txtPhoto',
    idcard: 'txtIdCard',
    author: 'f_RemittanceName'
}
*/







// try {} catch (ex) {}

/*
function now(t) {
    if (t) {
        return moment(t).format('YYYY/MM/DD HH:mm:ss')
    } else { return t }
}

function today(t) {
    if (t) {
        return moment(t).format('YYYY/MM/DD HH:mm:ss')
    } else { return t }
}
*/