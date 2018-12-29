



var app = angular.module(this.$name);

var injector = this.$view.injector();

app.service('hexafy', function() {
    this.myFunc = function(x) {
        return x.toString(16);
    }
});


console.log(app);
console.log(injector);



/*
app.factory('loadModule', function($injector) {
    console.log($injector);
    return function loadModule(moduleName, bundleUrl) {
        return getScript(bundleUrl).then(function() { $injector.loadNewModules([moduleName]); });
    };

})    */



var tmpFn = function(obfuscatedCompile, obfuscatedRootScope, hexafy) {
    console.log(service);
};
injector.invoke(tmpFn);




tmpFn.$inject = ['$compile', '$rootScope', 'hexafy'];
injector.invoke(tmpFn);







console.log(this);

console.log(this.$module);

//console.log(this.$injector.loadNewModules);
//console.log(this.$injector.get('hexafy'));


//this.$scope.loadModule
/*
       
        */
/*
app.service('hexafy', function() {
    this.myFunc              = function(x) {
        return x.toString(16);
    }
});


app.factory('loadModule', function($injector) {

    console.log($injector);

    return function loadModule(moduleName, bundleUrl) {
        return getScript(bundleUrl).then(function() { $injector.loadNewModules([moduleName]); });
    };

})


*/


//console.log(services);
//angular.extend(this.$scope.__proto__, services);


/*
console.log(angular);
console.log(this.$module);
console.log(this.$injector);
console.log(this.$scope);
console.log(this.$rootScope);
*/
//angular.extend(this.$scope, new services());









app.factory('myFactory', function() {
    var service = {};
    return service;
});

app.factory('myFactory2', function() {
    var _artist = '';
    var service = {}

    service.getArtist = function() {
        return _artist
    }

    return service;
})




function fetchData() {

    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");

    return $http.get("/path/to/data.json").then(
        function(response) {
            myApplication.constant("config", response.data);
        },
        function(errorResponse) {
            // Handle error case
        }
    );
}




//var myApp = angular.module(this.$name);
//console.log(myApp);


/*
myApp.factory('TaxFactory', function() {
    // creating empty serviceobject
    var calService = {};

    // object with some bussiness logic 
    calService.cal = function() {

    }

    // returning object that can be used by the controller.
    return calService;

});



console.log(myApp);
*/

//angular.injector


//console.log(angular);


//console.log(angular);
//angular.module('OBSApp', ["ngSanitize", "ngAnimate"]).controller('View', function($scope, $rootScope) {});
//angular.controller('controllerName', controllerName);










/*+
   var rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'View');
    rootElement.setAttribute('ng-controller', 'View');


    angular.element(document.body).append(rootElement);
   var $div = $('<div ng-controller="View" id="View"></div>');
    $(document.body).append($div);
*/


//if (localStorage.host == "wa111") {}



























/*

//console.log(4);
            //Object.assign(this.$scope.__proto__, this);
            //Object.assign(this.$scope.__proto__, new service());

*/
/*
define(function(require, exports, module) {

    console.log(module.config().host);

    //Will be the value 'large'
    //var size               = module.config().size;
});

    //console.log(this);
    //console.log(document.querySelector('[ng-controller]'));

*/


/*
define(['factory'], function(factory) {
    return class OBSApp2 {
        constructor() {
            this.$name       = "OBSApp";
            this.$element    = document.querySelector('[ng-controller]');
            this.$view       = angular.element(this.$element);
            this.$module     = angular.module(this.$name);
            this.$scope      = this.$view.scope();
            this.$injector   = this.$view.injector();
            this.$compile    = this.$injector.get('$compile');
            this.$invoke     = this.$injector.invoke;
            this.$rootScope  = this.$scope.$root;
            Object.assign(this.$scope.__proto__, this);
            Object.assign(this.$scope.__proto__, new factory());
        }
    }
});
*/



//console.log(this.$scope);
//abcd.call(this.$scope)
//this.$element              = angular.element(this.element);
//factory.call(this.$scope);