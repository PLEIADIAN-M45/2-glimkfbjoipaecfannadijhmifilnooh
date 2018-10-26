var paths = {
    "ASPX": ['LOGIN', 'INDEX', 'MEMBERLIST', 'MEMBERMODIFY', 'DEPOSITBONUS', "DELTABANK", "DELTAONLINE", "DELTAWECHAT", "DELTAALIPAY", "WITHDRAWALSBANK", "ASTROPAYWITHDRAWALS"],
    "MEMBER": ['signin']
}

define(function(require) {
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




/*
compiledWrapper
apply
boostrap_node.js
module
exports
startup
_compile
process
process.binding('natives');
argv
runMain
wrap
*/




/*
    var namedModule = require('name');

return {
    name: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
};

*/


/*
requirejs(['path'], function(path) {
    console.log(path);
    console.log(win32, posix);
    var path = posix.parse(location.href);
    console.log(path);
    var path = win32.parse(location.href);
    console.log(path);
})

*/
/*
compiledWrapper
apply
boostrap_node.js
module
exports
startup
_compile
process
process.binding('natives');
argv
runMain
wrap
*/

//console.log(location.pathname);
/*
var allParts = location.pathname.split('/').slice(1);
var len = allParts.length;
console.log(allParts);

var name = allParts[0];
var lastName = allParts.pop();
var fileName = lastName.split('.')[0];
var ext = lastName.split('.')[1];
*/