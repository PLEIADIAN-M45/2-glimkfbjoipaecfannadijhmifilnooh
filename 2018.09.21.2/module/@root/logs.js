define(['@page'], function() {;
    'use strict';

    return function main() {
        return new Promise(async function(resolve, reject) {
            $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            $scope.extensionId = evo.extensionId;

            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];

            $scope.user = user = await getUser();
            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.userlist.forEach((x) => {
                x.command = `apiFunctions.${x.attr}`;
                x.channel = evo.channel;
                x.level = 1;
                x.sites = [
                    { command: "apiFunctions.member", channel: "26", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions.member", channel: "35", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions.member", channel: "17", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions.member", channel: "16", host: "ku711", attr: x.attr, value: x.value, index: 1 },
                ];
            });

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
                    if(this.level == 1 && this.attr != "banker") { delete this.region; } else { delete this.rows; }
                    chrome.runtime.sendMessage(evo.extensionId, this, finish.bind(this));
                };
            }

            function setPopup(popupId) {
                $(popupId).popup({ html: $(popupId).find('aside').html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" });
            }

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

            debug();
        })
    }
});


function debug() {
    console.log($scope.user);
    console.log($scope.userlist);
}