chrome.runtime.onMessage.addListener(response_message)
chrome.runtime.onMessageExternal.addListener(response_message)

function response_message(request, sender, sendResponse) {
    var params = $serialize(sender);
    if(request.command != "apiFunctions.XMLHttpRequest") {
        request.time = Date.now();
        request.url = window.baseUrl[request.channel];
    }
    var promise = eval(request.command).call(request).then(sendResponse);
    return true;
}



Array.prototype.toObj = function() {
    var obj = {};
    this.forEach(([name, value]) => { if(name && value) { obj[name.trim()] = value.trim() } });
    return obj;
}


function $serialize({ url, postData }) {
    var obj = {};
    if(url) { if(url.includes('?')) { decodeURIComponent(url).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    if(postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    return obj;
}