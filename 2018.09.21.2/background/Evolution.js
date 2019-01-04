/*var store = new Dexie('evo');
store.version(5).stores({ user: 'unique', GB2260: 'code' });
console.log(store);
*/

var GLOBAL = {};


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

class apis {

    constructor() {
        //super()
        this.store = new Dexie('evo');
        this.store.version(5).stores({ user: 'unique', GB2260: 'code' });
        //this.download();
        this.addListener();
        this.getAuthToken();
    }

    getTokenInfo(token) {

        console.log(token);
        // api.toLocalStorage

        if (token) {

            $.post('https://www.googleapis.com/oauth2/v2/tokeninfo', {
                access_token: token
            }, (tokenInfo) => {
                console.log(this);
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
        /*return new Promise((resolve, reject) => {

        })*/
    }

    addListener() {
        chrome.runtime.onMessageExternal.addListener(this.onMessageExternal)
    }

    onMessage(request, sender, sendResponse) {

    }

    onMessageExternal(request, sender, sendResponse) {
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
        if (window.localStorage.length < 51) {
            return Promise.all([
                fetch(this.macros + '?commands=GMA').then(this.toJson),
                fetch(this.macros + '?commands=GMB').then(this.toJson)
            ]).then(this.flat).then(this.save).then((x) => { console.log(localStorage); })
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
            GLOBAL[name] = decoder(value);
        });
        console.log(GLOBAL);
    }


    entries() {
        Object.entries(localStorage).forEach(([name, value]) => {
            if (name) {
                this.decoder(value, name)
            }
        })
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