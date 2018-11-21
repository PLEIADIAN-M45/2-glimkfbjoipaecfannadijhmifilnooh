define(["xmlSpider"], function(xmlSpider) {
    return function({ $scope, $dexie }) {
        xmlSpider.loadend = function() {
            if (this.type == "getAllUser") { this.dataRows.forEach((row) => { $dexie.user.put(row); }); }
        }
    }
});