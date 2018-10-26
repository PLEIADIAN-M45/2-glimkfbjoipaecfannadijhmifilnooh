
var path = {};
var splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
var splitTailRe =
    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

function win32SplitPath(filename) {
    // Separate device+slash from tail
    var result = splitDeviceRe.exec(filename),
        device = (result[1] || '') + (result[2] || ''),
        tail = result[3] || '';
    // Split the tail into dir, basename and extension
    var result2 = splitTailRe.exec(tail),
        dir = result2[1],
        basename = result2[2],
        ext = result2[3];
    return [device, dir, basename, ext];
}
path.parse = function(pathString) {

    var url = new URL(pathString);
    var { pathname, searchParams, hostname, search, href } = new URL(pathString);

    console.log(url);
    var query = {};

    href.split('?')[1].split('&').map((x) => {
        return x.split('=')
    }).map(([name, value]) => {
        query[name] = value;
    })

    console.log(query);

    console.log(c);
    var host = hostname.split('.')[1];
    var filename = pathname.split('/').pop();
    var ext = filename.split('.')[1];
    var name = filename.split('.')[0];
    var is = function(str) {
        console.log(str, this.name);
    }
    return {
        host,
        filename,
        ext,
        name,
        is
    }


    //console.log(name);


    //console.log(pathname.split('/'));

    //console.log(url.searchParams.entries());

    var c = [...url.searchParams.entries()].map(function([name, value]) { return this[name] = value; }, {});

    //console.log(c);

    /* var allParts = win32SplitPath(pathString);
     if (!allParts || allParts.length !== 4) {
         throw new TypeError("Invalid path '" + pathString + "'");
     }
     return {
         root: allParts[0],
         dir: allParts[0] + allParts[1].slice(0, -1),
         base: allParts[2],
         ext: allParts[3],
         name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
     };*/
};
path.is = function(pathString) {
    //console.log(this);
    //console.log(pathString);
}




    console.log(route);





    return

    //.replace(/(\.html|.aspx)/, '');

    var splitPath = "/";
    var pathname = location.pathname.replace(/(\.html|.aspx)$/i, '').toUpperCase()
    var allParts = pathname.split(splitPath).slice(1);
    var len = allParts.length;

    var name = allParts[0];
    var last = allParts[len - 1];
    switch (last) {
        case "DELTABANK":
        case "DELTAONLINE":
        case "DELTAWECHAT":
        case "DELTAALIPAY":
        case "WITHDRAWALSBANK":
        case "ASTROPAYWITHDRAWALS":
            last = "CASHFLOW"
            break;
        default:

            break;
    }

    var root = [name, last].join(splitPath);
    var core = ['core', last].join(splitPath);

    var PATH = paths[name];
    var pass = PATH.includes(last);
    var back = !pass;
    return {
        core,
        pass,
        root,
        name,
        last,
        pathname,
        name
    }
})
 get route() {
            //console.log(super);
            var _route = this.filename.replace(/(\.\w+)/i, '').toLowerCase();
            // console.log(_route);

            if (_route) {
                switch (_route) {

                    case "MemberLog".toLowerCase():

                        _route = "MemberLog";


                        break;


                    case "IGetMemberInfo".toLowerCase():
                    case "MemberLoginLog".toLowerCase():
                    case "SameBrowserList".toLowerCase():
                        //console.log('MemberLoginLog');
                        _route = "MemberLoginLog";
                        break;

                    case "WebMemberInfo".toLowerCase():
                    case "WebMemberInfoForPhoto".toLowerCase():
                        _route = "MemberLoginLogxxxxxxxxxxxx";
                        break;
                    case "EditMemberInfoManage".toLowerCase():
                    case "MemberModify".toLowerCase():
                        _route = "MemberModify";
                        break;
                    case "MemberInfoManage".toLowerCase():
                    case "MemberList".toLowerCase():
                        _route = "MemberList"
                        break;



                    case "BonusLog".toLowerCase():
                    case "DepositBonus".toLowerCase():
                        _route = "MemberBonus"
                        break;
                    case "Member".toLowerCase():
                    case "Index".toLowerCase():
                        _route = "Index";
                        break;
                    case "signin".toLowerCase():
                    case "Login".toLowerCase():
                        _route = "Login";
                        break;
                    case "DeltaBank".toLowerCase():
                    case "DeltaOnline".toLowerCase():
                    case "DeltaWeChat".toLowerCase():
                    case "DeltaAlipay".toLowerCase():
                    case "WithdrawalsBank".toLowerCase():
                    case "AstropayWithdrawals".toLowerCase():
                        _route = "Cashflow";
                        break;
                    default:
                        return undefined;
                        break;
                }
                evo.extend = this.host + '/' + _route;
                return _route;
            }
        }

var paths = {
    "wa111": ['login', 'index', 'memberlist', 'membermodify', 'depositbonus', "deltabank", "deltaonline", "deltawechat", "deltaalipay", "withdrawalsbank", "astropaywithdrawals"],
    "ku711": ['signin']
}
/*
switch (filename) {
    case "login":
    case "index":
    case "memberlist":
    case "membermodify":
    case "depositbonus":
        var route = filename;
        break;
    case "deltabank":
    case "deltaonline":
    case "deltawechat":
    case "deltaalipay":
    case "withdrawalsbank":
    case "astropaywithdrawals":
        var route = "cashflow";
        break;
    default:
        var route = undefined;
        break;
}*/