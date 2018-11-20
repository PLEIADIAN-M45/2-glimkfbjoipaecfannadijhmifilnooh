define([
    'angular', 'angular-sanitize',
    'moment', 'Dexie', 'material', 'semantic', 'module/factory', 'module/' + host + '/App'
], function(angular, sanitize, moment, Dexie, mdc, semantic, factory, React) {


    class ResponseType {
        json(res) { return res.json() }
        text(res) { return res.text() }
    }
    var responseType = new ResponseType();

    //510322198610197228
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
            //console.log(this.route);
            //console.log(this.route);
            //this.exec();

        }

        get baseUrl() { return require.toUrl('.') }
        get host() { return location.host.split(".")[1]; }
        get path() { return location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(); }

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



        get module() {
            return ['module', this.host, this.route].join("/")

        }



        exec() {
            this.injectStylesheet();
            this.injectComponents();
        }





    }










    return new App()
})


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