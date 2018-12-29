var store = new Dexie('evo');
store.version(5).stores({
    //user: '[account+channel]',
    //user: 'sequel',
    user: 'unique',
    users: 'account',
    xmlhttp: 'lastPath',
    author: '++id',
    banker: '++id',
    mobile: '++id',
    locate: '++id',
    danger: '++id',
    notice: '++id',
    region: '++id',
    GB2260: 'code, area',
    alerts: 'author'
});
evo.store = store;
//console.log(evo.store);
apiFunctions.store = {};
evo.store.tables.forEach(function(table, index) {
    apiFunctions.store[table.name] = {
        del: function() {
            return evo.store[table.name].where("unique").equals(this.params).delete().then(() => {
                console.log("Database successfully deleted");
            })
        },
        put: function() {
            return evo.store[table.name].put(this.params).then(() => { return this.params })
        },
        get: function() {
            return evo.store[table.name].get(this.params).then((res) => { return res })
        }
    }
});

function parserRaw(requestBody) {
    if (requestBody) {
        var postedString = decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(requestBody.raw[0].bytes)));
        return postedString;
    } else { return null; }
}