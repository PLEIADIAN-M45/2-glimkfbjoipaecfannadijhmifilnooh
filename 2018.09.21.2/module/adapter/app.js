var defineProperties = function(properties) { return new Promise((resolve, reject) => { resolve(Object.assign($scope, properties)); }) };

define([evo.host + '/app'], function(app) {
    var controllerProvider = evo.controllerProvider;
    var $scope = controllerProvider.scope();
    var $injector = controllerProvider.injector();
    var $compile = controllerProvider.injector().get('$compile');
    var $invoke = $injector.invoke;
    $scope.defineProperties = defineProperties;
    $scope.extend = function() {
        Object.assign(this, ...arguments);
        if (!this.$$phase) { this.$apply(); }
        return this;
    }




    evo.extend({ $scope, $injector, $compile, $invoke });
    window.extend({ $scope, $compile, $injector });
    return app;
});











// myApp.$injector.invoke(myApp.$controller)





//app.extend({ $scope, $compile, $injector })
//window.myApp = app;




/*
app.assign({ $scope, $compile, $injector });;

$scope.assign = assign;
$scope.defineProperties;
$scope.assign({ defineProperties, extend })
*/
/*



serialize
serializeArray
serializeToJson
toArray
search
templates
selector
selectpicker
ready
progress
queue
prop
wrap
*/
/*
regExp:
variable: /\{\$*[A-z0-9]+\}/g


regExp: {
    beginsWith: "(?:s|^)",
    escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    __proto__: Object,
    searchDelay: 200
}
*/