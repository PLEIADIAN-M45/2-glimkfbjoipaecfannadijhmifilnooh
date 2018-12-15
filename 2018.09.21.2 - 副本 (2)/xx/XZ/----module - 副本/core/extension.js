
define(['evo'], function(evo) {
    class Extension {
        constructor() {
            this.sessionStorage = this.builder('sessionStorage')
            this.localStorage = this.builder('localStorage')
        }
        builder(storageArea) {
            return {
                async getItem(key) {
                    return new Promise(function(resolve, reject) {
                        chrome.runtime.sendMessage(evo.extensionId, {
                            storage: storageArea,
                            method: 'getItem',
                            key: key
                        }, resolve);
                    })
                },
                async setItem(key, value) {
                    return new Promise(function(resolve, reject) {
                        chrome.runtime.sendMessage(evo.extensionId, {
                            storage: storageArea,
                            method: 'setItem',
                            key: key,
                            value: value
                        }, resolve);
                    })
                },
                async removeItem(key) {
                    chrome.runtime.sendMessage(evo.extensionId, {
                        storage: storageArea,
                        method: 'removeItem',
                        key: key,
                    }, resolve);
                }
            }
        }
    }

    const extension = new Extension();
    window.extension = extension;
    return extension;
})