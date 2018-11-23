define(['Dexie'], function(Dexie) {
    Array.prototype.serialize = function() {
        try {
            var obj = {};
            this.forEach(([name, value]) => { if(name && value) { obj[name] = value } });
            return obj;
        } catch (ex) {}
    }

    Array.prototype.parseToModel = function() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); }
    Array.prototype.parseToCtrl = function() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); }

    function _sname(elem) { if(elem.name) { return elem.name.split("$").pop(); } if(elem.id) { return elem.id.replace('ctl00_ContentPlaceHolder1_', '') } }

    function _model(elem) {
        switch (elem.localName) {
            case 'input':
                return elem.value;
            case 'select':
                return { value: elem.value, text: elem.selectedOptions[0].label }
            case 'button':
                return elem.title;
            case 'span':
                return elem.outerText;
        }
    }

    var elems = ["span", "input", "select", "button"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id }).filter((elem) => {
        elem.sname = _sname(elem);
        elem.model = _model(elem);
        return !elem.id.startsWith('_');
    });



    function parseToModel() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); }

    function parseToCtrl() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); }

    var ctrl = elems.parseToCtrl();
    var model = elems.parseToModel();

    function injectStylesheet() {
        if(!this.stylesheet) { return false };
        this.stylesheet.map((str) => { return require.toUrl('./module/css/@.css').replace('@', str); }).map((src) => { $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body'); });
    }

    function injectComponents() {
        if(!this.components) { return false };
        this.components.map((str) => { return require.toUrl('./module/html/@.html').replace('@', str); }).map((src) => {
            fetch(src).then(responseType.text).then((html) => {
                var template = angular.element(html);
                this.$projElement.append(template);
                this.$compile(template)(this.$scope);
                this.$scope.$apply();
            });
        });
    }

    function toText(res) { return res.text() }

    function assign() { Object.assign(this, ...arguments) }

    function trim(value) { return value.toString().trim() }

    function invoke() {

    }

    var baseUrl = require.toUrl('.');
    var extensionId = localStorage.extensionId;
    var channel = localStorage.channel;
    var operator = localStorage.operator;
    var url = new URL(location.href);
    var searchParams = new URLSearchParams(location.search);
    var params = Array.from(searchParams).serialize();
    var path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
    var origin = location.origin;
    var port = location.port;
    var host = (port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [port] : location.host.split(".")[1];
    var route = window.module;
    var dexie = new Dexie('evo');
    dexie.version(1).stores({ user: 'f_accounts' });

    var stylesheet = {
        "edit": ['edit'],
        "logs": ['logs', 'cards']
    } [route];

    var components = {
        "edit": ['edit', 'dialog'],
        "logs": ['cards']
    } [route];




    window.localStorage.__proto__.assign = assign;


    function Factory($scope) {;

        var obj = {
            ctrl,
            model,
            elems,
            baseUrl,
            extensionId,
            channel,
            operator,
            url,
            searchParams,
            path,
            origin,
            port,
            host,
            route,
            route,
            dexie,
            invoke,
            injectStylesheet,
            injectComponents,
            toText,
            assign,
            trim,
        }


        for(var key in obj) {
            $scope[key] = obj[key]
        }



        console.log($scope);



    }

    return Factory;
});







/*

get extensionId() { return localStorage.extensionId }
get channel() { return localStorage.channel }
get account() { return this.params.account }
get unique() { return this.account + '-' + this.channel }
get operator() { return localStorage.operator }
path() { return location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase() }
get searchParams() { return new URLSearchParams(location.search) }
get params() { return Array.from(this.searchParams).serialize(); }
get url() { return new URL(location.href) }
get origin() { return location.origin }
get baseUrl() { return require.toUrl('.') }
get port() { return location.port; }
get host() { return (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : location.host.split(".")[1]; }
get route() { return window.module }
dexie() {
    var store = new Dexie('evo');
    store.version(1).stores({ user: 'f_accounts' });
    return store;
}
get stylesheet() {
    return {
        "edit": ['edit'],
        "logs": ['logs', 'cards']
    } [this.route];
}

get components() {
    return {
        "edit": ['edit', 'dialog'],
        "logs": ['cards']
    } [this.route];
}
*/

 /*
        [
            baseUrl,
            extensionId,
            channel,
            operator,
            url,
            searchParams,
            path,
            origin,
            port,
            host,
            route,
            route,
            dexie,
            invoke,
            injectStylesheet,
            injectComponents,
            toText,
            assign,
            trim,
        ].forEach((fn) => { $scope[fn.name] = fn; });
        */

/*
[
    function injectStylesheet() {
        if (!this.stylesheet) { return false };
        this.stylesheet.map((str) => { return require.toUrl('./module/css/@.css').replace('@', str); }).map((src) => {
            $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
        });
    },
    function injectComponents() {
        if (!this.components) { return false };
        this.components.map((str) => { return require.toUrl('./module/html/@.html').replace('@', str); }).map((src) => {
            fetch(src).then(responseType.text).then((html) => {
                var template = angular.element(html);
                this.$projElement.append(template);
                this.$compile(template)(this.$scope);
                this.$scope.$apply();
            });
        });
    },
    function toText(res) { return res.text() },
    function assign() { Object.assign(this, ...arguments) },
    function trim(value) { return value.toString().trim() },
].forEach((x) => { $scope[x.name] = x; });
*/
/*
function elems() {
    return ["span", "input", "select", "button"].map((el) => {
        return Array.from(document.querySelectorAll(el))
    }).flat().filter((elem) => { return elem.name || elem.id }).filter((elem) => { return !elem.id.startsWith('_') })
},
*/
//HTMLInputElement.prototype.val = function() { return this.value }
//HTMLInputElement.prototype.abbr = function() { return this.value }
//[HTMLInputElement, HTMLSpanElement, HTMLButtonElement, HTMLSelectElement].forEach(function(el, index) { el.prototype.abbr = });
//var model = parseToModel(elements)
//console.log(model);
//console.log(this.$scope);
/*$scope.ctrl = elements.toCtrls();
$scope.elems = elements.toCtrls();
$scope.model = elements.toModel();*/

function xxx() {

    Array.prototype.toModel = function() {
        var obj = {};
        this.forEach((elem) => {
            if(elem.name || elem.id) {
                var name = elem.name || elem.id;
                switch (elem.localName) {
                    case "select":
                        /*obj[pop(name)] = Array.from(elem.children).map((x) => {return [x.value, x.label];}).toObj();*/
                        obj[pop(name)] = {};
                        obj[pop(name)].value = elem.value;
                        obj[pop(name)].text = elem.selectedOptions[0].label.trim();
                        break;
                    case "input":
                        obj[pop(name)] = elem.value;
                        break;
                    case "span":
                        obj[pop(name)] = elem.outerText.trim();
                        break;
                }
            }
        });
        return obj;
    }

    Array.prototype.toCtrls = function() {
        var obj = {};
        this.forEach((elem) => {
            if(elem.name || elem.id) {
                var name = elem.name || elem.id;
                obj[pop(name)] = elem;
            }
        })
        return obj;
    }
}