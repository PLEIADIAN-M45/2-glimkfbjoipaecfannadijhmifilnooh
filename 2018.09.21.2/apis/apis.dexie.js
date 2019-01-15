// 2
var dexie = new Dexie('evo');
dexie.version(5).stores({ user: 'unique', });


apis.dexie = dexie;
apis.user = dexie.user;



var global = Object.create({});

if (localStorage.sms) {

    function global_decode(commands) {
        global[commands] = angular.fromJson(localStorage[commands]);
        if (commands == "gb2260") {
            global.gb2260 = new Map(global.gb2260)
        }
        if (commands == "sms") {
            global.sms = new Map(global.sms)

        }
    }

    var c = [
        "gb2260",
        "author",
        "locate",
        "mobile",
        "banker",
        "region",
        "danger",
        "notice",
        "sms"
    ].map(global_decode);

    global_decode();
} else {
    function fetchData(commands) {
        fetch("https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec?commands=" + commands)
            .then(function(response) { return response.json(); })
            .then(function(values) {
                global[commands] = values;
                localStorage[commands] = angular.toJson(values);
                console.log(global);
                if (commands == "gb2260") {
                    global.gb2260 = new Map(global.gb2260)
                }
                if (commands == "sms") {
                    global.sms = new Map(global.sms)

                }
            });
    }

    var c = [
        "gb2260",
        "author",
        "locate",
        "mobile",
        "banker",
        "region",
        "danger",
        "notice",
        "sms"
    ].map(fetchData);
}



apis.global = global;
console.log(global);







/*
dexie.version(2).stores({
    author: 'author',
    locate: 'locate',
    mobile: 'mobile',
    banker: 'banker',
    region: 'region',
    danger: 'danger',
    notice: 'notice',
    sms: 'sms'
});*/

/*
var c = [
    GB2260: 'code'
    "author",
    "locate",
    "mobile",
    "banker",
    "region",
    "danger",
    "notice",
    "sms"
].map((n, i) => {
    console.log(n, i + 3);
    dexie.version(i + 3)
        .stores({
            [n]: n
        })
})
dexie.mobile.put({
    mobile: "09771100222"
})
*/








// apis.dexie.user.put({
//     unique: "asF6dw1539-62"
// })



/*
var c = [
    "author",
    "locate",
    "mobile",
    "banker",
    "region",
    "danger",
    "notice",
    "sms"
].map(decode);

console.log(apis.global);*/

/*
var r = apis.global.author.find(function(a) {
    //console.log(a);
    return "王风民" == a[0]
})

console.log(r);
*/
/*
       apis.global[commands].map((arr) => {
           if(arr.length > 1) {} else {
               dexie[commands].put({
                   [commands]: arr[0] })
           }
       })*/

/*
setTimeout(function() {
}, 5000)



/*
var db = new Dexie("FriendsAndPetsDatabase");
db.version(1).stores({
    friends: "++id,name,age,sex"
});
db.version(2).stores({
    friends: "++id,name,birthdate,sex"
}).upgrade(trans => {
    var YEAR = 365 * 24 * 60 * 60 * 1000;
    return trans.friends.toCollection().modify(friend => {
        friend.birthdate = new Date(Date.now() - (friend.age * YEAR));
        delete friend.age;
    });
});
*/