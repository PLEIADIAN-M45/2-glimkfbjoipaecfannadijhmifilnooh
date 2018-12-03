define(['xmlSpider'], function(xmlSpider) {
    return function($scope) {
        xmlSpider.loadend = function() {
            if(this.type == "getAllUser") {
                this.dataRows.map((r) => {
                    $scope.dexie.user.put(r);
                })
            }
        };
    }
});
