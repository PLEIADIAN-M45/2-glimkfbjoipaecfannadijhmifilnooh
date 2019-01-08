define([], function() {

    console.log(window.siteNumber);

    var wa111 = {
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
        "cookie": "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
        "device": "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
    }

    var ku711 = {
        "signin": "login",
        "member": "home",
        "memberinfomanage": "list",
        "editmemberinfomanage": "edit",
        "bonuslog": "bonus",
        "memberloginlog": "logs",
        "cookie": "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
        "device": "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
    }

    if(window.location.hostname == "127.0.0.1") {
        wa111.cookie = "/IGetMemberInfo.aspx?siteNumber=#1&member=#2"
        wa111.device = "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1"
    }

    var $server = localStorage.server;
    var $locate = location.pathname.split(".")[0].split("/").pop().toLowerCase();
    var $router = { wa111, ku711 } [$server];
    var $module = $router[$locate];

    return {
        $server,
        $locate,
        $router,
        $module
    }



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
});


//var url = 'http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber={siteNumber}&member={accountId}'