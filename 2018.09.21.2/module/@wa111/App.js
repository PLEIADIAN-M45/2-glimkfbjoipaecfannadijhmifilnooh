define(["angular", "angular-sanitize"], function(angular, sanitize) {

    console.log(require.toUrl("."));

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
    return myApp;
});







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