define([], function() {


    function $getAllResponseHeaders(obj) {
        return obj.getAllResponseHeaders().split('\r').map((x) => {
            return x.split(":")
        }).serialize();
    };


    function $serialize({ href, url, postData }) {
        var obj = {};
        if(href) { if(href.includes('?')) { decodeURIComponent(href).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        if(url) { if(url.includes('?')) { decodeURIComponent(url).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        if(postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        return obj;
    }

    function json(str) { try { if(str.constructor.name == "Response") { return str.json() } if(typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };

    function $fromJson(obj) { try { var str = JSON.stringify(obj); } catch (ex) { var str = obj; } return str; }

    function $tryJson({ responseText }) { try { return JSON.parse(responseText); } catch (ex) { return responseText } }

    function $isJson(d) { try { JSON.parse(d); } catch (ex) { return false; } return true; }

    function $hostname() { if(location.port) { return { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port]; } else { return location.hostname.split('.')[1]; } }

    function $lastPath({ url }) { return url.split('?')[0].split('/').pop().replace(/\.\w+/, ''); }

    function $mimeType({ responseText }) { return $isJson(responseText) ? "json" : "text"; }

    function $dataRows({ respData }) { try { return respData.rows || respData.Data.Data; } catch (ex) {} };

    function trim(value) { return value.toString().trim() };

    function s(a) { console.log(a); }


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


        xmlSpider.loadstart = function() {
            /*cant catch respData yet.*/

        }


        xmlSpider.load = function() {
            //console.log(2);
            this.command = "api.xmlHttp(...arguments)";
            //this.command = "new xmlHttp(...arguments)";
            this.extensionId = localStorage.$extensionId;
            this.channel = localStorage.$channel;
            this.responseHeaders = $getAllResponseHeaders(this);
            this.hostname = $hostname();
            this.lastPath = $lastPath(this);
            this.sendData = $serialize(this);
            this.mimeType = $mimeType(this);
            this.respData = $tryJson(this);
            this.dataRows = $dataRows(this);
            this.timespan = Date.now();
            this.time = Date.now() - this.startedDateTime;
            if(this.respData && this.respData.Data && this.respData.Data.Message == "更新成功") { this.respData = 1; }
            this.action = this.sendData.action;
            this.type = this.sendData.type;

            //console.log(this.$scope);
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