//window.origins.set(port.name, url.origin);

function lastPathOf(str) {
    var url = new URL(str);
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

function http() {
    var xmlhttp = {};
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        var { url, method, type, requestBody, initiator } = details;
        var lastPath = lastPathOf(url);
        var searchParams = searchParamsOf(url);
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
        urls: ["*://bk.ku711.net/*", "http://127.0.0.1:16/*"],
        types: ["xmlhttprequest"]
    }, ['requestBody', 'blocking'])
}

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var { url, method, type, requestHeaders, initiator } = details;
    var lastPath = lastPathOf(url);
    if (initiator == location.origin) {
        requestHeaders.push({ name: 'referer', value: url });
        requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
        requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['RequestVerificationToken'] });
        return { requestHeaders: details.requestHeaders }
    } else {
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


/**************************************************************************************************************/

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    window.origins.set("16", details.initiator);
}, { urls: ["https://bk.ku711.net/*"], types: ["xmlhttprequest"] }, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    var port = details.initiator.replace('http://host', '').replace('http://admin', '').replace('-2.wa111.net', '').replace('.wa111.net', '').padStart(2, '0');
    window.origins.set(port, details.initiator);
}, { urls: ["*://*.wa111.net/*"], types: ["xmlhttprequest"] }, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    var port = details.initiator.replace('http://q51.tp33.net:63', '');
}, { urls: ["*://q51.tp33.net/*"], types: ["xmlhttprequest"] }, ['blocking']);


/**************************************************************************************************************/

















/*
console.log(location.origin);
var a = chrome.runtime.getURL('').slice(0, -1);
console.log(a);
*/