define([], function() {

    console.log(window.opener);

    return async function({ apis, $account, $channel, $unique, $scope, $model, $getUser, $sendMessage, $apply }) {

        function createElement(value, content) { return $('<b>').text(value).addClass('pointer').popup({ on: 'click' }).click(apis.copy).attr('data-content', content)[0]; };

        apis.protocol = [];

        $('#divCookie > ul:not(.TrHead):not(.TrHead2)')
            .filter((i, { firstElementChild, children }) => {
                return firstElementChild.outerText && children.length > 10;
            }).each((index, { children, style }) => {

                var channel = children[0].outerText.split("-")[0];
                var account = children[2].outerText;
                var unique = account + "-" + channel;

                children[2].firstChild.remove();
                children[2].appendChild(createElement(account, account));
                children[2].appendChild(createElement(channel, unique));
                
                /*----------------------------------------*/
                if (channel == $channel && account == $account) {
                    children[2].style.backgroundColor = "#01579b";
                    children[2].style.color = "white";
                    /*----------------------------------------*/
                    apis.protocol.push({ IPAddress: children[7].outerText, IPLocation: children[9].outerText });
                }

                ;
                [...children].forEach((li, i) => {
                    apis.global.region.forEach((str, index) => { if (li.outerText.includes(str)) { li.classList.add('danger') } });
                    apis.global.danger.forEach((str, index) => { if (li.outerText.includes(str)) { li.classList.add('danger') } });
                    apis.global.author.forEach((str, index) => { if (li.outerText.includes(str)) { li.classList.add('danger') } });
                    //apis.global.locate.forEach((str, index) => { if (li.outerText.includes(str)) { li.classList.add('danger') } });
                })
            });

    }
})




/*
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

            ///console.log(this.rows);
        }*/

/*


        apis.global.region = apis.global.region.map((x) => {
            return x[0];
        })

        apis.global.danger = apis.global.danger.map((x) => {
            return x[0];
        })

        apis.global.author = apis.global.author.map((x) => {
            return x[0];
        })

        apis.global.locate = apis.global.locate.map((x) => {
            return x[0];
        })*/

// apis.global.region.join("|")
/*
        console.log(apis.global.region);
        console.log(apis.global.danger);
        console.log(apis.global.locate);

*/
/*apis.global.region.push(["安徽"])
apis.global.author.push(["郭正东"])
apis.global.locate.push(["106.57.192.57"])
apis.global.locate.push(["223.104.33.115"])
*/