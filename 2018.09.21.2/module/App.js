define([
    'moment', 'material', 'semantic',
    'factory', 'App',
], function(moment, mdc, semantic, factory, React) {
    class App extends React {
        constructor() {
            super();
            this.$element        = document.querySelector("[ng-controller]");
            this.$view           = angular.element(this.$element);
            this.$module         = angular.module("OBSApp");
            this.$injector       = this.$view.injector();
            this.$compile        = this.$injector.get('$compile');
            this.$invoke         = this.$injector.invoke;
            this.$scope          = this.$view.scope();
            this.$scope.$view    = this.$view;
            this.$scope.$compile = this.$compile;
            this.$scope.$element = this.$element;
            this.$rootScope      = this.$scope.$root;
            factory.call(this.$scope);
        }
    }
    return new App();
});