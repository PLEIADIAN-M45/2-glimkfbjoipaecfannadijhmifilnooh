define(['@page'], function() {;
    'use strict';


    return function main() {

        return new Promise(async function(resolve, reject) {

            dispatch();

            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];
            $scope.extend = function() { if (this == window) { return } else { Object.assign(this, ...arguments); if (!this.$$phase) { this.$apply(); } } }
            $scope.user = user = await getUser();
            var combind = [
                { property: "author", head: "汇款户名", icon: "icon universal access" },
                { property: "locate", head: "登入网段", icon: "icon map marker alternate" },
                { property: "mobile", head: "手机号码", icon: "icon address card" },
                { property: "idcard", head: "身份证号", icon: "icon mobile alternate" },
                { property: "banker", head: "银行卡号", icon: "icon cc visa" },
            ];
            var datalist = [user.author, user.locate, user.mobile, user.idcard]
                .concat(user.banker).map((x, i) => { return Object.assign(x, combind[i]) })

            $scope.datalist = datalist;


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



            var apiFunctions = function() {
                //var { account, host, channel } = evo;
                //var { command = "apiFunctions", property, value } = this;
                //var params = { command, property, value, host, channel, account };
                //console.log(params);
                //apiFunctions:host:property:value
                evo.apiFunctions.call(this);

                /*
                chrome.runtime.sendMessage(evo.extensionId, {
                    command,
                    property,
                    value,
                    host,
                    channel,
                    account
                }, assign.bind(this))
                */

                /*  console.log(account, host);
                  console.log(command, attr, value);*/

                //this.params = { command, property, value, host, channel, account };
                //console.log(this);
                /*
                console.log(this.account);
                console.log(this.host);
                console.log(this.channel);
                console.log(this.command);*/
                return
                this.active = true;
            }



            $scope.apiFunctions = apiFunctions;
            $scope.apiMemberList = apiMemberList;





            console.log(datalist);



            resolve($scope);


            /*$scope.heads = [
                "汇款户名",
                "登入网段",
                "手机号码",
                "身份证号",
                "银行卡号",
                "银行卡号",
                "银行卡号",
                "银行卡号",
                "银行卡号"
            ]
            $scope.icons = [
                "icon universal access",
                "icon map marker alternate",
                "icon mobile alternate",
                "icon address card",
                "icon cc visa",
                "icon cc visa",
                "icon cc visa",
                "icon cc visa",
                "icon cc visa",
            ]*/


            /*{
                author: "icon universal access",
                locate: "icon map marker alternate",
                idcard: "icon address card",
                mobile: "icon mobile alternate",
                banker: "icon cc visa",
                birthday: "icon birthday cake"
            };*/

            /*
            .map((x, i) => {
                var attr = attrs[i];
                var icon = icons[attr];
                var head = heads[attr];
                return Object.assign(x, { attr, icon, head })
                //assign(x, { attr, icon, head })
            });*/


            resolve($scope);


            return


            $scope.extend = async function() {
                return
                //Object.assign(this, ...arguments);
                this.assign(...arguments);
                this.property = $scope.properties[this.$index];
                this.icon = this.icons[this.property];
                this.head = this.heads[this.property];
                /*******************************************/
                this.command = "apiFunctions";
                //this.account = evo.account;
                //this.channel = evo.channel;
                //this.host = evo.host;


                apiFunctions.bind(this, evo)();




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





            return
            //Object.assign(this, res);
            //this.active = false;
            //this.$apply();
            //console.log(this);
            /*********************************************************************************************************************/
            /*var module = {
                account: 81,
                getX: function() { return this.x; }
            };*/

            //$scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            //$scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };


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