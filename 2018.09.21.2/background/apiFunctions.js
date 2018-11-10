function json(a) { return (typeof a == 'string') ? JSON.parse(a) : JSON.stringify(a); }

function pathOf(url) { return url.split('/').pop(); }

function $serializeParameters(str) {
    var obj = {};
    str.split('?')[1].split('&').map((x) => { return x.split('=') }).map(([name, value]) => {
        obj[name] = value;
    })
    return obj;
}

function format(t) { if(t) { return moment(t).format('YYYY/MM/DD HH:mm:ss') } else { return t } };

var assign = Object.assign;
var counter = { locate: 0, mobile: 0, idcard: 0 };
var search = {
    idcard: function(value) {
        return undefined;
    },
    author: function(value) {
        var test = evo.decoder(localStorage.author).find((d) => { return trim(d[0]) == value; });
        return test[3] + ' ' + test[1] + '-' + test[2];
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
    region: function({ prov, city, area, country, verify }) {
        if(alert == false) { return }
        var value = [prov, city, area, country].join('');
        if(value) {
            return evo.decoder(localStorage.region).find((d) => {
                return value.includes(trim(d[0]))
            });
        } else { return true; }
    }
}

/*
var region = evo.decoder(localStorage.region)
region.push(['吉林'])
localStorage.region = evo.encoder(region);
*/
//console.log(evo.decoder(localStorage.region));



function callback_baidu_mobile(res) {
    if(res.status == 0) {} else { return {} }
    var d = res.data[0];
    var region = { city: d.city, prov: d.prov, meta: d.type || "baidu" }
    region.verify = search.region(region) || false;
    return { region };
}


function callback_baidu_locate(res) {
    if(res.status == 0) {} else { return {} }
    var arr = res.data[0].location.split(' ');
    var region = { meta: arr[1] };
    var string = arr[0];
    if(string) {
        string = string.replace(/(.+(省|自治区))/g, '');
        region.prov = RegExp.$1;
    }

    if(string) {
        string = string.replace(/(.+(市|州))/g, '');
        region.city = RegExp.$1;
    }

    if(string) {
        string = string.replace(/(.+(县|区))/g, '');
        region.area = RegExp.$1;
    }
    region.verify = search.region(region) || false;
    return { region };
}

var counter = { locate: 0, mobile: 0, idcard: 0 };
var apiFunctions = {
    wa111: {
        member() {
            var { index } = this;
            this.idcard = this.idcard || "";
            this.author = this.author || "";
            this.mobile = this.mobile || "";
            this.banker = this.banker || "";
            return {
                callback: function(res) {
                    if(res && res.rows && res.rows.length) { res.list_RemittanceName = res.rows[0].list_RemittanceName; }
                    return assign(res, { index });
                },
                settings: {
                    "dataType": 'json',
                    "url": '@/LoadData/AccountManagement/GetMemberList.ashx',
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
                        "_": this.time
                    }
                }
            }
        },
        author() {
            return {
                settings: {
                    "url": "http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/author",
                    "dataType": 'json',
                    "method": "post",
                    "data": this
                },
                callback: function(region) { return region; }
            }
        },
        mobile() {
            return {
                callback: function(res) { return eval(res); },
                settings: {
                    dataType: "text",
                    url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
                    data: {
                        "query": this.value,
                        "co": "",
                        "resource_id": 6004,
                        "t": this.time,
                        "ie": "utf8",
                        "oe": "gbk",
                        "cb": "op_aladdin_callback",
                        "format": "json",
                        "tn": "baidu",
                        "cb": "callback_baidu_mobile",
                        "_": this.time,
                    }
                }
            }

            /*
            return {
                settings: { "dataType": 'json', "url": '@/LoadData/AccountManagement/GetInfoAPI.ashx', "data": { 'type': 'getPhone', 'phone': this.value, 'account': this.account, "_": this.time } },
                callback: function(res) {
                    var str = res.msg.replace('<br />', '<br/>').split('<br/>');
                    var arr = str[0].split('&nbsp;');
                    var region = { "prov": arr[0], "city": arr[1], "meta": str[1] }
                    return { region }
                }
            }*/
        },
        idcard() {
            return {
                settings: {
                    "url": "http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/idcard",
                    "dataType": 'json',
                    "method": "post",
                    "data": { "idcard": this.value }
                },
                callback: function(region) { return { region } }
            }
        },
        banker() {
            return {
                settings: {
                    "url": "http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/banker",
                    "dataType": 'json',
                    "method": "post",
                    "data": this.region
                },
                callback: function(region) { return { region } }
            }
        },
        locate() {
            return {
                callback: function(res) { return eval(res); },
                settings: {
                    dataType: "text",
                    url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
                    data: {
                        "query": this.value,
                        "co": "",
                        "resource_id": 6006,
                        "t": this.time,
                        "ie": "utf8",
                        "oe": "gbk",
                        "cb": "op_aladdin_callback",
                        "format": "json",
                        "tn": "baidu",
                        "cb": "callback_baidu_locate",
                        "_": this.time,
                    }
                }
            }
        }
    },
    ku711: {
        author() {
            return {
                settings: {},
                callback: function() {}
            }
        },

        mobile() {
            return {
                provider: "ku711",
                settings: {
                    "method": 'post',
                    "dataType": 'json',
                    "url": '@/Member/api/MemberInfoManage/GetVerifyPhoneLocal',
                    "data": { "Name": this.account, "AccountID": this.account, "CellPhone": this.value, "EnabledVerified": true, "Identitycard": "", "VerifyUsage": 13 },
                },
                callback: function(res) {
                    var d = res.Data;
                    var region = { "prov": d.Province, "city": d.City, "meta": d.Cardtype };
                    return { region }
                }
            }
        },
        idcard() {
            return {
                settings: {
                    "url": "http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/idcard",
                    "dataType": 'json',
                    "method": "post",
                    "data": { "idcard": this.value }
                },
                callback: function(region) {
                    return { region }
                }
            }
        },
        banker() {
            return {
                settings: {},
                callback: function() {

                }
            }
        },
        locate() {

        },


        member() {
            var { index } = this;
            this.idcard = this.idcard || "";
            this.author = this.author || "";
            this.mobile = this.mobile || "";
            this.banker = this.banker || "";
            return {
                callback: (res) => {
                    var { Data, Pager, TotalItemCount } = res.Data;
                    if(this.author) {
                        var list_RemittanceName = angular.fromJson(sessionStorage[this.author]);
                        Data.forEach((r) => { r.list_Accounts = list_RemittanceName.filter((w) => { return w.AccountID == r.AccountID; }); });
                    } else { var list_RemittanceName = [] }
                    return {
                        "list_RemittanceName": list_RemittanceName,
                        "rows": Data,
                        "records": Pager.PageCount,
                        "total": TotalItemCount,
                        "index": this.index
                    }
                },
                settings: {
                    "dataType": 'json',
                    "method": 'post',
                    "url": '@/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
                    "data": {
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
                    }
                }
            }
        },

        getMemberAlertInfoBackend() {
            return {
                settings: {
                    "method": 'post',
                    "dataType": 'json',
                    //"url": '@/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
                    "url": location.origin + '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
                    "data": {
                        "DisplayArea": "1",
                        "Account": [{ "AccountID": this.account, "AccountName": this.author }]
                    }
                },
                callback: (res) => {
                    console.log(res);
                    sessionStorage[this.author] = angular.toJson(res.Data.AlertInfoAccountName);
                    return {
                        //"list_Accounts": res.Data.AlertInfoAccountId,
                        "list_RemittanceName": res.Data.AlertInfoAccountName
                    }
                }
            }
            /*
            return new Promise((resolve, reject) => {
                console.log(this.account, this.author);
                $.ajax({
                    "method": 'post',
                    "dataType": 'json',
                    "url": 'https://bk.ku711.net/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
                    "data": angular.toJson({
                        "DisplayArea": "1",
                        "Account": [{ "AccountID": this.account, "AccountName": this.author }]
                    })
                }).then((res) => {
                    var list_RemittanceName = res.Data.AlertInfoAccountName;
                    resolve({ list_RemittanceName });
                })
            });*/
            //console.log(this.account, this.author);

        },

        getMemberAlertInfoBackendByMultiplayer() {
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
    }
}
/*
for(var x in apiFunctions.wa111) {
    console.log(apiFunctions.wa111[x]);
}
*/


function $serializeQueryString(_url) {
    _url = decodeURIComponent(_url);
    var obj = {};
    if(_url.includes('?')) {
        _url.split('?')[1].split('&').map((x) => { return x.split('='); })
            .forEach(([name, value]) => { obj[name] = value; });
    } else {
        _url.split('&').map((x) => { return x.split('='); })
            .forEach(([name, value]) => { obj[name] = value; });
    }
    return obj;
}


function $toJson(str) {
    try {
        var obj = JSON.parse(str);
    } catch (ex) {
        var obj = str;
    }
    return obj;
}

function $fromJson(obj) {
    try {
        var str = JSON.stringify(obj);
    } catch (ex) {
        var str = obj;
    }
    return str;
}

console.log(apiFunctions);
//console.log(JSON.stringify(apiFunctions));
//console.log(evo.decoder(localStorage["gb2260"]));



Mock.mock("http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/author", 'post', function(req) {
    return Mock.mock({ region: {}, alert: false })
});


Mock.mock("http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/banker", 'post', function(req) {
    var data = $serializeQueryString(req.body);
    return Mock.mock(data);
});

Mock.mock("http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/idcard", 'post', function(req) {
    var _idcard = req.body.split('=').pop();
    var GBMAP = new Map(evo.decoder(localStorage["gb2260"]));
    var [$1, $2, $3, $4, $5, $6, $7] = _idcard.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, ['$10000', '$1$200', '$1$2$3', '$4-$5-$6', '$7', '$8', '$4年$5月$6日']).split(',');
    var sex = (Number($5) % 2 == 1) ? '男性' : '女性',
        age = moment().diff(moment($4), 'years') + '岁',
        birth = moment($4).locale('zh-tw').format('LL');

    return Mock.mock({
        "prov": GBMAP.get(Number($1)),
        "city": GBMAP.get(Number($2)),
        "area": GBMAP.get(Number($3)),
        "meta": [birth, sex, age].join('/')
    })
});


var _province = [
    "河北省", "山西省", "吉林省", "辽宁省", "黑龙江省", "陕西省", "甘肃省", "青海省",
    "山东省", "福建省", "浙江省", "台湾省", "河南省", "湖北省", "湖南省", "江西省",
    "江苏省", "安徽省", "广东省", "海南省", "四川省", "贵州省", "云南省",
    "北京市", "上海市", "天津市", "重庆市",
    "内蒙古自治区", "新疆维吾尔自治区", "宁夏回族自治区", "广西壮族自治区", "西藏自治区",
    "香港特别行政区", "澳门特别行政区"
];