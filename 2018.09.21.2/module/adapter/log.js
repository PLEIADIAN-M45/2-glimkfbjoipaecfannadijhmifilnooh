define([evo.router], function() {
    /*


document.designMode = 'on'



    */

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

’   Apostrophe  撇號
（）   Bracket (英式) / Parentheses (美式)    括號
 ：   Colon  冒號
 ，   Comma  逗號
 －   Dash   破折號
 …   Ellipsis   省略號
 ！   Exclamation Mark (英式) / Point (美式) 感嘆號
 .   Full Stop (英式) / Period (美式)   句號
 《　》     Guillemets 書名號
 –   Hyphen 連字號
？    Question Mark  問號
 ＂＂  Quotation Mark 引號
；    Semicolon  分號
/    Slash  斜線
． period or full stop 句号
， comma 逗号
： colon 冒号
； semicolon 分号
！ exclamation mark 惊叹号
？ question mark 问号
- hyphen 连字符
* asterisk 星号
' apostrophe 所有格符号，单词内部的省略
— dash 破折号
_ underscore
‘ ’ single quotation marks 单引号
“ ” double quotation marks 双引号
( ) parenthesis or round brackets 圆括号
[ ] square brackets 方括号
<> Angle brackets 尖括号
{} curly brackets or braces 大括号
《 》French quotes 法文引号；书名号
... ellipsis 省略号
¨ tandem colon 双点号
" ditto 同上
‖ parallel 双线号
／ slash or virgule or diagonal mark 斜线号
＆ ampersand = and
～ tilde or swung dash 代字号
§ section; division 分节号
→ arrow 箭号；参见号
| vertical bar 竖线
\ backslash 反斜线

=====================

附：部分数学符号的英文名称

＋ plus 加号；正号
－ minus 减号；负号
± plus or minus 正负号
× is multiplied by 乘号
÷ is divided by 除号
＝ is equal to 等于号
≠ is not equal to 不等于号
≡ is equivalent to 全等于号
≌ is equal to or approximately equal to 等于或约等于号
≈ is approximately equal to 约等于号
＜ less than sign 小于号
＞ more than or greater than sign大于号
≮ is not less than 不小于号
≯ is not more than 不大于号
≤ is less than or equal to 小于或等于号
≥ is more than or equal to 大于或等于号
％ per cent 百分之…
‰ per mill 千分之…
∞ infinity 无限大号
∝ varies as 与…成比例
√ (square) root 平方根
∵ since; because 因为
∴ hence 所以
∷ equals, as (proportion) 等于，成比例
∠ angle 角
⌒ semicircle 半圆
⊙ circle 圆
○ circumference 圆周
△ triangle 三角形
⊥ perpendicular to 垂直于
∪ union of 并，合集
∩ intersection of 交，通集
∫ the integral of …的积分
∑ (sigma) summation of 总和
° degree 度
′ minute 分
″ second 秒
＃ number …号
℃ Celsius system 摄氏度
＠ at 在

    */

    function symbol() {

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
    var arr = [];
    var els = []

    function addChannel() {
        /* TrHead2
         TrHead
         divCookie
         divCookie*/

        $('#divCookie>ul:not([class]):not([style])').each((i, { children }) => {
            //console.log(children);
            try {
                els.push([
                    children[0],
                    children[2],
                    children[7],
                    children[9]
                ])
                arr.push([
                    children[0].textContent.slice(0, 2).trim(),
                    children[2].textContent.trim(),
                    children[7].textContent.trim(),
                    children[9].textContent.trim()
                ])
            } catch (ex) {

            }





            /*console.log(el.children[2]);
            var cds =

                var cn = el.children[0];
            var acc = el.children[2];
            var acc = el.children[7]; //IP
            var acc = el.children[9]; //归属地

            var acc = el.children[11]; //備註
            */










        })

        //console.log(arr);
        // console.log(els);

        function textContent(el) {
            //console.log(el);
            return el.textContent.trim()
        }

        var ess = els.filter((x) => x[1]).map((arr) => {
            return arr.map(([channel, account, protocol, location]) => {
                
            })
        }).map(s)
        //.map(textContent)


        /*.map(([channel, account, protocol, location]) => {
            //console.log(el);
            return {
                channel: channel,
                account,
                protocol,
                location
            }

            //el.map(textContent).map(s)
        }).map(s)*/


        console.log(ess);

        /* .map((x) => {
     console.log(x);
 })*/



    }


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


})


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