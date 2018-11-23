define(["xmlSpider"], function(xmlSpider) {


    return function({ $scope, dexie }) {
        console.log(dexie);

        function putUser(row) { dexie.user.put(row); };

        xmlSpider.loadend = function() {
        	console.log(this);
            if(this.type == "getAllUser") { this.dataRows.map(putUser) }
        }
    }
});