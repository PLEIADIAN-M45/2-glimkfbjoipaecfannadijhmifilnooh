define(["app.instance", 'app.spider', 'dexie', 'moment', 'material', 'semantic'],

    function(instance, $xmlSpider, Dexie, moment, $mdc, semantic) { //$digest

        var $isTest = window.location.hostname == "127.0.0.1";
        var c = console.log;
        var s = function(res) {
            console.log(res);
            return res;
        }

        return function($router) {

            var { $server, $module, $extensionId, $rootUrl, $channel, $account, $unique, $origin, unique } = $router;




            //$xmlSpider($router);

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

            var $getModule = function(objPath) {
                return new Promise((resolve, reject) => {
                    //var object = (objPath.includes('ctrl')) ? $scope : $scope.ctrl.model;
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




            var $console = function() { console.log(...arguments); }
            var $keydown = function(callback) { document.addEventListener('keydown', callback); }
            /*********************************************************/
            var apis = {};

            apis.extensionId = $extensionId;
            //apis.port = chrome.runtime.connect(apis.extensionId); //console.log(port);
            apis.openDeposit = function openDeposit() {
                console.log($scope.user.frameId);
                return apis.sendMessage({ frameId: $scope.user.frameId });
            }

            apis.sendMessage = function sendMessage(params) {
                //console.log(arguments.callee.caller.name);
                var callee = arguments.callee.caller.name.replace(/_/g, ".");
                console.log(callee);
                //console.log(p);
                //if (scope) { scope.active = true }
                //var _name_ = arguments.callee.caller.name;
                return new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage($extensionId, {
                        caller: callee,
                        params: params
                        //[...arguments],
                    }, (res) => {
                        console.log(res);
                        //if (scope) { scope.active = false }
                        resolve(res);

                        /*if (res && res.error) {
                            reject(res);
                        } else {

                        }
                        */

                        /*
                        console.log(res);
                       */
                        //this.active = false;
                    })
                })
            }

            apis.watch = function watch(name, callback) {
                $scope.$watch(name, apis[callback], true);
            }

            apis.gab = function() {
                return

                chrome.runtime.sendMessage($extensionId, {
                    callee: "apis.user.toArray()"

                }, (res) => {
                    //apis.global = res;
                    console.log(res);
                })

                return


                chrome.runtime.sendMessage($extensionId, {
                    caller: "apis.user.get",
                    params: { unique }
                }, (res) => {
                    //apis.global = res;
                    console.log(res);
                })

                return

                chrome.runtime.sendMessage($extensionId, {
                    caller: "apis.user.put",
                    params: {
                        unique: "JIABO1006-26",
                        author: "王杰"
                    }
                }, (res) => {
                    //apis.global = res;
                    console.log(res);
                })
                return

            }

            apis.user = {};

            /*apis.putUser = async function putUser(nv, ov) {
                if(!nv || angular.equals(nv, ov)) { return };
                //console.log("putUser::", nv);
                return apis.sendMessage($scope.user);
            }*/

            apis.user.put = async function apis_user_put() {
                if(!nv || angular.equals(nv, ov)) { return };
                //console.log("putUser::", nv);
                return apis.sendMessage($scope.user);
            }


            apis.user.get = async function apis_user_get() {
                apis.watch('user', 'apis.user.put');
                $scope.user =
                    await apis.sendMessage({ unique }) ||
                    await apis.user.set();

                console.log($scope.user);
                $scope.$apply();

            }

            //apis.user.get()

            //var cacheUser;
            apis.getUser = async function getUser() {
                return
                apis.watch('user', 'putUser');
                $scope.user =
                    await apis.gab()
                //await apis.sendMessage($router.$unique) ||
                //await apis.setUser();


                $scope.$apply();
            }
            apis.delUser = async function delUser() {
                //console.log($unique);
                await apis.sendMessage($unique);
            }

            apis.putUser = async function putUser(nv, ov) {
                if(!nv || angular.equals(nv, ov)) { return };
                //console.log("putUser::", nv);
                return apis.sendMessage($scope.user);
            }

            apis.getTabInfo = function getTabInfo() {
                return apis.sendMessage(123);
            };


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
            */

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
                window.open(redirectUrl, "_blank");
                //console.log(redirectUrl);
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
            $scope.$isTest = $isTest;



            /************************************************************/


            var factory = {
                apis,
                //api,
                $apply,
                $mdc,
                $dexie,
                $moment,
                $xmlSpider,
                //$xmlSpider,
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


            $scope.apis = apis;
            $xmlSpider.apis = apis;
            $xmlSpider.$dexie = $dexie;
            $xmlSpider.$router = $router;

            //window.__branch__ = $router.$branch

            //console.log(window.opener);



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