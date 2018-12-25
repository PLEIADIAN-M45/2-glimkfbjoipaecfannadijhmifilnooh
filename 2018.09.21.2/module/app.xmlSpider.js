define(["app.xmlSpider.loadend"], function(loadend) {


    function $getAllResponseHeaders(obj) {
        return obj.getAllResponseHeaders().split('\r').map((x) => {
            return x.split(":")
        }).serialize();
    };

    try {

        var { send, open, setRequestHeader } = XMLHttpRequest.prototype;
        var xmlSpider = XMLHttpRequest.prototype;


        Object.assign(xmlSpider, loadend.prototype);

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
            this.addEventListener('load', this.load);
            this.addEventListener('loadend', this.loadend);
            return send.apply(this, arguments);
        };


        //loadend

        xmlSpider.loadend = function() {
            this.func = loadend.prototype[this.action];
            console.log(this.func);
        };


        xmlSpider.load = function() {
            this.command = "apiFunctions.XMLHttpRequest";
            this.extensionId = localStorage.extensionId;
            this.channel = localStorage.channel;
            this.responseHeaders = $getAllResponseHeaders(this);
            this.hostname = $hostname();
            this.lastPath = $lastPath(this);
            this.sendData = $serialize(this);
            this.mimeType = $mimeType(this);
            this.respData = $tryJson(this);
            this.dataRows = $dataRows(this);
            this.timespan = Date.now();
            this.time = Date.now() - this.startedDateTime;
            if (this.respData && this.respData.Data && this.respData.Data.Message == "更新成功") { this.respData = 1; }
            this.action = this.sendData.action;
            this.type = this.sendData.type;
            chrome.runtime.sendMessage(this.extensionId, this);
        }
        return xmlSpider;
    } catch (ex) {
        console.error('xmlSpider');
    }
});



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