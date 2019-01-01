define(["app.Config"], function(Config) {
    
    var router = {};
    
    router.wa111 = {
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
    }

    router.ku711 = {
        "signin": "login",
        "member": "home",
        "memberinfomanage": "list",
        "editmemberinfomanage": "edit",
        "bonuslog": "bonus",
        "memberloginlog": "log",
    }


    return router



    class Router {
        constructor(x) {
            console.log(this.server);
        }

        get router() { return router }


        get wa111() {
            return {
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
            }
        }

        get ku711() {
            return {
                "signin": "login",
                "member": "home",
                "memberinfomanage": "list",
                "editmemberinfomanage": "edit",
                "bonuslog": "bonus",
                "memberloginlog": "log",
            }
        }

        get router() { return router }
    }

    return Router


})







/*
   var router = {};

   router.wa111 = {
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
   }

   router.ku711 = {
       "signin": "login",
       "member": "home",
       "memberinfomanage": "list",
       "editmemberinfomanage": "edit",
       "bonuslog": "bonus",
       "memberloginlog": "log",
   }
   */