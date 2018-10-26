define(['aes', 'md5', 'hmac-md5'], function() {
    var aes = (function() {
        var extId = chrome.runtime.id || evo.extensionId;
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

            console.log(decrypted);
            return decrypted;
        }
        return my;
    }());

    window.aes = aes;
})






















function xx() {
    define(['aes', 'md5', 'hmac-md5'], function() {
        var Aes = function() {};
        /*Aes.prototype.key = CryptoJS.MD5(me.email);
        Aes.prototype.iv = CryptoJS.MD5(me.id);*/
        console.log(evo.extensionId);


        Aes.prototype.key = CryptoJS.MD5(evo.extensionId);
        Aes.prototype.iv = CryptoJS.MD5(evo.extensionId);

        Aes.prototype.encrypt = function(str) {
            var self = this;
            var encrypted = CryptoJS.AES.encrypt(str, self.key, {
                iv: self.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            var _encrypted = encrypted.toString();
            return _encrypted;
        }
        Aes.prototype.decrypt = function(str) {
            console.log(str);
            var self = this;
            var decrypted = CryptoJS.AES.decrypt(str, self.key, {
                iv: self.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            var _decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
            return _decrypted;
        }
        window.aes = new Aes();
        return window.aes;
    })

}