define(['@page'], function() {;
    'use strict';
    return function main() {
        return new Promise(async function(resolve, reject) {

            dispatch();

            $scope.assign = function() {
                Object.assign(this, ...arguments);
                if (!this.$$phase) { this.$apply(); }
            }

            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];

            var property = ["author", "locate", "mobile", "idcard", "banker", "banker", "banker", "banker", "banker", "banker"]
            var icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            var heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };

            var user = await getUser();

            //$scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            //$scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };

            $scope.datalist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.user = user;


            var apiMemberList = function() {
                Object.assign(this, ...arguments)
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


            var apiFunctions = function(me, ev) {
                var { host, channel, account, property, value, command } = this;
                this.active = true;
                return new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage(evo.extensionId, {
                        command,
                        property,
                        host,
                        channel,
                        account,
                        value,
                        method: property
                    }, ([res]) => {

                        console.log(res);

                        this.region = res;
                        this.active = false;
                        this.$apply();
                        //resolve(res)
                    });
                })
            }


            $scope.apiFunctions = apiFunctions;
            $scope.apiMemberList = apiMemberList;

            $scope.extend = async function() {
                //Object.assign(this, ...arguments);
                this.assign(...arguments);
                this.command = "apiFunctions";
                this.property = property[this.$index];
                this.icon = icons[this.property];
                this.head = heads[this.property];
                /*******************************************/
                this.account = evo.account;

                this.channel = evo.channel;
                this.host = evo.host;

                this.region = apiFunctions.call(this);

                console.log(this);


                return
                this.sites = [
                    { channel: "26", host: "wa111" },
                    { channel: "35", host: "wa111" },
                    { channel: "17", host: "wa111" },
                    { channel: "16", host: "ku711" }
                ].map((s) => {
                    s[this.property] = this.value;
                    s.method = "member";
                    //apiMemberList(s)
                    //s.command = "apiFunctions";
                    return s;
                });
            }



            resolve($scope);



            /**chrome.runtime.sendMessage(evo.extensionId, this.params, (res) => {
                this.active = false;
                this.assign(res);
            })*/

            //var { host, channel, account, property, value, command } = this;
            /*return new Promise((resolve, reject) => {
                //console.log(this);
                chrome.runtime.sendMessage(evo.extensionId, this.params, resolve)
            })*/


            return
            /*********************************************************************************************************************/
            /*var module = {
                account: 81,
                getX: function() { return this.x; }
            };*/


            //console.log(module.getX());

            //var list_RemittanceName = await getAlertInfo(user); // 危险
            //user.banker = user.banker.filter((x) => { x.property = "banker"; return x.value; });
            //Object.keys(user).map((key) => { if(user[key]) { user[key]["property"] = key; } });
            //test(user);
            /*
            $scope.datalist.forEach((obj, index) => {
                obj.sites = [{ channel: "26", host: "wa111" }, { channel: "35", host: "wa111" }, { channel: "17", host: "wa111" }, { channel: "16", host: "ku711" }]
                    .map((o) => {
                        o.property = "member";
                        o[obj.property] = obj.value;
                        return o;
                    })
            });*/

            /*
                        $scope.datalist = [
                            { property: "author", region: apiFunctions.apply("author") },
                            { property: "locate" },
                            { property: "mobile" },
                            { property: "idcard" },
                        ]*/

            // console.log($scope.user);
            //console.log($scope.datalist);



            $scope.assign = function() {
                Object.assign(...arguments);
                if (!this.$$phase) { this.$apply(); }
            }

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



            $scope.changeColor = function(r, s) {
                if (s.channel == "16" && s.author) { r.list_Accounts = s.list_Accounts[r.AccountID] }

                //console.log(r, s);
                if (r.list_Accounts && r.list_Accounts.length) { r.color = "pink" };
                var black = r.f_blacklist || r.IsBlackList;
                if (black == 17 || black == true) { r.color = "black"; };
                var sequel = r.f_id || r.MNO;
                if (sequel == $scope.user.sequel) { r.color = "brown" };

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

/*
evo.sendMessage({
    command: "localStorage"
}).then((res) => {
    for(var key in res) {
        localStorage[key] = res[key];
        //console.log(evo.decoder(res[key]));
    }
});*/











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
            */