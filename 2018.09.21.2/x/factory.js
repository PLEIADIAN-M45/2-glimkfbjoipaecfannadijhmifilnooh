define([], function() {



        function $sendMessage(message) {
            var $extensionId = localStorage.$extensionId;
            return new Promise((resolve, reject) => {
                if($extensionId && message) {
                    chrome.runtime.sendMessage($extensionId, message, (res) => {
                        if(res) { res.active = false; }
                        try { resolve(res) } catch (ex) { reject(ex) }
                    })
                } else {
                    console.error(this);
                    reject(101)
                }
            })
        }

        function getUser() {
            return this.$sendMessage({ command: 'apiFunctions.store.user.get', params: this.$unique })
            //.then((user) => {console.log(user);return user)})
        }

        function delUser() {
            return this.$sendMessage({ command: 'apiFunctions.store.user.del', params: this.unique })
        }

        function putUser(user) {
            //console.log('putUser:', user);
            return this.$sendMessage({ command: 'apiFunctions.store.user.put', params: user || this.user })
            //.then((user) => {                        console.log(user);                        return user                    })
        }

        function createTab(_url) { window.open(_url, "_blank"); }

        function cut(e) { document.execCommand("cut"); }

        function copy(e) { document.execCommand("copy"); }

        function paste(e) { document.execCommand("paste"); }

        function getModule(objPath) {
            return new Promise((resolve, reject) => {
                var object = (objPath.includes('ctrl')) ? this : this.ctrl.model;
                (function repeater(object) {
                    var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object);
                    if(alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else {
                        if(typeof alphaVal == "object") {
                            if(Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) };
                        } else { resolve(alphaVal); }
                    }
                }(object));
            });
        }


        return [$sendMessage, $dexie]


})