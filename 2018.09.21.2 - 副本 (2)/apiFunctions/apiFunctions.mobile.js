apiFunctions.mobile = function() {
    return $.ajax({
        dataType: "json",
        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
        data: { "query": this.value, "co": "", "resource_id": 6004, "t": this.time, "ie": "utf8", "oe": "gbk", "format": "json", "tn": "baidu", "_": this.time, }
    }).then((res) => {
        if(res.status == 0) {} else { return {} }
        var d = res.data[0];
        var region = { city: d.city, prov: d.prov, meta: d.type || "baidu" }
        //region.verify = search.region(region) || false;
        return { region };
    })
}