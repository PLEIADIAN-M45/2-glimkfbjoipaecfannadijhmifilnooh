define(["app.instance", 'app.spider', 'dexie', 'moment', 'material', 'semantic'],
    function(instance, $xmlSpider, Dexie, moment, $mdc, semantic) { //$digest
        var c = console.log;
        var s = function(res) {
            console.log(res);
            return res;
        }
        var $dexie = new Dexie('evo');
        $dexie.version(1).stores({ user: 'f_accounts' });

        return function($router) {
            var { $server, $module, $extensionId, $rootUrl, $channel, $account, $unique, $origin, unique } = $router;
            var $moment = function(timestr) { return moment(timestr).format("YYYY-MM-DD HH:mm:ss"); }
            var $extensionId = localStorage.extensionId;
            var $forms = document.forms,
                $form = document.forms[0],
                $referrer = document.referrer;
            var $rootScope = angular.element('html').scope(),
                $controller = angular.element("[ng-controller]"),
                $scope = $controller.scope(),
                $injector = $controller.injector();
            var $invoke = $injector.invoke,
                $compile = $injector.get('$compile');
            var $apply = function() { if(!$scope.$$phase) { $scope.$apply(); } }
            var $elements = ["span", "input", "select", "button", "a"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; });
            var $model = $elements.map((elem) => { return [_sname_(elem), _model_(elem)] }).serialize();
            var $ctrl = $elements.map((elem) => { return [_sname_(elem), $(elem)]; }).serialize();
            /*********************************************************/
            var $ajax = function({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) { return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows }) }
            var $getModule = function(objPath) {
                return new Promise((resolve, reject) => {
                    var object = $scope;
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
            var $console = function() { console.log(...arguments); }
            /*********************************************************/
            var apis = {};
            apis.extensionId = $extensionId;
            apis.$isTest = window.location.hostname == "127.0.0.1";
            apis.keydown = function(callback) { document.addEventListener('keydown', callback); }
            apis.auto_clean = function() { $('input[type=text]').focus(function() { $('input[type=text]').val(''); }); }
            apis.auto_select = function() { $('input[type=text]').focus(function() { this.select(); }); }
            apis.watch = function watch(name, callback) { $scope.$watch(name, callback, true); }
            apis.apply = function() { if(!$scope.$$phase) { $scope.$apply() } }
            $scope.apply = apis.apply;
            apis.sendMessage = function sendMessage(params) {
                return new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage($extensionId, {
                        caller: arguments.callee.caller.name,
                        params: params
                    }, (res) => {
                        resolve(res)
                    });
                })
            }
            apis.getUser = async function getUser() {
                apis.watch('user', apis.putUser);
                $scope.user =
                    await apis.sendMessage({ unique }) ||
                    await apis.setUser();
                $scope.$apply();
            }
            apis.delUser = async function delUser() { await apis.sendMessage({ unique }); }
            apis.putUser = async function putUser(nv, ov) {
                if(!nv || angular.equals(nv, ov)) { return };
                apis.sendMessage($scope.user);
                $scope.user = nv;
                $scope.apply();
            }
            apis.sendSms = async function sendSms(e) {
                $scope.user.setsms = 900;
                apis.sendMessage($scope.user).then((setsms) => {
                    $scope.user.setsms = setsms;
                    $scope.apply();
                })
            };

            ;
            (async function global() {
                apis.global = await apis.sendMessage({});
                //console.log(apis.global);
            }());

            apis.clipboardData;
            apis.copy = function copy(e) {
                clipboardData = e.currentTarget.dataset.content;
                document.execCommand("copy", apis.clipboardData);
            }
            document.oncopy = function(e) {
                if(window.getSelection().type === "Caret") { e.preventDefault(); }
                if(e.clipboardData) { e.clipboardData.setData("text/plain", apis.clipboardData); } else {
                    window.clipboardData.setData("Text", apis.clipboardData);
                }
            }
            apis.createTab = function(hyperlink) {
                let redirectUrl = hyperlink.replace('#1', $channel).replace('#2', $account);
                window.open(redirectUrl, "_blank");
                //console.log(redirectUrl);
            }

            apis.$injectStylesheet = function $injectStylesheet(abc) {
                if(!abc) { return };
                abc.map((str) => {
                    var src = $router.$rootUrl + 'stylesheet/' + str;
                    $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
                });

            }
            apis.$injectComponents = function $injectComponents(abc) {
                if(!abc) { return };
                abc.map((str) => {
                    var src = $router.$rootUrl + 'components/' + str;
                    fetch(src).then((res) => { return res.text(); }).then((html) => {
                        $controller.append($compile(angular.element(html))($scope))
                        $scope.$apply();
                    });
                })
            }

            apis.guid = function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }

            apis.hyperlink = {
                "wa111": {
                    "cookie": "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                    "device": "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
                },
                "ku711": {
                    "cookie": "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
                    "device": "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
                }
            } [$server];

            if(apis.$isTest) {
                if($server == "wa111") {
                    apis.hyperlink.cookie = "/IGetMemberInfo.aspx?siteNumber=#1&member=#2"
                    apis.hyperlink.device = "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1"
                    //$('#divCookie').hide();
                }
                if($server == "ku711") {
                    $('.collapse').show()
                }
            }

            /************************************************************/
            $scope.apis = apis;
            var factory = { apis, $mdc, $dexie, $moment, $xmlSpider, $ajax, $model, $ctrl, $getModule, $console, $scope, $extensionId, $router, ...$router.__proto__ }

            requirejs([
                $router.$master,
                $router.$branch
            ], ($$master, $$branch) => {
                apis.$injectStylesheet(["comm.css"]);
                $$branch.call(factory, factory);
                $$master.call(factory, factory);
                //console.log($router.$branch);
            });
            return factory;
        }
    });














function xxx() {
    apis.getTabInfo = function getTabInfo() {
        return apis.sendMessage(123);
    };
    //apis.port = chrome.runtime.connect(apis.extensionId); //console.log(port);
    /* apis.openDeposit = function openDeposit() {
         console.log($scope.user.frameId);
         return apis.sendMessage({ frameId: $scope.user.frameId });
     }*/

    //window.__branch__ = $router.$branch

    //console.log(window.opener);



    /*
              var api = {};
              Object.entries(apis).forEach(function([key, elem], index) {
                  if(typeof elem == "function") {
                      //console.log(elem.name);
                      api[key] = function() {
                          console.log(key);
                          //elem();
                      }
                  }
              });
              */

    /*for(var n of factory) {
        console.log(n);
    }*/


    /*
    chrome.runtime.sendMessage($extensionId, {
        callee: "apis.global"
    }, (res) => {
        apis.global = res;
        console.log(res);
    })
    */

    /*
    apis.localStorage = (async function localStorage() {
        var object = await apis.sendMessage();
        console.log(object);
        apis.global = {};
        Object.entries(object).map(([name, value]) => {
            try { apis.global[name] = angular.fromJson(decodeURI(atob(value))).map((arr) => { return arr[0] }); } catch (e) {}
            //return value
        });
        // console.log(apis.global);
        if ($isTest) {
            apis.global.author.push(["陈丽娟"])
            apis.global.author.push(["王杰"])
            apis.global.region.push("浙江")
            apis.global.region.push("南宁")
            //apis.global.locate.push("171.106.81.75")
        }
    }());
    //Object.entries(apis).map(([name, fnuc]) => { apis[name]._name = name; })

    */

    var $getModule22 = function(objPath) {
        var str = "$scope." + objPath;
        var t = eval(str)
        console.log(t);
        return new Promise((resolve, reject) => {
            console.log(objPath);
            $scope.$watch(objPath, (nv, ov) => {
                console.log(nv);
                /*
                if(nv != undefined) {
                    console.log(typeof nv);
                    if(typeof nv == "object") {
                        if(Object.keys(nv).length) {

                            console.log(nv);

                            //console.log("--------");
                            resolve(nv);

                        }
                    } else {
                        console.log(nv);

                        resolve(nv);

                    }
                }*/

            }, true);


        })
    }
}