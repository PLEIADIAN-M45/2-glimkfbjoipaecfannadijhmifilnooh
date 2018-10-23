define([


], function() {

})

var dispatchMyEvent = function() {
    return new Promise(function(resolve, reject) {
        if ($scope.ctrl.model.QueryInputModel.AccountID != undefined &&
            $scope.ctrl.GetQueryLoginLog) {
            $scope.ctrl.model.QueryInputModel.AccountID = evo.params.accounts;
            $scope.ctrl.GetQueryLoginLog(evo.params.method);
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


function getModule(objPath) {
    return new Promise(function(resolve, reject) {
        var object = (objPath.includes('ctrl')) ? $scope : $scope.ctrl.model;;
        (function repeater(object) {
            var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object);
            if (alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else {
                if (typeof alphaVal == "object") {
                    if (Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) };
                } else { resolve(alphaVal); }
            }
        }(object));
    })
}



async function checkSensitiveWords() {

    function addclassList(el) { el.classList.add('danger'); return el; }

    function removeClass(el) {
        if (el.outerText == "正常户") { el.classList.add('normal'); }

        el.classList.remove("w10", "w20");


        [...el.children].filter((em, i, elem) => {
            //elem[i].removeChild(em)
            return em.localName == "br"
        })
        //.map((x) => { console.log(x); })

        //removeChild

        /*   console.log([...el.children]);

           console.log(el.children);*/



        //$(el).removeClass('w10', 'w20').find('br').remove();
        return el;
    }

    function sensitive({ outerText }) { return outerText.match(evo.regexp.sensitive.full) }

    await getModule("ctrl.model.ResultList");

    var arr = [...document.querySelectorAll("td")];

    arr.map(removeClass).filter(sensitive).forEach(addclassList);




    /*document.querySelectorAll("td").forEach((el) => {
        $(el).removeClass('w10', 'w20').find('br').remove();
        var s
        tr = el.outerText.trim();
        if (str == '正常户') { el.classList.add('normal'); } else
        if (str.match(evo.regexp.sensitive.full)) { el.classList.add('danger'); }
    });*/
    return;
    //.map((x) => { console.log(x); })

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
        $scope.$watch('ctrl.model.ResultList', function(newValue, oldValue) {
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
        $scope.$watch('ctrl.model.ResultList', function(newValue, oldValue) {
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












/*
 async function checkSensitiveWords3() {
        var callee = arguments.callee.name;
        return new Promise(function(resolve, reject) {
            window.HTMLTableCellElements.each(function(index, el) {
                var str = el.outerText.trim();
                if (evo.siteNumber == '16') {
                    el.classList.remove('w10');
                    el.classList.remove('w20');
                    $(el).find('br').remove();
                    if (str == '正常户') { el.classList.add('normal'); }
                }
                if (str.match(evo.regexp.sensitive.full)) { el.classList.add('danger'); }
            });
            resolve([callee, HTMLTableCellElements])
        })
    }
    
    function checkSensitiveWords() {
        console.log(2222222, 33333);
        document.querySelectorAll("li").forEach((el) => {
            var str = el.outerText.trim();
            if (str.match(evo.regexp.sensitive.full)) {
                el.classList.add('danger');
            }
        })
        return
        window.HTMLTableCellElements.each(function(index, el) {
            var str = el.outerText.trim();
            if (evo.siteNumber == '16') {
                el.classList.remove('w10');
                el.classList.remove('w20');
                $(el).find('br').remove();
                if (str == '正常户') { el.classList.add('normal'); }
            }
            if (str.match(evo.regexp.sensitive.full)) { el.classList.add('danger'); }
        });



        return new Promise(function(resolve, reject) {

            resolve()
        })
    }*/