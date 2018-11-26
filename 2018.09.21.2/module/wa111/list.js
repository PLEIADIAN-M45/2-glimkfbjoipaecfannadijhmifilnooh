define(['App', 'xmlSpider'], function($scope, xmlSpider) {
    return function() {
        xmlSpider.loadend = function() {
            if(this.type == "getAllUser") { this.dataRows.map((r) => { $scope.dexie.user.put(r); }) }
        };
    }.call($scope)
});