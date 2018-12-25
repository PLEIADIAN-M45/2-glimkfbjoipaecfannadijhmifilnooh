if (location.protocol == "chrome-extension:") {

    Api.prototype.locate = function(request) {
        function pconline() {
            return {
                dataType: 'html',
                url: 'http://whois.pconline.com.cn/ipJson.jsp',
                data: { ip: request.value },
                callback: function(d) {
                    window.IPCallBack = function(d) {
                        try {
                            if (d.proCode == "999999") {
                                return {
                                    province: d.pro,
                                    city: d.city,
                                    country: d.addr
                                }
                            } else {
                                return {
                                    province: d.pro,
                                    city: d.city,
                                    region: d.region
                                }
                            }
                        } catch (ex) {
                            return false
                        }
                    }
                    return eval(d);
                }
            }
        }

        function baidu() {
            return {
                url: 'https://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974',
                data: { ip: request.value },
                callback: function(d) {
                    console.log(d);
                    try {
                        return {
                            province: d.content.address_detail.province,
                            city: d.content.address_detail.city,
                            country: d.address.split('|')[0].replace('CN', '中国'),
                        }
                    } catch (ex) {
                        return false
                    }
                }
            }
        }

        function ipapi() {
            return {
                url: 'http://ip-api.com/json/' + request.value + '?fields=520191&lang=zh-CN',
                callback: function(d) {
                    try {
                        return {
                            province: d.regionName,
                            city: d.city,
                            country: d.country
                        }
                    } catch (ex) {
                        return false
                    }
                }
            }
        }

        function taobao() {
            return {
                url: 'http://ip.taobao.com/service/getIpInfo.php',
                data: { ip: request.value },
                callback: function(res) {
                    try {
                        var d = res.data;
                        Object.entries(d).forEach(function([key, value]) {
                            console.log(value);
                            value = value.replace('XX', '')
                        });
                        return {
                            province: d.region.replace('XX', ''),
                            city: d.city.replace('XX', ''),
                            country: d.country.replace('XX', '')
                        }
                    } catch (ex) {
                        return false
                    }

                }
            }
        }

        function baidu2() {
            return {
                dataType: 'text',
                url: 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php',
                header: angular.fromJson(localStorage.baidu),
                data: {
                    query: request.value,
                    co: null,
                    resource_id: '6006',
                    t: new Date().getTime(),
                    ie: 'utf8',
                    oe: 'gbk',
                    cb: 'op_aladdin_callback',
                    format: 'json',
                    tn: 'baidu',
                    cb: 'baidu_locate_callback',
                    _: new Date().getTime()
                },
                callback: function(res) {
                    window.baidu_locate_callback = function(d) { return d; }
                    var s = eval(res);
                    var d = s.data[0];
                    console.log(d);
                    return {
                        province: d.location,
                        city: null
                    }
                }
            }
        }


        //return [baidu2];
        return [pconline, baidu, ipapi, taobao];
    }
}