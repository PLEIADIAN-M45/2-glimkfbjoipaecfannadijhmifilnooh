define([], function() {

    var apiFunction = function() {

        this.exec = function(mod) {

            mod.assign = _assign;
            mod.assign({ dataType: "json" });

            return new Promise((resolve, reject) => {
                $.ajax(mod).then((d) => {
                    var res = d.rows || d;
                    try { if (res.length == 1) { resolve(...res) } else { resolve(res) } } catch (ex) {}
                })
            })
        }
    }

    apiFunction.prototype.getModel = function() {
        return this.exec({
            url: "/LoadData/AccountManagement/MemberModify.ashx",
            method: "POST",
            data: "action=getmodel&account=" + $scope.account
        });
    }

    apiFunction.prototype.getAllUser = function() {
        return this.exec({
            url: "/LoadData/AccountManagement/GetMemberList.ashx",
            data: "ddlWarn=0&f_Account=" + $scope.account + "&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=&pageIndex=&hidevalue_RecordCount=&type=getAllUser"
        });
    }


    apiFunction.prototype.getSystemLog = function() {
        return this.exec({
            url: "/LoadData/AccountManagement/GetSystemLog.ashx",
            method: "POST",
            data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + $scope.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji="
        });
    }

    apiFunction.prototype.getPhoneDate = function() {
        return this.exec({
            url: "/LoadData/AccountManagement/GetMemberList.ashx",
            data: "type=getPhoneDate&account=" + $scope.account
        });
    }

    apiFunction.prototype.getUserStore = function() {
        return new Promise((resolve, reject) => {
            $scope.store.user.get($scope.account).then((res) => {
                res.f_RemittanceAccount = res.f_RemittanceAccount.split('|');
                resolve(res);
            })
        })
    }

    apiFunction.prototype.getAlertInfo = function() {
        return new Promise(function(resolve, reject) {
            chrome.runtime.sendMessage(evo.extensionId, {
                command: "apiFunctions",
                property: "alerts",
                host: "Backend",
                channel: "0",
                params: { "DisplayArea": "1", "Account": [{ "AccountID": evo.account, "AccountName": ctl00_ContentPlaceHolder1_txtRemittaceName.value }] }
            }, ([result, status]) => {
                console.log(result);
                //result.active = false;
                resolve(result);
            });

            /*
            evo.apiFunctions({
                command: "apiFunctions",
                property: "alerts",
                host: "Backend",
                channel: "0",
                params: { "DisplayArea": "1", "Account": [{ "AccountID": evo.account, "AccountName": ctl00_ContentPlaceHolder1_txtRemittaceName.value }] }
            }).then((res) => {
                console.log(res);
                //Object.assign(s, res)
                //console.log(s);
            });*/

        })
    }

    return new apiFunction();
})



















/*

function selectedOptions(el) {
    return (el.value) ? el.selectedOptions[0].label : "";
}

apiFunction.prototype.getProvince = function() {
    return [
        ctl00_ContentPlaceHolder1_ddlCity,
        ctl00_ContentPlaceHolder1_ddlCity2,
        ctl00_ContentPlaceHolder1_ddlCity3,
        ctl00_ContentPlaceHolder1_ddlCity4,
        ctl00_ContentPlaceHolder1_ddlCity5
    ].map(selectedOptions).map((value) => { return value })
}

apiFunction.prototype.getBankCity = function() {
    return [
        ctl00_ContentPlaceHolder1_ddlCityArea,
        ctl00_ContentPlaceHolder1_ddlCityArea2,
        ctl00_ContentPlaceHolder1_ddlCityArea3,
        ctl00_ContentPlaceHolder1_ddlCityArea4,
        ctl00_ContentPlaceHolder1_ddlCityArea5
    ].map(selectedOptions).map((value) => { return value })
}

apiFunction.prototype.getBankName = function() {
    return [
        ctl00_ContentPlaceHolder1_BankCode111,
        ctl00_ContentPlaceHolder1_BankCode111_2,
        ctl00_ContentPlaceHolder1_BankCode111_3,
        ctl00_ContentPlaceHolder1_BankCode111_4,
        ctl00_ContentPlaceHolder1_BankCode111_5
    ].map(({ value }) => { return value })
}
apiFunction.prototype.getBankCode = function() {
    return [
        ctl00_ContentPlaceHolder1_txtRemittanceAccount111,
        ctl00_ContentPlaceHolder1_txtRemittanceAccount111_2,
        ctl00_ContentPlaceHolder1_txtRemittanceAccount111_3,
        ctl00_ContentPlaceHolder1_txtRemittanceAccount111_4,
        ctl00_ContentPlaceHolder1_txtRemittanceAccount111_5
    ].map(({ value }) => { return value })
}

apiFunction.prototype.getBankValue = function() {
    return new Promise(function(resolve, reject) {
        evo.store.user.get(evo.account).then((row) => {
            var arr = row.f_RemittanceAccount.split('|').map((value) => { return value })
            resolve(arr)
        })
    })
}
*/