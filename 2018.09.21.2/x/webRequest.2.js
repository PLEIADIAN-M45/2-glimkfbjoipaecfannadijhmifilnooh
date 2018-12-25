/*

chrome://net-internals/#events

*/

chrome.webRequest.onResponseStarted.addListener(function(details) {
    console.log(details);
}, {
    urls: [
        //"data:*",
        "*://*/putUser",
        "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser"
        //"https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser*",
    ]
}, ['responseHeaders']);







chrome.webRequest.onBeforeRequest.addListener(function(details) {

    console.log(details);

    //return Mock.mock({ "total": 0, "records": 0, "rows": [], "text": false, "Language": 0, "isYnYx": false })

}, {

    urls: ["https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/*"]

}, ['requestBody', 'blocking']);



(function() {
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "*://developer.mozilla.org/*"
        ]
    };

    chrome.webRequest.onBeforeRequest.addListener((details) => {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }

        tabStorage[tabId].requests[requestId] = {
            requestId: requestId,
            url: details.url,
            startTime: details.timeStamp,
            status: 'pending'
        };
        console.log(tabStorage[tabId].requests[requestId]);
    }, networkFilters);

    chrome.webRequest.onCompleted.addListener((details) => {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];

        Object.assign(request, {
            endTime: details.timeStamp,
            requestDuration: details.timeStamp - request.startTime,
            status: 'complete'
        });
        console.log(tabStorage[tabId].requests[details.requestId]);
    }, networkFilters);

    chrome.webRequest.onErrorOccurred.addListener((details) => {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];
        Object.assign(request, {
            endTime: details.timeStamp,
            status: 'error',
        });
        console.log(tabStorage[tabId].requests[requestId]);
    }, networkFilters);

    chrome.tabs.onActivated.addListener((tab) => {

    	console.log(tab);

        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        if (!tabStorage.hasOwnProperty(tabId)) {
            tabStorage[tabId] = {
                id: tabId,
                requests: {},
                registerTime: new Date().getTime()
            };
        }
    });
    chrome.tabs.onRemoved.addListener((tab) => {
        const tabId = tab.tabId;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }
        tabStorage[tabId] = null;
    });
}());