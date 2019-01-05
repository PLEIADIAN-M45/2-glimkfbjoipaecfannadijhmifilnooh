define(["app.instance", 'dexie', 'moment', 'material', 'semantic', 'app.xmlhttp'],
    function(instance, Dexie, moment, $mdc, semantic, $xmlSpider) {

        function _sname_(elem) { if (elem.name) return elem.name.split("$").pop(); if (elem.id) { return elem.id.replace('ctl00_ContentPlaceHolder1_', ''); } else { return "" } }

        function _model_(elem) {
            switch (elem.localName) {
                case 'input':
                    return elem.value;
                case 'select':
                    return elem.selectedOptions[0].label
                case 'button':
                    return elem.title;
                case 'span':
                    return elem.outerText;
            }
        }
        /*********************************************************/

        var $dexie = new Dexie('evo');
        $dexie.version(1).stores({ user: 'f_accounts' });
        var $searchParams = new URLSearchParams(window.location.search);
        var $params = Array.from($searchParams).serialize();
        var $extensionId = localStorage.extensionId;

        var elements = ["span", "input", "select", "button", "a"].map((el) => { return Array.from(document.querySelectorAll(el)) }).flat().filter((elem) => { return elem.name || elem.id; });
        var $model = elements.map((elem) => { return [_sname_(elem), _model_(elem)] }).serialize();
        var ctrl = elements.map((elem) => { return [_sname_(elem), elem]; }).serialize();
        var $ctrl = elements.map((elem) => { return [_sname_(elem), $(elem)]; }).serialize();
        /*********************************************************/
        /*var account = $params.account || $params.member;
        var channel = localStorage.channel;
        var unique = [account, channel].join("-");*/
        /*********************************************************/

        var account = $params.account || $params.member;
        var channel = localStorage.channel;
        var unique = [account, channel].join("-");

        var $sendMessage = function(message) {            
            //onsole.log(message);
            //console.log(this);

            message.active = true;

            return new Promise((resolve, reject) => {
                if ($extensionId && message) {
                    chrome.runtime.sendMessage($extensionId, message, (res) => {
                        //console.log(res);
                        message.active = false;
                        //setTimeout(function() { $scope.$apply() }, 2000)
                        
                        if (res) {}

                        try { resolve(res) } catch (ex) { reject(ex) }


                    })
                } else {
                    console.error(this);
                    reject(101)
                }
            })
        }
        /*if(result.command) { var cc = result.command.split('.')[1];console.log(cc); }*/
        //if(result) {}
        //console.log(unique);

        var $setUser = function(result) {
            //console.log(result);
            if (!result) {
                $scope.$apply();
                return
            }
            var source = (result.callee) ? $scope.user[result.callee] : $scope.user;
            angular.copy(result, source);
            $scope.$apply();
        }

        var _user;

        var $getUser = function() {
            return $sendMessage({ command: 'api.store.user.get(request.unique)', unique: unique })
                .then((user) => {
                    if (user) { return user } else {
                        return $scope.$defUser($scope)
                    }
                    /*
                                        console.log('getUser:', user);
                                        _user = user;
                                        return user;*/
                })
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
            if (!nv) { return };
            if (angular.equals(nv, ov)) { return };
            if (angular.equals(_user, nv)) { return };
            return $sendMessage({ command: 'api.store.user.put(request.user)', user: nv })
                .then((user) => {
                    console.log('$putUser:', user);
                    return user;
                })
        }

        var $ajax = function({ url, data, method = 'GET', dataType = 'json', timeout = 10000 }) {
            return $.ajax({ url, data, method, dataType, timeout }).then((res) => { return res.rows })
        }

        var createTab = function(_url) {
            console.log(_url);
            let redirectUrl = _url.replace('#1', this.channel).replace('#2', this.account)
            //console.log(redirectUrl);
            window.open(redirectUrl, "_blank");
        }

        var getModule = function(objPath) {
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

        var $console = function() { console.log(...arguments); }
        var $keydown = function(callback) { document.addEventListener('keydown', callback); }
        var c = console.log;

        /***************************************************/
        //console.log(angular);
        var $rootScope;
        var $scope;

        function Factory($rootScope) {
            $scope = $rootScope;
            angular.extend(this, Factory.prototype);
            angular.extend($rootScope, this);

            $xmlSpider.$scope = $rootScope
            //console.log($rootScope);
        }

        Factory.prototype = {
            $mdc,
            $dexie,
            $xmlSpider,
            $sendMessage,

            account,
            channel,
            unique,

            $getUser,
            $delUser,
            $putUser,
            $setUser,
            $ajax,
            $model,
            $ctrl,
            ctrl,
            createTab,
            getModule,
            $console,
            c,
            $keydown,

        }

        return Factory;
        //$scope.$digest();



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

    })



//console.log(this.$apply);
//this.$apply=
//Object.assign($rootScope, Factory.prototype)

/*
return function($anchorScroll, $animate, $animateCss, $cacheFactory, $compile, $controller, $document, $exceptionHandler, $filter, $http, $httpBackend,
            $httpParamSerializer, $httpParamSerializerJQLike, $interpolate, $interval, $jsonpCallbacks, $locale, $location, $log, $parse, $q, $rootElement,
            $rootScope, $sce, $sceDelegate, $templateCache, $templateRequest, $timeout, $window, $xhrFactory) {}
            */


//set channel(value) { localStorage.channel = value }
//get channel() { return localStorage.channel || this.params.siteNumber; }
//set $operator(value) { localStorage.operator = value }
//get $operator() { return localStorage.operator; }
//set siteName(value) { localStorage.siteName = value }
//get siteName() { return localStorage.siteName; }