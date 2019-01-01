define([], function() {
    return async function() {


        this.xmlSpider.loadend = function() {
            if(this.type == "getAllUser") {
                this.dataRows.map((r) => {
                    console.log(r);
                    this.dexie.user.put(r);
                });
            };
        };

    };
});