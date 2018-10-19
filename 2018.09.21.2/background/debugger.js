var currentTab;
var version = "1.0";

chrome.tabs.query( //get current Tab
    {
        currentWindow: true,
        active: true
    },
    function(tabArray) {
        currentTab = tabArray[0];
        chrome.debugger.attach({ //debug at current tab
            tabId: currentTab.id
        }, version, onAttach.bind(null, currentTab.id));
    }
)


function onAttach(tabId) {
    if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        return;
    } else {

        chrome.debugger.sendCommand({ //first enable the Network
            tabId: tabId
        }, "Network.enable");

        chrome.debugger.onEvent.addListener(allEventHandler);
    }


}


function allEventHandler(debuggeeId, message, params) {


    if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        return;
    } else {
        if (currentTab.id != debuggeeId.tabId) {
            return;
        }

        if (message == "Network.responseReceived") { //response return
            chrome.debugger.sendCommand({
                tabId: debuggeeId.tabId
            }, "Network.getResponseBody", {
                "requestId": params.requestId
            }, function(response) {

                if (chrome.runtime.lastError) {
                    console.warn(chrome.runtime.lastError.message);
                    return;
                } else {
                    console.log(response);
                    // you get the response body here!
                    // you can close the debugger tips by:
                    chrome.debugger.detach(debuggeeId);
                }

            });
        }

    }


}

/*
I think it 's useful enough for me and you can use

chrome.debugger.detach(debuggeeId)to close the ugly tip.

sorry, mabye not helpful... ^
*/