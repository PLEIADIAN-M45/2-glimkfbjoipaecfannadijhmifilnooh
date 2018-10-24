var aes = (function() {
    var extId = chrome.runtime.id;
    var key = CryptoJS.enc.Utf8.parse(extId);
    var iv = CryptoJS.enc.Utf8.parse(extId);
    var my = {};
    my.encrypt = function(str) {
        var encrypted = CryptoJS.AES.encrypt(str, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        encrypted = encrypted.toString();
        return encrypted;
    }
    my.decrypt = function(str) {
        var decrypted = CryptoJS.AES.decrypt(str, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
        try {
            return angular.fromJson(decrypted)
        } catch (ex) {
            return decrypted
        }
    }
    return my;
}());

