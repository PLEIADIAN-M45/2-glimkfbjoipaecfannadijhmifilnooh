apis.member = function(request) {
    return apis.member[request.server](request).then((res) => {
        res.origin = apis.baseUrl[request.channel];
        res.index = request.index;
        return res;
    });
}

apis.member.wa111 = function({ channel, index, banker = "", mobile = "", idcard = "", author = "" }) {
    return $.ajax({
        "dataType": 'json',
        "url": apis.baseUrl[channel] + '/LoadData/AccountManagement/GetMemberList.ashx',
        "data": { "f_BankAccount": banker, "txtPhoto": mobile, "txtIdCard": idcard, "f_RemittanceName": author, "f_Account": "", "txtAlipayAccount": "", "txtEmail": "", "txtPickName": "", "txtChat": "", "ddlBankInfo": "", "zwrq": "", "zwrq2": "", "selSurplus": "", "selShow": "", "selIsDeposit": "", "selLevel": "", "selBank": "", "selMutualStatus": "", "ddlAliPay": "", "ddlWeChat": "", "ddlWarn": 0, "hidevalue_totals": "", "pageIndex": index, "hidevalue_RecordCount": 0, "type": "getAllUser", "_": Date.now() }
    }).then((res) => {
        res.list_RemittanceName = (res.rows && res.rows.length) ? res.rows[0].list_RemittanceName : [];
        return res;
    })
}

apis.member.ku711 = function({ channel, index, banker = "", mobile = "", idcard = "", author = "" }) {
    return $.ajax({
        "dataType": 'json',
        "method": 'post',
        "url": apis.baseUrl[channel] + '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
        "data": angular.toJson({ "AccountID": "", "IDNumber": idcard, "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": author, "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": index - 1, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": mobile, "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": banker, "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" })
    }).then(({ Data }) => { return apis.member.getMemberAlertInfoBackend({ rows: Data.Data, records: Data.Pager.PageCount, total: Data.TotalItemCount }); })
}


apis.member.getMemberAlertInfoBackend = function(res) {
    if (res.rows && res.rows.length) {} else { return res; }
    return $.ajax({
        "method": 'post',
        "dataType": 'json',
        "url": apis.baseUrl["16"] + '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
        //"url": chrome.extension.getURL('/member/api/AlertInfoManage/GetMemberAlertInfoBackend'),
        "data": angular.toJson({ "DisplayArea": "1", "Account": res.rows })
    }).then(({ Data }) => {
        res.list_RemittanceName = Data.AlertInfoAccountName;
        res.rows.map((row) => { row.list_Accounts = Data.AlertInfoAccountId.filter((d) => { return row.AccountID == d.AccountID; }); return row; });
        return res;
    });
}


apis.member.GetSystemLog = function(origin, accounts, operator) {
    console.log(origin, accounts, operator);
    return $.ajax({
        dataType: "json",
        url: origin + "/LoadData/AccountManagement/GetSystemLog.ashx",
        data: {
            tabName: "",
            zwrq: "",
            pageIndex: "",
            f_target: "",
            f_handler: "",
            ddlType: 0,
            f_accounts: accounts,
            zwrq2: "",
            logType: "memberlog",
            f_number: null,
            type: null,
            selType: "",
            selShow: -1,
            txtID: "",
            selDengji: ""
        }
    }).then((res) => {
        console.log(res);
        //1.  用户状态   【审核中】   被修改为   【正常户】
        /*
        f_field: "f_ishow$log$f_intualStatus$log$f_depositStatus"
        f_newData: "1$log$1$log$1"
        f_oldData: "3$log$0$log$0"
        */
        var bc = res.rows.find(({ f_field, f_oldData, f_newData, f_handler }) => {
            return (f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus" &&
                f_newData == "1$log$1$log$1" &&
                f_oldData == "3$log$0$log$0" &&
                f_handler == "18CS222")
            //f_time  within 1 min
        })
        console.log(bc);

    })
}
















/*
request.url = apis.baseUrl[Number(request.channel)];
if(request.url == undefined) { return Promise.reject(800) };
var { banker = "", mobile = "", idcard = "", author = "" } = request;
Object.assign(request, { banker, mobile, idcard, author })

return apis.member[request.server].call(request).then((res) => {
    res.origin = request.url
    res.index = request.index
    return res
})
*/

/*


*/

/*
if (requestUrl == undefined) { return Promise.reject(800) };
var { channel, banker = "", mobile = "", idcard = "", author = "", requestUrl = requestUrl } = request;
Object.assign(request, { banker, mobile, idcard, author, requestUrl });
return apis.member[request.server].call(request);
*/