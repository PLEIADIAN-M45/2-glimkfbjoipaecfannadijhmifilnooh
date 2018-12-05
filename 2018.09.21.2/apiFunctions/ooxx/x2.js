

/*
chrome.webRequest.onResponseStarted.addListener(function(details) {
    console.log(details);
}, {
    urls: [
        "<all_urls>"
    ]
}, ['responseHeaders'])
*/
   //console.log("----------------------------------");
    // details.responseHeaders[1].value = "*"
    //details.responseHeaders.push({ name: "Access-Control-Allow-Headers", value: "*" })

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
        //details.requestHeaders.push({ name: "Access-Control-Allow-Headers", value: "*" });
       // details.requestHeaders.push({ name: "Access-Control-Allow-Headers", value: "Origin, X-Requested-With, Content-Type, Accept, data" });
        details.requestHeaders.push({ name: "Access-Control-Allow-Headers", value: "*" });
        //details.requestHeaders.push({ name: "Accept", value: "application/json, text/plain, */*" });
        console.log(details);
        return { requestHeaders: details.requestHeaders };
    }, {
        urls: [
            //"<all_urls>",
            "*://*/putUser",
            "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/*"
        ]
    },
    ["blocking", "requestHeaders"]);


chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(details);


    if(details.requestBody) {
        if(details.requestBody.formData) { var str = JSON.stringify(details.requestBody.formData) }
        if(details.requestBody.raw) { var str = parserRaw(details.requestBody) }
        var res = btoa(str);
    }

    //console.log(str);
    //console.log(res);
    //window.redirectUrl = "data:application/json;base64," + res;
    //window.redirectUrl = "data:application/json;charset=utf-8," + JSON.stringify({ "a": 1, "b": 2 });

    window.redirectUrl = "data:," + JSON.stringify({ "a": 1, "b": 2 });
    //window.redirectUrl = "data:," + res
    //JSON.stringify({"a":1, "b": 2});
    console.log(window.redirectUrl);


    //console.log(details);
    // console.log(de);

    return { redirectUrl: window.redirectUrl }

}, {
    urls: [
        "*://*/putUser*"
        //"<all_urls>"

    ]
}, ['requestBody', 'blocking']);




Mock.mock(/(chromiumapp)/, 'POST', function(req) {
    console.log(req);

    //return Mock.mock({ "total": 0, "records": 0, "rows": [], "text": false, "Language": 0, "isYnYx": false })
});


Mock.mock(/(chromiumapp)/, 'GET', function(req) {
    console.log(req);

    //return Mock.mock({ "total": 0, "records": 0, "rows": [], "text": false, "Language": 0, "isYnYx": false })
});

