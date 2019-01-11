Array.prototype.timeDiff = function(unit) {
    this[0] = moment(this[0]).format("YYYY-MM-DD HH:mm:ss")
    this[1] = moment(this[1]).format("YYYY-MM-DD HH:mm:ss")
    this[2] = moment(this[1]).diff(moment(this[0]), "minutes", true);
    return this;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
})

function viewer(res) {
    //console.log(res);
    return res;
}


chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {

    if (!request.params) { return };


    if (sender.tab.url.includes("127.0.0.1")) { window.isLocal = true; }
    //console.log(request.caller);

    apis[request.caller](...request.params).then(viewer).then(sendResponse);

    return true;
    //apis[request.caller](...request.params).then((res) => {        sendResponse(res);    });

})



chrome.runtime.onConnectExternal.addListener(function(port) {
    //console.log(port);
    //port.sender.tab
    port.onMessage.addListener(function(msg) {
        //console.log(msg);
        if (msg == "sender") {
            port.postMessage(port.sender)
        }
        //port.sender
    })

})

console.log(chrome);


/*
chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
    console.log(tabId, changeInfo, tab);
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(tabId, changeInfo, tab);
})
*/


//chrome.runtime.onConnect.addListener(function(a) { console.log(a); })