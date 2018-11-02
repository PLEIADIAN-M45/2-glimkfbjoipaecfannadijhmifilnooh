define([], function() {


    var pathname = location.pathname.split('.')[0].split('/').pop()

    var host = {
        "6326": "wa111",
        "6335": "wa111",
        "6317": "wa111",
        "6302": "wa111",
        "8876": "wa111",
        "26": "wa111",
        "16": "ku711",
        "": location.host.split('.')[1]
    } [location.port];

    var name = {
        "wa111": {
            "": "home",
            "index": "home",
            "login": "login",
            "memberlist": "list",
            "membermodify": "edit",
            "depositbonus": "bonus",
            "igetmemberinfo": "logs",
            "samebrowserlist": "log",
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
            "memberloginlog": "logs"
        }
    } [host.toLowerCase()][pathname.toLowerCase()];


    var path = ['@' + host, name].join('/');
    var root = ['@root', name].join('/');

    requirejs.config({
        map: {
            '*': {
                '@root': ['@root', name].join('/'),
                '@page': ['@' + host, name].join('/'),
                //'@api': ['@' + host, 'api'].join('/'),
                //'@map': ['@' + host, 'edit.map'].join('/')

            }
        }
    })


    return { host, name, path, root }
})




//var extend = [host, name].join('/');
//var root = ['@root', name].join('/');

/*requirejs.config({
    map                        : {
        '*'                    : {
            'root.App'         : ['module', 'root', 'app'].join('/'),
            'host.App'         : ['module', host, 'app'].join('/'),
            'root'             : ['module', 'root', route].join('/'),
            'host'             : ['module', host, route].join('/'),
            'host.Api'         : ['module', host, 'api'].join('/'),
        }
    }
})*/