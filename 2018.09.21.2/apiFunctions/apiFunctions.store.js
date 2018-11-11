var store = new Dexie('evo');
store.version(4).stores({
    user: '[account+channel]',
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



apiFunctions.store = {}

evo.store.tables.forEach(function(table, index) {
    apiFunctions.store[table.name] = {
        put: function() { return evo.store[table.name].put(this.params).then(() => { return this.params }) },
        get: function() { return evo.store[table.name].get(this.params).then((d) => { return d }) }
    }
});

