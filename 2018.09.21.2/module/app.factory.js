define(['angular', 'dexie', 'moment', 'material', 'semantic', 'app.xmlSpider'], function(angular, Dexie, moment, mdc, semantic, xmlSpider) {


    return function factory($anchorScroll, $animate, $animateCss, $cacheFactory, $compile, $controller, $document, $exceptionHandler, $filter, $http, $httpBackend,
        $httpParamSerializer, $httpParamSerializerJQLike, $interpolate, $interval, $jsonpCallbacks, $locale, $location, $log, $parse, $q, $rootElement,
        $rootScope, $sce, $sceDelegate, $templateCache, $templateRequest, $timeout, $window, $xhrFactory) {

        this.$compile = $compile;
        this.baseUrl = "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/module";
        this.mdc = mdc;
        this.dexie = new Dexie('evo');
        this.dexie.version(1).stores({ user: 'f_accounts' });

        this.operator = localStorage.operator;
        this.extensionId = localStorage.extensionId;
        /**********************************************************************************************/
        this.components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.moduleId];
        this.stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.moduleId];
        /**********************************************************************************************/
        this.params = Array.from(this.searchParams).serialize();
        this.account = this.params.account || this.params.member;
        this.channel = localStorage.channel || this.params.siteNumber;
        /**********************************************************************************************/
        this.referrer = document.referrer;
        this.forms = document.forms;
        this.form = document.forms[0];
        this.isExit = this.referrer.includes('Exit') || this.referrer.includes('SignOut');
        this.responseType = { text(res) { return res.text(); }, json(res) { return res.json(); } }
        this.unique = [this.account, this.channel].join("-");
        this.elements = ["span", "input", "select", "button"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; });

        if(this.server == "wa111") {
            this.model = this.elements.map((elem) => { return [elem.sname, elem.model]; }).serialize();
            this.ctrl = this.elements.map((elem) => { return [elem.sname, elem]; }).serialize();
        }

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


        //console.log(this.test);
        if(this.test) {
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
        }

        for(var key in this.router) { this.router[key] = this.router[key].replace('#1', this.channel).replace('#2', this.account); }



        this.assign = function() {
            Object.assign(this, ...arguments)
        };

        this.apply = function(res) {
            if(!this.$$phase) { this.$apply(); };
            return res;
        }

        this.extend = function(args) {
            Object.entries(args).map(([a, b]) => { this.__proto__[a] = b; })
        }

        this.sendMessage = function(message) {
            return new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(this.extensionId, message, (res) => {
                    if(res) { res.active = false; }
                    try { resolve(res) } catch (ex) { reject(ex) }
                })
            })
        }



        this.xmlSpider = xmlSpider;
        xmlSpider.sendMessage = this.sendMessage;
        xmlSpider.dexie = this.dexie;

        this.injectStylesheet = function() {
            if(!this.stylesheet) { return false };
            this.stylesheet.map((str) => { return require.toUrl('../css/@.css').replace('@', str); }).map((src) => { $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body'); });
        };

        this.injectComponents = function() {
            if(!this.components) { return false };
            this.components.map((str) => { return require.toUrl(str + '.html').replace(/(wa111|ku711)/, 'html') }).map((src) => {
                fetch(src).then(this.responseType.text).then((html) => {
                    var template = angular.element(html);
                    angular.element(document.querySelector('[ng-controller]')).append($compile(template)(this));
                });
            });
        };


        this.getUser = function() { return this.sendMessage({ command: 'apiFunctions.store.user.get', params: this.unique }) }

        this.putUser = function() { return this.sendMessage({ command: 'apiFunctions.store.user.put', params: this.user }) }

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

        this.$loadModule = function() {
            console.log(this.moduleId);
            requirejs([this.moduleId], (module) => {
                //console.log(module);
                if(module) {
                    this.injectStylesheet();
                    this.injectComponents();
                    this.$invoke(module, this);
                }
            });
        }

    }
});














/*
service


$anchorScroll
$animate
$animateCss
$cacheFactory
$compile
$controller
$document
$exceptionHandler
$filter
$http
$httpBackend
$httpParamSerializer
$httpParamSerializerJQLike
$interpolate
$interval
$jsonpCallbacks
$locale
$location
$log
$parse
$q
$rootElement
$rootScope
$sce
$sceDelegate
$templateCache
$templateRequest
$timeout
$window
$xhrFactory
*/