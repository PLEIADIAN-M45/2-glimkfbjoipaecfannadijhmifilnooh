define(['@page'], function() {;
    'use strict';

    if(evo.params.method == "CookieID" || evo.pathname == "IGetMemberInfo") {
        console.log(12);
        return function main() {
            return new Promise(async (resolve, reject) => {
                //console.log($scope.address);
                //$scope.createIFrame(evo.route.device);
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
                    if(x.attr == "locate") {
                        //x.sites = [{ command: "getAllIPAddress", attr: x.attr }, ];
                    } else {
                        x.sites = [
                            { command: "apiFunctions.member", channel: "26", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "35", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "17", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "16", host: "ku711", attr: x.attr, value: x.value, index: 1 },
                        ];
                    }
                });

                function finish(result) {
                    Object.assign(this, result);
                    this.active = false;
                    if(!$scope.$$phase) { $scope.$apply(); }
                    if(this.level == 1) { putUser(); }
                }

                $scope.apiFunctions = function(e) {
                    if(this.channel == undefined) { return }
                    if(this.value == undefined) { return }
                    if(this.active == undefined || e) {
                        this.active = true;
                        if(this.level == 1 && this.attr != "banker") { delete this.region; } else { delete this.rows; }
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
                    return
                    var url = { wa111: `${s.origin}/Aspx/MemberModify.aspx?account=${this.f_accounts}`, ku711: `${s.origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${this.AccountID}` } [s.host];
                    console.log(url);
                    //window.open(url, "_blank")
                }
                resolve()
            })
        }
    }




    //var rect = obj.getBoundingClientRect();
    if(evo.params.method == "DeviceNo" || evo.pathname == "sameBrowserList") {
        return function main() {
            return new Promise(async (resolve, reject) => {
                $scope.components = [];
                $scope.stylesheet = ['logs', 'cards'];

                $scope.events.queryInputModel();
                $scope.events.postScrollHeightMessage();
                resolve()

            });
        }
    }





});



/*
   var frameUrl = {
                        "wa111": `${location.origin}/sameBrowserList.aspx?iType=3&accounts=${evo.account}&siteNumber=${evo.channel}`,
                        "ku711": `${location.origin}/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=${evo.account}`*/
/*
setTimeout(() => {
    var domRect = document.body.getBoundingClientRect();
    console.log(domRect);
    console.log(document.body.scrollHeight, document.body.offsetHeight);
    window.parent.postMessage({ scrollHeight: document.body.scrollHeight + 'px' }, '*');
}, 1000);*/
//console.log(document.body.scrollHeight, document.body.offsetHeight);


/*
return new Promise(async (resolve, reject) => {
    resolve($scope);
    debug();
})
return new Promise((resolve, reject) => {

                    resolve('createIFrame');
                });
*/

function debug() {
    console.log($scope.userlist);
    console.log($scope.user);
}

/*
              apiFunctions.localStorage()
              var b = apiFunctions.search.author("陈林")
              console.log(b);*/

//main().then(createIFrame)


//var Forms = function() { this.danger = evo.decoder(localStorage.danger) }
//var f = new Forms();
//console.log(f.danger.search("停權", 2));
//main().then(_invoke).then(createIFrame)