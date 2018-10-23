define([


], function() {

})

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