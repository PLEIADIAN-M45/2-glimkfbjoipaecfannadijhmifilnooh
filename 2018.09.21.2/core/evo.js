define(['require', 'moment', 'dexie'], function(require, moment, Dexie) {

    'use strict';

    class Evo {
        constructor() {
            this.version = '7.0';
        }

        get baseUrl() {
            return localStorage.chrome_runtime_baseUrl;
            return require.toUrl('.')
        }

        get extensionId() {

            return localStorage.chrome_runtime_id;

            if (chrome.runtime.id) {
                return chrome.runtime.id;
            } else {

                for (var s of document.scripts) {
                    if (this.baseUrl.search(s.id)) {
                        return s.id
                    }
                }
            }
        }

        get localStorage() {
            return {
                getItem: function(key) {
                    return new Promise(function(resolve, reject) {
                        chrome.runtime.sendMessage(evo.extensionId, {
                            command: "localStorage:getItem:" + key
                        }, resolve)
                    })
                },
                setItem: function() {

                },
                removeItem: function() {

                },
                clear: function() {

                },
            }

        }

        get siteName() { return localStorage['siteName']; }

        get token() {
            return {
                "wa111": "",
                "ku711": $('ajax-anti-forgery-token').attr('token')
            }[this.host];
        }

        get formData() {
            var formElement = document.querySelector("form");
            console.log(formElement);
            return new FormData(formElement);
        }

        log(d) {
            console.log(d);
            return d;
        }

        connect(message) {
            chrome.runtime.connect(this.extensionId, { name: this.channel })
        }


        apiFunctions() {
            if (!this.value) { return };
            var { account, host, channel } = evo;
            var { command = "apiFunctions", property, value } = this;
            var parameters = { command, property, value, host, channel, account };
            this.active = true;
            if (property == "banker") {
                console.log(this.region);
                parameters.region = this.region
            } else {
                this.region = {};
            }

            return new Promise((resolve, reject) => {
                //if (!params.value) { resolve({ active: false }) }
                chrome.runtime.sendMessage(evo.extensionId, parameters, (result) => {
                    if (result) {
                        console.log(result);
                        //console.log(this);
                        Object.assign(this, result)
                        this.active = false;
                        this.$apply();
                    }
                    try {


                    } catch (ex) {

                    }

                    //result.active = false;
                    //resolve(result);
                });

            });

            //request.command = req.command.replace('host', evo.host).replace('channel', evo.channel)
            //chrome.runtime.sendMessage(evo.extensionId, { command, property, value, host, channel, account, region }, callback)
            //apiFunctions:region:host:channel
            /*
                        console.log(request);
                        return new Promise(function(resolve, reject) {
                            chrome.runtime.sendMessage(evo.extensionId, request, function([result, status, xhr]) {
                                console.log(result);

                            })
                        })*/

            //console.log(request);
            /*
            var { value, proto, account, channel, host } = request;
            console.log({ value, proto, account, channel, host });
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, { value, proto, account, channel, host }, function([result, status, xhr]) {
                    console.log(result);
                    //resolve({ ...result, status, active: false });
                    //console.log(request.command, result);
                    //resolve({ ...result, status, active: false });
                })
            })*/
            return
            try { var req = assign(...request); } catch (ex) { var req = request; }

            req.command = req.command.replace('host', evo.host).replace('channel', evo.channel)

            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, req, function([result, status, xhr]) {
                    //resolve({ ...result, status, active: false });
                    //console.log(request.command, result);
                    resolve({ ...result, status, active: false });

                })
            })

        }



        sendMessage(message) {
            message.command = message.command.replace('host', evo.host).replace('channel', evo.channel)
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, message, function(res) {
                    //console.log(res);
                    try { resolve(res) } catch (ex) { reject(ex) }
                })
            })
        }

        get protocol() {
            return location.protocol;
        }
        get referrer() {
            return document.referrer;
        }
        get port() {
            return location.port
        }
        get origin() {
            return location.origin
        }
        get URLSearchParams() {
            return URLSearchParams
        }
        get paramsString() {
            return location.search;
        }
        get searchParams() {
            return new URLSearchParams(location.search)
        }
        get params() {
            var obj = {};
            this.searchParams.forEach(function(value, key) {
                obj[key] = value;
            })
            return obj;
        }

        /*
        get account() {
            return this.params.account ||
                this.params.member ||
                this.params.accountId ||
                this.params.accounts;
        }
        */

        get operator() { return localStorage['operator']; }


        encoder(value) {
            //var str = JSON.stringify(value);
            //console.log(str);
            return btoa(encodeURI(JSON.stringify(value)))
        }

        decoder(value) {
            try {
                return JSON.parse(decodeURI(atob(value)))
            } catch (ex) {
                return decodeURI((value))
                //return decodeURI(atob(value))
            }
        }

        moment(t) {
            if (Number(t)) {
                return moment(Number(t)).format('YYYY/MM/DD HH:mm:ss');
            } else {}

        }

        get channel() {
            return this.params.siteNumber || localStorage.channel || localStorage.siteNumber || location.port;
            return Number(channel);
        }

        get siteNumber() {
            if (this.domain[0].includes('cashhost')) { return this.domain[0].replace('cashhost', '') }
            if (this.domain[1] == "github") { return this.params.siteNumber; } else {
                return localStorage.siteNumber || this.params.siteNumber;
            }
        }

        get filename() { return location.pathname.split('/').pop() }
        get pathname() { return location.pathname.split('/').pop().replace(/\.(aspx|html)/, ''); }
        get file() { return location.pathname.split('/').pop() }
        get path() { return location.pathname.split('/').pop().replace(/\.(aspx|html)/, ''); }
        get domain() { return location.host.split('.'); }
        get sub() { return location.host.split('.')[0]; }
        get host() {
            return {
                "6326": "wa111",
                "6335": "wa111",
                "6317": "wa111",
                "6302": "wa111",
                "8876": "wa111",
                "26": "wa111",
                "16": "ku711",
                "": location.host.split('.')[1]
            }[location.port];
        }

        get apiPath() {
            return [this.host, 'apiFunction'].join('/');
        }

        json(a) {
            try {
                return (typeof a == 'string') ? JSON.parse(a) : JSON.stringify(a);
            } catch (ex) { return a; }
        }

        getfilename() { return [...arguments].map((str) => { return str.split('?')[0].split('/').pop(); })[0]; };

        getParams(str) {
            var paramsString = arguments[0].split('?')[1];
            var searchParams = new URLSearchParams(paramsString);
            var parameters = {};
            for (var [key, value] of searchParams.entries()) { parameters[key] = value; }
            return parameters;
        }

        console() {
            //console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
        }

        get pathname() {
            return location.pathname.toLowerCase().replace(/(\.html|.aspx)$/i, '');
        }

        get filename() {
            return this.pathname.split('/').pop();
        }

        get elements() {
            return document.querySelectorAll('span, select, input')
        }

        get controllerProvider() {
            return angular.element(document.querySelector('[ng-controller]'));
        }

        get store() {
            var store = new Dexie('evo');
            store.version(4).stores({
                user: 'f_accounts'
            });
            return store
        }

        get path() {
            return {
                "wa111": {
                    "": "home",
                    "index": "home",
                    "login": "login",
                    "memberlist": "list",
                    "membermodify": "edit",
                    "depositbonus": "bonus",
                    "igetmemberinfo": "log",
                    "samebrowserlist": "log",
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
            }[this.host][this.filename];
        }

        get router() { return [this.host, this.path].join('/'); }

        get adapter() { return ['adapter', this.path].join('/'); }

        extend() {
            return Object.assign(this, ...arguments);
        }

        get test() {
            if (location.hostname == "127.0.0.1") {
                return true
            } else {
                return false;
            }
        }

        getTime() {
            return moment().format('YYYY/MM/DD HH:mm:ss');
        }

        get now() {
            return moment().format('YYYY-MM-DD HH:mm:ss')
        }

        get time() {
            return {
                get now() {
                    return moment().format('YYYY/MM/DD HH:mm:ss')
                },
                now2: function() {
                    return moment().format('YYYY/MM/DD HH:mm:ss')
                },
                date: function() {
                    return moment().format('YYYY/MM/DD')
                },
                value: function() {
                    return new Date().getTime()
                }
            }
        }

        error(ex) {
            console.log(ex);
        }

        copy(e) {
            document.execCommand("copy");
        }
        cut(e) {
            document.execCommand("cut");
        }
        paste(e) {
            document.execCommand("paste");
        }


    }

    const evo = new Evo();


    evo.assign = Object.assign;
    evo.values = Object.values;
    evo.keys = Object.keys;
    evo.entries = Object.entries;

    var { account, member, accountId, accounts } = evo.params;
    evo.account = account || member || accountId || accounts;



    return evo;
})





/*
function Store() {
    return {
        get: function(arg) {
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, {
                    command: "evo.store.users.get('" + arg + "')"
                }, function(result) {
                    console.log(result);
                    resolve(result)
                })
            })
        },
        put: function() {
            return new Promise(function(resolve, reject) {

            })
        }
    }

}


evo.store = {}
chrome.runtime.sendMessage(evo.extensionId, {
    command: "evo.store.tables"
}, function(result) {
    console.log(evo.filename);
    console.log(result);
    result.forEach((store) => {
        console.log(store.name);
        // evo.store[store.name] = evo.store[store.name] || {}
        evo.store[store.name] = new Store();
    })
})
console.log(evo.store);
*/



/*
//navigator.clipboard
https://github.com/garykac/clipboard/blob/master/clipboard.md has a compatibility table for
 execCommand(cut / copy / paste).

*/