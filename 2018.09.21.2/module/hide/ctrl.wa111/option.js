define(['App'], function(app) {

    app.controller('myCtrl', function($scope, myService, hexafy) {
        console.log(myService);
        console.log($scope);
        $scope.name = "RYAN";
        $scope.hex = hexafy.myFunc(255);
    })


})