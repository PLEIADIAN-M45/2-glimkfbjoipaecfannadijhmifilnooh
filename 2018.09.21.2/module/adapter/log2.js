define([evo.router], function() {

    $scope.controller = function($compile, $rootScope, $timeout) {
        console.log('user:', evo.user);
        var { author, locate, mobile, idcard, banker, host, channel, account } = evo.user;
        var dataset333 = [author, locate, mobile, idcard, ...banker].filter((x) => x.value);
        console.log(dataset);

        console.log(json(dataset));

        var dataset = [{
                "property": "author",
                "value": "王杰",
                "title": "王杰",
                "sheets": { "test": "A695000035-26", "index": 219, "meta": "惡意投訴人" }
                "sites": [
                    { command: 'apiFunctions:Member:wa111:26', channel: "26" }
                ]
            },
            { "property": "locate", "value": "223.104.147.255", "title": "223.104.147.255", "sheets": {}, "region": { "meta": "ipapi", "prov": "江苏省", "city": "连云港", "ctry": "中国", "career": "ipapi", "test": null }, "status": "error", "active": 0 },
            { "property": "mobile", "value": "18360029000", "title": "18360029000", "sheets": {}, "region": { "meta": "中国移动 GSM/3G", "prov": "江苏", "city": "宿迁", "career": "ku711", "test": null }, "status": "success", "active": 0 },
            { "property": "idcard", "value": "321321198706252438", "title": "32132119870625****", "region": { "prov": "江苏省", "city": "宿迁市", "area": "宿豫县", "meta": "1987年6月25日/男性/31岁", "career": "evo", "test": null }, "status": "success", "active": 0 },
            { "property": "banker", "title": "**************82904", "value": "6222021116012282904", "sheets": {}, "region": { "meta": "中国工商银行", "prov": "江苏省", "city": "宿迁市", "test": null } }
        ]

        $scope.dataset = dataset;

        $scope.$apply();
        return
        //$scope.extend({ dataset, initialization, regionTestFunction, sheetsTestFunction, apiFunctions, apiMemberList, getAllIPAddress, showMemberModify, openMemberList, changeColor, imPopup, GetAlertInfoByID })

        var initialization = function(me) {
            var { property, value, region } = me;
            var { host, channel, account } = evo.user;
            var icon = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" }[property];
            var head = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" }[property];
            var command = {
                locate: "apiFunctions:locate:evo:0",
                idcard: "apiFunctions:idcard:evo:0",
                mobile: "apiFunctions:mobile:host:channel",
            }[property];
            var params = { property, channel, account, command, value };
            if (property == "locate") {
                var sites = []
                //var sites = [{ channel: '9999', command: 'getAllIPAddress' }];
            } else {
                //, 'ku711:16'
                var sites = ['wa111:26', 'wa111:35', 'wa111:17'].map((suffix) => {
                    var [proxy, channel] = suffix.split(':')
                    return { channel, [property]: value, command: 'apiFunctions:Member:' + suffix };
                });
            }

            //console.log(this);
            Object.assign(this, { ...me, icon, head, params, sites })
            //this.$apply();

            console.log(this);
            // this.extend({ ...me, icon, head, params, sites });
        };

        function sheetsTestFunction(me) {
            return
            var { property, value, sheets } = me;
            if (sheets && google.sheets[property]) {
                evo.assign(sheets, google.sheets[property].search(value));
                //console.log(me);
            }
        };
        //  if (!$scope.$$phase) { $scope.$apply(); }

        function regionTestFunction(me) {
            return
            var { property, region } = me;
            return this.extend(google.sheets.region.search.call(me));
        };



        function apiFunctions(me, e) {
            return
            if (this.property == 'author') { return };
            if (this.property == 'banker') {
                return this.regionTestFunction(me)
            };
            if (this.region.test === undefined || e) {
                this.extend({ region: {}, active: 1 });
                evo.apiFunctions(this.params).then((res) => {
                    evo.assign(me, res)
                    return this.regionTestFunction(me);
                }).then(putUser);
            } else {
                return this.regionTestFunction(me)
            }
        };

        function apiMemberList(s) {
            //return


            var scope = this;

            s.index = s.index || 1;

            //$('.popup').remove();


            s.active = true;


            //scope.extend({ rows: [], index: me.index });

            //this.extend({ rows: [], active: 1, index: me.index });

            evo.apiFunctions(s).then((res) => {

                //console.log(res);

                //this.extend(res);
                //this.active = false;
                s.active = false;
                s.rows = res.rows;

                scope.$apply();


                // if (!this.$$phase) {}
            })
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
        //千萬不要設 inline:true
        function imPopup(row, scope, id) {
            var target = document.getElementById(id);
            setTimeout(function() {
                var content = target.querySelector(".ui.table");
                $(target).popup({ html: content.outerHTML, hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" })
            }, 500, target)
        };

        function openMemberList(s) {
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

        function showMemberModify(row, s) {
            if (s.channel == '16') {
                var url = s.result.origin + '/Member/MemberInfoManage/EditMemberInfoManage?accountId=' + row.AccountID;
            } else {
                var url = s.result.origin + '/Aspx/MemberModify.aspx?account=' + row.f_accounts;
            }
            window.open(url);
        };

        function getAllIPAddress(scope) {
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
                            putUser();
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

    };



    function createIFrame() {
        var frameUrl = {
            "wa111": `http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=${evo.account}siteNumber=${evo.channel}`,
            "ku711": `https://bk.ku711.net/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=${evo.account}`
        }[evo.host];

        return new Promise(function(resolve, reject) {
            $('<div>').addClass('ui horizontal divider').text('AND').appendTo(evo.controllerProvider);
            $('<iframe>', { id: 'sameBrowserList', src: frameUrl, frameborder: 0, width: '100%', }).appendTo(evo.controllerProvider);
            resolve('createIFrame')
        })
    }


    function addSiteNumberToAccountId() {
        var callee = arguments.callee.name;
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

        $scope.components = ['log']
        $scope.stylesheet = ['log', 'cards']

        startup()
            .then(getUser)
            .then(dispatchMyEvent)
            .then(bootstrap)
            .then(scrollHeightListener)
            .then(checkSensitiveWords)
            .then(addSiteNumberToAccountId)
            //.then(createIFrame)
            .catch(error)
    }








    if (evo.params.method == 'DeviceNo' || evo.filename == 'samebrowserlist') {
        console.log(1111111);
        dispatchMyEvent()
    }


})






/*
  console.log(evo.path);
  console.log(evo.params);
  console.log(evo.filename);
  */



/*

無使用插件開通>>shengcai2-16
使用插件開通>> lmj565970-16

*/