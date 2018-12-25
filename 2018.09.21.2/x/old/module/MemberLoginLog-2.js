define(['myApp', 'dexie'], function(myApp, Dexie) {

    var db = new Dexie("api");
    db.version(3).stores({
        mobile: 'unique',
        locate: 'unique',
        idcard: 'unique',
        sms: 'unique',
        GetMemberList: 'unique'
    });

    function IndexedDB(me) {
        me.unique = getUnique(me);
        if (db[me.method]) {
            return db[me.method].get(me.unique);
        } else {
            return me.result;
        }
    }

    function ApiFunction(me) {
        me.unique = getUnique(me);
        //console.log(me);
        return new Promise(function(resolve, reject) {
            chrome.runtime.sendMessage(evo.extensionId, {
                command: 'API',
                method: me.method,
                param: me.param,
                port: me.port,
                value: me.value,
                unique: me.unique,
                page: me.page,
                accountId: evo.user.accountId,
                fullName: evo.user.author.value
            }, function(result) {
                //console.log(result);
                resolve(result);
                /*if (db[result.method]) {
                    db[result.method].put(result);
                }*/
            })
        })
    }

    var changeColor = function(r, s, scope) {
        //console.log(evo.user.uniqueId)
        var account = r.f_accounts || r.AccountID
        var uniqueId = account + '-' + s.port;
        if (uniqueId == evo.user.uniqueId) {
            r.color = 'brown'
        } else {
            if (r.f_blacklist == 17 || r.IsBlackList) {
                r.color = 'black'
            } else if (r.list_Accounts) {
                r.color = 'pink'
            }
        }
        //console.log(account, s.port);
    }


    myApp.$scope.changeColor = changeColor;

    /*********************************************/
    myApp.$scope.initialize = async function(me, e) {
        var scope = this;
        if (me.hide) { return }
        if (me.value && me.method) {
            switch (me.method) {
                case 'banker':
                case 'author':
                    sensitive_check(me, scope);
                    break;
                case 'locate':
                case 'mobile':
                case 'idcard':
                    if (me.result.province && e == undefined) {
                        sensitive_check(me, scope);
                    } else {
                        me.active = true;
                        me.result = {};
                        var res = await ApiFunction(me);
                        me.active = false;
                        me.result = res;
                        sensitive_check(me, scope);
                        scope.$apply();
                        var { country, province, city, area } = res;
                        if (province || city || country || area) {
                            evo.assign(evo.user[me.method], { country, province, city, area });
                            putUser();
                        }
                    }
                    break;
                case 'getAllIPAddress':
                    if (evo.user.regions && evo.user.regions.length) {
                        //console.log(evo.user.regions);
                    } else {
                        console.log('getAllIPAddress:', me);
                        getAllIPAddress(myApp)
                            .then(putUser)
                            .then(function() {
                                me.rows = evo.user.regions;
                                if (!scope.$$phase) {
                                    scope.$apply();
                                }
                            })
                    }
                    break;
                case 'GetMemberList':
                    /*
                    if (location.host == "127.0.0.1") {
                        if (me.param == "f_RemittanceName" || me.param == "AccountName") {}
                        if (me.param == "txtPhoto" || me.param == "CellPhone") {
                            me.value = '17805182900'
                        }
                        if (me.param == "txtIdCard" || me.param == "IDNumber") {
                            me.value = '320684199901017199'
                        }
                        if (me.param == "f_BankAccount" || me.param == "PayeeAccountNo") {
                            me.value = '6212264301022817389'
                        }
                    }*/

                    if (me.value.includes('*')) {
                        me.ignore = true;
                        return me.result = -1
                    }
                    me.active = true;
                    var res = await ApiFunction(me);
                    me.active = false;
                    if (res.statusText !== "success") {
                        me.danger = true;
                    } else {
                        me.result = res;
                        scope.$apply();
                        if (me.param == "f_RemittanceName" || me.param == "AccountName") {
                            //GetAlertInfoByName(me, scope)
                        } else {

                        }
                    }
                    //me.result = await IndexedDB(me) || await ApiFunction(me);
                    break;
                default:
                    break;
            }
        }
    }

    myApp.$scope.openMemberList = function(s) {
        switch (s.port) {
            case '16':
                var url = s.result.origin + '/member/MemberInfoManage/MemberInfoManage'
                break;
            default:
                var url = s.result.origin + '/aspx/MemberList.aspx?sort=Font_xianyousuoyouhuiyuan'
                break;
        }
        var myPopup = window.open(url);
    }

    function GetAlertInfoByName(s, scope) {
        //console.log(s.port);
        if (s.port == "16") {
            chrome.runtime.sendMessage(evo.extensionId, {
                command: 'API',
                port: '16',
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
    }


    myApp.$scope.GetAlertInfoByID = function(r, s, scope) {
        if (s.port == "16") {
            chrome.runtime.sendMessage(evo.extensionId, {
                command: 'API',
                port: '16',
                method: 'GetMemberAlertInfoBackendByMultiplayer',
                params: {
                    "DisplayArea": "1",
                    "Account": [{ "AccountID": r.AccountID, "AccountName": "" }]
                },
            }, function(response, status) {
                //console.log(response);
                if (response.rows.length) {
                    r.list_Accounts = response.rows;
                    changeColor(r, s, scope);
                }
            })
        } else {
            changeColor(r, s, scope);
        }
    }

    //if (!scope.$$phase) { scope.$apply(); }
    myApp.$scope.imPopup = function(row, scope, id) {
        //console.log(id);
        var target = document.getElementById(id);
        setTimeout(function() {
            $(target).popup({
                popup: $(target).find('.popup'),
                on: 'hover',
                position: 'top left',
                variation: 'flowing special',
                hoverable: true,
                setFluidWidth: true
            })
        }, 500, target)
    }


    myApp.$scope.check_locate = function(me) {
        //console.log(me);
        me.match = evo.sensitive.protocol.find(function(cv) {
            return trim(...cv) == me.locate;
        });
    }

    myApp.$scope.check_region = function(me) {
        //console.log(me);
        me.match = evo.sensitive.area.find(function(cv) {
            return me.province.includes(trim(cv));
        })
    }

    myApp.$scope.showMemberModify = function(row, s) {
        if (s.port == '16') {
            var url = s.result.origin + '/Member/MemberInfoManage/EditMemberInfoManage?accountId=' + row.AccountID;
        } else {
            var url = s.result.origin + '/Aspx/MemberModify.aspx?account=' + row.f_accounts;
        }
        window.open(url);
    }


});