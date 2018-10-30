function base64ToBuffer(base64) {
    var binstr = atob(base64);
    var buf = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function(ch, i) {
        buf[i] = ch.charCodeAt(0);
    });
    return buf;
}

var base64 = "SSDCvSDimaUg8J+SqQ==";

var buf = base64ToBuffer(base64);

var arr = Array.prototype.slice.call(buf);
// "I ½ ♥ 💩";
// [73, 32, 194, 189, 32, 226, 153, 165, 32, 240, 159, 146, 169]