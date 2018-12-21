var currentTab;
var version = "1.0";



chrome.browserAction.onClicked.addListener(function(_currentTab) {

    currentTab = _currentTab
    chrome.debugger.attach({ //debug at current tab
        tabId: currentTab.id
    }, version, onAttach.bind(null, currentTab.id));
})


chrome.tabs.query( //get current Tab
    {
        //currentWindow: true
        //active: true
    },
    function(tabArray) {
        //currentTab = tabArray[0];

        for (let x of tabArray) {
            //console.log(x);
            if (x.url.includes('www.sogou.com')) {
                currentTab = x;
            }
        }
        console.log(currentTab);

        chrome.debugger.attach({ //debug at current tab
            tabId: currentTab.id
        }, version, onAttach.bind(null, currentTab.id));
    }
)


function onAttach(tabId) {
    // console.log(tabId);
    // console.log(chrome.debugger);

    chrome.debugger.sendCommand({ //first enable the Network
        tabId: tabId
    }, "Network.enable");

    chrome.debugger.onEvent.addListener(allEventHandler);

}


function allEventHandler(debuggeeId, message, params) {
    //  console.log(params);
    //  console.log(debuggeeId.tabId, currentTab.id);

    if (currentTab.id != debuggeeId.tabId) {
        return;
    }

    // console.log(message);
    // console.log(chrome.debugger);

    if (message == "Network.responseReceived") { //response return
        chrome.debugger.sendCommand({
            tabId: debuggeeId.tabId
        }, "Network.getResponseBody", {
            "requestId": params.requestId
        }, function(response) {
            console.log(response);
            console.log(response.body);


            // you get the response body here!
            // you can close the debugger tips by:
            chrome.debugger.detach(debuggeeId);
        });
    }

}