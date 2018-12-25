define([], function() {

    function Router() {
        
        Object.assign(this, location);

        this.searchParams = new URLSearchParams(location.search);

        this.shortPath = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();

        this.serverName = (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : this.host.split(".")[1];

        this.moduleId = {
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
        } [this.serverName][this.shortPath];


        this.router = {
            wa111: {
                cookie: "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                device: "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
            },
            ku711: {
                cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
                device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
            }
        } [this.serverName];

        for (var key in this.router) { this.router[key] = this.router[key].replace('#1', this.channel).replace('#2', this.account); }

    }



    // Object.assign(Router.prototype, location);



    Router.prototype.serverName2 = (function() {
        return "456"
    }());


    return Router

    //Router.prototype = Object.create(location);





    return class Router {

        get pathname() {
            return location.pathname
        }
    }

    return function() {
        this.pathname = location.pathname;
        this.port = location.port;
        this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.host = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1];
        this.origin = location.origin;
        this.searchParams = new URLSearchParams(location.search);
        this.router = {
            wa111: {
                cookie: "/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                device: "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
            },
            wa1112: {
                cookie: "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                device: "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
            },
            ku711: {
                cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
                device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
            }
        } [this.host];
        for (var key in this.router) { this.router[key] = this.router[key].replace('#1', this.channel).replace('#2', this.account); }

        this.moduleId = {
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

})

/*
wa11122: {
    cookie: "/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
    device: "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
},

*/