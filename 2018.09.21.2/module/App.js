define([
    'moment', 'material', 'semantic', 'Dexie',
    'factory',
    'App',
], function(moment, mdc, semantic, Dexie, factory, React) {

    //console.log(factory);
    //console.log(factory.__proto__.extensionId);
    //console.log(factory.constructor.extensionId);
    //for (var x in factory.__proto__) { console.log(x); }
    //console.log(angular.extend);
    class App extends React {
        constructor() {
            super();
            this.$module = angular.module("OBSApp");
            this.$viewer = angular.element("#View");
            this.$scope = this.$viewer.scope();
            this.$injector = this.$viewer.injector();
            this.$compile = this.$injector.get('$compile');
            this.$invoke = this.$injector.invoke;
            this.$rootScope = this.$scope.$root;
            //this.$scope.$p = this;
            this.$scope = factory;
            //factory.call(this.$scope);
            //console.log(this.$scope);
            //this.$scope = factory
            //angular.extend(this.$scope, factory)
            //console.log(this);

            /*
            console.log(factory.__proto__);
            var obj2 = $.extend(true, {}, factory.constructor);
            console.log(obj2);
            */


            //Object.assign(this.$scope, factory)


            //console.log(this.$scope.extensionId)

            //
        }



    }

    var app = new App();

    return app.$scope;



    //return angular.bootstrap(document, ["OBSApp"]);


    class Scope extends App {

        constructor() {
            super();
            //this.ctrl = parseToCtrl.call(elems);
            //this.model = parseToModel.call(elems);            
            this.url = new URL(location.href);
            this.searchParams = new URLSearchParams(location.search);
            this.params = Array.from(this.searchParams).serialize();
            this.baseUrl = require.toUrl('.');
            this.extensionId = localStorage.extensionId;
            this.channel = localStorage.channel;
            this.account = this.params.account;
            this.unique = [this.account, this.channel].join("-");
            this.operator = localStorage.operator;
            this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
            this.origin = location.origin;
            this.port = location.port;
            this.host = (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : location.host.split(".")[1];
            this.route = window.module;
            this.stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.route];
            this.components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.route];
            this.dexie = new Dexie('evo');
            console.log(this);
            //console.log(this.$mainModule);
        }


        sendMessage(message) {
            return new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(this.extensionId, message, function(res) { try { resolve(res) } catch (ex) { reject(ex) } })
            })
        }





        assign() { Object.assign(this, ...arguments) };

        apply(res) { if (!this.$$phase) { this.$apply(); }; return res; }


        injectStylesheet() {
            if (!this.stylesheet) { return false };
            this.stylesheet.map((str) => { return require.toUrl('../css/@.css').replace('@', str); }).map((src) => { $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body'); });
        };

        injectComponents() {
            if (!this.components) { return false };
            this.components.map((str) => { return require.toUrl('../html/@.html').replace('@', str); }).map((src) => {
                console.log(this);
                /*
                fetch(src).then(responseType.text).then((html) => {
                    var template = angular.element(html);
                    this.$projElement.append(template);
                    this.$compile(template)(this.$scope);
                    this.$scope.$apply();
                });*/
            });
        };


        invoke() {
            this.injectStylesheet();
            this.injectComponents();
            //console.log(this.stylesheet);
            //console.log(this.components);
        };




    }




    //return new Scope();

});



/*
function injectStylesheet() {
    if (!this.stylesheet) { return false };
    this.stylesheet.map((str) => { return require.toUrl('../css/@.css').replace('@', str); }).map((src) => { $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body'); });
};
*/


function injectComponents3243() {
    if (!this.components) { return false };
    this.components.map((str) => { return require.toUrl('../html/@.html').replace('@', str); }).map((src) => {
        console.log(this);
        /*
        fetch(src).then(responseType.text).then((html) => {
            var template = angular.element(html);
            this.$projElement.append(template);
            this.$compile(template)(this.$scope);
            this.$scope.$apply();
        });*/
    });
};


/*

function sendMessage(message) { return new Promise((resolve, reject) => { chrome.runtime.sendMessage(this.extensionId, message, function(res) { try { resolve(res) } catch (ex) { reject(ex) } }) }) }

function apply(res) { if (!this.$$phase) { this.$apply(); }; return res; }
function putUser() { return this.sendMessage({ command: "apiFunctions.store.user.put", params: this.user }).then(apply.bind(this)) }

function getUser() {
    return this.sendMessage({ command: "apiFunctions.store.user.get", params: this.unique }).then((res) => {
        if (res) { return this.apply(res) } else { return this.setUser(); }
    });
}

//function toText(res) { return res.text() };

function assign() { Object.assign(this, ...arguments) };

function trim(value) { return value.toString().trim() };

function invoke() {
    this.injectStylesheet();
    this.injectComponents();
    //console.log(this.stylesheet);
    //console.log(this.components);
};
*/


/*$digest*/