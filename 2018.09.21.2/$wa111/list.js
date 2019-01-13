define([], function() {
    return function({ $dexie, $xmlSpider }) {
        $xmlSpider.loadend = function() {
            if (this.sendData.type == "getAllUser") {
                this.dataset.map((r) => { return $dexie.user.put(r).then(() => { console.log(r); }) });
            };
        };
    };
})