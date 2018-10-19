var ibm = 0;

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        var { url } = details;
        if (ibm == 0) {
            ibm = 1;
            var tabId = details.tabId;
            chrome.debugger.attach({ tabId: tabId }, "1.0", function() {
                chrome.debugger.sendCommand({ tabId: tabId }, "Network.enable");
                chrome.debugger.onEvent.addListener(function(debuggeeId, message, params) {
                    if (message == "Network.responseReceived") {
                        if (params.response.status == 200) {
                            chrome.debugger.sendCommand({ tabId: debuggeeId.tabId }, "Network.getResponseBody", { "requestId": params.requestId },
                                function(response) {
                                    if (chrome.runtime.lastError) {} else {
                                        if (params.type == "XHR") {
                                            console.log(pathOf(params.response.url));
                                            console.log(json(response.body).Data);
                                        }
                                    }
                                })
                        }
                    }
                });
            });
        }
        return { requestHeaders: details.requestHeaders }
    }, { urls: ["http://127.0.0.1:16/*"] }, ['requestHeaders', 'blocking']);


chrome.permissions.getAll(function(permissions) {
    console.log(permissions);
})


/*

#silent-debugger-extension-api


Silent Debugging
Do not show the infobar when an extension attaches to a page via chrome.debugger API.
 This is required to debug extension background pages. – Mac, Windows, Linux, Chrome OS

*/

/*
chrome.devtools.network.onRequestFinished.addListener(
    function(request) {

        console.log(request);
        if (request.response.bodySize > 40 * 1024) {
            chrome.devtools.inspectedWindow.eval(
                'console.log("Large image: " + unescape("' +
                escape(request.request.url) + '"))');
        }
    });*/

/*
chrome.devtools.network.onRequestFinished.addListener(function callback)
chrome.webRequest.onCompleted.addListener(function callback)
*/