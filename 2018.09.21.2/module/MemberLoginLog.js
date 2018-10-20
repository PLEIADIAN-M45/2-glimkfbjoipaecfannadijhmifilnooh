define([

    evo.extend,
    'MemberLoginLog-2',
    'MemberLoginLog-3'

], function() {

    

    myApp.$controller = function($compile, $rootScope, $timeout) {
        //console.log('user:', evo.user);
        var { author, locate, mobile, idcard, banker, host, channel, account, properties } = evo.user;

        var dataset = [author, locate, mobile, idcard, ...banker].filter((x) => x.value);

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
                var sites = [{ channel: '9999', command: 'getAllIPAddress' }];
            } else {
                var sites = ['wa111:26', 'wa111:35', 'wa111:17', 'ku711:16'].map((suffix) => {
                    var [proxy, channel] = suffix.split(':')
                    return { channel, [property]: value, command: 'apiFunctions:Member:' + suffix };
                });
            }
            
            this.extend({ ...me, icon, head, params, sites })
        };

        function sheetsTestFunction(me) {
            var { property, value, sheets } = me;
            //console.log(property, google.sheets[property]);
            if (sheets && google.sheets[property]) { extend(sheets, google.sheets[property].search(value)) }
        };

        function regionTestFunction(me) {

            var { property, region } = me;
            if (region.test === undefined) {
                this.extend(google.sheets.region.search.call(me))
                putUser();
            }
        };

        function apiFunctions(me, e) {
            


            if (this.property == 'author') { return }
            if (this.property == 'banker') { return regionTestFunction(me) }
            if (this.params.command == undefined) { return }
            if (!isEmptyObject(this.region) && e == undefined) { return }
            this.extend({ region: {}, active: 1 });
            evo.apiFunctions(this.params).then((res) => { this.regionTestFunction(extend(me, res)) });
        };

        function apiMemberList(me, e) {
            return
            //if (me.channel !== '16') { return }
            //if (!me.author) { return }
            me.index = me.index || 1;

            $('.popup').remove();

            this.extend({ rows: [], active: 1, index: me.index });

            evo.apiFunctions(me).then((res) => {
                this.extend(res);
            })
        };

        function GetAlertInfoByID(row, scope) {
            return
            if (row.AccountID) {
                evo.apiFunctions({
                    command: 'apiFunctions:Alerts:ku711:16',
                    params: { "DisplayArea": "1", "Account": [{ "AccountID": row.AccountID, "AccountName": "" }] },
                }).then((res) => { return extend(row, res); }).then((row) => { changeColor(row, scope); })
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



        $scope.extend({
            dataset,
            initialization,
            regionTestFunction,
            sheetsTestFunction,
            apiFunctions,
            apiMemberList,
            getAllIPAddress,
            showMemberModify,
            openMemberList,
            changeColor,
            imPopup,
            GetAlertInfoByID
        })


    };




    //evo.filename
    /*    console.log(evo.params.method);
        console.log(evo.filename);
        console.log(evo.route);
        console.log(evo.pathname);
        console.log(evo.path);
    */


    /* class APIFunctions {

         constructor(_method) {
             console.log(_method);
             this.method = _method;
         }
         get exec() {
             return this[this.method];
         }



         get IGetMemberInfo() {




             switch (evo.host) {

                 case "wa111":

                     evo.account = evo.params.member;

                     console.log(evo.account, evo.channel);

                     start()
                         .then(getUser)
                         .then(requireStylesheet)
                         .then(requireComponents)
                         .then(bootstrap)
                         //.then(scrollHeightListener)
                         //.then(dispatchMyEvent)

                         //.then(getHTMLTableCells)
                         //.then(checkSensitiveWords)
                         //.then(addSiteNumberToAccountId)
                         //.then(createIFrame)
                         .catch(errorHandler)

                     //.then(getAllIPAddress)


                     break;
                 case "ku711":

                     evo.account = evo.params.accounts;

                     // evo.uniqueId = evo.account + '-' + evo.siteNumber;

                     // console.log(evo.uniqueId);

                     // console.log(evo.uniqueId);
                     start()
                         //.then(getAllIPAddress)
                         //.then(function(a) { console.log(a); })
                         //.then(queryMemberInfo)
                         .then(getUser)
                         //.then(getAllIPAddress)
                         .then(requireStylesheet)
                         .then(requireComponents)
                         .then(bootstrap)
                         .then(scrollHeightListener)
                         .then(dispatchMyEvent)
                         .then(getHTMLTableCells)
                         .then(checkSensitiveWords)
                         .then(addSiteNumberToAccountId)
                         .then(createIFrame)
                         .catch(errorHandler)
                     break;
             }
         }

         get SameBrowserList() {
             evo.stylesheet = ['MemberLoginLog'];
             start()
                 .then(requireStylesheet)
                 .then(dispatchMyEvent)
                 .then(getHTMLTableCells)
                 .then(scrollHeightPoster)
                 .then(checkSensitiveWords)
                 .then(addSiteNumberToAccountId)
                 .catch(errorHandler);
         }
         get WebMemberInfo() {
             evo.stylesheet = ['MemberLoginLog'];
             start()
                 .then(requireStylesheet)
                 .catch(errorHandler);
         }
     }*/
    /******************************************************************/

    //evo.uniqueId = evo.account + '-' + evo.siteNumber;

    //console.log(evo.host);




    /*
        if (evo.siteNumber == '16') {
            var method = evo.params.method;
            switch (method) {
                case "CookieID":
                    method = "IGetMemberInfo";
                    break;
                case "DeviceNo":
                    method = "SameBrowserList";
                    break;
            }
        } else {


            var method = evo.filename.replace('.aspx', '');

            console.log(method);


            switch (method) {
                case "IGetMemberInfo":
                    method = "IGetMemberInfo";
                    break;
                case "sameBrowserList":
                    method = "SameBrowserList";
                    break;
                default:
                    method = "WebMemberInfo";
                    break;
            }
        }
    */
    //console.log(evo.uniqueId, method);

    //new APIFunctions(method).exec;

    /* if (evo.uniqueId && method) {
     } else {
         throw new Error('not defined uniqueId.')
     }*/
})