chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {})
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    ///console.log(sender);
    if(!request.params) { return };
    if(sender.tab.url.includes("127.0.0.1")) { window.isLocal = true; }
    if(window.isLocal) { apis.baseUrl = { "0": "http://chrome.evo.net", "26": "http://host26.wa111.net", "35": "http://host35.wa111.net", "17": "http://host17.wa111.net", "16": "https://bk.ku711.net" } }
    //console.log(apis[request.caller]);
    apis[request.caller](...request.params, sender, sendResponse).then(viewer).then(sendResponse);
    return true;
});




chrome.runtime.onConnectExternal.addListener((port) => {
    port.onMessage.addListener((msg) => {
        console.log(msg);
        /*if(msg == "sender") {
            apis.port[port.sender.frameId] = port;
            console.log(apis.port);
            //console.log(port);
            port.postMessage(port.sender)
        }*/
    });
});





//chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => { console.log(tabId, changeInfo, tab); })
//chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { console.log(tabId, changeInfo, tab); })
//chrome.runtime.onConnect.addListener(function(a) { console.log(a); })

console.log(chrome);

function viewer(res) {
    //console.log(res);
    return res;
}