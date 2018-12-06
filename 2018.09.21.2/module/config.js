define([], function() {
    return new function() {
        this.project                   = './' + this.host + "/" + this.route;
        this.port                      = location.port;
        this.path                      = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.host                      = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1];
        this.route                     = {
            "wa111"                    : {
                "login"                : "sign",
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
                "signin"               : "sign",
                "member"               : "home",
                "memberinfomanage"     : "list",
                "editmemberinfomanage" : "edit",
                "bonuslog"             : "bonus",
                "memberloginlog"       : "log"
            }
        } [this.host][this.path];
    }
});


/*

In the manifest file :

https://stackoverflow.com/questions/9057292/requirejs-in-a-chrome-extension

*/