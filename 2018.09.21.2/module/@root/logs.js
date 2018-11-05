define(['@page'], function() {;
    'use strict';

    return function main() {
        return new Promise(async function(resolve, reject) {

            dispatch();


            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];
            var user = await getUser();
            user.uid = [user.account, user.channel].join('-');


            user.banker = user.banker.filter((x) => { x.property = "banker"; return x.value; });
            Object.keys(user).map((key) => { if (user[key]) { user[key]["property"] = key; } });


            //test(user);

            var icons = { author: "icon universal access", locate: "icon map marker alternate", idcard: "icon address card", mobile: "icon mobile alternate", banker: "icon cc visa", birthday: "icon birthday cake" };
            var heads = { author: "汇款户名", locate: "登入网段", idcard: "身份证号", mobile: "手机号码", banker: "银行卡号" };

            $scope.user = user;
            $scope.datalist = [user.author, user.locate, user.mobile, user.idcard].concat(user.banker);
            $scope.datalist.forEach((obj, index) => {
                obj.sites = [{ channel: "26", host: "wa111" }, { channel: "35", host: "wa111" }, { channel: "17", host: "wa111" }, { channel: "16", host: "ku711" }]
                    .map((o) => {
                        o.property = "member";
                        o[obj.property] = obj.value;
                        return o;
                    })
            });

            console.log($scope.user);

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

            $scope.apiMemberList = function(s, me) {
                //console.log(s);
                //return
                if (!me.value) { return };
                Object.assign(s, { active: true, rows: {} });
                var params = Object.assign({}, s, { command: "apiFunctions" });
                evo.apiFunctions(params).then((res) => {
                    //console.log($scope.user);
                    return this.assign(s, res);
                });
            }

            $scope.getAlertInfoByID = function(row, scope) {
                if (row.AccountID) {
                    //console.log(row.AccountID);
                    evo.apiFunctions({
                        command: "apiFunctions",
                        property: "alerts",
                        host: "ku711",
                        channel: "16",
                        params: { "DisplayArea": "1", "Account": [{ "AccountID": row.AccountID, "AccountName": "" }] }
                    }).then((res) => {
                        Object.assign(row, res);
                        $scope.changeColor(row, scope)
                        this.$apply();                       
                    })
                }
            };




            $scope.changeColor = function(r, scope) {
                //console.log(s.channel);
                if (r.list_Accounts && r.list_Accounts.length) { r.color = "pink" };
                var black = r.f_blacklist || r.IsBlackList;
                if (black == 17 || black == true) { r.color = "black"; };
                var sequel = r.f_id || r.MNO;
                if (sequel == $scope.user.sequel) { r.color = "brown" };
            };

            $scope.setPopup = function(row, scope, popid) {
                var target = document.getElementById(popid);
                setTimeout(function() {
                    var content = target.querySelector(".ui.table");
                    $(target).popup({ html: content.outerHTML, hoverable: true, setFluidWidth: true, exclusive: true, on: "hover", position: "bottom left", variation: "special" })
                }, 500, target);
            };


            resolve($scope);
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