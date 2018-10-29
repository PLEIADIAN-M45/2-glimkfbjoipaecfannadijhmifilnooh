console.log("background.onMessage.js");

function response_message(request, sender, sendResponse) {

    var [command, method, key] = array = request.command.split(':');

    switch (command) {

        /* case "extention.localStorage.getItem":
             break;
         case "extention.localStorage.setItem":
             break;*/

        case "evo:local:":
        case "evo:session:":

        case "localStorage":

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
        case "apiFunctions":
            new apiFunctions(request, sender, sendResponse);
            return true;
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