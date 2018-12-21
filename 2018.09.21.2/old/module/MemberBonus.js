console.log(123);
define(['myApp', 'material', 'common', 'encrypt', evo.extend], function(myApp, mdc) {

    if (evo.host === 'wa111') {
        $(document).ajaxComplete(function(event, xhr, settings) {
            if (settings.url.includes("DepositBonus.ashx")) {
                var d = angular.fromJson(xhr.responseText)
                console.group()
                for (let m of d.rows) {
                    console.log(m);
                    m.uniqueId = m.f_accounts + '-' + evo.siteNumber
                    evo.db.DepositBonus.put(m);
                }
                console.groupEnd()
            }
        });
        evo.uniqueId = 'ZLN1988-26'
        getUser()
            .then(function(d) {
                console.log(d);
                evo.db.DepositBonus.get('ZLN1988-26')
                    .then(function(c) {
                        console.log(c);
                        evo.assign(evo.user, c)
                        //console.log(evo.user);
                        putUser()
                    })
            })
    }

})



function GetMemberList() {

    //http://host26.wa111.net/Aspx/DepositBonus.aspx?sort=Font_ckhllb
    //http://host26.wa111.net/Aspx/MemberModify.aspx?account=ZLN1988

    //GetMemberList('ZLN1988')
    //var uniqueId = '1870497282-26'
    //1.點擊過去取得會員資料 及查看一機多登後，將資料保存
    //createTabs('http://host26.wa111.net/Aspx/MemberModify.aspx?account=ZLN1988')
    /*
    可由此得銀行帳號
    */
    $.ajax({
        url: 'http://host26.wa111.net/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=ZLN1988&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=&pageIndex=1&hidevalue_RecordCount=0&type=getAllUser',
        dataType: 'json'
    }).then(function(res) {
        //console.log(res);
        var d = res.rows[0];
        console.log(d.f_RemittanceAccount);
    })
}

var cc = {
    "total": 1,
    "records": 1,
    "rows": [{
        "f_id": 1672525,
        "f_accounts": "CP8020",
        "f_time": "2018-09-15 20:14:20",
        "f_date": "2018-09-15 23:08:25",
        "f_parentAgent": "",
        "f_remittanceName": "",
        "f_bill": "",
        "f_WinCount": 0,
        "f_Money": 400,
        "f_BeforeMoney": 2001,
        "f_AfterMoney": 2401,
        "f_AdminName": "18C083",
        "f_ip": null,
        "f_Audit": 0,
        "f_AuditTime": "2018-09-15 20:14:20",
        "f_del": 1,
        "f_type": 15,
        "f_unfreezeWater": 2001,
        "f_remark": "",
        "f_content": "",
        "f_billDate": null,
        "f_accountType": 0,
        "f_pointType": 0,
        "f_countAll": 0,
        "f_moneyAll": 0,
        "f_tMoney": 0,
        "f_residualcredit": 0,
        "f_errorIp": 0,
        "f_groupName": null,
        "HasChanged": false,
        "IsNew": true
    }],
    "text": "{\"AuditMoneyTure\":\"0\",\"AuditMoneyFalse\":\"0\",\"mp3\":\"\",\"IsYnYx\":\"False\",\"AuditCountTure\":\"0\",\"AuditCountFalse\":\"0\"}",
    "Language": 0,
    "isYnYx": false
}

var cd = { "total": 1, "records": 1, "rows": [{ "f_id": 1672534, "f_accounts": "ZLN1988", "f_time": "2018-09-15 22:50:46", "f_date": "2018-09-15 23:14:40", "f_parentAgent": "", "f_remittanceName": "", "f_bill": "", "f_WinCount": 0, "f_Money": 588, "f_BeforeMoney": 2999, "f_AfterMoney": 3587, "f_AdminName": "18C083", "f_ip": null, "f_Audit": 1, "f_AuditTime": "2018-09-15 23:07:07", "f_del": 0, "f_type": 15, "f_unfreezeWater": 2999, "f_remark": "", "f_content": "", "f_billDate": null, "f_accountType": 0, "f_pointType": 0, "f_countAll": 0, "f_moneyAll": 0, "f_tMoney": 0, "f_residualcredit": 0, "f_errorIp": 0, "f_groupName": null, "HasChanged": false, "IsNew": true }], "text": "{\"AuditMoneyTure\":\"588\",\"AuditMoneyFalse\":\"0\",\"mp3\":\"\",\"IsYnYx\":\"False\",\"AuditCountTure\":\"1\",\"AuditCountFalse\":\"0\"}", "Language": 0, "isYnYx": false }