//window.origins.set(port.name, url.origin);
console.log("background.webRequest.js");

//{2}

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
window.origins = new Map();
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    window.origins.set("16", details.initiator);
}, { urls: ["https://bk.ku711.net/*"], types: ["xmlhttprequest"] }, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    var port = details.initiator.replace('http://host', '').replace('http://admin', '').replace('-2.wa111.net', '').replace('.wa111.net', '').padStart(2, '0');
    window.origins.set(port, details.initiator);
    console.log(port, details.initiator);
}, { urls: ["*://*.wa111.net/*"], types: ["xmlhttprequest"] }, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    var port = details.initiator.replace('http://q51.tp33.net:63', '');
    window.origins.set(port, details.initiator);
}, { urls: ["*://q51.tp33.net/*"], types: ["xmlhttprequest"] }, ['blocking']);

/*
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    //console.log(details);
    var url = new URL(details.url);
    console.log(url);
}, { urls: ["*://127.0.0.1/*"], types: ["xmlhttprequest"] }, ['blocking']);
*/
/**************************************************************************************************************/

function forTest() {
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        //console.log(details);
        var redirectUrl = details.url.replace('bk.ku711.net', '127.0.0.1:16').replace('https', 'http')
        return { redirectUrl }
        if (details.initiator == location.origin) {

        };
    }, { urls: ["*://bk.ku711.net/*"], }, ['blocking']);

    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        //console.log(details);
        var redirectUrl = details.url.replace('bkku711.kucdn.net', '127.0.0.1:16').replace('https', 'http')
        return { redirectUrl }
        if (details.initiator == location.origin) {

        };
    }, { urls: ["*://bkku711.kucdn.net/*"], }, ['blocking']);
}


/*
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) {
        var redirectUrl = "https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?" + details.url.split('?')[1];
        console.log(redirectUrl);
        return { redirectUrl }
    };
}, { urls: ["https://www.evo.com/*"], }, ['blocking']);
*/

/*
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(details);

    if (details.initiator == location.origin) {
        //var redirectUrl = "https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?" + details.url.split('?')[1];
        //return { redirectUrl }
    };
}, { urls: ["chrome-extension://glimkfbjoipaecfannadijhmifilnooh/apis/*"], }, ['blocking']);
*/


/*
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(details);
    if (details.initiator == location.origin) {
        //var redirectUrl = "https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?" + details.url.split('?')[1];
        //return { redirectUrl }
    };
}, { urls: ["chrome-extension://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/idcard"], }, ['blocking']);
*/