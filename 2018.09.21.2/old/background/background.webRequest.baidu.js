/*
百度查手機
https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=18380643453&co=&resource_id=6004&t=1537351470909&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=jQuery1102023587435629752895_1537351404467&_=1537351404471


*/


if (localStorage.baidu == undefined) {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
            console.log(details);
            localStorage.baidu = angular.toJson(details.requestHeaders)
            return { requestHeaders: details.requestHeaders }

        }, { urls: ["https://sp0.baidu.com/*/api.*"] }, ['requestHeaders', 'blocking']);
}

/*
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        console.log(details);
        // localStorage.sogou = angular.toJson(details)
        return { requestHeaders: details.requestHeaders }
    }, { urls: ["*://www.sogou.com/reventondc/external*"] }, ['requestHeaders', 'blocking']);*/