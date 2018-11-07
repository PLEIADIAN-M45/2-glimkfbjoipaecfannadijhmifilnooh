define(['@page'], function() {;
    'use strict';


    return function main() {

        return new Promise(async function(resolve, reject) {
            $scope.icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            $scope.heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };
            $scope.extensionId = evo.extensionId;
            $scope.extend = function() {
                if (this == window) { return } else {
                    //this.active = !this.active;
                    Object.assign(this, ...arguments);
                    if (!this.$$phase) { this.$apply(); }
                }
            }

            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];
            $scope.user = user = await getUser();
            $scope.userlist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);

            $scope.init = function(parameters) {
                this.extend(parameters);
                this.parameters = Object.assign({ command: "apiFunctions", host: evo.host }, parameters);
            }

            $scope.apiFunctions = function(me) {
                this.active = true;
                chrome.runtime.sendMessage(
                    this.extensionId,
                    this.parameters,
                    (result) => {
                        if (result) {
                            this.active = false;
                            this.extend(result);
                        }
                    });
            }



            //apiFunctions:host:property:value
            //evo.apiFunctions.call(this);

            $scope.apiMemberList = apiMemberList;

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