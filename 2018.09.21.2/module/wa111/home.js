//(function(window, angular) {'use strict';	console.log(angular);})(window, window.angular);
define([], function() {
    return function() {
        localStorage.channel = window.siteNumber;
        localStorage.siteName = this.model.spTitle2;
        localStorage.operator = this.model.hdfsite_tab.split('_')[0];
    }
});




/*
var injector = angular.injector(["ng"]);
//console.log(injector);
return
*/