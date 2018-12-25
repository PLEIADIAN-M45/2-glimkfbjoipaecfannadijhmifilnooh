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

function s(obj) {
    console.log(obj);
}

function _small(string) {
    return string.toLowerCase();
}

function selectedOptions(obj) {
    return obj.selectedOptions[0].text.replace(/(请选择|請選擇)/, '');
}


function getUser() {
    //console.log(evo.uniqueId);
    return new Promise(function(resolve, reject) {
        evo.sendMessage({
            'command': 'evo.IndexedDB',
            'params': ['get', 'user', evo.uniqueId]
        }).then(function(res) {
            evo.user = res;
            resolve(res)
            //console.log('getUser:', evo.user);
        })
    })
}

function putUser() {
    return new Promise(function(resolve, reject) {
        console.log('putUser:', evo.user);
        evo.sendMessage({
            'command': 'evo.IndexedDB',
            'params': ['put', 'user', evo.user]
        }).then(resolve)
    })
}


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


function trim(value) { return value.trim() }

function queryMemberInfo() {
    console.log(evo.uniqueId);
    return new Promise(function(resolve, reject) {
        extension.localStorage.getItem(evo.uniqueId)
            .then(function(response) {
                //console.log(response);
                evo.user = response;
                resolve(response);
                /*if (response) {
                    evo.user = response;
                    resolve(evo.user);
                    console.log(evo.user);
                } else {
                    reject('queryMemberInfo:', response)
                }*/
            })
    })
}

function upload_1(str, _status_) {
    //开通表 https://docs.google.com/spreadsheets/d/1lbr9US1bTELbX-gOMMzNWXcz7HKOtUMycIbKhjeBABA/edit#gid=0
    //
    //console.clear();
    getUser().then(function() {
        //console.log(str, _status_);
        //console.log(evo.user);
        //if (evo.user.region == undefined) { return }
        var province = evo.user.region.map((x) => x[1]);

        var Contents = [
            str,
            null,
            null,
            null,
            null,
            evo.getTime(),
            evo.user.operator,
            evo.user.uniqueId,
            _status_,
            evo.user.banker[0].title,
            evo.user.banker[0].province,
            evo.user.banker[0].city,

            evo.user.mobile.title,
            evo.user.mobile.province,
            evo.user.mobile.city,

            evo.user.idcard.title,
            evo.user.idcard.province,
            evo.user.idcard.city,

            evo.user.region.length,
            //...evo.user.region
            ...new Set(province)
        ]


        //console.log(evo.user);
        // console.log(Contents);

        chrome.runtime.sendMessage(evo.extensionId, {
            command: 'suspension',
            params: {
                spreadSheets: '1lbr9US1bTELbX-gOMMzNWXcz7HKOtUMycIbKhjeBABA',
                sheetName: '111',
                rowContents: Contents
            }
        }, function(response, status) {
            console.log('upload_1');

        })
    })



}


function upload_2(str, _status_) {
    //console.log(str, _status_);

    //停权表
    //https://docs.google.com/spreadsheets/d/1MYiScPY7xEbO4ypmwK6yzyzr8akn-YELGlIVPWmpbag/edit#gid=1309506964
    //111
    //console.clear();

    getUser().then(function() {

        //console.log(evo.user);

        var province = evo.user.region.map((x) => x[1]);

        var Contents = [
            str,
            null,
            null,
            null,
            null,
            evo.getTime(),
            evo.user.operator,
            null,
            evo.user.uniqueId,
            evo.user.agency,
            evo.user.author.value,
            evo.user.joindate,

            evo.user.banker[0].value,
            evo.user.banker[0].province,
            evo.user.banker[0].city,

            evo.user.mobile.value,
            evo.user.mobile.province,
            evo.user.mobile.city,

            evo.user.idcard.value,
            evo.user.idcard.province,
            evo.user.idcard.city,

            evo.user.region.length,
            //...evo.user.region
            ...new Set(province)
        ]

        // console.log(evo.user);
        //console.log(Contents);

        chrome.runtime.sendMessage(evo.extensionId, {
            command: 'suspension',
            params: {
                spreadSheets: '1MYiScPY7xEbO4ypmwK6yzyzr8akn-YELGlIVPWmpbag',
                sheetName: '111',
                rowContents: Contents
            }
        }, function(response, status) {
            console.log('upload_2');

        })
    })
}

function upload_3(str, _status_) {
    //礼金表 https://docs.google.com/spreadsheets/d/1zzWv0g3ROLLlCFxgePFYMpCUgQ4JI5V1TuHWz6IdGy0/edit?pli=1#gid=42324241
    //RYAN-111 RYAN-666 RYAN-KU
    console.clear();
    //console.log(str, _status_);
    getUser().then(function() {
        var province = evo.user.region.map((x) => x[1]);
        var Contents = [
            str,
            null,
            null,
            null,
            null,
            evo.getTime(),

            evo.user.operator,
            evo.user.uniqueId,
            evo.user.f_time,
            evo.user.f_BeforeMoney,
            _status_,

            evo.user.banker[0].value,
            evo.user.banker[0].province,
            evo.user.banker[0].city,

            evo.user.mobile.value,
            evo.user.mobile.province,
            evo.user.mobile.city,

            evo.user.idcard.value,
            evo.user.idcard.province,
            evo.user.idcard.city,

            evo.user.region.length,
            //...evo.user.region
            ...new Set(province)
        ]

        // console.log(evo.user);
        //console.log(Contents);

        chrome.runtime.sendMessage(evo.extensionId, {
            command: 'suspension',
            params: {
                spreadSheets: '1zzWv0g3ROLLlCFxgePFYMpCUgQ4JI5V1TuHWz6IdGy0',
                sheetName: 'RYAN-111',
                rowContents: Contents
            }
        }, function(response, status) {
            console.log('upload_3');
        })
    })



}

function upload(searchParams) {
    console.clear();
    var wujiMarkID = searchParams.get('wujiMarkID')

    var selwujiMark = angular.fromJson(localStorage.selwujiMark);
    var _selwujiMark = selwujiMark[wujiMarkID];
    var _selMemberWarn = localStorage.selMemberWarn

    console.log(selwujiMark[wujiMarkID]);
    //evo.getTime,
    if (evo.user.region == undefined) { return }

    var province = evo.user.region.map((x) => x[1]);

    var Contents = [
        evo.user.state,
        evo.user.operator,
        evo.user.uniqueId,

        _selwujiMark,
        _selMemberWarn,

        evo.user.agency,
        evo.user.joindate,

        evo.user.author.title,

        evo.user.mobile.title,
        evo.user.mobile.province,
        evo.user.mobile.city,

        evo.user.banker[0].title,
        evo.user.banker[0].province,
        evo.user.banker[0].city,

        evo.user.idcard.title,
        evo.user.idcard.province,
        evo.user.idcard.city,

        evo.user.region.length,
        //...evo.user.region
        ...new Set(province)
    ]

    /* console.log(evo.user);
     console.log(Contents);*/

    chrome.runtime.sendMessage(evo.extensionId, {
        command: 'suspension',
        params: {
            spreadSheets: '1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY',
            sheetName: 'sheet2',
            rowContents: Contents
        }
    }, function(response, status) {
        //console.log(response);
        console.log('response');

    })
}

var createTabs = function(url) {
    window.open(url, '_blank')
    //chrome.tabs.create({ url: url })
}

//var callee = arguments.callee.name;


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

    var Regexp = function() {};
    Regexp.prototype.blacklist = new RegExp('^(*)'.replace('*', blacklist.join(separator)))
    Regexp.prototype.sensitive = new Object();
    Object.entries(sensitive).forEach(function([key, value]) {
        Regexp.prototype.sensitive[key] = new RegExp('(*)'.replace('*', value.join(separator)));
    })
    evo.regexp = new Regexp();
    return [callee, evo.regexp];
}



function requireStylesheet() {
    var callee = arguments.callee.name;
    var _stylesheets = evo.stylesheet;
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
    var _components = evo.components;
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


function getDialogModal(param, content) {
    var tmpl = {
        login: {
            title: "短信发送失败",
            icon: "error",
            status: "error",
            content: "请先登入短信发送系统",
            description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>",
        },
        success: {
            title: "簡訊發送成功",
            icon: "check_circle",
            status: "success",
            content: evo.sms,
            description: ""
        },
        blacklisk: {
            title: "銀行卡黑名單",
            icon: "error",
            status: "error",
            blacklist: content,
            description: ""
        },
        failed: {
            title: "短信发送失败",
            icon: "error",
            status: "error",
            content: "",
            description: "",
        },
        limited: {
            title: "短信发送失败",
            icon: "error",
            status: "error",
            content: "",
            description: "",
        }
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
}

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
    var callee = arguments.callee.name;
    return new Promise(function(resolve, reject) {
        if (myApp.$controller) {
            myApp.$injector.invoke(myApp.$controller)
            resolve([callee, myApp]);
        } else {
            reject('myApp.$controller is not defined.');
        }
    })
}

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