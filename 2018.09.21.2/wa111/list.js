define([], function() {

    return async function({ $dexie, $xmlSpider }) {

        $xmlSpider.loadend = function() {
            
            if (this.type == "getAllUser") {
                this.dataRows.map((r) => {
                    $dexie.user.put(r);
                    console.log(r);
                });
            };
        };


    };
});