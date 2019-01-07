define([], function() {
    return async function({ $scope, $model, $getUser, $sendMessage, $apply }) {

        //this.channel = this.$params.siteNumber;
        //console.log(this.channel);

        $('#divCookie').hide();

        /*****************/



        //$scope.user = await $getUser();

        /*****************/

        //function command(str) { return str + "(#)" }
        /***************************************/

        $scope.getProtocolSet = function() {
            //delete this.sites;
            let cells = $('#divCookie > ul:not(.TrHead):not(.TrHead2)').filter((i, { firstElementChild, children }) => {
                return firstElementChild.outerText && children.length > 10;
            }).toArray().filter(({ children }) => {
                with($scope.user) { return children[0].outerText.split("-")[0] == channel && children[2].outerText.trim() == account; }
            });
            this.rows = cells.map(({ children }) => { //检查黑名单 海南
                return { IPAddress: children[7].outerText.trim(), IPLocation: children[9].outerText.trim() };
            });

            $scope.user.region = this.rows.map((x) => {
                return x.IPLocation;
            })
            console.log(1);
            ///console.log(this.rows);
        }


     
    }
})