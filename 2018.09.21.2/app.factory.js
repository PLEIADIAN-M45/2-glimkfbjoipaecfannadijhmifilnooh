define(['angular', 'dexie', 'moment', 'material', 'semantic', 'app.xmlhttp', 'app.sendSms'], function(angular, Dexie, moment, mdc, semantic, xmlSpider, sendSms) {


    return function factory($anchorScroll, $animate, $animateCss, $cacheFactory, $compile, $controller, $document, $exceptionHandler, $filter, $http, $httpBackend,

        $httpParamSerializer, $httpParamSerializerJQLike, $interpolate, $interval, $jsonpCallbacks, $locale, $location, $log, $parse, $q, $rootElement,
        $rootScope, $sce, $sceDelegate, $templateCache, $templateRequest, $timeout, $window, $xhrFactory) {

        this.mdc = mdc;
        this.dexie = new Dexie('evo');
        this.dexie.version(1).stores({ user: 'f_accounts' });
        /**********************************************************************************************/
        this.components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.module];
        this.stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.module];
        /**********************************************************************************************/
        this.searchParams = new URLSearchParams(this.search);
        this.params = Array.from(this.searchParams).serialize();
        this.account = this.params.account || this.params.member;
        //this.channel = localStorage.channel || this.params.siteNumber;
        /**********************************************************************************************/
        this.referrer = document.referrer;
        this.forms = document.forms;
        this.form = document.forms[0];
        this.isExit = this.referrer.includes('Exit') || this.referrer.includes('SignOut');
        this.responseType = { text(res) { return res.text(); }, json(res) { return res.json(); } }
        this.unique = [this.account, this.channel].join("-");



        if(this.isTest) {
            $(".collapse").show();
            this.router = {
                wa111: {
                    cookie: "/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                    device: "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
                },
                ku711: {
                    cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
                    device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
                }
            } [this.server];
            for(var key in this.router) { this.router[key] = this.router[key].replace('#1', this.channel).replace('#2', this.account); }
        } else {
            this.router = {
                wa111: {
                    cookie: "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                    device: "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
                },
                ku711: {
                    cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
                    device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
                }
            } [this.server];

            for(var key in this.router) {
                this.router[key] = this.router[key].replace('#1', this.channel).replace('#2', this.account);
            }
        }


        this.components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.module];
        this.stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.module];

        /*
                this.assign = function() {
                    Object.assign(this, ...arguments)
                };

                this.apply = function(res) {
                    if (!this.$$phase) { this.$apply(); };
                    return res;
                }

                this.extend = function(args) {
                    Object.entries(args).map(([a, b]) => { this.__proto__[a] = b; })
                }*/

        /*
        this.apply = function(res) {
            if (!this.$$phase) { this.$apply(); };
            return res;
        }*/

        this.extensionId = localStorage.extensionId;

        this.sendMessage = function(message) {
            return new Promise((resolve, reject) => {
                if(this.extensionId && message) {
                    chrome.runtime.sendMessage(this.extensionId, message, (res) => {
                        if(res) { res.active = false; }
                        try { resolve(res) } catch (ex) { reject(ex) }
                    })
                } else { reject(101) }
            })
        }

        this.xmlSpider = xmlSpider;
        xmlSpider.sendMessage = this.sendMessage;
        xmlSpider.dexie = this.dexie;

        /*
        this.getUser = function() {
            console.log(this.unique);
            return this.sendMessage({ command: 'apiFunctions.store.user.get', params: this.unique })
        }

        this.putUser = function(_user) {
            return this.sendMessage({ command: 'apiFunctions.store.user.put', params: _user || this.user })
        }
        */

        this.createTab = function(_url) { window.open(_url, "_blank"); }
        this.setPermit = function() {
            switch (this.server) {
                case "wa111":
                    this.ctrl.isOpenDeposit.value = 1;
                    this.ctrl.btnSaveInfo.click();
                    console.log(1);
                    break;
                case "ku711":
                    this.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                    this.ctrl.DepositChanged();
                    this.ctrl.UpdateMemberRiskInfoAccountingBackend();
                    console.log(2);
                    break;
            }
            this._setPermit = false;
        }

        this.cut = function(e) { document.execCommand("cut"); }
        this.copy = function(e) { document.execCommand("copy"); }
        this.paste = function(e) { document.execCommand("paste"); }
        this.getModule = function(objPath) {
            return new Promise((resolve, reject) => {
                var object = (objPath.includes('ctrl')) ? this : this.ctrl.model;
                (function repeater(object) {
                    var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object);
                    if(alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else {
                        if(typeof alphaVal == "object") {
                            if(Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) };
                        } else { resolve(alphaVal); }
                    }
                }(object));
            });
        }

        this.ajax = function({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) {
            return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows })
        }

        this.setElements = function() {
            this.elements = ["span", "input", "select", "button", "a"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; });
            if(this.server == "wa111") {
                this.model = this.elements.map((elem) => { return [elem.sname, elem.model]; }).serialize();
                this.ctrl = this.elements.map((elem) => { return [elem.sname, $(elem)]; }).serialize();
            }
        }


        this.injectStylesheet = function() {
            if(!this.stylesheet) { return false };
            this.stylesheet.map((str) => { return this.rootUrl + "css/" + str + ".css"; }).map((src) => {
                $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
            });
        };

        this.injectComponents = function() {
            return new Promise((resolve, reject) => {
                if(!this.components) {
                    resolve(0);
                } else {
                    this.components.map((str) => { return this.rootUrl + "html/" + str + ".html"; }).map((src) => {
                        fetch(src).then(this.responseType.text).then((html) => {
                            var template = angular.element(html);
                            this.$controller.append($compile(template)(this))
                            this.$apply();
                            resolve(1);
                        });
                    });
                }
            })
        };

        this.$loadModule = function() {
            if(this.module == undefined) { return }
            var module = [this.server, this.module].slash();
            //console.log(module);
            requirejs([module], (module) => {
                if(module) {
                    this.injectStylesheet();
                    this.injectComponents().then((x) => {
                        this.setElements();
                        this.$invoke(module, this);
                    })
                }
            });
        }
    }
});















/*.then(this.injectStylesheet.bind(this))
.then(this.injectComponents.bind(this));*/

/*
                                     setTimeout(function() {}.bind(this), 1000)
                                     setTimeout(function() {
                                     }.bind(this), 2000)
                                     */
/*
setTimeout(function() {
    console.log(3);

    this.$invoke(module, this);

}.bind(this), 1000)
*/