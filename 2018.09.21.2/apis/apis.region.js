apis.region = function(params) {
    return apis.region[params.caller].call(params)
        .then((region) => {
            region.alarm = apis.blacklist.call(params)

            region.alert = apis.region.check(region)
            return { region, active: false }
        })
};


apis.blacklist = function() {

    var $global = global[this.caller] || [];
    //console.log($global);
    switch (this.caller) {
        case "author":
            return $global.find((arr) => { return this.value == arr[0] }) || false;
        case "mobile":
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
        case "idcard":
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
        case "banker":
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
        case "locate":
            return $global.find(([val]) => { return this.value.startsWith(val) }) || false;
    }

    return Promise.resolve();
}





apis.region.check = function(region) {
    if(region) {
        return global.region.find(([elem]) => {
            return Object.values(region).toString().includes(elem);
        }) || false;
        //if(this.age < 18) { this.alert = true }
    } else {
        return true;
    }
}

apis.region.locate = function() {
    return $.ajax({
        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
        dataType: "json",
        data: {
            "query": this.value,
            "co": "",
            "resource_id": 6006,
            "t": Date.now(),
            "ie": "utf8",
            "oe": "gbk",
            "format": "json",
            "tn": "baidu",
            "_": Date.now()
        }
    }).then((res) => {
        if(res.status == 0) {
            var str = res.data[0].location;
            if(str) {
                str.replace(/(天津市|北京市|重庆市|上海市|.+省|.+自治区)?(.+自治州|.+区|.+市|.+县|.+州|.+府)?(.+区|.+市|.+县|.+州|.+府)?(\s*.*)/,
                    (match, prov, city, area, meta, offset, string) => {
                        if(!prov && !city && !area) {
                            this.region = { prov: meta }
                        } else {
                            this.region = { prov, city, area, meta }
                        }
                    });
            }
        }
        return this.region;
    })
}

apis.region.author = function() { return Promise.resolve({}); }

apis.region.banker = function() { return Promise.resolve(this.region); }

apis.region.idcard = function() {
    var IDParser = function(value) { return value.replace(/(\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3})(\w{1})/, ['$10000', '$1$200', '$1$2$3', '$7', '$4-$5-$6']).split(",").map((x) => { return (isNaN(x)) ? x : Number(x) }) }
    var [$1, $2, $3, $4, $5] = IDParser(this.value);
    var prov = global.gb2260.get($1),
        city = global.gb2260.get($2),
        area = global.gb2260.get($3),
        sex = ($4 % 2 === 1) ? "男" : "女",
        age = moment().diff($5, "years"),
        bday = moment($5).locale('zh-tw').format('LL'),
        meta = [bday, sex, age + '岁'].join('/');
    return Promise.resolve({ prov, city, area, sex, age, bday, meta });
}


apis.region.mobile = function() {
    return $.ajax({
        dataType: "json",
        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
        data: {
            "query": this.value,
            "co": "",
            "resource_id": 6004,
            "t": Date.now(),
            "ie": "utf8",
            "oe": "gbk",
            "format": "json",
            "tn": "baidu",
            "_": Date.now(),
        }
    }).then((res) => {
        if(res.status == 0) {
            var d = res.data[0];
            this.region = {
                city: d.city,
                prov: d.prov,
                meta: d.type
            };
        }
        return this.region;
    })
}














/*
return true;

if(this) {
    this.alert = global.region.find(([elem]) => {
        return Object.values(this).toString().includes(elem);
    }) || false;
    if(this.age < 18) { this.alert = true }
} else {
    this.alert = true;
}
//res.alarm = this.compare();
return this;*/