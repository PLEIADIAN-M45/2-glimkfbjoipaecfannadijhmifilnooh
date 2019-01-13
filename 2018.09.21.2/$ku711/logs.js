define([], function() {


    return function({ apis, $scope, $channel, $ctrl, $getModule, $account, $router, $model }) {


        apis.removeElementClass = function removeElementClass(children) {;
            [...children].map((el) => {
                $(el).find("br").remove()
                    .removeAttr('class')
                    .addClass('center')
            })
        };


        apis.addSiteNumberToAccount = function addSiteNumberToAccount(el) {

            var account = el[1].outerText,
                channel = $router.$channel,
                unique = [account, channel].join("-");

            $(el[1]).find(".ng-binding").hide()
            $(el[1]).append(apis.createElement(account, account))
            $(el[1]).append(apis.createElement(channel, unique))

            if(unique == $router.$unique) {
                $(el[1]).removeAttr('style').addClass('self')
            }

            if(el[4].outerText == '正常户') {
                $(el[4]).addClass('normal')
            }
        };

        $scope.iFrameSrc = location.href.replace('CookieID', 'DeviceNo');


        $scope.start = async function start() {

            var arr = await $getModule('ctrl.model.AlertInfo');

            console.log(arr);


            $("#tbList>tbody>tr:not(:last)").each((i, { children }) => {
                apis.addSiteNumberToAccount(children)
                apis.checkSensitiveWords(children)
                apis.removeElementClass(children)
            });


        };


        $scope.QueryInputModel = function QueryInputModel() {
            $scope.ctrl.model.QueryInputModel.AccountID = $router.$account;
            $scope.ctrl.GetQueryLoginLog($router.params.method);
        };


        $scope.getUserRegions = async function getUserRegions() {

            var arr = await $getModule('ctrl.model.ResultList');
            console.log(11111);
            console.log(arr);

            //$scope.scrollHeightPoster();

            $scope.user.region =
                arr.filter(({ AccountID }) => { return AccountID == $account })
                .map(({ IPAddress, IPLocation }) => { return { IPAddress, IPLocation } });

            $scope.$apply();
        };



        return;
        /*
        $scope.$watch('ctrl.model.ResultList', function(nv, ov) {
            console.log(nv);
        }, true);

        $scope.$watch('ctrl.model.AlertInfo', function(nv, ov) {
            console.log(nv);
        }, true);
        */

    }

    //$(el).removeClass('wauto w10 w20')

});