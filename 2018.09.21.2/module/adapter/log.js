define([evo.router], function() {


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
            if (property == "locate") {
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
            if (me.sheets == undefined) { return } else { me.sheets.test = google[me.property].search(me.value); }
        };

        function regionTestFunction(me) {
            if (me.region == undefined) { return } else { me.region.test = google.region.search(me.region); }
        };

        function apiFunctions(me, e) {
            this.extend(me);

            if (this.property == 'author') { return };
            if (this.property == 'banker') { return };
            if (this.region.test === undefined || e) {
                console.log(this.property);
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
            if (row.AccountID) {
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
            if (uniqueId == evo.user.uniqueId) r.color = "brown";
            else if (r.f_blacklist == 17 || r.IsBlackList) r.color = "black";
            else if (r.list_Accounts && r.list_Accounts.length) r.color = "pink";
            scope.extend(r)
        };

        function GetAlertInfoByName(s, scope) {
            return
            //console.log(s.channel);
            if (s.channel == "16") {
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
                    if (!scope.$$phase) { scope.$apply(); }
                })
            } else {
                //console.log(s);
                if (s.result && s.result.rows && s.result.rows.length) {
                    s.list_RemittanceName = s.result.rows[0].list_RemittanceName;
                    if (!scope.$$phase) { scope.$apply(); }
                }
            }
        };

        function imPopup(row, scope, id) {
            var target = document.getElementById(id);
            setTimeout(function() {
                var content = target.querySelector(".ui.table");
                $(target).popup({ html: content.outerHTML, hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" })
            }, 500, target);
        };

        function openMemberList({ origin }) {
            return

            window.open(origin + {
                "ku711": `/member/MemberInfoManage/MemberInfoManage`,
                "wa111": `/aspx/MemberList.aspx?sort=Font_xianyousuoyouhuiyuan`
            } [host]);
            switch (evo.host) {
                case "wa111":
                    var path = "/aspx/MemberList.aspx?sort=Font_xianyousuoyouhuiyuan";
                    break;
                case "ku711":
                    var path = "/member/MemberInfoManage/MemberInfoManage";
                    break
            }
            window.open(s.result.origin + path)
        };

        function showMemberModify({ f_accounts, AccountID }, { origin, host }) {
            window.open(origin + {
                "ku711": `/Member/MemberInfoManage/EditMemberInfoManage?accountId=${AccountID}`,
                "wa111": `/Aspx/MemberModify.aspx?account=${f_accounts}`
            } [host]);
        };

        function getAllIPAddress(scope) {
            console.log(evo.user.region);
            var rows = [];
            var region = new Set();
            switch (evo.host) {
                case 'ku711':
                    $scope.$watch('ctrl.model.ResultList', function(result, oldValue) {
                        if (result) {
                            result.filter(({ AccountID, IPLocation }) => {
                                return AccountID == evo.user.account;
                            }).map(({ IPAddress: protocol, IPLocation: province }) => {
                                rows.push({ protocol, province });
                                region.add(province);
                            })
                            scope.extend({ rows });
                            evo.user.region = Array.from(region);
                            //putUser();
                        }
                    });
                    break;
                case 'wa111':
                    [...document.querySelectorAll("ul:not([class])")].filter(({ children }) => {
                        return children.length > 1 && children[0].outerText;
                    }).map(({ children }) => {
                        return [...children].map((x) => { return x.outerText; })
                    }).map((c) => {
                        return { channel: c[0], account: c[2], protocol: c[7], province: c[9], }
                    }).filter(({ channel, account }) => {
                        return (account == evo.user.account) && (channel.startsWith(evo.user.channel))
                    }).map(({ protocol, province }, index, arr) => {
                        rows.push({ protocol, province });
                        region.add(province);
                    });
                    scope.extend({ rows });
                    evo.user.region = Array.from(region);
                    putUser();
                    break;
            }
        }



        $('<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">').appendTo('head')

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


    /*
    0分站名
    1代理登入
    2帳號
    3加入日期
    4匯款戶名
    5當前模式
    6黑名单
    7IP
    8最後登入日期
    9IP地址
    10手机归属地
    11一機多登備註
    12總輸贏查詢*/
    /* TrHead2
         TrHead
         divCookie
         divCookie*/





    function addSiteNumberToAccountId() {
        var accountIdCollection = getAccountIdCollection();
        var siteNumberCollection = getSiteNumberCollection();
        accountIdCollection.each(function(index, element) {
            if (element.textContent.trim()) {
                var accountId = element.textContent.trim();
                var siteNumber = '-' + siteNumberCollection[index];
                var uniqueId = accountId + siteNumber;
                if (uniqueId == evo.uniqueId) { element.classList.add('self'); }
                if (evo.siteNumber != '16') {
                    element.setAttribute('data-content', accountId);
                    element.textContent = null;
                    $('<b>').text(accountId).addClass('pointer').attr('data-content', accountId).popup({ on: 'click' }).click(function() {
                        evo.copyText = accountId;
                        document.execCommand("copy");
                    }).appendTo(element);

                    $('<b>').text(siteNumber).addClass('pointer').attr('data-content', accountId + siteNumber).popup({ on: 'click' }).click(function() {
                        evo.copyText = accountId + siteNumber;
                        document.execCommand("copy");
                    }).appendTo(element);
                }
            }
        });
    }



    if (evo.params.method == 'CookieID' || evo.filename == 'igetmemberinfo') {
        $scope.components = ['log'];
        $scope.stylesheet = ['log', 'cards'];

        startup()
            .then(getUser)
            .then(dispatch)
            .then(bootstrap)
            .then(scrollHeightListener)
            .then(checkSensitiveWords)
            .then(addChannel)
            //.then(addSiteNumberToAccountId)
            //.then(createIFrame)
            .catch(error)
    }


    if (evo.params.method == 'DeviceNo' || evo.filename == 'samebrowserlist') {
        $scope.stylesheet = ['log'];
        startup().then(dispatch).then(scrollHeightPoster).then(checkSensitiveWords).then(addSiteNumberToAccountId)
    }
});

function addChannel() {
    var rows = $('#divCookie>ul:not([class]):not([style])').toArray();
    var c = rows.filter((row) => {
        console.log(row.TEXT_NODE);
        return row.children.length > 5 && row.firstElementChild.outerText;
    });

    console.log(c);

}

addChannel();

//collection.push([el.children[0]]);


//var collection = [];
function createElement() {
    var node = document.createElement("B"); // Create a <li> node
    var textnode = document.createTextNode(channel); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    document.getElementById("myList").appendChild(node);
}


document.querySelectorAll('ul:not([class]):not([style])').forEach((el) => {
    if (el.children.length > 5 && el.firstElementChild.outerText) {

        var { children } = el;
        var channel = children[0].outerText.slice(0, 2);
        var account = children[2].outerText;

        children[2].firstChild.remove()

        var node = document.createElement("B");
        var textnode = document.createTextNode(account);
        node.appendChild(textnode);
        children[2].appendChild(node);

        node.onclick = function() {
            alert(1)
        }


        var node = document.createElement("B");
        var textnode = document.createTextNode(channel);
        node.appendChild(textnode);
        children[2].appendChild(node);



        if (channel == evo.channel) {
            //self
            el.title = [account, channel].join('-')
        }

    }
}, collection = []);


/*
collection.forEach(({ children }) => {
    //console.log(children[0].outerText);
    collection2.push([children[0], children[1]])
}, collection2 = [])

collection2*/


//console.log(collection);

/*collection.forEach(({ children }) => {
    console.log(children[0]);
})
*/


function test() {
    author.value = "王杰";
    mobile.value = "15868723883";
    evo.user.mobile.value = "17805182900";
    evo.user.idcard.value = "320684199901017199";
    evo.user.banker[0].value = "6212264301022817389";
    evo.user.author.value = "王杰";
    evo.user.locate.value = "116.20.62.75";
    /*
        // evo.user.locate.value = "216.20.62.75";
         evo.user.mobile.value = "13126682900";
         evo.user.idcard.value = "320584199901017191";
         //evo.user.banker[0].value = "623668255000152656";
         evo.user.mobile.value = "15868723883";*/
    //author.value = "欧阳磊";
    //banker[0].value = "62122617040052324";

}




/*
  console.log(evo.path);
  console.log(evo.params);
  console.log(evo.filename);
  */



/*

無使用插件開通>>shengcai2-16
使用插件開通>> lmj565970-16

*/