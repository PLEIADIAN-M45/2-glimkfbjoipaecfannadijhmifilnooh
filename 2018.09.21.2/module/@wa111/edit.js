define(['@wa111/edit.map', '@wa111/api'], function(map, apiFunction) {
    /*【审核中】 -> 【正常户】*/
    function timerFilter2(rows) { return rows.find(function({ f_field, f_oldData, f_newData }) { return f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus" && f_oldData == "3$log$0$log$0" && f_newData == "1$log$1$log$1" }); }
    /*【静止户】 -> 【审核中】*/


    function timerFilter1(rows) {
        return rows.find(function({ f_field, f_oldData, f_newData }) {
            return f_field == "f_ishow" && f_oldData == "0" && f_newData == "3"
        });
    }

    function $apply() { if (!$scope.$$phase) { $scope.$apply(); } }

    function bindEvo() { var { channel, host, origin, operator } = evo; return Object.assign($scope.user, { channel, host, origin, operator }); }

    function setUser() {
        return Promise.all([
            $serializeObject('#lblIp'),
            $serializeObject('input'),
            $serializeObject('select'),
            apiFunction.getPhoneDate(),
            apiFunction.getSystemLog().then(timerFilter1),
            apiFunction.getUserStore(),
        ]).then((args) => {
            var obj = Object.assign({}, ...args);
            console.log(obj);
            $scope.updateUser(obj);
            //$scope.user.timing[0] = apiFunction.getSystemLog().then(timerFilter1)
            $scope.user.locate.title = $scope.user.locate.value;
            $scope.user.banker = $scope.user.banker.value.map((value, index) => {
                return {
                    title: $scope.user.banker.title[index],
                    value: $scope.user.banker.value[index],
                    region: {
                        meta: $scope.user.banker.meta[index],
                        prov: $scope.user.banker.prov[index],
                        city: $scope.user.banker.city[index]
                    }
                }
            }).filter((a) => { return a.value });
            return $scope.user;
        }).then(bindEvo).then(putUser)
    }
    $scope.updateUser = function updateUser(obj) {
        Object.entries(obj).forEach(([prop, value]) => {
            if (USERMAP.hasOwnProperty(prop) && value.toString()) { eval(USERMAP[prop] + "=value") }
        });
        $scope.$apply();
    }
    $scope.ctrl = { deposit: ctl00_ContentPlaceHolder1_isOpenDeposit, btnSaveInfo: btnSaveInfo };
    $scope.url = {
        IGetMemberInfo: `http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}`
        //IGetMemberInfo: `${location.origin}/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}`
    };

    $scope.openDeposit = function() {
        this.ctrl.deposit.value = 1;
        this.ctrl.btnSaveInfo.click();
    };
    $scope.openLogPage = function() { window.open(this.url.IGetMemberInfo, '_blank'); };
    $scope.createTab = function(url, params) { window.open(url, '_blank'); };
    return { setUser }
});










/*
    evo.sendMessage({
        command: "localStorage"
    }).then((res) => {
        for(var key in res) {
            localStorage[key] = res[key];
            //console.log(evo.decoder(res[key]));
        }
    });*/






//$('button').each((i, el) => { console.log(el.getAttribute('onclick')); })

/*var arr = Object.entries(obj);
arr.forEach(([prop, value]) => {
    if(USERMAP.hasOwnProperty(prop)) { eval(USERMAP[prop] + "=value") }
});*/

/*
    xmlSpider.loadend = function() {
        //console.log(this.postData);
        if(this.postData) { var { action } = this.postData }
        switch (action) {
            case "getmodel":
                var obj = this.resp;
                var arr = Object.entries(obj);
                arr.forEach(([prop, value]) => {
                    if(USERMAP.hasOwnProperty(prop) && value.toString()) {
                        //console.log(prop, value);
                        eval(USERMAP[prop] + "=value")
                    }
                });
                console.log($scope.user);
                $scope.$apply();
                break;
            default:
                break;
        }
    }

myApp.factory('LuffyFactory', function() {
    var factory = {};
    factory.word = '我要成成海賊王!';
    return factory;
})

myApp.service('LuffyService', function() {
    this.word = '我要成為海賊王！';
})
*/
//var ddl = dropdownTransfer(ctl00_ContentPlaceHolder1_ishow)

//console.log($("input").serializeArray());
//console.log($("input").serialize());
//console.log($("input").serializeObject());



/*
        console.log([...new FormData(aspnetForm)]);
        [...new FormData(aspnetForm)].forEach(runMAP);
       console.log(user);*/

//.forEach(runMAP);