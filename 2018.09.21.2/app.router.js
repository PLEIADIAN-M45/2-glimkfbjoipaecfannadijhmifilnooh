define([], function() {

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
        cookie: "/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
        device: "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
    }

    var ku711 = {
        "signin": "login",
        "member": "home",
        "memberinfomanage": "list",
        "editmemberinfomanage": "edit",
        "bonuslog": "bonus",
        "memberloginlog": "log",
        cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
        device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
    }

    class Router {
        constructor() {
            this.$router = { wa111, ku711 } [this.$server];
        }
    }

    return Router;
});