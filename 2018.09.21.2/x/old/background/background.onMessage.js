function response_message(request, sender, sendResponse) {
    //console.log(request);
    if (request.command == "sync") {
        console.log(request.object);
        chrome.storage.sync.set(request.object, function() {
            sendResponse('OK')
        })
    }



    if (request.command == "ajax-anti-forgery-token") {
        localStorage['ajax-anti-forgery-token'] = request.value
    }



    if (request.command == "suspension") {
        //db.suspension.put(request.params)
        //console.log(request, sender);
        //console.log(Object.values(request.params));
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
            method: 'post',
            data: {
                audience: angular.fromJson(localStorage.tokenInfo).audience,
                params: angular.toJson(request.params)
                //params: request.params
                //data: angular.toJson(request.params)
            }
        }).then(function(d) {
            console.log(d);
            sendResponse(d);
        }).fail(function() {
            console.log(d);
            sendResponse(d);
        })

        return true;
    }



    if (request.command == "API") {
        var api = new Api(request, sender, sendResponse);
        return true;
    }




    if (request.command == "API-3") {
        if (siteNumber == request.port) {
            console.log(siteNumber, request.port);
            var api = new Api(request, sender, sendResponse);
            return true;
        } else {
            var _tabId = tabs[request.port];
            if (_tabId) {
                //console.log(request.port, _tabId);
                chrome.tabs.sendMessage(_tabId, request, function(result) { if (result) { sendResponse(result) } });
                return true;
            } else {
                sendResponse({ status: 'error', message: '未连接' });
            }
        }
    }

    if (request.command == "evo.IndexedDB") {
        var params = request.params;
        //console.log(request);
        switch (params[0]) {
            case "get":
                db[params[1]].get(params[2]).then(sendResponse)
                break;
            case "put":
                db[params[1]].put(params[2]).then(sendResponse)
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
                        value = JSON.parse(value);
                    } catch (ex) {
                        console.log(request);
                        value = value;
                    }
                }
                sendResponse(value);
                break;
            case 'removeItem':
                break;
            case 'clear':
                break;
        }
    }
}


if (chrome.runtime.onMessage) { chrome.runtime.onMessage.addListener(response_message) }
if (chrome.runtime.onMessageExternal) { chrome.runtime.onMessageExternal.addListener(response_message) }

