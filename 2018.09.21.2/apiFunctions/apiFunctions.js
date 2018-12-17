var host = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" };

var apiFunctions = {};

apiFunctions.localStorage = function() { return Promise.resolve(window.localStorage); }

apiFunctions.region = async function() {


    console.log(this);



    var r = await apiFunctions[this.attr].call(this);

    //r.alarm = search.region.compare(r.region);
    console.log(r);



    return Promise.resolve(r);
}




var { author, locate, mobile, banker, region, danger, notice } = localStorage;
var search = { author, locate, mobile, banker, region, danger, notice };
for (var key in search) { search[key] = decoder(search[key]) };


console.log(search);



//search.region.push(['河南'])


search.author.compare = function() {
    console.log(this);
}

search.region.compare = function(res) {
    var value = Object.values(res).toString();
    //console.log(value);
    return this.find((x) => {
        //console.log(value.includes(x));
        return value.includes(x);
    })
}




//console.log(search);





