'use strict';

function bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function(ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}


var arr = [73, 32, 194, 189, 32, 226, 153, 165, 32, 240, 159, 146, 169];
var data = new Uint8Array(arr);

var base64 = bufferToBase64(data); // "SSDCvSDimaUg8J+SqQ=="