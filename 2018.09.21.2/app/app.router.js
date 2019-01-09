define(["router.wa111", "router.ku711"], function(wa111, ku711) {

    var $server = localStorage.server,
        $baseUrl = localStorage.baseUrl,
        $rootUrl = localStorage.rootUrl,
        $locate = location.pathname.split(".")[0].split("/").pop().toLowerCase(),
        $module = { wa111, ku711 } [$server][$locate];

    if($module) {

        var $main = $server + "/main",
            $main_module = "main/" + $module,
            $vice_module = $server + "/" + $module;

        var $components = { "edit": ['edit.html', 'dialog.html'], "logs": ['cards.html'] } [$module];
        var $stylesheet = { "edit": ['edit.css'], "logs": ['logs.css', 'cards.css'] } [$module];

    } else { return undefined; }

    class Router {};
    //Object.assign(Router.prototype, window.localStorage);
    Object.assign(Router.prototype, { $server, $locate, $module, $rootUrl, $components, $stylesheet });
    Object.assign(Router.prototype, { $main, $main_module, $vice_module });
    return new Router();
});




















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