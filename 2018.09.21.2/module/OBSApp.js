define(['factory'], function(factory) {
    return class OBSApp {
        constructor() {
            //super();
            this.$name = "OBSApp";
            this.$element = document.querySelector('[ng-controller]');
            //this.$element = angular.element(this.element);
            this.$view = angular.element(this.$element);
            this.$module = angular.module(this.$name);
            this.$scope = this.$view.scope();
            this.$injector = this.$view.injector();
            this.$compile = this.$injector.get('$compile');
            this.$invoke = this.$injector.invoke;
            this.$rootScope = this.$scope.$root;

            Object.assign(this.$scope.__proto__, this);
            factory.call(this.$scope);
        }
    }
});