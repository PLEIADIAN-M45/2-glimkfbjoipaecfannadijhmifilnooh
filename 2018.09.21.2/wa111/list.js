define([], function() {
    return function({ $dexie, $xmlSpider }) {
        $xmlSpider.loadend = function() {
            if(this.type == "getAllUser") {
                this.dataRows.map((r) => {
                    $dexie.user.put(r);
                    console.log(r);
                });
            };
        };
    };
})