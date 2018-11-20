function checkSensitiveUserWarn() {
    //if(search.danger.compare(this.remarks)) { this.children[11].type = 'danger' }
}


NodeList.prototype.each = function(callback) {
    return this.forEach(function(elem, i) {
        return callback(elem, i)

        return callback.call(elem, i)
    });
}

function customElement(a, b) { return $('<b>').text(a).attr('data-content', b).addClass('pointer').popup({ on: 'click' }).click(copy); }

function addChannelToAccountsId(i, c) { $(this.children[2]).empty().append([customElement(this.account, this.account), customElement(this.channel, this.unique)]); }

function addHighlightAccountsId() { if(this.unique == $scope.unique) { this.type = "self"; } }

function checkSensitiveMessages() {
    if(search.danger.compare(this.peril)) { this.children[5].type = 'danger' }
    if(search.danger.compare(this.black)) { this.children[6].type = 'danger' }
    if(search.danger.compare(this.remarks)) { this.children[11].type = 'danger' }
}

function checkSensitiveUserName(a) {
    //console.log(a);
    if(search.author.compare(this.author)) { this.children[4].type = 'danger' }
}

function checkSensitiveProvince() { if(search.region.compare(this.address)) { this.children[9].type = 'danger' } }


String.prototype.exec = function(regex) {
    //console.log(this.toString());
    var str = this.toString();
    var r = str.match(regex);
    return (r) ? r[0] : r;
}


function parseToRegion(str) { return { prov: str.exec(regex.prov), city: str.exec(regex.city) } }

$("li").each((i, el) => {
    el.text = el.outerText.split("-").shift().trim();
    el.removeAttribute('style')
});



//.toArray();
//.each((i, ul) => { $(ul.children).each((i, el) => { el.text = el.outerText.split("-").shift().trim(); }); })
//cells.owners = cells.filter((i, x) => { return x.children[2].text == $scope.account && x.children[0].text.startsWith($scope.channel) })
var cells = $("ul:not([class]):not([style])").filter((i, ul) => { return ul.children.length > 10 && ul.firstElementChild.outerText; })
var header = $(".TrHead>li").map((i, x) => { return x.outerText; })
var dh = ["分站名", "代理", "登入帳號", "加入日期", "匯款戶名", "當前模式", "黑名单", "IP", "最後登入日期", "IP地址", "手机归属地", "一機多登備註", "總輸贏查詢"];
var dd = ["channel", "agency", "account", "joindate", "author", "peril", "black", "protocol", "lastdate", "address", "mobile.locate", "remarks", "result"];
var dt = cells.map((i, x) => {
    var obj = {};
    [...x.children].map((c, i) => { try { obj[dd[i]] = c.outerText.trim(); } catch (e) {} });
    obj.province = parseToRegion(obj.address).prov;
    obj.city = parseToRegion(obj.address).city;
    // obj.region = parseToRegion(obj.address)
    obj.channel = obj.channel.split("-").shift()
    obj.unique = [obj.account, obj.channel].join("-");
    //x.danger = true
    Object.assign(x, obj);
    //x.children[2].type = "danger"
    return obj;
});

/*
cells.each(addChannelToAccountsId);
cells.each(addHighlightAccountsId);
cells.each(checkSensitiveUserName);
cells.each(checkSensitiveProvince);
cells.each(checkSensitiveMessages);
*/

console.log($(".TrHead").children());

var cell = {}

$(".TrHead").children().each(function(i, el) {
    var selector = `li:nth-child(${i+1})`;
    //console.log(selector);
    cell[dd[i]] = document.querySelectorAll(selector)
    //cell[dd[i]] = cell[dd[i]] || []
    //cell[dd[i]].push($("ul>li").eq(i))
});

//console.log(cell);

console.log(cell.author);

search.author.push(["王杰"])

function checkSensitiveUserName2(a) {
    //console.log(this.text);
    if(search.author.compare(this.text)) { this.type = 'danger' }
}

//cell.author.each(checkSensitiveUserName2)


cell.author.each(sensitive.author.lookup)


var Sensitive = function() {

}

//Sensitive.prototype.

//(function(callback) {});



//cell.author.forEach(function(element, index) {    console.log(element);});

//console.log(dd[i]);


//$('li:nth-child(11)').hide()
//cells.children('li:nth-child(5)').each(checkSensitiveUserName);





//cells.children('li:nth-child(2)').each(addChannelToAccountsId);



//console.log(cells.children('li:nth-child(2)'));


//console.log(cells);


/*
cells.forEach(addChannelToAccountsId.bind(cells));
cells.forEach((x) => {
    console.log(x.children[2]);
});
*/

//console.log($("ul").eq(3).attr("danger"));



console.log(dt);

$scope.cells = cells;
$scope.dt = dt;
$scope.dd = dd;



/*
cells.each(function() {
});


    return

    console.log(this.children[0].text);
    this.channel = this.children[0].text;
    this.account = this.children[2].text;
    this.author = this.children[4].text;
    //this.protocol = this.children[7].text;
    //this.province = this.children[9].text;
    //console.log(this.region);
    //this.children[9].text;
    this.IPAddress = this.children[7].text;
    this.IPLocation = this.children[9].text;
    this.unique = this.account + "-" + this.channel;*/

/*addHighlightAccountsId.call(this);
addChannelToAccountsId.call(this);
checkSensitiveUserName.call(this.children[4]);
checkSensitiveMessages.call(this.children[5]);
checkSensitiveMessages.call(this.children[6]);
checkSensitiveMessages.call(this.children[11]);
*/
/*var region = {
    prov: str.match(regex.prov),
    city: str.match(regex.city)
}*/

/*
    this.region = this.children[9];
    this.region.prov = this.region.text.exec(regex.prov)
    this.region.city = this.region.text.exec(regex.city)
*/

//parseToRegion(this.children[9].text)
//search.region.compare.call(this.children[9])
//search.region.compare.call(this.region)
//console.log(this.region);


//checkSensitiveProvince.call(this.children[9]);
//checkSensitiveProvince.call(this);




//console.log(cells.children("li:nth-child(8)"));

//cells.protocol = cells.children("li:nth-child(8)")

//var ces = document.querySelectorAll("ul:not([class]):not([style])")
/*
.filter((x) => {
    return x.firstElementChild.outerText;
})
*/

/*
console.log(cells);
console.log(cells.owners);
*/

/*
var ce = {};
ce.protocol = cells.owners.children('li:nth-child(8)');
ce.province = cells.children('li:nth-child(10)');
*/
//document.querySelectorAll("li:nth-child(8)")
//document.querySelectorAll("li:nth-child(10)")

//console.log(ce);


//var cv = ce.province.map(parseToRegion)

//console.log(cv);
//console.log(ce.province);


//cells.IPLocation = $("ul>li:nth-child(8)")



/*
var public = cells.map((ul) => {
    try {
        return {
            channel: ul.children[0].text(),
            AccountID: ul.children[2].text(),
            AccountName: ul.children[4].text(),
            IPAddress: ul.children[7].text(),
            IPLocation: ul.children[9].text()
        }
    } catch (ex) {

    }
})
*/

//var owners = cells.filter(function() { return this.unique = $scope.unique })












/*
HTMLLIElement.prototype.text = function() {
    try { return this.outerText.split("-").shift().trim(); } catch (e) {}
}

HTMLLIElement.prototype.compare = function(attr) {
    var value = this.textContent.trim();
    if (search[attr].compare(value)) { this.classList.add('danger'); }
}
*/


//console.log(cells);


//console.log(owners);


//addHighlightAccountsId.call(cells)



//cells.unique = $scope.unique;

//cells.each(addHighlightAccountsId)







/*
cells.go = function(fn) {
    //console.log(this);
    return this.map((i, el) => {
        fn.call(el.children)
        return el.children
        //console.log(el.children);
    })
}


cells.go(addHighlightAccountsId)
*/
//console.log(var1, var2);


//cells

//console.log(cells);
//var children = cells.children().toArray();
//console.log(children);


//.toArray().filter((el) => { return el.children.length > 10 && el.firstElementChild.outerText; });
//console.log(cells);
//console.log(cells);

/*
cells.each(function() {
    console.log(this);
})
*/


//cells


//8DB6E236-E84D-4746-A93E-61AB8E2039D4




//var cells2 = $("ul:not([class]):not([style])").toArray()
//cells2.forEach(function() { console.log(this); })




/*
cells.forEach((ul) => {

    ul.children.namedItem("fuck")
    var children = ul.children;
    //console.log(children[2]);
    console.log(children);
    // var item = children.namedItem("fuck");



    //var item = collection[str];

    //addHighlightAccountsId.call(ul.children);




    //console.log(this);
    //console.log(this);
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

//addHighlightAccountsId.call(cells)



/*
cells.forEach((ul) => {
    //console.log(this);
    //return ul.children
}, ...cells)

cells.forEach(addHighlightAccountsId, ...cells)
*/
//console.log(c);

//Array.forEach.bind(cells)

//cells.forEach


//c(addHighlightAccountsId)


//cells.forEach(addHighlightAccountsId)
/*
function initElement() {
    //this.account = this.children[2];
    var c = this.children;

    this.nodes   = {
        channel  : c[0],
        account  : c[2],
        protocol : c[7],
        province : c[9],
    }

    this.channel =



    this.account.text = this.account.text()
    this.channel = this.children[0].text();
    this.account = this.children[2].text();
    this.protocol = this.children[7].text();
    this.province = this.children[9].text();
    this.unique = [this.account, this.channel].join("-");
    this.isSelf = this.unique == $scope.unique;
    console.log(this);
}
*/

//cells.each(initElement);
//cells.each(addHighlightAccountsId);

/*
Array.prototype.each = function(fn) {
    this.forEach((el) => {
        fn.call(el)
    })
}
*/


//cells.each(addHighlightAccountsId)




/*
addChannelToAccountsId()

function Words(sentence) {
    this.sentence = sentence;
    this.count = {};
    this.countWords();
}

Words.prototype = {
    countWords: function() {
        var words = this.sentence.split(/\W+/);
        words.forEach(this.addToCount);
    },
    addToCount: function(word) {
        word = word.toLowerCase();
        if (word == '') return;
        if (word in this.count)
            this.count[word] += 1;
        else
            this.count[word] = 1;
    }
}

words.forEach(this.addToCount.bind(this));
words.forEach(this.addToCount, this);
*/

/*
var module = {
    x: 42,
    getX: function() {
        return this.x;
    }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
*/


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