var { account, channel } = evo;

function putUser() { return evo.sendMessage({ command: 'evo.store.user.put', params: evo.user }) }

function getUser() { return evo.sendMessage({ command: 'evo.store.user.get', params: { account, channel } }).then(bindUser); }

function delUser() { return evo.sendMessage({ command: 'evo.store.user.delete', params: { account, channel } }).then(s); }

function bindUser(user) {
    return evo.user = user;
}



























//var google = {};

async function start() {

    /*   chrome.runtime.sendMessage(evo.extensionId, {
           command: "localStorage:getItem"
       }, function(res) {
           //console.log(res);

           //try { resolve(res) } catch (ex) { reject(ex) }
       })*/

    return
    /*
        var danger = await evo.localStorage.getItem('danger')
        var notice = await evo.localStorage.getItem('notice')
        var region = await evo.localStorage.getItem('region')
        var sms = await evo.localStorage.getItem('sms')*/


    /*
    var mobile = await evo.localStorage.getItem('mobile')
    var banker = await evo.localStorage.getItem('banker')
    var locate = await evo.localStorage.getItem('locate')
    var author = await evo.localStorage.getItem('author')
*/
    //console.log(notice);
    //console.log(sms);


}


async function start2() {




    var separator = String.fromCharCode(124);
    var blacklist = await extension.localStorage.getItem('blacklist');
    var sensitive = await extension.localStorage.getItem('sensitive');
    evo.sensitive = sensitive;
    evo.accusation = await extension.localStorage.getItem('accusation');

    var protocol = await extension.localStorage.getItem('IPAddress')

    //evo.sensitive.protocol = await extension.localStorage.getItem('IPAddress')

    evo.sensitive.protocol = protocol.map(([x]) => x)

    evo.sensitive.full = sensitive.area.concat(sensitive.word);
    var author = await extension.localStorage.getItem('accusation');
    author.splice(0, 2);

    var banker = await extension.localStorage.getItem('blacklist');
    var locate = await extension.localStorage.getItem('IPAddress');
    var region = evo.sensitive.area;
    var mobile = await extension.localStorage.getItem('BlackPhone');

    evo.sensitive.province = evo.sensitive.area;


    if(evo.test) {
        /*
                author.push(["徐章庭", "A695000035", "26", "惡意投訴人", "異審-書辭"])
                region.push(['云南'])
                region.push(['湖南'])
                region.push(['湖北'])
                banker.push(['62290837'])
                locate.push(['116.53.197.240'])
            */
        region.push(['云南'])
        region.push(['浙江'])
        author.push(['達比'])
        locate.push(['115.231.231.120'])
        author.push(["王杰", "A695000035", "26", "惡意投訴人", "異審-書辭"])

    }






    var notice = sensitive.word.concat(sensitive.warn);
    notice.search = function(value) {
        return this.find(([str]) => {
            return value.includes(str)
        })
    }

    region.search = function(region) {
        //console.log(region);

        if(this == window) { return undefined };
        if(region == undefined) { return undefined };
        var values = evo.values(region);
        if(values.length == 0) { return undefined };
        var value = values.join('').trim();
        var expression = this.separate();
        var re = new RegExp(expression, 'g');
        return value.match(re);
    }

    author.search = function(value) {
        return this.find(([user]) => {
            return trim(user) == trim(value);
        })
    }
    banker.search = function(value) {
        return this.find(([x]) => {
            return value.startsWith(trim(x))
        })
    }
    mobile.search = function(value, me) {
        return this.find(([x]) => {
            return value.startsWith(trim(x))
        })
    }
    locate.search = function(value, num = 4) {
        return this.find(function([x]) {
            return trim(x).startsWith(this);
        }, value.split('.').slice(0, num).join('.')) || false;
    }



    evo.assign(google, { author, banker, locate, region, mobile, notice })


    var Regexp = function() {};
    Regexp.prototype.blacklist = new RegExp('^(*)'.replace('*', blacklist.join(separator)))
    Regexp.prototype.sensitive = new Object();
    Object.entries(sensitive).forEach(function([key, value]) {
        Regexp.prototype.sensitive[key] = new RegExp('(*)'.replace('*', value.join(separator)));
    })

    evo.regexp = new Regexp();
}



var auto_clean = function() {
    $('input[type=text]').focus(function() {
        $('input[type=text]').val('')
        //this.value = '';
    });
}

var auto_select = function() {
    $('input[type=text]').focus(function() {
        this.select();
    });
}

function s(obj) { console.log(obj); return obj }

function _small(string) { return string.toLowerCase(); }

function selectedOptions(obj) { return obj.selectedOptions[0].text.replace(/(请选择|請選擇)/, ''); }

function getElementById(d) { return document.getElementById(d); }

function createDDL(elem) {
    return Object.assign({}, ...[...elem.children].map(({ value, outerText }) => {
        return {
            [value]: outerText
        }
    }));
}


function log(i) {
    var fn = ['getController', 'getPhoneDate', 'getExtraInfo', 'updateUserStatus', 'putUser']
    console.log(fn[i]);
}



function isEmptyObject(obj) { for(var key in obj) { return false; } return true; }

function format(t) {
    if(t) {
        var g = moment(t);
        var length = g._pf.parsedDateParts.length
        if(length == 6) {
            return g.format('YYYY/MM/DD HH:mm:ss');
        }
        if(length == 3) {
            return g.format('YYYY/MM/DD');
        }
    } else { return t }
}


function trim(value) { return value.toString().trim() }


var createTabs = function(url) {
    window.open(url, '_blank')
    //chrome.tabs.create({ url: url })
}


function scrollHeightListener() {
    window.addEventListener('message', function(e) {
        if(e.data) {
            if(e.data.id === "sameBrowserList") {
                var el = document.getElementById(e.data.id);
                el.style.height = e.data.scrollHeight + 'px';
            }
        }
    }, false);
}

function scrollHeightPoster() {
    var scrollHeight = document.body.scrollHeight + 50;
    console.log('iframe scrollHeight:', scrollHeight);
    window.parent.postMessage({
        id: 'sameBrowserList',
        scrollHeight: scrollHeight
    }, '*');
}


var scrollHeight = new function() {
    this.postMessage = function() {
        var scrollHeight = document.body.scrollHeight + 50;
        console.log('iframe scrollHeight:', scrollHeight);
        return window.parent.postMessage({
            id: 'sameBrowserList',
            scrollHeight: scrollHeight
        }, '*');
    }
    this.listener = function() {
        return window.addEventListener('message', function(e) {
            if(e.data) {
                if(e.data.id === "sameBrowserList") {
                    var el = document.getElementById(e.data.id);
                    el.style.height = e.data.scrollHeight + 'px';
                }
            }
        }, false);
    }
}




function error(ex) { console.log('[error] ', ex); }






var map = Array.prototype.map;


var var1 = null,
    var2 = null;

var assign = Object.assign;
var entries = Object.entries;


Array.prototype.toObj = function(key, value) {
    var object = {};
    this.map((x) => { object[x[key]] = x[value]; });
    return object;
}

Array.prototype.separate = function() {
    return '(' + this.join('|') + ')';
}

Array.prototype.hyphen = function() {
    return this.join('-');
}

Array.prototype.serialize = function() {
    var obj = {};
    this.map(([longname, value], index) => {
        var name = longname.replace('ctl00$ContentPlaceHolder1$', '');
        Object.defineProperty(obj, name, { value, writable: true });
    });
    return obj;
}



Array.prototype.toPath = function() {
    return this.join('/');
}




//$('<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">').appendTo('head');






/*
return new Promise(function(resolve, reject) {
    if(evo.user.region == undefined) { evo.user.region = [] };
    //console.log('putUser', evo.user);
})
*/

/*
blacklist
accusation
BlackPhone
sensitive
IPAddress
*/

/*
locate
banker
author
mobile
region
notice
*/