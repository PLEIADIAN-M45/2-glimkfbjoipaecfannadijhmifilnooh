var store = new Dexie('evo');
store.version(3).stores({
    user: '[account+channel]',
    xmlhttp: 'lastPath',
});

var callbackss = {

}

function response_message(request, sender, sendResponse) {

    if (request.command == 'apiFunction') {

        var { command, method } = request;

        var module = apiFunction[method].settings;

        assign(module.data, request.data);

        module.data = json(module.data);

        console.log(module);

        $.ajax(module).then(function(res, s, x) {
            try { var res = res.Data.Data } catch (ex) {}
            sendResponse(res);
        });

        return true;
    }


    /*console.log(request);
    console.log(apiFunction[method]);
    console.log(module.settings);*/

    if (request.command && request.command.includes('apiFunctions')) {
        new apiFunctions(request, sender, sendResponse);
        return true;
    }


    if (request.command && request.command.includes("evo.statistics")) {
        console.log('*****', request.command);
        console.log(request);



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
        }).fail(function() {
            sendResponse('fail');
        })

        return true;
    }

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

    if (request.command == "sync") {
        console.log(request.object);
        chrome.storage.sync.set(request.object, function() { sendResponse('OK') })
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

       // console.log(form, method, params);


        if (method == 'delete') {
            store[form].where(params).delete().then((x) => { sendResponse('deleted:', params) });
        } else {
            //console.log(method);
            store[form][method](params).then(sendResponse);
        }
        return true;
    }


    if (request.command == "ajax-anti-forgery-token") {
        localStorage['ajax-anti-forgery-token'] = request.value
        return true;
    }
    if (request.command == "RequestVerificationToken") {
        localStorage['RequestVerificationToken'] = request.value
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




var apiFunction = {
    "ChagneMenu": { "career": "ku711", "name": "ChagneMenu", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/System/ChagneMenu", "method": "GET", "type": "xmlhttprequest", "data": { "platformCode": "Platform", "ismobile": "false", "s": "1539964954606" } } },
    "GetMemberAlertModuleBackendByValid": { "career": "ku711", "name": "GetMemberAlertModuleBackendByValid", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetMemberAlertModuleBackendByValid", "method": "POST", "type": "xmlhttprequest", "data": { "DisplayArea": "0" } } },
    "GetAlertTypeInfoByLanguageCode": { "career": "ku711", "name": "GetAlertTypeInfoByLanguageCode", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/Common/GetAlertTypeInfoByLanguageCode", "method": "POST", "type": "xmlhttprequest", "data": { "LanguageCode": "AUTO", "ActionType": 1 } } },
    "GetLevelTypeInfoGetByLanguageCode": { "career": "ku711", "name": "GetLevelTypeInfoGetByLanguageCode", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/Common/GetLevelTypeInfoGetByLanguageCode", "method": "GET", "type": "xmlhttprequest", "data": {} } },
    "GetSafeQuestion": { "career": "ku711", "name": "GetSafeQuestion", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetSafeQuestion", "method": "GET", "type": "xmlhttprequest", "data": {} } },
    "GetAccountBookLevelSettingByPaywayIDAndGroupBy": { "career": "ku711", "name": "GetAccountBookLevelSettingByPaywayIDAndGroupBy", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetAccountBookLevelSettingByPaywayIDAndGroupBy", "method": "POST", "type": "xmlhttprequest", "data": { "PaywayID": "BA" } } },
    "GetLevelTypeInfoByLanguageCode": { "career": "ku711", "name": "GetLevelTypeInfoByLanguageCode", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetLevelTypeInfoByLanguageCode", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetMemberStatusByLanguageCode": { "career": "ku711", "name": "GetMemberStatusByLanguageCode", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetMemberStatusByLanguageCode", "method": "GET", "type": "xmlhttprequest", "data": {} } },
    "GetMemberMemoTypeByLanguageCodeToExpando": { "career": "ku711", "name": "GetMemberMemoTypeByLanguageCodeToExpando", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetMemberMemoTypeByLanguageCodeToExpando", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetBankCodeInfoList": { "career": "ku711", "name": "GetBankCodeInfoList", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/Common/GetBankCodeInfoList", "method": "POST", "type": "xmlhttprequest", "data": { "CountryID": 2, "LanguageCode": "zh-CN" } } },
    "GetFKTestTypeByLanguageCode": { "career": "ku711", "name": "GetFKTestTypeByLanguageCode", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetFKTestTypeByLanguageCode", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetBackendAccountByAccountType": { "career": "ku711", "name": "GetBackendAccountByAccountType", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/AgentAccount/GetBackendAccountByAccountType", "method": "POST", "type": "xmlhttprequest", "data": { "AccountType": 3 } } },
    "GetMemberRisksInfoBackendByMemberCounts": { "career": "ku711", "name": "GetMemberRisksInfoBackendByMemberCounts", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetMemberRisksInfoBackendByMemberCounts", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "", "IDNumber": "", "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": "", "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": 0, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": "", "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": "", "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": "", "LineType": "" } } },
    "GetMemberSNInfoBackendWithExtraInfo": { "career": "ku711", "name": "GetMemberSNInfoBackendWithExtraInfo", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "f61539", "IDNumber": "", "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": "", "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": 0, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": "", "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": "", "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" } } },
    "GetMemberAlertInfoBackend": { "career": "ku711", "name": "GetMemberAlertInfoBackend", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/AlertInfoManage/GetMemberAlertInfoBackend", "method": "POST", "type": "xmlhttprequest", "data": { "DisplayArea": "1", "Account": [{ "AccountID": "F61539", "AccountName": "å¼ æ¬å" }] } } },
    "GetMemberInfoOperationLogByMultiAccountID": { "career": "ku711", "name": "GetMemberInfoOperationLogByMultiAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/Common/GetMemberInfoOperationLogByMultiAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "OperateType": 0, "OperatorList": [], "DataIDList": [], "PageIndex": 0, "PageSize": 5, "DataID": "F61539", "Operated": "F61539", "Platform": 0 } } },
    "GetProvincesInfoByLanguageCodeToExpando": { "career": "ku711", "name": "GetProvincesInfoByLanguageCodeToExpando", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/Common/GetProvincesInfoByLanguageCodeToExpando", "method": "POST", "type": "xmlhttprequest", "data": { "LanguageCode": "zh-CN", "CountryID": 2 } } },
    "GetMemberSNInfoBackendByAccountID": { "career": "ku711", "name": "GetMemberSNInfoBackendByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberSNInfoBackendByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "UpdateMemberSNInfoBackendModelToDescription": { "career": "ku711", "name": "UpdateMemberSNInfoBackendModelToDescription", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/UpdateMemberSNInfoBackendModelToDescription", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetMemberRisksInfoBackendByAccountID": { "career": "ku711", "name": "GetMemberRisksInfoBackendByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberRisksInfoBackendByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "GetMemberWithdrawalLimitSurchargeSettingByAccountID": { "career": "ku711", "name": "GetMemberWithdrawalLimitSurchargeSettingByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberWithdrawalLimitSurchargeSettingByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "GetPlatformServiceInfoAllOrderByBackendSort": { "career": "ku711", "name": "GetPlatformServiceInfoAllOrderByBackendSort", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/GameManage/GetPlatformServiceInfoAllOrderByBackendSort", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetMemberSNInfoMemberTotalResultGetByAccountID": { "career": "ku711", "name": "GetMemberSNInfoMemberTotalResultGetByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberSNInfoMemberTotalResultGetByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "MemberRiskInfoModelToDescription": { "career": "ku711", "name": "MemberRiskInfoModelToDescription", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/MemberRiskInfoModelToDescription", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "UpdateMemberRisksInfoBackendIsBlackListModelToDescription": { "career": "ku711", "name": "UpdateMemberRisksInfoBackendIsBlackListModelToDescription", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/UpdateMemberRisksInfoBackendIsBlackListModelToDescription", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetMemberPlatformTurnoverDisabledByCondition": { "career": "ku711", "name": "GetMemberPlatformTurnoverDisabledByCondition", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberPlatformTurnoverDisabledByCondition", "method": "POST", "type": "xmlhttprequest", "data": { "PageNumber": 0, "RecordCounts": 999, "OrderField": "", "Desc": "true", "IsCheckSetStatus": false, "AccountID": "F61539" } } },
    "GetMemberWithdrawalBankInfoBackendByAccountID": { "career": "ku711", "name": "GetMemberWithdrawalBankInfoBackendByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberWithdrawalBankInfoBackendByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "GetMemberDWAliPayInfoBackendByAccountID": { "career": "ku711", "name": "GetMemberDWAliPayInfoBackendByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberDWAliPayInfoBackendByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "UpdateMemberWithdrawalBankInfoBackendModelToDescription": { "career": "ku711", "name": "UpdateMemberWithdrawalBankInfoBackendModelToDescription", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/UpdateMemberWithdrawalBankInfoBackendModelToDescription", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetAccountBookLevelSettingByPaywayId": { "career": "ku711", "name": "GetAccountBookLevelSettingByPaywayId", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetAccountBookLevelSettingByPaywayId", "method": "POST", "type": "xmlhttprequest", "data": { "PaywayID": "BA", "DirectorID": "F", "LevelType": 1 } } },
    "GetMemberAlertInfoBackendByMultiplayer": { "career": "ku711", "name": "GetMemberAlertInfoBackendByMultiplayer", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/AlertInfoManage/GetMemberAlertInfoBackendByMultiplayer", "method": "POST", "type": "xmlhttprequest", "data": { "DisplayArea": "1", "Account": [{ "AccountID": "F61539", "AccountName": "" }] } } },
    "GetMemberSNInfoBackendReportGetByAccountID": { "career": "ku711", "name": "GetMemberSNInfoBackendReportGetByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberSNInfoBackendReportGetByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "GetPaywayList": { "career": "ku711", "name": "GetPaywayList", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/Common/GetPaywayList", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetMemberRiskInfoAccountingBackendByAccountID": { "career": "ku711", "name": "GetMemberRiskInfoAccountingBackendByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberRiskInfoAccountingBackendByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "UpdateMemberRiskInfoAccountingBackendModelToDescription": { "career": "ku711", "name": "UpdateMemberRiskInfoAccountingBackendModelToDescription", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/UpdateMemberRiskInfoAccountingBackendModelToDescription", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetMemberDWCountLogByAccountID": { "career": "ku711", "name": "GetMemberDWCountLogByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetMemberDWCountLogByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539", "ActionType": 1, "PaywayID": "", "DealType": 1 } } },
    "GetOtherPaymentSettingByCondition": { "career": "ku711", "name": "GetOtherPaymentSettingByCondition", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/PaymentSetting/GetOtherPaymentSettingByCondition", "method": "POST", "type": "xmlhttprequest", "data": {} } },
    "GetMemberOPAccountBookSettingByAccountID": { "career": "ku711", "name": "GetMemberOPAccountBookSettingByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/PaymentSetting/GetMemberOPAccountBookSettingByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "F61539" } } },
    "GetPaywayListToWithdrawal": { "career": "ku711", "name": "GetPaywayListToWithdrawal", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/Withdrawal/GetPaywayListToWithdrawal", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetDealTypeList": { "career": "ku711", "name": "GetDealTypeList", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/Common/GetDealTypeList", "method": "POST", "type": "xmlhttprequest", "data": { "ActionType": 1, "PlatformUseType": 2, "LanguageCode": "zh-CN" } } },
    "CheckNeedKickLoginStatus": { "career": "ku711", "name": "CheckNeedKickLoginStatus", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/Authorize/CheckNeedKickLoginStatus", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "18c894" } } },
    "GetProvincesInfoByLanguageCode": { "career": "ku711", "name": "GetProvincesInfoByLanguageCode", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/Common/GetProvincesInfoByLanguageCode", "method": "POST", "type": "xmlhttprequest", "data": { "CountryID": 2, "LanguageCode": "zh-CN" } } },
    "GetCityInfoByCondition": { "career": "ku711", "name": "GetCityInfoByCondition", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/Common/GetCityInfoByCondition", "method": "POST", "type": "xmlhttprequest", "data": { "OrderField": "", "Desc": "true", "RecordCounts": 999, "PageNumber": 0, "CountryID": 2, "LanguageCode": "zh-CN" } } },
    "GetMemberBonusLogBackendByCondition": { "career": "ku711", "name": "GetMemberBonusLogBackendByCondition", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/Bonus/GetMemberBonusLogBackendByCondition", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "", "StartTime": "2018-10-20", "EndTime": "2018-10-20", "PageNumber": 0, "RecordCounts": 20, "OrderField": "", "Desc": "true", "DirectorID": [] } } },
    "GetFKBonusTypeByLanguageCode": { "career": "ku711", "name": "GetFKBonusTypeByLanguageCode", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/Common/GetFKBonusTypeByLanguageCode", "method": "POST", "type": "xmlhttprequest", "data": "null" } },
    "GetBackEndAccountLevelListByAccountID": { "career": "ku711", "name": "GetBackEndAccountLevelListByAccountID", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/AccountBookLevel/GetBackEndAccountLevelListByAccountID", "method": "POST", "type": "xmlhttprequest", "data": { "UpAccountID": "", "AccountType": 0 } } },
    "GetMemberBonusLogSummary": { "career": "ku711", "name": "GetMemberBonusLogSummary", "settings": { "dataType": "json", "url": "https://bk.ku711.net/member/api/Bonus/GetMemberBonusLogSummary", "method": "POST", "type": "xmlhttprequest", "data": { "AccountID": "", "StartTime": "", "EndTime": "", "BonusType": null } } },
    "GetVerifyPhoneLocal": { "career": "ku711", "name": "GetVerifyPhoneLocal", "settings": { "dataType": "json", "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetVerifyPhoneLocal", "method": "POST", "type": "xmlhttprequest", "data": { "Identitycard": "", "AccountID": "F61539", "EnabledVerified": true, "Name": "F61539", "VerifyUsage": 13, "CellPhone": "17817817888" } } },
    "GetVerifyIdentity": {
        "career": "ku711",
        "name": "GetVerifyIdentity",
        "settings": {
            "dataType": "json",
            "url": "https://bk.ku711.net/Member/api/MemberInfoManage/GetVerifyIdentity",
            "method": "POST",
            "type": "xmlhttprequest",
            "data": {
                "Identitycard": "440000198705194975",
                "AccountID": "F61539",
                "EnabledVerified": true,
                "Name": "å¼ æ¬å",
                "VerifyUsage": 1,
                "CellPhone": "17817817888"
            }
        }
    }
}








//.then((x) => {        /*console.log(x);        return x*/    }).then(sendResponse)