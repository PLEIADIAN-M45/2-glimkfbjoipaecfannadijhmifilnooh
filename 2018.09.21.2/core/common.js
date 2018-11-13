window.extend = function() { return Object.assign(this, ...arguments); }


function delUser() { return evo.sendMessage({ command: 'apiFunctions.store.user.delete', params: { account: evo.account, channel: evo.channel } }).then(() => { console.log('user deleted.'); }); }

function adjUser(user) {
    user.unique = [user.account, user.channel].join('-');
    user.status = user.status.map($Num);
    user.permit = user.permit.map($Num);
    user.author.attr = "author";
    user.locate.attr = "locate";
    user.mobile.attr = "mobile";
    user.idcard.attr = "idcard";
    user.banker.map((x) => { return assign(x, { attr: "banker" }) });
    return user;
}

function putUser(user) {
    var user = user || $scope.user;
    return evo.sendMessage({ command: 'apiFunctions.store.user.put', params: adjUser(user) }).then(bindUser)
}

function getUser() {
    //console.log(evo.account, evo.channel);
    return evo.sendMessage({ command: 'apiFunctions.store.user.get', params: { account: evo.account, channel: evo.channel } })
        .then(bindUser);
}

function bindUser(user) {
    test(user);
    return user;
}

//console.log(evo);


function getModule(objPath) {
    if (localStorage[objPath]) {
        var obj = angular.fromJson(localStorage[objPath]);
        obj._name_ = objPath;
        return Promise.resolve(obj);
    } else {
        return new Promise((resolve, reject) => {
            var object = (objPath.includes('ctrl')) ? $scope : $scope.ctrl.model;
            (function repeater(object) { var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object); if (alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else { if (typeof alphaVal == "object") { alphaVal._name_ = objPath; if (Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) }; } else { resolve(alphaVal); } } }(object));
        })
    }
}



function includes(value) {
    //console.log(value);
    console.log(this.toString());
    return this.toString().includes(trim(value[0]))
}

Array.prototype.search = function(value, mod) {
    switch (mod) {
        case 1:
            // statements_1
            break;
        case 2:
            return this.find((d) => { return value.includes(trim(d[0])) })
            break;
        default:
            // statements_def
            break;
    }
}


function api() {};
api.prototype.localStorage = function() {
    chrome.runtime.sendMessage(evo.extensionId, {
        command: "apiFunctions.localStorage"
    }, (res) => { Object.assign(localStorage, res) });
}
api.prototype.search = {
    idcard: function(value) { return undefined; },
    author: function(value) {
        var test = evo.decoder(localStorage.author).find((d) => { return trim(d[0]) == value; });
        return (test) ? test[3] + ' ' + test[1] + '-' + test[2] : test;
    },
    banker: function(value) {
        return evo.decoder(localStorage.banker).find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    mobile: function(value) {
        return evo.decoder(localStorage.mobile).find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    locate: function(value) {
        return evo.decoder(localStorage.locate).find((d) => {
            return value.startsWith(trim(d[0]))
        })
    },
    danger: function(value) {
        var arr = evo.decoder(localStorage.danger);

        return new Promise((resolve, reject) => {
            //arr.find(includes.bind(value))
            console.log(arr.search(value, 2));

            /*
            if(arr.find((d) => { return value.includes(trim(d[0])) })) {
                resolve()
            } else {
                reject()
            }*/
        })


        return evo.decoder(localStorage.danger).find((d) => {
            return value.includes(trim(d[0]))
        })
    },
    notice: function(value) {
        return evo.decoder(localStorage.notice).find((d) => {
            return value.includes(trim(d[0]))
        })
    },
    region: function(res) {
        if (!res.region) { return false }
        //var { prov, city, area, country } = res.region;
        var value = Object.values(res.region).join('');
        //console.log(value);
        //[prov, city, area, country].join('');

        if (value) {
            return evo.decoder(localStorage.region).find((d) => {
                return value.includes(trim(d[0]))
            });
        } else { return true; }
    }
}


/* Object.entries(arr).map(([name, value]) => {
    try {
        localStorage[name] = value;
        //decodeURI(atob(value))
    } catch (e) {}
});*/

var apiFunctions = new api()

console.log(apiFunctions);


function timeDiff([t1, t2]) {
    t1 = moment(t1);
    t2 = moment(t2);
    return t2.diff(t1, "day", true);
}

function $formatTime(t) { return moment(t).format('YYYY-MM-DD HH:mm:ss') }

function $Num(str) { return Number(str) }

function $upper(str) { return str.toUpperCase(); }


function $serializeQueryString(_url) {
    _url = decodeURIComponent(_url);
    var obj = {};
    if (_url.includes('?')) {
        _url.split('?')[1].split('&').map((x) => { return x.split('='); })
            .forEach(([name, value]) => { obj[name] = value; });
    } else {
        _url.split('&').map((x) => { return x.split('='); })
            .forEach(([name, value]) => { obj[name] = value; });
    }
    return obj;
}

function dropdownTransfer(dropdown) {
    [...dropdown.options].forEach(function({ value, label }) {
        this[value] = label;
    }, obj = {});
    return obj;
}



var auto_clean = function() {
    $('input[type=text]').focus(function() { this.value = ""; });
}

var auto_select = function() {
    $('input[type=text]').focus(function() { this.select(); });
}

function isEmptyObject(obj) { for (var key in obj) { return false; } return true; }

function s(obj) { console.log(obj); return obj }

function _small(string) { return string.toLowerCase(); }

function selectedOptions(obj) { return obj.selectedOptions[0].text.replace(/(请选择|請選擇)/, ''); }

function getElementById(d) { return document.getElementById(d); }


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




var createTabs = function(url) {
    window.open(url, '_blank')
    //chrome.tabs.create({ url: url })
}

function createDDL(elem) {
    return Object.assign({}, ...[...elem.children].map(({ value, outerText }) => {
        return {
            [value]: outerText
        }
    }));
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


function log(i) {
    var fn = ['getController', 'getPhoneDate', 'getExtraInfo', 'updateUserStatus', 'putUser']
    console.log(fn[i]);
}



/*
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
}*/


/*
$scope.$watch('ctrl.model.ResultList', function(nv, ov) {   
})
*/
/*
var scrollHeight = new function() {

    this.postMessage = function() {
        var scrollHeight = document.body.scrollHeight + 250;
        console.log(location.href);
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
                    console.log(e);
                    var el = document.getElementById(e.data.id);
                    el.style.height = e.data.scrollHeight + 'px';
                }
            }
        }, false);
    }
}
*/
function error(ex) { console.log('[error] ', ex); }
var var1 = null,
    var2 = null;
var assign = Object.assign;
var entries = Object.entries;
var map = Array.prototype.map;







function test(user) {
    if (evo.test && user) {
        user.author.value = "欧阳磊"
        user.idcard.value = "340122198710061671"
        user.mobile.value = "13514966818"
        user.author.value = "王杰"
        user.mobile.value = "17805182900"
        user.idcard.value = "320684199901017199"
        user.banker[0].value = "6212264301022817389"
        user.author.value = "陈林";
        user.author.value = "王杰";
        user.mobile.value = "13514966818";
    }
}
/*
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
            if(!value) { return }
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
*/

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