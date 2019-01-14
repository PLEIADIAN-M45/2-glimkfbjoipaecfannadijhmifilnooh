define([], function() {
    return async function({ apis, $router, $account, $channel, $unique, $scope, $model, $getUser, $sendMessage, $apply }) {
        $scope.iFrameSrc = `/sameBrowserList.aspx?iType=3&accounts=${$router.$account}&siteNumber=${$router.$channel}`;
        $scope.QueryInputModel = function() {}
        apis.addSiteNumberToAccount = function addSiteNumberToAccount(el) {
            var account = el[2].outerText,
                channel = el[0].outerText.split("-")[0],
                unique = [account, channel].join("-");
            if (unique == $router.$unique) {
                $(el[2]).removeAttr('style').addClass('self')
                protocol_.push({ IPAddress: el[7].outerText, IPLocation: el[9].outerText });
            }
            $(el[2]).empty();
            $(el[2]).append(apis.createElement(account, account, "account"));
            $(el[2]).append(apis.createElement(channel, unique, "channel"));
        };
        $scope.start = function() {
            $("#divCookie>ul:not(.TrHead):not(.TrHead2)")
                .filter((i, { firstElementChild, childElementCount }) => { return firstElementChild.outerText && childElementCount > 5 })
                .each((i, { children }) => {
                    apis.addSiteNumberToAccount(children);
                    apis.checkSensitiveWords(children);
                });
        }
        
        var protocol_ = [];
        $scope.getUserRegions = function() {
            $scope.user.region = protocol_;
        };
    }
});