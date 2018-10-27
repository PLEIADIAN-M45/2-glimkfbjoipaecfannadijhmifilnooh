function rebuild(details) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(this);
    }; // Implemented elsewhere.
    xhr.open("GET", details.url, true);
    xhr.send();
}


chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var { url, method, type, requestBody, initiator } = details;
    //var redirectUrl =
    if (initiator == location.origin) {

    } else {
        if (url.includes('GetMemberList.ashx')) {
            if (method == "GET") {               
                console.log(details);
                return {
                    cancel: true

                };
            }
        }
    }
    // console.log(redirectUrl);

}, {
    urls: ["*://host26.wa111.net/*"],
    //types: ["GET"]
}, ['blocking']);