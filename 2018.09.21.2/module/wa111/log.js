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
        resolve([
            [],
            []
        ])
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

function addChannel() {



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



    function chooceSelf(target, account, channel) {
        console.log(target, account, channel);
    }



    function createNodeB(target, [account, channel, protocol, province]) {


        return
        if (evo.account = array[0] && evo.channel == array[1]) {
            target.style.backgroundColor = "red";
            target.style.color = "white";
        }

        target.firstChild.remove();
        array.reduce(function(accumulator, currentValue, currentIndex, array) {
            $('<b>').text(currentValue).addClass('pointer')
                .attr('data-content', accumulator + currentValue)
                .popup({ on: 'click' }).click(evo.copy)
                .appendTo(target);
            return currentValue + '-';
        }, '');
    }


    function createNodeC(arr) {
        console.log(arr);


    }


    document.querySelectorAll('ul:not([class]):not([style])').forEach((el) => {
        if (el.children.length > 5 && el.firstElementChild.outerText) {
            //var { children } = el;


            var arr = [0, 2, 7, 9].map((i) => { return el.children[i].outerText.split('-')[0]; })
            //arr.push(el.children[2])

            console.log(arr);

            
            
            
            /*arr.forEach((x) => {
                console.log(x);
            })**/


            //var [channel, $1, account, $3, $4, $5, $6, protocol, $8, province, $10, $11, $12] = el.children;
            //createNodeC([channel, account, protocol, province])



            //console.log(channel.outerText);
            /*var account = children[2].outerText;
            var channel = children[0].outerText.slice(0, 2);
            var target = children[2];*/
            /* var channel = children[0];
             var account = children[2];
             var protocol = children[7];
             var province = children[9];*/

            /*createNodeB(target, [account, channel, protocol, province]);*/

        }
    }, collection = []);
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