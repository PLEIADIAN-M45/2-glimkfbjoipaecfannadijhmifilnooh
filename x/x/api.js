
/*
api = {};
api.store = new Dexie('evo');
api.store.version(5).stores({ user: 'unique', GB2260: 'code' });
*/

class Evolution {
    constructor() {
        //super();
        /*
        this.clear();
        this.download();
        */
        //Object.entries(localStorage).forEach(this.decoder)
    }


    //get user() { return store.user.get(this.unique) }
    //getUser(unique) { return store.user.get(this.unique) }

    entries() {
        Object.entries(localStorage).forEach(([name, value]) => {
            //console.log(name);
            //console.log(this.decoder(value));
            if (name) {
                this.decoder(value, name)
            }
        })
    }


    clear() {
        localStorage.clear();
    }

    toLocalStorage(res) {
        console.log(res);
        return res.forEach(([name, value]) => { localStorage[name] = value; })
    }

    toJson(res) { return res.json() }

    toText(res) { return res.text() }

    flat(arr) { return arr.flat(); }

    save(arr) { arr.forEach(([name, value]) => { localStorage[name] = value; }) }

    decoder([name, value]) {
        try {
            var str = decodeURI(atob(value))
            console.log(angular.fromJson(str));
        } catch (ex) {
            console.error(name);
        }
    }

    get macros() { return "https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?commands=" }

    download() {
        if (window.localStorage.length < 51) {
            return Promise.all([
                fetch(this.macros + 'GMA').then(this.toJson),
                fetch(this.macros + 'GMB').then(this.toJson)
                //fetch('https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?commands=GMB').then(this.toJson)
            ]).then(this.flat).then(this.save).then((x) => {
                this.entries()
                console.log(localStorage);
                return localStorage;
            })
        } else {

        }
    }

}
























/*
store.user.get('JIABO1006-26').then((s) => {
    console.log(s);
    return sendResponse(s)
})
*/

//const apiFunctions = new ApiFunctions();
//const evo = new Evolution();




/*
api.xmlHttp = function(request, sender, sendResponse) {

    console.log(request);
    console.log(this);


        var mod = robot[this.action];

        if(mod) {
            console.log("[XMLHttpRequest]", this.action);
            return mod.apply(this);
        }

    //return Promise.resolve(9582626)


    var _robot = robot[this.action] || robot[this.type] || robot[this.lastPath];
    if(_robot) { _robot.call(this); }
    return Promise.resolve({});

}
*/
/*
api.XMLHttpRequest.getmodel = function(request, sender, sendResponse) {
    console.log(xxxxxxxxx);
}
*/

//console.log(store.user);



/*
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    var obj = request.user;
    var promise = eval(request.command)(obj).then(sendResponse);
    console.log(promise);
    return true
})
*/

//console.log(apiFunctions);
//console.log(evo);
//console.log(store.user);




// get: ƒ (keyOrCrit, cb)
// put: ƒ (obj, key)
// delete: ƒ (key)
// clear: ƒ ()


// toCollection: ƒ ()
// toArray: ƒ (cb)
// mapToClass: ƒ (constructor, structure)

class ApiFunctions {
    constructor() {
        //store.
        //super();
        //this.store = store;
        // console.log(store.user);
    }

    get store() {
        return {
            user: {
                put: function(request) {
                    console.log(request);
                    return store.user.put(request.user).then(() => {
                        return "OK"
                    })
                }

            }

        }
    }

    get XMLHttpRequest() {

    }
}


class stores {
    constructor() {

    }
}


/*
get: function(keyOrCrit, cb) {
        if(keyOrCrit && keyOrCrit.constructor === Object)
            return this.where(keyOrCrit).first(cb);
        var self = this;
        return this._idbstore(READONLY, function(resolve, reject, idbstore) {
            var req = idbstore.get(keyOrCrit);
            req.onerror = eventRejectHandler(reject);
            req.onsuccess = wrap(function() {
                resolve(self.hook.reading.fire(req.result));
            }, reject);
        }).then(cb);
    },*/


function cb(value) {
    console.log(value);
}


async function exec() {

    var store = new Dexie('evo');
    store.version(5).stores({ user: 'unique', GB2260: 'code' });
    /*store.tables.forEach((table) => {    console.log(table);})*/
    var _command = "store.user.get('JIABO1006-26')";

    eval(_command).then(cb)

    return

    eval(_command).call(store.user, { unique: "JIABO1006-26" })
        .then((user) => { console.log(user); })

    console.log(store);

    //get: ƒ (keyOrCrit, cb)
    //where: ƒ (indexOrCrit)

    store.user.get("JIABO1006-26", cb)
    store.user.get("JIABO1006-26").then(cb)

    return
    var c = await store.user.get("JIABO1006-26")
    console.log(c);
    store.user.get("JIABO1006-26").then((user) => {
        console.log(user);
    })


}

//exec()

//.call({ unique: "JIABO1006-26" })



/*
class Store {
    constructor() {

        this.user = store.user
    }



    put(a) {
        console.log(12, a);

    }
}
*/
/*
function Store() {

}

Store.prototype.user = store.user
*/