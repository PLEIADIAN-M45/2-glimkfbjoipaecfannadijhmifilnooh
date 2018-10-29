
window.origins = new Map();

window.origins.set('0', location.origin)


chrome.runtime.onConnectExternal.addListener(function(port) {
    var url = new URL(port.sender.url)
    window.origins.set(port.name, url.origin);
    console.log(port.name, url.origin);
    if (origins.size > 5) {
        //console.clear();
    }
    console.log(origins);
});
