function json(a) { return (typeof a == 'string') ? JSON.parse(a) : JSON.stringify(a); }

function pathOf(url) { return url.split('/').pop(); }

function format(t) { if(t) { return moment(t).format('YYYY/MM/DD HH:mm:ss') } else { return t } };
var assign = Object.assign;
var counter = { locate: 0, mobile: 0, idcard: 0 };

function apiFunctions(request, sender, sendResponse) {
    //return sendResponse('暫停服務')
    var [commander, property, proxy, channel] = request.command.split(':');
    //console.log(commander, property, proxy, channel);
    request.url = window.origins.get(channel);
    request.time = Date.now();
    var module = this[property][proxy].call(request);
    if(module.career == "ku711") { module.settings.data = json(module.settings.data); }
    //if(request.url) {    } else { return sendResponse(['', 'error'])    }
    module.settings.timeout = 5000;
    try {
        $.ajax(module.settings)
            .done(function(data, textStatus, xhr) {
                console.log(data);
                try {
                    var result = module.callback(data);
                    result.career = module.career;
                    result.host = module.career;
                    result.origin = request.url;
                    var status = result.status || textStatus;
                    if(['locate', 'idcard', 'mobile'].includes(property)) { result = { property, region: result } }
                    sendResponse([result, status, xhr]);
                } catch (ex) {
                    sendResponse([null, 'error', xhr]);
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

apiFunctions.prototype["smsService"]["motosms"] = function() {
    var { account, mobile, status, channel, operator } = this.params;
    var smss = new Map(evo.decoder(localStorage.sms));
    var countrycode = { "16": "86", "26": "86", "35": "86", "17": "86", "21": "886", "35": "886", "2": "886" } [channel];
    var mobile = countrycode + mobile;
    var message = smss.get(Number(channel));
    if(smss == undefined) { return false }
    if(channel == undefined) { return false }
    if(mobile == undefined) { return false }
    if(mobile.includes('*') == undefined) { return false }
    if(countrycode == undefined) { return false }
    if(message == undefined) { return false }
    return {
        career: 'smsc',
        settings: {
            dataType: 'html',
            method: 'post',
            url: 'https://client.motosms.com/smsc/smssend',
            data: { sender: '', phones: mobile, smscontent: message, taskType: 1, taskTime: '', batch: 1, splittime: 0, packid: '' }
        },
        callback: function(res) {
            if(res.match(/(會員登錄)/)) { var status = 3; }
            if(res.match(/(msg = '')/)) { var status = 0; }
            if(res.match(/(msg = '101')/)) { var status = 101; }
            if(res.match(/(msg = '102')/)) { var status = 102; }
            console.log(status);
            return { operator, account, channel, message, mobile, status }
        }
    }
}
apiFunctions.prototype["Member"]["ku711"] = function() {
    var { index = 1, banker = "", mobile = "", idcard = "", author = "", time } = this;
    //console.log(this.url);


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
                StartTime: moment().format('YYYY-MM-dd'),
                EndTime: moment().format('YYYY-MM-dd'),
                //StartTime: '2018-01-01',
                //EndTime: '2018-10-10',
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
        }
    }
}
apiFunctions.prototype["mobile"]["wa111"] = function() {
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
            console.log(res);
            var str = res.msg.replace('<br />', '<br/>').split('<br/>');
            var arr = str[0].split('&nbsp;');
            return {
                prov: arr[0],
                city: arr[1],
                meta: str[1]
            }
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
                        if(d.proCode == "999999") {
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


FnGetOldAge = (s) => { var a = moment(s); var b = moment(); return Number(b.diff(a, 'years')) + '岁'; }
FnGetGender = (s) => { return (Number(s) % 2 == 1) ? '男性' : '女性' }
FnIsAdult = (s) => { return (FnGetOldAge(s) > 17) }
FnSetLocale = (time, format, locale) => { return moment(time).locale(locale).format(format) }



evo.search = {
    author: function(value) {
        return evo.local.author.find((d) => {
            return trim(d[0]) == value;
        })
    },
    banker: function(value) {
        return evo.local.banker.find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    mobile: function(value) {
        return evo.local.mobile.find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    locate: function(value) {
        return evo.local.locate.find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    danger: function(value) {
        return evo.local.danger.find((d) => {
            return value.includes(trim(d[0]))
        })
    },
    notice: function(value) {
        return evo.local.notice.find((d) => {
            return value.includes(trim(d[0]))
        })
    },
    region: function(value) {
        return evo.local.region.find((d) => {
            return value.includes(trim(d[0]))
        })
    }
}


function s(array) { console.log(array); }

function flat(array) { return array.flat(); }

function save(arr) {
    arr.forEach(([name, value]) => {
        localStorage[name] = value;
        console.log(name, value);
        //evo.local[name] = evo.decoder(value);
    })
}


function download() {
    return Promise.all([
        fetch('https://www.evo.com/?commands=GMA').then(_toJson),
        fetch('https://www.evo.com/?commands=GMB').then(_toJson)
    ]).then(flat).then(save);
}

//download()



/*
var b = evo.search.author('杨吉')
var b = evo.search.banker('62170008500012323')
var b = evo.search.locate('116.20.60.169')
var b = evo.search.danger('他是打水套利客')
var b = evo.search.region('台灣省')
console.log(b);
*/