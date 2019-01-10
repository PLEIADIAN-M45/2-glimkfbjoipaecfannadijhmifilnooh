define(["app.spider.extend", "md5"], function() {

    class xxx {
        constructor(sp) {
            console.log(sp);
            console.log(this);

            console.log(this.open);


        }
    }

    xxx.prototype = XMLHttpRequest.prototype
    var c = new xxx()


    // var c = new xxx(XMLHttpRequest.prototype)

    function $getAllResponseHeaders(obj) {
        return obj.getAllResponseHeaders().split('\r').map((x) => {
            return x.split(":")
        }).serialize();
    };

    function $serialize({ href, url, postData }) {
        var obj = {};
        if(href) { if(href.includes('?')) { decodeURIComponent(href).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        if(url) { if(url.includes('?')) { decodeURIComponent(url).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        if(postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        return obj;
    }

    function json(str) { try { if(str.constructor.name == "Response") { return str.json() } if(typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };

    function $fromJson(obj) { try { var str = JSON.stringify(obj); } catch (ex) { var str = obj; } return str; }

    function $tryJson({ responseText }) { try { return JSON.parse(responseText); } catch (ex) { return responseText } }

    function $isJson(d) { try { JSON.parse(d); } catch (ex) { return false; } return true; }

    function $hostname() { if(location.port) { return { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port]; } else { return location.hostname.split('.')[1]; } }

    function $lastPath({ url }) { return url.split('?')[0].split('/').pop().replace(/\.\w+/, ''); }

    function $mimeType({ responseText }) { return $isJson(responseText) ? "json" : "text"; }

    function $dataRows({ respData }) { try { return respData.rows || respData.Data.Data; } catch (ex) {} };

    function trim(value) { return value.toString().trim() };

    function s(a) { console.log(a); }

    return class _xmlSpider {
        constructor(sp) {

        }

        get responseHeaders() {
            return 213
        }

    }

    return {
        $getAllResponseHeaders,
        $serialize,
        $fromJson,
        $tryJson,
        $hostname,
        $lastPath,
        $mimeType,
        $dataRows
    }



})