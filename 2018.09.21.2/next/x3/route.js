define(function(require) {

    var port = location.port;
    var host = {
        "16": "ku711",
        "26": "wa111",
        "35": "wa111",
        "17": "wa111",
        "17": "wa111",
        "": location.host.split('.')[1]
    } [port];


    var pathname = location.pathname.toLowerCase().replace(/(\.html|.aspx)$/i, '');
    var filename = pathname.split('/').pop();

    var path = {
        "wa111": {
            "login": "login",
            "index": "index",
            "memberlist": "memberlist",
            "membermodify": "membermodify",
            "depositbonus": "depositbonus",
            "deltabank": "cashflow",
            "deltaonline": "cashflow",
            "deltawechat": "cashflow",
            "deltaalipay": "cashflow",
            "withdrawalsbank": "cashflow",
            "astropaywithdrawals": "cashflow"
        },
        "ku711": {
            "signin": "login",
            "index": "index",
            "memberlist": "memberlist",
            "membermodify": "membermodify",
            "depositbonus": "depositbonus",
            "deltabank": "cashflow",
            "deltaonline": "cashflow",
            "deltawechat": "cashflow",
            "deltaalipay": "cashflow",
            "withdrawalsbank": "cashflow",
            "astropaywithdrawals": "cashflow"
        }
    } [host][filename];

    var router = [host, path].join('/');
    var adapter = ['adapter', path].join('/');

    return { adapter, router, host, port };
})