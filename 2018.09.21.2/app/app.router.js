define(["router.wa111", "router.ku711"], function(wa111, ku711) {
    //console.log(chrome.runtime);
    class Router {};

    var $searchParams = new URLSearchParams(window.location.search);

    var params = {};

    Array.from($searchParams).forEach(([name, value]) => { if (name && value) { params[name] = value } });

    var origin = window.location.origin;

    var account = params.account || params.member || params.accountId || params.accounts;

    var channel = localStorage.channel || params.siteNumber;

    var unique = [account, channel].join("-");

    Object.entries({ account, channel, unique, origin, params }).forEach(([name, value]) => {
        Router.prototype["$" + name] = value;
        Router.prototype[name] = value;
    });

    Object.entries(window.localStorage).forEach(([name, value]) => {
        Router.prototype["$" + name] = value;
        Router.prototype[name] = value;
    });

    with(Router.prototype) {
        var $locate = location.pathname.split(".")[0].split("/").pop().toLowerCase();
        var $master = "master";
        var $module = { wa111, ku711 }[$server][$locate];
        if ($module) {
            Router.prototype.$module = $module;
            Router.prototype.$master = "../$" + $master + "/" + $module;
            Router.prototype.$branch = "../$" + $server + "/" + $module;
            Router.prototype.$components = { "edit": ['edit.html', 'dialog.html'], "logs": ['cards.html'] }[$module];
            Router.prototype.$stylesheet = { "edit": ['edit.css'], "logs": ['logs.css', 'cards.css'] }[$module];
            return new Router();
        } else {
            return undefined;
        }
    }
});




//if (account) { account = account.toUpperCase() }




/* var $components = { "edit": ['edit.html', 'dialog.html'], "logs": ['cards.html'] } [$module];
 var $stylesheet = { "edit": ['edit.css'], "logs": ['logs.css', 'cards.css'] } [$module];*/


/*
            //Router.prototype.$loader = $loader;

 //$loader.$master = "../" + $master + "/" + $module;
            //$loader.$server = "../" + $server + "/" + $module;
  //var $common = "common";
        //var $loader = {};
   with(window.localStorage) {
       Router.prototype.$server = server;
       Router.prototype.$rootUrl = rootUrl;
       Router.prototype.$baseUrl = baseUrl;
       Router.prototype.$extensionId = extensionId;
   }
   */

/*

Object.entries(localStorage).forEach(([name, value]) => {
    //Router.prototype[name] = value
    Router.prototype["$" + name] = value
});

*/



/*

*/

/*
var $server = localStorage.server,
    $baseUrl = localStorage.baseUrl,
    $rootUrl = localStorage.rootUrl,
    $locate = location.pathname.split(".")[0].split("/").pop().toLowerCase(),
    $module = { wa111, ku711 } [$server][$locate];
    */




/*
//var $module = { wa111, ku711 } [$server][$locate];
    //console.log($module);

        Router.prototype["$loader"] = {
            $master: $master + "/" + $module,
            $server: $server + "/" + $module
        }

if ($module) {
    var $main = $server + "/main",
        $main_module = "main/" + $module,
        $vice_module = $server + "/" + $module;
} else { return undefined; }
*/

//Object.assign(Router.prototype, window.localStorage);
//Object.assign(Router.prototype, { $server, $locate, $module, $rootUrl });
//Object.assign(Router.prototype, { $main, $main_module, $vice_module });






//var url = 'http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber={siteNumber}&member={accountId}'


function router_decode() {
    /*
    class Router {
        constructor() {
            this.$router = {
                wa111,
                ku711
            } [this.server];
        }
    }
    return Router;*/
    console.log(window.siteNumber);

    var router = {
        wa111: {
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
        ku711: {
            "signin": "login",
            "member": "home",
            "memberinfomanage": "list",
            "editmemberinfomanage": "edit",
            "bonuslog": "bonus",
            "memberloginlog": "logs"
        }
    }


    /*
    console.log(btoa(JSON.stringify(router)));
    atob()
    var router = "eyJ3YTExMSI6eyJsb2dpbiI6ImxvZ2luIiwiaW5kZXgiOiJob21lIiwibWVtYmVybGlzdCI6Imxpc3QiLCJtZW1iZXJtb2RpZnkiOiJlZGl0IiwiZGVwb3NpdGJvbnVzIjoiYm9udXMiLCJpZ2V0bWVtYmVyaW5mbyI6ImxvZ3MiLCJzYW1lYnJvd3Nlcmxpc3QiOiJsb2dzIiwiZGVsdGFiYW5rIjoiY2FzaCIsImRlbHRhb25saW5lIjoiY2FzaCIsImRlbHRhd2VjaGF0IjoiY2FzaCIsImRlbHRhYWxpcGF5IjoiY2FzaCIsIndpdGhkcmF3YWxzYmFuayI6ImNhc2giLCJhc3Ryb3BheXdpdGhkcmF3YWxzIjoiY2FzaCJ9LCJrdTcxMSI6eyJzaWduaW4iOiJsb2dpbiIsIm1lbWJlciI6ImhvbWUiLCJtZW1iZXJpbmZvbWFuYWdlIjoibGlzdCIsImVkaXRtZW1iZXJpbmZvbWFuYWdlIjoiZWRpdCIsImJvbnVzbG9nIjoiYm9udXMiLCJtZW1iZXJsb2dpbmxvZyI6ImxvZ3MifX0=";
    var wa111 = "eyJsb2dpbiI6ImxvZ2luIiwiaW5kZXgiOiJob21lIiwibWVtYmVybGlzdCI6Imxpc3QiLCJtZW1iZXJtb2RpZnkiOiJlZGl0IiwiZGVwb3NpdGJvbnVzIjoiYm9udXMiLCJpZ2V0bWVtYmVyaW5mbyI6ImxvZ3MiLCJzYW1lYnJvd3Nlcmxpc3QiOiJsb2dzIiwiZGVsdGFiYW5rIjoiY2FzaCIsImRlbHRhb25saW5lIjoiY2FzaCIsImRlbHRhd2VjaGF0IjoiY2FzaCIsImRlbHRhYWxpcGF5IjoiY2FzaCIsIndpdGhkcmF3YWxzYmFuayI6ImNhc2giLCJhc3Ryb3BheXdpdGhkcmF3YWxzIjoiY2FzaCJ9"
    var ku711 = "eyJzaWduaW4iOiJsb2dpbiIsIm1lbWJlciI6ImhvbWUiLCJtZW1iZXJpbmZvbWFuYWdlIjoibGlzdCIsImVkaXRtZW1iZXJpbmZvbWFuYWdlIjoiZWRpdCIsImJvbnVzbG9nIjoiYm9udXMiLCJtZW1iZXJsb2dpbmxvZyI6ImxvZ3MifQ=="
    */


}