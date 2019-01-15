define([], function() {
    return async function({ apis, $xmlSpider, $scope, $server, $ctrl }) {

        apis.$injectStylesheet($router.$stylesheet);
        apis.$injectComponents($router.$components);

        await apis.getUser();

        $xmlSpider.loadend = async function() {
            if (this.commander == "GETMODEL") { apis.getUser(); }
        };


        $scope.setFrameId = function({ frameId }) {
            $scope.user.frameId = frameId;
            $scope.frameId = frameId;
            $scope.$apply();
        }

        var port = chrome.runtime.connect(apis.extensionId, { name: "knockknock" });
        port.onMessage.addListener(function(msg) {
            if (msg.setPermit) { $scope.setPermit(); }
            if (msg.frameId) { $scope.setFrameId(msg) }
        });

        $scope.$apply();
    }
});







/*
$scope.setPermit = async function() {
    if ($server == "wa111") {
        $('.setPermit').hide();
        $ctrl.isOpenDeposit.val(1);
        $ctrl.btnSaveInfo.click();
    }
    if ($server == "ku711") {
        $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
        $scope.ctrl.DepositChanged();
        $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
    }
};
*/