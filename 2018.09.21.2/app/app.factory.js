define(["app.instance", "app.router", 'dexie', 'moment', 'material', 'semantic', 'app.spider'],

    function(instance, Router, Dexie, moment, $mdc, semantic, $xmlSpider) {
        //$digest
        var $router = new Router()
        console.log($router);
        var { $server, $locate, $module } = $router;

        var $rootScope = angular.element('html').scope(),
            $controller = angular.element("[ng-controller]"),
            $scope = $controller.scope(),
            $injector = $controller.injector();
        var $invoke = $injector.invoke,
            $compile = $injector.get('$compile');

        var $apply = function() { if(!$scope.$$phase) { $scope.$apply(); } }
        var $dexie = new Dexie('evo').version(1).stores({ user: 'f_accounts' });
        var $searchParams = new URLSearchParams(window.location.search);
        var $params = Array.from($searchParams).serialize();
        var $extensionId = localStorage.extensionId;
        var $elements = ["span", "input", "select", "button", "a"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; });
        var $model = $elements.map((elem) => { return [_sname_(elem), _model_(elem)] }).serialize();
        var $ctrl = $elements.map((elem) => { return [_sname_(elem), $(elem)]; }).serialize();
        var $origin = window.location.origin
        //var ctrl = $elements.map((elem) => { return [_sname_(elem), elem]; }).serialize();
        /*********************************************************/
        var $ajax = function({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) { return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows }) }
        var $createTab = function(_url) {
            //console.log(_url);
            let redirectUrl = _url.replace('#1', $channel).replace('#2', $account)
            console.log(redirectUrl);
            window.open(redirectUrl, "_blank");
            //console.log(redirectUrl);
        }
        var $getModule = function(objPath) {
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
        var $console = function() { console.log(...arguments); }
        var $keydown = function(callback) {
            document.addEventListener('keydown', callback);
        }
        /*********************************************************/
        var account = $account = $params.account || $params.member || $params.accountId || $params.accounts;
        var channel = $channel = localStorage.channel || $params.siteNumber;
        var unique = $unique = [$account, $channel].join("-");
        /*********************************************************/
        var $moment = function(timestr) { return moment(timestr).format("YYYY-MM-DD HH:mm:ss"); }
        var $sendMessage = function(message) {
            message.active = true;
            return new Promise((resolve, reject) => {
                if($extensionId && message) {
                    chrome.runtime.sendMessage($extensionId, message, (res) => {
                        //console.log(res);
                        message.active = false;
                        if(res) {}
                        try { resolve(res) } catch (ex) { reject(ex) }
                    })
                } else {
                    console.error(this);
                    reject(101)
                }
            })
        }
        var $getUser = async function() {
            console.log($unique);
            $scope.user =
                await $sendMessage({ command: 'api.store.user.get(request.unique)', unique: $unique }) ||
                await $scope.$setUser();
            $scope.$apply();
            console.log($scope.user);
        }
        var $delUser = function(bool) {
            if(!bool) { return }
            return $sendMessage({ command: 'api.store.user.delete(request.unique)', unique: unique })
                .then((user) => {
                    return;
                    console.log('delUser:', unique);
                })
        }
        var $putUser = function(nv, ov) {
            //console.log(nv, ov);
            if(!nv) { return };
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
            if(window.getSelection().type === "Caret") {
                e.preventDefault();
                console.log(this);
            }
            console.log(e.clipboardData);
            if(e.clipboardData) {
                e.clipboardData.setData("text/plain", clipboardData);
            } else {
                console.log(12);
                window.clipboardData.setData("Text", clipboardData);
            }
        }

        function keyboardEvent() {
            keydown
            keypress
            keyup
            //全局屏蔽键盘事件：
            window.onkeydown = function() {
                console.log(window.event.keyCode)
                if(window.event.keyCode == 49) {
                    event.returnValue = false;
                }
            }
            //全局屏蔽鼠标右键：
            window.oncontextmenu = function() {
                console.log('点击了鼠标右键')
                event.returnValue = false;
            }
        }


        function $injectStylesheet(src) {
            $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
            return

            if(arguments[0]) {
                arguments[0].map((str) => {
                    var src = $router.rootUrl + "app/css/" + str + ".css"
                })
            };
            //$("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body');
        }

        function $injectComponents(src) {
            fetch(src).then((res) => { return res.text(); })
                .then((html) => {
                    $controller.append($compile(angular.element(html))($scope))
                    $scope.$apply();
                });
            return
            if(arguments[0]) {
                arguments[0].map((str) => {
                    var src = $router.rootUrl + "app/html/" + str + ".html";

                })
            };
        }


        //var $router;

        var Factory22 = {
            account,
            channel,
            unique,
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
            c,
            //ctrl,
            $keydown,
            $injectStylesheet,
            $injectComponents
        }

        return Factory22


        return function(a) {

            $router = a.$router;
            $injectComponents(a.$components);
            $injectStylesheet(a.$stylesheet);




        }





        function Factory2(app) {
            //Array.from($scope);
            window.$scope = this.$scope
            $rootScope = this.$rootScope;
            $scope = this.$scope;
            var ck = $scope.hasOwnProperty('isSubmit')
            console.log(ck);
            console.log($scope);
            angular.extend(this, app);
            angular.extend(this, app.__proto__);
            angular.extend(this, Factory.prototype);
        }






        Factory.prototype = {
            account,
            channel,
            unique,
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
            c,
            //ctrl,
            $keydown
        }

        return Factory;
    })



/*********************************************************/