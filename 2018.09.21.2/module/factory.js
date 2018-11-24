define(['Dexie', 'apiFunction'], function(Dexie, apiFunction) {
    //console.log(apiFunction);
    Array.prototype.serialize = function() {
        try {
            var obj = {};
            this.forEach(([name, value]) => { if(name && value) { obj[name] = value } });
            return obj;
        } catch (ex) {}
    };
    Array.prototype.parseToModel = function() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); };
    Array.prototype.parseToCtrl = function() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); };
    class responseType {
        static json(res) { return res.json() }
        static text(res) { return res.text() }
    };

    function _sname(elem) { if(elem.name) { return elem.name.split("$").pop(); } if(elem.id) { return elem.id.replace('ctl00_ContentPlaceHolder1_', '') } };

    function _model(elem) {
        switch (elem.localName) {
            case 'input':
                return trim(elem.value);
            case 'select':
                return { value: trim(elem.value), text: trim(elem.selectedOptions[0].label) }
            case 'button':
                return trim(elem.title);
            case 'span':
                return trim(elem.outerText);
        }
    };

    function createControllerElement() {
        var div = document.createElement('div');
        div.setAttribute('id', this.controllerId);
        div.setAttribute('ng-controller', 'projectCtrl')
        document.body.appendChild(div);
    }

    function parseToModel() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); };

    function parseToCtrl() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); };

    function injectStylesheet() {
        if(!this.stylesheet) { return false };
        this.stylesheet.map((str) => {
            var src = require.toUrl(".").replace(/(wa111|ku711)/, 'css') + str + '.css';
            $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
        });
    }

    function injectComponents() {
        if(!this.components) { return false };
        this.components.map((str) => {
            var src = require.toUrl(".").replace(/(wa111|ku711)/, 'html') + str + '.html';
            fetch(src).then(responseType.text).then((html) => {
                var template = angular.element(html);
                this.$view.append(template);
                this.$compile(template)(this);
                this.$apply();
            });
        })
    };

    function sendMessage(message) { return new Promise((resolve, reject) => { chrome.runtime.sendMessage(this.extensionId, message, function(res) { try { resolve(res) } catch (ex) { reject(ex) } }) }) }

    function apply(res) { if(!this.$$phase) { this.$apply(); }; return res; }

    function putUser() { return this.sendMessage({ command: "apiFunctions.store.user.put", params: this.user }).then(apply.bind(this)) }

    function getUser() {
        return this.sendMessage({ command: "apiFunctions.store.user.get", params: this.unique }).then((res) => {
            if(res) { return this.apply(res) } else { return this.setUser(); }
        }); /*$digest*/
    }

    function assign() { Object.assign(this, ...arguments) };

    function trim(value) { return value.toString().trim() };

    function invoke() { this.injectStylesheet();
        this.injectComponents(); };

    var elems = ["span", "input", "select", "button"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id }).filter((elem) => {
        elem.sname = _sname(elem);
        elem.model = _model(elem);
        return !elem.id.startsWith('_');
    });
    var ctrl = parseToCtrl.call(elems);
    var model = parseToModel.call(elems);
    var url = new URL(location.href);
    var searchParams = new URLSearchParams(location.search);
    var params = Array.from(searchParams).serialize();
    var baseUrl = require.toUrl('.');
    var extensionId = localStorage.extensionId;
    var channel = localStorage.channel;
    var account = params.account;
    var unique = [account, channel].join("-");
    var operator = localStorage.operator;
    var path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
    var origin = location.origin;
    var port = location.port;
    var host = (port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [port] : location.host.split(".")[1];
    var route = window.module;
    var stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [route];
    var components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [route];
    var dexie = new Dexie('evo');
    dexie.version(4).stores({ user: 'f_accounts' });
    xmlSpider.dexie = dexie;
    window.localStorage.__proto__.assign = assign;

    function Factory() {
        Object.entries({ ctrl, model, elems, baseUrl, extensionId, channel, account, unique, operator, url, searchParams, path, origin, port, host, route, dexie, stylesheet, components, }).map(([key, value]) => { this[key] = value; });
        [
            invoke, injectStylesheet, injectComponents,
            assign, trim, putUser, getUser, sendMessage, apply
        ].map((Func) => { this[Func.name] = Func.bind(this); });
        [apiFunction].map((classFunc) => { this[classFunc.name] = new classFunc(this) });
    }
    return Factory;
});









function s(a) {
    console.log(a);
}
/*class user { constructor() { this.account = account;
          this.channel = channel;
          this.unique = unique;
          this.operator = operator;
          this.origin = origin;
          this.host = host; } get() {} set() {} }*/