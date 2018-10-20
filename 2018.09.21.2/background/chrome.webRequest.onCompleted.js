function FindData(strURL) {
    var req = new XMLHttpRequest();
    req.open("GET", strURL, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                console.info("Sucess!");
                console.info("Data: " + req.responseText);
            } else if (req.status == 404) console.info("URL doesn't exist!")
            else console.info("Error: Status is " + req.status)
        }
    }
    req.send();
}

function onCompleted() {

    chrome.webRequest.onCompleted.addListener(function(details) {

        console.log(details);


    }, { urls: ["<all_urls>"] }, ["responseHeaders"]);

}