define([], function() {
    return function() {
        this.searchParams = new URLSearchParams(location.search);
        this.origin = location.origin;
        this.pathname = location.pathname;
        this.port = location.port;
        this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.host = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1];
        this.moduleId                  = {
            "wa111"                    : {
                "login"                : "login",
                "index"                : "home",
                "memberlist"           : "list",
                "membermodify"         : "edit",
                "depositbonus"         : "bonus",
                "igetmemberinfo"       : "logs",
                "samebrowserlist"      : "logs",
                "deltabank"            : "cash",
                "deltaonline"          : "cash",
                "deltawechat"          : "cash",
                "deltaalipay"          : "cash",
                "withdrawalsbank"      : "cash",
                "astropaywithdrawals"  : "cash"
            },
            "ku711"                    : {
                "signin"               : "login",
                "member"               : "home",
                "memberinfomanage"     : "list",
                "editmemberinfomanage" : "edit",
                "bonuslog"             : "bonus",
                "memberloginlog"       : "log"
            }
        } [this.host][this.path];
        this.components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.moduleId];
        this.stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.moduleId];
    }
});