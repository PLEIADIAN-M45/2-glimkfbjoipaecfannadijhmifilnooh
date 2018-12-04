//var regex = {};
var country = ["(阿尔巴尼亚", "刚果", "阿尔及利亚", "丹麦", "安哥拉", "多明尼加", "安圭拉", "多米尼克", "阿根廷", "厄瓜多尔", "亚美尼亚", "埃及", "阿路巴", "萨尔瓦多", "澳大利亚", "厄利垂亚", "奥地利", "爱沙尼亚", "亚塞拜然", "衣索匹亚", "巴哈马", "斐济", "巴林", "芬兰", "孟加拉", "法属玻里尼西亚", "巴贝多", "加彭", "白俄罗斯", "乔治亚", "比利时", "德国", "贝里斯", "迦纳", "贝南", "直布罗陀", "百慕达", "英国", "不丹", "希腊", "玻利维亚", "格瑞那达", "波希尼亚及赫塞哥维那", "瓜地马拉", "波札那", "几内亚", "巴西", "盖亚那", "汶莱", "海地", "保加利亚", "宏都拉斯", "有吉纳法索", "香港", "蒲隆地", "匈牙利", "柬埔寨", "冰岛", "喀麦隆", "印度", "加拿大", "印尼", "维德角岛", "依朗", "开曼群岛", "伊拉克", "中非共和国", "爱尔兰", "查德", "以色列", "智利", "义大利", "中国大陆", "买加", "哥伦比亚", "日本", "刚果", "约旦", "科克群岛", "肯亚", "哥斯大黎加", "韩国", "象牙海岸", "科威特", "克罗埃西亚", "寮国", "塞浦路斯", "拉脱维亚", "捷克", "赖索托", "卢森堡", "圣露西亚", "澳门", "圣文森及格瑞那丁", "马其顿", "圣多美及普林西比", "马达加斯加", "沙乌地阿拉伯", "马拉威", "塞内加尔", "马来西亚", "塞席尔", "马尔地夫", "狮子山", "马利", "新加坡", "马尔他", "斯洛伐克", "模里西斯", "斯洛维尼亚", "茅利塔尼亚", "索罗门群岛", "墨西哥", "索马利亚", "摩尔多瓦", "南非", "蒙古", "西班牙", "摩洛哥", "斯里兰卡", "缅甸", "苏丹", "纳米比亚", "苏利南", "诺鲁", "史瓦济兰", "尼泊尔", "瑞典", "荷兰", "瑞士", "新喀里多尼亚", "叙利亚", "纽西兰", "坦尚尼亚", "尼日", "泰国", "奈及利亚", "多哥", "挪威", "千里达及托贝哥", "阿曼", "突尼西亚", "巴基斯坦", "耳其", "巴拿马", "乌干达", "巴布亚纽几内亚", "乌克兰", "巴拉圭", "阿拉伯联合大公国", "秘鲁", "美国", "菲律宾", "乌拉圭", "波兰", "委内瑞拉", "葡萄牙", "越南", "卡达", "西萨摩亚", "罗马尼亚", "叶门", "俄罗斯", "南斯拉夫", "卢安达", "尚比亚", "圣克里斯多福及尼维斯", "辛巴威)"];

var regex = {
    prov: /(北京|天津|重庆|上海|河北|山西|辽宁|吉林|江西|江苏|浙江|安徽|福建|山东|河南|湖北|湖南|广东|海南|四川|贵州|云南|陕西|甘肃|青海|黑龙江|西藏自治区|内蒙古自治区|广西壮族自治区|宁夏回族自治区|新疆维吾尔自治区)/g,
    city: /(石家庄|唐山|秦皇岛|邯郸|邢台|保定|张家口|承德|沧州|廊坊|衡水|太原|大同|阳泉|长治|晋城|朔州|晋中|运城|忻州|临汾|吕梁|呼和浩特|包头|乌海|赤峰|通辽|鄂尔多斯|呼伦贝尔|巴彦淖尔|乌兰察布|兴安盟|锡林郭勒盟|阿拉善盟|沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛|长春|吉林|四平|辽源|通化|白山|松原|白城|延边朝鲜族自治州|哈尔滨|齐齐哈尔|鸡西|鹤岗|双鸭山|大庆|伊春|佳木斯|七台河|牡丹江|黑河|绥化|大兴安岭地区|南京|无锡|徐州|常州|苏州|南通|连云港|淮安|盐城|扬州|镇江|泰州|宿迁|杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水|合肥|芜湖|蚌埠|淮南|马鞍山|淮北|铜陵|安庆|黄山|滁州|阜阳|宿州|六安|亳州|池州|宣城|福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德|南昌|景德镇|萍乡|九江|新余|鹰潭|赣州|吉安|宜春|抚州|上饶|济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽|郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源|武汉|黄石|十堰|宜昌|襄阳|鄂州|荆门|孝感|荆州|黄冈|咸宁|随州|恩施土家族苗族自治州|直辖县级行政区划|长沙|株洲|湘潭|衡阳|邵阳|岳阳|常德|张家界|益阳|郴州|永州|怀化|娄底|湘西土家族苗族自治州|广州|韶关|深圳|珠海|汕头|佛山|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|东莞|中山|潮州|揭阳|云浮|南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|百色|贺州|河池|来宾|崇左|海口|三亚|三沙|儋州|成都|自贡|攀枝花|泸州|德阳|绵阳|广元|遂宁|内江|乐山|南充|眉山|宜宾|广安|达州|雅安|巴中|资阳|阿坝藏族羌族自治州|甘孜藏族自治州|凉山彝族自治州|贵阳|六盘水|遵义|安顺|毕节|铜仁|黔西南布依族苗族自治州|黔东南苗族侗族自治州|黔南布依族苗族自治州|昆明|曲靖|玉溪|保山|昭通|丽江|普洱|临沧|楚雄彝族自治州|红河哈尼族彝族自治州|文山壮族苗族自治州|西双版纳傣族自治州|大理白族自治州|德宏傣族景颇族自治州|怒江傈僳族自治州|迪庆藏族自治州|拉萨|昌都|山南|日喀则|那曲地区|阿里地区|林芝|西安|铜川|宝鸡|咸阳|渭南|延安|汉中|榆林|安康|商洛|兰州|嘉峪关|金昌|白银|天水|武威|张掖|平凉|酒泉|庆阳|定西|陇南|临夏回族自治州|甘南藏族自治州|西宁|海东|海北藏族自治州|黄南藏族自治州|海南藏族自治州|果洛藏族自治州|玉树藏族自治州|海西蒙古族藏族自治州|银川|石嘴山|吴忠|固原|中卫|乌鲁木齐|克拉玛依|吐鲁番地区|哈密地区|昌吉回族自治州|博尔塔拉蒙古自治州|巴音郭楞蒙古自治州|阿克苏地区|克孜勒苏柯尔克孜自治州|喀什地区|和田地区|伊犁哈萨克自治州|塔城地区|阿勒泰地区)/g,
    country: /(阿尔巴尼亚|刚果|阿尔及利亚|丹麦|安哥拉|多明尼加|安圭拉|多米尼克|阿根廷|厄瓜多尔|亚美尼亚|埃及|阿路巴|萨尔瓦多|澳大利亚|厄利垂亚|奥地利|爱沙尼亚|亚塞拜然|衣索匹亚|巴哈马|斐济|巴林|芬兰|孟加拉|法属玻里尼西亚|巴贝多|加彭|白俄罗斯|乔治亚|比利时|德国|贝里斯|迦纳|贝南|直布罗陀|百慕达|英国|不丹|希腊|玻利维亚|格瑞那达|波希尼亚及赫塞哥维那|瓜地马拉|波札那|几内亚|巴西|盖亚那|汶莱|海地|保加利亚|宏都拉斯|有吉纳法索|香港|蒲隆地|匈牙利|柬埔寨|冰岛|喀麦隆|印度|加拿大|印尼|维德角岛|依朗|开曼群岛|伊拉克|中非共和国|爱尔兰|查德|以色列|智利|义大利|中国大陆|买加|哥伦比亚|日本|刚果|约旦|科克群岛|肯亚|哥斯大黎加|韩国|象牙海岸|科威特|克罗埃西亚|寮国|塞浦路斯|拉脱维亚|捷克|赖索托|卢森堡|圣露西亚|澳门|圣文森及格瑞那丁|马其顿|圣多美及普林西比|马达加斯加|沙乌地阿拉伯|马拉威|塞内加尔|马来西亚|塞席尔|马尔地夫|狮子山|马利|新加坡|马尔他|斯洛伐克|模里西斯|斯洛维尼亚|茅利塔尼亚|索罗门群岛|墨西哥|索马利亚|摩尔多瓦|南非|蒙古|西班牙|摩洛哥|斯里兰卡|缅甸|苏丹|纳米比亚|苏利南|诺鲁|史瓦济兰|尼泊尔|瑞典|荷兰|瑞士|新喀里多尼亚|叙利亚|纽西兰|坦尚尼亚|尼日|泰国|奈及利亚|多哥|挪威|千里达及托贝哥|阿曼|突尼西亚|巴基斯坦|耳其|巴拿马|乌干达|巴布亚纽几内亚|乌克兰|巴拉圭|阿拉伯联合大公国|秘鲁|美国|菲律宾|乌拉圭|波兰|委内瑞拉|葡萄牙|越南|卡达|西萨摩亚|罗马尼亚|叶门|俄罗斯|南斯拉夫|卢安达|尚比亚|圣克里斯多福及尼维斯|辛巴威)/g
}


apiFunctions.locate = function() {

    return $.ajax({

        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",

        dataType: "json",

        data: { "query": this.value, "co": "", "resource_id": 6006, "t": this.time, "ie": "utf8", "oe": "gbk", "format": "json", "tn": "baidu", "_": this.time }
    
    }).then((res) => {

        if (res.status == 0) {} else { return {} };

        var arr = res.data[0].location.split(' ');
        var region = { meta: arr[1] };
        var string = arr[0];

        if (string) {
            var re = new RegExp(regex.country, 'g');
            string = string.replace(re, '');
            region.country = RegExp.$1;
        }

        if (string) {
            string = string.replace(/(.+(省|自治区))/g, '');
            region.prov = RegExp.$1;
        }

        if (string) {
            string = string.replace(/(.+(市|州))/g, '');
            region.city = RegExp.$1;
        }

        if (string) {
            string = string.replace(/(.+(县|区))/g, '');
            region.area = RegExp.$1;
        }

        return { region };
    })
}






//region.verify = search.region(region) || false;
//console.log(country.join('|'));
//regex.country = country.join('|');