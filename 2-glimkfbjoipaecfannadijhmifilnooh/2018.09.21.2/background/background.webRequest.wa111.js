function onCompleted() {
    chrome.webRequest.onCompleted.addListener(function(details) {
        console.log(details);
    }, { urls: ["http://*.wa111.net/*"], types: ["xmlhttprequest"] }, ["responseHeaders"]);
}



/*chrome.tabs.executeScript(details.tabId, {
    code: "console.log('******************************')"
}, function(d) { console.log(d) })*/