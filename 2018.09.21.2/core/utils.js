/*define(['require', 'moment', 'dexie'], function(require, moment, Dexie) {;
    'use strict';
    class Evo {
        constructor() {
            this.version = '2.0';
        }
        encoder(value) { try { return btoa(encodeURI(JSON.stringify(value))) } catch (ex) { return value } }
        decoder(value) { try { return JSON.parse(decodeURI(atob(value))) } catch (ex) { return decodeURI(value) } }
        cut(e) { document.execCommand("cut"); }
        copy(e) { document.execCommand("copy"); }
        paste(e) { document.execCommand("paste"); }
        trim(value) { return value.toString().trim() }
    }
});*/



class Evo {
    constructor() {
        this.version = '2.0';
    }
    encoder(value) { try { return btoa(encodeURI(JSON.stringify(value))) } catch (ex) { return value } }
    decoder(value) { try { return JSON.parse(decodeURI(atob(value))) } catch (ex) { return decodeURI(value) } }
    cut(e) { document.execCommand("cut"); }
    copy(e) { document.execCommand("copy"); }
    paste(e) { document.execCommand("paste"); }
    trim(value) { return value.toString().trim() }
}



Array.prototype.toModel = function() {
    var obj = {};
    this.forEach((elem) => {
        if (elem.name || elem.id) {
            var name = elem.name || elem.id;
            switch (elem.localName) {
                case "select":
                    /*obj[pop(name)] = Array.from(elem.children).map((x) => {return [x.value, x.label];}).toObj();*/
                    obj[pop(name)] = {};
                    obj[pop(name)].value = elem.value;
                    obj[pop(name)].text = elem.selectedOptions[0].label.trim();
                    break;
                case "input":
                    obj[pop(name)] = elem.value;
                    break;
                case "span":
                    obj[pop(name)] = elem.outerText.trim();
                    break;
            }
        }
    });
    return obj;
}

Array.prototype.toCtrls = function() {
    var obj = {};
    this.forEach((elem) => {
        if (elem.name || elem.id) {
            var name = elem.name || elem.id;
            obj[pop(name)] = elem;
        }
    })
    return obj;
}

Array.prototype.toObj = function() {
    try {
        var obj = {};
        this.forEach(([name, value]) => { if (name && value) { obj[trim(name)] = trim(value) } });
        return obj;
    } catch (ex) {}
}

Array.prototype.toPath = function() { return this.join('/'); }
Array.prototype.counts = function(elem) { return this.filter((a) => { return a == elem }).length; }
Array.prototype.has = function(elem) { return (this.find((a) => { return a == elem })) ? true : false; }
Array.prototype.separate = function() { return '(' + this.join('|') + ')'; }
Array.prototype.hyphen = function() { return this.join('-'); }
Array.prototype.serialize = function() {
    var obj = {};
    this.map(([longname, value], index) => {
        var name = longname.replace('ctl00$ContentPlaceHolder1$', '');
        Object.defineProperty(obj, name, { value, writable: true });
    });
    return obj;
}


Array.prototype.lookup = function() {
    console.log(this);
};


var regex = {
    prov: /(北京|天津|重庆|上海|河北|山西|辽宁|吉林|江西|江苏|浙江|安徽|福建|山东|河南|湖北|湖南|广东|海南|四川|贵州|云南|陕西|甘肃|青海|黑龙江|西藏自治区|内蒙古自治区|广西壮族自治区|宁夏回族自治区|新疆维吾尔自治区)/g,
    city: /(石家庄|唐山|秦皇岛|邯郸|邢台|保定|张家口|承德|沧州|廊坊|衡水|太原|大同|阳泉|长治|晋城|朔州|晋中|运城|忻州|临汾|吕梁|呼和浩特|包头|乌海|赤峰|通辽|鄂尔多斯|呼伦贝尔|巴彦淖尔|乌兰察布|兴安盟|锡林郭勒盟|阿拉善盟|沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛|长春|吉林|四平|辽源|通化|白山|松原|白城|延边朝鲜族自治州|哈尔滨|齐齐哈尔|鸡西|鹤岗|双鸭山|大庆|伊春|佳木斯|七台河|牡丹江|黑河|绥化|大兴安岭地区|南京|无锡|徐州|常州|苏州|南通|连云港|淮安|盐城|扬州|镇江|泰州|宿迁|杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水|合肥|芜湖|蚌埠|淮南|马鞍山|淮北|铜陵|安庆|黄山|滁州|阜阳|宿州|六安|亳州|池州|宣城|福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德|南昌|景德镇|萍乡|九江|新余|鹰潭|赣州|吉安|宜春|抚州|上饶|济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽|郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源|武汉|黄石|十堰|宜昌|襄阳|鄂州|荆门|孝感|荆州|黄冈|咸宁|随州|恩施土家族苗族自治州|直辖县级行政区划|长沙|株洲|湘潭|衡阳|邵阳|岳阳|常德|张家界|益阳|郴州|永州|怀化|娄底|湘西土家族苗族自治州|广州|韶关|深圳|珠海|汕头|佛山|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|东莞|中山|潮州|揭阳|云浮|南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|百色|贺州|河池|来宾|崇左|海口|三亚|三沙|儋州|成都|自贡|攀枝花|泸州|德阳|绵阳|广元|遂宁|内江|乐山|南充|眉山|宜宾|广安|达州|雅安|巴中|资阳|阿坝藏族羌族自治州|甘孜藏族自治州|凉山彝族自治州|贵阳|六盘水|遵义|安顺|毕节|铜仁|黔西南布依族苗族自治州|黔东南苗族侗族自治州|黔南布依族苗族自治州|昆明|曲靖|玉溪|保山|昭通|丽江|普洱|临沧|楚雄彝族自治州|红河哈尼族彝族自治州|文山壮族苗族自治州|西双版纳傣族自治州|大理白族自治州|德宏傣族景颇族自治州|怒江傈僳族自治州|迪庆藏族自治州|拉萨|昌都|山南|日喀则|那曲地区|阿里地区|林芝|西安|铜川|宝鸡|咸阳|渭南|延安|汉中|榆林|安康|商洛|兰州|嘉峪关|金昌|白银|天水|武威|张掖|平凉|酒泉|庆阳|定西|陇南|临夏回族自治州|甘南藏族自治州|西宁|海东|海北藏族自治州|黄南藏族自治州|海南藏族自治州|果洛藏族自治州|玉树藏族自治州|海西蒙古族藏族自治州|银川|石嘴山|吴忠|固原|中卫|乌鲁木齐|克拉玛依|吐鲁番地区|哈密地区|昌吉回族自治州|博尔塔拉蒙古自治州|巴音郭楞蒙古自治州|阿克苏地区|克孜勒苏柯尔克孜自治州|喀什地区|和田地区|伊犁哈萨克自治州|塔城地区|阿勒泰地区)/g
}



function encoder(value) { try { return btoa(encodeURI(JSON.stringify(value))) } catch (ex) { return value } }

function decoder(value) { try { return JSON.parse(decodeURI(atob(value))) } catch (ex) { return decodeURI(value) } }

function cut(e) { document.execCommand("cut"); }

function copy(e) { document.execCommand("copy"); }

function paste(e) { document.execCommand("paste"); }

function trim(value) { return value.toString().trim() }


document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', e.target.attributes["data-content"].value);
    e.preventDefault();
});


function $serializeObject(selector) {
    var obj = {};
    $(selector).map(function() {
        var _name_ = this.name || this.id;
        var name = _name_.split('$').pop().replace(/\d+_?/g, '');
        switch (this.localName) {
            case 'span':
                var value = this.textContent;
                break;
            case 'select':
                if (name == "ddlCity") {
                    var value = this.selectedOptions[0].label
                } else {
                    var value = this.value;
                }
                break;
            default:
                var value = this.value;
        }
        if (obj[name] == undefined) {
            obj[name] = value;
        } else {
            if (!obj[name].push) { obj[name] = [obj[name]]; }
            obj[name].push(value);
        }
    })
    return obj;
}

function $serializeQueryString2(querystring) {
    var search = location.search.substring(1);
    JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

function toText(resp) { return resp.text() }

function toJson(obj) { return JSON.stringify(obj); }

function pop(name) {
    if (name.startsWith("ctl00")) {
        if (name.includes("$")) {
            return name.split("$").pop().trim();
        } else {
            return name.split("_").pop().trim();
        }
    } else { return name }
}


function _serialize({ href, url, postData }) {
    var obj = {};
    if (href) { if (href.includes('?')) { decodeURIComponent(href).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    if (url) { if (url.includes('?')) { decodeURIComponent(url).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    if (postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
    return obj;
}


function _route() {
    var obj = {
        "26": {
            cookie: "/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
            device: "/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
        },
        wa111: {
            cookie: "http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=#1&member=#2",
            device: "http://161.202.9.231:8876/sameBrowserList.aspx?iType=3&accounts=#2&siteNumber=#1",
        },
        ku711: {
            cookie: "/member/MemberInfoManage/MemberLoginLog?method=CookieID&accounts=#2",
            device: "/member/MemberInfoManage/MemberLoginLog?method=DeviceNo&accounts=#2"
        }
    } [this.host];
    for (var x in obj) { obj[x] = obj[x].replace('#1', this.channel).replace('#2', this.account); }
    return obj;
}

function _params() {
    var url = new URL(location.href);
    return Array.from(url.searchParams.entries()).toObj();
}

var createTab = function(_url) {
    console.log(_url);
    window.open(_url, "_blank");
}

var setPermit = function() {
    switch ($scope.host) {
        case "wa111":
            $scope.ctrl.deposit.value = 1;
            $scope.ctrl.btnSaveInfo.click();
            break;
        case "ku711":
            $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
            $scope.ctrl.DepositChanged();
            $scope.ctrl.UpdateMemberRiskInfoAccountingBackend();
            break;
    }
}


var components = {
    "edit": ['edit', 'dialog'],
    "logs": ['cards']
}
var stylesheet = {
    "edit": ['edit'],
    "logs": ['logs', 'cards']
}
for (var x in components) { components[x] = components[x].map((name) => { return `${localStorage.baseUrl}/html/${name}.html`; }) }
for (var x in stylesheet) { stylesheet[x] = stylesheet[x].map((name) => { return `${localStorage.baseUrl}/css/${name}.css`; }) }


function injectAsCss(path) { $("<link>", { rel: "stylesheet", type: "text/css", href: path }).appendTo('body'); }

function injectAsHTML(path) {
    fetch(path).then(toText).then((html) => {
        var template = angular.element(html);
        $projElement.append(template);
        $compile(template)($scope);
        //$scope.template_loaded = 1;
        //console.log($scope);
        $scope.$apply();
    })
}

function invoke() {
    myApp.components.forEach(injectAsHTML)
    myApp.stylesheet.forEach(injectAsCss)
    console.log('_invoke......');
}

function _postMessage() {
    setTimeout(() => {
        console.log(document.body.scrollHeight);
        window.parent.postMessage({ scrollHeight: document.body.scrollHeight + 'px' }, '*');
    }, 1000)
}

function addScrollHeightEventListener() { window.addEventListener('message', (e) => { this.style.height = e.data.scrollHeight; }); }

function postScrollHeightMessage() {
    switch ($scope.host) {
        case "wa111":
            _postMessage();
            break;
        case "ku711":
            $scope.$watch('ctrl.model.ResultList', (nv, ov) => { if (nv) { _postMessage() } });
            break;
    }
}



function _assign() {
    Object.assign(this, ...arguments);
    if (this.$root && !this.$$phase) { this.$apply(); }
    if (this.name == "OBSApp") { loadModules.call(this.$scope, ...arguments); return this };
    if (this == window) {};
}


window.__proto__.assign = _assign;
window.localStorage.__proto__.assign = _assign;


function $Num(str) { return Number(str) }

function adjUser(user) {
    user.unique = [user.account, user.channel].join('-');
    user.status = user.status.map($Num);
    user.permit = user.permit.map($Num);
    user.author.attr = "author";
    user.locate.attr = "locate";
    user.mobile.attr = "mobile";
    user.idcard.attr = "idcard";
    user.banker.map((x) => { return Object.assign(x, { attr: "banker" }) });
    return user;
}


function putUser(user) {
    var user = $scope.user;
    var o = Object.assign({ command: 'apiFunctions.store.user.put' }, adjUser(user))
    return $scope.sendMessage(o).then(bindUser);
}

function getUser() {
    var unique = [this.account, this.channel].join('-');
    return this.sendMessage({ command: 'apiFunctions.store.user.get', unique }).then(bindUser);
}

function delUser() { return evo.sendMessage({ command: 'apiFunctions.store.user.delete', params: { account: evo.account, channel: evo.channel } }).then(() => { console.log('user deleted.'); }); }

function bindUser(user) { return user; }

function loadModules({ $scope, $rootScope, $projElement, $rootElement, $injector, $invoke, $compile }) {
    //this.router = router;
    this.assign = _assign;
    this.window = window;
    this.assign(localStorage);
    this.host = { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];
    this.params = _params(location);
    this.account = this.params.account || this.params.member || this.params.accountId || this.params.accounts;
    this.channel = localStorage.channel || this.params.siteNumber;
    this.unique = [this.account, this.channel].join("-");
    this.route = _route.call(this);
    this.origin = location.origin;
    this.pathname = location.pathname.split("?")[0].split("/").pop().replace(/(.aspx|.html)/i, '');
    this.connect = function(message) { chrome.runtime.connect(this.extensionId, { name: this.channel }) }

    this.sendMessage = function(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(this.extensionId, message, (res) => { try { resolve(res) } catch (ex) { reject(ex) } })
        })
    };

    var store = new Dexie('evo');
    store.version(4).stores({ user: 'f_accounts' });
    this.store = store;
    this.events = {};
    this.events.createTab = function(_url) {
        console.log(_url);
        window.open(_url, "_blank");
    }
    this.events.setPermit = function() {
        switch (this.host) {
            case "wa111":
                this.ctrl.isOpenDeposit.value = 1;
                this.ctrl.btnSaveInfo.click();
                break;
            case "ku711":
                this.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = true;
                this.ctrl.DepositChanged();
                this.ctrl.UpdateMemberRiskInfoAccountingBackend();
                break;
        }
    }.bind(this);


    this.putUser = putUser;
    this.getUser = getUser;
}



function localStorageInit() {
    return new Promise((resolve, reject) => {

    })
}

/*
chrome.runtime.sendMessage(this.extensionId, {
    command: "apiFunctions.localStorage"
}, (res) => { localStorage.assign(res) })

*/


/*
var region = {
    prov: str.match(regex.prov),
    city: str.match(regex.city)
}
*/

/*
var { author, locate, mobile, banker, region, danger, notice } = localStorage;
var search = { author, locate, mobile, banker, region, danger, notice };
for (var key in search) { search[key] = decoder(search[key]) }
var Sensitive = function() {};
[author, locate, mobile, banker, region, danger, notice].map((x) => {
    console.log(decoder(x));
    return decoder(x)
})
*/


/*
search.region.push(["江苏"])
search.region.push(["云南"])
search.region.push(["广东"])
search.notice.push(["黑名单"])
*/




//Object.assign(Sensitive.prototype, { author, locate, mobile, banker, region, danger, notice })

//var sensitive = new Sensitive();


//{ author, locate, mobile, banker, region, danger, notice };



//for(var key in sensitive) { sensitive[key] = decoder(sensitive[key]).map((x) => { return x[0] }) }

//console.log(sensitive);

//sensitive.lookup


/*

search.notice.compare = function(value) { return this.find((x) => { return value.includes(x[0]) }) }
search.author.compare = function(value) { return this.find((x) => { return x[0] == value }) }
search.danger.compare = function(value) { return this.find((x) => { return value.includes(x[0]) }) }
search.region.compare = function(value) {
    return this.find((x) => { return value.includes(x[0]) })
    //console.log(this.prov);
    //console.log(this.city);
    /*var value = this.prov;
    search.region.filter((x) => {
        if(value.includes(x[0])) {
            this.danger = true
        }
        return
    });*/

/*var value = Object.values(obj.region).toString();
this.forEach((x) => {
    if(value.includes(x[0])) {
        obj.region.danger = true
    }
})*/
//console.log(obj.region);
//}




//console.log(search);


/*
var provinces = [
    "北京市",
    "天津市",
    "重庆市",
    "上海市",
    "河北省",
    "山西省",
    "辽宁省",
    "吉林省",
    "江西省",
    "江苏省",
    "浙江省",
    "安徽省",
    "福建省",
    "山东省",
    "河南省",
    "湖北省",
    "湖南省",
    "广东省",
    "海南省",
    "四川省",
    "贵州省",
    "云南省",
    "陕西省",
    "甘肃省",
    "青海省",
    "黑龙江省",
    "西藏自治区",
    "内蒙古自治区",
    "广西壮族自治区",
    "宁夏回族自治区",
    "新疆维吾尔自治区"
].map((x) => {
    return x.replace(/(市|省)/, '')
});


var cities = [
    "石家庄市",
    "唐山市",
    "秦皇岛市",
    "邯郸市",
    "邢台市",
    "保定市",
    "张家口市",
    "承德市",
    "沧州市",
    "廊坊市",
    "衡水市",
    "太原市",
    "大同市",
    "阳泉市",
    "长治市",
    "晋城市",
    "朔州市",
    "晋中市",
    "运城市",
    "忻州市",
    "临汾市",
    "吕梁市",
    "呼和浩特市",
    "包头市",
    "乌海市",
    "赤峰市",
    "通辽市",
    "鄂尔多斯市",
    "呼伦贝尔市",
    "巴彦淖尔市",
    "乌兰察布市",
    "兴安盟",
    "锡林郭勒盟",
    "阿拉善盟",
    "沈阳市",
    "大连市",
    "鞍山市",
    "抚顺市",
    "本溪市",
    "丹东市",
    "锦州市",
    "营口市",
    "阜新市",
    "辽阳市",
    "盘锦市",
    "铁岭市",
    "朝阳市",
    "葫芦岛市",
    "长春市",
    "吉林市",
    "四平市",
    "辽源市",
    "通化市",
    "白山市",
    "松原市",
    "白城市",
    "延边朝鲜族自治州",
    "哈尔滨市",
    "齐齐哈尔市",
    "鸡西市",
    "鹤岗市",
    "双鸭山市",
    "大庆市",
    "伊春市",
    "佳木斯市",
    "七台河市",
    "牡丹江市",
    "黑河市",
    "绥化市",
    "大兴安岭地区",
    "南京市",
    "无锡市",
    "徐州市",
    "常州市",
    "苏州市",
    "南通市",
    "连云港市",
    "淮安市",
    "盐城市",
    "扬州市",
    "镇江市",
    "泰州市",
    "宿迁市",
    "杭州市",
    "宁波市",
    "温州市",
    "嘉兴市",
    "湖州市",
    "绍兴市",
    "金华市",
    "衢州市",
    "舟山市",
    "台州市",
    "丽水市",
    "合肥市",
    "芜湖市",
    "蚌埠市",
    "淮南市",
    "马鞍山市",
    "淮北市",
    "铜陵市",
    "安庆市",
    "黄山市",
    "滁州市",
    "阜阳市",
    "宿州市",
    "六安市",
    "亳州市",
    "池州市",
    "宣城市",
    "福州市",
    "厦门市",
    "莆田市",
    "三明市",
    "泉州市",
    "漳州市",
    "南平市",
    "龙岩市",
    "宁德市",
    "南昌市",
    "景德镇市",
    "萍乡市",
    "九江市",
    "新余市",
    "鹰潭市",
    "赣州市",
    "吉安市",
    "宜春市",
    "抚州市",
    "上饶市",
    "济南市",
    "青岛市",
    "淄博市",
    "枣庄市",
    "东营市",
    "烟台市",
    "潍坊市",
    "济宁市",
    "泰安市",
    "威海市",
    "日照市",
    "莱芜市",
    "临沂市",
    "德州市",
    "聊城市",
    "滨州市",
    "菏泽市",
    "郑州市",
    "开封市",
    "洛阳市",
    "平顶山市",
    "安阳市",
    "鹤壁市",
    "新乡市",
    "焦作市",
    "濮阳市",
    "许昌市",
    "漯河市",
    "三门峡市",
    "南阳市",
    "商丘市",
    "信阳市",
    "周口市",
    "驻马店市",
    "济源市",
    "武汉市",
    "黄石市",
    "十堰市",
    "宜昌市",
    "襄阳市",
    "鄂州市",
    "荆门市",
    "孝感市",
    "荆州市",
    "黄冈市",
    "咸宁市",
    "随州市",
    "恩施土家族苗族自治州",
    "省直辖县级行政区划",
    "长沙市",
    "株洲市",
    "湘潭市",
    "衡阳市",
    "邵阳市",
    "岳阳市",
    "常德市",
    "张家界市",
    "益阳市",
    "郴州市",
    "永州市",
    "怀化市",
    "娄底市",
    "湘西土家族苗族自治州",
    "广州市",
    "韶关市",
    "深圳市",
    "珠海市",
    "汕头市",
    "佛山市",
    "江门市",
    "湛江市",
    "茂名市",
    "肇庆市",
    "惠州市",
    "梅州市",
    "汕尾市",
    "河源市",
    "阳江市",
    "清远市",
    "东莞市",
    "中山市",
    "潮州市",
    "揭阳市",
    "云浮市",
    "南宁市",
    "柳州市",
    "桂林市",
    "梧州市",
    "北海市",
    "防城港市",
    "钦州市",
    "贵港市",
    "玉林市",
    "百色市",
    "贺州市",
    "河池市",
    "来宾市",
    "崇左市",
    "海口市",
    "三亚市",
    "三沙市",
    "儋州市",
    "成都市",
    "自贡市",
    "攀枝花市",
    "泸州市",
    "德阳市",
    "绵阳市",
    "广元市",
    "遂宁市",
    "内江市",
    "乐山市",
    "南充市",
    "眉山市",
    "宜宾市",
    "广安市",
    "达州市",
    "雅安市",
    "巴中市",
    "资阳市",
    "阿坝藏族羌族自治州",
    "甘孜藏族自治州",
    "凉山彝族自治州",
    "贵阳市",
    "六盘水市",
    "遵义市",
    "安顺市",
    "毕节市",
    "铜仁市",
    "黔西南布依族苗族自治州",
    "黔东南苗族侗族自治州",
    "黔南布依族苗族自治州",
    "昆明市",
    "曲靖市",
    "玉溪市",
    "保山市",
    "昭通市",
    "丽江市",
    "普洱市",
    "临沧市",
    "楚雄彝族自治州",
    "红河哈尼族彝族自治州",
    "文山壮族苗族自治州",
    "西双版纳傣族自治州",
    "大理白族自治州",
    "德宏傣族景颇族自治州",
    "怒江傈僳族自治州",
    "迪庆藏族自治州",
    "拉萨市",
    "昌都市",
    "山南市",
    "日喀则市",
    "那曲地区",
    "阿里地区",
    "林芝市",
    "西安市",
    "铜川市",
    "宝鸡市",
    "咸阳市",
    "渭南市",
    "延安市",
    "汉中市",
    "榆林市",
    "安康市",
    "商洛市",
    "兰州市",
    "嘉峪关市",
    "金昌市",
    "白银市",
    "天水市",
    "武威市",
    "张掖市",
    "平凉市",
    "酒泉市",
    "庆阳市",
    "定西市",
    "陇南市",
    "临夏回族自治州",
    "甘南藏族自治州",
    "西宁市",
    "海东市",
    "海北藏族自治州",
    "黄南藏族自治州",
    "海南藏族自治州",
    "果洛藏族自治州",
    "玉树藏族自治州",
    "海西蒙古族藏族自治州",
    "银川市",
    "石嘴山市",
    "吴忠市",
    "固原市",
    "中卫市",
    "乌鲁木齐市",
    "克拉玛依市",
    "吐鲁番地区",
    "哈密地区",
    "昌吉回族自治州",
    "博尔塔拉蒙古自治州",
    "巴音郭楞蒙古自治州",
    "阿克苏地区",
    "克孜勒苏柯尔克孜自治州",
    "喀什地区",
    "和田地区",
    "伊犁哈萨克自治州",
    "塔城地区",
    "阿勒泰地区"
].map((x) => {
    return x.replace(/(市|省)/, '')
});


try {
    var region = {
        prov: str.match(regex.prov),
        city: str.match(regex.city)
    }
    Object.entries(region).map(([key, value]) => {
        region[key] = (value) ? value[0] : value
    })
    console.log(region);
} catch (ex) {

}*/


/*
var region = {
    prov: str.match(regex.prov),
    city: str.match(regex.city),
}
*/


/*
console.log(regex.prov.exec(str));
console.log(regex.city.exec(str));

*/



/*
var prov = /(北京|天津|重庆|上海|河北|山西|辽宁|吉林|江西|江苏|浙江|安徽|福建|山东|河南|湖北|湖南|广东|海南|四川|贵州|云南|陕西|甘肃|青海|黑龙江|西藏自治区|内蒙古自治区|广西壮族自治区|宁夏回族自治区|新疆维吾尔自治区)/g;
var city = /(石家庄|唐山|秦皇岛|邯郸|邢台|保定|张家口|承德|沧州|廊坊|衡水|太原|大同|阳泉|长治|晋城|朔州|晋中|运城|忻州|临汾|吕梁|呼和浩特|包头|乌海|赤峰|通辽|鄂尔多斯|呼伦贝尔|巴彦淖尔|乌兰察布|兴安盟|锡林郭勒盟|阿拉善盟|沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛|长春|吉林|四平|辽源|通化|白山|松原|白城|延边朝鲜族自治州|哈尔滨|齐齐哈尔|鸡西|鹤岗|双鸭山|大庆|伊春|佳木斯|七台河|牡丹江|黑河|绥化|大兴安岭地区|南京|无锡|徐州|常州|苏州|南通|连云港|淮安|盐城|扬州|镇江|泰州|宿迁|杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水|合肥|芜湖|蚌埠|淮南|马鞍山|淮北|铜陵|安庆|黄山|滁州|阜阳|宿州|六安|亳州|池州|宣城|福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德|南昌|景德镇|萍乡|九江|新余|鹰潭|赣州|吉安|宜春|抚州|上饶|济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽|郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源|武汉|黄石|十堰|宜昌|襄阳|鄂州|荆门|孝感|荆州|黄冈|咸宁|随州|恩施土家族苗族自治州|直辖县级行政区划|长沙|株洲|湘潭|衡阳|邵阳|岳阳|常德|张家界|益阳|郴州|永州|怀化|娄底|湘西土家族苗族自治州|广州|韶关|深圳|珠海|汕头|佛山|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|东莞|中山|潮州|揭阳|云浮|南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|百色|贺州|河池|来宾|崇左|海口|三亚|三沙|儋州|成都|自贡|攀枝花|泸州|德阳|绵阳|广元|遂宁|内江|乐山|南充|眉山|宜宾|广安|达州|雅安|巴中|资阳|阿坝藏族羌族自治州|甘孜藏族自治州|凉山彝族自治州|贵阳|六盘水|遵义|安顺|毕节|铜仁|黔西南布依族苗族自治州|黔东南苗族侗族自治州|黔南布依族苗族自治州|昆明|曲靖|玉溪|保山|昭通|丽江|普洱|临沧|楚雄彝族自治州|红河哈尼族彝族自治州|文山壮族苗族自治州|西双版纳傣族自治州|大理白族自治州|德宏傣族景颇族自治州|怒江傈僳族自治州|迪庆藏族自治州|拉萨|昌都|山南|日喀则|那曲地区|阿里地区|林芝|西安|铜川|宝鸡|咸阳|渭南|延安|汉中|榆林|安康|商洛|兰州|嘉峪关|金昌|白银|天水|武威|张掖|平凉|酒泉|庆阳|定西|陇南|临夏回族自治州|甘南藏族自治州|西宁|海东|海北藏族自治州|黄南藏族自治州|海南藏族自治州|果洛藏族自治州|玉树藏族自治州|海西蒙古族藏族自治州|银川|石嘴山|吴忠|固原|中卫|乌鲁木齐|克拉玛依|吐鲁番地区|哈密地区|昌吉回族自治州|博尔塔拉蒙古自治州|巴音郭楞蒙古自治州|阿克苏地区|克孜勒苏柯尔克孜自治州|喀什地区|和田地区|伊犁哈萨克自治州|塔城地区|阿勒泰地区)/g;
*/

/*

//var found = str.match(regex);
//console.log(found);

provinces.filter((x) => {
    console.log(x);
    var r = str.split(x);

})*/


/*
var paragraph = 'The quick brown fox jumped over the lazy dog. It barked.';
var regex = /[A-Z]/g;
var found = paragraph.match(regex);


*/

/*
var arr = [];

$("li").each((i, el) => {
    arr.push(el.firstChild.text)

    //return el.firstChild.text
    //console.log(el.firstChild.text);
})

console.log(arr);

console.log(JSON.stringify(arr));
*/

//$("td").each((x) => { console.log(x); })



function getCountries() {


    /*
    http://www.ting.com.tw/agent/ecountry.htm

    */

    document.querySelectorAll("font").forEach((x) => {
        console.log(x);
        //if (/[a-zA-Z]/.test(x.outerText)) {} else { console.log(x.outerText); }
    })



    var country = [];

    var ctry = {}

    document.querySelectorAll("tr").forEach((x, i) => {
        if (x.children && x.children.length == 6) {
            if (i == 6 || i == 53) { return }

            var eng = x.children[0].outerText.trim()
            var big = x.children[1].outerText.trim()
            var abr = x.children[2].outerText.trim()
            ctry[abr] = { eng, big }
            var eng = x.children[3].outerText.trim()
            var big = x.children[4].outerText.trim()
            var abr = x.children[5].outerText.trim()
            ctry[abr] = { eng, big }


            /*
            var text = x.children[2].outerText.trim();
            country.push(text);
            var text = x.children[5].outerText.trim();
            country.push(text);*/
        }
    })

    console.log(ctry);
    console.log(JSON.stringify(ctry));


    var ctry = { "AL": { "eng": "Albania", "big": "阿爾巴尼亞" }, "CD": { "eng": "Dem Rep of Congo", "big": "剛果" }, "DZ": { "eng": "Algeria", "big": "阿爾及利亞" }, "DK": { "eng": "Denmark", "big": "丹麥" }, "AO": { "eng": "Angola", "big": "安哥拉" }, "DO": { "eng": "Dominican Rep.", "big": "多明尼加" }, "AI": { "eng": "Anguilla", "big": "安圭拉" }, "DM": { "eng": "Dominica (Commonwealth of)", "big": "多米尼克" }, "AR": { "eng": "Argentina", "big": "阿根廷" }, "EC": { "eng": "Ecuador", "big": "厄瓜多爾" }, "AM": { "eng": "Armenia", "big": "亞美尼亞" }, "EG": { "eng": "Egypt", "big": "埃及" }, "AW": { "eng": "Aruba", "big": "阿路巴" }, "SV": { "eng": "El Salvador", "big": "薩爾瓦多" }, "AU": { "eng": "Australia", "big": "澳大利亞" }, "ER": { "eng": "Eritrea", "big": "厄利垂亞" }, "AT": { "eng": "Austria", "big": "奧地利" }, "EE": { "eng": "Estonia", "big": "愛沙尼亞" }, "AZ": { "eng": "Azerbaijan", "big": "亞塞拜然" }, "ET": { "eng": "Ethiopia", "big": "衣索匹亞" }, "BS": { "eng": "Bahamas", "big": "巴哈馬" }, "FJ": { "eng": "Fiji", "big": "斐濟" }, "BH": { "eng": "Bahrain", "big": "巴林" }, "FI": { "eng": "Finland", "big": "芬蘭" }, "BD": { "eng": "Bangladesh", "big": "孟加拉" }, "PF": { "eng": "French Polynesia", "big": "法屬玻里尼西亞" }, "BB": { "eng": "Barbados", "big": "巴貝多" }, "GA": { "eng": "Gabon", "big": "加彭" }, "BY": { "eng": "Belarus", "big": "白俄羅斯" }, "GE": { "eng": "Georgia", "big": "喬治亞" }, "BE": { "eng": "Belgium", "big": "比利時" }, "DE": { "eng": "Germany", "big": "德國" }, "BZ": { "eng": "Belize", "big": "貝里斯" }, "GH": { "eng": "Ghana", "big": "迦納" }, "BJ": { "eng": "Benin", "big": "貝南" }, "GI": { "eng": "Gibraltar", "big": "直布羅陀" }, "BM": { "eng": "Bermuda", "big": "百慕達" }, "UK": { "eng": "United Kingdom of Great Britain and Northern Ireland", "big": "英國" }, "BT": { "eng": "Bhutan", "big": "不丹" }, "GR": { "eng": "Greece", "big": "希臘" }, "BO": { "eng": "Bolivia", "big": "玻利維亞" }, "GD": { "eng": "Grenada", "big": "格瑞那達" }, "BA": { "eng": "Bosnia and Herzegovina", "big": "波希尼亞及赫塞哥維那" }, "GT": { "eng": "Guatemala", "big": "瓜地馬拉" }, "BW": { "eng": "Botswana", "big": "波札那" }, "GN": { "eng": "Guinea", "big": "幾內亞" }, "BR": { "eng": "Brazil", "big": "巴西" }, "GY": { "eng": "Guyana", "big": "蓋亞那" }, "BN": { "eng": "Brunei Darussalam", "big": "汶萊" }, "HA": { "eng": "Haiti", "big": "海地" }, "BG": { "eng": "Bulgaria", "big": "保加利亞" }, "HN": { "eng": "Honduras", "big": "宏都拉斯" }, "BF": { "eng": "Burkina Faso", "big": "有吉納法索" }, "HK": { "eng": "Hong Kong", "big": "香港" }, "BI": { "eng": "Burundi", "big": "蒲隆地" }, "HU": { "eng": "Hungary", "big": "匈牙利" }, "KH": { "eng": "Cambodia", "big": "柬埔寨" }, "IS": { "eng": "Iceland", "big": "冰島" }, "CM": { "eng": "Cameroon", "big": "喀麥隆" }, "IN": { "eng": "India", "big": "印度" }, "CA": { "eng": "Canada", "big": "加拿大" }, "ID": { "eng": "Indonesia", "big": "印尼" }, "CV": { "eng": "Cape Verde", "big": "維德角島" }, "IR": { "eng": "Iran", "big": "依朗" }, "KY": { "eng": "Cayman Islands", "big": "開曼群島" }, "IQ": { "eng": "Iraq", "big": "伊拉克" }, "CF": { "eng": "Central African Rep", "big": "中非共和國" }, "IE": { "eng": "Ireland", "big": "愛爾蘭" }, "TD": { "eng": "Chad", "big": "查德" }, "IL": { "eng": "Israel", "big": "以色列" }, "CL": { "eng": "Chile", "big": "智利" }, "IT": { "eng": "Italy", "big": "義大利" }, "CN": { "eng": "China (People's Rep)", "big": "中國大陸" }, "JM": { "eng": "Jamaica", "big": "牙買加" }, "CO": { "eng": "Colombia", "big": "哥倫比亞" }, "JP": { "eng": "Japan", "big": "日本" }, "CG": { "eng": "Congo(Rep)", "big": "剛果" }, "JO": { "eng": "Jordan", "big": "約旦" }, "CK": { "eng": "Cook Islands", "big": "科克群島" }, "KE": { "eng": "Kenya", "big": "肯亞" }, "CR": { "eng": "Costa Rica", "big": "哥斯大黎加" }, "KR": { "eng": "Korea (Rep)", "big": "韓國" }, "CI": { "eng": "Cote d'Ivoire (Rep)", "big": "象牙海岸" }, "KW": { "eng": "Kuwait", "big": "科威特" }, "HR": { "eng": "Croatia", "big": "克羅埃西亞" }, "LA": { "eng": "Lao People's Dem Rep", "big": "寮國" }, "CY": { "eng": "Cyprus", "big": "塞浦路斯" }, "LV": { "eng": "Latvia", "big": "拉脫維亞" }, "CZ": { "eng": "Czech (Rep)", "big": "捷克" }, "LS": { "eng": "Lesotho", "big": "賴索托" }, "LU": { "eng": "Luxembourg", "big": "盧森堡" }, "LC": { "eng": "Saint Lucia", "big": "聖露西亞" }, "MO": { "eng": "Macao", "big": "澳門" }, "VC": { "eng": "Saint Vincent and the Grenadines", "big": "聖文森及格瑞那丁" }, "MK": { "eng": "Macedonia", "big": "馬其頓" }, "ST": { "eng": "Sao Tome and Principe", "big": "聖多美及普林西比" }, "MG": { "eng": "Madagascar", "big": "馬達加斯加" }, "SA": { "eng": "Saudi Arabia", "big": "沙烏地阿拉伯" }, "MW": { "eng": "Malawi", "big": "馬拉威" }, "SN": { "eng": "Senegal", "big": "塞內加爾" }, "MY": { "eng": "Malaysia", "big": "馬來西亞" }, "SC": { "eng": "Seychelles", "big": "塞席爾" }, "MV": { "eng": "Maldives", "big": "馬爾地夫" }, "SL": { "eng": "Sierra Leone", "big": "獅子山" }, "ML": { "eng": "Mali", "big": "馬利" }, "SG": { "eng": "Singapore", "big": "新加坡" }, "MT": { "eng": "Malta", "big": "馬爾他" }, "SK": { "eng": "Slovakia", "big": "斯洛伐克" }, "MU": { "eng": "Mauritius", "big": "模里西斯" }, "SI": { "eng": "Slovenia", "big": "斯洛維尼亞" }, "MR": { "eng": "Mauritania", "big": "茅利塔尼亞" }, "SB": { "eng": "Solomon Islands", "big": "索羅門群島" }, "MX": { "eng": "Mexico", "big": "墨西哥" }, "SO": { "eng": "Somalia", "big": "索馬利亞" }, "MD": { "eng": "Moldova", "big": "摩爾多瓦" }, "ZA": { "eng": "South Africa", "big": "南非" }, "MN": { "eng": "Mongolia", "big": "蒙古" }, "ES": { "eng": "Spain", "big": "西班牙" }, "MA": { "eng": "Morocco", "big": "摩洛哥" }, "LK": { "eng": "Sri Lanka", "big": "斯里蘭卡" }, "MM": { "eng": "Myanmar", "big": "緬甸" }, "SD": { "eng": "Sudan", "big": "蘇丹" }, "NA": { "eng": "Namibia", "big": "納米比亞" }, "SR": { "eng": "Suriname", "big": "蘇利南" }, "NR": { "eng": "Nauru", "big": "諾魯" }, "SZ": { "eng": "Swaziland", "big": "史瓦濟蘭" }, "NP": { "eng": "Nepal", "big": "尼泊爾" }, "SE": { "eng": "Sweden", "big": "瑞典" }, "NL": { "eng": "Netherlands", "big": "荷蘭" }, "CH": { "eng": "Switzerland", "big": "瑞士" }, "NC": { "eng": "New Caledonia", "big": "新喀里多尼亞" }, "SY": { "eng": "Syrian Arab Rep", "big": "敘利亞" }, "NZ": { "eng": "New Zealand", "big": "紐西蘭" }, "TZ": { "eng": "Tanzania", "big": "坦尚尼亞" }, "NE": { "eng": "Niger", "big": "尼日" }, "TH": { "eng": "Thailand", "big": "泰國" }, "NG": { "eng": "Nigeria", "big": "奈及利亞" }, "TG": { "eng": "Togo", "big": "多哥" }, "NO": { "eng": "Norway", "big": "挪威" }, "TT": { "eng": "Trinidad and Tobago", "big": "千里達及托貝哥" }, "OM": { "eng": "Oman", "big": "阿曼" }, "TN": { "eng": "Tunisia", "big": "突尼西亞" }, "PK": { "eng": "Pakistan", "big": "巴基斯坦" }, "TR": { "eng": "Turkey", "big": "土耳其" }, "PA": { "eng": "Panama", "big": "巴拿馬" }, "UG": { "eng": "Uganda", "big": "烏干達" }, "PG": { "eng": "Papua New Guinea", "big": "巴布亞紐幾內亞" }, "UA": { "eng": "Ukraine", "big": "烏克蘭" }, "PY": { "eng": "Paraguay", "big": "巴拉圭" }, "AE": { "eng": "United Arab Emirates", "big": "阿拉伯聯合大公國" }, "PE": { "eng": "Peru", "big": "秘魯" }, "US": { "eng": "United States of America", "big": "美國" }, "PH": { "eng": "Philippines", "big": "菲律賓" }, "UY": { "eng": "Uruguay", "big": "烏拉圭" }, "PL": { "eng": "Poland", "big": "波蘭" }, "VE": { "eng": "Venezuela", "big": "委內瑞拉" }, "PT": { "eng": "Portugal", "big": "葡萄牙" }, "VN": { "eng": "Viet Nam", "big": "越南" }, "QA": { "eng": "Qatar", "big": "卡達" }, "WS": { "eng": "Western Samoa", "big": "西薩摩亞" }, "RO": { "eng": "Romania", "big": "羅馬尼亞" }, "YE": { "eng": "Yemen", "big": "葉門" }, "RU": { "eng": "Russian Federation", "big": "俄羅斯" }, "YU": { "eng": "Yugoslavia", "big": "南斯拉夫" }, "RW": { "eng": "Rwanda", "big": "盧安達" }, "ZM": { "eng": "Zambia", "big": "尚比亞" }, "KN": { "eng": "Saint Christopher (St. Kitts) and Nevis", "big": "聖克里斯多福及尼維斯" }, "ZW": { "eng": "Zimbabwe", "big": "辛巴威" } }

    /*
    console.log(country);
    console.log(JSON.stringify(country));

    */



    ["阿爾巴尼亞", "剛果", "阿爾及利亞", "丹麥", "安哥拉", "多明尼加", "安圭拉", "多米尼克", "阿根廷", "厄瓜多爾", "亞美尼亞", "埃及", "阿路巴", "薩爾瓦多", "澳大利亞", "厄利垂亞", "奧地利", "愛沙尼亞", "亞塞拜然", "衣索匹亞", "巴哈馬", "斐濟", "巴林", "芬蘭", "孟加拉", "法屬玻里尼西亞", "巴貝多", "加彭", "白俄羅斯", "喬治亞", "比利時", "德國", "貝里斯", "迦納", "貝南", "直布羅陀", "百慕達", "英國", "不丹", "希臘", "玻利維亞", "格瑞那達", "波希尼亞及赫塞哥維那", "瓜地馬拉", "波札那", "幾內亞", "巴西", "蓋亞那", "汶萊", "海地", "保加利亞", "宏都拉斯", "有吉納法索", "香港", "蒲隆地", "匈牙利", "柬埔寨", "冰島", "喀麥隆", "印度", "加拿大", "印尼", "維德角島", "依朗", "開曼群島", "伊拉克", "中非共和國", "愛爾蘭", "查德", "以色列", "智利", "義大利", "中國大陸", "牙買加", "哥倫比亞", "日本", "剛果", "約旦", "科克群島", "肯亞", "哥斯大黎加", "韓國", "象牙海岸", "科威特", "克羅埃西亞", "寮國", "塞浦路斯", "拉脫維亞", "捷克", "賴索托", "盧森堡", "聖露西亞", "澳門", "聖文森及格瑞那丁", "馬其頓", "聖多美及普林西比", "馬達加斯加", "沙烏地阿拉伯", "馬拉威", "塞內加爾", "馬來西亞", "塞席爾", "馬爾地夫", "獅子山", "馬利", "新加坡", "馬爾他", "斯洛伐克", "模里西斯", "斯洛維尼亞", "茅利塔尼亞", "索羅門群島", "墨西哥", "索馬利亞", "摩爾多瓦", "南非", "蒙古", "西班牙", "摩洛哥", "斯里蘭卡", "緬甸", "蘇丹", "納米比亞", "蘇利南", "諾魯", "史瓦濟蘭", "尼泊爾", "瑞典", "荷蘭", "瑞士", "新喀里多尼亞", "敘利亞", "紐西蘭", "坦尚尼亞", "尼日", "泰國", "奈及利亞", "多哥", "挪威", "千里達及托貝哥", "阿曼", "突尼西亞", "巴基斯坦", "土耳其", "巴拿馬", "烏干達", "巴布亞紐幾內亞", "烏克蘭", "巴拉圭", "阿拉伯聯合大公國", "秘魯", "美國", "菲律賓", "烏拉圭", "波蘭", "委內瑞拉", "葡萄牙", "越南", "卡達", "西薩摩亞", "羅馬尼亞", "葉門", "俄羅斯", "南斯拉夫", "盧安達", "尚比亞", "聖克里斯多福及尼維斯", "辛巴威"]

    ["Albania", "Dem Rep of Congo", "Algeria", "Denmark", "Angola", "Dominican Rep.", "Anguilla", "Dominica (Commonwealth of)", "Argentina", "Ecuador", "Armenia", "Egypt", "Aruba", "El Salvador", "Australia", "Eritrea", "Austria", "Estonia", "Azerbaijan", "Ethiopia", "Bahamas", "Fiji", "Bahrain", "Finland", "Bangladesh", "French Polynesia", "Barbados", "Gabon", "Belarus", "Georgia", "Belgium", "Germany", "Belize", "Ghana", "Benin", "Gibraltar", "Bermuda", "United Kingdom of Great Britain and Northern Ireland", "Bhutan", "Greece", "Bolivia", "Grenada", "Bosnia and Herzegovina", "Guatemala", "Botswana", "Guinea", "Brazil", "Guyana", "Brunei Darussalam", "Haiti", "Bulgaria", "Honduras", "Burkina Faso", "Hong Kong", "Burundi", "Hungary", "Cambodia", "Iceland", "Cameroon", "India", "Canada", "Indonesia", "Cape Verde", "Iran", "Cayman Islands", "Iraq", "Central African Rep", "Ireland", "Chad", "Israel", "Chile", "Italy", "China (People's Rep)", "Jamaica", "Colombia", "Japan", "Congo(Rep)", "Jordan", "Cook Islands", "Kenya", "Costa Rica", "Korea (Rep)", "Cote d'Ivoire (Rep)", "Kuwait", "Croatia", "Lao People's Dem Rep", "Cyprus", "Latvia", "Czech (Rep)", "Lesotho", "Luxembourg", "Saint Lucia", "Macao", "Saint Vincent and the Grenadines", "Macedonia", "Sao Tome and Principe", "Madagascar", "Saudi Arabia", "Malawi", "Senegal", "Malaysia", "Seychelles", "Maldives", "Sierra Leone", "Mali", "Singapore", "Malta", "Slovakia", "Mauritius", "Slovenia", "Mauritania", "Solomon Islands", "Mexico", "Somalia", "Moldova", "South Africa", "Mongolia", "Spain", "Morocco", "Sri Lanka", "Myanmar", "Sudan", "Namibia", "Suriname", "Nauru", "Swaziland", "Nepal", "Sweden", "Netherlands", "Switzerland", "New Caledonia", "Syrian Arab Rep", "New Zealand", "Tanzania", "Niger", "Thailand", "Nigeria", "Togo", "Norway", "Trinidad and Tobago", "Oman", "Tunisia", "Pakistan", "Turkey", "Panama", "Uganda", "Papua New Guinea", "Ukraine", "Paraguay", "United Arab Emirates", "Peru", "United States of America", "Philippines", "Uruguay", "Poland", "Venezuela", "Portugal", "Viet Nam", "Qatar", "Western Samoa", "Romania", "Yemen", "Russian Federation", "Yugoslavia", "Rwanda", "Zambia", "Saint Christopher (St. Kitts) and Nevis", "Zimbabwe"]

    ["AL", "CD", "DZ", "DK", "AO", "DO", "AI", "DM", "AR", "EC", "AM", "EG", "AW", "SV", "AU", "ER", "AT", "EE", "AZ", "ET", "BS", "FJ", "BH", "FI", "BD", "PF", "BB", "GA", "BY", "GE", "BE", "DE", "BZ", "GH", "BJ", "GI", "BM", "UK", "BT", "GR", "BO", "GD", "BA", "GT", "BW", "GN", "BR", "GY", "BN", "HA", "BG", "HN", "BF", "HK", "BI", "HU", "KH", "IS", "CM", "IN", "CA", "ID", "CV", "IR", "KY", "IQ", "CF", "IE", "TD", "IL", "CL", "IT", "CN", "JM", "CO", "JP", "CG", "JO", "CK", "KE", "CR", "KR", "CI", "KW", "HR", "LA", "CY", "LV", "CZ", "LS", "LU", "LC", "MO", "VC", "MK", "ST", "MG", "SA", "MW", "SN", "MY", "SC", "MV", "SL", "ML", "SG", "MT", "SK", "MU", "SI", "MR", "SB", "MX", "SO", "MD", "ZA", "MN", "ES", "MA", "LK", "MM", "SD", "NA", "SR", "NR", "SZ", "NP", "SE", "NL", "CH", "NC", "SY", "NZ", "TZ", "NE", "TH", "NG", "TG", "NO", "TT", "OM", "TN", "PK", "TR", "PA", "UG", "PG", "UA", "PY", "AE", "PE", "US", "PH", "UY", "PL", "VE", "PT", "VN", "QA", "WS", "RO", "YE", "RU", "YU", "RW", "ZM", "KN", "ZW"]
}