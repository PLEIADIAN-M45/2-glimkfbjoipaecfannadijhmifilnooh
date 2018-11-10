define(['@page'], function() {;
    'use strict';

    return function main() {
        return new Promise(async function(resolve, reject) {
            $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            $scope.extensionId = evo.extensionId;
            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];
            var user = await getUser();
            /*************************************************************/
            user.author.value = "陈林";
            user.author.value = "王杰";
            /*************************************************************/
            $scope.user = user;
            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.userlist.map((x) => {
                x.command = `apiFunctions:${evo.host}.${x.attr}?${evo.channel}`;
                x.channel = evo.channel;
                x.level = 1;
                x.sites = [
                    { command: "apiFunctions:wa111.member", channel: "26", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", channel: "35", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", channel: "17", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions:ku711.member", channel: "16", host: "ku711", attr: x.attr, value: x.value, index: 1 },
                ];
                return x;
            });
            //getMemberAlertInfoBackend();
            console.log($scope.user);
            console.log($scope.userlist);
            /**********************************************/
            function finish(result) {
                Object.assign(this, result);
                this.active = false;
                if(!$scope.$$phase) { $scope.$apply(); }
                if(this.level == 1) { putUser(); }
            }

            $scope.apiFunctions = function(e) {
                if(this.value == undefined) { return }
                if(this.active == undefined || e) {
                    this.active = true;
                    //if(this.level == 1 && this.attr != "banker") { delete this.region; } else { delete this.rows; }
                    chrome.runtime.sendMessage(evo.extensionId, this, finish.bind(this));
                };
            }

            function setPopup(popupId) { $(popupId).popup({ html: $(popupId).find('aside').html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" }); }

            $scope.changeColor = function(popupId) {
                var _sequel = $scope.user.sequel;
                if(this.list_Accounts && this.list_Accounts.length) { setTimeout(setPopup, 500, popupId); };
                if(this.list_Accounts && this.list_Accounts.length) { this.color = "pink"; };
                if(this.f_blacklist == 17 || this.IsBlackList == true) { this.color = "black" };
                if(this.f_id == _sequel || this.MNO == _sequel) { this.color = "brown" };
            };

            $scope.showRemittanceName = function() {
                $scope.list_RemittanceName = this.list_RemittanceName;
                $('.ui.modal').modal('show');
            }


            $scope.openMemberModify = function(s) {
                var url = { wa111: `${s.origin}/Aspx/MemberModify.aspx?account=${this.f_accounts}`, ku711: `${s.origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${this.AccountID}` } [s.host];
                console.log(url);
                //window.open(url, "_blank")
            }




            dispatch();

            resolve($scope);
        })
    }
});


// setTimeout(resolve, 2000)
//return new Promise((resolve, reject) => {});
//$scope.user.account
//apiFunctions:ku711.member?16
/*
function getMemberAlertInfoBackend() {
    chrome.runtime.sendMessage(
        evo.extensionId, {
            command: "apiFunctions:ku711.getMemberAlertInfoBackend?16",
            account: "",
            author: $scope.user.author.value,
        }, (result) => { sessionStorage[$scope.user.author.value] = angular.toJson(result.list_RemittanceName); });
}

$scope.getMemberAlertInfoBackendByMultiplayer = function(s) {
    return
    if(s.attr == "author") { return }
    if(s.channel != "16") { return }
    chrome.runtime.sendMessage(
        evo.extensionId, {
            command: "apiFunctions:ku711.getMemberAlertInfoBackendByMultiplayer?16",
            account: this.AccountID,
            author: this.AccountName,
        }, (result) => {
            Object.assign(this, result);

            console.log(result);
        });
}
*/


/*
  //if (this.locate) { return this.abort = true; }
                //if (this.value.includes('*')) { this.abort = true; } else {  }
$scope.getMemberAlertInfoBackend = function(s) {
    return
    if (this.host == "ku711" && this.author) {
        console.log(this);
        chrome.runtime.sendMessage(
            this.extensionId, {
                command: "apiFunctions",
                attr: "getMemberAlertInfoBackend",
                host: "ku711",
                channel: "16",
                account: $scope.user.account,
                author: this.author,
            },
            (result) => {
                if (result) {
                    this.extend(result);
                }
            });
    }
}

*/
/*
$scope.extend = function() {
    if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } }
}
$scope.assign = function() {
    if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } }
}
$scope.reset = function() {
    for (var key of Object.keys(this.result)) { delete this[key]; };
    api.call(this);
}
*/

/**********************************************/
/*Object.prototype.assign = function() {
    Object.assign(this, ...arguments);
    if (!$scope.$$phase) { $scope.$apply(); }
}*/