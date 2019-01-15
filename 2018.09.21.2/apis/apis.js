// 1
function parseToObject(obj) {
    //let obj = Object.create(null);
    console.log(obj);
};



var apis = Object.create({});
apis.global = Object.create({});
apis.localStorage = window.localStorage
apis.sessionStorage = window.sessionStorage


apis.getUser = function(params) { return dexie.user.get(params); };
apis.putUser = function(params) {
    //console.log(params);
    //params.lastModify = moment(Date.now())
    //params.timespan = moment().format('YYYY-MM-DD HH:mm:ss');
    return dexie.user.put(params);
};
apis.delUser = function(params) { return dexie.user.delete(params); };

apis.getTabId = function(params, sender) {
    //console.log(sender);
    return Promise.resolve(sender)
};


apis.sender = function(params, sender) {
    //console.log(sender);
    return Promise.resolve(sender)
};


apis.getGlobal = function(params, sender) {
    //console.log(sender);
    return Promise.resolve(apis.global)
};





/*
.map((commands) => {
    var value = localStorage[s]
    var str = decodeURI(atob(value));
    console.log(angular.fromJson(str));

})
*/



/*
get audience() { return this.tokenInfo.audience; }
get macros() { return "https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec" }

download() {
    if(window.localStorage.length < 5) {
        return Promise.all([
            fetch(this.macros + '?commands=GMA').then(this.toJson),
            fetch(this.macros + '?commands=GMB').then(this.toJson)
        ]).then(this.flat).then(this.save).then((x) => { console.log(localStorage); })
    } else {
        this.save(Object.entries(localStorage))
    }
}
*/



/*
apis.global = parseToObject(localStorage)
Array.from(localStorage)
Object.entries(localStorage)
*/


/*
apis.storage = {
    local: window.localStorage,
    session: window.sessionStorage
}
*/



/*
apis.getLocalStorage = function(params) { return Promise.resolve(window.localStorage); };
apis.localStorage = window.localStorage

*/