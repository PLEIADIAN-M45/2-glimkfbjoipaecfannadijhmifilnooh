function dispatch() { return Promise.resolve() }

function checkSensitiveProvince(el) {
    evo.decoder(localStorage.region).find(([str], index) => {
        if (el.outerText.includes(str)) { return el.classList.add('danger'); }
    });
}

function checkSensitiveProtocol(el) {
    evo.decoder(localStorage.locate).find(([str], index) => {
        if (el.outerText.startsWith(str)) { return el.classList.add('danger'); }
    });
}

function checkSensitiveUserName(el) {
    evo.decoder(localStorage.author).find(([str], index) => {
        if (str.trim() == el.outerText) { el.classList.add('danger'); }
    });
}

function checkSensitiveMessages(el) {
    evo.decoder(localStorage.danger).find((str, index) => {
        if (el.outerText.includes(str)) { return el.classList.add('danger'); }
    });
}

function addHighlightAccountsId(children) {
    var account = children[2].outerText;
    var channel = children[0].outerText.split('-').shift();
    children[2].style.backgroundColor = "#01579b";
    children[2].style.color = "white";
}

function createElement(value) {
    return $('<b>').text(value[0]).addClass('pointer')
        .popup({ on: 'click' }).click(evo.copy).attr('data-content', value.reverse().join('-'))
}

function addChannelToAccountsId(children) {
    var account = children[2].outerText;
    var channel = children[0].outerText.split('-').shift();
    children[2].firstChild.remove();
    createElement([account]).appendTo(children[2]);
    createElement([channel, account]).appendTo(children[2]);

    //console.log(channel, account, evo.channel, evo.account);

    if (evo.channel == channel && evo.account == account) {
        addHighlightAccountsId(children);
        catchProvinceProtocols(children);
    }
}

var arrProvince = new Set();
var arrProtocol = new Map();

function catchProvinceProtocols(children) {
    var protocol = children[7].outerText;
    var province = children[9].outerText;
    arrProtocol.set(protocol, province);
    arrProvince.add(province);
}

$scope.getAllIPAddress = function() {

    if (this.attr != "locate") { return };
    [...document.querySelectorAll('ul:not([class]):not([style])')].filter(({ children, firstElementChild }) => {
        return (children.length > 5 && firstElementChild.outerText)
    }).forEach(({ children }) => {
        //console.log(children);
        addChannelToAccountsId(children);
        //checkSensitiveUserName(children[4]);
        //checkSensitiveProtocol(children[7]);
        //checkSensitiveProvince(children[9]);
        //checkSensitiveMessages(children[5]);
        //checkSensitiveMessages(children[6]);
        //checkSensitiveMessages(children[11]);
    });

    console.log(1, 2);
    this.rows =  Array.from(arrProtocol);
    $scope.user.region = Array.from(arrProvince);
    putUser();
}






//this.regions = Array.from(arrProtocol);
//console.log(Array.from(arrProtocol));
//console.log(Array.from(arrProvince));

//$scope.user.regions = Array.from(arrProvince);