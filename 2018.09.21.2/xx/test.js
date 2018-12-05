var myApp = angular.module('OBSApp')


OBSApp.Controllers.testCtrl = function(a, b) {
    console.log(a);
    console.log(b);
    b.abc = 1213;
    b.url = a.$$absUrl;
}
OBSApp.Controllers.testCtrl.$name = "testCtrl"
OBSApp.Controllers.testCtrl.$inject = ["$location", "$scope"]
OBSApp.Controllers.testCtrl.prototype.fuck = function() {

}
OBSApp.RegisterAngular.RegisterController(OBSApp.Controllers.testCtrl.$name, OBSApp.Controllers.testCtrl)
console.log(OBSApp.Controllers);
$('<div ng-controller="testCtrl" id="testCtrl">{{url}}</div>').appendTo('body');

//console.log(myApp);


//var ng_controller = $("[ng-controller]")[0] || $("body");

/*
var ng_controller = $("#testCtrl");
var $element = angular.element(ng_controller);
var $rootElement = $element[0];
var $scope = $element.scope();
var $injector = $element.injector();
var $invoke = $injector.invoke;
var $compile = $injector.get('$compile');

//console.log($injector.get('$q'));
//console.log($injector.get('$q'));
//console.log($injector.get('AccountLevelEnum'));


//myApp = $injector.modules['OBSApp'];

//console.log(myApp);
console.log($scope);
console.log($injector);
*/

function mytest() {
    injectScript({ "src": getURL('test.js') })
    //setTimeout(function() { console.log(window.angular); }, 2000)
}