function onBeforeSendHeaders() {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
            // console.log(details.url);
            if (details.type == "xmlhttprequest" && details.initiator == location.origin) {
                console.log(details);
                details.requestHeaders.push({ name: 'referer', value: details.url });
                details.requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
                details.requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['ajax-anti-forgery-token'] });
                return { requestHeaders: details.requestHeaders }
            }
        }, { urls: ["*://bk.ku711.net/*"] }, ['requestHeaders', 'blocking']);
}
onBeforeSendHeaders();

//console.log(chrome.runtime.getURL('laydate.css'));



chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        //console.log(details);
        return {
            redirectUrl: chrome.runtime.getURL('laydate.css')
        };
    }, { urls: ["*://js.kucdn.net/bundles/theme/default/laydate.*"] }, ["blocking"]);




chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details);
        return {
            //redirectUrl: chrome.runtime.getURL('laydate.css')
        };
    }, { urls: ["*://*/*"] }, ["blocking"]);




console.log(123);


/*
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        // console.log(details);
        //localStorage.baidu = angular.toJson(details)
        return { requestHeaders: details.requestHeaders }

    }, { urls: ["*://opendata.baidu.com/*"] }, ['requestHeaders', 'blocking']);


chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        console.log(details);
        // localStorage.sogou = angular.toJson(details)
        return { requestHeaders: details.requestHeaders }
    }, { urls: ["*://www.sogou.com/reventondc/external*"] }, ['requestHeaders', 'blocking']);



chrome.webRequest.onCompleted.addListener(function(details) {

    // console.log(details);


}, { urls: ["*://opendata.baidu.com/*"] });
*/
function xxx() {

    chrome.webRequest.onCompleted.addListener(function(details) {
        var path = details.url.split('/').pop()
        if (details.type == "xmlhttprequest") {
            if (path == "GetMemberRisksInfoBackendByAccountID") {
                chrome.tabs.executeScript(details.tabId, {
                    code: "console.log('******************************')"
                }, function(d) { console.log(d); })
            }
        }
    }, { urls: ["https://bk.ku711.net/Member/api/MemberInfoManage/*"] });

    //https: //bk.ku711.net/Member/MemberInfoManage/EditMemberInfoManage?accountId=dgsd446
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
            console.log(details);
            if (details.type == "xmlhttprequest2" && details.initiator == location.origin) {
                console.log(details);
                /*details.requestHeaders.push({ name: 'referer', value: details.url });
                details.requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
                details.requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['ajax-anti-forgery-token'] });*/
                return { requestHeaders: details.requestHeaders }
            }
        }, { urls: ["https://bk.ku711.net/Member/MemberInfoManage/EditMemberInfoManage?*"] }, ['requestHeaders', 'blocking']);
}

/*
chrome.runtime.onConnectExternal.addListener(function(port) {
    console.log(port);
})
*/
/*
chrome.tabs.executeScript(details.tabId, {
    file: "/module/main.require.js"
}, function(d) {
    console.log(d);
})*/





//console.log(chrome.webRequest);

//https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/filterResponseData
//https://dzone.com/articles/how-we-captured-ajax-api-requests-from-arbitrary-w