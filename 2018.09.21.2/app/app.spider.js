//define(["app.spider.extend", "md5"], function({ $getAllResponseHeaders, $serialize, $fromJson, $tryJson, $hostname, $lastPath, $mimeType, $dataRows }) {
define(["app.spider.extend", "md5"], function(ext) {
    //console.log(ext);

    //http://2ality.com/2015/08/es6-map-json.html
    //https://developer.mozilla.org/zh-TW/docs/Web/API/XMLSerializer

    function strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            console.log(k, v);
            // We don’t escape the key '__proto__'
            // which can cause problems on older engines
            obj[k] = v;
        }
        return obj;
    }

    function strMapToObj2(_url) {
        console.log(_url);
        let obj = Object.create(null);
        Array.from(_url.searchParams.entries()).forEach(([k, v]) => { obj[k] = v; });
        return obj;
    }

    function mapToJson(map) {
        return JSON.stringify([...map]);
    }

    function jsonToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }

    var obj = { postData: {} };

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
            //console.log(arguments);
            //obj.url = new URL(url.replace('..', location.origin))

            //var _url = new URL(url.replace('..', location.origin))

            obj.method = method;
            //obj.origin = _url.origin;
            //obj.lastPath = _url.pathname.split('.')[0].split('/').pop();
            obj.server = localStorage.server;
            obj.channel = localStorage.channel;
            obj.operator = localStorage.operator;


            //url.replace('..', location.origin);

            //var u = new URL(_url)
            //console.log(method);
            //console.log(u);

            //url.split('?')[0].split('/').pop().replace(/\.\w+/, '');




            return open.apply(this, arguments);
        };
        xmlSpider.setRequestHeader = function(name, value) {
            //this.requestHeaders[name] = value;
            return setRequestHeader.apply(this, arguments);
        };
        xmlSpider.send = function(postData) {

            if (postData) {
                //console.log(postData);
                //console.log(angular);
                var object = {};
                if (obj.server == "wa111") {
                    postData.split("&").map((str) => { return "object." + str.replace("=", "=decodeURI('") + "')"; }).map((str) => { eval(str) });
                }
                if (obj.server == "ku711") {
                    object = angular.fromJson(postData)
                }

                obj.postData = object;


            }





            this.addEventListener('loadstart', this.loadstart);
            this.addEventListener('load', this.load);
            this.addEventListener('loadend', this.loadend);
            return send.apply(this, arguments);
        };
        xmlSpider.loadstart = function() { /*cant catch respData yet.*/ }



        xmlSpider.load = function(progressEvent) {

            /*
            progressEvent.currentTarget.responseURL
            progressEvent.timeStamp
            progressEvent.total
            progressEvent.loaded
            progressEvent.type
            */
            //console.log(this);


            var _url = new URL(this.responseURL);

            if (_url.search) {
                obj.sendData = strMapToObj2(_url);
                obj._type = obj.sendData.type
                obj._action = obj.sendData.action
            }

            obj._lastPath = this.responseURL.split('/').pop().split('.')[0];



            try {
                var _response = angular.fromJson(this.response);
            } catch (ex) {
                var _response = this.response;
            }

            switch (obj.server) {
                case "wa111":

                    obj._response = _response

                    // _response.rows || _response;



                    break;
                case "ku711":
                    //var _response = angular.fromJson(this.response)
                    obj._response = _response.Data.Data || _response.Data || _response;
                    break;

            }


            console.log(obj);

            //.split('?')[0].split('.')[0].

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

            //console.log(this);


            //this.apis.sendMessage(obj);


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