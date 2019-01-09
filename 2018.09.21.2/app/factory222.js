

define(["app.instance", 'app.spider', 'dexie', 'moment', 'material', 'semantic'],
    function(instance, $xmlSpider, Dexie, moment, $mdc, semantic) {
        //$digest

        var $dexie = new Dexie('evo');
        $dexie.version(1).stores({ user: 'f_accounts' });

        var $moment = function(timestr) { return moment(timestr).format("YYYY-MM-DD HH:mm:ss"); }

        var $extensionId = localStorage.extensionId;
        var $forms = document.forms,
            $form = document.forms[0],
            $referrer = document.referrer;
        /*----------------------------------------------------------------------*/

        return function($router) {

            var { $server, $module, $extensionId, $rootUrl, $channel } = $router;

            var $rootScope = angular.element('html').scope(),
                $controller = angular.element("[ng-controller]"),
                $scope = $controller.scope(),
                $injector = $controller.injector();
            var $invoke = $injector.invoke,
                $compile = $injector.get('$compile');

            var $apply = function() { if (!$scope.$$phase) { $scope.$apply(); } }
            var $searchParams = new URLSearchParams(window.location.search);
            var $params = Array.from($searchParams).serialize();

            var $elements = ["span", "input", "select", "button", "a"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; });
            var $model = $elements.map((elem) => { return [_sname_(elem), _model_(elem)] }).serialize();
            var $ctrl = $elements.map((elem) => { return [_sname_(elem), $(elem)]; }).serialize();
            //var ctrl = $elements.map((elem) => { return [_sname_(elem), elem]; }).serialize();
            /*********************************************************/
            var $ajax = function({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) { return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows }) }

            var $getModule = function(objPath) {
                return new Promise((resolve, reject) => {
                    var object = (objPath.includes('ctrl')) ? $scope : $scope.ctrl.model;
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

            var $console = function() { console.log(...arguments); }
            var $keydown = function(callback) {
                document.addEventListener('keydown', callback);
            }
            /*********************************************************/
            var account = $account = $params.account || $params.member || $params.accountId || $params.accounts;
            var channel = $channel = localStorage.channel || $params.siteNumber;
            var unique = $unique = [$account, $channel].join("-");
            var origin = $origin = window.location.origin;

            /*********************************************************/
            /*
            var $sendMessage2 = function(params1, params2) {

                console.log(arguments.callee.caller.name);


                return new Promise((resolve, reject) => {

                    chrome.runtime.sendMessage($extensionId, {
                        //command: command,
                        command: arguments.callee.caller.name,
                        params1: params1,
                        params2: params2
                    }, resolve)

                    (res) => {
                        console.log(res);
                        resolve(res)
                    })
                })

            }
            */


            var apis = {};

            apis.sendMessage = function() {
                //console.log(arguments.callee.caller._name);
                //console.log(arguments.callee.caller.name);
                var _name_ = arguments.callee.caller.name;
                console.log(_name_);

                return new Promise((resolve, reject) => {

                    chrome.runtime.sendMessage($extensionId, {
                        caller: arguments.callee.caller.name,
                        params: [...arguments],
                    }, (res) => {
                        console.log("caller:::", _name_, res);
                        resolve(res)
                    })
                })
            }


            apis.watch = function(name, callback) {
                $scope.$watch(name, apis[callback], true);
            }

            apis.getUser = async function getUser() {
                $scope.user = await apis.sendMessage(unique) ||
                    await apis.setUser();
                $scope.$apply();
            }

            apis.delUser = async function delUser() {
                await apis.sendMessage(unique);
            }

            apis.putUser = async function putUser(nv, ov) {
                if (!nv) { return };
                console.log("putUser");
                return apis.sendMessage($scope.user);
            }


            apis.sendSms = async function sendSms(e) {
                var $currentTarget = $(e.currentTarget)
                $currentTarget.hide();
                await apis.sendMessage($scope.user);
                await apis.getUser();
                $currentTarget.show();

                /*
                apis.sendMessage($scope.user).then((res) => {
                    //console.log(res);
                    apis.getUser();
                })
                */
            };


            Object.entries(apis).map(([name, fnuc]) => {
                apis[name]._name = name;
            })




            var _apis = [];
            /*_apis[0] = "getUser"
            _apis[1] = "putUser"
            _apis[2] = "delUser"
            _apis[21] = "btnUserSet"
            */

            //_apis[0] =

            /*[
                "getUser",
                "putUser",
                "delUser",





            ]*/


            _apis.forEach((name, index) => {

                apis[name] = function(params) {

                    return new Promise((resolve, reject) => {

                        console.log(name);

                        chrome.runtime.sendMessage($extensionId, {
                            index: index,
                            params: params,
                            params2: arguments[1]
                        }, resolve)

                        /*(res) => {
                            console.log(res);
                            resolve(res)
                        })*/
                    })



                }
            })




            //apis.getUser =

            /*
            var $sendMessage = function(message) {

                console.log(message);

                return
                message.active = true;

                console.log(message.command);

                return new Promise((resolve, reject) => {
                    if ($extensionId && message) {
                        chrome.runtime.sendMessage($extensionId, message, (res) => {
                            //console.log(res);
                            message.active = false;
                            if (res) {}
                            try { resolve(res) } catch (ex) { reject(ex) }
                        })
                    } else {
                        console.error(this);
                        reject(101)
                    }
                })
            }
            */





            var $getUser = async function() {
                //console.log($unique);

                $scope.user =
                    await $sendMessage({ command: 'api.store.user.get(request.unique)', unique: $unique })

                return;
                $scope.user =
                    await $sendMessage({ command: 'api.store.user.get(request.unique)', unique: $unique }) ||
                    await $scope.$setUser();
                console.log($scope.user);
                $scope.$apply();
            }

            var $delUser = function(bool) {
                if (!bool) { return }
                return $sendMessage({ command: 'api.store.user.delete(request.unique)', unique: unique })
                    .then((user) => {
                        return;
                        console.log('delUser:', unique);
                    })
            }

            var $putUser = function(nv, ov) {
                //console.log(nv, ov);
                if (!nv) { return };
                //if (angular.equals(nv, ov)) { return };
                //if(angular.equals(_user, nv)) { return };
                return $sendMessage({ command: 'api.store.user.put(request.user)', user: nv })
                    .then((user) => {
                        console.count("put.user", nv);
                        //console.countReset("put.user")
                        return user;
                    })
            }
            var c = console.log;
            // var clipboardData;
            document.oncopy = function(e) {
                // console.log(e);
                //console.log(clipboardData);
                if (window.getSelection().type === "Caret") {
                    e.preventDefault();
                    console.log(this);
                }
                console.log(e.clipboardData);
                if (e.clipboardData) {
                    e.clipboardData.setData("text/plain", clipboardData);
                } else {
                    console.log(12);
                    window.clipboardData.setData("Text", clipboardData);
                }
            }

            function $injectStylesheet(abc) {
                if (abc) {
                    abc.map((str) => {
                        var src = $router.$rootUrl + 'stylesheet/' + str;
                        $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
                    });
                }
            }

            function $injectComponents(abc) {
                if (abc) {
                    abc.map((str) => {
                        var src = $router.$rootUrl + 'components/' + str;
                        fetch(src).then((res) => { return res.text(); })
                            .then((html) => {
                                $controller.append($compile(angular.element(html))($scope))
                                $scope.$apply();
                            });
                    })
                };
            }




            /************************************************************/

            var $createTab = function(hyperlink) {
                //console.log($channel, $account);
                let redirectUrl = hyperlink.replace('#1', $channel).replace('#2', $account)
                console.log(redirectUrl);
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


            var $isTest = window.location.hostname == "127.0.0.1";
            if ($isTest && $server == "wa111") {
                $hyperlink.cookie = "/IGetMemberInfo.aspx?siteNumber=#1&member=#2"
                $hyperlink.device = "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1"
                $('#divCookie').hide();
            }
            if ($isTest && $server == "ku711") {
                $('.collapse').show()
            }

            $scope.$hyperlink = $hyperlink;
            $scope.$createTab = $createTab;

            /************************************************************/




            var factory = {
                apis,
                account,
                channel,
                unique,
                $origin,
                origin,
                $apply,
                $account,
                $channel,
                $unique,
                $mdc,
                $dexie,
                $moment,
                $params,
                $xmlSpider,
                $sendMessage,
                //$sendSms,
                //$clipboard,
                $getUser,
                $delUser,
                $putUser,
                //$setUser,
                $ajax,
                $model,
                $ctrl,
                $createTab,
                $getModule,
                $console,
                $scope,
                $keydown
            }


            //Object.assign(factory, $router)
            /*
                        console.log($router.operator);
                        console.log($router.$operator);
                        console.log(factory);
                        */

            //Object.assign(factory, window.localStorage)
            //console.log(Object.getOwnPropertyDescriptors(factory));

            //Object.assign($scope, apis);



            requirejs([
                $router.$master,
                $router.$branch
            ], ($$master, $$branch) => {

                $injectComponents($router.$components);
                $injectStylesheet($router.$stylesheet);

                $$branch.call(factory, factory);
                $$master.call(factory, factory);

                $scope.apis = apis;

            });



            return factory;
        }
    });


function keyboardEvent() {
    keydown
    keypress
    keyup
    //全局屏蔽键盘事件：
    window.onkeydown = function() {
        console.log(window.event.keyCode)
        if (window.event.keyCode == 49) {
            event.returnValue = false;
        }
    }
    //全局屏蔽鼠标右键：
    window.oncontextmenu = function() {
        console.log('点击了鼠标右键')
        event.returnValue = false;
    }
}




/*********************************************************/