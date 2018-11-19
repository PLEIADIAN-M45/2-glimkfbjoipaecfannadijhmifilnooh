apiFunctions.locate = function() {
    return $.ajax({
        dataType: "json",
        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
        data: { "query": this.value, "co": "", "resource_id": 6006, "t": this.time, "ie": "utf8", "oe": "gbk", "format": "json", "tn": "baidu", "_": this.time, }
    }).then((res) => {
        //console.log(res);
        if(res.status == 0) {} else { return {} }
        var arr = res.data[0].location.split(' ');
        var region = { meta: arr[1] };
        var string = arr[0];
        if(string) {
            string = string.replace(/(.+(省|自治区))/g, '');
            region.prov = RegExp.$1;
        }

        if(string) {
            string = string.replace(/(.+(市|州))/g, '');
            region.city = RegExp.$1;
        }

        if(string) {
            string = string.replace(/(.+(县|区))/g, '');
            region.area = RegExp.$1;
        }
        //egion.verify = search.region(region) || false;
        return { region };
    })
}