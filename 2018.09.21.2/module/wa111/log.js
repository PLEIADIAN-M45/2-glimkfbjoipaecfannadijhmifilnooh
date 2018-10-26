var dispatch = function() {
    return Promise.resolve()
}

function checkSensitiveProvince() {
    document.querySelectorAll("li:nth-of-type(10)").forEach((el) => {
        if (el.outerText) {
            var test = google.region.search(el.outerText)
            if (test) { el.classList.add('danger'); }
        }
    })
}

function checkSensitiveProtocol() {
    document.querySelectorAll("li:nth-of-type(8)").forEach((el) => {
        if (el.outerText) {
            var test = google.locate.search(el.outerText)
            if (test) { el.classList.add('danger'); }
        }
    })
}

function checkSensitiveUserName() {
    document.querySelectorAll("li:nth-of-type(5)").forEach((el) => {
        if (el.outerText) {
            var test = google.author.search(el.outerText)
            if (test) { el.classList.add('danger'); }
        }
    })
}


function checkSensitiveWords() {
    document.querySelectorAll("li:nth-of-type(12)").forEach((el) => {
        if (el.outerText) {
            var test = google.warning.search(el.outerText)
            if (test) {
                el.classList.add('danger');
                console.log(test);
            }
        }
    })
}

function checkSensitiveWords3() {
    return
    document.querySelectorAll("li").forEach((el) => {
        var str = el.outerText.trim();
        if (str.match(evo.regexp.sensitive.full)) {
            el.classList.add('danger');
        } else {
            console.log(str);
        }
    })
}



function getAllIPAddress(scope) {

    /*checkSensitiveProvince();
    checkSensitiveProtocol();
    checkSensitiveUserName();*/



    var arrProvince = new Set();

    var arrProtocol = new Map();


    console.log(arrProtocol);


    function createNodeB(target, [channel, account, protocol, province]) {
        target.firstChild.remove();

        if (evo.account = account && evo.channel == channel) {
            target.style.backgroundColor = "#01579b";
            target.style.color = "white";

            //arrProtocol.push({ protocol, province });
            arrProtocol.set({ protocol, province });
            arrProvince.add(province);
        }

        [account, channel].reduce(function(accumulator, currentValue, currentIndex, array) {
            $('<b>').text(currentValue).addClass('pointer')
                .attr('data-content', accumulator + currentValue)
                .popup({ on: 'click' }).click(evo.copy)
                .appendTo(target);
            return currentValue + '-';
        }, '');
    }



    document.querySelectorAll('ul:not([class]):not([style])').forEach((el) => {
        if (el.children.length > 5 && el.firstElementChild.outerText) {
            var target = el.children[2];
            var array = [0, 2, 7, 9].map((i) => { return el.children[i].outerText.split('-')[0]; })
            createNodeB(target, array);
        }
    }, collection = []);



    //console.log(arrProvince);
    //console.log(arrProtocol);

    //console.log(arrProtocol);



    evo.user.region = Array.from(arrProvince);

    scope.extend({ rows: Array.from(arrProtocol) });

    console.log(scope);

    console.log(Array.from(arrProtocol));
}




























/*
var getFrameUrl = function() {
    var callee = arguments.callee.name;
    return location.origin + '/sameBrowserList.aspx?iType=3&accounts={accountId}&siteNumber={siteNumber}'
        .replace('{accountId}', evo.params.member).replace('{siteNumber}', evo.params.siteNumber);
}*/



function createElement(text) {
    var node = document.createElement("B");
    var textnode = document.createTextNode(text);
    node.setAttribute('data-content', text)
    node.appendChild(textnode);
    node.onclick = function() { alert(text) }
    return node;
    target.appendChild(node);
    //document.getElementById("myList").appendChild(node);
}



//chooceSelf(target, account, channel);
//chooceSelf(children[0], children[2])
//if (channel == evo.channel) { el.title = [account, channel].join('-') }

















/* createElement(target, account);
 createElement(target, channel);*/


/*
var node = document.createElement("B");
var textnode = document.createTextNode(account);
node.setAttribute('data-content', account)
node.appendChild(textnode);
node.onclick = function() { alert(account) }
children[2].appendChild(node);

var node = document.createElement("B");
var textnode = document.createTextNode(channel);
node.setAttribute('data-content', channel)
node.onclick = function() { alert(account + channel) }
node.appendChild(textnode);
children[2].appendChild(node);
*/