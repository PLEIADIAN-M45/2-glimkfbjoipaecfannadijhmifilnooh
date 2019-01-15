define([], function() {
    return function({ apis, $scope, $channel, $ctrl, $getModule, $account, $router, $model, $xmlSpider }) {
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
            if (el[4].outerText == '正常户') { $(el[4]).addClass('normal') }
            if (unique == $router.$unique) { $(el[1]).removeAttr('style').addClass('self') }
        };



        $scope.start = async function start() {

            var AlertInfo = await $getModule('ctrl.model.AlertInfo');

            $scope.scrollHeightPoster();

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


            console.log(ResultList);
            $scope.user.region = ResultList.filter(({ AccountID }) => { return AccountID == $account })
                .map(({ IPAddress, IPLocation }) => { return { IPAddress, IPLocation } });
            $scope.$apply();
        };


        $xmlSpider.loadend = function xmlSpider() {
            //console.log(this.commander);
            //alert(this.action)
            switch (this.commander) {
                case "GETMEMBERALERTINFOBACKENDBYMULTIPLAYER":

                    /*
                        if ($router.$params.method == "DeviceNo") {
                            $scope.start();
                            $scope.scrollHeightPoster();
                        }*/
                    break;
                case "-------":
                    break;
            }

        };
    }
});











/*
$scope.$watch('ctrl.model.ResultList', function(nv, ov) {
    console.log(nv);
}, true);

$scope.$watch('ctrl.model.AlertInfo', function(nv, ov) {
    console.log(nv);
}, true);
*/
//$(el).removeClass('wauto w10 w20')