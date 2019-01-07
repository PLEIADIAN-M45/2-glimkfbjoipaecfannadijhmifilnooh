define(["wa111/user"], function({ $defUser }) {

    return async function({ $xmlSpider, $now, $scope, $ctrl, $sendMessage, $getUser, $setUser, $putUser, $delUser, $account, $console, $router }) {

        $delUser(0);

        $scope.$watch('user', $putUser, true);

        $scope.user = await $getUser() || await $defUser(this);

        console.log($scope.user);

        $scope.sendSms = function(e) {

            e.preventDefault();
            e.currentTarget.hide();
            $scope.user.sendsms.status = -1;

            $sendMessage($scope.user.sendsms).then((s) => { c(s) })
                .then($setUser)
        };

        $scope.setPermit = function(e) {
            //e.currentTarget.hide();
            $ctrl.isOpenDeposit.val(1);
            $ctrl.btnSaveInfo.click();
        };


        $xmlSpider.loadend = function() {
            return

            if(this.action == "getmodel") {

                $getUser().then((user) => {

                    $scope.user = user;
                    //console.log(user);

                    with(this.respData) {
                        $scope.user.status.push(f_ishow);
                        $scope.user.permit.push(f_depositStatus);
                        $scope.user.timing.push($now);
                        $scope.user.sendsms.status = 9;
                        if($scope.user.status[0] == 3) {
                            $scope.user.module = "authorize"
                            //$scope.user.command = "google:scripts.authorize"
                        } else {
                            $scope.user.module = "suspended"
                            //$scope.user.command = "google:scripts.suspended"
                        }
                        // $setUser();
                    }

                    console.log($scope.user);


                    $sendMessage({
                        command: "api.googleScripts(#)",
                        user: $scope.user
                    }).then((s) => {
                        console.log(s);
                    })

                })

                //.then($setUser)
            }
        };


        this.$keydown(function(e) {
            console.log(e.key);
            if(e.key == "Delete") { $delUser(1) }
            if(e.key == "-") { console.clear() }
        });
        $scope.$apply();

        //console.clear();
        //console.log($now);
    }
});









//$scope.user.save();
//var user = await $getUser()
/*
setTimeout(() => {
    $scope.user.momm = 2132223;
    $scope.$apply();
}, 2000)
*/




//console.time("Array initialize");
//console.timeEnd("Array initialize");
//$scope.user = await new User(this);





















/*
       $scope.$watch('user', function(nv, ov) {
           if(!angular.equals(nv, ov)) { $scope.$putUser(); }
       }, true);
       */










//console.log($scope.$router);
//console.log(this.$router);

















//function modify() {}
//e.currentTarget.hide();
//$scope.user.smss.status = 0;
//console.log($scope.user.smss.status);
//console.log($scope.user.smss.status);
//setTimeout(function() {}, 2000);
//$scope.$digest();







/*
instance
2ality – JavaScript and more
http://2ality.com/2014/05/this.html
https://alistapart.com/article/prototypal-object-oriented-programming-using-javascript
https://medium.freecodecamp.org/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81
https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
*/