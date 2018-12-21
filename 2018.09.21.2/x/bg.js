
/*
console.log(evo.store.user);
evo.store.users.put({ account: 'F61539', channel: "26" })
*/


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