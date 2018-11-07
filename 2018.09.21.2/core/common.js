//var { account, channel } = evo;

function delUser() {
    var { account, channel } = evo;
    return evo.sendMessage({
        command: 'evo.store.user.delete',
        params: { account, channel }
    }).then(() => { console.log('user deleted.'); });
}

function putUser(user) {
    //console.log($scope.user);
    var _user = user || $scope.user;
    _user.unique = [_user.account, _user.channel].join('-');
    //_user.sequel=
    _user.status = _user.status.map($Num);
    _user.permit = _user.permit.map($Num);



    return evo.sendMessage({
        command: 'evo.store.user.put',
        params: _user
    }).then(bindUser)
}


function getUser() {
    var { account, channel } = evo;
    //console.log(account, channel);
    return evo.sendMessage({
        command: 'evo.store.user.get',
        params: { account, channel }
    }).then(bindUser);
}

function test(user) {
    user.author.value = "欧阳磊"
    user.idcard.value = "340122198710061671"
    user.mobile.value = "13514966818"

    user.author.value = "王杰"
    user.mobile.value = "17805182900"
    user.idcard.value = "320684199901017199"
    user.banker[0].value = "6212264301022817389"

}

function timeDiff([t1, t2]) {
    t1 = moment(t1)
    t2 = moment(t2)
    return t2.diff(t1, "day", true);
}

function $formatTime(t) {
    return moment(t).format('YYYY-MM-DD HH:mm:ss')
}

function bindUser(user) {
    return user;
}

function $Num(str) {
    return Number(str)
}

function $upper(str) {
    return str.toUpperCase();
}

function dropdownTransfer(dropdown) {
    [...dropdown.options].forEach(function({ value, label }) {
        this[value] = label;
    }, obj = {});
    return obj;
}


function google() {
    var search = {
        idcard: function(value) {
            return false;
        },
        author: function(value) {
            return goo.author.find((d) => {
                return trim(d[0]) == value;
            })
        },
        banker: function(value) {
            return goo.banker.find((d) => {
                return value.startsWith(trim(d[0]))
            })
        },
        mobile: function(value) {
            return goo.mobile.find((d) => {
                return value.startsWith(trim(d[0]))
            })
        },
        locate: function(value) {
            return goo.locate.find((d) => {
                return value.startsWith(trim(d[0]))
            })
        },
        danger: function(value) {
            return goo.danger.find((d) => {
                return value.includes(trim(d[0]))
            })
        },
        notice: function(value) {
            return goo.notice.find((d) => {
                return value.includes(trim(d[0]))
            })
        },
        region: function(value) {
            if (!value) { return }
            var { prov, city, area, country } = value
            var region = [prov, city, area, country].toString();
            return goo.region.find((d) => {
                return region.includes(trim(d[0]))
            })
        }
    }

    var goo = {};
    ["author", "banker", "mobile", "locate", "danger", "notice", "region", "sms", "idcard"].forEach(function(name) {
        this[name] = evo.decoder(localStorage[name]);
        this[name]["search"] = search[name];
    }, goo);
    return goo;
}

localStorage.idcard = []
/*
goo.idcard = []
goo.region.push(["安徽"])
*/


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

function HTMLCollection() {
    var ctrl = { select: {}, span: {}, button: {} }
    $('select').each((a, b) => {
        var name = b.name.split("$").pop();
        ctrl.select[name] = {};
        $(b).find('option').each((a, b) => { if (b.value) { ctrl.select[name][b.value] = b.label; } });
    });
    $('span').each((a, b) => { if (b.id) { ctrl.span[b.id] = b.outerText; } });
    $('button').each((a, b) => { if (b.id) { ctrl.button[b.id] = b.outerText; } });
    //if(b.attributes.onclick) { console.log(b.attributes.onclick.value); }
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


    if (evo.test) {
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

        if (this == window) { return undefined };
        if (region == undefined) { return undefined };
        var values = evo.values(region);
        if (values.length == 0) { return undefined };
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



function isEmptyObject(obj) { for (var key in obj) { return false; } return true; }

function format(t) {
    if (t) {
        var g = moment(t);
        var length = g._pf.parsedDateParts.length
        if (length == 6) {
            return g.format('YYYY/MM/DD HH:mm:ss');
        }
        if (length == 3) {
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
        if (e.data) {
            if (e.data.id === "sameBrowserList") {
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
            if (e.data) {
                if (e.data.id === "sameBrowserList") {
                    var el = document.getElementById(e.data.id);
                    el.style.height = e.data.scrollHeight + 'px';
                }
            }
        }, false);
    }
}




function error(ex) { console.log('[error] ', ex); }








var var1 = null,
    var2 = null;

var assign = Object.assign;
var entries = Object.entries;

var map = Array.prototype.map;


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