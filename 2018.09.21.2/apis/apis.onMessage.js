function viewer(res) { console.log(res); return res; }
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {})
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if(!request.params) { return };
    if(sender.tab.url.includes("127.0.0.1")) { window.isLocal = true; }
    apis[request.caller](...request.params).then(viewer).then(sendResponse);
    return true;
});
chrome.runtime.onConnectExternal.addListener((port) => { port.onMessage.addListener((msg) => { if(msg == "sender") { port.postMessage(port.sender) } }); });





//chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => { console.log(tabId, changeInfo, tab); })
//chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { console.log(tabId, changeInfo, tab); })
//chrome.runtime.onConnect.addListener(function(a) { console.log(a); })

console.log(chrome);