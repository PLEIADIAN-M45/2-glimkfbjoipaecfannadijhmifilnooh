console.log("background.onMessage.js");
var ports = {}
chrome.runtime.onConnectExternal.addListener(function(port) {
    //console.log(port);
    ports[port.name] = port;
    // port.postMessage("fuck to" + port.name)
})

function response_message(request, sender, sendResponse) {
    request.time = Date.now();

    var [command, method, key] = array = request.command.split(':');
    // var [commander, property, proxy, channel] = request.command.split(':');
    //console.log(request.command);
    switch (command) {
        case "apiFunctions":

            function _done(data, status, xhr) {
                console.log(data);
                var region = module.callback(data);
                region.verify = search.region(region) || false;
                var result = { region, sheets };
                console.log(result);
                sendResponse(result);
            }

            function _fail(xhr, status, error) {
                var region = { verify: true, meta: module.provider, status: status };
                var result = { region, sheets };
                sendResponse(result);
            }

            var module = apiFunctions[request.host][request.attr].call(request);
            //console.log(module);
            var baseUrl = window.origins.get(request.channel);
            //console.log(request.channel, baseUrl);
            var sheets = {
                verify: search[request.attr](request.value)
            };
            

            if (module.settings) {
                module.settings.timeout = 5000;
                module.settings.url = module.settings.url.replace('@', baseUrl);
                console.log(module.settings);
                $.ajax(module.settings).done(_done).fail(_fail);
            } else {
                _done(request);
            }

            /*
            $.ajax(module.settings)
                .done((data, status, xhr) => {
                    console.log(data);
                    var region = module.callback(data);
                    region.verify = search.region(region) || false;
                    var result = { region, sheets };
                    console.log(result);
                    sendResponse(result);
                })
                .fail((xhr, status, error) => {
                    console.log(error);
                    return
                    var region = { verify: true, meta: module.provider, status: status };
                    var result = { region, sheets };
                    sendResponse(result);
                })*/

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
            if (sender.url.includes("MemberLoginLog")) {
                //console.log(1, request.params);
                //ports["EditMemberInfoManage"].postMessage(request.params)

                /*console.log(sender);
                chrome.tabs.connect(sender.tab.id, {
                    name: "EditMemberInfoManage"
                })*/


            }



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


/*
try {
    eval(command).then(sendResponse)
} catch (ex) {
    sendResponse(eval(command))
}*/

//request.command="script:exec:m3"



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