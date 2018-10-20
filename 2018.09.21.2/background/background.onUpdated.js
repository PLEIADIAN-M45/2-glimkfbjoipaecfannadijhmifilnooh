function refreshAllWindow() {
    chrome.tabs.getAllInWindow(function(tabs) {
        tabs.forEach(function(tab, index) {
            if (tab.url.includes('127.0.0.1') || tab.url.includes('wa111') || tab.url.includes('ku711')) {
                //if (tab.url.includes('host26')) {
                chrome.tabs.reload(tab.id, function(d) {
                    //console.log(d);
                })
            }
        })
    })
}

/*
chrome.runtime.onInstalled.addListener(function(details) {
    console.log(details);
    if (details.reason == "install") {
        refreshAllWindow()
    } else if (details.reason == "update") {
        refreshAllWindow()
    }
});
*/


chrome.browserAction.onClicked.addListener(function(tab) {
    
    chrome.runtime.reload();
})

/*
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.captureVisibleTab(tab.windowId, {
        format: 'png'
    }, function(dataUrl) {
        console.log(dataUrl);
        fs.createWriter(dataUrl)
    })
})
*/