function refreshAllWindow() {

    chrome.tabs.getAllInWindow((tabs) => {
        tabs.filter((tab) => {
            var flag = false;
            if (tab.url.includes('127.0.0.1')) { flag = true; }
            if (tab.url.includes('wa111')) { flag = true; }
            if (tab.url.includes('ku711')) { flag = true; }
            if (tab.url.includes('tp33')) { flag = true; }
            if (tab.url.includes('IGetMemberInfo')) { flag = true; }

            if (flag) { chrome.tabs.reload(tab.id); }

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