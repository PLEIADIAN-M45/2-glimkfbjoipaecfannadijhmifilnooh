var dispatchMyEvent = function() {
    var callee = arguments.callee.name;
    return new Promise(function(resolve, reject) {
        resolve([callee, []])
    })
}

var getHTMLTableCells = function() {
    var callee = arguments.callee.name;
    return new Promise(function(resolve, reject) {
        window.HTMLTableCellElements = $('#divCookie>ul:not(.TrHead, .TrHead2)').find('li');
        if (HTMLTableCellElements) {
            resolve(HTMLTableCellElements)
        } else {
            reject(callee)
        }
    })
}

function getGetAlerInfo() {
    var callee = arguments.callee.name;
    return new Promise(function(resolve, reject) {
        resolve([callee, []])
    })
}


var getSiteNumberCollection = function() {
    var callee = arguments.callee.name;
    return $('ul:not(.TrHead, .TrHead2)>li:nth-child(1)')
        .map(function(index, element) {
            return element.textContent.split('-')[0];
        })
}

var getAccountIdCollection = function() {
    var callee = arguments.callee.name;
    return $('ul:not(.TrHead, .TrHead2)>li:nth-child(3)')
}


var getFrameUrl = function() {
    var callee = arguments.callee.name;
    return location.origin + '/sameBrowserList.aspx?iType=3&accounts={accountId}&siteNumber={siteNumber}'
        .replace('{accountId}', evo.params.member).replace('{siteNumber}', evo.params.siteNumber);
}


