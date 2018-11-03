define(["xmlSpider"], function(xmlSpider) {
    xmlSpider.loadend = function() {
        //console.log(this.command);
        if (this.command == "getAllUser") {
            this.dataRows.forEach((row) => {
                evo.store.user.put(row);
            });
        }
    }
});