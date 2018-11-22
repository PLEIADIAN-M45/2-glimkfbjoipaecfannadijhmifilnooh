define(["xmlSpider"], function (xmlSpider) {
    return function ({ $scope, dexie }) {
        function putUser(row) { dexie.user.put(row); };
        xmlSpider.loadend = function () {
            if (this.type == "getAllUser") { this.dataRows.map(putUser) }
        }
    }
});