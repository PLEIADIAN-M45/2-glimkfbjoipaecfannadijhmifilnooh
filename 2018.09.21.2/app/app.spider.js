//define(["app.spider.extend", "md5"], function({ $getAllResponseHeaders, $serialize, $fromJson, $tryJson, $hostname, $lastPath, $mimeType, $dataRows }) {
define(["app.spider.extend", "app.spider.loadend", "md5"], function(ext, _loadend) {

    //console.log(ext);

    try {

        var { send, open, setRequestHeader } = XMLHttpRequest.prototype;

        var xmlSpider = XMLHttpRequest.prototype;

        xmlSpider.open = function(method, url, async, user, password) {
            this.startedDateTime = Date.now();
            this.url = url.replace('..', location.origin);
            this.method = method;
            this.requestHeaders = {};
            return open.apply(this, arguments);
        };

        xmlSpider.setRequestHeader = function(name, value) {
            this.requestHeaders[name] = value;
            return setRequestHeader.apply(this, arguments);
        };

        xmlSpider.send = function(postData) {
            //console.log(arguments);
            this.postData = postData;
            this.addEventListener('loadstart', this.loadstart);
            this.addEventListener('load', this.load);
            this.addEventListener('loadend', this.loadend);
            return send.apply(this, arguments);
        };

        //onloadstart
        //onload
        //onloadend
        //console.log(moment);
        xmlSpider.loadstart = function() {
            /*cant catch respData yet.*/
        }




        xmlSpider.load = function() {
            this.extensionId = localStorage.extensionId;
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
            this.action = this.sendData.action || this.lastPath;

            //this.sendData.type
            // this.caller = "xmlSpider";
            var {
                action,
                respData,
                sendData,
                server,
                channel
            } = this;


            /*
            chrome.runtime.sendMessage(
                this.extensionId, {
                    caller: "xmlSpider",
                    params: [
                        action,
                        respData,
                        sendData,
                        server,
                        channel
                    ],
                }, (res) => {
                    console.log(res);
                    //resolve(res);
                    //this.active = false;
                })
    */


            this.MISSION = ext.MD5(this.lastPath)
            this.COMMANDER = this.action.toUpperCase();
            this.SEND_DATA = this.sendData;
            this.RESP_DATA = this.respData;
            this.EXTENSION = localStorage.extensionId;

            // _loadend(this)


            /*
            var COMMANDER = this.action.toUpperCase(),
                SEND_DATA = this.sendData,
                RESP_DATA = this.respData,
                EXTENSION = localStorage.extensionId;
            */

            //_loadend(COMMANDER, SEND_DATA, RESP_DATA, EXTENSION, this)
            //this.action = MD5(this.sendData.action) || MD5(this.sendData.type) || MD5(this.lastPath)
            //this.moment = Date.now();
            //this.$unique = window.$unique;
            //moment().format("YYYY-MM-DD HH:mm:ss")
            //console.log(window.$unique);
            //console.log(this.$scope);
        }

        /*function() {
            //console.log(3);
            //console.log(this);
            //console.log(this.extensionId);
            /*
            getmodel: 開通表
            StopMember:
            getDepositBonusList:
            delDiceWinRecords:
            DelDiceWinRecords:
            -------------------------
            UpdateMemberBonusLog
            GetMemberBonusLogBackendByCondition
            UpdateMemberRiskInfoAccountingBackend
            UpdateMemberSNInfoBackend
            UpdateMemberRisksInfoBackendIsFSuspension
            
        };
        */
        xmlSpider.loadend = async function xmlSpider() {
            console.log(this.action);
            //console.log(this.unique);
            //console.log(xmlSpider.unique);
            this.apis.sendMessage(this);

            switch (this.action) {
                case "getDepositBonusList":
                    //this.apis.getUser();
                    break;

                case "btnUserSet":
                case "UpdateMemberRiskInfoAccountingBackend":
                    //if ($scope.user) {};
                    //this.user = this.$scope.user;
                    //this.user = await this.apis.getUser();
                    break;
                case "getmodel":
                    this.apis.getUser();
                    break;
                case "-------":
                    break;
            }

            //_loadend.call(this, this)

        };
        return xmlSpider;


    } catch (ex) {
        console.error('xmlSpider');
    }
});








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