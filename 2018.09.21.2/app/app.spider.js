define(["app.spider.extend", "md5"], function(_xmlSpider) {


    // console.log(CryptoJS);
    //var c = CryptoJS.MD5("CODE").toString()
    //console.log(c);

    var MD5 = function() {
        return CryptoJS.MD5("CODE").toString().toUpperCase();
    }

    //console.log(MD5("CODE"));

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


        xmlSpider.loadend = function() {

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
            */
        };

        xmlSpider.load = function() {
            //console.log(this);
            //console.log(2);
            //this.command = "api.xmlHttp(...arguments)";
            //this.command = "new xmlHttp(...arguments)";





            this.channel = localStorage.channel;
            this.server = localStorage.server;
            this.responseHeaders = $getAllResponseHeaders(this);
            //this.hostname = $hostname();
            this.lastPath = $lastPath(this);
            this.sendData = $serialize(this);
            this.mimeType = $mimeType(this);
            this.respData = $tryJson(this);
            this.dataRows = $dataRows(this);

            this.timeSpan = Date.now();

            this.time = Date.now() - this.startedDateTime;

            if(this.respData && this.respData.Data && this.respData.Data.Message == "更新成功") { this.respData = 1; }

            this.type = this.sendData.type;

            //this.action = MD5(this.sendData.action) || MD5(this.sendData.type) || MD5(this.lastPath)

            this.action = this.sendData.action || this.sendData.type || this.lastPath;

            this.caller = "xmlSpider"
            //this.moment = Date.now();
            //this.$unique = window.$unique;
            //moment().format("YYYY-MM-DD HH:mm:ss")
            //console.log(window.$unique);


            var extensionId = localStorage.extensionId;





            //console.log(this.$scope);
        }

        /*
        class xmlSpider_ extends _xmlSpider {

            constructor(sp) {
                super();

                console.log(super.responseHeaders);

            }

        }
        var c = new xmlSpider_();
        */





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