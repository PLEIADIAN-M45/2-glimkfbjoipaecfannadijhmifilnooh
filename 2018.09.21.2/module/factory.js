define(['angular', 'Dexie'], function(angular, Dexie) {

    Object.defineProperty(HTMLElement.prototype, "sname", {
        get: function() {
            if(this.name) { return this.name.split("$").pop(); } else if(this.id) { return this.id.replace('ctl00_ContentPlaceHolder1_', ''); }
        }
    })

    Object.defineProperty(HTMLElement.prototype, "model", {
        get: function() {
            switch (this.localName) {
                case 'input':
                    return trim(this.value);
                case 'select':
                    return { value: trim(this.value), text: trim(this.selectedOptions[0].label) }
                case 'button':
                    return trim(this.title);
                case 'span':
                    return trim(this.outerText);
            }
        }
    })

    Array.prototype.serialize = function() {
        try {
            var obj = {};
            this.forEach(([name, value]) => { if(name && value) { obj[name] = value } });
            return obj;
        } catch (ex) {}
    };

    Array.prototype.parseToModel = function() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); };
    Array.prototype.parseToCtrl = function() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); };

    function trim(value) { return value.toString().trim() };

    function s(a) { console.log(a); }

    return class factory extends Basic {
        constructor() {
            super();
            this.init();
            //console.log(this.params);
            //this.pathname = location.pathname;
            //this.search = location.search;
            //this.extend(location);
        }
        init() {
            window.localStorage.__proto__.assign = this.assign;
        }
        //get apiFunction() { return new apiFunction(this); }
        // get channel() { return localStorage.channel || this.params.SiteCode }
        //get server() { return (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1]; }
        get operator() { return localStorage.operator; }
        get channel() { return localStorage.channel; }
        get origin() { return location.origin; }

        get unique() { return [this.account, this.channel].join("-") }
        get account() { return this.params.account; }
        get referrer() { return document.referrer; }
        get forms() { return document.forms; }
        get form() { return document.forms[0]; }
        get isExit() { return this.referrer.includes('Exit') || this.referrer.includes('SignOut') }
        get params() { return Array.from(this.searchParams).serialize() }
        //get route() { return window.route }
        get path() { return location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(); }
        get searchParams() { return new URLSearchParams(location.search); }
        get responseType() { return { json(res) { return res.json() }, text(res) { return res.text() } }; }
        get components() { return { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.route]; }
        get stylesheet() { return { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.route]; }
        get elements() { return ["span", "input", "select", "button"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; }); }
        get model() { return this.elements.map((elem) => { return [elem.sname, elem.model]; }).serialize(); }
        get ctrl() { return this.elements.map((elem) => { return [elem.sname, elem]; }).serialize(); }


        get dexie() {
            var dexie = new Dexie('evo');
            dexie.version(1).stores({ user: 'f_accounts' });
            return dexie;
        }

        /*
        get xmlSpider() {
            xmlSpider.dexie = this.dexie;
            return xmlSpider;
        }*/

        get extensionId() { return localStorage.extensionId; }
        sendMessage(message) {
            return new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(this.extensionId, message, (res) => {
                    //console.log(res);
                    try { resolve(res) } catch (ex) { reject(ex) }
                })
            })
        }
        /*invoke() {
            this.injectStylesheet();
            this.injectComponents();
        };*/
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
            //console.log(this);
            return
            this.components.map((str) => {
                return require.toUrl(str + '.html').replace(/(wa111|ku711)/, 'html')
                //.replace('@', str);
            }).map((src) => {
                console.log(src);
                fetch(src).then(this.responseType.text).then((html) => {
                    var template = angular.element(html);
                    console.log(template);
                    this.$element.append(template);
                    this.$compile(template)(this.$scope);
                    this.$apply();
                });
            });
        };

/*
        get user() {
            function abc() {
                return this.sendMessage({
                    command: 'apiFunctions.store.user.get',
                    params: this.unique
                }).call(this)
            }

            async function abcd() {
                return await abc().call(this)
            }

            return abcd().call(this)


        }*/


        getUser() {
            return this.sendMessage({
                command: 'apiFunctions.store.user.get',
                params: this.unique
            })
        }
        putUser() {
            return this.sendMessage({
                command: 'apiFunctions.store.user.put',
                params: this.user
            })
            //.then(s)
        }
        /*
        setUser() {
            return this.sendMessage({
                command: 'apiFunctions.store.user.put',
                params: this.user
            }).then(s)
        }*/



        /*
        get user() {
            //console.log(this.unique);
            return this.sendMessage({
                command: 'apiFunctions.store.user.get',
                params: this.unique
            }).then((user) => {
                return user
                console.log(user);
            })

        }
        set user(value) {
            this.user = value;
        }
        */


    }
});



//this.channel = localStorage.channel || this.params.SiteCode;
//this.host = (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : this.host.split(".")[1]
//this.apiFunction = new apiFunction(this);
//this.port = location.port;

//get operator() { return localStorage.operator; }
//get channel() { return localStorage.channel || this.params.SiteCode }
//get host() { return (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : this.host.split(".")[1] }

/*



        bind(args) {
            Object.entries(args).map(([name, value]) => {
                this[name] = value;
                localStorage[name] = value;
            })
            //localStorage.assign(...arguments)
            //this.assign(...arguments)
            //this[name] = value;
            //localStorage[name] = value;
        }

    class responseType {
        static json(res) { return res.json() }
        static text(res) { return res.text() }
    };

 $$animate: {on: ƒ, off: ƒ, pin: ƒ, enabled: ƒ, cancel: ƒ, …}
 $$classCache: {ng-valid: true, ng-invalid: false}
 $$controls: []
 $$element: n.fn.init [form#aspnetForm.ng-pristine.ng-valid, context: form#aspnetForm.ng-pristine.ng-valid]
 $$parentForm: {$addControl: ƒ, $$renameControl: ƒ, $removeControl: ƒ, $setValidity: ƒ, $setDirty: ƒ, …}
 $$success: {}
 $dirty: false
 $error: {}
 $invalid: false
 $name: "aspnetForm"
 $pending: undefined
 $pristine: true
 $submitted: false
 $valid: true
 */



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


/*
   HTMLElement.prototype.model = function() {
       switch (this.localName) {
           case 'input':
               return trim(this.value);
           case 'select':
               return { value: trim(this.value), text: trim(this.selectedOptions[0].label) }
           case 'button':
               return trim(this.title);
           case 'span':
               return trim(this.outerText);
       }
   }

   HTMLElement.prototype.sname = function() {
       if(this.name) { return this.name.split("$").pop(); } else if(this.id) { return this.id.replace('ctl00_ContentPlaceHolder1_', ''); }
   }
   */