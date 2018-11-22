define([
    "angular",
    "angular-sanitize",
    "factory",
    "apiFunction"
], function (angular, sanitize, factory, apiFunction) {


    class wa111 {

        constructor() {
            var rootElement = document.createElement('div');
            rootElement.setAttribute('id', 'View');
            rootElement.setAttribute('ng-controller', 'ViewCtrl');
            angular.element(document.body).append(rootElement);
            angular.module("OBSApp", ["ngSanitize"]).controller('ViewCtrl', factory)
            angular.bootstrap(document, ["OBSApp"]);

            //this.apiFunction = new apiFunction(this)
        }
    }
    return wa111
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

function createControllerElement() {
    //console.log(this.controllerId);
    var div = document.createElement('div');
    //div.id = this.controllerId;
    div.setAttribute('id', this.controllerId);
    div.setAttribute('ng-controller', 'projectCtrl')
    document.body.appendChild(div);
}

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