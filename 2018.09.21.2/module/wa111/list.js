define([], function() {
    //console.log(xmlSpider);
    return function($scope) {

        console.log(this.xmlSpider);

        this.xmlSpider.loadend = function() {

            if (this.type == "getAllUser") {

                console.log(this.dexie);

                //this.dataRows.map((r) => { $scope.dexie.user.put(r); })
            }
        };

    }
});