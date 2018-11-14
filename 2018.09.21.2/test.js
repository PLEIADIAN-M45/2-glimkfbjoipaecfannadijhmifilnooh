//console.log(window.angular);

//var myApp = angular.module('OBSApp', []);
//console.log(myApp);
//$("[ng-controller]")[1] ||

OBSApp.Controllers.testCtrl = function(n, t, i, r, u, f, e, o, s, h) {
    /*
        console.log(arguments);
        console.log(n);
        console.log(t);
        */

    this.author = "RYAN CHANG 88"
}
OBSApp.Controllers.testCtrl.$inject = ["$filter", "EditMemberInfoManageSvc", "appConfig", "NgTableParams", "XPagerSvc", "$q", "LogSvc", "ObjectDiff", "blockUI", "$timeout"];
OBSApp.Controllers.testCtrl.$name = "testCtrl";

OBSApp.Controllers.testCtrl.cde = "wddwdwd";

//OBSApp.Controllers.testCtrl.author = "RYAN CHANG"
OBSApp.Controllers.testCtrl.prototype.stop3 = function() {
    console.log(121);
}

OBSApp.Controllers.testCtrl.prototype.author = "RYAN CHANG"
//  console.log(OBSApp.Controllers);
// console.log(OBSApp.RegisterAngular.RegisterController);
//console.log(OBSApp.RegisterAngular.RegisterController);


OBSApp.RegisterAngular.RegisterController(
        OBSApp.Controllers.testCtrl.$name,
        OBSApp.Controllers.testCtrl),
    function(n) {
        var t;
        (function(n) {
            var t = function() {
                function n() {}
                return n
            }();
            n.LoginResetPWD = t
        })(t = n.Models || (n.Models = {}))
    }(OBSApp || (OBSApp = {})),
    function(n) {
        var t;
        (function(n) {
            var t = function() {
                function n(n) { this.dataProvider = n }
                return n.prototype.UpdateBackendAccountPWD = function(n) {
                    var r = this.dataProvider.CreateDeferred(),
                        u = "",
                        t, i;
                    return location.hostname.indexOf("localhost") !== -1 ? location.pathname !== "/" && (u = "..") : (t = location.pathname, i = location.href, t.charAt(t.length - 1) === "/" && (t = t.substring(0, t.length - 1)), u = t.split("/").length > 2 ? ".." : i.charAt(i.length - 1) === "#" ? i.substring(0, i.length - 1) : i), this.dataProvider.Get(u + "/api/BackendAuthority/UpdateBackendAccountPWD", HttpMethodEnum.Post, n).then(function(n) { r.resolve(n.Data) }).catch(function(n) { r.reject(n) }), r.promise
                }, n.$name = "LogoutSvc", n.$inject = ["DataProvider"], n
            }();
            n.LogoutService = t
        })(t = n.Services || (n.Services = {}))
    }(OBSApp || (OBSApp = {}));


console.log($("#testCtrl"));

var ng_controller = $("#testCtrl");

var $element = angular.element(ng_controller);
var $rootElement = $element[0];
var $scope = $element.scope();
var $injector = $element.injector();
var $invoke = $injector.invoke;
var $compile = $injector.get('$compile');
myApp = $injector.modules['OBSApp'];


$scope.author = "FWEFEWF"
$scope.$apply()
console.log($scope);

//console.log($);

//console.log($('body'));

//$('body').append("")

//var div = $('<div ng-controller="test1"></div>')
//div.appendTo('body');



/*
try {
    angular.bootstrap(document.body, ['myApp']);
} catch (ex) {
    console.warn(ex);
};
*/