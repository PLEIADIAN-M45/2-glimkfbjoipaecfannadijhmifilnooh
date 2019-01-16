define([], function() {
    return function({ apis, $dexie, $xmlSpider }) {
        $xmlSpider.loadend = async function() {
            if(this.commander == "GETALLUSER") { this.dataset.map((d) => { $dexie.user.put(d) }); }
        };

        apis.auto_clean();
    };
})