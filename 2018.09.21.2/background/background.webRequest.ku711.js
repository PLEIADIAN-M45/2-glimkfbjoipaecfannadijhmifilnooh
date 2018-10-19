function onBeforeSendHeaders() {


    chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {

        //console.log(details);

        if (details.initiator == location.origin) {
            details.requestHeaders.push({ name: 'referer', value: details.url });
            details.requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
            details.requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['ajax-anti-forgery-token'] });
            return { requestHeaders: details.requestHeaders }
        } else {
            if (details.method == "POST") {
                details.requestHeaders.filter(({ name, value }) => {
                    if (name == "RequestVerificationToken") { localStorage[name] = value; }
                })
            }
        }

    }, {

        urls: ["*://bk.ku711.net/*"],
        types: ["xmlhttprequest"]

    }, ['requestHeaders', 'blocking']);
}


//types:["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", or "other"]


onBeforeSendHeaders();




chrome.webRequest.onBeforeRequest.addListener(function(details) {

    var postedString = decodeURIComponent(String.fromCharCode.apply(null,
        new Uint8Array(details.requestBody.raw[0].bytes)));
    console.log('--------------------------');
    console.log(details);
    console.log(details.requestBody);
    console.log(postedString);
    console.log('--------------------------');


}, { urls: ["*://bk.ku711.net/*"] }, ['requestBody', 'blocking'])



//YUNLANZONG258258@gmail.com
//FormDataItem