Array.prototype.toObj = function() {
    var obj = {};
    this.forEach(([name, value]) => { obj[trim(name)] = trim(value); });
    return obj;
}



function isJson(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }

function openOptionsPage() { chrome.runtime.openOptionsPage() };

function createTabs(url) { chrome.tabs.create({ url: url }) }

function trim(value) { return value.toString().trim(); }

function s(array) { console.log(array); }


chrome.storage.sync.get(null, function(items) {
    //console.log(items);
})

//openOptionsPage();
//createTabs('../code/a.html')
//createTabs('/app/app.html')


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


function decoder(value) {
    try {
        return JSON.parse(decodeURI(atob(value)))
    } catch (ex) {
        return decodeURI(atob(value))
    }

}

//console.log(decoder(localStorage.sms).toObj());

/*
console.log(evo.store.user);
evo.store.users.put({ account: 'F61539', channel: "26" })
*/

var resp = {
    text: function(r) {
        return r.text()
    },
    json: function(r) {
        return r.json()
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


//download();






//console.log(chrome.identity.getRedirectURL());
//$.ajax({ url: "https://glimkfbjoipaecfannadijhmifilnooh.chromiumapp.org/views/part.html" })



/*
fetch('/d/gb2260').then(res => res.text()).then((res) => {
    console.log(res);
    localStorage['gb2260'] = res;
})
*/

/*fetch('https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?commands=GMB')
    .then(_toJson).then(_toLocalStorage)*/




/*
$.ajax({
    url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
    data: { commands: "GMB" }
}).then(_toLocalStorage).fail();

*/
/*
$.ajax({
    url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
    data: { commands: "GMA" }
}).then(_toLocalStorage).fail();




var url = btoa("https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec")
console.log(url);
console.log(atob(url));
*/


/*var readFile = function() {
    return new Promise(function(resolve, reject) {
        fetch('/d/gb2260').then(res => res.text()).then(resolve)
    });
};

function _text(res) {
    //console.log(res);
    return res.text();
}
function _view(res) {
    console.log(res);
    return res;
}

function _cb(res) {
    return Promise.resolve(res)
    //console.log(res);
    return res;
}

function getGB2260() {
    return promise('type', target)
}


var promise1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('foo');
    }, 300);
});*/