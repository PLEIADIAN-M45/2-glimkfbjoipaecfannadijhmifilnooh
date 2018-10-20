define(['require', 'moment', 'dexie'], function(require, moment, Dexie) {

    'use strict';

    class Evo {

        constructor() {
            //super();
            this.version = '7.0';
        }

        get baseUrl() {
            return require.toUrl('.')
        }

        get extensionId() {
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


        get siteName() { return localStorage['siteName']; }

        get siteType() {
            switch (this.siteName) {
                case 'wa111':
                    return null;
                case 'ku711':
                    return $('ajax-anti-forgery-token').attr('token');
                    //document.querySelector('AJAX-ANTI-FORGERY-TOKEN').getAttribute('token');
            }
            return
        }

        get token() {
            switch (this.host) {
                case 'wa111':
                    return null;
                case 'ku711':
                    return $('ajax-anti-forgery-token').attr('token');
                    //document.querySelector('AJAX-ANTI-FORGERY-TOKEN').getAttribute('token');
            }
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
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, message, resolve)
            })
        }


        fetch(params) {
            return new Promise(function(resolve, reject) {
                resolve(2)
            })
        }

        apiFunction(request) {
            console.log(request);
            request.command = "apiFunction";
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, request, function(result) {
                    console.log(result);
                    resolve(result);
                })
            })
        }


        apiFunctions(request) {
            //TypeError: Found non-callable @@iterator
            //console.log(typeof request);
            //console.log(request.length);
            try {
                var req = assign(...request);
            } catch (ex) {
                var req = request;
            }

            console.log(req);

            //alert(json(req))

            //if (arguments.length == 1) { request = Object.assign(...arguments[0]); }
            req.command = req.command.replace('host', evo.host).replace('channel', evo.channel)
            //console.log(request);
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, req, function([result, status, xhr]) {
                    console.log(result);
                    resolve({ ...result, status, active: 0 });
                })
            })
        }

        sendMessage(message) {
            message.command = message.command.replace('host', evo.host).replace('channel', evo.channel)
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, message, function(res) {
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

        get account() {
            return this.params.account ||
                this.params.member ||
                this.params.accountId ||
                this.params.accounts;
        }


        get operator() { return localStorage['operator']; }


        get IDB() {

            /*var IDB = new Dexie('evo');
            if (this.host == 'wa111') {
                IDB.version(1.0).stores({
                    DepositBonus: 'f_id',
                    GetMemberList: 'f_accounts',
                    GetSystemLog: 'f_target, f_field'
                }).upgrade(trans => { console.log(trans); });
            }

            if (this.host == 'ku711') {
                IDB.version(1.0).stores({
                    GetMemberList: 'AccountID',
                    GetSystemLog: 'Operated, OperateType'
                }).upgrade(trans => { console.log(trans); });
            }

            return IDB;*/
        }

        moment(t) {
            if (Number(t)) {
                return moment(Number(t)).format('YYYY/MM/DD HH:mm:ss');
            } else {
                //console.log('xxxx', t);
            }

        }


        get channel() {
            //if(location.port=='16')
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
            if (location.host == '127.0.0.1:16') { return 'ku711'; }
            if (location.host == '127.0.0.1:26') { return 'wa111' } else {
                return location.host.split('.')[1].replace('202', 'wa111');
            }

        }

        json(a) {
            try {
                return (typeof a == 'string') ? JSON.parse(a) : JSON.stringify(a);
            } catch (ex) {
                //console.log(ex);
                return a;
            }
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

        get route() {
            //console.log(super);
            var _route = this.filename.replace(/(\.\w+)/i, '').toLowerCase();
            // console.log(_route);

            if (_route) {
                switch (_route) {

                    case "MemberLog".toLowerCase():

                        _route = "MemberLog";


                        break;


                    case "IGetMemberInfo".toLowerCase():
                    case "MemberLoginLog".toLowerCase():

                    case "SameBrowserList".toLowerCase():
                        _route = "MemberLoginLog";
                        break;

                    case "WebMemberInfo".toLowerCase():
                    case "WebMemberInfoForPhoto".toLowerCase():
                        _route = "MemberLoginLogxxxxxxxxxxxx";
                        break;
                    case "EditMemberInfoManage".toLowerCase():
                    case "MemberModify".toLowerCase():
                        _route = "MemberModify";
                        break;
                    case "MemberInfoManage".toLowerCase():
                    case "MemberList".toLowerCase():
                        _route = "MemberList"
                        break;



                    case "BonusLog".toLowerCase():
                    case "DepositBonus".toLowerCase():
                        _route = "MemberBonus"
                        break;
                    case "Member".toLowerCase():
                    case "Index".toLowerCase():
                        _route = "Index";
                        break;
                    case "signin".toLowerCase():
                    case "Login".toLowerCase():
                        _route = "Login";
                        break;
                    case "DeltaBank".toLowerCase():
                    case "DeltaOnline".toLowerCase():
                    case "DeltaWeChat".toLowerCase():
                    case "DeltaAlipay".toLowerCase():
                    case "WithdrawalsBank".toLowerCase():
                    case "AstropayWithdrawals".toLowerCase():
                        _route = "Cashflow";
                        break;
                    default:
                        return undefined;
                        break;
                }
                evo.extend = this.host + '/' + _route;
                return _route;
            }
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
            return moment().format('YYYY/MM/DD HH:mm:ss')
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
    }

    const evo = new Evo();

    window.evo = evo;

    evo.assign = Object.assign;
    return evo;
})





















/*

            var YEAR = 365 * 24 * 60 * 60 * 1000;
            return trans.friends.toCollection().modify(friend => {
                friend.birthdate = new Date(Date.now() - (friend.age * YEAR));
                delete friend.age;
            });
        get db() {

            var db = new Dexie('evo');

            db.version(2.0).stores({
                mobile: 'uniqueId',
                locate: 'uniqueId',
                idcard: 'uniqueId',
                sms: 'uniqueId',
                DepositBonus: 'f_id',
                MemberBonus: 'BonusNumber', //BonusNumber
                PhoneDate: 'uniqueId',
                MemberList: 'uniqueId'
            }).upgrade(trans => {
                console.log(trans);
            });
            return db;
        }*/