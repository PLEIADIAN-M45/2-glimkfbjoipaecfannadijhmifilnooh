function onBeforeSendHeaders() {

    chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {

        // console.log(details);

        if (details.initiator == location.origin) {
            details.requestHeaders.push({ name: 'referer', value: details.url });
            details.requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
            details.requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['ajax-anti-forgery-token'] });
            return { requestHeaders: details.requestHeaders }
        } else {
            if (details.method == "POST") {
                details.requestHeaders.filter(({ name, value }) => {
                    if (name == "RequestVerificationToken") { localStorage[name] = value; }
                })
            }
        }

    }, {

        urls: ["*://bk.ku711.net/*"],

        types: ["xmlhttprequest"]

    }, ['requestHeaders', 'blocking']);
}


//types:["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", or "other"]


onBeforeSendHeaders();

/*
var sampl222 = {
    frameId: 2299
    initiator: "https://bk.ku711.net"
    method: "POST"
    parentFrameId: 0
    requestBody: { raw: Array(1) }
    requestId: "47399"
    tabId: 141096775
    timeStamp: 1539961603971.549
    type: "xmlhttprequest"
    url: "https://bk.ku711.net/Member/api/PaymentSetting/GetOtherPaymentSettingByCondition"
}
*/


console.log(json);


var parser = function(requestBody) {
    if (requestBody) {
        var postedString = decodeURIComponent(String.fromCharCode.apply(null,
            new Uint8Array(requestBody.raw[0].bytes)));
        return postedString;
    } else {
        return null;
    }
}

/*
url.searchParams.append('x', 42);
url.searchParams.set('x', 42);
*/

//console.log(xmlhttp);

var xmlhttp = {};

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var { url, method, type, requestBody, initiator } = details;
    if (initiator == location.origin) {
        return true;
    } else {
        var dataType = 'json';
        var _url = new URL(url);
        var lastPath = _url.pathname.split('/').pop();

        var name = lastPath;

        var career = _url.host.split('.')[1];

        if (xmlhttp[lastPath]) {

        } else {
            if (method == "GET") {
                var entries = _url.searchParams.entries();
                var data = {};
                [...entries].map(([name, value]) => {
                    data[name] = value
                });
            } else {
                var data = json(parser(requestBody));
                //console.log(data, typeof data);
            }
            var obj = {
                career,
                name,
                settings: {
                    dataType,
                    url: url.split('?')[0],
                    method,
                    type,
                    data
                }
            };

            xmlhttp[lastPath] = obj;

            store.xmlhttp.put(obj)

            //console.log(xmlhttp);

            console.log(json(xmlhttp));


        }

    }



}, {
    urls: ["*://bk.ku711.net/*"],
    types: ["xmlhttprequest"]
}, ['requestBody', 'blocking'])






//YUNLANZONG258258@gmail.com
//FormDataItem