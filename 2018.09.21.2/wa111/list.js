define([], function() {

    return async function({ $dexie, $xmlSpider }) {

        $xmlSpider.loadend = function(a) {
            if (this.type == "getAllUser") {
                this.dataRows.map((r) => {
                    console.log(r);
                    $dexie.user.put(r);
                });
            };
        };

        

    };
});