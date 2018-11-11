Array.prototype.toObj = function() {
    var obj = {};
    this.forEach(([name, value]) => { if(name && value) { obj[name.trim()] = value.trim() } });
    return obj;
}


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

function $dataRows({ respData }) { try { return respData.rows || respData.Data; } catch (ex) {} }

function $getAllResponseHeaders(obj) { return obj.getAllResponseHeaders().split('\r').map((x) => { return x.split(":") }).toObj(); }


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
    xmlSpider.loadend = function() {};
    xmlSpider.load = function() {
        this.command = "apiFunctions.XMLHttpRequest";
        this.responseHeaders = $getAllResponseHeaders(this);
        this.channel = localStorage.channel;
        //this.params = $serialize(location);
        this.hostname = $hostname();
        this.lastPath = $lastPath(this);
        this.sendData = $serialize(this);
        this.mimeType = $mimeType(this);
        this.respData = $tryJson(this);
        this.dataRows = $dataRows(this);
        this.timespan = Date.now();
        this.time = Date.now() - this.startedDateTime;
        Object.defineProperty(this, "cacheBonusData", {
            get: function() { return $tryJson(sessionStorage["cacheBonusData"]) },
            set: function(value) { sessionStorage["cacheBonusData"] = $fromJson(value); }
        });
        chrome.runtime.sendMessage(localStorage["chrome_runtime_id"], this);
    }
    xmlSpider.send = function(postData) {
        this.postData = postData;
        this.addEventListener('load', this.load);
        this.addEventListener('loadend', this.loadend);
        return send.apply(this, arguments);
    };
    return xmlSpider;
});