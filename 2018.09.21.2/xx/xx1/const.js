define([], function() {


    //console.log(require.toUrl("."));


    return new function() {
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


        this.project = './' + this.host + "/" + this.route;

        //require.toUrl("./" + this.host)


    }
})






/*
return {
    port                               : location.port,
    path                               : location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase(),
    host                               : (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1],
    route                              : {
        "wa111"                        : {
            "login"                    : "login",
            "index"                    : "home",
            "memberlist"               : "list",
            "membermodify"             : "edit",
            "depositbonus"             : "bonus",
            "igetmemberinfo"           : "logs",
            "samebrowserlist"          : "logs",
            "deltabank"                : "cash",
            "deltaonline"              : "cash",
            "deltawechat"              : "cash",
            "deltaalipay"              : "cash",
            "withdrawalsbank"          : "cash",
            "astropaywithdrawals"      : "cash"
        },
        "ku711"                        : {
            "signin"                   : "login",
            "member"                   : "home",
            "memberinfomanage"         : "list",
            "editmemberinfomanage"     : "edit",
            "bonuslog"                 : "bonus",
            "memberloginlog"           : "log"
        }
    }
}


class Evo {
    constructor() {
        this.port                      = location.port;
        this.path                      = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
        this.host                      = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1];
        this.route                     = {
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
    }
}

return new Evo()
})
*/


define(function(require, exports, module) {

    console.log(module);

    console.log(exports);


    /*
    var a                              = require('a'),
        b                              = require('b');*/

    //Return the module value
    return function() {};
});