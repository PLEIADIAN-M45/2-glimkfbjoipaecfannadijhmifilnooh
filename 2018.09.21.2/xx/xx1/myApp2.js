var myApp2 = angular.module('myApp2', [])
    .config(function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        //console.log($locationProvider);
        //$locationProvider.html5Mode(true).hashPrefix('!');

    })
    .service('myService', function() {
        console.log("myService");
    })

    .controller('LocationController', ['$scope', '$location', function($scope, $location) {
        console.log($location);
        $scope.name3 = "RYABN"

        /*$scope.$location = {};
        angular.forEach('protocol host port path search hash'.split(' '), function(method) {
            $scope.$location[method] = function() {
                var result = $location[method]();
                return angular.isObject(result) ? angular.toJson(result) : result;
            };
        });*/
    }]).directive('sayhello', function() {
        return {
            restrict: 'E',
            template: '<div>Hello {{ name3 }}</div>',
            // 也可以使用 templateUrl 指定檔案
            // templateUrl: 'test.html'
        };
    });



//dispatch().then(createIFrame)

/*
var event = new Event('build');
$rootElement.addEventListener('build', function(e) {
    console.log(e);
    console.log('++++++++++++');
}, false);
$rootElement.dispatchEvent(event);
console.log($rootElement);
*/

var div = $('<div ng-controller="LocationController"></div>')
div.appendTo('body');


angular.bootstrap(div, ['myApp2']);

console.log(div);

return

$('body').append('<sayhello></sayhello>')


$('body').attr("ng-controller", "LocationController")
angular.bootstrap(document.body, ['myApp2']);

try {
    angular.bootstrap(document.body, ['myApp']);
} catch (ex) {};
console.log(myApp2);
//var c = angular.injector(['ng', 'myApp2']).get('myService');
//var c = angular.injector(['ng', 'myApp2']).get('$location');

console.log(angular);


return



var c = angular.injector(['ng', 'myApp2']).get('$location');
//var c = angular.injector(['ng', 'myApp2']).get('$rootElement');

//console.log(c);
//console.log(angular);
//console.log(angular.injector);
//console.log(ng_controller);
//console.log($element);
/*
console.log(myApp);
console.log($injector);
*/