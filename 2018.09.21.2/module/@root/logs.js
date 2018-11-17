define(['@page'], function() {

    ;
    'use strict';
    //if(this.params.method == "CookieID" || this.pathname == "IGetMemberInfo") {}
    $scope.run = function() {

        return new Promise(async (resolve, reject) => {
            //var extensionId = this.extensionId

            this.apiFunctions = {};

            this.apiFunctions.region = function(params, e) {
                params.command = "apiFunctions.region";
                params.active = true;
                params.region = (params.attr == "banker") ? params.region : {};
                chrome.runtime.sendMessage(this.extensionId, params, (res) => {
                    params.active = false;
                    Object.assign(params, res);
                    this.$apply();
                    this.putUser();
                });
            }.bind(this);


            this.apiFunctions.getProtocolSet = function(params) {
                params.rows = public.filter((d) => { return d != undefined && d.channel == this.user.channel && d.AccountID == this.user.account });
                this.user.region = params.rows.map((x) => { return x.IPLocation });
            }.bind(this);


            this.apiFunctions.member = function(params) {
                params.command = "apiFunctions.member"
                params.active = true;
                params.rows = [];
                chrome.runtime.sendMessage(this.extensionId, params, (res) => {
                    params.active = false;
                    Object.assign(params, res);
                    this.$apply();
                });
            }.bind(this);



            this.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            this.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            this.user = await this.getUser();

            this.list = [this.user.author, this.user.locate, this.user.mobile, this.user.idcard, ].concat(this.user.banker).map((x) => {
                var params = { attr: x.attr, value: x.value, index: 1 };
                x.sites = [
                    { channel: "26", host: "wa111", ...params },
                    { channel: "35", host: "wa111", ...params },
                    { channel: "17", host: "wa111", ...params },
                    { channel: "16", host: "ku711", ...params }
                ];
                return x;
            });


            console.log(this.user);

            this.changeColor = function(r) {
                r.$id = "#" + this.$id;
                r.sequel = this.user.sequel;
                if (r.list_Accounts && r.list_Accounts.length) { this.color = "pink"; };
                if (r.f_blacklist == 17 || r.IsBlackList == true) { this.color = "black" };
                if (r.f_id == r.sequel || r.MNO == r.sequel) { this.color = "brown" };
            };


            this.setPopup = function(r) {
                if (r.list_Accounts && r.list_Accounts.length) {
                    setTimeout((popupId) => {
                        $(popupId).popup({ html: $(popupId).find('aside').html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" });
                    }, 500, r.$id);
                };
            }

            this.showSemanticModal = function(s) {
                $rootScope.list_RemittanceName = s.list_RemittanceName;
                $('.ui.modal').modal('show');
            }

            this.openMemberModify = function(r, s) {
                var url = { wa111: `${s.origin}/Aspx/MemberModify.aspx?account=${r.f_accounts}`, ku711: `${s.origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${r.AccountID}` } [s.host];
                console.log(url);
                //window.open(url, "_blank")*/
            }

            resolve(this)

            return

        });

    }


});



/*
            this.userlist = [
                { attr: "author" },
                { attr: "locate" },
                { attr: "mobile" },
                { attr: "idcard" },
                { attr: "banker" },
                { attr: "banker" },
                { attr: "banker" },
                { attr: "banker" },
                { attr: "banker" },
            ].map((x) => {
                console.log(x);
                console.log(this.user[x.attr]);
            })*/

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