define([], function() {

    var apiFunction = function() {
        this.exec = function(mod) {
            return new Promise((resolve, reject) => {
                $.ajax(evo.assign(mod, { dataType: "json" })).then((d) => {
                    var res = d.rows || d;
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
        return this.exec({
            url: "/LoadData/AccountManagement/MemberModify.ashx",
            method: "POST",
            data: "action=getmodel&account=" + evo.account
        });
    }
    apiFunction.prototype.getAllUser = function() {
        return this.exec({
            url: "/LoadData/AccountManagement/GetMemberList.ashx",
            data: "ddlWarn=0&f_Account=" + evo.account + "&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=&pageIndex=&hidevalue_RecordCount=&type=getAllUser"
        });
    }

    apiFunction.prototype.getSystemLog = function() {
        return this.exec({
            url: "/LoadData/AccountManagement/GetSystemLog.ashx",
            method: "POST",
            data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + evo.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji="
        });
    }

    apiFunction.prototype.getPhoneDate = function() {
        return this.exec({
            url: "/LoadData/AccountManagement/GetMemberList.ashx",
            data: "type=getPhoneDate&account=" + evo.account
        });
    }

    return new apiFunction();
})