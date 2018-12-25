define(['require', 'moment', 'evo-route', 'dexie'], function(require, moment, Route, Dexie) {

    'use strict';
    class Evo extends Route {
        constructor() {
            super()
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
                    if (this.baseUrl.search(s.id)) { return s.id }
                }
            }
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
            //console.log(var1, var2);
            return new FormData(formElement);
        }


        connect(message) {
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, message, resolve)
            })
        }

        sendMessage(message) {
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, message, resolve)
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

        get operator() {
            return localStorage['operator'];
        }

        get db() {

            var db = new Dexie(evo.host);
            db.version(3).stores({
                mobile: 'uniqueId',
                locate: 'uniqueId',
                idcard: 'uniqueId',
                sms: 'uniqueId',
                DepositBonus: 'uniqueId',
                PhoneDate: 'uniqueId',
                MemberList: 'uniqueId'
            });
            return db;
        }


        get siteNumber() {

            if (this.domain[0].includes('cashhost')) {
                return this.domain[0].replace('cashhost', '')
            }

            if (this.domain[1] == "github") {
                return this.params.siteNumber;
            } else {
                return localStorage.siteNumber || this.params.siteNumber;
            }
        }


        getTime() {
            return moment().format('YYYY/MM/DD HH:mm:ss');
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