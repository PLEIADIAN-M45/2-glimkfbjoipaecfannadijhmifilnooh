define([], function() {

    /* requestHeaders.push({ name: 'referer', value: url });
     requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });
     requestHeaders.push({ name: 'requestverificationtoken', value: localStorage['RequestVerificationToken'] });*/

    var apiFunction = function() {


        this.exec = function(mod) {
            var headers = {
                'requestverificationtoken': evo.token,
                'content-type': 'application/json;charset=UTF-8'
            }
            var data = json(mod.data);
           
            return new Promise((resolve, reject) => {


                $.ajax(evo.assign(mod, { headers, data })).then((d) => {

                    //console.log(d);

                    var res = d.Data.Data || d;
                    try {
                        //console.log(res);
                        if (res.length == 1) {
                            resolve(...res)
                        } else {
                            resolve(res)
                        }

                    } catch (ex) {

                    }
                })
            })
        }
    }

    apiFunction.prototype.getModel = function() {
        /*return this.exec({
            url: "/LoadData/AccountManagement/MemberModify.ashx",
            method: "POST",
            data: "action=getmodel&account=" + evo.account
        });*/
    }
    apiFunction.prototype.getAllUser = function() {
        /*return this.exec({
            url: "/LoadData/AccountManagement/GetMemberList.ashx",
            data: "ddlWarn=0&f_Account=" + evo.account + "&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=&pageIndex=&hidevalue_RecordCount=&type=getAllUser"
        });*/
    }


    //https://bk.ku711.net/member/api/Common/GetMemberInfoOperationLogByMultiAccountID
    apiFunction.prototype.getSystemLog = function() {
        return this.exec({
            url: "/member/api/Common/GetMemberInfoOperationLogByMultiAccountID",
            method: "POST",
            data: { "OperateType": 0, "OperatorList": [], "DataIDList": [], "PageIndex": 0, "PageSize": 5, "DataID": evo.account, "Operated": evo.account, "Platform": 0 }
        });
    }

    apiFunction.prototype.getPhoneDate = function() {

        /*return this.exec({
            url: "/LoadData/AccountManagement/GetMemberList.ashx",
            method: "POST",
            data: { "OperateType": 0, "OperatorList": [], "DataIDList": [], "PageIndex": 0, "PageSize": 5, "DataID": evo.account, "Operated": evo.account, "Platform": 0 }
        });*/
    }

    return new apiFunction();
})