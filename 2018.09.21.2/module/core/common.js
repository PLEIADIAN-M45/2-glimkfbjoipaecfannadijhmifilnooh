function putUser() {
    return new Promise(function(resolve, reject) {
        if (evo.user.region == undefined) { evo.user.region = [] };
        evo.sendMessage({ command: 'evo.store.user.put', params: evo.user }).then(resolve);
    })
}

function getUser(params) {
    return new Promise(function(resolve, reject) {
        if (params) {
            var account = params.f_accounts || params.AccountID || params.account;
            var channel = params.channel || evo.channel;
        } else { var { account, channel } = evo; }

        evo.sendMessage({ command: 'evo.store.user.get', params: { account, channel } })
            .then((user) => { return evo.user = user; }).then(resolve);
    })
}

function delUser() {
    var { account, channel } = evo;
    evo.sendMessage({ command: 'evo.store.user.delete', params: { account, channel } }).then(s);
}


var google = {};
async function start() {
    var separator = String.fromCharCode(124);
    var blacklist = await extension.localStorage.getItem('blacklist');
    var sensitive = await extension.localStorage.getItem('sensitive');
    evo.sensitive = sensitive;
    evo.accusation = await extension.localStorage.getItem('accusation');
    evo.sensitive.protocol = await extension.localStorage.getItem('IPAddress')
    evo.sensitive.full = sensitive.area.concat(sensitive.word);
    var author = await extension.localStorage.getItem('accusation');
    author.splice(0, 2);
    var banker = await extension.localStorage.getItem('blacklist');
    var locate = await extension.localStorage.getItem('IPAddress');
    var region = evo.sensitive.area;
    var mobile = await extension.localStorage.getItem('BlackPhone')
    region.search = function() {
        if (this == window) { this.region.test = 1 };
        if (this.region == undefined) {}
        var { prov, city, area, ctry } = this.region;
        var value = [prov, city, area, ctry].join('').trim();
        if (value) {
            var expression = region.separate();
            var re = new RegExp(expression, 'g');
            this.region.test = value.match(re);
        } else { this.region.test = 1; }
        return this;
    }

    author.search = function(value) {
        var result = {};
        this.find((x, index, array) => {
            var [username, account, channel, meta] = x;
            if (username.trim() == value) {
                var test = account + '-' + channel;
                return result = { test, index, meta };
            }
        })
        return result;
    }

    banker.search = function(value) {
        return this.find(([x], i, array) => {
            if (value.startsWith(trim(x))) {
                var arr = array[i];
                arr.test = true;
                arr.index = i;
                arr.text = x;
                arr.meta = '黑名单'
                return true;
            }
        })
    }

    mobile.search = function(value) {
        return this.find(([x], i, array) => {
            if (value.startsWith(trim(x))) {
                var arr = array[i];
                arr.test = true;
                arr.index = i;
                arr.text = x;
                arr.meta = '黑名单'
                return true;
            }
        })
    }
    locate.search = function(value, num = 4) {
        var arr = value.split('.');
        var val = arr.slice(0, num).join('.')
        return this.find((x, i, array) => {
            var compare = x[0].trim();
            if (compare.startsWith(val)) {
                var arr = array[i];
                arr.test = true;
                arr.index = i;
                arr.text = val;
                arr.meta = '黑名单'
                return true;
            }
        })
    }


    google.sheets = { author, banker, locate, region, mobile }
    var Regexp = function() {};
    Regexp.prototype.blacklist = new RegExp('^(*)'.replace('*', blacklist.join(separator)))
    Regexp.prototype.sensitive = new Object();
    Object.entries(sensitive).forEach(function([key, value]) {
        Regexp.prototype.sensitive[key] = new RegExp('(*)'.replace('*', value.join(separator)));
    })
    evo.regexp = new Regexp();
}


document.oncopy = function(e) {
    if (window.getSelection().type === "Caret") {
        e.preventDefault();
        if (e.clipboardData) {
            e.clipboardData.setData("text/plain", evo.copyText);
            // console.clear();
            //console.log('目前剪贴板内容：', evo.copyText.toString());
        } else if (window.clipboardData) {
            window.clipboardData.setData("Text", evo.copyText);
        }
    }
};

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






var map = Array.prototype.map;


var var1 = null,
    var2 = null;

var assign = Object.assign;
var entries = Object.entries;

evo.assign = Object.assign;
evo.values = Object.values;
evo.keys = Object.keys;
evo.entries = Object.entries;

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