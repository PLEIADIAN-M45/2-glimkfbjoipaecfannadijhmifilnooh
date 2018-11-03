var arrProvince = new Set();
var arrProtocol = new Map();

function dispatch() { return Promise.resolve() }

function checkSensitiveProvince(el) { var test = google.region.search(el.outerText); if(test) { el.classList.add('danger'); } }

function checkSensitiveProtocol(el) { var test = google.locate.search(el.outerText); if(test) { el.classList.add('danger'); } }

function checkSensitiveUserName(el) { var test = google.author.search(el.outerText); if(test) { el.classList.add('danger'); } }

function checkSensitiveMessages(el) { var test = google.notice.search(el.outerText); if(test) { el.classList.add('danger'); } }

function addHighlightAccountsId(children) {
    var account = children[2].outerText;
    var channel = children[0].outerText.split('-').shift();
    children[2].style.backgroundColor = "#01579b";
    children[2].style.color = "white";
}

function createElement(value) {
    return $('<b>')
        .text(value[0])
        .addClass('pointer')
        .popup({ on: 'click' })
        .click(evo.copy).attr('data-content', value.reverse().join('-'))
}

function addChannelToAccountsId(children) {
    var account = children[2].outerText;
    var channel = children[0].outerText.split('-')
        .shift();
    children[2].firstChild.remove();
    createElement([account])
        .appendTo(children[2]);
    createElement([channel, account])
        .appendTo(children[2]);
    if(evo.channel == channel && evo.account == account) {
        addHighlightAccountsId(children);
        catchProvinceProtocols(children);
    }
}

function catchProvinceProtocols(children) {
    var province = children[7].outerText;
    var protocol = children[9].outerText;
    arrProtocol.set(protocol, province);
    arrProvince.add(province);
}

function getAllIPAddress(scope) {
    [...document.querySelectorAll('ul:not([class]):not([style])')].filter(({ children, firstElementChild }) => { return (children.length > 5 && firstElementChild.outerText) })
        .forEach(({ children }) => {
            addChannelToAccountsId(children);
            checkSensitiveUserName(children[4]);
            checkSensitiveProtocol(children[7]);
            checkSensitiveProvince(children[9]);
            checkSensitiveMessages(children[11]);
        });
    evo.user.region = Array.from(arrProvince);
    scope.extend({ rows: Array.from(arrProtocol) });
}