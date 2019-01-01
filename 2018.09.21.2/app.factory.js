define(["app.instance", 'dexie', 'moment', 'material', 'semantic', 'app.xmlhttp', 'app.sendSms'],
    function(instance, Dexie, moment, mdc, semantic, xmlSpider, sendSms) {

        function _sname_(elem) { if(elem.name) return elem.name.split("$").pop(); if(elem.id) { return elem.id.replace('ctl00_ContentPlaceHolder1_', ''); } else { return "" } }

        function _model_(elem) {
            switch (elem.localName) {
                case 'input':
                    return elem.value;
                case 'select':
                    return elem.selectedOptions[0].label
                case 'button':
                    return elem.title;
                case 'span':
                    return elem.outerText;
            }
        }

        var dexie = new Dexie('evo');
        dexie.version(1).stores({ user: 'f_accounts' });
        //console.log(dexie);
        xmlSpider.dexie = dexie;

        //var injects = ['$anchorScroll', '$animate']


        class Factory {
            constructor() {

            }

            get mdc() { return mdc }
            get dexie() { return dexie }
            get xmlSpider() { return xmlSpider }
            get sendSms() { return sendSms }

            get params() {
                return Array.from(this.searchParams).serialize(); //instance
            }
            get account() {
                return this.params.account || this.params.member;
            }

            set operator(value) { localStorage.operator = value }
            get operator() { return localStorage.operator; }

            set siteName(value) { localStorage.siteName = value }
            get siteName() { return localStorage.siteName; }

            set channel(value) { localStorage.channel = value }
            get channel() { return localStorage.channel || this.params.siteNumber; }
            get unique() { return [this.account, this.channel].join("-"); }

            get isExit() { return this.referrer.includes('Exit') || this.referrer.includes('SignOut'); }

            get components() {
                return { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.route];
            }

            get stylesheet() {
                return { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.route];
            }

            sendMessage(message) {
                return new Promise((resolve, reject) => {
                    if(this.extensionId && message) {
                        chrome.runtime.sendMessage(this.extensionId, message, (res) => {
                            if(res) { res.active = false; }
                            try { resolve(res) } catch (ex) { reject(ex) }
                        })
                    } else { reject(101) }
                })
            }

            getUser() {
                return this.sendMessage({ command: 'apiFunctions.store.user.get', params: this.unique }).then((user) => {
                    return this.bindUser(user)
                })
            }

            delUser() { return this.sendMessage({ command: 'apiFunctions.store.user.del', params: this.unique }) }

            putUser(user) {
                return this.sendMessage({ command: 'apiFunctions.store.user.put', params: user || this.user }).then((user) => {
                    return this.bindUser(user)
                })
            }

            createTab(_url) { window.open(_url, "_blank"); }
            cut(e) { document.execCommand("cut"); }
            copy(e) { document.execCommand("copy"); }
            paste(e) { document.execCommand("paste"); }
            getModule(objPath) {
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

            ajax({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) {
                return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows })
            }

            get elements() {
                return ["span", "input", "select", "button", "a"]
                    .map((el) => { return Array.from(document.querySelectorAll(el)) })
                    .flat().filter((elem) => { return elem.name || elem.id; });
            }

            get model() {
                return this.elements.map((elem) => {
                    return [_sname_(elem), _model_(elem)]
                }).serialize();
            }

            get ctrl() {
                return this.elements.map((elem) => {
                    return [_sname_(elem), $(elem)];
                }).serialize();
            }

            setElements() {}

            injectStylesheet() {
                if(!this.stylesheet) { return false };
                this.stylesheet.map((str) => { return this.rootUrl + "css/" + str + ".css"; }).map((src) => {
                    $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
                });
            };

            injectComponents() {
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
        }

        return Factory;
    })





/*
        return function($anchorScroll, $animate, $animateCss, $cacheFactory, $compile, $controller, $document, $exceptionHandler, $filter, $http, $httpBackend,
            $httpParamSerializer, $httpParamSerializerJQLike, $interpolate, $interval, $jsonpCallbacks, $locale, $location, $log, $parse, $q, $rootElement,
            $rootScope, $sce, $sceDelegate, $templateCache, $templateRequest, $timeout, $window, $xhrFactory) {}
            */