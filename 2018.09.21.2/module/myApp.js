function invoke() {
    fnStylesheet();
    fnComponents();
    console.log('_invoke......');
}

function fnStylesheet() {
    $scope.stylesheet.forEach(function(name) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./css/" + name + ".css");
        link.onload = function() {
            //console.log(link.href);
        }
        document.body.appendChild(link);
    });
}

function fnComponents() {
    $scope.components.forEach((name) => {
        var templateUrl = require.toUrl("./html/" + name + ".html");
        fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {
            var template = angular.element(html);
            $element.append(template);
            $compile(template)($scope);
            //console.log(666666666, 777777777);
            $scope.template_loaded = 1;
            $scope.$apply();
        })
    })
}


function loadModules($scope, $rootElement) {
    $scope.address = location.href;
    $scope.host = evo.host;
    $scope.route = evo.route;

    /*
    switch ($scope.host) {
        case "wa111":
            break;
        case "ku711":
            break;
    }
    */

    var postScrollHeightMessage = function() {
        switch ($scope.host) {
            case "wa111":
                setTimeout(() => {
                    console.log(document.body.scrollHeight);
                    window.parent.postMessage({ scrollHeight: document.body.scrollHeight + 'px' }, '*');
                }, 1000)
                break;
            case "ku711":
                $scope.$watch('ctrl.model.ResultList', function(nv, ov) {
                    if (nv) {
                        setTimeout(() => {
                            console.log(document.body.scrollHeight);
                            window.parent.postMessage({ scrollHeight: document.body.scrollHeight + 'px' }, '*');
                        }, 1000)
                    }
                })
                break;
        }
    }


    var queryInputModel = function() {
        switch ($scope.host) {
            case "wa111":
                break;
            case "ku711":
                $scope.ctrl.model.QueryInputModel.AccountID = evo.params.accounts;
                $scope.ctrl.GetQueryLoginLog(evo.params.method);
                break;
        }
    }

    var createIFrame = function(_src) {
        var addScrollHeightEventListener = function() {
            window.addEventListener('message', (e) => {
                console.log(this);
                console.log(e.data.scrollHeight);
                this.style.height = e.data.scrollHeight;
            });
        }
        $('<div>').addClass('ui horizontal divider').text('AND').appendTo($rootElement);
        $('<iframe>', { id: 'sameBrowserList', src: _src, frameborder: 0, width: '100%' }).load(addScrollHeightEventListener).appendTo($rootElement);
    }

    var createTab = function(_url) {
        console.log(_url);
        window.open(_url, "_blank");
    }

    var setPermit = function() {
        return
        switch ($scope.host) {
            case "wa111":
                $scope.ctrl.deposit.value = 1;
                $scope.ctrl.btnSaveInfo.click();
                break;
            case "ku711":
                $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                $scope.ctrl.DepositChanged();
                $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
                break;
        }
    }

    //$scope.createTab = createTab;

    $scope.events = {
        //createTab: createTab.bind($scope),
        createTab,
        createIFrame,
        setPermit,
        queryInputModel,
        postScrollHeightMessage
    }

}


define(['angular', 'angular-sanitize'], function(angular) {
    window.angular = angular;
    'use strict';
    var myApp = angular.module('OBSApp', ['ngSanitize']);
    myApp.baseUrl = require.toUrl('.');
    myApp.config(function($sceDelegateProvider) {
        //$sceDelegateProvider.resourceUrlBlacklist(['']);
        //$sceDelegateProvider.resourceUrlWhitelist(['self', myApp.baseUrl, myApp.baseUrl + '**']);
    });
    try { angular.bootstrap(document, ['OBSApp']); } catch (ex) {};
    /***********************************************************************************/
    var ng_controller = $("[ng-controller]")[0] || $("body");
    var $element = angular.element(ng_controller);
    var $rootElement = $element[0];
    var $scope = $element.scope();
    var $injector = $element.injector();
    var $invoke = $injector.invoke;
    var $compile = $injector.get('$compile');
    myApp = $injector.modules['OBSApp'];


    loadModules($scope, $rootElement);


    Object.assign(myApp, { $element, $rootElement, $scope, $injector, $invoke, $compile });
    window.extend({ myApp, $element, $rootElement, $scope, $injector, $invoke, $compile });


    return myApp;
});



/*
console.log($injector.modules['OBSApp']);
console.log($injector);
console.log($scope.Service.txtCellPhone.$modelValue);*/
//console.log($scope.StatusEnum);

//console.log($scope.Service.txtBirthDay.$modelValue);