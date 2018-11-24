define(["xmlSpider"], function(xmlSpider) {
    return function() {
        xmlSpider.loadend = function() {
            if (this.type == "getAllUser") { this.dataRows.map((r) => { this.dexie.user.put(r); }) }
        };
    }
});