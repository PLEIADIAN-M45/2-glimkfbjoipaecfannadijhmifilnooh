define([], function() {
    return async function({ apis, $scope, $server, $ctrl }) {
        //apis.watch('user', 'putUser');
        await apis.getUser();

        console.log($server);


        $scope.setPermit = async function(e) {
          
            await apis.getUser();

            if ($server == "wa111") {
                e.currentTarget.hide();
                $ctrl.isOpenDeposit.val(1);
                $ctrl.btnSaveInfo.click();
            }
            if ($server == "ku711") {
                $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                $scope.ctrl.DepositChanged();
                $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
            }

        };


        console.log($scope.user);
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