define(['xmlSpider'], function(xmlSpider) {

    console.log(xmlSpider);


    return function($scope) {
        xmlSpider.loadend = function() {
            if (this.type == "getAllUser") {
                this.dataRows.map((r) => {
                    //console.log(r);
                    $scope.dexie.user.put(r);
                })
            }
        };
    }
});