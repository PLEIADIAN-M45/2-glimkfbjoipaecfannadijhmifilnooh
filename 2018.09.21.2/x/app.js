define(['app', 'app.service', 'app.sendSms'], function(App, service, sendSms) {
    return new function() {
        this.$name = "OBSApp";
        this.$element = document.querySelector('[ng-controller]');
        this.$view = angular.element(this.$element);
        this.$module = angular.module(this.$name);
        this.$scope = this.$view.scope();
        this.$injector = this.$view.injector();
        this.$compile = this.$injector.get('$compile');
        this.$invoke = this.$injector.invoke;
        this.$rootScope = this.$scope.$root;
        this.$scope.$view = this.$view;
        this.$scope.$compile = this.$compile;
    }
});


// console.log($rootScope);


return new class abc {
    constructor() {
        this.abc = 123
    }
}



function ef() {
    //console.log(this.$id);
    //console.log($document.rootElement);
    //console.log($rootElement.rootElement);

    /*
    console.log($templateRequest);
    console.log(chrome);
    console.log(require.toUrl('module/html/edit.html'));
    */

    this.abc = 123
    /*
    $templateRequest(chrome.extension.getURL('module/html/edit.html')).then(function(html) {
        
        var template = angular.element(html);

        console.log(template);
        
        //angular.element(document.getElementById('space-for-folders')).append($compile(template)($scope));
    });
    */
}




//.call($rootScope)



//return new fwef()