define(["xmlSpider"], function(xmlSpider) {


    xmlSpider.loadend = function() {
        if (this.type == "getAllUser") {
            this.dataRows.forEach((row) => {
                evo.store.user.put(row);
            });
        }
    }
    
});