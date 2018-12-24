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
        return btoa(encodeURI(JSON.stringify(value)));
    },
    decoder: function(value) {
        try {
            return JSON.parse(decodeURI(atob(value)));
        } catch (ex) {
            return decodeURI(atob(value));
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


//download();



function parseUrl(str) {
    var url = new URL(str);
    console.log(url);
    var account = url.searchParams.get('account');
    console.log(account);
}








//createTabs('chrome://flags/#enable-devtools-experiments');




//console.log(decoder(localStorage.sms).toObj());


//openOptionsPage();
//createTabs('../code/a.html')
//createTabs('/app/app.html')




function xxx() {
    fetch("http://client.motosms.com/smsc/smssend", {
        "credentials": "include",
        "headers": {
            "accept": "text/html, */*; q=0.01",
            "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "sender=&phones=8617878978978&smscontent=%E6%AC%A2%E8%BF%8E%E6%82%A8%E7%9A%84%E5%8A%A0%E5%85%A5%0A%E6%9C%AC%E7%BD%91%E4%B8%BB%E7%BD%91%E5%9D%80%EF%BC%9AHTTPS%3A%2F%2FJX11.NET%0A%E6%84%9F%E8%B0%A2%E6%82%A8&taskType=1&taskTime=&batch=1&splittime=0&packid=",
        "method": "POST",
        "mode": "cors"
    }).then((d) => {
        console.log(d);
        return d.text()
    }).then((r) => {
        console.log(r);
    })
}