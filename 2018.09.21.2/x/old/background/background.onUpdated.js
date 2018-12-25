function refreshAllWindow() {
    chrome.tabs.getAllInWindow(function(tabs) {
        //return
        tabs.forEach(function(tab, index) {
            chrome.tabs.reload(tab.id, function(d) {
                //console.log(d);
            })
        })
    })
}


chrome.runtime.onInstalled.addListener(function(details) {
    console.log(details);
    if (details.reason == "install") {
        refreshAllWindow()
    } else if (details.reason == "update") {
        refreshAllWindow()
    }
});


/*
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.runtime.reload();
})
*/