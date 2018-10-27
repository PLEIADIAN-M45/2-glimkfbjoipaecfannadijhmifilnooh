


chrome.webNavigation.onCommitted.addListener(
    function(info) {
        console.log(info.url);
        if (info.url.includes('wa111.net')) {
            chrome.tabs.executeScript(info.tabId, {
                allFrames: true,
                runAt: "document_start",
                file: 'module/core/xmp.js'
                //file: 'module/injector.js'
            });
        }
    });