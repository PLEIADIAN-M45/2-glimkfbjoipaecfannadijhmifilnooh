function onBeforeSendHeaders() {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
            // console.log(details.url);
            if (details.type == "xmlhttprequest" && details.initiator == location.origin) {
                //console.log(details);
                details.requestHeaders.push({ name: 'referer', value: details.url });
                details.requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
                details.requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['ajax-anti-forgery-token'] });
                return { requestHeaders: details.requestHeaders }
            }
        }, { urls: ["*://bk.ku711.net/*"] }, ['requestHeaders', 'blocking']);
}
onBeforeSendHeaders();