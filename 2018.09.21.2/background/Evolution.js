class stores {
    constructor() {

    }
}

var store = new Dexie('evo');
store.version(5).stores({ user: 'unique', GB2260: 'code' });

/*store.tables.forEach((table) => {
    console.log(table);

})
*/

class ApiFunctions {
    constructor() {
        //store
        this.store = store;
    }
}







class Evolution {
    constructor() {
        //super();
        /*
        this.clear();
        this.download();
        */
        //Object.entries(localStorage).forEach(this.decoder)
    }

    /* set _store(_store) {
         _store.version(6).stores({ user: 'unique' });
         _store.store.tables.forEach(function(table, index) {


             apiFunctions.store[table.name] = {
                 del: function() {
                     return evo.store[table.name].where("unique").equals(this.params).delete().then(() => {
                         console.log("Database successfully deleted");
                     })
                 },
                 put: function() {
                     //console.log(this);
                     //USER[this.params.unique] = this.params;
                     //console.log(this.params);
                     //console.log(table.name, this.params);            
                     return evo.store[table.name].put(this.params).then(() => {
                         //console.log('put', Date.now());
                         return this.params
                     })
                 },
                 get: function() {
                     return evo.store[table.name].get(this.params).then((res) => { return res })
                 }
             }

         });


         this.store = _store;
         //user: 'sequel',
     }

     get _store() {
         return this.store;
     }
     */


    onMessage(request, sender, sendResponse) {

    }

    onMessageExternal(request, sender, sendResponse) {
        console.log("command:", request.command);

        try {
            var promise = eval(request.command)
                .apply(request, sender, sendResponse)
                .then(sendResponse);

            /*
             .bind(request);
             promise(sender, sendResponse).then(sendResponse);
             */

        } catch (ex) {
            //console.error(request);
        }
        return true;
    }

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




//this.entries()
//console.log(Object.entries(localStorage));
//var values = sheet.getDataRange().getValues();
//var values = sheet.getRange(1,1,10,1).getValues();
//getRange(row, column, numRows, numColumns)


//chrome_settings.forEach(createTabs)


var apiFunctions = new ApiFunctions()

console.log(apiFunctions);

var c = apiFunctions.store.user.get("JIABO1006-26").then((user) => {
    console.log(user);
})
console.log(c);


var _command = "apiFunctions.store.user.get"

var promise = eval(_command).call(store.user, { unique: "JIABO1006-26" }).then((user) => {
    console.log(user);
})
//.call({ unique: "JIABO1006-26" })

console.log(promise);

/*
.bind(request);
promise(sender, sendResponse).then(sendResponse);
*/


const evo = new Evolution();
console.log(evo);


/*

console.log(localStorage);
console.log(angular);
console.log(Evolution);
*/







chrome.runtime.onMessageExternal.addListener(evo.onMessageExternal)