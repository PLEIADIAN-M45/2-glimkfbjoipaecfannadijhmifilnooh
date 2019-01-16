apis.baseUrl = {};

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if(details.initiator == location.origin) { return };
    if(details.initiator.includes("wa111")) { var port = details.initiator.replace('http://host', '').replace('http://admin', '').replace('-2.wa111.net', '').replace('.wa111.net', '').padStart(2, '0'); }
    if(details.initiator.includes("ku711")) { var port = "16" }
    if(details.initiator.includes("tp33")) { var port = details.initiator.replace('http://q51.tp33.net:63', ''); }
    apis.baseUrl[port] = details.initiator;
}, { urls: ["*://*.wa111.net/*"], types: ["xmlhttprequest"] }, ['blocking']);


chrome.webRequest.onBeforeSendHeaders.addListener(function({ url, method, type, requestHeaders, initiator }) {
    if(initiator == location.origin) {
        requestHeaders.push({ name: 'referer', value: url });
        requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
        requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['RequestVerificationToken'] });
        return { requestHeaders: details.requestHeaders }
    } else { if(details.method == "POST") { details.requestHeaders.filter(({ name, value }) => { if(name == "RequestVerificationToken") { localStorage[name] = value; } }) } }
}, { urls: ["*://*.ku711.net/*"], types: ["xmlhttprequest"] }, ['requestHeaders', 'blocking']);