define(['@page'], function() {

    ;
    'use strict';
    //if(this.params.method == "CookieID" || this.pathname == "IGetMemberInfo") {}
    $scope.run = function() {

        return new Promise(async (resolve, reject) => {


            var extensionId = this.extensionId

            /*
            var apiFunctions = {

                region: function(req, e) {
                    //console.log(this.extensionId);
                    console.log(req);
                    console.log(this);


                    return
                    //req.level = 1;
                    req.region = {};
                    req.active = true;
                    req.channel = this.channel;
                    req.command = "apiFunctions." + req.attr;

                    chrome.runtime.sendMessage(extensionId, req, (res) => {
                        req.active = false;
                        Object.assign(req, res);
                        this.$apply();
                    })
                },
            }
            */


            //apiFunctions.region.bind(this);

            this.apiFunctions = {};

            //console.log(this.account);

            this.apiFunctions.region = function(req, e) {
                var params = Object.assign({
                    //command: "apiFunctions." + req.attr,
                    command: "apiFunctions.region",
                    active: true,

                    /*account: this.account,
                    channel: this.channel,
                    unique: this.user.unique,   
                    sequel: this.user.sequel,
                    */
                    //region: {}
                }, req);


                /*req.region = {};
                req.active = true;
                req.channel = this.channel;
                req.command = "apiFunctions." + req.attr;
                */

                chrome.runtime.sendMessage(this.extensionId, params, (res) => {
                    console.log(res);
                    req.active = false;
                    Object.assign(req, res);
                    this.$apply();
                })

            }.bind(this)







            //this.apiFunctions.region.bind(this);



            this.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            this.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            this.user = await this.getUser();

            var user = {

            }


            Object.defineProperties(user, {
                banker: {
                    value: 34535435,
                    writable: false
                },
                property2: {}
            });



            user.banker.value = 666666


            console.log(user);


            //var banker = this.user.banker[0];

            /*
            Object.defineProperty(this.user.banker[0], 'region', {
                value: this.user.banker[0].region,
                writable: false
            });


            console.log(this.user);
            */

            //this.user.banker.forEach((x) => {})

            this.list = [
                    /*this.user.author,
                    this.user.locate,
                    this.user.mobile,
                    this.user.idcard,*/
                ].concat(this.user.banker)

                .map((x) => {
                    return x;
                    x.level = 1;
                    x.command = "apiFunctions." + x.attr;
                    x.channel = this.channel;
                    return x;
                }).map((x) => {
                    return x;

                    if (x.attr == "locate") {
                        /*x.sites = [
                            { command: "apiFunctions.getProtocolSet", channel: "26", host: "wa111", attr: x.attr, value: x.value, index: 1 }
                        ]*/
                    } else {
                        x.sites = [
                            { command: "apiFunctions.member", channel: "26", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "35", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "17", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "16", host: "ku711", attr: x.attr, value: x.value, index: 1 },
                        ]
                    }
                    return x;
                });






            //console.log(this.list);

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