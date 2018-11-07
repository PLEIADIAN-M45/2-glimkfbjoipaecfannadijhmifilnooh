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
    region: function({ prov, city, area, country }) {
        var value = [prov, city, area, country].join('');
        if (value) {
            return evo.decoder(localStorage.region).find((d) => {
                return value.includes(trim(d[0]))
            });
        } else { return true; }
    }
}



function callback_baidu_mobile(res) {
    var d = res.data[0];
    return {
        city: d.city,
        prov: d.prov,
        meta: d.type
    }
}

function callback_baidu_locate(res) {
    var arr = res.data[0].location.split(' ');
    var regexp = new RegExp(/(省|市|区|县)/, "g");
    arr[0] = arr[0].replace(regexp, '$1 ');
    return { meta: arr[1], prov: arr[0].trim() }
}

/*
var callback = {
   mobile:{} 
}
*/


var counter = { locate: 0, mobile: 0, idcard: 0 };


var apiFunctions = {

    baidu: {
        mobile() {
            return {
                callback: function(res) {
                    return eval(res);
                },
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
        },
        locate() {
            return {
                callback: function(res) {
                    return eval(res);
                },
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


    wa111: {
        author() {
            return {
                callback: function(res) {
                    return res
                }
            }
        },
        mobile() {
            return {
                settings: { "dataType": 'json', "url": '@/LoadData/AccountManagement/GetInfoAPI.ashx', "data": { 'type': 'getPhone', 'phone': this.value, 'account': this.account, "_": this.time } },
                callback: function(res) {
                    var str = res.msg.replace('<br />', '<br/>').split('<br/>');
                    var arr = str[0].split('&nbsp;');
                    return { "prov": arr[0], "city": arr[1], "meta": str[1] }
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
                callback: function(res) { return res; }
            }
        },
        banker() {
            return {
                /*settings: {
                    "url": "http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/banker",
                    "dataType": 'json',
                    "method": "post",
                    "data": this.region
                },*/
                callback: function(res) {
                    return res.region;
                }
            }
        },
        locate() {
            return {
                callback: function(res) {
                    return eval(res);
                },
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
                    return { "prov": d.Province, "city": d.City, "meta": d.Cardtype }
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
                callback: function(res) { return res; }
            }
        },
        banker() {
            return {
                settings: {},
                callback: function() {}
            }
        },
        locate() {

        },

        member() {
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
        },

        alerts() {
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




function $serializeQueryString(_url) {
    _url = decodeURIComponent(_url);
    var obj = {};
    if (_url.includes('?')) {
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
var province = [
    "河北省", "山西省", "吉林省", "辽宁省", "黑龙江省", "陕西省", "甘肃省", "青海省",
    "山东省", "福建省", "浙江省", "台湾省", "河南省", "湖北省", "湖南省", "江西省",
    "江苏省", "安徽省", "广东省", "海南省", "四川省", "贵州省", "云南省",
    "北京市", "上海市", "天津市", "重庆市",
    "内蒙古自治区", "新疆维吾尔自治区", "宁夏回族自治区", "广西壮族自治区", "西藏自治区",
    "香港特别行政区", "澳门特别行政区"
];




Mock.mock("http://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/banker", 'post', function(req) {
    var data = $serializeQueryString(req.body);
    return Mock.mock(data)
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




//console.log(province.join('|'));

//var regexp = new RegExp('(' + province.join('|') + ')');
//console.log(regexp);

/*
str = str.split(" ")[0];
console.log(str);
console.log(str.split('省'));
*/


/*
var regexp = new RegExp(/(省|市|区)/, "g");
var str = "河南省洛阳市 电信";
var arr = str.replace(regexp, '-')
console.log(arr);
var regexp = new RegExp(/.+(省)/, "g");
var str = "河南省洛阳市 电信";
var str2 = str.replace(regexp, '-')
console.log(str2);
console.log(RegExp.$1);
var regexp = new RegExp(/(.+省)(.+市)(.+区)/, "g");



var str = "河南省洛阳市 电信";
var str2 = str.replace(/(.+省)(.+市)(.+区)/g, '')
console.log("str2", str2);
console.log(RegExp.$1);
console.log(RegExp.$2);
console.log(RegExp.$3);
*/


/*
console.log(str.split('省'));
console.log(str.split('市'));
*/

//console.log(0x0002);


//var arr = str.split(/(省|市|区)/);
//var arr = str.split(regexp);
//console.log(arr);
/*
var test = regexp.exec(str);
console.log(test);*/

/*
var array1;
while ((array1 = regexp.exec(str)) !== null) {
    console.log(`Found ${array1[0]}. Next starts at ${regexp.lastIndex}.`);
}


var found = str.match(regexp);
console.log(found);
*/


/*
$.ajax({
    dataType: "html",
    url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=121.25.14.125&co=&resource_id=6006&t=1541515800712&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=jQuery110202495191869483746_1541515789905&_=" + Date.now(),
}).then(function(s) {
    eval(s)
    function jQuery110202495191869483746_1541515789905(res) {
        console.log(res);
        console.log(res.data[0].location);
    }
})
*/


/*
Mock.mock(/(glimkfbjoipaecfannadijhmifilnooh)/, 'get', function(req) {
    console.log(req);
});

console.log(Mock);
*/


/*
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
}*/

//var apiFunctions = new ApiFunctions()