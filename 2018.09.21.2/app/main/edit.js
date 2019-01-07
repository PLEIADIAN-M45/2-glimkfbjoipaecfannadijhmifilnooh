define([], function() {

    return async function({ $scope, $model, $sendMessage, $getUser, $delUser, $putUser, $apply }) {


        $scope.$watch('user', this.$putUser, true);


        this.$getUser();

        //$scope.$sendSms = this.$sendSms;


        $scope.$sendSms = function(user) {
            $scope.user.sendSms = false;
            $sendMessage({
                command: "api.sendSms(request.user)",
                user: $scope.user
            }).then((res) => { $scope.user.sendSms = res; }).then($apply)
        };


        console.log($scope);



        $scope.$apply();




    }
})



/*
	this != $scope

	避免與原$scope衝突


*/