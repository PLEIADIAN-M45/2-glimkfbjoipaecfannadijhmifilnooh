var store = new Dexie('evo');
store.version(3).stores({
    user: '[account+channel]',
    xmlhttp: 'lastPath',
});

function response_message(request, sender, sendResponse) {

    if (request.command && request.command.includes('apiFunctions')) {
        //console.log(window.origins);
        //console.log(request);
        //console.log(request.channel, window.origins.get(request.channel));
        new apiFunctions(request, sender, sendResponse);
        return true;
    }

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
    }

    if (request.command == "sync") {
        chrome.storage.sync.set(request.object, function() { sendResponse('OK') })
        return true;
    }

    if (request.command && request.command.includes('store')) {
        var { command, params } = request;
        var [, , form, method] = command.split('.');
        if (method == 'delete') {
            store[form].where(params).delete().then((x) => { sendResponse('deleted:', params) });
        } else {
            store[form][method](params).then(sendResponse);
        }
        return true;
    }




    if (request.command == "requestverificationtoken") {
        localStorage[request.command] = request.value;
        return true;
    }

    if (request.storage) {
        console.log(request);
        console.log(aes);

        switch (request.method) {
            case 'setItem':
                var value = (typeof request.value == 'object') ? JSON.stringify(request.value) : request.value;
                value = aes.encrypt(value);
                console.log(value);
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
                    } catch (ex) {
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
        return true;
    }

}


if (chrome.runtime.onMessage) { chrome.runtime.onMessage.addListener(response_message) }
if (chrome.runtime.onMessageExternal) { chrome.runtime.onMessageExternal.addListener(response_message) }





var allProvs = [
    "北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省",
    "湖北省", "湖南省", "广东省", "海南省", "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省", "台湾省", "内蒙古自治区", "广西壮族自治区", "西藏自治区", "宁夏回族自治区",
    "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区"
]

