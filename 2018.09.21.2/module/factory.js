define(['angular', 'Dexie', 'apiFunction'], function(angular, Dexie, apiFunction) {



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
    /*
        function _sname(elem) { if(elem.name) { return elem.name.split("$").pop(); } if(elem.id) { return elem.id.replace('ctl00_ContentPlaceHolder1_', '') } };
        function _model(elem) {
            switch (elem.localName) {
                case 'input':
                    return trim(this.value);
                case 'select':
                    return { value: trim(this.value), text: trim(this.selectedOptions[0].label) }
                case 'button':
                    return trim(this.title);
                case 'span':
                    return trim(this.outerText);
            }
        }*/

    function s(a) { console.log(a); }

    class factory {
        constructor() {
            this.init();
            this.module = window.route;
            this.forms = document.forms;
            this.form = this.forms[0];
            this.referrer = document.referrer;
            this.extend(localStorage);
            this.extend(location);
            console.log(this.elems);
            //this.apiFunction = new apiFunction(this);
            this.channel = localStorage.channel || this.params.SiteCode;
            this.host = (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : this.host.split(".")[1]
        }
        init() { window.localStorage.__proto__.assign = this.assign; }
        get apiFunction() { return new apiFunction(this); }
        get isExit() { return this.referrer.includes('Exit') || this.referrer.includes('SignOut') }
        get params() { return Array.from(this.searchParams).serialize() }
        get route() { return window.route }
        //get operator() { return localStorage.operator; }
        //get channel() { return localStorage.channel || this.params.SiteCode }
        //get host() { return (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : this.host.split(".")[1] }
        get path() { return this.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(); }
        get searchParams() { return new URLSearchParams(this.search); }
        get responseType() { return { json(res) { return res.json() }, text(res) { return res.text() } }; }
        get xmlSpider() {
            xmlSpider.dexie = dexie;
            return xmlSpider;
        }
        get account() { return this.params.account; }
        get dexie() {
            var dexie = new Dexie('evo');
            dexie.version(1).stores({ user: 'f_accounts' });
            return dexie;
        }
        get components() { return { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.route]; }
        get stylesheet() { return { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.route]; }
        get unique() { return [this.account, this.channel].join("-") }
        get elems() { return ["span", "input", "select", "button"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id }); }
        get model() { return this.elems.map((elem) => { return [elem.sname(), elem.model()]; }).serialize(); }
        get _ctrl() { return this.elems.map((elem) => { return [elem.sname(), $(elem)]; }).serialize(); }
        trim(value) { return value.toString().trim() };
        sendMessage(message) { return new Promise((resolve, reject) => { chrome.runtime.sendMessage(this.extensionId, message, function(res) { try { resolve(res) } catch (ex) { reject(ex) } }) }) }
        invoke() {
            this.injectStylesheet();
            this.injectComponents();
        };
        extend(args) { Object.entries(args).map(([a, b]) => { this.__proto__[a] = b; }) }
        assign() { Object.assign(this, ...arguments) };
        apply(res) { if(!this.$$phase) { this.$apply(); }; return res; }
        createControllerElement() {
            var div = document.createElement('div');
            div.setAttribute('id', this.controllerId);
            div.setAttribute('ng-controller', 'projectCtrl')
            document.body.appendChild(div);
        }
        injectStylesheet() {
            if(!this.stylesheet) { return false };
            this.stylesheet.map((str) => { return require.toUrl('../css/@.css').replace('@', str); }).map((src) => { $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body'); });
        };
        injectComponents() {
            if(!this.components) { return false };
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
    }

    return new factory();
});