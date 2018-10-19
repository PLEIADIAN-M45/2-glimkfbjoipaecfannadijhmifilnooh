var store = new Dexie('evo');

store.version(2).stores({
    user: '[account+channel]',
    xmlhttp: 'name'
});




function response_message(request, sender, sendResponse) {



    if (request.command == "sync") {
        console.log(request.object);
        chrome.storage.sync.set(request.object, function() {
            sendResponse('OK')
        })
        return true;
    }


    if (request.command == "XMLHttpRequest") {
        console.log(request);
        console.log(_lastPath);
        sendResponse("OKOK")
        return true;
    }


    if (request.command && request.command.includes('store')) {
        //console.log(request);
        var { command, params } = request;
        var [, , form, method] = command.split('.');
        //console.log(form, method, params);
        if (method == 'delete') {
            store[form].where(params).delete().then((x) => { sendResponse('deleted:', params) });
        } else {
            store[form][method](params).then(sendResponse);
        }
        return true;
    }


    if (request.command == "ajax-anti-forgery-token") {
        localStorage['ajax-anti-forgery-token'] = request.value
        return true;
    }


    if (request.command && request.command.includes('apiFunction')) {
        new apiFunctions(request, sender, sendResponse);
        return true;
    }

    if (request.command && request.command.includes('apiFunctions')) {
        new apiFunctions(request, sender, sendResponse);
        return true;
    }


    if (request.command && request.command.includes("evo.statistics")) {
        console.log('*****', request);
        //console.log(request.params);
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
            method: 'get',
            data: {
                test: true,
                audience: angular.fromJson(localStorage.tokenInfo).audience,
                command: request.command,
                //'evo.statistics',
                model: request.command.split('.')[2],
                params: angular.toJson(request)
            }
        }).then(function(d) {
            console.log(d);
            sendResponse(d);
        }).fail(function() {
            sendResponse('fail');
        })

        return true;
    }



    /* if (request.command == "getUser") {
         var { account, channel } = request
         db2.user.get({ account, channel }).then(sendResponse)
         return true;
     }*/


    if (request.command == "evo.IndexedDB") {

        var params = request.params;
        //console.log(request);
        //console.log(params);
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
    }


    if (request.storage) {
        switch (request.method) {
            case 'setItem':
                //console.log(request.value);
                var value = (typeof request.value == 'object') ? JSON.stringify(request.value) : request.value;
                value = aes.encrypt(value);
                window[request.storage]['setItem'](request.key, value);
                sendResponse(request);
                break;
            case 'getItem':
                if (request.key == undefined) {
                    value = window[request.storage];
                } else {
                    var value = window[request.storage]['getItem'](request.key);
                    try {
                        value = aes.decrypt(value);
                        //value = JSON.parse(value);
                    } catch (ex) {
                        //console.log(request);
                        value = value;
                    }
                    //console.log(request.key, typeof value);
                }
                sendResponse(value);
                break;
            case 'removeItem':
                break;
            case 'clear':
                break;
        }
        return true;
    }



}


if (chrome.runtime.onMessage) { chrome.runtime.onMessage.addListener(response_message) }
if (chrome.runtime.onMessageExternal) { chrome.runtime.onMessageExternal.addListener(response_message) }













//.then((x) => {        /*console.log(x);        return x*/    }).then(sendResponse)