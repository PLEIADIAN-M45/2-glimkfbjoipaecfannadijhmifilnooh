
/*
        function _getPhoneDate(x) {
            $scope.user.mobile.value = x.f_photo;
            $scope.user.idcard.value = x.f_idCard;
            $scope.user.equpmt.browser = x.f_browser;
            $scope.user.equpmt.osInfo = x.f_osInfo;
        }

        function _getSystemLog(rows) {
            rows.find(({ f_field, f_oldData, f_newData, f_time }) => {
                if (f_field == "f_ishow" && f_oldData == "0" && f_newData == "3") { return $scope.user.timing[0] = f_time; }
            });
        }

        function _getUserStore(x) {
            $scope.user.sequel = x.f_id;
            $scope.user.attach = x.f_joindate;
            $scope.user.agency = x.f_alagent;
            $scope.user.black = x.f_blacklist;
            $scope.user.peril = x.f_peril;
            $scope.user.nickName = x.f_nickName;
            $scope.user.banker.map((d, i) => { d.value = x.f_RemittanceAccount[i]; });
            $scope.user.banker = $scope.user.banker.filter((a) => { return a.value });
        }


        function $Num(str) { return Number(str) }

        function adjUser(user) {
            user.unique = [user.account, user.channel].join('-');
            user.status = user.status.map($Num);
            user.permit = user.permit.map($Num);
            user.author.attr = "author";
            user.locate.attr = "locate";
            user.mobile.attr = "mobile";
            user.idcard.attr = "idcard";
            user.banker.map((x) => { return Object.assign(x, { attr: "banker" }) });
            return user;
        }

        function bindUser(user) {
            console.log(user);
            $scope.user = user;
            $scope.$apply();
        }
 */
/*

    function getUser() {

        chrome.runtime.sendMessage(this.extensionId, { command: 'apiFunctions.store.user.get', unique: this.unique }, bindUser)
    }


    function putUser() {
        $scope.user.command = "apiFunctions.store.user.put";
        chrome.runtime.sendMessage(this.extensionId, $scope.user, function (d) {
            console.log(d);
        })
    }
    */
function putUser3() {
    console.log($scope.user);
    return
    var user = $scope.user;
    var o = Object.assign({ command: 'apiFunctions.store.user.put' }, adjUser(user))
    return $scope.sendMessage(o).then(bindUser);
}

function delUser() {
    return evo.sendMessage({
        command: 'apiFunctions.store.user.delete',
        params: { account: evo.account, channel: evo.channel }
    }).then(() => { console.log('user deleted.'); });
}

function bindUser(user) { return user; }

function stringify(obj) {
    var str = JSON.stringify(obj);
    var res = str.replace(/(")/g, '\\\"');
    return '"' + res + '"'
    console.log(res);
}
define([
    "angular",
    "angular-sanitize",
    "factory",
], function(angular, sanitize, factory) {
    class wa111 {
        constructor() {
            var rootElement = document.createElement('div');
            rootElement.setAttribute('id', 'View');
            rootElement.setAttribute('ng-controller', 'ViewCtrl');
            angular.element(document.body).append(rootElement);
            //angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', factory);
            angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', function() {});
            angular.bootstrap(document, ["OBSApp"]);
        }
    }
    return wa111;
});



/*
function ($scope) {
    $scope.ctrl = factory.ctrl;
    $scope.model = factory.model;
}
*/
/*
       get route() {
           return {
               "login": "login",
               "index": "home",
               "memberlist": "list",
               "membermodify": "edit",
               "depositbonus": "bonus",
               "igetmemberinfo": "logs",
               "samebrowserlist": "logs",
               "deltabank": "cash",
               "deltaonline": "cash",
               "deltawechat": "cash",
               "deltaalipay": "cash",
               "withdrawalsbank": "cash",
               "astropaywithdrawals": "cash"
           } [this.path];

       }*/
//console.log(this.route);
/*
try {
    return this.modules.find(([pattern, n]) => {
        var regex = new RegExp(pattern, 'gi');
        return location.pathname.match(regex);
    })[1];
} catch (ex) {
    return undefined;
}
*/
/*
    //document.body.appendChild(rootElement)
get $rootElement() {
    var rootElement = document.createElement('div');
    rootElement.name = 'ViewCtrl';
    rootElement.setAttribute('id', 'View');
    rootElement.setAttribute('ng-controller', 'ViewCtrl');
    document.body.appendChild(rootElement)
    return rootElement;
}*/


//angular.module("OBSApp", ["ngSanitize"]).controller("projectCtrl", function($scope) {})
//angular.bootstrap(document, ["OBSApp"]);
//console.log(require.toUrl("."));
/*
var myApp = angular.module("OBSApp", ["ngSanitize"])
    .config(function($sceDelegateProvider) {
        myApp.baseUrl = require.toUrl(".");
        $sceDelegateProvider.resourceUrlBlacklist([""]);
        $sceDelegateProvider.resourceUrlWhitelist(["self", myApp.baseUrl, myApp.baseUrl + "**"]);
    })
    .controller("projectCtrl", function($scope) {
        var elements = ["span", "input", "select", "button"].map((x) => { return Array.from(document.querySelectorAll(x)) }).flat();
        $scope.ctrl = elements.toCtrls();
        $scope.elems = elements.toCtrls();
        $scope.model = elements.toModel();
    });

$("<div id='View' ng-controller='projectCtrl'></div>").appendTo("body");
angular.bootstrap(document, ["OBSApp"]);
return myApp;*/
//if (window.aspnetForm) {};
//Array.prototype.
//Array.from(aspnetForm.elements).map((x) => { return x.value });
//NodeList.prototype.forEach = Array.prototype.forEach;
/*
if (window.ctl00_ContentPlaceHolder1_BankCode111) {
    console.log(ctl00_ContentPlaceHolder1_BankCode111.childNodes);
    ctl00_ContentPlaceHolder1_BankCode111.childNodes.forEach((x) => { console.log(x); })
}
*/
//$("<div>", { id: "View" }).appendTo('body');
/***********************************************************************************/
/*
    try {} catch (ex) {};

    myApp.baseUrl = require.toUrl(".");
.config(function($sceDelegateProvider) {
            //$sceDelegateProvider.resourceUrlBlacklist([""]);
            //$sceDelegateProvider.resourceUrlWhitelist(["self", myApp.baseUrl, myApp.baseUrl + "**"]);
        });
var ng_controller = $("[ng-controller]")[0] || $("body");
var $element = angular.element(ng_controller);
var $rootElement = $element[0];
var $scope = $element.scope();
var $injector = $element.injector();
var $invoke = $injector.invoke;
var $compile = $injector.get("$compile");

myApp.config(function($sceDelegateProvider) {
    //$sceDelegateProvider.resourceUrlBlacklist([""]);
    //$sceDelegateProvider.resourceUrlWhitelist(["self", myApp.baseUrl, myApp.baseUrl + "**"]);
});
//myApp = $injector.modules["OBSApp"];

var myApp = angular.module("OBSApp");


var bootstrapApp = angular.element(window.document.querySelector("[ng-app]")).scope();
console.log($scope);
console.log(bootstrapApp);

//loadModules.call($scope)

//loadModules($scope, $rootElement);

console.log(myApp);

Object.assign(myApp, { $element, $rootElement, $scope, $injector, $invoke, $compile });

window.extend({ myApp, $element, $rootElement, $scope, $injector, $invoke, $compile });


return myApp;
*/