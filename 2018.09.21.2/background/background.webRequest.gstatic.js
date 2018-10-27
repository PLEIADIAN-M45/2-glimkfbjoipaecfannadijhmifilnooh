chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(1);

    var { url, method, type, requestBody, initiator } = details;
    var redirectUrl = url.replace('https://fonts.gstatic.com', chrome.runtime.getURL('font'))
    console.log(redirectUrl);
    return {
        redirectUrl
        //cancel: true

    };
}, {
    urls: ["https://fonts.gstatic.com/*"]
}, ['blocking']);
/*

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var { url, method, type, requestBody, initiator } = details;
    var redirectUrl = url.replace('https://fonts.gstatic.com', chrome.runtime.getURL('font'))
    //console.log(redirectUrl);
    console.log(2);

    return { redirectUrl };
}, {
    urls: ["https://fonts.gstatic.com/*"]
}, ['blocking']);*/

/*
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var { url, method, type, requestBody, initiator } = details;
    var redirectUrl = url.replace('http://127.0.0.1:16/Member/bundles', chrome.runtime.getURL('css'))
    console.log(redirectUrl);
    return { redirectUrl };
}, {
    urls: ["http://127.0.0.1:16/Member/bundles/css_main.css?*"]
}, ['blocking']);
*/