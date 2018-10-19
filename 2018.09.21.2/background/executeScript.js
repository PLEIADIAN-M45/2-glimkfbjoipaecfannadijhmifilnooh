/*

https://developer.chrome.com/extensions/tabs#event-onAttached

*/


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {


    //console.log(tabId, changeInfo);


    if (changeInfo.status === 'complete') {
        window.console.log('This message should not print when you navigate in the iframe but it does anyway');
    }

});

chrome.tabs.onActivated.addListener(function(activeInfo) {

    //console.log(activeInfo);

    chrome.tabs.get(activeInfo.tabId, function(tab) {

        //injectScript(tab.id);
    });
});


//Fired when a tab is closed.
//chrome.tabs.onRemoved.addListener(function callback)

chrome.tabs.connect(integer tabId, object connectInfo)

//Fired when a tab is attached to a window; for example, because it was moved between windows.
chrome.tabs.onAttached.addListener(function(tabId, attachInfo) {
    console.log(tabId, attachInfo);
});
chrome.tabs.sendMessage(integer tabId, any message, object options, function responseCallback)


chrome.tabs.getAllInWindow(integer windowId, function callback)

chrome.tabs.captureVisibleTab(integer windowId, object options, function callback)
chrome.tabs.highlight(object highlightInfo, function callback)
chrome.tabs.duplicate(integer tabId, function callback)




/*
chrome.tabs.executeScript(integer tabId, object details, function callback)


chrome.tabs.insertCSS(integer tabId, object details, function callback)

*/