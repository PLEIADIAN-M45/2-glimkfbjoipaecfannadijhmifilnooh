chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {})
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    ///console.log(sender);
    if(sender.tab.url.includes("127.0.0.1")) { window.isLocal = true; }
    if(window.isLocal) { apis.baseUrl = { "0": "http://chrome.evo.net", "26": "http://host26.wa111.net", "35": "http://host35.wa111.net", "17": "http://host17.wa111.net", "16": "https://bk.ku711.net" } }
    console.log(request);

    if(!request.params) { return };
    var ta = apis[request.caller];

    if(typeof ta == "object") {
        sendResponse(ta)
    } else {
        apis[request.caller](request.params, sender, sendResponse).then(viewer).then(sendResponse).catch(sendResponse)
    }

    //apis[request.caller](...request.params, sender, sendResponse).then(viewer).then(sendResponse).catch(sendResponse)
    return true;
});




/*
chrome.runtime.onConnectExternal.addListener((port) => {
    port.onMessage.addListener((msg) => {
        console.log(msg);
        if(msg == "sender") {
            apis.port[port.sender.frameId] = port;
            console.log(apis.port);
            //console.log(port);
            port.postMessage(port.sender)
        }
    });
});*/


//chrome.tabs.create({ url: "option/option.html" })


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




console.log(chrome);



function viewer(res) {
    //console.log(res);
    return res;
}

function refreshAllWindow() {
    chrome.tabs.getAllInWindow((tabs) => {
        tabs.filter((tab) => {
            var flag = false;
            if(tab.url.includes('127.0.0.1')) { flag = true; }
            if(tab.url.includes('IGetMemberInfo')) { flag = true; }
            if(tab.url.includes('wa111')) { flag = true; }
            if(tab.url.includes('ku711')) { flag = true; }
            if(tab.url.includes('tp33')) { flag = true; }
            if(flag) { chrome.tabs.reload(tab.id); }
        })
    })
}