chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {})
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if(sender.tab.url.includes("127.0.0.1")) { runLoalSetting(); }
    if(!request.params) { return };
    var target = apis[request.caller];
    if(typeof target == "object") { sendResponse(target) } else { target(request.params, sender, sendResponse).then(viewer).then(sendResponse).catch(sendResponse) }
    return true;
});

chrome.tabs.create({ url: "option/option.html" })
chrome.runtime.onInstalled.addListener((details) => {
    switch (details.reason) {
        case "install":
            break;
        case "update":
            refreshAllWindow();
            break;
    }
});