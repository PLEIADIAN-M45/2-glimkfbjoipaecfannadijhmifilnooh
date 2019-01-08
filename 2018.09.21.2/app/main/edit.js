define([], function() {

    return async function({ $scope, $model, $sendMessage, $getUser, $delUser, $putUser, $apply }) {


        $scope.$watch('user', this.$putUser, true);
        $getUser();
        $scope.$createTab = this.$createTab;
        $scope.$router = this.$router;

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