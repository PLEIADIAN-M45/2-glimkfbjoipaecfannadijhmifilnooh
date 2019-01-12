define(["md5"], function(md5) {
    function MD5(str) { return CryptoJS.MD5(str.toUpperCase()).toString().toUpperCase(); };
    function parseToObject(str) { if (str.includes("?")) { str = str.split("?")[1]; } if (str.includes("&")) { try { let obj = Object.create(null);
                str.split("&").map((_str) => { return _str.split('='); }).map(([key, value]) => { obj[key] = value; }); return obj; } catch (ex) { return str; } } else { return str; } };
    function parseToJson(str) { try { return angular.fromJson(str); } catch (ex) { return parseToObject(str); } };
    function parseToPath(str) { return str.split('/').pop().split('.')[0]; }

    try {
        var { send, open, setRequestHeader } = XMLHttpRequest.prototype;
        var xmlSpider = XMLHttpRequest.prototype;
        xmlSpider.open = function(method, url, async, user, password) {
            this.method = method;
            return open.apply(this, arguments);
        };

        xmlSpider.send = function(postData) {
            this.postData = postData;
            this.addEventListener('loadstart', this.loadstart);
            this.addEventListener('load', this.load);
            this.addEventListener('loadend', this.loadend);
            return send.apply(this, arguments);
        };

        xmlSpider.loadstart = function() {};
        xmlSpider.load = function xmlSpider(progress) {
            this.lastPath = parseToPath(this.responseURL);
            this.respData = parseToJson(this.responseText);
            this.sendData = (this.method == 'GET') ? parseToObject(this.responseURL) : parseToJson(this.postData);
            if (this.respData.rows) { this.dataset = this.respData.rows };
            if (this.respData.Data) { this.dataset = this.respData.Data };
            if (this.dataset && this.dataset.Data) { this.dataset = this.dataset.Data };
            this.commander = this.sendData.action || this.sendData.type || this.lastPath;
            if (!isNaN(this.commander)) { this.commander = this.lastPath; };
            this.commander = this.commander.toUpperCase();
            var { commander, command, respData, sendData, dataset, apis } = this;
            var { server, channel, operator, unique } = this.$router;
            apis.sendMessage({ commander, command, respData, sendData, dataset, server, channel, operator, unique });
        }

        xmlSpider.loadend = function() {
            console.log(this.commander);
            switch (this.commander) {
                case "GETMODEL":
                    this.apis.getUser();
                    console.log("**getUser");
                    break;
                default:
                    // statements_def
                    break;
            }
        };


        return xmlSpider;

    } catch (ex) {

        console.error('xmlSpider');
    }
});

//if (Number(this.commander)) { this.commander = this.lastPath };
//this.command = MD5(this.commander);

/*
var obj = {
    commander: commander,
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
*/






//http://2ality.com/2015/08/es6-map-json.html
//https://developer.mozilla.org/zh-TW/docs/Web/API/XMLSerializer

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