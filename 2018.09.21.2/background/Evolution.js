Array.prototype.toUnique = function() {
    return this.join("-")
}

Array.prototype.timeDiff = function(unit) {
    this[0] = moment(this[0]).format("YYYY-MM-DD HH:mm:ss")
    this[1] = moment(this[1]).format("YYYY-MM-DD HH:mm:ss")
    this[2] = moment(this[1]).diff(moment(this[0]), "minutes", true);
    return this;
}



var global = {};

global.compare = function(request) {
    var $local = global[request.callee];
    switch (request.callee) {
        case "author":
            console.log(1, 2);
            return $local.find(([name]) => {
                return name == request.value
            }) || false;
            break;
    }
}

function decoder(value) {
    try {
        var str = decodeURI(atob(value));
        return angular.fromJson(str);
    } catch (ex) { return null; }
}

function s(res) { console.log(res); return res }

function timeDiff(t1, t2, unit) {
    t1 = moment(t1);
    t2 = moment(t2);
    return t2.diff(t1, unit, true);
}

function toString(res) { return Object.values(res).toString(); }

function isJson(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }

function openOptionsPage() { chrome.runtime.openOptionsPage() };

function createTabs(urls) { angular.forEach(urls, (url) => { chrome.tabs.create({ url: url }) }) }

function trim(value) { return value.toString().trim(); }

function s(array) {
    console.log(arguments);
    return arguments;
}

function entries(obj) { return Object.entries(obj) }

function log() {
    console.log(chrome.identity);
}


console.log(angular);

function clear_console() { console.clear(); }
//var int = self.setInterval("clear_console()", 5000)

class Service {

    constructor(request, sender, sendResponse) {
        this._value = request.value;
        this._callee = request.callee;
        return Promise.resolve(this[request.callee](request)).then(this.toCheck.bind(this));
    }

    get time() { return Date.now(); }

    compare(request) {
        var $global = global[this._callee] || [];
        switch (this._callee) {
            case "author":
                return $global.find(([name]) => { return name == this._value }) || false;
            case "mobile":
                return $global.find(([val]) => { return this._value.startsWith(val) }) || false;
            case "idcard":
                return $global.find(([val]) => { return this._value.startsWith(val) }) || false;
            case "banker":
                return $global.find(([val]) => { return this._value.startsWith(val) }) || false;
            case "locate":
                return $global.find(([val]) => { return this._value.startsWith(val) }) || false;
            default:
                return $global.find(([val]) => { return this._value.startsWith(val) }) || false;
        }
    }

    toCheck(res) {
        if (res) {
            let string = Object.values(res).toString();
            res.alert = global.region.find(([elem]) => { return string.includes(elem); }) || false;
            if (res.age < 18) { res.alert = true }
        } else { res.alert = true; }
        res.alarm = this.compare();
        return res;
    }

    IDParser(value) { return value.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, ['$10000', '$1$200', '$1$2$3', '$7', '$4-$5-$6']).split(",").map((x) => { return (isNaN(x)) ? x : Number(x) }) }

    idcard(request) {
        var [$1, $2, $3, $4, $5] = this.IDParser(request.value);
        var prov = global.gb2260.get($1),
            city = global.gb2260.get($2),
            area = global.gb2260.get($3),
            sex = ($4 % 2 === 1) ? "男" : "女",
            age = moment().diff($5, "years"),
            bday = moment($5).locale('zh-tw').format('LL'),
            meta = [bday, sex, age + '岁'].join('/');
        return { prov, city, area, sex, age, bday, meta };
    }
    locate(request) {
        return $.ajax({ url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php", dataType: "json", data: { "query": request.value, "co": "", "resource_id": 6006, "t": this.time, "ie": "utf8", "oe": "gbk", "format": "json", "tn": "baidu", "_": this.time } }).then((res) => {
            //console.log(res);
            var region = {};
            if (res.status == 0) {
                var str = res.data[0].location;
                if (str) { str.replace(/(天津市|北京市|重庆市|上海市|.+省|.+自治区)?(.+自治州|.+区|.+市|.+县|.+州|.+府)?(.+区|.+市|.+县|.+州|.+府)?(\s*.*)/, function(match, prov, city, area, meta, offset, string) { region = { prov, city, area, meta } }); }
            }
            return region;
        })
    }
    mobile(request) {
        return $.ajax({ dataType: "json", url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php", data: { "query": request.value, "co": "", "resource_id": 6004, "t": this.time, "ie": "utf8", "oe": "gbk", "format": "json", "tn": "baidu", "_": this.time, } }).then((res) => {
            //console.log(res);
            var region = {};
            if (res.status == 0) { var d = res.data[0]; return { city: d.city, prov: d.prov, meta: d.type || "baidu" }; }
            return region;
        })
    }
    banker(request) { return request.region; }
    author(request) { return {}; }
}


/*
evo@ryan-studio.net
*/

window.baseUrl = {
    "0": "http://chrome.evo.net",
    "26": "http://host26.wa111.net",
    "35": "http://host35.wa111.net",
    "17": "http://host17.wa111.net",
    "16": "https://bk.ku711.net"
}

class apis {
    constructor() {
        //super();
        this.store = new Dexie('evo');
        this.store.version(5).stores({ user: 'unique', GB2260: 'code' });
        this.download();
        this.addListener();
        this.getAuthToken();
        //createTabs(this.chrome_settings)
    }
    get requestUrl() { return window.baseUrl[this.channel] }
    /*
    get banker() {
    }
    get mobile() {
    }
    get author() {
    }
    get idcard() {
    }
    */


    member(request) {
        Object.assign(this.__proto__, { banker: "", mobile: "", author: "", idcard: "" })
        Object.assign(this.__proto__, request);

        /*console.log(this.channel);
        console.log(this.requestUrl);
        console.log(this.banker);*/

        console.log(this);
        console.log(this.requestUrl);
        console.log(this.banker);
        console.log(this.mobile);
        console.log(this.idcard);
        console.log(this.author);
        console.log(this.index);
        console.log(this.time);

        // return Promise.resolve({})
        //{ server, callee, channel, index, rows }
        //console.log(arguments);
        //console.log(server, callee, channel, index, rows);
        //console.log(window.baseUrl);
        //console.log(window.baseUrl[this.channel]);
        //console.log(this);

        switch (this.server) {
            case "wa111":
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
                        "_": this.time
                    }
                }).then((res) => {
                    //console.log(res);
                    res.origin = this.requestUrl;
                    res.index = this.index;
                    res.list_RemittanceName = (res.rows && res.rows.length) ? res.rows[0].list_RemittanceName : [];
                    return res
                    //Object.assign(this, res);
                })

                break;

            case "ku711":

                return $.ajax({
                    "dataType": 'json',
                    "method": 'post',
                    "url": this.requestUrl + '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
                    "data": JSON.stringify({
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

                    var res = { origin: this.requestUrl, index: this.index, rows: Data.Data, records: Data.Pager.PageCount, total: Data.TotalItemCount };

                    if (res.rows && res.rows.length) {

                        return api.getMemberAlertInfoBackend(res.rows, this.requestUrl)
                            .then(({ Data }) => {
                                console.log(Data);
                                if (Data) {
                                    res.list_RemittanceName = Data.AlertInfoAccountName;
                                    res.rows.map((x) => {
                                        x.list_Accounts = Data.AlertInfoAccountId.filter((d) => {
                                            console.log(d);
                                            return x.AccountID == d.AccountID
                                        });
                                        return x;
                                    })
                                }
                                return res
                            });
                    } else {
                        return res
                    }
                })
                //return Object.assign(this, res);
                //return Object.assign(this, res);
                break;

        }
    }

    getMemberAlertInfoBackend(rows) {

        // console.log(rows);

        var Account = rows.map((x) => {
            return { "AccountID": x.AccountID, "AccountName": x.AccountName }
        })
        //console.log(Account);
        //console.log(window.baseUrl[16]);

        return $.ajax({
            "method": 'post',
            "dataType": 'json',
            "url": chrome.runtime.getURL("/member/api/AlertInfoManage/GetMemberAlertInfoBackend"),
            //"url": window.baseUrl[16] + '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
            "data": angular.toJson({
                "DisplayArea": "1",
                "Account": Account
            })
        })
    }

    getTokenInfo(token) {
        if (token) {
            $.post('https://www.googleapis.com/oauth2/v2/tokeninfo', {
                access_token: token
            }, (tokenInfo) => {
                api.tokenInfo = tokenInfo;
                //localStorage.tokenInfo = angular.toJson(tokenInfo, true);
                console.log("[OK]", "tokenInfo")
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

    addListener() { chrome.runtime.onMessageExternal.addListener(this.onMessageExternal) }
    onMessage(request, sender, sendResponse) {}
    onMessageExternal(request, sender, sendResponse) {
        request.command = request.command.replace("#", "...arguments");
        //console.log(request.command);
        //console.log(request.unique);
        try {
            eval(request.command).then((s) => {
                //console.log(s);
                return sendResponse(s);
            });
            return true
        } catch (ex) {
            console.error(ex);
            return ex;
        }
    }
    get chrome_settings() { return ["chrome://extensions/", "chrome://settings/fonts", "chrome://flags/#enable-devtools-experiments"] }
    get audience() { return this.tokenInfo.audience; }
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

    sendSms(request, sender, sendResponse) {
        console.log(request);
        console.log(global.sms);

        var content = global.sms.get(request.channel);
        var mobile = "86" + request.mobile.value;
        var status = request.status;
        var requestUrl = 'http://client.motosms.com/smsc/smssend';
        //var content = decoder(localStorage.sms).toObj();
        //this.content = content[this.channel];
        return $.ajax({
            url: requestUrl,
            dataType: "html",
            method: 'post',
            data: {
                sender: '',
                phones: mobile,
                smscontent: content,
                taskType: 1,
                taskTime: '',
                batch: 1,
                splittime: 0,
                packid: ''
            }
        }).then((res, b, c) => {
            //this.sms.content = this.message
            if (res.match(/(msg = '')/)) { status = 200; }
            if (res.match(/(會員登錄)/)) { status = 401; }
            if (res.match(/(msg = '101')/)) { status = 101; }
            if (res.match(/(msg = '102')/)) { status = 102; }
            return status;

            return {
                mobile,
                content,
                status
            }
            //sendResponse(status);
        });

    }

    googleScripts(request, sender, sendResponse) {
        console.log(request);
        var user = request.user || request;
        delete user.banker[0].sites;
        delete user.idcard.sites;
        delete user.locate.sites;
        delete user.mobile.sites;
        delete user.author.sites;
        delete user.sendsms;
        /*-------------------------------------*/
        //user.audience = this.audience;
        //user.test = true;
        //user.command = "google:scripts";
        //user.region = user.region || [];
        //user.timing[2] = timeDiff(user.timing[0], user.timing[1], 'minute')
        //user.timespan = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log("++++++++++");
        console.log(user);
        console.log(this.macros);
        console.log(this.audience);

        return $.ajax({
            url: this.macros,
            method: 'get',
            data: {
                test: true,
                audience: this.audience,
                command: "google:scripts",
                module: user.module,
                user: angular.toJson(user)
            }
        }).then(function(d) {
            return d
            console.log(d);
        })
    }

    clear() {
        localStorage.clear();
    }

    toLocalStorage(res) {
        //console.log(res);
        if (typeof res) {
            return res.forEach(([name, value]) => { localStorage[name] = value; })
        }
    }

    toJson(res) { return res.json() }

    toText(res) { return res.text() }

    flat(arr) { return arr.flat(); }

    save(arr) {
        arr.forEach(([name, value]) => {
            localStorage[name] = value;
            global[name] = decoder(value);
        });

        global.gb2260 = new Map(global.gb2260);
        global.sms = new Map(global.sms);

        //console.log(global.gb2260);
        //console.log("[OK]", localStorage);
    }

    entries() {
        Object.entries(localStorage).forEach(([name, value]) => {
            if (name) {
                this.decoder(value, name)
            }
        })
    }

    get now() { return Date.now(); }
    get time() { return Date.now(); }


    get user() {
        var _store = this.store;
        return {
            get(unique) {
                return _store.user.get(unique)
            },
            put(obj) {
                return _store.user.put(obj)
            },

        }
    }

    timeDiff() {

    }

    async xmlHttp(request, sender, sendResponse) {
        //console.log(request.$unique);
        //console.log(request.sendData);
        var ACTION = request.action;
        var SERVER = request.server;
        if (SERVER == "ku711") {
            switch (ACTION) {
                case "UpdateMemberRiskInfoAccountingBackend":
                    console.log(request);
                    //console.log(request);
                    var unique = [request.sendData.AccountID, request.channel].toUnique();
                    var user = await this.user.get(unique);
                    if (user.module) { return }
                    if (user.status[0] == user.status[1]) { return }
                    user.module = (user.status[0] == 3) ? "authorize" : "suspended"

                    user.status.push(request.sendData.MemberStatus)
                    user.permit.push(request.sendData.IsDeposit)
                    user.timing.push(request.timeSpan)
                    user.timing.timeDiff();
                    if (user.status[0] == 3 || user.status[1] == 1) {
                        user.sendSms = true;
                    }
                    this.user.put(user);
                    console.log(user);
                    break;
                default:

                    // statements_def
                    break;
            }
        }

        if (SERVER == "wa111") {
            switch (ACTION) {
                case "btnUserSet":
                    console.log(request);
                    if (request.respData == "u-ok") {
                        var unique = [request.sendData.account, request.channel].toUnique();
                        var user = await this.user.get(unique);
                        if (user.module) { return } else {
                            if (user.permit[0] == request.sendData.isOpenDeposit) {
                                return;
                            } else {
                                user.module = (user.status[0] == 3) ? "authorize" : "suspended";
                                if (request.sendData.ishow == 3 && request.sendData.isOpenDeposit == 1) { request.sendData.ishow = 1; }
                                user.status.push(request.sendData.ishow)
                                user.permit.push(request.sendData.isOpenDeposit)
                                user.timing.push(request.timeSpan)
                                user.timing.timeDiff();
                                if (user.status[0] == 3 || user.status[1] == 1) {
                                    user.sendSms = true;
                                }
                            }
                        }
                    }
                    //console.log(user);
                    break;
                default:

                    // statements_def
                    break;
            }
        }



        /***********************************/
        if (user) {
            this.user.put(user);
            console.log(user, user.module);
            //this.googleScripts(user);
        }
        //
        /**********************************/



        /*
        var { action, sendData, channel } = request;

        var unique = sendData.account + "-" + channel;

        var unique = sendData.account + "-" + channel;
*/

        //var user = await this.user.get(unique);
        //this.unique = unique;
        //console.log(unique);
        //console.log(user);
        //var user = await getUser(unique);
        /*
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

        }*/
        //sendResponse(2324)
    }
}




var api = new apis();
console.log(api);










/*
     global.locate = [];
     global.locate.push(["223.104"])
     global.mobile.push(["135149"])
     global.banker.push(["6217856300025"])
     global.idcard.push(["340122198"])
     global.author.push(["王杰"])
     */


/*
                  region.meta = arr[1];
                  str = str.replace(/(.+(省|自治区))/g, '');
                  region.prov = RegExp.$1;
                  str = str.replace(/(.+(市|州))/g, '');
                  region.city = RegExp.$1;
                  str = str.replace(/(.+(县|区))/g, '');
                  region.area = RegExp.$1;
                  */


/*
class xmlHttp {
    getmodel() {
        console.log(this);
    }
}
*/



/*
    //url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
test: true,
audience: angular.fromJson(localStorage.tokenInfo).audience,
//command: request.command,
module: request.module,
params: angular.toJson(request)
*/








/*if (request.callee == "locate") {
          eval(request.command).call(request, sender, sendResponse).then((s) => {
              console.log(s);
              return sendResponse(s)
          })
          return true
      }
      */
//if (request.command.includes("#")) {}




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

/*
var c = chrome.identity.getRedirectURL()

console.log(c);

chrome.identity.getAuthToken({
    "interactive": true
}, (rs) => { console.log(rs); })
*/