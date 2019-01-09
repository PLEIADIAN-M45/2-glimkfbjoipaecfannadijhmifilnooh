define([], function() {
    return async function({ apis }) {
        apis.watch('user', 'putUser');
        apis.getUser();
    }
});










// unique, $unique, $scope, $model, $sendMessage, $getUser, $delUser, $putUser, $apply 

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

//$scope.sendSms = apis.sendSms;
//apis.delUser(unique);
//$scope.$watch('user', apis.putUser, true);