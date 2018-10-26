function onCompleted() {
    chrome.webRequest.onCompleted.addListener(function(details) {
        console.log(details);
    }, { urls: ["http://*.wa111.net/*"], types: ["xmlhttprequest"] }, ["responseHeaders"]);
}



/*chrome.tabs.executeScript(details.tabId, {
    code: "console.log('******************************')"
}, function(d) { console.log(d) })*/


chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var { url, method, type, requestBody, initiator } = details;
    var lastPath = lastPathOf(url);
    var searchParams = searchParamsOf(url);
    /* console.log(lastPath);
     console.log(details);
     console.log(requestBody);*/
if (requestBody && requestBody.formData) {

    console.log(requestBody.formData);

    var str = "";
    Object.entries(requestBody.formData).map(([name, value]) => {
        //console.log(name, value);
        str += `${name}=${value[0]}`;
    })
    console.log(str);
}






}, {
    urls: ["*://*.wa111.net/*", "http://127.0.0.1:26/*"],
    types: ["xmlhttprequest"]
}, ['requestBody', 'blocking'])



chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    //var { url, method, type, requestHeaders, initiator } = details;
    //var lastPath = lastPathOf(url);

    //details.requestHeaders.push({ name: "content-type", value: "application/x-www-form-urlencoded; charset=UTF-8" })
    //details.requestHeaders.push({ name: 'x-requested-with', 'XMLHttpRequest' })
    //console.log(2);
    //console.log(details);


    return { requestHeaders: details.requestHeaders }

}, {
    urls: ["*://*.wa111.net/*", "http://127.0.0.1:26/*"],
    types: ["xmlhttprequest"]
}, ['requestHeaders', 'blocking']);

/*
 requestHeaders.push({ name: 'referer', value: url });
        requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
        requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['RequestVerificationToken'] });
        return { requestHeaders: details.requestHeaders }*/