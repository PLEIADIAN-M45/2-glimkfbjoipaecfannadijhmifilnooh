function isJson(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }

function openOptionsPage() { chrome.runtime.openOptionsPage() };

function createTabs(url) { chrome.tabs.create({ url: url }) }

function trim(value) { return value.toString().trim(); }


openOptionsPage();


//createTabs('../code/a.html')
//createTabs('/app/app.html')



var store = new Dexie('evo');
store.version(4).stores({
    user: '[account+channel]',
    xmlhttp: 'lastPath',
    author: '++id',
    banker: '++id',
    mobile: '++id',
    locate: '++id',
    danger: '++id',
    notice: '++id',
    region: '++id',
    GB2260: 'code, area'
});



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
        var str = JSON.stringify(value, true);
        console.log(str);
        return btoa(encodeURI(JSON.stringify(value)))
    },
    decoder: function(value) {
        return decodeURI(atob(value))
    }
};



/*
var readFile = function() {
    return new Promise(function(resolve, reject) {});
};

var resp = {
    text: function(r) {
        return r.text()
    },
    json: function(r) {
        return r.json()
    }
}

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

var promise1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('foo');
    }, 300);
});
*/