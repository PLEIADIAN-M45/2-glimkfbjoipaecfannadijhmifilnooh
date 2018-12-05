var host = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" };

var apiFunctions = {};

apiFunctions.localStorage = function() { return Promise.resolve(window.localStorage); }

apiFunctions.region = async function() {
    console.log(this);
    // evo.store[table.name].get(this.params)
    //evo.store.user.get(this.unique).then((s) => { console.log(s); })
    var r = await apiFunctions[this.attr].call(this);
    //search.region.compare(r.region);
    //search.region.compare.call(r)
    //console.log(r);


    //var c = search.region.compare(r.region)

    r.alarm = search.region.compare(r.region);

    //r.region.

    console.log(r);


    return Promise.resolve(r);


    return r;
}




var { author, locate, mobile, banker, region, danger, notice } = localStorage;
var search = { author, locate, mobile, banker, region, danger, notice };
for (var key in search) { search[key] = decoder(search[key]) };

search.author.compare = function() {
    console.log(this);
}



search.region.compare = function(res) {

    var value = Object.values(res).toString()

    //console.log(value);

    return this.find((x) => {
        //console.log(value.includes(x));
        return value.includes(x);
    })
}



console.log(search);


/*
[author, locate, mobile, banker, region, danger, notice].map((x) => {
    console.log(decoder(x));
    return decoder(x)
})
*/



//var Sensitive = function() {};


/*attr
channel
value*/

//console.log(apiFunctions);


/*
https://www.citypopulation.de/China_c.html
各省的行政区划
对于以下省市地、县、市、区人口（人口普查 2000、2010，(*) 同 常住人口2016）：
*/



/*
var action = this.sendData.action || this.sendData.type;
switch (action) {
    case "StopMember":
        var params = { account: "JIABO1006", channel: "26" }
        if(this.respData == 1) { return };
        var pastData = await apiFunctions.store.user.get.call({ params });
        var postData = { f_ishow: 2, f_depositStatus: 0 };
        console.log(var1, var2);
        console.log(this.respData);
        break;
    default:
        break;
}*/