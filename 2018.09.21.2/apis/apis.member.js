apis.member = function(request) {
    request.url = apis.baseUrl[Number(request.channel)];
    if(request.url == undefined) { return Promise.reject(800) };
    return apis.member[request.server].call(request).then((res) => {
        res.origin = request.url
        res.index = request.index
        return res
    })
}

apis.member.ku711 = function() {
    return $.ajax({
        "dataType": 'json',
        "method": 'post',
        "url": this.url + '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
        "data": angular.toJson({ "AccountID": "", "IDNumber": this.idcard, "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": this.author, "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": this.index - 1, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": this.mobile, "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": this.banker, "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" })
    }).then(({ Data }) => { return apis.member.getMemberAlertInfoBackend({ rows: Data.Data, records: Data.Pager.PageCount, total: Data.TotalItemCount }); })

    //.then(apis.member.getMemberAlertInfoBackend)
}


apis.member.getMemberAlertInfoBackend = function(res) {
    if(res.rows && res.rows.length) {} else { return res; }
    return $.ajax({
        "method": 'post',
        "dataType": 'json',
        "url": apis.baseUrl["16"] + '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
        "data": angular.toJson({ "DisplayArea": "1", "Account": res.rows })
    }).then(({ Data }) => {
        res.list_RemittanceName = Data.AlertInfoAccountName;
        res.rows.map((row) => { row.list_Accounts = Data.AlertInfoAccountId.filter((d) => { return row.AccountID == d.AccountID; }); return row; });
        console.log(res);
        return res;
    });
}


apis.member.wa111 = function() {
    return $.ajax({
        "dataType": 'json',
        "url": this.url + '/LoadData/AccountManagement/GetMemberList.ashx',
        "data": { "f_BankAccount": this.banker, "txtPhoto": this.mobile, "txtIdCard": this.idcard, "f_RemittanceName": this.author, "f_Account": "", "txtAlipayAccount": "", "txtEmail": "", "txtPickName": "", "txtChat": "", "ddlBankInfo": "", "zwrq": "", "zwrq2": "", "selSurplus": "", "selShow": "", "selIsDeposit": "", "selLevel": "", "selBank": "", "selMutualStatus": "", "ddlAliPay": "", "ddlWeChat": "", "ddlWarn": 0, "hidevalue_totals": "", "pageIndex": this.index, "hidevalue_RecordCount": 0, "type": "getAllUser", "_": Date.now() }
    }).then((res) => {
        res.index = this.index;
        res.origin = this.url;
        res.list_RemittanceName = (res.rows && res.rows.length) ? res.rows[0].list_RemittanceName : [];
        return res;
    })
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
if (!window.baseUrl) {
    window.baseUrl = {
        "0": "http://chrome.evo.net",
        "26": "http://host26.wa111.net",
        "35": "http://host35.wa111.net",
        "17": "http://host17.wa111.net",
        "16": "https://bk.ku711.net"
    }

}

*/

/*
if (requestUrl == undefined) { return Promise.reject(800) };
var { channel, banker = "", mobile = "", idcard = "", author = "", requestUrl = requestUrl } = request;
Object.assign(request, { banker, mobile, idcard, author, requestUrl });
return apis.member[request.server].call(request);
*/