define(["app.instance", 'app.spider', 'dexie', 'moment', 'material', 'semantic'],
    function(instance, $xmlSpider, Dexie, moment, $mdc, semantic) { //$digest

        var $isTest = window.location.hostname == "127.0.0.1";
        var c = console.log;
        var s = function(res) {
            console.log(res);
            return res;
        }




        return function($router) {
            var { $server, $module, $extensionId, $rootUrl, $channel, $account, $unique, $origin } = $router;

            var $dexie = new Dexie('evo');
            $dexie.version(1).stores({ user: 'f_accounts' });
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
            //var ctrl = $elements.map((elem) => { return [_sname_(elem), elem]; }).serialize();
            /*********************************************************/
            var $ajax = function({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) { return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows }) }

            var $getModule22 = function(objPath) {
                return new Promise((resolve, reject) => {
                    var object = (objPath.includes('ctrl')) ? $scope : $scope.ctrl.model;
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


            var $getModule = function(objPath) {

                console.log(objPath);

                return new Promise((resolve, reject) => {

                    $scope.$watch(objPath, (nv, ov) => {

                        if(nv) {
                            var length = Object.values(nv).length
                            if(length) {
                                console.log(length);
                                //console.log("--------");
                                resolve(nv);
                            }
                        }


                    }, true);
                })
            }




            var $console = function() { console.log(...arguments); }
            var $keydown = function(callback) { document.addEventListener('keydown', callback); }
            /*********************************************************/
            var apis = {};

            apis.sendMessage = function sendMessage(p) {
                //console.log(p);
                //this.active = true
                //var _name_ = arguments.callee.caller.name;
                return new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage($extensionId, {
                        caller: arguments.callee.caller.name,
                        params: [...arguments],
                    }, (res) => {
                        resolve(res);
                        //this.active = false;
                    })
                })
            }

            apis.watch = function watch(name, callback) {
                $scope.$watch(name, apis[callback], true);
            }

            var cacheUser;

            apis.getUser = async function getUser() {

                $scope.user =
                    await apis.sendMessage($unique) ||
                    await apis.setUser();

                apis.watch('user', 'putUser');

                $scope.$apply();
                console.log("--", $scope.user);

                //return $scope.user;
            }
            apis.delUser = async function delUser() {
                console.log($unique);
                await apis.sendMessage($unique);
            }
            apis.putUser = async function putUser(nv, ov) {
                //console.log(angular.equals(cacheUser, $scope.user));
                if(!nv) { return };
                $scope.user.lastModify = $moment(Date.now())
                return apis.sendMessage($scope.user);
            }


            apis.getLocalStorage = (async function getLocalStorage() {
                var object = await apis.sendMessage();
                apis.global = {};
                Object.entries(object).map(([name, value]) => {
                    try { apis.global[name] = angular.fromJson(decodeURI(atob(value))).map((arr) => { return arr[0] }); } catch (e) {}
                    //return value
                });
                // console.log(apis.global);
                if($isTest) {
                    apis.global.author.push(["陈丽娟"])
                    apis.global.author.push(["王杰"])
                    apis.global.region.push("浙江")
                    apis.global.region.push("南宁")
                    apis.global.locate.push("171.106.81.75")
                }
            }());

            apis.sendSms = async function sendSms(e) {
                var $currentTarget = $(e.currentTarget)
                $currentTarget.hide();
                await apis.sendMessage($scope.user);
                await apis.getUser();
                $currentTarget.show();
            };

            var clipboardData;
            apis.copy = function copy(e) {
                clipboardData = e.currentTarget.dataset.content;
                document.execCommand("copy", clipboardData);
            }

            document.oncopy = function(e) {
                if(window.getSelection().type === "Caret") { e.preventDefault(); }
                if(e.clipboardData) { e.clipboardData.setData("text/plain", clipboardData); } else {
                    window.clipboardData.setData("Text", clipboardData);
                }
            }

            //Object.entries(apis).map(([name, fnuc]) => { apis[name]._name = name; })

            function $injectStylesheet(abc) {
                if(abc) {
                    abc.map((str) => {
                        var src = $router.$rootUrl + 'stylesheet/' + str;
                        $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
                    });
                }
            }

            function $injectComponents(abc) {
                if(abc) {
                    abc.map((str) => {
                        var src = $router.$rootUrl + 'components/' + str;
                        fetch(src).then((res) => { return res.text(); })
                            .then((html) => {
                                $controller.append($compile(angular.element(html))($scope))
                                $scope.$apply();
                                //console.log("------------");
                            });
                    })
                };
            }


            /************************************************************/
            var $createTab = function(hyperlink) {
                let redirectUrl = hyperlink.replace('#1', $channel).replace('#2', $account);
                console.log(redirectUrl);
                window.open(redirectUrl, "_blank");
            }

            var $hyperlink = {
                "wa111": {
                    "cookie": "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
                    "device": "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
                },
                "ku711": {
                    "cookie": "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
                    "device": "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
                }
            } [$server];

            if($isTest && $server == "wa111") {
                $hyperlink.cookie = "/IGetMemberInfo.aspx?siteNumber=#1&member=#2"
                $hyperlink.device = "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1"
                //$('#divCookie').hide();
            }
            if($isTest && $server == "ku711") {
                $('.collapse').show()
            }


            $scope.$hyperlink = $hyperlink;
            $scope.$createTab = $createTab;
            $scope.apis = apis;


            /************************************************************/


            var factory = {
                apis,
                //api,
                $apply,
                $mdc,
                $dexie,
                $moment,
                $xmlSpider,
                $ajax,
                $model,
                $ctrl,
                $createTab,
                $getModule,
                $console,
                $scope,
                $keydown,
                $extensionId,
                $router,
                ...$router.__proto__
            }


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


            $xmlSpider.apis = apis;
            $xmlSpider.$router = $router;
            $scope.apis = apis;

            //window.__branch__ = $router.$branch

            requirejs([
                $router.$master,
                $router.$branch
            ], ($$master, $$branch) => {
                $injectComponents($router.$components);
                $injectStylesheet($router.$stylesheet);

                $$branch.call(factory, factory);
                $$master.call(factory, factory);

                //console.log($router.$branch);

            });
            return factory;
        }
    });