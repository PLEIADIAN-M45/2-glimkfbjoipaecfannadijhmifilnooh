function json(str) { try { if(str.constructor.name == "Response") { return str.json() } if(typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };



//function $fromJson(obj) { try { var str = JSON.stringify(obj); } catch (ex) { var str = obj; } return str; }


//function $serializeQueryString(url) { var obj = {}; if(url.includes('?')) { url.split('?')[1].split('&').map((x) => { return x.split('='); }).forEach(([name, value]) => { obj[name] = value; }); } else { url.split('=').forEach(([name, value]) => { obj[name] = value; }); } return obj; }

function $serialize({ url, postData }) {
    var obj = {};
    if(url.includes('?')) { url.split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); }
    if(postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    return obj;
}

function $tryJson({ responseText }) { try { return JSON.parse(responseText); } catch (ex) { return responseText } }

function $isJson(d) { try { JSON.parse(d); } catch (ex) { return false; } return true; }

function $hostname() { if(location.port) { return { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port]; } else { return location.hostname.split('.')[1]; } }

function $lastPath({ url }) { return url.split('?')[0].split('/').pop().replace(/\.\w+/, ''); }

function $mimeType({ responseText }) { return $isJson(responseText) ? "json" : "text"; }

;
(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object') module.exports = factory();
    else if(typeof define === 'function' && define.amd) define([], factory);
    else if(typeof exports === 'object') exports["xmlSpider"] = factory();
    else root["xmlSpider"] = factory();
})(this, function() {
    var { send, open, setRequestHeader } = XMLHttpRequest.prototype;
    var xmlSpider = XMLHttpRequest.prototype;
    xmlSpider.open = function(method, url, async, user, password) {
        this.url = url.replace('..', location.origin);
        this.method = method;
        this.requestHeader = {};
        return open.apply(this, arguments);
    };
    xmlSpider.setRequestHeader = function(name, value) {
        this.requestHeader[name] = value;
        return setRequestHeader.apply(this, arguments);
    };
    xmlSpider.loadend = function() {
        this.command = "apiFunctions.XMLHttpRequest";
        chrome.runtime.sendMessage(localStorage.chrome_runtime_id, this, (result) => { if(result) { console.log(result); } });
    };

    xmlSpider.load = function() {
        this.hostname = $hostname();
        this.lastPath = $lastPath(this);
        this.sendData = $serialize(this);
        this.mimeType = $mimeType(this);
        this.respData = $tryJson(this);
        console.log(this);
        return
        var { method, postData, response, responseText, responseType, responseURL, responseXML, readyState, status, statusText, timeout, withCredentials } = this;
        var { origin, host, hostname, pathname, port, search, searchParams } = new URL(responseURL);

        this.hostname = location.port || hostname.split('.')[1];
        this.lastPath = pathname.split('/').pop().replace(/\.\w+/, '');
        switch (this.hostname) {
            case "wa111":
            case "26":
                if(this.method == "GET") {
                    this.sendData = $serializeQueryString(this.responseURL);
                } else {
                    this.sendData = $serializeQueryString('?' + this.postData);
                }
                //this.command = this.sendData.action || this.sendData.type;
                break;
            case "ku711":
            case "16":
                if(this.method == "GET") {
                    this.sendData = $serializeQueryString(this.url);
                } else {
                    this.sendData = $toJson(this.postData);
                }
                break;
        }

        this.respData = $toJson(this.responseText);

        this.responseJSON = $toJson(this.responseText);


        if(this.respData) { if(this.respData.Data) { if(this.respData.Data.Message == "更新成功") { this.success = true; } } }


        try { this.dataRows = this.respData.rows || this.respData.Data.Data; } catch (ex) {}
        Object.defineProperty(this, 'cacheBonusData', {
            get: function() { return $toJson(sessionStorage["cacheBonusData"]) },
            set: function(value) { sessionStorage["cacheBonusData"] = $fromJson(value); }
        });
    }

    xmlSpider.send = function(postData) {
        //console.log(postData);
        this.postData = postData;
        this.addEventListener('load', this.load);
        this.addEventListener('loadend', this.loadend);
        return send.apply(this, arguments);
    };


    return xmlSpider;
});


//if(this.sendData) { if(window.moment) { this.sendData.timespan = moment().format('YYYY-MM-DD HH:mm:ss') } else { this.sendData.timespan = Date.now(); } }































//Spreadsheets.suspend(postData);
//Spreadsheets.suspended(postData);
//Spreadsheets.authorize(postData);
//Spreadsheets.authorization(postData);
//Spreadsheets.suspension(postData);
//Spreadsheets.bonus(postData);

//console.log(ctrl.select.ishow[pastData.f_ishow]);
//console.log(ctrl.select.ishow[postData.f_ishow]);




/*
return
if (this.respData.Data.Message == "更新成功") {

    var { MemberStatus, IsDeposit } = $scope.user;
    var pastData = {
        MemberStatus: Number(MemberStatus),
        IsDeposit: Number(IsDeposit)
    };
    var { MemberStatus, IsDeposit } = this.sendData;
    var sendData = {
        MemberStatus: Number(MemberStatus),
        IsDeposit: Number(IsDeposit)
    };

    if (sendData.MemberStatus !== pastData.MemberStatus) {
        Spreadsheets.authorize(sendData);
    }
}*/
//Spreadsheets.suspend(postData);
//Spreadsheets.suspended(postData);
//Spreadsheets.authorize(postData);
//Spreadsheets.authorization(postData);
//Spreadsheets.suspension(postData);
//Spreadsheets.bonus(postData);
/*
       Object.entries(this.respData).map(([key, value]) => {
           var name = key.replace('f_', '');
           postData[name] = value;
       });*/
//console.log(pastData.f_ishow, pastData.f_depositStatus);
//console.log(postData.f_ishow, postData.f_depositStatus);


//console.log(postData);
//Spreadsheets.authorize_wa111(pastData, postData);

//開通的情況
//console.log(this);
//console.log(this.respData);
//console.log($scope.user);
//console.log($scope.user.ishow, $scope.user.isOpenDeposit);
//console.log(this.respData.f_ishow, this.respData.f_depositStatus);
/*var pastData = {
    MemberStatus: Number(MemberStatus),
    IsDeposit: Number(IsDeposit)
};

var { MemberStatus, IsDeposit } = this.sendData;
var sendData = {
    MemberStatus: Number(MemberStatus),
    IsDeposit: Number(IsDeposit)
};
*/
/*
Object.defineProperty(this, 'cacheBonusData', {
    get: function() {
        return $toJson(sessionStorage["cacheBonusData"])
    },
    set: function(value) {
        sessionStorage["cacheBonusData"] = $fromJson(value);
        if (typeof value == "string") {
            sessionStorage["cacheBonusData"] = value;
        } else {
            sessionStorage["cacheBonusData"] = $fromJson(value);
        }
    },
    get delete() {
        console.log(99999999);
        sessionStorage.removeItem["cacheBonusData"]
    }
});*/
//Object.defineProperty(o, 'b', { get: function() { return this.a + 1; } });


/*
define(['xmlSpider'], function(xmlSpider) {

});
*/


/*

        class CacheBonusData {

            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            get() {
                return 3
            }

            set() {

            }

            toString() {
                return '(' + this.x + ', ' + this.y + ')';
            }

            delete() {
                console.log(99999999);
                sessionStorage.removeItem["cacheBonusData"]
            }
        }
        this.cacheBonusData = new CacheBonusData();

        console.log(this.cacheBonusData);

*/