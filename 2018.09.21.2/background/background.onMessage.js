chrome.runtime.onMessage.addListener(response_message)
chrome.runtime.onMessageExternal.addListener(response_message)

function response_message(request, sender, sendResponse) {

    var params = $serialize(sender);

    if (request.command != "apiFunctions.XMLHttpRequest") {
        request.time = Date.now();
        request.url = window.baseUrl[request.channel];
    }

    try {

        var promise = eval(request.command).bind(request);
        promise(sender, sendResponse)
            .then(sendResponse);

        //.apply(request, [sender, sendResponse, localStorage])
        //.then(sendResponse);

    } catch (ex) {
        //console.error(request);
    }
    return true;
}




function toString(x) { return x.toString(); }

function trim(x) { if (x != undefined) { return x.toString().trim(); } }


function $serialize({ url, postData }) {
    var obj = {};
    if (url) { if (url.includes('?')) { decodeURIComponent(url).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    if (postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    return obj;
}