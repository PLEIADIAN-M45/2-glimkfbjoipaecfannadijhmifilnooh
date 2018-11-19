/********************************************************************/

var _search = function() {
    this.author = decoder(localStorage.author)
    this.locate = decoder(localStorage.locate)
    this.mobile = decoder(localStorage.mobile)
    this.banker = decoder(localStorage.banker)
    this.danger = decoder(localStorage.danger)
}


var search = new _search();
search.author.compare = function(value) { return this.find((x) => { return x[0] == value }) }
search.danger.compare = function(value) { return this.find((x) => { return value.includes(x[0]) }) }



HTMLLIElement.prototype.text = function() {
    try { return this.outerText.split("-").shift().trim(); } catch (e) {}
}

HTMLLIElement.prototype.compare = function(attr) {
    var value = this.textContent.trim();
    if(search[attr].compare(value)) { this.classList.add('danger'); }
}


function addChannelToAccountsId() {
    [$('<b>').text(this.account).attr('data-content', this.account), $('<b>').text(this.channel).attr('data-content', this.unique)]
    .forEach((el) => { el.addClass('pointer').popup({ on: 'click' }).click(copy).appendTo(this.children[2]) })
}

function checkSensitiveMessages() {
    this.children.forEach((el) => { el.compare("danger") });
}

function checkSensitiveUserName(el) { el.compare("author") }

function addHighlightAccountsId2() {

    if(this.isSelf) {
        this.children[2].removeAttribute("style");
        this.children[2].classList.add("isSelf");
    }
    this.children[2].firstChild.remove();
}


function addHighlightAccountsId(ul) {
    console.log(this);
}

var cells = $("ul:not([class]):not([style])").toArray().filter((el) => { return el.children.length > 10 && el.firstElementChild.outerText; });


//cells.forEach(addHighlightAccountsId)

Array.prototype.each = function(fn) {
    this.forEach((el) => { fn.call(el) })
}
POBLACION

KNIGHTSBRIDGE RESIDENCES
function initElement() {
    //this.account = this.children[2];
    var c = this.children;
    this.nodes   = {
        channel  : c[0],
        account  : c[2],
        protocol : c[7],
        province : c[9],
    }


    //this.account.text = this.account.text()


    /*this.channel = this.children[0].text();
    this.account = this.children[2].text();
    this.protocol = this.children[7].text();
    this.province = this.children[9].text();
    this.unique = [this.account, this.channel].join("-");
    this.isSelf = this.unique == $scope.unique;*/
    console.log(this);
}

cells.each(initElement)

//cells.each(addHighlightAccountsId)









//cells.forEach = Array.forEach


//cells.forEach(init)

/*
cells.forEach((ul) => {
   // console.log(ul);
    //var c = Array.from(ul.children);
    //console.log(this);
    /*
    addHighlightAccountsId.call(ul);
    addChannelToAccountsId.call(ul);
    checkSensitiveMessages.call(ul);
    */

/*
addChannelToAccountsId(c);
checkSensitiveMessages(c);
checkSensitiveUserName(c[4]);
*/
//});


//cells.forEach = Array.prototype.forEach.bind




//console.log($("ul:not([class]):not([style])"));



var public = cells.map((ul) => {
    try {
        return { channel: ul.children[0].text(), AccountID: ul.children[2].text(), AccountName: ul.children[4].text(), IPAddress: ul.children[7].text(), IPLocation: ul.children[9].text() }
    } catch (ex) {

    }
})



/*
function checkSensitiveProvince(el) {
    evo.decoder(localStorage.region).find(([str], index) => {
        if(el.outerText.includes(str)) { return el.classList.add('danger'); }
    });
}

function checkSensitiveProtocol(el) {
    evo.decoder(localStorage.locate).find(([str], index) => {
        if(el.outerText.startsWith(str)) { return el.classList.add('danger'); }
    });
}*/

/*
HTMLLIElement.prototype.appendChilds = function(arr) {
    arr.forEach((el, index) => { this.appendChild(el[0]) });
}*/

//this.appendChild(el[0])
//this.children[2].appendChilds();

/*function addClass() {
    this.classList.add('danger');
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
*/


/*
  var unique = [account, channel].join("-");
  ul.title = unique;
  if($scope.unique == unique) {
      addHighlightAccountsId(c);
      //catchProvinceProtocols(children);
  }
  return
  */

//arr.find(callback(element[, index[, array]])[, thisArg])





//search.author.find()







//$scope.dispatch = function() { return Promise.resolve() }
//$scope.postMessage = function() { $(function() { postScrollHeightMessage() }); }







/*
var value = this.outerText.trim();
var c = search[a].compare();
console.log(c);
this.classList.add('danger')
*/
/*
var c = search[a].find(function(x) {
    console.log(this);
    return x[0] == this
}, this.outerText);
console.log(c);*/
//try { return this.outerText.split("-").shift().trim(); } catch (e) {}













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