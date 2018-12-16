define(['prototype', 'xmlSpider.extend'], function(prototype, extend) {


    function $getAllResponseHeaders(obj) {
        return obj.getAllResponseHeaders().split('\r').map((x) => {
            return x.split(":")
        }).serialize();
    };

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
            this.addEventListener('load', this.load);
            this.addEventListener('loadend', this.loadend);
            return send.apply(this, arguments);
        };

        xmlSpider.loadend = function() {};

        xmlSpider.load = function() {
            //console.log(this);
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
            /*-------------------------------------------------------------------------------------------------------*/
            this.action = this.sendData.action;
            this.type = this.sendData.type;

            chrome.runtime.sendMessage(this.extensionId, this);
        }

        Object.assign(xmlSpider.__proto__, extend);

        return xmlSpider;
    } catch (ex) {
        console.error('xmlSpider');
    }
})