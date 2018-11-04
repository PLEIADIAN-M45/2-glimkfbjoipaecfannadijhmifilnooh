function refreshAllWindow() {

    chrome.tabs.getAllInWindow((tabs) => {
        tabs.filter((tab) => {
            if(tab.url.includes('127.0.0.1')) {
                //console.log(tab.url);
                chrome.tabs.reload(tab.id)
            }

            //["127.0.0.1", "wa111", "ku711", "tp33"]

            /*.filter((host) => {
                return tab.url.includes(host);
            }).forEach((tab) => {
                console.log(tab.id);
                //chrome.tabs.reload(tab.id)
            })*/
        })

    })
}

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.runtime.reload();
});

chrome.runtime.onInstalled.addListener((details) => {
    switch (details.reason) {
        case "install":
            break;
        case "update":
            refreshAllWindow();
            break;
    }
});


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