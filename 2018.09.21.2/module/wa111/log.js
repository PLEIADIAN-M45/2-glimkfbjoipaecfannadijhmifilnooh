define([


], function() {

})

var dispatch = function() {
    return Promise.resolve()
}

var getHTMLTableCells = function() {
    return new Promise(function(resolve, reject) {
        window.HTMLTableCellElements = $('#divCookie>ul:not(.TrHead, .TrHead2)').find('li');
        if (HTMLTableCellElements) {
            resolve(HTMLTableCellElements)
        } else {
            reject()
        }
    })
}

function getGetAlerInfo() {
    return new Promise(function(resolve, reject) {
        resolve([[], []])
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

/*
var getFrameUrl = function() {
    var callee = arguments.callee.name;
    return location.origin + '/sameBrowserList.aspx?iType=3&accounts={accountId}&siteNumber={siteNumber}'
        .replace('{accountId}', evo.params.member).replace('{siteNumber}', evo.params.siteNumber);
}*/



function checkSensitiveWords() {
    document.querySelectorAll("li").forEach((el) => {
        var str = el.outerText.trim();
        if (str.match(evo.regexp.sensitive.full)) { el.classList.add('danger'); }
    })
}