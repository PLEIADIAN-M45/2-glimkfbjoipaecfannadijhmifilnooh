define([], function () {

    class apiFunction {

        constructor(c) {
            this.extensionId = c.extensionId;
            this.unique = c.unique
            this.sendMessage = c.sendMessage;
            this.dexie = c.dexie;
        }


        ajax({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) {
            return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows })
        }



        bindUser(a) { console.log(a); }



        getUserStore($scope) {
            return this.dexie.user.get($scope.account).then((x) => {
                $scope.user.sequel = x.f_id;
                $scope.user.attach = x.f_joindate;
                $scope.user.agency = x.f_alagent;
                $scope.user.black = x.f_blacklist;
                $scope.user.peril = x.f_peril;
                $scope.user.nickName = x.f_nickName;
                $scope.user.banker.map((d, i) => { d.value = x.f_RemittanceAccount[i]; });
                $scope.user.banker = $scope.user.banker.filter((a) => { return a.value });
                return $scope.user;
            })
        }

        getSystemLog($scope) {
            return this.ajax({
                url: "/LoadData/AccountManagement/GetSystemLog.ashx",
                method: "POST",
                data: "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + $scope.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=",
            }).then((rows) => {
                return rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                    if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return $scope.user.timing[0] = f_time; }
                });
            })
        }

        getPhoneDate($scope) {
            return this.ajax({
                url: "/LoadData/AccountManagement/GetMemberList.ashx",
                data: "type=getPhoneDate&account=" + $scope.account
            }).then((rows) => {
                var d = rows[0];
                $scope.user.mobile.value = d.f_photo;
                $scope.user.idcard.value = d.f_idCard;
                $scope.user.equpmt.browser = d.f_browser;
                $scope.user.equpmt.osInfo = d.f_osInfo;
                return $scope.user;
            })
        }




    }


    return apiFunction
});








/*




            return
            return this.sendMessage({
                command: 'apiFunctions.store.user.get',
                unique: this.unique
            }).then((x) => {
                console.log(x);
                /*
                $scope.user.sequel = x.f_id;
                $scope.user.attach = x.f_joindate;
                $scope.user.agency = x.f_alagent;
                $scope.user.black = x.f_blacklist;
                $scope.user.peril = x.f_peril;
                $scope.user.nickName = x.f_nickName;
                $scope.user.banker.map((d, i) => { d.value = x.f_RemittanceAccount[i]; });
                $scope.user.banker = $scope.user.banker.filter((a) => { return a.value });*/
//  })

//console.log($scope.unique);
//console.log(this.unique);
//chrome.runtime.sendMessage(this.extensionId, { command: 'apiFunctions.store.user.get', unique: this.unique }, this.bindUser)
/*cbc: function (res) {
    console.log(res);
    return
    var d = res.rows.shift();
    $scope.user.mobile.value = d.f_photo;
    $scope.user.idcard.value = d.f_idCard;
    $scope.user.equpmt.browser = d.f_browser;
    $scope.user.equpmt.osInfo = d.f_osInfo;
}

*/


/*
cbc: function (res) {
    console.log(res);
}*/

/*var d = res.rows.shift();
$scope.user.mobile.value = d.f_photo;
$scope.user.idcard.value = d.f_idCard;
$scope.user.equpmt.browser = d.f_browser;
$scope.user.equpmt.osInfo = d.f_osInfo;
*/
/* this.url = "/LoadData/AccountManagement/GetSystemLog.ashx";
 this.method = "POST";
 this.data = "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + this.account + "&zwrq2=&logType=memberlog&f_number=&type=&selType=&selShow=-1&txtID=&selDengji=";
 this.callback = function (res) {
     console.log(res);
 }

 console.log(this);
 return this.ajax();*/

/*
return new Promise((resolve, reject) => {              
    $.ajax({
        url: this.url,
        data: this.data,
        method: this.method,
        dataType: 'json'
    }).then(this.callback).fail(reject)
})*/