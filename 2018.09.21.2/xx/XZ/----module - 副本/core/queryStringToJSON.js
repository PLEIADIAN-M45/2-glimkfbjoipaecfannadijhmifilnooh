define([], function() {
    function queryStringToJSON(querystring) {
        var pairs = query_string.split('&');
        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        console.log(result);
    }

    return qs


});




//location.search.slice(1).split('&');