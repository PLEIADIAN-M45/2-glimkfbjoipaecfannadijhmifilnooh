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

var counter = { locate: 0, mobile: 0, idcard: 0 };

var apiFunctions = {

    wa111: {
        author() {
            return {
                settings: {},
                callback: function() {}
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
            };
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
            function pconline() {
                return {
                    provider: "pconline",
                    settings: {
                        "dataType": 'html',
                        "url": 'http://whois.pconline.com.cn/ipJson.jsp',
                        "data": { "ip": this.value },
                    },
                    callback: function(d) {
                        window.IPCallBack = function(d) {
                            try {
                                if (d.proCode == "999999") {
                                    return { "prov": d.pro, "city": d.city, "country": d.addr, "meta": "pconline", }
                                } else { return { "prov": d.pro, "city": d.city, "area": d.region, "meta": "pconline", } }
                            } catch (ex) {
                                return {}
                            }
                        };
                        return eval(d);
                    }
                }
            }

            function baidu() {
                return {
                    provider: "baidu",
                    settings: {
                        "dataType": 'json',
                        "url": 'https://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974',
                        "data": { "ip": this.value },
                    },
                    callback: function(d) {
                        try {
                            return {
                                "meta": "baidu",
                                "prov": d.content.address_detail.province,
                                "city": d.content.address_detail.city,
                                "country": d.address.split('|')[0].replace('CN', '中国')
                            }
                        } catch (ex) { return {} }
                    }
                }
            }

            function ipapi() {
                return {
                    provider: "ipapi",
                    settings: {
                        "provider": "ipapi",
                        "dataType": 'json',
                        "url": 'http://ip-api.com/json/' + this.value + '?fields=520191&lang=zh-CN',
                    },
                    callback: function(d) {
                        try {
                            return { "meta": "ipapi", "prov": d.regionName, "city": d.city, "country": d.country }
                        } catch (ex) { return {} }
                    }
                }
            }

            function taobao() {
                return {
                    provider: "taobao",
                    settings: {
                        "dataType": 'json',
                        "url": 'http://ip.taobao.com/service/getIpInfo.php',
                        "data": { "ip": this.value },
                    },
                    callback: function(res) {
                        try {
                            var d = res.data;
                            return { "meta": "taobao", "prov": d.region.replace('XX', ''), "city": d.city.replace('XX', ''), "country": d.country.replace('XX', '') }
                        } catch (ex) { return {} }
                    }
                }
            }
            var modules = [pconline, baidu, ipapi, taobao];
            var c = (counter.locate++) % (modules.length);
            return modules[c].call(this);
        },
        member() {

        },


    },

    ku711: {
        author() {

        },

        mobile() {

        },
        idcard() {

        },
        banker() {

        },
        locate() {

        },
        member() {

        },

    }
}


Mock.mock(/(glimkfbjoipaecfannadijhmifilnooh)/, 'post', function(req) {
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


/*
$.ajax({
    url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=121.14.14.115&co=&resource_id=6006&t=1541515800712
    &ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=jQuery110202495191869483746_1541515789905&_=1541515789908",
    headers: json(localStorage["baidu"])
}).then(function(s) {
    console.log(s);
})
*/




var headers = JSON.parse(localStorage["baidu"])
var obj = {};
headers.forEach((x) => {
    obj[x.name] = x.value
});

//console.log(obj);

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