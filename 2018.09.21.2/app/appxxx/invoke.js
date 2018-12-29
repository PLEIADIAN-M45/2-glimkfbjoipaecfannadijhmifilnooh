//factory.bind(this.$scope)
//factory.call(this.$rootScope)




//var $http = this.$injector.get("$http");
//console.log($http);
//factory.$inject = ['$compile', '$rootScope'];


//console.log(this.$module);
/*
var injector = this.$view.injector();
var tmpFn = function($compile, $rootScope, $http, $sce, $rootElement, $location, myFactory) {
    console.log(myFactory);
};
injector.invoke(tmpFn);
// tmpFn.$inject = ['$compile', '$rootScope'];
*/



class Logger extends ILogger {
    constructor(console) {}
    /* methods */
}




function Logger() {}
Logger.prototype = Object.create(ILogger.prototype); // subclass







/*
class myScope22 {
    constructor() {}
}

function myScope() {

}


myScope.prototype = $scope;


class xyz extends myScope {
    constructor() {
        super();
        //console.log(this.$root);
        this.abc = 3213
    }
}
*/

//xyz.prototype.constructor = $scope;
//xyz.constructor = $scope;