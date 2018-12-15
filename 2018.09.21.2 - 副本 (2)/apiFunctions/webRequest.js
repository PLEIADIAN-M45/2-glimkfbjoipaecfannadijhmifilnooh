//https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var params = details.url.split('?')[1];
    var decode = JSON.parse(decodeURIComponent(params));
    evo.store.user.put(decode).then(() => { console.log('save:::'); });
    console.log(decode);
    console.log(btoa(params));
    var data = "data:text/plain;base64," + btoa(params);
    return { redirectUrl: data }
    var data = "data:application/json;base64," + btoa(params)
}, {
    urls: ["chrome-extension://glimkfbjoipaecfannadijhmifilnooh/put333User222?*"]
}, ['requestBody', 'blocking']);

//var blob = new Blob(['abc123'], {type: 'text/plain'});
function ArrayBufferToBase64_1(buffer) {
    var blob = new Blob([buffer], { type: "application/json" });
    var fr = new FileReader();
    fr.onload = function() {
        console.log(fr.result);
        //return { redirectUrl: fr.result }
        //image.src = fr.result;
    };
    return fr.readAsDataURL(blob);
}

function ArrayBufferToBase64_2(buff) {
    var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        enc = "",
        n, p, bits;
    d = new Uint8Array(buff);
    var len = buff.byteLength * 8;
    for(var offset = 0; offset < len; offset += 6) {
        n = (offset / 8) | 0;
        p = offset % 8;
        bits = ((d[n] || 0) << p) >> 2;
        if(p > 2) { bits |= (d[n + 1] || 0) >> (10 - p) }
        enc += alph.charAt(bits & 63);
    }
    enc += (p == 4) ? '=' : (p == 6) ? '==' : '';

    console.log(enc);
    return enc;
}


function ArrayBufferToBase64(buff) {
    var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        enc = "",
        n, p, bits;
    d = new Uint8Array(buff);
    var len = buff.byteLength * 8;
    for(var offset = 0; offset < len; offset += 6) {
        n = (offset / 8) | 0;
        p = offset % 8;
        bits = ((d[n] || 0) << p) >> 2;
        if(p > 2) { bits |= (d[n + 1] || 0) >> (10 - p) }
        enc += alph.charAt(bits & 63);
    }
    enc += (p == 4) ? '=' : (p == 6) ? '==' : '';

    console.log(enc);

    return "data:application/json;base64," + enc;
}


function formDataToObject(formData) {
    var object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    var json = JSON.stringify(object);
    return json;
}


function formDataToDataURI(formData) {
    //console.log(formData);
    //var json = JSON.stringify(formData);
    var enc = btoa(encodeURI(JSON.stringify(formData)))
    console.log(enc);
    return "data:base64," + enc;

    return "data:text/plain;base64," + enc;

    //var enc = atob(encodeURIComponent(json))
    //console.log(enc);


    return "data:application/json;base64," + enc;
}


//https://developer.chrome.com/extensions/xhr
/*
responseHeaders: Array(11)
0: {name: "Cache-Control", value: "must-revalidate"}
1: {name: "Content-Type", value: "text/html"}
2: {name: "Server", value: "Microsoft-IIS/8.5"}
3: {name: "X-Powered-By", value: "ASP.NET"}
4: {name: "P3P", value: "CP="CAO PSA OUR""}
5: {name: "Date", value: "Wed, 21 Nov 2018 15:16:46 GMT"}
6: {name: "Content-Length", value: "1163"}
7: {name: "Access-Control-Allow-Origin", value: "*"}
8: {name: "Access-Control-Allow-Headers", value: "authorization,x-goog-authuser"}
9: {name: "Access-Control-Allow-Methods", value: "POST, GET, OPTIONS, PUT, DELETE"}
10: {name: "Allow", value: "POST, GET, OPTIONS, PUT, DELETE"}
*/



chrome.webRequest.onResponseStarted.addListener(function(details) {
    console.log("+++++++++++++++++++++----------------------------------");
    console.log(details);
}, {
    urls: [
        "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser*",
        "https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser*",
        "*://*/putUser*",
        "data://*",
        "data:*",
    ]
}, ['responseHeaders']);








chrome.webRequest.onResponseStarted.addListener(function(details) {

    console.log(details);


}, {
    urls: [
        //"data:*",
        "*://*/putUser",
        "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser"
        //"https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser*",
    ]

}, ['responseHeaders']);


chrome.webRequest.onBeforeRequest.addListener(function(details) {

    console.log(details);

    var c = parser(details.requestBody)

    var d = JSON.stringify(c)

    var a = btoa(encodeURI(d))

    return { redirectUrl: 'data:,Hello%2C%20World!' }

    return { redirectUrl: "data:text/plain;base64," + a }


    console.log(c);
    console.log(a);


    //var buffer = details.requestBody.raw["0"].bytes;
    //ArrayBufferToBase64_1(buffer)
    // console.log(ArrayBufferToBase64_1(buffer));
    return { cancel: true }

    return { redirectUrl: ArrayBufferToBase64_1(buffer) }

    return

    if(details.requestBody.formData) {

        // console.log(details);
        //console.log(details.requestBody.formData);

        var c = formDataToDataURI(details.requestBody.formData);
        console.log(c);
        //var x = $(details.requestBody.formData).serializeArray();
        //var c = formDataToObject(details.requestBody.formData)

        return { redirectUrl: formDataToDataURI(details.requestBody.formData) }
        return { cancel: true }
    }

    return

    console.log(details);
    //return { cancel: true }
    var params = parser(details.requestBody);

    console.log(params);

    return
    var decode = JSON.parse(params);
    evo.store.user.put(decode).then(() => { console.log('save:::'); });

    console.log(decode);


    //var encode = details.requestBody

    var buffer = details.requestBody.raw["0"].bytes;
    //ArrayBufferToBase64_1(buffer)
    console.log(ArrayBufferToBase64(buffer));

    return { redirectUrl: ArrayBufferToBase64(buffer) }
    return { cancel: true }




}, {

    urls: [
        "*://*/putUser",
        "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser"
        //"https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser*",
    ]

}, ['requestBody', 'blocking']);


//var _user = JSON.parse(decodeURIComponent(params));
//evo.store.user.put(_user);
//console.log(_user);





console.log(chrome.identity.getRedirectURL());