function addClass() {
    this.classList.add('danger');
}

function checkSensitiveMessages(el) {
    //console.log(el.outerText);
    var c = apiFunctions.search.danger(el.outerText).then(addClass.bind(el))
    //console.log(el.outerText, c);
    /*
        evo.decoder(localStorage.danger).find((str) => {
            console.log(str);

            if(el.outerText.includes(str)) { return el.classList.add('danger'); }
        });*/
}

function addHighlightAccountsId(children) {
    var account = children[2].outerText;
    var channel = children[0].outerText.split('-').shift();
    children[2].style.backgroundColor = "#01579b";
    children[2].style.color = "white";
}

function addChannelToAccountsId2(children) {
    var account = children[2].outerText;
    var channel = children[0].outerText.split('-').shift();
    children[2].firstChild.remove();
    createElement([account]).appendTo(children[2]);
    createElement([channel, account]).appendTo(children[2]);

    //console.log(channel, account, evo.channel, evo.account);

    if(evo.channel == channel && evo.account == account) {
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




/********************************************************************/

HTMLLIElement.prototype.text = function() {
    try { return this.outerText.split("-").shift().trim(); } catch (e) {}
}




var cells = Array.from($("ul:not([class]):not([style])")).filter((el) => { return el.children.length > 10 && el.firstElementChild.outerText; });

var public = cells.map((ul) => { try { return { channel: ul.children[0].text(), AccountID: ul.children[2].text(), AccountName: ul.children[4].text(), IPAddress: ul.children[7].text(), IPLocation: ul.children[9].text() } } catch (ex) {} })


function checkSensitiveProvince(el) {
    evo.decoder(localStorage.region).find(([str], index) => {
        if(el.outerText.includes(str)) { return el.classList.add('danger'); }
    });
}

function checkSensitiveProtocol(el) {
    evo.decoder(localStorage.locate).find(([str], index) => {
        if(el.outerText.startsWith(str)) { return el.classList.add('danger'); }
    });
}

function checkSensitiveUserName(el) {
    evo.decoder(localStorage.author).find(([str]) => {
        console.log(str);
        if(str.trim() == el.outerText) { el.classList.add('danger'); }
    });
}

function createElement(value) { return $('<b>').text(value[0]).addClass('pointer').popup({ on: 'click' }).click(copy).attr('data-content', value.reverse().join('-')) }

function addChannelToAccountsId(c, ul) {
    var channel = c[0].text();
    var account = c[2].text();
    createElement([account]).appendTo(c[2]);
    createElement([channel, account]).appendTo(c[2]);
    c[2].firstChild.remove();
}

/*
  var unique = [account, channel].join("-");
  ul.title = unique;
  if($scope.unique == unique) {
      addHighlightAccountsId(c);
      //catchProvinceProtocols(children);
  }
  return
  */



cells.forEach((ul, i) => {
    //console.log(el.children.length);
    addChannelToAccountsId(ul.children, ul);
});




//$scope.dispatch = function() { return Promise.resolve() }
//$scope.postMessage = function() { $(function() { postScrollHeightMessage() }); }




















$scope.getAllIPAddress = function() {

    return
    var c = $("ul:not([class]):not([style])");

    if(this.attr != "locate") { return };
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
    this.rows = Array.from(arrProtocol);
    $scope.user.region = Array.from(arrProvince);
    putUser();
}




//this.regions = Array.from(arrProtocol);
//console.log(Array.from(arrProtocol));
//console.log(Array.from(arrProvince));

//$scope.user.regions = Array.from(arrProvince);