var json = function(str) { try { if (str.constructor.name == "Response") { return str.json() } if (typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };


function parseUrl(method, url, async, user, password) {
    var requestUrl = new URL(url.replace('..', location.origin));


    this.params = {};
    [...requestUrl.searchParams.entries()].forEach(([name, value]) => {
        this.params[name] = value;
    });

    this.queryString = requestUrl.search.slice(1);



    console.log(requestUrl);

    console.log(this.queryString)

}


;
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
    else if (typeof define === 'function' && define.amd) define([], factory);
    else if (typeof exports === 'object') exports["XMLHttpSpider"] = factory();
    else root["XMLHttpSpider"] = factory();
})(this, function() {

    var { send, open, setRequestHeader } = XMLHttpRequest.prototype;
    var XMLHttpSpider = XMLHttpRequest.prototype;
    
    console.log(XMLHttpSpider);
    XMLHttpSpider.setRequestHeader = function(name, value) {
        return setRequestHeader.apply(this, arguments);
    }

    XMLHttpSpider.open = function(method, url, async, user, password) {
        //url = url.replace('..', location.origin)
        parseUrl.apply(this, arguments)
        //var _url = new URL(url.replace('..', location.origin));
        /* console.log(_url);
         console.log([_url.searchParams]);
         console.log([..._url.searchParams.entries()]);*/
        ///var query = url.split('?')[1];


        var c = Object.assign({}, { method, url, async, user, password });
        // console.log(c);
        //consle.log(url);


        return open.apply(this, arguments);
    };


    /*   
    var formData = new FormData();

       var headerMap = new Map([])
       console.log(formData);*/


    XMLHttpSpider.send = function(data) {
        this.onreadystatechange = function() {
            if (this.readyState == this.HEADERS_RECEIVED) {
                var headers = this.getAllResponseHeaders();
                var arr = headers.trim().split(/[\r\n]+/);
                this.headers = arr.map((line) => { return line.split(': '); }).map(([name, value]) => { return { name, value } })
            }
        }

        this.addEventListener('loadstart', this.loadstart);
        this.addEventListener('loadend', this.loadend);
        this.addEventListener('load', this.load);
        return send.apply(this, arguments);
    };

    XMLHttpSpider.loadstart = function() {
        //this.response = {};

    }

    XMLHttpSpider.load = function() {


        //console.log(this);
        //console.log(this.responseType);
        // console.log(XMLHttpSpider.responseType);
    }


    XMLHttpSpider.loadend = function() {}

    return XMLHttpSpider;
});


/*

 //console.log(query);
        //console.log(query.split('&'));

        //var b = query.split('&').map((x) => { return x.split('=') }).map(([name, value]) => { console.log(x); })

        //console.log(b);

 var headerMap = {};
                arr.forEach(function(line) {
                    var parts = line.split(': ');
                    var header = parts.shift();
                    var value = parts.join(': ');
                    headerMap[header] = value;
                });
                console.log(headerMap);
request.onreadystatechange = function() {
    if (this.readyState == this.HEADERS_RECEIVED) {

        // Get the raw header string
        var headers = request.getAllResponseHeaders();

        // Convert the header string into an array
        // of individual headers
        var arr = headers.trim().split(/[\r\n]+/);

        // Create a map of header names to values
        var headerMap = {};
        arr.forEach(function(line) {
            var parts = line.split(': ');
            var header = parts.shift();
            var value = parts.join(': ');
            headerMap[header] = value;
        });
    }
}*/



//console.log(getAllResponseHeaders());
//var v= this.get
/*var formData = new FormData();
formData.append(name, value);
//console.log(formData);
console.log([...formData.entries()]);*/

/*this.request = {
    headers: []
};*/