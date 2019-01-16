apis.ports = {};


chrome.runtime.onConnectExternal.addListener((port) => {
    port.onMessage.addListener((msg) => {
        console.log(msg);
        switch (msg) {
            case "frameId":
                var frameId = port.sender.frameId;
                apis.ports[frameId] = port;
                port.postMessage({ frameId });
                console.log(apis.ports);
                break;
            case "label_1":
                break;
            default:
                break;
        }
    });
});