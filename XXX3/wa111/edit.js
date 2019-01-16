define(["wa111/user"], function({ $defUser }) {

    return async function({ $xmlSpider, $now, $scope, $ctrl, $sendMessage, $getUser, $setUser, $putUser, $delUser, $account, $console, $router }) {
       
       
        /*
        $scope.sendSms = function(e) {
            $scope.user.sendSms = false;
            e.preventDefault();
            $sendMessage({
                command: "api.sendSms(request.user)",
                user: $scope.user
            }).then((res) => {
                console.log(res);
                $scope.user.sendSms = res;
                $scope.$apply();
            })
        };
        */

        $scope.setPermit = function(e) {
            e.currentTarget.hide();
            $ctrl.isOpenDeposit.val(1);
            $ctrl.btnSaveInfo.click();
        };



        $xmlSpider.loadend = function() {
            if (this.action == "getmodel") {
                //update User
                $getUser().then((user) => {
                    $scope.user = user;
                }).then(apply)
            }
        };

        this.$keydown(function(e) {
            console.log(e.key);
            if (e.key == "Delete") { $delUser(1) }
            if (e.key == "-") { console.clear() }
        });



        console.log($scope.user);


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