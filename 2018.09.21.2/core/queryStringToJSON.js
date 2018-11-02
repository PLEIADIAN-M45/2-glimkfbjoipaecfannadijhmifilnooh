define([], function() {
    function queryStringToJSON(querystring) {
        var pairs = query_string.split('&');
        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        console.log(result);
        return qs;
    }
});



function qsToObj() {
    sender.url.split('?')[1].split('&').map((x) => {
        var str = "obj." + x.replace("=", "='") + "'";
        eval(str);
        console.log(obj);
    })
    sender.url.split('?')[1].split('&').map((x) => {
        console.log(x.concat('"'));
        var str = "obj." + x.replace(/=(.+)/g, '="$1"');
    })
}

function toObj([name, value]) {
    console.log(name, value);
}
//location.search.slice(1).split('&');