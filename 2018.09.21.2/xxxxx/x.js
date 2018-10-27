
function injectPostMessageInjector2() {

    function injectPostMessageInjector(info) {
        console.log('injected');
        chrome.tabs.executeScript(info.tabId, {
            allFrames: true,
            runAt: "document_start",
            code: "(" + (function() {
                if (window.__injectedPostMessageMonitor) return;
                window.__injectedPostMessageMonitor = true;
                window.addEventListener('message', function(e) {
                    console.group("Message sent from " + e.origin + " to " +
                        location.origin);
                    console.log(e);
                    console.log(e.data);
                    console.groupEnd();
                }, true);
            }) + ")();"
        });
    }


    chrome.webNavigation.onCommitted.addListener(
        function(info) {
            //console.log(info.url);
            if (info.url.includes('wa111.net')) {
                console.log(info);
            }
            /*if (config.monitorPostMessage[info.tabId]) {
                injectPostMessageInjector(info);
            }
            if (config.monitorXSS[info.tabId]) {
                injectXSSMonitor(info);
            }*/
        });




    function handleStateChange() {
        console.log(xhr);
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
    xhr.open("GET", chrome.extension.getURL('manifest.json'), true);
    xhr.send();

    /*
    frameId: 373
    processId: 9
    tabId: 141097811
    timeStamp: 1540632586829.261
    transitionQualifiers: []
    transitionType: "auto_subframe"
    url: "http://host26.wa111.net/Aspx/MemberModify.aspx?account=SHAQING5"*/

}



chrome.webNavigation.onCommitted.addListener(
    function(info) {
        //console.log(info.url);
        if (info.url.includes('wa111.net')) {

            chrome.tabs.executeScript(info.tabId, {
                allFrames: true,
                runAt: "document_start",
                file:  chrome.extension.getURL('manifest.json')

                code: "(" + (function() {

                    var { open, send, setRequestHeader } = XHR = window.XMLHttpRequest.prototype;

                    console.log(XHR);

                    XHR.setRequestHeader = function(name, value) {

                        return setRequestHeader.apply(this, arguments);
                    };
                    XHR.open = function(method, url, async, user, password) {

                        return open.apply(this, arguments);
                    };
                    XHR.send = function(postData) {

                        console.log(postData);

                        this.addEventListener('load', function() {
                            console.log(this);
                        });

                        return send.apply(this, arguments);
                    };


                }) + ")();"
            });
        }
      
    });