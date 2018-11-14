/*define([], function() {
    console.log(this);
})
*/

function loadModules($scope, $rootElement) {


    console.log(123, 324);
    console.log(this);

    //$scope.host=

    console.log($location);



    return
    $scope.address = location.href;
    $scope.host = evo.host;
    $scope.route = evo.route;

    /*
    switch ($scope.host) {
        case "wa111":
            break;
        case "ku711":
            break;
    }
    */

    var postScrollHeightMessage = function() {
        switch ($scope.host) {
            case "wa111":
                setTimeout(() => {
                    console.log(document.body.scrollHeight);
                    window.parent.postMessage({ scrollHeight: document.body.scrollHeight + 'px' }, '*');
                }, 1000)
                break;
            case "ku711":
                $scope.$watch('ctrl.model.ResultList', function(nv, ov) {
                    if (nv) {
                        setTimeout(() => {
                            console.log(document.body.scrollHeight);
                            window.parent.postMessage({ scrollHeight: document.body.scrollHeight + 'px' }, '*');
                        }, 1000)
                    }
                })
                break;
        }
    }


    var queryInputModel = function() {
        switch ($scope.host) {
            case "wa111":
                break;
            case "ku711":
                $scope.ctrl.model.QueryInputModel.AccountID = evo.params.accounts;
                $scope.ctrl.GetQueryLoginLog(evo.params.method);
                break;
        }
    }

    var createIFrame = function(_src) {
        var addScrollHeightEventListener = function() {
            window.addEventListener('message', (e) => {
                console.log(this);
                console.log(e.data.scrollHeight);
                this.style.height = e.data.scrollHeight;
            });
        }
        $('<div>').addClass('ui horizontal divider').text('AND').appendTo($rootElement);
        $('<iframe>', { id: 'sameBrowserList', src: _src, frameborder: 0, width: '100%' }).load(addScrollHeightEventListener).appendTo($rootElement);
    }

    var createTab = function(_url) {
        console.log(_url);
        window.open(_url, "_blank");
    }




    var setPermit = function() {
        return
        switch ($scope.host) {
            case "wa111":
                $scope.ctrl.deposit.value = 1;
                $scope.ctrl.btnSaveInfo.click();
                break;
            case "ku711":
                $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                $scope.ctrl.DepositChanged();
                $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
                break;
        }
    }

    //$scope.createTab = createTab;

    $scope.events = {
        //createTab: createTab.bind($scope),
        createTab,
        createIFrame,
        setPermit,
        queryInputModel,
        postScrollHeightMessage
    }

}