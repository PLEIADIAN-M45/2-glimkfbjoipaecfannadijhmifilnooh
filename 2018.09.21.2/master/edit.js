define([], function() {

    return async function({ apis, unique, $unique, $scope, $model, $sendMessage, $getUser, $delUser, $putUser, $apply }) {
        /*
        $scope.sendSms = function sendSms(e) {
            var $currentTarget = $(e.currentTarget)
            $currentTarget.hide();
            apis.sendMessage($scope.user).then((res) => {
                //console.log(res);
                apis.getUser();
                $currentTarget.show();
            })
        };
        */

        


        apis.watch('user', 'putUser');
        apis.getUser();
    }
});



//$scope.sendSms = apis.sendSms;
//apis.delUser(unique);
//$scope.$watch('user', apis.putUser, true);