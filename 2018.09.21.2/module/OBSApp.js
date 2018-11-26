define([
    'moment', 'material', 'semantic', 'Dexie', 'factory'

], function(moment, mdc, semantic, Dexie, factory) {
    //console.log(user);
    return class OBSApp extends factory {
        constructor() {
            super();
            this.$name = "OBSApp";
            this.element = document.querySelector('[ng-controller]');
            this.$element = angular.element(this.element)
            this.$module = angular.module(this.$name);
            this.$scope = this.$element.scope();
            this.$injector = this.$element.injector();
            this.$compile = this.$injector.get('$compile');
            this.$invoke = this.$injector.invoke;
            this.$rootScope = this.$scope.$root;
            //this.run = function(callback) { return callback.call(this); }
            this.$scope.__proto__ = this;
            //this.injectComponents()
            //this.
            // console.log(this);
            // console.log(this.injectComponents);
        }

    }







});