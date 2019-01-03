apiFunctions.getMemberAlertInfoBackend = function(rows, _url) {
    return $.ajax({
        "method": 'post',
        "dataType": 'json',
        "url": window.baseUrl[16] + '/member/api/AlertInfoManage/GetMemberAlertInfoBackend',
        "data": angular.toJson({ "DisplayArea": "1", "Account": rows.map((x) => { return { "AccountID": x.AccountID, "AccountName": x.AccountName } }) })
    })
}



apiFunctions.member = function() {

    //if (this.value == "") { return Promise.resolve({}) }
    //if (this.value.includes('*')) { return Promise.resolve({}) }
    
    if (this.callee == "locate") { return Promise.resolve({}) }
    if (!this.url) { return Promise.reject({}) }


    /*
    this.idcard = this.idcard || "";
    this.author = this.author || "";
    this.mobile = this.mobile || "";
    this.banker = this.banker || "";
    this[this.callee] = this.value;
    */


    if (this.host == "ku711") {

        return $.ajax({
            "dataType": 'json',
            "method": 'post',
            "url": this.url + '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
            "data": JSON.stringify({ "AccountID": "", "IDNumber": this.idcard, "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": this.author, "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": this.index - 1, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": this.mobile, "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": this.banker, "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" })
        }).then(({ Data }) => {
            var res = { origin: this.url, "rows": Data.Data, "records": Data.Pager.PageCount, "total": Data.TotalItemCount, "index": this.index };
            if (res.rows && res.rows.length) {

                /*
                res.rows.map((row) => {
                    row.origin = this.url;
                    row.host = this.host;
                    return row
                })
                */

                return apiFunctions.getMemberAlertInfoBackend(res.rows, this.url).then((d) => {
                    res.list_RemittanceName = d.Data.AlertInfoAccountName;
                    res.rows.map((x) => { x.list_Accounts = d.Data.AlertInfoAccountId.filter((d) => { return x.AccountID == d.AccountID }); return x; })
                    return Object.assign(this, res);
                });



            } else { return Object.assign(this, res); }
        })
    }

    if (this.host == "wa111") {
        return $.ajax({
            "dataType": 'json',
            "url": this.url + '/LoadData/AccountManagement/GetMemberList.ashx',
            "data": {
                "f_BankAccount": this.banker,
                "txtPhoto": this.mobile,
                "txtIdCard": this.idcard,
                "f_RemittanceName": this.author,
                "f_Account": "",
                "txtAlipayAccount": "",
                "txtEmail": "",
                "txtPickName": "",
                "txtChat": "",
                "ddlBankInfo": "",
                "zwrq": "",
                "zwrq2": "",
                "selSurplus": "",
                "selShow": "",
                "selIsDeposit": "",
                "selLevel": "",
                "selBank": "",
                "selMutualStatus": "",
                "ddlAliPay": "",
                "ddlWeChat": "",
                "ddlWarn": 0,
                "hidevalue_totals": "",
                "pageIndex": this.index,
                "hidevalue_RecordCount": 0,
                "type": "getAllUser",
                "_": this.time
            }
        }).then((res) => {
            /*
            res.rows.map((row) => {

                row.origin = this.url;
                row.host = this.host
                return row
            });
            */
            res.origin = this.url;
            res.index = this.index;
            res.list_RemittanceName = (res.rows && res.rows.length) ? res.rows[0].list_RemittanceName : [];
            return Object.assign(this, res);
        })
    }
}



//"url": 'https://bk.ku711.net/member/api/AlertInfoManage/GetMemberAlertInfoBackend',








//console.log(this[this.callee]);


/*
    "url": "http://host35.wa111.net/LoadData/AccountManagement/GetMemberList.ashx?
    f_BankAccount=
    &txtPhoto=
    &txtIdCard=
    &f_RemittanceName=%E5%BC%A0%E5%87%AF
    &f_Account=
    &txtAlipayAccount=
    &txtEmail=
    &txtPickName=
    &txtChat=
    &ddlBankInfo=
    &zwrq=
    &zwrq2=
    &selSurplus=
    &selShow=
    &selIsDeposit=
    &selLevel=
    &selBank=
    &selMutualStatus=
    &ddlAliPay=
    &ddlWeChat=
    &ddlWarn=0
    &hidevalue_totals=
    &pageIndex=1
    &hidevalue_RecordCount=0
    &type=getAllUser
    &_=1536853781864",
    */