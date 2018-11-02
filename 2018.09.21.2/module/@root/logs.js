define(['@page'], function() {;
    'use strict';

    return function main() {
        return new Promise(async function(resolve, reject) {
            $scope.stylesheet = ['logs', 'cards'];
            $scope.components = ['cards'];
            var user = await getUser();
            user.banker = user.banker.filter((x) => { x.property = "banker"; return x.value; });

            test(user);

            Object.keys(user).map((key) => { user[key]["property"] = key; });
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

            //console.log($scope.datalist);
            console.log($scope.user);

            $scope.getAllIPAddress = getAllIPAddress;


            $scope.assign = function() { Object.assign(...arguments); if(!this.$$phase) { this.$apply(); } }
            $scope.apiFunctions = function(me, ev) {
                var { host, channel, account } = evo;
                var params = Object.assign({}, me, { command: "apiFunctions", host, channel, account });
                if(me.active == undefined || ev) { me.active = true; } else { return };
                evo.apiFunctions(params).then((res) => {
                    return this.assign(me, res);
                }).then(putUser);
            }

            $scope.apiMemberList = function(s) {
                return
                s.active = true;
                var params = Object.assign({}, s, { command: "apiFunctions" });
                evo.apiFunctions(params).then((res) => {
                    return this.assign(s, res);
                });
            }



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