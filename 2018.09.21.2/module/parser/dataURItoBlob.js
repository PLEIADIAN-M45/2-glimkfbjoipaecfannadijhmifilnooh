function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}


var dataURL = canvas.toDataURL('image/jpeg', 0.5);
var blob = dataURItoBlob(dataURL);
var fd = new FormData(document.forms[0]);
fd.append("canvasImage", blob);


var ab = new ArrayBuffer(byteString.length);
var ia = new Uint8Array(ab);
new Blob([ab], { type: 'image/jpeg' });











var str = "RUNOOB";
var enc = window.btoa(str);
var dec = window.atob(enc);

var res = "编码字符串为: " + enc + "<br>" + "解码后字符串为: " + dec;