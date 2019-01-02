define(["wa111/user"], function({ setUser }) {

    return async function({ $xmlSpider, $scope, $ctrl, $sendMessage, $getUser, $putUser, $delUser, $account, $console, $router }) {

        $scope.$delUser(0);

        $scope.$watch('user', function(nv, ov) { if (!angular.equals(nv, ov)) { $scope.$putUser(); } }, true);

        $scope.user = await setUser(this);

        $scope.sendSms = function(e) {
            $scope.user.smss.status = -1;
            $sendMessage($scope.user.smss).then((res) => {
                $scope.user.smss = res;
                $scope.$apply();
            });
        }

        $scope.setPermit = function(e) {
            $scope.user.status[1] = -1;
            $ctrl.isOpenDeposit.val(1)
            $ctrl.btnSaveInfo.click();
        }

        $xmlSpider.loadend = function() {
            if (this.action == "getmodel") {
                $sendMessage(this).then((res) => {
                    $scope.user = res;
                    $scope.$apply();
                })
            }
        }

        $scope.$apply();
    }
});







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