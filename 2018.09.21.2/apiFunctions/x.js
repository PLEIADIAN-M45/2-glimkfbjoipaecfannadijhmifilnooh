var store = new Dexie('evo');

store.version(5).stores({
    //user: '[account+channel]',
    //user: 'sequel',
    user: 'unique',
    users: 'account',
    xmlhttp: 'lastPath',
    author: '++id',
    banker: '++id',
    mobile: '++id',
    locate: '++id',
    danger: '++id',
    notice: '++id',
    region: '++id',
    GB2260: 'code, area',
    alerts: 'author'
});



evo.store = store;

//console.log(evo.store);

apiFunctions.store = {}

evo.store.tables.forEach(function(table, index) {

    apiFunctions.store[table.name] = {

        put: function() {
            //console.log(this);
            return evo.store[table.name].put(this).then(() => { return this })
        },
        get: function() {
            //console.log(this);
            return evo.store[table.name].get(this.unique).then((d) => { return d })
        }
    }

    /*
    apiFunctions.store[table.name] = {
        put: function() { return evo.store[table.name].put(this.params).then(() => { return this.params }) },
        get: function() { return evo.store[table.name].get(this.params).then((d) => { return d }) }
    }*/
});


window.user = {}


chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(details);
    if(details.requestBody) {
        // console.log(details.requestBody);
        var unique = details.requestBody.formData.unique[0];

        console.log(unique);
        /*evo.store.user.get({ unique }).then((user) => {
            console.log(user);
            window.user = user;
        })
        if(details.requestBody.formData) { var str = JSON.stringify(details.requestBody.formData) }
        if(details.requestBody.raw) { var str = parserRaw(details.requestBody) }
        var res = btoa(str);*/
        return { redirectUrl: 'https://www.chromiumapp.org/putUser' }
        return { redirectUrl: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser' };

    }
}, {
    urls: [
        "http://127.0.0.1:26/putUser"
    ]
}, ['requestBody', 'blocking']);




function onHeadersReceived() {
    chrome.webRequest.onHeadersReceived.addListener(function(details) {
        console.log(window.user);
        var str = JSON.stringify({ a: 3, c: "56" });
        var enc = btoa(decodeURI(str));
        return { redirectUrl: 'data:text/plain;base64,' + enc };

    }, {
        urls: ["*://*/putUser"]
    }, ['blocking', 'responseHeaders']);
}






//return { redirectUrl: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D' }
//return { responseHeaders: details.responseHeaders };
//"chrome-extension://glimkfbjoipaecfannadijhmifilnooh/*",

console.log(chrome.identity.getRedirectURL());


/*
chrome.webRequest.onBeforeRedirect.addListener(function(details) {
    console.log("----------------------------------");
    //details.responseHeaders[2].value = "*"
    //details.responseHeaders.push({ name: "Access-Control-Allow-Headers", value: "*" })
    console.log(details);
    //console.log(window.redirectUrl);
    //return { redirectUrl: window.redirectUrl }
    //return { responseHeaders: details.responseHeaders };
}, {
    urls: [

        "<all_urls>"
    ]
}, ['responseHeaders']);
*/



function xwd() {
    //redirectUrl: 'chrome-extension://glimkfbjoipaecfannadijhmifilnooh/userData'
    "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser*",
    "https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser*",
    "*://*/putUser*"


    urls: [
        "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser*",
        "https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser*",
        "*://*/putUser*"
    ]

    for(var i = 0; i < details.requestHeaders.length; ++i) {

        if(details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders.splice(i, 1);
            break;
        }

    }

}




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

    urls: ["chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser222?*"]

}, ['requestBody', 'blocking']);



chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(details);
    var params = parser(details.requestBody);
    var decode = JSON.parse(params);
    evo.store.user.put(decode).then(() => { console.log('save:::'); });


    //json(),


    /*
    var params = details.url.split('?')[1];
    var decode = JSON.parse(decodeURIComponent(params));
    evo.store.user.put(decode).then(() => { console.log('save:::'); });

    console.log(decode);
    console.log(btoa(params));

    var data = "data:text/plain;base64," + btoa(params);
    return { redirectUrl: data }

    var data = "data:application/json;base64," + btoa(params)
    */

    return {
        cancel: true
    }


}, {

    urls: [
        "*://*/putUser"
        /*
        "http://host26.wa111.net/putUser*",
        "https://host26.wa111.net/putUser*",
        "https://bk.ku711.net/putUser*",
        "https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/putUser*",
        "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/putUser*"*/
    ]

}, ['requestBody', 'blocking']);


//var _user = JSON.parse(decodeURIComponent(params));
//evo.store.user.put(_user);
//console.log(_user);





console.log(chrome.identity.getRedirectURL());