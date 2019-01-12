define([], function() {


    return function({ apis, $scope, $channel, $ctrl, $getModule, $account, $router, $model }) {

        /*
        console.log($router);

        console.log($scope);

        console.log($ctrl);
        */
        function createElement(value, content) {

            return $('<b>').text(value.toUpperCase()).addClass('pointer')
                .popup({ on: 'click' })
                .css({ color: '#fff' })
                .click(apis.copy).attr('data-content', content.toUpperCase())[0];
        };




        function addSiteNumber() {

            apis.global.author.push(["王杰"])
            apis.global.region.push(["浙江"])
            

            $("#tbList>tbody>tr:not(:last)")
                .each((i, { firstElementChild, children }) => {
                    //console.log(children);

                    var account = children[1].outerText;
                    var unique = account + "-" + $channel;

                    if (account == $account) {
                        children[1].removeAttribute("style")
                        children[1].classList.add("self");
                    }

                    $(children[1]).find(".ng-binding").hide();
                    children[1].appendChild(createElement(account, account));
                    children[1].appendChild(createElement("-" + $channel, unique));




                    [...children].forEach((td) => {
                        //console.log(td);
                        $(td).find("br").remove()
                        td.classList.remove('wauto');
                        td.classList.remove('w10');
                        td.classList.remove('w20');



                        apis.global.region.forEach((str, index) => { if (td.outerText.includes(str)) { td.classList.add('danger') } });
                        apis.global.danger.forEach((str, index) => { if (td.outerText.includes(str)) { td.classList.add('danger') } });
                        apis.global.author.forEach((str, index) => { if (td.outerText.includes(str)) { td.classList.add('danger') } });
                    })



                    //.remove();


                }).filter((i, children) => {
                    console.log(i);
                })

        }

        function checkSensitiveWords() {

        }




        function highlightSelfUser() {

        }



        apis.protocol = [];

        function getUserRegions() {

            $getModule('ctrl.model.ResultList')
                .then((arr) => {

                    //addSiteNumber()

                    //console.log(arr);
                    arr.filter((obj) => {
                        return obj.AccountID == $account
                    }).forEach(({ IPAddress, IPLocation }) => {
                        apis.protocol.push({ IPAddress, IPLocation });
                    })

                    $scope.user.locate.protocol = apis.protocol;
                    $scope.user.region = apis.protocol.map((x) => { return x.IPLocation; })
                    $scope.$apply();



                    console.log(apis.protocol);
                })



            $getModule('ctrl.model.AlertInfo')
                .then((arr) => {
                    addSiteNumber()
                })


        }


        getUserRegions()

        $scope.ctrl.model.QueryInputModel.AccountID = $router.$account;
        $scope.ctrl.GetQueryLoginLog($router.params.method);


        return
        $scope.$watch('ctrl.model.ResultList', function(nv, ov) {
            console.log(nv);
        }, true);

        $scope.$watch('ctrl.model.AlertInfo', function(nv, ov) {
            console.log(nv);
        }, true);


        /*
        $getModule('ctrl.model.ResultList')
            .then((x) => {
                console.log(x);
            })

        $getModule('ctrl.model.AlertInfo')
            .then((x) => {
                console.log(x);
            })*/

        /*
        console.log($scope.ctrl.model.ResultList);
        console.log($scope.ctrl.model.AlertInfo);
	*/





        // $ctrl.model.ResultList
    }
})
/*
    .filter((i, children) => {
        return children.outerText != ""
    })
*/

var dispatchMyEvent = function() {
    return new Promise(function(resolve, reject) {
        if (myApp.$scope.ctrl.model.QueryInputModel.AccountID != undefined &&
            myApp.$scope.ctrl.GetQueryLoginLog) {
            myApp.$scope.ctrl.model.QueryInputModel.AccountID = evo.params.accounts;
            myApp.$scope.ctrl.GetQueryLoginLog(evo.params.method);
            resolve(['dispatchMyEvent', []])
        } else {
            reject('dispatchMyEvent')
        }
    })
}


var getFrameUrl = function() {
    return location.href.replace('CookieID', 'DeviceNo')
}

var getAccountIdCollection = function() {
    var callee = arguments.callee.name;
    var collection = $('#tbList').find('tr>td:nth-child(2)')
    return collection;
}

function getSiteNumberCollection() {
    var callee = arguments.callee.name;
    var collection = $('#tbList').find('tr').map(function(element) {
        return evo.siteNumber;
    })
    return collection;
}

async function checkSensitiveWords() {
    var callee = arguments.callee.name;
    return new Promise(function(resolve, reject) {
        window.HTMLTableCellElements.each(function(index, el) {
            var str = el.outerText.trim();
            if (evo.siteNumber == '16') {
                el.classList.remove('w10');
                el.classList.remove('w20');
                $(el).find('br').remove();
                if (str == '正常户') {
                    el.classList.add('normal');
                }
            }
            if (str.match(evo.regexp.sensitive.full)) {
                el.classList.add('danger');
            }
        })
        resolve([callee, HTMLTableCellElements])
    })
}


function addSiteNumberToAccountId() {
    var callee = arguments.callee.name;
    var accountIdCollection = getAccountIdCollection();
    var siteNumberCollection = getSiteNumberCollection();
    accountIdCollection.each(function(index, element) {
        if (element.textContent.trim()) {
            var accountId = element.textContent.trim();
            var siteNumber = '-' + siteNumberCollection[index];
            var uniqueId = accountId + siteNumber;
            if (uniqueId == evo.uniqueId) {
                element.classList.add('self');
            }
            if (evo.siteNumber != '16') {
                element.setAttribute('data-content', accountId);
                element.textContent = null;
                $('<b>')
                    .text(accountId)
                    .addClass('pointer')
                    .attr('data-content', accountId)
                    .popup({
                        on: 'click'
                    })
                    .click(function() {
                        evo.copyText = accountId;
                        document.execCommand("copy");
                    }).appendTo(element)

                $('<b>')
                    .text(siteNumber)
                    .addClass('pointer')
                    .attr('data-content', accountId + siteNumber)
                    .popup({
                        on: 'click'
                    })
                    .click(function() {
                        evo.copyText = accountId + siteNumber;
                        document.execCommand("copy");
                    }).appendTo(element);
            }
        }
    })
    return [callee, []];
}


function getHTMLTableCells() {
    var callee = arguments.callee.name;
    var flag = 0;
    return new Promise(function(resolve, reject) {
        myApp.$scope.$watch('ctrl.model.ResultList', function(newValue, oldValue) {
            if (newValue) {
                setTimeout(function() {
                    window.HTMLTableCellElements = $('#tbList').find('td');
                    if (flag == 0) {
                        flag = 1;
                        resolve(HTMLTableCellElements);
                    } else {
                        checkSensitiveWords()
                            .then(addSiteNumberToAccountId)
                    }
                }, 1000)
            }
        });
    })
}


function getTableCellCollection() {
    var callee = arguments.callee.name;
    return new Promise(function(resolve, reject) {
        myApp.$scope.$watch('ctrl.model.ResultList', function(newValue, oldValue) {
            if (newValue) {
                setTimeout(function() {
                    window.HTMLTableCellElements = $('#tbList').find('td');
                    resolve(HTMLTableCellElements)
                }, 1000)
            } else {

            }
        });
    })


}