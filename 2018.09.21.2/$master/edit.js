define([], function() {
    return async function({ apis, $xmlSpider, $scope, $server, $ctrl }) {

        apis.$injectStylesheet($router.$stylesheet);
        apis.$injectComponents($router.$components);

        await apis.getUser();

        $xmlSpider.loadend = async function() {
            if(this.commander == "GETMODEL") { apis.getUser(); }
        };

        apis.port = chrome.runtime.connect(apis.extensionId, { name: "evo" });
        apis.port.postMessage('frameId');
        apis.port.onMessage.addListener(function({ frameId, setPermit }) {
            if(setPermit) { $scope.setPermit(); }
            if(frameId) { $scope.user.frameId = frameId; }
        })



        apis.$keydown(async function(e) {
            console.log(e);
            switch (e.key) {
                case "Escape":
                    console.clear();
                    break;
                case "Delete":
                    apis.delUser();
                    break;
                case "`":
                    console.log($scope.user);

                    break;
                case "1":
                    await apis.getUser();
                    $scope.$apply();
                    break;
                case "2":
                    await apis.setUser();
                    $scope.$apply();
                    break;
                case "3":
                    apis.setUser()
                    break;
                case "4":

                    break;
                case "5":
                    apis.putUser();
                    break;
                case "6":
                    $scope.$apply();
                    break;

                default:
                    // statements_def
                    break;
            }
        })



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