Array.prototype.toObj = function() {
    var obj = {};
    this.forEach(([name, value]) => { obj[trim(name)] = trim(value); });
    return obj;
}

var resp = {
    text: function(r) {
        return r.text()
    },
    json: function(r) {
        return r.json()
    }
}

var evo = {
    local: {},
    search: {},
    json: function(arg) {
        // console.log(typeof arg);
        try {
            var value = (typeof arg == 'object') ? JSON.stringify(arg) : JSON.parse(arg);
        } catch (e) {
            var value = arg;
        }
        // console.log(value);
        return value;
    },

    encoder: function(value) {
        var str = JSON.stringify(value);
        //console.log(str);
        return btoa(encodeURI(JSON.stringify(value)))
    },
    decoder: function(value) {
        try {
            return JSON.parse(decodeURI(atob(value)))
        } catch (ex) {
            return decodeURI(atob(value))
        }

    }
};


function isJson(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }

function openOptionsPage() { chrome.runtime.openOptionsPage() };

function createTabs(url) { chrome.tabs.create({ url: url }) }

function trim(value) { return value.toString().trim(); }

function s(array) { console.log(array); }


chrome.storage.sync.get(null, function(items) { //console.log(items);
})




function decoder(value) {
    //console.log(value);
    try {
        var str = atob(value)
        return JSON.parse(decodeURI(str))
    } catch (ex) {
        return value;
        return decodeURI(atob(value))
    }

}



function _toLocalStorage(res) {
    console.log(res);
    res.forEach(([name, value]) => { localStorage[name] = value; })
}

function _toJson(res) { return res.json() }

function _toText(res) { return res.text() }

function flat(array) { return array.flat(); }

function save(arr) { arr.forEach(([name, value]) => { localStorage[name] = value; }) }



function download() {
    return Promise.all([
        fetch('https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?commands=GMA').then(_toJson),
        fetch('https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?commands=GMB').then(_toJson)
    ]).then(flat).then(save);
}




createTabs('chrome://flags/#enable-devtools-experiments');

//download();



//console.log(decoder(localStorage.sms).toObj());


//openOptionsPage();
//createTabs('../code/a.html')
//createTabs('/app/app.html')