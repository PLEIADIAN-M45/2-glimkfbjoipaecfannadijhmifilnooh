var request = window.indexedDB.open('evo', '1.0');
request.onerror = function(event) { //console.log('数据库打开报错');
};


var db;
request.onsuccess = function(event) {
    db = request.result;
    createObjectStore(db);
    //console.log('数据库打开成功');
};

function createObjectStore(db) {
    var objectStore;
    if (!db.objectStoreNames.contains('MemberBonus')) {
        var keyPath = { "wa111": "f_id", "ku711": "BonusNumber" } [localStorage.host];
        objectStore = db.createObjectStore('MemberBonus', { keyPath: keyPath });
        console.log('createObjectStore 成功');
    }
}

request.onupgradeneeded = function(event) {
    // console.log('数据库升級成功');
    db = event.target.result;
    createObjectStore(db);
}

//数据库升級成功
//数据写入成功
//数据写入失败
//事务失败

function add(table, data) {
    var request = db.transaction([table], 'readwrite').objectStore(table).put(data);
    request.onsuccess = function(event) { console.log('数据写入成功'); };
    request.onerror = function(event) { console.log('数据写入失败'); }
}


function getAll(table, key) {
    return new Promise(function(resolve, reject) {
        var transaction = db.transaction([table]);
        var objectStore = transaction.objectStore(table);
        var request = objectStore.getAll();
        request.onerror = function(event) { reject('事务失败') };
        request.onsuccess = function(event) { resolve(request.result) };
    })
}

function read(table, key) {
    return new Promise(function(resolve, reject) {
        var transaction = db.transaction([table]);
        var objectStore = transaction.objectStore(table);
        var request = objectStore.get(key);
        request.onerror = function(event) { reject('事务失败') };
        request.onsuccess = function(event) { resolve(request.result) };
    })
}


var $BONUS = function(argument) {
    switch (argument.constructor.name) {
        case "Number":
            return read('MemberBonus', argument)
            break;
        case "Array":
            console.log(argument);
            return argument.forEach((x) => {
                $BONUS[x.f_id] = x;
                add('MemberBonus', x)
            })
            break;
        case "Object":
            return add('MemberBonus', x)
            break;
    }
}

$BONUS.init = function init() { if (db) { getAll('MemberBonus').then((x) => { x.forEach((x) => { $BONUS[x.f_id] = x; }) }) } else { setTimeout(init, 100) } }

/*
if (PATH == "DepositBonus.aspx") {
    setTimeout(function() {
        console.log('---------------');
        $.get('http://host26.wa111.net/LoadData/NextDayVolume/DelDiceWinRecords.ashx?pas=3&id=F61539&type=15&money=500&_=1538646244510', function(d) {
            console.log(d);
        })
    }, 2000);
}
*/