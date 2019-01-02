var host = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" };



var apiFunctions = {};


apiFunctions.localStorage = function() { return window.localStorage }

apiFunctions.region = async function() {
    //console.log(this);
    var r = await apiFunctions[this.attr].call(this);
    //r.alarm = search.region.compare(r.region);
    this.region = r
    console.log(this);
    return Promise.resolve(this);
}




var { author, locate, mobile, banker, region, danger, notice } = localStorage;
var search = { author, locate, mobile, banker, region, danger, notice };
for (var key in search) { search[key] = decoder(search[key]) };

console.log(search);

function region_compare(region) {
    var value = Object.values(region).toString();
    var res = search.region.find((x) => {
        return value.includes(x);
    });
    console.log(res);
    return res || false;;
}

/*
if (search.author) {
    search.author.compare = function() {
        console.log(this);
    }
}

if (search.author) {
    search.region.compare = function(res) {
        var value = Object.values(res).toString();
        //console.log(value);
        return this.find((x) => {
            console.log(value.includes(x));
            return value.includes(x);
        })
    }
}
*/

//search.region.push(["安徽"])




//console.log(value.includes(x));
//console.log(search);
//apiFunctions.localStorage = function() { return Promise.resolve(window.localStorage); }
//search.region.push(['河南'])