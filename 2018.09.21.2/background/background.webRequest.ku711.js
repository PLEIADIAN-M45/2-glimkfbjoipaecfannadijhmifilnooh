//window.origins.set(port.name, url.origin);

function lastPathOf(str) {
    var url = new URL(str);
    //console.log(url);
    //window.origins.set('16', url.origin);
    return url.pathname.split('/').pop();
}

function searchParamsOf(str) {
    var url = new URL(str);
    return url.searchParams;
}


function parser(requestBody) {
    if (requestBody) {
        var postedString = decodeURIComponent(String.fromCharCode.apply(null,
            new Uint8Array(requestBody.raw[0].bytes)));
        return postedString;
    } else { return null; }
}


var xmlhttp = {};
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var { url, method, type, requestBody, initiator } = details;
    var lastPath = lastPathOf(url);
    var searchParams = searchParamsOf(url);

    //var parameters = searchParams.entries()
    //console.log(initiator);
    //console.log(details);
    //console.log(requestBody);
    if (initiator == location.origin) {} else {
        var dataType = 'json';
        var data = {};
        if (!xmlhttp[lastPath]) {
            switch (method) {
                case "GET":
                    var entries = searchParams.entries();
                    [...entries].map(([name, value]) => { data[name] = value });
                    break;
                case "POST":
                    data = json(parser(requestBody));
                    break;
            }
            xmlhttp[lastPath] = {
                postData: json(parser(requestBody)),
                career: "KU711",
                lastPath,
                requestBody,
                settings: {
                    url: url.split('?')[0],
                    dataType,
                    method,
                    type,
                    data
                }
            };
        }
    }
}, {
    //urls: ["*://bk.ku711.net/*"],
    urls: ["*://bk.ku711.net/*", "http://127.0.0.1:16/*"],

    types: ["xmlhttprequest"]
}, ['requestBody', 'blocking'])



chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var { url, method, type, requestHeaders, initiator } = details;
    var lastPath = lastPathOf(url);

    //console.log(details);
    //console.log(initiator);
    console.log(details);


    if (initiator == location.origin) {
        // console.log('*************', url);
        requestHeaders.push({ name: 'referer', value: url });
        requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
        requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['RequestVerificationToken'] });
        return { requestHeaders: details.requestHeaders }
    } else {
        //console.log(xmlhttp);
        if (!xmlhttp[lastPath].requestHeaders) {
            xmlhttp[lastPath].requestHeaders = requestHeaders;
            store.xmlhttp.put(xmlhttp[lastPath]);
        }
        if (details.method == "POST") {
            details.requestHeaders.filter(({ name, value }) => {
                if (name == "RequestVerificationToken") { localStorage[name] = value; }
            })
        }
    }

}, {
    urls: ["*://bk.ku711.net/*", "http://127.0.0.1:16/*"],
    types: ["xmlhttprequest"]
}, ['requestHeaders', 'blocking']);











//webRequestInternal.eventHandled(string, string, string, boolean)
//webRequestInternal.eventHandled(string eventName, string subEventName, string requestId, optional object response)










function onBeforeSendHeaders() {}
onBeforeSendHeaders();


//console.log(details);
//requestBody = json(requestBody.formData)
//var redirectUrl = url.replace('https://bk.ku711.net', 'http://127.0.0.1:16');
//return { redirectUrl };
//console.log(redirectUrl);
//var career = _url.host.split('.')[1];
//types:["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", or "other"]


//YUNLANZONG258258@gmail.com
//FormDataItem


/*
url.searchParams.append('x', 42);
url.searchParams.set('x', 42);
*/

//console.log(xmlhttp);



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