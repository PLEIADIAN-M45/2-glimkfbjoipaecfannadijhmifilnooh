define(['host'], function() {

    $scope.controller = function($compile, $rootScope, $timeout) {

        console.log('user:', evo.user);

        var { author, locate, mobile, idcard, banker, host, channel, account } = evo.user;
        var property = [author, locate, mobile, idcard, ...banker].filter((x) => x.value);
        var initialization = function(me) {
            var { property, value, region } = me;
            var { host, channel, account } = evo.user;
            var icon = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" } [property];
            var head = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" } [property];
            var command = {
                locate: "apiFunctions:locate:evo:0",
                idcard: "apiFunctions:idcard:evo:0",
                mobile: "apiFunctions:mobile:host:channel",
            } [property];
            var params = { property, channel, account, command, value };
            if(property == "locate") {
                var sites = [];
            } else {
                var sites = ['wa111:26', 'wa111:35', 'wa111:17', 'ku711:16'].map((suffix) => {
                    var [proxy, channel] = suffix.split(':')
                    return { channel, [property]: value, command: 'apiFunctions:Member:' + suffix, index: 1 };
                });
                //console.log(sites);
            }
            this.extend({ ...me, icon, head, params, sites });
        };

        function sheetsTestFunction(me) {
            if(me.sheets == undefined) { return } else { me.sheets.test = google[me.property].search(me.value); }
        };

        function regionTestFunction(me) {
            if(me.region == undefined) { return } else { me.region.test = google.region.search(me.region); }
        };

        function apiFunctions(me, e) {
            this.extend(me);
            if(this.property == 'author') { return };
            if(this.property == 'banker') { return };
            if(this.region.test === undefined || e) {
                //console.log(this.property);
                this.extend({ region: {}, active: true });
                evo.apiFunctions(this.params).then((res) => {
                        this.regionTestFunction(evo.assign(me, res));
                        this.extend(res, { active: false });
                    })
                    .then(putUser);
            }
        };

        function apiMemberList(me, e) {
            $('.popup').remove();
            this.extend(evo.assign(me, { rows: [], active: true }));

            evo.apiFunctions(me).then((res) => {
                //console.log(res);
                evo.assign(me, res);
                this.extend(res);
            });
        };

        function GetAlertInfoByID(row, scope) {
            if(row.AccountID) {
                evo.apiFunctions({
                    command: 'apiFunctions:Alerts:ku711:16',
                    params: { "DisplayArea": "1", "Account": [{ "AccountID": row.AccountID, "AccountName": "" }] },
                }).then((res) => {
                    evo.assign(row, res);
                    changeColor(row, scope);
                })
            }
        };

        function changeColor(r, scope) {
            var account = r.f_accounts || r.AccountID;
            var uniqueId = account + "-" + evo.user.channel;
            if(uniqueId == evo.user.uniqueId) r.color = "brown";
            else if(r.f_blacklist == 17 || r.IsBlackList) r.color = "black";
            else if(r.list_Accounts && r.list_Accounts.length) r.color = "pink";
            scope.extend(r)
        };


        function imPopup(row, scope, id) {
            var target = document.getElementById(id);
            setTimeout(function() {
                var content = target.querySelector(".ui.table");
                $(target).popup({ html: content.outerHTML, hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" })
            }, 500, target);
        };

        function openMemberList({ origin }) {
            window.open(origin + {
                "ku711": `/member/MemberInfoManage/MemberInfoManage`,
                "wa111": `/aspx/MemberList.aspx?sort=Font_xianyousuoyouhuiyuan`
            } [host]);
            window.open(s.result.origin + path)
        };

        function showMemberModify({ f_accounts, AccountID }, { origin, host }) {
            window.open(origin + {
                "ku711": `/Member/MemberInfoManage/EditMemberInfoManage?accountId=${AccountID}`,
                "wa111": `/Aspx/MemberModify.aspx?account=${f_accounts}`
            } [host]);
        };


        $scope.extend({ property, initialization, regionTestFunction, sheetsTestFunction, apiFunctions, apiMemberList, getAllIPAddress, showMemberModify, openMemberList, changeColor, imPopup, GetAlertInfoByID })
    };


    function createIFrame() {
        return new Promise(function(resolve, reject) {
            var frameUrl = {
                "wa111": `${location.origin}/sameBrowserList.aspx?iType=3&accounts=${evo.account}&siteNumber=${evo.channel}`,
                "ku711": `${location.origin}/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=${evo.account}`
            } [evo.host];
            $('<div>').addClass('ui horizontal divider').text('AND').appendTo(evo.controllerProvider);
            $('<iframe>', { id: 'sameBrowserList', src: frameUrl, frameborder: 0, width: '100%', }).appendTo(evo.controllerProvider);
            resolve('createIFrame')
        })
    }




    if(evo.params.method == 'CookieID' || evo.filename == 'igetmemberinfo') {
        $scope.components = ['log'];
        $scope.stylesheet = ['log', 'cards'];

        startup()
            .then(getUser)
            .then(dispatch)
            .then(bootstrap)
            .then(scrollHeightListener)
            //.then(checkSensitiveWords)
            //.then(getAllIPAddress)
            //.then(addSiteNumberToAccountId)
            //.then(createIFrame)
            .catch(error)
    }


    if(evo.params.method == 'DeviceNo' || evo.filename == 'samebrowserlist') {
        $scope.stylesheet = ['log'];
        startup().then(dispatch).then(scrollHeightPoster).then(checkSensitiveWords).then(addSiteNumberToAccountId)
    }
});



function GetAlertInfoByName(s, scope) {
    return
    //console.log(s.channel);
    if(s.channel == "16") {
        chrome.runtime.sendMessage(evo.extensionId, {
            command: 'API',
            channel: '16',
            method: 'GetMemberAlertInfoBackendByMultiplayer',
            params: {
                "DisplayArea": "1",
                "Account": [{ "AccountID": "", "AccountName": s.value }]
            },
        }, function(response, status) {
            s.list_RemittanceName = response.rows;
            if(!scope.$$phase) { scope.$apply(); }
        })
    } else {
        //console.log(s);
        if(s.result && s.result.rows && s.result.rows.length) {
            s.list_RemittanceName = s.result.rows[0].list_RemittanceName;
            if(!scope.$$phase) { scope.$apply(); }
        }
    }
};




function test() {
    //author.value = "王杰";
    //mobile.value = "15868723883";

    /*mobile.value = "17805182900"; //danger
    idcard.value = "320584199901017191"; //danger
    banker[0].value = "623668255000152656"; //danger*/



    /*evo.user.mobile.value = "17805182900";
    evo.user.idcard.value = "320684199901017199";
    evo.user.banker[0].value = "6212264301022817389";
    evo.user.author.value = "王杰";
    evo.user.locate.value = "116.20.62.75";*/
    /**
        // evo.user.locate.value = "216.20.62.75";
         evo.user.mobile.value = "13126682900";
         evo.user.idcard.value = "320584199901017191";
         //evo.user.banker[0].value = "623668255000152656";
         evo.user.mobile.value = "15868723883";*/
    //author.value = "欧阳磊";
    //banker[0].value = "62122617040052324";

}

test()