function jQuery110206757195374168046_1537351738272(d) {
    console.log(d);
}

if (location.protocol == 'chrome-extension:') {


    Api.prototype.mobile = function(request) {


        function baidu() {
            return {
                //type: 'html',
                dataType: 'text',
                url: 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php',
                header: angular.fromJson(localStorage.baidu),

                data: {
                    query: request.header,
                    co: null,
                    resource_id: '6004',
                    t: '1537351750911',
                    ie: 'utf8',
                    oe: 'gbk',
                    cb: 'op_aladdin_callback',
                    format: 'json',
                    tn: 'baidu',
                    cb: 'jQuery110206757195374168046_1537351738272',
                    _: new Date().getTime()
                },
                callback: function(res) {
                    eval(res)

                    /*var d = eval(res);
                    return {
                        province: d.province,
                        catName: d.catName,
                        meta: d.catName
                    }
                    */
                }
            }
        }

        function taobao() {
            return {
                type: 'html',
                url: 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm',
                data: { tel: request.header },
                callback: function(res) {
                    var d = eval(res);
                    return {
                        province: d.province,
                        catName: d.catName,
                        meta: d.catName
                    }
                }
            }
        }

        function shouji() {
            return {
                url: 'https://cx.shouji.360.cn/phonearea.php',
                data: { number: request.header },
                callback: function(res) {
                    var d = res.data;
                    return {
                        province: d.province,
                        city: d.city,
                        meta: d.sp
                    }
                }
            }
        }

        function iteblog() {
            return {
                url: 'https://www.iteblog.com/api/mobile.php',
                data: { mobile: request.header },
                callback: function(res) {
                    var d = res;
                    return {
                        province: d.province,
                        city: d.city,
                        meta: d.operator
                    }
                }
            }
        }

        function baifubao() {
            return {
                url: 'https://www.baifubao.com/callback?cmd=1059',
                data: { phone: request.header },
                callback: function(res) {
                    console.log(res);
                }
            }
        }
        return [baidu, taobao, shouji, iteblog];
    }

}