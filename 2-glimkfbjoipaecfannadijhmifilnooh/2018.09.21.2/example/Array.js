var map = Array.prototype.map;
var a = map.call('Hello World', function(x) {
    return x.charCodeAt(0);
});