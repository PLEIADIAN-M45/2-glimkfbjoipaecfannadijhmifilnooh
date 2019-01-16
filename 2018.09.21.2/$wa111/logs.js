define([], function() {
    return async function({ apis, $router, $account, $channel, $unique, $scope, $model, $getUser, $sendMessage, $apply }) {
        $scope.iFrameSrc = `/sameBrowserList.aspx?iType=3&accounts=${$router.$account}&siteNumber=${$router.$channel}`;
        $scope.QueryInputModel = function() {}
        var regions = [];
        var region = new Set();
        apis.addSiteNumberToAccount = function addSiteNumberToAccount(el) {
            var account = el[2].outerText,
                channel = el[0].outerText.split("-")[0],
                unique = [account, channel].join("-");
            if(unique == $router.$unique) {
                $(el[2]).removeAttr('style').addClass('self');
                regions.push({ IPAddress: el[7].outerText, IPLocation: el[9].outerText });
                region.add(el[9].outerText)
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
        $scope.getUserRegions = function() {
            $scope.user.region = [...region];
            this.regions = regions;
        };




        function adjustTable() {
            $('.TrHead>li').each((i, li) => {
                li.textContent += i
            })
            $('ul>li:nth-child(11)').hide()
        }





    }
});