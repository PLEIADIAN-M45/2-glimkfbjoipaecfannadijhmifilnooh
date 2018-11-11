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


apiFunctions.getMemberAlertInfoBackend = function(rows) {
    return $.ajax({
        "method": 'post',
        "dataType": 'json',
        //"url": 'https://bk.ku711.net/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
        "url": '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
        "data": angular.toJson({ "DisplayArea": "1", "Account": rows.map((x) => { return { "AccountID": x.AccountID, "AccountName": x.AccountName } }) })
    })
}