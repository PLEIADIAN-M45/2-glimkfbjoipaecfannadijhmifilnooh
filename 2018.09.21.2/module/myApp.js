define(['App', 'service'], function(App, service) {
    return new class myApp {
        constructor() {
            this.$name      = "OBSApp";
            this.$element   = document.querySelector('[ng-controller]');
            this.$view      = angular.element(this.$element);
            this.$module    = angular.module(this.$name);
            this.$scope     = this.$view.scope();
            this.$injector  = this.$view.injector();
            this.$compile   = this.$injector.get('$compile');
            this.$invoke    = this.$injector.invoke;
            this.$rootScope = this.$scope.$root;
            angular.extend(this.$scope.__proto__, service);
        }
    }
});




/*

//console.log(4);
            //Object.assign(this.$scope.__proto__, this);
            //Object.assign(this.$scope.__proto__, new service());

*/
/*
define(function(require, exports, module) {

    console.log(module.config().host);

    //Will be the value 'large'
    //var size              = module.config().size;
});

    //console.log(this);
    //console.log(document.querySelector('[ng-controller]'));

*/


/*
define(['factory'], function(factory) {
    return class OBSApp2 {
        constructor() {
            this.$name      = "OBSApp";
            this.$element   = document.querySelector('[ng-controller]');
            this.$view      = angular.element(this.$element);
            this.$module    = angular.module(this.$name);
            this.$scope     = this.$view.scope();
            this.$injector  = this.$view.injector();
            this.$compile   = this.$injector.get('$compile');
            this.$invoke    = this.$injector.invoke;
            this.$rootScope = this.$scope.$root;
            Object.assign(this.$scope.__proto__, this);
            Object.assign(this.$scope.__proto__, new factory());
        }
    }
});
*/



//console.log(this.$scope);
//abcd.call(this.$scope)
//this.$element             = angular.element(this.element);
//factory.call(this.$scope);