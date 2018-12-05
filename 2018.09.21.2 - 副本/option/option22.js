var run = false;
var run = true;

var chromeVersion = navigator.userAgent.match(/Chrome\/(\d+\.?)+/g);
chromeVersion = chromeVersion[0].split('/')[1]

const getAuthToken = function(_interactive) {
    return new Promise(function(resolve, reject) {
        chrome.identity.getAuthToken({
            "interactive": _interactive
        }, resolve)
    })
}

const getProfileUserInfo = function() {
    return new Promise(function(resolve, reject) {
        chrome.identity.getProfileUserInfo(resolve)
    })
}

var oauth2 = new function() {
    this.tokeninfo = function() {}
    this.certs = function() {}
    this.userinfo = function() {}
    this.me = function() {}
}

const getTokenInfo = function(token) {
    return new Promise(function(resolve, reject) {
        if (token) {
            $.post('https://www.googleapis.com/oauth2/v2/tokeninfo', {
                access_token: token
            }, function(tokenInfo) {
                localStorage.tokenInfo = angular.toJson(tokenInfo, true)
                window.tokenInfo = tokenInfo
                resolve()
            }).fail(reject)
        } else {
            throw "without token";
        }
    })
}

const getCertForOpenIdConnect = function() {
    return new Promise(function(resolve, reject) {
        $.get('https://www.googleapis.com/oauth2/v2/certs', resolve)
    })
}

const getStorageSync = function(keys) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get(keys, resolve)
    })
}

const getBytesInUse = function(keys) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.getBytesInUse(keys, resolve)
    })
}

var sync = new function() {
    this.getItem = function(keys) {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.get(keys, resolve)
        })
    }
    this.setItem = function(obj) {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.set(obj, resolve)
        })
    }
    this.remove = function(keys) {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.remove(keys, resolve)
        })
    }
    this.clear = function() {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.clear(resolve)
        })
    }
    this.getBytesInUse = function(keys) {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.getBytesInUse(keys, resolve)
        })
    }
    this.getBytesInUse = function(keys) {
        return new Promise(function(resolve, reject) {
            chrome.storage.sync.getBytesInUse(keys, resolve)
        })
    }
}

var local = new function() {
    this.setItem = function(name, value) {
        switch (typeof value) {
            case "object":
            case "array":
                value = JSON.stringify(value);
                break;
        }
        localStorage.setItem(name, value);
        return value;
    }
    this.getItem = function(name) {
        var value = localStorage.getItem(name);
        if (value) {
            try {
                return JSON.parse(value)
            } catch (ex) {
                return value
            }
        }
    }
    this.remove = function(key) {
        localStorage.removeItem(key);
    }
}

var createTabs = function(path) {
    chrome.tabs.create({
        url: path,
        active: false
    }, function(tab) {});
};

jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    },
    uncheck: function() {
        return this.each(function() {
            this.checked = false;
        });
    }
});

jQuery.fn.extend({
    active: function() {
        return this.each(function() {
            this.classList.add('active');
        });
    },
    inactive: function() {
        return this.each(function() {
            this.classList.remove('active');
        });
    }
});


jQuery.fn.extend({
    hidden: function() {
        return this.each(function() {
            this.classList.add('hide');
        });
    },
    display: function() {
        return this.each(function() {
            this.classList.remove('hide');
        });
    }
});

var removeCachedAuthToken = function() {
    chrome.identity.removeCachedAuthToken({
        token: localStorage.token
    }, function() {
        console.log('CachedAuthToken Removed.');
    });
};

var launchWebAuthFlowUrl = chrome.identity.getRedirectURL();
var access_token;
var script = {
    exec: function(fn) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
                dataType: 'text',
                data: {
                    audience: tokenInfo.audience,
                    fn: fn
                }
            }).then(resolve).fail(reject)
        })
    },
    run: function() {}
}

function s(o) {
    console.log(o);
}

function getForms(obj) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
            dataType: 'json',
            data: {
                audience: window.tokenInfo.audience,
                spreadsheet: obj.spreadsheet,
                sheet: obj.sheet
            }
        }).then(resolve).fail(reject)
    })
}


/*  getForms({
       spreadsheet: '1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY',
       sheet: 'forms'
   }).then(s)*/
/*
var map = new Map(GB2260)
console.log(map);*/


/*       var value = local.getItem('IPAddress')
       value = aes.decrypt(value);
       value = JSON.parse(value);
       console.log(...value);*/
//, function($controllerProvider) {        controllerProvider = $controllerProvider;    }
/*
.config(function($controllerProvider, $compileProvider, $provide) {
        console.log($controllerProvider);
        console.log($compileProvider);
        console.log($provide);

    })*/


var myApp2 = angular.module('myApp33', [])

    .controller('myCtrl92', function($scope, $http, $timeout) {

        console.log(222);
        $scope.a = 4
        return
        getProfileUserInfo()
            .then(userInfo => {
                local.setItem('userInfo', userInfo);
                $scope.userInfo = userInfo;
                $scope.$apply();
            })


        $scope.dashboards = dashboards;
        $scope.config = config;
        window.$scope = $scope;
        $scope.version = chrome.runtime.getManifest().version.replace(/\./g, '_');
        $scope.checkChromeVersion = function() {
            var minimum_chrome_version = '67.0.3396.87'
            if (chromeVersion < minimum_chrome_version) {
                $('#dimmer-body').inactive();
                $('#update-message').display();
            } else {
                $scope.getAuthToken();
            }
        }


        function getGB2260() {
            if (localStorage["GB2260"] == undefined) {
                getForms({
                    spreadsheet: '14QeaJYYKAd9_ch7fWhNHREjvva5jiHuv6IWtxZ_1Dy0',
                    sheet: 'GB2260'
                }).then(function(d) {
                    d.shift();
                    localStorage["GB2260"] = angular.toJson(d)
                })
            }
        }


        $scope.getAuthToken = function() {
            getAuthToken(true)
                .then(getTokenInfo)
                .then(function() {
                    getGB2260();
                    $scope.getDangerIP();
                    $scope.getMyConfig();
                    $scope.getMessages();
                    $scope.getAccusation();
                    $scope.getSensitive();
                    $scope.getBlackList();
                    $scope.getBlackPhone();
                    $scope.getDashboards();
                })
        }




        $scope.getMyConfig = function() {
            $('.dropdown').dropdown();
            $("input[type=text]").click(function() { $(this).select(); });
            chrome.storage.sync.get(null, function(items) {
                Object.entries(items).forEach(function([key, value]) {
                    //console.log(value);
                    if (value) {
                        if (typeof value == 'object') {
                            $scope[key] = value;
                            var _value = JSON.stringify(value);
                            _value = aes.encrypt(_value);
                            localStorage[key] = _value;
                        } else {
                            try {
                                value = aes.decrypt(value);
                                $scope[key] = JSON.parse(value);
                            } catch (ex) {
                                $scope[key] = value;
                            }
                        }
                    }
                    $scope.$apply();
                })
            })
        }


        $scope.getDangerIP = function() {
            script.exec('getDangerIP')
                .then(function(value) {
                    local.setItem('IPAddress', value);
                })
        }
        $scope.getBlackPhone = function() {
            script.exec('getBlackPhone').then((value) => { local.setItem('BlackPhone', value); })

        }


        $scope.getSensitive = function() {
            script.exec('getSensitive')
                .then(function(value) {
                    local.setItem('sensitive', value);
                })
        }

        function dec(value) {
            var _value = aes.decrypt(value);
            console.log(_value);
        }

        $scope.getMessages = function() {
            script.exec('getMessages')
                .then(function(value) { localStorage.sms = value; })
        }



        $scope.getAccusation = function() {
            script.exec('getAccusation')
                .then(function(value) {
                    local.setItem('accusation', value);
                })
        }


        $scope.getDashboards = function() {
            script.exec('getDashboards')
                .then(function(values) {
                    values = aes.decrypt(values);
                    Object.entries(values).forEach(function([key, value]) {
                        $scope[key] = value;
                    })
                    $scope.$apply();
                    $('#dimmer-body').inactive();
                    $('#controller').display();
                })
        }


        $scope.getBlackList = function() {
            $('#btntBlackList').hide();
            $('#dimmer-blacklist').active();

            script.exec('getBlackList')
                .then(function(value) {
                    local.setItem('blacklist', value);
                    value = aes.decrypt(value);
                    //value = JSON.parse(value);
                    $scope.BlackList = value;
                    $scope.BlackList_length = value.length + ' 笔银行卡黑名单资料';
                    $('#dimmer-blacklist').inactive();
                    setTimeout(function() {
                        $('#btntBlackList').show();
                    }, 10000)
                    $scope.$apply();
                })
        }

        $scope.i18n = function(x) {
            return chrome.i18n.getMessage(x);
        }

        $scope.save = function(show_dimmer) {
            if (show_dimmer == undefined) { $('#dimmer-body').active(); }
            var _config = JSON.stringify($scope.config);
            _config = aes.encrypt(_config);
            local.setItem('config', _config);
            //console.log(config);
            sync.setItem({
                config: _config
            }).then(() => {
                setTimeout(function() {
                    $('#dimmer-body').inactive();
                }, 1000)
            });
        };

        $scope.login = function(name, index) {
            $scope.save(false);
            $('.login.' + name).hide();
            setTimeout(function() {
                $('.login.' + name).show();
            }, 5000)
            var _sites = $scope.sites[name];
            var _board = $scope.config[name];
            var _page = $scope.pages[name];
            var _country = $scope.config.countries;
            if (!_board.username) {
                return false
            }
            if (!_board.password) {
                return false
            }
            if (!_board.server) {
                return false
            }
            if (!_board.security && name == 'cashier') {
                return false
            }
            $.each(_sites, function(index, site) {
                var server = _board.server;
                server = server.replace(/(host|admin)/g, '$1' + parseInt(site.port.slice(-2)));
                //server = server.replace(/(\d{1,3})$/g, '$1:' + site.port);
                server = server.replace(/(:)$/g, '$1' + site.port);
                var path = server + _page;
                //console.log(path);
                if (_country[site.country]) {
                    createTabs(path)
                }
            });
        };
    })



setTimeout(function() {
    //console.log(controllerProvider);
    console.log('------------------');
    //var $injector = angular.injector();
    //console.log($injector);
    /* myApp2.config(function($controllerProvider, $compileProvider, $provide) {
        console.log($controllerProvider);
        console.log($compileProvider);
        console.log($provide);
    });


    myApp2.run(myApp2._configBlocks)

    console.log(myApp2);
*/

    /*
    angular.element($(document.body)).injector().invoke(function($compile, $rootScope) {
        $compile($('#ctrl'))($rootScope);
        $rootScope.$apply();
    });*/
    //console.log(myApp2.config());


    /*
    var injector = angular.element(document.body).injector()
    console.log(injector);

*/
    //console.log(myApp2.controller().toSource());

    //.getAuthToken()

}, 500)


var myApp = angular.module('myApp', []);
myApp.factory('aProvider', function() {
    console.log("factory");
});

myApp.directive("test1", function() {
    console.log("directive setup");
    return {
        compile: function() { console.log("directive compile"); }
    }
});

myApp.directive("test2", function() {
    return {
        link: function() { console.log("directive link"); }
    }
});

myApp.controller('myCtrl', function($scope) {
    $scope.a = 12
    console.log("app controller 1");
});

myApp.run(function() {
    console.log("app run");
});

myApp.config(function() {
    console.log("app config");
});

myApp.controller('myCtrl222', function($scope) {
    console.log("app controller 222");
});

setTimeout(function() {
    console.log(3232, 123);


}, 2000)

/*
myApp.run(function() {
    console.log("app run");
});

myApp.config(function() {
    console.log("app config");
});

myApp.controller('myCtrl', function($scope) {
    console.log("app controller");
});*/