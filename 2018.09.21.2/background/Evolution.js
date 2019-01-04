/*var store = new Dexie('evo');
store.version(5).stores({ user: 'unique', GB2260: 'code' });
console.log(store);
*/

var GLOBAL = {};
var global = {};

function decoder(value) {
    try {
        var str = decodeURI(atob(value))
        return angular.fromJson(str)
    } catch (ex) {
        return null;
    }
}

function s(res) {
    console.log(res);
    return res
}

/*
const getProfileUserInfo = function() {
    return new Promise(function(resolve, reject) {
        chrome.identity.getProfileUserInfo(resolve)
    })
}

const getTokenInfo = function(token) {
    return new Promise(function(resolve, reject) {
        if(token) {
            $.post('https://www.googleapis.com/oauth2/v2/tokeninfo', {
                access_token: token
            }, function(tokenInfo) {
                localStorage.tokenInfo = angular.toJson(tokenInfo, true)
                window.tokenInfo = tokenInfo
                resolve()
            }).fail(reject)
        } else {
            throw "without token";
        }
    })
}

const getCertForOpenIdConnect = function() {
    return new Promise(function(resolve, reject) {
        $.get('https://www.googleapis.com/oauth2/v2/certs', resolve)
    })
}
*/

console.log(chrome.identity);

/*
var c = chrome.identity.getRedirectURL()

console.log(c);

chrome.identity.getAuthToken({
    "interactive": true
}, (rs) => { console.log(rs); })
*/

function timeDiff(t1, t2, unit) {
    t1 = moment(t1)
    t2 = moment(t2)
    return t2.diff(t1, unit, true);
}

function toString(res) {
    return Object.values(res).toString();
}

function isJson(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }

function openOptionsPage() { chrome.runtime.openOptionsPage() };

function createTabs(url) { chrome.tabs.create({ url: url }) }

function trim(value) { return value.toString().trim(); }

function s(array) { console.log(array); }

class service {
    constructor({ callee, value }, sender, sendResponse) {
        this.value = value;
        return this[callee]().then(this.toCheck)
    }
    toCheck(res) {
        let string = Object.values(res).toString();
        res.alert = global.region.find(([elem]) => {
            return string.includes(elem);
        }) || false;
        return res;
    }


    get birth() {
        return moment(this.$4).locale('zh-tw').format('LL');
    }
    get age() {
        return moment().diff(moment(this.$4), 'years') + '岁'
    }
    get sex() {
        return (Number(this.$5) % 2 == 1) ? '男性' : '女性'
    }

    get prov() {
        return this.gb2260.get(Number(this.$1))
    }
    get city() {
        return this.gb2260.get(Number(this.$2))
    }
    get area() {
        return this.gb2260.get(Number(this.$3))
    }

    get gb2260() {
        return new Map(global.gb2260);
    }

    get meta() {
        return [this.birth, this.sex, this.age].join('/')
    }


    idcard() {

        //var [$1, $2, $3, $4, $5, $6, $7] =
        var arr =
            this.value.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/,
                ['$10000', '$1$200', '$1$2$3', '$4-$5-$6', '$7', '$8', '$4年$5月$6日']).split(',');


        console.log(arr);
        /*
        340122-198710061675
        340000-
        */


        var str = this.value.substr(0, 2).padEnd(6, 0)
        console.log(str);

        var str1 = this.value.substr(0, 4).padEnd(6, 0)

        console.log(str1);

        var str3 = this.value.substr(0, 6).padEnd(6, 0)


        console.log(str3);


        var str4 = this.value.substr(6, 8);
        console.log(str4);


        //str.replace(regexp | substr, newSubstr | function)

        /*
        this.$1 = $1;
        this.$2 = $2;
        this.$3 = $3;
        this.$4 = $4;
        this.$5 = $5;

        var region = {
            "prov": this.prov,
            "city": this.city,
            "area": this.area,
            "meta": this.meta,
        ].join('/')
        }
        */


        console.log(region);
        return Promise.resolve(region)
    }

    promise() {
        return this[this.callee]();
    }

    get time() { return Date.now(); }

    locate(request) {

        return $.ajax({
                url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
                dataType: "json",
                data: {
                    "query": request.value,
                    "co": "",
                    "resource_id": 6006,
                    "t": this.time,
                    "ie": "utf8",
                    "oe": "gbk",
                    "format": "json",
                    "tn": "baidu",
                    "_": this.time
                }
            })
            .then((res) => {
                var region = {};
                if (res.status == 0) {
                    var arr = res.data[0].location.split(' ');
                    var str = arr[0];
                    if (str) {
                        region.meta = arr[1];
                        str = str.replace(/(.+(省|自治区))/g, '');
                        region.prov = RegExp.$1;
                        str = str.replace(/(.+(市|州))/g, '');
                        region.city = RegExp.$1;
                        str = str.replace(/(.+(县|区))/g, '');
                        region.area = RegExp.$1;
                        //region.alert = region_compare(region)
                    }
                }

                return region;
            })
    }

    banker(request, sender, sendResponse) {
        //return new Promise((resolve, reject) => {        })
        //new Map(evo.decoder(localStorage["gb2260"]));
    }
    banker(request) {

    }

    mobile(request, sender, sendResponse) {
        return $.ajax({
            dataType: "json",
            url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
            data: {
                "query": this.value,
                "co": "",
                "resource_id": 6004,
                "t": this.time,
                "ie": "utf8",
                "oe": "gbk",
                "format": "json",
                "tn": "baidu",
                "_": this.time,
            }
        }).then((res) => {
            var region = {}
            if (res.status == 0) {
                var d = res.data[0];
                region = {
                    city: d.city,
                    prov: d.prov,
                    meta: d.type || "baidu",
                    //alert: region_compare(region)
                }
            }
            return region;
        })
    }

}

/*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
JavaScript Demo: String.raw()

*/

var filePath = String.raw `C:\Development\profile\aboutme.html`;

console.log('The file was uploaded from: ' + filePath);


function replacer(match, p1, p2, p3, offset, string) {

    console.log(match, p1, p2, p3, offset, string);



    // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);


console.log(newString); // abc - 12345 - #$*%

//class apis extends service {
class apis {
    constructor() {
        //super();
        this.store = new Dexie('evo');
        this.store.version(5).stores({ user: 'unique', GB2260: 'code' });
        this.download();
        this.addListener();
        this.getAuthToken();
        //this.chrome_settings.forEach(createTabs);
    }

    get chrome_settings() {
        return [
            "chrome://extensions/",
            "chrome://settings/fonts",
            "chrome://flags/#enable-devtools-experiments"
        ]
    }

    getTokenInfo(token) {
        console.log(token);
        if (token) {
            $.post('https://www.googleapis.com/oauth2/v2/tokeninfo', {
                access_token: token
            }, (tokenInfo) => {
                api.tokenInfo = tokenInfo;
                //localStorage.tokenInfo = angular.toJson(tokenInfo, true);
                //console.log(tokenInfo)
            })
        } else {
            throw "without token";
        }
        //return new Promise((resolve, reject) => {})
    }
    getAuthToken() {
        chrome.identity.getAuthToken({ "interactive": true }, this.getTokenInfo);
        /*return new Promise((resolve, reject) => {        })*/
    }

    addListener() {
        chrome.runtime.onMessageExternal.addListener(this.onMessageExternal)
    }

    onMessage(request, sender, sendResponse) {}

    onMessageExternal(request, sender, sendResponse) {

        /*if (request.callee == "locate") {
            eval(request.command).call(request, sender, sendResponse).then((s) => {
                console.log(s);
                return sendResponse(s)
            })
            return true
        }
        */
        //if (request.command.includes("#")) {}
        request.command = request.command.replace("#", "...arguments");
        console.log(request);

        try {

            eval(request.command).then((s) => {
                console.log(s);
                return sendResponse(s)
            })

            return true
        } catch (ex) { return ex; }
    }

    get audience() {
        return this.tokenInfo.audience;
        //return angular.fromJson(localStorage.tokenInfo).audience
    }

    get macros() { return "https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec" }

    download() {
        if (window.localStorage.length < 5) {
            return Promise.all([
                fetch(this.macros + '?commands=GMA').then(this.toJson),
                fetch(this.macros + '?commands=GMB').then(this.toJson)
            ]).then(this.flat).then(this.save).then((x) => { console.log(localStorage); })
        } else {
            this.save(Object.entries(localStorage))
        }
    }

    google(request, sender, sendResponse) {
        var user = request.user;
        delete user.banker[0].sites;
        delete user.idcard.sites;
        delete user.locate.sites;
        delete user.mobile.sites;
        delete user.author.sites;
        delete user.sendsms;
        /*-------------------------------------*/
        user.audience = this.audience;
        user.test = true;
        user.command = "google:scripts";
        user.mobile.region = {}
        user.idcard.region = {}
        user.locate.region = {}
        user.region = []
        user.timing[2] = timeDiff(user.timing[0], user.timing[1], 'minute')
        user.timespan = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(user);
        $.ajax({
            url: this.macros,
            method: 'get',
            data: {
                test: true,
                audience: this.audience,
                command: "google:scripts",
                module: user.module,
                user: angular.toJson(user)
            }
        }).then(function(d) { console.log(d); })

    }

    entries() {
        Object.entries(localStorage).forEach(([name, value]) => {
            //console.log(name);
            //console.log(this.decoder(value));
            if (name) {
                this.decoder(value, name)
            }
        })
    }


    clear() {
        localStorage.clear();
    }

    toLocalStorage(res) {
        console.log(res);
        if (typeof res)


            return res.forEach(([name, value]) => { localStorage[name] = value; })
    }

    toJson(res) { return res.json() }

    toText(res) { return res.text() }

    flat(arr) { return arr.flat(); }

    save(arr) {

        arr.forEach(([name, value]) => {
            localStorage[name] = value;
            global[name] = decoder(value);
        });
        console.log(global);
    }


    entries() {
        Object.entries(localStorage).forEach(([name, value]) => {
            if (name) {
                this.decoder(value, name)
            }
        })
    }

    get now() {
        return Date.now();
    }





    async xmlHttp(request, sender, sendResponse) {
        var { action, sendData, channel } = request;
        var unique = sendData.account + "-" + channel;
        //var user = await this.user.get(unique);
        //this.unique = unique;
        //console.log(unique);
        console.log(user);
        //var user = await getUser(unique);
        switch (action) {
            case "getmodel":
                console.log(sendData);
                break;
            case "getDepositBonusList":
                break;
            case "getDepositBonusList2":
                break;
            case "getDepositBonusList3":
                break;

        }
        //sendResponse(2324)
    }
}




var api = new apis();
console.log(api);






class xmlHttp {
    getmodel() {
        console.log(this);
    }
}




/*
    //url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
test: true,
audience: angular.fromJson(localStorage.tokenInfo).audience,
//command: request.command,
module: request.module,
params: angular.toJson(request)
*/