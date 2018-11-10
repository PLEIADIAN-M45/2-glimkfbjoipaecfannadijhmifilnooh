console.log("background.onMessage.js");
var ports = {}
chrome.runtime.onConnectExternal.addListener(function(port) {
    //console.log(port);
    ports[port.name] = port;
    // port.postMessage("fuck to" + port.name)
})


var host = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" }

function __getMemberAlertInfoBackend(arr) {
    return new Promise((resolve, reject) => {
        $.ajax({
            "method": 'post',
            "dataType": 'json',
            //"url": 'https://bk.ku711.net/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
            "url": '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
            "data": angular.toJson({ "DisplayArea": "1", "Account": arr })
        }).done(resolve)
    })
}




function response_message(request, sender, sendResponse) {
    var params = $serializeQueryString(sender.url);
    request.time = Date.now();
    var command = request.command.split('?')[0];
    var channel = request.command.split('?')[1] || request.channel;
    switch (command.split(':')[0]) {

        case "crateTab":

            console.log(channel, window.baseUrl[channel]);

            break;

        case "apiFunctions":
            var executive = command.replace(":", ".");
            var module = eval(executive).call(request);
            if(module.settings) {
                module.settings.timeout = 5000;
                module.settings.url = module.settings.url.replace('@', window.baseUrl[channel]);
                if(module.settings.url.includes('ku711')) { module.settings.data = JSON.stringify(module.settings.data); }

                $.ajax(module.settings)
                    .done((data, status, xhr) => {
                        var result = module.callback(data);
                        if(["author", "banker", "idcard", "mobile", "locate"].includes(request.attr)) {
                            result.alert = search.region(result) || false;
                            result.alarm = search[request.attr](request.value) || false;
                        }
                        if(executive == "apiFunctions.ku711.member" && result.rows && result.rows.length) {
                            async function getMemberAlertInfoBackend(arr) {
                                var g = await __getMemberAlertInfoBackend(arr);
                                g.Data.AlertInfoAccountId = g.Data.AlertInfoAccountName
                                result.rows.map((x) => {
                                    x.list_Accounts = g.Data.AlertInfoAccountId.filter((d) => {
                                        return x.AccountID == d.AccountID
                                    });
                                    return x;
                                });
                                result.list_RemittanceName = g.Data.AlertInfoAccountName;
                                result.origin = window.baseUrl[channel];
                                sendResponse(result);
                            }
                            var arr = result.rows.map((x) => {
                                return { "AccountID": x.AccountID, "AccountName": x.AccountName }
                            });
                            getMemberAlertInfoBackend(arr)
                        } else {
                            result.origin = window.baseUrl[channel];
                            sendResponse(result);
                        }
                    })
                    .fail((xhr, status, error) => {
                        sendResponse({ status });
                    })
            } else {
                sendResponse({ abort: true });
            }
            return true;
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
            if(key) {
                var value = window[command][key];
                var array = JSON.parse(decodeURI(atob(value)))
                sendResponse(array.slice(1));
            } else {
                sendResponse(window[command])
                var obj = {}
                var res = window[command];
                for(var key in res) {
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

if(chrome.runtime.onMessage) { chrome.runtime.onMessage.addListener(response_message) }
if(chrome.runtime.onMessageExternal) { chrome.runtime.onMessageExternal.addListener(response_message) }



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