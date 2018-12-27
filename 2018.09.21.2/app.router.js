define([], function() {
    var router = {
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
            "astropaywithdrawals": "cash",
            //cookie: "/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
            //device: "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
        },
        "ku711": {
            "signin": "login",
            "member": "home",
            "memberinfomanage": "list",
            "editmemberinfomanage": "edit",
            "bonuslog": "bonus",
            "memberloginlog": "log",
            //cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
            //device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
        }
    };

    return function Router() {
        Object.assign(this, window.location, window.localStorage);
        this.searchParams = new URLSearchParams(this.search);
        this.isTest = (this.hostname == "127.0.0.1") ? true : false;
        this.locator = this.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.router = router[this.server][this.locator];
        this.main = ["module", this.server, "main"].join("/");
        this.service = (this.router) ? ["module", this.server, this.router].join("/") : undefined;
    }
});






















//console.log(this.service);
//if (service) { this.service = ["module", this.server, service].join("/"); }
//console.log(this.server);
//console.log(this.server);
/*this.extensionId = localStorage.extensionId;
this.server = localStorage.server;
this.rootUrl = localStorage.rootUrl;
this.baseUrl = localStorage.baseUrl;*/
//return new Router();
//console.log(Object);
//Object.ext = function() {}
//Router.extend(location)
//Object.assign(Router.prototype, location);
//return new Router();
//if (this.hostname == "127.0.0.1") { this.test = true; }
//this.server = (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : this.host.split(".")[1];




/*
//console.log(localStorage.server);
with(location) {
    //console.log(href);
}
with(localStorage) {
    console.log(server);
    var a = 5
}
console.log(a);
*/



//this.origin                          = location.origin;
//this.pathname                        = location.pathname;
//this.port                            = location.port;
//this.join(localStorage);
//console.log(this);