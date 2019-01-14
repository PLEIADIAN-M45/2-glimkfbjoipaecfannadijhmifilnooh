define([], function() {
    return async function({ apis, $scope, $server, $ctrl }) {
        await apis.getUser();

        $scope.setPermit = async function(e) {
            await apis.getUser();
            if ($server == "wa111") {
                if (e) { e.currentTarget.hide(); }
                $ctrl.isOpenDeposit.val(1);
                $ctrl.btnSaveInfo.click();
            }
            if ($server == "ku711") {
                $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                $scope.ctrl.DepositChanged();
                $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
            }
        };
    }
});








/*
  console.log(window.opener);
  if (window.opener == null) {
  } else {        return    }
  */





/*
apis.port.postMessage('sender');
apis.port.onMessage.addListener(function(sender) {
    console.log(sender);
    if(sender == 'setPermit') { $scope.setPermit() }
    if(sender.frameId) { $scope.user.frameId = sender.frameId; }
});
*/