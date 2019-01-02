define([], function() {
  
    var wa111                  = {
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
    }

    var ku711                  = {
        "signin"               : "login",
        "member"               : "home",
        "memberinfomanage"     : "list",
        "editmemberinfomanage" : "edit",
        "bonuslog"             : "bonus",
        "memberloginlog"       : "log"
    }

    class Router {
        constructor() {
            this.$router = { wa111, ku711 }
        }
    }

    return Router;
});