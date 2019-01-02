define(["wa111/user"], function({ setUser }) {

    return async function({ $xmlSpider, $scope, $ctrl, $sendMessage, $putUser, $delUser, $account, $console }) {

        $scope.$delUser(1);

        $scope.user = await setUser(this);

        $console($scope.user);

        $scope.$watch('user', (nv, ov) => {
            if (nv) {
                $putUser(nv);
            }
        }, true);

        $scope.sendSms = function(user) {
            if (!user) { return; }
            $scope.user.smss.status = 99;
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

        $xmlSpider.loadend = function() {
            if (this.action == "getmodel") {
                console.log(this);
                with(this.respData) {
                    //var c = await $scope.$getUser()
                    //console.log(c);
                    //console.log("++++++++++++++++++++++");
                    $scope.user.status.push(f_ishow);
                    $scope.user.permit.push(f_depositStatus);
                    $scope.user.smss.status = 9;
                    $scope.user.module = "google:scripts:authorize";
                    $scope.$digest();
                    with($scope.user) {
                        console.log(status);

                        if (status[0] != status[1]) {

                            console.log("開");

                            $sendMessage({
                                command: "apiFunctions.google",
                                params: $scope.user
                            })

                        }
                        //console.log(f_ishow, f_depositStatus);
                    }
                }
            }
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