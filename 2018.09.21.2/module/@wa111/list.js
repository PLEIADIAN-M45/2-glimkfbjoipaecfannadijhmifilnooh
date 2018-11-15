define(["xmlSpider"], function(xmlSpider) {
    xmlSpider.loadend = function() {
        if (this.type == "getAllUser") { this.dataRows.forEach((row) => { $scope.store.user.put(row); }); }
    }
});