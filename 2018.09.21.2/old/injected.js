var PATH = location.pathname.split('/').pop();
//console.log(PATH);
//console.log(12);
var i = 0;

window.Tamper = {};


sessionStorage.finished = false

;
(function(xhr) {
    var XHR = XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;
    var setRequestHeader = XHR.setRequestHeader;
    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        this._requestHeaders = {};
        this._startTime = (new Date()).toISOString();
        return open.apply(this, arguments);
    };
    XHR.setRequestHeader = function(header, value) {
        this._requestHeaders[header] = value;
        return setRequestHeader.apply(this, arguments);
    };
    XHR.send = function(postData) {

        this.addEventListener('load', function() {
            var endTime = (new Date()).toISOString();
            var myUrl = this._url ? this._url.toLowerCase() : this._url;

            //console.log(this);

            if (myUrl) {
                if (postData) {
                    if (typeof postData === 'string') {
                        try {
                            // here you get the REQUEST HEADERS, in JSON format, so you can also use JSON.parse
                            this._requestHeaders = postData;
                        } catch (err) {
                            console.log('Request Header JSON decode failed, transfer_encoding field could be base64');
                            console.log(err);
                        }
                    } else if (typeof postData === 'object' || typeof postData === 'array' || typeof postData === 'number' || typeof postData === 'boolean') {
                        // do something if you need
                    }
                }

                // here you get the RESPONSE HEADERS
                var responseHeaders = this.getAllResponseHeaders();


                //console.log(this.responseText);

                //console.log(this.responseURL);
                if (this.responseURL.includes('baidu')) {


                }

                if (this.responseURL.includes('host26.wa111.net')) {
                    //console.log(this);

                    try {
                        var d = JSON.parse(this.responseText);
                        //localStorage[path] = this.responseText
                        window.Tamper[path] = d.Data;
                        // console.log(i++, path, d.Data);

                        /*if (path == "GetCityInfoByCondition") {
                            console.log("-------------------------");
                            sessionStorage.finished = true
                        }*/
                    } catch (ex) {
                        //console.log(PATH, path, arr);
                        //console.warn(ex);
                        //console.log(PATH, path, d);
                    }
                }


                if (this.responseURL.includes('127.0.0.1') || this.responseURL.includes('bk.ku711.net')) {
                    //console.log(this);
                    var arr = this.responseText;
                    var path = this._url.split('/').pop();
                    try {
                        var d = JSON.parse(this.responseText);
                        //localStorage[path] = this.responseText
                        window.Tamper[path] = d.Data;
                        //console.log(i++, path, d.Data);

                        /*if (path == "GetCityInfoByCondition") {
                            console.log("-------------------------");
                            sessionStorage.finished = true
                        }*/
                    } catch (ex) {
                        //console.log(PATH, path, arr);
                        //console.warn(ex);
                        //console.log(PATH, path, d);
                    }
                }

                /*if (this.responseURL.includes('bk.ku711.net33')) {
                    //console.group(PATH)


                    if (this.responseType != 'blob' && this.responseText) {
                        // responseText is string or null
                        try {
                            // here you get RESPONSE TEXT (BODY), in JSON format, so you can use JSON.parse
                            var arr = this.responseText;
                            var path = this._url.split('/').pop();
                            try {
                                window.Tamper[path] = d.Data;
                                console.log(d.Data);
                                if (PATH == "EditMemberInfoManage") {
                                    var d = JSON.parse(this.responseText);
                                    window.Tamper[path] = d.Data;
                                    console.log(d.Data);

                                    if (path == "GetCityInfoByCondition") {
                                        //console.log(window.Tamper);
                                    }
                                }
                            } catch (ex) {
                                console.log(PATH, path, arr);
                                console.warn(ex);
                                //console.log(PATH, path, d);
                            }
                        } catch (err) {
                            console.error("Error in responseType try catch");
                            console.error(err);
                        }
                    }
                }*/
            }
        });
        return send.apply(this, arguments);
    };

})(XMLHttpRequest);




/*

$(document).ajaxComplete(function(event, xhr, settings) {
    console.log(xhr);
});

if ($('#ipsearchinput')) {
    console.log(1);
}
*/

/*
setTimeout(function() {

    document.getElementById('ipsearchinput').value = "122.228.226.99"
    document.getElementById('ipsearchinput').click()
    document.getElementById('ipsearchinput').focus()

    document.getElementById('sogou_vr_20099801_taobtn_1').click()
}, 1000)
*/