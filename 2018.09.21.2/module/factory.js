define(['angular', 'Dexie', 'moment', 'material', 'semantic', '../prototype'], function(angular, Dexie, moment, mdc, semantic) {

    var dexie = new Dexie('evo');
    dexie.version(1).stores({ user: 'f_accounts' });

    return function factory() {
        this.port = location.port;
        this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.host = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1];
        this.route = {
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
        this.operator = localStorage.operator;
        this.channel = localStorage.channel;
        this.extensionId = localStorage.extensionId;
        this.origin = location.origin;
        this.searchParams = new URLSearchParams(location.search);
        this.params = Array.from(this.searchParams).serialize();
        this.account = this.params.account;
        this.referrer = document.referrer;
        this.forms = document.forms;
        this.form = document.forms[0];
        this.isExit = this.referrer.includes('Exit') || this.referrer.includes('SignOut')
        this.dexie = dexie;
        this.responseType = { text(res) { return res.text(); }, json(res) { return res.json(); } }
        this.unique = [this.account, this.channel].join("-");
        this.components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.route];
        this.stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.route];
        this.elements = ["span", "input", "select", "button"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; });
        this.model = this.elements.map((elem) => { return [elem.sname, elem.model]; }).serialize();
        this.ctrl = this.elements.map((elem) => { return [elem.sname, elem]; }).serialize();
        this.assign = function() { Object.assign(this, ...arguments) };
        this.apply = function(res) { if (!this.$$phase) { this.$apply(); }; return res; }
        this.extend = function(args) { Object.entries(args).map(([a, b]) => { this.__proto__[a] = b; }) }
        this.sendMessage = function(message) {
            return new Promise((resolve, reject) => {
                //console.log(this.extensionId, message);
                chrome.runtime.sendMessage(this.extensionId, message, (res) => {
                    //console.log(res);
                    try { resolve(res) } catch (ex) { reject(ex) }
                })
            })
        }
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

        /*
        this.sendsms = new function() {

            console.log(this);

            return {
                status: 2,
                send: function() {
                    console.log(this);
                    console.log(this.sendMessage);
                }
            }

        }*/

    }
});