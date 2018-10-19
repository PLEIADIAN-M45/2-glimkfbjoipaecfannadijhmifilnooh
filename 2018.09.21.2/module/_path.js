
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
