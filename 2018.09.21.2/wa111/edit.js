define(["wa111/User"], function({ setUser }) {

    return async function({ $xmlSpider, $scope, $ctrl, $sendMessage, $putUser, $delUser, $account }) {

        $xmlSpider.loadend = function() {
            if(this.action == "getmodel") {
                console.log(this);
                with(this.respData) {
                    //console.log("++++++++++++++++++++++");
                    //console.log(f_ishow, f_depositStatus);
                    $scope.user.status.push(f_ishow);
                    $scope.user.permit.push(f_depositStatus);
                    $scope.user.smss.status = 9;
                    $scope.$digest();
                }
            }
        }

        $scope.$delUser(false);

        $scope.user = await setUser(this);

        $scope.$watch('user', (nv, ov) => { if(nv) { $putUser(nv); } }, true);

        $scope.sendSms = function(user) {
            $scope.user.smss.status = 99
            $sendMessage($scope.user.smss).then((res) => {
                $scope.user.smss = res;
                $scope.$apply();
            })
        }

        $scope.openDeposit = function(e) {
            e.currentTarget.hide();
            $ctrl.isOpenDeposit.val(1)
            $ctrl.btnSaveInfo.click();
        }

        $scope.$apply();
    }
});











/*
instance
2ality – JavaScript and more
http://2ality.com/2014/05/this.html
https://alistapart.com/article/prototypal-object-oriented-programming-using-javascript
https://medium.freecodecamp.org/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81
https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
*/