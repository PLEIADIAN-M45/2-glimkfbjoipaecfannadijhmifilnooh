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

function s(obj) { console.log(obj); }

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


var var1 = null,
    var2 = null;

var assign = Object.assign;
var entries = Object.entries;

evo.assign = Object.assign;
evo.values = Object.values;
evo.keys = Object.keys;
evo.entries = Object.entries;

/*
String.prototype.json = function() {
    var value = this.valueOf();
    return json(value);
}
*/



function getMemberBankAccsEnum() {
    //var { code1, code2, code3, code4, code5 } = evo.ctrl.code;
    return evo.ctrl.code;
}

function log(i) {
    var fn = ['getController', 'getPhoneDate', 'getExtraInfo', 'updateUserStatus', 'putUser']
    console.log(fn[i]);
}


//String.prototype.json = function() {};
var map = Array.prototype.map;

var re = () => {
    return Promise.resolve(x);
}

function isEmptyObject(obj) { for (var key in obj) { return false; } return true; }



function format(t) {
    // var formater = ['YYYY/MM/DD', 'YYYY/MM/DD HH:mm:ss'][f];
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



function putUser() {
    
    return new Promise(function(resolve, reject) {
        console.log('putUser', evo.user);


        if (evo.user.region == undefined) { evo.user.region = [] };
        
        evo.sendMessage({ command: 'evo.store.user.put', params: evo.user }).then(resolve);
    })
}

async function getUserAsync(params) {
    var c = await getUser({
        account: "GHG5T85",
        channel: "26"
    }).then((x) => {
        console.log(x);
    })
    //console.log(c);
    //return c
}
/*
function getSystemLog(user) {
    return new Promise((resolve, reject) => {
        var account = evo.account;
        console.log('account', account);
        // user.AccountID || user.account
        evo.sendMessage({
            command: 'apiFunctions:SystemLog:host:channel',
            params: { account }
        }).then(([res, status, active]) => {
            //console.log(res);
            resolve(res)
        })
    })
}
*/

function getUser(params) {

    return new Promise(function(resolve, reject) {

        if (params.f_accounts || params.AccountID || params.account) {
            var account = params.f_accounts || params.AccountID || params.account;
            var channel = params.channel || evo.channel;
        } else {
            var { account, channel } = evo;
        }

        console.log(account, channel);

        evo.sendMessage({ command: 'evo.store.user.get', params: { account, channel } })
            .then((user) => {
                evo.user = user;
                //console.log('getUser:', user);
                return user;
            }).then(resolve);
    })
}


function delUser() {
    var { account, channel } = evo;
    evo.sendMessage({ command: 'evo.store.user.delete', params: { account, channel } }).then(s);
}


async function start() {
    var callee = arguments.callee.name;
    var separator = String.fromCharCode(124);
    var blacklist = await extension.localStorage.getItem('blacklist');
    var sensitive = await extension.localStorage.getItem('sensitive');
    //console.log(sensitive.area);
    evo.sensitive = sensitive;
    evo.accusation = await extension.localStorage.getItem('accusation');
    //evo.protocol = await extension.localStorage.getItem('IPAddress');
    evo.sensitive.protocol = await extension.localStorage.getItem('IPAddress')
    sensitive.full = sensitive.area.concat(sensitive.word);

    //console.log(evo.sensitive);

    var author = await extension.localStorage.getItem('accusation');
    author.splice(0, 2);

    var banker = await extension.localStorage.getItem('blacklist');
    var locate = await extension.localStorage.getItem('IPAddress');
    var region = evo.sensitive.area;

    if ((evo.test)) {
        author.push(['王杰', 'F6261', '26', '恶意投诉人'])
        author.push(['张凯', 'F6261', '26', '恶意投诉人'])
        region.push('北京')
        region.push('湖南')
        region.push('四川')
        region.push('湖南')
        //region.push('贵州')
        //region.push('四川')
        //region.push('浙江')
        /*region.push('四川')
        region.push('重庆')*/
    }

    //var values = Object.values(this).filter((x) => x);
    //console.log(this.property, values.length, values);



    /*var mobile = [];
    mobile.search = function() {
        return
    }*/

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
        //value = '621700166000599999999999'
        return this.find(([x], i, array) => {
            if (value.startsWith(trim(x))) {
                var arr = array[i];
                arr.index = i;
                arr.text = x;
                arr.meta = '黑名单'
                return true;
            }
        })
    }

    locate.search = function(value, num = 4) {
        //value = "116.20.62.75"
        var arr = value.split('.');
        var val = arr.slice(0, num).join('.')
        return this.find((x, i, array) => {
            var compare = x[0].trim();
            if (compare.startsWith(val)) {
                var arr = array[i];
                arr.index = i;
                arr.text = val;
                arr.meta = '黑名单'
                return true;
            }
        })
    }

    google.sheets = { author, banker, locate, region }
    //console.log(google.sheets);

    var Regexp = function() {};
    Regexp.prototype.blacklist = new RegExp('^(*)'.replace('*', blacklist.join(separator)))
    Regexp.prototype.sensitive = new Object();
    Object.entries(sensitive).forEach(function([key, value]) {
        Regexp.prototype.sensitive[key] = new RegExp('(*)'.replace('*', value.join(separator)));
    })
    evo.regexp = new Regexp();
    return [callee, evo.regexp];
}

/*
function storeMemberInfo() {
    return new Promise(function(resolve, reject) {
        if (evo.user.uniqueId) {
            extension.localStorage.setItem(evo.user.uniqueId, evo.user)
                .then(function(response) {
                    console.log('storeUserInfo:', evo.user);
                    resolve(response)
                })
        } else {
            reject('storeUserInfo')
        }
    })
}

function queryMemberInfo() {
    console.log(evo.uniqueId);
    return new Promise(function(resolve, reject) {
        extension.localStorage.getItem(evo.uniqueId)
            .then(function(response) {
                //console.log(response);
                evo.user = response;
                resolve(response);
            })
    })
}

function bgstoreMemberInfo() {
    return new Promise(function(resolve, reject) {
        if (evo.user.uniqueId) {
            extension.localStorage.setItem(evo.user.uniqueId, evo.user)
                .then(function(response) {
                    console.log('storeUserInfo:', evo.user);
                    resolve(response)
                })
        } else {
            reject('storeUserInfo')
        }
    })
}

*/





function trim(value) { return value.trim() }

//function upload_1(str, _status_, log) {

var createTabs = function(url) {
    window.open(url, '_blank')
    //chrome.tabs.create({ url: url })
}

//var callee = arguments.callee.name;

var google = {

}


/*

Array.prototype.separate = function() {
    //console.log(this);
    return '(' + this.join('|') + ')';
}*/

/*
Object.defineProperty(object1, x[key], {
    value: x[value],
    writable: false
});
*/

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

/*
’   Apostrophe  撇號
（）   Bracket (英式) / Parentheses (美式)    括號
 ：   Colon  冒號
 ，   Comma  逗號
 －   Dash   破折號
 …   Ellipsis   省略號
 ！   Exclamation Mark (英式) / Point (美式) 感嘆號
 .   Full Stop (英式) / Period (美式)   句號
 《　》     Guillemets 書名號
 –   Hyphen 連字號
？    Question Mark  問號
 ＂＂  Quotation Mark 引號
；    Semicolon  分號
/    Slash  斜線
*/

/*
_.assign(objA, objB);


Object.prototype.extend = function(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
};
*/


/*

作者：舞动乾坤
链接：https://juejin.im/post/59e36511518825693d7b4e03
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

*/



/*banker = banker.map((x, i) => { return x[0].trim() })
locate = locate.map((x, i) => { return x[0].trim() })
author = author.map((x) => { return [x[0].trim(), x[1] + '-' + x[2], x[3]] })*/
//var res = regexp.constructor;
//console.log(res);

function version2() {
    author.search = function(value) {
        return this.find((x) => {
            var compare = x[0].trim();
            if (value == compare) {
                var result = {};
                result.text = x[1] + '-' + x[2]
                result.meta = x[3];
                return result;
            }
        })
        //return result;
    }

    banker.search = function(value) {
        return
        //var result = {};
        this.find((x, i) => {
            var compare = x[0].trim();
            if (value.startsWith(compare)) {
                var result = {};
                result.text = compare;
                result.meta = i;
                return result;
            }
        })
        return result;
    }

    locate.search = function(value, num = 4) {
        return

        var arr = value.split('.');
        var val = arr.slice(0, num).join('.')
        //var result = {};
        this.find((x) => {
            var compare = x[0].trim();
            if (compare.startsWith(val)) {
                var result = {};
                result.text = compare;
                result.meta = i;
                return result;
            }
        })
        return result;
    }

}


function requireStylesheet() {
    var callee = arguments.callee.name;
    var _stylesheets = $scope.stylesheet;
    return Promise.all(
        _stylesheets.map(function(stylesheetName, index) {
            return new Promise(function(resolve, reject) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = evo.baseUrl + 'css/' + stylesheetName + '.css';
                document.body.appendChild(link);;
                resolve(stylesheetName)
            })
        })
    ).then(function(d) {
        return [callee, d]
    }).catch(function(ex) {
        return ex;
    })

}

function requireComponents() {
    //console.log(array);
    var callee = arguments.callee.name;
    var _components = $scope.components;
    return Promise.all(
        _components.map(function(templateName, index) {
            return new Promise(function(resolve, reject) {
                var templateUrl = evo.baseUrl + "Components/" + templateName + ".html";
                fetch(templateUrl).then(function(response) {
                    return response.text()
                }).then(async function(templateHTML) {
                    await templateCompier(templateHTML, templateName)
                    resolve(templateName)
                })
            })
        })
    ).then(function(d) {
        return [callee, d]
    })
}

function templateCompier(templateHTML, templateName) {
    return new Promise(function(resolve, reject) {
        if (templateHTML) {
            var event = new Event('compile');
            var element = document.createElement('myApp-template-' + evo.time.value());

            element.addEventListener('compile', function compilerFunction() {
                myApp.$compile(this)(myApp.$scope);
                myApp.$target.append(this);
                resolve(templateName);
            })

            element.innerHTML = templateHTML;
            element.dispatchEvent(event);
        } else {
            reject(templateName)
        }
    });
}

/*
function getDialogModal(param, content) {
    var tmpl = {
        "1": {
            title: "短信发送失败",
            icon: "error",
            status: "error",
            content: "请先登入短信发送系统",
            description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>",
        },
        "0": {
            title: "簡訊發送成功",
            icon: "check_circle",
            status: "success",
            content: evo.sms,
            description: ""
        },
        "101": {
            title: "短信发送失败",
            icon: "error",
            status: "error",
            content: "",
            description: "",
        },
        "102": {
            title: "短信发送失败",
            icon: "error",
            status: "error",
            content: "",
            description: "",
        },
        "blacklisk": {
            title: "銀行卡黑名單",
            icon: "error",
            status: "error",
            blacklist: content,
            description: ""
        },

    }
    return tmpl[param];
}

function showModalDialog(status, content) {

    if (status == 'blacklisk') {
        content.forEach(function(d, index) {
            content[index] = {
                match: d[0],
                value: d.input
            }
        })
        //console.log(content);
    }

    myApp.$scope.mdcDialog = getDialogModal(status, content);
    myApp.$scope.$apply();
    var dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
    dialog.listen('MDCDialog:accept', function() {
        //console.log('accepted');
    })
    dialog.listen('MDCDialog:cancel', function() {
        //console.log('canceled');
    })
    dialog.show();
}*/

function scrollHeightListener() {
    window.addEventListener('message', function(e) {
        if (e.data) {
            if (e.data.id === "sameBrowserList") {
                //console.log(e);
                var el = document.getElementById(e.data.id);
                el.style.height = e.data.scrollHeight + 'px';
            }
        }
    }, false);
}

function scrollHeightPoster() {
    var scrollHeight = document.body.scrollHeight + 50;
    //console.log('iframe scrollHeight:', scrollHeight);
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
        //console.log('listener');
        return window.addEventListener('message', function(e) {
            console.log(e);
            if (e.data) {
                //console.log(e.data);
                if (e.data.id === "sameBrowserList") {
                    var el = document.getElementById(e.data.id);
                    el.style.height = e.data.scrollHeight + 'px';
                }
            }
        }, false);
    }
}



function bootstrap() {
    return start().then(requireStylesheet).then(requireComponents).then(bootstrap2)
    /*.then(function() {

    })
    */
}


function bootstrap2() {
    return new Promise(function(resolve, reject) {
        if (myApp.$controller) {
            myApp.$injector.invoke(myApp.$controller)
            resolve(myApp);
        } else {
            reject('myApp.$controller is not defined.');
        }
    })
}

/*
function bootstrap() {
    return new Promise(function(resolve, reject) {
        if (myApp.$controller) {
            myApp.$injector.invoke(myApp.$controller)
            resolve(myApp);
        } else {
            reject('myApp.$controller is not defined.');
        }
    })
}
*/

function trace(d) {
    //console.log(d)
    return d;
}

function errorHandler(ex) {
    console.log('[error] ', ex);
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}