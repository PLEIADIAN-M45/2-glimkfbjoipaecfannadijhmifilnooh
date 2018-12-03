
    return class factory extends Basic {

        constructor($scope) {
            super();

            this.operator = localStorage.operator;
            this.channel = localStorage.channel;
            this.origin = localStorage.origin;




            this.init();


            Object.assign($scope, this)

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
        //get operator() { return localStorage.operator; }
        //get channel() { return localStorage.channel; }
        //get origin() { return location.origin; }

        get unique() { return [this.account, this.channel].join("-") }
        get account() { return this.params.account; }
        get referrer() { return document.referrer; }
        get forms() { return document.forms; }
        get form() { return document.forms[0]; }
        get isExit() { return this.referrer.includes('Exit') || this.referrer.includes('SignOut') }
        //get params() { return Array.from(this.searchParams).serialize() }
        //get route() { return window.route }
        //get path() { return location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(); }
        // get searchParams() { return new URLSearchParams(location.search); }
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
        invoke() {
            //console.log(this.$apply);
            //this.injectStylesheet();
            //this.injectComponents();
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
            console.log(this.$apply);
            return

            if(!this.components) { return false };
            //console.log(this);
            this.components.map((str) => {
                return require.toUrl(str + '.html').replace(/(wa111|ku711)/, 'html')
            }).map((src) => {
                console.log(src);
                fetch(src).then(this.responseType.text).then((html) => {
                    var template = angular.element(html);
                    console.log(this);
                    //console.log(template);

                    /*this.$element.append(template);
                    this.$compile(template);
                    this.$apply();*/
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

    return class factory extends Basic {

        constructor() {
            super();
            // console.log();

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
        //get path() { return location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(); }
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
        invoke() {
            //console.log(this.$apply);
            //this.injectStylesheet();
            //this.injectComponents();
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
            console.log(this.$apply);
            return

            if(!this.components) { return false };
            //console.log(this);
            this.components.map((str) => {
                return require.toUrl(str + '.html').replace(/(wa111|ku711)/, 'html')
            }).map((src) => {
                console.log(src);
                fetch(src).then(this.responseType.text).then((html) => {
                    var template = angular.element(html);
                    console.log(this);
                    //console.log(template);

                    /*this.$element.append(template);
                    this.$compile(template);
                    this.$apply();*/
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




//console.log(expect);

//var info = injector.modules['ngAnimate'].info();
//fn, self, locals, serviceName






/*

var injector = angular.injector(["ng"]);
console.log(injector);
var someFunction = function($rootScope, $injector, $compile, $http) {
    //console.log($injector);
    console.log($rootScope.feff21);
    console.log($compile);
    //console.log($injector);
    //console.log($http);
    //console.log($rootScope);
};
injector.invoke(someFunction);
console.log(new OBSApp());

*/
/*

    function MyController($scope, $route) {
        console.log('+++++++++++');
        console.log($scope);
    }

    injector.annotate(MyController)
*/






/*
   console.log(abc);
   var someFunction = function($rootScope, $http) {
       console.log($rootScope, $http);
       return "called!";
   };

   abc.run(function($rootScope, $injector) {
       console.log($rootScope, $injector);
       $rootScope.annotations = $injector.annotate(someFunction);
       $rootScope.message = $injector.invoke(someFunction);
   });*/




/*

var App = new OBSApp();
var $scope = App.$scope;
return App.$scope;
*/











/*this.setUser = function() {
    this.user = {
        unique: this.unique,
        host: this.host,
        origin: this.origin,
        operator: this.operator,
        channel: this.channel,
        account: this.account,
    }
    return Promise.all([
        apiFunction.getUserModel.call(this.user),
        apiFunction.getPhoneDate.call(this.user),
        apiFunction.getSystemLog.call(this.user),
        apiFunction.getUserStore.call(this.user)
    ]).then(putUser);
};*/



// console.time('label');

/*
this.user = await getUser();
console.log(this.user);
this.invoke();
*/

//console.log(this);
//console.timeEnd('label');




//var m                  = this.model;
/*this.user              = {
    unique               : this.unique,
    host                 : this.host,
    origin               : this.origin,
    operator             : this.operator,
    channel              : this.channel,
    account              : this.account,
    timing               : [],
    equpmt               : {},
    birthday             : m.birthday,
    status               : [m.ishow.value],
    permit               : [m.isOpenDeposit.value],
    author               : { title: m.txtRemittaceName, value: m.txtRemittaceName },
    locate               : { title: m.lblIp, value: m.lblIp },
    mobile               : { title: m.txtPhoto, value: m.txtPhoto },
    idcard               : { title: m.txtIdCard, value: m.txtIdCard },
    banker               : [
        { title          : m.txtRemittanceAccount111, value: m.txtRemittanceAccount111, region: { meta: m.BankCode111.text, city: m.ddlCityArea.text, prov: m.ddlCity.text } },
        { title          : m.txtRemittanceAccount111_2, value: m.txtRemittanceAccount111_2, region: { meta: m.BankCode111_2.text, city: m.ddlCityArea2.text, prov: m.ddlCity2.text } },
        { title          : m.txtRemittanceAccount111_3, value: m.txtRemittanceAccount111_3, region: { meta: m.BankCode111_3.text, city: m.ddlCityArea3.text, prov: m.ddlCity3.text } },
        { title          : m.txtRemittanceAccount111_4, value: m.txtRemittanceAccount111_4, region: { meta: m.BankCode111_4.text, city: m.ddlCityArea4.text, prov: m.ddlCity4.text } },
        { title          : m.txtRemittanceAccount111_5, value: m.txtRemittanceAccount111_5, region: { meta: m.BankCode111_5.text, city: m.ddlCityArea5.text, prov: m.ddlCity5.text } }
    ]
};*/








/*
var injector = angular.injector(["ng"]);
//console.log(injector);
return
*/


//(function(window, angular) {'use strict'; console.log(angular);})(window, window.angular);








//this.$scope.$apply(this)
//this.$scope.bind(this)
//console.log(this.$scope.account);
//this.run = function(callback) { return callback.call(this); }
//this.$scope.__proto__ = this;

//this.injectComponents()
//this.
// console.log(this);
// console.log(this.injectComponents);








//console.log(user);

/*
function bindUser(a) {
    // console.log(this.user);
    return this.user
}

function s(a) { console.log(a); }

*/


/*class Basic {
    constructor() {
        this.port = location.port;
        this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.host = this._host();
        this.route = this._route();
    }


    //get port2() { return location.port; }
    // get path() { return location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(); }
    _host() {
        if(location.port) {
            return { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port];
        } else { return location.host.split(".")[1]; }
    }
    _route() {
        return {
            "wa111": {
                "login": "login",
                "index": "home",
                "memberlist": "list",
                "membermodify": "edit",
                "depositbonus": "bonus",
                "igetmemberinfo": "logs",
                "samebrowserlist": "logs",
                "deltabank": "cash",
                "deltaonline": "cash",
                "deltawechat": "cash",
                "deltaalipay": "cash",
                "withdrawalsbank": "cash",
                "astropaywithdrawals": "cash"
            },
            "ku711": {
                "signin": "login",
                "member": "home",
                "memberinfomanage": "list",
                "editmemberinfomanage": "edit",
                "bonuslog": "bonus",
                "memberloginlog": "log"
            }
        } [this.host][this.path];
    }
}*/





//console.log(a.$scope.channel);
// module.call(a, a.$scope)
// $scope.invoke();
//console.log(this.$apply);
// console.log($scope.$apply);


















//requirejs([_.route], function(module) {
//console.log(module);
//console.log(window.$scope);
//if(module) { module.call($scope, $scope); }
// })

//requirejs(['App'], function($scope) {
/*requirejs([_.route], function(module) {
    if(module) { module.call($scope, $scope); }
})*/
//})



/*
if(_.route) {
    requirejs(['App'], function($scope) {
        requirejs([_.route], function(module) {
            if(module) { module.call($scope, $scope); }
        })
    })
}
*/

/*
var port                               = location.port;
if(port) { var host                    = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [port]; } else {
    var host                           = location.host.split(".")[1];
}
var path                               = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();*/

//console.log(path);
//console.log(host);
/*var route                            = {
    "wa111"                            : {
        "login"                        : "login",
        "index"                        : "home",
        "memberlist"                   : "list",
        "membermodify"                 : "edit",
        "depositbonus"                 : "bonus",
        "igetmemberinfo"               : "logs",
        "samebrowserlist"              : "logs",
        "deltabank"                    : "cash",
        "deltaonline"                  : "cash",
        "deltawechat"                  : "cash",
        "deltaalipay"                  : "cash",
        "withdrawalsbank"              : "cash",
        "astropaywithdrawals"          : "cash"
    },
    "ku711"                            : {
        "signin"                       : "login",
        "member"                       : "home",
        "memberinfomanage"             : "list",
        "editmemberinfomanage"         : "edit",
        "bonuslog"                     : "bonus",
        "memberloginlog"               : "log"
    }
} [host][path];
*/


//console.log(route);


//requirejs(["factory"], function(factory) {})

//requirejs(["App"], function(App) {})

/*
if(route) {
    requirejs(['../App'], function($scope) {
        requirejs([route], function(module) {
            if(module) { module.call($scope, $scope); }
        })
    })
}
*/