var json = function(str) { try { if (str.constructor.name == "Response") { return str.json() } if (typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };

var XMLHttpSpider;

var { send, open, setRequestHeader } = XMLHttpRequest.prototype;
var XMLHttpSpider = XMLHttpRequest.prototype;
XMLHttpSpider.setRequestHeader = function(name, value) {

    return setRequestHeader.apply(this, arguments);
}
XMLHttpSpider.open = function(method, url, async, user, password) {
    return open.apply(this, arguments);
};


XMLHttpSpider.send = function(data) {
    this.addEventListener('loadend', this.loadend);
    this.addEventListener('load', this.load);
    return send.apply(this, arguments);
};



XMLHttpSpider.load = function() {
    console.log(this);
    console.log(this.responseType);

   // console.log(XMLHttpSpider.responseType);
}


XMLHttpSpider.loadend = function() {
    console.log(this);
}


console.log(XMLHttpSpider);

