//define(["app.spider.extend", "md5"], function({ $getAllResponseHeaders, $serialize, $fromJson, $tryJson, $hostname, $lastPath, $mimeType, $dataRows }) {
define(["md5"], function(md5) {


    function MD5(str) {
        return CryptoJS.MD5(str.toUpperCase()).toString().toUpperCase();
    }

    //http://2ality.com/2015/08/es6-map-json.html
    //https://developer.mozilla.org/zh-TW/docs/Web/API/XMLSerializer

    function strMapToObj(strMap) {
        let obj = Object.create(null);
        strMap.split("&").map((str) => {
            return str.split('=');
        }).map(([key, value]) => {
            obj[key] = value;
        })
        return obj;
    }

    try {
        var { send, open, setRequestHeader } = XMLHttpRequest.prototype;
        var xmlSpider = XMLHttpRequest.prototype;
        xmlSpider.open = function(method, url, async, user, password) {
            this.method = method;
            this.server = localStorage.server;
            this.channel = localStorage.channel;
            this.operator = localStorage.operator;
            this.unique = this.unique;
            return open.apply(this, arguments);
        };

        xmlSpider.setRequestHeader = function(name, value) {
            //this.requestHeaders[name] = value;
            return setRequestHeader.apply(this, arguments);
        };

        xmlSpider.send = function(postData) {
            if(postData) {
                postData = decodeURIComponent(postData);
                if(this.server == "wa111") {
                    this.sendData = strMapToObj(postData);
                    this.commander = this.sendData.action;
                }
                if(this.server == "ku711") {
                    this.sendData = angular.fromJson(postData);
                }
            }
            this.addEventListener('loadstart', this.loadstart);
            this.addEventListener('load', this.load);
            this.addEventListener('loadend', this.loadend);
            return send.apply(this, arguments);
        };

        xmlSpider.loadstart = function() { /*cant catch respData yet.*/ }

        xmlSpider.load = function(progressEvent) {
            try {
                var responseURL = decodeURIComponent(this.responseURL);
                var _url = new URL(responseURL);
                this.origin = _url.origin;
                if(_url.search) {
                    this.sendData = strMapToObj(responseURL.split("?")[1])
                    this.commander = this.sendData.type;
                }

                var lastPath = this.responseURL.split('/').pop().split('.')[0];
                if(this.server == "wa111") {
                    //this.commander
                    if(Number(this.commander)) {
                        this.commander = lastPath
                    }
                }
                if(this.server == "ku711") { this.commander = lastPath; }
            } catch (ex) {
                console.log(ex);
            }

            try {
                var response = decodeURIComponent(this.response);
                this.respData = angular.fromJson(response);
            } catch (ex) {
                this.respData = response;
            }


        }



        xmlSpider.loadend = function xmlSpider() {
            with(this) {
                var obj = {
                    commander: commander.toUpperCase(),
                    command: MD5(commander),
                    server,
                    origin,
                    respData,
                    sendData,
                    getter: respData,
                    setter: sendData,
                    unique,
                    operator,
                    channel,
                }
            }
            console.log(obj);
            this.apis.sendMessage(obj);
        };

        return xmlSpider;


    } catch (ex) {
        console.error('xmlSpider');
    }
});


/*console.log(Object.keys(this));
          console.log(Object.keys(this.__proto__));
          */


/*
switch (this.action) {
    case "btnUserSet":
    case "UpdateMemberRiskInfoAccountingBackend":
    case "GetMemberBonusLogBackendByCondition":
    case "StopMember":
    case "UpdateMemberRisksInfoBackendIsFSuspension":
    case "UpdateMemberSNInfoBackend":
    case "DepositBonus":
    case "GetMemberBonusLogBackendByCondition":
    case "UpdateMemberBonusLog":
    case "delDiceWinRecords":
    case "DelDiceWinRecords":

        this.apis.sendMessage(this);
        break;
    case "getmodel":
        this.apis.getUser();
        break;
}
*/

//_loadend.call(this, this)

/*
progressEvent.currentTarget.responseURL
progressEvent.timeStamp
progressEvent.total
progressEvent.loaded
progressEvent.type
*/
//console.log(this);

//this.cacheBonusData = setToMap('BonusNumber', this.respData.Data.Data)
//this.cacheBonusData = setToMap('f_id', this.respData.rows)



//xmlSpider.join = join;
//xmlSpider.join(robot);
//Object.assign(xmlSpider, loadend.prototype);

//console.log(this.getmodel);
//console.log(this);
//this.func = loadend.prototype[this.action];
//console.log(this.func);



//2018-12-24 21:30

//3--->right



//console.log(this.type);
//console.log(this);
//console.log(this);
/*this[this.action]
if (this[this.action]) {
    this[this.action]();
}*/
//console.log(this.xmlSpider_extend);
//if (this.xmlSpider_extend) { this.xmlSpider_extend.call(this); }
//xmlSpider.prototype = ;
//var fn =
//Object.assign(xmlSpider, new loadend(xmlSpider))
//console.log(loadend.prototype);
//console.log(xmlSpider.getmodel);
//console.log(xmlSpider);
//console.log(xmlSpider.prototype);