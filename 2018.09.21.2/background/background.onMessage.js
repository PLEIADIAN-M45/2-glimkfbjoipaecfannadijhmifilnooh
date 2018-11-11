chrome.runtime.onMessage.addListener(response_message)
chrome.runtime.onMessageExternal.addListener(response_message)
function response_message(request, sender, sendResponse) {
    var params = $serializeQueryString(sender.url);
    request.time = Date.now();
    request.url = window.baseUrl[request.channel];
    var promise = eval(request.command).call(request).then(sendResponse);
    return true;
}




function $serializeQueryString(_url) {
    _url = decodeURIComponent(_url);
    var obj = {};
    if(_url.includes('?')) {
        _url.split('?')[1].split('&').map((x) => { return x.split('='); })
            .forEach(([name, value]) => { obj[name] = value; });
    } else {
        _url.split('&').map((x) => { return x.split('='); })
            .forEach(([name, value]) => { obj[name] = value; });
    }
    return obj;
}