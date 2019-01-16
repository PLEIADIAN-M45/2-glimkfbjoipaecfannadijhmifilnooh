define([], function() {
    return function({ apis, $scope, $channel, $ctrl, $getModule, $account, $router, $model }) {
        $scope.iFrameSrc = location.href.replace('CookieID', 'DeviceNo');
        apis.removeElementClass = function removeElementClass(children) {;
            [...children].map((el) => {
                $(el).find("br").remove();
                $(el).removeAttr("class");
            });
        };
        apis.addSiteNumberToAccount = function addSiteNumberToAccount(el) {
            var account = el[1].outerText,
                channel = $router.$channel,
                unique = [account, channel].join("-");
            $(el[1]).find(".ng-binding").hide();
            $(el[1]).append(apis.createElement(account, account));
            $(el[1]).append(apis.createElement(channel, unique));
            if(el[4].outerText == '正常户') { $(el[4]).addClass('normal') }
            if(unique == $router.$unique) { $(el[1]).removeAttr('style').addClass('self') }
        };

        $scope.start = async function start() {
            await $getModule('ctrl.model.AlertInfo');
            $("#tbList>tbody>tr:not(:last)").each((i, { children }) => {
                apis.removeElementClass(children);
                apis.addSiteNumberToAccount(children);
                apis.checkSensitiveWords(children);
            });
        };

        $scope.QueryInputModel = function QueryInputModel() {
            $scope.ctrl.model.QueryInputModel.AccountID = $router.$account;
            $scope.ctrl.GetQueryLoginLog($router.params.method);
        };

        $scope.getUserRegions = async function getUserRegions() {
            var ResultList = await $getModule('ctrl.model.ResultList');
            var region = new Set();
            var regions = [];
            ResultList.filter(({ AccountID }) => { return AccountID == $account })
                .map(({ IPAddress, IPLocation }) => {
                    region.add(IPLocation);
                    regions.push({ IPAddress, IPLocation })
                });

            this.regions = regions;
            $scope.user.region = [...region];
        };
    }
});