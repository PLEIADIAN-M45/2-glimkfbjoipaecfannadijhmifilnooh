define(["wa111/user"], function({ $defUser }) {
    return async function({ $xmlSpider, $scope, $ctrl, $sendMessage, $getUser, $setUser, $putUser, $delUser, $account, $console, $router }) {
        $scope.$delUser(0);
        $scope.$watch('user', $putUser, true);
        $scope.user = await $defUser(this);
        $scope.sendSms = function(e) {
            e.preventDefault();
            e.currentTarget.hide();
            $scope.user.sendsms.status = -1;
            $sendMessage($scope.user.sendsms)
                .then($setUser)
        };
        $scope.setPermit = function(e) {
            e.currentTarget.hide();
            $ctrl.isOpenDeposit.val(1);
            $ctrl.btnSaveInfo.click();
        };
        $xmlSpider.loadend = function() {
            if(this.action == "getmodel") {
                $sendMessage(this).then($setUser)
            }
        };
        $scope.$keydown(function(e) { if(e.key == "Delete") { $scope.$delUser(1) } });
        $scope.$apply();

        console.log($scope.user);
    }
});

































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