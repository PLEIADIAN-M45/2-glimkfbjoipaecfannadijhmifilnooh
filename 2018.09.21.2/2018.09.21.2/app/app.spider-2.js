//define(["app.spider.extend", "md5"], function({ $getAllResponseHeaders, $serialize, $fromJson, $tryJson, $hostname, $lastPath, $mimeType, $dataRows }) {
define(["app.spider.extend", "md5"], function(ext) {
    //console.log(ext);
    try {
        var { send, open, setRequestHeader } = XMLHttpRequest.prototype;
        var xmlSpider = XMLHttpRequest.prototype;
        xmlSpider.open = function(method, url, async, user, password) {
            //this.startedDateTime = Date.now();
            //this.url = url.replace('..', location.origin);
            //this.origin = location.origin;
            // var origin = new URL(params.url).origin;
            //this.method = method;
            //this.requestHeaders = {};
            return open.apply(this, arguments);
        };
        xmlSpider.setRequestHeader = function(name, value) {
            //this.requestHeaders[name] = value;
            return setRequestHeader.apply(this, arguments);
        };
        xmlSpider.send = function(postData) {

            this.postData = postData;

            this.addEventListener('loadstart', this.loadstart);
            this.addEventListener('load', this.load);
            this.addEventListener('loadend', this.loadend);
            return send.apply(this, arguments);
        };
        xmlSpider.loadstart = function() { /*cant catch respData yet.*/ }
        xmlSpider.load = function() {

            /*this.extensionId = localStorage.extensionId;
            this.operator = localStorage.operator
            this.channel = localStorage.channel;
            this.server = localStorage.server;
            this.unique = this.unique;
            //this.hostname = $hostname();
            this.responseHeaders = ext.$getAllResponseHeaders(this);
            this.lastPath = ext.$lastPath(this);
            this.sendData = ext.$serialize(this);
            this.mimeType = ext.$mimeType(this);
            this.respData = ext.$tryJson(this);
            this.dataRows = ext.$dataRows(this);
            this.timeSpan = Date.now();
            this.time = Date.now() - this.startedDateTime;
            if (this.respData && this.respData.Data && this.respData.Data.Message == "更新成功") { this.respData = 1; }
            this.type = this.sendData.type;
            this.action = this.sendData.action || this.lastPath;*/
        }

        xmlSpider.loadend = async function xmlSpider() {

            console.log(this);

            console.log(Object.keys(this));
            console.log(Object.keys(this.__proto__));


            console.log(this);

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

            //_loadend.call(this, this)

        };

        return xmlSpider;


    } catch (ex) {
        console.error('xmlSpider');
    }
});




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