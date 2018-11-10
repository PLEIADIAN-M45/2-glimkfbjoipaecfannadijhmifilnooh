console.log("background.onMessage.js");
var ports = {}
chrome.runtime.onConnectExternal.addListener(function(port) {
    //console.log(port);
    ports[port.name] = port;
    // port.postMessage("fuck to" + port.name)
})


var host = {
    "26": "wa111",
    "35": "wa111",
    "17": "wa111",
    "16": "ku711"
}


//console.log(window.baseUrl);

function ajax33(module, request) {

    return new Promise((resolve, reject) => {

        var module = eval(command).call(request);
        if (module.settings) {
            module.settings.timeout = 5000;
            module.settings.url = module.settings.url.replace('@', window.baseUrl[request.channel]);
            if (module.settings.url.includes('ku711')) { module.settings.data = JSON.stringify(module.settings.data); }
            $.ajax(module.settings)
                .done((data, status, xhr) => {
                    var result = module.callback(data);
                    if (result.region) {
                        result.sheets = {};
                        result.sheets.verify = search[request.attr](request.value) || false;
                        result.region.verify = search.region(result.region) || false;
                        console.log(request.attr, result);
                    }
                    resolve(result)

                    //sendResponse(result);
                })
                .fail((xhr, status, error) => {
                    resolve(status)

                    //sendResponse(status);
                })

        } else {
            var result = module.callback(request);
            sendResponse(result);
        }
        /*
        $.ajax(module.settings)
            .done((data, status, xhr) => {
                var result = module.callback(data);
                if (result.region) {
                    result.sheets = {};
                    result.sheets.verify = search[request.attr](request.value) || false;
                    result.region.verify = search.region(result.region) || false;
                    console.log(request.attr, result);
                }
                resolve(result)
                //sendResponse(result);
            })
            .fail((xhr, status, error) => {
                resolve(status)
                //sendResponse(status);
            })*/
    })
}


function response_message(request, sender, sendResponse) {
    request.time = Date.now();
    var [command, method, key] = array = request.command.split(':');
    var params = $serializeQueryString(sender.url);

    switch (command) {

        case "apiFunctions":
            var command = request.command.replace(":", ".");
            var module = eval(command).call(request);
            if (module.settings) {
                module.settings.timeout = 5000;
                module.settings.url = module.settings.url.replace('@', window.baseUrl[request.channel]);
                if (module.settings.url.includes('ku711')) { module.settings.data = JSON.stringify(module.settings.data); }
                $.ajax(module.settings)
                    .done((data, status, xhr) => {
                        var result = module.callback(data);
                        if (["author", "banker", "idcard", "mobile", "locate"].includes(request.attr)) {
                            result.alert = search.region(result) || false;
                            result.alarm = search[request.attr](request.value) || false;
                            console.log(request.attr, result);
                        }
                        sendResponse(result);
                    })
                    .fail((xhr, status, error) => {
                        //resolve(status)
                        sendResponse(status);
                    })

            } else {
                //var result = module.callback(request);
                //sendResponse(result);
            }
            return true
            break;
        case "google":
            delete request.banker[0].sites;
            delete request.idcard.sites;
            delete request.locate.sites;
            delete request.mobile.sites;
            delete request.author.sites;
            //console.log(request);
            evo.store.user.put(request);
            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
                method: 'get',
                data: {
                    test: true,
                    audience: angular.fromJson(localStorage.tokenInfo).audience,
                    command: request.command,
                    params: angular.toJson(request)
                }
            }).then(function(d) {
                console.log(d);
                sendResponse(d);
            })
            return true;
            //request.time = Date.now();
            break;
        case "evo.store.tables":
            var tb = eval(command);
            //console.log(tb);
            sendResponse(tb);
            break;
        case "evo:local:":
            break;
        case "evo.store.user.delete":
            var { account, channel } = request.params;
            evo.store.user.where(["account", "channel"]).equals([account, channel]).delete().then(sendResponse)
            return true
        case "evo.store.user.get":
            evo.store.user.get(request.params).then(sendResponse)
            return true
        case "evo.store.user.put":
            //console.log(request.params);
            evo.store.user.put(request.params).then(function() { sendResponse(request.params) })
            return true
            break;
        case "evo.store.users.get('F61539')":
            eval(command).then(sendResponse)
            //evo.store.users.get('F61539').then(sendResponse)
            return true
            break;
        case "localStorage":
            var value = window[command];
            //console.log(value);
            sendResponse(value);
            break;
        case "localStorage:getItem":
            if (key) {
                var value = window[command][key];
                var array = JSON.parse(decodeURI(atob(value)))
                sendResponse(array.slice(1));
            } else {
                sendResponse(window[command])
                var obj = {}
                var res = window[command];
                for (var key in res) {
                    try {
                        obj[key] = evo.decoder(obj[key])
                        //JSON.parse(decodeURI(atob(res[key])))
                    } catch (e) {}
                }
                console.log(obj);
                sendResponse(obj);
            }

            break;
        case "evo:apis:dwwd":
            break;
        case "evo:script:m3w":
            break;
        case "evo:store:put":
        case "evo:store:get":
            break;
        default:
            // statements_def
            break;
    }
}

if (chrome.runtime.onMessage) { chrome.runtime.onMessage.addListener(response_message) }
if (chrome.runtime.onMessageExternal) { chrome.runtime.onMessageExternal.addListener(response_message) }



/*

if (request.command && request.command.includes("evo.statistics")) {
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
        method: 'get',
        data: {
            test: true,
            audience: angular.fromJson(localStorage.tokenInfo).audience,
            command: request.command,
            model: request.command.split('.')[2],
            params: angular.toJson(request)
        }
    }).then(function(d) {
        console.log(d);
        sendResponse(d);
    })

    return true;
}
*/
/*
if (request.command == "evo.IndexedDB") {
    var params = request.params;
    switch (params[0]) {
        case "get":
            db[params[1]].get(params[2]).then(sendResponse)
            break;
        case "put":
            db[params[1]].put(params[2]).then(sendResponse)
            break;
        case "delete":
            //db[params[1]].delete(params).then(sendResponse)
            break;
    }
    return true;
}*/