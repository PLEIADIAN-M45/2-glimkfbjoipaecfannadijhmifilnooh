define([], function() {
    return async function({ apis, $scope, $server, $ctrl }) {
        await apis.getUser();
        $scope.setPermit = async function(e) {
            await apis.getUser();
            if($server == "wa111") {
                e.currentTarget.hide();
                $ctrl.isOpenDeposit.val(1);
                $ctrl.btnSaveInfo.click();
            }
            if($server == "ku711") {
                $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                $scope.ctrl.DepositChanged();
                $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
            }
        };
        console.log($scope.user);
    }

});