document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', e.target.attributes["data-content"].value);
    e.preventDefault();
});


function trim(value) { return value.toString().trim() }


var $$ = {};

function $serializeObject(selector) {
    var obj = {};
    $(selector).map(function() {
        var _name_ = this.name || this.id;
        var name = _name_.split('$').pop().replace(/\d+_?/g, '');
        switch (this.localName) {
            case 'span':
                var value = this.textContent;
                break;
            case 'select':
                if (name == "ddlCity") {
                    var value = this.selectedOptions[0].label
                } else {
                    var value = this.value;
                }
                break;
            default:
                var value = this.value;
        }
        if (obj[name] == undefined) {
            obj[name] = value;
        } else {
            if (!obj[name].push) { obj[name] = [obj[name]]; }
            obj[name].push(value);
        }
    })
    return obj;
}

function $serializeQueryString2(querystring) {
    var search = location.search.substring(1);
    JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}


//console.log(...new FormData(aspnetForm).entries());
/*
serializeObject
serializeArray
serialize
console.log($.param({ a: 3, b: 4 }));
*/





function toJson(obj) { return JSON.stringify(obj); }

function pop(name) {
    if (name.startsWith("ctl00")) {
        if (name.includes("$")) {
            return name.split("$").pop().trim();
        } else {
            return name.split("_").pop().trim();
        }
    } else { return name }
}

Array.prototype.toModel = function() {
    var obj = {};
    this.forEach((elem) => {
        if (elem.name || elem.id) {
            var name = elem.name || elem.id;
            switch (elem.localName) {
                case "select":
                    obj[pop(name)] = Array.from(elem.children).map((x) => {
                        return [x.value, x.label];
                    }).toObj();
                    obj[pop(name)]._value = elem.value;
                    obj[pop(name)]._text = elem.selectedOptions[0].label.trim();
                    break;
                case "input":
                    obj[pop(name)] = elem.value;
                    break;
                case "span":
                    obj[pop(name)] = elem.outerText.trim();
                    break;
            }
            //try { obj[pop(name)] = elem.value || elem.selectedOptions[0].label || elem.outerText; } catch (ex) {}
        }
    });
    return obj;
}

Array.prototype.toCtrls = function() {
    var obj = {};
    this.forEach((elem) => {
        if (elem.name || elem.id) {
            var name = elem.name || elem.id;
            obj[pop(name)] = elem;
        }
    })
    return obj;
}

Array.prototype.toObj = function() {
    try {
        var obj = {};
        this.forEach(([name, value]) => {
            if (name && value) { obj[trim(name)] = trim(value) }
        });
        //console.log(obj);
        return obj;
    } catch (ex) {}
}


Array.prototype.toObj2 = function(key, value) {
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


Array.prototype.counts = function(elem) {
    return this.filter((a) => { return a == elem }).length;
}


Array.prototype.has = function(elem) {
    return (this.find((a) => { return a == elem })) ? true : false;
}


//var arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
//console.log(arr.counts(5));
//console.log(arr.has(5));





/*

var counts = {};
for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
}

console.log(counts[5], counts[2], counts[9], counts[4]);
*/

function $serializeQueryString233333332(querystring) {
    if (!querystring) { return }
    if (!querystring.includes('=')) { return }
    var result = {};
    querystring.split('&').forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return result;
}


function jsonqs(str) {
    if (str.indexOf('?') == -1) { return undefined }
    try {
        var result = {};
        str.split('?')[1].split('&').forEach((pair) => {
            var [name, value] = pair.split('=');
            result[name] = value;
        });
        return result;
    } catch (ex) {
        return undefined;
    }
};


function _serialize({ href, url, postData }) {
    var obj = {};
    if (href) { if (href.includes('?')) { decodeURIComponent(href).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    if (url) { if (url.includes('?')) { decodeURIComponent(url).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    if (postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    return obj;
}


function _route() {
    var obj = { wa111: { cookie: "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2", device: "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1", }, ku711: { cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2", device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2" } } [this.host];
    for (var x in obj) { obj[x] = obj[x].replace('#1', this.channel).replace('#2', this.account); }
    return obj;
}

function _params() {
    var url = new URL(location.href);
    return Array.from(url.searchParams.entries()).toObj();
}
//this.baseUrl = require.toUrl('.');
//this.extensionId = localStorage.chrome_runtime_id;
function invoke() {
    fnStylesheet();
    fnComponents();
    console.log('_invoke......');
}

function fnStylesheet() {
    $scope.stylesheet.forEach(function(name) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./css/" + name + ".css");
        link.onload = function() { /*console.log(link.href);*/ }
        document.body.appendChild(link);
    });
}

function fnComponents() {
    if (!$scope.components) { return };
    $scope.components.forEach((name) => {
        var templateUrl = require.toUrl("./html/" + name + ".html");
        fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {

            var template = angular.element(html);
            $projElement.append(template);
            $compile(template)($scope);
            //$compile(template.contents())($scope);
            //console.log(template.contents());
            $scope.template_loaded = 1;
            $scope.$apply();
        })
    })
}

function _assign() {
    Object.assign(this, ...arguments);
    if (this.$root && !this.$$phase) { this.$apply(); }
    if (this.name == "OBSApp") { loadModules.call(this.$scope, ...arguments); return this };
    if (this == window) {};
}


window.__proto__.assign = _assign;
window.localStorage.__proto__.assign = _assign;



function loadModules({ $scope, $rootScope, $projElement, $rootElement, $injector, $invoke, $compile }) {
    this.window = window;
    this.assign = _assign;
    this.assign(localStorage);
    this.connect = function(message) { chrome.runtime.connect(this.extensionId, { name: this.channel }) }
    this.host = { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];
    this.params = _params(location);
    this.account = this.params.account || this.params.member || this.params.accountId || this.params.accounts;
    this.channel = localStorage.channel || this.params.siteNumber;
    this.route = _route.call(this);
    this.sendMessage = function(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(this.extensionId, message, function(res) {
                //console.log(res);
                try { resolve(res) } catch (ex) { reject(ex) }
            })
        })
    }

    this.pathname = location.pathname


    //console.log(this);



    //$scope.host=

    /*console.log($location);
    $scope.extensionId
    $scope.sendMessage(message) {
        message.command = message.command.replace('host', evo.host).replace('channel', evo.channel)
        return new Promise(function(resolve, reject) {
            chrome.runtime.sendMessage(evo.extensionId, message, function(res) {
                //console.log(res);
                try { resolve(res) } catch (ex) { reject(ex) }
            })
        })
    }*/



    return
    $scope.address = location.href;
    $scope.host = evo.host;
    $scope.route = evo.route;

    /*
    switch ($scope.host) {
        case "wa111":
            break;
        case "ku711":
            break;
    }
    */

    var postScrollHeightMessage = function() {
        switch ($scope.host) {
            case "wa111":
                setTimeout(() => {
                    console.log(document.body.scrollHeight);
                    window.parent.postMessage({ scrollHeight: document.body.scrollHeight + 'px' }, '*');
                }, 1000)
                break;
            case "ku711":
                $scope.$watch('ctrl.model.ResultList', function(nv, ov) {
                    if (nv) {
                        setTimeout(() => {
                            console.log(document.body.scrollHeight);
                            window.parent.postMessage({ scrollHeight: document.body.scrollHeight + 'px' }, '*');
                        }, 1000)
                    }
                })
                break;
        }
    }


    var queryInputModel = function() {
        switch ($scope.host) {
            case "wa111":
                break;
            case "ku711":
                $scope.ctrl.model.QueryInputModel.AccountID = evo.params.accounts;
                $scope.ctrl.GetQueryLoginLog(evo.params.method);
                break;
        }
    }

    var createIFrame = function(_src) {
        var addScrollHeightEventListener = function() {
            window.addEventListener('message', (e) => {
                console.log(this);
                console.log(e.data.scrollHeight);
                this.style.height = e.data.scrollHeight;
            });
        }
        $('<div>').addClass('ui horizontal divider').text('AND').appendTo($rootElement);
        $('<iframe>', { id: 'sameBrowserList', src: _src, frameborder: 0, width: '100%' }).load(addScrollHeightEventListener).appendTo($rootElement);
    }

    var createTab = function(_url) {
        console.log(_url);
        window.open(_url, "_blank");
    }




    var setPermit = function() {
        return
        switch ($scope.host) {
            case "wa111":
                $scope.ctrl.deposit.value = 1;
                $scope.ctrl.btnSaveInfo.click();
                break;
            case "ku711":
                $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                $scope.ctrl.DepositChanged();
                $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
                break;
        }
    }

    //$scope.createTab = createTab;

    $scope.events = {
        //createTab: createTab.bind($scope),
        createTab,
        createIFrame,
        setPermit,
        queryInputModel,
        postScrollHeightMessage
    }

}
//if (this.$scope) { if (!this.$scope.$$phase) { this.$scope.$apply(); } }