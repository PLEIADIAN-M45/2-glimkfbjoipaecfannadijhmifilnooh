//window.origins.set(port.name, url.origin);
console.log("background.webRequest.js");

//{2}

function lastPathOf(str) {
    var url = new URL(str);
    return url.pathname.split('/').pop();
}

function searchParamsOf(str) {
    var url = new URL(str);
    return url.searchParams;
}


function parser(requestBody) {
    if (requestBody) {
        var postedString = decodeURIComponent(String.fromCharCode.apply(null,
            new Uint8Array(requestBody.raw[0].bytes)));
        return postedString;
    } else { return null; }
}

//return { redirectUrl: "data:,Hello%2C%20World!" }
//try { console.log(btoa(_user)); } catch (ex) {}
//console.log(btoa(encodeURI(params)));
/*
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    //console.log(details);
    var redirectUrl = details.url.replace('bk.ku711.net', '127.0.0.1:16').replace('https', 'http')
    return { redirectUrl }
    if (details.initiator == location.origin) {

    };
}, { urls: ["*://bk.ku711.net/*"], }, ['blocking']);
//*/



function http() {
    var xmlhttp = {};
    chrome.webRequest.onBeforeRequest.addListener(function(details) {

        //console.log(details);
        /*
        var { url, method, type, requestBody, initiator } = details;
        var lastPath = lastPathOf(url);
        var searchParams = searchParamsOf(url);
        if (initiator == location.origin) {} else {
            var dataType = 'json';
            var data = {};
            if (!xmlhttp[lastPath]) {
                switch (method) {
                    case "GET":
                        var entries = searchParams.entries();
                        [...entries].map(([name, value]) => { data[name] = value });
                        break;
                    case "POST":
                        data = json(parser(requestBody));
                        break;
                }
                xmlhttp[lastPath] = {
                    postData: json(parser(requestBody)),
                    career: "KU711",
                    lastPath,
                    requestBody,
                    settings: {
                        url: url.split('?')[0],
                        dataType,
                        method,
                        type,
                        data
                    }
                };
            }
        }*/

    }, {
        urls: ["*://bk.ku711.net/*"],
        types: ["xmlhttprequest"]
    }, ['requestBody', 'blocking'])
}





chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var { url, method, type, requestHeaders, initiator } = details;
    var lastPath = lastPathOf(url);
    if (initiator == location.origin) {
        requestHeaders.push({ name: 'referer', value: url });
        requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
        requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['RequestVerificationToken'] });
        return { requestHeaders: details.requestHeaders }
    } else {
        if (details.method == "POST") {
            details.requestHeaders.filter(({ name, value }) => { if (name == "RequestVerificationToken") { localStorage[name] = value; } })
        }
    }
}, { urls: ["*://bk.ku711.net/*"], types: ["xmlhttprequest"] }, ['requestHeaders', 'blocking']);

/**************************************************************************************************************/


window.baseUrl = {};
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    window.baseUrl["16"] = details.initiator;
}, { urls: ["*://bk.ku711.net/*"], types: ["xmlhttprequest"] }, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    var port = details.initiator.replace('http://host', '').replace('http://admin', '').replace('-2.wa111.net', '').replace('.wa111.net', '').padStart(2, '0');
    window.baseUrl[port] = details.initiator;
}, { urls: ["*://*.wa111.net/*"], types: ["xmlhttprequest"] }, ['blocking']);


chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (details.initiator == location.origin) { return };
    var port = details.initiator.replace('http://q51.tp33.net:63', '');
    window.baseUrl[port] = details.initiator;
}, { urls: ["*://q51.tp33.net/*"], types: ["xmlhttprequest"] }, ['blocking']);


console.log(window.baseUrl);
/**************************************************************************************************************/






function forTest() {
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        //console.log(details);
        var redirectUrl = details.url.replace('bk.ku711.net', '127.0.0.1:16').replace('https', 'http')
        return { redirectUrl }
        if (details.initiator == location.origin) {

        };
    }, { urls: ["*://bk.ku711.net/*"], }, ['blocking']);

    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        //console.log(details);
        var redirectUrl = details.url.replace('bkku711.kucdn.net', '127.0.0.1:16').replace('https', 'http')
        return { redirectUrl }
        if (details.initiator == location.origin) {};
    }, { urls: ["*://bkku711.kucdn.net/*"], }, ['blocking']);
}


function sp0_baidu_com() {
    chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
        var { url, method, type, requestHeaders, initiator } = details;
        if (details.initiator == location.origin) {
            var headers = JSON.parse(localStorage["baidu"])
            headers.forEach((x) => { requestHeaders.push({ name: x.name, value: x.value }); });
            return { requestHeaders: details.requestHeaders }
        } else {
            console.log(details.requestHeaders);
            localStorage["baidu"] = JSON.stringify(details.requestHeaders)
        }
    }, { urls: ["*://sp0.baidu.com/*/api.*"] }, ['requestHeaders', 'blocking']);
}

//chrome.webRequest.onCompleted.addListener(function callback, )

/*
chrome.webRequest.onCompleted.addListener(function(details) {
    console.log(details);
    chrome.tabs.get(details.tabId, function(d) {
        console.log(d);
    })

}, { urls: ["http://127.0.0.1:26/IGetMemberInfo.*"] });
*/
//http://127.0.0.1:26/IGetMemberInfo.aspx?siteNumber=26&member=JIABO1006
/*
https://stackoverflow.com/questions/18310484/modify-http-responses-from-a-chrome-extension

https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=117.136.12.104&co=&resource_id=6006&t=
1541515306651&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=jQuery110202722053944449192_1541515281759&_=1541515281763
*/








/*



chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var _idcard = details.url.split('=').pop();
    var GBMAP = new Map(evo.decoder(localStorage["gb2260"]));
    var [$1, $2, $3, $4, $5, $6, $7] = _idcard.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, ['$10000', '$1$200', '$1$2$3', '$4-$5-$6', '$7', '$8', '$4年$5月$6日']).split(',');
    var sex = (Number($5) % 2 == 1) ? '男性' : '女性',
        age = moment().diff(moment($4), 'years') + '岁',
        birth = moment($4).locale('zh-tw').format('LL');

    console.log({
        "prov": GBMAP.get(Number($1)),
        "city": GBMAP.get(Number($2)),
        "area": GBMAP.get(Number($3)),
        "meta": [birth, sex, age].join('/')
    });



}, { urls: ["chrome-extension://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/idcard?*"], types: ["xmlhttprequest"] }, ['blocking']);


*/



/*return {
      settings: { url: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/apiFunctions/idcard' },
      callback: function() {
          return {
              "prov": GBMAP.get(Number($1)),
              "city": GBMAP.get(Number($2)),
              "area": GBMAP.get(Number($3)),
              "meta": [birth, sex, age].join('/')
          }
      }
  }*/

/*
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method == "POST") {
            let formData = details.requestBody.formData;
            let cancel = false;

            if (formData) {
                Object.keys(formData).forEach(key => {
                    formData[key].forEach(value => {
                        if (value.includes("foo")) {
                            cancel = true;
                        }
                    });
                });
            }

            return { cancel: cancel };
        }
    }, { urls: [""] }, ["blocking", "requestBody"]
);
*/