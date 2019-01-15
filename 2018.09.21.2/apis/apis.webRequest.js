chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var { url, method, type, requestHeaders, initiator } = details;
    //console.log(details);
    if (initiator == location.origin) {
        requestHeaders.push({ name: 'referer', value: url });
        requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
        requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['RequestVerificationToken'] });
        return { requestHeaders: details.requestHeaders }
    } else {
        if (details.method == "POST") {
            details.requestHeaders.filter(({ name, value }) => { if (name == "RequestVerificationToken") { localStorage[name] = value; } })
        }
    }
}, { urls: ["*://*.ku711.net/*"], types: ["xmlhttprequest"] }, ['requestHeaders', 'blocking']);

/**************************************************************************************************************/
apis.baseUrl = {};


chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    apis.baseUrl["16"] = details.initiator;
    //console.log(apis.baseUrl);
    //console.clear()
    //console.log(window.baseUrl);
}, { urls: ["*://bk.ku711.net/*"], types: ["xmlhttprequest"] }, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    //console.log(details);
    if (details.initiator == location.origin) { return };
    var port = details.initiator.replace('http://host', '').replace('http://admin', '').replace('-2.wa111.net', '').replace('.wa111.net', '').padStart(2, '0');
    apis.baseUrl[port] = details.initiator;
    //console.log(apis.baseUrl);
    //console.log(window.baseUrl);
}, { urls: ["*://*.wa111.net/*"], types: ["xmlhttprequest"] }, ['blocking']);


chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    var port = details.initiator.replace('http://q51.tp33.net:63', '');
    apis.baseUrl[port] = details.initiator;
    //console.log(apis.baseUrl);
}, { urls: ["*://q51.tp33.net/*"], types: ["xmlhttprequest"] }, ['blocking']);


console.log(apis.baseUrl);

/*
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(details);
}, { urls: ["*://127.0.0.1/*"], types: ["xmlhttprequest"] }, ['blocking']);
*/

/**************************************************************************************************************/
/*
chrome.webRequest.onCompleted.addListener(function(details) {
    console.log(details);
}, { urls: ["*://*.googlevideo.com/*", "*://*.google.com/*"] })
*/