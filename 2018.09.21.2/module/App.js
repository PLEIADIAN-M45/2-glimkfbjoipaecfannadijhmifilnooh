define([

    'moment', 'Dexie', 'material', 'semantic',
    'factory',
    'App',

], function (moment, Dexie, mdc, semantic, factory, React) {

    class ResponseType {
        json(res) { return res.json() }
        text(res) { return res.text() }
    }
    var responseType = new ResponseType();

    class App extends React {
        constructor() {
            super();
            this.$mainModule = angular.module("OBSApp");
            this.$rootElement = document.getElementById('View') || document;
            this.$projElement = angular.element(this.$rootElement);
            this.$scope = this.$projElement.scope();
            this.$injector = this.$projElement.injector();
            this.$invoke = this.$injector.invoke;
            this.$compile = this.$injector.get('$compile');
            console.log(this.$scope);
        }
        invoke() {

        }
    }

    return window.Evo = new App();
})



function s(o) {
    console.log(o);
}





class scope23434 {


    /*
    var c = Object.assign(a, b)
    console.log(c);
    console.log(c.account);
    console.log(b.account);
    */
    //console.log(new scope());
    //console.log(this.$scope.account);
    /*
    var s = new scope()
    console.log(this.$scope);
    console.log(new scope());
    */
    /*
    this.$scope.channel = this.channel;
    this.$scope.account = this.account;
    this.$scope.host = this.host;
    this.$scope.origin = this.origin;
    this.$scope.dexie = this.dexie;
    this.$scope.unique = this.unique;
    this.$scope.sendMessage = this.sendMessage;
    this.$scope.extensionId = this.extensionId;*/
    //console.log(this.params);

    constructor(ss) {

        console.log(ss);


        //console.log(window.module);
        //console.log(this.stylesheet);
        //console.log(this.route);
        // console.log(this);

        /*this.extensionId = localStorage.extensionId;
        this.account = this.params.account;
        this.channel = localStorage.channel;
        this.unique = this.account + '-' + this.channel;
        this.operator = localStorage.operator;
        this.port = location.port;
        this.origin = location.origin;
        this.url = new URL(location.href)*/

        this.route = window.module;
        this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.dexie = this.dexie();


        console.log(this);
    }

    //init() { console.log(this); }
    /*get extensionId() { return localStorage.extensionId }
    get channel() { return localStorage.channel }
    get account() { return this.params.account }
    get unique() { return this.account + '-' + this.channel }
    get operator() { return localStorage.operator }
    path() { return location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase() }*/
    get searchParams() { return new URLSearchParams(location.search) }
    get params() { return Array.from(this.searchParams).serialize(); }
    get url() { return new URL(location.href) }
    get origin() { return location.origin }
    get baseUrl() { return require.toUrl('.') }
    get port() { return location.port; }
    get host() { return (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : location.host.split(".")[1]; }
    //get route() { return window.module }
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

    injectStylesheet() {
        if (!this.stylesheet) { return false };
        this.stylesheet.map((str) => { return require.toUrl('./module/css/@.css').replace('@', str); }).map((src) => {
            $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
        });
    }

    injectComponents() {
        if (!this.components) { return false };
        this.components.map((str) => { return require.toUrl('./module/html/@.html').replace('@', str); }).map((src) => {
            fetch(src).then(responseType.text).then((html) => {
                var template = angular.element(html);
                this.$projElement.append(template);
                this.$compile(template)(this.$scope);
                this.$scope.$apply();
            });
        });
    }


    sendMessage(cmd) { return new Promise((resolve, reject) => { chrome.runtime.sendMessage(this.extensionId, cmd, resolve) }) }

    putUser() {
        return this.sendMessage({
            command: 'apiFunctions.store.user.put',
            params: this.user
        }).then(s)
    }

    exec() {
        this.injectStylesheet();
        this.injectComponents();
    }
}











//get module() { return [this.host, this.route].join("/") }
//get module() { return [this.route].join("/") }





//510322198610197228

/*
return {
    home: function() {},
    list: function() {},
}

*/


function createCtrlElement(controllerId) {
    var div = document.createElement('div');
    div.setAttribute('id', controllerId);
    div.setAttribute('ng-controller', 'projectCtrl');
    document.body.appendChild(div);
    return div;
}


/*

var components = {
    "edit": ['edit', 'dialog'],
    "logs": ['cards']
}
var stylesheet = {
    "edit": ['edit'],
    "logs": ['logs', 'cards']
}
for (var x in components) { components[x] = components[x].map((name) => { return `${localStorage.baseUrl}/html/${name}.html`; }) }
for (var x in stylesheet) { stylesheet[x] = stylesheet[x].map((name) => { return `${localStorage.baseUrl}/css/${name}.css`; }) }
    */




/*

;
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
    else if (typeof define === 'function' && define.amd) define([], factory);
    else if (typeof exports === 'object') exports["evo"] = factory();
    else root["evo"] = factory();
})(this, function() {
    return {
        a: 5
    }

})
*/