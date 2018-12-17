define([

    'angular', 'dexie', 'moment', 'material', 'semantic',

    'app.instances',
    'app.xmlSpider',
    'apiFunction'

], function(

    angular, Dexie, moment, mdc, semantic,

    instances, xmlSpider, apiFunction) {


    return new function() {

        this.mdc = mdc;


        this.dexie = new Dexie('evo');

        this.dexie.version(1).stores({ user: 'f_accounts' });

        this.pathname = location.pathname;
        this.port = location.port;
        this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.host = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1];

        this.module = {
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

        this.components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.module];
        this.stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.module];

        this.operator = localStorage.operator;
        this.extensionId = localStorage.extensionId;
        this.origin = location.origin;
        this.searchParams = new URLSearchParams(location.search);
        this.params = Array.from(this.searchParams).serialize();
        this.account = this.params.account || this.params.member;
        this.channel = localStorage.channel || this.params.siteNumber;
        this.referrer = document.referrer;
        this.forms = document.forms;
        this.form = document.forms[0];

        this.isExit = this.referrer.includes('Exit') || this.referrer.includes('SignOut');
        this.responseType = { text(res) { return res.text(); }, json(res) { return res.json(); } }
        this.unique = [this.account, this.channel].join("-");


        this.elements = ["span", "input", "select", "button"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; });
        this.model = this.elements.map((elem) => { return [elem.sname, elem.model]; }).serialize();
        this.ctrl = this.elements.map((elem) => { return [elem.sname, elem]; }).serialize();
        this.assign = function() {
            Object.assign(this, ...arguments)
        };

        this.apply = function(res) {

            console.log(this);

            if (!this.$$phase) { this.$apply(); };
            return res;
        }

        this.extend = function(args) { Object.entries(args).map(([a, b]) => { this.__proto__[a] = b; }) }


        this.sendMessage = function(message) {
            //if (message) { console.log(message); }
            return new Promise((resolve, reject) => {
                //console.log(message);
                chrome.runtime.sendMessage(this.extensionId, message, (res) => {
                    //console.log(res);
                    res.active = false;
                    try { resolve(res) } catch (ex) { reject(ex) }
                })
            })
        }


        this.xmlSpider = xmlSpider;
        xmlSpider.sendMessage = this.sendMessage;
        xmlSpider.dexie = this.dexie;


        this.injectStylesheet = function() {
            if (!this.stylesheet) { return false };
            this.stylesheet.map((str) => { return require.toUrl('../css/@.css').replace('@', str); }).map((src) => { $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body'); });
        };

        this.injectComponents = function() {
            if (!this.components) { return false };
            this.components.map((str) => { return require.toUrl(str + '.html').replace(/(wa111|ku711)/, 'html') }).map((src) => {
                fetch(src).then(this.responseType.text).then((html) => {
                    var template = angular.element(html);
                    this.$view.append(template);
                    this.$compile(template)(this);
                    this.$apply();
                });
            });
        };

        this.urls = {
            wa111: {
                cookie: "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                device: "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
            },
            wa111_home: {
                cookie: "/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                device: "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
            },
            ku711: {
                cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
                device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
            }
        } [this.host];

        for (var key in this.urls) { this.urls[key] = this.urls[key].replace('#1', this.channel).replace('#2', this.account); }

        this.invoke = function() {
            this.injectStylesheet();
            this.injectComponents();
        };



        this.getUser = function() {
            return this.sendMessage({ command: 'apiFunctions.store.user.get', params: this.unique })
        }

        this.putUser = function() {
            return this.sendMessage({ command: 'apiFunctions.store.user.put', params: this.user })
        }



        this.createTab = function(_url) {
            console.log(_url);
            window.open(_url, "_blank");
        }


        this.setPermit = function() {
            switch (this.host) {
                case "wa111":
                    this.ctrl.isOpenDeposit.value = 1;
                    this.ctrl.btnSaveInfo.click();
                    break;
                case "ku711":
                    this.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                    this.ctrl.DepositChanged();
                    this.ctrl.UpdateMemberRiskInfoAccountingBackend();
                    break;
            }
        }
        this.cut = function(e) { document.execCommand("cut"); }
        this.copy = function(e) {
            console.log(e);
            document.execCommand("copy");
        }
        this.paste = function(e) { document.execCommand("paste"); }
        this.dialog = function({ status, message, mobile }) {
            this.mdcDialog = {
                "3": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
                "1": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "\u8bf7\u5148\u767b\u5165\u77ed\u4fe1\u53d1\u9001\u7cfb\u7edf", description: "<a href='http://client.motosms.com/login' target='_blank'>http://client.motosms.com/login</a>" },
                "0": { title: "\u7c21\u8a0a\u767c\u9001\u6210\u529f", icon: "check_circle", status: "success", content: mobile, description: "" },
                "101": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "102": { title: "\u77ed\u4fe1\u53d1\u9001\u5931\u8d25", icon: "error", status: "error", content: "", description: "" },
                "blacklisk": { title: "\u9280\u884c\u5361\u9ed1\u540d\u55ae", icon: "error", status: "error", blacklist: message, description: "" }
            } [status];
            if (!this.$$phase) { this.$apply(); }
            var dialog = new mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));
            dialog.listen("MDCDialog:accept", function() {
                window.open("http://client.motosms.com/login", "_blank");
            });
            dialog.listen("MDCDialog:cancel", function() {});
            dialog.show();
        }


        this.sendSms = function() {
            this.user.smss = false;
            this.sendMessage({
                command: 'apiFunctions.sendsms',
                params: this.user
            }).then((res) => {
                this.user.smss = res.status;
                this.dialog(res);
                this.putUser();
                this.$apply();
            });
        }


        this.getModule = function(objPath) {
            return new Promise((resolve, reject) => {
                var object = (objPath.includes('ctrl')) ? this : this.ctrl.model;
                (function repeater(object) {
                    var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object);
                    if (alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else {
                        if (typeof alphaVal == "object") {
                            if (Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) };
                        } else { resolve(alphaVal); }
                    }
                }(object));
            })
        }


        this.ajax = function({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) {
            return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows })
        }


        //this.apiFunction = new apiFunction(this);


    }

});