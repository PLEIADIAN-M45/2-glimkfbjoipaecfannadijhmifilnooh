define(['@page'], function() {;
    'use strict';

    // setTimeout(resolve, 2000)

    function getMemberAlertInfoBackend() {
        chrome.runtime.sendMessage(
            evo.extensionId, {
                command: "apiFunctions:ku711.getMemberAlertInfoBackend",
                channel: "16",
                account: $scope.user.account,
                author: $scope.user.author.value,
            }, (result) => {
                sessionStorage[$scope.user.author.value] = angular.toJson(result.list_RemittanceName);
                resolve(result)
            });
        //return new Promise((resolve, reject) => {});
    }

    return function main() {
        return new Promise(async function(resolve, reject) {
            $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            $scope.extensionId = evo.extensionId;
            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];
            $scope.user = user = await getUser();
            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.userlist.map((x) => {
                x.command = "apiFunctions:host.attr".replace('host', evo.host).replace('attr', x.attr);
                x.sites = [
                    { command: "apiFunctions:wa111.member", channel: "26", [x.attr]: x.value, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", channel: "35", [x.attr]: x.value, value: x.value, index: 1 },
                    { command: "apiFunctions:wa111.member", channel: "17", [x.attr]: x.value, value: x.value, index: 1 },
                    { command: "apiFunctions:ku711.member", channel: "16", [x.attr]: x.value, value: x.value, index: 1 },
                ];
                return x;
            });

            getMemberAlertInfoBackend();

            console.log($scope.user);

            $scope.extend = function() {
                //console.log(this);
                if (this == window) { return } else {
                    //this.active = !this.active;
                    Object.assign(this, ...arguments);
                    //this.parameters = arguments[0];
                    if (!this.$$phase) { this.$apply(); }
                }
            }



            function finish(result) {
                this.active = false;
                Object.assign(this, result);
                $scope.$apply();
            }


            function api() {
                this.active = true;
                return new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage(evo.extensionId, this, (result) => {
                        this.active = false;
                        Object.assign(this, result);
                        $scope.$apply();
                        resolve(this);
                    });
                })
                //chrome.runtime.sendMessage(evo.extensionId, this, finish.bind(this));
            }

            $scope.apiFunctions = function(me, e) {
                if (!this.value) { return }
                /*if (me.attr == "author") { api.call(me); }
                if (me.attr == "locate") { api.call(me); }
                if (me.attr == "mobile") { api.call(me); }
                if (me.attr == "idcard") { api.call(me); }
                if (me.attr == "banker") { api.call(me); }*/
                //if (me.active == undefined || e) { api.call(me); }
                //putUser()
            }



            $scope.apiMemberList = async function(s) {
                if (s.value.includes('*')) { return }
                s.rows = [];

                api.call(s).then((c) => {

                    if (s.channel == "16" && s.author) {
                        console.log(c);

                    }
                })

                return
                this.extend(s);
                this.active = true;
                this.rows = [];
                chrome.runtime.sendMessage(
                    this.extensionId,
                    this.s,
                    (result) => {
                        if (result) {
                            this.active = false;
                            this.extend(result);
                        }
                    });

                //if (s.host == "ku711" && s.author) {}
            }


            $scope.getRemittanceName = function(s) {

            }



            $scope.getAlertInfo = function(r) {
                return
                if (this.host == "ku711") {
                    //console.log(this.author);
                    if (this.author) {

                    } else {
                        chrome.runtime.sendMessage(
                            evo.extensionId, {
                                command: "apiFunctions:ku711.getMemberAlertInfoBackend",
                                channel: "16",
                                account: $scope.user.account,
                                author: $scope.user.author.value,
                            },
                            (result) => {
                                if (result) {
                                    console.log(result);
                                }
                            });
                    }

                    /*
                    chrome.runtime.sendMessage(
                        this.extensionId, {
                            command: "apiFunctions",
                            attr: "alerts",
                            host: "ku711",
                            channel: "16",
                            account: $scope.user.account,
                            author: s.author,
                        },
                        (result) => {
                            if (result) {
                                console.log(2, result);
                                //this.active = false;
                                this.extend(result);
                            }
                        });*/

                }

                /* else {
                    this.list_RemittanceName = [];
                    //$scope.apiMemberList(s)
                }*/
            }

            $scope.setPopup = function() {
                this.popid = "pop_" + this.$id;
                setTimeout(function(popid) {
                    var $target = $(popid).parent();
                    var content = $(popid).html();
                    $target.popup({
                        html: content,
                        hoverable: true,
                        setFluidWidth: true,
                        exclusive: true,
                        on: "hover",
                        position: "bottom left",
                        variation: "special"
                    });
                }, 500, "#" + this.popid);
            };


            $scope.changeColor = function() {
                //this.list_Accounts =this.list_RemittanceName.filter((x) => { return x.AccountID == this.AccountID; });
                if (this.list_Accounts && this.list_Accounts.length) { this.color = "pink" };
                if (this.f_blacklist == 17) { this.color = "black" };
                if (this.IsBlackList == true) { this.color = "black" };
                if (this.f_id == $scope.user.sequel) { this.color = "brown" };
                if (this.MNO == $scope.user.sequel) { this.color = "brown" };
            };


            $scope.init = function(parameters) {
                /* parameters==me */
                //this.extend(parameters);
                //this.parameters = Object.assign({ command: "apiFunctions", host: evo.host }, parameters);
            }



            //apiFunctions:host:property:value
            //evo.apiFunctions.call(this);


            dispatch();

            resolve($scope);

            return;


            /*var datalist = [
                { property: "author", head: "汇款户名", icon: "icon universal access" },
                { property: "locate", head: "登入网段", icon: "icon map marker alternate" },
                { property: "mobile", head: "手机号码", icon: "icon address card" },
                { property: "idcard", head: "身份证号", icon: "icon mobile alternate" },
                { property: "banker", head: "银行卡号", icon: "icon cc visa" },
            ];*/




            /*.map((x, i) => {
                //console.log(x);
                //return Object.assign(x, temp[i])
                /*
                x.sites = [
                    { command: "apiFunctions", channel: "26", host: "wa111", attr: "member", [d.attr]: x.value },
                    //{ channel: "35", host: "wa111", attr: "member", [x.attr]: x.attr },
                    //{ channel: "17", host: "wa111", attr: "member", [x.attr]: x.attr },
                    //{ channel: "16", host: "ku711", attr: "member", [x.attr]: x.attr }
                ]*/
            //})

            //.map((x) => {

            /*x.sites = [
                        { command: "apiFunctions", channel: "26", host: "wa111", attr: "member", [x.attr]: x.value },
                        //{ channel: "35", host: "wa111", attr: "member", [x.attr]: x.attr },
                        //{ channel: "17", host: "wa111", attr: "member", [x.attr]: x.attr },
                        //{ channel: "16", host: "ku711", attr: "member", [x.attr]: x.attr }
                    ]
                    return x;
                    console.log(x);
                //})




            /*
            .map((x, i) => {
                var d = datalist[i];
                x.sites = [
                    { command: "apiFunctions", channel: "26", host: "wa111", attr: "member", [d.attr]: x.value },
                    //{ channel: "35", host: "wa111", attr: "member", [x.attr]: x.attr },
                    //{ channel: "17", host: "wa111", attr: "member", [x.attr]: x.attr },
                    //{ channel: "16", host: "ku711", attr: "member", [x.attr]: x.attr }
                ]


                return Object.assign(datalist[i], x)
            });
            */






            var apiMemberList = function(args) {
                //this.extend(args);
                return

                console.log(args);
                return

                chrome.runtime.sendMessage(evo.extensionId, {
                    command,
                    host,
                    channel,
                    value,
                    method
                }, ([res]) => {
                    Object.assign(this, res)
                    this.$apply();
                    console.log(res);
                });
                //evo.apiFunctions.call(this);

                console.log(this);

                return
                var { host, channel, property, value, command, method } = this;

                return new Promise((resolve, reject) => {
                    //console.log({ host, channel, account, property, value, command, method });
                    chrome.runtime.sendMessage(evo.extensionId, {
                        command,
                        property,
                        host,
                        channel,
                        value,
                        method
                    }, ([res]) => {
                        Object.assign(this, res)
                        this.$apply();
                        console.log(res);
                    });
                });
            }


            var apiFunctions = function() {
                //apiFunctions:host:property:value
                //evo.apiFunctions.call(this);
            }



            var apiFunctions33 = function() {
                //apiFunctions:host:property:value
                evo.apiFunctions.call(this);
            }






            $scope.datalist = datalist;
            $scope.apiFunctions = apiFunctions;
            $scope.apiMemberList = apiMemberList;

            dispatch();

            resolve($scope);

            return;


















            $scope.apiFunctions = function(me, ev) {
                this.head = heads[me.property];
                this.icon = icons[me.property];
                if (!me.value) { return };
                /*******************************************************************************************/
                var { host, channel, account } = evo;
                var params = Object.assign({}, me, { command: "apiFunctions", host, channel, account });
                if (me.active == undefined || ev) {
                    Object.assign(me, { active: true, region: {} })
                } else { return };
                /*******************************************************************************************/
                evo.apiFunctions(params).then((res) => {
                    return this.assign(me, res);
                }).then(putUser);
            }


            $scope.getAlertInfo = function(s, me) {
                if (s.channel == "16" && s.author) {
                    evo.apiFunctions({
                        command: "apiFunctions",
                        property: "alerts",
                        host: "Backend",
                        channel: "0",
                        params: { "DisplayArea": "1", "Account": [{ "AccountID": user.account, "AccountName": s.author }] }
                    }).then((res) => {
                        Object.assign(s, res);
                        this.$apply();
                    });
                }
            };

            $scope.apiMemberList = function(s, me) {
                if (!me.value) { return };
                Object.assign(s, { active: true, rows: {} });
                var params = Object.assign({}, s, { command: "apiFunctions" });
                evo.apiFunctions(params).then((res) => {
                    Object.assign(s, res);
                    this.$apply();
                });
            }

            $scope.getAlertInfoByID = function(r, s) {
                if (s.channel == "16" && !s.author) {
                    evo.apiFunctions({
                        command: "apiFunctions",
                        property: "alerts",
                        host: "ku711",
                        channel: "16",
                        params: { "DisplayArea": "1", "Account": [{ "AccountID": r.AccountID, "AccountName": "" }] }
                    }).then((res) => {
                        Object.assign(r, res);
                        $scope.changeColor(r, s)
                        this.$apply();
                    })
                } else {
                    $scope.changeColor(r, s)
                }
            };





            //var payload = { "DisplayArea": "1", "Account": [] };
            /*
            $scope.getAlerts = function(row, scope) {
                if (row.AccountID) {
                   // payload.Account.push({ "AccountID": row.AccountID, "AccountName": row.AccountName });
                    if (this.$last) {
                        console.log(payload);
                        evo.apiFunctions({
                            command: "apiFunctions",
                            property: "alerts",
                            host: "ku711",
                            channel: "16",
                            params: payload
                        }).then((res) => {
                            console.log(res);
                        })
                    }
                }
            };*/





            $scope.setPopup = function(row, scope, popid) {
                var target = document.getElementById(popid);
                setTimeout(function() {
                    var content = target.querySelector(".ui.table");
                    $(target).popup({ html: content.outerHTML, hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" })
                }, 500, target);
            };



            //getAlertInfo().then(function() {})

        })
    }
})




/*
$scope.sheetsTestFunction = function sheetsTestFunction(me) {
    this.sheets_test = goo[me.property].search(me.value);
    //this.extend();
};

$scope.regionTestFunction = function sheetsTestFunction(me) {
    this.region_test = goo["region"].search(me.region);
    //this.extend();
};*/

//$scope.attrs = ["author", "locate", "mobile", "idcard", "banker", "banker", "banker", "banker", "banker", "banker"];
//$scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
//$scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };

/*
evo.sendMessage({
    command: "localStorage"
}).then((res) => {
    for(var key in res) {
        localStorage[key] = res[key];
        //console.log(evo.decoder(res[key]));
    }
});*/









define(['@page'], function() {;
    'use strict';

    return function main() {
        return new Promise(async function(resolve, reject) {
            $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            $scope.extensionId = evo.extensionId;
            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];
            var user = await getUser();
            $scope.user = user;
            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.userlist.map((x) => {
                x.command = `apiFunctions.${x.attr}`;
                x.channel = evo.channel;
                x.level = 1;
                x.sites = [
                    { command: "apiFunctions.member", channel: "26", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions.member", channel: "35", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions.member", channel: "17", host: "wa111", attr: x.attr, value: x.value, index: 1 },
                    { command: "apiFunctions.member", channel: "16", host: "ku711", attr: x.attr, value: x.value, index: 1 },
                ];
                return x;
            });
            console.log($scope.user);
            console.log($scope.userlist);
            /**********************************************/
            function finish(result) {
                Object.assign(this, result);
                this.active = false;
                if(!$scope.$$phase) { $scope.$apply(); }
                if(this.level == 1) { putUser(); }
            }

            $scope.apiFunctions = function(e) {
                if(this.value == undefined) { return }
                if(this.active == undefined || e) {
                    this.active = true;
                    if(this.level == 1 && this.attr != "banker") { delete this.region; } else { delete this.rows; }
                    chrome.runtime.sendMessage(evo.extensionId, this, finish.bind(this));
                };
            }

            function setPopup(popupId) {
                $(popupId).popup({ html: $(popupId).find('aside').html(), hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" });
            }

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
                var url = { wa111: `${s.origin}/Aspx/MemberModify.aspx?account=${this.f_accounts}`, ku711: `${s.origin}/Member/MemberInfoManage/EditMemberInfoManage?accountId=${this.AccountID}` } [s.host];
                console.log(url);
                //window.open(url, "_blank")
            }


            dispatch();
            resolve($scope);
        })
    }
});















//getMemberAlertInfoBackend();
//setTimeout(resolve, 2000)
//return new Promise((resolve, reject) => {});
//$scope.user.account
//apiFunctions:ku711.member?16
/*
function getMemberAlertInfoBackend() {
    chrome.runtime.sendMessage(
        evo.extensionId, {
            command: "apiFunctions:ku711.getMemberAlertInfoBackend?16",
            account: "",
            author: $scope.user.author.value,
        }, (result) => { sessionStorage[$scope.user.author.value] = angular.toJson(result.list_RemittanceName); });
}

$scope.getMemberAlertInfoBackendByMultiplayer = function(s) {
    return
    if(s.attr == "author") { return }
    if(s.channel != "16") { return }
    chrome.runtime.sendMessage(
        evo.extensionId, {
            command: "apiFunctions:ku711.getMemberAlertInfoBackendByMultiplayer?16",
            account: this.AccountID,
            author: this.AccountName,
        }, (result) => {
            Object.assign(this, result);

            console.log(result);
        });
}
*/


/*
  //if (this.locate) { return this.abort = true; }
                //if (this.value.includes('*')) { this.abort = true; } else {  }
$scope.getMemberAlertInfoBackend = function(s) {
    return
    if (this.host == "ku711" && this.author) {
        console.log(this);
        chrome.runtime.sendMessage(
            this.extensionId, {
                command: "apiFunctions",
                attr: "getMemberAlertInfoBackend",
                host: "ku711",
                channel: "16",
                account: $scope.user.account,
                author: this.author,
            },
            (result) => {
                if (result) {
                    this.extend(result);
                }
            });
    }
}

*/
/*
$scope.extend = function() {
    if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } }
}
$scope.assign = function() {
    if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } }
}
$scope.reset = function() {
    for (var key of Object.keys(this.result)) { delete this[key]; };
    api.call(this);
}
*/

/**********************************************/
/*Object.prototype.assign = function() {
    Object.assign(this, ...arguments);
    if (!$scope.$$phase) { $scope.$apply(); }
}*/

function xx(me) {

    //console.log(user);
    // console.log($scope.datalist);

    $scope.chanegSomething = function(me) {
        //console.log(this);
        setTimeout(function(me) {
            me.value = "RYAN";
            $scope.$apply();
            setTimeout(function() {
                console.log(user);
            }, 2000)
        }, 2000, me)
    }


}


/*  //$scope.datalist.author = $scope.user.author
            //console.log($scope.user);
$scope.filterFn = function(car) {
    // Do some tests
    console.log(car);

    if(car.carDetails.doors > 2) {
        return true; // this will be listed in the results
    }

    return false; // otherwise it won't be within the results
};

myApp.filter('toArray', function() {
    return function(obj, addKey) {
        if(!angular.isObject(obj)) return obj;
        if(addKey === false) {
            return Object.keys(obj).map(function(key) {
                return obj[key];
            });
        } else {
            return Object.keys(obj).map(function(key) {
                var value = obj[key];
                return angular.isObject(value) ?
                    Object.defineProperty(value, '$key', { enumerable: false, value: key }) : { $key: key, $value: value };
            });
        }
    };
});
*/
/*
           return delUser();
            $scope.user = await getUser() || await setUser();
            $scope.sendsms = new SendSms($scope.user);
            console.log($scope.user);
            resolve($scope);
            $scope.properties = ["author", "locate", "mobile", "idcard", "banker", "banker", "banker", "banker", "banker", "banker"];
            */