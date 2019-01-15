define([], function() {
    return function({ $dexie, $xmlSpider }) {
        $xmlSpider.loadend = async function() {
            if(this.commander == "GETALLUSER") {
                this.dataset.map((d) => { $dexie.user.put(d) });
            }
        };
    };
})
