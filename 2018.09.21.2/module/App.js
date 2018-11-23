define([
    'moment', 'material', 'semantic',
    'factory',
    'App',
], function(moment, mdc, semantic, factory, React) {
    class App extends React {
        constructor() {
            super();

            //console.log(this.OBSApp);
            //console.log(this.OBS);



            this.$mainModule = angular.module("OBSApp");

            console.log(this.$mainModule);

            //console.log(document.querySelector("ng-app"));

            this.$rootElement = document.getElementById('View') || document;
            this.$projElement = angular.element(this.$rootElement);
            //console.log(this.$projElement);
            this.$scope = this.$projElement.scope();


            this.$injector = this.$projElement.injector();
            this.$invoke = this.$injector.invoke;
            this.$compile = this.$injector.get('$compile');



            factory.call(this);
            factory.call(this.$scope);
        }
    }
    return window.Evo = new App();
})