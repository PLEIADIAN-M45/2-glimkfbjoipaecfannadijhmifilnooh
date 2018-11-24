/*
var ports = {}
chrome.runtime.onConnectExternal.addListener(function(port) {
    ports[port.name] = port;
    // port.postMessage("fuck to" + port.name)
})
*/
var host = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" }
var apiFunctions = {};
apiFunctions.mobile = function() {
    return $.ajax({
        dataType: "json",
        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
        data: { "query": this.value, "co": "", "resource_id": 6004, "t": this.time, "ie": "utf8", "oe": "gbk", "format": "json", "tn": "baidu", "_": this.time, }
    }).then((res) => {
        if(res.status == 0) {} else { return {} }
        var d = res.data[0];
        var region = { city: d.city, prov: d.prov, meta: d.type || "baidu" }
        //region.verify = search.region(region) || false;
        return { region };
    })
}
apiFunctions.locate = function() {
    return $.ajax({
        dataType: "json",
        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
        data: { "query": this.value, "co": "", "resource_id": 6006, "t": this.time, "ie": "utf8", "oe": "gbk", "format": "json", "tn": "baidu", "_": this.time, }
    }).then((res) => {
        console.log(res);
        if(res.status == 0) {} else { return {} }
        var arr = res.data[0].location.split(' ');
        var region = { meta: arr[1] };
        var string = arr[0];
        if(string) {
            string = string.replace(/(.+(省|自治区))/g, '');
            region.prov = RegExp.$1;
        }

        if(string) {
            string = string.replace(/(.+(市|州))/g, '');
            region.city = RegExp.$1;
        }

        if(string) {
            string = string.replace(/(.+(县|区))/g, '');
            region.area = RegExp.$1;
        }
        //egion.verify = search.region(region) || false;
        return { region };
    })
}
apiFunctions.banker = function() {
    return Promise.resolve(this.region);
}
apiFunctions.author = function() {
    var region = {};
    return Promise.resolve({ region });
}
apiFunctions.idcard = function() {
    var GBMAP = new Map(evo.decoder(localStorage["gb2260"]));
    var [$1, $2, $3, $4, $5, $6, $7] = this.value.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, ['$10000', '$1$200', '$1$2$3', '$4-$5-$6', '$7', '$8', '$4年$5月$6日']).split(',');
    var sex = (Number($5) % 2 == 1) ? '男性' : '女性',
        age = moment().diff(moment($4), 'years') + '岁',
        birth = moment($4).locale('zh-tw').format('LL');
    var region = {
        "prov": GBMAP.get(Number($1)),
        "city": GBMAP.get(Number($2)),
        "area": GBMAP.get(Number($3)),
        "meta": [birth, sex, age].join('/')
    }
    return Promise.resolve({ region });
}

apiFunctions.getMemberAlertInfoBackend = function(rows) {
    return $.ajax({
        "method": 'post',
        "dataType": 'json',
        //"url": 'https://bk.ku711.net/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
        "url": '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
        "data": angular.toJson({ "DisplayArea": "1", "Account": rows.map((x) => { return { "AccountID": x.AccountID, "AccountName": x.AccountName } }) })
    })
}

apiFunctions.member = function() {
    if(this.value.includes('*')) { return Promise.resolve({}) }
    if(this.attr == "locate") { return Promise.resolve({}) }
    this[this.attr] = this.value;
    this.idcard = this.idcard || "";
    this.author = this.author || "";
    this.mobile = this.mobile || "";
    this.banker = this.banker || "";
    if(this.host == "ku711") {
        return $.ajax({
            "dataType": 'json',
            "method": 'post',
            "url": this.url + '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
            "data": JSON.stringify({ "AccountID": "", "IDNumber": this.idcard, "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": this.author, "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": this.index - 1, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": this.mobile, "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": this.banker, "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" })
        }).then(({ Data }) => {
            var res = { origin: this.url, "rows": Data.Data, "records": Data.Pager.PageCount, "total": Data.TotalItemCount, "index": this.index };
            if(res.rows && res.rows.length) {
                return apiFunctions.getMemberAlertInfoBackend(res.rows).then((d) => {
                    res.list_RemittanceName = d.Data.AlertInfoAccountName;
                    res.rows.map((x) => { x.list_Accounts = d.Data.AlertInfoAccountId.filter((d) => { return x.AccountID == d.AccountID }); return x; })
                    return res;
                });
            } else { return res; }
        })
    }

    if(this.host == "wa111") {
        return $.ajax({
            "dataType": 'json',
            "url": this.url + '/LoadData/AccountManagement/GetMemberList.ashx',
            "data": { "f_BankAccount": this.banker, "txtPhoto": this.mobile, "txtIdCard": this.idcard, "f_RemittanceName": this.author, "f_Account": "", "txtAlipayAccount": "", "txtEmail": "", "txtPickName": "", "txtChat": "", "ddlBankInfo": "", "zwrq": "", "zwrq2": "", "selSurplus": "", "selShow": "", "selIsDeposit": "", "selLevel": "", "selBank": "", "selMutualStatus": "", "ddlAliPay": "", "ddlWeChat": "", "ddlWarn": 0, "hidevalue_totals": "", "pageIndex": this.index, "hidevalue_RecordCount": 0, "type": "getAllUser", "_": this.time }
        }).then((res) => {
            res.origin = this.url;
            res.index = this.index;
            res.list_RemittanceName = (res.rows && res.rows.length) ? res.rows[0].list_RemittanceName : [];
            return res;
        })
    }
}


apiFunctions.store = {}
evo.store.tables.forEach(function(table, index) {
    apiFunctions.store[table.name] = {
        put: function() { return evo.store[table.name].put(this.params).then(() => { return this.params }) },
        get: function() { return evo.store[table.name].get(this.params).then((d) => { return d }) }
    }
});


function response_message(request, sender, sendResponse) {
    request.time = Date.now();
    request.url = window.baseUrl[request.channel];
    var promise = eval(request.command).call(request);
    promise.then(sendResponse);
    return true;
}






function response_message223(request, sender, sendResponse) {

    return true

    var params = $serializeQueryString(sender.url);
    request.time = Date.now();
    var command = request.command.split('?')[0];
    var channel = request.command.split('?')[1] || request.channel;
    switch (command.split(':')[0]) {


        /*case "crateTab":

            console.log(channel, window.baseUrl[channel]);
            break;*/

        case "apiFunctions":

            apiFunctions(request)


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