 class Factory2 {
            constructor(c) {
                this.$sendMessage = $sendMessage
            }
            get $mdc() { return mdc }
            get $dexie() { return $dexie }
            get $xmlSpider() { return $xmlSpider }
            get $params() {
                return Array.from(this.$searchParams).serialize(); //instance
            }
            
            get $account() { return this.$params.account || this.$params.member; }
            get $channel() { return localStorage.channel }
            get $unique() { return [this.$account, this.$channel].join("-"); }

            get isExit() { return this.referrer.includes('Exit') || this.referrer.includes('SignOut'); }

            /*
            $sendMessage(message) {
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
            }*/

            getUser() {
                return this.$sendMessage({ command: 'apiFunctions.store.user.get', params: this.$unique })
                //.then((user) => {console.log(user);return user)})
            }

            delUser() {
                console.log(this);
                return this.$sendMessage({ command: 'apiFunctions.store.user.del', params: this.$unique })
            }

            putUser(user) {
                //console.log('putUser:', user);
                return this.$sendMessage({ command: 'apiFunctions.store.user.put', params: user || this.user })
                    .then((user) => {
                        console.log("putUser", user);
                        return user
                    })
            }

            createTab(_url) { window.open(_url, "_blank"); }

            cut(e) { document.execCommand("cut"); }
            copy(e) { document.execCommand("copy"); }
            paste(e) { document.execCommand("paste"); }

            getModule(objPath) {
                return new Promise((resolve, reject) => {
                    var object = (objPath.includes('ctrl')) ? this : this.ctrl.model;
                    (function repeater(object) {
                        var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object);
                        if (alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else {
                            if (typeof alphaVal == "object") {
                                if (Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) };
                            } else { resolve(alphaVal); }
                        }
                    }(object));
                });
            }

            $ajax({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) {
                return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows })
            }

            get elements() {
                return ["span", "input", "select", "button", "a"]
                    .map((el) => { return Array.from(document.querySelectorAll(el)) })
                    .flat().filter((elem) => { return elem.name || elem.id; });
            }

            get $model() {
                return this.elements.map((elem) => {
                    return [_sname_(elem), _model_(elem)]
                }).serialize();
            }

            get ctrl() {
                return this.elements.map((elem) => {
                    return [_sname_(elem), elem];
                }).serialize();
            }

            get $ctrl() {
                return this.elements.map((elem) => {
                    return [_sname_(elem), $(elem)];
                }).serialize();
            }
        }
