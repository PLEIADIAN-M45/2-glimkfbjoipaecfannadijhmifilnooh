class Evolution {
    constructor() {

    	/*
        this.clear();
        this.download();
        */

        Object.entries(localStorage).forEach(this.decoder)



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



const evo = new Evolution();


/*

console.log(localStorage);
console.log(angular);
console.log(Evolution);
*/

console.log(evo);