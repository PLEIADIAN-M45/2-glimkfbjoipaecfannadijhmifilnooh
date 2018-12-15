define([], function() {
    //console.log(xmlSpider);
    return function($scope) {


        console.log(this.xmlSpider);

        
        this.xmlSpider.loadend = function() {

            if (this.type == "getAllUser") {
                
                this.dataRows.map((r) => {
                    //console.log(r);
                    $scope.dexie.user.put(r);
                })
            }
        };
        
    }
});