var myApp = angular.module("Foo", []);

myApp.controller("GlobalController", function($scope, $compile, $timeout) {

    $("#modal").on("shown.bs.modal", function() {
    	
        var $modal = angular.element(document.querySelector('.modal-content'));

        $timeout(function() {
            $compile($modal.contents())($scope);
        }, 1000);
    });

});

myApp.controller("ViewModalController", function() {

});