var time = {
    format(t) {
        return moment(t).format('YYYY-MM-DD HH:mm:ss');
    },
    get value() {
        return new Date().getTime();
    }
}

function getMemberAge(str) {
    str = str.replace(/(年|月)/g, '-').replace('日', '')
    var b = new Date(str)
    var n = new Date()
    var diff = (n - b) / 1000 / 60 / 60 / 24 / 365
    return diff.toFixed(1) + '岁'
}


var counter = { locate: 0, mobile: 0, idcard: 0, sms: 0 };
var Api = function(request, sender, sendResponse) {
    var method = request.method;
    //console.log(method);
    //console.log(mods);

    var mods = this[method](request, sender, sendResponse);
    if (method == "idcard") { return }



    if (request.page == undefined) { request.page = 1 }

    if (mods.length) {
        var i = counter[method]++ % mods.length;
        var mod = mods[i]();
        mod.career = mods[i].name;
    } else {
        var mod = mods;
    }
    //console.log(method, request, mod);

    var setting = this.settings(mod);

    //console.log(setting);

    $.ajax(setting)
        .always(function(response, statusText, xhr) {

            //console.log(response);
            //console.log(response);
            //console.log(statusText);

            var result = {
                career: mod.career || location.origin,
                unique: request.unique,
                method: request.method,
                value: request.value,
                param: request.param || null,
                port: request.port,
                page: request.page,
                origin: evo.origins[request.port],
                startTime: time.format(this.start),
                consume: time.value - this.start,
                statusText: statusText
            };

            var callback = (function() {

                if (statusText == 'success') {

                    result.status = xhr.status;

                    try {
                        return mod.callback(response);
                    } catch (ex) {
                        return {
                            status: 0,
                            statusText: ex.message
                        }
                    }
                } else {
                    return {
                        result: null,
                        status: response.status
                    }
                }
            })();



            Object.assign(result, callback);


            sendResponse(result, statusText);
        })
}


Api.prototype.settings = function(mod) {
    return {
        url: mod.url,
        data: mod.data,
        method: mod.method || 'get',
        dataType: mod.dataType || 'json',
        start: time.value,
        timeout: 10000
    }
}




Api.prototype.mobile = function(request, sender, sendResponse) {

    switch (request.port) {
        case '26':
        case '35':
        case '17':
            return {
                career: 'wa111',
                url: evo.origins[request.port] + '/LoadData/AccountManagement/GetInfoAPI.ashx',
                data: {
                    'type': 'getPhone',
                    'phone': request.value,
                    'account': request.accountId,
                    _: new Date().getTime()
                },
                callback: function(res) {
                    var str = res.msg.replace('<br />', '<br/>').split('<br/>');
                    var arr = str[0].split('&nbsp;');
                    return {
                        province: arr[0],
                        city: arr[1],
                        meta: str[1]
                    }
                }
            }
            break;
        case '16':
            return {
                method: 'post',
                career: 'ku711',
                url: evo.origins[request.port] + '/Member/api/MemberInfoManage/GetVerifyPhoneLocal',
                data: JSON.stringify({ "Name": request.accountId, "AccountID": request.accountId, "CellPhone": request.value, "EnabledVerified": true, "Identitycard": "", "VerifyUsage": 13 }),
                //data: JSON.stringify(data)
                callback: function(res) {
                    var d = res.Data;
                    return {
                        province: d.Province,
                        city: d.City,
                        meta: d.Cardtype
                    }
                }
            }
            break;


    }
}


Api.prototype.GetMemberAlertInfoBackendByMultiplayer = function(request, sender, sendResponse) {
    return {
        career: 'ku711',
        method: 'post',
        dataType: 'json',
        url: evo.origins[request.port] + '/member/api/AlertInfoManage/GetMemberAlertInfoBackendByMultiplayer',
        data: JSON.stringify(request.params),
        callback: function(res) {
            //console.log(res);
            return { rows: res.Data }
        }

    }
}

Api.prototype.GetMemberList = function(request, sender, sendResponse) {
    switch (request.port) {
        case '26':
        case '35':
        case '17':
            var data = { f_BankAccount: "", txtPhoto: "", txtIdCard: "", f_RemittanceName: "", f_Account: "", txtAlipayAccount: "", txtEmail: "", txtPickName: "", txtChat: "", ddlBankInfo: "", zwrq: "", zwrq2: "", selSurplus: "", selShow: "", selIsDeposit: "", selLevel: "", selBank: "", selMutualStatus: "", ddlAliPay: "", ddlWeChat: "", ddlWarn: 0, hidevalue_totals: "", pageIndex: 1, hidevalue_RecordCount: 0, type: "getAllUser", _: new Date().getTime() };
            data[request.param] = request.value;
            data.pageIndex = request.page || 1;
            return {
                career: 'wa111',
                url: evo.origins[request.port] + '/LoadData/AccountManagement/GetMemberList.ashx',
                data: data,
                callback: function(res) {
                    return res;
                }
            }
            break;
        case '16':
            var data = { "AccountID": "", "IDNumber": "", "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": "", "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": 0, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": "", "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": "", "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" };
            data[request.param] = request.value;
            return {
                method: 'post',
                career: 'ku711',
                url: evo.origins[request.port] + '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
                data: JSON.stringify(data),
                //data: data,
                callback: function(res) {
                    return {
                        total: res.Data.TotalItemCount,
                        rows: res.Data.Data
                    }
                }
            }
            break;
    }
}



var evo = { origins: {} };
chrome.runtime.onConnectExternal.addListener(function(port) {
    var url = new URL(port.sender.url)
    evo.origins[port.name] = url.origin;
    //if (tabs[port.name] == undefined) { tabs[port.name] = port.sender.tab.id; }
    console.clear();
    //console.log(evo.origins);
});