define(["wa111/user"], function({ $defUser }) {

    //define(["wa111/user"], function(User) {

    return async function({ $xmlSpider, $now, $scope, $ctrl, $sendMessage, $getUser, $setUser, $putUser, $delUser, $account, $console, $router }) {


        $scope.$delUser(1);

        $scope.$watch('user', $putUser, true);

        $scope.user = await $defUser(this);




        //$scope.user.save();
        //var user = await $getUser()
        /*
        setTimeout(() => {
            $scope.user.momm = 2132223;
            $scope.$apply();
        }, 2000)
        */

        $scope.sendSms = function(e) {
            e.preventDefault();
            e.currentTarget.hide();
            $scope.user.sendsms.status = -1;
            $sendMessage($scope.user.sendsms).then((s) => { c(s) })
                .then($setUser)
        };
        $scope.setPermit = function(e) {
            e.currentTarget.hide();
            $ctrl.isOpenDeposit.val(1);
            $ctrl.btnSaveInfo.click();
        };

        console.log($now);

        $xmlSpider.loadend = function() {
            if(this.action == "getmodel") {
                with(this.respData) {
                    $scope.user.status.push(f_ishow);
                    $scope.user.permit.push(f_depositStatus);
                    $scope.user.timing.push($now);
                    $scope.user.sendsms.status = 9;
                    $scope.$apply();
                    if($scope.user.status[0] == 3) {
                        $scope.user.module = "authorize"
                        //$scope.user.command = "google:scripts.authorize"
                    } else {
                        $scope.user.module = "suspended"
                        //$scope.user.command = "google:scripts.suspended"
                    }

                    $sendMessage({
                        command: "api.google(...arguments)",
                        user: $scope.user

                    }).then((s) => { c(s) }).then($setUser)


                }




                //$sendMessage(this).then((s) => { c(s) }).then($setUser)
            }
        };
        $scope.$keydown(function(e) { if(e.key == "Delete") { $scope.$delUser(1) } });
        $scope.$apply();

    }
});












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