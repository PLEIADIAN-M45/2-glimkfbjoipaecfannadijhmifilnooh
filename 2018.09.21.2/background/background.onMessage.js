chrome.runtime.onMessage.addListener(response_message)
chrome.runtime.onMessageExternal.addListener(response_message)


window.baseUrl = {
    "0": "http://chrome.evo.net",
    "26": "http://host26.wa111.net",
    "35": "http://host35.wa111.net",
    "17": "http://host17.wa111.net",
    "16": "https://bk.ku711.net"
}

function response_message(request, sender, sendResponse) {

    var params = $serialize(sender);

    if (request.command != "apiFunctions.XMLHttpRequest") {
        //request.start = Date.now();
        request.start = moment().format();
        var request_url = window.baseUrl[request.channel];
        if (request_url) { request.url = request_url };
    }

    try {
        //console.log(request.command);
        var promise = eval(request.command).bind(request);
        promise(sender, sendResponse).then(sendResponse);

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