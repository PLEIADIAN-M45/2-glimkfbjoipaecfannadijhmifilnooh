define(['@page'], function() {

    ;
    'use strict';
    //if(this.params.method == "CookieID" || this.pathname == "IGetMemberInfo") {}
    $scope.run = function() {


        return new Promise(async (resolve, reject) => {

            this.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            this.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            this.user = await this.getUser();

            /*******************************************************/
            this.user.author.value = "王杰";
            /*******************************************************/

            var user = this.user;

            $scope.list = [
                user.author,
                user.locate,
                user.mobile,
                user.idcard,
            ].map((x) => {
                x.command = "apiFunctions." + x.attr
                x.level = 1;
                x.channel = this.channel;
                return x;
            }).map((x) => {
                if(x.attr == "locate") {
                    /*x.sites = [
                        { command: "apiFunctions.member", channel: "26", host: "wa111", attr: x.attr, value: x.value, index: 1 }
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
            })


            $scope.changeColor = function(popupId) {
                var _sequel = $scope.user.sequel;
                if(this.list_Accounts && this.list_Accounts.length) { setTimeout(setPopup, 500, popupId); };
                if(this.list_Accounts && this.list_Accounts.length) { this.color = "pink"; };
                if(this.f_blacklist == 17 || this.IsBlackList == true) { this.color = "black" };
                if(this.f_id == _sequel || this.MNO == _sequel) { this.color = "brown" };
            };


            function setPopup(popupId) { $(popupId).popup({ html: $(popupId).find('aside').html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" }); }



            $scope.showRemittanceName = function() {
                $scope.list_RemittanceName = this.list_RemittanceName;
                $('.ui.modal').modal('show');
            }


            $scope.openMemberModify = function(r, s) {
                var url = { wa111: `${s.origin}/Aspx/MemberModify.aspx?account=${r.f_accounts}`, ku711: `${s.origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${r.AccountID}` } [s.host];
                console.log(url);
                //window.open(url, "_blank")*/
            }



            resolve(this)

            return


            /*
            var apiFunctions = function(x) {
                x.command = "apiFunctions." + x.attr
                x.level = 1;
                x.channel = this.channel;
                console.log(x);
                this.sendMessage(x).then((result) => {
                    console.log(result);
                    Object.assign(this, result);
                    this.active = false;
                    if(!$scope.$$phase) { $scope.$apply(); }
                    if(this.level == 1) { putUser(); }
                })

            }.bind(this)*/




            user.mobile.region = apiFunctions(user.mobile)





            /*
                            var apiFunctions = function(x) {
                                // console.log(this.channel);
                                console.log(x);
                                x.command = "apiFunctions" + x.attr
                                x.level = 1;
                            }.bind(this)

                        $scope.list = [
                            { attr: "author", region: apiFunctions(user.author), channel: this.channel, value: this.user.author.value },
                            { attr: "mobile", region: apiFunctions(user.author), command: "apiFunctions.mobile", channel: this.channel, value: this.user.mobile.value },
                        ]*/



            /*******************************************************/
            /*$scope.apiFunctions = {
                author: function() {},
                mobile: function() {},
                idcard: function() {},
                banker: function() {},
                locate: function() {},
            }*/

            /*
            var apiFunctions2 = function(x) {}
            apiFunctions2.prototype.channel = this.channel;
            apiFunctions2.prototype.run = function() {
                console.log(this);
                console.log(this.channel);
            };

            var apiFunctions = new apiFunctions2()

            apiFunctions.run.call(user.mobile)
            */


            /*this.apiFunctions2 = function(x) {
                console.log(this);
                console.log(this.channel);
                console.log(x.value);
            }

            this.apiFunctions2.prototype.channel = this.channel


            console.log(this.channel);


            this.apiFunctions2.bind(user.mobile)
            this.apiFunctions2()*/
            //console.log(c);




            /*
                        function apiFunctions2(x) {
                            console.log(this);
                            console.log(this.channel);
                            console.log(this.value);

                        }
            */
            //mobile = function() {}


            /*
            var apiFunctions = {
                mobile: function() {
                    console.log(this);
                    console.log(12);
                }
            }*/


            /*
            console.log(d.channel);
            console.log(c.channel);
            */

            //apiFunctions()

            //apiFunctions.mobile()

            /*

            $scope.list = [
                { attr: "author", command: apiFunctions.call(user.author), channel: this.channel, value: this.user.author.value },
                { attr: "mobile", command: "apiFunctions.mobile", channel: this.channel, value: this.user.mobile.value },
            ]*/




            return


            $scope.list = [this.user.author, this.user.locate, this.user.mobile, this.user.idcard].concat(this.user.banker)
                .map((x) => { return Object.assign(x, { level: 1, command: "apiFunctions." + x.attr, channel: this.channel }); })
                .map((x) => {
                    if(x.attr == "locate") {

                    } else {
                        x.sites = [
                            { command: "apiFunctions.member", channel: "26", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "35", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "17", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                            { command: "apiFunctions.member", channel: "16", host: "ku711", attr: x.attr, value: x.value, index: 1 },
                        ];
                    }
                    return x
                });




            $scope.apiFunctions = function(e) {
                //console.log(this);
                if(this.channel == undefined) { return }
                if(this.value == undefined) { return }
                if(this.active == undefined || e) {
                    this.active = true;
                    if(this.level == 1 && this.attr != "banker") { delete this.region; } else { delete this.rows; }
                    $scope.sendMessage(this).then((result) => {
                        Object.assign(this, result);
                        this.active = false;
                        if(!$scope.$$phase) { $scope.$apply(); }
                        if(this.level == 1) { putUser(); }
                    })
                };
            }



            $scope.changeColor = function(popupId) {
                var _sequel = $scope.user.sequel;
                if(this.list_Accounts && this.list_Accounts.length) { setTimeout(setPopup, 500, popupId); };
                if(this.list_Accounts && this.list_Accounts.length) { this.color = "pink"; };
                if(this.f_blacklist == 17 || this.IsBlackList == true) { this.color = "black" };
                if(this.f_id == _sequel || this.MNO == _sequel) { this.color = "brown" };
            };


            function setPopup(popupId) { $(popupId).popup({ html: $(popupId).find('aside').html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" }); }



            $scope.showRemittanceName = function() {
                $scope.list_RemittanceName = this.list_RemittanceName;
                $('.ui.modal').modal('show');
            }


            $scope.openMemberModify = function(r, s) {
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