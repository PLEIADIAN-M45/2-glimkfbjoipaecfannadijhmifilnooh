define([], function() {

    return async function({ apis, unique, $unique, $scope, $model, $sendMessage, $getUser, $delUser, $putUser, $apply }) {

        //console.log(apis);
        //$scope.user = await apis.getUser({ unique });

        //apis.delUser(unique);

        $scope.$watch('user',
            apis.putUser,
            true);


        apis.getUser(unique)


        console.log($scope.user);


        $scope.$sendSms = function(user) {
            $scope.user.sendSms = false;
            $sendMessage({
                command: "api.sendSms(request.user)",
                user: $scope.user
            }).then((res) => { $scope.user.sendSms = res; }).then($apply)
        };


        $scope.$apply();


        //console.table($scope.user)
        // console.log($scope);
    }
})